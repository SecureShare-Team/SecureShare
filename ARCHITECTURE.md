# SecureShare 프로젝트 구조 가이드

이 문서는 SecureShare 프로젝트의 전체 디렉토리 구조와 각 폴더의 목적을 설명합니다.

## 최상위 구조

```
SecureShare/
├── backend/              # Node.js + Express 백엔드 서버
├── frontend/             # React 프론트엔드 애플리케이션
├── infrastructure/       # AWS/Kubernetes 인프라 설정
├── docs/                 # 프로젝트 문서
├── docker-compose.yml    # 개발 환경 Docker 설정
├── .gitignore           # Git 제외 파일 설정
├── README.md            # 프로젝트 메인 문서
└── CHANGELOG.md         # 변경 기록
```

## Backend 구조

```
backend/
├── src/
│   ├── app.js                       # Express 애플리케이션 설정
│   ├── server.js                    # 서버 실행 파일
│   │
│   ├── config/                      # 설정 파일
│   │   ├── db.js                    # MySQL 데이터베이스 연결
│   │   ├── env.js                   # 환경변수 검증
│   │   ├── jwt.js                   # JWT 설정
│   │   ├── aws.js                   # AWS SDK 초기화
│   │   ├── s3.js                    # S3 클라이언트
│   │   └── security.js              # 보안 설정 (helmet, cors)
│   │
│   ├── routes/                      # API 라우트
│   │   ├── index.js                 # 모든 라우트 통합
│   │   ├── auth.route.js            # 인증 (회원가입, 로그인, 로그아웃)
│   │   ├── user.route.js            # 사용자 관리 API
│   │   ├── file.route.js            # 파일 업로드/다운로드 API
│   │   ├── folder.route.js          # 폴더 관리 API
│   │   ├── share.route.js           # 파일 공유 API
│   │   ├── admin.route.js           # 관리자 전용 API
│   │   └── audit.route.js           # 감사 로그 API
│   │
│   ├── controllers/                 # 요청 처리 로직
│   │   ├── auth.controller.js       # 인증 관련 로직
│   │   ├── user.controller.js       # 사용자 CRUD
│   │   ├── file.controller.js       # 파일 업로드/다운로드 처리
│   │   ├── folder.controller.js     # 폴더 관리 처리
│   │   ├── share.controller.js      # 공유 권한 처리
│   │   ├── admin.controller.js      # 관리자 기능 처리
│   │   └── audit.controller.js      # 감사 로그 조회
│   │
│   ├── services/                    # 비즈니스 로직
│   │   ├── auth.service.js          # 인증 로직
│   │   ├── user.service.js          # 사용자 관리 로직
│   │   ├── file.service.js          # 파일 관리 로직
│   │   ├── folder.service.js        # 폴더 관리 로직
│   │   ├── share.service.js         # 공유 권한 로직
│   │   ├── permission.service.js    # 권한 확인 로직
│   │   ├── s3.service.js            # S3 파일 전송 로직
│   │   ├── encryption.service.js    # 파일 암호화 로직
│   │   ├── audit.service.js         # 감사 로그 기록
│   │   └── notification.service.js  # 이메일 알림 (선택)
│   │
│   ├── models/                      # Sequelize 데이터베이스 모델
│   │   ├── user.model.js            # 사용자 모델
│   │   ├── role.model.js            # 역할 모델
│   │   ├── file.model.js            # 파일 모델
│   │   ├── folder.model.js          # 폴더 모델
│   │   ├── fileShare.model.js       # 파일 공유 모델
│   │   ├── folderShare.model.js     # 폴더 공유 모델
│   │   └── auditLog.model.js        # 감사 로그 모델
│   │
│   ├── middlewares/                 # Express 미들웨어
│   │   ├── auth.middleware.js       # JWT 인증 검증
│   │   ├── rbac.middleware.js       # 역할 기반 권한 검증
│   │   ├── validation.middleware.js # 요청 데이터 검증
│   │   ├── upload.middleware.js     # Multer 파일 업로드 처리
│   │   ├── audit.middleware.js      # 자동 감사 로깅
│   │   ├── rateLimiter.middleware.js# API 속도 제한
│   │   └── error.middleware.js      # 에러 핸들링
│   │
│   ├── validators/                  # 입력 검증 규칙
│   │   ├── auth.validator.js        # 인증 입력 검증
│   │   ├── file.validator.js        # 파일 입력 검증
│   │   └── user.validator.js        # 사용자 입력 검증
│   │
│   ├── utils/                       # 유틸리티 함수
│   │   ├── logger.js                # Winston 로거
│   │   ├── crypto.js                # 암호화 유틸
│   │   ├── response.js              # 표준 API 응답 포맷
│   │   └── asyncHandler.js          # 비동기 에러 처리
│   │
│   └── constants/                   # 상수 정의
│       ├── errorCodes.js            # 에러 코드
│       ├── permissions.js           # 권한 정의
│       └── roles.js                 # 역할 정의
│
├── migrations/                      # 데이터베이스 마이그레이션
│   ├── 001-create-users.js
│   ├── 002-create-roles.js
│   ├── 003-create-folders.js
│   ├── 004-create-files.js
│   ├── 005-create-file-shares.js
│   └── 006-create-audit-logs.js
│
├── seeders/                         # 초기 데이터 입력
│   ├── 001-create-roles.js          # 기본 역할 생성
│   └── 002-create-admin.js          # 초기 관리자 계정 생성
│
├── tests/                           # 테스트 케이스
│   ├── unit/                        # 단위 테스트
│   │   ├── auth.test.js
│   │   └── file.test.js
│   ├── integration/                 # 통합 테스트
│   │   ├── auth.integration.test.js
│   │   └── file.integration.test.js
│   └── fixtures/                    # 테스트 데이터
│
├── uploads/                         # 임시 파일 업로드 (로컬)
├── logs/                            # 로그 파일
├── .env.example                     # 환경변수 템플릿
├── .env.development                 # 로컬 개발용 환경변수
├── .env.production                  # 프로덕션용 환경변수
├── package.json                     # npm 의존성
├── ecosystem.config.js              # PM2 설정 (프로덕션 배포)
├── jest.config.js                   # Jest 테스트 설정
└── README.md                        # 백엔드 문서
```

