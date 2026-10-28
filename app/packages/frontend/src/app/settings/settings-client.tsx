"use client";

import { useState } from "react";

function Toggle({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-2">
      <span className="text-[13px] text-text-secondary">{label}</span>
      <button
        role="switch"
        type="button"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-bg-accent" : "bg-bg-tertiary"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border-secondary bg-bg-secondary p-5">
      <h2 className="text-[14px] font-semibold text-text-primary">{title}</h2>
      <div className="mt-3 divide-y divide-border-secondary/50">{children}</div>
    </section>
  );
}

export function SettingsClient() {
  return (
    <div className="mt-6 grid max-w-2xl gap-5">
      <Section title="Account">
        <div className="py-2">
          <span className="text-[11px] text-text-muted">Connected Wallet</span>
          <p className="mt-0.5 font-mono text-xs text-text-secondary">
            7xKX…4mPq (Phantom)
          </p>
        </div>
        <div className="py-2">
          <span className="text-[11px] text-text-muted">Connected X</span>
          <p className="mt-0.5 text-xs text-text-secondary">@pump_user</p>
        </div>
        <div className="py-2">
          <button
            type="button"
            disabled
            className="rounded-lg border border-border-tertiary bg-transparent px-3 py-1.5 text-[11px] font-semibold text-text-muted disabled:cursor-not-allowed"
          >
            Disconnect wallet
          </button>
        </div>
      </Section>

      <Section title="Notifications">
        <Toggle label="Price alerts" defaultChecked />
        <Toggle label="New followers" defaultChecked />
        <Toggle label="Replies to your posts" defaultChecked />
        <Toggle label="Token graduations" />
        <Toggle label="Reward distributions" defaultChecked />
        <Toggle label="Campaign updates" />
      </Section>

      <Section title="Privacy">
        <Toggle label="Show portfolio publicly" defaultChecked />
        <Toggle label="Show trading activity" />
        <Toggle label="Show on leaderboard" defaultChecked />
        <Toggle label="Allow direct messages" defaultChecked />
      </Section>

      <Section title="Display">
        <div className="py-2">
          <label className="flex items-center justify-between gap-3">
            <span className="text-[13px] text-text-secondary">Currency</span>
            <select
              disabled
              className="h-8 rounded-lg border border-border-tertiary bg-bg-primary px-3 text-xs text-text-secondary disabled:cursor-not-allowed"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>SOL</option>
            </select>
          </label>
        </div>
        <div className="py-2">
          <label className="flex items-center justify-between gap-3">
            <span className="text-[13px] text-text-secondary">Theme</span>
            <select
              disabled
              className="h-8 rounded-lg border border-border-tertiary bg-bg-primary px-3 text-xs text-text-secondary disabled:cursor-not-allowed"
            >
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </label>
        </div>
        <div className="py-2">
          <label className="flex items-center justify-between gap-3">
            <span className="text-[13px] text-text-secondary">
              Slippage tolerance
            </span>
            <select
              disabled
              className="h-8 rounded-lg border border-border-tertiary bg-bg-primary px-3 text-xs text-text-secondary disabled:cursor-not-allowed"
            >
              <option>0.5%</option>
              <option>1%</option>
              <option>2%</option>
              <option>5%</option>
            </select>
          </label>
        </div>
        <div className="py-2">
          <label className="flex items-center justify-between gap-3">
            <span className="text-[13px] text-text-secondary">
              Priority fee
            </span>
            <select
              disabled
              className="h-8 rounded-lg border border-border-tertiary bg-bg-primary px-3 text-xs text-text-secondary disabled:cursor-not-allowed"
            >
              <option>Auto</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        </div>
      </Section>

      <p className="text-[10px] text-text-muted">
        All settings are non-functional in this reconstruction. Changes are
        stored in local component state only.
      </p>
    </div>
  );
}
