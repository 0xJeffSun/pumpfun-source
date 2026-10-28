import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreClient } from "./explore-client";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search, filter and discover tokens in the reconstruction.",
};

function ExploreFallback() {
  return (
    <section className="leaderboard-loading" aria-busy="true" aria-live="polite">
      <span className="leaderboard-spinner" aria-hidden="true" />
      <p>Loading explore…</p>
    </section>
  );
}

export default function ExplorePage() {
  return (
    <>
      <p className="eyebrow">Pump reconstruction</p>
      <h1>Explore</h1>
      <p className="description">
        Search, filter, and discover tokens. Synthetic data for reconstruction
        layout validation.
      </p>
      <Suspense fallback={<ExploreFallback />}>
        <ExploreClient />
      </Suspense>
    </>
  );
}
