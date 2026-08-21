import Link from "next/link";
import { getInstallationOctokit } from "@/lib/github";
import {
  Card,
  CardHeader,
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
import { ListFilter } from "lucide-react";
import EmptyPrState from "@/components/empty-state-prs";

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
