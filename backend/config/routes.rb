Rails.application.routes.draw do
  post 'oauth/connect'

  resources :oauth_credentials, only: [:index]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
