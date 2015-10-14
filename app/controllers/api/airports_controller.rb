class Api::AirportsController < ApplicationController
  def index


    if (params[:filterParams])
      bounds = params[:filterParams][:bounds]
      @airports = Airport.in_bounds(bounds)
    else
      @airports = Airport.all
    end
  end
end
