import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-4 mb-[3px] mt-[3px] w-[90px] place-self-end" />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 " />
      <Skeleton className="h-4 w-[180px]" />
      <Skeleton className="h-4 mt-[3px] w-[120px] place-self-end" />
    </div>
  );
}
