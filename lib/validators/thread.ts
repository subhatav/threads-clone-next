import * as zod from "zod";

export const ThreadValidator = zod.object({
  accountId: zod.string().min(1),
  thread: zod.string().min(3, { message: "Minimum 3 characters." })
});
