import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

type ShareDialogProps = {
  title?: string;
  description?: string;
  url: string;
  trigger?: React.ReactNode;
};

export function ShareDialog({
  title = 'Share link',
  description = 'Anyone who has this link will be able to view this.',
  url,
  trigger,
}: ShareDialogProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Dialog>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="secondary">Share</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={url} readOnly />
          </div>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
