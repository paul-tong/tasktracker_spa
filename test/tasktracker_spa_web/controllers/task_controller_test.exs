defmodule TasktrackerSpaWeb.TaskControllerTest do
  use TasktrackerSpaWeb.ConnCase

  alias TasktrackerSpa.Tasks
  alias TasktrackerSpa.Tasks.Task

  @create_attrs %{descrip: "some descrip", isCompleted: true, time: 42, title: "some title", user_id_assign: 42, user_id_create: 42}
  @update_attrs %{descrip: "some updated descrip", isCompleted: false, time: 43, title: "some updated title", user_id_assign: 43, user_id_create: 43}
  @invalid_attrs %{descrip: nil, isCompleted: nil, time: nil, title: nil, user_id_assign: nil, user_id_create: nil}

  def fixture(:task) do
    {:ok, task} = Tasks.create_task(@create_attrs)
    task
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tasks", %{conn: conn} do
      conn = get conn, task_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create task" do
    test "renders task when data is valid", %{conn: conn} do
      conn = post conn, task_path(conn, :create), task: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, task_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "descrip" => "some descrip",
        "isCompleted" => true,
        "time" => 42,
        "title" => "some title",
        "user_id_assign" => 42,
        "user_id_create" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, task_path(conn, :create), task: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update task" do
    setup [:create_task]

    test "renders task when data is valid", %{conn: conn, task: %Task{id: id} = task} do
      conn = put conn, task_path(conn, :update, task), task: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, task_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "descrip" => "some updated descrip",
        "isCompleted" => false,
        "time" => 43,
        "title" => "some updated title",
        "user_id_assign" => 43,
        "user_id_create" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, task: task} do
      conn = put conn, task_path(conn, :update, task), task: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete task" do
    setup [:create_task]

    test "deletes chosen task", %{conn: conn, task: task} do
      conn = delete conn, task_path(conn, :delete, task)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, task_path(conn, :show, task)
      end
    end
  end

  defp create_task(_) do
    task = fixture(:task)
    {:ok, task: task}
  end
end
