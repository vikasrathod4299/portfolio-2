import ReactMarkdown from 'react-markdown'
import remarkGfm from  'remark-gfm'
interface ArticleProps {
    content: string;
}

export default function Article({ content }: ArticleProps) {

  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
        {content ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown> : <p>No content available</p>}
    </article>
  )
}
