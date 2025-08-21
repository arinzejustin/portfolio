import { ref, watchEffect, onMounted } from 'vue'

export function useTheme() {
    const theme = ref<'light' | 'dark'>('light');
    const initial = ref<boolean>(true)

    onMounted(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (saved) {
            theme.value = saved
        } else {
            theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        document.documentElement.classList.toggle('dark', theme.value === 'dark');
        initial.value = false
    })

    watchEffect(() => {
        if (!process.client || initial.value) return;
        localStorage.setItem('theme', theme.value)
        document.documentElement.classList.toggle('dark', theme.value === 'dark')
    })

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { theme, toggleTheme }
}
