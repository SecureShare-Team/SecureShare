/**
 * utils/s3.js - S3 작업 추상화 유틸
 *
 * - config/aws.js의 S3Client 싱글톤을 재사용
 * - 파일 키 규칙: quarantine/{fileId}, clean/{fileId}, infected/{fileId}
 * - deleteOrIsolate()는 S3_INFECTED_BUCKET이 있으면 격리, 없으면 삭제만 수행
 *
 * 담당: B
 */

const {
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = require("../config/aws");
const env = require("../config/env");

const QUARANTINE_PREFIX = "quarantine";
const CLEAN_PREFIX = "clean";
const INFECTED_PREFIX = "infected";
const DEFAULT_PRESIGNED_TTL_SECONDS = 300;

function toQuarantineKey(fileId) {
  return `${QUARANTINE_PREFIX}/${fileId}`;
}

function toCleanKey(fileId) {
  return `${CLEAN_PREFIX}/${fileId}`;
}

function toInfectedKey(fileId) {
  return `${INFECTED_PREFIX}/${fileId}`;
}

function buildCopySource(bucket, key) {
  // CopySource는 URL 인코딩이 필요하지만 슬래시는 유지해야 한다.
  const encodedKey = encodeURIComponent(key).replace(/%2F/g, "/");
  return `${bucket}/${encodedKey}`;
}

async function uploadEncryptedStream(fileId, stream) {
  const key = toQuarantineKey(fileId);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.S3_QUARANTINE_BUCKET,
      Key: key,
      Body: stream,
    })
  );

  return {
    bucket: env.S3_QUARANTINE_BUCKET,
    key,
  };
}

async function moveToClean(fileId) {
  const sourceKey = toQuarantineKey(fileId);
  const targetKey = toCleanKey(fileId);

  await s3Client.send(
    new CopyObjectCommand({
      Bucket: env.S3_CLEAN_BUCKET,
      Key: targetKey,
      CopySource: buildCopySource(env.S3_QUARANTINE_BUCKET, sourceKey),
    })
  );

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: env.S3_QUARANTINE_BUCKET,
      Key: sourceKey,
    })
  );

  return {
    from: { bucket: env.S3_QUARANTINE_BUCKET, key: sourceKey },
    to: { bucket: env.S3_CLEAN_BUCKET, key: targetKey },
  };
}

async function deleteOrIsolate(fileId) {
  const quarantineKey = toQuarantineKey(fileId);
  const cleanKey = toCleanKey(fileId);
  const infectedBucket = env.S3_INFECTED_BUCKET || process.env.S3_INFECTED_BUCKET;

  const result = {
    isolated: null,
    deleted: [],
  };

  if (infectedBucket) {
    const infectedKey = toInfectedKey(fileId);

    await s3Client.send(
      new CopyObjectCommand({
        Bucket: infectedBucket,
        Key: infectedKey,
        CopySource: buildCopySource(env.S3_QUARANTINE_BUCKET, quarantineKey),
      })
    );

    result.isolated = { bucket: infectedBucket, key: infectedKey };
  }

  await Promise.all([
    s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.S3_QUARANTINE_BUCKET,
        Key: quarantineKey,
      })
    ),
    s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.S3_CLEAN_BUCKET,
        Key: cleanKey,
      })
    ),
  ]);

  result.deleted.push({ bucket: env.S3_QUARANTINE_BUCKET, key: quarantineKey });
  result.deleted.push({ bucket: env.S3_CLEAN_BUCKET, key: cleanKey });

  return result;
}

async function generatePresignedUrl(key, ttl = DEFAULT_PRESIGNED_TTL_SECONDS) {
  const command = new GetObjectCommand({
    Bucket: env.S3_CLEAN_BUCKET,
    Key: key,
  });

  return getSignedUrl(s3Client, command, {
    expiresIn: ttl,
  });
}

async function getEncryptedStream(key) {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: env.S3_QUARANTINE_BUCKET,
      Key: key,
    })
  );

  return response.Body;
}

module.exports = {
  uploadEncryptedStream,
  moveToClean,
  deleteOrIsolate,
  generatePresignedUrl,
  getEncryptedStream,
};
