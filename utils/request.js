// import Request from 'luch-request' // 直接从 node_modules 引入

// const http = new Request()

// // 你可以在这里设置全局配置，例如 baseURL
// http.setConfig((config) => {
//   config.baseURL = 'https://api.example.com' // 你的API基础路径
//   config.header = {
//     ...config.header,
//   }
//   return config
// })

// // 示例：设置请求拦截器
// http.interceptors.request.use((config) => {
//   // 比如在这里添加 token
//   const token = uni.getStorageSync('token')
//   if (token) {
//     config.header.Authorization = `Bearer ${token}`
//   }
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

// // 示例：设置响应拦截器
// http.interceptors.response.use((response) => {
//   // 在这里处理后端返回的数据结构
//   return response.data
// }, (error) => {
//   // 处理响应错误
//   return Promise.reject(error)
// })

// export default http