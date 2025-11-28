import { CardDescription, CardTitle } from "@/components/ui/card";
import { generateUserImage, generateUsername } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface IAuthorProps extends PropsWithChildren {
  author: {
    name: string;
    email: string;
    image: string | null;
  };
  createdAt: Date;
}

const Author: FC<IAuthorProps> = ({ children, author, createdAt }) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/profile/${generateUsername(author.email)}`}
        className="flex gap-3 items-start lg:items-center"
      >
        <Image
          src={generateUserImage(author.image)}
          alt={author.name}
          width={30}
          height={30}
          className="rounded-full"
        />
        <div className="flex lg:flex-row flex-col gap-0.5 lg:gap-3">
          <CardTitle>{author.name}</CardTitle>
          <CardDescription>@{generateUsername(author.email)}</CardDescription>
        </div>
        <CardDescription>
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </CardDescription>
      </Link>
      {children}
    </div>
  );
};

export default Author;
