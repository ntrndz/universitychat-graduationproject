import { useState } from '#app'

export const useTheme = () => {
  const darkMode = useState<boolean>('darkMode', () => false)

  const toggleTheme = () => {
    darkMode.value = !darkMode.value

    if (darkMode.value) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  return { darkMode, toggleTheme }
}
