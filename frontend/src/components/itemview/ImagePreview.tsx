import { Button } from "@/components/ui/button";
import type { Item } from "@/api/items";
import { FiDownload, FiShare2, FiInfo } from "react-icons/fi";

function ImagePreview({ item }: { item: Item }) {
  return (
    <div className="relative flex justify-center items-center">
      <img
        src={item.content}
        alt="Preview"
        className="rounded-lg shadow-lg object-contain max-h-[60vh] max-w-full"
      />
      <div className="absolute top-4 right-4 flex gap-2 bg-accent/75 p-2 rounded-2xl">
        <Button size="icon" variant="default">
          <FiDownload size={18} />
        </Button>
        <Button size="icon" variant="default">
          <FiShare2 size={18} />
        </Button>
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-1 text-sm text-foreground bg-accent/75 p-2 rounded-2xl">
          <FiInfo />
          {item._id}
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
