class Api::ReservationsController < ApplicationController
  def index

    if (params[:time] == "future")
      @reservations = Reservation.where("user_id = ? AND departure_time >= ?",
                          current_user.id, DateTime.now).order(:departure_time).includes(:origin, :destination, :user, :jet)
    else
      @reservations = Reservation.where("user_id = ? AND departure_time < ?",
                current_user.id, DateTime.now).order("departure_time DESC").includes(:origin, :destination, :user, :jet)
    end

    @reservations = prepare_for_json(@reservations)
  end

  def create
    price = params[:price].to_f
    origin_id = Airport.find_by(name: params[:origin]).id
    destination_id = Airport.find_by(name: params[:destination]).id
    jet_id = params[:jetId]
    date = params[:date].split("/")
    hour = params[:hour].to_i
    hour += 12 if params[:ampm] == "pm"
    departure_time = DateTime.new(date[2].to_i, date[0].to_i, date[1].to_i,
                            hour, params[:minute].to_i, 0, params[:timezone])

    @reservation = Reservation.create(user_id: current_user.id, origin_id: origin_id,
            destination_id: destination_id, jet_id: jet_id,
            departure_time: departure_time, price: price)


    @reservations = @reservations = Reservation.where("user_id = ? AND departure_time >= ?",
                        current_user.id, DateTime.now).order(:departure_time).includes(:origin, :destination, :user, :jet)

    @reservations = prepare_for_json(@reservations)
    render :index
  end

  def update
    @reservation = Reservation.find(params[:id])

    origin_id = Airport.find_by(name: params[:origin]).id
    destination_id = Airport.find_by(name: params[:destination]).id
    jet_id = params[:jetId]
    date = params[:date].split("/")
    hour = params[:hour].to_i
    hour += 12 if params[:ampm] == "pm"
    departure_time = DateTime.new(date[2].to_i, date[0].to_i, date[1].to_i,
                            hour, params[:minute].to_i, 0, params[:timezone])

    @reservation.update!(user_id: current_user.id, origin_id: origin_id,
            destination_id: destination_id, jet_id: jet_id,
            departure_time: departure_time)

    @reservations = @reservations = Reservation.where("user_id = ? AND departure_time >= ?",
                        current_user.id, DateTime.now).order(:departure_time).includes(:origin, :destination, :user, :jet)

    @reservations = prepare_for_json(@reservations)
    render :index

  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy!

    @reservations = @reservations = Reservation.where("user_id = ? AND departure_time >= ?",
                        current_user.id, DateTime.now).order(:departure_time).includes(:origin, :destination, :user, :jet)

    @reservations = prepare_for_json(@reservations)
    render :index
  end

  private

  def prepare_for_json(reservations)
    json_reservations = reservations.map do |reservation|
      {id: reservation.id,
        user_id: reservation.user_id,
        origin_name: reservation.origin.name,
        origin_code: reservation.origin.code,
        origin_id: reservation.origin.id,
        destination_name: reservation.destination.name,
        destination_code: reservation.destination.code,
        destination_id: reservation.destination.id,
        jet: reservation.jet.model,
        jet_id: reservation.jet.id,
        departure_time: reservation.departure_time,
        created_at: reservation.created_at,
        updated_at: reservation.updated_at,
        price: reservation.price
      }
    end
    json_reservations
  end
end
