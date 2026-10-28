import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Terms and conditions reference captured for reconstruction.",
};

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the service, you agree to be bound by these terms. If you do not agree to all terms, you may not access the service. These terms apply to all visitors, users, and others who access the platform.",
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content:
      "You must be at least 18 years of age to use the service. By using the service, you represent and warrant that you meet this requirement. You are responsible for ensuring your use complies with laws applicable in your jurisdiction.",
  },
  {
    id: "accounts",
    title: "3. Accounts and Wallets",
    content:
      "You are responsible for safeguarding your wallet credentials. The platform does not custody your assets. You are solely responsible for all activity that occurs through your connected wallet addresses.",
  },
  {
    id: "prohibited",
    title: "4. Prohibited Use",
    content:
      "You may not use the service for any unlawful purpose, to create or trade tokens that infringe intellectual property rights, to manipulate markets through wash trading or other deceptive practices, to harass or harm other users, or to distribute malicious content or code.",
  },
  {
    id: "tokens",
    title: "5. Token Creation and Trading",
    content:
      "Tokens created on the platform are not securities and do not represent ownership in any entity. The platform does not guarantee the value, liquidity, or permanence of any token. Trading involves substantial risk of loss. Past performance does not indicate future results.",
  },
  {
    id: "disclaimers",
    title: "6. Disclaimers",
    content:
      'The service is provided "as is" and "as available" without warranties of any kind. We do not warrant that the service will be uninterrupted, timely, secure, or error-free. We are not responsible for losses resulting from market volatility, smart contract bugs, or blockchain network issues.',
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content:
      "To the maximum extent permitted by law, the platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
  },
  {
    id: "modifications",
    title: "8. Modifications",
    content:
      "We reserve the right to modify or replace these terms at any time. Material changes will be communicated through the platform. Your continued use of the service after any changes constitutes acceptance of the new terms.",
  },
];

export default function TermsPage() {
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
        <h1>Terms and Conditions</h1>
        <p className="description">
          Reference material captured for reconstruction. This is not legal
          advice and may not reflect the current live terms.
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
          These terms are a reconstruction reference. Content was captured from
          publicly available documentation and may not be current.
        </p>
      </div>
    </div>
  );
}
