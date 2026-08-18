import { signOut } from "@/auth";
import { Button } from "@base-ui/react";

export async function NavBar() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut("github", { redirectTo: "/sign-in" });
        }}
      >
        <Button type="submit" className="w-full">
          Sign out
        </Button>
      </form>
    </div>
  );
}
