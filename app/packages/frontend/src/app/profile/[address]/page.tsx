import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileClient } from "./profile-client";

type ProfilePageProps = {
  params: Promise<{ address: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { address } = await params;
  const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
  return {
    title: `Profile · ${short}`,
    description: `User profile for ${short} in the reconstruction.`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { address } = await params;

  return (
    <Suspense
      fallback={
        <section
          className="leaderboard-loading"
          aria-busy="true"
          aria-live="polite"
        >
          <span className="leaderboard-spinner" aria-hidden="true" />
          <p>Loading profile…</p>
        </section>
      }
    >
      <ProfileClient address={address} />
    </Suspense>
  );
}
