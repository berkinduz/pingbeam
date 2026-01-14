export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      monitors: {
        Row: {
          id: string
          user_id: string
          name: string
          url: string
          method: string
          check_interval: number
          timeout: number
          expected_status_code: number
          headers: Json
          body: string | null
          status: string
          is_up: boolean | null
          last_checked_at: string | null
          last_uptime_at: string | null
          last_downtime_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          url: string
          method?: string
          check_interval?: number
          timeout?: number
          expected_status_code?: number
          headers?: Json
          body?: string | null
          status?: string
          is_up?: boolean | null
          last_checked_at?: string | null
          last_uptime_at?: string | null
          last_downtime_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          url?: string
          method?: string
          check_interval?: number
          timeout?: number
          expected_status_code?: number
          headers?: Json
          body?: string | null
          status?: string
          is_up?: boolean | null
          last_checked_at?: string | null
          last_uptime_at?: string | null
          last_downtime_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      monitor_checks: {
        Row: {
          id: string
          monitor_id: string
          is_up: boolean
          status_code: number | null
          response_time: number | null
          error_message: string | null
          checked_at: string | null
        }
        Insert: {
          id?: string
          monitor_id: string
          is_up: boolean
          status_code?: number | null
          response_time?: number | null
          error_message?: string | null
          checked_at?: string | null
        }
        Update: {
          id?: string
          monitor_id?: string
          is_up?: boolean
          status_code?: number | null
          response_time?: number | null
          error_message?: string | null
          checked_at?: string | null
        }
      }
      incidents: {
        Row: {
          id: string
          monitor_id: string
          title: string
          status: string
          started_at: string
          resolved_at: string | null
          acknowledged_at: string | null
          affected_regions: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          monitor_id: string
          title: string
          status?: string
          started_at?: string
          resolved_at?: string | null
          acknowledged_at?: string | null
          affected_regions?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          monitor_id?: string
          title?: string
          status?: string
          started_at?: string
          resolved_at?: string | null
          acknowledged_at?: string | null
          affected_regions?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      incident_updates: {
        Row: {
          id: string
          incident_id: string
          status: string
          message: string
          created_at: string | null
        }
        Insert: {
          id?: string
          incident_id: string
          status: string
          message: string
          created_at?: string | null
        }
        Update: {
          id?: string
          incident_id?: string
          status?: string
          message?: string
          created_at?: string | null
        }
      }
      status_pages: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          custom_domain: string | null
          primary_color: string | null
          is_public: boolean | null
          show_uptime_percentage: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          custom_domain?: string | null
          primary_color?: string | null
          is_public?: boolean | null
          show_uptime_percentage?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          custom_domain?: string | null
          primary_color?: string | null
          is_public?: boolean | null
          show_uptime_percentage?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      status_page_monitors: {
        Row: {
          id: string
          status_page_id: string
          monitor_id: string
          display_order: number | null
        }
        Insert: {
          id?: string
          status_page_id: string
          monitor_id: string
          display_order?: number | null
        }
        Update: {
          id?: string
          status_page_id?: string
          monitor_id?: string
          display_order?: number | null
        }
      }
      alert_channels: {
        Row: {
          id: string
          user_id: string
          type: string
          name: string
          config: Json
          is_active: boolean | null
          verified: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          name: string
          config: Json
          is_active?: boolean | null
          verified?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          name?: string
          config?: Json
          is_active?: boolean | null
          verified?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      monitor_alerts: {
        Row: {
          id: string
          monitor_id: string
          alert_channel_id: string
          on_down: boolean | null
          on_up: boolean | null
        }
        Insert: {
          id?: string
          monitor_id: string
          alert_channel_id: string
          on_down?: boolean | null
          on_up?: boolean | null
        }
        Update: {
          id?: string
          monitor_id?: string
          alert_channel_id?: string
          on_down?: boolean | null
          on_up?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
