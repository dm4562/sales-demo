Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # devise_for :users
  resources :heros
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'top_four_heroes', to: 'heros#top_four'

  resources :destinations
  get 'top_destinations', to: 'destinations#top_four'
  get 'all_destinations', to: 'destinations#all'
  get 'destinations_overview', to: 'destinations#overview'
end
