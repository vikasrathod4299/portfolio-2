import Article from '@/components/Blogs/Artical'
import Comments from '@/components/Blogs/Comments'
import { NotionImage } from '@/components/Blogs/Notion/NotionImage'
import Page from '@/components/Page'
import Tags from '@/components/Ui/Tags'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import axios from 'axios'


export function BlogPost() {
  const { slug } = useParams({ from: '/blog/$slug' as never })

  const { data: postData, isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async (): Promise<Post> => {
      const result = await axios.get(`/blogs/${slug}`)
      return result.data.post
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  
  if (isLoading) {
    return (
      <Page title="Loading..." description="Fetching article">
        <div className="mb-16 mt-32 animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-3/4 mb-6 rounded bg-zinc-700/40"></div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-16 rounded-full bg-zinc-700/40"></div>
            ))}
          </div>

          {/* Author + Date Skeleton */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-full bg-zinc-700/40"></div>
            <div className="h-4 w-40 rounded bg-zinc-700/40"></div>
            <div className="h-4 w-24 rounded bg-zinc-700/40"></div>
          </div>

          {/* Cover Image Skeleton */}
          <div className="aspect-[16/9] h-full w-full rounded bg-zinc-700/40 mb-10"></div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-zinc-700/40"></div>
            ))}
          </div>
        </div>
      </Page>
    )
  }

  let { title, description, cover, date, tags, readingTime, content } =
    postData || {}

  return (
    <Page
      title={`${title} - Vikas Rathod`}
      description={description}
      image={cover}
      date={date ? new Date(date).toISOString() : undefined}
      type="article"
    >
      <div className="mb-16  mt-32">
        <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">{title}</h1>

        {tags && tags.length > 0 ? (
          <Tags tags={tags} />
        ) : null}

        <div className="flex flex-col w-full text-lg sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img
              src="/media/profile.jpeg"
              alt="Author"
              height={24}
              width={24}
              className="rounded-full object-cover"
            />
            <span>Vikas Rathod / </span>
            {date
              ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })
              : null}
          </div>
          <span className="sm:ml-auto">{readingTime} min read</span>
        </div>

        {cover ? (
            <NotionImage src={cover} alt={title}  aspect='16/9' width={'full'}  className='mt-10 rounded'/>
        ) : null}
      </div>

      {content ? <Article content={content} /> : null}

      <Comments />
    </Page>
  )
}
