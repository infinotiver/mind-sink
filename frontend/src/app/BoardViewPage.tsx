import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getItemsBySink, type Item } from "@/api/items";
import { getSink } from "@/api/sinks";
import type { Sink } from "@/api/sinks";
import GalleryItem from "@/components/masonry/galleryItem";
import { getUserProfile } from "@/api/profile";
import { FiEye } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function BoardViewPage() {
  const { sinkID } = useParams<{ sinkID: string }>();

  const {
    data: sink,
    isLoading: isSinkLoading,
    error: sinkError,
  } = useQuery<Sink>({
    queryKey: ["sink", sinkID],
    queryFn: () =>
      sinkID ? getSink(sinkID) : Promise.reject("Sink not found"),
    enabled: !!sinkID,
  });

  const {
    data: items,
    isLoading: areItemsLoading,
    error: itemsError,
  } = useQuery({
    queryKey: ["items", sinkID],
    queryFn: () =>
      sinkID ? getItemsBySink(sinkID) : Promise.reject("Items not found"),
    enabled: !!sinkID,
  });
  const { data: userData, error: userError } = useQuery({
    queryKey: ["users", sink?.user_id],
    queryFn: () =>
      sink ? getUserProfile(sink?.user_id) : Promise.reject("Sink not found"),
    enabled: !!sink,
  });

  if (isSinkLoading || areItemsLoading) return <div>Loading...</div>;
  if (itemsError || sinkError || userError) return <p>Failed to load item.</p>;
  return (
    <>
      <div className="flex flex-col gap-2 p-4 bg-background rounded-md shadow-md mb-4">
        <div className="text-2xl text-foreground">{sink?.title}</div>
        <div className="flex gap-2 items-center text-md text-foreground">
          <Avatar>
            <AvatarImage src={userData?.avatar_url} />
            <AvatarFallback>XX</AvatarFallback>
          </Avatar>
          {userData?.username}
        </div>
        <p className="text-sm text-muted-foreground">
          {sink?.description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {sink?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary text-foreground text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex max-w-28 items-center justify-center gap-2 text-sm text-muted-foreground py-1 px-4 rounded-2xl border border-accent-foreground/25 bg-accent/50">
          <FiEye />
          {sink?.visibility}
        </div>
      </div>
      <div className="columns-2 sm:columns-3 lg:columns-4">
        {items?.map((item: Item) => (
          <GalleryItem
            key={item._id}
            author={sink?.user_id || ""}
            author_id={sink?.user_id || ""}
            path={item.content}
            name={item._id}
            index={item._id}
            sinkName={sink?.title}
          />
        ))}
      </div>
    </>
  );
}
