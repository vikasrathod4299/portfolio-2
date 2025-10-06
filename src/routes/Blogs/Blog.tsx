import PostCard from "@/components/Blogs/PostCard";
import Layout from "@/components/Layout"
import Page from "@/components/Page";
import Input from "@/components/Ui/Input";
import { Outlet, useLocation, useMatch } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const DummyPosts: Array<Post> = [
    {
        id: "1123",
        title: "First Post",
        description: "This is the first post",
        slug: "first-post",
        date: "2023-01-01",
        cover: "https://via.placeholder.com/150",
        tags: ["react", "javascript"],
        published: true,
        author: "string",
        readingTime: 5,
        url: "string"
    },
    {
        id: "123",
        title: "Second Post",
        description: "This is the second post",
        slug: "second-post",
        date: "2023-01-02",
        cover: "https://via.placeholder.com/150",
        tags: ["react", "javascript"],
        published: true,
        author: "string",
        readingTime:5,
        url: "string",

    }
];

export default function BlogPage() {
    const [posts, setPosts] = useState<Array<Post>>([]);

    const isPostRoute = useLocation().pathname !== '/blog';

    const getPosts = async () => {
        const response = await axios.get('/blogs');
        const { posts } = response.data;
        //const posts = DummyPosts;
        setPosts(posts);
    };

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, []);


  return (
    <Layout>
      {!isPostRoute ? <Page title="Vikas Rathod | Blog" description="Read my latest blog posts on web development, programming, and technology.">
        <div className="mt-16 h-screen">
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
            posts?.length > 0 ? posts.map((post) => (
              <PostCard key={post.id} post={post} />
            )) : (
              <h1 className="text-center">No posts available.</h1>
            )
          }
        </div>
        </div>
      </Page>
      :
      <Outlet/>}
    </Layout>
  );
}