import * as zod from "zod";

export const UserValidator = zod.object({
  profile_photo: zod.string().url().min(1),
  name: zod.string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 characters." }),
  username: zod.string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 characters." }),
  bio: zod.string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 characters." })
});
