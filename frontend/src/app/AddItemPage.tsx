import { useState } from "react";
import PreviewItem from "@/components/additem/PreviewItem";
import ItemCreate from "@/components/additem/ItemCreate";
import { detectSource } from "@/utils/detectSource"; // Import detectSource
import { FiLink } from "react-icons/fi";
import type { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useCreateItem } from "@/api/items";
import { toast } from "sonner";
export default function AddItemPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [sourceValue, setSourceValue] = useState<{
    icon: JSX.Element;
    name: string;
  }>({ icon: <FiLink />, name: "" });
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const createMutation = useCreateItem();
  const navigate = useNavigate();
  const handleCreate = () => {
    if (!selectedBoardId) {
      alert("Please select a board before adding an image.");
      return;
    }
    const newItem = {
      sink_id: selectedBoardId,
      content: itemLink,
      type: "link",
      tags: selectedTags,
    };
    createMutation.mutate(newItem, {
      onSuccess: () => {
        toast.success("Item created!");
        navigate("/dashboard");
      },
      onError: (err) => {
        toast.error("Failed to create item: " + err.message);
      },
    });
  };
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
    setSourceValue(detectSource(link));
  };

  const handleUpdateSource = (name: string) => {
    setSourceValue((prev) => ({ ...prev, name }));
  };

  return (
    <div className="flex flex-col min-w-full">
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
        onAdd={handleCreate}
        selectedBoardId={selectedBoardId}
        setSelectedBoardId={setSelectedBoardId}
      />
    </div>
  );
}
