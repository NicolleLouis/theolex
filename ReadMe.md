# Installation

Todo

# Connection do postgresql database

- Install <code>gcloud</code> tools with this [link](https://cloud.google.com/sdk/docs/#install_the_latest_cloud_sdk_version)
- Install <code>cloud_sql_proxy</code> tool with this [link](https://cloud.google.com/sql/docs/postgres/quickstart-proxy-test)
  - Download the correct <code>cloud_sql_proxy</code> binary for the corresponding OS (linux, macos)
- Check that the port <code>5432</code> is free on the machine running the script (usually taken if a Postgresql database is running locally)
- Run Makefile by executing <code> make local-proxy </code>


Database credentials are the following:

- Host: 127.0.0.1
- Port: 5432
- Database: theolex
Ask Louis for user and password