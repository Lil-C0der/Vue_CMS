import instance from 'network/request'

export function getRolesList() {
  return instance({
    url: 'roles',
    method: 'GET'
  })
}

export function addRole(roleName) {
  return instance({
    url: 'roles',
    method: 'POST',
    data: {
      roleName
    }
  })
}
