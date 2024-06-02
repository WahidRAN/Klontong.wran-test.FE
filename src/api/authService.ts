import axiosInstance from './axios'
import type { PayloadType } from '@/types/AuthServiceType'

export const login = async (userLoginPayload: PayloadType) => {
  try {
    const response = await axiosInstance.post(`/api/auth/login`, userLoginPayload)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const register = async (userRegisterPayload: PayloadType) => {
  try {
    const res = await axiosInstance.post('/api/auth/register', userRegisterPayload)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
