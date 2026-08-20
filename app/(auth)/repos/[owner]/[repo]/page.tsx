import Link from "next/link";
import { getInstallationOctokit } from "@/lib/github";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function RepoPulls({
  params,
}: PageProps<"/repos/[owner]/[repo]">) {
  const { owner, repo } = await params;
  const octokit = await getInstallationOctokit();
  const pulls = await octokit.paginate(octokit.pulls.list, {
    owner,
    repo,
    state: "open",
  });

  return (
    <div className="flex flex-col gap-3 p-6">
      <h1 className="text-lg font-semibold">
        {owner}/{repo} — Open pull requests
      </h1>
      {pulls.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No open pull requests.
        </p>
      )}
      {pulls.map((pr) => (
        <Link key={pr.id} href={pr.html_url} target="_blank" rel="noreferrer">
          <Card size="sm">
            <CardHeader>
              <CardTitle>
                #{pr.number} {pr.title}
              </CardTitle>
              <CardDescription>by {pr.user?.login}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
