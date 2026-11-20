import { CardSkeleton, Skeleton } from "@/components/ui/ui-states";

export default function ProjectsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="border-b border-zinc-200/80 pb-8 space-y-3">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
