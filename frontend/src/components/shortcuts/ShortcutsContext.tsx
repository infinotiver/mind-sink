import { createContext } from 'react';

export type ShortcutsContextType = {
  register: (key: string, handler: () => void, description?: string) => void;
  unregister: (key: string, handler: () => void) => void;
  list: { key: string; description?: string }[];
};

const ShortcutsContext = createContext<ShortcutsContextType | null>(null);

export default ShortcutsContext;
