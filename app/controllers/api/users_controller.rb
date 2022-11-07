class Api::UsersController < ApplicationController
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: "Unauthorized user"}, status: :unauthorized
        end
    end

    private
    def user_params
        params.permit(:firstname, :surname, :username, :password, :password_confirmation, :bio)
    end
end
