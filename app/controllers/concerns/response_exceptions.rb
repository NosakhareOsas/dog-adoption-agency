module ResponseExceptions
    extend ActiveSupport::Concern

    private

    def render_unprocessable_entity_error(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end