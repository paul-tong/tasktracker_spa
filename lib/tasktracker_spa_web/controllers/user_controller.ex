defmodule TasktrackerSpaWeb.UserController do
  use TasktrackerSpaWeb, :controller

  alias TasktrackerSpa.Repo
  alias TasktrackerSpa.Users
  alias TasktrackerSpa.Users.User

  action_fallback TasktrackerSpaWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  # register user with new token
  def register(conn, %{"name" => name, "pass" => pass}) do
    p = Comeonin.Argon2.hashpwsalt(pass)
    user = Repo.insert!(%User{ name: name, password_hash: p })
    render(conn, "show.json", user: user)
  end

end
