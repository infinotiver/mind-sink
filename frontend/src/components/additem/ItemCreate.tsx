import TagsInput from "@/components/common/TagsInput";
import { Button } from "@/components/ui/button";
import type { JSX } from "react/jsx-runtime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthProvider";
import { getUserSinks } from "@/api/sinks";
import type { Sink } from "@/api/sinks";

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
  onAdd,
  selectedBoardId,
  setSelectedBoardId,
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
  onAdd: () => void;
  selectedBoardId: string | null;
  setSelectedBoardId: React.Dispatch<React.SetStateAction<string | null>>;
}): JSX.Element {
  const [selectedBoard, setSelectedBoard] = useState<string | null>(selectedBoardId);
  const { user } = useAuth();
  const { data: userSinksData = [] } = useQuery<Sink[]>({
    queryKey: ["sink"],
    queryFn: async () => {
      if (user) {
        return await getUserSinks(user.user_id);
      }
      return Promise.reject("User not authenticated");
    },
  });

  return (
    <div className="w-auto flex-1 flex flex-col gap-3 p-3">
      {/* Link + Sink selection grouped */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="linkInput" className="text-sm font-medium text-foreground">
            Link
          </label>
          <input
            type="text"
            id="linkInput"
            className="block w-full rounded-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Enter a link"
            value={linkValue || ""}
            onChange={(e) => handleUpdateLink(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-48">
          <label htmlFor="sinkDropdown" className="text-sm font-medium text-foreground">
            Board
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                id="sinkDropdown"
                className="block w-full rounded-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {selectedBoard || "Select Board"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {userSinksData?.map((sink: Sink) => (
                <DropdownMenuItem
                  key={sink._id}
                  onClick={() => {
                    setSelectedBoard(sink.title);
                    setSelectedBoardId(sink._id);
                  }}
                >
                  {sink.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Tags + Source grouped */}
      <div className="flex gap-3">
        <div className="flex-1">
          <TagsInput
            selectedTags={selectedTags}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
          />
        </div>
        <div className="flex flex-col gap-1 w-48">
          <label htmlFor="sourceInput" className="text-sm font-medium text-foreground">
            Source
          </label>
          <div className="flex">
            <span className="inline-flex items-center justify-center rounded-l-md border border-input bg-accent px-3 py-2">
              {sourceValue.icon}
            </span>
            <input
              type="text"
              id="sourceInput"
              className="block w-full rounded-r-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Source"
              value={sourceValue.name}
              onChange={(e) => handleUpdateSource(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="w-auto" onClick={onAdd}>
          Add Image
        </Button>
      </div>
    </div>
  );
}

export default ItemCreate;
