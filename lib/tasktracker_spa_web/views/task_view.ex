defmodule TasktrackerSpaWeb.TaskView do
  use TasktrackerSpaWeb, :view
  alias TasktrackerSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      descrip: task.descrip,
      isCompleted: task.isCompleted,
      time: task.time,
      user_id_assign: task.user_id_assign,
      user_id_create: task.user_id_create}
  end
end
