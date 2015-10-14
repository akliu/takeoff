class Api::AirportsController < ApplicationController
  def index

    if (params[:bounds])
      bounds = params[:bounds]
      @airports = Airport.in_bounds(bounds)
    else
      @airports = Airport.all
    end
  end
end
