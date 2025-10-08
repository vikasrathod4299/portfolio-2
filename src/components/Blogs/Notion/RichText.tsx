
interface RichTextProps {
    text: Array<{
        plain_text?: string;
        text?: {
            content: string;
            link?: { url: string } | null;
        };
        annotations?: {
            bold?: boolean;
            italic?: boolean;
            strikethrough?: boolean;
            underline?: boolean;
            code?: boolean;
            color?: string;
        };
    }>;
}   

const RichText = ({ text }: RichTextProps) => {
  if (!text || text.length === 0) return null;

  return (
    <>
      {text.map((segment, i) => {
        let content: React.ReactNode = segment.plain_text || segment.text?.content || '';
        const annotations = segment.annotations || {};
        const link = segment.text?.link;

        // Apply annotations
        if (annotations.bold) content = <strong>{content}</strong>;
        if (annotations.italic) content = <em>{content}</em>;
        if (annotations.strikethrough) content = <s>{content}</s>;
        if (annotations.underline) content = <u>{content}</u>;
        if (annotations.code) content = <code className="bg-gray-100 dark:bg-gray-800 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded text-sm ">{content}</code>;
        
        if (link) {
          content = (
            <a href={link.url} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          );
        }

        return <span key={i}>{content}</span>;
      })}
    </>
  );
};

export default RichText;