// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(732486),
    i = r.i(447362),
    t = r.i(653327),
    n = r.i(78048);
  let a = (0, n.f)("qr-code", [
    [
      "rect",
      { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" },
    ],
    [
      "rect",
      { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" },
    ],
    [
      "rect",
      { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" },
    ],
    ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
    ["path", { d: "M21 21v.01", key: "ents32" }],
    ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M12 3h.01", key: "n36tog" }],
    ["path", { d: "M12 16v.01", key: "133mhm" }],
    ["path", { d: "M16 12h1", key: "1slzba" }],
    ["path", { d: "M21 12v.01", key: "1lwtk9" }],
    ["path", { d: "M12 21v-1", key: "1880an" }],
  ]);
  r.s(["f", 0, a], 810824);
  let l = (0, n.f)("chevron-up", [
    ["path", { d: "m18 15-6-6-6 6", key: "153udz" }],
  ]);
  var s = r.i(750900),
    c = r.i(332835);
  let d = (0, n.f)("info", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }],
  ]);
  var p = r.i(689391),
    u = r.i(410979),
    h = r.i(335341),
    v = r.i(995040),
    g = r.i(594022),
    m = r.i(493143),
    f = r.i(825339),
    x = r.i(266440),
    b = r.i(164923),
    y = r.i(336291);
  class k extends e.Component {
    static getDerivedStateFromError() {
      return { hasError: !0 };
    }
    componentDidCatch(r, e) {
      this.props.onError(r);
    }
    componentDidUpdate(r) {
      r.resetKey !== this.props.resetKey &&
        this.state.hasError &&
        this.setState({ hasError: !1 });
    }
    render() {
      return this.state.hasError ? null : this.props.children;
    }
    constructor(...r) {
      (super(...r), (this.state = { hasError: !1 }));
    }
  }
  function w(r) {
    return r >= 1e3
      ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
          Math.round(r),
        )
      : r >= 100
        ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(r)
        : r >= 1
          ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
              r,
            )
          : new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(
              r,
            );
  }
  let j = new Set([
      "ROUTE_UNAVAILABLE",
      "UNEXPECTED_STATE",
      "TIMEOUT_WAITING_FOR_NEXT_ORDER",
      "TIMEOUT_ORDER_COMPLETION",
      "DEPOSIT_FAILED",
      "DEPOSIT_REFUNDED",
      "USER_EXITED",
      "AMOUNT_TOO_LOW",
      "INSUFFICIENT_LIQUIDITY",
      "UNSUPPORTED_CHAIN",
      "UNSUPPORTED_CURRENCY",
      "UNSUPPORTED_ROUTE",
      "NO_SWAP_ROUTES_FOUND",
      "NO_INTERNAL_SWAP_ROUTES_FOUND",
      "NO_QUOTES",
      "SANCTIONED_WALLET_ADDRESS",
      "REFUND_WALLET_CREATION_FAILED",
      "DEPOSIT_ADDRESSES_NOT_ENABLED",
      "NOT_AUTHENTICATED",
    ]),
    z = p.z.span`
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid var(--privy-color-foreground-3);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
  function C({ address: r, onClick: i }) {
    let [t, n] = (0, e.useState)(!1);
    return (0, o.jsx)(o.Fragment, {
      children: t
        ? (0, o.jsx)($, {
            onClick: () => n(!1),
            style: { marginTop: "1.5rem" },
            children: (0, o.jsx)(g.Q, { url: r, size: 312, hideLogo: !0 }),
          })
        : (0, o.jsxs)(S, {
            title: "Click to copy address",
            onClick: i,
            style: { marginTop: "1.5rem" },
            children: [
              (0, o.jsxs)(E, {
                children: [
                  (0, o.jsx)(_, { children: "Deposit address" }),
                  (0, o.jsx)(T, { children: r }),
                ],
              }),
              (0, o.jsx)(N, {
                children: (0, o.jsx)(F, {
                  type: "button",
                  onClick: (r) => {
                    (r.stopPropagation(), n(!0));
                  },
                  children: (0, o.jsx)(a, {
                    size: 16,
                    color: "var(--privy-color-icon-muted)",
                  }),
                }),
              }),
            ],
          }),
    });
  }
  let $ = p.z.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
`,
    S = p.z.div`
  display: flex;
  border-radius: var(--privy-border-radius-md);
  background: var(--privy-color-background-clicked);
  padding: 1rem;
  cursor: pointer;
  gap: 0.5rem;
`,
    E = p.z.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`,
    _ = p.z.div`
  font-size: 0.75rem;
  color: var(--privy-color-icon-muted);
  line-height: 1rem;
  margin-bottom: 0.25rem;
