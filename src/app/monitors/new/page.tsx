import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorForm } from "@/components/monitors/monitor-form";

export default function NewMonitorPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Monitor</h1>
        <p className="text-muted-foreground">
          Add a new endpoint to monitor
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monitor Details</CardTitle>
          <CardDescription>
            Configure your uptime monitor settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MonitorForm />
        </CardContent>
      </Card>
    </div>
  );
}
