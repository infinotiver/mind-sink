'use client';

import * as React from 'react';
import CreateDropdown from '@/components/dashboard/create-dropdown';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import SinkCreate from '@/components/createsink/SinkCreate';
import AddItem from '@/app/AddItemPage';
import { useAuth } from '@/context/AuthProvider';
import { createSink } from '@/api/sinks';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useShortcuts from '@/components/shortcuts/useShortcuts';

export default function CreateActions() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openAddItem, setOpenAddItem] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const shortcuts = useShortcuts();

  useEffect(() => {
    // register shortcuts
    const openCreate = () => setOpenCreate(true);
    const openAdd = () => setOpenAddItem(true);
    shortcuts.register('c', openCreate, 'Create Sink');
    shortcuts.register('i', openAdd, 'Add Image');
    return () => {
      shortcuts.unregister('c', openCreate);
      shortcuts.unregister('i', openAdd);
    };
  }, [shortcuts]);

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
  };

  const handleDeleteTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleCreateSink = async () => {
    const newSinkData = {
      title: title,
      description: description,
      visibility: 'private',
      tags: tags,
      user_id: user?.user_id || '',
    };

    if (!newSinkData.user_id) {
      setOpenCreate(false);
      alert('You must be signed in to create a sink.');
      return;
    }

    try {
      await createSink(newSinkData);
      queryClient.invalidateQueries();
      setOpenCreate(false);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create sink. Please try again.');
    }
  };

  return (
    <>
      <CreateDropdown
        onCreateSink={() => setOpenCreate(true)}
        onAddImage={() => setOpenAddItem(true)}
      />

      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Sink</DialogTitle>
            <DialogDescription>Create a new sink to collect your items.</DialogDescription>
          </DialogHeader>
          <SinkCreate
            tags={tags}
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
            onCreateSink={handleCreateSink}
          />
          <DialogFooter />
        </DialogContent>
      </Dialog>

      <Dialog open={openAddItem} onOpenChange={setOpenAddItem}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
            <DialogDescription>Add an image or link to a sink.</DialogDescription>
          </DialogHeader>
          <AddItem />
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </>
  );
}
