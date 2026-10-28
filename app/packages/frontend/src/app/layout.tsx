import type { Metadata } from "next";
import { AppShell } from "@/components/shell/AppShell";
import "./globals.css";
import "./captured-shell.css";

export const metadata: Metadata = {
  title: {
    default: "Pump reconstruction",
    template: "%s · Pump reconstruction",
  },
  description:
    "Local, evidence-backed Pump application reconstruction workspace",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-pf-auth="out">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
