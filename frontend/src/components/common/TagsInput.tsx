import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiX } from "react-icons/fi";

function TagsInput({
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
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div>
      <Label htmlFor="tags" className="mb-4">
        Tags
      </Label>
      <Input
        id="tags"
        placeholder="Type and press Enter to add a tag"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleTagInput}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2 group"
          >
            {tag}
            <FiX
              className="cursor-pointer text-muted-foreground group-hover:text-secondary-foreground"
              onClick={() => handleDeleteTag(tag)}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;
