import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/api/items";
import ImagePreview from "@/components/itemview/ImagePreview";
import ItemDetails from "@/components/itemview/ItemDetails";
import GalleryGrid from "@/components/masonry/galleryGrid";

function ItemViewPage() {
  const { itemID } = useParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const {
    data: itemData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items", itemID],
    queryFn: () =>
      itemID ? getItem(itemID) : Promise.reject("Item not found"),
    enabled: !!itemID,
  });

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return `<p>Failed to load item. ${error}</p>`;

  return (
    <div className="flex gap-6 w-full h-full">
      <div className="flex flex-col gap-6 w-3/5">
        {itemData ? <ImagePreview item={itemData} /> : <p>Item not found</p>}
        <ItemDetails
          item={itemData}
          selectedTags={selectedTags}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
        />
      </div>
      <div className="w-2/5">
        <GalleryGrid columns={2}/>
      </div>
    </div>
  );
}

export default ItemViewPage;
