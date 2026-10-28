// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(439587),
    l = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    i = e.i(980268),
    n = e.i(402732),
    o = e.i(547562);
  function d(e) {
    let t = e?.trim();
    if (!t) return null;
    let r = t;
    t.startsWith("//")
      ? (r = `https:${t}`)
      : /^https?:\/\//i.test(t) || (r = `https://${t}`);
    try {
      let e = new URL(r);
      if ("https:" !== e.protocol) return null;
      return e.href;
    } catch {
      return null;
    }
  }
  let u = new Set(["pump.fun", "terminal.pump.fun", "trade.padre.gg"]);
  function c(e) {
    try {
      let t = d(e);
      if (!t) return !1;
      let r = new URL(t).hostname.replace(/^www\./, "");
      return u.has(r);
    } catch {
      return !1;
    }
  }
  function f(e) {
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
      c,
      "_",
      0,
      d,
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
            m,
            p,
            h,
            g,
            b,
            w,
            y,
            v,
            x,
            j,
            _,
            A,
            k,
            N,
            I,
            C,
            P,
            S,
            E = (0, r.c)(50),
            { t: F } = (0, s.f)(),
            [U, T] = (0, l.useState)(!1),
            [z, K] = (0, l.useState)(null),
            M = (0, n.f)(),
            [R, L] = (0, o.l)("privacy.confirmExternalLinks"),
            B = !M || R,
            [q, O] = (0, l.useState)(!1),
            V = (0, l.useId)();
          E[0] !== B
            ? ((e = (e) => {
                let t = d(e);
                if (t) {
                  if (c(t) || !B) return void f(t);
                  (O(!1), K(t), T(!0));
                }
              }),
              (E[0] = B),
              (E[1] = e))
            : (e = E[1]);
          let D = e;
          E[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (e) => {
                (e || K(null), T(e));
              }),
              (E[2] = u))
            : (u = E[2]);
          let W = u;
          E[3] !== q || E[4] !== M || E[5] !== z || E[6] !== L
            ? ((m = () => {
                z && (M && q && L(!1), f(z), T(!1), K(null));
              }),
              (E[3] = q),
              (E[4] = M),
              (E[5] = z),
              (E[6] = L),
              (E[7] = m))
            : (m = E[7]);
          let Q = m;
          (E[8] !== F
            ? ((p = F("web.leave_site.title")), (E[8] = F), (E[9] = p))
            : (p = E[9]),
            E[10] !== p
              ? ((h = (0, t.jsx)("p", {
                  className: "font-semibold text-lg",
                  children: p,
                })),
                (E[10] = p),
                (E[11] = h))
              : (h = E[11]),
            E[12] === Symbol.for("react.memo_cache_sentinel")
              ? ((g = (0, t.jsx)(a.k, { height: 4 })), (E[12] = g))
              : (g = E[12]),
            E[13] !== F
              ? ((b = F("web.leave_site.description")),
                (E[13] = F),
                (E[14] = b))
              : (b = E[14]),
            E[15] !== b
              ? ((w = (0, t.jsx)("p", { children: b })),
                (E[15] = b),
                (E[16] = w))
              : (w = E[16]),
            E[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((y = (0, t.jsx)(a.k, { height: 16 })), (E[17] = y))
              : (y = E[17]),
            E[18] !== z
              ? ((v = z
                  ? (0, t.jsx)("div", {
                      className: "rounded-md bg-bg-tertiary p-3",
                      children: (0, t.jsx)("p", {
                        className: "break-all text-sm text-text-secondary",
                        children: z,
                      }),
                    })
                  : null),
                (E[18] = z),
                (E[19] = v))
              : (v = E[19]),
            E[20] !== q || E[21] !== V || E[22] !== M || E[23] !== F
              ? ((x = M
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(a.k, { height: 16 }),
                        (0, t.jsxs)("label", {
                          htmlFor: V,
                          className:
                            "flex w-fit cursor-pointer select-none items-center gap-2 text-sm text-text-secondary",
                          children: [
                            (0, t.jsx)(i.f, {
                              id: V,
                              checked: q,
                              onCheckedChange: (e) => O(!0 === e),
                            }),
                            F("web.settings.privacy.dont_ask_again"),
                          ],
                        }),
                        (0, t.jsx)(a.k, { height: 16 }),
                      ],
                    })
                  : (0, t.jsx)(a.k, { height: 32 })),
                (E[20] = q),
                (E[21] = V),
                (E[22] = M),
                (E[23] = F),
                (E[24] = x))
              : (x = E[24]),
            E[25] === Symbol.for("react.memo_cache_sentinel")
              ? ((j = () => W(!1)), (E[25] = j))
              : (j = E[25]),
            E[26] !== F
              ? ((_ = F("common.cancel")), (E[26] = F), (E[27] = _))
              : (_ = E[27]),
            E[28] !== _
              ? ((A = (0, t.jsx)(a.K, {
                  type: "button",
                  variant: "secondary",
                  onClick: j,
                  children: _,
                })),
                (E[28] = _),
                (E[29] = A))
              : (A = E[29]),
            E[30] !== F
              ? ((k = F("geo_block.open_link")), (E[30] = F), (E[31] = k))
              : (k = E[31]),
            E[32] !== Q || E[33] !== k
              ? ((N = (0, t.jsx)(a.K, {
                  type: "button",
                  className: "bg-bg-accent text-black hover:bg-bg-accent/90",
                  onClick: Q,
                  children: k,
                })),
                (E[32] = Q),
                (E[33] = k),
                (E[34] = N))
              : (N = E[34]),
            E[35] !== A || E[36] !== N
              ? ((I = (0, t.jsxs)(a.z, {
                  justifyContent: "space-between",
                  children: [A, N],
                })),
                (E[35] = A),
                (E[36] = N),
                (E[37] = I))
              : (I = E[37]),
            E[38] !== x ||
            E[39] !== I ||
            E[40] !== h ||
            E[41] !== w ||
            E[42] !== v
              ? ((C = (0, t.jsxs)(a.s, {
                  className: "max-w-[480px]",
                  children: [h, g, w, y, v, x, I],
                })),
                (E[38] = x),
                (E[39] = I),
                (E[40] = h),
                (E[41] = w),
                (E[42] = v),
                (E[43] = C))
              : (C = E[43]),
            E[44] !== U || E[45] !== C
              ? ((P = (0, t.jsx)(a.v, {
                  isOpen: U,
                  onIsOpenChange: W,
                  children: C,
                })),
                (E[44] = U),
                (E[45] = C),
                (E[46] = P))
              : (P = E[46]));
          let $ = P;
          return (
            E[47] !== $ || E[48] !== D
              ? ((S = { requestNavigation: D, dialog: $ }),
                (E[47] = $),
                (E[48] = D),
                (E[49] = S))
              : (S = E[49]),
            S
          );
        },
      ],
      225641,
    ));
};
