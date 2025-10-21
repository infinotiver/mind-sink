'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TbPlus, TbUpload } from 'react-icons/tb';

export default function CreateDropdown({
  onCreateSink,
  onAddImage,
}: {
  onCreateSink: () => void;
  onAddImage: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="w-full justify-start">
          <TbPlus />
          <span className="ml-2">Create</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCreateSink} className="mb-2">
          <TbPlus size={24} className="mr-2" />
          <div>
            <span className="font-semibold">Create Sink</span>
            <div className="text-xs text-muted-foreground">
              Start a board to organize your ideas.
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAddImage} className="mt-2">
          <TbUpload size={24} className="mr-2" />
          <div>
            <span className="font-semibold">Add Image</span>
            <div className="text-xs text-muted-foreground">Upload an item to your sinks.</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
