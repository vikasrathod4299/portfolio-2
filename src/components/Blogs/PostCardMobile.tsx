import { Link } from "@tanstack/react-router";
import { NotionImage } from "./Notion/NotionImage";

const SkeletonPostCardMobile = () => (
  <div className="animate-pulse rounded-xl border border-zinc-700/30 p-5 shadow-sm">
    <div className="h-40 w-full rounded bg-gray-700/40 mb-3"></div>
    <div className="h-5 w-2/3 rounded bg-gray-700/40 mb-3"></div>
    <div className="h-4 w-1/3 rounded bg-gray-700/40 mb-4"></div>
    <div className="h-4 w-full rounded bg-gray-700/40 mb-2"></div>
    <div className="h-8 w-24 rounded bg-gray-700/40 mt-4"></div>
  </div>
);

const PostCardMobile = ({thumbnail, title, description, slug}: {thumbnail: string, title: string, description: string, slug: string, isCover: boolean}) => {


  return (
    <div className="max-w-sm rounded-lg overflow-hidden border bg-white dark:bg-zinc-900 border-gray-100 dark:border-gray-700 transition-all duration-300 sm:hidden">
      {/* <img
        className="w-full h-56 object-cover"
        src={thumbnail}
        alt="People working outdoors"
      /> */}
      <NotionImage src={thumbnail} alt={title}  className="object-cover w-full h-56 rounded-t-md"/>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        <Link key={slug} to={`/blog/${slug}` as never} preload="intent" className="shadow-md px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md text-sm font-medium hover:opacity-90 transition-all">
          Read more
        </Link>
      </div>
    </div>

  );
};

export default PostCardMobile;

export { SkeletonPostCardMobile };