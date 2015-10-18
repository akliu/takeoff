class Api::JetsController < ApplicationController
  def index
    @jets = Jet.all
  end
end
