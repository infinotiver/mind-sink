import { useContext } from 'react';
import ShortcutsContext from './ShortcutsContext';
import type { ShortcutsContextType } from './ShortcutsContext';

export const useShortcuts = () => {
  const ctx = useContext(ShortcutsContext) as ShortcutsContextType | null;
  if (!ctx) throw new Error('useShortcuts must be used within ShortcutsProvider');
  return ctx;
};

export default useShortcuts;
