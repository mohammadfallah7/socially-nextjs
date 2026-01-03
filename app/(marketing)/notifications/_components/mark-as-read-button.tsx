"use client";

import { markNotificationsAsRead } from "@/actions/notification.action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MarkNotificationsAsReadState } from "@/types/notification.model";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const MarkAsReadButton = ({
  notificationIds,
}: {
  notificationIds: string[];
}) => {
  const markNotificationAsReadByNotificationIds = markNotificationsAsRead.bind(
    null,
    notificationIds
  );
  const initialState: MarkNotificationsAsReadState = {};
  const [state, formAction, pending] = useActionState(
    markNotificationAsReadByNotificationIds,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button
        disabled={pending}
        type="submit"
        variant="ghost"
        size="sm"
        className="cursor-pointer"
      >
        {pending ? <Spinner /> : "Mark as read"}
      </Button>
    </form>
  );
};

export default MarkAsReadButton;
