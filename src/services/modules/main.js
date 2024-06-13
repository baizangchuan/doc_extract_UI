import spdRequest from '..'

/**
 * 获取样板文书类型列表
 */
export function getSampleTypeListApi() {
  return spdRequest.get({
    url: '/sample/type/list'
  })
}

/**
 * 获取模板可用列表
 * @param {string} orgName 机构ID
 * @param {string} recordType 文书类别
 * @returns
 */
export function getAvailibleTemplateApi(orgName, recordType) {
  return spdRequest.get({
    url: '/template/available',
    params: {
      orgName,
      recordType
    }
  })
}
