interface Props {
  experience: Experience;
}

export default function ExperienceDetails({ experience }: Props) {
  const { company, position, startDate, endDate, descriptions } = experience;

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Position & Company */}
      <div>
        <h2 className="text-xl font-bold sm:text-2xl text-gray-800 dark:text-gray-100">
          {position}
        </h2>
        <a
          href={company.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 dark:text-primary-400 font-semibold hover:underline inline-flex items-center gap-1"
        >
          @ {company.name}
          {company.url && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </a>
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{startDate} - {endDate || 'Present'}</span>
      </div>

      {/* Descriptions */}
      <ul className="mt-2 flex flex-col gap-3">
        {descriptions.map((item, index) => (
          <li key={index} className="flex gap-3 text-gray-600 dark:text-gray-300">
            <span className="text-primary-500 mt-1.5">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
