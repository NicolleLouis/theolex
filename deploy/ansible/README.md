# Ansible Scripts with Google Cloud Platform

## Prequisite 

- Create ssh key on local machine
- Add ssh key following this tutorial [https://www.youtube.com/watch?v=Z_ePcvnjQb4](https://www.youtube.com/watch?v=Z_ePcvnjQb4)
- Manage ssh connexion [https://cloud.google.com/compute/docs/instances/connecting-advanced](https://cloud.google.com/compute/docs/instances/connecting-advanced)

## Manage different GCP projects configuration
Follow this tutorial [https://devopscube.com/use-multip-gcloud-configurations/](https://devopscube.com/use-multipl-gcloud-configurations/)


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
