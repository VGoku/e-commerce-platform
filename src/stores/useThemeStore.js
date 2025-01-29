import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'light',
            toggleTheme: () =>
                set((state) => {
                    const newTheme = state.theme === 'light' ? 'dark' : 'light'
                    document.documentElement.classList.remove('light', 'dark')
                    document.documentElement.classList.add(newTheme)
                    return { theme: newTheme }
                }),
            setTheme: (theme) => {
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(theme)
                set({ theme })
            }
        }),
        {
            name: 'theme-storage',
            partialize: (state) => ({ theme: state.theme })
        }
    )
)

// Initialize theme on load
const savedTheme = JSON.parse(localStorage.getItem('theme-storage'))?.state?.theme || 'light'
document.documentElement.classList.add(savedTheme)

export default useThemeStore 