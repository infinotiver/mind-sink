import TagsInput from "@/components/common/TagsInput";
import { Button } from "@/components/ui/button";
import type { JSX } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

function ItemCreate({
  selectedTags,
  inputValue,
  linkValue,
  sourceValue,
  setInputValue,
  handleAddTag,
  handleDeleteTag,
  handleUpdateLink,
  handleUpdateSource,
}: {
  selectedTags: string[];
  inputValue: string;
  linkValue: string;
  sourceValue: { icon: JSX.Element; name: string };
  setInputValue: (value: string) => void;
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
  handleUpdateLink: (link: string) => void;
  handleUpdateSource: (link: string) => void;
}): JSX.Element {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  return (
    <div className="w-auto flex-1 flex flex-col p-4">
      <div className="mb-4">
        <label
          htmlFor="linkInput"
          className="block text-sm font-medium text-foreground"
        >
          Link
        </label>
        <input
          type="text"
          id="linkInput"
          className="mt-1 block w-full rounded-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Enter a link"
          value={linkValue}
          onChange={(e) => {
            handleUpdateLink(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="sinkDropdown"
          className="block text-sm font-medium text-foreground"
        >
          Choose Sink
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id="sinkDropdown"
              className="my-2 block w-auto rounded-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {selectedBoard || "Select Board"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedBoard("Board 1")}>
              Board 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedBoard("Board 2")}>
              Board 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedBoard("Board 3")}>
              Board 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TagsInput
        selectedTags={selectedTags}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />
      <div className="my-4">
        <label
          htmlFor="sourceInput"
          className="block text-sm font-medium text-foreground"
        >
          Source
        </label>
        <div className="my-2 flex">
          <span className="inline-flex items-center justify-center rounded-l-md border border-input bg-accent px-3">
            {sourceValue.icon}
          </span>
          <input
            type="text"
            id="sourceInput"
            className="block w-auto rounded-r-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Source"
            value={sourceValue.name}
            onChange={(e) => handleUpdateSource(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button className="w-auto">Add Image</Button>
      </div>
    </div>
  );
}

export default ItemCreate;
