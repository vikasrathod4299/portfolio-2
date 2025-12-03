import experiences from '../../../data/experiences.json';
import { useState } from 'react';

import Section from '../Section';
import ExperienceDetails from './ExperienceDetails';
import ExperienceTab from './ExperienceTab';

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);

  return (
    <Section label="Where I've Worked">
      {/* Mobile: Horizontal scroll tabs */}
      <div className="md:hidden flex flex-col gap-6 animate-fade-in">
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2">
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
        <ExperienceDetails experience={experiences[activeExperience]} />
      </div>

      {/* Desktop: Side by side layout with brutalist style */}
      <div className="hidden md:flex gap-0 animate-fade-in">
        {/* Left: Tab Navigation */}
        <div className="flex flex-col min-w-[200px] border-r-2 border-gray-800 dark:border-white/80">
          {experiences.map(({ company }, index) => (
            <ExperienceTab
              key={index}
              label={company.name}
              active={index === activeExperience}
              onClick={() => setActiveExperience(index)}
              isDesktop
            />
          ))}
        </div>

        {/* Right: Experience Details */}
        <div className="flex-1 pl-8">
          <ExperienceDetails experience={experiences[activeExperience]} />
        </div>
      </div>
    </Section>
  );
}
