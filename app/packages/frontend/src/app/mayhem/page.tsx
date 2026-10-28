import type { Metadata } from "next";
import { Suspense } from "react";
import { MayhemClient } from "./mayhem-client";

export const metadata: Metadata = {
  title: "Mayhem",
  description: "Mayhem events, tokens, and trader leaderboards.",
};

export default function MayhemPage() {
  return (
    <>
      <p className="eyebrow">Pump reconstruction</p>
      <h1>Mayhem</h1>
      <p className="description">
        Time-limited high-volatility events with special token mechanics.
        Synthetic data only.
      </p>
      <Suspense>
        <MayhemClient />
      </Suspense>
    </>
  );
}
