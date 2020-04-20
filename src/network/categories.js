import instance from './request'

export function getCategories(type, pagenum, pagesize) {
  return instance({
    url: 'categories',
    method: 'GET',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}
export function addCategories(cat_pid, cat_name, cat_level) {
  return instance({
    url: 'categories',
    method: 'POST',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}
export function getCategoriesById(id) {
  return instance({
    url: `categories/${id}`,
    method: 'GET',
    params: {
      id
    }
  })
}
export function modifyCategories(id, cat_name) {
  return instance({
    url: `categories/${id}`,
    method: 'PUT',
    data: {
      cat_name
    }
  })
}
export function deleteCatById(id) {
  return instance({
    url: `categories/${id}`,
    method: 'DELETE',
    data: {
      id
    }
  })
}
