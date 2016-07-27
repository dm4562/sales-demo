Rails.application.routes.draw do
  devise_for :users
  resources :heros
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#show'
  # get '/app' => 'static#index', via: get
end
