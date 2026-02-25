/**
 * models/fileModel.js — files 테이블 CRUD
 *
 * DB 쿼리만 담당. 비즈니스 로직은 service 계층에서 처리
 * services에서 직접 SQL 작성 금지 → 반드시 이 모듈의 함수를 호출
 *
 * 함수 목록:
 *
 *   findById(fileId)
 *     → { id, owner_sub, s3_key, status, sha256, created_at } | null
 *     → 소프트 삭제된 파일(status=DELETED)도 조회됨 (서비스에서 필터링)
 *
 *   findByOwner(ownerSub)
 *     → 해당 사용자가 업로드한 파일 목록 배열 반환
 *     → DELETED 상태 제외
 *
 *   create({ ownerSub, s3Key, sha256 })
 *     → 신규 파일 레코드 INSERT, status=PENDING으로 초기화
 *     → 생성된 fileId 반환
 *
 *   updateStatus(fileId, status)
 *     → files.status 컬럼 업데이트
 *     → status 값은 fileStatus 상수 사용 (CLEAN / INFECTED / DELETED)
 *
 *   softDelete(fileId)
 *     → status=DELETED로 업데이트 (실제 DB 레코드 삭제 X)
 *     → S3 파일 삭제는 downloadService에서 별도 처리
 *
 * 담당: A
 */
