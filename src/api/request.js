/*
 * @Author: yin_shi_1251
 * @Date: 2020-06-06 16:29:40
 * @LastEditors: lichunfeng
 * @LastEditTime: 2021-12-02 20:15:57
 * @Description:
 */
import axios from "axios"
// import store from '@/store'

// create an axios instance
const service = axios.create({
  timeout: 600000,
})

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error.response?.data.msg || "未知错误")
  }
)

export default service
