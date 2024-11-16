data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

resource "aws_instance" "yytermi_ubuntu_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = aws_key_pair.yytermi_key_pair.key_name  # Reference to the key pair
  security_groups = [
    aws_security_group.yytermi_security_group.name         # Reference to the security group
  ]

  tags = {
    Name = "yytermi-UbuntuServer"
  }
}

resource "aws_eip_association" "yytermi_eip_attach" {
  instance_id   = aws_instance.yytermi_ubuntu_server.id
  allocation_id = aws_eip.yytermi_static_ip.id
}
