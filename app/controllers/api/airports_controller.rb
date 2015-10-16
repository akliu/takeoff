class Api::AirportsController < ApplicationController
  def index
    if (params[:bounds])
      bounds = params[:bounds]
      @airports = Airport.in_bounds(bounds)
    else
      # render json: "finding airports near you............"
      @airports = Airport.all
    end
  end
end
