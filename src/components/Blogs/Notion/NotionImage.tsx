import { useState } from "react";

export function NotionImage({ src, alt }: { src: string; alt?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-[16/9] mt-10 w-full relative overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ease-in-out mx-auto w-full h-full  object-cover ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
      />
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700" />
      )}
    </div>
  );
}
