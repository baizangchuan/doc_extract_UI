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
 * 获取样本列表
 * @param {*} params
 * @returns
 */
export function getSampleListApi(params) {
  return spdRequest.get({
    url: '/sample/list',
    params
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

/**
 * 获取模板列表
 * @param {*} params
 */
export function getTemplateListApi(params) {
  return spdRequest.get({
    url: '/template/list',
    params
  })
}

/**
 * 删除模板
 * @param {*} templateConfigId
 */
export function deleteTemplateApi(templateConfigId) {
  return spdRequest.request({
    url: '/template/delete',
    method: 'put',
    data: {
      templateConfigId
    }
  })
}

/**
 * 上传样本文件
 */
export function uploadSampleFileApi(file) {
  const fd = new FormData()
  fd.append('file', file)
  return spdRequest.post({
    url: '/sample/upload',
    data: fd,
    contentType: 'multipart/form-data'
  })
}

/**
 * 创建解析任务
 * @param {*} data
 * @returns
 */
export function saveTaskApi(data) {
  return spdRequest.post({
    url: '/task/save',
    data
  })
}

/**
 * 获取任务列表
 * @param {*} pageNum
 * @param {*} pageSize
 * @returns
 */
export function getTaskListApi(pageNum, pageSize) {
  return spdRequest.get({
    url: '/task/list',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * 查询任务详情
 * @param {*} parseTaskId
 * @returns
 */
export function getTaskInfoApi(parseTaskId) {
  return spdRequest.get({
    url: '/task/info',
    params: {
      parseTaskId
    }
  })
}
