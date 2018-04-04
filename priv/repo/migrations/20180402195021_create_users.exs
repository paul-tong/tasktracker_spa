defmodule TasktrackerSpa.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :pass, :string, null: false

      timestamps()
    end

  end
end
