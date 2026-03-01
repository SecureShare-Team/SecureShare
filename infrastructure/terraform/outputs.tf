# Terraform 출력

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = "rds_endpoint_value"
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = "s3_bucket_name_value"
}

output "application_url" {
  description = "Application URL"
  value       = "application_url_value"
}
