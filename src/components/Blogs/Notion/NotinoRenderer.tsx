import NotionBlock from "./NotionBlock";

interface NotionRendererProps {
    blocks: Array<{
        type: string;
        [key: string]: any;
    }> | null;
}

const NotionRenderer = ({ blocks }: NotionRendererProps) => {
  if (!blocks || blocks.length === 0) {
    return <div className="text-gray-500">No content available</div>;
  }

  // Group consecutive list items
  const groupedBlocks: Array<
    { type: 'bulleted' | 'numbered'; items: typeof blocks }
    | (typeof blocks extends Array<infer T> ? T : never)
  > = [];
  let currentList: { type: 'bulleted' | 'numbered'; items: typeof blocks } | null = null;

  blocks.forEach((block) => {
    if (block.type === 'bulleted_list_item') {
      if (!currentList || currentList.type !== 'bulleted') {
        currentList = { type: 'bulleted', items: [] };
        groupedBlocks.push(currentList);
      }
      currentList.items.push(block);
    } else if (block.type === 'numbered_list_item') {
      if (!currentList || currentList.type !== 'numbered') {
        currentList = { type: 'numbered', items: [] };
        groupedBlocks.push(currentList);
      }
      currentList.items.push(block);
    } else {
      currentList = null;
      groupedBlocks.push(block);
    }
  });

  return (
    <div className="max-w-3xl mx-auto font-sans text-zinc-900 dark:text-white">
      {groupedBlocks.map((item, index) => {
        if (item.type === 'bulleted') {
          return (
            <ul key={index} className="mb-4">
              {item.items.map((block: typeof blocks extends Array<infer T> ? T : any, i: number) => (
                <NotionBlock key={`${index}-${i}`} block={block} />
              ))}
            </ul>
          );
        } else if (item.type === 'numbered') {
          return (
            <ol key={index} className="mb-4">
              {item.items.map((block: typeof blocks extends Array<infer T> ? T : any, i: number) => (
                <NotionBlock key={`${index}-${i}`} block={block} />
              ))}
            </ol>
          );
        } else {
          return <NotionBlock key={index} block={item} />;
        }
      })}
    </div>
  );
};

export default NotionRenderer;