"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true)
    } else if (theme === "light") {
      setIsDark(false)
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(systemTheme)
    }
  }, [theme])

  const toggleTheme = () => {
    if (isDark) {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}