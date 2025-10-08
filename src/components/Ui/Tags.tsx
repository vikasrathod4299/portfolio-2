
const TAG_COLORS = [
  "bg-purple-600/50",
  "bg-blue-500/50",
  "bg-amber-700/50",
  "bg-orange-600/50",
  "bg-yellow-500/50",
  "bg-green-600/50",
  "bg-pink-700/50",
  "bg-teal-600/50",
  "bg-red-600/50",
];

function getColorForTag(tag:string) {
  // Use a simple hash so same tag always gets same color
  const hash = [...tag].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return TAG_COLORS[hash % TAG_COLORS.length];
}

const Tags = ({ tags }: { tags: string[] | undefined }) => {
   return (
    <div className="mb-8 flex flex-wrap gap-2 text-xs">
      {tags?.map((tag) => {
        const color = getColorForTag(tag.toLowerCase());
        return (
          <span
            key={tag}
            className={`
              inline-block
              rounded-md
              px-3 py-1
              font-medium
              text-white
              ${color}
              dark:text-gray-100
              shadow-sm
              hover:opacity-90
              transition-all
              duration-200
              cursor-default
            `}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default Tags;
