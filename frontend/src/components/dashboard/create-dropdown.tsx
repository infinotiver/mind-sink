'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TbPlus, TbUpload } from 'react-icons/tb';
import { Kbd } from '@/components/ui/kbd';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

export default function CreateDropdown({
  onCreateSink,
  onAddImage,
}: {
  onCreateSink: () => void;
  onAddImage: () => void;
}) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="w-full justify-start">
              <TbPlus />
              <span className="ml-2">Create</span>
              <span className="ml-auto hidden md:inline-flex"></span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-1">
            Press <Kbd>Ctrl / ⌘</Kbd>+
            <Kbd>C</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCreateSink} className="mb-2">
          <TbPlus size={24} className="mr-2" />
          <div>
            <span className="font-semibold">Create Sink</span>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">
                Start a board to organize your ideas.
              </div>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl / ⌘</Kbd>
                <Kbd>C</Kbd>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAddImage} className="mt-2">
          <TbUpload size={24} className="mr-2" />
          <div>
            <span className="font-semibold">Add Image</span>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">Upload an item to your sinks.</div>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl / ⌘</Kbd>
                <Kbd>I</Kbd>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
