# Output the EC2 instance's public IP address
output "public_ip" {
  value = aws_instance.yytermi_ubuntu_server.public_ip
}

# Output the private key for the key pair created by Terraform (sensitive)
output "private_key_pem" {
  value     = tls_private_key.ec2_key.private_key_pem
  sensitive = true
}

