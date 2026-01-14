"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Monitor } from "@/types";
import { formatDistanceToNow } from "date-fns";

export function MonitorCard({ monitor }: { monitor: Monitor }) {
  const statusColor = monitor.is_up ? "text-green-600" : "text-red-600";
  const statusText = monitor.is_up ? "Operational" : "Down";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{monitor.name}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {monitor.url}
            </CardDescription>
          </div>
          <div className={`text-sm font-medium ${statusColor}`}>
            ● {statusText}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Check Interval:</span>
            <span>{monitor.check_interval / 60} min</span>
          </div>
          <div className="flex justify-between">
            <span>Method:</span>
            <span>{monitor.method}</span>
          </div>
          {monitor.last_checked_at && (
            <div className="flex justify-between">
              <span>Last Checked:</span>
              <span>
                {formatDistanceToNow(new Date(monitor.last_checked_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={`/monitors/${monitor.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
