'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative flex items-center h-8 w-[3.75rem] rounded-full p-1
        transition-all duration-500 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500
        ${isDark
          ? 'bg-gradient-to-r from-zinc-900 to-red-950 ring-1 ring-red-800/50 shadow-[0_0_12px_rgba(220,38,38,0.3)]'
          : 'bg-gradient-to-r from-red-100 to-red-300 ring-1 ring-red-300/60 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
        }
      `}
    >
      {/* Moon icon — visible in light mode on the left */}
      <Moon
        size={12}
        className={`absolute left-1.5 transition-all duration-300 text-red-600 ${isDark ? 'opacity-0 scale-75' : 'opacity-70 scale-100'}`}
      />
      {/* Sun icon — visible in dark mode on the right */}
      <Sun
        size={13}
        className={`absolute right-1.5 transition-all duration-300 text-red-200 ${isDark ? 'opacity-60 scale-100' : 'opacity-0 scale-75'}`}
      />

      {/* Sliding thumb */}
      <span
        className={`
          relative z-10 flex items-center justify-center
          w-6 h-6 rounded-full shadow-md
          transition-all duration-500 ease-in-out
          ${isDark
            ? 'translate-x-0 bg-zinc-900 text-red-300 shadow-red-900/50'
            : 'translate-x-[1.75rem] bg-white text-amber-500 shadow-amber-200/60'
          }
        `}
      >
        {isDark
          ? <Moon size={13} strokeWidth={2.5} />
          : <Sun size={13} strokeWidth={2.5} />
        }
      </span>
    </button>
  )
}
