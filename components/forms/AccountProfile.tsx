"use client";

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { UserValidator } from "@/lib/validators/user";
// import { updateUser } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import * as zod from "zod";

interface AccountProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name?: string;
    bio?: string;
    image?: string;
  };
  btnTitle: string;
}

export default function AccountProfile(
  { user, btnTitle }: AccountProps
) {

  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<zod.infer<typeof UserValidator>>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      name: user?.name ?? "", username: user?.username ?? "",
      profile_photo: user?.image ?? "", bio: user?.bio ?? ""
    }
  });

  const onSubmit = async (
    values: zod.infer<typeof UserValidator>
  ) => {

    if (isBase64Image(values.profile_photo)) {
      await startUpload(files).then(response => {
        if (response && response[0]?.url) {
          values.profile_photo = response[0].url;
        }
      });
    }

    /* await updateUser({
      name: values.name, path: pathname,
      username: values.username, userId: user.id,
      bio: values.bio, image: values.profile_photo
    }); */

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    event: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {

    event.preventDefault();
    const fileReader = new FileReader();

    if (event.target?.files?.length) {

      const file = event.target?.files[0];
      setFiles(Array.from(event.target?.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result;
        fieldChange(imageDataUrl?.toString() ?? "");
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField name="profile_photo" control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image src={field.value} alt="profile_icon"
                    width={96} height={96} priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image src="/assets/profile.svg" alt="profile_icon"
                    width={24} height={24} className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input type="file" accept="image/*" className="account-form_image-input"
                  placeholder="Upload photo" onChange={event => handleImage(event, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField name="name" control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input type="text" {...field}
                  className="account-form_input no-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField name="username" control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input type="text" {...field}
                  className="account-form_input no-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField name="bio" control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea rows={10} {...field}
                  className="account-form_input no-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
}
