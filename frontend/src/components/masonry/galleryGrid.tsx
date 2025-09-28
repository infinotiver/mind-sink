import { useQuery } from "@tanstack/react-query";
import { getUserItems } from "@/api/items";
import type { Item } from "@/api/items";
import GalleryItem from "./galleryItem";
import { useAuth } from "@/context/AuthProvider";

interface GalleryGridProps {
  columns?: number; // Optional prop to override the number of columns
}

function GalleryGrid({ columns = 4 }: GalleryGridProps) {
  const { user } = useAuth();
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items", user?.user_id],
    queryFn: () =>
      user?.user_id
        ? getUserItems(user.user_id)
        : Promise.reject("User ID is missing"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return `<p>Failed to load items. ${error}</p>`;

  return (
    <div
      className={`
      columns-${columns}
      ${
        columns === 4
          ? "sm:columns-2 lg:columns-3"
          : `sm:columns-${columns} lg:columns-${columns}`
      }
      gap-4
      space-y-4
      `}
    >
      {items.map((image: Item) => (
        <GalleryItem
          key={image._id}
          author={user ? user?.username : ""}
          author_id={user ? user?.user_id : ""}
          path={image.content}
          name={image._id}
          index={image._id}
          sinkName={image.sink_id}
          columns={columns} 
        />
      ))}
    </div>
  );
}

export default GalleryGrid;
