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
        <ul className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={session?.user} />
          ))}
        </ul>
      </div>
      <div className="lg:col-span-3 hidden lg:block"></div>
    </div>
  );
};

export default Home;
