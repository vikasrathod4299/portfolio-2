import { NotionAPI } from 'notion-client'
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x'
import 'react-notion-x/src/styles.css'

interface ArticleProps {
    pageId: string;
}

export default function Article({ pageId }: ArticleProps) {
    const [recordMap, setRecordMap] = useState<any>(null)

    useEffect(() => {
        async function fetchPage() {
      if (!pageId) return;
      const notion = new NotionAPI()
      const data = await notion.getPage(pageId)
      setRecordMap(data)
    }
    fetchPage()

    }, [pageId])

  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
        {recordMap ? <NotionRenderer recordMap={recordMap} /> : <p>Loading...</p>}
    </article>
  )
}
