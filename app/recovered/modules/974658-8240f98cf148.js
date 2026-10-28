// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(732486),
    n = t.i(445242),
    r = t.i(745018);
  t.i(12692);
  var s = t.i(398902),
    a = t.i(63289),
    i = t.i(910222),
    o = t.i(90832),
    c = t.i(655397),
    l = t.i(506486);
  let u = () => {
      let t = 10,
        e = setInterval(() => {
          (t -= 1) <= 0 && clearInterval(e);
        }, 1e3);
      return e;
    },
    d = ({ title: t, subtitle: n, testId: s }) => ({
      toastId: a.c.custom(
        () =>
          (0, e.jsx)(l.O, {
            tone: "neutral",
            testId: s,
            glyph: (0, e.jsx)(r.Wh, { className: "animate-spin" }),
            title: t,
            subtitle: n,
            durationMs: 1e4,
          }),
        { duration: 1e4 },
      ),
      interval: u(),
    }),
    m = (t) => {
      let r,
        a,
        i = (0, n.c)(6),
        { formattedAmount: o, symbol: c } = t,
        { t: l } = (0, s.f)();
      return (
        i[0] !== l
          ? ((r = l("web.toasts.withdrawing")), (i[0] = l), (i[1] = r))
          : (r = i[1]),
        i[2] !== o || i[3] !== c || i[4] !== r
          ? ((a = (0, e.jsxs)(e.Fragment, { children: [r, " ", o, " ", c] })),
            (i[2] = o),
            (i[3] = c),
            (i[4] = r),
            (i[5] = a))
          : (a = i[5]),
        a
      );
    },
    f = () => {
      let t,
        r,
        a = (0, n.c)(4),
        { t: i } = (0, s.f)();
      return (
        a[0] !== i
          ? ((t = i("web.toasts.confirming_transaction")),
            (a[0] = i),
            (a[1] = t))
          : (t = a[1]),
        a[2] !== t
          ? ((r = (0, e.jsx)(e.Fragment, { children: t })),
            (a[2] = t),
            (a[3] = r))
          : (r = a[3]),
        r
      );
    },
    h = (t) => {
      let r,
        a,
        i = (0, n.c)(5),
        { name: o } = t,
        { t: c } = (0, s.f)();
      return (
        i[0] !== c
          ? ((r = c("web.toasts.creating")), (i[0] = c), (i[1] = r))
          : (r = i[1]),
        i[2] !== o || i[3] !== r
          ? ((a = (0, e.jsxs)(e.Fragment, { children: [r, " ", o] })),
            (i[2] = o),
            (i[3] = r),
            (i[4] = a))
          : (a = i[4]),
        a
      );
    },
    g = (t) => {
      let r,
        a,
        o = (0, n.c)(12),
        { isBuy: c, tokenAmount: l, symbol: u, convert: d } = t,
        { t: m } = (0, s.f)();
      if (d) {
        let t, n;
        return (
          o[0] !== d || o[1] !== m
            ? ((t = (0, i.I)({ t: m, convert: d })),
              (o[0] = d),
              (o[1] = m),
              (o[2] = t))
            : (t = o[2]),
          o[3] !== t
            ? ((n = (0, e.jsx)(e.Fragment, { children: t })),
              (o[3] = t),
              (o[4] = n))
            : (n = o[4]),
          n
        );
      }
      return (
        o[5] !== c || o[6] !== m
          ? ((r = m(c ? "web.toasts.buying" : "web.toasts.selling")),
            (o[5] = c),
            (o[6] = m),
            (o[7] = r))
          : (r = o[7]),
        o[8] !== u || o[9] !== r || o[10] !== l
          ? ((a = (0, e.jsxs)(e.Fragment, { children: [r, " ", l, " ", u] })),
            (o[8] = u),
            (o[9] = r),
            (o[10] = l),
            (o[11] = a))
          : (a = o[11]),
        a
      );
    },
    b = ({
      type: t,
      tokenAmount: n,
      symbol: s,
      solUi: a,
      paymentLabel: i,
      convert: c,
    }) => {
      let u = s.replace(/^\$/, "");
      return (0, e.jsx)(l.O, {
        tone: "neutral",
        testId: "trade-loading-toast",
        glyph: (0, e.jsx)(r.Wh, { className: "animate-spin" }),
        title: (0, e.jsx)(g, {
          isBuy: "buy" === t,
          tokenAmount: n,
          symbol: u,
          convert: c,
        }),
        subtitle:
          i ?? (0, e.jsx)(l.H, { label: `${(0, o.m)(a)} SOL`, solUi: a }),
      });
    };
  t.s(
    [
      "b",
      0,
      (t, e, n, r, s, i) => (
        (0, l.$)(s),
        {
          toastId: a.c.custom(
            () =>
              b({
                type: "buy",
                tokenAmount: (0, o.p)(t),
                symbol: e,
                solUi: (0, c.h)(n),
                paymentLabel: r,
                convert: i,
              }),
            { duration: 1 / 0 },
          ),
          interval: u(),
        }
      ),
      "E",
      0,
      (t, n) =>
        d({
          testId: "coin-creation-loading-toast",
          title: (0, e.jsx)(h, { name: t }),
          subtitle: (0, e.jsxs)(e.Fragment, { children: ["[", n, "]"] }),
        }),
      "D",
      0,
      (t, e, n, r, s, i) => (
        (0, l.$)(s),
        {
          toastId: a.c.custom(
            () =>
              b({
                type: "sell",
                tokenAmount: (0, o.p)(t),
                symbol: e,
                solUi: (0, c.h)(n),
                paymentLabel: r,
                convert: i,
              }),
            { duration: 1 / 0 },
          ),
          interval: u(),
        }
      ),
      "u",
      0,
      (t, n) => {
        let r = "string" == typeof t ? t : (0, o.p)(t),
          s = n.replace(/^\$/, "");
        return d({
          testId: "withdrawal-loading-toast",
          title: (0, e.jsx)(m, { formattedAmount: r, symbol: s }),
          subtitle: (0, e.jsx)(f, {}),
        });
      },
    ],
    974658,
  );
  var p = t.i(914139),
    w = t.i(292686),
    y = t.i(984066);
  let _ = { mine: w.k9.TRADE_SUCCESS, other: w.k9.TRADE_SUCCESS };
  function x(t) {
    let a,
      i,
      o,
      c,
      u = (0, n.c)(10),
      { coin: d, holderAddress: m, onActed: f } = t,
      { t: h } = (0, s.f)();
    u[0] !== d || u[1] !== m || u[2] !== f
      ? ((a = (t) => {
          (t.stopPropagation(),
            (0, y.X)({
              kind: "position",
              coin: d,
              holderAddress: m,
              sourceElement: _,
            }),
            f?.());
        }),
        (u[0] = d),
        (u[1] = m),
        (u[2] = f),
        (u[3] = a))
      : (a = u[3]);
    let g = a;
    return (
      u[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, e.jsx)(r.AS, { size: 12 })), (u[4] = i))
        : (i = u[4]),
      u[5] !== h
        ? ((o = h("common.share")), (u[5] = h), (u[6] = o))
        : (o = u[6]),
      u[7] !== g || u[8] !== o
        ? ((c = (0, e.jsxs)("button", {
            type: "button",
            onClick: g,
            "data-testid": "trade-share-toast-action",
            className: l.t,
            children: [i, o],
          })),
          (u[7] = g),
          (u[8] = o),
          (u[9] = c))
        : (c = u[9]),
      c
    );
  }
  var v = t.i(595673);
  function j({
    message: t,
    description: n,
    signature: s,
    id: i,
    chainId: o,
    mint: c,
    coin: u,
  }) {
    a.c.custom(
      (i) =>
        (0, e.jsx)(l.X, {
          render: (d) =>
            (0, e.jsx)(l.O, {
              tone: "loss",
              mint: c,
              coin: u,
              testId: "trade-error-toast",
              ariaLabel: d("web.toasts.trade_failed_aria"),
              onDismiss: () => a.c.dismiss(i),
              glyph: (0, e.jsx)(r.ck, {}),
              title: t,
              subtitle: n,
              subtitleLines: 2,
              durationMs: 6e3,
              action: s ? (0, e.jsx)(l.v, { signature: s, chainId: o }) : null,
            }),
        }),
      i ? { id: i, duration: 6e3 } : { duration: 6e3 },
    );
  }
  function k({
    signature: t,
    message: e,
    description: n,
    id: r,
    chainId: s,
    mint: a,
    coin: i,
  }) {
    j({
      message: e,
      description: n,
      signature: t,
      id: r,
      chainId: s,
      mint: a,
      coin: i,
    });
  }
  function $({
    signature: t,
    toastId: n,
    mint: s,
    coin: o,
    side: c,
    symbol: u,
    convert: d,
  }) {
    a.c.custom(
      (n) =>
        (0, e.jsx)(l.X, {
          render: (m) => {
            let f = (function ({ t, side: e, symbol: n, convert: r }) {
              return r
                ? (0, i.N)({ t, convert: r })
                : e && n
                  ? (0, i.J)({ t, side: e, symbol: n })
                  : {
                      message: t("web.toasts.trade_submitted"),
                      description: t("web.toasts.trade_still_confirming"),
                    };
            })({ t: m, side: c, symbol: u, convert: d });
            return (0, e.jsx)(l.O, {
              tone: "neutral",
              mint: s,
              coin: o,
              testId: "trade-pending-toast",
              ariaLabel: m("web.toasts.trade_confirming_aria"),
              onDismiss: () => a.c.dismiss(n),
              glyph: (0, e.jsx)(r.Wh, { className: "animate-spin" }),
              title: f.message,
              subtitle: f.description,
              subtitleLines: 2,
              action: (0, e.jsx)(l.v, { signature: t }),
            });
          },
        }),
      n ? { id: n, duration: 1 / 0 } : { duration: 1 / 0 },
    );
  }
  async function S({
    type: t,
    amount: n,
    symbol: s,
    solAmount: u,
    signature: d,
    interval: m,
    toastId: f,
    mint: h,
    coin: g,
    confirmTxPromise: b,
    onShowToastSuccess: w = () => {},
    onShowToastError: y = () => {},
    showOpenCoin: _ = !1,
    buyCalloutCta: j,
    shareCta: T,
    paymentLabel: E,
    convert: I,
  }) {
    (0, l.$)(g);
    let A = setTimeout(() => {
      (m && clearInterval(m),
        $({
          signature: d,
          toastId: f,
          mint: h,
          coin: g,
          side: t,
          symbol: s,
          convert: I,
        }));
    }, 3e4);
    try {
      (await b, clearTimeout(A), m && clearInterval(m), f && a.c.dismiss(f));
      try {
        w();
      } catch {}
      let y = (0, o.p)(n),
        k = (0, c.h)(u),
        $ = (0, o.m)(k),
        S = "buy" === t;
      a.c.custom(
        (n) =>
          (0, e.jsx)(l.X, {
            render: (o) => {
              let c, u, m, f, b;
              return (0, e.jsx)(l.O, {
                tone: (0, l.R)(t),
                side: t,
                mint: h,
                coin: g,
                testId: "trade-success-toast",
                ariaLabel: o("web.toasts.trade_confirmed_aria"),
                actionBelow: _,
                onDismiss: () => a.c.dismiss(n),
                glyph: (0, e.jsx)(r.y$, {}),
                title: I
                  ? (0, i.b)({ t: o, convert: I })
                  : (0, i.o)({ t: o, side: t, amount: y, symbol: s }),
                subtitle: E ?? (0, e.jsx)(l.H, { label: `${$} SOL`, solUi: k }),
                durationMs: 6e3,
                action:
                  ((c =
                    S && j
                      ? (0, e.jsx)(p.f, { ...j, onActed: () => a.c.dismiss(n) })
                      : null),
                  (u = T
                    ? (0, e.jsx)(x, { ...T, onActed: () => a.c.dismiss(n) })
                    : null),
                  (f =
                    null !==
                      (m = _
                        ? (0, e.jsx)(l.m, {
                            href: `/coin/${h}`,
                            target: "_self",
                            variant: c ? "default" : "primary",
                            onClick: () => (0, v.Te)(h),
                            children: (0, e.jsx)(l.X, {
                              render: (t) =>
                                (0, e.jsx)(e.Fragment, {
                                  children: t("web.toasts.open_coin"),
                                }),
                            }),
                          })
                        : null) || null !== u),
                  (b = c ?? (0, e.jsx)(l.v, { signature: d, compact: f })),
                  f ? (0, e.jsxs)(e.Fragment, { children: [m, u, b] }) : b),
              });
            },
          }),
        { duration: 6e3 },
      );
    } catch (o) {
      (clearTimeout(A), m && clearInterval(m));
      let n = (0, e.jsx)(l.X, {
          render: (n) =>
            (0, e.jsx)(e.Fragment, {
              children: (I
                ? (0, i.V)({ t: n, convert: I })
                : (0, i.D)({ t: n, side: t, symbol: s })
              ).message,
            }),
        }),
        r =
          o instanceof Error
            ? o.message
            : (0, e.jsx)(l.X, {
                render: (t) =>
                  (0, e.jsx)(e.Fragment, {
                    children: t("web.toasts.unknown_error"),
                  }),
              });
      try {
        y(o);
      } catch {}
      (f && a.c.dismiss(f),
        k({ signature: d, message: n, description: r, mint: h, coin: g }));
    }
  }
  async function T({
    withdrawAmount: t,
    withdrawSymbol: n,
    signature: s,
    chainId: i,
    interval: c,
    toastId: u,
    confirmTxPromise: d,
    onShowToastSuccess: m = () => {},
    onShowToastError: f = () => {},
  }) {
    try {
      (await d, clearInterval(c), m());
      let f = "string" == typeof t ? t : (0, o.p)(t),
        h = n.replace(/^\$/, "");
      (a.c.dismiss(u),
        a.c.custom(
          (t) =>
            (0, e.jsx)(l.X, {
              render: (n) =>
                (0, e.jsx)(l.O, {
                  tone: "gain",
                  testId: "withdrawal-success-toast",
                  ariaLabel: n("web.toasts.withdrawal_confirmed_aria"),
                  onDismiss: () => a.c.dismiss(t),
                  glyph: (0, e.jsx)(r.y$, {}),
                  title: `${n("web.toasts.sent")} ${f} ${h}`,
                  subtitle: n("web.toasts.transaction_confirmed"),
                  durationMs: 6e3,
                  action: (0, e.jsx)(l.v, { signature: s, chainId: i }),
                }),
            }),
          { duration: 6e3 },
        ));
    } catch (t) {
      (clearInterval(c),
        f(t),
        a.c.dismiss(u),
        k({
          signature: s,
          message: (0, e.jsx)(l.X, {
            render: (t) =>
              (0, e.jsx)(e.Fragment, {
                children: t("web.toasts.could_not_send_funds"),
              }),
          }),
          description:
            t instanceof Error
              ? t.message
              : (0, e.jsx)(l.X, {
                  render: (t) =>
                    (0, e.jsx)(e.Fragment, {
                      children: t("web.toasts.unknown_error"),
                    }),
                }),
          chainId: i,
        }));
    }
  }
  async function E(t, n, s, i, o, c, u, d) {
    try {
      (await u, clearInterval(o));
      let m = d
        ? `/coin/${t.toBase58()}?tokenizedAgentOnboarding=true`
        : `/coin/${t.toBase58()}`;
      (a.c.dismiss(c),
        a.c.custom(
          (o) =>
            (0, e.jsx)(l.X, {
              render: (c) =>
                (0, e.jsx)(l.O, {
                  tone: "gain",
                  mint: t.toBase58(),
                  testId: "coin-creation-success-toast",
                  ariaLabel: c("web.toasts.coin_created_aria"),
                  onDismiss: () => a.c.dismiss(o),
                  glyph: (0, e.jsx)(r.y$, {}),
                  title: `${c("web.toasts.created")} ${n}`,
                  subtitle: `[${s}]`,
                  durationMs: 6e3,
                  action: (0, e.jsxs)(e.Fragment, {
                    children: [
                      (0, e.jsx)(l.v, { signature: i, compact: !0 }),
                      (0, e.jsx)(l.m, {
                        href: m,
                        target: "_self",
                        variant: "primary",
                        children: c("web.coin.view_coin"),
                      }),
                    ],
                  }),
                }),
            }),
          { duration: 6e3 },
        ));
    } catch (n) {
      (clearInterval(o),
        a.c.dismiss(c),
        k({
          signature: i,
          message: (0, e.jsx)(l.X, {
            render: (t) =>
              (0, e.jsx)(e.Fragment, {
                children: t("web.toasts.could_not_create_coin"),
              }),
          }),
          description:
            n instanceof Error
              ? n.message
              : (0, e.jsx)(l.X, {
                  render: (t) =>
                    (0, e.jsx)(e.Fragment, {
                      children: t("web.toasts.unknown_error"),
                    }),
                }),
          mint: t.toBase58(),
        }));
    }
  }
  t.s(["a", 0, E, "J", 0, j, "j", 0, $, "Q", 0, S, "H", 0, T], 240763);
};
