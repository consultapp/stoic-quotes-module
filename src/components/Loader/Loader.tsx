import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 w-[180px]" />
      <Skeleton className="h-4 w-[120px] place-self-end" />
    </div>
  );
}
