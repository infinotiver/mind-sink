import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FiExternalLink, FiUser } from "react-icons/fi";

interface GalleryItemProps {
  index: string | number;
  author: string;
  author_id: string;
  path: string;
  name: string;
  sinkName?: string;
  tags?: string[];
  columns: number; // Add columns prop
}

export default function GalleryItem({
  index,
  author,
  author_id,
  path,
  name,
  sinkName = "Unable to fetch",
  tags = [],
  columns,
}: GalleryItemProps) {
  const textSize = `text-${columns === 1 ? "[10px]" : columns === 2 ? "xs" : columns === 3 ? "base" : "xl"}`; 
  console.log(textSize);

  return (
    <div className="relative group">
      <img
        key={index}
        src={path}
        alt={name}
        className="w-full mb-4 rounded-lg  shadow-md break-inside-avoid group-hover:filter group-hover:grayscale transition-filter"
      />
      <div className="absolute inset-0 flex items-end bg-black/50 opacity-0 group-hover:opacity-100 transition p-4">
        <div className="flex flex-col w-full justify-between items-start">
          <Button variant="link" size="sm" asChild className="mb-2">
            <Link
              to={`/dashboard/items/${index}`}
              className="flex items-center space-x-1 text-base"
            >
              <FiExternalLink />
              <span>View</span>
            </Link>
          </Button>

          {sinkName && (
            <p className={`text-base ${textSize} text-foreground mb-2 ml-2`}>
              {sinkName}
            </p>
          )}
          <p
            className={`text-base ${textSize} flex gap-1 items-center justify-center text-foreground mb-2 ml-2`}
          >
            <Link to={`/users/${author_id}`}>
              <div className="flex justify-center items-center gap-2 hover:underline hover:text-muted-foreground">
                <FiUser />
                {author}
              </div>
            </Link>
          </p>
          {tags && (
            <div className="flex flex-wrap justify-end gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm px-2 py-1 rounded-md border bg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
