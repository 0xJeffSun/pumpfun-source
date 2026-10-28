// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    a = e.i(292686),
    s = e.i(985526),
    i = e.i(755793),
    r = e.i(213618),
    l = e.i(458310),
    m = e.i(352386);
  e.i(12692);
  var c = e.i(398902),
    o = e.i(909318),
    d = e.i(56087),
    u = e.i(618860),
    h = e.i(850175),
    x = e.i(609252),
    f = e.i(237237),
    p = e.i(595673),
    b = e.i(338319),
    y = e.i(952298);
  let _ = 0;
  function g(e) {
    let s,
      i,
      r,
      m,
      u,
      x,
      f,
      y,
      _,
      g,
      v,
      w = (0, n.c)(35),
      { trade: j, coin: N, ticker: k, imageUri: S } = e,
      { t: E } = (0, c.f)(),
      M = "buy" === j.side;
    w[0] !== N || w[1] !== j.mint
      ? ((s = N ?? (0, h.e)(j.mint)), (w[0] = N), (w[1] = j.mint), (w[2] = s))
      : (s = w[2]);
    let { prefetch: C, hoverProps: A } = (0, h.W)(s),
      R = `/coin/${j.mint}`;
    w[3] !== j.mint
      ? ((i = () =>
          (0, p.iV)({
            coinId: j.mint,
            itemPosition: 0,
            marketCap: 0,
            sourceScreen: a.Ae.MAYHEM,
            sourceElement: a.k9.EXPLICIT_NO_ELEMENT,
          })),
        (w[3] = j.mint),
        (w[4] = i))
      : (i = w[4]);
    let O = M ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative";
    (w[5] !== O
      ? ((r = (0, b.c)(
          "inline-flex h-5 items-center rounded-full px-[7px] font-bold text-[10px] tracking-[0.06em]",
          O,
        )),
        (w[5] = O),
        (w[6] = r))
      : (r = w[6]),
      w[7] !== M || w[8] !== E
        ? ((m = E(M ? "web.mayhem.side_buy" : "web.mayhem.side_sell")),
          (w[7] = M),
          (w[8] = E),
          (w[9] = m))
        : (m = w[9]),
      w[10] !== r || w[11] !== m
        ? ((u = (0, t.jsx)("span", { className: r, children: m })),
          (w[10] = r),
          (w[11] = m),
          (w[12] = u))
        : (u = w[12]),
      w[13] !== S || w[14] !== j.mint
        ? ((x = (0, t.jsx)("span", {
            className: "size-[18px] overflow-hidden rounded-full",
            children: (0, t.jsx)(o.f, {
              sourceImageUrl: S,
              mint: j.mint,
              imageType: d.d.COIN_IMAGE,
              alt: "",
              width: 18,
              height: 18,
              className: "size-full object-cover",
            }),
          })),
          (w[13] = S),
          (w[14] = j.mint),
          (w[15] = x))
        : (x = w[15]),
      w[16] !== k
        ? ((f = (0, t.jsx)("span", {
            className: "font-semibold",
            children: k,
          })),
          (w[16] = k),
          (w[17] = f))
        : (f = w[17]));
    let I = M ? "text-positive" : "text-negative";
    w[18] !== I
      ? ((y = (0, b.c)("font-medium tabular-nums", I)),
        (w[18] = I),
        (w[19] = y))
      : (y = w[19]);
    let T = M ? "+" : "−";
    if (w[20] !== j.amountSol) {
      var U;
      let e;
      ((e = (U = j.amountSol) >= 10 ? U.toFixed(1) : U.toFixed(2)),
        (_ = `${e} SOL`),
        (w[20] = j.amountSol),
        (w[21] = _));
    } else _ = w[21];
    return (
      w[22] !== y || w[23] !== T || w[24] !== _
        ? ((g = (0, t.jsxs)("span", { className: y, children: [T, _] })),
          (w[22] = y),
          (w[23] = T),
          (w[24] = _),
          (w[25] = g))
        : (g = w[25]),
      w[26] !== A ||
      w[27] !== C ||
      w[28] !== g ||
      w[29] !== R ||
      w[30] !== i ||
      w[31] !== u ||
      w[32] !== x ||
      w[33] !== f
        ? ((v = (0, t.jsxs)(l.default, {
            href: R,
            prefetch: C,
            ...A,
            onClick: i,
            className:
              "flex shrink-0 items-center gap-2.5 text-[13px] text-text-primary transition-opacity hover:opacity-80",
            children: [u, x, f, g],
          })),
          (w[26] = A),
          (w[27] = C),
          (w[28] = g),
          (w[29] = R),
          (w[30] = i),
          (w[31] = u),
          (w[32] = x),
          (w[33] = f),
          (w[34] = v))
        : (v = w[34]),
      v
    );
  }
  function v(e) {
    return e.mint;
  }
  e.s([
    "MayhemAgentFeed",
    0,
    function () {
      let e,
        a,
        l,
        o,
        d,
        h,
        p,
        w,
        j,
        N,
        k,
        S,
        E = (0, n.c)(30),
        { t: M } = (0, c.f)(),
        C = (function () {
          let e,
            t,
            a,
            r = (0, n.c)(3);
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = []), (r[0] = e))
            : (e = r[0]);
          let [l, c] = (0, m.useState)(e);
          return (
            r[1] === Symbol.for("react.memo_cache_sentinel")
              ? ((t = () => {
                  let e = (0, i.i)(s.N.Unified, f.N, (e) => {
                    let t = (0, y.f)(e);
                    if (!t) return;
                    let n = "string" == typeof e.mint ? e.mint : void 0;
                    if (!n) return;
                    let a = Number(e.amountSol);
                    Number.isFinite(a) &&
                      c((e) =>
                        [
                          { id: (_ += 1), mint: n, side: t.side, amountSol: a },
                          ...e,
                        ].slice(0, 6),
                      );
                  });
                  return () => {
                    (0, i.V)(s.N.Unified, e);
                  };
                }),
                (a = []),
                (r[1] = t),
                (r[2] = a))
              : ((t = r[1]), (a = r[2])),
            (0, m.useEffect)(t, a),
            l
          );
        })();
      E[0] !== C
        ? ((e = Array.from(new Set(C.map(v)))), (E[0] = C), (E[1] = e))
        : (e = E[1]);
      let A = e,
        R = Math.max(1, A.length),
        O = 0 === A.length;
      E[2] !== A || E[3] !== R || E[4] !== O
        ? ((a = {
            mints: A,
            limit: R,
            includeNsfw: !0,
            disabled: O,
            placeholderData: r.y,
          }),
          (E[2] = A),
          (E[3] = R),
          (E[4] = O),
          (E[5] = a))
        : (a = E[5]);
      let { coins: I } = (0, x.f)(a);
      if (E[6] !== I) {
        for (let e of ((l = new Map()), I)) e?.mint && l.set(e.mint, e);
        ((E[6] = I), (E[7] = l));
      } else l = E[7];
      let T = l,
        U = C.length > 0;
      E[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, b.c)(
            u.P,
            u.z,
            "flex h-[52px] items-center gap-4 overflow-hidden px-5",
          )),
          (E[8] = o))
        : (o = E[8]);
      let F = U
        ? "animate-pulse bg-positive shadow-[0_0_10px_rgba(134,239,172,0.8)]"
        : "bg-text-tertiary";
      (E[9] !== F
        ? ((d = (0, b.c)("size-[7px] rounded-full", F)),
          (E[9] = F),
          (E[10] = d))
        : (d = E[10]),
        E[11] !== d
          ? ((h = (0, t.jsx)("span", { className: d, "aria-hidden": !0 })),
            (E[11] = d),
            (E[12] = h))
          : (h = E[12]));
      let $ = U ? "text-positive" : "text-text-tertiary";
      return (
        E[13] !== M
          ? ((p = M("coin_details.live")), (E[13] = M), (E[14] = p))
          : (p = E[14]),
        E[15] !== $ || E[16] !== p
          ? ((w = (0, t.jsx)("span", { className: $, children: p })),
            (E[15] = $),
            (E[16] = p),
            (E[17] = w))
          : (w = E[17]),
        E[18] !== w || E[19] !== h
          ? ((j = (0, t.jsxs)("span", {
              className:
                "flex shrink-0 items-center gap-2 font-semibold text-[11px] uppercase tracking-[0.08em]",
              children: [h, w],
            })),
            (E[18] = w),
            (E[19] = h),
            (E[20] = j))
          : (j = E[20]),
        E[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((N = (0, t.jsx)("span", {
              className: "h-[18px] w-px shrink-0 bg-bg-quaternary",
              "aria-hidden": !0,
            })),
            (E[21] = N))
          : (N = E[21]),
        E[22] !== T || E[23] !== U || E[24] !== M || E[25] !== C
          ? ((k = U
              ? (0, t.jsx)("div", {
                  className:
                    "flex min-w-0 items-center gap-6 [mask-image:linear-gradient(90deg,#000_0,#000_90%,transparent_100%)]",
                  children: C.map((e) => {
                    var n;
                    let a = T.get(e.mint);
                    return (0, t.jsx)(
                      g,
                      {
                        trade: e,
                        coin: a,
                        ticker:
                          a?.symbol ??
                          ((n = e.mint).length > 8
                            ? `${n.slice(0, 4)}…${n.slice(-4)}`
                            : n),
                        imageUri: a?.image_uri ?? "",
                      },
                      e.id,
                    );
                  }),
                })
              : (0, t.jsx)("span", {
                  className: "truncate text-[13px] text-text-tertiary",
                  children: M("web.mayhem.waiting_next_agent_trade"),
                })),
            (E[22] = T),
            (E[23] = U),
            (E[24] = M),
            (E[25] = C),
            (E[26] = k))
          : (k = E[26]),
        E[27] !== j || E[28] !== k
          ? ((S = (0, t.jsxs)("div", { className: o, children: [j, N, k] })),
            (E[27] = j),
            (E[28] = k),
            (E[29] = S))
          : (S = E[29]),
        S
      );
    },
  ]);
};
