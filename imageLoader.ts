// Custom image loader for Next.js static export
// Returns the image source path as-is without optimization
// This prevents Next.js from trying to use the /_next/image API which isn't available in static builds
export default function imageLoader({ src }: { src: string }) {
  return src;
}