## Frontend 구조

```
frontend/
├── public/                          # 정적 파일
│   ├── index.html                   # HTML 진입점
│   └── favicon.ico
│
├── src/
│   ├── index.jsx                    # React 진입점
│   ├── App.jsx                      # 메인 애플리케이션 컴포넌트
│   ├── App.css                      # 스타일시트
│   ├── index.css                    # 글로벌 스타일
│   │
│   ├── routes/
│   │   └── index.jsx                # 라우트 정의
│   │
│   ├── pages/                       # 페이지 컴포넌트
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx        # 로그인 페이지
│   │   │   ├── RegisterPage.jsx     # 회원가입 페이지
│   │   │   └── PendingApprovalScreen.jsx # 승인 대기 화면
│   │   │
│   │   ├── drive/
│   │   │   ├── MyDrivePage.jsx      # 마이 드라이브 (홈)
│   │   │   ├── SharedPage.jsx       # 공유된 파일 목록
│   │   │   ├── StarredPage.jsx      # 별 표시한 파일
│   │   │   ├── TrashPage.jsx        # 휴지통
│   │   │   ├── FolderDetailPage.jsx # 폴더 상세 보기
│   │   │   └── FileDetailPage.jsx   # 파일 상세 보기
│   │   │
│   │   └── admin/
│   │       ├── UserManagementPage.jsx  # 사용자 관리
│   │       ├── PendingApprovalPage.jsx # 승인 대기 사용자
│   │       ├── AuditLogsPage.jsx       # 감사 로그
│   │       └── SystemSettingsPage.jsx  # 시스템 설정
│   │
│   ├── components/                  # 재사용 가능한 컴포넌트
│   │   ├── layout/
│   │   │   ├── Layout.jsx           # 기본 레이아웃
│   │   │   ├── AdminLayout.jsx      # 관리자 레이아웃
│   │   │   ├── Sidebar.jsx          # 사이드바
│   │   │   └── Header.jsx           # 헤더
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx           # 공용 버튼
│   │   │   ├── Modal.jsx            # 모달 다이얼로그
│   │   │   ├── LoadingSpinner.jsx   # 로딩 표시기
│   │   │   └── ErrorBoundary.jsx    # 에러 경계
│   │   │
│   │   ├── file/
│   │   │   ├── FileList.jsx         # 파일 목록
│   │   │   ├── FileItem.jsx         # 파일 아이템
│   │   │   ├── FileUpload.jsx       # 파일 업로드
│   │   │   ├── FilePreview.jsx      # 파일 미리보기
│   │   │   └── FileContextMenu.jsx  # 파일 컨텍스트 메뉴
│   │   │
│   │   ├── folder/
│   │   │   ├── FolderTree.jsx       # 폴더 트리 구조
│   │   │   ├── CreateFolderModal.jsx# 폴더 생성 모달
│   │   │   └── FolderBreadcrumb.jsx # 폴더 경로 표시
│   │   │
│   │   ├── share/
│   │   │   ├── ShareModal.jsx       # 공유 모달
│   │   │   ├── PermissionSelector.jsx# 권한 선택기
│   │   │   └── SharedUsersList.jsx  # 공유된 사용자 목록
│   │   │
│   │   └── admin/
│   │       ├── UserTable.jsx        # 사용자 테이블
│   │       ├── ApprovalCard.jsx     # 승인 카드
│   │       └── AuditLogTable.jsx    # 감사 로그 테이블
│   │
│   ├── hooks/                       # 커스텀 React 훅
│   │   ├── useAuth.js               # 인증 상태
│   │   ├── useFileUpload.js         # 파일 업로드
│   │   ├── usePermissions.js        # 권한 확인
│   │   └── useDebounce.js           # 디바운스
│   │
│   ├── contexts/                    # React Context
│   │   ├── AuthContext.jsx          # 인증 상태 관리
│   │   └── ThemeContext.jsx         # 테마 상태 관리
│   │
│   ├── services/                    # API 호출 서비스
│   │   ├── api.js                   # Axios 인스턴스
│   │   ├── authService.js           # 인증 API
│   │   ├── fileService.js           # 파일 API
│   │   ├── folderService.js         # 폴더 API
│   │   ├── shareService.js          # 공유 API
│   │   └── adminService.js          # 관리자 API
│   │
│   ├── utils/                       # 유틸리티 함수
│   │   ├── formatters.js            # 날짜, 파일크기 포맷
│   │   ├── validators.js            # 검증 함수
│   │   └── constants.js             # 상수
│   │
│   ├── assets/
│   │   ├── images/                  # 이미지 파일
│   │   └── styles/
│   │       └── globals.css          # 글로벌 스타일
│   │
│   └── config/
│       └── env.js                   # 환경변수
│
├── .env.example                     # 환경변수 템플릿
├── .env.development                 # 로컬 개발용 환경변수
├── .env.production                  # 프로덕션용 환경변수
├── .gitignore
├── package.json                     # npm 의존성
├── tailwind.config.js               # Tailwind CSS 설정
├── postcss.config.js                # PostCSS 설정
└── README.md                        # 프론트엔드 문서
```

