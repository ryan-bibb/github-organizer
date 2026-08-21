import Link from "next/link";
import { CircleDot, ListFilter, Star } from "lucide-react";
import { getInstallationOctokit } from "@/lib/github";
import { formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmptyRepoState from "@/components/empty-state-repos";

{
  /**
  Basic info
- description — repo description text (nullable)
- language — primary language, e.g. "TypeScript" (nullable)
- topics — array of tag strings
- default_branch — e.g. "main"
- visibility — "public" | "private" | "internal"
- fork — boolean, is it a fork
- archived, disabled — booleans

Stats
- stargazers_count
- forks_count
- open_issues_count (note: this includes PRs too, GitHub counts them together)
- watchers_count

Timestamps
- created_at
- updated_at
- pushed_at — last push, generally the most useful "activity" signal

Links/owner
- html_url — link to the repo on GitHub
- owner.login, owner.avatar_url, owner.type ("User" | "Organization")
 */
}

// TODO:  add more repo filters if necessary
export default async function Repos({ searchParams }: PageProps<"/repos">) {
  const { sort } = await searchParams;
  const octokit = await getInstallationOctokit();
  const repos = await octokit.paginate(
    octokit.apps.listReposAccessibleToInstallation,
  );

  let sortedRepos: (typeof repos)[number][] = repos;
  switch (sort) {
    case "recent":
      sortedRepos = [...repos].sort(
        (a, b) =>
          new Date(b.pushed_at ?? 0).getTime() -
          new Date(a.pushed_at ?? 0).getTime(),
      );
      break;
    case "star":
      sortedRepos = [...repos].sort(
        (a, b) => b.stargazers_count - a.stargazers_count,
      );
      break;
  }

  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Repositories</h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm">
                <ListFilter className="size-4" />
                Filter
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem render={<Link href="/repos" />}>
              None
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/repos?sort=recent" />}>
              Most recent
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/repos?sort=star" />}>
              Stars
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {repos.length === 0 && <EmptyRepoState />}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedRepos.map((repo) => (
          <Link key={repo.id} href={`/repos/${repo.owner.login}/${repo.name}`}>
            <Card className="aspect-5/7">
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center gap-2">
                  {repo.full_name}
                  <Badge variant={repo.private ? "secondary" : "outline"}>
                    {repo.private ? "Private" : "Public"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                {repo.description && (
                  <p className="line-clamp-4 text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                )}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="ghost">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <CircleDot className="size-3.5" />
                    {repo.open_issues_count}
                  </span>
                </div>
                {repo.pushed_at && (
                  <span>{formatRelativeTime(repo.pushed_at)}</span>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
