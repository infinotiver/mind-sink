import { useParams } from "react-router-dom";
import { useState } from "react";
import ImagePreview from "@/components/itemview/ImagePreview";
import ItemDetails from "@/components/itemview/ItemDetails";

function ItemView() {
  const { itemID } = useParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="flex gap-6">
      <div className="max-w-96 h-auto aspect-auto">
        {itemID ? <ImagePreview itemID={itemID} /> : <p>Item not found</p>}
      </div>
      <ItemDetails
        selectedTags={selectedTags}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />
    </div>
  );
}

export default ItemView;
