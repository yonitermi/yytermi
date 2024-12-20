output "public_ip" {
  value = aws_instance.yytermi_ubuntu_server.public_ip
}

output "private_key_pem" {
  value     = tls_private_key.ec2_key.private_key_pem
  sensitive = true
}

output "ecr_repository_uri" {
  value = aws_ecr_repository.yytermi_react_repo.repository_url
}
