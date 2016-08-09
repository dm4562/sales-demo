class DestinationsController < ApplicationController
  before_action :authenticate_user!

  # GET /all_destinations
  def all
    if current_user.admin
      destinations = Destination.order(id: :asc).all
      render json: { destinations: destinations }
    else
      render json: { error: 'not authorized' }, status: :unauthorized
    end
  end
  # GET destinations/
  def index
    destinations = current_user.destinations.order(id: :asc).all

    render json: { destinations: destinations }
  end

  # GET destinations/:id
  def show
    destination = current_user.destinations.where(id: params[:id]).first

    if destination
      render json: { destination: destination } if destination
    else
      render status: :not_found, json: { error: "not found" }
    end
  end

  # POST /destinations
  def create
    destination = Destination.new(destination_params)
    destination.user = current_user

    if destination.save
      render json: { destination: destination }
    else
      render json: { errors: destination.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /destinations/1
  def update
    destination = Destination.find(params[:id])

    if destination.update(destination_params)
      render json: { destination: destination }
    else
      render json: { errors: destination.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /destinations/1
  def destroy
    destination = Destination.find(params[:id])
    destination.destroy
  end

  def top_four
    destinations = current_user.destinations.order(score: :desc).limit(4)
    render json: { destinations: destinations }
  end

  private
  def destination_params
    params.require(:destination).permit(:name, :dest_type, :desc_short, :desc_long, :score, :image_src)
  end
end
