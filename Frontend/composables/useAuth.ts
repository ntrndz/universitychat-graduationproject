import { useRuntimeConfig } from '#app'
import { useState } from '#imports'
import type { LoginResponse, RegisterResponse } from '@/types/auth'

export const useAuth = () => {
  const accessToken = useState<string | null>('accessToken', () => null)

  // Login işlemi
  const login = async (email: string, password: string) => {
    const config = useRuntimeConfig()

    const res = await $fetch<LoginResponse>(`${config.public.apiBase}/users/login`, {
      method: 'POST',
      body: { email, password },
    })

    accessToken.value = res.accessToken
    sessionStorage.setItem('accessToken', res.accessToken)

    return res
  }

  // Register işlemi (artık token kaydetmiyor)
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const config = useRuntimeConfig()

    const res = await $fetch<RegisterResponse>(`${config.public.apiBase}/users/register`, {
      method: 'POST',
      body: { email, password, firstName, lastName },
    })

    // Token kaydetmiyoruz, sadece başarılı kayıt kontrolü yapıyoruz
    return res
  }

  const logout = async () => {
    const config = useRuntimeConfig()

    await $fetch(`${config.public.apiBase}/users/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    accessToken.value = null
    sessionStorage.removeItem('accessToken')
  }

  const restoreAccessTokenFromSession = () => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      accessToken.value = token
    }
  }

  const refreshAccessToken = async () => {
    const config = useRuntimeConfig()

    try {
      const res = await $fetch<{ accessToken: string }>(`${config.public.apiBase}/users/refresh-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })

      accessToken.value = res.accessToken
      sessionStorage.setItem('accessToken', res.accessToken)
      console.log('🔁 Access token yenilendi!')
      return true
    } catch (err) {
      console.error('❌ Refresh token başarısız:', err)
      accessToken.value = null
      sessionStorage.removeItem('accessToken')
      return false
    }
  }

  return {
    accessToken,
    login,
    register,
    logout,
    restoreAccessTokenFromSession,
    refreshAccessToken,
  }
}
