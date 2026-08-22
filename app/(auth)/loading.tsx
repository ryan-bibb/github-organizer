import { Skeleton } from "@/components/ui/skeleton";

const WINDOW_DAYS = 120;

export default function HomeLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex w-full max-w-3xl flex-col items-center gap-4 px-16 py-32">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-5 w-64" />
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {Array.from({ length: WINDOW_DAYS }).map((_, i) => (
            <Skeleton key={i} className="size-3 rounded-sm" />
          ))}
        </div>
      </main>
    </div>
  );
}
