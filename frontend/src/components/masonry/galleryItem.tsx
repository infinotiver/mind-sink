import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { TbExternalLink, TbUser } from 'react-icons/tb';

interface GalleryItemProps {
  index: string | number;
  author: string;
  author_id: string;
  path: string;
  name: string;
  sinkName?: string;
  tags?: string[];
  compact?: boolean;
}

export default function GalleryItem({
  index,
  author,
  author_id,
  path,
  name,
  sinkName = 'Unable to fetch',
  tags = [],
  compact = false,
}: GalleryItemProps) {
  return (
    <div className="relative group">
      <img
        key={index}
        src={path}
        alt={name}
        className="w-full mb-4 rounded-lg shadow-md break-inside-avoid object-cover group-hover:grayscale transition-transform duration-200 ease-out"
      />
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-sm rounded-lg" />
        <div className="relative z-10 flex flex-col w-full justify-between items-start">
          <div className="mb-2">
            <Button variant="ghost" size="sm" className="px-2 py-1" asChild>
              <Link
                to={`/dashboard/items/${index}`}
                className={`flex items-center space-x-2 ${compact ? 'text-[10px]' : 'text-sm'} text-foreground`}
              >
                <TbExternalLink className="opacity-90" />
                <span className="font-medium">View</span>
              </Link>
            </Button>
          </div>

          {sinkName && (
            <p
              className={`mb-2 text-xs ${compact ? 'text-[10px]' : 'sm:text-sm'} text-foreground ml-1`}
            >
              {sinkName}
            </p>
          )}

          <div className="mb-2 flex gap-2 items-center ml-1">
            <Link
              to={`/users/${author_id}`}
              className="flex items-center gap-2 hover:underline hover:text-muted-foreground"
            >
              <TbUser className="opacity-90" />
              <span className={`${compact ? 'text-xs' : 'text-sm'}`}>{author}</span>
            </Link>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-end gap-2 mt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs ${compact ? 'px-2 py-0.5' : 'px-2 py-1'} rounded-md border bg-muted text-foreground/90`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
