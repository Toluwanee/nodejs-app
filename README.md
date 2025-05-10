# Node.js Service Deployment with Terraform and Ansible on AWS EC2

This repository demonstrates how to deploy a **simple Node.js service** on an **AWS EC2 instance** using **Terraform** to provision the infrastructure and **Ansible** for application deployment. The service will be managed as a **systemd** service, ensuring it runs continuously in the background on port 80.

## Overview

The purpose of this project is to provide a simple deployment process for a Node.js service using automated tools like **Terraform** and **Ansible**. The application will be set up to run as a background service on an AWS EC2 instance. This is a basic example of how infrastructure as code (Terraform) and configuration management (Ansible) can be combined for application deployment.

## Features

- Terraform provisioning of AWS EC2 instance.
- Ansible configuration to install Node.js, clone the repository, and deploy the app.
- systemd service to ensure the app runs in the background.
- Node.js application served on port 80.

---

## Requirements

Before getting started, ensure you have the following:

- **Terraform**: To provision and manage AWS resources.
    - [Install Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- **Ansible**: To automate configuration management and application deployment.
    - [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/index.html)
- **AWS Account**: You will need access to AWS for provisioning EC2 instances and creating IAM policies.
    - [Create AWS Account](https://aws.amazon.com/)
    - [Create AWS Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
- **SSH Key** (optional): Required for SSH access to the EC2 instance if needed for manual troubleshooting.
- **GitHub Account**: If you need to clone a private repository for your Node.js app, ensure your repository is accessible.

---
## How It Works
Terraform provisions an EC2 instance on AWS with the required specifications.

Ansible installs the necessary dependencies (Node.js, npm) on the EC2 instance.

Ansible clones the Node.js app repository, installs the dependencies, and creates a systemd service to ensure the app runs in the background.

The app is served on port 80, and the service is managed via systemd to ensure it stays running.

## Project Setup

### 1. Clone the Repository

```
git clone https://github.com/yourusername/node-service.git
cd node-service
```

### 2. Configure Terraform
Edit the main.tf file to add your AWS Access Key, AWS Secret Key, AWS Region, and SSH Key Name.

```
provider "aws" {
  access_key = "YOUR_AWS_ACCESS_KEY"
  secret_key = "YOUR_AWS_SECRET_KEY"
  region     = "us-east-1"
}
```

### 3. Create EC2 Instance with Terraform
Run Terraform to create the EC2 instance. This will also output the public IP address of the EC2 instance.
```
terraform init
terraform apply
```
Terraform will prompt for confirmation to create the instance. After approval, it will provision the EC2 instance.


### 4. Configure Ansible
Edit the inventory.ini file for Ansible to define the EC2 instance's IP and SSH access. You can find the EC2 instance’s public IP from the Terraform output.
```
[ec2]
your_ec2_ip ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/id_rsa
```
Replace your_ec2_ip with the actual public IP address from the Terraform output.


### 5: Set Up and Deploy the Application
Ensure the Node.js app code is in a GitHub repository.

Run the Ansible playbook to install dependencies, deploy the app, and configure the systemd service:
```
ansible-playbook -i inventory.ini setup.yml --tags app
```
This will:

Install Git, Node.js, and npm on the EC2 instance.

Clone the Node.js app repository.

Install dependencies using npm install.

Set up the app to run as a systemd service (node-app).

Start the app, ensuring it runs on port 80.


### 5. Access the Application
Once the playbook has finished running, you should be able to access the Node.js app in your browser at:

```
http://your_ec2_ip/
```

You should see:
`
Hello, world!
`

##  Systemd Service Management
The application is configured as a systemd service, which ensures it continues running in the background.

### Check Service Status
You can check the status of the service with the following command:
```
systemctl status node-app
```

### Restart the Service
If you need to restart the Node.js application, use:
```
systemctl restart node-app
```

## Troubleshooting
If you encounter issues during setup or after deployment, here are some common solutions:

### Ansible Connection Issues
Ensure your EC2 instance's security group allows inbound SSH traffic on port 22 (if using SSH keys for access).

Double-check that the correct private key is being used in the inventory.ini file.

### Node.js Application Not Running
Check the systemd service logs with the following command:
```
journalctl -u node-app
```

If the service is not running, restart it with:
```
systemctl restart node-app
```

### SSH Access to EC2 Instance
If you're having trouble accessing the EC2 instance via SSH:

Ensure the SSH private key is properly set in the inventory.ini file.

If not using SSH keys, ensure EC2 Instance Connect is properly configured to access the instance.
