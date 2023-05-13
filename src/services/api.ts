import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: 'http://localhost:3333/'
})

api.interceptors.request.use((config) => {
  try {
    if (!config.headers?.Authorization) {
      const token = Cookies.get('authToken')
      if (config.headers !== undefined && token && token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  } catch (error) {
    return config
  }
})

export default api
