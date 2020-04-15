import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/'
})

// 请求拦截
request.interceptors.request.use(
  //   (config) => config,
  (config) => {
    // 在请求头提供token
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // console.log(config)
    return config
  },
  (err) => {
    console.log(err)
  }
)

// 响应拦截
request.interceptors.response.use(
  //   (result) => result,
  (result) => result.data,
  (err) => {
    console.log(err)
  }
)

export default request
