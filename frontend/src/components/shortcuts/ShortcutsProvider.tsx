import React, { useEffect, useRef, useState } from 'react';
import ShortcutsContext from './ShortcutsContext';
import { Kbd } from '@/components/ui/kbd';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '@/components/ui/button';
type ShortcutHandler = () => void;

export function ShortcutsProvider({ children }: { children: React.ReactNode }) {
  const handlers = useRef<Map<string, Set<ShortcutHandler>>>(new Map());
  const descriptions = useRef<Map<string, string>>(new Map());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      // Show help with '?'
      if (e.key === '?') {
        e.preventDefault();
        setOpen(true);
        return;
      }
      const setOf = handlers.current.get(key);
      if (setOf) {
        e.preventDefault();
        setOf.forEach(h => h());
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const register = (key: string, handler: ShortcutHandler, description?: string) => {
    const k = key.toLowerCase();
    const setOf = handlers.current.get(k) ?? new Set();
    setOf.add(handler);
    handlers.current.set(k, setOf);
    if (description) descriptions.current.set(k, description);
  };

  const unregister = (key: string, handler: ShortcutHandler) => {
    const k = key.toLowerCase();
    const setOf = handlers.current.get(k);
    setOf?.delete(handler);
    if (!setOf || setOf.size === 0) handlers.current.delete(k);
  };

  const list = Array.from(descriptions.current.entries()).map(([key, description]) => ({
    key,
    description,
  }));

return (
    <ShortcutsContext.Provider value={{ register, unregister, list }}>
        {children}

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Keyboard Shortcuts</DialogTitle>
                    <DialogDescription>
                        Press keys to trigger actions. Press "?" to open this help.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2 mt-4">
                    {list.map(s => (
                        <div key={s.key} className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">{s.description}</div>
                            <Kbd>{s.key.toUpperCase()}</Kbd>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-right">
                    <Button variant={"destructive"} onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </ShortcutsContext.Provider>
);
}

export default ShortcutsProvider;
