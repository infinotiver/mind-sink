import { useState } from "react";
import PreviewItem from "@/components/additem/PreviewItem";
import ItemCreate from "@/components/additem/ItemCreate";
import { detectSource } from "@/utils/detectSource"; // Import detectSource
import { FiLink } from "react-icons/fi";
import type { JSX } from "react/jsx-runtime";

export default function AddItemPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [sourceValue, setSourceValue] = useState<{
    icon: JSX.Element;
    name: string;
  }>({ icon: <FiLink />, name: "" });

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t: string) => t !== tag));
  };

  const handleUpdateLink = (link: string) => {
    setItemLink(link);
    setSourceValue(detectSource(link)); // Use detectSource from utility
  };

  const handleUpdateSource = (name: string) => {
    setSourceValue((prev) => ({ ...prev, name }));
  };

  return (
    <div className="flex min-w-full">
      <PreviewItem imageLink={itemLink} />
      <ItemCreate
        selectedTags={selectedTags}
        inputValue={inputValue}
        linkValue={itemLink}
        sourceValue={sourceValue}
        setInputValue={setInputValue}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        handleUpdateLink={handleUpdateLink}
        handleUpdateSource={handleUpdateSource}
      />
    </div>
  );
}
