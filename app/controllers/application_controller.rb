class ApplicationController < ActionController::API
    include ActionController::Cookies
    include ResponseExceptions

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_error
end
