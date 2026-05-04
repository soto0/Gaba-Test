import Link from "next/link";

import { UsersDashboard } from "@/components/users-dashboard";
import { buttonVariants } from "@/components/ui/button";
import { serializeDashboardUrl } from "@/lib/dashboard-url";
import { cn } from "@/lib/utils";
import {
  parseDashboardSearchParams,
  skipForPage,
} from "@/lib/dummyjson/parse-dashboard-params";
import { fetchUsersList } from "@/lib/dummyjson/users";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const Home = async ({ searchParams }: PageProps) => {
  const raw = (await searchParams) ?? {};
  const url = parseDashboardSearchParams(raw);
  const skip = skipForPage(url.page, url.limit);

  let data: Awaited<ReturnType<typeof fetchUsersList>>;
  try {
    data = await fetchUsersList({
      limit: url.limit,
      skip,
      q: url.q,
      sortBy: url.q ? undefined : url.sortBy,
      order: url.q ? undefined : url.order,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Неизвестная ошибка";
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16">
          <p className="text-center text-sm text-muted-foreground">
            Не удалось загрузить пользователей.
          </p>
          <pre className="max-w-lg overflow-x-auto rounded-lg border bg-muted/40 p-4 text-xs">
            {message}
          </pre>
          <Link href="/" className={cn(buttonVariants())}>
            Попробовать снова
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <UsersDashboard
          key={serializeDashboardUrl(url)}
          data={data}
          url={url}
        />
      </main>
    </div>
  );
};

export default Home;
