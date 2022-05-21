module Api
    class BookingsController < ApplicationController
      def create
        token = cookies.signed[:airbnb_session_token]
        session = Session.find_by(token: token)
        return render json: { error: 'user not logged in' }, status: :unauthorized if !session
  
        property = Property.find_by(id: params[:booking][:property_id])
        return render json: { error: 'cannot find property' }, status: :not_found if !property
  
        begin
          @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
          render 'api/bookings/create', status: :created
        rescue ArgumentError => e
          render json: { error: e.message }, status: :bad_request
        end
      end
  
      def get_property_bookings
        property = Property.find_by(id: params[:id])
        return render json: { error: 'cannot find property' }, status: :not_found if !property
  
        @bookings = property.bookings.where("end_date > ? ", Date.today)
        render 'api/bookings/index'
      end

      def get_booking_by_id 
        booking = Booking.find_by(id: params[:id])
        property = Property.find_by(id: booking.property_id)

        if booking && property
          render json: {
            start_date: booking.start_date,
            end_date: booking.end_date,
            property_id: booking.property_id,
            image_url: property.image_url,
            property_title: property.title,
            property_description: property.description
          }, status: :ok
        else
          render json: { error: 'Record not found. Invalid ID.' }, status: :not_found
        end
      end
  
      private
  
      def booking_params
        params.require(:booking).permit(:property_id, :start_date, :end_date)
      end
    end
  end