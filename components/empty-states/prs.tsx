import { GitPullRequestArrow, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";

export default function EmptyPrState({ url }: { url: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <GitPullRequestArrow />
        </EmptyMedia>
        <EmptyTitle>No Pull Requests</EmptyTitle>
        <EmptyDescription>
          There are currently no open pull requests. Get started by creating
          your a pull request in your repo.
        </EmptyDescription>
      </EmptyHeader>
      <Button
        variant="link"
        className="text-muted-foreground"
        size="sm"
        nativeButton={false}
        render={
          <Link href={url}>
            Visit repo <ArrowUpRightIcon />
          </Link>
        }
      />
    </Empty>
  );
}
