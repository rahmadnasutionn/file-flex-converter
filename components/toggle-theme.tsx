"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      type="button"
      id='toggle-theme'
      aria-label='Toggle Theme'
      onClick={toggleTheme}
      className='py-1.5 px-3 transition-colors hover:bg-zinc-50 hover:rounded rounded dark:hover:bg-zinc-800 focus-visible:outline-none'
    >
      {theme === 'light' ? <Sun /> : <Moon />}
      <span className='sr-only'>Toggle Theme</span>
    </button>
  )
}

export default ToggleTheme