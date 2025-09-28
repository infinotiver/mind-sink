import TagsInput from "@/components/common/TagsInput";
import { Button } from "@/components/ui/button";
import type { JSX } from "react/jsx-runtime";

function SinkCreate({
  tags,
  title,
  description,
  setTitle,
  setDescription,
  handleAddTag,
  handleDeleteTag,
  onCreateSink,
}: {
  tags: string[];
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
  onCreateSink: () => void;
}): JSX.Element {
  return (
    <div className="w-auto flex-1 flex flex-col p-4">
      <div className="mb-4">
        <label
          htmlFor="sinkTitleInput"
          className="block text-sm font-medium text-foreground"
        >
          Sink Title
        </label>
        <input
          type="text"
          id="sinkTitleInput"
          className="mt-1 block w-full rounded-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Enter sink title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="sinkDescriptionInput"
          className="block text-sm font-medium text-foreground"
        >
          Sink Description
        </label>
        <textarea
          id="sinkDescriptionInput"
          className="mt-1 block w-full rounded-md border border-input bg-accent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Enter sink description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <TagsInput
        selectedTags={tags}
        inputValue=""
        setInputValue={() => {}}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />
      <div className="flex justify-end mt-4">
        <Button className="w-auto" onClick={onCreateSink}>
          Create Sink
        </Button>
      </div>
    </div>
  );
}

export default SinkCreate;
