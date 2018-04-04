defmodule TasktrackerSpaWeb.Router do
  use TasktrackerSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasktrackerSpaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks", PageController, :index
    get "/users/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TasktrackerSpaWeb do
  #   pipe_through :api
  # end

  scope "/api/v1", TasktrackerSpaWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/unassigned_tasks", TaskController, :get_unassigned_tasks
    post "/assigned_uncompleted_tasks", TaskController, :get_assigned_uncompleted_tasks
    post "/assigned_completed_tasks", TaskController, :get_assigned_completed_tasks
  end

end
