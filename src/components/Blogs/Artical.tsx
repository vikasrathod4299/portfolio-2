
interface ArticleProps {
    content: string;
}

export default function Article({ content }: ArticleProps) {
  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