`,
    T = p.z.div`
  word-break: break-all;
  font-size: 0.875rem;
  font-family: ui-monospace, monospace;
  font-weight: 500;
  line-height: 1.375rem;
  color: var(--privy-color-foreground);
`,
    N = p.z.div`
  width: 1.5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-top: 0.25rem;
`,
    F = p.z.button`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    box-shadow: none;
    border-radius: var(--privy-border-radius-xs);

    &:hover {
      background: var(--privy-color-background);
    }

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }
  }
`,
    M = (r) => /^0x/i.test(r) || r.length > 16;
  function U({
    quote: r,
    selectedCurrency: i,
    selectedChain: t,
    destinationSymbol: n,
    destinationChainName: a,
    destinationAsset: d,
  }) {
    var p, h;
    let v,
      [g, m] = (0, e.useState)(!1),
      f = i.symbol.toUpperCase(),
      x = t.displayName,
      k = (0, e.useRef)(null);
    return (0, o.jsxs)(A, {
      children: [
        (0, o.jsxs)(L, {
          onClick: (0, e.useCallback)(() => {
            let r = document.getElementById("privy-modal-content");
            (r &&
              (k.current && clearTimeout(k.current),
              (r.style.transition = "none"),
              (k.current = setTimeout(() => {
                ((r.style.transition = ""), (k.current = null));
              }, 160))),
              m((r) => !r));
          }, []),
          children: [
            (0, o.jsxs)(I, {
              children: [
                i.logoURI &&
                  (0, o.jsx)(u.T, {
                    src: i.logoURI,
                    alt: f,
                    style: { width: "2rem", height: "2rem" },
                  }),
                t.iconUrl && (0, o.jsx)(O, { src: t.iconUrl, alt: x }),
              ],
            }),
            (0, o.jsxs)(R, {
              children: [
                (0, o.jsx)(D, { children: "You send" }),
                (0, o.jsxs)(B, { children: [f, " on ", x] }),
              ],
            }),
            (0, o.jsx)(P, { children: (0, o.jsx)(g ? l : s.f, { size: 16 }) }),
          ],
        }),
        (0, o.jsx)(q, {
          $expanded: g,
          children: (0, o.jsx)(H, {
            children: (0, o.jsxs)(V, {
              children: [
                r.indicative_rate &&
                  (0, o.jsxs)(u.i, {
                    children: [
                      (0, o.jsx)(u.j, { children: "Conversion rate" }),
                      (0, o.jsxs)(u.k, {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        },
                        children: [
                          ((p = r.indicative_rate),
                          (h = n.toUpperCase()),
                          Number.isFinite((v = Number(p))) && 0 !== v
                            ? v >= 0.01
                              ? `1 ${f} ≈ ${w(v)} ${h}`
                              : `${w(1 / v)} ${f} ≈ 1 ${h}`
                            : `1 ${f} ≈ ${p} ${h}`),
                          (0, o.jsx)(Q, {
                            content:
                              "Estimated rate based on current market conditions. Final execution price may vary depending on transfer size and routing.",
                          }),
                        ],
                      }),
                    ],
                  }),
                (0, o.jsxs)(u.i, {
                  children: [
                    (0, o.jsx)(u.j, { children: "Receive" }),
                    (0, o.jsxs)(u.k, {
                      children: [
                        n && !M(n)
                          ? n.toUpperCase()
                          : M(d)
                            ? (0, y.c)(d)
                            : d.toUpperCase(),
                        a ? ` on ${a}` : "",
                      ],
                    }),
                  ],
                }),
                null != r.slippage_bps &&
                  (0, o.jsxs)(u.i, {
                    children: [
                      (0, o.jsx)(u.j, { children: "Max slippage" }),
                      (0, o.jsxs)(u.k, {
                        children: [(r.slippage_bps / 100).toFixed(1), "%"],
                      }),
                    ],
                  }),
                r.refund_address &&
                  (0, o.jsxs)(u.i, {
                    children: [
                      (0, o.jsx)(u.j, { children: "Refund address" }),
                      (0, o.jsx)(u.k, {
                        children: (0, o.jsx)(b.C, {
                          value: r.refund_address,
                          iconOnly: !0,
                          iconSize: 11,
                          children: (0, y.c)(r.refund_address, 4, 4),
                        }),
                      }),
                    ],
                  }),
              ],
            }),
          }),
        }),
        (0, o.jsxs)(Z, {
          children: [
            (0, o.jsx)(c.f, {
              size: 16,
              color: "var(--privy-color-icon-muted)",
              style: { flexShrink: 0 },
            }),
            (0, o.jsxs)(W, {
              children: [
                "Only send ",
                (0, o.jsx)("strong", { children: f }),
                " on ",
                (0, o.jsx)("strong", { children: x }),
                ". Other assets may be lost.",
              ],
            }),
          ],
        }),
      ],
    });
  }
  let A = p.z.div`
  border-radius: var(--privy-border-radius-md);
  border: 1px solid var(--privy-color-foreground-4);
  overflow: hidden;
