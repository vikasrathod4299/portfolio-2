import PostCard from "@/components/Blogs/PostCard";
import Layout from "@/components/Layout"
import Page from "@/components/Page";
import Input from "@/components/Ui/Input";
import { useEffect, useState } from "react";



export default function BlogPage() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    const getPosts = async () => {
        const response = await fetch('/blogs');
        const data = await response.json();
        console.log(data)
        setPosts(data);
    };

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, []);


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

        <div className="mt-5 flex flex-col justify-center gap-5">
          {
            posts.length > 0 ? posts.map((post) => (
              <PostCard key={post.id} post={post} />
            )) : (
              <h1 className="text-center">No posts available.</h1>
            )
          }

        </div>


        </div>
      </Page>

    </Layout>
  );
}