import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// TODO: to fix the ui maybe put sign out on right and img and name on right, color the background and make the name lighter
export async function NavBar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-end gap-2 px-6 py-4">
      <span className="text-sm font-medium">{session?.user?.name}</span>
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
      <Badge variant="outline">{session?.user?.name}</Badge>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "User avatar"}
          className="size-8 rounded-full"
          width={32}
          height={32}
        />
      )}
    </div>
  );
}
