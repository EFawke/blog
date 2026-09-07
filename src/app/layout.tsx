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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const session = await verifySession()

  const cookieStore = await cookies()
  const stored = cookieStore.get('appearance')?.value
  const initialAppearance =
    stored === 'light' || stored === 'dark' ? stored : undefined

  return (
    <html lang="en" style={{scrollPaddingTop: 'calc(24px + 4rem)'}}>
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
  )
}