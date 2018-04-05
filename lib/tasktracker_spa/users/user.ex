defmodule TasktrackerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    field :password_hash, :string
    field :pass, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :pass])
    |> validate_required([:name])
  end
end
