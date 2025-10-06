import Page from '@/components/Page'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import axios from 'axios'

//const DummyPost = {
//  id: '123',
//  title: 'Sample Post',
//  description: 'This is a sample post description.',
//  slug: 'sample-post',
//  date: '2023-01-01',
//  cover:
//    'https://prod-files-secure.s3.us-west-2.amazonaws.com/9e064683-7987-4ca6-bd63-40cc069b2c9a/912d1dcc-e632-4e41-98cc-83a668b8c523/ChatGPT_Image_Oct_6_2025_06_41_10_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R77A6WW4%2F20251006%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251006T181445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDYtiTaIerrtsc0zWJPaOF49ZQgpFg7pYD9NuKFuejfnAIhAIInLnfLM6qQBTdVh29SlzZrs5RHMB5k%2B%2F9%2FWaboqrf%2FKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxUhfW8gY0OPE%2FBOPUq3AMu57bmOitooMH50G3JnIdvXAeZS3PuadySex4VuZ%2BlU1uzcOFOyfUD0BjCLETvGtlcrhw%2BJeHsTFdZqvXznkmCI1M86J0obNwNs5JXYdA6e%2BOJf1ymiIhbcuodeEcJ4tjaE11c5LMUUVPAasFIRjPTTszGrvTxgv015hzpOjG%2BjQSFQQB7LC7Y960C%2BcqVGj8gnOx17M0LfgaOLkJNLJI9xxVEjlLUDdVsCXMa4X4aq7ZtYWqQnO1ohXoxbz1UJXbkXGyOO1B1t81oJzdPbB1cL03B2MBJl%2FeAJ%2FhdfRZga3rLCQflMccwgviwhYGKAna%2BqQ5WuCm9I%2Belkt7KOmrD9m1V6HcXcAkBVv6n8KBX5%2BT7FmD5cISRKMsvN%2F9FbXWBFihBvXnfYEZq7sUav18uonpjyDySOaVhqbTn9zO9K77NOuJYn544M3nwfJyCqbhZkCVc4MEBPVFL6AtOk2CebIbkHuanPQvHfeSi4pTgk%2FTrUo%2BdQhqZ%2BKuPRRW2QBjB1LNAJEtKd8NDZW0F3tLJ63FZfDpVbaKgAlfrm%2FfvsSyADBNsz8ETQDnx8fVl1wubiURrPim55NSJ6wDwKtwEao2OPNpTLkyBL%2FVAo1VUkwx%2F2skO4C7C88ddmzDl4o%2FHBjqkAWKDSaOECQw6%2BuPHEAghTMl1Sc%2BIS3UAEHqu8PSRwY8WJin5VnicqJxb6bmowr6TuFWbbcfKbSxxLTcN56rPckRtVMvVC42SDgf4G6skDK2nXOjc3eUKvnYL1XYyqwrwHSamIGCT9wo3WZtitGHSCtRQtm3cFLS96%2FblIfPdeg4zkEMj2c8AyzyEUVCyhah0pjqa8iYN1JfuYm5da6HhX6h34TA2&X-Amz-Signature=f20ccc0b77cda0b443398cc85a04e4fa6a4940613482d93d44bd2880f269a439&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
//  tags: ['sample', 'post'],
//  published: true,
//  readingTime: 5,
//  content: 'here',
//}

export function BlogPost() {
  const { slug } = useParams({ from: '/blog/$slug' as never })

  const { data: postData } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async (): Promise<Post> => {
      const result = await axios.get(`/blogs/${slug}`)
      return result.data.post
    },
  })

  const { title, description, cover, date, tags, readingTime, content } =
    postData || {}
  console.log(cover)

  return (
    <Page
      title={`${title} - Vikas Rathod`}
      description={description}
      image={cover}
      date={date ? new Date(date).toISOString() : undefined}
      type="article"
    >
      <div className="my-16">
        <h1 className="mb-4 text-4xl font-semibold sm:text-5xl">{title}</h1>

        <div className="mb-8 flex flex-wrap gap-1.5 text-xs text-gray-700">
          {tags?.map((tag, i) => (
            <span
              key={tag}
              className="
        inline-block 
        rounded-full 
        px-3 py-1 
        bg-white/10 
        backdrop-blur-md 
        border border-white/20 
        text-gray-100 
        shadow-[0_2px_10px_rgba(255,255,255,0.05)] 
        hover:bg-white/20 
        hover:border-white/30 
        transition-all 
        duration-300 
        cursor-default 
        animate-fade-in
      "
              style={{ animationDelay: `${i * 0.1}s` }} // optional: staggered fade-in
            >
              #{tag}
            </span>
          ))}
        </div>

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
          <div className="relative mt-10 w-full">
            {/* Make this image rectangular from center */}
            <img
              src={cover}
              alt={title}
              className="mx-auto h-auto w-full rounded object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        ) : null}
      </div>

      {content ? (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {/* Render the content here */}
          <h1>Content here</h1>
        </div>
      ) : null}
    </Page>
  )
}
