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

export function deleteGoodsById(id) {
  return instance({
    url: `goods/${id}`,
    method: 'DELETE',
    params: {
      id
    }
  })
}

export function addGoods(
  goods_name,
  goods_cat,
  goods_price,
  goods_number,
  goods_weight,
  goods_introduce,
  pics,
  attrs
) {
  return instance({
    url: 'goods',
    method: 'POST',
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs
    }
  })
}
