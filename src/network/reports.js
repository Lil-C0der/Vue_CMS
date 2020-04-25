import instance from './request'

export function getEchartsOpt() {
  return instance({
    url: 'reports/type/1',
    method: 'GET'
  })
}
