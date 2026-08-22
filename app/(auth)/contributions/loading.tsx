import { Skeleton } from "@/components/ui/skeleton";

export default function ContributionsLoading() {
  return (
    <div>
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="mt-3 h-5 w-48" />
    </div>
  );
}
