// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(689391),
    i = e.i(838581),
    a = e.i(625761),
    n = e.i(727472),
    t = e.i(84410),
    l = e.i(352386),
    c = e.i(933185);
  let d = ({ label: e, children: o, valueStyles: i }) =>
      (0, r.jsxs)(s, {
        children: [
          (0, r.jsx)("div", { children: e }),
          (0, r.jsx)(v, { style: { ...i }, children: o }),
        ],
      }),
    s = o.z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > :first-child {
    color: var(--privy-color-foreground-3);
    text-align: left;
  }

  > :last-child {
    color: var(--privy-color-foreground-2);
    text-align: right;
  }
`,
    v = o.z.div`
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background-color: var(--privy-color-background-2);
  padding: 4px 8px;
`,
    p = ({ gas: e, tokenPrice: o, tokenSymbol: t }) =>
      (0, r.jsxs)(n.F, {
        style: { paddingBottom: "12px" },
        children: [
          (0, r.jsxs)(h, {
            children: [
              (0, r.jsx)(x, { children: "Est. Fees" }),
              (0, r.jsx)("div", {
                children: (0, r.jsx)(i.P, {
                  weiQuantities: [BigInt(e)],
                  tokenPrice: o,
                  tokenSymbol: t,
                }),
              }),
            ],
          }),
          o && (0, r.jsx)(g, { children: `${(0, a.g)(BigInt(e), t)}` }),
        ],
      }),
    u = ({ value: e, gas: o, tokenPrice: t, tokenSymbol: l }) => {
      let c = BigInt(e ?? 0) + BigInt(o);
      return (0, r.jsxs)(n.F, {
        children: [
          (0, r.jsxs)(h, {
            children: [
              (0, r.jsx)(x, { children: "Total (including fees)" }),
              (0, r.jsx)("div", {
                children: (0, r.jsx)(i.P, {
                  weiQuantities: [BigInt(e || 0), BigInt(o)],
                  tokenPrice: t,
                  tokenSymbol: l,
                }),
              }),
            ],
          }),
          t && (0, r.jsx)(g, { children: (0, a.g)(c, l) }),
        ],
      });
    },
    h = o.z.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
`,
    g = o.z.div`
  display: flex;
  flex-direction: row;
  height: 12px;

  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
  font-weight: 400;
`,
    x = o.z.div`
  font-size: 14px;
  line-height: 22.4px;
  font-weight: 400;
`,
    f = (0, l.createContext)(void 0),
    b = (0, l.createContext)(void 0),
    y = ({ defaultValue: e, children: o }) => {
      let [i, a] = (0, l.useState)(e || null);
      return (0, r.jsx)(f.Provider, {
        value: {
          activePanel: i,
          togglePanel: (e) => {
            a(i === e ? null : e);
          },
        },
        children: (0, r.jsx)(z, { children: o }),
      });
    },
    m = ({ value: e, children: o }) => {
      let { activePanel: i, togglePanel: a } = (0, l.useContext)(f),
        n = i === e;
      return (0, r.jsx)(b.Provider, {
        value: { onToggle: () => a(e), value: e },
        children: (0, r.jsx)(C, {
          isActive: n ? "true" : "false",
          "data-open": String(n),
          children: o,
        }),
      });
    },
    k = ({ children: e }) => {
      let { activePanel: o } = (0, l.useContext)(f),
        { onToggle: i, value: a } = (0, l.useContext)(b),
        n = o === a;
      return (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsxs)($, {
            onClick: i,
            "data-open": String(n),
            children: [
              (0, r.jsx)(P, { children: e }),
              (0, r.jsx)(B, {
                isactive: n ? "true" : "false",
                children: (0, r.jsx)(t.f, {
                  height: "16px",
                  width: "16px",
                  strokeWidth: "2",
                }),
              }),
            ],
          }),
          (0, r.jsx)(S, {}),
        ],
      });
    },
    j = ({ children: e }) => {
      let { activePanel: o } = (0, l.useContext)(f),
        { value: i } = (0, l.useContext)(b);
      return (0, r.jsx)(F, {
        "data-open": String(o === i),
        children: (0, r.jsx)(E, { children: e }),
      });
    },
    w = ({ children: e }) => {
      let { activePanel: o } = (0, l.useContext)(f),
        { value: i } = (0, l.useContext)(b);
      return (0, r.jsx)(E, {
        children: "function" == typeof e ? e({ isActive: o === i }) : e,
      });
    },
    z = o.z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`,
    $ = o.z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding-bottom: 8px;
`,
    S = o.z.div`
  width: 100%;

  && {
    border-top: 1px solid;
    border-color: var(--privy-color-foreground-4);
  }
  padding-bottom: 12px;
`,
    P = o.z.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 19.6px;
  width: 100%;
  padding-right: 8px;
`,
    C = o.z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 12px;

  && {
    border: 1px solid;
    border-color: var(--privy-color-foreground-4);
    border-radius: var(--privy-border-radius-md);
  }
`,
    F = o.z.div`
  position: relative;
  overflow: hidden;
  transition: max-height 25ms ease-out;

  &[data-open='true'] {
    max-height: 700px;
  }

  &[data-open='false'] {
    max-height: 0;
  }
`,
    E = o.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
  min-height: 1px;
`,
    B = o.z.div`
  transform: ${(e) => ("true" === e.isactive ? "rotate(180deg)" : "rotate(0deg)")};
`,
    T = o.z.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,
    M = o.z.div`
  flex-shrink: 0;
  padding-left: 8px;
`;
  e.s([
    "T",
    0,
    ({
      from: e,
      to: o,
      txn: a,
      transactionInfo: n,
      tokenPrice: t,
      gas: l,
      tokenSymbol: s,
    }) => {
      let v = BigInt(a?.value || 0);
      return (0, r.jsx)(y, {
        ...((0, c.a)().render.standalone ? { defaultValue: "details" } : {}),
        children: (0, r.jsxs)(m, {
          value: "details",
          children: [
            (0, r.jsx)(k, {
              children: (0, r.jsxs)(T, {
                children: [
                  (0, r.jsx)("div", { children: n?.title || "Details" }),
                  (0, r.jsx)(M, {
                    children: (0, r.jsx)(i.H, {
                      weiQuantities: [v],
                      tokenPrice: t,
                      tokenSymbol: s,
                    }),
                  }),
                ],
              }),
            }),
            (0, r.jsxs)(j, {
              children: [
                (0, r.jsx)(d, {
                  label: "From",
                  children: (0, r.jsx)(i.W, {
                    walletAddress: e,
                    chainId: a.chainId || c.U,
                    chainType: "ethereum",
                  }),
                }),
                (0, r.jsx)(d, {
                  label: "To",
                  children: (0, r.jsx)(i.W, {
                    walletAddress: o,
                    chainId: a.chainId || c.U,
                    chainType: "ethereum",
                  }),
                }),
                n &&
                  n.action &&
                  (0, r.jsx)(d, { label: "Action", children: n.action }),
                l &&
                  (0, r.jsx)(p, {
                    value: a.value,
                    gas: l,
                    tokenPrice: t,
                    tokenSymbol: s,
                  }),
              ],
            }),
            (0, r.jsx)(w, {
              children: ({ isActive: e }) =>
                (0, r.jsx)(u, {
                  value: a.value,
                  displayFee: e,
                  gas: l || "0x0",
                  tokenPrice: t,
                  tokenSymbol: s,
                }),
            }),
          ],
        }),
      });
    },
  ]);
};
