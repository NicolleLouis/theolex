# Ansible Scripts with Google Cloud Platform

## Prequisite 

- Create ssh key on local machine
- Add ssh key following this tutorial [https://www.youtube.com/watch?v=Z_ePcvnjQb4](https://www.youtube.com/watch?v=Z_ePcvnjQb4)
- Manage ssh connexion [https://cloud.google.com/compute/docs/instances/connecting-advanced](https://cloud.google.com/compute/docs/instances/connecting-advanced)

## Manage different GCP projects configuration
Follow this tutorial [https://devopscube.com/use-multipl-gcloud-configurations/](https://devopscube.com/use-multipl-gcloud-configurations/)

## Configure ansible and gcloud
Follow these documentation :
<br>
- Install apache libcloud and configure gce 
<br> [https://devopscube.com/ansible-dymanic-inventry-google-cloud/](https://devopscube.com/ansible-dymanic-inventry-google-cloud/)
<br> [https://medium.com/vimeo-engineering-blog/orchestrating-gce-instances-with-ansible-d825a33793cd](https://medium.com/vimeo-engineering-blog/orchestrating-gce-instances-with-ansible-d825a33793cd)

- Don't forget to restart terminal after setting GCE_INI_PATH in .bash_profile

To test ansible/gcloud config:
<br>`ansible -i /opt/ansible/inventory tag_http-server -m ping --user [gcp_user]`


# Playbooks
### Setup environment

`ansible-playbook -i /opt/ansible/inventory setup.yml --user [gcp-user] --extra-vars '{"gcp_instance":"[gcp-instance-name]"}`

# Staging workflow (no CI) TODO 
- Setup staging VM
- Fetch git theolex repo on Staging VM TODO
- Install source dependencies (npm)
- Run Tests
- Build Docker image
- Run Docker image

# Production workflow TODO
- Hook github to GCP Cloud Build
- Run tests and if ok then build Docker image on GCP Cloud Build
- After docker image build, push to GCP Container Registry
- Manual script to deploy Docker image from Container Registry to Production VM 

# Google Cloud configuration

## Build theolex-front
Use `theolex` user
<br>`su - theolex`

## Create .env file
<br>`/home/theolex/theolex/front/$ echo "PORT=3000" > .env`

## Build Image
<br>`/home/theolex/theolex/front/$ docker build -t theolex-front .`

## Run Image in Production mode
- Run  in `theolex/front/`
<br>`/home/theolex/theolex/front/$ docker container run --name theolex-front -p 3000:3000 -d theolex-front`

## Create firewall rule
Follow documentation 
- [Google Cloud](https://cloud.google.com/vpc/docs/firewalls#firewall_rule_components)
- [StackOverflow](https://stackoverflow.com/questions/21065922/how-to-open-a-specific-port-such-as-9090-in-google-compute-engine)

| Nom | Type | Cibles | Filtres | Protocoles/Ports | Action | Priorité | Réseau |
| ----| ---- | ------ | ------- | ---------------- | ------ | -------- | ------ |
| allow-http-3000| Entrée | http-server | Plages d'adresses IP: 0.0.0.0/0 | tcp:3000 | Autoriser | 1000 | default |

## Access to url
http only 
<br>[http://34.77.130.212:3000/](http://34.77.130.212:3000/)