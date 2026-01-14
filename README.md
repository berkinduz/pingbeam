# 📡 Pingbeam

Modern uptime monitoring and status page service built with Next.js 16 and Supabase.

**Live Demo**: Coming soon at [pingbeam.app](https://pingbeam.app)

## ✨ Features

- ⚡ **Real-time Uptime Monitoring** - Track your websites and APIs with customizable check intervals (30s - 1 hour)
- 📊 **Beautiful Status Pages** - Public status pages with custom slugs for your customers
- 📈 **Response Time Tracking** - Monitor performance metrics and response times
- 🔔 **Instant Alerts** - Get notified via email, Slack, Discord, or webhooks (coming soon)
- 🎨 **Customizable Branding** - Branded status pages with custom colors and logos (coming soon)
- 🔒 **Secure & Private** - Row Level Security (RLS) ensures data isolation

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router and Server Components
- **React 19** - Latest React features
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component library built on Radix UI

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database with Row Level Security (RLS)
  - Authentication (email/password)
  - Edge Functions for monitoring cron jobs
  - Real-time subscriptions
- **Database Schema**: See `supabase-schema.sql`

### Other Libraries
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **date-fns** - Date formatting
- **Lucide React** - Icon library

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/berkinduz/pingbeam.git
   cd pingbeam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the schema from `supabase-schema.sql`
   - Copy your project URL and anon key

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Sign up for an account
   - Create your first monitor!

## 📁 Project Structure

```
pingbeam/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── auth/callback/       # OAuth callback handler
│   │   ├── dashboard/           # Protected dashboard
│   │   ├── login/               # Authentication page
│   │   ├── signup/              # Registration page
│   │   ├── monitors/            # Monitor management
│   │   ├── status/[slug]/       # Public status pages
│   │   └── status-pages/        # Status page management
│   ├── components/
│   │   ├── layout/              # Header, footer, navigation
│   │   ├── monitors/            # Monitor-related components
│   │   ├── providers/           # Context providers
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   ├── supabase/            # Supabase clients (browser, server, middleware)
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   ├── database.ts          # Supabase database types
│   │   └── index.ts             # Application types
│   └── middleware.ts            # Auth middleware
├── public/                      # Static assets
├── supabase-schema.sql          # Database schema
└── components.json              # shadcn/ui config
```

## 🗄️ Database Schema

### Main Tables

- **monitors** - Track HTTP/HTTPS endpoints with check intervals
- **monitor_checks** - Store historical check results with response times
- **incidents** - Track downtime events and their lifecycle
- **incident_updates** - Status updates for incidents
- **status_pages** - Public-facing status pages with branding
- **status_page_monitors** - Junction table linking status pages to monitors
- **alert_channels** - Email, Slack, Discord, Webhook configurations
- **monitor_alerts** - Junction table linking monitors to alert channels

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL` (your production URL)

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `your-project.vercel.app`

### Custom Domain

- Add your custom domain in Vercel dashboard
- Update `NEXT_PUBLIC_APP_URL` environment variable

## 🔮 Roadmap

- [ ] **Monitoring Cron Job** - Automated checks via Supabase Edge Functions
- [ ] **Email Alerts** - Instant notifications on downtime
- [ ] **Slack Integration** - Post alerts to Slack channels
- [ ] **Discord Webhooks** - Send alerts to Discord
- [ ] **Response Time Charts** - Visualize performance over time
- [ ] **Incident Management** - Create and track incidents
- [ ] **Custom Domains** - Use your own domain for status pages
- [ ] **Analytics Dashboard** - Uptime percentages and statistics
- [ ] **Team Collaboration** - Invite team members
- [ ] **API Access** - RESTful API for integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👤 Author

**Berkin Duz**

- GitHub: [@berkinduz](https://github.com/berkinduz)
- Website: [berkinduz.com](https://berkinduz.com)

---

Built with ❤️ using Next.js 16 and Supabase
