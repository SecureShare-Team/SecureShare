// 감사 로그 모델
// TODO: AuditLog 모델 정의

module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {});
  
  AuditLog.associate = (models) => {
    // TODO: 관계 정의
  };
  
  return AuditLog;
};
