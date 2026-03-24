export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `https://res.cloudinary.com/optimus-media/image/upload/f_auto,q_${
    quality || "auto"
  },w_${width}/${src}`;
}
