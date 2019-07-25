# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/xenial64"

  config.vm.define "theolex.local", primary: true do |app|
    app.vm.hostname = "theolex"

    app.vm.network "private_network", type: "dhcp"
  end

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--name", "SG - Theolex", "--memory", "1024"]
  end

  # For local development, uncommenting and editing the line below will enable
  # a folder in the host machine containing your local git repo to be synced to
  # the guest machine. Ensure the Ansible playbook variable "setup_git_repo" is
  # set to "no" (in env_vars/vagrant.yml) when enabling this.
  config.vm.synced_folder ".", "/webapps/theolex/theolex" , type: "nfs"

  # Ansible provisioner.
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provisioning/vagrant.yml"
    ansible.host_key_checking = false
    ansible.verbose = "vv"
  end
end
