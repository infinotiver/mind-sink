import GalleryItem from "./galleryItem";

interface ImageProps {
  id: number;
  name: string;
  source: string;
}

const images: ImageProps[] = [
  { id: 1, name: "Image 1", source: "/pins/1.png" },
  { id: 2, name: "Image 2", source: "/pins/2.png" },
  { id: 3, name: "Image 3", source: "/pins/3.png" },
  { id: 4, name: "Image 4", source: "/pins/4.png" },
  { id: 5, name: "Image 5", source: "/pins/5.png" },
];

function GalleryGrid() {
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
      {images.map((image) => (
        <GalleryItem key={image.id} index={image.id} path={image.source} name={image.name} />
      ))}
    </div>
  );
}

export default GalleryGrid;
