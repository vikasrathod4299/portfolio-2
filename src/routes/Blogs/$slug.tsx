import Page from '@/components/Page'
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import axios from 'axios';



export function BlogPost() {
    const { slug } = useParams({from: '/blog/$slug' as never});


    const {data: postData, } = useQuery({
        queryKey: ['blogPost', slug],
        queryFn: async (): Promise<Post> => {
            const result = await axios.get(`/blogs/${slug}`);
            return result.data.post;
        }
    })

    const { title, description, cover, date, tags, readingTime, content} = postData  || {};


  return (
    <Page
      title={`${title} - Vikas Rathod`}
      description={description}
      image={cover}
      date={date ? new Date(date).toISOString() : undefined}
      type="article"
    >
        <div className='my-16'>
            <h1 className='mb-4 text-4xl font-semibold sm:text-5xl'>{title}</h1>

            <div className='mb-8 flex flex-wrap gap-2 text-sm text-gray-500'>
              {tags?.map((tag) => (
                <span key={tag} className='inline-block rounded-full bg-gray-200 px-3 py-1'>
                  {tag}
                </span>
              ))}
            </div>
            <div className='flex flex-col w-full text-lg sm:flex-row sm:items-center'>
                <div className='flex items-center gap-3'>
                    <img src='/media/profile.jpeg' alt='Author' className='h-10 w-10 rounded-full object-cover'/>
                    <span>Vikas Rathod /{' '}</span>
                    {date ? new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }) : null}
                </div>
                <span className='sm:ml-auto'>{readingTime} min read</span>
            </div>

            {cover ? (
                <div className='relative mt-16 w-full'>
                    <img
                        src={cover}
                        alt={title}
                        sizes='50vw'
                        height={9}
                        width={16}
                        object-fit='cover'
                        className='rounded shadow-md' 
                    />
                </div>
            ) : null}
        </div>

        {content ? (
            <div className='prose prose-zinc dark:prose-invert max-w-none'>
                {/* Render the content here */}
                <h1>Content here</h1>
            </div>
        ) : null}

    </Page>
  )
}
