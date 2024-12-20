resource "aws_eip" "yytermi_static_ip" {
  vpc = true

  tags = {
    Name = "yytermi_static_ip"
  }
}

output "elastic_ip" {
  value = aws_eip.yytermi_static_ip.public_ip
}

output "allocation_id" {
  value = aws_eip.yytermi_static_ip.id
}
