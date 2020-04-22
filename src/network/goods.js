import instance from './request'

export function getGoodsList(query, pagenum, pagesize) {
  return instance({
    url: 'goods',
    method: 'GET',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
