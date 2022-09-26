import axios from 'axios'
// import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: 'http://likede2-admin.itheima.net/likede/',
  timeout: 5000 // request timeout
})

// service.interceptors.response.use(response => {
//   const { message, data, success } = response.data
//   if (success) {
//     return data
//   }
//   Message.error(message)
//   return Promise.rehect(new Error(message))
// }, error => {
//   Message.error(error.message)
//   return Promise.reject(error)
// }
// )
export default service
