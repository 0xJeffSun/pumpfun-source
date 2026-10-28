import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Privacy policy reference captured for reconstruction.",
};

const SECTIONS = [
  {
    id: "collection",
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, including wallet addresses used to interact with the platform, transaction data recorded on the Solana blockchain, profile information you choose to provide (usernames, bios), and usage data from your interactions with the service.",
  },
  {
    id: "usage",
    title: "2. How We Use Information",
    content:
      "Information is used to provide and maintain the service, process transactions, display trading activity and leaderboard rankings, send notifications you have opted into, detect and prevent fraud or abuse, and improve the platform experience.",
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    content:
      "Blockchain transactions are inherently public. We do not sell personal information to third parties. We may share aggregated, anonymized data for analytics purposes. Information may be disclosed to comply with legal obligations or to protect rights and safety.",
  },
  {
    id: "retention",
    title: "4. Data Retention",
    content:
      "Blockchain transaction data is permanent and cannot be deleted. Off-chain data is retained as long as your account is active or as needed to provide services. You may request deletion of off-chain profile data by contacting support.",
  },
  {
    id: "rights",
    title: "5. Your Rights",
    content:
      "You may access, correct, or delete your off-chain personal data. You may opt out of non-essential communications. You may request a copy of data we hold about you. Note that on-chain transaction data cannot be modified or deleted due to the nature of blockchain technology.",
  },
  {
    id: "security",
    title: "6. Security",
    content:
      "We implement appropriate technical and organizational measures to protect information. However, no internet transmission is completely secure. We cannot guarantee absolute security of data transmitted to or from the service.",
  },
  {
    id: "changes",
    title: "7. Changes to This Policy",
    content:
      "We may update this privacy policy from time to time. Material changes will be communicated through the platform. Continued use of the service after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      {/* Table of contents */}
      <aside className="top-[calc(var(--shell-header)+24px)] shrink-0 lg:sticky lg:w-48">
        <p className="eyebrow">Documentation</p>
        <nav aria-label="Table of contents" className="mt-4">
          <ul className="space-y-1 text-[12px]">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-md px-2 py-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h1>Privacy Policy</h1>
        <p className="description">
          Reference material captured for reconstruction. This is not legal
          advice and may not reflect the current live policy.
        </p>
        <span className="offline-badge mt-4 inline-flex">Reconstruction</span>

        <div className="mt-8 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-[16px] font-semibold text-text-primary">
                {s.title}
              </h2>
              <p className="mt-3 text-[13px] leading-[1.7] text-text-tertiary">
                {s.content}
              </p>
            </section>
          ))}
        </div>

        <p className="leaderboard-disclosure mt-8">
          This privacy policy is a reconstruction reference. Content was
          captured from publicly available documentation and may not be current.
        </p>
      </div>
    </div>
  );
}
