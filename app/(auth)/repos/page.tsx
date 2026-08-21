import Link from "next/link";
import { getInstallationOctokit } from "@/lib/github";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyRepoState from "@/components/empty-state-repos";
import BackButton from "@/components/back-button";

export default async function Repos() {
  const octokit = await getInstallationOctokit();
  const repos = await octokit.paginate(
    octokit.apps.listReposAccessibleToInstallation,
  );

  return (
    <div className="flex flex-col gap-3 p-6">
      <h1 className="text-lg font-semibold">Repositories</h1>
      {repos.length === 0 && <EmptyRepoState />}
      {repos.map((repo) => (
        <Link key={repo.id} href={`/repos/${repo.owner.login}/${repo.name}`}>
          <Card size="sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {repo.full_name}
                <Badge variant={repo.private ? "secondary" : "outline"}>
                  {repo.private ? "Private" : "Public"}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
