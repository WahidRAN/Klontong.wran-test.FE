import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'

import type { PayloadType } from '@/types/AuthServiceType'
import { login, register } from '@/api/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref()

  const setUser = (user: { name: string, fullname: string }) => {
    useStorage('klontong-user', user)
  }
  const setToken = (userToken: string) => {
    useStorage('klontong-token', userToken)
  }

  const userLogin = async (userPayload: PayloadType) => {
    try {
      const result = await login(userPayload)
      setUser(result.data.user)
      setToken(result.data.token)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const userRegister = async (userPayload: PayloadType) => {
    try {
      const result = await register(userPayload)
      console.log(result)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getUser = computed(() => (user.value))

  return { user, getUser, userLogin, userRegister }
})
