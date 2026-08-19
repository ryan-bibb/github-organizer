import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export async function NavBar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between gap-2 px-6 py-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-2">
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
    </div>
  );
}
