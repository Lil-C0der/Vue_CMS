import instance from 'network/request'

export function getMenuList() {
  return instance({
    url: '/menus',
    method: 'GET'
  })
}
