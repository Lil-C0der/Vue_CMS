/**
 * 解决Vue Template模板中无法使用可选链的问题
 * @param obj
 * @param rest
 * @returns {*}
 */
export const optionalChaining = (obj, ...rest) => {
  let tmp = obj
  for (const key in rest) {
    const name = rest[key]
    tmp = tmp?.[name]
  }
  return tmp || ''
}
