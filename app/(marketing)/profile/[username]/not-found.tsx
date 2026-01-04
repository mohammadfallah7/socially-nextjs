import { LucideCircleQuestionMark } from "lucide-react";

const ProfileNotFound = () => {
  return (
    <div className="flex flex-col gap-3 items-center h-56 justify-center">
      <LucideCircleQuestionMark className="size-8" />
      <h2 className="font-semibold text-lg">User not found</h2>
    </div>
  );
};

export default ProfileNotFound;
