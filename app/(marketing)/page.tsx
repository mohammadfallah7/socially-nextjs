import { getPosts } from "@/data/post.data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CreatePostForm from "./_components/create-post-form";
import PostCard from "./_components/post-card";

const Home = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const posts = await getPosts();

  return (
    <div className="grid lg:grid-cols-9 lg:gap-6">
      <div className="lg:col-span-6 space-y-6">
        {session && <CreatePostForm user={session.user} />}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={session?.user} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-3"></div>
    </div>
  );
};

export default Home;
