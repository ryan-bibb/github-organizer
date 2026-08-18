import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export async function NavBar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "User avatar"}
            className="size-8 rounded-full"
            width={32}
            height={32}
          />
        )}
        <span className="text-sm font-m">{session?.user?.name}</span>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}
      >
        <Button type="submit" className="w-full">
          Sign out
        </Button>
      </form>
    </div>
  );
}
