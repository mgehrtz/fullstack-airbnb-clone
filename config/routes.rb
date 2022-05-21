Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/booking/:id/success' => 'static_pages#success'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/bookings/:id' => 'bookings#get_booking_by_id'
    get '/authenticated' => 'sessions#authenticated'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

    # logout
    delete '/sessions' => 'sessions#destroy'

  end

end


# /user/:id/properties
# /user/bookings
# /property/:id/edit
# /property/new
# /property/:id/bookings

# /api/properties/create
# /api/properties/update
# /api/properties/index_by_user
# /api/bookings/index_by_property