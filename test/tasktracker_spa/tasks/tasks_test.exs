defmodule TasktrackerSpa.TasksTest do
  use TasktrackerSpa.DataCase

  alias TasktrackerSpa.Tasks

  describe "tasks" do
    alias TasktrackerSpa.Tasks.Task

    @valid_attrs %{descrip: "some descrip", isCompleted: true, time: 42, title: "some title", user_id_assign: 42, user_id_create: 42}
    @update_attrs %{descrip: "some updated descrip", isCompleted: false, time: 43, title: "some updated title", user_id_assign: 43, user_id_create: 43}
    @invalid_attrs %{descrip: nil, isCompleted: nil, time: nil, title: nil, user_id_assign: nil, user_id_create: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tasks.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tasks.create_task(@valid_attrs)
      assert task.descrip == "some descrip"
      assert task.isCompleted == true
      assert task.time == 42
      assert task.title == "some title"
      assert task.user_id_assign == 42
      assert task.user_id_create == 42
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, task} = Tasks.update_task(task, @update_attrs)
      assert %Task{} = task
      assert task.descrip == "some updated descrip"
      assert task.isCompleted == false
      assert task.time == 43
      assert task.title == "some updated title"
      assert task.user_id_assign == 43
      assert task.user_id_create == 43
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
