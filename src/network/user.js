import instance from 'network/request'

// 查询用户列表
export function getUsersData(query, pagenum, pagesize) {
  return instance({
    url: '/users',
    method: 'GET',
    params: {
      //   queryInfo
      query,
      pagenum,
      pagesize
    }
  })
}
// 改变用户状态
export function changeState(uId, type) {
  return instance({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}
// 添加用户
export function addUser(username, password, email, mobile) {
  return instance({
    url: 'users',
    method: 'POST',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}
// 查询用户信息
export function getUserById(id) {
  return instance({
    url: `users/${id}`,
    method: 'GET'
  })
}
// 修改用户信息
export function modifyUser(id, email, mobile) {
  return instance({
    url: `users/${id}`,
    method: 'PUT',
    data: {
      id,
      email,
      mobile
    }
  })
}
// 删除用户
export function deleteUserById(id) {
  return instance({
    url: `users/${id}`,
    method: 'DELETE',
    data: {
      id
    }
  })
}
