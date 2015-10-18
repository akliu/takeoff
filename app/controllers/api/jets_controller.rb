class Api::JetsController < ApplicationController
  def index
    airport_id = Airport.find_by(name: params[:origin]).id
    @jets = Jet.where("airport_id = ?", airport_id)
  end
end
