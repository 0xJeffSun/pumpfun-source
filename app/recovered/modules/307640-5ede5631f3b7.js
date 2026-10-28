// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(689391),
    i = r.i(636447),
    a = r.i(335341);
  (r.i(352386), r.i(252494));
  let l = (r) =>
      (0, e.jsx)("svg", {
        id: "Layer_1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-0.625 12.48 397.647 399.546",
        width: "2500",
        height: "674",
        preserveAspectRatio: "none",
        ...r,
        children: (0, e.jsx)("g", {
          children: (0, e.jsx)("path", {
            fill: "#333745",
            d: "M 333.9 12.8 L 150.9 12.8 L 150.9 258.4 L 396.5 258.4 L 396.5 76.7 C 396.6 42.2 368.4 12.8 333.9 12.8 Z M 94.7 12.8 L 64 12.8 C 29.5 12.8 0 40.9 0 76.8 L 0 107.5 L 94.7 107.5 L 94.7 12.8 Z M 0 165 L 94.7 165 L 94.7 259.7 L 0 259.7 L 0 165 Z M 301.9 410.6 L 332.6 410.6 C 367.1 410.6 396.6 382.5 396.6 346.6 L 396.6 316 L 301.9 316 L 301.9 410.6 Z M 150.9 316 L 245.6 316 L 245.6 410.7 L 150.9 410.7 L 150.9 316 Z M 0 316 L 0 346.7 C 0 381.2 28.1 410.7 64 410.7 L 94.7 410.7 L 94.7 316 L 0 316 Z",
          }),
        }),
      }),
    n = ({
      onContinueWithLedger: r,
      onContinueWithoutLedger: o,
      title: i = "Using a hardware wallet?",
      subtitle:
        n = "If you have a Ledger connected,\ncontinue to sign with Ledger",
    }) =>
      (0, e.jsx)(a.S, {
        title: i,
        subtitle: (0, e.jsx)(s, { children: n }),
        primaryCta: { label: "Continue with Ledger", onClick: r },
        secondaryCta: { label: "Continue without Ledger", onClick: o },
        watermark: !0,
        children: (0, e.jsx)(d, {
          children: (0, e.jsx)(l, { style: { width: "48px", height: "48px" } }),
        }),
      });
  function t() {
    let { data: r, setModalData: o, navigate: a } = (0, i.u)();
    return (0, e.jsx)(n, {
      onContinueWithLedger: function () {
        (o({ ...r, login: { ...r?.login, isSigningInWithLedgerSolana: !0 } }),
          a("ConnectionStatusScreen"));
      },
      onContinueWithoutLedger: function () {
        (o({ ...r, login: { ...r?.login, isSigningInWithLedgerSolana: !1 } }),
          a("ConnectionStatusScreen"));
      },
    });
  }
  let c = { component: t },
    d = o.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: var(--screen-space);
`,
    s = o.z.span`
  white-space: pre-wrap;
`;
  r.s([
    "ConnectLedgerScreen",
    0,
    c,
    "ConnectLedgerScreenComponent",
    0,
    t,
    "ConnectLedgerScreenView",
    0,
    n,
    "default",
    0,
    c,
  ]);
};
