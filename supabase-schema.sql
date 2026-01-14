-- Pingbeam Database Schema
-- Uptime monitoring and status page service

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- MONITORS TABLE
-- Stores all monitoring endpoints
-- =====================================================
CREATE TABLE monitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Monitor details
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  method TEXT NOT NULL DEFAULT 'GET', -- GET, POST, HEAD, etc.

  -- Check configuration
  check_interval INTEGER NOT NULL DEFAULT 300, -- seconds (5 minutes default)
  timeout INTEGER NOT NULL DEFAULT 30, -- seconds
  expected_status_code INTEGER NOT NULL DEFAULT 200,

  -- Advanced settings
  headers JSONB DEFAULT '{}', -- Custom headers
  body TEXT, -- Request body for POST

  -- Status
  status TEXT NOT NULL DEFAULT 'active', -- active, paused, deleted
  is_up BOOLEAN DEFAULT true,
  last_checked_at TIMESTAMPTZ,
  last_uptime_at TIMESTAMPTZ,
  last_downtime_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MONITOR_CHECKS TABLE
-- Historical check results (keep last 90 days)
-- =====================================================
CREATE TABLE monitor_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  monitor_id UUID NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,

  -- Check result
  is_up BOOLEAN NOT NULL,
  status_code INTEGER,
  response_time INTEGER, -- milliseconds
  error_message TEXT,

  -- Timestamp
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_monitor_checks_monitor_id ON monitor_checks(monitor_id);
CREATE INDEX idx_monitor_checks_checked_at ON monitor_checks(checked_at DESC);

-- =====================================================
-- INCIDENTS TABLE
-- Downtime incidents and their lifecycle
-- =====================================================
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  monitor_id UUID NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,

  -- Incident details
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'investigating', -- investigating, identified, monitoring, resolved

  -- Timeline
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,

  -- Impact
  affected_regions TEXT[], -- Array of affected regions

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INCIDENT_UPDATES TABLE
-- Status updates for incidents
-- =====================================================
CREATE TABLE incident_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,

  -- Update details
  status TEXT NOT NULL, -- investigating, identified, monitoring, resolved
  message TEXT NOT NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STATUS_PAGES TABLE
-- Public-facing status pages
-- =====================================================
CREATE TABLE status_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Page details
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE, -- URL slug: pingbeam.app/status/{slug}
  description TEXT,

  -- Branding
  logo_url TEXT,
  custom_domain TEXT,
  primary_color TEXT DEFAULT '#3b82f6', -- Hex color

  -- Settings
  is_public BOOLEAN DEFAULT true,
  show_uptime_percentage BOOLEAN DEFAULT true,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- STATUS_PAGE_MONITORS TABLE
-- Junction table: which monitors appear on which status pages
-- =====================================================
CREATE TABLE status_page_monitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status_page_id UUID NOT NULL REFERENCES status_pages(id) ON DELETE CASCADE,
  monitor_id UUID NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,

  UNIQUE(status_page_id, monitor_id)
);

-- =====================================================
-- ALERT_CHANNELS TABLE
-- Alert notification channels (email, slack, discord, webhook)
-- =====================================================
CREATE TABLE alert_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Channel details
  type TEXT NOT NULL, -- email, slack, discord, webhook
  name TEXT NOT NULL,

  -- Configuration (encrypted in production)
  config JSONB NOT NULL, -- { "email": "user@example.com" } or { "webhook_url": "..." }

  -- Status
  is_active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MONITOR_ALERTS TABLE
-- Junction table: which monitors send alerts to which channels
-- =====================================================
CREATE TABLE monitor_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  monitor_id UUID NOT NULL REFERENCES monitors(id) ON DELETE CASCADE,
  alert_channel_id UUID NOT NULL REFERENCES alert_channels(id) ON DELETE CASCADE,

  -- Alert settings
  on_down BOOLEAN DEFAULT true,
  on_up BOOLEAN DEFAULT true,

  UNIQUE(monitor_id, alert_channel_id)
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- Users can only access their own data
-- =====================================================

-- Monitors
ALTER TABLE monitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own monitors"
  ON monitors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own monitors"
  ON monitors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own monitors"
  ON monitors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own monitors"
  ON monitors FOR DELETE
  USING (auth.uid() = user_id);

-- Monitor Checks (read-only for users)
ALTER TABLE monitor_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view checks for their monitors"
  ON monitor_checks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM monitors
      WHERE monitors.id = monitor_checks.monitor_id
      AND monitors.user_id = auth.uid()
    )
  );

-- Incidents
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view incidents for their monitors"
  ON incidents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM monitors
      WHERE monitors.id = incidents.monitor_id
      AND monitors.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create incidents for their monitors"
  ON incidents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM monitors
      WHERE monitors.id = incidents.monitor_id
      AND monitors.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update incidents for their monitors"
  ON incidents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM monitors
      WHERE monitors.id = incidents.monitor_id
      AND monitors.user_id = auth.uid()
    )
  );

-- Incident Updates
ALTER TABLE incident_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view updates for their incidents"
  ON incident_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM incidents
      JOIN monitors ON monitors.id = incidents.monitor_id
      WHERE incidents.id = incident_updates.incident_id
      AND monitors.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create updates for their incidents"
  ON incident_updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM incidents
      JOIN monitors ON monitors.id = incidents.monitor_id
      WHERE incidents.id = incident_updates.incident_id
      AND monitors.user_id = auth.uid()
    )
  );

-- Status Pages
ALTER TABLE status_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own status pages"
  ON status_pages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view public status pages"
  ON status_pages FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can create their own status pages"
  ON status_pages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own status pages"
  ON status_pages FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own status pages"
  ON status_pages FOR DELETE
  USING (auth.uid() = user_id);

-- Status Page Monitors
ALTER TABLE status_page_monitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their status page monitors"
  ON status_page_monitors FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM status_pages
      WHERE status_pages.id = status_page_monitors.status_page_id
      AND status_pages.user_id = auth.uid()
    )
  );

-- Alert Channels
ALTER TABLE alert_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own alert channels"
  ON alert_channels FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alert channels"
  ON alert_channels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alert channels"
  ON alert_channels FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alert channels"
  ON alert_channels FOR DELETE
  USING (auth.uid() = user_id);

-- Monitor Alerts
ALTER TABLE monitor_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage alerts for their monitors"
  ON monitor_alerts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM monitors
      WHERE monitors.id = monitor_alerts.monitor_id
      AND monitors.user_id = auth.uid()
    )
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_monitors_updated_at
  BEFORE UPDATE ON monitors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at
  BEFORE UPDATE ON incidents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_status_pages_updated_at
  BEFORE UPDATE ON status_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alert_channels_updated_at
  BEFORE UPDATE ON alert_channels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX idx_monitors_user_id ON monitors(user_id);
CREATE INDEX idx_monitors_status ON monitors(status) WHERE status = 'active';
CREATE INDEX idx_incidents_monitor_id ON incidents(monitor_id);
CREATE INDEX idx_incidents_status ON incidents(status) WHERE status != 'resolved';
CREATE INDEX idx_status_pages_slug ON status_pages(slug);
CREATE INDEX idx_alert_channels_user_id ON alert_channels(user_id);

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- None needed for now, users will create their own data
