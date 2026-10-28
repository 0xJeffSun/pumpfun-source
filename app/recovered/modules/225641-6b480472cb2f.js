// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(439587),
    i = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(980268),
    s = e.i(402732),
    o = e.i(547562);
  function c(e) {
    let t = e?.trim();
    if (!t) return null;
    let n = t;
    t.startsWith("//")
      ? (n = `https:${t}`)
      : /^https?:\/\//i.test(t) || (n = `https://${t}`);
    try {
      let e = new URL(n);
      if ("https:" !== e.protocol) return null;
      return e.href;
    } catch {
      return null;
    }
  }
  let u = new Set(["pump.fun", "terminal.pump.fun", "trade.padre.gg"]);
  function d(e) {
    try {
      let t = c(e);
      if (!t) return !1;
      let n = new URL(t).hostname.replace(/^www\./, "");
      return u.has(n);
    } catch {
      return !1;
    }
  }
  function m(e) {
    window.open(e, "_blank", "noopener,noreferrer");
  }
  (e.s(
    [
      "B",
      0,
      function (e) {
        let t = e.trim();
        return (
          !!t &&
          (!!(
            (t.startsWith("/") && !t.startsWith("//")) ||
            t.startsWith("#") ||
            t.startsWith("?")
          ) ||
            /^(mailto|tel):/i.test(t))
        );
      },
      "l",
      0,
      d,
      "_",
      0,
      c,
    ],
    947187,
  ),
    e.s(
      [
        "f",
        0,
        function () {
          let e,
            u,
            h,
            f,
            p,
            g,
            b,
            _,
            x,
            y,
            v,
            k,
            w,
            j,
            N,
            S,
            C,
            R,
            $,
            I,
            F = (0, n.c)(50),
            { t: E } = (0, l.f)(),
            [U, A] = (0, i.useState)(!1),
            [M, z] = (0, i.useState)(null),
            L = (0, s.f)(),
            [O, T] = (0, o.l)("privacy.confirmExternalLinks"),
            B = !L || O,
            [D, q] = (0, i.useState)(!1),
            P = (0, i.useId)();
          F[0] !== B
            ? ((e = (e) => {
                let t = c(e);
                if (t) {
                  if (d(t) || !B) return void m(t);
                  (q(!1), z(t), A(!0));
                }
              }),
              (F[0] = B),
              (F[1] = e))
            : (e = F[1]);
          let V = e;
          F[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (e) => {
                (e || z(null), A(e));
              }),
              (F[2] = u))
            : (u = F[2]);
          let W = u;
          F[3] !== D || F[4] !== L || F[5] !== M || F[6] !== T
            ? ((h = () => {
                M && (L && D && T(!1), m(M), A(!1), z(null));
              }),
              (F[3] = D),
              (F[4] = L),
              (F[5] = M),
              (F[6] = T),
              (F[7] = h))
            : (h = F[7]);
          let K = h;
          (F[8] !== E
            ? ((f = E("web.leave_site.title")), (F[8] = E), (F[9] = f))
            : (f = F[9]),
            F[10] !== f
              ? ((p = (0, t.jsx)("p", {
                  className: "font-semibold text-lg",
                  children: f,
                })),
                (F[10] = f),
                (F[11] = p))
              : (p = F[11]),
            F[12] === Symbol.for("react.memo_cache_sentinel")
              ? ((g = (0, t.jsx)(r.k, { height: 4 })), (F[12] = g))
              : (g = F[12]),
            F[13] !== E
              ? ((b = E("web.leave_site.description")),
                (F[13] = E),
                (F[14] = b))
              : (b = F[14]),
            F[15] !== b
              ? ((_ = (0, t.jsx)("p", { children: b })),
                (F[15] = b),
                (F[16] = _))
              : (_ = F[16]),
            F[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((x = (0, t.jsx)(r.k, { height: 16 })), (F[17] = x))
              : (x = F[17]),
            F[18] !== M
              ? ((y = M
                  ? (0, t.jsx)("div", {
                      className: "rounded-md bg-bg-tertiary p-3",
                      children: (0, t.jsx)("p", {
                        className: "break-all text-sm text-text-secondary",
                        children: M,
                      }),
                    })
                  : null),
                (F[18] = M),
                (F[19] = y))
              : (y = F[19]),
            F[20] !== D || F[21] !== P || F[22] !== L || F[23] !== E
              ? ((v = L
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(r.k, { height: 16 }),
                        (0, t.jsxs)("label", {
                          htmlFor: P,
                          className:
                            "flex w-fit cursor-pointer select-none items-center gap-2 text-sm text-text-secondary",
                          children: [
                            (0, t.jsx)(a.f, {
                              id: P,
                              checked: D,
                              onCheckedChange: (e) => q(!0 === e),
                            }),
                            E("web.settings.privacy.dont_ask_again"),
                          ],
                        }),
                        (0, t.jsx)(r.k, { height: 16 }),
                      ],
                    })
                  : (0, t.jsx)(r.k, { height: 32 })),
                (F[20] = D),
                (F[21] = P),
                (F[22] = L),
                (F[23] = E),
                (F[24] = v))
              : (v = F[24]),
            F[25] === Symbol.for("react.memo_cache_sentinel")
              ? ((k = () => W(!1)), (F[25] = k))
              : (k = F[25]),
            F[26] !== E
              ? ((w = E("common.cancel")), (F[26] = E), (F[27] = w))
              : (w = F[27]),
            F[28] !== w
              ? ((j = (0, t.jsx)(r.K, {
                  type: "button",
                  variant: "secondary",
                  onClick: k,
                  children: w,
                })),
                (F[28] = w),
                (F[29] = j))
              : (j = F[29]),
            F[30] !== E
              ? ((N = E("geo_block.open_link")), (F[30] = E), (F[31] = N))
              : (N = F[31]),
            F[32] !== K || F[33] !== N
              ? ((S = (0, t.jsx)(r.K, {
                  type: "button",
                  className: "bg-bg-accent text-black hover:bg-bg-accent/90",
                  onClick: K,
                  children: N,
                })),
                (F[32] = K),
                (F[33] = N),
                (F[34] = S))
              : (S = F[34]),
            F[35] !== j || F[36] !== S
              ? ((C = (0, t.jsxs)(r.z, {
                  justifyContent: "space-between",
                  children: [j, S],
                })),
                (F[35] = j),
                (F[36] = S),
                (F[37] = C))
              : (C = F[37]),
            F[38] !== v ||
            F[39] !== C ||
            F[40] !== p ||
            F[41] !== _ ||
            F[42] !== y
              ? ((R = (0, t.jsxs)(r.s, {
                  className: "max-w-[480px]",
                  children: [p, g, _, x, y, v, C],
                })),
                (F[38] = v),
                (F[39] = C),
                (F[40] = p),
                (F[41] = _),
                (F[42] = y),
                (F[43] = R))
              : (R = F[43]),
            F[44] !== U || F[45] !== R
              ? (($ = (0, t.jsx)(r.v, {
                  isOpen: U,
                  onIsOpenChange: W,
                  children: R,
                })),
                (F[44] = U),
                (F[45] = R),
                (F[46] = $))
              : ($ = F[46]));
          let Q = $;
          return (
            F[47] !== Q || F[48] !== V
              ? ((I = { requestNavigation: V, dialog: Q }),
                (F[47] = Q),
                (F[48] = V),
                (F[49] = I))
              : (I = F[49]),
            I
          );
        },
      ],
      225641,
    ));
};
