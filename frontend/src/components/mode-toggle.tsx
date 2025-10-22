import { TbMoon, TbSun } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { useEffect } from 'react';
import useShortcuts from '@/components/shortcuts/useShortcuts';
import { Kbd } from '@/components/ui/kbd';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const shortcuts = useShortcuts();

  useEffect(() => {
    const toggle = () => {
      if (theme === 'dark') setTheme('light');
      else if (theme === 'light') setTheme('system');
      else setTheme('dark');
    };
    shortcuts.register('t', toggle, 'Toggle theme');
    return () => shortcuts.unregister('t', toggle);
  }, [theme, setTheme, shortcuts]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center gap-2" size="lg">
          <TbSun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <TbMoon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
          <Kbd>T</Kbd>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
