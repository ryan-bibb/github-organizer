import Link from "next/link";
import { getInstallationOctokit } from "@/lib/github";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListFilter } from "lucide-react";
import EmptyPrState from "@/components/empty-state-prs";
import { daysOpen } from "@/lib/utils";

export default async function RepoPulls({
  params,
  searchParams,
}: PageProps<"/repos/[owner]/[repo]">) {
  const { owner, repo } = await params;
  const { sort } = await searchParams;
  const octokit = await getInstallationOctokit();
  const pulls = await octokit.paginate(octokit.pulls.list, {
    owner,
    repo,
    state: "open",
  });

  let sortedPulls: (typeof pulls)[number][] = pulls;

  switch (sort) {
    case "recent":
      sortedPulls = [...pulls].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
      break;
  }

  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {owner}/{repo} — Open pull requests
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button size="sm">
                <ListFilter className="size-4" />
                Filter
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem
              render={<Link href={`/repos/${owner}/${repo}`} />}
            >
              None
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href={`/repos/${owner}/${repo}?sort=recent`} />}
            >
              Most recently updated
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {pulls.length === 0 && (
        <EmptyPrState url={`https://github.com/${owner}/${repo}`} />
      )}
      {sortedPulls.map((pr) => (
        <Link key={pr.id} href={pr.html_url} target="_blank" rel="noreferrer">
          <Card size="sm">
            <CardHeader>
              <CardTitle>
                #{pr.number} {pr.title}
              </CardTitle>
              <CardDescription>by {pr.user?.login}</CardDescription>
            </CardHeader>
            <CardFooter>
              {daysOpen(pr.created_at) ? (
                <Badge variant="destructive">OLD</Badge>
              ) : (
                <Badge variant="outline">NEW</Badge>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
