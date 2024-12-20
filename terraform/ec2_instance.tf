data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

# EC2 Instance
resource "aws_instance" "yytermi_ubuntu_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = aws_key_pair.yytermi_key_pair.key_name  # Reference to the key pair
  security_groups = [
    aws_security_group.yytermi_security_group.name         # Reference to the security group
  ]

  # Associate the IAM Instance Profile
  iam_instance_profile = aws_iam_instance_profile.ec2_instance_profile.name

  tags = {
    Name = "yytermi-UbuntuServer"
  }
}

# EIP Association
resource "aws_eip_association" "yytermi_eip_attach" {
  instance_id   = aws_instance.yytermi_ubuntu_server.id
  allocation_id = aws_eip.yytermi_static_ip.id
}

# IAM Role for EC2
resource "aws_iam_role" "ec2_instance_role" {
  name               = "ec2_instance_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# Attach ECR Full Access Policy to IAM Role
resource "aws_iam_role_policy_attachment" "ec2_ecr_access" {
  role       = aws_iam_role.ec2_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

# Instance Profile
resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "ec2_instance_profile"
  role = aws_iam_role.ec2_instance_role.name
}
