import { getUserByEmail } from "@/data/user.data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import UserProfileInformation from "./_components/user-profile-information";
import UserProfileTabs from "./_components/user-profile-tabs";

const UserProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const email = `${username}@gmail.com`;

  const session = await auth.api.getSession({ headers: await headers() });
  const user = await getUserByEmail(email);
  if (!user) notFound();

  const isYourProfile = session?.user.id === user.id;
  const alreadyFollowing = isYourProfile
    ? false
    : user.followers.some((f) => f.followerId === session?.user.id);

  return (
    <div className="space-y-8">
      <UserProfileInformation
        alreadyFollowing={alreadyFollowing}
        isYourProfile={isYourProfile}
        user={user}
        isLoggedIn={!!session}
      />
      <UserProfileTabs userId={user.id} sessionUser={session?.user} />
    </div>
  );
};

export default UserProfilePage;
