import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MonitorCard } from "@/components/monitors/monitor-card";

export default async function MonitorsPage() {
  const supabase = await createClient();

  const { data: monitors } = await supabase
    .from("monitors")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitors</h1>
          <p className="text-muted-foreground">
            Manage your uptime monitors
          </p>
        </div>
        <Link href="/monitors/new">
          <Button>Create Monitor</Button>
        </Link>
      </div>

      {monitors && monitors.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No monitors yet</CardTitle>
            <CardDescription>
              Create your first monitor to start tracking uptime
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/monitors/new">
              <Button>Create your first monitor</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
