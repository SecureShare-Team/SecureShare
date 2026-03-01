### SecureShare Infrastructure

이 디렉토리는 AWS 또는 기타 클라우드 인프라스트럭처 설정을 포함합니다.

## 디렉토리 구조

```
infrastructure/
├── terraform/          # Terraform IaC 설정
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── backend.tf
├── kubernetes/        # Kubernetes 설정 (선택사항)
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── docker/           # Docker 이미지 설정
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
└── README.md
```

## 주요 구성 요소

### AWS 리소스
- RDS MySQL 인스턴스
- S3 버킷 (파일 저장)
- CloudFront (이미지 배포)
- EC2 또는 ECS (애플리케이션)
- VPC, 보안 그룹
