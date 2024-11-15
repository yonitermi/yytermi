#!/bin/bash

# Function to check if a package is installed
is_installed() {
    dpkg -l | grep -qw "$1"
}

# Update the package index
sudo apt-get update

# Install required dependencies
sudo apt-get install -y software-properties-common apt-transport-https ca-certificates curl gnupg-agent

# Check if Docker is installed
if ! is_installed docker-ce; then
    echo "Installing Docker..."
    # Add Docker’s official GPG key and Docker repository
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) \
       stable"

    # Install the latest version of Docker
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io

    # Allow the current user to run Docker commands without sudo
    sudo usermod -aG docker $USER
else
    echo "Docker is already installed."
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    # Install the latest Docker Compose (v2 as a Docker plugin)
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*?(?=")')
    sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

    # Set permissions for Docker Compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose is already installed."
fi

# Output versions
echo "Installed Docker version:"
docker --version

echo "Installed Docker Compose version:"
docker-compose --version


# Reminder for group changes
echo "Please log out and log back in (or reboot) for Docker group changes to take effect."
