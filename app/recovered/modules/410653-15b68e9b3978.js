// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(303690),
    i = r.i(139225),
    a = r.i(604165),
    l = r.i(352386),
    t = r.i(689391),
    n = r.i(226439),
    c = r.i(885650),
    d = r.i(578960),
    s = r.i(933185),
    v = r.i(711807),
    p = r.i(636447),
    h = r.i(786847),
    u = r.i(410979),
    g = r.i(586539);
  (r.i(252494), r.i(785373));
  let b = {
      component: () => {
        let r = (0, g.b)(),
          { onUserCloseViaDialogOrKeybindRef: t } = (0, p.u)(),
          b = (0, s.a)(),
          w = (0, l.useRef)(!1),
          k = (0, v.u)(v.i),
          j = (0, v.u)(v.a),
          [z, C] = (0, l.useState)(!1),
          $ = k ? "APPLE_PAY" : !1 === k && j ? "GOOGLE_PAY" : null,
          M = !0 === k || (!1 === k && void 0 !== j),
          S = !r?.startFiat || M || z;
        ((0, l.useEffect)(() => {
          let r = window.setTimeout(() => C(!0), 2e3);
          return () => window.clearTimeout(r);
        }, []),
          (0, l.useEffect)(() => {
            r && (w.current = !1);
          }, [r]));
        let A = (0, l.useRef)(null);
        (0, l.useEffect)(() => {
          r &&
            !r.error &&
            S &&
            A.current !== r &&
            ((A.current = r),
            r.recordRowsViewed?.({
              walletPay: r.startFiat ? $ : void 0,
              walletPayTimedOut: r.startFiat ? !M : void 0,
            }));
        }, [S, r, $, M]);
        let E = (0, l.useCallback)(async () => {
          !w.current && r && ((w.current = !0), (0, g.r)(), await r.onCancel());
        }, [r]);
        if (
          ((0, l.useEffect)(
            () => (
              (t.current = E),
              () => {
                t.current === E && (t.current = null);
              }
            ),
            [E, t],
          ),
          !r)
        )
          return null;
        if (r.error)
          return (0, e.jsx)(u.C, {
            title: "Unable to add funds",
            subtitle: r.error,
            showClose: !0,
            onClose: E,
            primaryCta: { label: "Close", onClick: E },
          });
        let L = async (e) => {
          w.current || ((w.current = !0), await r.startFiat?.(e));
        };
        return (0, e.jsx)(u.C, {
          title: "Pay with",
          subtitle:
            "Debit cards typically have higher success rates than credit cards, even with Apple Pay or Google Pay.",
          showClose: !0,
          onClose: E,
          children: S
            ? (0, e.jsxs)(h.S, {
                style: { marginTop: "1rem" },
                $colorScheme: b.appearance.palette.colorScheme,
                children: [
                  r.startFiat &&
                    (0, e.jsxs)(u.O, {
                      onClick: () => L("CREDIT_DEBIT_CARD"),
                      children: [
                        (0, e.jsx)(x, { children: (0, e.jsx)(o.f, {}) }),
                        (0, e.jsxs)(y, {
                          children: [
                            (0, e.jsx)(u.a, {
                              children: "Debit or credit card",
                            }),
                            (0, e.jsx)(m, { children: "Less than 10 minutes" }),
                          ],
                        }),
                      ],
                    }),
                  r.startFiat &&
                    "APPLE_PAY" === $ &&
                    (0, e.jsxs)(u.O, {
                      onClick: () => L("APPLE_PAY"),
                      children: [
                        (0, e.jsx)(x, {
                          children: (0, e.jsx)(c.A, { width: 18, height: 18 }),
                        }),
                        (0, e.jsxs)(y, {
                          children: [
                            (0, e.jsx)(u.a, { children: "Apple Pay" }),
                            (0, e.jsx)(m, { children: "Less than 10 minutes" }),
                          ],
                        }),
                      ],
                    }),
                  r.startFiat &&
                    "GOOGLE_PAY" === $ &&
                    (0, e.jsxs)(u.O, {
                      onClick: () => L("GOOGLE_PAY"),
                      children: [
                        (0, e.jsx)(x, {
                          children: (0, e.jsx)(d.G, { width: 18, height: 18 }),
                        }),
                        (0, e.jsxs)(y, {
                          children: [
                            (0, e.jsx)(u.a, { children: "Google Pay" }),
                            (0, e.jsx)(m, { children: "Less than 10 minutes" }),
                          ],
                        }),
                      ],
                    }),
                  r.startFiat &&
                    (0, e.jsxs)(u.O, {
                      onClick: () => L("BANK"),
                      children: [
                        (0, e.jsx)(x, { children: (0, e.jsx)(i.f, {}) }),
                        (0, e.jsxs)(y, {
                          children: [
                            (0, e.jsx)(u.a, { children: "Bank account" }),
                            (0, e.jsx)(m, { children: "1–2 days" }),
                          ],
                        }),
                      ],
                    }),
                  r.startCrypto &&
                    (0, e.jsxs)(u.O, {
                      onClick: async () => {
                        w.current ||
                          ((w.current = !0), await r.startCrypto?.());
                      },
                      children: [
                        (0, e.jsx)(x, { children: (0, e.jsx)(a.f, {}) }),
                        (0, e.jsxs)(y, {
                          children: [
                            (0, e.jsx)(u.a, {
                              children: "Crypto wallet or exchange",
                            }),
                            (0, e.jsx)(m, { children: "Instant" }),
                          ],
                        }),
                      ],
                    }),
                ],
              })
            : (0, e.jsx)(f, { children: (0, e.jsx)(n.N, { size: "50px" }) }),
        });
      },
    },
    f = t.z.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  min-height: 8rem;
`,
    x = t.z.span`
  width: 2rem;
  height: 2rem;
  border-radius: var(--privy-border-radius-full);
  background-color: var(--privy-color-background-2);
  color: var(--privy-color-icon-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
`,
    y = t.z.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,
    m = t.z.span`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--privy-color-foreground-3);
`;
  r.s(["AddFundsSelectionScreen", 0, b, "default", 0, b]);
};
