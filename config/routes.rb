Shoutzor::Application.routes.draw do

  # 
  # Vote related requests
  #   
  get :vote_for, :action => :vote_for, :controller => :vote 
  get :coming_up, :action => :coming_up, :controller => :vote
  get :playlist, :action => :playlist, :controller => :vote
  get :history, :action => :history, :controller => :vote
  
  #
  # Search related requests
  #
  get :search, :action => :find, :controller => :search
  get :list, :action => :list, :controller => :search

  #
  # Now playing request
  #
  get :now_playing, :action => :now_playing, :controller => :status

  get :html, :action => :html, :controller => :application

  #
  # Authentication requests
  #
  get :login, :action => :login, :controller => :authentication
  get :logout, :action => :logout, :controller => :authentication
  post :request_pin, :action => :request_pin, :controller => :authentication
  post :authenticate, :action => :authenticate, :controller => :authentication

  root :to => "application#index"


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'


end
