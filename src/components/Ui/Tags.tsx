
const Tags = ({ tags }: { tags: string[] | undefined }) => {
  return (
    <div
      className="
        mb-8 flex gap-2 text-xs overflow-x-auto whitespace-nowrap scroll-smooth
        [scrollbar-width:none] [-ms-overflow-style:none]
      "
    >
      {/* Hide scrollbar visually */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {tags?.map((tag) => (
        <span
          key={tag}
          className="
            inline-block rounded-full px-3 py-1
            backdrop-blur-md border
            bg-white/30 border-white/40 text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)]
            hover:bg-white/40 hover:border-white/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
            dark:bg-white/10 dark:border-white/20 dark:text-gray-100 dark:shadow-[0_2px_10px_rgba(255,255,255,0.05)]
            dark:hover:bg-white/20 dark:hover:border-white/30
            transition-all duration-300 cursor-default animate-fade-in
          "
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}

export default Tags
