import RichText from "./RichText";

interface NotionBlockProps {
    block: {
        type: string;
        [key: string]: any;
    } | null;
    }

const NotionBlock = ({ block }: NotionBlockProps) => {
  if (!block) return null;

  const { type } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p className="mb-2 leading-relaxed">
          <RichText text={value.rich_text} />
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          <RichText text={value.rich_text} />
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="text-2xl font-bold mt-6 mb-3">
          <RichText text={value.rich_text} />
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="text-xl font-bold mt-4 mb-2">
          <RichText text={value.rich_text} />
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li className="ml-6 mb-1 list-disc">
          <RichText text={value.rich_text} />
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="ml-6 mb-1 list-decimal">
          <RichText text={value.rich_text} />
        </li>
      );

    case 'to_do':
      return (
        <div className="flex items-start mb-2">
          <input 
            type="checkbox" 
            checked={value.checked} 
            readOnly 
            className="mt-1 mr-2"
          />
          <span className={value.checked ? 'line-through text-gray-500' : ''}>
            <RichText text={value.rich_text} />
          </span>
        </div>
      );

    case 'toggle':
      return (
        <details className="mb-2">
          <summary className="cursor-pointer hover:bg-gray-50 p-1 rounded">
            <RichText text={value.rich_text} />
          </summary>
        </details>
      );

    case 'code':
      return (
        <pre className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 overflow-x-auto">
          <code className="text-sm font-mono">
            <RichText text={value.rich_text} />
          </code>
        </pre>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-white pl-4 py-2 mb-4 italic">
          <RichText text={value.rich_text} />
        </blockquote>
      );

    case 'callout':
      return (
        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded">
          <div className="flex items-start">
            {value.icon?.emoji && <span className="mr-2 text-xl">{value.icon.emoji}</span>}
            <div>
              <RichText text={value.rich_text} />
            </div>
          </div>
        </div>
      );

    case 'divider':
      return <hr className="my-6 border-gray-300" />;

    case 'image':
      const imgSrc = value.type === 'external' ? value.external.url : value.file?.url;
      return (
        <figure className="my-4">
          <img src={imgSrc} alt={value.caption?.[0]?.plain_text || ''} className="w-full rounded" />
          {value.caption?.length > 0 && (
            <figcaption className="text-sm text-gray-600 mt-2 text-center">
              <RichText text={value.caption} />
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      const videoSrc = value.type === 'external' ? value.external.url : value.file?.url;
      return (
        <div className="my-4">
          <video controls className="w-full rounded">
            <source src={videoSrc} />
          </video>
        </div>
      );

    case 'bookmark':
    case 'link_preview':
      return (
        <a 
          href={value.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block border border-gray-300 rounded p-4 mb-4 hover:bg-gray-50"
        >
          {value.url}
        </a>
      );

    default:
      return null;
  }
};

export default NotionBlock;