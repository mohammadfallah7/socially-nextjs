import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CreatePostForm from "./_components/create-post-form";

const Home = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="grid lg:grid-cols-9 lg:gap-6">
      <div className="lg:col-span-6">
        {session && <CreatePostForm user={session.user} />}
      </div>
      <div className="hidden lg:block lg:col-span-3"></div>
    </div>
  );
};

export default Home;
