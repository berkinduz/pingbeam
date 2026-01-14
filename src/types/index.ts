import { Database } from "./database";

// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Application types
export type Monitor = Tables<"monitors">;
export type MonitorCheck = Tables<"monitor_checks">;
export type Incident = Tables<"incidents">;
export type IncidentUpdate = Tables<"incident_updates">;
export type StatusPage = Tables<"status_pages">;
export type StatusPageMonitor = Tables<"status_page_monitors">;
export type AlertChannel = Tables<"alert_channels">;
export type MonitorAlert = Tables<"monitor_alerts">;

// Insert types (for creating new records)
export type MonitorInsert = Database["public"]["Tables"]["monitors"]["Insert"];
export type IncidentInsert = Database["public"]["Tables"]["incidents"]["Insert"];
export type StatusPageInsert = Database["public"]["Tables"]["status_pages"]["Insert"];
export type AlertChannelInsert = Database["public"]["Tables"]["alert_channels"]["Insert"];

// Update types
export type MonitorUpdate = Database["public"]["Tables"]["monitors"]["Update"];
export type IncidentUpdate = Database["public"]["Tables"]["incidents"]["Update"];
export type StatusPageUpdate = Database["public"]["Tables"]["status_pages"]["Update"];

// Extended types with relations
export type MonitorWithChecks = Monitor & {
  recent_checks?: MonitorCheck[];
  uptime_percentage?: number;
};

export type IncidentWithUpdates = Incident & {
  updates?: IncidentUpdate[];
  monitor?: Monitor;
};

export type StatusPageWithMonitors = StatusPage & {
  monitors?: Monitor[];
};

// Enums and constants
export const MONITOR_STATUS = {
  ACTIVE: "active",
  PAUSED: "paused",
  DELETED: "deleted",
} as const;

export const INCIDENT_STATUS = {
  INVESTIGATING: "investigating",
  IDENTIFIED: "identified",
  MONITORING: "monitoring",
  RESOLVED: "resolved",
} as const;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  HEAD: "HEAD",
} as const;

export const ALERT_CHANNEL_TYPES = {
  EMAIL: "email",
  SLACK: "slack",
  DISCORD: "discord",
  WEBHOOK: "webhook",
} as const;

export const CHECK_INTERVALS = [
  { label: "30 seconds", value: 30 },
  { label: "1 minute", value: 60 },
  { label: "5 minutes", value: 300 },
  { label: "10 minutes", value: 600 },
  { label: "15 minutes", value: 900 },
  { label: "30 minutes", value: 1800 },
  { label: "1 hour", value: 3600 },
] as const;
