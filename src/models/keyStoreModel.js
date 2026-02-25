/**
 * models/keyStoreModel.js — key_store 테이블 CRUD
 *
 * 파일별 암호화 키(DEK) 저장 및 조회 전담
 * 평문 DEK는 절대 이 모듈을 통해 저장하지 않음 → 반드시 암호화된 값만 저장
 *
 * 함수 목록:
 *
 *   saveKey(fileId, encryptedDek, iv, keyVersion)
 *     → key_store 테이블에 암호화된 DEK 정보 INSERT
 *     → 파라미터:
 *        - fileId       : files 테이블 FK
 *        - encryptedDek : KEK로 암호화된 DEK (Buffer 또는 hex string)
 *        - iv           : DEK 암호화에 사용한 IV (Buffer 또는 hex string)
 *        - keyVersion   : 향후 KEK 로테이션 대비 버전 관리용 (예: 'v1')
 *
 *   getKey(fileId)
 *     → { encryptedDek, iv, keyVersion } 반환
 *     → 존재하지 않으면 null 반환
 *
 * 담당: A
 */
