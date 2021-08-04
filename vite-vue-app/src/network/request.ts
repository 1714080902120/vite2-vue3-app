import axios, { AxiosInstance } from 'axios'
import { REQUEST_TIMEOUT } from '@/common/constant'
import { errorMessage } from '@/common/utils'

function request (axiosConfig: any) {
  return new Promise((resolve, reject) => {
    const instance: AxiosInstance = axios.create({
      baseURL: import.meta.env.REQUEST_BASE_URL as string,
      timeout: REQUEST_TIMEOUT
    })
  
    // 拦截
    instance.interceptors.request.use(config => {
      const token = window.localStorage.getItem('tokens')
      if (token) config.headers['token'] = token
      return config
    }, errorMessage)
  
    instance.interceptors.response.use(response => {
      const { status, data, statusText } = response
      if (status === 200) {
        return data
      } else {
        errorMessage(`status: ${status}, message:${statusText}`)
      }
    })
    
    instance(axiosConfig)
    .then(resolve)
    .catch(reject)
  })
}

export default request




