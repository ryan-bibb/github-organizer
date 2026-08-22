import { BookMarked, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyRepoState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookMarked />
        </EmptyMedia>
        <EmptyTitle>No Repositories Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any repositories yet. Get started by creating
          your first repository.
        </EmptyDescription>
        <Button
          render={
            <Link href="https://github.com/new">
              Create Repo <ArrowUpRightIcon />
            </Link>
          }
        />
      </EmptyHeader>
    </Empty>
  );
}
