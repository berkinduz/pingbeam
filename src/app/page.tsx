export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight animate-float-in">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Pingbeam
          </span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground animate-float-in-delay">
          Modern uptime monitoring and status pages
        </p>
        <div className="mt-8 flex gap-4 justify-center animate-float-in-delay">
          <div className="text-sm text-muted-foreground">
            🚀 Coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}
