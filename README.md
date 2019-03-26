# Theolex

Theolex project (predicitive justice) with société général

## Team

* (TT) Louis Nicolle
* (TT) Vincent Quagliaro
* (CA) Peneloppe de Warren
* (DP) Geoffroy de Boissieu

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