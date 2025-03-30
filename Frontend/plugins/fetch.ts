export default defineNuxtPlugin(() => {
    const { accessToken, refreshAccessToken } = useAuth()
  
    // Orijinal $fetch fonksiyonunu yedekle
    const originalFetch = $fetch
  
    // Global fetch override
    globalThis.$fetch = async (url: any, options: any = {}) => {
      const finalOptions = { ...options }
  
      // Header yoksa başlat
      if (!finalOptions.headers) {
        finalOptions.headers = {}
      }
  
      // Access Token varsa header'a ekle
      if (accessToken.value) {
        finalOptions.headers.Authorization = `Bearer ${accessToken.value}`
      }
  
      try {
        // İlk istek
        return await originalFetch(url, finalOptions)
      } catch (err: any) {
        // Token expired ise → refresh etmeyi dene
        if (err?.response?.status === 401) {
          console.warn('🔁 Token expired. Refresh denemesi yapılıyor...')
  
          const refreshed = await refreshAccessToken()
  
          if (refreshed && accessToken.value) {
            // Yeni token ile yeniden istek gönder
            finalOptions.headers.Authorization = `Bearer ${accessToken.value}`
            return await originalFetch(url, finalOptions)
          }
  
          console.error('❌ Token yenileme başarısız. Kullanıcı logout edilmeli.')
        }
  
        // Diğer hataları fırlat
        throw err
      }
    }
  })
  