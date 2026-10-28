import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioClient } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio overview with positions, PnL and trade history.",
};

export default function PortfolioPage() {
  return (
    <>
      <p className="eyebrow">Pump reconstruction</p>
      <h1>Portfolio</h1>
      <p className="description">
        Token positions, profit and loss tracking, and trade history. All values
        are synthetic reconstruction data.
      </p>
      <Suspense>
        <PortfolioClient />
      </Suspense>
    </>
  );
}
