import Link from "next/link";

export default function PageNotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-medium text-foreground mb-4">
        Page not found
      </h1>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
