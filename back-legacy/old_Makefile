vagrant:
	vagrant up

provision:
	ansible-playbook -i provisioning/development provisioning/webservers.yml

deploy:
	ansible-playbook -i provisioning/development provisioning/webservers.yml --tags="deploy"
