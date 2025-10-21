function PreviewItem({ imageLink }: { imageLink: string }) {
  return (
    <div className="relative flex-1 flex justify-center items-center border rounded bg-muted">
      {imageLink ? (
      <img
        src={imageLink}
        alt="Preview"
        className="rounded-lg shadow-lg object-contain max-h-80 max-w-60"
      />
      ) : (
      <span className="text-center text-muted-foreground">Enter an image link to import image</span>
      )}
    </div>
  );
}

export default PreviewItem;
