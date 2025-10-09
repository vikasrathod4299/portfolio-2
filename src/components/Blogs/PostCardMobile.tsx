import { Link } from "@tanstack/react-router";
import { NotionImage } from "./Notion/NotionImage";

const SkeletonPostCardMobile = () => { 
  return (
      <div className="max-w-sm rounded-sm overflow-hidden border bg-white dark:bg-zinc-900 border-gray-100 dark:border-gray-700 sm:hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="w-full h-56 bg-gray-200 dark:bg-zinc-800" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded"></div>

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-9 w-24 bg-gray-300 dark:bg-zinc-700 rounded-sm mt-3"></div>
      </div>
    </div>
  )

}

const PostCardMobile = ({thumbnail, title, description, slug}: {thumbnail: string, title: string, description: string, slug: string, isCover: boolean}) => {

  return (
    <div className="max-w-sm rounded-sm overflow-hidden border bg-white dark:bg-zinc-900 border-gray-100 dark:border-gray-700 transition-all duration-300 sm:hidden">
      
      <NotionImage src={thumbnail} alt={title}  className="object-cover w-full h-56 rounded-none"/>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <Link key={slug} to={`/blog/${slug}` as never} preload="intent" className="shadow-md px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-sm text-sm font-medium hover:opacity-90 transition-all">
          Read more
        </Link>
      </div>
    </div>

  );
};

export default PostCardMobile;

export { SkeletonPostCardMobile };