# Theolex

Theolex project (predicitive justice)

## Team

* Louis Nicolle

## Requirements

* Vagrant
* Ansible > 2.5

## Installation

* Create a new python virtual environment and source it
* Clone this project
* run ```pip install -r requirements.txt```
* run ```python manage.py runserver```

## Installation with Vagrant (iso-prod)

```shell
make vagrant
```

## Provisioning
You need to have access to the server: `ssh ubuntu@theolex.sicara.tech`

```shell
make provision
```

## Deployment
You need to have access to the server: `ssh ubuntu@theolex.sicara.tech`

```shell
make deploy
```
