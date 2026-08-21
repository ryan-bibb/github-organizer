import { auth } from "@/auth";
import { getContributionCounts } from "@/lib/github";
import { ContributionCalendar } from "@/components/contribution-calendar";

export default async function Home() {
  const session = await auth();
  const login = session?.user?.login;

  const counts = login ? await getContributionCounts(login) : {};
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col items-center gap-4 px-16 py-32">
        <h1 className="text-lg font-semibold">Your activity</h1>
        <p className="text-muted-foreground text-sm">
          {total} contributions in the last 120 days
        </p>
        <ContributionCalendar counts={counts} />
      </main>
    </div>
  );
}
