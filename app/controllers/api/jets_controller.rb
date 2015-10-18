class Api::JetsController < ApplicationController
  def index
    airport_id = Airport.find_by(name: params[:origin]).id
    @jets = Jet.where("airport_id = ?", airport_id)
  end

  def create
    airport_id = Airport.find_by(name: params[:airport]).id
    @jet = Jet.create(owner_id: current_user.id, airport_id: airport_id,
                      model: params[:jet]  ,  capacity: 10 )
    @jets = Jet.where("airport_id = ?", airport_id)
    render :index
  end
end
