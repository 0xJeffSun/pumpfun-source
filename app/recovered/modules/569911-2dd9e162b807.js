// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(426091),
    l = e.i(146695),
    a = e.i(365089),
    s = e.i(598883),
    o = e.i(458310),
    c = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    d = e.i(263889),
    m = e.i(833548),
    h = e.i(464649);
  e.i(12641);
  var f = e.i(34011),
    p = e.i(924631);
  e.i(84455);
  var g = e.i(678730);
  e.i(107240);
  var b = e.i(693124),
    _ = e.i(529841),
    x = e.i(908163),
    y = e.i(813792),
    v = e.i(997887),
    k = e.i(79395),
    w = e.i(850175),
    j = e.i(389270);
  e.i(267146);
  var N = e.i(540805),
    S = e.i(187611),
    C = e.i(605587);
  let R = (0, S.T)("Solana", "brand-name"),
    $ = "text-[11px] font-normal leading-4 text-text-quaternary",
    I =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
    F = `inline-flex h-7 min-w-0 flex-1 items-center justify-center rounded-md bg-bg-tertiary px-2.5 text-[12px] font-medium leading-none text-text-primary transition-colors hover:bg-bg-tertiary/75 ${I}`,
    E = `inline-flex size-7 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary ${I}`,
    U = (e) => e.stopPropagation();
  function A(e) {
    let s,
      m,
      h,
      x,
      j,
      S,
      C,
      R,
      U,
      A,
      T,
      q,
      P,
      V,
      W,
      K,
      Q,
      H,
      Z,
      G,
      J,
      X,
      Y,
      ee = (0, n.c)(64),
      {
        coin: et,
        href: en,
        isOpen: er,
        liveMarketCap: ei,
        tradeDirection: el,
        tradeFlashKey: ea,
      } = e,
      { t: es } = (0, u.f)(),
      eo = et.chain_id ?? void 0,
      ec = er && !!et.mint;
    (ee[0] !== ec
      ? ((s = { enabled: ec }), (ee[0] = ec), (ee[1] = s))
      : (s = ee[1]),
      ee[2] !== et.mint || ee[3] !== eo || ee[4] !== s
        ? ((m = { coinAddress: et.mint, chainId: eo, queryOptions: s }),
          (ee[2] = et.mint),
          (ee[3] = eo),
          (ee[4] = s),
          (ee[5] = m))
        : (m = ee[5]));
    let { data: eu, isLoading: ed, isError: em } = (0, k.f)(m),
      eh = L(et, eu ?? null),
      { prefetch: ef, hoverProps: ep } = (0, w.W)(eu ?? (0, w.e)(eh.mint)),
      eg = (0, d.f)({
        mint: eh.mint,
        program: eh.program ?? void 0,
        chain_id: eh.chain_id ?? void 0,
        protocol: eh.protocol ?? void 0,
        ath_market_cap: eh.ath_market_cap ?? void 0,
      }),
      eb = ((e, t) => {
        let r,
          i,
          l,
          a = (0, n.c)(6),
          [s, o] = (0, c.useState)(0);
        if (
          (a[0] !== t || a[1] !== e
            ? ((r = () => {
                if (0 === e || !t) return;
                let n = setTimeout(() => o(e), 600);
                return () => clearTimeout(n);
              }),
              (i = [e, t]),
              (a[0] = t),
              (a[1] = e),
              (a[2] = r),
              (a[3] = i))
            : ((r = a[2]), (i = a[3])),
          (0, c.useEffect)(r, i),
          0 === e || !t || s === e)
        )
          return null;
        let u = "up" === t ? "buy" : "sell";
        return (
          a[4] !== u ? ((l = (0, g.F)(u)), (a[4] = u), (a[5] = l)) : (l = a[5]),
          l
        );
      })(ea, el),
      [e_, ex] = (0, c.useState)(!1),
      ey = (0, p.W)(eh.symbol),
      ev = eh.name?.trim() || null,
      ek = ev ?? (ey ? `$${ey}` : null),
      ew = en ?? `/coin/${eh.mint}`,
      ej = !!eh.complete || !!eh.raydium_pool,
      eN = (0, v.i)(eh.created_timestamp),
      eS = ((...e) => {
        for (let t of e)
          if ("number" == typeof t && Number.isFinite(t)) return t;
        return null;
      })(ei, eu?.usd_market_cap, et.usd_market_cap),
      eC = null === ei && null !== eS,
      eR = eg.athMarketCap > 0 ? eg.athMarketCap : null;
    ee[6] !== et || ee[7] !== eu
      ? ((h = eu ?? (O(et) ? et : null)),
        (ee[6] = et),
        (ee[7] = eu),
        (ee[8] = h))
      : (h = ee[8]);
    let e$ = h;
    ee[9] !== e$ || ee[10] !== es
      ? ((x = e$ ? B(e$, es) : null), (ee[9] = e$), (ee[10] = es), (ee[11] = x))
      : (x = ee[11]);
    let eI = x,
      eF =
        eh.creator && "11111111111111111111111111111111" !== eh.creator
          ? eh.creator
          : null,
      eE = D({ coin: eh, isMigrated: ej, t: es }),
      eU = async () => {
        try {
          (await navigator.clipboard.writeText(eh.mint),
            ex(!0),
            setTimeout(() => ex(!1), 2e3));
        } catch {}
      },
      eA =
        null === eS
          ? "—"
          : eC
            ? (0, t.jsx)(y.f, {
                content: es("web.coin.stale_market_cap_title"),
                density: "terminal",
                children: (0, t.jsx)("span", {
                  className: "text-text-secondary",
                  children: (0, N.l)(eS),
                }),
              })
            : (0, t.jsx)("span", {
                className: (0, i.c)("transition-colors", eb),
                children: (0, N.l)(eS),
              });
    (ee[12] === Symbol.for("react.memo_cache_sentinel")
      ? ((j = (0, i.c)("shrink-0 rounded-lg", I)), (ee[12] = j))
      : (j = ee[12]),
      ee[13] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, i.c)("min-w-0 rounded-sm", I)), (ee[13] = S))
        : (S = ee[13]),
      ee[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "mt-2 border-t border-border-secondary",
          })),
          (ee[14] = C))
        : (C = ee[14]),
      ee[15] !== eI
        ? ((R = eI
            ? (0, t.jsx)("p", {
                className: (0, i.c)("mt-2 truncate", $),
                "data-testid": "coin-hover-origin",
                children: eI,
              })
            : null),
          (ee[15] = eI),
          (ee[16] = R))
        : (R = ee[16]),
      ee[17] !== es
        ? ((U = es("web.common.market_cap")), (ee[17] = es), (ee[18] = U))
        : (U = ee[18]));
    let eM = null === eS && ed;
    (ee[19] !== eA || ee[20] !== U || ee[21] !== eM
      ? ((A = (0, t.jsx)(z, { label: U, loading: eM, value: eA })),
        (ee[19] = eA),
        (ee[20] = U),
        (ee[21] = eM),
        (ee[22] = A))
      : (A = ee[22]),
      ee[23] !== es
        ? ((T = es("common.all_time_high_short")), (ee[23] = es), (ee[24] = T))
        : (T = ee[24]));
    let ez = null === eR && (ed || eg.isLoading);
    (ee[25] !== eR
      ? ((q = null === eR ? "—" : (0, N.l)(eR)), (ee[25] = eR), (ee[26] = q))
      : (q = ee[26]),
      ee[27] !== T || ee[28] !== ez || ee[29] !== q
        ? ((P = (0, t.jsx)(z, { label: T, loading: ez, value: q })),
          (ee[27] = T),
          (ee[28] = ez),
          (ee[29] = q),
          (ee[30] = P))
        : (P = ee[30]),
      ee[31] !== es
        ? ((V = es("web.coin.created")), (ee[31] = es), (ee[32] = V))
        : (V = ee[32]));
    let eL = null === eN && ed,
      eO = null === eN ? "—" : (0, t.jsx)(_.f, { timestamp: eN });
    return (
      ee[33] !== V || ee[34] !== eL || ee[35] !== eO
        ? ((W = (0, t.jsx)(z, { label: V, loading: eL, value: eO })),
          (ee[33] = V),
          (ee[34] = eL),
          (ee[35] = eO),
          (ee[36] = W))
        : (W = ee[36]),
      ee[37] !== A || ee[38] !== P || ee[39] !== W
        ? ((K = (0, t.jsxs)("dl", {
            className: "mt-1 grid grid-cols-[auto_1fr] items-center gap-x-3",
            "data-testid": "coin-hover-stats",
            children: [A, P, W],
          })),
          (ee[37] = A),
          (ee[38] = P),
          (ee[39] = W),
          (ee[40] = K))
        : (K = ee[40]),
      ee[41] !== eu || ee[42] !== em || ee[43] !== es
        ? ((Q =
            em && void 0 === eu
              ? (0, t.jsx)("p", {
                  className: (0, i.c)("mt-1 text-right", $),
                  "data-testid": "coin-hover-error",
                  children: es("web.coin.content_unavailable"),
                })
              : null),
          (ee[41] = eu),
          (ee[42] = em),
          (ee[43] = es),
          (ee[44] = Q))
        : (Q = ee[44]),
      ee[45] !== es
        ? ((H = es("web.coin.view_coin")), (ee[45] = es), (ee[46] = H))
        : (H = ee[46]),
      ee[47] !== ew || ee[48] !== ep || ee[49] !== ef || ee[50] !== H
        ? ((Z = (0, t.jsx)(o.default, {
            href: ew,
            prefetch: ef,
            ...ep,
            className: F,
            children: H,
          })),
          (ee[47] = ew),
          (ee[48] = ep),
          (ee[49] = ef),
          (ee[50] = H),
          (ee[51] = Z))
        : (Z = ee[51]),
      ee[52] !== e_ || ee[53] !== es
        ? ((G = es(e_ ? "web.common.copied" : "web.coin.copy_mint_address")),
          (ee[52] = e_),
          (ee[53] = es),
          (ee[54] = G))
        : (G = ee[54]),
      ee[55] !== e_
        ? ((J = e_
            ? (0, t.jsx)(r.sX, {
                "aria-hidden": !0,
                className: "size-3.5 text-gain",
              })
            : (0, t.jsx)(r.xR, { "aria-hidden": !0, className: "size-3.5" })),
          (ee[55] = e_),
          (ee[56] = J))
        : (J = ee[56]),
      ee[57] !== eU || ee[58] !== G || ee[59] !== J
        ? ((X = (0, t.jsx)("button", {
            type: "button",
            onClick: eU,
            "aria-label": G,
            className: E,
            children: J,
          })),
          (ee[57] = eU),
          (ee[58] = G),
          (ee[59] = J),
          (ee[60] = X))
        : (X = ee[60]),
      ee[61] !== Z || ee[62] !== X
        ? ((Y = (0, t.jsxs)("div", {
            className: "mt-2 flex items-center gap-2",
            "data-testid": "coin-hover-actions",
            children: [Z, X],
          })),
          (ee[61] = Z),
          (ee[62] = X),
          (ee[63] = Y))
        : (Y = ee[63]),
      (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsxs)("div", {
            className: "flex items-center gap-2.5",
            "data-testid": "coin-hover-identity",
            children: [
              (0, t.jsx)(o.default, {
                href: ew,
                prefetch: ef,
                ...ep,
                className: j,
                children: (0, t.jsx)(f.CoinAvatar, {
                  optimisticImage: !0,
                  coin: {
                    mint: eh.mint,
                    name: eh.name,
                    symbol: eh.symbol,
                    image_uri: eh.image_uri,
                    is_banned: eh.is_banned,
                    chain_id: eh.chain_id,
                    program: eh.program,
                    platform: eh.platform,
                    protocol: eh.protocol,
                  },
                  size: 32,
                  seal: "corner",
                }),
              }),
              (0, t.jsxs)("div", {
                className: "min-w-0 flex-1",
                children: [
                  (0, t.jsxs)("div", {
                    className: "flex min-w-0 items-center gap-1",
                    children: [
                      (0, t.jsx)(o.default, {
                        href: ew,
                        prefetch: ef,
                        ...ep,
                        className: S,
                        children: (0, t.jsx)("h4", {
                          className:
                            "truncate text-[13px] font-medium leading-4 text-text-primary",
                          children: ek ?? (0, a.d)(eh.mint, 4, 4),
                        }),
                      }),
                      ev && ey
                        ? (0, t.jsxs)("span", {
                            className:
                              "shrink-0 text-[11px] leading-4 text-text-quaternary",
                            children: ["$", ey],
                          })
                        : null,
                    ],
                  }),
                  (0, t.jsx)("p", {
                    className:
                      "truncate font-mono text-[11px] font-normal leading-4 text-text-quaternary",
                    children: (0, a.d)(eh.mint, 4, 4),
                  }),
                ],
              }),
            ],
          }),
          C,
          R,
          eF
            ? (0, t.jsxs)("p", {
                className: (0, i.c)("mt-1 flex min-w-0 items-center gap-1", $),
                "data-testid": "coin-hover-creator",
                children: [
                  (0, t.jsx)("span", {
                    className: "shrink-0",
                    children: es("web.coin.header_creator_by"),
                  }),
                  (0, t.jsx)(b.S, {
                    address: eF,
                    username: eh.username,
                    profileImage: eh.profile_image,
                    size: 16,
                    density: "terminal",
                    verified: "lookup",
                    hoverCard: !1,
                    href: (0, l.d)(eF, eh.username ?? void 0),
                    shallowProfileId: null,
                    className: "min-w-0",
                  }),
                ],
              })
            : null,
          K,
          Q,
          eE.length > 0
            ? (0, t.jsx)("div", {
                className: "mt-2 flex flex-wrap gap-1",
                "data-testid": "coin-hover-tags",
                children: eE.map(M),
              })
            : null,
          Y,
        ],
      })
    );
  }
  function M(e) {
    return (0, t.jsxs)(
      x.E,
      { density: "terminal", tone: e.tone, children: [e.icon, e.label] },
      e.key,
    );
  }
  function z(e) {
    let r,
      l,
      a,
      s,
      o,
      c = (0, n.c)(10),
      { label: u, value: d, loading: m } = e;
    return (
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, i.c)("flex h-6 items-center", $)), (c[0] = r))
        : (r = c[0]),
      c[1] !== u
        ? ((l = (0, t.jsx)("dt", { className: r, children: u })),
          (c[1] = u),
          (c[2] = l))
        : (l = c[2]),
      c[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, i.c)(
            "flex h-6 items-center justify-end",
            "min-w-0 text-right text-[13px] font-medium leading-4 tabular-nums text-text-primary",
          )),
          (c[3] = a))
        : (a = c[3]),
      c[4] !== m || c[5] !== d
        ? ((s = (0, t.jsx)("dd", {
            className: a,
            children: m
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className:
                    "inline-block h-3 w-12 animate-pulse rounded-sm bg-bg-tertiary align-middle",
                })
              : (0, t.jsx)("span", { className: "truncate", children: d }),
          })),
          (c[4] = m),
          (c[5] = d),
          (c[6] = s))
        : (s = c[6]),
      c[7] !== l || c[8] !== s
        ? ((o = (0, t.jsxs)(t.Fragment, { children: [l, s] })),
          (c[7] = l),
          (c[8] = s),
          (c[9] = o))
        : (o = c[9]),
      o
    );
  }
  let L = (e, t) => ({
      mint: e.mint,
      is_banned: t?.is_banned ?? null,
      symbol: t?.symbol ?? e.symbol ?? null,
      name: t?.name ?? e.name ?? null,
      image_uri: t?.image_uri ?? e.image_uri ?? null,
      usd_market_cap: t?.usd_market_cap ?? e.usd_market_cap ?? null,
      is_currently_live: t?.is_currently_live ?? e.is_currently_live ?? null,
      is_charity: t?.is_charity ?? e.is_charity ?? null,
      tokenized_agent: t?.tokenized_agent ?? e.tokenized_agent ?? null,
      mayhem_state: t?.mayhem_state ?? e.mayhem_state ?? null,
      complete: t?.complete ?? e.complete ?? null,
      raydium_pool: t?.raydium_pool ?? e.raydium_pool ?? null,
      created_timestamp: t?.created_timestamp ?? e.created_timestamp ?? null,
      chain_id: t?.chain_id ?? e.chain_id ?? null,
      program: t?.program ?? e.program ?? null,
      platform: t?.platform ?? e.platform ?? null,
      protocol: t?.protocol ?? e.protocol ?? null,
      ath_market_cap: t?.ath_market_cap ?? e.ath_market_cap ?? null,
      creator: t?.creator ?? e.creator ?? null,
      username: t?.username ?? e.username ?? null,
      profile_image: t?.profile_image ?? e.profile_image ?? null,
    }),
    O = (e) => !!(e.program || e.platform || e.protocol || e.chain_id),
    T = (e) => (0, S.T)(e, "brand-name"),
    B = (e, t) => {
      let n = (0, j.M)({
        mint: e.mint,
        chain_id: e.chain_id ?? void 0,
        program: e.program ?? void 0,
        platform: e.platform ?? void 0,
        protocol: e.protocol ?? void 0,
      });
      if ("launchpad" === n.kind)
        return t("web.coin.origin_launchpad_tooltip", {
          launchpad: T(n.launchpad.label),
          chain: R,
        });
      if ("solana" === n.kind)
        return t("web.coin.origin_chain_tooltip", { chain: R });
      if ("ton" === n.kind || "starknet" === n.kind) {
        let e = (0, h.z)(n.chainId, { includeTon: !0, includeStarknet: !0 });
        return e
          ? t("web.coin.origin_chain_tooltip", { chain: T(e.name) })
          : null;
      }
      let r =
        "near" === n.kind
          ? (0, h.z)(n.chainId, { includeNear: !0 })?.name
          : ((0, h.z)(n.chainId)?.name ?? (0, C.n)(n.chainId));
      if (!r) return null;
      let i = T(r),
        l = "near" === n.kind ? n.launchpad : n.launchpad?.label;
      return l
        ? t("web.coin.origin_launchpad_tooltip", { launchpad: T(l), chain: i })
        : n.venue
          ? t("web.coin.origin_venue_tooltip", { venue: T(n.venue), chain: i })
          : t("web.coin.origin_chain_tooltip", { chain: i });
    },
    D = ({ coin: e, isMigrated: n, t: i }) => {
      let l = [];
      return (
        e.is_currently_live &&
          l.push({
            key: "live",
            icon: (0, t.jsx)(r.UN, { "aria-hidden": !0 }),
            label: i("coin_details.live"),
            tone: "hot",
          }),
        ("active" === e.mayhem_state || "enabled" === e.mayhem_state) &&
          l.push({
            key: "mayhem",
            icon: (0, t.jsx)(r.iU, { "aria-hidden": !0 }),
            label: i("mayhem_mode.mayhem"),
            tone: "neutral",
          }),
        e.tokenized_agent &&
          l.push({
            key: "agent",
            icon: (0, t.jsx)(r.H5, { "aria-hidden": !0 }),
            label: i("web.coin.agent_badge"),
            tone: "neutral",
          }),
        e.is_charity &&
          l.push({
            key: "charity",
            icon: (0, t.jsx)(r.cJ, { "aria-hidden": !0 }),
            label: i("creator_fees.charity.label"),
            tone: "neutral",
          }),
        n &&
          l.push({
            key: "graduated",
            icon: (0, t.jsx)(r.SH, { "aria-hidden": !0 }),
            label: i("coin_details.boost.graduated_label"),
            tone: "neutral",
          }),
        l
      );
    };
  e.s([
    "f",
    0,
    function (e) {
      let r,
        i,
        l,
        a,
        o = (0, n.c)(20),
        {
          coin: u,
          liveMarketCap: d,
          tradeDirection: h,
          tradeFlashKey: f,
          href: p,
          openDelay: g,
          closeDelay: b,
          disabled: _,
          side: x,
          align: y,
          children: v,
        } = e,
        k = void 0 === g ? 140 : g,
        w = void 0 === b ? 120 : b,
        j = void 0 === x ? "top" : x,
        N = void 0 === y ? "center" : y,
        [S, C] = (0, c.useState)(!1);
      if (void 0 !== _ && _) {
        let e;
        return (
          o[0] !== v
            ? ((e = (0, t.jsx)(t.Fragment, { children: v })),
              (o[0] = v),
              (o[1] = e))
            : (e = o[1]),
          e
        );
      }
      o[2] !== v
        ? ((r = (0, t.jsx)(s.b, { asChild: !0, children: v })),
          (o[2] = v),
          (o[3] = r))
        : (r = o[3]);
      let R = d ?? null,
        $ = h ?? null,
        I = f ?? 0;
      return (
        o[4] !== u ||
        o[5] !== p ||
        o[6] !== S ||
        o[7] !== R ||
        o[8] !== $ ||
        o[9] !== I
          ? ((i = (0, t.jsx)(A, {
              coin: u,
              href: p,
              isOpen: S,
              liveMarketCap: R,
              tradeDirection: $,
              tradeFlashKey: I,
            })),
            (o[4] = u),
            (o[5] = p),
            (o[6] = S),
            (o[7] = R),
            (o[8] = $),
            (o[9] = I),
            (o[10] = i))
          : (i = o[10]),
        o[11] !== N || o[12] !== j || o[13] !== i
          ? ((l = (0, t.jsx)(s.P, {
              side: j,
              align: N,
              sideOffset: 8,
              collisionPadding: 12,
              className: m.C,
              "data-testid": "coin-hover-card",
              onClick: U,
              children: i,
            })),
            (o[11] = N),
            (o[12] = j),
            (o[13] = i),
            (o[14] = l))
          : (l = o[14]),
        o[15] !== w || o[16] !== k || o[17] !== l || o[18] !== r
          ? ((a = (0, t.jsxs)(s.c, {
              openDelay: k,
              closeDelay: w,
              onOpenChange: C,
              children: [r, l],
            })),
            (o[15] = w),
            (o[16] = k),
            (o[17] = l),
            (o[18] = r),
            (o[19] = a))
          : (a = o[19]),
        a
      );
    },
  ]);
};
