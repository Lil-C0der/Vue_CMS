import instance from './request'

export function loginCheck(username, password) {
  return instance({
    url: 'login',
    method: 'POST',
    params: { username, password }
  })
}
