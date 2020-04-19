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

export function getRoleById(id) {
  return instance({
    url: `roles/${id}`,
    method: 'GET',
    params: {
      id
    }
  })
}

export function modifyRole(id, roleName, roleDesc) {
  return instance({
    url: `roles/${id}`,
    method: 'PUT',
    data: {
      id,
      roleName,
      roleDesc
    }
  })
}

export function deleteRoleById(id) {
  return instance({
    url: `roles/${id}`,
    method: 'DELETE',
    data: {
      id
    }
  })
}

export function deleteRightById(roleId, rightId) {
  return instance({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'DELETE',
    data: {
      roleId,
      rightId
    }
  })
}

export function setRoleRightsById(roleId, rids) {
  return instance({
    url: `roles/${roleId}/rights`,
    method: 'POST',
    data: {
      roleId,
      rids
    }
  })
}
