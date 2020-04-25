import instance from './request'

export function getOrderList(
  query,
  pagenum,
  pagesize,
  user_id,
  pay_status,
  is_send,
  order_fapiao_title,
  order_fapiao_company,
  order_fapiao_content,
  consignee_addr
) {
  return instance({
    url: 'orders',
    method: 'GET',
    params: {
      query,
      pagenum,
      pagesize,
      user_id,
      pay_status,
      is_send,
      order_fapiao_title,
      order_fapiao_company,
      order_fapiao_content,
      consignee_addr
    }
  })
}

export function getProgressInfo() {
  return instance({
    url: 'kuaidi/SF1017844460645 ',
    method: 'GET'
  })
}
