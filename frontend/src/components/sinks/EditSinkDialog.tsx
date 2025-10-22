import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import SinkCreate from '@/components/createsink/SinkCreate';
import { Button } from '@/components/ui/button';
import type { Sink } from '@/api/sinks';

type EditSinkDialogProps = {
  sink: Sink;
  trigger?: React.ReactNode;
  onSave: (updated: { title: string; description: string; tags: string[] }) => Promise<void> | void;
};

export default function EditSinkDialog({ sink, trigger, onSave }: EditSinkDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(sink.title || '');
  const [description, setDescription] = React.useState(sink.description || '');
  const [tags, setTags] = React.useState<string[]>(sink.tags || []);

  React.useEffect(() => {
    setTitle(sink.title || '');
    setDescription(sink.description || '');
    setTags(sink.tags || []);
  }, [sink]);

  const handleAddTag = (t: string) => setTags(prev => [...prev, t]);
  const handleDeleteTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

  const handleSave = async () => {
    await onSave({ title, description, tags });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Sink</DialogTitle>
          <DialogDescription>Update the sink details and tags.</DialogDescription>
        </DialogHeader>
        <SinkCreate
          tags={tags}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          onCreateSink={handleSave}
          showPrimaryButton={false}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
