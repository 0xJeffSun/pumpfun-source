// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(724423),
    l = e.i(261756),
    a = e.i(670607);
  let o = e.i(957487).B,
    u = (e) => {
      let [t = "", ...r] = e.replace(/[^0-9.]/g, "").split(".");
      return 0 === r.length ? t : `${t}.${r.join("")}`;
    },
    c = (e) => {
      if ("" === e.trim()) return null;
      let t = Number(e);
      return Number.isFinite(t) && t > 0 && t <= 1e9 ? t : null;
    },
    d = (e) => String(e);
  e.s(["w", 0, o, "B", 0, d, "G", 0, c, "c", 0, u], 971554);
  var f = e.i(595673),
    h = e.i(338319);
  let m = {
    terminal: "text-[12px] leading-4",
    comfortable: "text-[13px] leading-[18px]",
  };
  e.s(
    [
      "f",
      0,
      function (e) {
        let p,
          b,
          g,
          y,
          v,
          w,
          _,
          x,
          E,
          N,
          S,
          R,
          T,
          C,
          P,
          k,
          F,
          M,
          j = (0, r.c)(50),
          { address: I, density: O, surface: Q, onSaved: A, className: U } = e,
          { t: q } = (0, n.f)();
        j[0] !== I
          ? ((p = { address: I, enabled: !0 }), (j[0] = I), (j[1] = p))
          : (p = j[1]);
        let B = (0, l.$)(p),
          [L, $] = (0, i.useState)(null),
          [D, H] = (0, i.useState)(!1);
        (j[2] !== A
          ? ((b = (e) => {
              ($(null), H(!1), A?.(e));
            }),
            (j[2] = A),
            (j[3] = b))
          : (b = j[3]),
          j[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = () => H(!0)), (j[4] = g))
            : (g = j[4]),
          j[5] !== I || j[6] !== b
            ? ((y = { address: I, onSuccess: b, onError: g }),
              (j[5] = I),
              (j[6] = b),
              (j[7] = y))
            : (y = j[7]));
        let z = (0, a.f)(y),
          K = B.data ?? o;
        j[8] !== L || j[9] !== K
          ? ((v = L ?? d(K)), (j[8] = L), (j[9] = K), (j[10] = v))
          : (v = j[10]);
        let V = v;
        j[11] !== V ? ((w = c(V)), (j[11] = V), (j[12] = w)) : (w = j[12]);
        let G = w,
          J = null === G,
          X = null !== G && G !== K && !z.isPending && !B.isLoading;
        j[13] !== X || j[14] !== z || j[15] !== Q || j[16] !== G
          ? ((_ = (e) => {
              (e.preventDefault(),
                X && null !== G && ((0, f.uo)({ surface: Q }), z.mutate(G)));
            }),
            (j[13] = X),
            (j[14] = z),
            (j[15] = Q),
            (j[16] = G),
            (j[17] = _))
          : (_ = j[17]);
        let W = _;
        j[18] !== D || j[19] !== J || j[20] !== q
          ? ((x = J
              ? q("web.info_bar.dust_floor_invalid")
              : D
                ? q("web.info_bar.dust_floor_failed")
                : void 0),
            (j[18] = D),
            (j[19] = J),
            (j[20] = q),
            (j[21] = x))
          : (x = j[21]);
        let Z = x;
        (j[22] !== U
          ? ((E = (0, h.c)("flex min-w-0 flex-col", U)),
            (j[22] = U),
            (j[23] = E))
          : (E = j[23]),
          j[24] === Symbol.for("react.memo_cache_sentinel")
            ? ((N = (e) => {
                ($(u(e)), H(!1));
              }),
              (j[24] = N))
            : (N = j[24]),
          j[25] !== q
            ? ((S = q("web.info_bar.dust_floor_label")),
              (j[25] = q),
              (j[26] = S))
            : (S = j[26]),
          j[27] === Symbol.for("react.memo_cache_sentinel")
            ? ((R = d(o)), (j[27] = R))
            : (R = j[27]));
        let Y = B.isLoading,
          ee = J || D;
        j[28] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (0, t.jsx)("span", { "aria-hidden": !0, children: "$" })),
            (j[28] = T))
          : (T = j[28]);
        let et = !X,
          er = m[O];
        return (
          j[29] !== er
            ? ((C = (0, h.c)(
                er,
                "shrink-0 font-medium text-text-accent transition-colors hover:text-text-primary disabled:cursor-default disabled:text-text-quaternary disabled:hover:text-text-quaternary",
              )),
              (j[29] = er),
              (j[30] = C))
            : (C = j[30]),
          j[31] !== z.isPending || j[32] !== q
            ? ((P = q(z.isPending ? "common.saving" : "common.save")),
              (j[31] = z.isPending),
              (j[32] = q),
              (j[33] = P))
            : (P = j[33]),
          j[34] !== et || j[35] !== C || j[36] !== P
            ? ((k = (0, t.jsx)("button", {
                type: "submit",
                disabled: et,
                className: C,
                children: P,
              })),
              (j[34] = et),
              (j[35] = C),
              (j[36] = P),
              (j[37] = k))
            : (k = j[37]),
          j[38] !== O ||
          j[39] !== B.isLoading ||
          j[40] !== Z ||
          j[41] !== S ||
          j[42] !== ee ||
          j[43] !== k ||
          j[44] !== V
            ? ((F = (0, t.jsx)(s.N, {
                density: O,
                value: V,
                onValueChange: N,
                inputMode: "decimal",
                autoComplete: "off",
                enterKeyHint: "done",
                "aria-label": S,
                placeholder: R,
                disabled: Y,
                invalid: ee,
                helper: Z,
                leading: T,
                trailing: k,
              })),
              (j[38] = O),
              (j[39] = B.isLoading),
              (j[40] = Z),
              (j[41] = S),
              (j[42] = ee),
              (j[43] = k),
              (j[44] = V),
              (j[45] = F))
            : (F = j[45]),
          j[46] !== W || j[47] !== F || j[48] !== E
            ? ((M = (0, t.jsx)("form", {
                onSubmit: W,
                className: E,
                "data-testid": "dust-floor-control",
                children: F,
              })),
              (j[46] = W),
              (j[47] = F),
              (j[48] = E),
              (j[49] = M))
            : (M = j[49]),
          M
        );
      },
    ],
    464456,
  );
};
