import ContactSection from "@/components/Home/ContactSection";
import ExperienceSection from "@/components/Home/Experience";
import Profile from "@/components/Home/Profile";
import SkillsSection from "@/components/Home/SkillSection";
import Page from "@/components/Page";


export default function Home() {
    return (
        <Page>
            <Profile />
            <div className="mb-10 flex flex-col gap-32">
                <SkillsSection />
                <ExperienceSection />
                <ContactSection />
            </div>
        </Page>
    )
}