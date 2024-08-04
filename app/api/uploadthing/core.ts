import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploader = createUploadthing();

export const ourFileRouter = {
  media: uploader({ image: { maxFileSize: "8MB" } })
    .middleware(async (_) => {
      const user = await currentUser(); // Get user details
      if (!user) throw new Error("User is not authorized!");
      return { userId: user.id }; // Converted to `metadata`
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`Upload done for \`userId\` = ${metadata.userId}`);
      console.log(`URL of file uploaded => ${file.url}`);
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
