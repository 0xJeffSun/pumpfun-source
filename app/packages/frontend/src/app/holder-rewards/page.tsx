import type { Metadata } from "next";
import { Suspense } from "react";
import { HolderRewardsClient } from "./holder-rewards-client";

export const metadata: Metadata = {
  title: "Holder rewards",
  description: "Reward discovery and claim interface for token holders.",
};

export default function HolderRewardsPage() {
  return (
    <>
      <p className="eyebrow">Pump reconstruction</p>
      <h1>Holder rewards</h1>
      <p className="description">
        View earned rewards, claim history, and referral stats. All values are
        synthetic reconstruction data.
      </p>
      <Suspense>
        <HolderRewardsClient />
      </Suspense>
    </>
  );
}
