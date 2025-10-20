import PostCard, { SkeletonPostCard } from "@/components/Blogs/PostCard";
import PostCardMobile, { SkeletonPostCardMobile } from "@/components/Blogs/PostCardMobile";
import Layout from "@/components/Layout";
import Page from "@/components/Page";
import Input from "@/components/Ui/Input";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "@tanstack/react-router";
import axios from "axios";

const getPosts = async (): Promise<Array<Post>> => {
  const result = await axios.get("/blogs");
  return result?.data?.posts || []; 
};

export default function BlogPage() {
  const isPostRoute = useLocation().pathname !== "/blog";

  const { data: posts = [], isLoading } = useQuery<Array<Post>>({
    queryKey: ["blogPosts"],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <Layout>
      {!isPostRoute ? (
        <Page
          title="Vikas Rathod | Blog"
          description="Read my latest blog posts on software engineering, programming, and technology."
        >
          <div className="h-screen my-32">
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl sm:text-5xl">Blog</h1>
              <span className="text-lg sm:text-xl">
                I write about software engineering, programming, and technology.
              </span>
              <Input type="text" placeholder="Search posts" />
              <hr className="border-zinc-200 dark:border-zinc-700" />
            </div>


            <div className="mt-5 flex flex-col justify-center gap-5">
              {!isLoading ? (posts && posts?.length > 0 ? (
                posts.map((post) => (
                  <>
                    <PostCard key={post.id} post={post} />
                    <PostCardMobile key={post.id} isCover={post.thumbnail !== null} thumbnail={post.thumbnail || ""} title={post.title} description={post.description || ""} slug={post.slug} />
                  </>
                ))
              ) : (
                <h1 className="text-center">No posts available.</h1>
              )) :  [...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="hidden sm:block">
                      <SkeletonPostCard />
                    </div>
                    <div className="sm:hidden">
                      <SkeletonPostCardMobile key={i} />
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </Page>
      ) : (
        <Outlet />
      )}
    </Layout>
  );
}
