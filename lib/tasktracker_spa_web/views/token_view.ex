defmodule TasktrackerSpaWeb.TokenView do
  use TasktrackerSpaWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      token: token,
    }
  end
end
