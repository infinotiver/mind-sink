import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TagsInput from "@/components/common/TagsInput";
import { FiCalendar, FiRefreshCcw, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import type { Item } from "@/api/items";
import { detectSource } from "@/utils/detectSource"; // Import detectSource
function ItemDetails({
  item,
  selectedTags,
  inputValue,
  setInputValue,
  handleAddTag,
  handleDeleteTag,
}: {
  item: Item;
  selectedTags: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
}) {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader>
        <CardTitle>Sink ID: {item.sink_id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <FiUser />
          <Label>Author</Label>
        </div>
        <p className="text-sm text-foreground">
          <a
            href={item.content}
            className="text-blue-500 hover:underline hover:text-muted-foreground"
            title={item.content}
          >
            {item.content.length > 50 ? `${item.content.substring(0, 50)}...` : item.content}
          </a>
        </p>
        <TagsInput
          selectedTags={selectedTags}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          initialTags={item.tags}
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
        <Button>Save Changes</Button>
        <Button variant="destructive">Delete Item</Button>
      </div>
    </Card>
  );
}

export default ItemDetails;
