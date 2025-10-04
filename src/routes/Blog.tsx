import Layout from "@/components/Layout"
import Page from "@/components/Page";
import Input from "@/components/Ui/Input";


export default function BlogPage() {
  return (
    <Layout>
      <Page title="Vikas Rathod | Blog" description="Read my latest blog posts on web development, programming, and technology.">
        <div className="mt-16">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl sm:text-5xl">Blog</h1>
          <span className="text-lg sm:text-xl">
            I write about web development, programming, and technology.
          </span>
          <Input
            type="text"
            className=""
            placeholder="Search posts"
          />
          <hr className="border-zinc-200 dark:border-zinc-700" />
        </div>


        </div>
      </Page>

    </Layout>
  );
}