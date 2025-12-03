import experiences from '../../../data/experiences.json';
import { useState } from 'react';

import Section from '../Section';
import ExperienceDetails from './ExperienceDetails';
import ExperienceTab from './ExperienceTab';

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <Section label="Where I've Worked">
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Tab Navigation - Horizontal scroll on mobile, vertical on desktop */}
        <div className="flex overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <div className="flex sm:flex-col gap-2 sm:gap-0 sm:min-w-fit sm:border-l-2 sm:border-gray-200 dark:sm:border-zinc-700">
            {experiences.map(({ company }, index) => (
              <ExperienceTab
                key={index}
                label={company.name}
                active={index === activeExperience}
                onClick={() => setActiveExperience(index)}
              />
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <div className="sm:pl-8">
          <ExperienceDetails experience={experiences[activeExperience]} />
        </div>
      </div>
    </Section>
  );
}
