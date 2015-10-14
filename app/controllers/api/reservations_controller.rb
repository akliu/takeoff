class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.where("user_id = ?", current_user.id)
  end
end
