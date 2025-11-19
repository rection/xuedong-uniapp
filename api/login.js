// 登录相关API
import http from '@/utils/request.js'

/**
 * 用户登录
 * @param {Object} loginData - 登录数据 { username, password }
 * @returns {Promise} 返回登录结果
 */
export const apiLogin = async (loginData) => {
  try {
    // 方式1: 如果使用真实API，取消注释下面的代码
    // const res = await http.post('/api/login', loginData)
    // return res
    
    // 方式2: 模拟登录API（用于开发测试）
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟验证逻辑
        if (loginData.username === 'admin' && loginData.password === '123456') {
          resolve({
            token: 'mock_token_' + Date.now(),
            user: {
              id: 1,
              username: 'admin',
              nickname: '管理员',
              avatar: '',
              email: 'admin@example.com'
            }
          })
        } else {
          reject({
            msg: '用户名或密码错误',
            code: 401
          })
        }
      }, 500) // 模拟网络延迟
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 获取用户信息
 * @returns {Promise} 返回用户信息
 */
export const apiGetUserInfo = async () => {
  try {
    // 方式1: 如果使用真实API，取消注释下面的代码
    // const res = await http.get('/api/user/info')
    // return res
    
    // 方式2: 模拟获取用户信息
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          username: 'admin',
          nickname: '管理员',
          avatar: '',
          email: 'admin@example.com'
        })
      }, 300)
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 退出登录
 * @returns {Promise}
 */
export const apiLogout = async () => {
  try {
    // 方式1: 如果使用真实API，取消注释下面的代码
    // return await http.post('/api/logout')
    
    // 方式2: 模拟退出登录
    return Promise.resolve({ success: true })
  } catch (error) {
    return Promise.reject(error)
  }
}

