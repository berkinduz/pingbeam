import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StatusPagesPage() {
  const supabase = await createClient();

  const { data: statusPages } = await supabase
    .from("status_pages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Status Pages</h1>
          <p className="text-muted-foreground">
            Public-facing status pages for your services
          </p>
        </div>
        <Link href="/status-pages/new">
          <Button>Create Status Page</Button>
        </Link>
      </div>

      {statusPages && statusPages.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statusPages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle>{page.name}</CardTitle>
                <CardDescription className="break-all">
                  /status/{page.slug}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      page.is_public ? "bg-green-600" : "bg-gray-400"
                    }`}
                  />
                  <span>{page.is_public ? "Public" : "Private"}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/status/${page.slug}`}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      View Page
                    </Button>
                  </Link>
                  <Link href={`/status-pages/${page.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No status pages yet</CardTitle>
            <CardDescription>
              Create your first status page to share with your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/status-pages/new">
              <Button>Create your first status page</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
