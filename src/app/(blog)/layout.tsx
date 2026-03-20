import { ReactNode } from "react";

import BlogLayout from "@/layouts/blog-layout";

export default function BlogRootLayout({ children }: { children: ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>;
}
