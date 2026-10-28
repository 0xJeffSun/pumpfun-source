// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var s = e.i(398902),
    a = e.i(63289),
    i = e.i(910222),
    o = e.i(90832),
    l = e.i(655397),
    c = e.i(506486);
  let u = () => {
      let e = 10,
        t = setInterval(() => {
          (e -= 1) <= 0 && clearInterval(t);
        }, 1e3);
      return t;
    },
    d = ({ title: e, subtitle: n, testId: s }) => ({
      toastId: a.c.custom(
        () =>
          (0, t.jsx)(c.O, {
            tone: "neutral",
            testId: s,
            glyph: (0, t.jsx)(r.Wh, { className: "animate-spin" }),
            title: e,
            subtitle: n,
            durationMs: 1e4,
          }),
        { duration: 1e4 },
      ),
      interval: u(),
    }),
    m = (e) => {
      let r,
        a,
        i = (0, n.c)(6),
        { formattedAmount: o, symbol: l } = e,
        { t: c } = (0, s.f)();
      return (
        i[0] !== c
          ? ((r = c("web.toasts.withdrawing")), (i[0] = c), (i[1] = r))
          : (r = i[1]),
        i[2] !== o || i[3] !== l || i[4] !== r
          ? ((a = (0, t.jsxs)(t.Fragment, { children: [r, " ", o, " ", l] })),
            (i[2] = o),
            (i[3] = l),
            (i[4] = r),
            (i[5] = a))
          : (a = i[5]),
        a
      );
    },
    g = () => {
      let e,
        r,
        a = (0, n.c)(4),
        { t: i } = (0, s.f)();
      return (
        a[0] !== i
          ? ((e = i("web.toasts.confirming_transaction")),
            (a[0] = i),
            (a[1] = e))
          : (e = a[1]),
        a[2] !== e
          ? ((r = (0, t.jsx)(t.Fragment, { children: e })),
            (a[2] = e),
            (a[3] = r))
          : (r = a[3]),
        r
      );
    },
    p = (e) => {
      let r,
        a,
        i = (0, n.c)(5),
        { name: o } = e,
        { t: l } = (0, s.f)();
      return (
        i[0] !== l
          ? ((r = l("web.toasts.creating")), (i[0] = l), (i[1] = r))
          : (r = i[1]),
        i[2] !== o || i[3] !== r
          ? ((a = (0, t.jsxs)(t.Fragment, { children: [r, " ", o] })),
            (i[2] = o),
            (i[3] = r),
            (i[4] = a))
          : (a = i[4]),
        a
      );
    },
    f = (e) => {
      let r,
        a,
        o = (0, n.c)(12),
        { isBuy: l, tokenAmount: c, symbol: u, convert: d } = e,
        { t: m } = (0, s.f)();
      if (d) {
        let e, n;
        return (
          o[0] !== d || o[1] !== m
            ? ((e = (0, i.I)({ t: m, convert: d })),
              (o[0] = d),
              (o[1] = m),
              (o[2] = e))
            : (e = o[2]),
          o[3] !== e
            ? ((n = (0, t.jsx)(t.Fragment, { children: e })),
              (o[3] = e),
              (o[4] = n))
            : (n = o[4]),
          n
        );
      }
      return (
        o[5] !== l || o[6] !== m
          ? ((r = m(l ? "web.toasts.buying" : "web.toasts.selling")),
            (o[5] = l),
            (o[6] = m),
            (o[7] = r))
          : (r = o[7]),
        o[8] !== u || o[9] !== r || o[10] !== c
          ? ((a = (0, t.jsxs)(t.Fragment, { children: [r, " ", c, " ", u] })),
            (o[8] = u),
            (o[9] = r),
            (o[10] = c),
            (o[11] = a))
          : (a = o[11]),
        a
      );
    },
    h = ({
      type: e,
      tokenAmount: n,
      symbol: s,
      solUi: a,
      paymentLabel: i,
      convert: l,
    }) => {
      let u = s.replace(/^\$/, "");
      return (0, t.jsx)(c.O, {
        tone: "neutral",
        testId: "trade-loading-toast",
        glyph: (0, t.jsx)(r.Wh, { className: "animate-spin" }),
        title: (0, t.jsx)(f, {
          isBuy: "buy" === e,
          tokenAmount: n,
          symbol: u,
          convert: l,
        }),
        subtitle:
          i ?? (0, t.jsx)(c.H, { label: `${(0, o.m)(a)} SOL`, solUi: a }),
      });
    };
  e.s(
    [
      "b",
      0,
      (e, t, n, r, s, i) => (
        (0, c.$)(s),
        {
          toastId: a.c.custom(
            () =>
              h({
                type: "buy",
                tokenAmount: (0, o.p)(e),
                symbol: t,
                solUi: (0, l.h)(n),
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
      (e, n) =>
        d({
          testId: "coin-creation-loading-toast",
          title: (0, t.jsx)(p, { name: e }),
          subtitle: (0, t.jsxs)(t.Fragment, { children: ["[", n, "]"] }),
        }),
      "D",
      0,
      (e, t, n, r, s, i) => (
        (0, c.$)(s),
        {
          toastId: a.c.custom(
            () =>
              h({
                type: "sell",
                tokenAmount: (0, o.p)(e),
                symbol: t,
                solUi: (0, l.h)(n),
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
      (e, n) => {
        let r = "string" == typeof e ? e : (0, o.p)(e),
          s = n.replace(/^\$/, "");
        return d({
          testId: "withdrawal-loading-toast",
          title: (0, t.jsx)(m, { formattedAmount: r, symbol: s }),
          subtitle: (0, t.jsx)(g, {}),
        });
      },
    ],
    974658,
  );
  var b = e.i(914139),
    _ = e.i(292686),
    y = e.i(984066);
  let w = { mine: _.k9.TRADE_SUCCESS, other: _.k9.TRADE_SUCCESS };
  function v(e) {
    let a,
      i,
      o,
      l,
      u = (0, n.c)(10),
      { coin: d, holderAddress: m, onActed: g } = e,
      { t: p } = (0, s.f)();
    u[0] !== d || u[1] !== m || u[2] !== g
      ? ((a = (e) => {
          (e.stopPropagation(),
            (0, y.X)({
              kind: "position",
              coin: d,
              holderAddress: m,
              sourceElement: w,
            }),
            g?.());
        }),
        (u[0] = d),
        (u[1] = m),
        (u[2] = g),
        (u[3] = a))
      : (a = u[3]);
    let f = a;
    return (
      u[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(r.AS, { size: 12 })), (u[4] = i))
        : (i = u[4]),
      u[5] !== p
        ? ((o = p("common.share")), (u[5] = p), (u[6] = o))
        : (o = u[6]),
      u[7] !== f || u[8] !== o
        ? ((l = (0, t.jsxs)("button", {
            type: "button",
            onClick: f,
            "data-testid": "trade-share-toast-action",
            className: c.t,
            children: [i, o],
          })),
          (u[7] = f),
          (u[8] = o),
          (u[9] = l))
        : (l = u[9]),
      l
    );
  }
  var j = e.i(595673);
  function x({
    message: e,
    description: n,
    signature: s,
    id: i,
    chainId: o,
    mint: l,
    coin: u,
  }) {
    a.c.custom(
      (i) =>
        (0, t.jsx)(c.X, {
          render: (d) =>
            (0, t.jsx)(c.O, {
              tone: "loss",
              mint: l,
              coin: u,
              testId: "trade-error-toast",
              ariaLabel: d("web.toasts.trade_failed_aria"),
              onDismiss: () => a.c.dismiss(i),
              glyph: (0, t.jsx)(r.ck, {}),
              title: e,
              subtitle: n,
              subtitleLines: 2,
              durationMs: 6e3,
              action: s ? (0, t.jsx)(c.v, { signature: s, chainId: o }) : null,
            }),
        }),
      i ? { id: i, duration: 6e3 } : { duration: 6e3 },
    );
  }
  function k({
    signature: e,
    message: t,
    description: n,
    id: r,
    chainId: s,
    mint: a,
    coin: i,
  }) {
    x({
      message: t,
      description: n,
      signature: e,
      id: r,
      chainId: s,
      mint: a,
      coin: i,
    });
  }
  function S({
    signature: e,
    toastId: n,
    mint: s,
    coin: o,
    side: l,
    symbol: u,
    convert: d,
  }) {
    a.c.custom(
      (n) =>
        (0, t.jsx)(c.X, {
          render: (m) => {
            let g = (function ({ t: e, side: t, symbol: n, convert: r }) {
              return r
                ? (0, i.N)({ t: e, convert: r })
                : t && n
                  ? (0, i.J)({ t: e, side: t, symbol: n })
                  : {
                      message: e("web.toasts.trade_submitted"),
                      description: e("web.toasts.trade_still_confirming"),
                    };
            })({ t: m, side: l, symbol: u, convert: d });
            return (0, t.jsx)(c.O, {
              tone: "neutral",
              mint: s,
              coin: o,
              testId: "trade-pending-toast",
              ariaLabel: m("web.toasts.trade_confirming_aria"),
              onDismiss: () => a.c.dismiss(n),
              glyph: (0, t.jsx)(r.Wh, { className: "animate-spin" }),
              title: g.message,
              subtitle: g.description,
              subtitleLines: 2,
              action: (0, t.jsx)(c.v, { signature: e }),
            });
          },
        }),
      n ? { id: n, duration: 1 / 0 } : { duration: 1 / 0 },
    );
  }
  async function $({
    type: e,
    amount: n,
    symbol: s,
    solAmount: u,
    signature: d,
    interval: m,
    toastId: g,
    mint: p,
    coin: f,
    confirmTxPromise: h,
    onShowToastSuccess: _ = () => {},
    onShowToastError: y = () => {},
    showOpenCoin: w = !1,
    buyCalloutCta: x,
    shareCta: A,
    paymentLabel: z,
    convert: I,
  }) {
    (0, c.$)(f);
    let T = setTimeout(() => {
      (m && clearInterval(m),
        S({
          signature: d,
          toastId: g,
          mint: p,
          coin: f,
          side: e,
          symbol: s,
          convert: I,
        }));
    }, 3e4);
    try {
      (await h, clearTimeout(T), m && clearInterval(m), g && a.c.dismiss(g));
      try {
        _();
      } catch {}
      let y = (0, o.p)(n),
        k = (0, l.h)(u),
        S = (0, o.m)(k),
        $ = "buy" === e;
      a.c.custom(
        (n) =>
          (0, t.jsx)(c.X, {
            render: (o) => {
              let l, u, m, g, h;
              return (0, t.jsx)(c.O, {
                tone: (0, c.R)(e),
                side: e,
                mint: p,
                coin: f,
                testId: "trade-success-toast",
                ariaLabel: o("web.toasts.trade_confirmed_aria"),
                actionBelow: w,
                onDismiss: () => a.c.dismiss(n),
                glyph: (0, t.jsx)(r.y$, {}),
                title: I
                  ? (0, i.b)({ t: o, convert: I })
                  : (0, i.o)({ t: o, side: e, amount: y, symbol: s }),
                subtitle: z ?? (0, t.jsx)(c.H, { label: `${S} SOL`, solUi: k }),
                durationMs: 6e3,
                action:
                  ((l =
                    $ && x
                      ? (0, t.jsx)(b.f, { ...x, onActed: () => a.c.dismiss(n) })
                      : null),
                  (u = A
                    ? (0, t.jsx)(v, { ...A, onActed: () => a.c.dismiss(n) })
                    : null),
                  (g =
                    null !==
                      (m = w
                        ? (0, t.jsx)(c.m, {
                            href: `/coin/${p}`,
                            target: "_self",
                            variant: l ? "default" : "primary",
                            onClick: () => (0, j.Te)(p),
                            children: (0, t.jsx)(c.X, {
                              render: (e) =>
                                (0, t.jsx)(t.Fragment, {
                                  children: e("web.toasts.open_coin"),
                                }),
                            }),
                          })
                        : null) || null !== u),
                  (h = l ?? (0, t.jsx)(c.v, { signature: d, compact: g })),
                  g ? (0, t.jsxs)(t.Fragment, { children: [m, u, h] }) : h),
              });
            },
          }),
        { duration: 6e3 },
      );
    } catch (o) {
      (clearTimeout(T), m && clearInterval(m));
      let n = (0, t.jsx)(c.X, {
          render: (n) =>
            (0, t.jsx)(t.Fragment, {
              children: (I
                ? (0, i.V)({ t: n, convert: I })
                : (0, i.D)({ t: n, side: e, symbol: s })
              ).message,
            }),
        }),
        r =
          o instanceof Error
            ? o.message
            : (0, t.jsx)(c.X, {
                render: (e) =>
                  (0, t.jsx)(t.Fragment, {
                    children: e("web.toasts.unknown_error"),
                  }),
              });
      try {
        y(o);
      } catch {}
      (g && a.c.dismiss(g),
        k({ signature: d, message: n, description: r, mint: p, coin: f }));
    }
  }
  async function A({
    withdrawAmount: e,
    withdrawSymbol: n,
    signature: s,
    chainId: i,
    interval: l,
    toastId: u,
    confirmTxPromise: d,
    onShowToastSuccess: m = () => {},
    onShowToastError: g = () => {},
  }) {
    try {
      (await d, clearInterval(l), m());
      let g = "string" == typeof e ? e : (0, o.p)(e),
        p = n.replace(/^\$/, "");
      (a.c.dismiss(u),
        a.c.custom(
          (e) =>
            (0, t.jsx)(c.X, {
              render: (n) =>
                (0, t.jsx)(c.O, {
                  tone: "gain",
                  testId: "withdrawal-success-toast",
                  ariaLabel: n("web.toasts.withdrawal_confirmed_aria"),
                  onDismiss: () => a.c.dismiss(e),
                  glyph: (0, t.jsx)(r.y$, {}),
                  title: `${n("web.toasts.sent")} ${g} ${p}`,
                  subtitle: n("web.toasts.transaction_confirmed"),
                  durationMs: 6e3,
                  action: (0, t.jsx)(c.v, { signature: s, chainId: i }),
                }),
            }),
          { duration: 6e3 },
        ));
    } catch (e) {
      (clearInterval(l),
        g(e),
        a.c.dismiss(u),
        k({
          signature: s,
          message: (0, t.jsx)(c.X, {
            render: (e) =>
              (0, t.jsx)(t.Fragment, {
                children: e("web.toasts.could_not_send_funds"),
              }),
          }),
          description:
            e instanceof Error
              ? e.message
              : (0, t.jsx)(c.X, {
                  render: (e) =>
                    (0, t.jsx)(t.Fragment, {
                      children: e("web.toasts.unknown_error"),
                    }),
                }),
          chainId: i,
        }));
    }
  }
  async function z(e, n, s, i, o, l, u, d) {
    try {
      (await u, clearInterval(o));
      let m = d
        ? `/coin/${e.toBase58()}?tokenizedAgentOnboarding=true`
        : `/coin/${e.toBase58()}`;
      (a.c.dismiss(l),
        a.c.custom(
          (o) =>
            (0, t.jsx)(c.X, {
              render: (l) =>
                (0, t.jsx)(c.O, {
                  tone: "gain",
                  mint: e.toBase58(),
                  testId: "coin-creation-success-toast",
                  ariaLabel: l("web.toasts.coin_created_aria"),
                  onDismiss: () => a.c.dismiss(o),
                  glyph: (0, t.jsx)(r.y$, {}),
                  title: `${l("web.toasts.created")} ${n}`,
                  subtitle: `[${s}]`,
                  durationMs: 6e3,
                  action: (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(c.v, { signature: i, compact: !0 }),
                      (0, t.jsx)(c.m, {
                        href: m,
                        target: "_self",
                        variant: "primary",
                        children: l("web.coin.view_coin"),
                      }),
                    ],
                  }),
                }),
            }),
          { duration: 6e3 },
        ));
    } catch (n) {
      (clearInterval(o),
        a.c.dismiss(l),
        k({
          signature: i,
          message: (0, t.jsx)(c.X, {
            render: (e) =>
              (0, t.jsx)(t.Fragment, {
                children: e("web.toasts.could_not_create_coin"),
              }),
          }),
          description:
            n instanceof Error
              ? n.message
              : (0, t.jsx)(c.X, {
                  render: (e) =>
                    (0, t.jsx)(t.Fragment, {
                      children: e("web.toasts.unknown_error"),
                    }),
                }),
          mint: e.toBase58(),
        }));
    }
  }
  e.s(["a", 0, z, "J", 0, x, "j", 0, S, "Q", 0, $, "H", 0, A], 240763);
};
