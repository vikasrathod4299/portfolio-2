import { Link } from '@tanstack/react-router'
import Card from '../Ui/Card'
import { NotionImage } from './Notion/NotionImage';


const SkeletonPostCard = () => (
  <div className="flex w-full animate-pulse rounded-sm border border-zinc-300/30 dark:border-zinc-700/30 shadow-sm bg-zinc-100 dark:bg-[#18181b]">
    {/* Thumbnail placeholder */}
    <div className="p-3">
      <div className="w-24 h-24 rounded-sm bg-zinc-200 dark:bg-zinc-700/40"></div>
    </div>

    {/* Content placeholder */}
    <div className="flex flex-grow flex-col gap-3 p-6">
      {/* Title + Date row */}
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:text-center">
        <div className="h-6 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700/40"></div>
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700/40"></div>
      </div>

      {/* Description lines */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700/40"></div>
        <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700/40"></div>
      </div>
    </div>
  </div>
);


interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const { title, description, slug, date, thumbnail } = post
  return (
    <Link key={slug} to={`/blog/${slug}` as never} preload="intent">
      <Card className="w-full hidden sm:flex">
        {thumbnail && (
          <div className="p-3 ">
            <NotionImage src={thumbnail} alt={title} aspect="1/1" width={96} height={96} className="object-cover rounded-sm" />
          </div>
        )}
        <div className="flex flex-grow flex-col gap-3 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:text-center">
            <span className="text-xl font-bold text-black dark:text-white">
              {title}
            </span>
            <span className="text-base">
              {new Date(date).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
          {description ? <span>{description}</span> : null}
        </div>
      </Card>
    </Link>
  )
}

export { SkeletonPostCard }