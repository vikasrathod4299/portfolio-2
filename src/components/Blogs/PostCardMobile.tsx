import { Link } from "@tanstack/react-router";


const PostCardMobile = ({thumbnail , title, description, slug}: {thumbnail: string, title: string, description: string, slug: string}) => {

  return (
    <div className="max-w-sm rounded-lg overflow-hidden border bg-white dark:bg-zinc-900 border-gray-100 dark:border-gray-700 transition-all duration-300 sm:hidden">
      <img
        className="w-full h-56 object-cover"
        src={thumbnail}
        alt="People working outdoors"
      />
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