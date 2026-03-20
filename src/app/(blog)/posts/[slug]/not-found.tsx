import Link from "next/link";

export default function PostNotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-medium text-foreground mb-4">
        Post não encontrado
      </h1>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
      >
        Voltar para o blog
      </Link>
    </main>
  );
}
