use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :tasktracker_spa, TasktrackerSpaWeb.Endpoint,
  secret_key_base: "KGn57frYDgxSpnTl9rCMaDP9WMW3R228thkwoDGzsglscbGdWtmWGjHb42SQ2EhJ"

# Configure your database
config :tasktracker_spa, TasktrackerSpa.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "tasktracker_spa_prod",
  pool_size: 15
