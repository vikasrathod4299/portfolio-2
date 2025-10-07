import NotionRenderer from "./Notion/NotinoRenderer";

interface ArticleProps {
    content: Post['content'];
}

export default function Article({ content }: ArticleProps) {
  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
      { content ? <NotionRenderer blocks={content} /> : null }
    </article>
  )
}
