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

# Local install
- Start server: 
`make python-up`

- Populate database schema: 
`make migrations`

- Create Superuser:
`docker exec -it back_web_1 python manage.py createsuperuser`
then connect to http://localhost:8000/admin/

- From server admin page, import csv files:
    - decision.csv
    - authorities.csv
    - violations.csv
    - organizations.csv

- Consolidate data:
    - `docker exec -it back_web_1 python manage.py import_decision_authority`
    - `docker exec -it back_web_1 python manage.py import_decision_organization`
    - `docker exec -it back_web_1 python manage.py import_decision_violation`

