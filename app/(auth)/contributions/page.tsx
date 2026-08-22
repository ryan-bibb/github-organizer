import BackButton from "@/components/layout/back-button";
import { auth } from "@/auth";
import { getContributionCounts } from "@/lib/github";

export default async function Contributions({
  searchParams,
}: PageProps<"/contributions">) {
  const { date } = await searchParams;

  const session = await auth();
  const login = session?.user?.login;
  const counts = login ? await getContributionCounts(login) : {};
  const count = typeof date === "string" ? (counts[date] ?? 0) : undefined;

  return (
    <div>
      <BackButton url="/" />
      {typeof date === "string" ? (
        <p>
          {count} contribution{count === 1 ? "" : "s"} on {date}
        </p>
      ) : (
        <p>Select a day from the calendar to see contributions.</p>
      )}
    </div>
  );
}
