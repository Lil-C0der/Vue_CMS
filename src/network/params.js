import instance from './request'

export function getParamsListById(id, sel) {
  return instance({
    url: `categories/${id}/attributes`,
    method: 'GET',
    params: {
      id,
      sel
    }
  })
}
export function addParamsById(id, attr_name, attr_sel, attr_vals) {
  return instance({
    url: `categories/${id}/attributes`,
    method: 'POST',
    data: {
      id,
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
export function queryParamsById(id, attrId, attr_sel, attr_vals) {
  return instance({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'GET',
    params: {
      id,
      attrId,
      attr_sel,
      attr_vals
    }
  })
}

export function modifyParams(id, attrId, attr_name, attr_sel, attr_vals) {
  return instance({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'PUT',
    data: {
      id,
      attrId,
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}
export function deleteParamsById(id, attrId) {
  return instance({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'DELETE',
    data: {
      id,
      attrId
    }
  })
}
