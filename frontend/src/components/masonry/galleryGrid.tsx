import { useQuery, useQueries } from "@tanstack/react-query";
import { getUserItems } from "@/api/items";
import type { Item } from "@/api/items";
import GalleryItem from "./galleryItem";
import { useAuth } from "@/context/AuthProvider";
import { getSink } from "@/api/sinks";
import type { Sink } from "@/api/sinks";
import { Spinner } from "@/components/ui/spinner";
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
  const sinkQueries = useQueries({
    queries: items.map((it: Item) => ({
      queryKey: ["sink", it.sink_id],
      queryFn: () => getSink(it.sink_id) as Promise<Sink>,
      enabled: !!it.sink_id,
    })),
  });
  if (isLoading)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-muted-foreground">Loading items…</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-700">
        Failed to load items: {String(error)}
      </div>
    );

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
      {items.map((image: Item, i: number) => {
        const sink = sinkQueries[i]?.data as Sink | undefined;
        const sinkName = sink?.title ?? "";
        return (
          <div key={image._id}>
            <GalleryItem
              name={image._id}
              index={image._id}
              author={user?.username || ""}
              author_id={user?.user_id || ""}
              path={image.content}
              sinkName={sinkName}
              tags={image.tags}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GalleryGrid;
