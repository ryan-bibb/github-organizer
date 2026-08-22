import { cn } from "@/lib/utils";
import Link from "next/link";

const WINDOW_DAYS = 120;

function levelClass(count: number, max: number) {
  if (count === 0) return "bg-muted";
  const ratio = count / max;
  if (ratio > 0.75) return "bg-primary";
  if (ratio > 0.5) return "bg-primary/70";
  if (ratio > 0.25) return "bg-primary/40";
  return "bg-primary/20";
}

export function ContributionCalendar({
  counts,
}: {
  counts: Record<string, number>;
}) {
  const days: { date: string; count: number }[] = [];
  const today = new Date();

  for (let i = WINDOW_DAYS - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    days.push({ date: key, count: counts[key] ?? 0 });
  }

  const max = Math.max(1, ...days.map((day) => day.count));

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1">
      {days.map((day) => (
        <Link key={day.date} href={`/contributions?date=${day.date}`}>
          <div
            title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
            className={cn("size-3 rounded-sm", levelClass(day.count, max))}
          />
        </Link>
      ))}
    </div>
  );
}
