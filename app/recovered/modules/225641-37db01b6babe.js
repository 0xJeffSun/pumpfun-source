// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(439587),
    i = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(980268),
    s = e.i(402732),
    l = e.i(547562);
  function c(e) {
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
  let d = new Set(["pump.fun", "terminal.pump.fun", "trade.padre.gg"]);
  function m(e) {
    try {
      let t = c(e);
      if (!t) return !1;
      let r = new URL(t).hostname.replace(/^www\./, "");
      return d.has(r);
    } catch {
      return !1;
    }
  }
  function u(e) {
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
      m,
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
            d,
            b,
            h,
            f,
            x,
            p,
            y,
            g,
            w,
            v,
            _,
            j,
            k,
            L,
            N,
            C,
            S,
            A,
            E,
            R = (0, r.c)(50),
            { t: U } = (0, a.f)(),
            [O, q] = (0, i.useState)(!1),
            [B, H] = (0, i.useState)(null),
            D = (0, s.f)(),
            [F, M] = (0, l.l)("privacy.confirmExternalLinks"),
            T = !D || F,
            [I, P] = (0, i.useState)(!1),
            z = (0, i.useId)();
          R[0] !== T
            ? ((e = (e) => {
                let t = c(e);
                if (t) {
                  if (m(t) || !T) return void u(t);
                  (P(!1), H(t), q(!0));
                }
              }),
              (R[0] = T),
              (R[1] = e))
            : (e = R[1]);
          let $ = e;
          R[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = (e) => {
                (e || H(null), q(e));
              }),
              (R[2] = d))
            : (d = R[2]);
          let W = d;
          R[3] !== I || R[4] !== D || R[5] !== B || R[6] !== M
            ? ((b = () => {
                B && (D && I && M(!1), u(B), q(!1), H(null));
              }),
              (R[3] = I),
              (R[4] = D),
              (R[5] = B),
              (R[6] = M),
              (R[7] = b))
            : (b = R[7]);
          let Z = b;
          (R[8] !== U
            ? ((h = U("web.leave_site.title")), (R[8] = U), (R[9] = h))
            : (h = R[9]),
            R[10] !== h
              ? ((f = (0, t.jsx)("p", {
                  className: "font-semibold text-lg",
                  children: h,
                })),
                (R[10] = h),
                (R[11] = f))
              : (f = R[11]),
            R[12] === Symbol.for("react.memo_cache_sentinel")
              ? ((x = (0, t.jsx)(n.k, { height: 4 })), (R[12] = x))
              : (x = R[12]),
            R[13] !== U
              ? ((p = U("web.leave_site.description")),
                (R[13] = U),
                (R[14] = p))
              : (p = R[14]),
            R[15] !== p
              ? ((y = (0, t.jsx)("p", { children: p })),
                (R[15] = p),
                (R[16] = y))
              : (y = R[16]),
            R[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((g = (0, t.jsx)(n.k, { height: 16 })), (R[17] = g))
              : (g = R[17]),
            R[18] !== B
              ? ((w = B
                  ? (0, t.jsx)("div", {
                      className: "rounded-md bg-bg-tertiary p-3",
                      children: (0, t.jsx)("p", {
                        className: "break-all text-sm text-text-secondary",
                        children: B,
                      }),
                    })
                  : null),
                (R[18] = B),
                (R[19] = w))
              : (w = R[19]),
            R[20] !== I || R[21] !== z || R[22] !== D || R[23] !== U
              ? ((v = D
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(n.k, { height: 16 }),
                        (0, t.jsxs)("label", {
                          htmlFor: z,
                          className:
                            "flex w-fit cursor-pointer select-none items-center gap-2 text-sm text-text-secondary",
                          children: [
                            (0, t.jsx)(o.f, {
                              id: z,
                              checked: I,
                              onCheckedChange: (e) => P(!0 === e),
                            }),
                            U("web.settings.privacy.dont_ask_again"),
                          ],
                        }),
                        (0, t.jsx)(n.k, { height: 16 }),
                      ],
                    })
                  : (0, t.jsx)(n.k, { height: 32 })),
                (R[20] = I),
                (R[21] = z),
                (R[22] = D),
                (R[23] = U),
                (R[24] = v))
              : (v = R[24]),
            R[25] === Symbol.for("react.memo_cache_sentinel")
              ? ((_ = () => W(!1)), (R[25] = _))
              : (_ = R[25]),
            R[26] !== U
              ? ((j = U("common.cancel")), (R[26] = U), (R[27] = j))
              : (j = R[27]),
            R[28] !== j
              ? ((k = (0, t.jsx)(n.K, {
                  type: "button",
                  variant: "secondary",
                  onClick: _,
                  children: j,
                })),
                (R[28] = j),
                (R[29] = k))
              : (k = R[29]),
            R[30] !== U
              ? ((L = U("geo_block.open_link")), (R[30] = U), (R[31] = L))
              : (L = R[31]),
            R[32] !== Z || R[33] !== L
              ? ((N = (0, t.jsx)(n.K, {
                  type: "button",
                  className: "bg-bg-accent text-black hover:bg-bg-accent/90",
                  onClick: Z,
                  children: L,
                })),
                (R[32] = Z),
                (R[33] = L),
                (R[34] = N))
              : (N = R[34]),
            R[35] !== k || R[36] !== N
              ? ((C = (0, t.jsxs)(n.z, {
                  justifyContent: "space-between",
                  children: [k, N],
                })),
                (R[35] = k),
                (R[36] = N),
                (R[37] = C))
              : (C = R[37]),
            R[38] !== v ||
            R[39] !== C ||
            R[40] !== f ||
            R[41] !== y ||
            R[42] !== w
              ? ((S = (0, t.jsxs)(n.s, {
                  className: "max-w-[480px]",
                  children: [f, x, y, g, w, v, C],
                })),
                (R[38] = v),
                (R[39] = C),
                (R[40] = f),
                (R[41] = y),
                (R[42] = w),
                (R[43] = S))
              : (S = R[43]),
            R[44] !== O || R[45] !== S
              ? ((A = (0, t.jsx)(n.v, {
                  isOpen: O,
                  onIsOpenChange: W,
                  children: S,
                })),
                (R[44] = O),
                (R[45] = S),
                (R[46] = A))
              : (A = R[46]));
          let K = A;
          return (
            R[47] !== K || R[48] !== $
              ? ((E = { requestNavigation: $, dialog: K }),
                (R[47] = K),
                (R[48] = $),
                (R[49] = E))
              : (E = R[49]),
            E
          );
        },
      ],
      225641,
    ));
};
