class Api::JetsController < ApplicationController
  def index
    # airport_id = Airport.find_by(name: params[:origin]).id
    # @jets = Jet.where("airport_id = ?", airport_id)
    @jets = Jet.all

    @jets = @jets.map do |jet|
      {id: jet.id,
        owner_id: jet.owner_id,
        owner_name: jet.owner.username,
        airport_id: jet.airport_id,
        airport_name: jet.airport.name,
        model: jet.model,
        capacity: jet.capacity
      }
    end
  end

  def create
    airport_id = Airport.find_by(name: params[:airport]).id
    @jet = Jet.create(owner_id: current_user.id, airport_id: airport_id,
                      model: params[:jet]  ,  capacity: 10 )
    # @jets = Jet.where("airport_id = ?", airport_id)
    @jets = Jet.all
    @jets = @jets.map do |jet|
      {id: jet.id,
        owner_id: jet.owner_id,
        owner_name: jet.owner.username,
        airport_id: jet.airport_id,
        airport_name: jet.airport.name,
        model: jet.model,
        capacity: jet.capacity
      }
    end
    render :index
  end
end
