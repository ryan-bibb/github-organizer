import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ url }: { url: string }) {
  return (
    <Button size="sm" render={<Link href={url} />}>
      <ArrowLeft />
    </Button>
  );
}
