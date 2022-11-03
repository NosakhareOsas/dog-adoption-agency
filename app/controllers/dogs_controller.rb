class DogsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    before_action :authorize
    def create
        dog = Dog.create!(dog_params)
        render json: dog, include: [:user], status: :created
    end

    def show
        dog = Dog.find_by(id: params[:id])
        render json: dog, include: [:user]
    end

    def index
        render json: Dog.all, status: :ok
    end

    private
    def dog_params
        params.permit(:name, :gender, :breed, :image_url, :size, :age).with_defaults(user_id: session[:user_id], is_adopted: false)
    end

    def authorize
        render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity(invalid)
        render json:{errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_not_found
        render json: {errors: ["Dog not Found"]}, status: :render_not_found
    end
end
