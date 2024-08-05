import Mark from 'mark.js'

/**
 * 导入方式文本
 * @param {*} value
 * @returns
 */
export const getImportTypeText = (value) => {
  const importTypeMap = {
    1: '手动上传'
  }
  return importTypeMap[value]
}

/**
 * 小数转百分比，保留两位小数且第三位小数四舍五入
 * @param {*} decimal
 * @returns
 */
export function decimalToPercentage(decimal) {
  return (decimal * 100).toFixed(2) + '%'
}

/**
 * 标亮匹配到的文本
 * @param {*} DOM DOM 元素
 * @param {*} textArray 正则文本数组
 * @param {*} options 可选项
 */
export function highlightText(DOM, textArray, options = {}) {
  const instance = new Mark(DOM)
  for (const text of textArray) {
    instance.markRegExp(new RegExp(text), options)
  }
}

/**
 * 下划线转小驼峰命名
 * @param {*} str
 * @returns
 */
export function underscoreToCamelCase(str) {
  return str
    .split('_')
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

/**
 * 将对象属性下划线转小驼峰命名
 * @param {*} obj
 * @returns
 */
export function processkeyOfObject(obj) {
  const newObj = {}
  for (const k in obj) {
    newObj[underscoreToCamelCase(k)] = obj[k]
  }
  return newObj
}
