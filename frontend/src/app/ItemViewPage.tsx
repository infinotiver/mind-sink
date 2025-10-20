import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getItem, useDeleteItem, useUpdateItem } from '@/api/items';
import type { Item } from '@/api/items';
import ImagePreview from '@/components/itemview/ImagePreview';
import ItemDetails from '@/components/itemview/ItemDetails';
import GalleryGrid from '@/components/masonry/galleryGrid';
import { getSink } from '@/api/sinks';
import { getUserProfile } from '@/api/profile';
import Loading from '@/components/ui/loading';
import ErrorAlert from '@/components/ui/error-alert';
function ItemViewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { itemID } = useParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const {
    data: itemData,
    isLoading,
    error,
  } = useQuery<Item>({
    queryKey: ['items', itemID],
    queryFn: () => (itemID ? getItem(itemID) : Promise.reject('Item not found')),
    enabled: !!itemID,
  });

  const { data: sinkData } = useQuery({
    queryKey: ['sink', itemID],
    queryFn: () => (itemData ? getSink(itemData.sink_id) : Promise.reject('Item not found')),
    enabled: !!itemID,
  });

  const { data: authorData } = useQuery({
    queryKey: ['users', itemID],
    queryFn: () => (sinkData ? getUserProfile(sinkData.user_id) : Promise.reject('Item not found')),
    enabled: !!itemID,
  });
  const deleteMutation = useDeleteItem();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        console.log('All queries invalidated');
        navigate('/dashboard');
      },
    });
  };
  const updateMutation = useUpdateItem();
  const handleUpdate = (item: Item) => {
    console.log('Handling update task');
    updateMutation.mutate(
      { itemId: itemID || '100', data: item },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
        },
      }
    );
  };
  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  if (isLoading) return <Loading message="Loading item…" />;
  if (error) return <ErrorAlert title="Failed to load item" details={String(error)} />;

  return (
    <div className="flex gap-6 w-full h-full">
      <div className="flex flex-col gap-6 w-full lg:w-3/5">
        {itemData ? <ImagePreview item={itemData} /> : <p>Item not found</p>}
        {itemData && authorData && (
          <ItemDetails
            item={itemData}
            sinkData={sinkData}
            authorData={authorData}
            selectedTags={selectedTags}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
      <div className="hidden lg:flex lg:w-2/5">
        <GalleryGrid columns={2} />
      </div>
    </div>
  );
}

export default ItemViewPage;
