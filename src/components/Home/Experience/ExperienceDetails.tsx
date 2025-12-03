interface Props {
  experience: Experience;
}

export default function ExperienceDetails({ experience }: Props) {
  const { company, position, startDate, endDate, descriptions } = experience;

  return (
    <div className="flex flex-col gap-4 animate-fade-in" key={company.name}>
      {/* Position & Company */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold md:text-2xl text-gray-900 dark:text-white">
          {position}
        </h2>
        <a
          href={company.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="text-gray-800 dark:text-white">@</span> {company.name}
          {company.url && (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </a>
      </div>

      {/* Date Range - Brutalist pill */}
      <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/30 px-3 py-1.5 w-fit">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{startDate} — {endDate || 'Present'}</span>
      </div>

      {/* Descriptions - Brutalist list style */}
      <ul className="mt-2 flex flex-col gap-3">
        {descriptions.map((item, index) => (
          <li key={index} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
            <span className="text-gray-800 dark:text-white font-bold mt-0.5">→</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
