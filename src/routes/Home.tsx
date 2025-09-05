import Profile from "@/components/Home/Profile";
import Page from "@/components/Page";


export default function Home() {
    return (
        <Page>
            <Profile />
            <div className="mb-10 flex flex-col gap-80">
            </div>
        </Page>
    )
}