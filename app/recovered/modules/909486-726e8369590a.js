// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(689391),
    a = e.i(838581),
    i = e.i(625761),
    s = e.i(727472),
    r = e.i(84410),
    o = e.i(352386),
    l = e.i(933185);
  let d = ({ label: e, children: n, valueStyles: a }) =>
      (0, t.jsxs)(c, {
        children: [
          (0, t.jsx)("div", { children: e }),
          (0, t.jsx)(u, { style: { ...a }, children: n }),
        ],
      }),
    c = n.z.div`
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
    u = n.z.div`
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background-color: var(--privy-color-background-2);
  padding: 4px 8px;
`,
    p = ({ gas: e, tokenPrice: n, tokenSymbol: r }) =>
      (0, t.jsxs)(s.F, {
        style: { paddingBottom: "12px" },
        children: [
          (0, t.jsxs)(y, {
            children: [
              (0, t.jsx)(h, { children: "Est. Fees" }),
              (0, t.jsx)("div", {
                children: (0, t.jsx)(a.P, {
                  weiQuantities: [BigInt(e)],
                  tokenPrice: n,
                  tokenSymbol: r,
                }),
              }),
            ],
          }),
          n && (0, t.jsx)(f, { children: `${(0, i.g)(BigInt(e), r)}` }),
        ],
      }),
    m = ({ value: e, gas: n, tokenPrice: r, tokenSymbol: o }) => {
      let l = BigInt(e ?? 0) + BigInt(n);
      return (0, t.jsxs)(s.F, {
        children: [
          (0, t.jsxs)(y, {
            children: [
              (0, t.jsx)(h, { children: "Total (including fees)" }),
              (0, t.jsx)("div", {
                children: (0, t.jsx)(a.P, {
                  weiQuantities: [BigInt(e || 0), BigInt(n)],
                  tokenPrice: r,
                  tokenSymbol: o,
                }),
              }),
            ],
          }),
          r && (0, t.jsx)(f, { children: (0, i.g)(l, o) }),
        ],
      });
    },
    y = n.z.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
`,
    f = n.z.div`
  display: flex;
  flex-direction: row;
  height: 12px;

  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
  font-weight: 400;
`,
    h = n.z.div`
  font-size: 14px;
  line-height: 22.4px;
  font-weight: 400;
`,
    g = (0, o.createContext)(void 0),
    b = (0, o.createContext)(void 0),
    v = ({ defaultValue: e, children: n }) => {
      let [a, i] = (0, o.useState)(e || null);
      return (0, t.jsx)(g.Provider, {
        value: {
          activePanel: a,
          togglePanel: (e) => {
            i(a === e ? null : e);
          },
        },
        children: (0, t.jsx)(I, { children: n }),
      });
    },
    x = ({ value: e, children: n }) => {
      let { activePanel: a, togglePanel: i } = (0, o.useContext)(g),
        s = a === e;
      return (0, t.jsx)(b.Provider, {
        value: { onToggle: () => i(e), value: e },
        children: (0, t.jsx)(P, {
          isActive: s ? "true" : "false",
          "data-open": String(s),
          children: n,
        }),
      });
    },
    T = ({ children: e }) => {
      let { activePanel: n } = (0, o.useContext)(g),
        { onToggle: a, value: i } = (0, o.useContext)(b),
        s = n === i;
      return (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsxs)(S, {
            onClick: a,
            "data-open": String(s),
            children: [
              (0, t.jsx)(E, { children: e }),
              (0, t.jsx)(M, {
                isactive: s ? "true" : "false",
                children: (0, t.jsx)(r.f, {
                  height: "16px",
                  width: "16px",
                  strokeWidth: "2",
                }),
              }),
            ],
          }),
          (0, t.jsx)(j, {}),
        ],
      });
    },
    k = ({ children: e }) => {
      let { activePanel: n } = (0, o.useContext)(g),
        { value: a } = (0, o.useContext)(b);
      return (0, t.jsx)(C, {
        "data-open": String(n === a),
        children: (0, t.jsx)(F, { children: e }),
      });
    },
    w = ({ children: e }) => {
      let { activePanel: n } = (0, o.useContext)(g),
        { value: a } = (0, o.useContext)(b);
      return (0, t.jsx)(F, {
        children: "function" == typeof e ? e({ isActive: n === a }) : e,
      });
    },
    I = n.z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`,
    S = n.z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding-bottom: 8px;
`,
    j = n.z.div`
  width: 100%;

  && {
    border-top: 1px solid;
    border-color: var(--privy-color-foreground-4);
  }
  padding-bottom: 12px;
`,
    E = n.z.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 19.6px;
  width: 100%;
  padding-right: 8px;
`,
    P = n.z.div`
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
    C = n.z.div`
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
    F = n.z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
  min-height: 1px;
`,
    M = n.z.div`
  transform: ${(e) => ("true" === e.isactive ? "rotate(180deg)" : "rotate(0deg)")};
`,
    N = n.z.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,
    A = n.z.div`
  flex-shrink: 0;
  padding-left: 8px;
`;
  e.s([
    "T",
    0,
    ({
      from: e,
      to: n,
      txn: i,
      transactionInfo: s,
      tokenPrice: r,
      gas: o,
      tokenSymbol: c,
    }) => {
      let u = BigInt(i?.value || 0);
      return (0, t.jsx)(v, {
        ...((0, l.a)().render.standalone ? { defaultValue: "details" } : {}),
        children: (0, t.jsxs)(x, {
          value: "details",
          children: [
            (0, t.jsx)(T, {
              children: (0, t.jsxs)(N, {
                children: [
                  (0, t.jsx)("div", { children: s?.title || "Details" }),
                  (0, t.jsx)(A, {
                    children: (0, t.jsx)(a.H, {
                      weiQuantities: [u],
                      tokenPrice: r,
                      tokenSymbol: c,
                    }),
                  }),
                ],
              }),
            }),
            (0, t.jsxs)(k, {
              children: [
                (0, t.jsx)(d, {
                  label: "From",
                  children: (0, t.jsx)(a.W, {
                    walletAddress: e,
                    chainId: i.chainId || l.U,
                    chainType: "ethereum",
                  }),
                }),
                (0, t.jsx)(d, {
                  label: "To",
                  children: (0, t.jsx)(a.W, {
                    walletAddress: n,
                    chainId: i.chainId || l.U,
                    chainType: "ethereum",
                  }),
                }),
                s &&
                  s.action &&
                  (0, t.jsx)(d, { label: "Action", children: s.action }),
                o &&
                  (0, t.jsx)(p, {
                    value: i.value,
                    gas: o,
                    tokenPrice: r,
                    tokenSymbol: c,
                  }),
              ],
            }),
            (0, t.jsx)(w, {
              children: ({ isActive: e }) =>
                (0, t.jsx)(m, {
                  value: i.value,
                  displayFee: e,
                  gas: o || "0x0",
                  tokenPrice: r,
                  tokenSymbol: c,
                }),
            }),
          ],
        }),
      });
    },
  ]);
};
