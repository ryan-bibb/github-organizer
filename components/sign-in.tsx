import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

export async function SignIn() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>GitHub Organizer</CardTitle>
        <CardDescription>
          Sign in with your GitHub account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <Button type="submit" className="w-full">
            Sign in with GitHub
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
