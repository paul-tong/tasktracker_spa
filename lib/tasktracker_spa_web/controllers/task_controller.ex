defmodule TasktrackerSpaWeb.TaskController do
  use TasktrackerSpaWeb, :controller

  alias TasktrackerSpa.Tasks
  alias TasktrackerSpa.Tasks.Task

  action_fallback TasktrackerSpaWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end

  # get unassigned tasks created by a specific user
  def get_unassigned_tasks(conn, %{"id" => id}) do
    tasks = Tasks.get_unassigned_tasks(id)
    render(conn, "index.json", tasks: tasks)
  end

  # get uncompleted tasks assigned to a specific user
  def get_assigned_uncompleted_tasks(conn, %{"id" => id}) do
    tasks = Tasks.get_assigned_uncompleted_tasks(id)
    render(conn, "index.json", tasks: tasks)
  end

  # get completed tasks assigned to a specific user
  def get_assigned_completed_tasks(conn, %{"id" => id}) do
    tasks = Tasks.get_assigned_completed_tasks(id)
    render(conn, "index.json", tasks: tasks)
  end

end
