import { Link } from '@tanstack/react-router'
import Card from '../Ui/Card'


const SkeletonPostCard = () => (
  <div className="hidden md:block animate-pulse rounded-sm border border-zinc-700/30 p-5 shadow-sm">
    <div className="h-5 w-2/3 rounded bg-zinc-700/40 mb-3"></div>
    <div className="h-4 w-1/3 rounded bg-zinc-700/40 mb-4"></div>
    <div className="h-4 w-full rounded bg-zinc-700/40 mb-2"></div>
    <div className="h-4 w-5/6 rounded bg-zinc-700/40"></div>
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
            <img
              src={thumbnail}
              alt={title}
              className="w-24 h-24 object-cover rounded-sm"
            />
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