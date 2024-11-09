resource "tls_private_key" "ec2_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "yytermi_key_pair" {
  key_name   = "yytermi-key-pair"
  public_key = tls_private_key.ec2_key.public_key_openssh
}

