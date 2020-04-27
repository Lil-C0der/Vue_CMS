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

// 防抖函数
export default (func, delay) => {
  let timer = null
  // XXX 注意！这里返回了一个箭头函数 但是暂时没有发现this的指向问题
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
