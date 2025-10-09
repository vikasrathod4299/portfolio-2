// import { useState } from "react";

// export function NotionImage({ src, alt }: { src: string; alt?: string }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div className="aspect-[16/9] mt-10 w-full relative overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
//       <img
//         src={src}
//         alt={alt}
//         onLoad={() => setLoaded(true)}
//         className={`transition-opacity duration-500 ease-in-out mx-auto w-full h-full  object-cover ${
//           loaded ? "opacity-100" : "opacity-0"
//         }`}
//         loading="lazy"
//       />
//       {!loaded && (
//         <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700" />
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import clsx from "clsx";

interface NotionImageProps {
  src: string;
  alt?: string;
  /** Aspect ratio preset (e.g., 16/9, 1/1, auto for free flow) */
  aspect?: string;
  /** Optional width & height for fixed-size usage (like thumbnails) */
  width?: number | string;
  height?: number | string;
  /** Optional rounded corner style */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Optional className for custom overrides */
  className?: string;
  /** Optional priority flag for LCP images */
  priority?: boolean;
}

export function NotionImage({
  src,
  alt = "",
  aspect = "16/9",
  width,
  height,
  rounded = "md",
  className,
  priority = false,
}: NotionImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx(
        "relative overflow-hidden bg-zinc-200 dark:bg-zinc-800",
        rounded !== "none" && `rounded-${rounded}`,
        aspect !== "auto" && `aspect-[${aspect}]`,
        width && `w-[${width}]`,
        height && `h-[${height}]`,
        className
      )}
      style={{
        width: width || "100%",
        height: height || undefined,
      }}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={clsx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />

      {/* 🔄 Shimmer Placeholder */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700" />
      )}
    </div>
  );
}

