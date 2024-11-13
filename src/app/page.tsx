import PostHouse from "@/components/post-house";
import { ProfileUpdate } from "@/components/profile-update";
import SearchResults from "@/components/search-results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"
import Form from "next/form";

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const query = searchParams.query

  return (
    <main className="max-w-2xl px-6 space-y-8 mx-auto py-8 xl:py-16 font-[family-name:var(--font-geist-sans)] text-zinc-700 dark:text-zinc-300">
      <div className="mx-auto w-fit">
        <ProfileUpdate />
      </div>
      <div className="w-fit mx-auto text-xl border-b border-border">RESTful Housing</div>
      <div className="flex flex-col items-center text-muted-foreground gap-2">
        Have property to rent/sell?
        <PostHouse />
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border border-border border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>
      <Form action="/" className="flex w-full max-w-sm items-center space-x-2 mx-auto">
        <Input type="text" placeholder="Look for houses near you" name="query" />
        <Button type="submit"><Search /></Button>
      </Form>
      <SearchResults query={query ?? ''} />
    </main>
  );
}

