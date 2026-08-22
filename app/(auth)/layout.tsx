import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { NavBar } from "@/components/layout/nav-bar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
