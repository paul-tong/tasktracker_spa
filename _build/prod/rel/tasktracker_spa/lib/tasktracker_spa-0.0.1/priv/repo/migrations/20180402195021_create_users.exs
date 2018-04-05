defmodule TasktrackerSpa.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :pass, :string

      timestamps()
    end

  end
end
