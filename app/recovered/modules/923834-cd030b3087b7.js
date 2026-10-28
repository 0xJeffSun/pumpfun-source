// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(91163),
    a = r.i(686035),
    i = r.i(352386),
    t = r.i(995040),
    n = r.i(689391),
    l = r.i(25047),
    c = r.i(437218),
    s = r.i(950268),
    d = r.i(748117),
    v = r.i(636447),
    u = r.i(898260),
    p = r.i(933185),
    h = r.i(924568);
  let f = i.forwardRef(function ({ title: r, titleId: e, ...o }, a) {
    return i.createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          "aria-hidden": "true",
          "data-slot": "icon",
          ref: a,
          "aria-labelledby": e,
        },
        o,
      ),
      r ? i.createElement("title", { id: e }, r) : null,
      i.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6",
      }),
    );
  });
  r.i(252494);
  let g = n.z.span`
  && {
    width: 82px;
    height: 82px;
    border-width: 4px;
    border-style: solid;
    border-color: ${(r) => r.color ?? "var(--privy-color-accent)"};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1.2s linear infinite;
    transition: border-color 800ms;
  }
`;
  function x(r) {
    return (0, e.jsxs)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      ...r,
      children: [
        (0, e.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        (0, e.jsx)("line", { x1: "12", x2: "12", y1: "8", y2: "12" }),
        (0, e.jsx)("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }),
      ],
    });
  }
  let b = ({ onTransfer: r, isTransferring: o, transferSuccess: a }) =>
      (0, e.jsx)(t.P, {
        ...(a
          ? { success: !0, children: "Success!" }
          : {
              warn: !0,
              loading: o,
              onClick: r,
              children: "Transfer and delete account",
            }),
      }),
    y = n.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding-bottom: 16px;
`,
    m = n.z.div`
  display: flex;
  flex-direction: column;
  && p {
    font-size: 14px;
  }
  width: 100%;
  gap: 16px;
