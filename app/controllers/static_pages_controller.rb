class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def success
    # Find user by session token
    booking = Booking.find_by(id: params[:id])
    @booking_id = booking.id

    # If there is no valid booking from id, show error page
    if not booking
      render 'general_error'
    else
      render 'success'
    end
  end
end
