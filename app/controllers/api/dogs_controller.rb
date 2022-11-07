class Api::DogsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    before_action :authorize
    def create
        dog = Dog.create!(dog_params)
        render json: dog, include: [:user], status: :created
    end

    def show
        dog = Dog.find_by!(id: params[:id])
        render json: dog, include: [:user]
    end

    def index
        render json: Dog.all, include: [:user], status: :ok
    end

    def destroy
        dog = Dog.find_by!(id: params[:id])
        dog.destroy
        render json: dog
    end

    def update
        dog = Dog.find_by!(id: params[:id])
        dog.update(is_adopted: params[:is_adopted], adopted_by: params[:adopted_by])
        render json: dog
    end

    private
    def dog_params
        params.permit(:name, :gender, :breed, :image_url, :size, :age).with_defaults(user_id: session[:user_id], is_adopted: false)
    end

    def authorize
        render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def render_not_found
        render json: {errors: ["Dog not Found"]}, status: :not_found
    end
end
