import { ReactNode } from "react";

import { NAME, TAGLINE } from "@/config/general";
import BlogLayout from "@/layouts/blog-layout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${NAME} - ${TAGLINE}`,
};

export default function BlogRootLayout({ children }: { children: ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>;
}
