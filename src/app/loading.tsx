import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <div className="flex min-h-screen flex-col">
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="max-w-md flex-1 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-16 w-32" />
          <Skeleton className="h-16 w-56" />
        </div>
      </div>
      <Skeleton className="h-[420px] w-full rounded-xl" />
      <div className="flex justify-center gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

export default Loading;