`,
    L = p.z.button`
  && {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--privy-color-foreground);
    outline: none;
    box-shadow: none;

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }
  }
`,
    I = p.z.span`
  position: relative;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`,
    O = (0, p.z)(u.N)`
  && {
    position: absolute;
    top: -0.125rem;
    right: -0.25rem;
    width: 0.75rem;
    height: 0.75rem;
    box-sizing: content-box;
    border: 1.5px solid var(--privy-color-background);
    background-color: var(--privy-color-background);
  }
`,
    R = p.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,
    D = p.z.span`
  font-size: 0.75rem;
  color: var(--privy-color-foreground-3);
  line-height: 1rem;
`,
    B = p.z.span`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
`,
    P = p.z.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--privy-border-radius-full);
  background-color: var(--privy-color-background-clicked);
  color: var(--privy-color-foreground-3);
`,
    V = p.z.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 0.75rem;

  & > * {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--privy-color-foreground-4);
  }

  & > *:last-child {
    border-bottom: none;
  }
`,
    Z = p.z.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0.75rem 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: var(--privy-border-radius-sm);
  background: var(--privy-color-background-2);
`,
    W = p.z.span`
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--privy-color-icon-muted);
  text-align: left;
`,
    q = p.z.div`
  display: grid;
  grid-template-rows: ${({ $expanded: r }) => (r ? "1fr" : "0fr")};
  transition: grid-template-rows 150ms ease-out;
`,
    H = p.z.div`
  overflow: hidden;
`;
  function Q({ content: r }) {
    let [i, t] = (0, e.useState)(!1),
      {
        refs: n,
        floatingStyles: a,
        context: l,
      } = (0, m.E)({
        open: i,
        onOpenChange: t,
        placement: "top",
        whileElementsMounted: f.n,
        middleware: [(0, x.T)(6), (0, x.x)(), (0, x.e)({ padding: 8 })],
      }),
      s = (0, m.V)(l, { move: !1, handleClose: (0, m.i)() }),
      c = (0, m.Z)(l),
      { getReferenceProps: p, getFloatingProps: u } = (0, m.t)([
        s,
        c,
        (0, m.F)(l),
        (0, m.H)(l),
        (0, m.M)(l, { role: "tooltip" }),
      ]),
      { isMounted: h, styles: v } = (0, m.z)(l, { duration: 150 });
    return (0, o.jsxs)(o.Fragment, {
      children: [
        (0, o.jsx)("button", {
          ref: n.setReference,
          type: "button",
          "aria-label": "More information about conversion rate",
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            border: "none",
            background: "none",
            color: "var(--privy-color-icon-muted)",
            cursor: "pointer",
          },
          ...p(),
          children: (0, o.jsx)(d, { size: 14 }),
        }),
        h &&
          (0, o.jsx)(m.r, {
            root: document.getElementById("privy-modal-content") ?? void 0,
            children: (0, o.jsx)(K, {
              ref: n.setFloating,
              style: { ...a, ...v },
              ...u(),
              children: r,
            }),
          }),
      ],
    });
  }
  let K = p.z.div`
  max-width: 13rem;
  padding: 0.5rem 0.625rem;
  border-radius: var(--privy-border-radius-sm, 0.375rem);
  background: var(--privy-color-foreground);
  color: var(--privy-color-background);
  font-size: 0.6875rem;
  line-height: 1rem;
  font-weight: 400;
  text-align: left;
  z-index: 10;
`,
    Y = p.z.p`
  && {
    margin: 0.5rem 0 0;
    font-size: 0.6875rem;
    line-height: 1.125rem;
    color: var(--privy-color-icon-muted);
    text-align: center;
  }
`;
  r.s(
    [
      "D",
      0,
      ({ trackingUrl: r, onViewBlockExplorer: e, onClose: n }) => {
        let a =
          r && e
            ? () => {
                (e(), window.open(r, "_blank", "noopener,noreferrer"));
              }
            : void 0;
        return (0, o.jsx)(h.S, {
          icon: i.f,
          iconVariant: "subtle",
          title: "Transfer in progress",
          subtitle:
            "Your deposit was received and the transfer is now processing.",
          showClose: !0,
          onClose: n,
          secondaryCta: a
            ? { label: "View on block explorer ↗", onClick: a }
            : void 0,
          watermark: !1,
          children: (0, o.jsxs)(u.d, {
            children: [
              (0, o.jsxs)(u.e, {
                children: [
                  (0, o.jsx)(u.f, {
                    $status: "done",
                    children: (0, o.jsx)(t.f, {
                      size: 14,
                      color: "var(--privy-color-icon-success)",
                      strokeWidth: 2,
                    }),
                  }),
                  (0, o.jsx)(u.g, { children: "Deposit received" }),
                ],
              }),
              (0, o.jsx)(u.h, {}),
              (0, o.jsxs)(u.e, {
                children: [
                  (0, o.jsx)(u.f, {
                    $status: "active",
                    children: (0, o.jsx)(z, {}),
                  }),
                  (0, o.jsx)(u.g, { children: "Bridging" }),
                ],
              }),
              (0, o.jsx)(u.h, {}),
              (0, o.jsxs)(u.e, {
                children: [
                  (0, o.jsx)(u.f, { $status: "pending" }),
                  (0, o.jsx)(u.g, { children: "Funds arrived" }),
                ],
              }),
            ],
          }),
        });
      },
      "a",
      0,
      function ({ address: r, caip2: e, config: o }) {
        for (let i of o.currencies) {
          let o = i.chains.find(
            (o) => o.caip2 === e && o.address.toLowerCase() === r.toLowerCase(),
          );
          if (o)
            return { symbol: i.symbol.toUpperCase(), decimals: o.decimals };
        }
        return { symbol: r, decimals: void 0 };
      },
      "b",
      0,
      function (r, e) {
        return r.chains
          .filter((r) => !0 === r.can_be_relay_deposit_source)
          .map((r) => {
            let o = e.chains[r.caip2];
            return o
              ? {
                  caip2: r.caip2,
                  displayName: o.displayName,
                  iconUrl: o.iconUrl,
                  vmType: o.vmType,
                  currencyAddress: r.address,
                  currencyDecimals: r.decimals,
                }
              : null;
          })
          .filter((r) => null !== r);
      },
      "c",
      0,
      function (r, e) {
        let o = e[r];
        return o?.displayName ?? o?.display_name ?? r;
      },
      "d",
      0,
      ({
        quote: r,
        selectedCurrency: i,
        selectedChain: n,
        destinationSymbol: a,
        destinationChainName: l,
        destinationAsset: s,
        onBack: c,
        onClose: d,
      }) => {
        let [p, u] = (0, e.useState)(!1),
          g = i?.symbol?.toUpperCase() ?? "funds",
          m = n?.displayName ?? "",
          f = async () => {
            p ||
              (await navigator.clipboard.writeText(r.deposit_address),
              u(!0),
              setTimeout(() => u(!1), 2e3));
          };
        return (0, o.jsxs)(h.S, {
          title: `Send ${g}${m ? ` on ${m}` : ""}`,
          subtitle:
            "Send funds to the address below. Conversion and routing handled by Relay.",
          showBack: !0,
          onBack: c,
          showClose: !0,
          onClose: d,
          watermark: !1,
          children: [
            (0, o.jsx)(U, {
              quote: r,
              selectedCurrency: i,
              selectedChain: n,
              destinationSymbol: a,
              destinationChainName: l,
              destinationAsset: s,
            }),
            (0, o.jsx)(C, { address: r.deposit_address, onClick: f }),
            (0, o.jsx)(v.P, {
              style: {
                marginTop: "1rem",
                marginBottom: "0.5rem",
                ...(p
                  ? {
                      backgroundColor: "var(--privy-color-icon-success)",
                      borderColor: "var(--privy-color-icon-success)",
                    }
                  : {}),
              },
              onClick: f,
              children: p
                ? (0, o.jsxs)(o.Fragment, {
                    children: [
                      "Copied ",
                      (0, o.jsx)(t.f, {
                        size: 16,
                        style: { marginLeft: "0.25rem" },
                      }),
                    ],
                  })
                : "Copy address",
            }),
            (0, o.jsx)(Y, {
              children:
                "Routing and bridging are handled by Relay. Privy does not control execution timing, liquidity, or transaction outcomes.",
            }),
          ],
        });
      },
      "e",
      0,
      k,
      "f",
      0,
      function (r, e) {
        let o = Number(r);
        if (!Number.isFinite(o) || 0 === o) return r;
        let i = null != e ? o / 10 ** e : o;
        return i >= 1e3
          ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
              i,
            )
          : i >= 1
            ? new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 4,
              }).format(i)
            : i >= 1e-4
              ? new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 6,
                }).format(i)
              : new Intl.NumberFormat("en-US", {
                  maximumSignificantDigits: 4,
                }).format(i);
      },
      "t",
      0,
      function (r) {
        return j.has(r) ? r : "UNKNOWN_ERROR";
      },
      "v",
      0,
      function (r, e) {
        if (!r.chains[e.destinationChain])
          return `Unsupported destination chain: "${e.destinationChain}". Check that the chain is in CAIP-2 format (e.g. "eip155:8453") and is supported for deposit addresses.`;
        let o = e.destinationCurrency.toLowerCase();
        return r.currencies.some((r) =>
          r.chains.some(
            (r) =>
              r.caip2 === e.destinationChain && r.address.toLowerCase() === o,
          ),
        )
          ? null
          : `Unsupported destination currency "${e.destinationCurrency}" on chain "${e.destinationChain}". Check that this token address is supported on the specified chain.`;
      },
    ],
    759547,
  );
};
