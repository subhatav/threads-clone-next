import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      Hello, Threads!
      <UserButton />
    </div>
  );
}
