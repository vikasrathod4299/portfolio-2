import {NotionToMarkdown} from 'notion-to-md'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ArticleProps {
    content: Array<Record<string, any>>;
}

export default function Article({ content }: ArticleProps) {
    const [markdown, setMarkdown] = useState<string>('');
    const n2m = new NotionToMarkdown({ notionClient: null as any });

    useEffect(() => {
        async function convertContent() {
            try {
                if(!content) return;
                const mdBlocks = await n2m.blocksToMarkdown(content);
                const mdStringObj = n2m.toMarkdownString(mdBlocks);
                setMarkdown(mdStringObj.parent);
            } catch (error) {
                toast.error("Failed to load article content.");
                console.error("Error converting content:", error);      
            }
        }
        convertContent();
    } , [content]);


  return (
    <article className='prose prose-zinc dark:prose-invert max-w-none'>
      <h1>Article Title</h1>
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
    </article>
  )
}
