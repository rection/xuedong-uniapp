// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { apiLogin, apiGetUserInfo } from '@/api/login.js' // 引入模拟的API

// export const useUserStore = defineStore('user', () => {
//   const token = ref(uni.getStorageSync('token') || '')
//   const userInfo = ref(uni.getStorageSync('userInfo') || {})

//   // 登录 Action
//   const login = async (loginData) => {
//     try {
//       // 1. 调用模拟的 apiLogin
//       // res 现在会是 { token: '...', user: {...} }
//       const res = await apiLogin(loginData)
      
//       // 2. 保存 Token
//       token.value = res.token
//       uni.setStorageSync('token', res.token)
      
//       // 3. 保存用户信息
//       userInfo.value = res.user
//       uni.setStorageSync('userInfo', res.user)
      
//       return true // 返回 true 表示登录成功

//     } catch (error) {
//       // 模拟的 reject(error) 会在这里被捕获
//       uni.showToast({
//         title: error.msg || '登录失败',
//         icon: 'none'
//       })
//       return Promise.reject(error) // 让页面知道登录失败了
//     }
//   }

//   // ... (getUserInfo 和 logout 方法可以保持不变，
//   // logout 甚至可以直接使用，因为它只操作本地数据)

//   // 退出登录 Action
//   const logout = () => {
//     token.value = ''
//     userInfo.value = {}
//     uni.removeStorageSync('token')
//     uni.removeStorageSync('userInfo')
    
//     uni.reLaunch({ // 使用 reLaunch 清空页面栈并跳转
//         url: '/pages/Login/login'
//     })
//   }
  
//   // (可选) 如果你还想保留 getUserInfo action
//   const getUserInfo = async () => {
//     const info = await apiGetUserInfo() // 调用模拟的 apiGetUserInfo
//     userInfo.value = info
//     uni.setStorageSync('userInfo', info)
//   }


//   return {
//     token,
//     userInfo,
//     login,
//     getUserInfo,
//     logout
//   }
// })