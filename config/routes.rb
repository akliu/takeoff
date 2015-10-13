Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create]
  resources :session, only: [:new, :create, :destroy]
  resources :static_pages, only: [:index]
end
