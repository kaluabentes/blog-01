import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";

interface Category {
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

export function Footer({ categories }: Props) {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="font-bold text-xl tracking-tight">
              BLOG
            </Link>
            <p className="text-sm text-primary-foreground/60 mt-3 leading-relaxed">
              Quality content about the topics that matter most to you.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Navigation</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-2">
              {["About Us", "Editorial Team", "Contact", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-xs text-primary-foreground/40 text-center">
          © {new Date().getFullYear()} Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
