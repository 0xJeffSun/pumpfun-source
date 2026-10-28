import type { Metadata } from "next";
import { Suspense } from "react";
import { LiveClient } from "./live-client";

export const metadata: Metadata = {
  title: "Live",
  description: "Livestream discovery and viewing in the reconstruction.",
};

function LiveFallback() {
  return (
    <section className="leaderboard-loading" aria-busy="true" aria-live="polite">
      <span className="leaderboard-spinner" aria-hidden="true" />
      <p>Loading live streams…</p>
    </section>
  );
}

export default function LivePage() {
  return (
    <>
      <p className="eyebrow">Pump reconstruction</p>
      <h1>Live</h1>
      <p className="description">
        Discover live streams, scheduled broadcasts, and recent recordings.
        Synthetic data only.
      </p>
      <Suspense fallback={<LiveFallback />}>
        <LiveClient />
      </Suspense>
    </>
  );
}
