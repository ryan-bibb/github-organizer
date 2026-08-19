"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div className="flex gap-2">
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          type="button"
          variant={mounted && theme === value ? "default" : "outline"}
          onClick={() => setTheme(value)}
          className={cn("gap-2")}
        >
          <Icon className="size-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
