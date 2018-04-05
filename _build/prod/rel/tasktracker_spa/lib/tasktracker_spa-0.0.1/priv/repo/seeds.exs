# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TasktrackerSpa.Repo.insert!(%TasktrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias TasktrackerSpa.Repo
  alias TasktrackerSpa.Users.User
  alias TasktrackerSpa.Tasks.Task

  def run do
    Repo.delete_all(User)
    p = Comeonin.Argon2.hashpwsalt("password1")
    a = Repo.insert!(%User{ name: "irving", password_hash: p })
    b = Repo.insert!(%User{ name: "kobe", password_hash: p })
    c = Repo.insert!(%User{ name: "james", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id_create: a.id, user_id_assign: -1, title: "finish hw08", descrip: "let's finish hw08", isCompleted: false, time: 0})
    Repo.insert!(%Task{ user_id_create: a.id, user_id_assign: -1, title: "finish pro2", descrip: "let's finish pro2", isCompleted: false, time: 0})
    Repo.insert!(%Task{ user_id_create: b.id, user_id_assign: a.id, title: "eat lunch", descrip: "let's eat lunch", isCompleted: false, time: 15})
    Repo.insert!(%Task{ user_id_create: b.id, user_id_assign: a.id, title: "eat dinner", descrip: "let's eat dinner", isCompleted: false, time: 30})
    Repo.insert!(%Task{ user_id_create: c.id, user_id_assign: a.id, title: "watch nba", descrip: "let's watch nba", isCompleted: true, time: 60})
    Repo.insert!(%Task{ user_id_create: b.id, user_id_assign: a.id, title: "play basketball", descrip: "let's play basketball", isCompleted: true, time: 45})
  end
end

Seeds.run