## Infrastructure 구조

```
infrastructure/
├── terraform/                      # Terraform IaC
│   ├── main.tf                     # 메인 설정
│   ├── variables.tf                # 입력 변수
│   ├── outputs.tf                  # 출력 값
│   └── backend.tf                  # 상태 저장소 설정
│
├── kubernetes/                     # Kubernetes 설정
│   ├── deployment.yaml             # 배포 설정
│   ├── service.yaml                # 서비스 설정
│   ├── ingress.yaml                # 인그레스 설정
│   └── database.yaml               # 데이터베이스 설정
│
├── docker/                         # Docker 설정
│   ├── Dockerfile.backend          # 백엔드 이미지
│   └── Dockerfile.frontend         # 프론트엔드 이미지
│
└── README.md
```

## Docs 구조

```
docs/
├── api.md                          # REST API 명세서
├── database.md                     # 데이터베이스 설계
└── deployment.md                   # 배포 가이드
```

## 주요 파일 설명

### Backend
- **app.js**: Express 앱 초기화, 미들웨어 설정
- **server.js**: HTTP 서버 실행
- **package.json**: npm 의존성 및 스크립트 정의

### Frontend
- **index.jsx**: React 애플리케이션 부팅
- **App.jsx**: 메인 애플리케이션 레이아웃 및 라우팅
- **package.json**: npm 의존성 및 스크립트

### Root
- **docker-compose.yml**: 개발 환경 포함 모든 서비스 정의
- **.gitignore**: Git이 추적할 파일 제외
- **README.md**: 프로젝트 전체 문서

## 파일 작명 규칙

- **Controller**: `<영역>.controller.js` (예: user.controller.js)
- **Service**: `<영역>.service.js` (예: file.service.js)
- **Model**: `<영역>.model.js` (예: file.model.js)
- **Route**: `<영역>.route.js` (예: auth.route.js)
- **Middleware**: `<이름>.middleware.js` (예: auth.middleware.js)
- **Component**: PascalCase (예: FileUpload.jsx, LoginPage.jsx)
- **Hook**: `use<Name>` (예: useAuth.js, usePermissions.js)

## 데이터 흐름

### 파일 업로드
1. 사용자가 프론트엔드에서 파일 선택
2. FileUpload 컴포넌트가 파일 처리
3. fileService.js를 통해 백엔드 API 호출
4. upload.middleware가 파일 수신
5. file.controller가 로직 처리
6. file.service가 S3에 업로드 및 DB에 기록
7. 응답이 프론트엔드로 반환

### 사용자 인증
1. 사용자가 로그인 폼 제출
2. LoginPage가 authService.login() 호출
3. auth.controller가 자격증명 검증
4. JWT 토큰 생성 및 클라이언트에 반환
5. 토큰은 localStorage에 저장
6. 이후 요청에 Authorization 헤더에 포함

## 확장 시 고려사항

새로운 기능 추가 시:
1. 데이터베이스 마이그레이션 생성
2. 모델 정의
3. 서비스 로직 구현
4. 컨트롤러 작성
5. 라우트 연결
6. 프론트엔드 컴포넌트 작성
7. API 서비스 함수 작성
8. 테스트 작성

---

이 구조는 MVC 패턴을 따르며, 확장성과 유지보수성을 고려하여 설계되었습니다.
