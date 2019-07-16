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
`ansible -i /opt/ansible/inventory tag_http-server -m ping --user johann.bertrand.ng`


# Playbooks
### Setup environment

`ansible-playbook -i /opt/ansible/inventory setup.yml --user [gcp-user] --extra-vars '{"gcp_instance":"[gcp-instance-name]"}`