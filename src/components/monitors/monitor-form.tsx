"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { HTTP_METHODS, CHECK_INTERVALS } from "@/types";

export function MonitorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    method: "GET",
    check_interval: 300,
    timeout: 30,
    expected_status_code: 200,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      const { error } = await supabase.from("monitors").insert({
        user_id: user.id,
        ...formData,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Monitor created successfully!");
        router.push("/monitors");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Monitor Name</Label>
        <Input
          id="name"
          placeholder="My Website"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          A friendly name to identify this monitor
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          The full URL to monitor (including https://)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="method">HTTP Method</Label>
          <Select
            value={formData.method}
            onValueChange={(value) =>
              setFormData({ ...formData, method: value })
            }
            disabled={loading}
          >
            <SelectTrigger id="method">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(HTTP_METHODS).map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="check_interval">Check Interval</Label>
          <Select
            value={formData.check_interval.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, check_interval: parseInt(value) })
            }
            disabled={loading}
          >
            <SelectTrigger id="check_interval">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CHECK_INTERVALS.map((interval) => (
                <SelectItem key={interval.value} value={interval.value.toString()}>
                  {interval.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeout">Timeout (seconds)</Label>
          <Input
            id="timeout"
            type="number"
            min="1"
            max="60"
            value={formData.timeout}
            onChange={(e) =>
              setFormData({ ...formData, timeout: parseInt(e.target.value) })
            }
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expected_status_code">Expected Status Code</Label>
          <Input
            id="expected_status_code"
            type="number"
            min="100"
            max="599"
            value={formData.expected_status_code}
            onChange={(e) =>
              setFormData({
                ...formData,
                expected_status_code: parseInt(e.target.value),
              })
            }
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Creating..." : "Create Monitor"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
