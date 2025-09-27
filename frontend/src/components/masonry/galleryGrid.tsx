import { useQuery } from "@tanstack/react-query";
import { getUserItems } from "@/api/items";
import type { Item } from "@/api/items";
import GalleryItem from "./galleryItem";
import { useAuth } from "@/context/AuthProvider";

function GalleryGrid() {
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
      className="
        columns-2
        sm:columns-2
        lg:columns-3
        gap-4
        space-y-4
      "
    >
      {items.map((image: Item) => (
        <GalleryItem
          key={image.id}
          author={user ? user?.username : ""}
          path={image.content}
          name={image.id}
          index={image.id}
          sinkName={image.sink_id}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;
