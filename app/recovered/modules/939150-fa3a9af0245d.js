// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    n = e.i(426091),
    s = e.i(928529),
    r = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    o = e.i(464649),
    d = e.i(764844),
    c = e.i(656846),
    u = e.i(367310),
    m = e.i(90832),
    f = e.i(855659);
  let p = [
    { asset: "sol", label: "SOL", iconSrc: o.T.solana },
    { asset: "usdc", label: "USDC", iconSrc: c.f.imageUri },
  ];
  e.s([
    "f",
    0,
    function (e) {
      let o,
        c,
        b,
        x,
        y,
        h,
        g,
        _,
        v,
        j,
        w,
        k,
        N = (0, i.c)(59),
        {
          paymentAsset: S,
          solBalanceUi: U,
          usdcBalanceUi: P,
          solUsdPrice: F,
          onSelect: C,
          disabled: I,
        } = e,
        q = void 0 !== I && I,
        { t: $ } = (0, l.f)(),
        [T, A] = (0, r.useState)(!1),
        B = (0, u.E)();
      N[0] !== U || N[1] !== F || N[2] !== P
        ? ((o = (e) => {
            if ("usdc" === e) return `${(0, m.p)(P, 2)} USDC`;
            let t = `${(0, m.m)(U, 3)} SOL`;
            return F > 0 ? `${t} ≈ ${(0, m.w)(U * F)}` : t;
          }),
          (N[0] = U),
          (N[1] = F),
          (N[2] = P),
          (N[3] = o))
        : (o = N[3]);
      let O = o;
      if (
        N[4] !== O ||
        N[5] !== q ||
        N[6] !== C ||
        N[7] !== T ||
        N[8] !== S ||
        N[9] !== B ||
        N[10] !== $
      ) {
        let e, i, r, l, o, u, m, w, k;
        N[20] !== S
          ? ((e = (e) => {
              let { asset: t } = e;
              return t !== S;
            }),
            (N[20] = S),
            (N[21] = e))
          : (e = N[21]);
        let U = p.filter(e);
        N[22] !== S
          ? ((i =
              p.find((e) => {
                let { asset: t } = e;
                return t === S;
              }) ?? p[0]),
            (N[22] = S),
            (N[23] = i))
          : (i = N[23]);
        let P = i;
        ((b = d.k),
          (_ = T),
          (v = A),
          N[24] !== $
            ? ((r = $("web.trade.choose_payment_asset")),
              (N[24] = $),
              (N[25] = r))
            : (r = N[25]));
        let F = q && "pointer-events-none opacity-60";
        (N[26] !== F
          ? ((l = (0, n.c)(f.l, F)), (N[26] = F), (N[27] = l))
          : (l = N[27]),
          N[28] !== P.iconSrc
            ? ((o = (0, t.jsx)(s.default, {
                src: P.iconSrc,
                width: 14,
                height: 14,
                alt: "",
                className: "rounded-full",
              })),
              (N[28] = P.iconSrc),
              (N[29] = o))
            : (o = N[29]));
        let I = O(S);
        N[30] !== I
          ? ((u = (0, t.jsx)("span", { children: I })),
            (N[30] = I),
            (N[31] = u))
          : (u = N[31]);
        let E = T && "rotate-180";
        (N[32] !== E
          ? ((m = (0, n.c)("size-3 transition-transform duration-200", E)),
            (N[32] = E),
            (N[33] = m))
          : (m = N[33]),
          N[34] !== m
            ? ((w = (0, t.jsx)(a.J0, { className: m })),
              (N[34] = m),
              (N[35] = w))
            : (w = N[35]),
          N[36] !== q ||
          N[37] !== r ||
          N[38] !== l ||
          N[39] !== o ||
          N[40] !== u ||
          N[41] !== w
            ? ((j = (0, t.jsxs)(d.g, {
                "data-testid": "payment-asset-selector-trigger",
                "aria-label": r,
                className: l,
                disabled: q,
                children: [o, u, w],
              })),
              (N[36] = q),
              (N[37] = r),
              (N[38] = l),
              (N[39] = o),
              (N[40] = u),
              (N[41] = w),
              (N[42] = j))
            : (j = N[42]),
          (c = d.A),
          (x = !0),
          (y = "start"),
          (h = "min-w-[10rem]"),
          N[43] !== O || N[44] !== C || N[45] !== B
            ? ((k = (e) => {
                let { asset: i, label: a, iconSrc: n } = e;
                return (0, t.jsxs)(
                  d.d,
                  {
                    "data-testid": `payment-asset-option-${i}`,
                    onClick: () => {
                      (C ? C(i) : B("usdc" === i), A(!1));
                    },
                    children: [
                      (0, t.jsx)(s.default, {
                        src: n,
                        width: 14,
                        height: 14,
                        alt: a,
                        className: "rounded-full",
                      }),
                      (0, t.jsx)("span", {
                        className: "font-medium text-text-primary",
                        children: a,
                      }),
                      (0, t.jsx)("span", {
                        className: "tabular-nums text-text-tertiary",
                        children: O(i),
                      }),
                    ],
                  },
                  i,
                );
              }),
              (N[43] = O),
              (N[44] = C),
              (N[45] = B),
              (N[46] = k))
            : (k = N[46]),
          (g = U.map(k)),
          (N[4] = O),
          (N[5] = q),
          (N[6] = C),
          (N[7] = T),
          (N[8] = S),
          (N[9] = B),
          (N[10] = $),
          (N[11] = c),
          (N[12] = b),
          (N[13] = x),
          (N[14] = y),
          (N[15] = h),
          (N[16] = g),
          (N[17] = _),
          (N[18] = v),
          (N[19] = j));
      } else
        ((c = N[11]),
          (b = N[12]),
          (x = N[13]),
          (y = N[14]),
          (h = N[15]),
          (g = N[16]),
          (_ = N[17]),
          (v = N[18]),
          (j = N[19]));
      return (
        N[47] !== c || N[48] !== x || N[49] !== y || N[50] !== h || N[51] !== g
          ? ((w = (0, t.jsx)(c, {
              dense: x,
              align: y,
              className: h,
              children: g,
            })),
            (N[47] = c),
            (N[48] = x),
            (N[49] = y),
            (N[50] = h),
            (N[51] = g),
            (N[52] = w))
          : (w = N[52]),
        N[53] !== b || N[54] !== w || N[55] !== _ || N[56] !== v || N[57] !== j
          ? ((k = (0, t.jsxs)(b, {
              open: _,
              onOpenChange: v,
              children: [j, w],
            })),
            (N[53] = b),
            (N[54] = w),
            (N[55] = _),
            (N[56] = v),
            (N[57] = j),
            (N[58] = k))
          : (k = N[58]),
        k
      );
    },
  ]);
};
