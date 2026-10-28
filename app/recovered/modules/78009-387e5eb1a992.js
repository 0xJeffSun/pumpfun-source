// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(745018),
    a = e.i(424509),
    s = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    r = e.i(63289),
    l = e.i(914139),
    u = e.i(595673),
    m = e.i(90832),
    c = e.i(655397),
    d = e.i(506486);
  let p = 0,
    y = (e) => "confirmed" === e || "failed" === e || "cancelled" === e;
  function g(e) {
    let i,
      a,
      s,
      r = (0, n.c)(7),
      { onCancel: l } = e,
      { t: u } = (0, o.f)();
    return (
      r[0] !== l
        ? ((i = (e) => {
            (e.stopPropagation(), l());
          }),
          (r[0] = l),
          (r[1] = i))
        : (i = r[1]),
      r[2] !== u
        ? ((a = u("common.cancel")), (r[2] = u), (r[3] = a))
        : (a = r[3]),
      r[4] !== i || r[5] !== a
        ? ((s = (0, t.jsx)("button", {
            type: "button",
            onClick: i,
            className: d.t,
            children: a,
          })),
          (r[4] = i),
          (r[5] = a),
          (r[6] = s))
        : (s = r[6]),
      s
    );
  }
  function b(e) {
    let p,
      y,
      b,
      f,
      w,
      _,
      k,
      v,
      A,
      h = (0, n.c)(46),
      { controller: S, mint: B, showOpenCoin: T, buyCalloutCta: C } = e,
      { t: q } = (0, o.f)(),
      D = (0, s.useSyncExternalStore)(
        S.subscribe,
        S.getSnapshot,
        S.getSnapshot,
      ),
      M = "failed" === D.status,
      P = "confirmed" === D.status,
      x =
        "queued" === D.status ||
        "signing" === D.status ||
        "submitted" === D.status;
    h[0] !== P || h[1] !== M || h[2] !== D.type
      ? ((p = M ? "loss" : P ? (0, d.R)(D.type) : "neutral"),
        (h[0] = P),
        (h[1] = M),
        (h[2] = D.type),
        (h[3] = p))
      : (p = h[3]);
    let E = p;
    h[4] !== P || h[5] !== M || h[6] !== x
      ? ((y = x
          ? (0, t.jsx)(i.Wh, { className: "animate-spin" })
          : P
            ? (0, t.jsx)(i.y$, {})
            : M
              ? (0, t.jsx)(i.ck, {})
              : (0, t.jsx)(i.Zc, {})),
        (h[4] = P),
        (h[5] = M),
        (h[6] = x),
        (h[7] = y))
      : (y = h[7]);
    let I = y,
      U = void 0 !== T && T && !!B && !!D.signature;
    h[8] !== C || h[9] !== S.id || h[10] !== P || h[11] !== D.type
      ? ((b =
          P && "buy" === D.type && C
            ? (0, t.jsx)(l.f, { ...C, onActed: () => r.c.dismiss(S.id) })
            : null),
        (h[8] = C),
        (h[9] = S.id),
        (h[10] = P),
        (h[11] = D.type),
        (h[12] = b))
      : (b = h[12]);
    let N = b;
    h[13] !== N ||
    h[14] !== U ||
    h[15] !== S.requestCancel ||
    h[16] !== B ||
    h[17] !== D.signature ||
    h[18] !== D.status ||
    h[19] !== q
      ? ((f =
          "queued" === D.status
            ? (0, t.jsx)(g, { onCancel: S.requestCancel })
            : N
              ? U
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(d.m, {
                        href: `/coin/${B}`,
                        target: "_self",
                        onClick: () => (0, u.Te)(B),
                        children: q("web.toasts.open_coin"),
                      }),
                      N,
                    ],
                  })
                : N
              : U
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(d.m, {
                        href: `/coin/${B}`,
                        target: "_self",
                        variant: "primary",
                        onClick: () => (0, u.Te)(B),
                        children: q("web.toasts.open_coin"),
                      }),
                      (0, t.jsx)(d.v, { signature: D.signature, compact: !0 }),
                    ],
                  })
                : D.signature
                  ? (0, t.jsx)(d.v, { signature: D.signature })
                  : null),
        (h[13] = N),
        (h[14] = U),
        (h[15] = S.requestCancel),
        (h[16] = B),
        (h[17] = D.signature),
        (h[18] = D.status),
        (h[19] = q),
        (h[20] = f))
      : (f = h[20]);
    let R = f,
      O = !x,
      j = P ? D.type : void 0;
    if (
      (h[21] !== O || h[22] !== q
        ? ((w = O ? q("web.toasts.dismiss_trade_aria") : void 0),
          (h[21] = O),
          (h[22] = q),
          (h[23] = w))
        : (w = h[23]),
      h[24] !== S.id || h[25] !== O
        ? ((_ = O ? () => r.c.dismiss(S.id) : void 0),
          (h[24] = S.id),
          (h[25] = O),
          (h[26] = _))
        : (_ = h[26]),
      h[27] !== D || h[28] !== q)
    ) {
      let e, t, n;
      ((e = D.symbol.replace(/^\$/, "")),
        (t = q(
          "confirmed" === D.status
            ? "buy" === D.type
              ? "web.toasts.bought"
              : "web.toasts.sold"
            : "buy" === D.type
              ? "web.toasts.buying"
              : "web.toasts.selling",
        )),
        (n = D.tokenAmount > 0 ? `${(0, m.p)(D.tokenAmount)} ${e}` : e),
        (k = `${t} ${n}`),
        (h[27] = D),
        (h[28] = q),
        (h[29] = k));
    } else k = h[29];
    h[30] !== D || h[31] !== q
      ? ((v = (function (e, n) {
          let i = e.solAmount.gt(new a.default(0))
              ? (0, c.h)(e.solAmount)
              : void 0,
            s = null != i ? `${(0, m.m)(i)} SOL` : void 0;
          switch (e.status) {
            case "queued":
              return s
                ? n("web.toasts.queued_with_amount", { amount: s })
                : n("web.toasts.queued");
            case "signing":
              return s
                ? n("web.toasts.approving_with_amount", { amount: s })
                : n("web.toasts.approving");
            case "submitted":
              return s
                ? n("web.toasts.confirming_with_amount", { amount: s })
                : n("web.toasts.confirming");
            case "confirmed":
              if (!s) return;
              return (0, t.jsx)(d.H, { label: s, solUi: i });
            case "failed":
              return (
                e.errorMessage ??
                n("notifications.toast.trade.transaction_failed")
              );
            case "cancelled":
              return n("web.toasts.cancelled_before_send");
            default:
              return s;
          }
        })(D, q)),
        (h[30] = D),
        (h[31] = q),
        (h[32] = v))
      : (v = h[32]);
    let F = M ? 2 : 1,
      L = S.isTerminal() ? 6e3 : void 0;
    return (
      h[33] !== R ||
      h[34] !== U ||
      h[35] !== I ||
      h[36] !== B ||
      h[37] !== v ||
      h[38] !== F ||
      h[39] !== L ||
      h[40] !== j ||
      h[41] !== w ||
      h[42] !== _ ||
      h[43] !== k ||
      h[44] !== E
        ? ((A = (0, t.jsx)(d.O, {
            tone: E,
            side: j,
            mint: B,
            testId: "spam-trade-toast",
            actionBelow: U,
            ariaLabel: w,
            onDismiss: _,
            glyph: I,
            title: k,
            subtitle: v,
            subtitleLines: F,
            durationMs: L,
            action: R,
          })),
          (h[33] = R),
          (h[34] = U),
          (h[35] = I),
          (h[36] = B),
          (h[37] = v),
          (h[38] = F),
          (h[39] = L),
          (h[40] = j),
          (h[41] = w),
          (h[42] = _),
          (h[43] = k),
          (h[44] = E),
          (h[45] = A))
        : (A = h[45]),
      A
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          i,
          a,
          s,
          o,
          l,
          { mint: u, showOpenCoin: m, buyCalloutCta: c, ...d } = e,
          g =
            ((i = `spam-trade-${p++}`),
            (a = new Set()),
            (s = {
              status: "queued",
              type: d.type,
              symbol: d.symbol,
              tokenAmount: d.tokenAmount,
              solAmount: d.solAmount,
            }),
            (o = (e) => {
              for (let t of ((s = { ...s, ...e }), a)) t();
              y(s.status) && !n && (n = setTimeout(() => r.c.dismiss(i), 6e3));
            }),
            (l = (e, t) => {
              y(s.status) || o({ status: e, ...t });
            }),
            {
              id: i,
              subscribe: (e) => (
                a.add(e),
                () => {
                  a.delete(e);
                }
              ),
              getSnapshot: () => s,
              isCancelled: () => "cancelled" === s.status,
              isTerminal: () => y(s.status),
              updateAmounts: ({ tokenAmount: e, solAmount: t }) => {
                y(s.status) || o({ tokenAmount: e, solAmount: t });
              },
              markSigning: () => l("signing"),
              markSubmitted: (e) => l("submitted", { signature: e }),
              markConfirmed: () => l("confirmed"),
              markFailed: (e) => l("failed", { errorMessage: e }),
              markCancelled: () => l("cancelled"),
              requestCancel: () => {
                "queued" === s.status && (d.onCancel?.(), l("cancelled"));
              },
            });
        return (
          r.c.custom(
            () =>
              (0, t.jsx)(b, {
                controller: g,
                mint: u,
                showOpenCoin: m,
                buyCalloutCta: c,
              }),
            { id: g.id, duration: 1 / 0 },
          ),
          g
        );
      },
    ],
    78009,
  );
  var f = e.i(466931);
  e.s(
    [
      "f",
      0,
      function ({
        signerAddress: e,
        sessionAddress: t,
        operation: n,
        mint: i,
      }) {
        return (
          !!t &&
          t !== e &&
          ((0, f.l)({
            error: Error(
              "Signing wallet does not match session identity — trade proceeds under the active wallet while the session heals",
            ),
            feature: "trade",
            operation: `wallet-identity-mismatch-${n}`,
            context: { signerAddress: e, sessionAddress: t, mint: i },
          }),
          !0)
        );
      },
    ],
    366125,
  );
};
