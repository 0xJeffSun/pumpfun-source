// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(292686),
    n = e.i(322315),
    s = e.i(254010),
    a = e.i(975982),
    r = e.i(365089),
    o = e.i(545063),
    d = e.i(179736),
    c = e.i(458310),
    u = e.i(599077),
    m = e.i(352386);
  e.i(12692);
  var p = e.i(398902),
    f = e.i(563124),
    h = e.i(271972),
    x = e.i(773942),
    v = e.i(665579),
    b = e.i(782049),
    g = e.i(204478),
    w = e.i(223363),
    N = e.i(174251),
    y = e.i(814582),
    j = e.i(875737),
    _ = e.i(741084),
    U = e.i(353128),
    C = e.i(652502),
    A = e.i(457463),
    P = e.i(336700),
    S = e.i(453248),
    k = e.i(510861),
    I = e.i(547613),
    E = e.i(478957),
    M = e.i(123328),
    L = e.i(302515),
    O = e.i(605255),
    F = e.i(464456),
    T = e.i(745674),
    R = e.i(372550),
    z = e.i(606178),
    $ = e.i(787773),
    D = e.i(137949),
    B = e.i(248496),
    q = e.i(481522),
    K = e.i(116458),
    V = e.i(79631),
    Q = e.i(982285),
    H = e.i(261756),
    Z = e.i(291902),
    W = e.i(620268),
    Y = e.i(768359),
    G = e.i(850175),
    J = e.i(609252),
    X = e.i(48485),
    ee = e.i(915631),
    et = e.i(562606),
    el = e.i(54136),
    ei = e.i(860787),
    en = e.i(889451),
    es = e.i(137555),
    ea = e.i(646908),
    er = e.i(127879),
    eo = e.i(622285),
    ed = e.i(957487),
    ec = e.i(582453),
    eu = e.i(670550),
    em = e.i(888902),
    ep = e.i(246307);
  let ef = { coins: "coin", stocks: "stock", perps: "perp" },
    eh = new Set([
      "xstocks",
      "ondo",
      "backpack",
      "prestocks",
      "tessera",
      "robinhood",
    ]),
    ex = (e, t) => {
      let l;
      return e.isPerp
        ? "perp"
        : e.isNative || void 0 !== e.collectible
          ? "other"
          : null != (l = t?.platform ?? e.servedCoin?.platform) &&
              eh.has(l.toLowerCase())
            ? "stock"
            : "coin";
    },
    ev = (e, t) => "all" === e || ef[e] === t;
  e.s(
    ["t", 0, ["all", "coins", "stocks", "perps"], "z", 0, ev, "P", 0, ex],
    85895,
  );
  let eb = (e, t) =>
    e
      ? {
          chain_id: t,
          usd_market_cap: e.marketCapUsd,
          total_supply: e.totalSupply,
          base_decimals: 0,
        }
      : null;
  var eg = e.i(699365);
  let ew = {
      MCAP: { desc: "MCAP", asc: "MCAP_ASC" },
      VALUE: { desc: "POSITION_SIZE", asc: "POSITION_SIZE_ASC" },
      PNL: { desc: "PNL", asc: "PNL_ASC" },
    },
    eN = {
      MCAP: { column: "MCAP", direction: "desc" },
      MCAP_ASC: { column: "MCAP", direction: "asc" },
      POSITION_SIZE: { column: "VALUE", direction: "desc" },
      POSITION_SIZE_ASC: { column: "VALUE", direction: "asc" },
      PNL: { column: "PNL", direction: "desc" },
      PNL_ASC: { column: "PNL", direction: "asc" },
    },
    ey = (e) => eN[e] ?? null,
    ej = (e, t) => {
      let l = ey(e),
        i = l?.column === t && "desc" === l.direction ? "asc" : "desc";
      return ew[t][i];
    },
    e_ = (e) => {
      switch (e) {
        case "MCAP":
        case "MCAP_ASC":
          return null;
        case "POSITION_SIZE_ASC":
          return "POSITION_SIZE";
        case "PNL_ASC":
          return "PNL";
        default:
          return e;
      }
    },
    eU = (e) =>
      "MCAP" === e ||
      "MCAP_ASC" === e ||
      "POSITION_SIZE_ASC" === e ||
      "PNL_ASC" === e,
    eC = (e) => {
      switch (e) {
        case "CALLOUT_RECENCY":
          return "RECENCY";
        case "MCAP":
        case "MCAP_ASC":
        case "POSITION_SIZE_ASC":
          return "POSITION_SIZE";
        case "PNL_ASC":
          return "PNL";
        default:
          return e;
      }
    },
    eA = (e, t, l) => {
      let i = [],
        n = [];
      for (let l of e) {
        let e = t(l);
        "number" == typeof e && Number.isFinite(e)
          ? i.push({ row: l, figure: e })
          : n.push(l);
      }
      let s = "asc" === l ? 1 : -1;
      return [
        ...i.toSorted((e, t) => s * (e.figure - t.figure)).map((e) => e.row),
        ...n,
      ];
    },
    eP = (e, t) => {
      let l = [],
        i = [];
      for (let n of e) {
        let e = t(n);
        null == e ? i.push(n) : l.push({ row: n, createdAt: e });
      }
      return [
        ...l.toSorted((e, t) => t.createdAt - e.createdAt).map((e) => e.row),
        ...i,
      ];
    };
  e.s(
    [
      "g",
      0,
      ey,
      "p",
      0,
      eU,
      "P",
      0,
      e_,
      "$",
      0,
      ej,
      "n",
      0,
      eP,
      "B",
      0,
      eA,
      "Q",
      0,
      eC,
    ],
    946073,
  );
  var eS = e.i(633311);
  let ek = ({ position: e, ownerAddress: t }) => {
      let l = e.callout;
      if (!l) return null;
      let i = (0, eS.l)(l.calloutTimestamp);
      if (null === i) return null;
      let n = l.thesis?.trim();
      return {
        calloutId: l.calloutId,
        userId: t,
        coinMint: e.coinMint,
        marketCap: l.calledOutAtMcap,
        calloutPrice: l.calloutPrice,
        multiple: l.multiple,
        createdAt: i,
        maxPriceSol: 0,
        maxMultiplier: l.maxMultiplier,
        mediaUrl: l.mediaUrl,
        likeCount: l.likes,
        replyCount: l.replyCount,
        repostCount: l.repostCount,
        ...(n ? { note: n } : {}),
        ...(void 0 !== l.viewCount ? { viewCount: l.viewCount } : {}),
        ...(void 0 !== l.quotedCalloutId
          ? { quotedCalloutId: l.quotedCalloutId }
          : {}),
        ...(void 0 !== l.quotedCallout
          ? { quotedCallout: l.quotedCallout }
          : {}),
        ...("boolean" == typeof l.hasLiked
          ? { likedByViewer: l.hasLiked }
          : {}),
        ...("boolean" == typeof l.hasReposted
          ? { repostedByViewer: l.hasReposted }
          : {}),
      };
    },
    eI = ({ positions: e, ownerAddress: t, pending: l = [] }) => {
      let i = new Map();
      for (let l of e) {
        let e = (0, ec.f)(l.coinMint);
        if (i.has(e)) continue;
        let n = ek({ position: l, ownerAddress: t });
        n && i.set(e, n);
      }
      for (let e of l) {
        let t = (0, ec.f)(e.coinMint);
        i.has(t) || i.set(t, e);
      }
      return i;
    };
  e.s(["f", 0, eI], 433603);
  var eE = e.i(720772),
    eM = e.i(538794),
    eL = e.i(338319),
    eO = e.i(605587),
    eF = e.i(90832),
    eT = e.i(449597);
  let eR = {
      value: "CALLOUT_RECENCY",
      labelKey: "web.callouts.history.list_title_recency",
    },
    ez = [
      {
        value: "POSITION_SIZE",
        labelKey: "profile.narrative.positions_sort.position_size",
      },
      { value: "PNL", labelKey: "profile.narrative.positions_sort.pnl" },
      {
        value: "RECENCY",
        labelKey: "profile.narrative.positions_sort.recency",
      },
      eR,
    ],
    e$ = [],
    eD = [
      { value: "PNL", labelKey: "profile.narrative.positions_sort.pnl" },
      {
        value: "RECENCY",
        labelKey: "profile.narrative.positions_sort.recency",
      },
      eR,
    ];
  function eB(e) {
    let i,
      n,
      s,
      a,
      r,
      o = (0, l.c)(25),
      { filter: d, value: c, onChange: u, density: m, align: f } = e,
      h = void 0 === m ? "comfortable" : m,
      { t: x } = (0, p.f)(),
      v = "closed" === d ? eD : ez;
    o[0] !== c ? ((i = e_(c)), (o[0] = c), (o[1] = i)) : (i = o[1]);
    let b = i;
    if (o[2] !== b || o[3] !== v || o[4] !== x || o[5] !== c) {
      let e;
      o[7] !== b
        ? ((e = (e) => e.value === b), (o[7] = b), (o[8] = e))
        : (e = o[8]);
      let t = v.find(e);
      ((n = b === c ? void 0 : t ? x(t.labelKey) : x("web.filters.mcap")),
        (o[2] = b),
        (o[3] = v),
        (o[4] = x),
        (o[5] = c),
        (o[6] = n));
    } else n = o[6];
    let g = n;
    if (
      (o[9] !== x
        ? ((s = x("common.sort_by")), (o[9] = x), (o[10] = s))
        : (s = o[10]),
      o[11] !== v || o[12] !== x)
    ) {
      let e;
      (o[14] !== x
        ? ((e = (e) => ({ value: e.value, label: x(e.labelKey) })),
          (o[14] = x),
          (o[15] = e))
        : (e = o[15]),
        (a = v.map(e)),
        (o[11] = v),
        (o[12] = x),
        (o[13] = a));
    } else a = o[13];
    let w = `profile-positions-sort-${d}`;
    return (
      o[16] !== f ||
      o[17] !== g ||
      o[18] !== h ||
      o[19] !== u ||
      o[20] !== s ||
      o[21] !== a ||
      o[22] !== w ||
      o[23] !== c
        ? ((r = (0, t.jsx)(R.f, {
            density: h,
            align: f,
            "aria-label": s,
            value: c,
            label: g,
            onChange: u,
            options: a,
            "data-testid": w,
          })),
          (o[16] = f),
          (o[17] = g),
          (o[18] = h),
          (o[19] = u),
          (o[20] = s),
          (o[21] = a),
          (o[22] = w),
          (o[23] = c),
          (o[24] = r))
        : (r = o[24]),
      r
    );
  }
  let eq = { asc: "↑", desc: "↓" };
  function eK(e) {
    let i,
      n,
      s,
      a,
      r,
      o,
      d,
      c = (0, l.c)(23),
      { column: u, label: m, sortBy: p, onSortByChange: f } = e;
    c[0] !== p ? ((i = ey(p)), (c[0] = p), (c[1] = i)) : (i = c[1]);
    let h = i,
      x = h?.column === u,
      v = h?.column === u ? h.direction : "desc",
      b = x && "text-text-primary";
    (c[2] !== b
      ? ((n = (0, eL.c)(T.n, "relative", b)), (c[2] = b), (c[3] = n))
      : (n = c[3]),
      c[4] !== u
        ? ((s = u.toLowerCase()), (c[4] = u), (c[5] = s))
        : (s = c[5]));
    let g = `profile-positions-head-sort-${s}`,
      w = x ? v : void 0;
    c[6] !== u || c[7] !== f || c[8] !== p
      ? ((a = () => f(ej(p, u))),
        (c[6] = u),
        (c[7] = f),
        (c[8] = p),
        (c[9] = a))
      : (a = c[9]);
    let N = !x && "opacity-40";
    c[10] !== N
      ? ((r = (0, eL.c)(
          "absolute top-1/2 left-full ml-1 w-2 -translate-y-1/2 text-[11px]",
          N,
        )),
        (c[10] = N),
        (c[11] = r))
      : (r = c[11]);
    let y = eq[v];
    return (
      c[12] !== y || c[13] !== r
        ? ((o = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: r,
            children: y,
          })),
          (c[12] = y),
          (c[13] = r),
          (c[14] = o))
        : (o = c[14]),
      c[15] !== x ||
      c[16] !== m ||
      c[17] !== o ||
      c[18] !== n ||
      c[19] !== g ||
      c[20] !== w ||
      c[21] !== a
        ? ((d = (0, t.jsxs)("button", {
            type: "button",
            className: n,
            "aria-pressed": x,
            "data-testid": g,
            "data-direction": w,
            onClick: a,
            children: [m, o],
          })),
          (c[15] = x),
          (c[16] = m),
          (c[17] = o),
          (c[18] = n),
          (c[19] = g),
          (c[20] = w),
          (c[21] = a),
          (c[22] = d))
        : (d = c[22]),
      d
    );
  }
  function eV(e) {
    let i,
      n,
      s,
      a,
      r,
      o,
      d,
      c,
      u,
      m,
      f,
      h,
      x = (0, l.c)(31);
    x[0] !== e
      ? ((i = void 0 === e ? {} : e), (x[0] = e), (x[1] = i))
      : (i = x[1]);
    let { sortBy: v, onSortByChange: b, filter: g } = i,
      w = void 0 === g ? "open" : g,
      { t: N } = (0, p.f)();
    x[2] !== b || x[3] !== v
      ? ((n = (e, l) =>
          void 0 !== v && void 0 !== b
            ? (0, t.jsx)(eK, {
                column: e,
                label: l,
                sortBy: v,
                onSortByChange: b,
              })
            : l),
        (x[2] = b),
        (x[3] = v),
        (x[4] = n))
      : (n = x[4]);
    let y = n;
    return (
      x[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, eL.c)(O.uH, A.G)), (x[5] = s))
        : (s = x[5]),
      x[6] !== N
        ? ((a = N("common.coin")), (x[6] = N), (x[7] = a))
        : (a = x[7]),
      x[8] !== a
        ? ((r = (0, t.jsx)("span", { children: a })), (x[8] = a), (x[9] = r))
        : (r = x[9]),
      x[10] !== y || x[11] !== N
        ? ((o = y("MCAP", N("web.filters.mcap"))),
          (x[10] = y),
          (x[11] = N),
          (x[12] = o))
        : (o = x[12]),
      x[13] !== o
        ? ((d = (0, t.jsx)("span", {
            className: "text-right max-sm:hidden",
            children: o,
          })),
          (x[13] = o),
          (x[14] = d))
        : (d = x[14]),
      x[15] !== w || x[16] !== y || x[17] !== N
        ? ((c =
            "closed" === w
              ? N("web.trade.value")
              : y("VALUE", N("web.trade.value"))),
          (x[15] = w),
          (x[16] = y),
          (x[17] = N),
          (x[18] = c))
        : (c = x[18]),
      x[19] !== c
        ? ((u = (0, t.jsx)("span", { className: "text-right", children: c })),
          (x[19] = c),
          (x[20] = u))
        : (u = x[20]),
      x[21] !== y || x[22] !== N
        ? ((m = y("PNL", N("web.trade.floating_pnl"))),
          (x[21] = y),
          (x[22] = N),
          (x[23] = m))
        : (m = x[23]),
      x[24] !== m
        ? ((f = (0, t.jsx)("span", { className: "text-right", children: m })),
          (x[24] = m),
          (x[25] = f))
        : (f = x[25]),
      x[26] !== u || x[27] !== f || x[28] !== r || x[29] !== d
        ? ((h = (0, t.jsxs)("div", {
            className: s,
            "data-testid": "profile-positions-head",
            children: [r, d, u, f],
          })),
          (x[26] = u),
          (x[27] = f),
          (x[28] = r),
          (x[29] = d),
          (x[30] = h))
        : (h = x[30]),
      h
    );
  }
  let eQ = (e) => {
      let t = e.target.closest("button, a");
      t && t !== e.currentTarget && e.preventDefault();
    },
    eH = ({
      basePct: e,
      basePnlUsd: t,
      livePnlUsd: l,
      spentUsd: i,
      receiptBasisUsd: n = null,
      costBasisUsd: s = null,
      isExited: a = null,
    }) => {
      let r = null != l && Number.isFinite(l),
        o = null != t && Number.isFinite(t);
      return r && o && l !== t
        ? 0 !== t && null != e
          ? (l / t) * e
          : (0, en.i)(l, {
              amountBoughtUsd: i,
              receiptBasisUsd: n,
              costBasisUsd: s,
              isExited: a,
            })
        : e;
    };
  function eZ(e) {
    let i,
      n,
      s,
      a,
      r,
      o,
      d = (0, l.c)(16),
      { rowAppearance: c, density: u } = e,
      m = void 0 === c ? "card" : c;
    if ("holdings" === m) {
      let e;
      return (
        d[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(A.E, {})), (d[0] = e))
          : (e = d[0]),
        e
      );
    }
    let p =
      "list" === m && "comfortable" === (void 0 === u ? "terminal" : u)
        ? 40
        : 36;
    (d[1] !== p
      ? ((i = (0, t.jsx)(B.l, { variant: "art", size: p })),
        (d[1] = p),
        (d[2] = i))
      : (i = d[2]),
      d[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 flex-col gap-1",
            children: [
              (0, t.jsx)(B.l, {
                className: "max-w-full",
                height: 14,
                width: 96,
              }),
              (0, t.jsx)(B.l, {
                className: "max-w-full",
                height: 12,
                width: 64,
              }),
            ],
          })),
          (d[3] = n))
        : (n = d[3]),
      d[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsxs)("div", {
            className: "flex shrink-0 flex-col items-end gap-1",
            children: [
              (0, t.jsx)(B.l, { height: 12, width: 40 }),
              (0, t.jsx)(B.l, { height: 14, width: 56 }),
            ],
          })),
          (d[4] = s))
        : (s = d[4]),
      d[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsxs)("div", {
            className: "flex shrink-0 flex-col items-end gap-1",
            children: [
              (0, t.jsx)(B.l, { height: 12, width: 40 }),
              (0, t.jsx)(B.l, { height: 14, width: 48 }),
            ],
          })),
          (d[5] = a))
        : (a = d[5]),
      d[6] !== i
        ? ((r = (0, t.jsxs)(t.Fragment, { children: [i, n, s, a] })),
          (d[6] = i),
          (d[7] = r))
        : (r = d[7]));
    let f = r;
    if ("list" === m) {
      let e, l, i, n;
      return (
        d[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, eL.c)(A.R, "flex w-full flex-col gap-2 py-2")),
            (d[8] = e))
          : (e = d[8]),
        d[9] !== f
          ? ((l = (0, t.jsx)("div", {
              className: "flex w-full items-center gap-3",
              children: f,
            })),
            (d[9] = f),
            (d[10] = l))
          : (l = d[10]),
        d[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("div", {
              className: "flex h-4 w-full items-center",
              children: (0, t.jsx)(B.l, { height: 12, width: 160 }),
            })),
            (d[11] = i))
          : (i = d[11]),
        d[12] !== l
          ? ((n = (0, t.jsxs)("div", {
              "aria-hidden": !0,
              "data-testid": "profile-position-skeleton-row",
              className: e,
              children: [l, i],
            })),
            (d[12] = l),
            (d[13] = n))
          : (n = d[13]),
        n
      );
    }
    return (
      d[14] !== f
        ? ((o = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "w-full py-1",
            children: (0, t.jsx)("div", {
              className:
                "flex w-full items-center gap-3 rounded-xl border border-border-secondary bg-bg-secondary p-3",
              children: f,
            }),
          })),
          (d[14] = f),
          (d[15] = o))
        : (o = d[15]),
      o
    );
  }
  function eW(e) {
    return !e;
  }
  function eY(e) {
    return e.mint;
  }
  function eG(e) {
    return !e.isNative && !e.isPerp && !e.collectible;
  }
  function eJ(e) {
    return e.quoteUnavailable ? null : (0, y.H)(Number(e.balanceUSD));
  }
  function eX(e) {
    return e.mint;
  }
  function e1(e) {
    return e;
  }
  function e0(e) {
    return e.mint;
  }
  function e2(e) {
    return e.mint;
  }
  function e3(e) {
    return { position: e, balance: (0, Y.c)(e) };
  }
  function e4(e) {
    return e;
  }
  function e5(e) {
    let i,
      n,
      s,
      a,
      r,
      o,
      d,
      c,
      u = (0, l.c)(47),
      {
        positions: f,
        dustMintSet: h,
        dustCutoffUsd: x,
        isOpen: v,
        onToggle: b,
        sharedRowProps: g,
        resolveRowData: w,
        isLiveRow: N,
        isRowVisible: y,
        observeLiveRow: j,
        liveRowIdPrefix: _,
        density: U,
        insetClassName: C,
      } = e,
      { t: P } = (0, p.f)(),
      [S, k] = (0, m.useState)(!1),
      I = "list" === g.rowAppearance;
    if (0 === f.length) return null;
    if (u[0] !== h || u[1] !== f) {
      let e;
      (u[3] !== h
        ? ((e = (e) => h.has(e.mint)), (u[3] = h), (u[4] = e))
        : (e = u[4]),
        (i = f.some(e)),
        (u[0] = h),
        (u[1] = f),
        (u[2] = i));
    } else i = u[2];
    let E = i;
    if (u[5] !== h || u[6] !== f) {
      let e;
      (u[8] !== h
        ? ((e = (e) => !h.has(e.mint)), (u[8] = h), (u[9] = e))
        : (e = u[9]),
        (n = f.some(e)),
        (u[5] = h),
        (u[6] = f),
        (u[7] = n));
    } else n = u[7];
    let M = n,
      L = E
        ? "profile.positions_card.drawer_label"
        : "profile.positions_card.drawer_label_no_dust",
      O = $.Q[U],
      T = C ?? z.U[U];
    u[10] !== O || u[11] !== T
      ? ((s = (0, eL.c)(O, T)), (u[10] = O), (u[11] = T), (u[12] = s))
      : (s = u[12]);
    let R = s;
    return (
      u[13] !== L || u[14] !== f.length || u[15] !== P
        ? ((a = P(L, { hidden_count: f.length })),
          (u[13] = L),
          (u[14] = f.length),
          (u[15] = P),
          (u[16] = a))
        : (a = u[16]),
      u[17] !== C
        ? ((r = (0, eL.c)("border-t border-border-secondary", C)),
          (u[17] = C),
          (u[18] = r))
        : (r = u[18]),
      u[19] !== U || u[20] !== v || u[21] !== b || u[22] !== a || u[23] !== r
        ? ((o = (0, t.jsx)(D.r, {
            density: U,
            kind: "disclosure",
            label: a,
            open: v,
            onToggle: b,
            className: r,
          })),
          (u[19] = U),
          (u[20] = v),
          (u[21] = b),
          (u[22] = a),
          (u[23] = r),
          (u[24] = o))
        : (o = u[24]),
      u[25] !== U ||
      u[26] !== x ||
      u[27] !== h ||
      u[28] !== E ||
      u[29] !== M ||
      u[30] !== C ||
      u[31] !== S ||
      u[32] !== I ||
      u[33] !== N ||
      u[34] !== v ||
      u[35] !== y ||
      u[36] !== R ||
      u[37] !== _ ||
      u[38] !== j ||
      u[39] !== f ||
      u[40] !== w ||
      u[41] !== g ||
      u[42] !== P
        ? ((d = v
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  E
                    ? (0, t.jsxs)("div", {
                        className: "flex w-full flex-col pb-2",
                        children: [
                          (0, t.jsxs)("p", {
                            className: R,
                            children: [
                              P(
                                "web.profile.positions_hidden_dust_description",
                                { amount: (0, eF.c)(x) },
                              ),
                              g.isOwner
                                ? (0, t.jsxs)(t.Fragment, {
                                    children: [
                                      " ",
                                      (0, t.jsx)("button", {
                                        type: "button",
                                        "aria-expanded": S,
                                        onClick: () => k(e6),
                                        className:
                                          "font-medium text-text-accent transition-colors hover:text-text-primary",
                                        children: P("common.edit"),
                                      }),
                                    ],
                                  })
                                : null,
                            ],
                          }),
                          g.isOwner && S
                            ? (0, t.jsx)(F.f, {
                                address: g.ownerAddress,
                                density: U,
                                surface: "profile",
                                onSaved: () => k(!1),
                                className: (0, eL.c)(
                                  "mt-2 max-w-xs",
                                  C ?? z.U[U],
                                ),
                              })
                            : null,
                        ],
                      })
                    : null,
                  M
                    ? (0, t.jsx)("p", {
                        className: (0, eL.c)(R, "pb-2"),
                        children: P("web.profile.positions_hidden_description"),
                      })
                    : null,
                  (0, t.jsx)("div", {
                    className: (0, eL.c)("flex w-full flex-col", I && A.D),
                    children: f.map((e, l) =>
                      (0, t.jsxs)(
                        "div",
                        {
                          className:
                            "flex w-full flex-col opacity-60 transition-opacity hover:opacity-100",
                          children: [
                            (0, t.jsx)(e7, {
                              balance: e,
                              ...g,
                              ...w(e),
                              isLiveRow: N,
                              isRowVisible: y(e.mint),
                              observeLiveRow: j,
                              liveRowIdPrefix: _,
                              isLastRow: l === f.length - 1,
                            }),
                            g.isOwner && !h.has(e.mint)
                              ? (0, t.jsx)(e8, {
                                  mint: e.mint,
                                  ownerAddress: g.ownerAddress,
                                  density: U,
                                  insetClassName: C,
                                })
                              : null,
                          ],
                        },
                        e.mint,
                      ),
                    ),
                  }),
                ],
              })
            : null),
          (u[25] = U),
          (u[26] = x),
          (u[27] = h),
          (u[28] = E),
          (u[29] = M),
          (u[30] = C),
          (u[31] = S),
          (u[32] = I),
          (u[33] = N),
          (u[34] = v),
          (u[35] = y),
          (u[36] = R),
          (u[37] = _),
          (u[38] = j),
          (u[39] = f),
          (u[40] = w),
          (u[41] = g),
          (u[42] = P),
          (u[43] = d))
        : (d = u[43]),
      u[44] !== o || u[45] !== d
        ? ((c = (0, t.jsxs)("div", {
            className: "flex w-full flex-col",
            "data-testid": "profile-hidden-positions",
            children: [o, d],
          })),
          (u[44] = o),
          (u[45] = d),
          (u[46] = c))
        : (c = u[46]),
      c
    );
  }
  function e6(e) {
    return !e;
  }
  function e8(e) {
    let i,
      n,
      s,
      a,
      r,
      o,
      d,
      c = (0, l.c)(21),
      { mint: u, ownerAddress: m, density: f, insetClassName: h } = e,
      { t: x } = (0, p.f)(),
      { mutate: v, isPending: b, isError: g } = (0, Z.f)(m),
      w = h ?? z.U[f];
    (c[0] !== w
      ? ((i = (0, eL.c)("flex items-center gap-2 pb-3", w)),
        (c[0] = w),
        (c[1] = i))
      : (i = c[1]),
      c[2] !== u || c[3] !== v
        ? ((n = () => v(u)), (c[2] = u), (c[3] = v), (c[4] = n))
        : (n = c[4]));
    let N =
      "terminal" === f ? "text-xs leading-4" : "text-[13px] leading-[18px]";
    return (
      c[5] !== N
        ? ((s = (0, eL.c)(
            N,
            "font-medium text-text-accent transition-colors hover:text-text-primary disabled:opacity-50",
          )),
          (c[5] = N),
          (c[6] = s))
        : (s = c[6]),
      c[7] !== x
        ? ((a = x("web.profile.positions_not_spam")), (c[7] = x), (c[8] = a))
        : (a = c[8]),
      c[9] !== b || c[10] !== n || c[11] !== s || c[12] !== a
        ? ((r = (0, t.jsx)("button", {
            type: "button",
            disabled: b,
            onClick: n,
            className: s,
            children: a,
          })),
          (c[9] = b),
          (c[10] = n),
          (c[11] = s),
          (c[12] = a),
          (c[13] = r))
        : (r = c[13]),
      c[14] !== g || c[15] !== x
        ? ((o = g
            ? (0, t.jsx)("span", {
                className: "text-xs text-text-tertiary",
                children: x("web.profile.positions_not_spam_error"),
              })
            : null),
          (c[14] = g),
          (c[15] = x),
          (c[16] = o))
        : (o = c[16]),
      c[17] !== i || c[18] !== r || c[19] !== o
        ? ((d = (0, t.jsxs)("div", { className: i, children: [r, o] })),
          (c[17] = i),
          (c[18] = r),
          (c[19] = o),
          (c[20] = d))
        : (d = c[20]),
      d
    );
  }
  function e7(e) {
    let i,
      a = (0, l.c)(8),
      r = (0, s.k)(n.D.WEB_PACKS, !1);
    if (e.balance.perp) {
      let l;
      return (
        a[0] !== e
          ? ((l = (0, t.jsx)(S.f, { ...e })), (a[0] = e), (a[1] = l))
          : (l = a[1]),
        l
      );
    }
    if (e.balance.isNative) {
      let l;
      return (
        a[2] !== e
          ? ((l = (0, t.jsx)(P.f, { ...e })), (a[2] = e), (a[3] = l))
          : (l = a[3]),
        l
      );
    }
    if (e.balance.collectible && r) {
      let l;
      return (
        a[4] !== e
          ? ((l = (0, t.jsx)(C.f, { ...e })), (a[4] = e), (a[5] = l))
          : (l = a[5]),
        l
      );
    }
    return (
      a[6] !== e
        ? ((i = (0, t.jsx)(e9, { ...e })), (a[6] = e), (a[7] = i))
        : (i = a[7]),
      i
    );
  }
  function e9(e) {
    let n,
      s,
      a,
      r,
      o,
      d,
      p,
      f,
      N,
      y,
      _,
      C,
      P,
      S,
      E,
      L,
      O,
      F,
      T,
      R,
      z = (0, l.c)(222),
      {
        balance: $,
        isClosed: D,
        exitProceedsUsd: B,
        isOwner: K,
        coin: V,
        fallbackIdentity: Q,
        callout: H,
        positionSummary: Z,
        ledgerNetPnlUsd: W,
        ownerAddress: Y,
        ownerUserId: J,
        ownerName: X,
        ownerShareName: ee,
        ownerAvatarUrl: et,
        ownerAvatarDecoration: el,
        ownerVerified: ei,
        ownerXUsername: en,
        viewMode: ea,
        rowAppearance: er,
        density: eo,
        hideShare: ed,
        showCalloutNote: ec,
        subtitle: eu,
        isLiveRow: em,
        isRowVisible: ef,
        pricedAtMs: eh,
        observeLiveRow: ex,
        liveRowIdPrefix: ev,
        isLastRow: eg,
      } = e,
      ew = void 0 !== ed && ed,
      eN = void 0 === ec || ec,
      ey = void 0 !== ef && ef,
      ej = void 0 === eh ? 0 : eh,
      e_ = void 0 !== eg && eg,
      [eU, eC] = (0, m.useState)(!1),
      eA = (0, u.useRouter)();
    z[0] !== $.mint || z[1] !== V
      ? ((n = V ?? (0, G.e)($.mint)), (z[0] = $.mint), (z[1] = V), (z[2] = n))
      : (n = z[2]);
    let { prefetch: eP, hoverProps: eS } = (0, G.W)(n),
      ek = $.servedCoin;
    z[3] !== $.mint || z[4] !== V || z[5] !== Q || z[6] !== ek
      ? ((s = (0, ep.F)({
          mint: $.mint,
          sources: [
            V && { name: V.name, symbol: V.symbol, imageUri: V.image_uri },
            ek,
            Q,
          ],
        })),
        (z[3] = $.mint),
        (z[4] = V),
        (z[5] = Q),
        (z[6] = ek),
        (z[7] = s))
      : (s = z[7]);
    let { symbol: eI, name: eO, imageUri: eF } = s,
      eT = V?.chain_id ?? $.chain ?? String($.chainId),
      eR = Number($.balanceUSD) || 0,
      ez = W ?? $.pnl?.total_pnl.usd ?? null,
      e$ = void 0 !== em && em && !D;
    z[8] !== $.liveAnchorMarketCapUsd ||
    z[9] !== $.liveAnchorSupplyUi ||
    z[10] !== $.mint ||
    z[11] !== eT ||
    z[12] !== ey ||
    z[13] !== ej ||
    z[14] !== e$ ||
    z[15] !== eR ||
    z[16] !== ez
      ? ((a = {
          mint: $.mint,
          chainId: eT,
          anchorMarketCapUsd: $.liveAnchorMarketCapUsd,
          anchorSupplyUi: $.liveAnchorSupplyUi,
          pricedAtMs: ej,
          positionUsd: eR,
          pnlUsd: ez,
          enabled: e$,
          isVisible: ey,
        }),
        (z[8] = $.liveAnchorMarketCapUsd),
        (z[9] = $.liveAnchorSupplyUi),
        (z[10] = $.mint),
        (z[11] = eT),
        (z[12] = ey),
        (z[13] = ej),
        (z[14] = e$),
        (z[15] = eR),
        (z[16] = ez),
        (z[17] = a))
      : (a = z[17]);
    let { positionUsd: eD, pnlUsd: eB } = (0, M.f)(a),
      eq = void 0 !== ev ? ev + $.mint : void 0,
      eK = H ? `/callouts/${$.mint}/${H.calloutId}` : null,
      eV = H?.calloutId
        ? `/coin/${$.mint}?highlight_callout=${H.calloutId}`
        : `/coin/${$.mint}?highlight_holder=${Y}`,
      eZ = "compressed" === ea && "holdings" === er;
    (z[18] !== eV || z[19] !== eP || z[20] !== eZ || z[21] !== eA
      ? ((r = () => {
          eP && eZ && eA.prefetch(eV);
        }),
        (o = [eP, eZ, eV, eA]),
        (z[18] = eV),
        (z[19] = eP),
        (z[20] = eZ),
        (z[21] = eA),
        (z[22] = r),
        (z[23] = o))
      : ((r = z[22]), (o = z[23])),
      (0, m.useEffect)(r, o));
    let eW = Z?.spentUsd ?? null,
      eY = W ?? $.pnl?.total_pnl.usd ?? null;
    z[24] !== $.pnl?.total_pnl ||
    z[25] !== eB ||
    z[26] !== Z ||
    z[27] !== eY ||
    z[28] !== eW
      ? ((d = eH({
          basePct: Z
            ? Z.displayPct
            : ((e) => {
                if (null == e) return null;
                let t = Number.parseFloat(e);
                return Number.isFinite(t) ? t : null;
              })($.pnl?.total_pnl.percent),
          basePnlUsd: eY,
          livePnlUsd: eB,
          spentUsd: eW,
          receiptBasisUsd: Z?.receiptBasisUsd ?? null,
          costBasisUsd: Z?.costBasisUsd ?? null,
          isExited: Z?.isExited ?? null,
        })),
        (z[24] = $.pnl?.total_pnl),
        (z[25] = eB),
        (z[26] = Z),
        (z[27] = eY),
        (z[28] = eW),
        (z[29] = d))
      : (d = z[29]);
    let eG = d;
    z[30] !== D
      ? ((p = D
          ? {
              mine: i.k9.CLOSED_POSITIONS_LIST_MINE,
              other: i.k9.CLOSED_POSITIONS_LIST_OTHER,
            }
          : {
              mine: i.k9.POSITIONS_LIST_MINE,
              other: i.k9.POSITIONS_LIST_OTHER,
            }),
        (z[30] = D),
        (z[31] = p))
      : (p = z[31]);
    let eJ = p;
    z[32] !== $.mint ||
    z[33] !== H ||
    z[34] !== eT ||
    z[35] !== V ||
    z[36] !== eF ||
    z[37] !== D ||
    z[38] !== eJ ||
    z[39] !== eG ||
    z[40] !== eO ||
    z[41] !== eB ||
    z[42] !== Y ||
    z[43] !== et ||
    z[44] !== ee ||
    z[45] !== ei ||
    z[46] !== en ||
    z[47] !== Z?.avgEntryPriceUsd ||
    z[48] !== eW ||
    z[49] !== eI
      ? ((f =
          null != eB
            ? {
                sourceElement: eJ,
                data: {
                  mint: $.mint,
                  chainId: eT,
                  coin: V ?? null,
                  coinName: eO,
                  coinSymbol: eI,
                  coinImageUri: eF,
                  pnlUsd: eB,
                  pnlPct: eG,
                  investedUsd: eW,
                  avgEntryPriceUsd: Z?.avgEntryPriceUsd ?? null,
                  isClosed: D,
                  holder: {
                    address: Y,
                    displayName: ee,
                    avatarUrl: et ?? null,
                    isVerified: ei,
                    xUsername: en,
                  },
                  callout: H
                    ? {
                        calloutId: H.calloutId,
                        thesis: H.note?.trim() ?? "",
                        createdAtMs: H.createdAt,
                        peakMultiple: (0, eM.p)(H),
                        marketCapUsd: H.marketCap > 0 ? H.marketCap : null,
                      }
                    : null,
                },
              }
            : null),
        (z[32] = $.mint),
        (z[33] = H),
        (z[34] = eT),
        (z[35] = V),
        (z[36] = eF),
        (z[37] = D),
        (z[38] = eJ),
        (z[39] = eG),
        (z[40] = eO),
        (z[41] = eB),
        (z[42] = Y),
        (z[43] = et),
        (z[44] = ee),
        (z[45] = ei),
        (z[46] = en),
        (z[47] = Z?.avgEntryPriceUsd),
        (z[48] = eW),
        (z[49] = eI),
        (z[50] = f))
      : (f = z[50]);
    let eX = f;
    z[51] !== ew || z[52] !== eX
      ? ((N = ew ? null : (0, t.jsx)(I.O, { share: eX })),
        (z[51] = ew),
        (z[52] = eX),
        (z[53] = N))
      : (N = z[53]);
    let e1 = N,
      e0 = ew ? "w-full" : I.B;
    (z[54] !== eT || z[55] !== V || z[56] !== ek
      ? ((y = V ?? eb(ek, eT)),
        (z[54] = eT),
        (z[55] = V),
        (z[56] = ek),
        (z[57] = y))
      : (y = z[57]),
      z[58] !== $.mint || z[59] !== Z || z[60] !== y
        ? ((_ = (0, t.jsx)(U.n, {
            mint: $.mint,
            coin: y,
            positionSummary: Z,
            testId: "profile-position-basis",
          })),
          (z[58] = $.mint),
          (z[59] = Z),
          (z[60] = y),
          (z[61] = _))
        : (_ = z[61]),
      z[62] !== e0 || z[63] !== _
        ? ((C = (0, t.jsx)("div", { className: e0, children: _ })),
          (z[62] = e0),
          (z[63] = _),
          (z[64] = C))
        : (C = z[64]));
    let e2 = C,
      e3 = H?.calloutId,
      e4 = "expanded" === ea && !!H?.calloutId;
    z[65] !== $.mint || z[66] !== Y || z[67] !== e3 || z[68] !== e4
      ? ((P = { mint: $.mint, calloutId: e3, authorAddress: Y, enabled: e4 }),
        (z[65] = $.mint),
        (z[66] = Y),
        (z[67] = e3),
        (z[68] = e4),
        (z[69] = P))
      : (P = z[69]);
    let e5 = (0, q.f)(P);
    (z[70] !== eT || z[71] !== V || z[72] !== ek
      ? ((S = V ?? eb(ek, eT)),
        (z[70] = eT),
        (z[71] = V),
        (z[72] = ek),
        (z[73] = S))
      : (S = z[73]),
      z[74] !== $.mint || z[75] !== Z || z[76] !== S
        ? ((E = { mint: $.mint, coin: S, positionSummary: Z }),
          (z[74] = $.mint),
          (z[75] = Z),
          (z[76] = S),
          (z[77] = E))
        : (E = z[77]));
    let e6 = (0, U.r)(E);
    if (eZ) {
      let e, l, i, n, s, a, r, o;
      z[78] !== H?.note || z[79] !== eN
        ? ((e = eN ? H?.note?.trim() : void 0),
          (z[78] = H?.note),
          (z[79] = eN),
          (z[80] = e))
        : (e = z[80]);
      let d = e,
        c = e_ ? "border-b-0" : void 0,
        u = V?.program,
        m = V?.platform,
        p = V?.protocol,
        f = V?.board_program,
        x = D ? null : $.balance,
        v = D || $.quoteUnavailable ? null : eD,
        b = B ?? Z?.exitProceedsUsd,
        g = K ? eJ.mine : eJ.other;
      return (
        z[81] !== $.mint || z[82] !== g
          ? ((l = (0, t.jsx)(k.f, { mint: $.mint, sourceElement: g })),
            (z[81] = $.mint),
            (z[82] = g),
            (z[83] = l))
          : (l = z[83]),
        z[84] !== ew || z[85] !== eX
          ? ((i = ew ? null : (0, t.jsx)(I.O, { share: eX, variant: "board" })),
            (z[84] = ew),
            (z[85] = eX),
            (z[86] = i))
          : (i = z[86]),
        z[87] !== l || z[88] !== i
          ? ((n = (0, t.jsxs)(t.Fragment, { children: [l, i] })),
            (z[87] = l),
            (z[88] = i),
            (z[89] = n))
          : (n = z[89]),
        z[90] !== d
          ? ((s = d
              ? (0, t.jsx)("div", {
                  "data-testid": "profile-position-note",
                  children: (0, t.jsx)(te, {
                    text: d,
                    size: "md",
                    clampLines: 3,
                  }),
                })
              : void 0),
            (z[90] = d),
            (z[91] = s))
          : (s = z[91]),
        z[92] !== H || z[93] !== D || z[94] !== K || z[95] !== eI
          ? ((a =
              K && D && H
                ? (0, t.jsx)(h.f, {
                    variant: "inline",
                    context: "profile",
                    symbol: eI,
                    className: (0, eL.c)(A.z, "pt-1"),
                  })
                : null),
            (z[92] = H),
            (z[93] = D),
            (z[94] = K),
            (z[95] = eI),
            (z[96] = a))
          : (a = z[96]),
        z[97] !== $.mint ||
        z[98] !== $.openedAt ||
        z[99] !== $.updatedAt ||
        z[100] !== e6.avgEntryMcapUsd ||
        z[101] !== e6.currentMcapUsd ||
        z[102] !== e6.spentUsd ||
        z[103] !== eT ||
        z[104] !== eV ||
        z[105] !== eF ||
        z[106] !== D ||
        z[107] !== eO ||
        z[108] !== eB ||
        z[109] !== eG ||
        z[110] !== eu ||
        z[111] !== eI ||
        z[112] !== c ||
        z[113] !== u ||
        z[114] !== m ||
        z[115] !== p ||
        z[116] !== f ||
        z[117] !== x ||
        z[118] !== v ||
        z[119] !== b ||
        z[120] !== n ||
        z[121] !== s ||
        z[122] !== a
          ? ((r = (0, t.jsx)(A.d, {
              href: eV,
              className: c,
              mint: $.mint,
              name: eO,
              symbol: eI,
              imageUri: eF,
              chainId: eT,
              program: u,
              platform: m,
              protocol: p,
              boardProgram: f,
              amount: x,
              valueUsd: v,
              exitProceedsUsd: b,
              marketCapUsd: e6.currentMcapUsd,
              avgEntryMarketCapUsd: e6.avgEntryMcapUsd,
              spentUsd: e6.spentUsd,
              pnlUsd: eB,
              pnlPct: eG,
              isClosed: D,
              closedAt: $.updatedAt,
              openedAt: $.openedAt,
              subtitle: eu,
              actions: n,
              note: s,
              children: a,
            })),
            (z[97] = $.mint),
            (z[98] = $.openedAt),
            (z[99] = $.updatedAt),
            (z[100] = e6.avgEntryMcapUsd),
            (z[101] = e6.currentMcapUsd),
            (z[102] = e6.spentUsd),
            (z[103] = eT),
            (z[104] = eV),
            (z[105] = eF),
            (z[106] = D),
            (z[107] = eO),
            (z[108] = eB),
            (z[109] = eG),
            (z[110] = eu),
            (z[111] = eI),
            (z[112] = c),
            (z[113] = u),
            (z[114] = m),
            (z[115] = p),
            (z[116] = f),
            (z[117] = x),
            (z[118] = v),
            (z[119] = b),
            (z[120] = n),
            (z[121] = s),
            (z[122] = a),
            (z[123] = r))
          : (r = z[123]),
        z[124] !== eS || z[125] !== eq || z[126] !== ex || z[127] !== r
          ? ((o = (0, t.jsx)("div", {
              id: eq,
              ref: ex,
              className: A.K,
              "data-testid": "profile-position-row",
              ...eS,
              children: r,
            })),
            (z[124] = eS),
            (z[125] = eq),
            (z[126] = ex),
            (z[127] = r),
            (z[128] = o))
          : (o = z[128]),
        o
      );
    }
    if ("compressed" === ea) {
      let e, l, i, n, s;
      z[129] !== H?.note || z[130] !== eN
        ? ((e = eN ? H?.note?.trim() : void 0),
          (z[129] = H?.note),
          (z[130] = eN),
          (z[131] = e))
        : (e = z[131]);
      let a = e,
        r = "list" === er,
        o = eo ?? "terminal",
        d = r ? A.f : "block w-full cursor-pointer py-1 text-left",
        u = r ? "row" : "elevated",
        m = r ? o : void 0,
        p = D ? null : $.balance,
        f = D || $.quoteUnavailable ? null : eD,
        x = B ?? Z?.exitProceedsUsd;
      return (
        z[132] !== r || z[133] !== o || z[134] !== a
          ? ((l = a
              ? (0, t.jsx)("div", {
                  "data-testid": "profile-position-note",
                  className: r
                    ? "-mx-[var(--position-row-pad,1rem)] w-[calc(100%+2*var(--position-row-pad,1rem))] border-t border-border-secondary px-[var(--position-row-pad,1rem)] pt-2"
                    : "-mx-3 w-[calc(100%+1.5rem)] border-t border-border-tertiary px-3 pt-2",
                  children: (0, t.jsx)(te, {
                    text: a,
                    size: r && "comfortable" === o ? "md" : "sm",
                  }),
                })
              : null),
            (z[132] = r),
            (z[133] = o),
            (z[134] = a),
            (z[135] = l))
          : (l = z[135]),
        z[136] !== H || z[137] !== D || z[138] !== K || z[139] !== eI
          ? ((i =
              K && D && H
                ? (0, t.jsx)(h.f, {
                    variant: "inline",
                    context: "profile",
                    symbol: eI,
                    className: "pt-2",
                  })
                : null),
            (z[136] = H),
            (z[137] = D),
            (z[138] = K),
            (z[139] = eI),
            (z[140] = i))
          : (i = z[140]),
        z[141] !== $.mint ||
        z[142] !== $.updatedAt ||
        z[143] !== e2 ||
        z[144] !== eT ||
        z[145] !== eF ||
        z[146] !== D ||
        z[147] !== eO ||
        z[148] !== eB ||
        z[149] !== e1 ||
        z[150] !== eu ||
        z[151] !== eI ||
        z[152] !== u ||
        z[153] !== m ||
        z[154] !== p ||
        z[155] !== f ||
        z[156] !== x ||
        z[157] !== l ||
        z[158] !== i
          ? ((n = (0, t.jsxs)(w.f, {
              variant: u,
              density: m,
              subtitle: eu,
              mint: $.mint,
              symbol: eI,
              name: eO,
              imageUri: eF,
              chainId: eT,
              heldAmount: p,
              positionUsd: f,
              isClosed: D,
              exitProceedsUsd: x,
              closedAt: $.updatedAt,
              netPnlUsd: eB,
              actions: e1,
              className: "w-full",
              children: [e2, l, i],
            })),
            (z[141] = $.mint),
            (z[142] = $.updatedAt),
            (z[143] = e2),
            (z[144] = eT),
            (z[145] = eF),
            (z[146] = D),
            (z[147] = eO),
            (z[148] = eB),
            (z[149] = e1),
            (z[150] = eu),
            (z[151] = eI),
            (z[152] = u),
            (z[153] = m),
            (z[154] = p),
            (z[155] = f),
            (z[156] = x),
            (z[157] = l),
            (z[158] = i),
            (z[159] = n))
          : (n = z[159]),
        z[160] !== eS ||
        z[161] !== eV ||
        z[162] !== eP ||
        z[163] !== eq ||
        z[164] !== ex ||
        z[165] !== d ||
        z[166] !== n
          ? ((s = (0, t.jsx)(c.default, {
              id: eq,
              ref: ex,
              href: eV,
              prefetch: eP,
              ...eS,
              onClick: eQ,
              className: d,
              "data-testid": "profile-position-row",
              children: n,
            })),
            (z[160] = eS),
            (z[161] = eV),
            (z[162] = eP),
            (z[163] = eq),
            (z[164] = ex),
            (z[165] = d),
            (z[166] = n),
            (z[167] = s))
          : (s = z[167]),
        s
      );
    }
    let e8 = H?.createdAt ?? null,
      e7 = H?.note,
      e9 = H?.mediaUrl;
    z[168] !== en
      ? ((L = en ? (0, t.jsx)(j.f, { xUsername: en }) : void 0),
        (z[168] = en),
        (z[169] = L))
      : (L = z[169]);
    let tt = e_ ? "none" : "strong",
      tl = D ? null : $.balance,
      ti = D || $.quoteUnavailable ? null : eD,
      tn = B ?? Z?.exitProceedsUsd;
    return (
      z[170] !== $.mint ||
      z[171] !== $.updatedAt ||
      z[172] !== e2 ||
      z[173] !== eT ||
      z[174] !== eF ||
      z[175] !== D ||
      z[176] !== eO ||
      z[177] !== eB ||
      z[178] !== e1 ||
      z[179] !== eI ||
      z[180] !== tl ||
      z[181] !== ti ||
      z[182] !== tn
        ? ((O = (0, t.jsx)(w.f, {
            variant: "elevated",
            density: "comfortable",
            mint: $.mint,
            symbol: eI,
            name: eO,
            imageUri: eF,
            chainId: eT,
            heldAmount: tl,
            positionUsd: ti,
            isClosed: D,
            exitProceedsUsd: tn,
            closedAt: $.updatedAt,
            netPnlUsd: eB,
            actions: e1,
            className: "w-full",
            children: e2,
          })),
          (z[170] = $.mint),
          (z[171] = $.updatedAt),
          (z[172] = e2),
          (z[173] = eT),
          (z[174] = eF),
          (z[175] = D),
          (z[176] = eO),
          (z[177] = eB),
          (z[178] = e1),
          (z[179] = eI),
          (z[180] = tl),
          (z[181] = ti),
          (z[182] = tn),
          (z[183] = O))
        : (O = z[183]),
      z[184] !== H || z[185] !== D || z[186] !== K || z[187] !== eI
        ? ((F =
            K && D && H
              ? (0, t.jsx)(h.f, { symbol: eI, context: "profile" })
              : null),
          (z[184] = H),
          (z[185] = D),
          (z[186] = K),
          (z[187] = eI),
          (z[188] = F))
        : (F = z[188]),
      z[189] !== $.mint ||
      z[190] !== H ||
      z[191] !== eK ||
      z[192] !== V ||
      z[193] !== D ||
      z[194] !== K ||
      z[195] !== eU ||
      z[196] !== Y ||
      z[197] !== ee ||
      z[198] !== eX ||
      z[199] !== eI
        ? ((T =
            H && V
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(b.f, {
                      onUpdateCallout: K ? () => eC(!0) : void 0,
                      replay: (0, eE.B)(V)
                        ? { mint: $.mint, walletAddress: Y, ownerLabel: ee }
                        : void 0,
                      viewCount: H.viewCount ?? null,
                      shareUrl: eK,
                      shareTitle: (0, es.f)(ee, eI),
                      sharePositionCard: eX,
                    }),
                    K
                      ? (0, t.jsx)(v.f, {
                          isOpen: eU,
                          onOpenChange: eC,
                          coin: V,
                          calloutId: H.calloutId,
                          note: H.note,
                          createdAt: H.createdAt,
                          entryPoint: "profile_positions",
                        })
                      : null,
                  ],
                })
              : K && !D && V
                ? (0, t.jsx)(x.f, { variant: "inline", coin: V })
                : null),
          (z[189] = $.mint),
          (z[190] = H),
          (z[191] = eK),
          (z[192] = V),
          (z[193] = D),
          (z[194] = K),
          (z[195] = eU),
          (z[196] = Y),
          (z[197] = ee),
          (z[198] = eX),
          (z[199] = eI),
          (z[200] = T))
        : (T = z[200]),
      z[201] !== eS ||
      z[202] !== eV ||
      z[203] !== eP ||
      z[204] !== eq ||
      z[205] !== ex ||
      z[206] !== Y ||
      z[207] !== el ||
      z[208] !== et ||
      z[209] !== X ||
      z[210] !== e5 ||
      z[211] !== J ||
      z[212] !== ei ||
      z[213] !== e8 ||
      z[214] !== e7 ||
      z[215] !== e9 ||
      z[216] !== L ||
      z[217] !== tt ||
      z[218] !== O ||
      z[219] !== F ||
      z[220] !== T
        ? ((R = (0, t.jsxs)(g.f, {
            prefetch: eP,
            linkProps: eS,
            authorAddress: Y,
            authorUserId: J,
            authorName: X,
            authorAvatarUrl: et,
            authorAvatarDecoration: el,
            authorVerified: ei,
            createdAt: e8,
            note: e7,
            mediaUrl: e9,
            updates: e5,
            noteSize: "md",
            contentGap: "md",
            nameAdornment: L,
            divider: tt,
            className: "px-5",
            href: eV,
            id: eq,
            rootRef: ex,
            testId: "profile-position-row",
            children: [O, F, T],
          })),
          (z[201] = eS),
          (z[202] = eV),
          (z[203] = eP),
          (z[204] = eq),
          (z[205] = ex),
          (z[206] = Y),
          (z[207] = el),
          (z[208] = et),
          (z[209] = X),
          (z[210] = e5),
          (z[211] = J),
          (z[212] = ei),
          (z[213] = e8),
          (z[214] = e7),
          (z[215] = e9),
          (z[216] = L),
          (z[217] = tt),
          (z[218] = O),
          (z[219] = F),
          (z[220] = T),
          (z[221] = R))
        : (R = z[221]),
      R
    );
  }
  function te(e) {
    let i,
      n,
      s,
      a,
      r,
      o,
      d,
      c = (0, l.c)(17),
      { text: u, size: f, clampLines: h } = e,
      { t: x } = (0, p.f)(),
      [v, b] = (0, m.useState)(!1),
      [g, w] = (0, m.useState)(!1),
      y = (0, m.useRef)(null);
    (c[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = () => {
          let e = y.current;
          if (!e) return;
          let t = () => w(e.scrollHeight > e.clientHeight + 1);
          if ((t(), "u" < typeof ResizeObserver)) return;
          let l = new ResizeObserver(t);
          return (l.observe(e), () => l.disconnect());
        }),
        (n = []),
        (c[0] = i),
        (c[1] = n))
      : ((i = c[0]), (n = c[1])),
      (0, m.useEffect)(i, n));
    let j = g || v,
      _ =
        "md" === (void 0 === f ? "sm" : f)
          ? "text-sm leading-[18px]"
          : "text-xs leading-4",
      U =
        !v && (3 === (void 0 === h ? 2 : h) ? "line-clamp-3" : "line-clamp-2");
    return (
      c[2] !== _ || c[3] !== U
        ? ((s = (0, eL.c)(_, "text-text-secondary", U)),
          (c[2] = _),
          (c[3] = U),
          (c[4] = s))
        : (s = c[4]),
      c[5] !== u
        ? ((a = (0, t.jsx)(N.f, { content: u, withinLink: !0 })),
          (c[5] = u),
          (c[6] = a))
        : (a = c[6]),
      c[7] !== s || c[8] !== a
        ? ((r = (0, t.jsx)("p", { ref: y, className: s, children: a })),
          (c[7] = s),
          (c[8] = a),
          (c[9] = r))
        : (r = c[9]),
      c[10] !== v || c[11] !== j || c[12] !== x
        ? ((o = j
            ? (0, t.jsx)("button", {
                type: "button",
                onClick: () => b(tt),
                className:
                  "mt-1 text-xs font-medium text-text-accent transition-colors hover:text-text-primary",
                children: x(v ? "common.show_less" : "common.show_more"),
              })
            : null),
          (c[10] = v),
          (c[11] = j),
          (c[12] = x),
          (c[13] = o))
        : (o = c[13]),
      c[14] !== o || c[15] !== r
        ? ((d = (0, t.jsxs)(t.Fragment, { children: [r, o] })),
          (c[14] = o),
          (c[15] = r),
          (c[16] = d))
        : (d = c[16]),
      d
    );
  }
  function tt(e) {
    return !e;
  }
  e.s(
    [
      "PositionsBoardHead",
      0,
      eV,
      "ProfilePositionRow",
      0,
      e7,
      "ProfilePositionsCallouts",
      0,
      function (e) {
        let i,
          c,
          u,
          h,
          x,
          v,
          b,
          g,
          w,
          N,
          j,
          U,
          C,
          P,
          S,
          k,
          I,
          M,
          F,
          T,
          R,
          z,
          D,
          B,
          q,
          Z,
          G,
          es,
          ef,
          eh,
          eb,
          ew,
          eN,
          ej,
          e_,
          eS,
          ek,
          eE,
          eM,
          eF,
          eR,
          ez,
          eD,
          eq,
          eK,
          eQ,
          eH,
          e6,
          e8,
          e9,
          te,
          tt,
          tl,
          ti,
          tn,
          ts,
          ta = (0, l.c)(313),
          { t: tr } = (0, p.f)(),
          {
            address: to,
            user: td,
            isOwner: tc,
            filter: tu,
            filterValue: tm,
            calloutsOnly: tp,
            positionType: tf,
            xUsername: th,
            viewMode: tx,
            rowAppearance: tv,
            density: tb,
            hideShare: tg,
          } = e,
          tw = void 0 === tm ? "" : tm,
          tN = void 0 !== tp && tp,
          ty = void 0 === tf ? "all" : tf,
          tj = void 0 === tx ? "compressed" : tx,
          t_ = void 0 === tv ? "card" : tv,
          tU = void 0 !== tg && tg,
          tC = "closed" === tu,
          tA = "list" === t_,
          tP = tb ?? "comfortable",
          tS = tA ? A.R : void 0,
          tk = (0, d.s)(td?.userId ?? to),
          [tI, tE] = (0, m.useState)(tC ? "PNL" : "POSITION_SIZE"),
          tM = void 0 !== e.sortBy,
          tL = e.sortBy ?? tI,
          tO = e.onSortByChange ?? tE,
          tF = "compressed" === tj && "holdings" === t_;
        ta[0] !== tu || ta[1] !== tF || ta[2] !== tO || ta[3] !== tL
          ? ((i = tF
              ? (0, t.jsx)(eV, { sortBy: tL, onSortByChange: tO, filter: tu })
              : null),
            (ta[0] = tu),
            (ta[1] = tF),
            (ta[2] = tO),
            (ta[3] = tL),
            (ta[4] = i))
          : (i = ta[4]);
        let tT = i,
          tR = tN || "CALLOUT_RECENCY" === tL;
        ta[5] !== tL ? ((c = eU(tL)), (ta[5] = tL), (ta[6] = c)) : (c = ta[6]);
        let tz = c;
        ta[7] !== tL ? ((u = eC(tL)), (ta[7] = tL), (ta[8] = u)) : (u = ta[8]);
        let t$ = tR || tz,
          tD = !tC,
          tB = !tC;
        ta[9] !== to ||
        ta[10] !== tu ||
        ta[11] !== tD ||
        ta[12] !== tB ||
        ta[13] !== u ||
        ta[14] !== t$
          ? ((h = {
              address: to,
              filter: tu,
              sortBy: u,
              walkToEnd: t$,
              withCreatedMints: tD,
              includeNativeRows: tB,
            }),
            (ta[9] = to),
            (ta[10] = tu),
            (ta[11] = tD),
            (ta[12] = tB),
            (ta[13] = u),
            (ta[14] = t$),
            (ta[15] = h))
          : (h = ta[15]);
        let {
          data: tq,
          isLoading: tK,
          isPlaceholderData: tV,
          dataUpdatedAt: tQ,
          fetchNextPage: tH,
          hasNextPage: tZ,
          isFetchingNextPage: tW,
          isFetchNextPageError: tY,
          isWalkingToEnd: tG,
          createdMints: tJ,
        } = (0, Y.D)(h);
        ta[16] !== tq
          ? ((x = void 0 === tq ? [] : tq), (ta[16] = tq), (ta[17] = x))
          : (x = ta[17]);
        let tX = x,
          t1 = void 0 === tQ ? 0 : tQ,
          t0 = void 0 !== tG && tG,
          t2 = (0, L.f)(tX, t1),
          [t3, t4] = (0, m.useState)(!1),
          t5 = tc && !tC;
        ta[18] !== to || ta[19] !== t5
          ? ((v = { address: to, enabled: t5 }),
            (ta[18] = to),
            (ta[19] = t5),
            (ta[20] = v))
          : (v = ta[20]);
        let t6 = (0, H.$)(v),
          t8 = !t5 || t6.isError ? null : t6.data;
        e: {
          let e;
          if (!t5) {
            b = e$;
            break e;
          }
          if (ta[21] !== to || ta[22] !== tJ || ta[23] !== tX) {
            let t = { wallet: to, createdMints: tJ };
            for (let l of ((e = []), tX))
              !(0, em.F)(l) &&
                !(0, eo.$)(l) &&
                (0, eg.V)(l, t) &&
                e.push(l.coinMint);
            ((ta[21] = to), (ta[22] = tJ), (ta[23] = tX), (ta[24] = e));
          } else e = ta[24];
          b = 0 === e.length ? e$ : e;
        }
        let t7 = b,
          t9 = 0 === t7.length;
        ta[25] !== t7 || ta[26] !== t9
          ? ((g = {
              mints: t7,
              limit: t7.length,
              disabled: t9,
              placeholderData: e4,
            }),
            (ta[25] = t7),
            (ta[26] = t9),
            (ta[27] = g))
          : (g = ta[27]);
        let { coins: le } = (0, J.f)(g);
        if (ta[28] !== le) {
          for (let e of ((w = new Map()), le))
            e?.mint && w.set((0, ec.f)(e.mint), e.creator);
          ((ta[28] = le), (ta[29] = w));
        } else w = ta[29];
        (ta[30] !== w
          ? ((N = (e) => w.get((0, ec.f)(e))), (ta[30] = w), (ta[31] = N))
          : (N = ta[31]),
          ta[32] !== to || ta[33] !== tJ || ta[34] !== N
            ? ((j = { wallet: to, createdMints: tJ, creatorOf: N }),
              (ta[32] = to),
              (ta[33] = tJ),
              (ta[34] = N),
              (ta[35] = j))
            : (j = ta[35]));
        let lt = j;
        ta[36] !== tX
          ? ((U = tX.map(e3)), (ta[36] = tX), (ta[37] = U))
          : (U = ta[37]);
        let ll = U,
          li = !tC;
        ta[38] !== ll ||
        ta[39] !== t8 ||
        ta[40] !== t2 ||
        ta[41] !== t1 ||
        ta[42] !== li
          ? ((C = {
              rows: ll,
              dustFloorUsd: t8,
              pricedAtByMint: t2,
              fallbackPricedAtMs: t1,
              enabled: li,
            }),
            (ta[38] = ll),
            (ta[39] = t8),
            (ta[40] = t2),
            (ta[41] = t1),
            (ta[42] = li),
            (ta[43] = C))
          : (C = ta[43]);
        let ln = (0, E.f)(C),
          ls = (0, s.k)(n.D.WEB_PERPS, !1);
        t: {
          let e, t, l, i;
          if (
            (ta[44] !== ll ||
            ta[45] !== t8 ||
            ta[46] !== tC ||
            ta[47] !== ln ||
            ta[48] !== lt ||
            ta[49] !== ls
              ? ((l = []),
                (e = []),
                (t = []),
                ll.forEach((i, n) => {
                  let { position: s, balance: a } = i;
                  if (a.isPerp) {
                    ls && a.perp && !tC && l.push(a);
                    return;
                  }
                  (0, eT.Y)(a.mint) ||
                    (tC
                      ? l.push(a)
                      : (0, eg.V)(s, lt)
                        ? t.push(a)
                        : (ln[n] ?? (0, ed.m)(s, t8))
                          ? e.push(a)
                          : l.push(a));
                }),
                (ta[44] = ll),
                (ta[45] = t8),
                (ta[46] = tC),
                (ta[47] = ln),
                (ta[48] = lt),
                (ta[49] = ls),
                (ta[50] = e),
                (ta[51] = t),
                (ta[52] = l))
              : ((e = ta[50]), (t = ta[51]), (l = ta[52])),
            0 === l.length && e.length > 0 && null == t8 && !tZ)
          ) {
            let l, i;
            (ta[53] === Symbol.for("react.memo_cache_sentinel")
              ? ((l = []), (ta[53] = l))
              : (l = ta[53]),
              ta[54] !== e || ta[55] !== t
                ? ((i = {
                    openPositions: e,
                    dustPositions: l,
                    spamPositions: t,
                  }),
                  (ta[54] = e),
                  (ta[55] = t),
                  (ta[56] = i))
                : (i = ta[56]),
              (P = i));
            break t;
          }
          (ta[57] !== e || ta[58] !== t || ta[59] !== l
            ? ((i = { openPositions: l, dustPositions: e, spamPositions: t }),
              (ta[57] = e),
              (ta[58] = t),
              (ta[59] = l),
              (ta[60] = i))
            : (i = ta[60]),
            (P = i));
        }
        let { openPositions: la, dustPositions: lr, spamPositions: lo } = P;
        ta[61] !== lr || ta[62] !== lo
          ? ((S = [...lr, ...lo]), (ta[61] = lr), (ta[62] = lo), (ta[63] = S))
          : (S = ta[63]);
        let ld = S;
        ta[64] !== lr
          ? ((k = new Set(lr.map(e2))), (ta[64] = lr), (ta[65] = k))
          : (k = ta[65]);
        let lc = k,
          lu = t8 ?? ed.B;
        ta[66] !== ld || ta[67] !== t3 || ta[68] !== la
          ? ((I = t3 ? [...la, ...ld] : la),
            (ta[66] = ld),
            (ta[67] = t3),
            (ta[68] = la),
            (ta[69] = I))
          : (I = ta[69]);
        let lm = I,
          lp = (0, o._)(),
          lf = (0, K.o)(tc ? lp : null);
        ta[70] !== to || ta[71] !== lf || ta[72] !== tX
          ? ((M = eI({ positions: tX, ownerAddress: to, pending: lf })),
            (ta[70] = to),
            (ta[71] = lf),
            (ta[72] = tX),
            (ta[73] = M))
          : (M = ta[73]);
        let lh = M,
          lx = tc && !tC;
        if (ta[74] !== lh || ta[75] !== lx || ta[76] !== lm) {
          let e;
          (ta[78] !== lh || ta[79] !== lx
            ? ((e = (e) =>
                !e.isNative &&
                !e.isPerp &&
                !e.collectible &&
                (lx || !(0, ep.c)(e.servedCoin) || lh.has((0, ec.f)(e.mint)))),
              (ta[78] = lh),
              (ta[79] = lx),
              (ta[80] = e))
            : (e = ta[80]),
            (F = lm.filter(e).map(e0)),
            (ta[74] = lh),
            (ta[75] = lx),
            (ta[76] = lm),
            (ta[77] = F));
        } else F = ta[77];
        let lv = F,
          lb = 0 === lv.length;
        ta[81] !== lv || ta[82] !== lb
          ? ((T = {
              mints: lv,
              limit: lv.length,
              disabled: lb,
              placeholderData: e1,
            }),
            (ta[81] = lv),
            (ta[82] = lb),
            (ta[83] = T))
          : (T = ta[83]);
        let { coins: lg } = (0, J.f)(T);
        if (ta[84] !== lg) {
          for (let e of ((R = new Map()), lg))
            e?.mint && R.set((0, ec.f)(e.mint), e);
          ((ta[84] = lg), (ta[85] = R));
        } else R = ta[85];
        let lw = R;
        if (ta[86] !== lw || ta[87] !== lm) {
          let e;
          (ta[89] !== lw
            ? ((e = (e) =>
                !e.isNative &&
                !e.isPerp &&
                !e.collectible &&
                !(0, ep.c)(e.servedCoin) &&
                !(0, ep.c)(lw.get((0, ec.f)(e.mint)))),
              (ta[89] = lw),
              (ta[90] = e))
            : (e = ta[90]),
            (z = lm.filter(e).map(eX)),
            (ta[86] = lw),
            (ta[87] = lm),
            (ta[88] = z));
        } else z = ta[88];
        let lN = z;
        ta[91] !== lN
          ? ((D = { addresses: lN }), (ta[91] = lN), (ta[92] = D))
          : (D = ta[92]);
        let { data: ly } = (0, W.x)(D);
        ta[93] !== ly
          ? ((B = (e) => {
              let t = ly?.get(e.toLowerCase());
              if (t && (e.startsWith("0x") || "solana" === t.chain)) return t;
            }),
            (ta[93] = ly),
            (ta[94] = B))
          : (B = ta[94]);
        let lj = B;
        l: {
          let e;
          if (!tC) {
            let e;
            (ta[95] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (ta[95] = e))
              : (e = ta[95]),
              (q = e));
            break l;
          }
          if (ta[96] !== la) {
            for (let t of ((e = []), la)) (0, a.k)(t.mint) && e.push(t.mint);
            ((ta[96] = la), (ta[97] = e));
          } else e = ta[97];
          q = e;
        }
        let l_ = q;
        (ta[98] !== to || ta[99] !== tC || ta[100] !== l_
          ? ((Z = tC && l_.length > 0 && !(0, eO.h)(to)),
            (ta[98] = to),
            (ta[99] = tC),
            (ta[100] = l_),
            (ta[101] = Z))
          : (Z = ta[101]),
          ta[102] !== to || ta[103] !== l_ || ta[104] !== Z
            ? ((G = { wallet: to, mints: l_, enabled: Z }),
              (ta[102] = to),
              (ta[103] = l_),
              (ta[104] = Z),
              (ta[105] = G))
            : (G = ta[105]));
        let { byMint: lU } = (0, Q.f)(G);
        ta[106] !== tw
          ? ((es = tw.trim().toLowerCase()), (ta[106] = tw), (ta[107] = es))
          : (es = ta[107]);
        let lC = es;
        if (
          ta[108] !== lh ||
          ta[109] !== tN ||
          ta[110] !== lw ||
          ta[111] !== lj ||
          ta[112] !== lC ||
          ta[113] !== tC ||
          ta[114] !== lU ||
          ta[115] !== la ||
          ta[116] !== ty ||
          ta[117] !== tL
        ) {
          i: {
            let e,
              t,
              l,
              i = tN ? la.filter((e) => lh.has((0, ec.f)(e.mint))) : la,
              n =
                "all" === ty
                  ? i
                  : i.filter((e) => ev(ty, ex(e, lw.get((0, ec.f)(e.mint))))),
              s = lC
                ? n.filter((e) => {
                    if (e.mint.toLowerCase().includes(lC) || (0, eu.J)(e, lC))
                      return !0;
                    let t = lw.get((0, ec.f)(e.mint)),
                      l = (t?.name ?? e.servedCoin?.name ?? "").toLowerCase(),
                      i = (t?.symbol ?? e.servedCoin?.symbol ?? "")
                        .replace(/^\$/, "")
                        .toLowerCase();
                    return (
                      l.includes(lC) || i.includes(lC) || `$${i}`.includes(lC)
                    );
                  })
                : n;
            ta[119] !== lw || ta[120] !== lj
              ? ((e = (e) =>
                  !0 === e.isNative ||
                  !0 === e.isPerp ||
                  void 0 !== e.collectible ||
                  !!e.servedCoin ||
                  lw.has((0, ec.f)(e.mint)) ||
                  !!lj(e.mint)),
                (ta[119] = lw),
                (ta[120] = lj),
                (ta[121] = e))
              : (e = ta[121]);
            let a = e,
              r = ey(tL);
            if (null !== r && eU(tL)) {
              let e, t, l;
              (ta[122] !== lw
                ? ((e = (e) =>
                    (0, y.C)(lw.get((0, ec.f)(e.mint))?.usd_market_cap) ??
                    (0, y.C)(e.servedCoin?.marketCapUsd) ??
                    (0, y.C)(e.liveAnchorMarketCapUsd)),
                  (ta[122] = lw),
                  (ta[123] = e))
                : (e = ta[123]),
                ta[124] !== tC || ta[125] !== lU
                  ? ((t = (e) =>
                      (tC ? (0, er.g)(lU.get(e.mint))?.pnlUsd : null) ??
                      (0, y.H)(e.pnl?.total_pnl.usd)),
                    (ta[124] = tC),
                    (ta[125] = lU),
                    (ta[126] = t))
                  : (t = ta[126]));
              let i = { MCAP: e, VALUE: eJ, PNL: t };
              (ta[127] !== a
                ? ((l = (e) => !a(e)), (ta[127] = a), (ta[128] = l))
                : (l = ta[128]),
                (ef = [
                  ...eA(s.filter(a), i[r.column], r.direction),
                  ...s.filter(l),
                ]));
              break i;
            }
            if ("POSITION_SIZE" !== tL || tC) {
              let e,
                t =
                  "CALLOUT_RECENCY" === tL
                    ? eP(s, (e) => lh.get((0, ec.f)(e.mint))?.createdAt)
                    : s,
                l = t.filter(a);
              (ta[129] !== a
                ? ((e = (e) => !a(e)), (ta[129] = a), (ta[130] = e))
                : (e = ta[130]),
                (ef = [...l, ...t.filter(e)]));
              break i;
            }
            ta[131] !== a
              ? ((t = (e) => {
                  if (!a(e)) return 0;
                  let t = Number(e.balanceUSD);
                  return Number.isFinite(t) ? t : 0;
                }),
                (ta[131] = a),
                (ta[132] = t))
              : (t = ta[132]);
            let o = t;
            (ta[133] !== o
              ? ((l = (e, t) => o(t) - o(e)), (ta[133] = o), (ta[134] = l))
              : (l = ta[134]),
              (ef = [...s].sort(l)));
          }
          ((ta[108] = lh),
            (ta[109] = tN),
            (ta[110] = lw),
            (ta[111] = lj),
            (ta[112] = lC),
            (ta[113] = tC),
            (ta[114] = lU),
            (ta[115] = la),
            (ta[116] = ty),
            (ta[117] = tL),
            (ta[118] = ef));
        } else ef = ta[118];
        let lA = ef;
        n: {
          let e, t, l;
          ta[135] !== lh || ta[136] !== tN || ta[137] !== ld
            ? ((e = tN ? ld.filter((e) => lh.has((0, ec.f)(e.mint))) : ld),
              (ta[135] = lh),
              (ta[136] = tN),
              (ta[137] = ld),
              (ta[138] = e))
            : (e = ta[138]);
          let i = e;
          ta[139] !== i || ta[140] !== lw || ta[141] !== ty
            ? ((t =
                "all" === ty
                  ? i
                  : i.filter((e) => ev(ty, ex(e, lw.get((0, ec.f)(e.mint)))))),
              (ta[139] = i),
              (ta[140] = lw),
              (ta[141] = ty),
              (ta[142] = t))
            : (t = ta[142]);
          let n = t;
          if (!lC) {
            eh = n;
            break n;
          }
          (ta[143] !== lw || ta[144] !== lC || ta[145] !== n
            ? ((l = n.filter((e) => {
                if (e.mint.toLowerCase().includes(lC) || (0, eu.J)(e, lC))
                  return !0;
                let t = lw.get((0, ec.f)(e.mint)),
                  l = (t?.name ?? e.servedCoin?.name ?? "").toLowerCase(),
                  i = (t?.symbol ?? e.servedCoin?.symbol ?? "")
                    .replace(/^\$/, "")
                    .toLowerCase();
                return l.includes(lC) || i.includes(lC) || `$${i}`.includes(lC);
              })),
              (ta[143] = lw),
              (ta[144] = lC),
              (ta[145] = n),
              (ta[146] = l))
            : (l = ta[146]),
            (eh = l));
        }
        let lP = eh,
          lS = !tC,
          lk = (0, m.useId)(),
          lI = `${lk}pos-`;
        ta[147] !== t3 || ta[148] !== lP || ta[149] !== lA
          ? ((eb = t3 ? [...lA, ...lP] : lA),
            (ta[147] = t3),
            (ta[148] = lP),
            (ta[149] = lA),
            (ta[150] = eb))
          : (eb = ta[150]);
        let lE = eb;
        if (ta[151] !== lI || ta[152] !== lE) {
          let e;
          (ta[154] !== lI
            ? ((e = (e) => lI + e.mint), (ta[154] = lI), (ta[155] = e))
            : (e = ta[155]),
            (ew = lE.map(e)),
            (ta[151] = lI),
            (ta[152] = lE),
            (ta[153] = ew));
        } else ew = ta[153];
        let lM = ew,
          lL = lM.length > 0;
        ta[156] !== lM || ta[157] !== lL
          ? ((eN = { mints: lM, enabled: lL }),
            (ta[156] = lM),
            (ta[157] = lL),
            (ta[158] = eN))
          : (eN = ta[158]);
        let { observe: lO, visibleMints: lF } = (0, el.f)(eN);
        if (ta[159] !== lI || ta[160] !== lF) {
          let e;
          (ta[162] !== lI
            ? ((e = (e) => e.slice(lI.length)), (ta[162] = lI), (ta[163] = e))
            : (e = ta[163]),
            (ej = new Set(lF.map(e))),
            (ta[159] = lI),
            (ta[160] = lF),
            (ta[161] = ej));
        } else ej = ta[161];
        let lT = ej;
        ta[164] !== lT
          ? ((e_ = [...lT].filter(a.k)), (ta[164] = lT), (ta[165] = e_))
          : (e_ = ta[165]);
        let lR = e_;
        if (((0, ee.f)(lR, lR.length > 0), ta[166] !== lE || ta[167] !== lT)) {
          for (let e of ((eS = []), lE))
            !lT.has(e.mint) ||
              e.isNative ||
              e.isPerp ||
              e.collectible ||
              ((0, ea.B)(e.chain) &&
                eS.push({ mint: e.mint, chain_id: e.chain }));
          ((ta[166] = lE), (ta[167] = lT), (ta[168] = eS));
        } else eS = ta[168];
        let lz = eS;
        if (
          ((0, X.f)(lz, lz.length > 0),
          ta[169] !== lw || ta[170] !== lS || ta[171] !== lE || ta[172] !== lT)
        ) {
          for (let e of ((ek = []), lE)) {
            if (
              !lT.has(e.mint) ||
              e.isNative ||
              e.isPerp ||
              e.collectible ||
              (lS && void 0 !== e.liveAnchorMarketCapUsd)
            )
              continue;
            let t =
              lw.get((0, ec.f)(e.mint))?.chain_id ??
              e.chain ??
              String(e.chainId);
            (0, eO.N)({ mint: e.mint, chainId: t }) &&
              ek.push({ mint: e.mint, chainId: t });
          }
          ((ta[169] = lw),
            (ta[170] = lS),
            (ta[171] = lE),
            (ta[172] = lT),
            (ta[173] = ek));
        } else ek = ta[173];
        let l$ = ek;
        (0, et.f)(l$, l$.length > 0);
        let { ref: lD, inView: lB } = (0, f.f)();
        (ta[174] !== tH ||
        ta[175] !== tZ ||
        ta[176] !== lB ||
        ta[177] !== tW ||
        ta[178] !== tY ||
        ta[179] !== t0
          ? ((eE = () => {
              !lB || !tZ || tW || t0 || tY || tH({ cancelRefetch: !1 });
            }),
            (eM = [lB, tZ, tW, t0, tY, tH]),
            (ta[174] = tH),
            (ta[175] = tZ),
            (ta[176] = lB),
            (ta[177] = tW),
            (ta[178] = tY),
            (ta[179] = t0),
            (ta[180] = eE),
            (ta[181] = eM))
          : ((eE = ta[180]), (eM = ta[181])),
          (0, m.useEffect)(eE, eM),
          ta[182] !== tb ||
          ta[183] !== tZ ||
          ta[184] !== tW ||
          ta[185] !== t_ ||
          ta[186] !== lD
            ? ((eF =
                tZ || tW
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)("div", {
                          ref: lD,
                          className: "h-2 w-full",
                          "aria-hidden": !0,
                        }),
                        tW
                          ? (0, t.jsx)(eZ, { rowAppearance: t_, density: tb })
                          : null,
                      ],
                    })
                  : null),
              (ta[182] = tb),
              (ta[183] = tZ),
              (ta[184] = tW),
              (ta[185] = t_),
              (ta[186] = lD),
              (ta[187] = eF))
            : (eF = ta[187]));
        let lq = eF;
        ta[188] !== tu || ta[189] !== tM || ta[190] !== tO || ta[191] !== tL
          ? ((eR = tM
              ? null
              : (0, t.jsx)("div", {
                  className: "flex px-4 pb-2",
                  children: (0, t.jsx)(eB, {
                    filter: tu,
                    value: tL,
                    onChange: tO,
                  }),
                })),
            (ta[188] = tu),
            (ta[189] = tM),
            (ta[190] = tO),
            (ta[191] = tL),
            (ta[192] = eR))
          : (eR = ta[192]);
        let lK = eR;
        ta[193] !== ld || ta[194] !== t3 || ta[195] !== lA
          ? ((ez = (t3 ? [...lA, ...ld] : lA).filter(eG).map(eY)),
            (ta[193] = ld),
            (ta[194] = t3),
            (ta[195] = lA),
            (ta[196] = ez))
          : (ez = ta[196]);
        let lV = lA.length > 0 || ld.length > 0;
        ta[197] !== to || ta[198] !== ez || ta[199] !== lV
          ? ((eD = { userId: to, mints: ez, enabled: lV }),
            (ta[197] = to),
            (ta[198] = ez),
            (ta[199] = lV),
            (ta[200] = eD))
          : (eD = ta[200]);
        let { positionFor: lQ } = (0, V._)(eD);
        if (!to) return null;
        if (
          tV ||
          (t0 && 0 === lA.length && 0 === lP.length) ||
          (0 === la.length && 0 === ld.length && (tK || tW || tZ))
        ) {
          let e, l, i, n, s, a;
          ta[201] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, eL.c)(O.UE, "flex w-full flex-col")), (ta[201] = e))
            : (e = ta[201]);
          let r = tA && A.D;
          return (
            ta[202] !== r
              ? ((l = (0, eL.c)("flex w-full flex-col", r)),
                (ta[202] = r),
                (ta[203] = l))
              : (l = ta[203]),
            ta[204] === Symbol.for("react.memo_cache_sentinel")
              ? ((i = Array.from({ length: 5 })), (ta[204] = i))
              : (i = ta[204]),
            ta[205] !== tb || ta[206] !== t_ || ta[207] !== i
              ? ((n = i.map((e, l) =>
                  (0, t.jsx)(eZ, { rowAppearance: t_, density: tb }, l),
                )),
                (ta[205] = tb),
                (ta[206] = t_),
                (ta[207] = i),
                (ta[208] = n))
              : (n = ta[208]),
            ta[209] !== l || ta[210] !== n
              ? ((s = (0, t.jsx)("div", { className: l, children: n })),
                (ta[209] = l),
                (ta[210] = n),
                (ta[211] = s))
              : (s = ta[211]),
            ta[212] !== tT || ta[213] !== lq || ta[214] !== s
              ? ((a = (0, t.jsxs)("div", {
                  className: e,
                  "data-testid": "profile-positions-callouts",
                  children: [tT, s, lq],
                })),
                (ta[212] = tT),
                (ta[213] = lq),
                (ta[214] = s),
                (ta[215] = a))
              : (a = ta[215]),
            a
          );
        }
        if (0 === la.length && 0 === ld.length) {
          let e, l;
          return (
            ta[216] !== tC || ta[217] !== tr
              ? ((e = tr(
                  tC
                    ? "profile.positions_card.closed_empty"
                    : "profile.positions_card.open_empty",
                )),
                (ta[216] = tC),
                (ta[217] = tr),
                (ta[218] = e))
              : (e = ta[218]),
            ta[219] !== tP || ta[220] !== tS || ta[221] !== e
              ? ((l = (0, t.jsx)($.L, {
                  density: tP,
                  className: tS,
                  children: e,
                })),
                (ta[219] = tP),
                (ta[220] = tS),
                (ta[221] = e),
                (ta[222] = l))
              : (l = ta[222]),
            l
          );
        }
        if (0 === lA.length && 0 === lP.length) {
          let e, l, i;
          return (
            ta[223] !== tN || ta[224] !== lC || ta[225] !== tr
              ? ((e = tr(
                  tN && !lC
                    ? "web.profile.positions_no_callout_match"
                    : "web.profile.positions_no_search_match",
                )),
                (ta[223] = tN),
                (ta[224] = lC),
                (ta[225] = tr),
                (ta[226] = e))
              : (e = ta[226]),
            ta[227] !== tP || ta[228] !== tS || ta[229] !== e
              ? ((l = (0, t.jsx)($.L, {
                  density: tP,
                  className: tS,
                  children: e,
                })),
                (ta[227] = tP),
                (ta[228] = tS),
                (ta[229] = e),
                (ta[230] = l))
              : (l = ta[230]),
            ta[231] !== lq || ta[232] !== lK || ta[233] !== l
              ? ((i = (0, t.jsxs)("div", {
                  className: "flex w-full flex-col",
                  "data-testid": "profile-positions-callouts",
                  children: [lK, l, lq],
                })),
                (ta[231] = lq),
                (ta[232] = lK),
                (ta[233] = l),
                (ta[234] = i))
              : (i = ta[234]),
            i
          );
        }
        ta[235] !== to ||
        ta[236] !== tc ||
        ta[237] !== tr ||
        ta[238] !== td?.username
          ? ((eq =
              td?.username?.trim() ||
              (tc ? tr("common.you") : (0, r.d)(to, 4, 4))),
            (ta[235] = to),
            (ta[236] = tc),
            (ta[237] = tr),
            (ta[238] = td?.username),
            (ta[239] = eq))
          : (eq = ta[239]);
        let lH = eq;
        ta[240] !== to || ta[241] !== td?.username
          ? ((eK = td?.username?.trim() || (0, r.d)(to, 4, 4)),
            (ta[240] = to),
            (ta[241] = td?.username),
            (ta[242] = eK))
          : (eK = ta[242]);
        let lZ = eK;
        ta[243] !== td?.profile_image
          ? ((eQ =
              (0, ei.Z)({
                sourceUrl: (0, _.f)(td?.profile_image),
                width: ei.z.list,
              }) ?? void 0),
            (ta[243] = td?.profile_image),
            (ta[244] = eQ))
          : (eQ = ta[244]);
        let lW = eQ,
          lY = td?.userId,
          lG = td?.resolved_avatar_decoration;
        ta[245] !== to ||
        ta[246] !== lH ||
        ta[247] !== lW ||
        ta[248] !== tb ||
        ta[249] !== tU ||
        ta[250] !== tC ||
        ta[251] !== tc ||
        ta[252] !== lZ ||
        ta[253] !== tk ||
        ta[254] !== t_ ||
        ta[255] !== lY ||
        ta[256] !== lG ||
        ta[257] !== tj ||
        ta[258] !== th
          ? ((eH = {
              isClosed: tC,
              isOwner: tc,
              ownerAddress: to,
              ownerUserId: lY,
              ownerName: lH,
              ownerShareName: lZ,
              ownerAvatarUrl: lW,
              ownerAvatarDecoration: lG,
              ownerVerified: tk,
              ownerXUsername: th,
              viewMode: tj,
              rowAppearance: t_,
              density: tb,
              hideShare: tU,
            }),
            (ta[245] = to),
            (ta[246] = lH),
            (ta[247] = lW),
            (ta[248] = tb),
            (ta[249] = tU),
            (ta[250] = tC),
            (ta[251] = tc),
            (ta[252] = lZ),
            (ta[253] = tk),
            (ta[254] = t_),
            (ta[255] = lY),
            (ta[256] = lG),
            (ta[257] = tj),
            (ta[258] = th),
            (ta[259] = eH))
          : (eH = ta[259]);
        let lJ = eH;
        ta[260] !== lh ||
        ta[261] !== lw ||
        ta[262] !== lj ||
        ta[263] !== tC ||
        ta[264] !== lU ||
        ta[265] !== lQ ||
        ta[266] !== t2 ||
        ta[267] !== t1
          ? ((e6 = (e) => {
              let t = tC ? (0, er.g)(lU.get(e.mint)) : null,
                l = lQ(e.mint),
                i = l ? (0, er.I)(l, t) : null,
                n = null != t && (!l || i !== l);
              return {
                coin: lw.get((0, ec.f)(e.mint)),
                fallbackIdentity: lj(e.mint),
                callout: lh.get((0, ec.f)(e.mint)) ?? null,
                positionSummary: (0, en.y)(i),
                ledgerNetPnlUsd: n ? t.pnlUsd : null,
                pricedAtMs: t2.get((0, ec.f)(e.mint))?.pricedAtMs ?? t1,
              };
            }),
            (ta[260] = lh),
            (ta[261] = lw),
            (ta[262] = lj),
            (ta[263] = tC),
            (ta[264] = lU),
            (ta[265] = lQ),
            (ta[266] = t2),
            (ta[267] = t1),
            (ta[268] = e6))
          : (e6 = ta[268]);
        let lX = e6;
        ta[269] === Symbol.for("react.memo_cache_sentinel")
          ? ((e8 = (0, eL.c)(O.UE, "flex w-full flex-col")), (ta[269] = e8))
          : (e8 = ta[269]);
        let l1 = tA && A.D;
        if (
          (ta[270] !== l1
            ? ((e9 = (0, eL.c)("flex w-full flex-col", l1)),
              (ta[270] = l1),
              (ta[271] = e9))
            : (e9 = ta[271]),
          ta[272] !== lS ||
            ta[273] !== lI ||
            ta[274] !== lO ||
            ta[275] !== lX ||
            ta[276] !== lJ ||
            ta[277] !== lT ||
            ta[278] !== lA)
        ) {
          let e;
          (ta[280] !== lS ||
          ta[281] !== lI ||
          ta[282] !== lO ||
          ta[283] !== lX ||
          ta[284] !== lJ ||
          ta[285] !== lT ||
          ta[286] !== lA.length
            ? ((e = (e, l) =>
                (0, t.jsx)(
                  e7,
                  {
                    balance: e,
                    ...lJ,
                    ...lX(e),
                    isLiveRow: lS,
                    isRowVisible: lT.has(e.mint),
                    observeLiveRow: lO,
                    liveRowIdPrefix: lI,
                    isLastRow: l === lA.length - 1,
                  },
                  e.mint,
                )),
              (ta[280] = lS),
              (ta[281] = lI),
              (ta[282] = lO),
              (ta[283] = lX),
              (ta[284] = lJ),
              (ta[285] = lT),
              (ta[286] = lA.length),
              (ta[287] = e))
            : (e = ta[287]),
            (te = lA.map(e)),
            (ta[272] = lS),
            (ta[273] = lI),
            (ta[274] = lO),
            (ta[275] = lX),
            (ta[276] = lJ),
            (ta[277] = lT),
            (ta[278] = lA),
            (ta[279] = te));
        } else te = ta[279];
        return (
          ta[288] !== e9 || ta[289] !== te
            ? ((tt = (0, t.jsx)("div", { className: e9, children: te })),
              (ta[288] = e9),
              (ta[289] = te),
              (ta[290] = tt))
            : (tt = ta[290]),
          ta[291] === Symbol.for("react.memo_cache_sentinel")
            ? ((tl = () => t4(eW)), (ta[291] = tl))
            : (tl = ta[291]),
          ta[292] !== lT
            ? ((ti = (e) => lT.has(e)), (ta[292] = lT), (ta[293] = ti))
            : (ti = ta[293]),
          ta[294] !== tP ||
          ta[295] !== tS ||
          ta[296] !== lu ||
          ta[297] !== lc ||
          ta[298] !== t3 ||
          ta[299] !== lS ||
          ta[300] !== lI ||
          ta[301] !== lO ||
          ta[302] !== lX ||
          ta[303] !== lJ ||
          ta[304] !== ti ||
          ta[305] !== lP
            ? ((tn = (0, t.jsx)(e5, {
                positions: lP,
                dustMintSet: lc,
                dustCutoffUsd: lu,
                isOpen: t3,
                onToggle: tl,
                sharedRowProps: lJ,
                resolveRowData: lX,
                isLiveRow: lS,
                isRowVisible: ti,
                observeLiveRow: lO,
                liveRowIdPrefix: lI,
                density: tP,
                insetClassName: tS,
              })),
              (ta[294] = tP),
              (ta[295] = tS),
              (ta[296] = lu),
              (ta[297] = lc),
              (ta[298] = t3),
              (ta[299] = lS),
              (ta[300] = lI),
              (ta[301] = lO),
              (ta[302] = lX),
              (ta[303] = lJ),
              (ta[304] = ti),
              (ta[305] = lP),
              (ta[306] = tn))
            : (tn = ta[306]),
          ta[307] !== tT ||
          ta[308] !== lq ||
          ta[309] !== lK ||
          ta[310] !== tt ||
          ta[311] !== tn
            ? ((ts = (0, t.jsxs)("div", {
                className: e8,
                "data-testid": "profile-positions-callouts",
                children: [lK, tT, tt, tn, lq],
              })),
              (ta[307] = tT),
              (ta[308] = lq),
              (ta[309] = lK),
              (ta[310] = tt),
              (ta[311] = tn),
              (ta[312] = ts))
            : (ts = ta[312]),
          ts
        );
      },
      "ProfilePositionsSortSelect",
      0,
      eB,
      "scalePercentWithLivePnl",
      0,
      eH,
    ],
    150430,
  );
};
