import { Skeleton } from "@/components/ui/skeleton";

export default function RepoPullsLoading() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-8 w-20" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
  );
}
