import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center min-h-screen text-center space-y-8 px-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-float-in">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Pingbeam
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground animate-float-in-delay">
            Modern Uptime Monitoring
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto animate-float-in-delay">
            Monitor your websites and APIs with beautiful status pages and instant alerts.
            Know when things break, before your customers do.
          </p>
          <div className="mt-8 flex gap-4 justify-center animate-float-in-delay">
            <Link href="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3 mt-16 w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>Real-time Monitoring</span>
              </CardTitle>
              <CardDescription>
                Monitor from 30 seconds to 1 hour intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your websites and APIs with customizable check intervals and response time monitoring.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                <span>Status Pages</span>
              </CardTitle>
              <CardDescription>
                Beautiful public status pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share real-time service status with your customers through branded status pages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                <span>Instant Alerts</span>
              </CardTitle>
              <CardDescription>
                Get notified immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive alerts via email, Slack, Discord, or webhooks when your services go down.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>Analytics</span>
              </CardTitle>
              <CardDescription>
                Track performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor uptime percentages, response times, and incident history.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span>Secure & Private</span>
              </CardTitle>
              <CardDescription>
                Your data is protected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with security in mind. Row-level security and encrypted connections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                <span>Easy Setup</span>
              </CardTitle>
              <CardDescription>
                Start monitoring in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simple interface to add monitors and configure alerts. No complex setup required.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 space-y-4">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Start monitoring your services today.
          </p>
          <Link href="/signup">
            <Button size="lg">Create Free Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Pingbeam. Built with Next.js and Supabase.</p>
        </div>
      </footer>
    </div>
  );
}
