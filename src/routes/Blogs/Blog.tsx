import PostCard from "@/components/Blogs/PostCard";
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

  // --- Skeleton Loader ---
  const SkeletonPostCard = () => (
    <div className="animate-pulse rounded-xl border border-zinc-700/30 p-5 shadow-sm">
      <div className="h-5 w-2/3 rounded bg-gray-700/40 mb-3"></div>
      <div className="h-4 w-1/3 rounded bg-gray-700/40 mb-4"></div>
      <div className="h-4 w-full rounded bg-gray-700/40 mb-2"></div>
      <div className="h-4 w-5/6 rounded bg-gray-700/40"></div>
    </div>
  );

  console.log(isLoading);


  return (
    <Layout>
      {!isPostRoute ? (
        <Page
          title="Vikas Rathod | Blog"
          description="Read my latest blog posts on software engineering, programming, and technology."
        >
          <div className="mt-16 h-screen">
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl sm:text-5xl">Blog</h1>
              <span className="text-lg sm:text-xl">
                I write about software engineering, programming, and technology.
              </span>
              <Input type="text" placeholder="Search posts" />
              <hr className="border-zinc-200 dark:border-zinc-700" />
            </div>


            <div className="mt-5 flex flex-col justify-center gap-5">
              {isLoading ? (posts && posts?.length > 0 ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <h1 className="text-center">No posts available.</h1>
              )) :  [...Array(4)].map((_, i) => (
                <SkeletonPostCard key={i} />
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
