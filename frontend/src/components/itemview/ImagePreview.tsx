import { Button } from "@/components/ui/button";
import { FiDownload, FiShare2 } from "react-icons/fi";

function ImagePreview({ itemID }: { itemID: string }) {
  return (
    <div className="relative flex justify-center items-start">
      <img
        src={`/pins/${itemID}.png`}
        alt="Preview"
        className="rounded-lg shadow-lg object-contain max-h-100 max-w-100 aspect-auto"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <Button size="icon" variant="secondary">
          <FiDownload size={18} />
        </Button>
        <Button size="icon" variant="secondary">
          <FiShare2 size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ImagePreview;
