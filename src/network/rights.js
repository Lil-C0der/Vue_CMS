import instance from 'network/request'

export function getRightsList(type) {
  return instance({
    url: `rights/${type}`,
    method: 'GET',
    params: {
      type
    }
  })
}
