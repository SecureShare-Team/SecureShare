# Terraform Backend 설정
# 상태 파일을 S3에 저장하도록 설정

terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "secureshare/terraform.tfstate"
    region         = "ap-northeast-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
