import * as zod from "zod";

export const CommentValidator = zod.object({
  thread: zod.string().min(3, { message: "Minimum 3 characters." })
});
