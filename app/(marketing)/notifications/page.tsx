import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserNotifications } from "@/data/notification.data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Notification from "./_components/notification";

const Notifications = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const notifications = await getUserNotifications(session.user.id);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="justify-between items-center flex">
          <CardTitle>Notifications</CardTitle>
          <div className="flex items-center gap-2">
            <CardDescription>{unreadNotifications} unread</CardDescription>
            {unreadNotifications > 0 && (
              <Button variant="ghost" size="sm" className="cursor-pointer">
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 w-full">
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notifications;
