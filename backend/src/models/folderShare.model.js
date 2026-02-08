// 폴더 공유 모델
// TODO: FolderShare 모델 정의

module.exports = (sequelize, DataTypes) => {
  const FolderShare = sequelize.define('FolderShare', {});
  
  FolderShare.associate = (models) => {
    // TODO: 관계 정의
  };
  
  return FolderShare;
};
