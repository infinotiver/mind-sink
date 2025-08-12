import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TagsInput from "@/components/common/TagsInput";
import { FiCalendar, FiRefreshCcw, FiLink2, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

function ItemDetails({
  selectedTags,
  inputValue,
  setInputValue,
  handleAddTag,
  handleDeleteTag,
}: {
  selectedTags: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
}) {
  return (
    <Card className="w-auto flex-1 flex flex-col">
      <CardHeader>
        <CardTitle>Sink 1</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <FiUser /> <Label>Author</Label>
        </div>
        <p className="text-sm flex gap-1 items-center justify-center text-foreground mb-2 ml-2"></p>
        <TagsInput
          selectedTags={selectedTags}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
        />
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FiCalendar size={14} /> Created: 2023-10-01
          </div>
          <div className="flex items-center gap-2">
            <FiRefreshCcw size={14} /> Updated: 2023-10-05
          </div>
          <div className="flex items-center gap-2 underline">
            <FiLink2 size={14} />
            <a href="">Source: Cosmos.so</a>
          </div>
        </div>
      </CardContent>
      <div className="flex gap-4 p-4 border-t">
        <Button className="w-auto">Save Changes</Button>
        <Button className="w-auto" variant={"destructive"}>
          Delete Item
        </Button>
      </div>
    </Card>
  );
}

export default ItemDetails;
