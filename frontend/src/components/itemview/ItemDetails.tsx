import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TagsInput from "@/components/common/TagsInput";
import { FiCalendar, FiRefreshCcw, FiUser, FiLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import type { Item } from "@/api/items";
import { detectSource } from "@/utils/detectSource"; // Import detectSource
import type { Sink } from "@/api/sinks";
import type { UserProfile } from "@/api/profile";
import { Link } from "react-router-dom";

function ItemDetails({
  item,
  sinkData,
  authorData,
  selectedTags,
  inputValue,
  setInputValue,
  handleAddTag,
  handleDeleteTag,
  handleDelete,
  handleUpdate,
}: {
  item: Item;
  sinkData: Sink;
  authorData: UserProfile;
  selectedTags: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (item: Item) => void;
}) {
  const handleUpdateTag = (newTags: string[]) => {
    item.tags = newTags;
  };
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>
          {sinkData.title} ({sinkData._id})
        </CardTitle>
      </CardHeader>
      <CardContent className="text-md space-y-4">
        <Link to={`/users/${authorData.user_id}`}>
          <div className="flex items-center gap-2 mb-4 hover:underline">
            <FiUser />
            <Label>{authorData.username}</Label>
          </div>
        </Link>
        <a href={item.content}>
          <div className="flex items-center gap-2 my-2 text-sm text-foreground hover:text-blue-400">
            <FiLink />
            {item.content.length > 50
              ? `${item.content.substring(0, 50)}...`
              : item.content}
          </div>
        </a>
        <TagsInput
          selectedTags={selectedTags}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          initialTags={item.tags}
          onTagsChange={handleUpdateTag}
        />
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FiCalendar size={14} /> Created: (Not Available. Yet to add)
          </div>
          <div className="flex items-center gap-2">
            <FiRefreshCcw size={14} /> Updated: (Not Available. Yet to add)
          </div>
          <div className="flex items-center gap-2 underline">
            {detectSource(item.content).icon}
            Source: {detectSource(item.content).name}
          </div>
        </div>
      </CardContent>
      <div className="flex gap-4 p-4 border-t">
        <Button onClick={() => handleUpdate(item)}> Update</Button>
        <Button variant="destructive" onClick={() => handleDelete(item._id)}>
          Delete Item
        </Button>
      </div>
    </Card>
  );
}

export default ItemDetails;
