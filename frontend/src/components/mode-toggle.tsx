import React, { useEffect, useState } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import useShortcuts from '@/components/shortcuts/useShortcuts';


type Mode = 'light' | 'dark' | 'system';

export function ModeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const shortcuts = useShortcuts();

  // internal mode state drives icon and UI
  const [mode, setMode] = useState<Mode>(() => (theme as Mode) ?? 'system');

  // keep internal state synced if provider changes from outside
  useEffect(() => {
    if (theme && theme !== mode) setMode(theme as Mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // cycle through modes when pressing T
  useEffect(() => {
    const toggle = () => {
      const next: Mode = mode === 'dark' ? 'light' : mode === 'light' ? 'system' : 'dark';
      setMode(next);
      setTheme(next);
    };
    shortcuts.register('t', toggle, 'Toggle theme (Ctrl+T)');
    return () => shortcuts.unregister('t', toggle);
  }, [mode, setTheme, shortcuts]);

  const handleThemeChange = (value: Mode) => {
    setMode(value);
    setTheme(value);
  };

  // animation classes driven by mode
  const sunVisible = mode !== 'dark';
  const moonVisible = mode === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center justify-center gap-2"
          aria-label="Toggle theme"
          shortcut="Ctrl+T"
        >
          {/* icon container - fixed size so icons overlap cleanly */}
          <span className="relative inline-flex w-5 h-5">
            <TbSun
              aria-hidden
              className={
                'absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-all duration-300 ' +
                (sunVisible
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 -rotate-90 pointer-events-none')
              }
            />
            <TbMoon
              aria-hidden
              className={
                'absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-all duration-300 ' +
                (moonVisible
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 rotate-90 pointer-events-none')
              }
            />
          </span>

          <span className="sr-only">Toggle theme</span>
          <div className="flex items-center gap-1">
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
