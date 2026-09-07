import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import ThemeProvider from "./ThemeProvider";
import { verifySession } from "./lib/session";

export const metadata: Metadata = {
  title: "Ted Fawke",
  description: "Some words about coding",
};

// Runs before first paint so the correct theme is on <html> immediately — no dark flash.
const themeScript = `
(function () {
  try {
    var m = document.cookie.match(/(?:^|;\\s*)appearance=(light|dark)/);
    var a = m ? m[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var d = document.documentElement;
    d.classList.add(a);
    d.style.colorScheme = a;
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  const cookieStore = await cookies();
  const stored = cookieStore.get("appearance")?.value;
  const initialAppearance =
    stored === "light" || stored === "dark" ? stored : undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollPaddingTop: "calc(24px + 4rem)" }}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider
          loggedIn={!!session}
          username={session?.username}
          initialAppearance={initialAppearance}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}