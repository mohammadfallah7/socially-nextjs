import { CardDescription } from "@/components/ui/card";
import {
  cn,
  generateUserImage,
  generateUsername,
  getNotificationInfo,
} from "@/lib/utils";
import { NotificationModel } from "@/types/notification.model";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const Notification = ({
  notification,
}: {
  notification: NotificationModel;
}) => {
  const { Icon, color, description } = getNotificationInfo(notification.type);

  return (
    <li
      className={cn("flex rounded-md gap-4 items-start p-3", {
        "bg-accent ": !notification.read,
      })}
      key={notification.id}
    >
      <Image
        src={generateUserImage(notification.creator.image)}
        alt={notification.creator.name}
        width={30}
        height={30}
        className="rounded-full"
      />
      <div className="space-y-2">
        <Link
          href={`/profile/${generateUsername(notification.creator.email)}`}
          className="flex gap-2 items-center"
        >
          <Icon className={cn(color, "size-4")} />
          <div className="flex gap-1 items-center">
            <span className="font-semibold">{notification.creator.name}</span>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
        <div className="space-y-1">
          {notification.post && (
            <div className="bg-accent p-2 rounded">
              <p className="text-sm">{notification.post.content}</p>
            </div>
          )}
          {notification.comment && (
            <div className="bg-accent p-2 rounded">
              <p className="text-sm">{notification.comment.content}</p>
            </div>
          )}

          <CardDescription>
            {formatDistanceToNow(notification.createdAt, {
              addSuffix: true,
            })}
          </CardDescription>
        </div>
      </div>
    </li>
  );
};

export default Notification;
