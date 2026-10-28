// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386),
    i = e.i(384524),
    n = e.i(745018),
    l = e.i(439587),
    s = e.i(365089),
    o = e.i(574472),
    c = e.i(213618);
  e.i(12692);
  var d = e.i(398902),
    u = e.i(63289),
    m = e.i(424273),
    f = e.i(548630),
    p = e.i(464456),
    h = e.i(449597);
  let b = new Set([
      "USDC",
      "USDT",
      "USDG",
      "PYUSD",
      "USD1",
      "USDE",
      "USDS",
      "USDP",
      "USDD",
      "USDY",
      "USDH",
      "USDB",
      "USDX",
      "DAI",
      "FDUSD",
      "TUSD",
      "BUSD",
      "GUSD",
      "FRAX",
      "EURC",
      "EURT",
      "CUSD",
      "UXD",
      "USDCET",
      "USDTET",
    ]),
    x = new Set([
      ...h.l,
      "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
      "2u1tszSeqZ3qBWF3uNGPFc8TzMk2tdiwknnRMWGWjGWH",
      "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
      "HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr",
    ]),
    g = ({ mint: e, symbol: t }) =>
      x.has(e) || b.has((t ?? "").trim().replace(/^\$/, "").toUpperCase());
  var y = e.i(551792),
    v = e.i(605587);
  let w = (e) =>
    "coin" === e.kind
      ? { mint: e.coin.mint, symbol: e.coin.symbol }
      : "position" === e.kind
        ? { mint: e.balance.mint, symbol: e.balance.coin?.symbol }
        : null;
  function _(e) {
    let a,
      i,
      n,
      l,
      s,
      o,
      c = (0, r.c)(22),
      { heading: u, rows: m, onUnhide: f, onUnhideAll: p, className: h } = e,
      { t: b } = (0, d.f)();
    return (
      c[0] !== m.length
        ? ((a =
            m.length > 0
              ? (0, t.jsx)("span", {
                  className:
                    "ml-1.5 rounded-sm bg-bg-tertiary px-1 text-[11px] tabular-nums text-text-secondary",
                  children: m.length,
                })
              : null),
          (c[0] = m.length),
          (c[1] = a))
        : (a = c[1]),
      c[2] !== u || c[3] !== a
        ? ((i = (0, t.jsxs)("p", {
            className: "text-[11px] font-normal text-text-quaternary",
            children: [u, a],
          })),
          (c[2] = u),
          (c[3] = a),
          (c[4] = i))
        : (i = c[4]),
      c[5] !== p || c[6] !== m.length || c[7] !== b
        ? ((n =
            m.length > 0
              ? (0, t.jsx)("button", {
                  type: "button",
                  onClick: p,
                  className:
                    "text-[11px] font-medium text-text-tertiary transition-colors hover:text-text-primary",
                  children: b("web.info_bar.show_all_hidden"),
                })
              : null),
          (c[5] = p),
          (c[6] = m.length),
          (c[7] = b),
          (c[8] = n))
        : (n = c[8]),
      c[9] !== i || c[10] !== n
        ? ((l = (0, t.jsxs)("div", {
            className: "flex items-center justify-between gap-2 px-2 pb-1",
            children: [i, n],
          })),
          (c[9] = i),
          (c[10] = n),
          (c[11] = l))
        : (l = c[11]),
      c[12] !== u || c[13] !== f || c[14] !== m || c[15] !== b
        ? ((s =
            m.length > 0
              ? (0, t.jsx)("ul", {
                  "aria-label": u,
                  className:
                    "mt-1 flex max-h-32 flex-col gap-0.5 overflow-y-auto",
                  children: m.map((e) =>
                    (0, t.jsxs)(
                      "li",
                      {
                        className:
                          "flex h-7 shrink-0 items-center justify-between gap-2 rounded-md px-2 text-[13px] transition-colors hover:bg-bg-quaternary",
                        children: [
                          (0, t.jsx)("span", {
                            className: "truncate font-medium text-text-primary",
                            children: e.label,
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            "aria-label": e.unhideLabel,
                            onClick: () => f(e.id),
                            className:
                              "shrink-0 text-[12px] font-medium text-text-tertiary transition-colors hover:text-text-primary",
                            children: b("web.info_bar.unhide"),
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                })
              : null),
          (c[12] = u),
          (c[13] = f),
          (c[14] = m),
          (c[15] = b),
          (c[16] = s))
        : (s = c[16]),
      c[17] !== h || c[18] !== u || c[19] !== l || c[20] !== s
        ? ((o = (0, t.jsxs)("div", {
            role: "group",
            "aria-label": u,
            className: h,
            children: [l, s],
          })),
          (c[17] = h),
          (c[18] = u),
          (c[19] = l),
          (c[20] = s),
          (c[21] = o))
        : (o = c[21]),
      o
    );
  }
  var j = e.i(942361),
    C = e.i(7283),
    N = e.i(693957),
    S = e.i(231417);
  let k = "h-7 gap-x-2 rounded-md px-2 text-[13px] font-medium",
    E = (e) => {
      if (!("ContextMenu" === e.key || ("F10" === e.key && e.shiftKey))) return;
      e.preventDefault();
      let t = e.currentTarget.getBoundingClientRect();
      e.currentTarget.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: t.left + 8,
          clientY: t.bottom,
        }),
      );
    },
    A = (e) =>
      (e.symbol ?? "").trim().replace(/^\$/, "") || (0, s.d)(e.mint, 4, 4);
  function I(e) {
    let a,
      i,
      l,
      s,
      o,
      c,
      u,
      m,
      f,
      p = (0, r.c)(23),
      {
        hideLabel: h,
        isStablecoin: b,
        onHide: x,
        onHideStablecoins: g,
        children: y,
      } = e,
      v = void 0 !== b && b,
      { t: w } = (0, d.f)();
    return (
      p[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(n.AD, { className: "size-2.5" })), (p[0] = a))
        : (a = p[0]),
      p[1] !== h || p[2] !== x
        ? ((i = (0, t.jsx)("button", {
            type: "button",
            tabIndex: -1,
            "aria-label": h,
            onClick: x,
            className:
              "absolute -right-2.5 top-1/2 hidden size-3 -translate-y-1/2 items-center justify-center rounded-full bg-bg-quaternary text-text-tertiary ring-1 ring-bg-primary transition-colors hover:text-text-primary group-hover/info-bar-row:flex",
            children: a,
          })),
          (p[1] = h),
          (p[2] = x),
          (p[3] = i))
        : (i = p[3]),
      p[4] !== y || p[5] !== i
        ? ((l = (0, t.jsxs)(j.f.Trigger, {
            className:
              "group/info-bar-row relative flex h-full shrink-0 items-center",
            onKeyDown: E,
            children: [y, i],
          })),
          (p[4] = y),
          (p[5] = i),
          (p[6] = l))
        : (l = p[6]),
      p[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(n.cT, { className: "size-3.5" })), (p[7] = s))
        : (s = p[7]),
      p[8] !== h
        ? ((o = (0, t.jsx)("span", {
            className: "min-w-0 flex-1 truncate",
            children: h,
          })),
          (p[8] = h),
          (p[9] = o))
        : (o = p[9]),
      p[10] !== x || p[11] !== o
        ? ((c = (0, t.jsxs)(S.f, {
            className: k,
            onClick: x,
            children: [s, o],
          })),
          (p[10] = x),
          (p[11] = o),
          (p[12] = c))
        : (c = p[12]),
      p[13] !== v || p[14] !== g || p[15] !== w
        ? ((u =
            v && g
              ? (0, t.jsxs)(S.f, {
                  className: k,
                  onClick: g,
                  children: [
                    (0, t.jsx)(n.cT, { className: "size-3.5" }),
                    (0, t.jsx)("span", {
                      className: "min-w-0 flex-1 truncate",
                      children: w("web.info_bar.hide_stablecoins"),
                    }),
                  ],
                })
              : null),
          (p[13] = v),
          (p[14] = g),
          (p[15] = w),
          (p[16] = u))
        : (u = p[16]),
      p[17] !== c || p[18] !== u
        ? ((m = (0, t.jsxs)(N.f, {
            className: "min-w-40 p-1",
            children: [c, u],
          })),
          (p[17] = c),
          (p[18] = u),
          (p[19] = m))
        : (m = p[19]),
      p[20] !== l || p[21] !== m
        ? ((f = (0, t.jsxs)(C.f.Root, { children: [l, m] })),
          (p[20] = l),
          (p[21] = m),
          (p[22] = f))
        : (f = p[22]),
      f
    );
  }
  var T = e.i(813792);
  function R(e) {
    let a,
      i = (0, r.c)(5),
      { content: n, children: l, side: s, delay: o } = e,
      c = void 0 === s ? "bottom" : s,
      d = void 0 === o ? 0 : o;
    return (
      i[0] !== l || i[1] !== n || i[2] !== d || i[3] !== c
        ? ((a = (0, t.jsx)(T.f, {
            side: c,
            delay: d,
            content: n,
            contentClassName: "max-w-[16rem]",
            children: l,
          })),
          (i[0] = l),
          (i[1] = n),
          (i[2] = d),
          (i[3] = c),
          (i[4] = a))
        : (a = i[4]),
      a
    );
  }
  var L = e.i(506486),
    O = e.i(562322),
    M = e.i(938277),
    D = e.i(146695),
    F = e.i(705313),
    P = e.i(458310),
    z = e.i(909318),
    K = e.i(56087),
    B = e.i(928529),
    H = e.i(926872),
    q = e.i(464649);
  function W(e) {
    let a,
      i = (0, r.c)(9),
      {
        mint: n,
        chainId: l,
        program: s,
        platform: o,
        size: c,
        className: d,
      } = e,
      u = void 0 === c ? 10 : c;
    if ((0, v.N)({ mint: n, chainId: l })) {
      let e;
      return (
        i[0] !== l || i[1] !== d || i[2] !== u
          ? ((e = (0, t.jsx)(H.f, { chainId: l, size: u, className: d })),
            (i[0] = l),
            (i[1] = d),
            (i[2] = u),
            (i[3] = e))
          : (e = i[3]),
        e
      );
    }
    let m = (o ?? "pump") === "pump" && "pump" === s,
      f = m ? "/pump-logomark.svg" : q.T.solana,
      p = m ? "Pump" : "Solana";
    return (
      i[4] !== d || i[5] !== p || i[6] !== u || i[7] !== f
        ? ((a = (0, t.jsx)(B.default, {
            src: f,
            alt: p,
            title: p,
            width: u,
            height: u,
            className: d,
          })),
          (i[4] = d),
          (i[5] = p),
          (i[6] = u),
          (i[7] = f),
          (i[8] = a))
        : (a = i[8]),
      a
    );
  }
  var U = e.i(322315),
    V = e.i(254010),
    G = e.i(690877),
    $ = e.i(520669);
  function Q(e) {
    return e.pnlPeriod;
  }
  var Z = e.i(850175);
  e.i(267146);
  var Y = e.i(540805),
    X = e.i(662093),
    J = e.i(42095),
    ee = e.i(369091),
    et = e.i(653805);
  let er = "max-w-24 truncate text-[12px] font-medium text-text-secondary",
    ea = "text-[12px] font-medium tabular-nums",
    ei = `${ea} text-text-primary`,
    en = `${ea} text-text-tertiary`,
    el = `${ea} text-gain`,
    es = `${ea} text-loss`,
    eo = (e) => `$${(0, M.M)(e)}`;
  function ec(e) {
    let a,
      i,
      n,
      l = (0, r.c)(7),
      { title: s, statLabel: o } = e;
    return (
      l[0] !== s
        ? ((a = (0, t.jsx)("p", {
            className: "font-medium text-text-primary",
            children: s,
          })),
          (l[0] = s),
          (l[1] = a))
        : (a = l[1]),
      l[2] !== o
        ? ((i = (0, t.jsx)("p", {
            className: "text-text-tertiary",
            children: o,
          })),
          (l[2] = o),
          (l[3] = i))
        : (i = l[3]),
      l[4] !== a || l[5] !== i
        ? ((n = (0, t.jsxs)(t.Fragment, { children: [a, i] })),
          (l[4] = a),
          (l[5] = i),
          (l[6] = n))
        : (n = l[6]),
      n
    );
  }
  function ed(e) {
    let a,
      i,
      n,
      l = (0, r.c)(11),
      {
        href: s,
        tooltipTitle: o,
        tooltipStatLabel: c,
        coin: d,
        children: u,
      } = e,
      { prefetch: m, hoverProps: f } = (0, Z.W)(d);
    return (
      l[0] !== c || l[1] !== o
        ? ((a = (0, t.jsx)(ec, { title: o, statLabel: c })),
          (l[0] = c),
          (l[1] = o),
          (l[2] = a))
        : (a = l[2]),
      l[3] !== u || l[4] !== f || l[5] !== s || l[6] !== m
        ? ((i = (0, t.jsx)(P.default, {
            href: s,
            prefetch: m,
            className:
              "flex h-full shrink-0 items-center gap-1.5 rounded-sm px-1.5 transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            ...f,
            children: u,
          })),
          (l[3] = u),
          (l[4] = f),
          (l[5] = s),
          (l[6] = m),
          (l[7] = i))
        : (i = l[7]),
      l[8] !== a || l[9] !== i
        ? ((n = (0, t.jsx)(R, { delay: 400, content: a, children: i })),
          (l[8] = a),
          (l[9] = i),
          (l[10] = n))
        : (n = l[10]),
      n
    );
  }
  function eu(e) {
    let a,
      i,
      n,
      l = (0, r.c)(12),
      {
        mint: s,
        imageUri: o,
        name: c,
        chainId: d,
        program: u,
        platform: m,
      } = e;
    return (
      l[0] !== o || l[1] !== s || l[2] !== c
        ? ((a = (0, t.jsx)(z.f, {
            sourceImageUrl: o,
            mint: s,
            imageType: K.d.COIN_IMAGE,
            alt: c,
            width: 32,
            height: 32,
            className: "size-4 rounded-sm bg-bg-secondary object-cover",
            loading: "lazy",
          })),
          (l[0] = o),
          (l[1] = s),
          (l[2] = c),
          (l[3] = a))
        : (a = l[3]),
      l[4] !== d || l[5] !== s || l[6] !== m || l[7] !== u
        ? ((i = (0, t.jsx)("span", {
            className:
              "absolute -bottom-0.5 -right-0.5 flex size-2 items-center justify-center overflow-hidden rounded-full bg-bg-primary ring-1 ring-bg-primary",
            children: (0, t.jsx)(W, {
              mint: s,
              chainId: d,
              program: u,
              platform: m,
              size: 8,
              className: "size-full rounded-full object-contain",
            }),
          })),
          (l[4] = d),
          (l[5] = s),
          (l[6] = m),
          (l[7] = u),
          (l[8] = i))
        : (i = l[8]),
      l[9] !== a || l[10] !== i
        ? ((n = (0, t.jsxs)("span", {
            className: "relative shrink-0",
            children: [a, i],
          })),
          (l[9] = a),
          (l[10] = i),
          (l[11] = n))
        : (n = l[11]),
      n
    );
  }
  function em(e) {
    let a,
      i,
      n,
      l,
      o,
      c,
      d,
      u = (0, r.c)(25),
      { coin: m } = e;
    u[0] !== m
      ? ((a = {
          mint: m.mint,
          chainId: m.chain_id,
          fallbackMarketCap: m.usd_market_cap,
          coin: m,
        }),
        (u[0] = m),
        (u[1] = a))
      : (a = u[1]);
    let f = (0, X.h)(a);
    u[2] !== m.mint || u[3] !== m.symbol
      ? ((i = (m.symbol ?? "").replace(/^\$/, "") || (0, s.d)(m.mint, 4, 4)),
        (u[2] = m.mint),
        (u[3] = m.symbol),
        (u[4] = i))
      : (i = u[4]);
    let p = i,
      h = `/coin/${m.mint}`,
      b = m.name || p,
      x = m.image_uri ?? "",
      g = m.name ?? p;
    return (
      u[5] !== m.chain_id ||
      u[6] !== m.mint ||
      u[7] !== m.platform ||
      u[8] !== m.program ||
      u[9] !== x ||
      u[10] !== g
        ? ((n = (0, t.jsx)(eu, {
            mint: m.mint,
            imageUri: x,
            name: g,
            chainId: m.chain_id,
            program: m.program,
            platform: m.platform,
          })),
          (u[5] = m.chain_id),
          (u[6] = m.mint),
          (u[7] = m.platform),
          (u[8] = m.program),
          (u[9] = x),
          (u[10] = g),
          (u[11] = n))
        : (n = u[11]),
      u[12] !== p
        ? ((l = (0, t.jsx)("span", { className: er, children: p })),
          (u[12] = p),
          (u[13] = l))
        : (l = u[13]),
      u[14] !== f
        ? ((o = f && Number.isFinite(f) ? eo(f) : "–"),
          (u[14] = f),
          (u[15] = o))
        : (o = u[15]),
      u[16] !== o
        ? ((c = (0, t.jsx)("span", {
            "data-testid": "info-bar-coin-mcap",
            className: ei,
            children: o,
          })),
          (u[16] = o),
          (u[17] = c))
        : (c = u[17]),
      u[18] !== m ||
      u[19] !== c ||
      u[20] !== h ||
      u[21] !== b ||
      u[22] !== n ||
      u[23] !== l
        ? ((d = (0, t.jsxs)(ed, {
            href: h,
            tooltipTitle: b,
            tooltipStatLabel: "Market cap",
            coin: m,
            children: [n, l, c],
          })),
          (u[18] = m),
          (u[19] = c),
          (u[20] = h),
          (u[21] = b),
          (u[22] = n),
          (u[23] = l),
          (u[24] = d))
        : (d = u[24]),
      d
    );
  }
  function ef(e) {
    let a,
      i,
      n,
      l,
      o,
      c,
      d,
      u,
      m,
      f,
      p,
      h = (0, r.c)(33),
      { balance: b } = e;
    h[0] !== b.mint
      ? ((a = (e) => e.coins[b.mint]), (h[0] = b.mint), (h[1] = a))
      : (a = h[1]);
    let x = (0, et.x)(a);
    if (h[2] !== b || h[3] !== x) {
      let e,
        r = (0, J.r)(b, x);
      h[12] !== b.coin?.symbol || h[13] !== b.mint
        ? ((e = b.coin?.symbol?.replace(/^\$/, "") || (0, s.d)(b.mint, 4, 4)),
          (h[12] = b.coin?.symbol),
          (h[13] = b.mint),
          (h[14] = e))
        : (e = h[14]);
      let a = e;
      ((i = ed),
        (o = `/coin/${b.mint}`),
        (c = b.coin?.name || a),
        (d = "Position value"));
      let f = b.coin?.image_uri ?? "",
        p = b.coin?.name ?? a;
      (h[15] !== b.chainId || h[16] !== b.mint || h[17] !== f || h[18] !== p
        ? ((u = (0, t.jsx)(eu, {
            mint: b.mint,
            imageUri: f,
            name: p,
            chainId: b.chainId,
          })),
          (h[15] = b.chainId),
          (h[16] = b.mint),
          (h[17] = f),
          (h[18] = p),
          (h[19] = u))
        : (u = h[19]),
        h[20] !== a
          ? ((m = (0, t.jsx)("span", { className: er, children: a })),
            (h[20] = a),
            (h[21] = m))
          : (m = h[21]),
        (n = ei),
        (l = Number.isFinite(r) ? eo(r) : "–"),
        (h[2] = b),
        (h[3] = x),
        (h[4] = i),
        (h[5] = n),
        (h[6] = l),
        (h[7] = o),
        (h[8] = c),
        (h[9] = d),
        (h[10] = u),
        (h[11] = m));
    } else
      ((i = h[4]),
        (n = h[5]),
        (l = h[6]),
        (o = h[7]),
        (c = h[8]),
        (d = h[9]),
        (u = h[10]),
        (m = h[11]));
    return (
      h[22] !== n || h[23] !== l
        ? ((f = (0, t.jsx)("span", { className: n, children: l })),
          (h[22] = n),
          (h[23] = l),
          (h[24] = f))
        : (f = h[24]),
      h[25] !== i ||
      h[26] !== o ||
      h[27] !== c ||
      h[28] !== d ||
      h[29] !== u ||
      h[30] !== m ||
      h[31] !== f
        ? ((p = (0, t.jsxs)(i, {
            href: o,
            tooltipTitle: c,
            tooltipStatLabel: d,
            children: [u, m, f],
          })),
          (h[25] = i),
          (h[26] = o),
          (h[27] = c),
          (h[28] = d),
          (h[29] = u),
          (h[30] = m),
          (h[31] = f),
          (h[32] = p))
        : (p = h[32]),
      p
    );
  }
  function ep(e) {
    let a,
      i,
      n,
      l,
      s,
      o,
      c,
      d = (0, r.c)(24),
      { profile: u, pnl: m } = e,
      { ipfsPrefix: f } = (0, ee.useIpfsPrefix)(),
      p = (0, y.L)(eh),
      h = !m;
    d[0] !== u.address || d[1] !== h
      ? ((a = { address: u.address, enabled: h }),
        (d[0] = u.address),
        (d[1] = h),
        (d[2] = a))
      : (a = d[2]);
    let { pnlUsd: b, isLoading: x } = (function (e) {
        let t,
          a,
          i,
          n,
          l = (0, r.c)(14),
          { address: s, enabled: o } = e,
          c = void 0 === o || o,
          d = (0, y.L)(Q),
          u = (0, V.k)(U.D.PORTFOLIO_LIVE_REPRICE);
        (l[0] !== s || l[1] !== d
          ? ((t = $.g.wallet(s, d)), (l[0] = s), (l[1] = d), (l[2] = t))
          : (t = l[2]),
          l[3] !== s || l[4] !== d || l[5] !== u
            ? ((a = () =>
                (0, $.v)(
                  u
                    ? { user: s, period: d, holdings: !0 }
                    : { user: s, period: d },
                )),
              (l[3] = s),
              (l[4] = d),
              (l[5] = u),
              (l[6] = a))
            : (a = l[6]),
          l[7] !== c || l[8] !== t || l[9] !== a
            ? ((i = {
                queryKey: t,
                queryFn: a,
                enabled: c,
                staleTime: 6e4,
                refetchInterval: 12e4,
                retry: 1,
              }),
              (l[7] = c),
              (l[8] = t),
              (l[9] = a),
              (l[10] = i))
            : (i = l[10]));
        let { data: m, isLoading: f } = (0, G.useQuery)(i),
          p = m?.pnl.usd ?? null;
        return (
          l[11] !== f || l[12] !== p
            ? ((n = { pnlUsd: p, isLoading: f }),
              (l[11] = f),
              (l[12] = p),
              (l[13] = n))
            : (n = l[13]),
          n
        );
      })(a),
      g = m ? m.usd : b,
      v = m?.label ?? `PnL (${y.K[p]})`;
    d[3] !== u ? ((i = (0, O.f)(u)), (d[3] = u), (d[4] = i)) : (i = d[4]);
    let w = i;
    d[5] !== u.address || d[6] !== u.userId
      ? ((n = (0, D.$)({ address: u.address, userId: u.userId })),
        (d[5] = u.address),
        (d[6] = u.userId),
        (d[7] = n))
      : (n = d[7]);
    let _ = n;
    if (!_) return null;
    let j = u.profile_image ?? void 0;
    return (
      d[8] !== f || d[9] !== u.address || d[10] !== j
        ? ((l = (0, t.jsx)(F.f, {
            address: u.address,
            src: j,
            alt: "",
            width: 32,
            height: 32,
            ipfsPrefix: f,
            isAnonymous: !1,
            className:
              "size-4 shrink-0 rounded-full bg-bg-secondary object-cover",
          })),
          (d[8] = f),
          (d[9] = u.address),
          (d[10] = j),
          (d[11] = l))
        : (l = d[11]),
      d[12] !== w
        ? ((s = (0, t.jsx)("span", { className: er, children: w })),
          (d[12] = w),
          (d[13] = s))
        : (s = d[13]),
      d[14] !== x || d[15] !== g
        ? ((o = x
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "h-3 w-10 shrink-0 animate-pulse rounded bg-bg-quaternary",
              })
            : null === g
              ? (0, t.jsx)("span", { className: en, children: "–" })
              : (0, t.jsx)("span", {
                  className: g < 0 ? es : el,
                  children: (0, Y.u)(g),
                })),
          (d[14] = x),
          (d[15] = g),
          (d[16] = o))
        : (o = d[16]),
      d[17] !== _ ||
      d[18] !== w ||
      d[19] !== v ||
      d[20] !== l ||
      d[21] !== s ||
      d[22] !== o
        ? ((c = (0, t.jsxs)(ed, {
            href: _,
            tooltipTitle: w,
            tooltipStatLabel: v,
            children: [l, s, o],
          })),
          (d[17] = _),
          (d[18] = w),
          (d[19] = v),
          (d[20] = l),
          (d[21] = s),
          (d[22] = o),
          (d[23] = c))
        : (c = d[23]),
      c
    );
  }
  function eh(e) {
    return e.pnlPeriod;
  }
  var eb = e.i(303599),
    ex = e.i(779106);
  function eg(e, t) {
    return (t.followers ?? 0) - (e.followers ?? 0);
  }
  function ey(e) {
    return !!e?.address;
  }
  var ev = e.i(985526),
    ew = e.i(689943),
    e_ = e.i(390065);
  function ej(e) {
    return e.updateCoin;
  }
  var eC = e.i(606933),
    eN = e.i(628959),
    eS = e.i(38279),
    ek = e.i(261756),
    eE = e.i(947305),
    eA = e.i(834247),
    eI = e.i(957487),
    eT = e.i(582453),
    eR = e.i(699365);
  let eL = (e) => Number(e.balanceUSD) || 0,
    eO = (e, t) => (0, eA.f)(e.coin?.creator, t);
  var eM = e.i(864024);
  function eD(e) {
    return {
      address: e.walletAddress,
      username: e.username,
      profile_image: e.profileImage,
      pnlUsd: e.pnlUsd,
    };
  }
  function eF(e) {
    return !!e.walletAddress;
  }
  var eP = e.i(960107),
    ez = e.i(906032);
  function eK(e) {
    let { id: t, name: r } = e;
    return { id: t, name: r };
  }
  function eB(e) {
    return "default" !== e.name && !(0, eP.S)(e.id);
  }
  function eH(e) {
    return e.id === eP.J;
  }
  var eq = e.i(66732),
    eW = e.i(132838),
    eU = e.i(768359),
    eV = e.i(759257);
  let eG = { potentialSpam: !0, userMarkedNonSpam: !1 },
    e$ = (e, t) => (0, eT.f)(e) === (0, eT.f)(t),
    eQ = (e, t, r) =>
      e
        ? {
            ...e,
            pages: e.pages.map((e) => ({
              ...e,
              positions: e.positions.map((e) =>
                e$(e.coinMint, t)
                  ? {
                      ...e,
                      potentialSpam: r.potentialSpam,
                      userMarkedNonSpam: r.userMarkedNonSpam,
                    }
                  : e,
              ),
            })),
          }
        : e,
    eZ = (e, t) => {
      for (let [, r] of e)
        for (let e of r?.pages ?? []) {
          let r = e.positions.find((e) => e$(e.coinMint, t));
          if (r)
            return {
              potentialSpam: r.potentialSpam,
              userMarkedNonSpam: r.userMarkedNonSpam,
            };
        }
    };
  async function eY(e) {
    let { mint: t } = e;
    await (0, eV.j)()("POST /user-portfolio/spam/{mint}", {
      params: { mint: t },
      credentials: "include",
      parseJson: eJ,
      throwHttpErrors: !1,
      hooks: { afterResponse: [eX] },
    });
  }
  function eX(e, t, r) {
    if (!r.ok) throw Error(`Failed to mark position as spam: ${r.status}`);
  }
  function eJ() {}
  let e1 = { potentialSpam: !1, userMarkedNonSpam: void 0 };
  async function e0(e) {
    let { mint: t } = e;
    await (0, eV.j)()("DELETE /user-portfolio/spam/{mint}", {
      params: { mint: t },
      credentials: "include",
      parseJson: e3,
      throwHttpErrors: !1,
      hooks: { afterResponse: [e2] },
    });
  }
  function e2(e, t, r) {
    if (!r.ok) throw Error(`Failed to unmark position as spam: ${r.status}`);
  }
  function e3() {}
  var e4 = e.i(117339),
    e5 = e.i(213289),
    e6 = e.i(10738),
    e8 = e.i(170450),
    e7 = e.i(48485),
    e9 = e.i(595673),
    te = e.i(338319),
    tt = e.i(187611);
  let tr = {},
    ta = {},
    ti =
      "flex size-6 shrink-0 items-center justify-center rounded-sm text-text-quaternary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
    tn = "px-2 pb-1 text-[11px] font-normal text-text-quaternary",
    tl = "px-2 pt-1 text-[11px] leading-snug text-text-tertiary",
    ts =
      "flex h-7 w-full items-center justify-center rounded-md border border-border-tertiary px-2 text-[12px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text-secondary",
    to = new Set(["following", "recents"]),
    tc = (e) => [
      {
        value: "watchlist",
        label: e("home.tabs.watchlist"),
        Icon: n.G3,
        needsAuth: !1,
      },
      {
        value: "positions",
        label: e("web.info_bar.positions"),
        Icon: n.Of,
        needsAuth: !0,
      },
      {
        value: "following",
        label: e("common.following"),
        Icon: n._3,
        needsAuth: !0,
      },
      {
        value: "recents",
        label: e("profile.recently_viewed"),
        Icon: n.s6,
        needsAuth: !1,
      },
    ];
  function td() {
    let e,
      i,
      l,
      s,
      f,
      p,
      h,
      b,
      x,
      _,
      j,
      C,
      N,
      S,
      k,
      E,
      T,
      M,
      D,
      F,
      P,
      z,
      K,
      B,
      H,
      q,
      W,
      U,
      V,
      $,
      Q,
      Z,
      Y,
      X,
      ee,
      er,
      ea,
      ei,
      en,
      el = (0, r.c)(177),
      { t: es } = (0, d.f)(),
      eo = (0, e8.f)(),
      ec = (0, e6.f)("(max-width: 767.98px)"),
      { address: ed } = (0, o.F)(),
      eu = !!ed,
      eh = (0, y.L)(tz),
      eA = (0, y.L)(tP),
      eq = (0, y.L)(tF),
      eV = (0, y.L)(tD),
      e$ = (0, y.L)(tM),
      eX = (0, y.L)(tO),
      eJ = (0, y.L)(tL),
      e2 = (0, y.L)(tR),
      e3 = (0, y.L)(tT),
      tt = (0, y.L)(tI),
      tn = (0, y.L)(tA),
      tl = (0, y.L)(tE),
      ts = (0, y.L)(tk),
      to = (0, y.L)(tS),
      td = (0, y.L)(tN),
      tH = (0, y.L)(tC),
      tq = eo ? eh : "watchlist",
      tU = eo ? eq : ez.f,
      tV = eo ? eJ : tr,
      tG = eo ? e2 : ta,
      t$ = eo && e3,
      tQ = eo && !ec,
      tZ = "watchlist" === tq && eo && !eu ? "top-traders" : tq,
      tY = tQ && eu;
    el[0] !== tY || el[1] !== tU
      ? ((e = { enabled: tY, watchlistId: tU }),
        (el[0] = tY),
        (el[1] = tU),
        (el[2] = e))
      : (e = el[2]);
    let tX = (function (e) {
      let t,
        a,
        i,
        n,
        l = (0, r.c)(11),
        { enabled: s, watchlistId: o } = e,
        { bookmarks: c } = (0, eP.j)(!1, s);
      l[0] !== c || l[1] !== s
        ? ((t = s && !c.some(eH)), (l[0] = c), (l[1] = s), (l[2] = t))
        : (t = l[2]);
      let d = t;
      l[3] !== c || l[4] !== d || l[5] !== o
        ? ((a = c.filter(eB).map(eK)),
          (i = o === ez.f || !d || a.some((e) => e.id === o) ? o : ez.f),
          (l[3] = c),
          (l[4] = d),
          (l[5] = o),
          (l[6] = a),
          (l[7] = i))
        : ((a = l[6]), (i = l[7]));
      let u = i;
      return (
        l[8] !== u || l[9] !== a
          ? ((n = { customLists: a, activeWatchlistId: u }),
            (l[8] = u),
            (l[9] = a),
            (l[10] = n))
          : (n = l[10]),
        n
      );
    })(e);
    el[3] !== tX.activeWatchlistId
      ? ((i = (e) => e.id === tX.activeWatchlistId),
        (el[3] = tX.activeWatchlistId),
        (el[4] = i))
      : (i = el[4]);
    let tJ = tX.customLists.find(i),
      t1 = tQ && "watchlist" === tq && eu;
    el[5] !== t1 || el[6] !== tX.activeWatchlistId
      ? ((l = { enabled: t1, bookmarkId: tX.activeWatchlistId }),
        (el[5] = t1),
        (el[6] = tX.activeWatchlistId),
        (el[7] = l))
      : (l = el[7]);
    let t0 = (0, m.f)(l),
      t2 = tQ && "top-traders" === tZ;
    el[8] !== t2
      ? ((s = { enabled: t2 }), (el[8] = t2), (el[9] = s))
      : (s = el[9]);
    let t3 = (function (e) {
        let t,
          a,
          i,
          n = (0, r.c)(8),
          { enabled: l } = e;
        n[0] !== l
          ? ((t = { period: "daily", sort: "combined", limit: 20, enabled: l }),
            (n[0] = l),
            (n[1] = t))
          : (t = n[1]);
        let s = (0, eM.f)(t);
        e: {
          let e;
          if (!s.data) {
            a = void 0;
            break e;
          }
          (n[2] !== s.data.entries
            ? ((e = s.data.entries.filter(eF).slice(0, 20).map(eD)),
              (n[2] = s.data.entries),
              (n[3] = e))
            : (e = n[3]),
            (a = e));
        }
        let o = a;
        return (
          n[4] !== o || n[5] !== s.isError || n[6] !== s.isLoading
            ? ((i = { data: o, isLoading: s.isLoading, isError: s.isError }),
              (n[4] = o),
              (n[5] = s.isError),
              (n[6] = s.isLoading),
              (n[7] = i))
            : (i = n[7]),
          i
        );
      })(s),
      t4 = tQ && "positions" === tq;
    el[10] !== ed || el[11] !== t4
      ? ((f = { address: ed, enabled: t4 }),
        (el[10] = ed),
        (el[11] = t4),
        (el[12] = f))
      : (f = el[12]);
    let t5 = (function (e) {
        let t,
          i,
          n,
          l,
          s,
          o,
          c,
          d,
          u,
          m,
          f,
          p = (0, r.c)(42),
          { address: h, enabled: b } = e,
          x = (0, eC.useQueryClient)(),
          g = b && !!h,
          y = (0, a.useRef)(null);
        (p[0] !== h || p[1] !== x
          ? ((t = () => {
              (y.current && clearTimeout(y.current),
                (y.current = setTimeout(() => {
                  x.invalidateQueries({
                    queryKey: ["tokenInfoBar", "positions", h],
                  });
                }, 1e3)));
            }),
            (p[0] = h),
            (p[1] = x),
            (p[2] = t))
          : (t = p[2]),
          p[3] !== h || p[4] !== g || p[5] !== t
            ? ((i = { walletAddress: h, enabled: g, onBalanceChange: t }),
              (p[3] = h),
              (p[4] = g),
              (p[5] = t),
              (p[6] = i))
            : (i = p[6]),
          (0, eN.f)(i),
          p[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = () => () => {
                y.current && clearTimeout(y.current);
              }),
              (l = []),
              (p[7] = n),
              (p[8] = l))
            : ((n = p[7]), (l = p[8])),
          (0, a.useEffect)(n, l),
          p[9] !== h
            ? ((s = ["tokenInfoBar", "positions", h]), (p[9] = h), (p[10] = s))
            : (s = p[10]),
          p[11] !== h
            ? ((o = async () => {
                let e,
                  t = await fetch(
                    `${eS.C.PROFILE}/balance/tokens/${h}?page=1&size=30&chain=all`,
                  );
                if (404 === t.status) return [];
                if (!t.ok)
                  throw Error(`Failed to fetch positions: ${t.status}`);
                let r = await t.json();
                return (
                  (e = (r?.data?.tokens ?? []).map(J.S)),
                  (0, J.f)(e)
                    .filter((e) => !(0, eR.P)(e.mint))
                    .sort((e, t) => eL(t) - eL(e))
                );
              }),
              (p[11] = h),
              (p[12] = o))
            : (o = p[12]),
          p[13] !== g || p[14] !== s || p[15] !== o
            ? ((c = {
                queryKey: s,
                enabled: g,
                staleTime: 3e4,
                refetchInterval: 6e4,
                queryFn: o,
              }),
              (p[13] = g),
              (p[14] = s),
              (p[15] = o),
              (p[16] = c))
            : (c = p[16]));
        let v = (0, G.useQuery)(c);
        p[17] !== h || p[18] !== g
          ? ((d = { address: h, enabled: g }),
            (p[17] = h),
            (p[18] = g),
            (p[19] = d))
          : (d = p[19]);
        let w = (0, eE.y)(d);
        p[20] !== h || p[21] !== g
          ? ((u = { address: h, enabled: g }),
            (p[20] = h),
            (p[21] = g),
            (p[22] = u))
          : (u = p[22]);
        let _ = (0, ek.$)(u);
        e: {
          let e,
            t,
            r,
            a,
            i = v.data;
          if (!i) {
            m = void 0;
            break e;
          }
          let n = _.data ?? null;
          p[23] !== h || p[24] !== i || p[25] !== w.data
            ? ((e = (e) =>
                i.filter(
                  (t) =>
                    !((e, t) => {
                      if (
                        t.spamMints?.has((0, eT.f)(e.mint)) &&
                        !eO(e, t.ownerAddress)
                      )
                        return !0;
                      let r = t.dustFloorUsd;
                      return null != r && r > 0 && eL(e) < r;
                    })(t, {
                      spamMints: w.data,
                      dustFloorUsd: e,
                      ownerAddress: h,
                    }),
                )),
              (p[23] = h),
              (p[24] = i),
              (p[25] = w.data),
              (p[26] = e))
            : (e = p[26]);
          let l = e,
            s = n ?? eI.B;
          p[27] !== s || p[28] !== l
            ? ((t = l(s)), (p[27] = s), (p[28] = l), (p[29] = t))
            : (t = p[29]);
          let o = t;
          p[30] !== o || p[31] !== n || p[32] !== l
            ? ((r = 0 === o.length && null === n ? l(null) : o),
              (p[30] = o),
              (p[31] = n),
              (p[32] = l),
              (p[33] = r))
            : (r = p[33]);
          let c = r,
            d = i.length - c.length;
          (p[34] !== c || p[35] !== d
            ? ((a = { shown: c, hiddenCount: d }),
              (p[34] = c),
              (p[35] = d),
              (p[36] = a))
            : (a = p[36]),
            (m = a));
        }
        let j = m,
          C = w.isLoading || _.isLoading,
          N = C ? void 0 : j?.shown,
          S = C ? 0 : (j?.hiddenCount ?? 0),
          k = v.isLoading || C;
        return (
          p[37] !== v.isError || p[38] !== N || p[39] !== S || p[40] !== k
            ? ((f = {
                data: N,
                ownerHiddenCount: S,
                isLoading: k,
                isError: v.isError,
              }),
              (p[37] = v.isError),
              (p[38] = N),
              (p[39] = S),
              (p[40] = k),
              (p[41] = f))
            : (f = p[41]),
          f
        );
      })(f),
      t6 = tQ && "following" === tq;
    el[13] !== t6
      ? ((p = { enabled: t6 }), (el[13] = t6), (el[14] = p))
      : (p = el[14]);
    let t8 = (function (e) {
        let t,
          a,
          i,
          n,
          l = (0, r.c)(11),
          { enabled: s } = e,
          o = (0, ex.f)("viewer-following");
        l[0] !== o ? ((t = (0, eb.Q)(o)), (l[0] = o), (l[1] = t)) : (t = l[1]);
        let c = s && !!o;
        l[2] !== t || l[3] !== c
          ? ((a = { ...t, enabled: c }), (l[2] = t), (l[3] = c), (l[4] = a))
          : (a = l[4]);
        let d = (0, G.useQuery)(a);
        e: {
          let e;
          if (!d.data) {
            i = void 0;
            break e;
          }
          (l[5] !== d.data
            ? ((e = [...d.data].filter(ey).sort(eg).slice(0, 20)),
              (l[5] = d.data),
              (l[6] = e))
            : (e = l[6]),
            (i = e));
        }
        let u = i;
        return (
          l[7] !== u || l[8] !== d.isError || l[9] !== d.isLoading
            ? ((n = { data: u, isLoading: d.isLoading, isError: d.isError }),
              (l[7] = u),
              (l[8] = d.isError),
              (l[9] = d.isLoading),
              (l[10] = n))
            : (n = l[10]),
          n
        );
      })(p),
      [t7, , t9, re] = (0, e4.U)(),
      [rt, , rr] = (0, e5.f)();
    el[15] !== tQ || el[16] !== tq || el[17] !== t7
      ? ((h = tQ && "recents" === tq ? t7.map(tj) : []),
        (el[15] = tQ),
        (el[16] = tq),
        (el[17] = t7),
        (el[18] = h))
      : (h = el[18]);
    let ra = h,
      ri = 0 === ra.length;
    el[19] !== ri
      ? ((b = {
          disabled: ri,
          includeNsfw: !0,
          refetchInterval: 6e4,
          placeholderData: c.y,
        }),
        (el[19] = ri),
        (el[20] = b))
      : (b = el[20]);
    let { data: rn } = (0, ew.V)(ra, b);
    e: {
      let e;
      if (!tQ) {
        let e;
        (el[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = []), (el[21] = e))
          : (e = el[21]),
          (x = e));
        break e;
      }
      if ("top-traders" === tZ) {
        let e, t;
        if (
          (el[22] !== t3.data
            ? ((e = t3.data ?? []), (el[22] = t3.data), (el[23] = e))
            : (e = el[23]),
          el[24] !== es || el[25] !== e)
        ) {
          let r;
          (el[27] !== es
            ? ((r = (e) => ({
                kind: "profile",
                profile: {
                  address: e.address,
                  username: e.username,
                  profile_image: e.profile_image,
                },
                pnl: {
                  usd: e.pnlUsd,
                  label: es("web.info_bar.top_traders_pnl_label"),
                },
              })),
              (el[27] = es),
              (el[28] = r))
            : (r = el[28]),
            (t = e.map(r)),
            (el[24] = es),
            (el[25] = e),
            (el[26] = t));
        } else t = el[26];
        x = t;
        break e;
      }
      if ("watchlist" === tq) {
        let e;
        (el[29] !== t0.coins
          ? ((e = t0.coins.map(t_)), (el[29] = t0.coins), (el[30] = e))
          : (e = el[30]),
          (x = e));
        break e;
      }
      if ("positions" === tq) {
        let e, t;
        (el[31] !== t5.data
          ? ((e = t5.data ?? []), (el[31] = t5.data), (el[32] = e))
          : (e = el[32]),
          el[33] !== e
            ? ((t = e.map(tw)), (el[33] = e), (el[34] = t))
            : (t = el[34]),
          (x = t));
        break e;
      }
      if ("following" === tq) {
        let e, t;
        (el[35] !== t8.data
          ? ((e = t8.data ?? []), (el[35] = t8.data), (el[36] = e))
          : (e = el[36]),
          el[37] !== e
            ? ((t = e.map(tv)), (el[37] = e), (el[38] = t))
            : (t = el[38]),
          (x = t));
        break e;
      }
      if (el[39] !== rn || el[40] !== re || el[41] !== t7 || el[42] !== rt) {
        let t = new Map((rn ?? []).map(ty));
        ((e = [
          ...t7.map((e, r) => ({
            item: { kind: "coin", coin: t.get((0, v.c)(e.mint)) ?? e },
            viewedAt: (0, e4.A)({ times: re, mint: e.mint }) ?? -r,
          })),
          ...rt.map(tg),
        ]
          .sort(tx)
          .map(tb)),
          (el[39] = rn),
          (el[40] = re),
          (el[41] = t7),
          (el[42] = rt),
          (el[43] = e));
      } else e = el[43];
      x = e;
    }
    let rl = x;
    if (
      el[44] !== tG ||
      el[45] !== tV ||
      el[46] !== t$ ||
      el[47] !== rl ||
      el[48] !== tq ||
      el[49] !== tZ
    ) {
      t: {
        let e;
        el[51] !== tG || el[52] !== tV || el[53] !== t$
          ? ((e = (e) =>
              !(({
                item: e,
                hiddenTokens: t,
                hiddenProfiles: r,
                hideStablecoins: a,
              }) => {
                if ("profile" === e.kind)
                  return (0, y.M)(e.profile.address) in r;
                let i = w(e);
                return !!i && ((0, v.c)(i.mint) in t || (a && g(i)));
              })({
                item: e,
                hiddenTokens: tV,
                hiddenProfiles: tG,
                hideStablecoins: t$,
              })),
            (el[51] = tG),
            (el[52] = tV),
            (el[53] = t$),
            (el[54] = e))
          : (e = el[54]);
        let t = rl.filter(e);
        if (
          ("watchlist" === tq && "top-traders" !== tZ) ||
          "positions" === tq
        ) {
          _ = t.slice(0, 20);
          break t;
        }
        _ = t;
      }
      ((el[44] = tG),
        (el[45] = tV),
        (el[46] = t$),
        (el[47] = rl),
        (el[48] = tq),
        (el[49] = tZ),
        (el[50] = _));
    } else _ = el[50];
    let rs = _,
      ro = rl.length > 0 && 0 === rs.length;
    el[55] !== ro || el[56] !== rl
      ? ((j = ro && rl.every(th)), (el[55] = ro), (el[56] = rl), (el[57] = j))
      : (j = el[57]);
    let rc = j;
    el[58] !== rs
      ? ((C = rs.flatMap(tp)), (el[58] = rs), (el[59] = C))
      : (C = el[59]);
    let rd = C;
    el[60] !== rs
      ? ((N = rs.flatMap(tf)), (el[60] = rs), (el[61] = N))
      : (N = el[61]);
    let ru = N;
    ((0, e7.f)(ru, tQ && ru.length > 0),
      (function (e, t) {
        let i,
          n,
          l,
          s = (0, r.c)(8),
          { connectionStates: o } = (0, e_.N)(),
          c = !!o[ev.N.Unified],
          d = t && !c && e.length > 0,
          u = !d,
          m = !!d && 3e4;
        s[0] !== u || s[1] !== m
          ? ((i = { disabled: u, includeNsfw: !0, refetchInterval: m }),
            (s[0] = u),
            (s[1] = m),
            (s[2] = i))
          : (i = s[2]);
        let { data: f } = (0, ew.V)(e, i),
          p = (0, et.x)(ej);
        (s[3] !== f || s[4] !== d || s[5] !== p
          ? ((n = () => {
              if (d && f)
                for (let e of f) {
                  if (!e?.mint) continue;
                  let t = Number(e.usd_market_cap);
                  Number.isFinite(t) &&
                    !(t <= 0) &&
                    p(e.mint, { usdMarketCap: t });
                }
            }),
            (l = [d, f, p]),
            (s[3] = f),
            (s[4] = d),
            (s[5] = p),
            (s[6] = n),
            (s[7] = l))
          : ((n = s[6]), (l = s[7])),
          (0, a.useEffect)(n, l));
      })(rd, tQ && rd.length > 0));
    let rm = tc(es).find((e) => e.value === tq),
      rf = rm?.needsAuth ?? !1,
      rp =
        "top-traders" === tZ
          ? { isLoading: t3.isLoading, isError: t3.isError }
          : "watchlist" === tq
            ? { isLoading: t0.isLoading, isError: t0.isError }
            : "positions" === tq
              ? { isLoading: t5.isLoading, isError: t5.isError }
              : "following" === tq
                ? { isLoading: t8.isLoading, isError: t8.isError }
                : { isLoading: !1, isError: !1 };
    el[62] !== t9 || el[63] !== rr
      ? ((S = () => {
          (t9(), rr());
        }),
        (el[62] = t9),
        (el[63] = rr),
        (el[64] = S))
      : (S = el[64]);
    let rh = S;
    el[65] !== eA || el[66] !== eV
      ? ((k = (e) => {
          (eV(e), eA("watchlist"));
        }),
        (el[65] = eA),
        (el[66] = eV),
        (el[67] = k))
      : (k = el[67]);
    let rb = k;
    (el[68] !== es
      ? ((E = (e) => {
          let { symbol: t } = e;
          return u.c.error(
            es("web.info_bar.position_unhide_failed", { symbol: t }),
          );
        }),
        (el[68] = es),
        (el[69] = E))
      : (E = el[69]),
      el[70] !== ed || el[71] !== E
        ? ((T = { address: ed, onError: E }),
          (el[70] = ed),
          (el[71] = E),
          (el[72] = T))
        : (T = el[72]));
    let rx = (function (e) {
      let t,
        a,
        i,
        n,
        l = (0, r.c)(15),
        { address: s, onSuccess: o, onError: c } = e,
        d = (0, eC.useQueryClient)();
      return (
        l[0] !== s || l[1] !== d
          ? ((t = async (e) => {
              let { mint: t, restoreFlags: r } = e;
              if (!s) return;
              let a = eU.m.subject(s),
                i = (0, eE.F)(s);
              await Promise.all([
                d.cancelQueries({ queryKey: a }),
                d.cancelQueries({ queryKey: i }),
              ]);
              let n = eZ(d.getQueriesData({ queryKey: a }), t),
                l = (0, eE.m)(d.getQueryData(i), t),
                o = r ?? e1;
              return (
                d.setQueriesData({ queryKey: a }, (e) => eQ(e, t, o)),
                d.setQueryData(i, (e) => (0, eE.Y)(e, t)),
                { priorFlags: n, wasInSpamSet: l }
              );
            }),
            (l[0] = s),
            (l[1] = d),
            (l[2] = t))
          : (t = l[2]),
        l[3] !== s || l[4] !== c || l[5] !== d
          ? ((a = (e, t, r) => {
              if (s && r) {
                let { mint: e } = t;
                if (r.priorFlags) {
                  let t = r.priorFlags;
                  d.setQueriesData({ queryKey: eU.m.subject(s) }, (r) =>
                    eQ(r, e, t),
                  );
                }
                r.wasInSpamSet &&
                  d.setQueryData((0, eE.F)(s), (t) => (0, eE.r)(t, e));
              }
              c?.(t);
            }),
            (l[3] = s),
            (l[4] = c),
            (l[5] = d),
            (l[6] = a))
          : (a = l[6]),
        l[7] !== s || l[8] !== o || l[9] !== d
          ? ((i = (e, t) => {
              (s &&
                (d.invalidateQueries({
                  queryKey: eU.m.subject(s),
                  refetchType: "none",
                }),
                d.invalidateQueries({
                  queryKey: (0, eE.F)(s),
                  refetchType: "none",
                })),
                o?.(t));
            }),
            (l[7] = s),
            (l[8] = o),
            (l[9] = d),
            (l[10] = i))
          : (i = l[10]),
        l[11] !== t || l[12] !== a || l[13] !== i
          ? ((n = { mutationFn: e0, onMutate: t, onError: a, onSuccess: i }),
            (l[11] = t),
            (l[12] = a),
            (l[13] = i),
            (l[14] = n))
          : (n = l[14]),
        (0, eW.f)(n)
      );
    })(T);
    (el[73] !== tq || el[74] !== es || el[75] !== rx
      ? ((M = (e, r) => {
          let { mint: a, symbol: i, name: l, imageUri: s } = e;
          return (function ({ coin: e, symbol: r, t: a, onUndo: i }) {
            let l = a("web.info_bar.position_hidden_title", { symbol: r });
            u.c.custom(
              (r) =>
                (0, t.jsx)(L.O, {
                  tone: "neutral",
                  coin: e,
                  testId: "position-hidden-toast",
                  ariaLabel: l,
                  onDismiss: () => u.c.dismiss(r),
                  glyph: (0, t.jsx)(n.cT, {}),
                  title: l,
                  subtitle: a("web.info_bar.position_hidden_subtitle"),
                  subtitleLines: 2,
                  durationMs: 8e3,
                  action: (0, t.jsx)("button", {
                    type: "button",
                    className: L.u,
                    onClick: (e) => {
                      (e.stopPropagation(), u.c.dismiss(r), i());
                    },
                    children: a("common.undo"),
                  }),
                }),
              { duration: 8e3 },
            );
          })({
            coin: { mint: a, symbol: i, name: l, image_uri: s },
            symbol: i ?? "",
            t: es,
            onUndo: () => {
              (rx.mutate({ mint: a, symbol: i, restoreFlags: r?.priorFlags }),
                (0, e9.kv)({ action: "unhide-position", mode: tq }));
            },
          });
        }),
        (el[73] = tq),
        (el[74] = es),
        (el[75] = rx),
        (el[76] = M))
      : (M = el[76]),
      el[77] !== es
        ? ((D = (e) => {
            let { symbol: t } = e;
            return u.c.error(
              es("web.info_bar.position_hide_failed", { symbol: t }),
            );
          }),
          (el[77] = es),
          (el[78] = D))
        : (D = el[78]),
      el[79] !== ed || el[80] !== M || el[81] !== D
        ? ((F = { address: ed, onSuccess: M, onError: D }),
          (el[79] = ed),
          (el[80] = M),
          (el[81] = D),
          (el[82] = F))
        : (F = el[82]));
    let rg = (function (e) {
      let t,
        a,
        i,
        n,
        l = (0, r.c)(15),
        { address: s, onSuccess: o, onError: c } = e,
        d = (0, eC.useQueryClient)();
      return (
        l[0] !== s || l[1] !== d
          ? ((t = async (e) => {
              let { mint: t } = e;
              if (!s) return;
              let r = eU.m.subject(s),
                a = (0, eE.F)(s);
              await Promise.all([
                d.cancelQueries({ queryKey: r }),
                d.cancelQueries({ queryKey: a }),
              ]);
              let i = eZ(d.getQueriesData({ queryKey: r }), t),
                n = (0, eE.m)(d.getQueryData(a), t);
              return (
                d.setQueriesData({ queryKey: r }, (e) => eQ(e, t, eG)),
                d.setQueryData(a, (e) => (0, eE.r)(e, t)),
                { priorFlags: i, wasInSpamSet: n }
              );
            }),
            (l[0] = s),
            (l[1] = d),
            (l[2] = t))
          : (t = l[2]),
        l[3] !== s || l[4] !== c || l[5] !== d
          ? ((a = (e, t, r) => {
              if (s && r) {
                let { mint: e } = t;
                if (r.priorFlags) {
                  let t = r.priorFlags;
                  d.setQueriesData({ queryKey: eU.m.subject(s) }, (r) =>
                    eQ(r, e, t),
                  );
                }
                r.wasInSpamSet ||
                  d.setQueryData((0, eE.F)(s), (t) => (0, eE.Y)(t, e));
              }
              c?.(t);
            }),
            (l[3] = s),
            (l[4] = c),
            (l[5] = d),
            (l[6] = a))
          : (a = l[6]),
        l[7] !== s || l[8] !== o || l[9] !== d
          ? ((i = (e, t, r) => {
              (s &&
                (d.invalidateQueries({
                  queryKey: eU.m.subject(s),
                  refetchType: "none",
                }),
                d.invalidateQueries({
                  queryKey: (0, eE.F)(s),
                  refetchType: "none",
                })),
                o?.(t, r));
            }),
            (l[7] = s),
            (l[8] = o),
            (l[9] = d),
            (l[10] = i))
          : (i = l[10]),
        l[11] !== t || l[12] !== a || l[13] !== i
          ? ((n = { mutationFn: eY, onMutate: t, onError: a, onSuccess: i }),
            (l[11] = t),
            (l[12] = a),
            (l[13] = i),
            (l[14] = n))
          : (n = l[14]),
        (0, eW.f)(n)
      );
    })(F);
    el[83] !== ed ||
    el[84] !== tt ||
    el[85] !== rg ||
    el[86] !== tq ||
    el[87] !== t5.data
      ? ((P = (e) => {
          let t =
            "positions" === tq
              ? (t5.data ?? []).find(
                  (t) => (0, v.c)(t.mint) === (0, v.c)(e.mint),
                )
              : void 0;
          if ("positions" === tq && ed && !(t && eO(t, ed))) {
            (rg.mutate({
              mint: e.mint,
              symbol: A(e),
              name: t?.coin?.name,
              imageUri: t?.coin?.image_uri,
            }),
              (0, e9.kv)({ action: "hide-position", mode: tq }));
            return;
          }
          (tt(e), (0, e9.kv)({ action: "hide", mode: tq }));
        }),
        (el[83] = ed),
        (el[84] = tt),
        (el[85] = rg),
        (el[86] = tq),
        (el[87] = t5.data),
        (el[88] = P))
      : (P = el[88]);
    let ry = P;
    el[89] !== tn || el[90] !== tq
      ? ((z = (e) => {
          (tn(e), (0, e9.kv)({ action: "hide-profile", mode: tq }));
        }),
        (el[89] = tn),
        (el[90] = tq),
        (el[91] = z))
      : (z = el[91]);
    let rv = z;
    el[92] !== tq || el[93] !== to
      ? ((K = (e) => {
          (to(e), (0, e9.kv)({ action: "unhide-profile", mode: tq }));
        }),
        (el[92] = tq),
        (el[93] = to),
        (el[94] = K))
      : (K = el[94]);
    let rw = K;
    el[95] !== tq || el[96] !== td
      ? ((B = () => {
          (td(), (0, e9.kv)({ action: "unhide-all-profiles", mode: tq }));
        }),
        (el[95] = tq),
        (el[96] = td),
        (el[97] = B))
      : (B = el[97]);
    let r_ = B;
    el[98] !== tq || el[99] !== tl
      ? ((H = (e) => {
          (tl(e), (0, e9.kv)({ action: "unhide", mode: tq }));
        }),
        (el[98] = tq),
        (el[99] = tl),
        (el[100] = H))
      : (H = el[100]);
    let rj = H;
    el[101] !== tq || el[102] !== ts
      ? ((q = () => {
          (ts(), (0, e9.kv)({ action: "unhide-all", mode: tq }));
        }),
        (el[101] = tq),
        (el[102] = ts),
        (el[103] = q))
      : (q = el[103]);
    let rC = q;
    el[104] !== tq || el[105] !== tH
      ? ((W = (e) => {
          (tH(e),
            (0, e9.kv)({
              action: e ? "hide-stablecoins-on" : "hide-stablecoins-off",
              mode: tq,
            }));
        }),
        (el[104] = tq),
        (el[105] = tH),
        (el[106] = W))
      : (W = el[106]);
    let rN = W;
    el[107] !== tV
      ? ((U = Object.values(tV).sort(tm)), (el[107] = tV), (el[108] = U))
      : (U = el[108]);
    let rS = U;
    el[109] !== tG
      ? ((V = Object.values(tG).sort(tu)), (el[109] = tG), (el[110] = V))
      : (V = el[110]);
    let rk = V,
      rE = (0, a.useRef)(null);
    if (
      (el[111] === Symbol.for("react.memo_cache_sentinel")
        ? (($ = () => {
            let e = rE.current;
            if (!e) return;
            let t = (t) => {
              Math.abs(t.deltaY) <= Math.abs(t.deltaX) ||
                e.scrollWidth <= e.clientWidth ||
                (t.preventDefault(), (e.scrollLeft = e.scrollLeft + t.deltaY));
            };
            return (
              e.addEventListener("wheel", t, { passive: !1 }),
              () => e.removeEventListener("wheel", t)
            );
          }),
          (el[111] = $))
        : ($ = el[111]),
      el[112] !== ec
        ? ((Q = [ec]), (el[112] = ec), (el[113] = Q))
        : (Q = el[113]),
      (0, a.useEffect)($, Q),
      ec)
    )
      return null;
    if (eo)
      if (rf && !eu) {
        let e, r;
        if (el[115] !== es)
          ((e = {
            positions: es("web.info_bar.signed_out_positions"),
            following: es("web.info_bar.signed_out_following"),
          }),
            (el[115] = es),
            (el[116] = e));
        else e = el[116];
        let a = e[tZ];
        (el[117] !== a
          ? ((r = (0, t.jsx)(tK, { children: a })),
            (el[117] = a),
            (el[118] = r))
          : (r = el[118]),
          (Z = r));
      } else if (rp.isLoading && 0 === rl.length) {
        let e;
        (el[119] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(tB, {})), (el[119] = e))
          : (e = el[119]),
          (Z = e));
      } else if (rp.isError && 0 === rl.length) {
        let e, r;
        if (el[120] !== es)
          ((e = {
            watchlist: es("web.market_rail.error_watchlist"),
            "top-traders": es("web.info_bar.error_top_traders"),
            positions: es("web.info_bar.error_positions"),
            following: es("web.info_bar.error_following"),
            recents: "",
          }),
            (el[120] = es),
            (el[121] = e));
        else e = el[121];
        let a = e[tZ];
        (el[122] !== a
          ? ((r = (0, t.jsx)(tK, { children: a })),
            (el[122] = a),
            (el[123] = r))
          : (r = el[123]),
          (Z = r));
      } else if (ro) {
        let e, r;
        (el[124] !== rc || el[125] !== es
          ? ((e = rc
              ? es("web.info_bar.all_profiles_hidden")
              : es("web.info_bar.all_hidden")),
            (el[124] = rc),
            (el[125] = es),
            (el[126] = e))
          : (e = el[126]),
          el[127] !== e
            ? ((r = (0, t.jsx)(tK, { children: e })),
              (el[127] = e),
              (el[128] = r))
            : (r = el[128]),
          (Z = r));
      } else if (
        "positions" === tq &&
        0 === rl.length &&
        t5.ownerHiddenCount > 0
      ) {
        let e, r;
        (el[129] !== es
          ? ((e = es("web.info_bar.all_positions_hidden")),
            (el[129] = es),
            (el[130] = e))
          : (e = el[130]),
          el[131] !== e
            ? ((r = (0, t.jsx)(tK, { children: e })),
              (el[131] = e),
              (el[132] = r))
            : (r = el[132]),
          (Z = r));
      } else if (0 === rl.length)
        Z = (0, t.jsx)(tK, {
          children:
            "watchlist" === tZ && tJ
              ? es("web.info_bar.empty_watchlist_named", { name: tJ.name })
              : {
                  watchlist: es("web.market_rail.empty_watchlist"),
                  "top-traders": es("web.info_bar.empty_top_traders"),
                  positions: es("web.info_bar.empty_positions"),
                  following: es("web.info_bar.empty_following"),
                  recents: es("web.info_bar.empty_recents"),
                }[tZ],
        });
      else {
        let e;
        if (
          el[133] !== rv ||
          el[134] !== rN ||
          el[135] !== ry ||
          el[136] !== es ||
          el[137] !== rs
        ) {
          let r;
          (el[139] !== rv || el[140] !== rN || el[141] !== ry || el[142] !== es
            ? ((r = (e) => {
                if ("profile" === e.kind)
                  return (0, t.jsx)(
                    I,
                    {
                      hideLabel: es("web.info_bar.hide_profile", {
                        name: (0, O.f)(e.profile),
                      }),
                      onHide: () => rv(e.profile),
                      children: (0, t.jsx)(ep, {
                        profile: e.profile,
                        pnl: e.pnl,
                      }),
                    },
                    `profile-${e.profile.address}`,
                  );
                let r = w(e);
                return r
                  ? (0, t.jsx)(
                      I,
                      {
                        hideLabel: es("web.info_bar.hide_token", {
                          symbol: A(r),
                        }),
                        isStablecoin: g(r),
                        onHide: () => ry(r),
                        onHideStablecoins: () => rN(!0),
                        children:
                          "coin" === e.kind
                            ? (0, t.jsx)(em, { coin: e.coin })
                            : (0, t.jsx)(ef, { balance: e.balance }),
                      },
                      `${e.kind}-${(0, v.c)(r.mint)}`,
                    )
                  : null;
              }),
              (el[139] = rv),
              (el[140] = rN),
              (el[141] = ry),
              (el[142] = es),
              (el[143] = r))
            : (r = el[143]),
            (e = rs.map(r)),
            (el[133] = rv),
            (el[134] = rN),
            (el[135] = ry),
            (el[136] = es),
            (el[137] = rs),
            (el[138] = e));
        } else e = el[138];
        Z = e;
      }
    else {
      let e;
      (el[114] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(tB, {})), (el[114] = e))
        : (e = el[114]),
        (Z = e));
    }
    let rA = t7.length > 0 || rt.length > 0,
      rI = "positions" === tq && eu ? ed : void 0;
    (el[144] !== rh ||
    el[145] !== rN ||
    el[146] !== rC ||
    el[147] !== r_ ||
    el[148] !== rw ||
    el[149] !== rj ||
    el[150] !== rb ||
    el[151] !== rk ||
    el[152] !== rS ||
    el[153] !== t$ ||
    el[154] !== tq ||
    el[155] !== e$ ||
    el[156] !== eA ||
    el[157] !== eX ||
    el[158] !== rA ||
    el[159] !== rI ||
    el[160] !== tX.activeWatchlistId ||
    el[161] !== tX.customLists
      ? ((Y = (0, t.jsx)(tW, {
          watchlists: tX.customLists,
          watchlistId: tX.activeWatchlistId,
          onWatchlistChange: rb,
          pnlPeriod: e$,
          onPnlPeriodChange: eX,
          mode: tq,
          onModeChange: eA,
          onClearRecents: rh,
          canClearRecents: rA,
          hiddenTokens: rS,
          onUnhideToken: rj,
          onUnhideAll: rC,
          hiddenProfiles: rk,
          onUnhideProfile: rw,
          onUnhideAllProfiles: r_,
          hideStablecoins: t$,
          onHideStablecoinsChange: rN,
          dustFloorAddress: rI,
        })),
        (el[144] = rh),
        (el[145] = rN),
        (el[146] = rC),
        (el[147] = r_),
        (el[148] = rw),
        (el[149] = rj),
        (el[150] = rb),
        (el[151] = rk),
        (el[152] = rS),
        (el[153] = t$),
        (el[154] = tq),
        (el[155] = e$),
        (el[156] = eA),
        (el[157] = eX),
        (el[158] = rA),
        (el[159] = rI),
        (el[160] = tX.activeWatchlistId),
        (el[161] = tX.customLists),
        (el[162] = Y))
      : (Y = el[162]),
      el[163] !== es
        ? ((X = es("web.info_bar.content_aria")), (el[163] = es), (el[164] = X))
        : (X = el[164]));
    let rT = tc(es).map((e) => {
      let { value: r, label: a, Icon: i } = e,
        l = tq === r,
        s = "watchlist" === r && eo && !eu,
        o = s
          ? es("web.info_bar.top_traders")
          : "watchlist" === r && tJ
            ? es("web.info_bar.watchlist_slot_named", { name: tJ.name })
            : a,
        c = s ? n.WV : i;
      return (0, t.jsx)(
        R,
        {
          content: o,
          children: (0, t.jsx)("button", {
            type: "button",
            role: "radio",
            "aria-checked": l,
            "aria-label": o,
            onClick: () => eA(r),
            className: (0, te.c)(ti, l && "bg-bg-tertiary text-text-primary"),
            children: (0, t.jsx)(c, { className: "size-3.5" }),
          }),
        },
        r,
      );
    });
    return (
      el[165] !== X || el[166] !== rT
        ? ((ee = (0, t.jsx)("div", {
            role: "radiogroup",
            "aria-label": X,
            className: "flex shrink-0 items-center gap-0.5",
            children: rT,
          })),
          (el[165] = X),
          (el[166] = rT),
          (el[167] = ee))
        : (ee = el[167]),
      el[168] !== Y || el[169] !== ee
        ? ((er = (0, t.jsxs)("div", {
            className: "flex shrink-0 items-center gap-0.5",
            children: [Y, ee],
          })),
          (el[168] = Y),
          (el[169] = ee),
          (el[170] = er))
        : (er = el[170]),
      el[171] === Symbol.for("react.memo_cache_sentinel")
        ? ((ea = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "h-3.5 w-px shrink-0 bg-border-secondary",
          })),
          (el[171] = ea))
        : (ea = el[171]),
      el[172] !== Z
        ? ((ei = (0, t.jsx)("div", {
            ref: rE,
            className:
              "scrollbar-hide flex h-full min-w-0 flex-1 items-center gap-3 overflow-x-auto",
            children: Z,
          })),
          (el[172] = Z),
          (el[173] = ei))
        : (ei = el[173]),
      el[174] !== er || el[175] !== ei
        ? ((en = (0, t.jsxs)("div", {
            "data-testid": "token-info-bar",
            className:
              "flex h-7 items-center gap-3 border-t border-border-secondary bg-bg-primary px-[var(--padding-x-main)] max-lg:px-4 max-md:hidden",
            children: [er, ea, ei],
          })),
          (el[174] = er),
          (el[175] = ei),
          (el[176] = en))
        : (en = el[176]),
      en
    );
  }
  function tu(e, t) {
    return t.hiddenAt - e.hiddenAt;
  }
  function tm(e, t) {
    return t.hiddenAt - e.hiddenAt;
  }
  function tf(e) {
    return "coin" === e.kind
      ? [{ mint: e.coin.mint, chain_id: e.coin.chain_id }]
      : "position" === e.kind
        ? [{ mint: e.balance.mint, chain_id: e.balance.chainId }]
        : [];
  }
  function tp(e) {
    return "coin" === e.kind
      ? [e.coin.mint]
      : "position" === e.kind
        ? [e.balance.mint]
        : [];
  }
  function th(e) {
    return "profile" === e.kind;
  }
  function tb(e) {
    return e.item;
  }
  function tx(e, t) {
    return t.viewedAt - e.viewedAt;
  }
  function tg(e) {
    return {
      item: {
        kind: "profile",
        profile: {
          address: e.address,
          userId: e.userId,
          username: e.username,
          profile_image: e.profile_image,
        },
      },
      viewedAt: e.viewedAt,
    };
  }
  function ty(e) {
    return [(0, v.c)(e.mint), e];
  }
  function tv(e) {
    return {
      kind: "profile",
      profile: {
        address: e.address,
        userId: e.userId,
        username: e.username ?? null,
        profile_image: e.profile_image ?? null,
      },
    };
  }
  function tw(e) {
    return { kind: "position", balance: e };
  }
  function t_(e) {
    return { kind: "coin", coin: e };
  }
  function tj(e) {
    return e.mint;
  }
  function tC(e) {
    return e.setHideStablecoins;
  }
  function tN(e) {
    return e.unhideAllProfiles;
  }
  function tS(e) {
    return e.unhideProfile;
  }
  function tk(e) {
    return e.unhideAllTokens;
  }
  function tE(e) {
    return e.unhideToken;
  }
  function tA(e) {
    return e.hideProfile;
  }
  function tI(e) {
    return e.hideToken;
  }
  function tT(e) {
    return e.hideStablecoins;
  }
  function tR(e) {
    return e.hiddenProfiles;
  }
  function tL(e) {
    return e.hiddenTokens;
  }
  function tO(e) {
    return e.setPnlPeriod;
  }
  function tM(e) {
    return e.pnlPeriod;
  }
  function tD(e) {
    return e.setWatchlistId;
  }
  function tF(e) {
    return e.watchlistId;
  }
  function tP(e) {
    return e.setMode;
  }
  function tz(e) {
    return e.mode;
  }
  function tK(e) {
    let a,
      i = (0, r.c)(2),
      { children: n } = e;
    return (
      i[0] !== n
        ? ((a = (0, t.jsx)("p", {
            className: "whitespace-nowrap text-[12px] text-text-tertiary",
            children: n,
          })),
          (i[0] = n),
          (i[1] = a))
        : (a = i[1]),
      a
    );
  }
  function tB() {
    let e,
      a = (0, r.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "flex h-full w-full items-center gap-3 overflow-hidden",
            children: Array.from({ length: 14 }).map(tH),
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  }
  function tH(e, r) {
    return (0, t.jsxs)(
      "span",
      {
        className: "flex shrink-0 items-center gap-1.5 px-1.5",
        children: [
          (0, t.jsx)("span", {
            className: "size-4 animate-pulse rounded-sm bg-bg-quaternary",
          }),
          (0, t.jsx)("span", {
            className: "h-3 w-12 animate-pulse rounded bg-bg-quaternary",
          }),
          (0, t.jsx)("span", {
            className: "h-3 w-10 animate-pulse rounded bg-bg-tertiary",
          }),
        ],
      },
      r,
    );
  }
  function tq(e) {
    let a,
      i,
      l,
      s,
      o,
      c,
      u,
      m,
      f = (0, r.c)(16);
    f[0] !== e
      ? (({ onClick: a, ...i } = e), (f[0] = e), (f[1] = a), (f[2] = i))
      : ((a = f[1]), (i = f[2]));
    let { t: p } = (0, d.f)();
    (f[3] !== p
      ? ((l = p("web.info_bar.settings_aria")), (f[3] = p), (f[4] = l))
      : (l = f[4]),
      f[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, te.c)(
            ti,
            "data-[state=open]:bg-bg-tertiary data-[state=open]:text-text-primary",
          )),
          (f[5] = s))
        : (s = f[5]),
      f[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(n.Oc, { className: "size-3.5" })), (f[6] = o))
        : (o = f[6]),
      f[7] !== a || f[8] !== i || f[9] !== l
        ? ((c = (0, t.jsx)("button", {
            type: "button",
            "aria-label": l,
            className: s,
            onClick: a,
            ...i,
            children: o,
          })),
          (f[7] = a),
          (f[8] = i),
          (f[9] = l),
          (f[10] = c))
        : (c = f[10]));
    let h = c;
    return a
      ? (f[11] !== p
          ? ((u = p("web.info_bar.settings_aria")), (f[11] = p), (f[12] = u))
          : (u = f[12]),
        f[13] !== h || f[14] !== u
          ? ((m = (0, t.jsx)(R, { content: u, children: h })),
            (f[13] = h),
            (f[14] = u),
            (f[15] = m))
          : (m = f[15]),
        m)
      : h;
  }
  function tW(e) {
    let i,
      o,
      c,
      u,
      m,
      h,
      b,
      x,
      g,
      v,
      w,
      j,
      C,
      N,
      S,
      k,
      E,
      A,
      I,
      T,
      L,
      M,
      D,
      F,
      P,
      z,
      K,
      B,
      H,
      q,
      W,
      U,
      V,
      G = (0, r.c)(100),
      {
        watchlists: $,
        watchlistId: Q,
        onWatchlistChange: Z,
        pnlPeriod: Y,
        onPnlPeriodChange: X,
        mode: J,
        onModeChange: ee,
        onClearRecents: et,
        canClearRecents: er,
        hiddenTokens: ea,
        onUnhideToken: ei,
        onUnhideAll: en,
        hiddenProfiles: el,
        onUnhideProfile: es,
        onUnhideAllProfiles: eo,
        hideStablecoins: ec,
        onHideStablecoinsChange: ed,
        dustFloorAddress: eu,
      } = e,
      { t: em } = (0, d.f)(),
      ef = (0, a.useId)();
    G[0] !== em || G[1] !== $
      ? ((i =
          $.length > 0
            ? [{ id: ez.f, name: em("web.watchlist.main_list") }, ...$]
            : []),
        (G[0] = em),
        (G[1] = $),
        (G[2] = i))
      : (i = G[2]);
    let ep = i;
    if (
      (G[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(tq, {})), (G[3] = o))
        : (o = G[3]),
      G[4] !== em
        ? ((c = em("web.info_bar.settings_aria")), (G[4] = em), (G[5] = c))
        : (c = G[5]),
      G[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(eq.J, {
            asChild: !0,
            children: (0, t.jsx)(tq, {}),
          })),
          (G[6] = u))
        : (u = G[6]),
      G[7] !== c
        ? ((m = (0, t.jsx)(R, { content: c, children: u })),
          (G[7] = c),
          (G[8] = m))
        : (m = G[8]),
      G[9] !== eu || G[10] !== J || G[11] !== em
        ? ((h =
            "positions" === J
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    eu
                      ? (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)("p", {
                              className: tn,
                              children: em("web.info_bar.dust_floor_label"),
                            }),
                            (0, t.jsx)(p.f, {
                              address: eu,
                              density: "terminal",
                              surface: "info-bar",
                              className: "px-2",
                            }),
                            (0, t.jsx)("p", {
                              className: tl,
                              children: em("web.info_bar.dust_floor_note"),
                            }),
                          ],
                        })
                      : null,
                    (0, t.jsx)("p", {
                      className: tl,
                      children: em("web.info_bar.hidden_positions_note"),
                    }),
                    (0, t.jsx)("div", {
                      "aria-hidden": !0,
                      className: "my-2 border-t border-border-tertiary",
                    }),
                  ],
                })
              : null),
          (G[9] = eu),
          (G[10] = J),
          (G[11] = em),
          (G[12] = h))
        : (h = G[12]),
      G[13] !== Z || G[14] !== em || G[15] !== Q || G[16] !== ep
        ? ((b =
            ep.length > 0
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("p", {
                      className: tn,
                      children: em("web.info_bar.watchlist_picker"),
                    }),
                    (0, t.jsx)("div", {
                      role: "radiogroup",
                      "aria-label": em("web.info_bar.watchlist_picker"),
                      className:
                        "flex max-h-44 flex-col gap-0.5 overflow-y-auto",
                      children: ep.map((e) => {
                        let { id: r, name: a } = e,
                          i = Q === r;
                        return (0, t.jsxs)(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": i,
                            onClick: () => Z(r),
                            className: (0, te.c)(
                              "flex h-7 shrink-0 items-center justify-between gap-2 rounded-md px-2 text-left text-[13px] font-medium transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
                              i
                                ? "text-text-primary"
                                : "text-text-tertiary hover:text-text-primary",
                            ),
                            children: [
                              (0, t.jsx)("span", {
                                className: "truncate",
                                children: a,
                              }),
                              i
                                ? (0, t.jsx)(n.sX, {
                                    className:
                                      "size-3.5 shrink-0 text-text-accent",
                                  })
                                : null,
                            ],
                          },
                          r,
                        );
                      }),
                    }),
                    (0, t.jsx)("div", {
                      "aria-hidden": !0,
                      className: "my-2 border-t border-border-tertiary",
                    }),
                  ],
                })
              : null),
          (G[13] = Z),
          (G[14] = em),
          (G[15] = Q),
          (G[16] = ep),
          (G[17] = b))
        : (b = G[17]),
      G[18] !== em
        ? ((x = em("web.info_bar.hidden_tokens")), (G[18] = em), (G[19] = x))
        : (x = G[19]),
      G[20] !== ea || G[21] !== em)
    ) {
      let e;
      (G[23] !== em
        ? ((e = (e) => {
            let t = e.symbol || (0, s.d)(e.mint, 4, 4);
            return {
              id: e.mint,
              label: (0, tt.T)(t, "coin-symbol"),
              unhideLabel: em("web.info_bar.unhide_token", { symbol: t }),
            };
          }),
          (G[23] = em),
          (G[24] = e))
        : (e = G[24]),
        (g = ea.map(e)),
        (G[20] = ea),
        (G[21] = em),
        (G[22] = g));
    } else g = G[22];
    (G[25] !== en || G[26] !== ei || G[27] !== x || G[28] !== g
      ? ((v = (0, t.jsx)(_, {
          heading: x,
          rows: g,
          onUnhide: ei,
          onUnhideAll: en,
        })),
        (G[25] = en),
        (G[26] = ei),
        (G[27] = x),
        (G[28] = g),
        (G[29] = v))
      : (v = G[29]),
      G[30] !== el || G[31] !== eo || G[32] !== es || G[33] !== em
        ? ((w =
            el.length > 0
              ? (0, t.jsx)(_, {
                  heading: em("web.info_bar.hidden_profiles"),
                  rows: el.map((e) => {
                    let t = (0, O.f)({
                      address: e.address,
                      username: e.username || null,
                    });
                    return {
                      id: e.address,
                      label: (0, tt.T)(t, "user-name"),
                      unhideLabel: em("web.info_bar.unhide_profile", {
                        name: t,
                      }),
                    };
                  }),
                  onUnhide: es,
                  onUnhideAll: eo,
                  className: "mt-2",
                })
              : null),
          (G[30] = el),
          (G[31] = eo),
          (G[32] = es),
          (G[33] = em),
          (G[34] = w))
        : (w = G[34]),
      G[35] !== el.length || G[36] !== ea.length || G[37] !== em
        ? ((j =
            0 === ea.length && 0 === el.length
              ? (0, t.jsx)("p", {
                  className: tl,
                  children: em("web.info_bar.no_hidden_tokens"),
                })
              : null),
          (G[35] = el.length),
          (G[36] = ea.length),
          (G[37] = em),
          (G[38] = j))
        : (j = G[38]),
      G[39] !== em
        ? ((C = em("web.info_bar.hide_stablecoins")), (G[39] = em), (G[40] = C))
        : (C = G[40]),
      G[41] !== ef || G[42] !== C
        ? ((N = (0, t.jsx)("span", { id: ef, children: C })),
          (G[41] = ef),
          (G[42] = C),
          (G[43] = N))
        : (N = G[43]),
      G[44] !== ec || G[45] !== ef || G[46] !== ed
        ? ((S = (0, t.jsx)(l.Z, {
            "aria-labelledby": ef,
            isChecked: ec,
            onCheckedChange: ed,
            size: 18,
          })),
          (G[44] = ec),
          (G[45] = ef),
          (G[46] = ed),
          (G[47] = S))
        : (S = G[47]),
      G[48] !== N || G[49] !== S
        ? ((k = (0, t.jsxs)("div", {
            className:
              "mt-1 flex h-7 items-center justify-between gap-2 px-2 text-[13px] font-medium text-text-primary",
            children: [N, S],
          })),
          (G[48] = N),
          (G[49] = S),
          (G[50] = k))
        : (k = G[50]),
      G[51] !== em
        ? ((E = em("web.info_bar.hide_stablecoins_note")),
          (G[51] = em),
          (G[52] = E))
        : (E = G[52]),
      G[53] !== E
        ? ((A = (0, t.jsx)("p", { className: tl, children: E })),
          (G[53] = E),
          (G[54] = A))
        : (A = G[54]),
      G[55] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "my-2 border-t border-border-tertiary",
          })),
          (G[55] = I))
        : (I = G[55]),
      G[56] !== em
        ? ((T = em("web.info_bar.pnl_window")), (G[56] = em), (G[57] = T))
        : (T = G[57]),
      G[58] !== T
        ? ((L = (0, t.jsx)("p", { className: tn, children: T })),
          (G[58] = T),
          (G[59] = L))
        : (L = G[59]),
      G[60] !== em
        ? ((M = em("web.info_bar.pnl_window")), (G[60] = em), (G[61] = M))
        : (M = G[61]),
      G[62] !== X || G[63] !== Y
        ? ((D = y.u.map((e) => {
            let r = Y === e;
            return (0, t.jsx)(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": r,
                onClick: () => X(e),
                className: (0, te.c)(
                  "h-full flex-1 rounded-sm px-2 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
                  r
                    ? "bg-bg-tertiary text-text-primary"
                    : "text-text-tertiary hover:text-text-primary",
                ),
                children: y.K[e],
              },
              e,
            );
          })),
          (G[62] = X),
          (G[63] = Y),
          (G[64] = D))
        : (D = G[64]),
      G[65] !== M || G[66] !== D
        ? ((F = (0, t.jsx)("div", {
            role: "radiogroup",
            "aria-label": M,
            className:
              "flex h-7 items-center gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
            children: D,
          })),
          (G[65] = M),
          (G[66] = D),
          (G[67] = F))
        : (F = G[67]),
      G[68] !== em
        ? ((P = em("web.info_bar.pnl_window_note")), (G[68] = em), (G[69] = P))
        : (P = G[69]),
      G[70] !== P
        ? ((z = (0, t.jsx)("p", { className: tl, children: P })),
          (G[70] = P),
          (G[71] = z))
        : (z = G[71]),
      G[72] !== J || G[73] !== ee || G[74] !== em
        ? ((K = to.has(J)
            ? null
            : (0, t.jsx)("button", {
                type: "button",
                onClick: () => ee("recents"),
                className: (0, te.c)(ts, "mt-2"),
                children: em("web.info_bar.show_recently_viewed"),
              })),
          (G[72] = J),
          (G[73] = ee),
          (G[74] = em),
          (G[75] = K))
        : (K = G[75]));
    let eh = !er;
    return (
      G[76] === Symbol.for("react.memo_cache_sentinel")
        ? ((B = (0, te.c)(ts, "mt-2")), (G[76] = B))
        : (B = G[76]),
      G[77] !== em
        ? ((H = em("web.info_bar.clear_recently_viewed")),
          (G[77] = em),
          (G[78] = H))
        : (H = G[78]),
      G[79] !== et || G[80] !== eh || G[81] !== H
        ? ((q = (0, t.jsx)("button", {
            type: "button",
            onClick: et,
            disabled: eh,
            className: B,
            children: H,
          })),
          (G[79] = et),
          (G[80] = eh),
          (G[81] = H),
          (G[82] = q))
        : (q = G[82]),
      G[83] === Symbol.for("react.memo_cache_sentinel")
        ? ((W = (0, t.jsx)(f.E, {
            section: "feed",
            className: "mt-1 h-7 px-2",
          })),
          (G[83] = W))
        : (W = G[83]),
      G[84] !== v ||
      G[85] !== w ||
      G[86] !== j ||
      G[87] !== k ||
      G[88] !== A ||
      G[89] !== L ||
      G[90] !== F ||
      G[91] !== z ||
      G[92] !== K ||
      G[93] !== q ||
      G[94] !== h ||
      G[95] !== b
        ? ((U = (0, t.jsxs)(eq.T, {
            align: "start",
            className: "w-56 p-2",
            children: [h, b, v, w, j, k, A, I, L, F, z, K, q, W],
          })),
          (G[84] = v),
          (G[85] = w),
          (G[86] = j),
          (G[87] = k),
          (G[88] = A),
          (G[89] = L),
          (G[90] = F),
          (G[91] = z),
          (G[92] = K),
          (G[93] = q),
          (G[94] = h),
          (G[95] = b),
          (G[96] = U))
        : (U = G[96]),
      G[97] !== U || G[98] !== m
        ? ((V = (0, t.jsx)(f.S, {
            section: "feed",
            settingId: "feed.infoBar.mode",
            trigger: o,
            children: (0, t.jsxs)(eq.V, { children: [m, U] }),
          })),
          (G[97] = U),
          (G[98] = m),
          (G[99] = V))
        : (V = G[99]),
      V
    );
  }
  var tU = e.i(254667),
    tV = e.i(426091),
    tG = e.i(453706),
    t$ = e.i(51206),
    tQ = e.i(935302),
    tZ = e.i(908163),
    tY = e.i(29542),
    tX = e.i(921999),
    tJ = e.i(617614);
  let t1 = () => {
      let e,
        a,
        i,
        l,
        s,
        o,
        c,
        d,
        u,
        m,
        f,
        p = (0, r.c)(28),
        { searchTerm: h, handleClearSearch: b } = (0, tX.u)();
      p[0] !== h ? ((e = h?.trim()), (p[0] = h), (p[1] = e)) : (e = p[1]);
      let x = !!e,
        g = (0, tJ.Z)();
      (p[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, te.c)(
            "group w-full max-w-[420px]",
            tQ.R,
            tQ.L.comfortable,
            "focus-within:border-border-tertiary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-text-accent",
          )),
          (p[2] = a))
        : (a = p[2]),
        p[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(n.L3, {
              "aria-hidden": !0,
              className: (0, te.c)(
                tQ.H.comfortable,
                "transition-colors group-hover:text-text-tertiary",
              ),
            })),
            (p[3] = i))
          : (i = p[3]),
        p[4] !== g ? ((l = () => g(!0)), (p[4] = g), (p[5] = l)) : (l = p[5]));
      let y = x ? "pr-8" : "pr-2.5";
      p[6] !== y
        ? ((s = (0, te.c)(
            "flex h-full w-full min-w-0 items-center text-left focus-visible:outline-none",
            tQ.q.comfortable,
            y,
          )),
          (p[6] = y),
          (p[7] = s))
        : (s = p[7]);
      let v = x
          ? `Search filtered by "${h}". Click to search again.`
          : tY.f.HOME_PAGE.SEARCH_INPUT.ARIA_LABEL,
        w = x
          ? "text-text-primary"
          : "text-text-quaternary transition-colors group-hover:text-text-tertiary";
      p[8] !== w
        ? ((o = (0, te.c)("min-w-0 flex-1 truncate", w)),
          (p[8] = w),
          (p[9] = o))
        : (o = p[9]);
      let _ = x ? h : tY.f.HOME_PAGE.SEARCH_INPUT.PLACEHOLDER;
      return (
        p[10] !== o || p[11] !== _
          ? ((c = (0, t.jsx)("span", { className: o, children: _ })),
            (p[10] = o),
            (p[11] = _),
            (p[12] = c))
          : (c = p[12]),
        p[13] !== x
          ? ((d =
              !x &&
              (0, t.jsx)("kbd", {
                "data-slot": "kbd",
                className: (0, te.c)(
                  tZ.G,
                  tZ.q.comfortable,
                  "pointer-events-none ml-2 hidden select-none bg-bg-quaternary font-sans text-text-quaternary sm:inline-flex",
                ),
                children: "⌘K",
              })),
            (p[13] = x),
            (p[14] = d))
          : (d = p[14]),
        p[15] !== c || p[16] !== d || p[17] !== l || p[18] !== s || p[19] !== v
          ? ((u = (0, t.jsxs)("button", {
              type: "button",
              onClick: l,
              className: s,
              "aria-label": v,
              children: [c, d],
            })),
            (p[15] = c),
            (p[16] = d),
            (p[17] = l),
            (p[18] = s),
            (p[19] = v),
            (p[20] = u))
          : (u = p[20]),
        p[21] !== b || p[22] !== x || p[23] !== h
          ? ((m =
              x &&
              (0, t.jsx)(t$._, {
                density: "comfortable",
                size: 20,
                "aria-label": `Clear search filter "${h}"`,
                className: "absolute right-1.5",
                onClick: (e) => {
                  (e.stopPropagation(), b());
                },
                children: (0, t.jsx)(n.AD, { "aria-hidden": !0 }),
              })),
            (p[21] = b),
            (p[22] = x),
            (p[23] = h),
            (p[24] = m))
          : (m = p[24]),
        p[25] !== u || p[26] !== m
          ? ((f = (0, t.jsxs)("div", {
              className: a,
              role: "search",
              children: [i, u, m],
            })),
            (p[25] = u),
            (p[26] = m),
            (p[27] = f))
          : (f = p[27]),
        f
      );
    },
    t0 = "data-pf-auth-slot",
    t2 = "topbar_banner_closed",
    t3 = "wallet_adapter_notice_slot",
    t4 = "wallet_adapter_notice_snoozed_until";
  var t5 = e.i(292686),
    t6 = e.i(198825);
  function t8() {
    window.location.reload();
  }
  var t7 = e.i(975982),
    t9 = e.i(344048);
  let re = {
      address: null,
      hasAutomaticRead: !1,
      isSupported: !1,
      hasChecked: !1,
    },
    rt = {
      address: null,
      hasAutomaticRead: !1,
      isSupported: !1,
      hasChecked: !1,
    },
    rr = new Set(),
    ra = !1,
    ri = null,
    rn = null,
    rl = !1,
    rs = () =>
      "u" > typeof navigator &&
      "function" == typeof navigator.clipboard?.readText &&
      window.isSecureContext,
    ro = (e) => {
      let t = { ...rt, ...e };
      if (
        t.address !== rt.address ||
        t.hasAutomaticRead !== rt.hasAutomaticRead ||
        t.isSupported !== rt.isSupported ||
        t.hasChecked !== rt.hasChecked
      )
        for (let e of ((rt = t), rr)) e();
    },
    rc = async () => {
      if (
        !rs() ||
        ("u" > typeof document && "hidden" === document.visibilityState)
      )
        return rt.address;
      try {
        let e = await navigator.clipboard.readText(),
          t = ((e) => {
            let t = ((e) => {
              let t = (0, t7.R)(e);
              if (!t) return null;
              try {
                if (32 !== t9.f.decode(t).length) return null;
              } catch {
                return null;
              }
              return t;
            })(e);
            if (t) return t;
            let r = e.trim();
            return (0, v.h)(r) ? r : null;
          })(e);
        return (ro({ address: t }), t);
      } catch {
        return rt.address;
      }
    },
    rd = () =>
      (ri ??= rc().finally(() => {
        ri = null;
      })),
    ru = () => {
      (ro({ hasAutomaticRead: rn?.state === "granted" }),
        rn?.state === "granted" && rd());
    },
    rm = () => ru(),
    rf = () => {
      "visible" === document.visibilityState && ru();
    },
    rp = (e) => (
      rr.add(e),
      ra ||
        ((ra = !0),
        ro({ isSupported: rs(), hasChecked: !0 }),
        window.addEventListener("focus", rm),
        document.addEventListener("visibilitychange", rf),
        rl ||
          ((rl = !0),
          "u" > typeof navigator &&
            navigator.permissions?.query &&
            navigator.permissions
              .query({ name: "clipboard-read" })
              .then((e) => {
                ((rn = e), e.addEventListener?.("change", ru), ru());
              })
              .catch(() => {})),
        ru()),
      () => {
        (rr.delete(e),
          0 === rr.size &&
            ra &&
            ((ra = !1),
            window.removeEventListener("focus", rm),
            document.removeEventListener("visibilitychange", rf)));
      }
    ),
    rh = () => rt,
    rb = () => re;
  var rx = e.i(620268);
  let rg = (e) => {
      try {
        return JSON.parse(e);
      } catch {
        return null;
      }
    },
    ry = async (e, t) => {
      try {
        let r = await (0, rx.W)(e, t);
        return r?.chain === "solana" && r.address === e ? r : null;
      } catch (e) {
        if (e instanceof DOMException && "AbortError" === e.name) throw e;
        return null;
      }
    },
    rv = async (t, r) => {
      let a = 0,
        i = (0, eV.j)({ signal: r, parseJson: rg }),
        n = await i("GET /coins-v3/{address}", {
          params: { address: t },
          query: {},
          throwHttpErrors: !1,
          hooks: {
            afterResponse: [
              (e, t, r) => {
                a = r.status;
              },
            ],
          },
        });
      if (a >= 200 && a < 300) {
        if (n?.mint)
          return {
            kind: "coin",
            coinAddress: n.mint,
            imageUri: n.image_uri ?? "",
            isBanned: n.is_banned ?? !1,
            symbol: n.symbol ?? "",
            name: n.name ?? "",
          };
      } else if (404 !== a) throw Error(`Coin lookup failed: ${a}`);
      let l = (0, v.h)(t),
        [s, o] = l
          ? [await (0, rx.W)(t, r), !1]
          : await Promise.all([
              ry(t, r),
              e.A(282851).then((e) => e.isSolanaMintOnChain(t, r)),
            ]);
      if (s)
        return {
          kind: "coin",
          coinAddress: s.address,
          imageUri: s.imageUri ?? "",
          isBanned: !1,
          symbol: s.symbol ?? "",
          name: s.name ?? "",
        };
      if (o)
        return {
          kind: "coin",
          coinAddress: t,
          imageUri: "",
          isBanned: !1,
          symbol: "",
          name: "",
        };
      let c = null;
      try {
        c = await i("GET /users/{id}", { params: { id: t } });
      } catch (e) {
        if (e instanceof DOMException && "AbortError" === e.name) throw e;
      }
      return l && !c
        ? null
        : {
            kind: "profile",
            address: (l && c?.address) || t,
            profileImage: c?.profile_image ?? null,
            username: c?.username ?? null,
          };
    };
  var rw = e.i(802630),
    r_ = e.i(375670),
    rj = e.i(897665);
  let rC =
      "flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border-tertiary bg-bg-secondary px-2",
    rN = (e) => {
      let a,
        i,
        n = (0, r.c)(12),
        { preview: l } = e,
        { t: s } = (0, d.f)();
      if ("coin" === l.kind) {
        let e,
          r = l.imageUri || "",
          a = l.name || l.symbol;
        return (
          n[0] !== l.coinAddress ||
          n[1] !== l.isBanned ||
          n[2] !== r ||
          n[3] !== a
            ? ((e = (0, t.jsx)(z.f, {
                sourceImageUrl: r,
                isBanned: l.isBanned,
                mint: l.coinAddress,
                imageType: K.d.COIN_IMAGE,
                alt: a,
                width: 20,
                height: 20,
                className: "size-5 shrink-0 rounded-full",
              })),
              (n[0] = l.coinAddress),
              (n[1] = l.isBanned),
              (n[2] = r),
              (n[3] = a),
              (n[4] = e))
            : (e = n[4]),
          e
        );
      }
      let o = l.profileImage ?? void 0;
      return (
        n[5] !== l.username || n[6] !== s
          ? ((a = l.username ?? s("web.topbar.wallet_avatar_alt")),
            (n[5] = l.username),
            (n[6] = s),
            (n[7] = a))
          : (a = n[7]),
        n[8] !== l.address || n[9] !== o || n[10] !== a
          ? ((i = (0, t.jsx)(F.f, {
              src: o,
              address: l.address,
              ipfsPrefix: rj.f,
              isAnonymous: !1,
              alt: a,
              width: 20,
              height: 20,
              className: "size-5 shrink-0 rounded-full",
            })),
            (n[8] = l.address),
            (n[9] = o),
            (n[10] = a),
            (n[11] = i))
          : (i = n[11]),
        i
      );
    },
    rS = (e) =>
      "coin" === e.kind
        ? e.symbol
          ? `$${e.symbol}`
          : (0, s.d)(e.coinAddress)
        : e.username || (0, s.d)(e.address),
    rk = (e, t) => {
      let r = rS(e);
      return t(
        "coin" === e.kind
          ? "web.topbar.open_coin_from_clipboard"
          : "web.topbar.open_profile_from_clipboard",
        { label: r },
      );
    },
    rE = (e) => {
      let a,
        i,
        l,
        s,
        o = (0, r.c)(9),
        { className: c, onClick: u } = e,
        { t: m } = (0, d.f)();
      return (
        o[0] !== m
          ? ((a = m("web.topbar.quick_paste_button")), (o[0] = m), (o[1] = a))
          : (a = o[1]),
        o[2] !== c
          ? ((i = (0, te.c)(rw.q, c)), (o[2] = c), (o[3] = i))
          : (i = o[3]),
        o[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = (0, t.jsx)(n.QO, { size: 16 })), (o[4] = l))
          : (l = o[4]),
        o[5] !== u || o[6] !== a || o[7] !== i
          ? ((s = (0, t.jsx)("button", {
              type: "button",
              onClick: u,
              "aria-label": a,
              className: i,
              children: l,
            })),
            (o[5] = u),
            (o[6] = a),
            (o[7] = i),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    },
    rA = (e) => {
      let a,
        i,
        l,
        s = (0, r.c)(5),
        { className: o } = e;
      return (
        s[0] !== o
          ? ((a = (0, te.c)(rw.q, o)), (s[0] = o), (s[1] = a))
          : (a = s[1]),
        s[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(n.QO, { size: 16 })), (s[2] = i))
          : (i = s[2]),
        s[3] !== a
          ? ((l = (0, t.jsx)("button", {
              type: "button",
              disabled: !0,
              "aria-hidden": !0,
              tabIndex: -1,
              className: a,
              children: i,
            })),
            (s[3] = a),
            (s[4] = l))
          : (l = s[4]),
        l
      );
    },
    rI = (e) => {
      let i,
        l,
        s,
        o,
        c,
        m,
        f,
        p = (0, r.c)(46),
        { className: h } = e,
        { t: b } = (0, d.f)(),
        {
          address: x,
          hasAutomaticRead: g,
          hasChecked: y,
          isSupported: v,
          requestRead: w,
        } = (() => {
          let e,
            t = (0, r.c)(5),
            {
              address: i,
              hasAutomaticRead: n,
              isSupported: l,
              hasChecked: s,
            } = (0, a.useSyncExternalStore)(rp, rh, rb);
          return (
            t[0] !== i || t[1] !== n || t[2] !== s || t[3] !== l
              ? ((e = {
                  address: i,
                  hasAutomaticRead: n,
                  isSupported: l,
                  hasChecked: s,
                  requestRead: rd,
                }),
                (t[0] = i),
                (t[1] = n),
                (t[2] = s),
                (t[3] = l),
                (t[4] = e))
              : (e = t[4]),
            e
          );
        })(),
        {
          data: _,
          isError: j,
          refetch: C,
        } = ((m = (0, r.c)(7)),
        (f = !!x),
        m[0] !== x
          ? ((s = ["quickPastePreview", x]),
            (o = (e) => {
              let { signal: t } = e;
              return rv(x, t);
            }),
            (m[0] = x),
            (m[1] = s),
            (m[2] = o))
          : ((s = m[1]), (o = m[2])),
        m[3] !== f || m[4] !== s || m[5] !== o
          ? ((c = {
              enabled: f,
              queryKey: s,
              queryFn: o,
              staleTime: 6e4,
              gcTime: 3e5,
              refetchOnWindowFocus: !1,
              refetchOnMount: !1,
              retry: 2,
            }),
            (m[3] = f),
            (m[4] = s),
            (m[5] = o),
            (m[6] = c))
          : (c = m[6]),
        (0, G.useQuery)(c));
      if (_) {
        let e, r, a, i, l, s, o, c, d;
        if (p[0] !== _)
          ((e =
            "coin" === _.kind ? `/coin/${_.coinAddress}` : (0, D.$)(_.address)),
            (p[0] = _),
            (p[1] = e));
        else e = p[1];
        return (
          p[2] !== _ || p[3] !== b
            ? ((r = rk(_, b)), (p[2] = _), (p[3] = b), (p[4] = r))
            : (r = p[4]),
          p[5] !== _ || p[6] !== b
            ? ((a = rk(_, b)), (p[5] = _), (p[6] = b), (p[7] = a))
            : (a = p[7]),
          p[8] !== h
            ? ((i = (0, te.c)(
                rC,
                "max-w-[180px] text-[13px] font-medium text-text-primary transition-colors hover:bg-bg-tertiary",
                rw.p,
                h,
              )),
              (p[8] = h),
              (p[9] = i))
            : (i = p[9]),
          p[10] !== _
            ? ((l = (0, t.jsx)(rN, { preview: _ })), (p[10] = _), (p[11] = l))
            : (l = p[11]),
          p[12] !== _ ? ((s = rS(_)), (p[12] = _), (p[13] = s)) : (s = p[13]),
          p[14] !== s
            ? ((o = (0, t.jsx)("span", { className: "truncate", children: s })),
              (p[14] = s),
              (p[15] = o))
            : (o = p[15]),
          p[16] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = (0, t.jsx)(n.kK, {
                className: "ml-auto shrink-0 text-text-quaternary",
                size: 14,
              })),
              (p[16] = c))
            : (c = p[16]),
          p[17] !== e ||
          p[18] !== r ||
          p[19] !== a ||
          p[20] !== i ||
          p[21] !== l ||
          p[22] !== o
            ? ((d = (0, t.jsxs)(P.default, {
                href: e,
                "aria-label": r,
                title: a,
                className: i,
                children: [l, o, c],
              })),
              (p[17] = e),
              (p[18] = r),
              (p[19] = a),
              (p[20] = i),
              (p[21] = l),
              (p[22] = o),
              (p[23] = d))
            : (d = p[23]),
          d
        );
      }
      if (!x) {
        let e, r;
        if (!y) {
          let e;
          return (
            p[24] !== h
              ? ((e = (0, t.jsx)(rA, { className: h })),
                (p[24] = h),
                (p[25] = e))
              : (e = p[25]),
            e
          );
        }
        if (!v || g) return null;
        p[26] !== w || p[27] !== b
          ? ((e = async () => {
              (await w()) ||
                (0, u.c)(b("web.topbar.quick_paste_empty_clipboard"));
            }),
            (p[26] = w),
            (p[27] = b),
            (p[28] = e))
          : (e = p[28]);
        let a = e;
        return (
          p[29] !== h || p[30] !== a
            ? ((r = (0, t.jsx)(rE, { className: h, onClick: a })),
              (p[29] = h),
              (p[30] = a),
              (p[31] = r))
            : (r = p[31]),
          r
        );
      }
      let N = null === _;
      if (!j && !N) {
        let e, r, a, i;
        return (
          p[32] !== h
            ? ((e = (0, te.c)(rC, "w-[120px]", h)), (p[32] = h), (p[33] = e))
            : (e = p[33]),
          p[34] === Symbol.for("react.memo_cache_sentinel")
            ? ((r = (0, t.jsx)(r_.f, {
                className: "size-5 rounded-full bg-bg-tertiary",
              })),
              (a = (0, t.jsx)(r_.f, {
                className: "h-2.5 w-12 rounded-sm bg-bg-tertiary",
              })),
              (p[34] = r),
              (p[35] = a))
            : ((r = p[34]), (a = p[35])),
          p[36] !== e
            ? ((i = (0, t.jsxs)("div", {
                className: e,
                "aria-hidden": !0,
                children: [r, a],
              })),
              (p[36] = e),
              (p[37] = i))
            : (i = p[37]),
          i
        );
      }
      p[38] !== C || p[39] !== w || p[40] !== N || p[41] !== b
        ? ((i = async () => {
            if (!(await w()))
              return void (0, u.c)(b("web.topbar.quick_paste_empty_clipboard"));
            let e = await C();
            N &&
              null === e.data &&
              (0, u.c)(b("web.topbar.quick_paste_empty_clipboard"));
          }),
          (p[38] = C),
          (p[39] = w),
          (p[40] = N),
          (p[41] = b),
          (p[42] = i))
        : (i = p[42]);
      let S = i;
      return (
        p[43] !== h || p[44] !== S
          ? ((l = (0, t.jsx)(rE, { className: h, onClick: S })),
            (p[43] = h),
            (p[44] = S),
            (p[45] = l))
          : (l = p[45]),
        l
      );
    },
    rT = (0, e.i(763916).f)(
      () => e.A(544865),
      (e) => {
        tU.y.warn("Search dialog chunk warm-up failed", {
          reason: e instanceof Error ? e.message : String(e),
        });
      },
    ),
    rR = rT.load,
    rL = rT.warm;
  var rO = e.i(599077);
  let rM = new Set(["/", "/go", "/live"]);
  function rD() {
    let e,
      a,
      i,
      l,
      s = (0, r.c)(8),
      { t: o } = (0, d.f)(),
      c = (0, rO.usePathname)(),
      u = (0, rO.useRouter)();
    if (rM.has(c)) return null;
    s[0] !== u
      ? ((e = () => {
          window.history.length > 1 ? u.back() : u.push("/");
        }),
        (s[0] = u),
        (s[1] = e))
      : (e = s[1]);
    let m = e;
    return (
      s[2] !== o
        ? ((a = o("common.go_back")), (s[2] = o), (s[3] = a))
        : (a = s[3]),
      s[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(n.S, { size: 16 })), (s[4] = i))
        : (i = s[4]),
      s[5] !== m || s[6] !== a
        ? ((l = (0, t.jsx)("button", {
            type: "button",
            onClick: m,
            "aria-label": a,
            className: rw.q,
            children: i,
          })),
          (s[5] = m),
          (s[6] = a),
          (s[7] = l))
        : (l = s[7]),
      l
    );
  }
  var rF = e.i(554056),
    rP = e.i(410718),
    rz = e.i(171840),
    rK = e.i(382828),
    rB = e.i(886973),
    rH = e.i(184909);
  function rq() {
    let e,
      i,
      l,
      s,
      c,
      d,
      u,
      m = (0, r.c)(22),
      { address: f } = (0, o.F)(),
      { setShowWallet: p } = (0, t6.useConnectWallet)(),
      { open: h } = (0, rP.useBountyCreateDialog)(),
      { open: b } = (0, rH.useUserVideoUploadDialog)(),
      x = (0, V.k)(U.D.USER_VIDEOS),
      [g, y] = (0, a.useState)(!1),
      [v, w] = (0, a.useState)(!1);
    if (m[0] !== f || m[1] !== x || m[2] !== h || m[3] !== b || m[4] !== p) {
      let r, a, i, l;
      (m[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)(n.$2, {})), (m[6] = r))
        : (r = m[6]),
        m[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)(n.s4, {})), (m[7] = a))
          : (a = m[7]),
        m[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)(n.EX, {})), (m[8] = i))
          : (i = m[8]),
        m[9] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = (0, t.jsx)(n.vW, {})), (m[9] = l))
          : (l = m[9]),
        (e = [
          {
            label: "New coin",
            icon: r,
            onClick: function () {
              ((0, e9.gt)({ source: "navbar" }),
                window.dispatchEvent(new Event("exit-search")));
            },
            href: "/create",
          },
          {
            label: "Go live",
            icon: a,
            onClick: function () {
              f ? y(!0) : p(!0);
            },
          },
          ...(x
            ? [
                {
                  label: "Upload video",
                  icon: (0, t.jsx)(n.wP, {}),
                  onClick: function () {
                    f ? b() : p(!0);
                  },
                },
              ]
            : []),
          {
            label: "Callout",
            icon: i,
            onClick: function () {
              f ? ((0, e9.bh)(), w(!0)) : p(!0);
            },
          },
          {
            label: "Post bounty",
            icon: l,
            onClick: function () {
              f ? h() : p(!0);
            },
          },
        ]),
        (m[0] = f),
        (m[1] = x),
        (m[2] = h),
        (m[3] = b),
        (m[4] = p),
        (m[5] = e));
    } else e = m[5];
    return (
      m[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, te.c)(
            rw.c,
            "data-[popup-open]:bg-bg-tertiary data-[popup-open]:text-text-primary",
          )),
          (m[10] = i))
        : (i = m[10]),
      m[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(rB.f, {
            render: (0, t.jsx)(t$._, {
              density: "comfortable",
              size: 32,
              variant: "outlined",
              "aria-label": tY.f.NAV_BAR.BUTTON.CREATE,
              className: i,
              "data-testid": "topbar-create-button",
              children: (0, t.jsx)(n.YC, { "aria-hidden": !0 }),
            }),
          })),
          (m[11] = l))
        : (l = m[11]),
      m[12] !== e
        ? ((s = (0, t.jsxs)(rK.f, {
            modal: !1,
            children: [
              l,
              (0, t.jsx)(N.f, {
                align: "end",
                sideOffset: 8,
                className: "!w-auto",
                children: e.map(rW),
              }),
            ],
          })),
          (m[12] = e),
          (m[13] = s))
        : (s = m[13]),
      m[14] !== g
        ? ((c = (0, t.jsx)(rF.f, { isOpen: g, onOpenChange: y })),
          (m[14] = g),
          (m[15] = c))
        : (c = m[15]),
      m[16] !== v
        ? ((d = (0, t.jsx)(rz.f, { isOpen: v, onOpenChange: w })),
          (m[16] = v),
          (m[17] = d))
        : (d = m[17]),
      m[18] !== s || m[19] !== c || m[20] !== d
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [s, c, d] })),
          (m[18] = s),
          (m[19] = c),
          (m[20] = d),
          (m[21] = u))
        : (u = m[21]),
      u
    );
  }
  function rW(e) {
    return (0, t.jsxs)(
      S.f,
      {
        onClick: e.onClick,
        ...(e.href ? { render: (0, t.jsx)(P.default, { href: e.href }) } : {}),
        children: [e.icon, e.label],
      },
      e.label,
    );
  }
  var rU = e.i(983044),
    rV = e.i(148269),
    rG = e.i(84121),
    r$ = e.i(946129),
    rQ = e.i(82604);
  function rZ() {
    let e,
      a,
      i,
      n = (0, r.c)(13),
      {
        handleExitSearchMode: l,
        isSearchMode: s,
        sortBeforeSearch: o,
      } = (0, tX.u)(),
      { setRawHomeSort: c } = (0, r$.f)(),
      { homeOffset: d, setHomeOffset: u } = (0, rG.f)(),
      m = (0, rO.usePathname)(),
      f = (0, rQ.f)(m) ? "go" : "default";
    n[0] !== l ||
    n[1] !== d ||
    n[2] !== s ||
    n[3] !== m ||
    n[4] !== u ||
    n[5] !== c ||
    n[6] !== o
      ? ((e = function () {
          "/explore" === m &&
            (0 !== d && u(0), s && (l(), c((0, rV.D)(o.current))));
        }),
        (n[0] = l),
        (n[1] = d),
        (n[2] = s),
        (n[3] = m),
        (n[4] = u),
        (n[5] = c),
        (n[6] = o),
        (n[7] = e))
      : (e = n[7]);
    let p = e;
    return (
      n[8] !== f
        ? ((a = (0, t.jsx)(rU.f, { isCollapsed: !0, variant: f })),
          (n[8] = f),
          (n[9] = a))
        : (a = n[9]),
      n[10] !== p || n[11] !== a
        ? ((i = (0, t.jsx)(P.default, {
            className:
              "items-center justify-center shrink-0 hidden max-md:flex",
            href: "/",
            onClick: p,
            children: a,
          })),
          (n[10] = p),
          (n[11] = a),
          (n[12] = i))
        : (i = n[12]),
      i
    );
  }
  function rY() {
    let e,
      a = (0, r.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("button", {
            "aria-hidden": !0,
            className: rw.q,
            disabled: !0,
            tabIndex: -1,
            type: "button",
            children: (0, t.jsx)(n.YM, { size: 16 }),
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  }
  var rX = e.i(205761),
    rJ = e.i(465085),
    r1 = e.i(890088),
    r0 = e.i(592209);
  let r2 = [
    {
      id: "pumpfun-go",
      title: "Pump.fun GO is live",
      description:
        "Post bounties or submit work to earn rewards from the community.",
      publishedAt: "2026-06-04T00:00:00Z",
      href: "/go",
    },
    {
      id: "narrative-mode",
      title: "Improved coin narratives",
      description: "Quickly understand the narratives of top coins.",
      publishedAt: "2026-05-06",
    },
    {
      id: "coin-voice-chat",
      title: "Coin voice chats",
      description:
        "Drop into a voice chat on any coin page and trade alongside the community.",
      publishedAt: "2026-05-06",
      flag: U.D.WEB_VOICE_CHAT,
    },
    {
      id: "charity-coins",
      title: "Charity coins",
      description:
        "Create charity coins to raise funds for causes you care about.",
      publishedAt: "2026-04-29",
    },
    {
      id: "x-profile-badge",
      title: "X profile badge",
      description: "Verify your X account and display a badge on your profile.",
      publishedAt: "2026-04-28",
    },
  ];
  function r3() {
    let e,
      t = (0, r.c)(2),
      a = (0, V.p)();
    return (
      t[0] !== a
        ? ((e = r2.filter((e) => !e.flag || a(e.flag)).sort(r4)),
          (t[0] = a),
          (t[1] = e))
        : (e = t[1]),
      e
    );
  }
  function r4(e, t) {
    return Date.parse(t.publishedAt) - Date.parse(e.publishedAt);
  }
  var r5 = e.i(78436),
    r6 = e.i(634103);
  let r8 = { readIds: {}, isOpen: !1 },
    r7 = (0, r5.$)()(
      (0, r6.V)(
        (e) => ({
          ...r8,
          markRead: (t) =>
            e((e) =>
              e.readIds[t]
                ? e
                : { readIds: { ...e.readIds, [t]: new Date().toISOString() } },
            ),
          setIsOpen: (t) => e({ isOpen: t }),
        }),
        {
          name: "product-updates-read-v1",
          storage: (0, r6.j)(() => localStorage),
          partialize: (e) => ({ readIds: e.readIds }),
        },
      ),
    ),
    r9 = (e) => e.readIds,
    ae = (e) => e.isOpen,
    at = (e) => e.markRead,
    ar = (e) => e.setIsOpen;
  function aa() {
    let e,
      t,
      a = (0, r.c)(8),
      i = r3(),
      n = r7(r9),
      l = Date.now() - 2592e6;
    if (a[0] !== n || a[1] !== i) {
      let t;
      (a[3] !== n
        ? ((t = (e) => {
            if (n[e.id]) return !1;
            let t = Date.parse(e.publishedAt);
            return !Number.isNaN(t) && t >= l;
          }),
          (a[3] = n),
          (a[4] = t))
        : (t = a[4]),
        (e = i.filter(t).map(ai)),
        (a[0] = n),
        (a[1] = i),
        (a[2] = e));
    } else e = a[2];
    let s = e,
      o = s.length > 0;
    return (
      a[5] !== o || a[6] !== s
        ? ((t = { unreadIds: s, hasUnread: o }),
          (a[5] = o),
          (a[6] = s),
          (a[7] = t))
        : (t = a[7]),
      t
    );
  }
  function ai(e) {
    return e.id;
  }
  function an(e) {
    let i,
      l,
      s,
      o,
      c,
      u,
      m,
      f,
      p,
      h,
      b,
      x = (0, r.c)(31),
      { trigger: g } = e,
      { t: y } = (0, d.f)(),
      v = r7(ae),
      w = r7(ar),
      _ = r3(),
      j = r7(at),
      { unreadIds: C } = aa();
    x[0] !== C ? ((i = new Set(C)), (x[0] = C), (x[1] = i)) : (i = x[1]);
    let N = i,
      S = (0, a.useRef)(null);
    return (
      x[2] !== g
        ? ((l = (0, t.jsx)(eq.J, { asChild: !0, children: g })),
          (x[2] = g),
          (x[3] = l))
        : (l = x[3]),
      x[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(n.xI, { className: "text-primary size-4" })),
          (x[4] = s))
        : (s = x[4]),
      x[5] !== y
        ? ((o = y("web.product_updates.whats_new")), (x[5] = y), (x[6] = o))
        : (o = x[6]),
      x[7] !== o
        ? ((c = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              s,
              (0, t.jsx)("h2", {
                className: "text-text-primary text-sm font-semibold",
                children: o,
              }),
            ],
          })),
          (x[7] = o),
          (x[8] = c))
        : (c = x[8]),
      x[9] !== y || x[10] !== C.length
        ? ((u =
            C.length > 0
              ? (0, t.jsx)(
                  rJ.f.span,
                  {
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.9 },
                    transition: { duration: 0.18 },
                    className: "text-text-tertiary text-xs tabular-nums",
                    children: y("web.product_updates.new_count", {
                      count: C.length,
                    }),
                  },
                  "unread-count",
                )
              : null),
          (x[9] = y),
          (x[10] = C.length),
          (x[11] = u))
        : (u = x[11]),
      x[12] !== u
        ? ((m = (0, t.jsx)(rX.f, { initial: !1, children: u })),
          (x[12] = u),
          (x[13] = m))
        : (m = x[13]),
      x[14] !== c || x[15] !== m
        ? ((f = (0, t.jsxs)("header", {
            className:
              "border-border-secondary flex items-center justify-between border-b px-4 py-3",
            children: [c, m],
          })),
          (x[14] = c),
          (x[15] = m),
          (x[16] = f))
        : (f = x[16]),
      x[17] !== j || x[18] !== w || x[19] !== y || x[20] !== N || x[21] !== _
        ? ((p =
            0 === _.length
              ? (0, t.jsx)("div", {
                  className:
                    "text-text-tertiary px-4 py-10 text-center text-sm",
                  children: y("web.product_updates.empty"),
                })
              : (0, t.jsx)("ul", {
                  ref: S,
                  className:
                    "flex max-h-[420px] flex-col gap-px overflow-y-auto p-2",
                  children: _.map((e, r) =>
                    (0, t.jsx)(
                      al,
                      {
                        update: e,
                        isUnread: N.has(e.id),
                        isLatest: 0 === r,
                        index: r,
                        scrollListRef: S,
                        onSeen: () => j(e.id),
                        onNavigate: () => w(!1),
                      },
                      e.id,
                    ),
                  ),
                })),
          (x[17] = j),
          (x[18] = w),
          (x[19] = y),
          (x[20] = N),
          (x[21] = _),
          (x[22] = p))
        : (p = x[22]),
      x[23] !== f || x[24] !== p
        ? ((h = (0, t.jsxs)(eq.T, {
            align: "end",
            sideOffset: 10,
            className:
              "bg-bg-tertiary border-border-tertiary text-text-primary z-50 w-[360px] overflow-hidden rounded-2xl border p-0 shadow-2xl",
            children: [f, p],
          })),
          (x[23] = f),
          (x[24] = p),
          (x[25] = h))
        : (h = x[25]),
      x[26] !== v || x[27] !== w || x[28] !== h || x[29] !== l
        ? ((b = (0, t.jsxs)(eq.V, {
            open: v,
            onOpenChange: w,
            children: [l, h],
          })),
          (x[26] = v),
          (x[27] = w),
          (x[28] = h),
          (x[29] = l),
          (x[30] = b))
        : (b = x[30]),
      b
    );
  }
  function al(e) {
    let i,
      l,
      s,
      o,
      c,
      u,
      m,
      f,
      p,
      h,
      b,
      x,
      g,
      y,
      v,
      w,
      _,
      j,
      C,
      N = (0, r.c)(53),
      {
        update: S,
        isUnread: k,
        isLatest: E,
        index: A,
        scrollListRef: I,
        onSeen: T,
        onNavigate: R,
      } = e,
      { t: L, i18n: O } = (0, d.f)(),
      M = (0, r0.v)(O.language) ?? "en",
      D = (0, a.useRef)(null),
      F = (0, a.useRef)(T);
    (N[0] !== T
      ? ((i = () => {
          F.current = T;
        }),
        (N[0] = T),
        (N[1] = i))
      : (i = N[1]),
      (0, a.useEffect)(i),
      N[2] !== k || N[3] !== I
        ? ((l = () => {
            let e = D.current,
              t = I.current;
            if (!e || !k || !t) return;
            let r = new IntersectionObserver(
              (e) => {
                for (let t of e)
                  if (
                    !t.isIntersecting &&
                    t.rootBounds &&
                    t.boundingClientRect.bottom <= t.rootBounds.top
                  ) {
                    (F.current(), r.disconnect());
                    return;
                  }
              },
              { root: t },
            );
            return (r.observe(e), () => r.disconnect());
          }),
          (s = [k, I]),
          (N[2] = k),
          (N[3] = I),
          (N[4] = l),
          (N[5] = s))
        : ((l = N[4]), (s = N[5])),
      (0, a.useEffect)(l, s),
      N[6] !== k || N[7] !== T
        ? ((o = () => {
            k && T();
          }),
          (N[6] = k),
          (N[7] = T),
          (N[8] = o))
        : (o = N[8]));
    let z = o,
      K = rJ.f;
    N[9] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = { opacity: 0, y: 6 }),
        (u = { opacity: 1, y: 0 }),
        (N[9] = c),
        (N[10] = u))
      : ((c = N[9]), (u = N[10]));
    let B = Math.min(0.03 * A, 0.15);
    N[11] !== B
      ? ((m = { duration: 0.2, delay: B }), (N[11] = B), (N[12] = m))
      : (m = N[12]);
    let H = E
      ? "from-primary/[0.10] ring-primary/25 hover:from-primary/[0.14] overflow-hidden bg-gradient-to-br to-transparent ring-1 ring-inset"
      : "hover:bg-bg-secondary";
    (N[13] !== H
      ? ((f = (0, tV.c)(
          "group relative flex shrink-0 flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors",
          H,
        )),
        (N[13] = H),
        (N[14] = f))
      : (f = N[14]),
      N[15] !== z || N[16] !== R || N[17] !== S.href || N[18] !== S.title
        ? ((p = S.href
            ? (0, t.jsx)(P.default, {
                "aria-label": S.title,
                className:
                  "focus-visible:ring-primary/40 absolute inset-0 z-10 rounded-lg focus-visible:ring-2 focus-visible:outline-none",
                href: S.href,
                onClick: () => {
                  (z(), R());
                },
              })
            : null),
          (N[15] = z),
          (N[16] = R),
          (N[17] = S.href),
          (N[18] = S.title),
          (N[19] = p))
        : (p = N[19]),
      N[20] !== E
        ? ((h = E
            ? (0, t.jsx)(rJ.f.span, {
                "aria-hidden": !0,
                initial: { x: "-120%", opacity: 0 },
                animate: { x: "220%", opacity: [0, 1, 0] },
                transition: { delay: 0.45, duration: 1.1, ease: "easeOut" },
                className:
                  "pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent",
              })
            : null),
          (N[20] = E),
          (N[21] = h))
        : (h = N[21]),
      N[22] !== E
        ? ((b = E
            ? (0, t.jsx)(n.Ip, {
                className: "text-primary size-3.5 shrink-0",
                "aria-hidden": !0,
              })
            : null),
          (N[22] = E),
          (N[23] = b))
        : (b = N[23]),
      N[24] !== S.title
        ? ((x = (0, t.jsx)("span", {
            className:
              "text-text-primary truncate text-sm font-medium leading-snug",
            children: S.title,
          })),
          (N[24] = S.title),
          (N[25] = x))
        : (x = N[25]),
      N[26] !== b || N[27] !== x
        ? ((g = (0, t.jsxs)("div", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [b, x],
          })),
          (N[26] = b),
          (N[27] = x),
          (N[28] = g))
        : (g = N[28]),
      N[29] !== k || N[30] !== L
        ? ((y = k
            ? (0, t.jsx)(
                rJ.f.span,
                {
                  initial: { opacity: 0, scale: 0.85 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.85 },
                  transition: { duration: 0.18 },
                  className:
                    "text-primary bg-primary/10 mt-px shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  children: L("web.nav.new"),
                },
                "new-pill",
              )
            : null),
          (N[29] = k),
          (N[30] = L),
          (N[31] = y))
        : (y = N[31]),
      N[32] !== y
        ? ((v = (0, t.jsx)(rX.f, { initial: !1, children: y })),
          (N[32] = y),
          (N[33] = v))
        : (v = N[33]),
      N[34] !== g || N[35] !== v
        ? ((w = (0, t.jsxs)("div", {
            className: "relative flex items-start justify-between gap-3",
            children: [g, v],
          })),
          (N[34] = g),
          (N[35] = v),
          (N[36] = w))
        : (w = N[36]),
      N[37] !== S.description
        ? ((_ = (0, t.jsx)("p", {
            className: "text-text-secondary relative text-xs leading-relaxed",
            children: S.description,
          })),
          (N[37] = S.description),
          (N[38] = _))
        : (_ = N[38]));
    let q = (function ({ iso: e, t, locale: r }) {
      let a = Date.parse(e);
      if (Number.isNaN(a)) return e;
      let i = Math.floor((Date.now() - a) / 864e5);
      return i <= 0
        ? t("time.today")
        : 1 === i
          ? t("time.yesterday")
          : i < 7
            ? t("web.product_updates.days_ago", { count: i })
            : i < 28
              ? t("common.time_ago", {
                  time: `${Math.round(i / 7)}${t("time.abbreviations.week")}`,
                })
              : (0, r1.r)(r, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(a));
    })({ iso: S.publishedAt, t: L, locale: M });
    return (
      N[39] !== q
        ? ((j = (0, t.jsx)("p", {
            className: "text-text-tertiary relative text-[11px] tabular-nums",
            children: q,
          })),
          (N[39] = q),
          (N[40] = j))
        : (j = N[40]),
      N[41] !== z ||
      N[42] !== f ||
      N[43] !== p ||
      N[44] !== h ||
      N[45] !== w ||
      N[46] !== _ ||
      N[47] !== j ||
      N[48] !== K.li ||
      N[49] !== c ||
      N[50] !== u ||
      N[51] !== m
        ? ((C = (0, t.jsxs)(K.li, {
            ref: D,
            initial: c,
            animate: u,
            transition: m,
            onMouseEnter: z,
            onClick: z,
            className: f,
            children: [p, h, w, _, j],
          })),
          (N[41] = z),
          (N[42] = f),
          (N[43] = p),
          (N[44] = h),
          (N[45] = w),
          (N[46] = _),
          (N[47] = j),
          (N[48] = K.li),
          (N[49] = c),
          (N[50] = u),
          (N[51] = m),
          (N[52] = C))
        : (C = N[52]),
      C
    );
  }
  function as() {
    let e,
      i,
      l = (0, r.c)(5),
      s = (() => {
        let e,
          t,
          i = (0, r.c)(2),
          [n, l] = (0, a.useState)(!1);
        return (
          i[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = () =>
                r7.persist?.hasHydrated()
                  ? void l(!0)
                  : r7.persist?.onFinishHydration(() => {
                      l(!0);
                    })),
              (t = []),
              (i[0] = e),
              (i[1] = t))
            : ((e = i[0]), (t = i[1])),
          (0, a.useEffect)(e, t),
          n
        );
      })(),
      { hasUnread: o } = aa(),
      c = r7(ae),
      d = s && (o || c);
    return (
      l[0] !== o || l[1] !== d
        ? ((e = d
            ? (0, t.jsx)(
                rJ.f.div,
                {
                  initial: { opacity: 0, scale: 0.92 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.92 },
                  transition: { duration: 0.18 },
                  children: (0, t.jsx)(an, {
                    trigger: (0, t.jsxs)("div", {
                      className: "relative",
                      children: [
                        (0, t.jsx)("button", {
                          className: rw.q,
                          type: "button",
                          "aria-label": o
                            ? "View new product updates"
                            : "View product updates",
                          "data-testid": "topbar-product-updates-shortcut",
                          children: (0, t.jsx)(n.xI, { size: 16 }),
                        }),
                        (0, t.jsx)(rX.f, {
                          initial: !1,
                          children: o
                            ? (0, t.jsx)(
                                rJ.f.span,
                                {
                                  "aria-hidden": !0,
                                  initial: { opacity: 0, scale: 0.5 },
                                  animate: { opacity: 1, scale: 1 },
                                  exit: { opacity: 0, scale: 0.5 },
                                  transition: { duration: 0.18 },
                                  className:
                                    "bg-bg-primary pointer-events-none absolute right-0.5 top-0.5 flex size-3 items-center justify-center rounded-full",
                                  children: (0, t.jsxs)("span", {
                                    className: "relative flex size-2",
                                    children: [
                                      (0, t.jsx)("span", {
                                        className:
                                          "absolute inset-0 animate-ping rounded-full bg-red-500 opacity-60",
                                      }),
                                      (0, t.jsx)("span", {
                                        className:
                                          "relative size-2 rounded-full bg-red-500",
                                      }),
                                    ],
                                  }),
                                },
                                "unread-dot",
                              )
                            : null,
                        }),
                      ],
                    }),
                  }),
                },
                "topbar-product-updates-shortcut",
              )
            : null),
          (l[0] = o),
          (l[1] = d),
          (l[2] = e))
        : (e = l[2]),
      l[3] !== e
        ? ((i = (0, t.jsx)(rX.f, { initial: !1, children: e })),
          (l[3] = e),
          (l[4] = i))
        : (i = l[4]),
      i
    );
  }
  var ao = e.i(410668);
  function ac() {
    let e,
      a = (0, r.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsxs)("span", {
            "aria-hidden": !0,
            className: rw.u,
            children: [
              (0, t.jsx)("span", {
                className: "h-3 w-14 rounded-md bg-bg-tertiary",
              }),
              (0, t.jsx)("span", {
                className: "size-3.5 shrink-0 rounded-md bg-bg-tertiary",
              }),
            ],
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  }
  var ad = e.i(283087),
    au = e.i(119452);
  function am(e) {
    return e.state.dataUpdatedAt;
  }
  var af = e.i(154153),
    ap = e.i(4327),
    ah = e.i(258861);
  let ab = "signup",
    ax = "referral",
    ag = () => () => {},
    ay = () => !1;
  function av() {
    try {
      return "1" === new URLSearchParams(window.location.search).get(ab);
    } catch {
      return !1;
    }
  }
  function aw() {
    try {
      let e = new URL(window.location.href);
      if (!e.searchParams.has(ab)) return;
      (e.searchParams.delete(ab),
        e.searchParams.delete(ax),
        window.history.replaceState(
          null,
          "",
          `${e.pathname}${e.search}${e.hash}`,
        ));
    } catch {}
  }
  var a_ = e.i(952366),
    aj = e.i(181789),
    aC = e.i(331809),
    aN = e.i(96906),
    aS = e.i(937164),
    ak = e.i(266300),
    aE = e.i(248208),
    aA = e.i(127962);
  let aI = null,
    aT = () => {
      (aI ??= e.A(766733).catch((e) => {
        throw ((aI = null), e);
      })).catch((e) => {
        tU.y.warn("Wallet chunk warm-up failed", {
          reason: e instanceof Error ? e.message : String(e),
        });
      });
    },
    aR = (0, tG.default)(() => rR().then((e) => e.SearchDialogLazy), {
      ssr: !1,
    }),
    aL = (0, tG.default)(() => e.A(233555).then((e) => e.Wallet), {
      loadableGenerated: { modules: [544115] },
      loading: function (e) {
        let i,
          n,
          l,
          s,
          o,
          c,
          m,
          f,
          p,
          h,
          b,
          x,
          g,
          y,
          v = (0, r.c)(36);
        v[0] !== e
          ? ((i = void 0 === e ? {} : e), (v[0] = e), (v[1] = i))
          : (i = v[1]);
        let { error: w, retry: _ } = i,
          { t: j } = (0, d.f)(),
          { setShowWallet: C, showWallet: N } = (0, t6.useConnectWallet)(),
          [S, k] = (0, a.useState)(!1);
        (v[2] !== w || v[3] !== S
          ? ((n = () => {
              if (w || S) return;
              let e = window.setTimeout(() => {
                k(!0);
              }, 15e3);
              return () => window.clearTimeout(e);
            }),
            (l = [w, S]),
            (v[2] = w),
            (v[3] = S),
            (v[4] = n),
            (v[5] = l))
          : ((n = v[4]), (l = v[5])),
          (0, a.useEffect)(n, l));
        let E = (0, a.useRef)(!1);
        (v[6] !== w || v[7] !== S || v[8] !== j
          ? ((s = () => {
              if (!w && !S) {
                E.current = !1;
                return;
              }
              if (E.current) return;
              E.current = !0;
              let e = !w && S,
                t = w ? (w && (w.message || w.name)) || "unknown" : "timeout",
                r = e
                  ? j("web.auth.sign_in_timeout_toast")
                  : j("web.auth.sign_in_open_failed_toast");
              (u.c.error(r),
                tU.y.error("Wallet chunk failed to load", {
                  reason: t,
                  timedOut: S,
                }),
                (0, e9.Wz)({
                  authMethod: t5.pi.UNSPECIFIED,
                  errorCategory: e ? t5.TF.TIMEOUT : t5.TF.NETWORK,
                  errorReason: e
                    ? "wallet_chunk_timeout"
                    : "wallet_chunk_failed",
                  sourceElement: t5.k9.LOGIN_START,
                }));
            }),
            (o = [w, S, j]),
            (v[6] = w),
            (v[7] = S),
            (v[8] = j),
            (v[9] = s),
            (v[10] = o))
          : ((s = v[9]), (o = v[10])),
          (0, a.useEffect)(s, o),
          v[11] !== _
            ? ((c = () => {
                (k(!1), _?.());
              }),
              (v[11] = _),
              (v[12] = c))
            : (c = v[12]));
        let A = c;
        if (!N) return null;
        let I = !!w || S,
          T = !w && S,
          R = I ? "sign-in-error-title" : "sign-in-loading-title",
          L = I ? "alertdialog" : "dialog";
        return (
          v[13] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (0, t.jsx)("div", {
                className:
                  "fixed inset-0 z-[998] bg-black/60 backdrop-blur-[4px]",
              })),
              (v[13] = m))
            : (m = v[13]),
          v[14] !== C
            ? ((f = () => C(!1)), (v[14] = C), (v[15] = f))
            : (f = v[15]),
          v[16] !== j
            ? ((p = j("common.close")), (v[16] = j), (v[17] = p))
            : (p = v[17]),
          v[18] !== j
            ? ((h = j("common.close")), (v[18] = j), (v[19] = h))
            : (h = v[19]),
          v[20] !== f || v[21] !== p || v[22] !== h
            ? ((b = (0, t.jsx)("button", {
                type: "button",
                onClick: f,
                "aria-label": p,
                className:
                  "hover:bg-bg-secondary absolute right-3 top-3 rounded-lg px-2 py-1 text-xs transition-colors",
                children: h,
              })),
              (v[20] = f),
              (v[21] = p),
              (v[22] = h),
              (v[23] = b))
            : (b = v[23]),
          v[24] !== A || v[25] !== I || v[26] !== T || v[27] !== j
            ? ((x = I
                ? (0, t.jsxs)("div", {
                    className: "flex flex-col items-center gap-3 py-6",
                    "data-testid": "sign-in-error",
                    children: [
                      (0, t.jsx)("div", {
                        "aria-hidden": "true",
                        className:
                          "flex size-10 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-300",
                        children: (0, t.jsx)("span", {
                          className: "text-xl font-semibold leading-none",
                          children: "!",
                        }),
                      }),
                      (0, t.jsx)("div", {
                        id: "sign-in-error-title",
                        className: "text-lg font-semibold",
                        children: j("web.auth.sign_in_open_failed_title"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-sm",
                        children: T
                          ? j("web.auth.sign_in_timeout_description")
                          : j("web.auth.sign_in_error_description"),
                      }),
                      (0, t.jsxs)("div", {
                        className: "mt-2 flex w-full flex-col gap-2",
                        children: [
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: A,
                            "data-testid": "sign-in-retry",
                            className:
                              "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                            children: j("web.common.try_again"),
                          }),
                          (0, t.jsx)("button", {
                            type: "button",
                            onClick: t8,
                            "data-testid": "sign-in-reload",
                            className:
                              "hover:bg-bg-secondary text-text-secondary rounded-xl px-3 py-2 text-sm transition-colors",
                            children: j("web.auth.refresh_the_page"),
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, t.jsxs)("div", {
                    className: "flex flex-col items-center gap-3 py-6",
                    children: [
                      (0, t.jsx)("div", {
                        "aria-hidden": "true",
                        className:
                          "border-text-tertiary size-6 animate-spin rounded-full border-2 border-t-white",
                      }),
                      (0, t.jsx)("div", {
                        id: "sign-in-loading-title",
                        className: "text-lg font-semibold",
                        children: j("web.auth.opening_sign_in"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-text-tertiary text-sm",
                        children: j("web.auth.loading_wallet_options"),
                      }),
                    ],
                  })),
              (v[24] = A),
              (v[25] = I),
              (v[26] = T),
              (v[27] = j),
              (v[28] = x))
            : (x = v[28]),
          v[29] !== b || v[30] !== x
            ? ((g = (0, t.jsxs)("div", {
                className:
                  "fixed left-1/2 top-1/2 z-[999] w-full max-w-[min(356px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-border-secondary bg-bg-primary p-4 text-center text-white shadow-2xl",
                children: [b, x],
              })),
              (v[29] = b),
              (v[30] = x),
              (v[31] = g))
            : (g = v[31]),
          v[32] !== g || v[33] !== R || v[34] !== L
            ? ((y = (0, t.jsxs)("div", {
                "aria-labelledby": R,
                "aria-modal": "true",
                role: L,
                children: [m, g],
              })),
              (v[32] = g),
              (v[33] = R),
              (v[34] = L),
              (v[35] = y))
            : (y = v[35]),
          y
        );
      },
      ssr: !1,
    }),
    aO = (0, tG.default)(
      () => e.A(203209).then((e) => e.TopbarNotificationsButton),
      { loadableGenerated: { modules: [178148] }, loading: rY, ssr: !1 },
    ),
    aM = (0, tG.default)(() => e.A(612648).then((e) => e.TopbarDmShortcut), {
      loadableGenerated: { modules: [960923] },
      loading: function () {
        let e,
          a = (0, r.c)(1);
        return (
          a[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)("button", {
                "aria-hidden": !0,
                className: rw.q,
                disabled: !0,
                tabIndex: -1,
                type: "button",
                children: (0, t.jsx)(n.t7, { size: 16 }),
              })),
              (a[0] = e))
            : (e = a[0]),
          e
        );
      },
      ssr: !1,
    }),
    aD = (0, tG.default)(
      () => e.A(543301).then((e) => e.DmRealtimeSignalSubscriber),
      { loadableGenerated: { modules: [12404] }, ssr: !1 },
    ),
    aF = (0, tG.default)(
      () => e.A(588540).then((e) => e.NatsPerUserAuthController),
      { loadableGenerated: { modules: [993565] }, ssr: !1 },
    ),
    aP = (0, tG.default)(() => e.A(363147).then((e) => e.TopbarUser), {
      loadableGenerated: { modules: [501542] },
      loading: function () {
        let e,
          a = (0, r.c)(3),
          { address: i } = (0, o.F)(),
          n = (0, ao.f)(),
          l = i ?? void 0;
        return (
          a[0] !== n || a[1] !== l
            ? ((e = (0, t.jsx)("span", {
                "aria-hidden": !0,
                className: rw.K,
                children: (0, t.jsx)("span", {
                  className: rw.k,
                  children: (0, t.jsx)(F.f, {
                    className: "size-7 rounded-full object-cover",
                    ipfsPrefix: rj.f,
                    isAnonymous: !1,
                    src: n,
                    address: l,
                    width: 56,
                    height: 56,
                  }),
                }),
              })),
              (a[0] = n),
              (a[1] = l),
              (a[2] = e))
            : (e = a[2]),
          e
        );
      },
      ssr: !1,
    }),
    az = (0, tG.default)(() => e.A(477724).then((e) => e.TopbarSquad), {
      loadableGenerated: { modules: [201868] },
      ssr: !1,
    }),
    aK = (0, tG.default)(() => e.A(80101).then((e) => e.TopbarWallet), {
      loadableGenerated: { modules: [502544] },
      loading: function () {
        let e,
          a = (0, r.c)(1);
        return (
          a[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(ac, {})), (a[0] = e))
            : (e = a[0]),
          e
        );
      },
      ssr: !1,
    }),
    aB = `flex h-8 shrink-0 cursor-default select-none items-center justify-center rounded-md bg-bg-accent px-[10px] leading-normal text-text-on-accent ${rw.U}`;
  function aH() {
    let e,
      a,
      i = (0, r.c)(4),
      { t: n } = (0, d.f)();
    return (
      i[0] !== n
        ? ((e = n("common.deposit")), (i[0] = n), (i[1] = e))
        : (e = i[1]),
      i[2] !== e
        ? ((a = (0, t.jsx)("button", {
            className: aB,
            "data-testid": "topbar-deposit-prepaint",
            disabled: !0,
            type: "button",
            children: e,
          })),
          (i[2] = e),
          (i[3] = a))
        : (a = i[3]),
      a
    );
  }
  function aq() {
    let e,
      a,
      i,
      n,
      l,
      s,
      o = (0, r.c)(6);
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = { [t0]: "out" }), (o[0] = e))
        : (e = o[0]),
      o[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("span", {
            ...e,
            className: "inline-flex",
            children: (0, t.jsx)("button", {
              "aria-label": tY.f.NAV_BAR.BUTTON.LOG_IN,
              className: aB,
              "data-testid": "sign-in-prepaint",
              disabled: !0,
              type: "button",
              children: tY.f.NAV_BAR.BUTTON.LOG_IN,
            }),
          })),
          (i = { [t0]: "in" }),
          (o[1] = a),
          (o[2] = i))
        : ((a = o[1]), (i = o[2])),
      o[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)("span", {
            className: "sr-only",
            children: tY.f.NAV_BAR.STATUS.SIGNED_IN,
          })),
          (l = (0, t.jsx)(ac, {})),
          (o[3] = n),
          (o[4] = l))
        : ((n = o[3]), (l = o[4])),
      o[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsxs)(t.Fragment, {
            children: [
              a,
              (0, t.jsxs)("span", {
                ...i,
                className: "flex items-center gap-x-2",
                children: [
                  n,
                  l,
                  (0, t.jsx)("span", {
                    "aria-hidden": "true",
                    className: rw.K,
                    children: (0, t.jsx)("span", {
                      "data-pf-avatar-slot": "",
                      className: `${rw.k} bg-bg-tertiary bg-cover bg-center bg-no-repeat`,
                    }),
                  }),
                ],
              }),
            ],
          })),
          (o[5] = s))
        : (s = o[5]),
      s
    );
  }
  function aW(e) {
    let i,
      s,
      c,
      u,
      m,
      f,
      p,
      h,
      b,
      x,
      g,
      y,
      v,
      w,
      _,
      j,
      C,
      N,
      S,
      k,
      E,
      A,
      I,
      T,
      R,
      L,
      O,
      M,
      D,
      F,
      P,
      z,
      K,
      B,
      H,
      q,
      W,
      G,
      $,
      Q,
      Z,
      Y,
      X,
      J,
      ee,
      et,
      er,
      ea,
      ei,
      en,
      el,
      es,
      eo,
      ec = (0, r.c)(149),
      { hermesNotificationsEnabled: ed } = e,
      { t: eu } = (0, d.f)(),
      {
        address: em,
        authReady: ef,
        privyLoginFailed: ep,
        resetPrivyLoginFailure: eh,
        user: eb,
        userId: ex,
      } = (0, o.F)(),
      {
        isWalletNonCompliantModalOpen: eg,
        setReturningPopoverAnchor: ey,
        setShowDeposit: ew,
        setShowReturningPopover: ej,
        setShowReturningWalletPrompt: ek,
        setShowWallet: eE,
        showDeposit: eA,
        showExport: eI,
        showReturningPopover: eT,
        showWallet: eR,
        showWithdraw: eL,
      } = (0, t6.useConnectWallet)(),
      eO = (0, e6.f)("(max-width: 1023.98px)"),
      eM = (0, V.k)(U.D.RETURNING_SIGN_IN),
      eD = (0, aC.f)(),
      eF = (0, V.k)(U.D.WEB_HERMES_NOTIFICATIONS, ed),
      eP = (0, V.k)(U.D.WEB_DIRECT_MESSAGES),
      ez = (0, V.k)(U.D.NATS_PER_USER_AUTH);
    ec[0] !== ey
      ? ((i = (e) => ey(e)), (ec[0] = ey), (ec[1] = i))
      : (i = ec[1]);
    let eK = i,
      eB = (0, tJ.Z)(),
      eH = (0, tJ.F)(),
      [eq, eW] = (0, a.useState)(!1),
      eU = eq || eH,
      [eV, eG] = (0, a.useState)(!1);
    ec[2] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = () => eG(!0)), (ec[2] = s))
      : (s = ec[2]);
    let e$ = s,
      eQ = (0, e8.f)(),
      eZ = eQ && ef,
      eY = !!em;
    (ec[3] !== eY
      ? ((c = () => {
          document.documentElement.setAttribute(
            "data-pf-auth",
            eY ? "in" : "out",
          );
        }),
        (u = [eY]),
        (ec[3] = eY),
        (ec[4] = c),
        (ec[5] = u))
      : ((c = ec[4]), (u = ec[5])),
      (0, a.useEffect)(c, u),
      ec[6] !== eB
        ? ((m = () => {
            (eW(!0), eB(!0));
          }),
          (ec[6] = eB),
          (ec[7] = m))
        : (m = ec[7]));
    let eX = m;
    (ec[8] !== eV || ec[9] !== eX
      ? ((f = () => {
          if (eV) return;
          let e = (e) => {
            let t = e.target;
            t instanceof HTMLInputElement ||
              t instanceof HTMLTextAreaElement ||
              (t instanceof HTMLElement && t.isContentEditable) ||
              ((((e.metaKey || e.ctrlKey) && "k" === e.key.toLowerCase()) ||
                "/" === e.key) &&
                (e.preventDefault(), eX()));
          };
          return (
            window.addEventListener("keydown", e),
            () => window.removeEventListener("keydown", e)
          );
        }),
        (p = [eV, eX]),
        (ec[8] = eV),
        (ec[9] = eX),
        (ec[10] = f),
        (ec[11] = p))
      : ((f = ec[10]), (p = ec[11])),
      (0, a.useEffect)(f, p),
      ec[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = () => eW(!0)), (ec[12] = h))
        : (h = ec[12]));
    let eJ = h;
    ec[13] === Symbol.for("react.memo_cache_sentinel")
      ? ((b = () => rL(eJ)), (ec[13] = b))
      : (b = ec[13]);
    let e1 = b;
    (ec[14] !== eq || ec[15] !== eQ
      ? ((x = () => {
          if (!(!eQ || eq || (0, aS.f)())) return (0, aN.f)(e1);
        }),
        (g = [eQ, eq, e1]),
        (ec[14] = eq),
        (ec[15] = eQ),
        (ec[16] = x),
        (ec[17] = g))
      : ((x = ec[16]), (g = ec[17])),
      (0, a.useEffect)(x, g),
      ec[18] !== ef || ec[19] !== eY
        ? ((y = () => {
            if (!ef || eY || !(0, a_.S)()) return;
            if ("function" == typeof window.requestIdleCallback) {
              let e = window.requestIdleCallback(aT, { timeout: 3e3 });
              return () => window.cancelIdleCallback(e);
            }
            let e = window.setTimeout(aT, 2e3);
            return () => window.clearTimeout(e);
          }),
          (v = [ef, eY]),
          (ec[18] = ef),
          (ec[19] = eY),
          (ec[20] = y),
          (ec[21] = v))
        : ((y = ec[20]), (v = ec[21])),
      (0, a.useEffect)(y, v));
    let e0 = eb?.profile_image ?? null,
      e2 = eb?.username;
    (ec[22] !== em ||
    ec[23] !== eY ||
    ec[24] !== e0 ||
    ec[25] !== eb ||
    ec[26] !== ex ||
    ec[27] !== e2
      ? ((w = () => {
          if (!eY || !em || !eb) return;
          let e = !!(e2?.trim() && !(0, tV.Z)({ address: em, username: e2 }));
          (0, aj.v)({
            address: em,
            ...(ex ? { userId: ex } : {}),
            profileImage: e0,
            username: e ? e2 : null,
            lastUsedAt: Date.now(),
          });
        }),
        (_ = [eY, em, ex, eb, e0, e2]),
        (ec[22] = em),
        (ec[23] = eY),
        (ec[24] = e0),
        (ec[25] = eb),
        (ec[26] = ex),
        (ec[27] = e2),
        (ec[28] = w),
        (ec[29] = _))
      : ((w = ec[28]), (_ = ec[29])),
      (0, a.useEffect)(w, _),
      (function () {
        let e,
          t,
          i = (0, r.c)(6),
          { address: n } = (0, o.F)(),
          l = !!n;
        (i[0] !== n || i[1] !== l
          ? ((e = { walletAddress: n, enabled: l }),
            (i[0] = n),
            (i[1] = l),
            (i[2] = e))
          : (e = i[2]),
          (function (e) {
            let t,
              i,
              n,
              l,
              s,
              o,
              c = (0, r.c)(16),
              { walletAddress: d, enabled: u, splInvalidateDebounceMs: m } = e,
              f = void 0 === u || u,
              p = void 0 === m ? 5e3 : m,
              h = (0, eC.useQueryClient)(),
              b = (0, a.useRef)(null),
              x = (0, V.k)(U.D.PORTFOLIO_LIVE_REPRICE);
            (c[0] !== f || c[1] !== x || c[2] !== d
              ? ((t = () => {
                  if (f && x && d) return (0, au.T)(d);
                }),
                (i = [f, x, d]),
                (c[0] = f),
                (c[1] = x),
                (c[2] = d),
                (c[3] = t),
                (c[4] = i))
              : ((t = c[3]), (i = c[4])),
              (0, a.useEffect)(t, i),
              c[5] !== h || c[6] !== p || c[7] !== d
                ? ((n = (e) => {
                    if (!d || e.walletAddress !== d) return;
                    (0, au.K)(h, d);
                    let t = ["balanceSummary", d],
                      r = ["walletBalances", d],
                      a = () => {
                        (h.invalidateQueries({ queryKey: [...t] }),
                          h.invalidateQueries({ queryKey: [...r] }));
                      };
                    if ("SOL" === e.tokenMint) {
                      let r = (function (e) {
                        if (!e) return null;
                        let t = Number(e);
                        return Number.isFinite(t) ? t : null;
                      })(e.balance);
                      if (null === r) return;
                      let a = h
                        .getQueryCache()
                        .findAll({ queryKey: [...t], exact: !1 });
                      if (0 === a.length)
                        return void h.invalidateQueries({ queryKey: [...t] });
                      let i = !1,
                        n = Math.max(0, ...a.map(am));
                      return (
                        h.setQueriesData(
                          { queryKey: [...t] },
                          (t) => {
                            if (!t || !t.success) return ((i = !0), t);
                            let a = t.data,
                              n = a.native_balance ?? 0,
                              l = a.sol_price ?? 0,
                              s = r * l,
                              o =
                                "number" == typeof a.total_value
                                  ? a.total_value - n * l + s
                                  : s;
                            return {
                              success: !0,
                              data: {
                                ...a,
                                native_balance: r,
                                native_lamports: Math.round(1e9 * r),
                                total_value: o,
                                last_update_ts: e.timestamp ?? a.last_update_ts,
                              },
                            };
                          },
                          n > 0 ? { updatedAt: n } : void 0,
                        ),
                        void (
                          i &&
                          queueMicrotask(() => {
                            h.invalidateQueries({ queryKey: [...t] });
                          })
                        )
                      );
                    }
                    (b.current ? clearTimeout(b.current) : a(),
                      (b.current = setTimeout(() => {
                        ((b.current = null), a());
                      }, p)));
                  }),
                  (c[5] = h),
                  (c[6] = p),
                  (c[7] = d),
                  (c[8] = n))
                : (n = c[8]));
            let g = n;
            (c[9] === Symbol.for("react.memo_cache_sentinel")
              ? ((l = () => () => {
                  b.current && (clearTimeout(b.current), (b.current = null));
                }),
                (c[9] = l))
              : (l = c[9]),
              c[10] !== d ? ((s = [d]), (c[10] = d), (c[11] = s)) : (s = c[11]),
              (0, a.useEffect)(l, s),
              c[12] !== f || c[13] !== g || c[14] !== d
                ? ((o = { walletAddress: d, enabled: f, onBalanceChange: g }),
                  (c[12] = f),
                  (c[13] = g),
                  (c[14] = d),
                  (c[15] = o))
                : (o = c[15]),
              (0, eN.f)(o));
          })(e),
          i[3] !== n || i[4] !== l
            ? ((t = { walletAddress: n, enabled: l }),
              (i[3] = n),
              (i[4] = l),
              (i[5] = t))
            : (t = i[5]),
          (function (e) {
            let t,
              i,
              n,
              l,
              s = (0, r.c)(12),
              { walletAddress: o, enabled: c, pollIntervalMs: d } = e,
              u = void 0 === c || c,
              m = void 0 === d ? 3e4 : d,
              f = (0, eC.useQueryClient)(),
              { connectionStates: p } = (0, e_.N)(),
              h = p[ev.N.Core],
              b = (0, ad.f)(),
              x = !!h && b,
              g = u && !!o && !x,
              y = (0, a.useRef)(null);
            (s[0] !== m || s[1] !== f || s[2] !== g || s[3] !== o
              ? ((t = () => {
                  if (!g || !o) return;
                  let e = eS.Q.BALANCE_SUMMARY(o),
                    t = setInterval(() => {
                      if ("u" > typeof document && document.hidden) return;
                      f.invalidateQueries({ queryKey: e });
                      let t = y.current;
                      t?.wallet !== o || t.covered || (t.gapOpen = !0);
                    }, m);
                  return () => clearInterval(t);
                }),
                (i = [g, o, m, f]),
                (s[0] = m),
                (s[1] = f),
                (s[2] = g),
                (s[3] = o),
                (s[4] = t),
                (s[5] = i))
              : ((t = s[4]), (i = s[5])),
              (0, a.useEffect)(t, i),
              s[6] !== u || s[7] !== x || s[8] !== f || s[9] !== o
                ? ((n = () => {
                    if (!u || !o) return;
                    let e = y.current?.wallet === o ? y.current : null,
                      t = null !== e && e.covered && !x;
                    ((y.current = {
                      wallet: o,
                      covered: x,
                      gapOpen: !x && (t || !!e?.gapOpen),
                    }),
                      x &&
                        e?.gapOpen &&
                        f.invalidateQueries({
                          queryKey: eS.Q.BALANCE_SUMMARY(o),
                        }));
                  }),
                  (l = [u, o, x, f]),
                  (s[6] = u),
                  (s[7] = x),
                  (s[8] = f),
                  (s[9] = o),
                  (s[10] = n),
                  (s[11] = l))
                : ((n = s[10]), (l = s[11])),
              (0, a.useEffect)(n, l));
          })(t));
      })(),
      ec[30] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = function () {
            (aT(), (0, aA.U)(), (0, ak.f)());
          }),
          (ec[30] = j))
        : (j = ec[30]));
    let e3 = j;
    ec[31] !== eh || ec[32] !== ej || ec[33] !== ek || ec[34] !== eE
      ? ((C = function () {
          (eh(), e3(), (0, e9.Et)(), ej(!1), ek(!1), eE(!0));
        }),
        (ec[31] = eh),
        (ec[32] = ej),
        (ec[33] = ek),
        (ec[34] = eE),
        (ec[35] = C))
      : (C = ec[35]);
    let e4 = C;
    ec[36] !== ew
      ? ((N = function () {
          ((0, e9.xm)(), ew(!0));
        }),
        (ec[36] = ew),
        (ec[37] = N))
      : (N = ec[37]);
    let e5 = N;
    ec[38] !== eh || ec[39] !== ek || ec[40] !== eE
      ? ((S = () => {
          (eh(), aT(), (0, aA.U)(), (0, ak.f)(), ek(!0), eE(!0));
        }),
        (ec[38] = eh),
        (ec[39] = ek),
        (ec[40] = eE),
        (ec[41] = S))
      : (S = ec[41]);
    let e7 = S;
    ec[42] !== e7 ||
    ec[43] !== eO ||
    ec[44] !== eh ||
    ec[45] !== ej ||
    ec[46] !== eD
      ? ((k = () => {
          let e = (0, a_.S)();
          return (
            (!eD || e?.kind !== "wallet") &&
            (eO
              ? (e7(), !0)
              : !!e &&
                "email" !== e.kind &&
                (eh(), aT(), (0, aA.U)(), (0, ak.f)(), ej(!0), !1))
          );
        }),
        (ec[42] = e7),
        (ec[43] = eO),
        (ec[44] = eh),
        (ec[45] = ej),
        (ec[46] = eD),
        (ec[47] = k))
      : (k = ec[47]);
    let te = k,
      tt = (0, a.useRef)(!1),
      tr = !!em;
    (ec[48] !== ef || ec[49] !== tr
      ? ((E = () => {
          ef && (tt.current && !tr && (0, af.V)(), (tt.current = tr));
        }),
        (A = [ef, tr]),
        (ec[48] = ef),
        (ec[49] = tr),
        (ec[50] = E),
        (ec[51] = A))
      : ((E = ec[50]), (A = ec[51])),
      (0, a.useEffect)(E, A),
      ec[52] !== eZ || ec[53] !== e7 || ec[54] !== eY
        ? ((I = { authResolved: eZ, isAuthenticated: eY, onOpen: e7 }),
          (ec[52] = eZ),
          (ec[53] = e7),
          (ec[54] = eY),
          (ec[55] = I))
        : (I = ec[55]));
    let ta = (function (e) {
        let t,
          i,
          n = (0, r.c)(6),
          { authResolved: l, isAuthenticated: s, onOpen: o } = e,
          c = (0, a.useSyncExternalStore)(ag, av, ay),
          d = (0, a.useRef)(!1),
          u = (0, a.useRef)(!1);
        return (
          n[0] !== l || n[1] !== c || n[2] !== s || n[3] !== o
            ? ((t = () => {
                if (!c) return;
                if (!u.current) {
                  u.current = !0;
                  try {
                    let e = new URLSearchParams(window.location.search).get(ax);
                    e && (0, ah.s)(e);
                  } catch {}
                }
                if (!l || d.current) return;
                if (s) return void aw();
                let e = function () {
                  return (
                    !!d.current ||
                    (!!(0, af.x)() &&
                      ((d.current = !0), (0, af.V)(), o(), aw(), !0))
                  );
                };
                if (e()) return;
                let t = (0, ap.C)(() => {
                  e() && t();
                });
                return t;
              }),
              (i = [c, l, s, o]),
              (n[0] = l),
              (n[1] = c),
              (n[2] = s),
              (n[3] = o),
              (n[4] = t),
              (n[5] = i))
            : ((t = n[4]), (i = n[5])),
          (0, a.useEffect)(t, i),
          c
        );
      })(I),
      ti = eM && eZ && !eY;
    (ec[56] !== te || ec[57] !== ta || ec[58] !== ti
      ? ((T = { enabled: ti, blocked: ta, onAutoOpen: te }),
        (ec[56] = te),
        (ec[57] = ta),
        (ec[58] = ti),
        (ec[59] = T))
      : (T = ec[59]),
      (0, af.W)(T));
    let tn = (0, a.useSyncExternalStore)(ak.$, ak.c, aU);
    ec[60] !== eg ||
    ec[61] !== ep ||
    ec[62] !== eA ||
    ec[63] !== eI ||
    ec[64] !== eT ||
    ec[65] !== eR ||
    ec[66] !== eL
      ? ((R = (({
          isAuthenticated: e,
          showWallet: t,
          showDeposit: r,
          showWithdraw: a,
          showExport: i,
          isWalletNonCompliantModalOpen: n,
          privyLoginFailed: l,
          showReturningPopover: s,
        }) => e || t || r || a || i || n || l || s)({
          isAuthenticated: !1,
          showWallet: eR,
          showDeposit: eA,
          showWithdraw: eL,
          showExport: eI,
          isWalletNonCompliantModalOpen: eg,
          privyLoginFailed: ep,
          showReturningPopover: eT,
        })),
        (ec[60] = eg),
        (ec[61] = ep),
        (ec[62] = eA),
        (ec[63] = eI),
        (ec[64] = eT),
        (ec[65] = eR),
        (ec[66] = eL),
        (ec[67] = R))
      : (R = ec[67]);
    let tl = R,
      ts = tl || eY;
    (ec[68] !== tn || ec[69] !== tl
      ? ((L = () => {
          tl && !tn && (0, ak.f)();
        }),
        (O = [tl, tn]),
        (ec[68] = tn),
        (ec[69] = tl),
        (ec[70] = L),
        (ec[71] = O))
      : ((L = ec[70]), (O = ec[71])),
      (0, a.useEffect)(L, O));
    let to = ts && tn;
    return (
      ec[72] === Symbol.for("react.memo_cache_sentinel")
        ? ((M = (0, t.jsx)(rZ, {})), (ec[72] = M))
        : (M = ec[72]),
      ec[73] === Symbol.for("react.memo_cache_sentinel")
        ? ((D = (0, t.jsx)(rD, {})), (ec[73] = D))
        : (D = ec[73]),
      ec[74] === Symbol.for("react.memo_cache_sentinel")
        ? ((F = (0, t.jsx)("div", {
            className: "contents",
            onClickCapture: eJ,
            onFocus: e1,
            onPointerEnter: e1,
            children: (0, t.jsx)(t1, {}),
          })),
          (P = (0, t.jsx)(rI, {})),
          (ec[74] = F),
          (ec[75] = P))
        : ((F = ec[74]), (P = ec[75])),
      ec[76] !== eU
        ? ((z = eU ? (0, t.jsx)(aR, { onMounted: e$ }) : null),
          (ec[76] = eU),
          (ec[77] = z))
        : (z = ec[77]),
      ec[78] !== z
        ? ((K = (0, t.jsxs)("div", {
            className: "flex w-full items-center gap-x-2 max-lg:hidden",
            children: [D, F, P, z],
          })),
          (ec[78] = z),
          (ec[79] = K))
        : (K = ec[79]),
      ec[80] === Symbol.for("react.memo_cache_sentinel")
        ? ((B = (0, t.jsx)("div", {
            className: "hidden max-lg:flex max-md:hidden",
            children: (0, t.jsx)(rD, {}),
          })),
          (ec[80] = B))
        : (B = ec[80]),
      ec[81] !== K
        ? ((H = (0, t.jsxs)("div", {
            className:
              "flex h-full min-w-0 grow-[2] basis-0 items-center justify-start gap-x-3 max-lg:basis-auto",
            children: [M, K, B],
          })),
          (ec[81] = K),
          (ec[82] = H))
        : (H = ec[82]),
      ec[83] === Symbol.for("react.memo_cache_sentinel")
        ? ((q = (0, t.jsx)("div", {
            className: "hidden max-lg:block",
            children: (0, t.jsx)(rI, {}),
          })),
          (ec[83] = q))
        : (q = ec[83]),
      ec[84] === Symbol.for("react.memo_cache_sentinel")
        ? ((W = (0, t.jsx)(n.L3, { size: 16 })), (ec[84] = W))
        : (W = ec[84]),
      ec[85] !== eX
        ? ((G = (0, t.jsx)("div", {
            className: "hidden max-lg:block",
            children: (0, t.jsx)("button", {
              "aria-label": tY.f.HOME_PAGE.SEARCH_INPUT.ARIA_LABEL,
              className: rw.q,
              onClick: eX,
              onFocus: e1,
              onPointerEnter: e1,
              type: "button",
              children: W,
            }),
          })),
          (ec[85] = eX),
          (ec[86] = G))
        : (G = ec[86]),
      ec[87] === Symbol.for("react.memo_cache_sentinel")
        ? (($ = (0, t.jsx)(as, {})), (ec[87] = $))
        : ($ = ec[87]),
      ec[88] !== eQ
        ? ((Q = eQ
            ? null
            : (0, t.jsx)("span", {
                [t0]: "in",
                className: "inline-flex max-[480px]:hidden",
                children: (0, t.jsx)(aH, {}),
              })),
          (ec[88] = eQ),
          (ec[89] = Q))
        : (Q = ec[89]),
      ec[90] !== ef || ec[91] !== eY || ec[92] !== eQ
        ? ((Z =
            eQ && eY && !ef
              ? (0, t.jsx)("div", {
                  className: "max-[480px]:hidden",
                  children: (0, t.jsx)(aH, {}),
                })
              : null),
          (ec[90] = ef),
          (ec[91] = eY),
          (ec[92] = eQ),
          (ec[93] = Z))
        : (Z = ec[93]),
      ec[94] !== ef ||
      ec[95] !== eY ||
      ec[96] !== eQ ||
      ec[97] !== e5 ||
      ec[98] !== eu
        ? ((Y =
            eQ && eY && ef
              ? (0, t.jsx)("div", {
                  className: "max-[480px]:hidden",
                  children: (0, t.jsx)(l.K, {
                    className: rw.U,
                    onClick: e5,
                    size: 32,
                    variant: "primary",
                    "data-testid": "topbar-deposit-button",
                    children: eu("common.deposit"),
                  }),
                })
              : null),
          (ec[94] = ef),
          (ec[95] = eY),
          (ec[96] = eQ),
          (ec[97] = e5),
          (ec[98] = eu),
          (ec[99] = Y))
        : (Y = ec[99]),
      ec[100] !== eF || ec[101] !== eQ
        ? ((X =
            eF && !eQ
              ? (0, t.jsx)("span", {
                  [t0]: "in",
                  className: "inline-flex",
                  children: (0, t.jsx)(rY, {}),
                })
              : null),
          (ec[100] = eF),
          (ec[101] = eQ),
          (ec[102] = X))
        : (X = ec[102]),
      ec[103] !== ef || ec[104] !== eY || ec[105] !== eF || ec[106] !== eQ
        ? ((J = eF && eQ && eY && !ef ? (0, t.jsx)(rY, {}) : null),
          (ec[103] = ef),
          (ec[104] = eY),
          (ec[105] = eF),
          (ec[106] = eQ),
          (ec[107] = J))
        : (J = ec[107]),
      ec[108] !== ef || ec[109] !== eY || ec[110] !== eF || ec[111] !== eQ
        ? ((ee = eF && eQ && eY && ef ? (0, t.jsx)(aO, {}) : null),
          (ec[108] = ef),
          (ec[109] = eY),
          (ec[110] = eF),
          (ec[111] = eQ),
          (ec[112] = ee))
        : (ee = ec[112]),
      ec[113] === Symbol.for("react.memo_cache_sentinel")
        ? ((et = (0, t.jsx)("div", {
            className: "max-[480px]:hidden",
            children: (0, t.jsx)(rq, {}),
          })),
          (ec[113] = et))
        : (et = ec[113]),
      ec[114] !== eQ
        ? ((er = !eQ && (0, t.jsx)(aq, {})), (ec[114] = eQ), (ec[115] = er))
        : (er = ec[115]),
      ec[116] !== eY || ec[117] !== eQ || ec[118] !== e4 || ec[119] !== eK
        ? ((ea =
            eQ &&
            !eY &&
            (0, t.jsx)("span", {
              ref: eK,
              className: "inline-flex",
              children: (0, t.jsx)(l.K, {
                className: rw.U,
                onClick: e4,
                onFocus: e3,
                onPointerEnter: e3,
                size: 32,
                variant: "primary",
                "data-testid": "sign-in-button",
                children: tY.f.NAV_BAR.BUTTON.LOG_IN,
              }),
            })),
          (ec[116] = eY),
          (ec[117] = eQ),
          (ec[118] = e4),
          (ec[119] = eK),
          (ec[120] = ea))
        : (ea = ec[120]),
      ec[121] !== ef || ec[122] !== eY || ec[123] !== eQ
        ? ((ei = eQ && eY && !ef && (0, t.jsx)(aq, {})),
          (ec[121] = ef),
          (ec[122] = eY),
          (ec[123] = eQ),
          (ec[124] = ei))
        : (ei = ec[124]),
      ec[125] !== ef ||
      ec[126] !== eY ||
      ec[127] !== eP ||
      ec[128] !== eQ ||
      ec[129] !== ez
        ? ((en =
            eQ &&
            eY &&
            ef &&
            (0, t.jsxs)(t.Fragment, {
              children: [
                eP ? (0, t.jsx)(aM, {}) : null,
                eP ? (0, t.jsx)(aD, {}) : null,
                ez ? (0, t.jsx)(aF, {}) : null,
                (0, t.jsx)(aK, {}),
                (0, t.jsx)(az, {}),
                (0, t.jsx)(aP, {}),
              ],
            })),
          (ec[125] = ef),
          (ec[126] = eY),
          (ec[127] = eP),
          (ec[128] = eQ),
          (ec[129] = ez),
          (ec[130] = en))
        : (en = ec[130]),
      ec[131] !== to
        ? ((el = to
            ? (0, t.jsx)(aE.R, {
                children: (0, t.jsx)(aL, { renderTrigger: !1 }),
              })
            : null),
          (ec[131] = to),
          (ec[132] = el))
        : (el = ec[132]),
      ec[133] !== G ||
      ec[134] !== Q ||
      ec[135] !== Z ||
      ec[136] !== Y ||
      ec[137] !== X ||
      ec[138] !== J ||
      ec[139] !== ee ||
      ec[140] !== er ||
      ec[141] !== ea ||
      ec[142] !== ei ||
      ec[143] !== en ||
      ec[144] !== el
        ? ((es = (0, t.jsxs)("div", {
            className:
              "flex h-full min-w-0 grow-0 basis-auto items-center justify-end gap-x-2",
            children: [q, G, $, Q, Z, Y, X, J, ee, et, er, ea, ei, en, el],
          })),
          (ec[133] = G),
          (ec[134] = Q),
          (ec[135] = Z),
          (ec[136] = Y),
          (ec[137] = X),
          (ec[138] = J),
          (ec[139] = ee),
          (ec[140] = er),
          (ec[141] = ea),
          (ec[142] = ei),
          (ec[143] = en),
          (ec[144] = el),
          (ec[145] = es))
        : (es = ec[145]),
      ec[146] !== H || ec[147] !== es
        ? ((eo = (0, t.jsx)("div", {
            className:
              "flex h-12 w-full items-center px-[var(--padding-x-main)] max-lg:px-4",
            children: (0, t.jsxs)("div", {
              className:
                "flex h-full w-full items-center justify-between gap-x-3",
              children: [H, es],
            }),
          })),
          (ec[146] = H),
          (ec[147] = es),
          (ec[148] = eo))
        : (eo = ec[148]),
      eo
    );
  }
  function aU() {
    return !1;
  }
  var aV = e.i(282837),
    aG = e.i(33474),
    a$ = e.i(446529),
    aQ = e.i(955332);
  let aZ = "is-topbar-banner-closed",
    aY = () => {
      ((document.cookie = `${t2}=true; path=/; max-age=31536000; samesite=lax`),
        window.localStorage.setItem(aZ, "true"));
    },
    aX = () => document.cookie.split("; ").some((e) => e === `${t2}=true`),
    aJ = new Set(),
    a1 = (e) => (
      aJ.add(e),
      () => {
        aJ.delete(e);
      }
    );
  function a0(e) {
    let i,
      l,
      s,
      o,
      c,
      u,
      m,
      f,
      p,
      h,
      b,
      x,
      g,
      y,
      v,
      w = (0, r.c)(28),
      { defaultVisible: _ } = e,
      { t: j } = (0, d.f)();
    w[0] !== _
      ? ((i = () => !_ || aX()),
        (l = () => !_),
        (w[0] = _),
        (w[1] = i),
        (w[2] = l))
      : ((i = w[1]), (l = w[2]));
    let C = (0, a.useSyncExternalStore)(a1, i, l),
      N = (0, rO.usePathname)();
    w[3] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = { webFallbackUrl: aG.D }), (w[3] = s))
      : (s = w[3]);
    let S = (0, a$.V)(s);
    w[4] !== N || w[5] !== S
      ? ((o = (0, a$.R)(S) ? S : (0, aQ.d)(N, "legacy_banner")),
        (w[4] = N),
        (w[5] = S),
        (w[6] = o))
      : (o = w[6]);
    let k = o;
    w[7] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = function () {
          for (let e of ((0, e9.LR)({ interactionType: "dismiss" }), aY(), aJ))
            e();
        }),
        (w[7] = c))
      : (c = w[7]);
    let E = c;
    w[8] !== k
      ? ((u = function (e) {
          ((0, e9.LR)({ interactionType: "click" }),
            e.preventDefault(),
            window.open(k, "_blank", "noopener,noreferrer"));
        }),
        (w[8] = k),
        (w[9] = u))
      : (u = w[9]);
    let A = u;
    return (w[10] === Symbol.for("react.memo_cache_sentinel")
      ? ((m = []), (w[10] = m))
      : (m = w[10]),
    (0, a.useEffect)(a2, m),
    C)
      ? null
      : (w[11] !== j
          ? ((f = j("web.topbar.mobile_banner")), (w[11] = j), (w[12] = f))
          : (f = w[12]),
        w[13] !== A || w[14] !== k || w[15] !== f
          ? ((p = (0, t.jsx)("a", {
              className:
                "truncate text-xs text-text-secondary transition-colors hover:text-text-primary hover:underline",
              href: k,
              onClick: A,
              target: "_blank",
              rel: "noopener noreferrer",
              children: f,
            })),
            (w[13] = A),
            (w[14] = k),
            (w[15] = f),
            (w[16] = p))
          : (p = w[16]),
        w[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, t.jsx)(n.s2, {
              className: "text-text-quaternary max-sm:hidden",
              size: 14,
            })),
            (w[17] = h))
          : (h = w[17]),
        w[18] !== p
          ? ((b = (0, t.jsxs)("div", {
              className:
                "z-10 flex h-full w-full max-w-[1200px] items-center justify-center gap-x-1 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,var(--color-bg-secondary)_10%,var(--color-bg-secondary)_90%,rgba(0,0,0,0)_100%)]",
              children: [p, h],
            })),
            (w[18] = p),
            (w[19] = b))
          : (b = w[19]),
        w[20] !== j
          ? ((x = j("common.close")), (w[20] = j), (w[21] = x))
          : (x = w[21]),
        w[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((g = (0, t.jsx)(n.x6, { size: 14 })), (w[22] = g))
          : (g = w[22]),
        w[23] !== x
          ? ((y = (0, t.jsx)("button", {
              "aria-label": x,
              className: rw.E,
              onClick: E,
              type: "button",
              children: g,
            })),
            (w[23] = x),
            (w[24] = y))
          : (y = w[24]),
        w[25] !== b || w[26] !== y
          ? ((v = (0, t.jsxs)("section", {
              className:
                "relative flex h-8 items-center justify-center border-b border-border-secondary bg-bg-secondary px-[var(--padding-x-main)] max-sm:pr-12",
              children: [b, y],
            })),
            (w[25] = b),
            (w[26] = y),
            (w[27] = v))
          : (v = w[27]),
        v);
  }
  function a2() {
    aX() || ("true" === window.localStorage.getItem(aZ) && aY());
  }
  var a3 = e.i(21384),
    a4 = e.i(632817),
    a5 = e.i(56103),
    a6 = e.i(356647),
    a8 = e.i(668487);
  let a7 = "wallet-adapter-notice-snoozed-session",
    a9 = (e) => {
      let t = document.cookie.split("; ").find((t) => t.startsWith(`${e}=`));
      return t ? t.slice(e.length + 1) : null;
    },
    ie = (e, t, r) => {
      document.cookie = `${e}=${t}; path=/; max-age=${r}; samesite=lax`;
    },
    it = new Set(),
    ir = (e) => (
      it.add(e),
      () => {
        it.delete(e);
      }
    );
  function ia(e) {
    let i,
      l,
      s,
      o,
      c,
      u,
      m,
      f,
      p,
      h,
      b,
      x,
      g,
      y,
      v,
      w,
      _,
      j,
      C,
      N = (0, r.c)(50),
      { reserveSlot: S } = e,
      { t: k } = (0, d.f)(),
      E = (0, a5.f)(),
      { method: A, reader: I } = (0, a3.f)(),
      { setShowLinkLogin: T } = (0, t6.useConnectWallet)(),
      R = (0, e8.f)();
    N[0] !== E || N[1] !== A
      ? ((i = E && (0, a6.l)(A)), (N[0] = E), (N[1] = A), (N[2] = i))
      : (i = N[2]);
    let L = i,
      O = (0, a.useSyncExternalStore)(ir, io, is),
      M = (0, a6.j)((0, a4.H)(a6.q, R && L)),
      D = R && L && !O;
    (N[3] !== R || N[4] !== A.kind || N[5] !== D
      ? ((l = () => {
          if (R) {
            if (D) return void ie(t3, "1", 1209600);
            "resolving" !== A.kind &&
              null !== a9(t3) &&
              (document.cookie = `${t3}=; path=/; max-age=0; samesite=lax`);
          }
        }),
        (s = [R, D, A.kind]),
        (N[3] = R),
        (N[4] = A.kind),
        (N[5] = D),
        (N[6] = l),
        (N[7] = s))
      : ((l = N[6]), (s = N[7])),
      (0, a.useEffect)(l, s));
    let F = (0, a.useRef)(!1);
    (N[8] !== D
      ? ((o = () => {
          D &&
            !F.current &&
            ((F.current = !0),
            (0, e9.yt)({ surface: "banner", interactionType: "seen" }));
        }),
        (c = [D]),
        (N[8] = D),
        (N[9] = o),
        (N[10] = c))
      : ((o = N[9]), (c = N[10])),
      (0, a.useEffect)(o, c),
      N[11] !== T
        ? ((u = () => {
            ((0, e9.yt)({
              surface: "banner",
              interactionType: "cta",
              cta: "link",
            }),
              T(!0));
          }),
          (N[11] = T),
          (N[12] = u))
        : (u = N[12]));
    let z = u;
    if (!D) {
      let e,
        r,
        a = S && !R;
      return (
        N[13] !== a
          ? ((e = a
              ? (0, t.jsx)("div", {
                  className:
                    "h-8 border-b border-border-secondary bg-bg-secondary",
                  "aria-hidden": !0,
                  "data-testid": "wallet-adapter-deprecation-banner-slot",
                })
              : null),
            (N[13] = a),
            (N[14] = e))
          : (e = N[14]),
        N[15] !== I || N[16] !== e
          ? ((r = (0, t.jsxs)(t.Fragment, { children: [e, I] })),
            (N[15] = I),
            (N[16] = e),
            (N[17] = r))
          : (r = N[17]),
        r
      );
    }
    let K =
      "days" === M.unit
        ? k("web.wallet_deprecation.banner_days", { count: M.count })
        : "hours" === M.unit
          ? k("web.wallet_deprecation.banner_hours", { count: M.count })
          : k(
              "imminent" === M.unit
                ? "web.wallet_deprecation.banner_imminent"
                : "web.wallet_deprecation.banner_past",
            );
    return (
      N[18] !== K
        ? ((m = (0, t.jsx)("span", {
            className: "truncate font-medium text-text-primary",
            children: K,
          })),
          (N[18] = K),
          (N[19] = m))
        : (m = N[19]),
      N[20] !== k
        ? ((f = k("web.wallet_deprecation.banner_body")),
          (N[20] = k),
          (N[21] = f))
        : (f = N[21]),
      N[22] !== f
        ? ((p = (0, t.jsx)("span", {
            className: "truncate max-md:hidden",
            children: f,
          })),
          (N[22] = f),
          (N[23] = p))
        : (p = N[23]),
      N[24] !== k
        ? ((h = k("account.privy_link.settings_row")), (N[24] = k), (N[25] = h))
        : (h = N[25]),
      N[26] !== z || N[27] !== h
        ? ((b = (0, t.jsx)("button", {
            type: "button",
            onClick: z,
            className:
              "shrink-0 font-medium text-text-accent underline-offset-2 hover:underline",
            "data-testid": "wallet-adapter-deprecation-banner-link",
            children: h,
          })),
          (N[26] = z),
          (N[27] = h),
          (N[28] = b))
        : (b = N[28]),
      N[29] !== k
        ? ((x = k("web.wallet_deprecation.banner_learn_more")),
          (N[29] = k),
          (N[30] = x))
        : (x = N[30]),
      N[31] !== x
        ? ((g = (0, t.jsx)(P.default, {
            href: a6.O,
            onClick: ii,
            className: "shrink-0 underline-offset-2 hover:underline",
            "data-testid": "wallet-adapter-deprecation-banner-learn-more",
            children: x,
          })),
          (N[31] = x),
          (N[32] = g))
        : (g = N[32]),
      N[33] !== b || N[34] !== g || N[35] !== m || N[36] !== p
        ? ((y = (0, t.jsxs)("div", {
            className:
              "flex w-full max-w-[1200px] items-center justify-center gap-x-2 truncate text-xs text-text-secondary",
            children: [m, p, b, g],
          })),
          (N[33] = b),
          (N[34] = g),
          (N[35] = m),
          (N[36] = p),
          (N[37] = y))
        : (y = N[37]),
      N[38] !== k
        ? ((v = k("web.wallet_deprecation.banner_dismiss")),
          (N[38] = k),
          (N[39] = v))
        : (v = N[39]),
      N[40] === Symbol.for("react.memo_cache_sentinel")
        ? ((w = (0, t.jsx)(n.x6, { size: 14 })), (N[40] = w))
        : (w = N[40]),
      N[41] !== il || N[42] !== v
        ? ((_ = (0, t.jsx)("button", {
            "aria-label": v,
            className: rw.E,
            "data-testid": "wallet-adapter-deprecation-banner-dismiss",
            onClick: il,
            type: "button",
            children: w,
          })),
          (N[41] = il),
          (N[42] = v),
          (N[43] = _))
        : (_ = N[43]),
      N[44] !== y || N[45] !== _
        ? ((j = (0, t.jsxs)("section", {
            className:
              "relative flex h-8 items-center justify-center border-b border-border-secondary bg-bg-secondary px-[var(--padding-x-main)] max-sm:pr-12",
            "data-testid": "wallet-adapter-deprecation-banner",
            role: "status",
            children: [y, _],
          })),
          (N[44] = y),
          (N[45] = _),
          (N[46] = j))
        : (j = N[46]),
      N[47] !== I || N[48] !== j
        ? ((C = (0, t.jsxs)(t.Fragment, { children: [j, I] })),
          (N[47] = I),
          (N[48] = j),
          (N[49] = C))
        : (C = N[49]),
      C
    );
  }
  function ii() {
    return (0, e9.yt)({
      surface: "banner",
      interactionType: "cta",
      cta: "learn_more",
    });
  }
  function il() {
    if (
      ((0, e9.yt)({ surface: "banner", interactionType: "dismiss" }),
      (0, a6.B)((0, a8.t)()))
    )
      try {
        sessionStorage.setItem(a7, "1");
      } catch {}
    else ie(t4, String(Date.now() + 864e5), 86400);
    for (let e of it) e();
  }
  function is() {
    return !1;
  }
  function io() {
    let e = Number(a9(t4));
    if (Number.isFinite(e) && e > Date.now()) return !0;
    try {
      return "1" === sessionStorage.getItem(a7);
    } catch {
      return !1;
    }
  }
  e.s(
    [
      "Topbar",
      0,
      function (e) {
        let n,
          l,
          s,
          o,
          c,
          d,
          u,
          m,
          f = (0, r.c)(14),
          {
            showUpsellBanner: p,
            reserveWalletNoticeSlot: h,
            hermesNotificationsEnabled: b,
          } = e,
          x = void 0 !== h && h,
          g = (0, a.useRef)(null);
        return (
          f[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = () => {
                if ("u" < typeof ResizeObserver) return;
                let e = function () {
                  let e = g.current;
                  e &&
                    document.documentElement.style.setProperty(
                      "--layout-top-offset",
                      `${e.offsetHeight}px`,
                    );
                };
                e();
                let t = g.current;
                if (!t) return;
                let r = new ResizeObserver(e);
                return (r.observe(t), () => r.disconnect());
              }),
              (l = []),
              (f[0] = n),
              (f[1] = l))
            : ((n = f[0]), (l = f[1])),
          (0, a.useEffect)(n, l),
          f[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((s = (0, t.jsx)("div", { id: aV.i })), (f[2] = s))
            : (s = f[2]),
          f[3] !== p
            ? ((o = (0, t.jsx)("div", {
                className: "max-md:hidden",
                children: (0, t.jsx)(a0, { defaultVisible: p }),
              })),
              (f[3] = p),
              (f[4] = o))
            : (o = f[4]),
          f[5] !== x
            ? ((c = (0, t.jsx)(ia, { reserveSlot: x })), (f[5] = x), (f[6] = c))
            : (c = f[6]),
          f[7] !== b
            ? ((d = (0, t.jsx)(aW, { hermesNotificationsEnabled: b })),
              (f[7] = b),
              (f[8] = d))
            : (d = f[8]),
          f[9] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (0, t.jsx)(i.f, {
                logMessage: "Token info bar crashed; bar hidden",
                children: (0, t.jsx)(td, {}),
              })),
              (f[9] = u))
            : (u = f[9]),
          f[10] !== o || f[11] !== c || f[12] !== d
            ? ((m = (0, t.jsxs)("header", {
                ref: g,
                className:
                  "flex flex-col sticky top-0 left-0 z-20 bg-bg-primary border-b border-border-secondary",
                children: [s, o, c, d, u],
              })),
              (f[10] = o),
              (f[11] = c),
              (f[12] = d),
              (f[13] = m))
            : (m = f[13]),
          m
        );
      },
    ],
    400466,
  );
};
