defmodule TasktrackerSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :descrip, :text
      add :isCompleted, :boolean, default: false, null: false
      add :time, :integer, default: 0
      add :user_id_assign, :integer
      add :user_id_create, :integer, null: false

      timestamps()
    end

  end
end
