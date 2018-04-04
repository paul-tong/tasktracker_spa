defmodule TasktrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :descrip, :string
    field :isCompleted, :boolean, default: false
    field :time, :integer, default: 0
    field :title, :string
    field :user_id_assign, :integer, default: -1
    field :user_id_create, :integer

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :descrip, :isCompleted, :time, :user_id_assign, :user_id_create])
    |> validate_required([:title, :descrip, :user_id_create])
    |> validate_number(:time, greater_than_or_equal_to: 0)
  end
end
