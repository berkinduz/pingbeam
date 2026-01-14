import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PublicStatusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get status page
  const { data: statusPage } = await supabase
    .from("status_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (!statusPage) {
    notFound();
  }

  // Get monitors for this status page
  const { data: statusPageMonitors } = await supabase
    .from("status_page_monitors")
    .select(`
      monitor_id,
      monitors (*)
    `)
    .eq("status_page_id", statusPage.id)
    .order("display_order");

  const monitors = statusPageMonitors?.map((spm: any) => spm.monitors) || [];

  // Calculate overall status
  const allUp = monitors.every((m: any) => m.is_up);
  const someDown = monitors.some((m: any) => !m.is_up);

  const overallStatus = allUp
    ? { text: "All Systems Operational", color: "text-green-600" }
    : someDown
    ? { text: "Partial Outage", color: "text-yellow-600" }
    : { text: "Major Outage", color: "text-red-600" };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{statusPage.name}</h1>
          {statusPage.description && (
            <p className="text-muted-foreground">{statusPage.description}</p>
          )}
          <div className="flex items-center justify-center gap-2 text-xl">
            <span className={`font-semibold ${overallStatus.color}`}>
              ●
            </span>
            <span className="font-medium">{overallStatus.text}</span>
          </div>
        </div>

        {/* Monitors */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Services</h2>
          {monitors.length > 0 ? (
            <div className="space-y-3">
              {monitors.map((monitor: any) => (
                <Card key={monitor.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{monitor.name}</CardTitle>
                      <div
                        className={`flex items-center gap-2 text-sm font-medium ${
                          monitor.is_up ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <span>●</span>
                        <span>{monitor.is_up ? "Operational" : "Down"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  {monitor.last_checked_at && (
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        Last checked:{" "}
                        {new Date(monitor.last_checked_at).toLocaleString()}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardDescription>No services configured yet</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8 border-t">
          <p>
            Powered by{" "}
            <a
              href="https://pingbeam.app"
              className="text-primary hover:underline"
            >
              Pingbeam
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