`,
    k = n.z.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  border: 1px solid var(--privy-color-foreground-4) !important;
  border-radius: var(--privy-border-radius-md);
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 500;
  gap: 8px;
`,
    w = (0, n.z)(h.f)`
  position: relative;
  width: ${({ $iconSize: r }) => `${r}px`};
  height: ${({ $iconSize: r }) => `${r}px`};
  color: var(--privy-color-foreground-3);
  margin-left: auto;
`,
    j = (0, n.z)(f)`
  position: relative;
  width: 15px;
  height: 15px;
  color: var(--privy-color-foreground-3);
  margin-left: auto;
`,
    z = n.z.ol`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;
  text-align: left;
`,
    C = n.z.li`
  font-size: 14px;
  list-style-type: auto;
  list-style-position: outside;
  margin-left: 1rem;
  margin-bottom: 0.5rem; /* Adjust the margin as needed */

  &:last-child {
    margin-bottom: 0; /* Remove margin from the last item */
  }
`,
    $ = n.z.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,
    T = () => (0, e.jsx)($, { children: (0, e.jsx)(w, { $iconSize: 60 }) }),
    A = ({
      address: r,
      onClose: o,
      onRetry: i,
      onTransfer: n,
      isTransferring: c,
      transferSuccess: d,
    }) => {
      let { defaultChain: v } = (0, p.a)(),
        u = v.blockExplorers?.default.url ?? "https://etherscan.io";
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)(t.M, { onClose: o, backFn: i }),
          (0, e.jsxs)(y, {
            children: [
              (0, e.jsx)(T, {}),
              (0, e.jsxs)(m, {
                children: [
                  (0, e.jsx)("h3", {
                    children: "Check account assets before transferring",
                  }),
                  (0, e.jsx)("p", {
                    children:
                      "Before transferring, ensure there are no assets in the other account. Assets in that account will not transfer automatically and may be lost.",
                  }),
                  (0, e.jsxs)(z, {
                    children: [
                      (0, e.jsx)("p", {
                        children: " To check your balance, you can:",
                      }),
                      (0, e.jsx)(C, {
                        children:
                          "Log out and log back into the other account, or ",
                      }),
                      (0, e.jsxs)(C, {
                        children: [
                          "Copy your wallet address and use a",
                          " ",
                          (0, e.jsx)("u", {
                            children: (0, e.jsx)("a", {
                              target: "_blank",
                              href: u,
                              children: "block explorer",
                            }),
                          }),
                          " ",
                          "to see if the account holds any assets.",
                        ],
                      }),
                    ],
                  }),
                  (0, e.jsxs)(k, {
                    onClick: () =>
                      navigator.clipboard.writeText(r).catch(console.error),
                    children: [
                      (0, e.jsx)(a.f, {
                        color: "var(--privy-color-foreground)",
                        strokeWidth: 2,
                        height: "28px",
                        width: "28px",
                      }),
                      (0, e.jsx)(s.A, { address: r, showCopyIcon: !1 }),
                      (0, e.jsx)(j, {}),
                    ],
                  }),
                  (0, e.jsx)(b, {
                    onTransfer: n,
                    isTransferring: c,
                    transferSuccess: d,
                  }),
                ],
              }),
            ],
          }),
          (0, e.jsx)(l.B, {}),
        ],
      });
    },
    M = {
      component: () => {
        let { initiateAccountTransfer: r, closePrivyModal: o } = (0, d.u)(),
          { data: a, navigate: t, lastScreen: n, setModalData: l } = (0, v.u)(),
          [c, s] = (0, i.useState)(void 0),
          [u, p] = (0, i.useState)(!1),
          [h, f] = (0, i.useState)(!1),
          g = async () => {
            try {
              if (!a?.accountTransfer?.nonce || !a?.accountTransfer?.account)
                throw Error("missing account transfer inputs");
              (f(!0),
                await r({
                  nonce: a?.accountTransfer?.nonce,
                  account: a?.accountTransfer?.account,
                  accountType: a?.accountTransfer?.linkMethod,
                  externalWalletMetadata:
                    a?.accountTransfer?.externalWalletMetadata,
                  telegramWebAppData: a?.accountTransfer?.telegramWebAppData,
                  telegramAuthResult: a?.accountTransfer?.telegramAuthResult,
                  farcasterEmbeddedAddress:
                    a?.accountTransfer?.farcasterEmbeddedAddress,
                  oAuthUserInfo: a?.accountTransfer?.oAuthUserInfo,
                }),
                p(!0),
                f(!1),
                setTimeout(o, 1e3));
            } catch (r) {
              (l({
                errorModalData: {
                  error: r,
                  previousScreen: n || "LinkConflictScreen",
                },
              }),
                t("ErrorScreen", !0));
            }
          };
        return c
          ? (0, e.jsx)(A, {
              address: c,
              onClose: o,
              onRetry: () => s(void 0),
              onTransfer: g,
              isTransferring: h,
              transferSuccess: u,
            })
          : (0, e.jsx)(S, {
              onClose: o,
              onInfo: () => s(a?.accountTransfer?.embeddedWalletAddress),
              onContinue: () => s(a?.accountTransfer?.embeddedWalletAddress),
              onTransfer: g,
              isTransferring: h,
              transferSuccess: u,
              data: a,
            });
      },
    },
    S = ({
      onClose: r,
      onContinue: a,
      onInfo: i,
      onTransfer: n,
      transferSuccess: s,
      isTransferring: d,
      data: v,
    }) => {
      if (!v?.accountTransfer?.linkMethod || !v?.accountTransfer?.displayName)
        return;
      let p = {
        method: v?.accountTransfer?.linkMethod,
        handle: v?.accountTransfer?.displayName,
        disclosedAccount: v?.accountTransfer?.embeddedWalletAddress
          ? {
              type: "wallet",
              handle: v?.accountTransfer?.embeddedWalletAddress,
            }
          : void 0,
      };
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)(t.M, { closeable: !0 }),
          (0, e.jsxs)(y, {
            children: [
              (0, e.jsx)(c.e, {
                children: (0, e.jsxs)("div", {
                  children: [
                    (0, e.jsx)(g, { color: "var(--privy-color-error)" }),
                    (0, e.jsx)(o.f, {
                      height: 38,
                      width: 38,
                      stroke: "var(--privy-color-error)",
                    }),
                  ],
                }),
              }),
              (0, e.jsxs)(m, {
                children: [
                  (0, e.jsxs)("h3", {
                    children: [
                      (function (r) {
                        switch (r) {
                          case "sms":
                            return "Phone number";
                          case "email":
                            return "Email address";
                          case "siwe":
                            return "Wallet address";
                          case "siws":
                            return "Solana wallet address";
                          case "linkedin":
                            return "LinkedIn profile";
                          case "google":
                          case "apple":
                          case "discord":
                          case "github":
                          case "instagram":
                          case "spotify":
                          case "tiktok":
                          case "line":
                          case "twitch":
                          case "twitter":
                          case "telegram":
                          case "farcaster":
                            return `${(0, u.e)(r.replace("_oauth", ""))} profile`;
                          default:
                            return r.startsWith("privy:")
                              ? "Cross-app account"
                              : r;
                        }
                      })(p.method),
                      " is associated with another account",
                    ],
                  }),
                  (0, e.jsxs)("p", {
                    children: [
                      "Do you want to transfer",
                      (0, e.jsx)("b", {
                        children: p.handle ? ` ${p.handle}` : "",
                      }),
                      " to this account instead? This will delete your other account.",
                    ],
                  }),
                  (0, e.jsx)(L, {
                    onClick: i,
                    disclosedAccount: p.disclosedAccount,
                  }),
                ],
              }),
              (0, e.jsxs)(m, {
                style: { gap: 12, marginTop: 12 },
                children: [
                  v?.accountTransfer?.embeddedWalletAddress
                    ? (0, e.jsx)(t.P, { onClick: a, children: "Continue" })
                    : (0, e.jsx)(b, {
                        onTransfer: n,
                        transferSuccess: s,
                        isTransferring: d,
                      }),
                  (0, e.jsx)(t.S, { onClick: r, children: "No thanks" }),
                ],
              }),
            ],
          }),
          (0, e.jsx)(l.B, {}),
        ],
      });
    };
  function L({ disclosedAccount: r, onClick: o }) {
    return r
      ? (0, e.jsxs)(k, {
          onClick: o,
          children: [
            (0, e.jsx)(a.f, {
              color: "var(--privy-color-foreground)",
              strokeWidth: 2,
              height: "28px",
              width: "28px",
            }),
            (0, e.jsx)(s.A, { address: r.handle, showCopyIcon: !1 }),
            (0, e.jsx)(x, {
              width: 15,
              height: 15,
              color: "var(--privy-color-foreground-3)",
              style: { marginLeft: "auto" },
            }),
          ],
        })
      : null;
  }
  r.s(
    [
      "LinkConflictScreen",
      0,
      M,
      "LinkConflictScreenView",
      0,
      S,
      "default",
      0,
      M,
    ],
    923834,
  );
};
