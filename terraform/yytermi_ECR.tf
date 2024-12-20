resource "aws_ecr_repository" "yytermi_react_repo" {
  name                 = "yytermi_react"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}
