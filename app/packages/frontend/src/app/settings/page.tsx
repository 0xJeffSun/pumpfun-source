import type { Metadata } from "next";
import { Suspense } from "react";
import { SettingsClient } from "./settings-client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Account, notification, privacy, and display settings.",
};

export default function SettingsPage() {
  return (
    <>
      <p className="eyebrow">Pump reconstruction</p>
      <h1>Settings</h1>
      <p className="description">
        Configure account, notification, privacy, and display preferences. All
        controls are non-functional in this reconstruction.
      </p>
      <Suspense>
        <SettingsClient />
      </Suspense>
    </>
  );
}
