import { Skeleton } from "@/components/ui/skeleton";

export default function ReposLoading() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-5/7 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
