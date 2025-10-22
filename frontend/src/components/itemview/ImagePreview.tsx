import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import type { Item } from '@/api/items';
import { FiDownload, FiShare2, FiInfo } from 'react-icons/fi';
import { ShareDialog } from '@/components/dialogs/share-dialog';
import { toast } from 'sonner';
function ImagePreview({ item }: { item: Item }) {
  const shareUrl = `${window.location.origin}/items/${item._id}`;

  const handleDownload = useCallback(() => {
    try {
      const a = document.createElement('a');
      a.href = item.content;
      a.download = `item-${item._id}`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      toast('Unable to download file', {
        description: 'Please try again later.',
      });
    }
  }, [item.content, item._id]);

  return (
    <div className="relative flex justify-center items-center">
      <img
        src={item.content}
        alt="Preview"
        className="rounded-lg shadow-lg object-contain max-h-[60vh] max-w-full"
      />
      <div className="absolute top-4 right-4 flex items-center gap-2 p-2 rounded-lg bg-accent/50 backdrop-blur-md border border-accent-foreground/25">
        <Button
          size="icon"
          variant="outline"
          aria-label="Download"
          onClick={handleDownload}
          shortcut="Ctrl+D"
        >
          <FiDownload size={18} />
        </Button>
        <ShareDialog
          title="Share this item"
          description="Share this image with anyone. They'll be able to view it if they have access."
          url={shareUrl}
          trigger={
            <Button size="icon" variant="outline" aria-label="Share" shortcut="Ctrl+S">
              <FiShare2 size={18} />
            </Button>
          }
        />
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-1 text-sm text-foreground bg-accent/75 p-2 rounded-2xl border border-accent-foreground/25">
          <FiInfo />
          <span className="truncate max-w-[20ch]">{item._id}</span>
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
