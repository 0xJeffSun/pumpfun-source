// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(439587),
    i = e.i(458310),
    a = e.i(352386);
  e.i(12692);
  var l = e.i(117466),
    s = e.i(398902),
    o = e.i(980268),
    c = e.i(182119);
  let u = "/docs/callout-reward-terms";
  e.s([
    "v",
    0,
    u,
    "O",
    0,
    function (e) {
      let d,
        f,
        m,
        p,
        h,
        g,
        x,
        v,
        y,
        b,
        w,
        _,
        C,
        S,
        k,
        j,
        N,
        I,
        E = (0, r.c)(43),
        { onAccept: R, onDecline: A } = e,
        { t: P } = (0, s.f)(),
        [L, M] = (0, a.useState)(!1);
      (E[0] !== A
        ? ((d = (e) => {
            e || A();
          }),
          (E[0] = A),
          (E[1] = d))
        : (d = E[1]),
        E[2] !== P
          ? ((f = P("callouts.tos.title")), (E[2] = P), (E[3] = f))
          : (f = E[3]),
        E[4] !== f
          ? ((m = (0, t.jsx)(c.F, { children: f })), (E[4] = f), (E[5] = m))
          : (m = E[5]),
        E[6] !== P
          ? ((p = P("callouts.tos.summary")), (E[6] = P), (E[7] = p))
          : (p = E[7]),
        E[8] !== p
          ? ((h = (0, t.jsx)(c.C, { children: p })), (E[8] = p), (E[9] = h))
          : (h = E[9]),
        E[10] !== m || E[11] !== h
          ? ((g = (0, t.jsxs)(c.s, { children: [m, h] })),
            (E[10] = m),
            (E[11] = h),
            (E[12] = g))
          : (g = E[12]),
        E[13] !== P
          ? ((x = P("callouts.tos.agree_checkbox")), (E[13] = P), (E[14] = x))
          : (x = E[14]),
        E[15] === Symbol.for("react.memo_cache_sentinel")
          ? ((v = (e) => M(!!e)), (E[15] = v))
          : (v = E[15]),
        E[16] !== L || E[17] !== x
          ? ((y = (0, t.jsx)(o.f, {
              "aria-label": x,
              checked: L,
              className: "mt-0.5 shrink-0",
              "data-testid": "callout-rewards-tos-checkbox",
              onCheckedChange: v,
            })),
            (E[16] = L),
            (E[17] = x),
            (E[18] = y))
          : (y = E[18]),
        E[19] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, t.jsx)("span", {
              children: (0, t.jsx)(l.f, {
                i18nKey: "web.callouts.tos_agree_with_link",
                components: {
                  termsLink: (0, t.jsx)(i.default, {
                    className:
                      "underline text-text-primary hover:text-text-accent",
                    "data-testid": "callout-rewards-tos-terms-link",
                    href: u,
                    rel: "noopener noreferrer",
                    target: "_blank",
                  }),
                },
              }),
            })),
            (E[19] = b))
          : (b = E[19]),
        E[20] !== y
          ? ((w = (0, t.jsxs)("label", {
              className:
                "flex cursor-pointer items-start gap-3 rounded-[14px] border border-border-secondary bg-bg-tertiary px-3 py-3 text-sm leading-5 text-text-secondary",
              "data-testid": "callout-rewards-tos-checkbox-row",
              children: [y, b],
            })),
            (E[20] = y),
            (E[21] = w))
          : (w = E[21]));
      let $ = !L;
      return (
        E[22] !== P
          ? ((_ = P("callouts.tos.agree_button")), (E[22] = P), (E[23] = _))
          : (_ = E[23]),
        E[24] !== R || E[25] !== $ || E[26] !== _
          ? ((C = (0, t.jsx)(n.K, {
              isFullWidth: !0,
              isDisabled: $,
              onClick: R,
              variant: "primary",
              "data-testid": "callout-rewards-tos-agree",
              children: _,
            })),
            (E[24] = R),
            (E[25] = $),
            (E[26] = _),
            (E[27] = C))
          : (C = E[27]),
        E[28] !== P
          ? ((S = P("common.go_back")), (E[28] = P), (E[29] = S))
          : (S = E[29]),
        E[30] !== A || E[31] !== S
          ? ((k = (0, t.jsx)(n.K, {
              isFullWidth: !0,
              onClick: A,
              variant: "ghost",
              "data-testid": "callout-rewards-tos-go-back",
              children: S,
            })),
            (E[30] = A),
            (E[31] = S),
            (E[32] = k))
          : (k = E[32]),
        E[33] !== C || E[34] !== k
          ? ((j = (0, t.jsxs)("div", {
              className: "flex flex-col gap-2",
              children: [C, k],
            })),
            (E[33] = C),
            (E[34] = k),
            (E[35] = j))
          : (j = E[35]),
        E[36] !== w || E[37] !== j || E[38] !== g
          ? ((N = (0, t.jsxs)(c.d, {
              className: "max-w-md bg-bg-primary px-6",
              children: [g, w, j],
            })),
            (E[36] = w),
            (E[37] = j),
            (E[38] = g),
            (E[39] = N))
          : (N = E[39]),
        E[40] !== d || E[41] !== N
          ? ((I = (0, t.jsx)(c.N, { open: !0, onOpenChange: d, children: N })),
            (E[40] = d),
            (E[41] = N),
            (E[42] = I))
          : (I = E[42]),
        I
      );
    },
  ]);
};
