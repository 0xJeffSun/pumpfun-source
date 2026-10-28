// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    n = e.i(745018);
  e.i(12692);
  var r = e.i(398902),
    s = e.i(63289),
    o = e.i(506486);
  e.i(267146);
  var a = e.i(540805),
    l = e.i(592209),
    u = e.i(584229),
    d = e.i(835436),
    c = e.i(711792),
    p = e.i(967936),
    m = e.i(931333);
  let f = "perp-sweep-withdraw",
    h = new Set(["perp_outcome_unknown", "perp_withdraw_pending"]),
    w = {
      perp_outcome_unknown: "web.perps.portfolio.sweep.outcome_unknown",
      perp_amount_too_small: "web.perps.portfolio.sweep.too_small",
      insufficient_funds: "web.perps.portfolio.sweep.nothing_withdrawable",
    };
  function g(e) {
    let n,
      s,
      o = (0, i.c)(7),
      { outAmount: a, denominationOut: u } = e,
      { t: d, i18n: c } = (0, r.f)();
    if (o[0] !== u || o[1] !== c.language || o[2] !== a || o[3] !== d) {
      let e = (0, l.v)(c.language) ?? l.T;
      ((n =
        "sol" === u
          ? d("web.perps.portfolio.sweep.landed_sol", { amount: (0, m.s)(a) })
          : d("web.perps.portfolio.sweep.landed", {
              amount: (0, m.t)({ value: a, locale: e }),
            })),
        (o[0] = u),
        (o[1] = c.language),
        (o[2] = a),
        (o[3] = d),
        (o[4] = n));
    } else n = o[4];
    return (
      o[5] !== n
        ? ((s = (0, t.jsx)(t.Fragment, { children: n })),
          (o[5] = n),
          (o[6] = s))
        : (s = o[6]),
      s
    );
  }
  e.s([
    "I",
    0,
    (e) => {
      let i;
      if (
        (s.c.dismiss(f),
        (0, p.c)(e) ||
          (e instanceof d.I &&
            "failed_to_sign_transaction" === e.reason &&
            (0, u.S)(e.originalError)))
      )
        return;
      let r = (0, c.J)(e),
        l =
          (i = e) instanceof d.I && void 0 !== i.reason && i.reason in w
            ? w[i.reason]
            : null,
        m = e instanceof d.I && void 0 !== e.reason && h.has(e.reason);
      s.c.custom(
        (e) =>
          (0, t.jsx)(o.X, {
            render: (i) =>
              (0, t.jsx)(o.O, {
                tone: m ? "neutral" : "loss",
                glyph: m ? (0, t.jsx)(n.wB, {}) : (0, t.jsx)(n.ck, {}),
                title:
                  null !== l
                    ? i(l)
                    : void 0 === r.minimumUsd
                      ? i(r.key)
                      : i(r.key, { amount: (0, a.w)(r.minimumUsd) }),
                durationMs: 8e3,
                onDismiss: () => s.c.dismiss(e),
                testId: m
                  ? "perp-sweep-unsettled-toast"
                  : "perp-sweep-failed-toast",
              }),
          }),
        { duration: 8e3 },
      );
    },
    "Z",
    0,
    (e) => {
      (s.c.dismiss(f),
        s.c.custom(
          (i) =>
            (0, t.jsx)(o.O, {
              tone: "gain",
              glyph: (0, t.jsx)(n.y$, {}),
              title: (0, t.jsx)(g, {
                outAmount: e.outAmount,
                denominationOut: e.denominationOut,
              }),
              durationMs: 6e3,
              onDismiss: () => s.c.dismiss(i),
              testId: "perp-sweep-landed-toast",
            }),
          { duration: 6e3 },
        ));
    },
    "m",
    0,
    () => {
      s.c.loading(
        (0, t.jsx)(o.X, {
          render: (e) =>
            (0, t.jsx)(t.Fragment, {
              children: e("web.perps.portfolio.sweep.withdrawing"),
            }),
        }),
        { id: f },
      );
    },
  ]);
};
