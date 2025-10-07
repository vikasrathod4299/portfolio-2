import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";


interface ArticleProps {
    recordMap: any
}

export default function Article({ recordMap }: ArticleProps) {
  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
      <NotionRenderer recordMap={recordMap}  fullPage={true} darkMode={true} />
    </article>
  )
}
