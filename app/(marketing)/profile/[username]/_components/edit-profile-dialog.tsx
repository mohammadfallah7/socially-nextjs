"use client";

import { editProfile } from "@/actions/user.action";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileState, UserProfileModel } from "@/types/user.model";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const EditProfileDialog = ({ user }: { user: UserProfileModel }) => {
  const editProfileById = editProfile.bind(null, user!.id);
  const initialState: EditProfileState = {};
  const [state, formAction, pending] = useActionState(
    editProfileById,
    initialState
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        setOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <div className="grid gap-3">
            <div className="grid gap-2">
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                defaultValue={state.payload?.name || user!.name}
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              {state.error?.name && (
                <InputError errors={state.error.name.errors} />
              )}
            </div>
            <div className="grid gap-2">
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                defaultValue={state.payload?.bio || user!.bio || ""}
                id="bio"
                name="bio"
                className="resize-none"
                placeholder="Enter your bio"
              />
              {state.error?.bio && (
                <InputError errors={state.error.bio.errors} />
              )}
            </div>
            <div className="grid gap-2">
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                defaultValue={state.payload?.location || user!.location || ""}
                id="location"
                name="location"
                placeholder="Enter your location"
              />
              {state.error?.location && (
                <InputError errors={state.error.location.errors} />
              )}
            </div>
            <div className="grid gap-2">
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input
                defaultValue={state.payload?.website || user!.website || ""}
                id="website"
                name="website"
                placeholder="Enter your website"
              />
              {state.error?.website && (
                <InputError errors={state.error.website.errors} />
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} className="cursor-pointer" type="submit">
              {pending ? <Spinner /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
