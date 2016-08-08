class DestinationController < ApplicationController
  before_action :authenticate_user!

  # GET destinations/
  def index
    destinations = current_user.destinations.order(id: :asc).all

    render json: { destinations: destinations }
  end

  # GET destinations/:id
  def show
    destination = current_user.destinations.where(id: params[:id]).first

    render json: { destination: destination } if destination
    render status: :not_found
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

    if destination.update(hero_params)
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
    destinations = current_user.destinations.order(power: :desc).limit(4)
    render json: { destinations: destinations }
  end

  private
  def hero_params
    params.require(:destination).permit(:name, :dest_type, :desc_short, :desc_long, :score, :image_src)
  end
end
