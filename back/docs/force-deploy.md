# Force Deployment

## When to force deploy?

- There was a local modification on the server
- You see an error at the step "web : Setup the Git repo" during deployment

## How to force deploy? 

- Change the following file: theolex/provisioning/roles/web/tasks/setup_git_repo.yml
- Copy: 'force=true' in it, like this:
```
- name: Setup the Git repo
  git: repo={{ git_repo }}
       version={{ git_branch }}
       dest={{ project_path }}
       accept_hostkey=yes
       force=true
  when: setup_git_repo is defined and setup_git_repo
  notify: restart application
  tags: git

- name: Delete all .pyc files
  command: find . -name '*.pyc' -delete
  args:
    chdir: "{{ project_path }}"
  tags: git
  changed_when: False

```