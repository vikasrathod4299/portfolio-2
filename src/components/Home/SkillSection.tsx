import skills from '../../data/skills.json';

import Section from './Section';
import SkillsSphere from './SkillsSphere';

export default function SkillsSection() {
  return (
    <Section
      className="mt-16"
      label="Skills"
      description="Here are a few technologies I’ve been working with recently:"
    >
     <SkillsSphere skillsData={skills} />
    </Section>
  );
}
