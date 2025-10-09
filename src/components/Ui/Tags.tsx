
const Tags = ({ tags }: { tags: string[] | undefined }) => {
  return (
    <div className="mb-8 flex flex-wrap gap-1.5 text-xs text-gray-700 overflow-x-auto">
      {' '}
      {tags?.map((tag) => (
        <span
          key={tag}
          className=" inline-block rounded-full px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 shadow-[0_2px_10px_rgba(255,255,255,0.05)] hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-default animate-fade-in "
        >
          {' '}
          #{tag}{' '}
        </span>
      ))}{' '}
    </div>
  )
}

export default Tags
