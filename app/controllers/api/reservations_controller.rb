class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.where("user_id = ?", current_user.id)

    @reservations = @reservations.map do |reservation|
        {id: reservation.id,
          user_id: reservation.user_id,
          origin_name: reservation.origin.name,
          origin_code: reservation.origin.code,
          destination_name: reservation.destination.name,
          destination_code: reservation.destination.code,
          jet_id: reservation.jet_id,
          departure_time: reservation.departure_time,
          created_at: reservation.created_at,
          updated_at: reservation.updated_at
        }
    end
  end
end
