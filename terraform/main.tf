provider "aws" {
  region = "us-east-1"  # Specify your AWS region here
}

# Variables for configuration
variable "instance_type" {
  default = "t3.micro"  # Choose an instance type (AWS Free Tier eligible)
}

variable "key_name" {
  description = "Name of the key pair"
  default     = "yytermi-key-pair"  # Replace with your actual key pair name
}

variable "security_group_name" {
  default = "yytermi-security-group"
}

# Security group allowing SSH, HTTP, and HTTPS access
resource "aws_security_group" "yytermi_security_group" {
  name        = var.security_group_name
  description = "Security group for yytermi Ubuntu server allowing SSH, HTTP, and HTTPS"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Find the latest Ubuntu 20.04 LTS AMI for the specified region
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical (Ubuntu) owner ID

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

# EC2 instance running Ubuntu 20.04
resource "aws_instance" "yytermi_ubuntu_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name      = var.key_name
  security_groups = [
    aws_security_group.yytermi_security_group.name
  ]

  tags = {
    Name = "yytermi-UbuntuServer"
  }
}

