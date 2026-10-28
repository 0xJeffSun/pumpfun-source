// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(938277),
    l = e.i(646908),
    n = e.i(605587),
    i = e.i(639374);
  let a = (e) => ("string" == typeof e.chain_id ? e.chain_id : null),
    r = (e) =>
      (0, i.f)(e.mint) ||
      (0, n.N)({ mint: e.mint, chainId: a(e) }) ||
      (0, l.L)(a(e)) ||
      (0, l.B)(a(e)) ||
      (0, l._)(a(e)),
    s = (e, t) => !(0, l.L)(a(e)) && (!(0, l._)(a(e)) || t);
  e.s(
    [
      "y",
      0,
      { scope: "pump_fun", tags: [], search: "", pnl: "all" },
      "N",
      0,
      50,
      "t",
      0,
      ["dev", "sniper", "bundler", "fresh", "following", "verified", "tracked"],
      "P",
      0,
      a,
      "V",
      0,
      s,
      "M",
      0,
      (e) => (0, t.O)(e),
      "Q",
      0,
      (e, t, l) =>
        ("all" !== t || r(e)) &&
        ("following" !== t || (l.isSignedIn && s(e, !0 === l.followedReadable)))
          ? t
          : "pump_fun",
      "o",
      0,
      r,
    ],
    445056,
  );
  var o = e.i(732486),
    d = e.i(445242),
    u = e.i(745018),
    c = e.i(146695),
    m = e.i(365089),
    f = e.i(928529),
    p = e.i(352386);
  e.i(12692);
  var h = e.i(398902),
    g = e.i(426091),
    x = e.i(199995);
  function b(e) {
    let t,
      l,
      n,
      i = (0, d.c)(10),
      { value: a, children: r, className: s } = e;
    i[0] !== a
      ? ((t = { value: a, tone: null, nonce: 0 }), (i[0] = a), (i[1] = t))
      : (t = i[1]);
    let [u, c] = (0, p.useState)(t);
    if (u.value !== a) {
      let e =
        null != a && null != u.value ? (a > u.value ? "gain" : "loss") : null;
      c({ value: a, tone: e, nonce: e ? u.nonce + 1 : u.nonce });
    }
    let m = u.nonce,
      f = u.tone ?? void 0,
      h = u.tone && x.x[u.tone];
    return (
      i[2] !== s || i[3] !== h
        ? ((l = (0, g.c)("inline-block", s, h)),
          (i[2] = s),
          (i[3] = h),
          (i[4] = l))
        : (l = i[4]),
      i[5] !== r || i[6] !== u.nonce || i[7] !== f || i[8] !== l
        ? ((n = (0, o.jsx)(
            "span",
            { "data-flash": f, className: l, children: r },
            m,
          )),
          (i[5] = r),
          (i[6] = u.nonce),
          (i[7] = f),
          (i[8] = l),
          (i[9] = n))
        : (n = i[9]),
      n
    );
  }
  var y = e.i(464649),
    w = e.i(875737);
  e.i(84455);
  var v = e.i(392968),
    _ = e.i(540805);
  e.i(107240);
  var I = e.i(693124),
    N = e.i(529841),
    j = e.i(51206),
    k = e.i(813792),
    M = e.i(927878);
  e.i(267146);
  let C = [
    ["binance", /\bbinance\b/],
    ["coinbase", /\bcoinbase\b/],
    ["kraken", /\bkraken\b/],
    ["bitget", /\bbitget\b/],
    ["kucoin", /\bkucoin\b/],
    ["okx", /\bokx\b/],
    ["bybit", /\bbybit\b/],
    ["crypto-com", /\bcrypto\.com\b/],
    ["gate-io", /\bgate(?:\.io)?\b/],
    ["gemini", /\bgemini\b/],
    ["swissborg", /\bswissborg\b/],
    ["coinex", /\bcoinex\b/],
    ["bitstamp", /\bbitstamp\b/],
    ["upbit", /\bupbit\b/],
    ["bithumb", /\bbithumb\b/],
    ["revolut", /\brevolut\b/],
    ["robinhood", /\brobinhood\b/],
    ["relay", /\brelay\b/],
  ];
  var U = e.i(890088),
    S = e.i(592209),
    P = e.i(595673),
    A = e.i(338319),
    F = e.i(786740),
    T = e.i(84674),
    z = e.i(90832),
    W = e.i(545063),
    D = e.i(574472),
    E = e.i(950766),
    B = e.i(303599);
  function L(e) {
    let t,
      l,
      n,
      i,
      a = (0, d.c)(18),
      { wallet: r, displayName: s, isFollowing: u, dense: c } = e,
      { address: m } = (0, D.F)(),
      f = (0, W.$)(),
      p = (0, B.o)();
    if (f(r)) return null;
    let h = !!m,
      g = h && p.isError;
    a[0] !== g || a[1] !== u || a[2] !== h || a[3] !== p || a[4] !== r
      ? ((t = !!h && (g ? u : p.isFollowing(r))),
        (a[0] = g),
        (a[1] = u),
        (a[2] = h),
        (a[3] = p),
        (a[4] = r),
        (a[5] = t))
      : (t = a[5]);
    let b = t;
    a[6] !== s
      ? ((l = s?.trim() || void 0), (a[6] = s), (a[7] = l))
      : (l = a[7]);
    let y = c ? 24 : 20,
      w = !g,
      v = c && x.N;
    return (
      a[8] !== v
        ? ((n = (0, A.c)("ml-1", v)), (a[8] = v), (a[9] = n))
        : (n = a[9]),
      a[10] !== h ||
      a[11] !== b ||
      a[12] !== l ||
      a[13] !== y ||
      a[14] !== w ||
      a[15] !== n ||
      a[16] !== r
        ? ((i = (0, o.jsx)(E.f, {
            userAddress: r,
            displayName: l,
            isLoggedIn: h,
            density: "terminal",
            size: y,
            initialIsFollowing: b,
            skipInitialFetch: w,
            connectSource: "coin_holders_row",
            className: n,
            "data-testid": "holder-row-follow",
          })),
          (a[10] = h),
          (a[11] = b),
          (a[12] = l),
          (a[13] = y),
          (a[14] = w),
          (a[15] = n),
          (a[16] = r),
          (a[17] = i))
        : (i = a[17]),
      i
    );
  }
  let O = new Set(["held", "supply", "position", "fundedBy", "heldFor"]);
  function H(e) {
    let t,
      l,
      n,
      i,
      a,
      r,
      s,
      u,
      c = (0, d.c)(17),
      { row: m, ctx: f } = e;
    c[0] !== f.coin
      ? ((t = { coin: f.coin }), (c[0] = f.coin), (c[1] = t))
      : (t = c[1]);
    let p = (0, M.f)(t);
    if (c[2] !== p || c[3] !== m)
      ((l =
        null != m.amountHeld && "pnl" !== m.amountSource && p > 0
          ? m.amountHeld * p
          : m.positionUsd),
        (c[2] = p),
        (c[3] = m),
        (c[4] = l));
    else l = c[4];
    let h = l;
    c[5] !== h
      ? ((n = null != h && Number.isFinite(h) ? (0, _.l)(h) : "—"),
        (c[5] = h),
        (c[6] = n))
      : (n = c[6]);
    let g = n;
    return f.dense
      ? (c[7] !== g
          ? ((i = (0, o.jsx)("span", { children: g })), (c[7] = g), (c[8] = i))
          : (i = c[8]),
        c[9] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, A.c)(V, q)), (c[9] = a))
          : (a = c[9]),
        c[10] !== m.percentOfSupply
          ? ((r = R(m.percentOfSupply)),
            (c[10] = m.percentOfSupply),
            (c[11] = r))
          : (r = c[11]),
        c[12] !== r
          ? ((s = (0, o.jsx)("span", { className: a, children: r })),
            (c[12] = r),
            (c[13] = s))
          : (s = c[13]),
        c[14] !== i || c[15] !== s
          ? ((u = (0, o.jsxs)("span", {
              className: "flex flex-col items-end leading-4",
              children: [i, s],
            })),
            (c[14] = i),
            (c[15] = s),
            (c[16] = u))
          : (u = c[16]),
        u)
      : g;
  }
  let $ = "font-medium text-text-primary",
    R = (e) => (null != e ? `${e.toFixed(2)}%` : "—"),
    V = "@[640px]:hidden",
    q = "text-[11px] font-normal text-text-tertiary",
    K = (e) => (t, l) => (e(t) ?? -1 / 0) - (e(l) ?? -1 / 0),
    Q = "relative z-10",
    G = {
      dense: (0, j.x)({
        density: "terminal",
        size: 24,
        className: (0, A.c)("ml-1", x.N),
      }),
      card: (0, j.x)({ density: "terminal", size: 20, className: "ml-1" }),
    },
    J = (e, t, l = !1) =>
      e || (l && 0 === e)
        ? (0, o.jsx)("span", {
            className: (0, A.c)("font-medium tabular-nums", (0, _.k)(t)),
            children: (0, _.l)(e),
          })
        : (0, o.jsx)("span", {
            className: "text-text-tertiary",
            children: "—",
          }),
    X = (0, p.memo)(
      function (e) {
        let t,
          l,
          n,
          i,
          a,
          r,
          s,
          m,
          f = (0, d.c)(38),
          { row: p, ctx: h } = e,
          g = h.dense ? "flex" : "inline-flex";
        f[0] !== g
          ? ((t = (0, A.c)("relative z-10 min-w-0 items-center", g)),
            (f[0] = g),
            (f[1] = t))
          : (t = f[1]);
        let x = p.wallet,
          b = h.chainId,
          y = p.userId,
          v = p.profileWallet ?? p.wallet;
        f[2] !== p.userId || f[3] !== v
          ? ((l = (0, c.$)({ address: v, userId: p.userId })),
            (f[2] = p.userId),
            (f[3] = v),
            (f[4] = l))
          : (l = f[4]);
        let _ = p.profileWallet ?? p.wallet,
          N = !!p.flags.isVerified || "lookup";
        return (
          f[5] !== p.xUsername
            ? ((n = p.xUsername
                ? (0, o.jsx)(w.f, { xUsername: p.xUsername, iconOnly: !0 })
                : void 0),
              (f[5] = p.xUsername),
              (f[6] = n))
            : (n = f[6]),
          f[7] !== h.mint || f[8] !== p.wallet
            ? ((i = () =>
                p.wallet
                  ? (0, P.em)({ mint: h.mint, profileUserId: p.wallet })
                  : void 0),
              (f[7] = h.mint),
              (f[8] = p.wallet),
              (f[9] = i))
            : (i = f[9]),
          f[10] !== h.chainId ||
          f[11] !== h.onTagClick ||
          f[12] !== p.avatarDecoration ||
          f[13] !== p.outsideWallet ||
          f[14] !== p.profileImage ||
          f[15] !== p.tags ||
          f[16] !== p.userId ||
          f[17] !== p.username ||
          f[18] !== p.wallet ||
          f[19] !== n ||
          f[20] !== i ||
          f[21] !== l ||
          f[22] !== _ ||
          f[23] !== N
            ? ((a = (0, o.jsx)(I.S, {
                address: x,
                chain: b,
                userId: y,
                href: l,
                shallowProfileId: _,
                username: p.username,
                profileImage: p.profileImage,
                avatarDecoration: p.avatarDecoration,
                size: 24,
                outsideWallet: p.outsideWallet,
                verified: N,
                tags: p.tags,
                maxTags: 3,
                onTagClick: h.onTagClick,
                trailing: n,
                hoverCard: !0,
                onClick: i,
              })),
              (f[10] = h.chainId),
              (f[11] = h.onTagClick),
              (f[12] = p.avatarDecoration),
              (f[13] = p.outsideWallet),
              (f[14] = p.profileImage),
              (f[15] = p.tags),
              (f[16] = p.userId),
              (f[17] = p.username),
              (f[18] = p.wallet),
              (f[19] = n),
              (f[20] = i),
              (f[21] = l),
              (f[22] = _),
              (f[23] = N),
              (f[24] = a))
            : (a = f[24]),
          f[25] !== h.dense ||
          f[26] !== p.flags.isFollowing ||
          f[27] !== p.username ||
          f[28] !== p.wallet
            ? ((r = p.wallet
                ? (0, o.jsx)(L, {
                    wallet: p.wallet,
                    displayName: p.username,
                    isFollowing: p.flags.isFollowing,
                    dense: !!h.dense,
                  })
                : null),
              (f[25] = h.dense),
              (f[26] = p.flags.isFollowing),
              (f[27] = p.username),
              (f[28] = p.wallet),
              (f[29] = r))
            : (r = f[29]),
          f[30] !== h || f[31] !== p.wallet
            ? ((s =
                h.onPlotWallet && p.wallet
                  ? (0, o.jsx)("button", {
                      type: "button",
                      "aria-label": h.t("web.coin.plot_wallet_trades"),
                      onClick: (e) => {
                        (e.stopPropagation(), h.onPlotWallet?.(p.wallet));
                      },
                      className: h.dense ? G.dense : G.card,
                      children: (0, o.jsx)(u.Ga, { "aria-hidden": !0 }),
                    })
                  : null),
              (f[30] = h),
              (f[31] = p.wallet),
              (f[32] = s))
            : (s = f[32]),
          f[33] !== a || f[34] !== r || f[35] !== s || f[36] !== t
            ? ((m = (0, o.jsxs)("span", { className: t, children: [a, r, s] })),
              (f[33] = a),
              (f[34] = r),
              (f[35] = s),
              (f[36] = t),
              (f[37] = m))
            : (m = f[37]),
          m
        );
      },
      (e, t) => {
        let l = e.row,
          n = t.row,
          i = e.ctx,
          a = t.ctx;
        return (
          l.wallet === n.wallet &&
          l.profileWallet === n.profileWallet &&
          l.userId === n.userId &&
          l.username === n.username &&
          l.profileImage === n.profileImage &&
          l.xUsername === n.xUsername &&
          l.outsideWallet === n.outsideWallet &&
          l.flags.isVerified === n.flags.isVerified &&
          l.flags.isFollowing === n.flags.isFollowing &&
          l.tags.length === n.tags.length &&
          l.tags.every((e, t) => e === n.tags[t]) &&
          i.t === a.t &&
          i.mint === a.mint &&
          i.chainId === a.chainId &&
          i.dense === a.dense &&
          i.onTagClick === a.onTagClick &&
          i.onPlotWallet === a.onPlotWallet
        );
      },
    ),
    Y = { exchange: u.pd, bridge: u.oS, risk: u.aa, wallet: u.DD };
  function Z(e) {
    let t,
      l,
      n,
      i,
      a,
      r,
      s,
      u,
      c,
      p,
      g,
      x,
      b,
      w,
      v,
      I,
      j,
      M,
      P,
      F,
      W,
      D,
      E,
      B = (0, d.c)(65),
      { funding: L, ctx: O } = e,
      { i18n: H } = (0, h.f)();
    if (B[0] !== L.funderType) {
      var $;
      let e;
      (($ = L.funderType),
        (e = $?.toLowerCase() ?? ""),
        (t = /exploit|hack|scam|phish|drain/.test(e)
          ? "risk"
          : e.includes("exchange")
            ? "exchange"
            : e.includes("bridge")
              ? "bridge"
              : "wallet"),
        (B[0] = L.funderType),
        (B[1] = t));
    } else t = B[1];
    let R = t;
    if (B[2] !== L)
      ((l = L.funderName?.trim() || (0, m.d)(L.funder ?? void 0)),
        (B[2] = L),
        (B[3] = l));
    else l = B[3];
    let V = l;
    if (
      B[4] !== L.amountSol ||
      B[5] !== L.funderName ||
      B[6] !== L.timestampMs ||
      B[7] !== H ||
      B[8] !== R
    ) {
      let e,
        t =
          "risk" === R
            ? null
            : ((e) => {
                if (!e) return null;
                let t = e.toLowerCase();
                for (let [e, l] of C) if (l.test(t)) return e;
                return null;
              })(L.funderName),
        l = Y[R];
      if (
        ((s = L.timestampMs ?? null),
        (i = L.amountSol ?? null),
        B[14] !== H || B[15] !== s
          ? ((e = null != s ? (0, U.V)(s, (0, S.v)(H.language) ?? "en") : null),
            (B[14] = H),
            (B[15] = s),
            (B[16] = e))
          : (e = B[16]),
        (n = e),
        B[17] !== R)
      ) {
        let e =
          "risk" === R
            ? (0, _.k)(-1)
            : "wallet" === R
              ? "text-text-secondary"
              : "text-text-primary";
        ((a = (0, A.c)(
          "flex min-w-0 max-w-full items-center gap-1 font-medium",
          e,
        )),
          (B[17] = R),
          (B[18] = a));
      } else a = B[18];
      ((r = t
        ? (0, o.jsx)(f.default, {
            src: `/funders/${t}.svg`,
            alt: "",
            width: 14,
            height: 14,
            className: "size-3.5 shrink-0",
            "data-testid": "holder-funded-by-mark",
            "data-brand": t,
          })
        : (0, o.jsx)(l, { "aria-hidden": !0, className: "size-3 shrink-0" })),
        (B[4] = L.amountSol),
        (B[5] = L.funderName),
        (B[6] = L.timestampMs),
        (B[7] = H),
        (B[8] = R),
        (B[9] = n),
        (B[10] = i),
        (B[11] = a),
        (B[12] = r),
        (B[13] = s));
    } else ((n = B[9]), (i = B[10]), (a = B[11]), (r = B[12]), (s = B[13]));
    (B[19] !== V
      ? ((u = (0, o.jsx)("span", { className: "truncate", children: V })),
        (B[19] = V),
        (B[20] = u))
      : (u = B[20]),
      B[21] !== a || B[22] !== r || B[23] !== u
        ? ((c = (0, o.jsxs)("span", { className: a, children: [r, u] })),
          (B[21] = a),
          (B[22] = r),
          (B[23] = u),
          (B[24] = c))
        : (c = B[24]));
    let K = c;
    B[25] !== L.funderName || B[26] !== L.funderType
      ? ((p = [L.funderName, L.funderType].filter(et)),
        (B[25] = L.funderName),
        (B[26] = L.funderType),
        (B[27] = p))
      : (p = B[27]);
    let G = p.join(" · ");
    (B[28] !== O
      ? ((g = O.t("web.coin.holders_funded_by_title")),
        (B[28] = O),
        (B[29] = g))
      : (g = B[29]),
      B[30] !== g
        ? ((x = (0, o.jsx)("span", {
            className: "text-text-tertiary",
            children: g,
          })),
          (B[30] = g),
          (B[31] = x))
        : (x = B[31]),
      B[32] !== G
        ? ((b = G ? (0, o.jsx)("span", { children: G }) : null),
          (B[32] = G),
          (B[33] = b))
        : (b = B[33]),
      B[34] !== L.funder
        ? ((w = L.funder
            ? (0, o.jsx)("span", {
                className: "tabular-nums",
                children: (0, m.d)(L.funder, 8, 8),
              })
            : null),
          (B[34] = L.funder),
          (B[35] = w))
        : (w = B[35]),
      B[36] !== n || B[37] !== i || B[38] !== O
        ? ((v =
            null != i || n
              ? (0, o.jsxs)("span", {
                  children: [
                    null != i
                      ? O.t("common.sol_amount", { amount: (0, z.m)(i) })
                      : null,
                    null != i && n ? " · " : null,
                    n,
                  ],
                })
              : null),
          (B[36] = n),
          (B[37] = i),
          (B[38] = O),
          (B[39] = v))
        : (v = B[39]),
      B[40] !== b || B[41] !== w || B[42] !== v || B[43] !== x
        ? ((I = (0, o.jsxs)("span", {
            className: "flex flex-col gap-0.5",
            children: [x, b, w, v],
          })),
          (B[40] = b),
          (B[41] = w),
          (B[42] = v),
          (B[43] = x),
          (B[44] = I))
        : (I = B[44]));
    let J = I;
    return (
      B[45] !== O.chainId || B[46] !== J || B[47] !== L.funder || B[48] !== K
        ? ((j = L.funder
            ? (0, o.jsx)(k.f, {
                density: "terminal",
                content: J,
                children: (0, o.jsx)("a", {
                  "data-testid": "holder-funded-by",
                  href: (0, T.B)(L.funder, O.chainId ?? void 0),
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: ee,
                  className: (0, A.c)(Q, "max-w-full hover:underline"),
                  children: K,
                }),
              })
            : K),
          (B[45] = O.chainId),
          (B[46] = J),
          (B[47] = L.funder),
          (B[48] = K),
          (B[49] = j))
        : (j = B[49]),
      B[50] === Symbol.for("react.memo_cache_sentinel")
        ? ((M = (0, A.c)("flex items-center gap-1 tabular-nums", q)),
          (B[50] = M))
        : (M = B[50]),
      B[51] !== s
        ? ((P =
            null != s
              ? (0, o.jsx)(N.f, {
                  timestamp: s,
                  density: "terminal",
                  showTitle: !0,
                })
              : null),
          (B[51] = s),
          (B[52] = P))
        : (P = B[52]),
      B[53] !== i || B[54] !== s
        ? ((F =
            null != s && null != i
              ? (0, o.jsx)("span", { "aria-hidden": !0, children: "·" })
              : null),
          (B[53] = i),
          (B[54] = s),
          (B[55] = F))
        : (F = B[55]),
      B[56] !== i
        ? ((W =
            null != i
              ? (0, o.jsxs)("span", {
                  className: "flex items-center gap-0.5",
                  children: [
                    (0, o.jsx)(f.default, {
                      src: y.U,
                      alt: "SOL",
                      width: 12,
                      height: 12,
                      className: "size-3 shrink-0 object-contain",
                    }),
                    (0, o.jsx)("span", { children: (0, z.S)(i) }),
                  ],
                })
              : null),
          (B[56] = i),
          (B[57] = W))
        : (W = B[57]),
      B[58] !== P || B[59] !== F || B[60] !== W
        ? ((D = (0, o.jsxs)("span", { className: M, children: [P, F, W] })),
          (B[58] = P),
          (B[59] = F),
          (B[60] = W),
          (B[61] = D))
        : (D = B[61]),
      B[62] !== j || B[63] !== D
        ? ((E = (0, o.jsxs)("span", {
            className: "flex flex-col items-start leading-4",
            children: [j, D],
          })),
          (B[62] = j),
          (B[63] = D),
          (B[64] = E))
        : (E = B[64]),
      E
    );
  }
  function ee(e) {
    return e.stopPropagation();
  }
  function et(e) {
    return !!e;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let l = !!e.closed,
          n = {
            id: "supply",
            header: e.t("web.coin.supply_percent"),
            size: 72,
            minContainerWidth: 640,
            align: "end",
            className: "whitespace-nowrap tabular-nums",
            sortFn: K((e) => e.percentOfSupply),
            defaultSortDirection: "desc",
            cell: ({ row: e }) =>
              (0, o.jsx)("span", {
                className: "text-text-tertiary",
                children: R(e.percentOfSupply),
              }),
          },
          i = {
            id: "flows",
            header: e.t("web.coin.holders_column_flows"),
            size: 112,
            minContainerWidth: 520,
            align: "end",
            className: "whitespace-nowrap tabular-nums",
            sortFn: K((e) => e.boughtUsd),
            defaultSortDirection: "desc",
            cell: ({ row: t }) =>
              (0, o.jsxs)("span", {
                className: "flex flex-col items-end text-xs",
                children: [
                  (0, o.jsxs)("span", {
                    className: "text-text-secondary",
                    children: [
                      (0, o.jsxs)("span", {
                        className: "text-text-tertiary",
                        children: [e.t("web.coin.holders_bought"), " "],
                      }),
                      null != t.boughtUsd ? (0, _.l)(t.boughtUsd) : "—",
                    ],
                  }),
                  (0, o.jsxs)("span", {
                    className: "text-text-secondary",
                    children: [
                      (0, o.jsxs)("span", {
                        className: "text-text-tertiary",
                        children: [e.t("web.coin.holders_sold"), " "],
                      }),
                      null != t.soldUsd ? (0, _.l)(t.soldUsd) : "—",
                    ],
                  }),
                ],
              }),
          },
          a = {
            id: "bought",
            header: e.t("web.coin.holders_bought"),
            size: 92,
            minContainerWidth: l ? 480 : 840,
            align: "end",
            className: "whitespace-nowrap tabular-nums",
            sortFn: K((e) => e.boughtUsd),
            defaultSortDirection: "desc",
            cell: ({ row: e }) => J(e.boughtUsd, 1, e.closed),
          },
          r = {
            id: "sold",
            header: e.t("web.coin.holders_sold"),
            size: 92,
            minContainerWidth: l ? 600 : 1e3,
            align: "end",
            className: "whitespace-nowrap tabular-nums",
            sortFn: K((e) => e.soldUsd),
            defaultSortDirection: "desc",
            cell: ({ row: e }) => J(e.soldUsd, -1, e.closed),
          },
          s = {
            id: "fundedBy",
            header: e.t("web.coin.holders_column_funded_by"),
            size: e.dense ? 120 : 128,
            minContainerWidth: e.dense ? 560 : 1e3,
            align: "start",
            className: "whitespace-nowrap",
            sortFn: (e, t) =>
              (e.fundingSource?.timestampMs ?? 1 / 0) -
              (t.fundingSource?.timestampMs ?? 1 / 0),
            defaultSortDirection: "asc",
            cell: ({ row: t }) =>
              t.fundingSource
                ? (0, o.jsx)(Z, { funding: t.fundingSource, ctx: e })
                : (0, o.jsx)("span", {
                    className: "text-text-tertiary",
                    children: "—",
                  }),
          },
          d = [
            {
              id: "holder",
              header: e.t("web.coin.holder"),
              className: (0, A.c)("w-full max-w-0", e.dense && "pl-4"),
              sortFn: (e, t) =>
                (e.username ?? e.wallet ?? "").localeCompare(
                  t.username ?? t.wallet ?? "",
                ),
              cell: ({ row: t }) => (0, o.jsx)(X, { row: t, ctx: e }),
            },
            {
              id: "held",
              header: e.t("web.coin.holders_column_held"),
              size: e.dense ? 84 : 96,
              ...(e.dense ? { minContainerWidth: 480 } : {}),
              align: "end",
              className: "whitespace-nowrap tabular-nums",
              sortFn: K((e) => e.amountHeld),
              defaultSortDirection: "desc",
              cell: ({ row: l }) =>
                e.dense
                  ? (0, o.jsx)(b, {
                      value: l.amountHeld,
                      className: $,
                      children:
                        null != l.amountHeld ? (0, t.C)(l.amountHeld) : "—",
                    })
                  : (0, o.jsxs)("span", {
                      className: "flex flex-col items-end",
                      children: [
                        (0, o.jsx)("span", {
                          className: "text-text-secondary",
                          children:
                            null != l.amountHeld ? (0, t.J)(l.amountHeld) : "—",
                        }),
                        (0, o.jsx)("span", {
                          className: "text-xs text-text-tertiary",
                          children: R(l.percentOfSupply),
                        }),
                      ],
                    }),
            },
            ...(e.dense ? [n] : []),
            {
              id: "position",
              header: e.t("coin_details.position"),
              size: e.dense ? 84 : 88,
              align: "end",
              className: (0, A.c)(
                "whitespace-nowrap tabular-nums",
                e.dense ? $ : "text-text-secondary",
              ),
              sortFn: K((e) => e.positionUsd),
              defaultSortDirection: "desc",
              cell: ({ row: t }) => (0, o.jsx)(H, { row: t, ctx: e }),
            },
            {
              id: "pnl",
              header: e.t("web.coin.pnl"),
              size: e.dense ? 124 : 132,
              minContainerWidth: 300,
              align: "end",
              className: "whitespace-nowrap",
              sortFn: K((e) => e.pnl?.totalUsd ?? null),
              defaultSortDirection: "desc",
              cell: ({ row: t }) => {
                let l = t.pnl;
                if (!l || null == l.totalUsd)
                  return (0, o.jsx)("span", {
                    className: "text-text-tertiary",
                    children: "—",
                  });
                let n = (0, o.jsx)("span", {
                    className: (0, A.c)(
                      "font-medium tabular-nums",
                      (0, _.k)(l.totalUsd),
                    ),
                    children: (0, _.u)(l.totalUsd),
                  }),
                  i = e.dense
                    ? n
                    : (0, o.jsxs)("span", {
                        className: "flex flex-col items-end",
                        children: [
                          n,
                          null != l.percent
                            ? (0, o.jsx)(v.f, {
                                changePercent: l.percent,
                                signed: !0,
                                isPnl: !0,
                                className: "text-[11px]",
                              })
                            : null,
                        ],
                      }),
                  a = null != l.realizedUsd || null != l.unrealizedUsd,
                  r = e.dense ? l.percent : null;
                return a || null != r
                  ? (0, o.jsx)(k.f, {
                      density: "terminal",
                      content: (0, o.jsxs)("span", {
                        className: "flex flex-col gap-0.5",
                        children: [
                          null != r
                            ? (0, o.jsx)(v.f, {
                                changePercent: r,
                                signed: !0,
                                isPnl: !0,
                              })
                            : null,
                          a
                            ? (0, o.jsxs)(o.Fragment, {
                                children: [
                                  (0, o.jsxs)("span", {
                                    children: [
                                      e.t("web.coin.holders_pnl_realized"),
                                      ":",
                                      " ",
                                      null != l.realizedUsd
                                        ? (0, _.u)(l.realizedUsd)
                                        : "—",
                                    ],
                                  }),
                                  (0, o.jsxs)("span", {
                                    children: [
                                      e.t("web.coin.holders_pnl_unrealized"),
                                      ":",
                                      " ",
                                      null != l.unrealizedUsd
                                        ? (0, _.u)(l.unrealizedUsd)
                                        : "—",
                                    ],
                                  }),
                                ],
                              })
                            : null,
                        ],
                      }),
                      children: (0, o.jsx)("button", {
                        type: "button",
                        "aria-label": e.t("web.holders.show_pnl_breakdown"),
                        className: "relative z-10 text-right",
                        children: i,
                      }),
                    })
                  : i;
              },
            },
            {
              id: "avgEntry",
              header: e.t("web.coin.holders_column_avg_entry"),
              headerControls: (0, o.jsx)("button", {
                type: "button",
                onClick: e.onToggleAvgEntryMode,
                "aria-label":
                  "mcap" === e.avgEntryMode
                    ? e.t("web.holders.show_avg_entry_price")
                    : e.t("web.holders.show_avg_entry_mcap"),
                className:
                  "text-[11px] text-text-tertiary hover:text-text-primary",
                children:
                  "mcap" === e.avgEntryMode
                    ? e.t("common.market_cap_short")
                    : e.t("web.holders.entry_price"),
              }),
              headerControlsPlacement: "after",
              size: e.dense ? 96 : 104,
              minContainerWidth: e.dense ? (l ? 640 : 760) : 440,
              align: "end",
              className: (0, A.c)(
                "whitespace-nowrap tabular-nums",
                e.dense ? $ : "text-text-secondary",
              ),
              sortFn: K((e) => e.avgEntryUsdPerToken),
              defaultSortDirection: "asc",
              cell: ({ row: t }) =>
                "mcap" === e.avgEntryMode
                  ? null == t.avgEntryMcapUsd
                    ? "—"
                    : (e.dense, (0, _.l)(t.avgEntryMcapUsd))
                  : null != t.avgEntryUsdPerToken
                    ? (0, z.T)({ value: t.avgEntryUsdPerToken })
                    : "—",
            },
            ...(e.dense ? [a, r] : [i]),
            {
              id: "heldFor",
              header: e.t("web.coin.holders_column_held_for"),
              size: e.dense ? 80 : 88,
              minContainerWidth: e.dense ? 1040 : 600,
              align: "end",
              className: (0, A.c)(
                "whitespace-nowrap tabular-nums",
                e.dense ? "text-text-tertiary" : "text-text-secondary",
              ),
              sortFn: (e, t) =>
                (e.enteredAtMs ?? 1 / 0) - (t.enteredAtMs ?? 1 / 0),
              defaultSortDirection: "asc",
              cell: ({ row: e }) =>
                null != e.enteredAtMs
                  ? (0, o.jsx)(N.f, {
                      timestamp: e.enteredAtMs,
                      density: "terminal",
                      showTitle: !0,
                    })
                  : "—",
            },
            s,
            {
              id: "actions",
              header: (0, o.jsx)("span", {
                className: "sr-only",
                children: e.t("web.coin.holders_column_actions"),
              }),
              size: e.dense ? 64 : 72,
              ...(e.dense ? { minContainerWidth: 920 } : {}),
              align: "end",
              className: e.dense ? "pr-4" : void 0,
              cell: ({ row: t }) => {
                if (!t.wallet) return null;
                let l = t.wallet;
                return (0, o.jsxs)("span", {
                  className: (0, A.c)(
                    "items-center justify-end gap-0.5",
                    e.dense ? (0, A.c)("flex", x.N) : "inline-flex",
                  ),
                  children: [
                    (0, o.jsx)(j._, {
                      density: "terminal",
                      size: 24,
                      className: Q,
                      "aria-label": e.t("web.coin.holders_action_copy_address"),
                      onClick: () => void (0, F.W)(l, e.t("web.common.copied")),
                      children: (0, o.jsx)(u.QO, { "aria-hidden": !0 }),
                    }),
                    (0, o.jsx)(j._, {
                      density: "terminal",
                      size: 24,
                      className: Q,
                      href: (0, T.B)(l, e.chainId ?? void 0),
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": e.t(
                        "web.coin.holders_action_open_explorer",
                      ),
                      children: (0, o.jsx)(u.ic, { "aria-hidden": !0 }),
                    }),
                  ],
                });
              },
            },
          ];
        return l ? d.filter((e) => !O.has(e.id)) : d;
      },
    ],
    375098,
  );
  var el = e.i(761459),
    en = e.i(175190),
    ei = e.i(106411),
    ea = e.i(559015),
    er = e.i(541710),
    es = e.i(779106);
  function eo(e) {
    return e.followedHolders;
  }
  function ed(e) {
    return e.positions ?? [];
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let t,
          l,
          n,
          i,
          a,
          r,
          s,
          o,
          u,
          c,
          m,
          f = (0, d.c)(48),
          {
            mint: p,
            limit: h,
            includePositions: g,
            coinChain: x,
            enabled: b,
          } = e,
          y = void 0 === h ? 50 : h,
          w = void 0 === g || g,
          v = (0, es.f)("followed-holders"),
          _ = (0, er.l)();
        f[0] !== x || f[1] !== _
          ? ((t = (0, ei.f)(x, _)), (f[0] = x), (f[1] = _), (f[2] = t))
          : (t = f[2]);
        let { chain: I, readable: N } = t,
          j = p ?? "";
        (f[3] !== I ? ((l = I ? [I] : []), (f[3] = I), (f[4] = l)) : (l = f[4]),
          f[5] !== w || f[6] !== y || f[7] !== j || f[8] !== l || f[9] !== v
            ? ((n = [
                "callouts",
                "followed-holders",
                v,
                j,
                y,
                w,
                "pages",
                ...l,
              ]),
              (f[5] = w),
              (f[6] = y),
              (f[7] = j),
              (f[8] = l),
              (f[9] = v),
              (f[10] = n))
            : (n = f[10]),
          f[11] !== I || f[12] !== w || f[13] !== y || f[14] !== p
            ? ((i = (e) => {
                let { pageParam: t, signal: l } = e;
                return (0, ea.D)({
                  mint: p ?? "",
                  limit: y,
                  offset: t,
                  includePositions: w,
                  ...(I ? { chain: I } : {}),
                  signal: l,
                });
              }),
              (f[11] = I),
              (f[12] = w),
              (f[13] = y),
              (f[14] = p),
              (f[15] = i))
            : (i = f[15]),
          f[16] !== y
            ? ((a = (e, t) => (e.hasMore ? t.length * y : void 0)),
              (f[16] = y),
              (f[17] = a))
            : (a = f[17]));
        let k = (void 0 === b || b) && N && !!p;
        f[18] !== k || f[19] !== n || f[20] !== i || f[21] !== a
          ? ((r = {
              queryKey: n,
              initialPageParam: 0,
              queryFn: i,
              getNextPageParam: a,
              enabled: k,
              staleTime: 6e4,
              retry: ei.E,
            }),
            (f[18] = k),
            (f[19] = n),
            (f[20] = i),
            (f[21] = a),
            (f[22] = r))
          : (r = f[22]);
        let M = (0, el.useInfiniteQuery)(r),
          { refetch: C, fetchNextPage: U } = M;
        f[23] !== C
          ? ((s = () => void C()), (f[23] = C), (f[24] = s))
          : (s = f[24]);
        let S = s;
        f[25] !== U
          ? ((o = () => void U()), (f[25] = U), (f[26] = o))
          : (o = f[26]);
        let P = o;
        (f[27] !== S
          ? ((u = { onSessionValid: S }), (f[27] = S), (f[28] = u))
          : (u = f[28]),
          (0, en.f)(M.error, ea.X, "followed-holders", u));
        let A = M.data?.pages;
        e: {
          let e,
            t,
            l,
            n = A?.[0];
          if (!A || !n) {
            c = void 0;
            break e;
          }
          let i = A[A.length - 1] ?? n;
          (f[29] !== A
            ? ((e = A.flatMap(eo)), (f[29] = A), (f[30] = e))
            : (e = f[30]),
            f[31] !== A
              ? ((t = A.flatMap(ed)), (f[31] = A), (f[32] = t))
              : (t = f[32]),
            f[33] !== n.totalCount ||
            f[34] !== i.hasMore ||
            f[35] !== e ||
            f[36] !== t
              ? ((l = {
                  followedHolders: e,
                  positions: t,
                  totalCount: n.totalCount,
                  hasMore: i.hasMore,
                }),
                (f[33] = n.totalCount),
                (f[34] = i.hasMore),
                (f[35] = e),
                (f[36] = t),
                (f[37] = l))
              : (l = f[37]),
            (c = l));
        }
        let F = c;
        return (
          f[38] !== F ||
          f[39] !== P ||
          f[40] !== M.error ||
          f[41] !== M.hasNextPage ||
          f[42] !== M.isError ||
          f[43] !== M.isFetching ||
          f[44] !== M.isFetchingNextPage ||
          f[45] !== M.isLoading ||
          f[46] !== S
            ? ((m = {
                data: F,
                isLoading: M.isLoading,
                isFetching: M.isFetching,
                isError: M.isError,
                error: M.error,
                hasNextPage: M.hasNextPage,
                isFetchingNextPage: M.isFetchingNextPage,
                fetchNextPage: P,
                refetch: S,
              }),
              (f[38] = F),
              (f[39] = P),
              (f[40] = M.error),
              (f[41] = M.hasNextPage),
              (f[42] = M.isError),
              (f[43] = M.isFetching),
              (f[44] = M.isFetchingNextPage),
              (f[45] = M.isLoading),
              (f[46] = S),
              (f[47] = m))
            : (m = f[47]),
          m
        );
      },
    ],
    751138,
  );
};
