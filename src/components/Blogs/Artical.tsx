import NotionRenderer from "./Notion/NotinoRenderer";

interface ArticleProps {
    content: Array<{ type: string; [key: string]: any }>;
}

export default function Article({ content }: ArticleProps) {
  return (
    <article className='  max-w-none'>
      <NotionRenderer blocks={content} />
    </article>
  )
}
