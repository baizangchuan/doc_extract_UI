export const getImportTypeText = (value) => {
  const importTypeMap = {
    1: '手动上传'
  }
  return importTypeMap[value]
}
