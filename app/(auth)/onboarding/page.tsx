import { currentUser } from "@clerk/nextjs/server";

import AccountProfile from "@/components/forms/AccountProfile";

export default async function Page() {

  const user = await currentUser();
  if (!user) return; // Show blank

  /* const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/"); */

  const userData = {
    id: user.id, // Fetched by Clerk authentication
    image: user?.imageUrl ?? "", // Stored picture URL
    objectId: "dummy_objectId", bio: "dummy_autobiography",
    name: user?.fullName ?? "", username: user?.username ?? ""
    /* objectId: userInfo?._id, bio: userInfo?.bio ?? "",
    username: userInfo ? userInfo.username : user?.username,
    name: userInfo ? userInfo.name : user?.fullName ?? "",
    image: userInfo ? userInfo.image : user?.imageUrl */
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        To use Threads, complete your profile now.
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
