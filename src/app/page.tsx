import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Pingbeam
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-float-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Monitor your services in real-time
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-float-in">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Modern Uptime
            </span>
            <br />
            <span className="text-foreground">Monitoring</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-float-in-delay">
            Track your websites and APIs with <span className="text-foreground font-semibold">beautiful status pages</span> and <span className="text-foreground font-semibold">instant alerts</span>.
            <br />
            Know when things break, before your customers do.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-float-in-delay">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 group">
                Get Started Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-muted-foreground">
            No credit card required • Free tier available
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to monitor uptime
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, powerful, and built for modern teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-muted-foreground">
                Check your endpoints every 30 seconds to 1 hour. Get instant notifications when something goes wrong.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Status Pages</h3>
              <p className="text-muted-foreground">
                Share real-time status with customers through branded public pages. Build trust with transparency.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
              <p className="text-muted-foreground">
                Get notified immediately via email, Slack, Discord, or webhooks when services go down.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Track response times, uptime percentages, and incident history over time.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Built with security in mind. Row-level security ensures your data stays private.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
              <p className="text-muted-foreground">
                Start monitoring in minutes. Simple interface, no complex configuration required.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Start monitoring your services today. Free tier available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 Pingbeam. Built with Next.js and Supabase.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/login" className="hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="hover:text-foreground transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
