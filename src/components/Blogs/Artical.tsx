import { NotionAPI } from 'notion-client'
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x'
import 'react-notion-x/src/styles.css'
import { toast } from 'sonner';

interface ArticleProps {
    pageId: string;
}

export default function Article({ pageId }: ArticleProps) {
    const [recordMap, setRecordMap] = useState<any>(null)

    useEffect(() => {
    async function fetchPage() {
      try {
        if (!pageId) return;
        const notion = new NotionAPI()
        pageId = `Hello-world-${pageId.replace(/-/g, '')}`
        toast.info(pageId)

        const data = await notion.getPage('Hello-world-28242431d1e88019a7cbd3579d73cadc')
        setRecordMap(data)
      } catch (error) {
        console.error('Error fetching Notion page:', error)
        toast.error('Failed to load article content.')
      }
    }
    fetchPage()

    }, [pageId])

  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
        {recordMap ? <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true}  /> : <p>Loading...</p>}
    </article>
  )
}
