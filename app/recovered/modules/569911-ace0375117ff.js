// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    s = e.i(426091),
    n = e.i(146695),
    l = e.i(365089),
    r = e.i(598883),
    c = e.i(458310),
    o = e.i(352386);
  e.i(12692);
  var d = e.i(398902),
    h = e.i(263889),
    x = e.i(833548),
    f = e.i(464649);
  e.i(12641);
  var m = e.i(34011),
    u = e.i(924631);
  e.i(84455);
  var b = e.i(678730);
  e.i(107240);
  var p = e.i(693124),
    _ = e.i(529841),
    g = e.i(908163),
    y = e.i(813792),
    v = e.i(997887),
    j = e.i(79395),
    k = e.i(850175),
    w = e.i(389270);
  e.i(267146);
  var N = e.i(540805),
    C = e.i(187611),
    A = e.i(605587);
  let F = (0, C.T)("Solana", "brand-name"),
    E = "text-[11px] font-normal leading-4 text-text-quaternary",
    S =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
    I = `inline-flex h-7 min-w-0 flex-1 items-center justify-center rounded-md bg-bg-tertiary px-2.5 text-[12px] font-medium leading-none text-text-primary transition-colors hover:bg-bg-tertiary/75 ${S}`,
    B = `inline-flex size-7 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary ${S}`,
    D = (e) => e.stopPropagation();
  function M(e) {
    let r,
      x,
      f,
      g,
      w,
      C,
      A,
      F,
      D,
      M,
      O,
      G,
      P,
      $,
      R,
      W,
      Q,
      K,
      Z,
      J,
      V,
      X,
      Y,
      ee = (0, i.c)(64),
      {
        coin: et,
        href: ei,
        isOpen: ea,
        liveMarketCap: es,
        tradeDirection: en,
        tradeFlashKey: el,
      } = e,
      { t: er } = (0, d.f)(),
      ec = et.chain_id ?? void 0,
      eo = ea && !!et.mint;
    (ee[0] !== eo
      ? ((r = { enabled: eo }), (ee[0] = eo), (ee[1] = r))
      : (r = ee[1]),
      ee[2] !== et.mint || ee[3] !== ec || ee[4] !== r
        ? ((x = { coinAddress: et.mint, chainId: ec, queryOptions: r }),
          (ee[2] = et.mint),
          (ee[3] = ec),
          (ee[4] = r),
          (ee[5] = x))
        : (x = ee[5]));
    let { data: ed, isLoading: eh, isError: ex } = (0, j.f)(x),
      ef = L(et, ed ?? null),
      { prefetch: em, hoverProps: eu } = (0, k.W)(ed ?? (0, k.e)(ef.mint)),
      eb = (0, h.f)({
        mint: ef.mint,
        program: ef.program ?? void 0,
        chain_id: ef.chain_id ?? void 0,
        protocol: ef.protocol ?? void 0,
        ath_market_cap: ef.ath_market_cap ?? void 0,
      }),
      ep = ((e, t) => {
        let a,
          s,
          n,
          l = (0, i.c)(6),
          [r, c] = (0, o.useState)(0);
        if (
          (l[0] !== t || l[1] !== e
            ? ((a = () => {
                if (0 === e || !t) return;
                let i = setTimeout(() => c(e), 600);
                return () => clearTimeout(i);
              }),
              (s = [e, t]),
              (l[0] = t),
              (l[1] = e),
              (l[2] = a),
              (l[3] = s))
            : ((a = l[2]), (s = l[3])),
          (0, o.useEffect)(a, s),
          0 === e || !t || r === e)
        )
          return null;
        let d = "up" === t ? "buy" : "sell";
        return (
          l[4] !== d ? ((n = (0, b.F)(d)), (l[4] = d), (l[5] = n)) : (n = l[5]),
          n
        );
      })(el, en),
      [e_, eg] = (0, o.useState)(!1),
      ey = (0, u.W)(ef.symbol),
      ev = ef.name?.trim() || null,
      ej = ev ?? (ey ? `$${ey}` : null),
      ek = ei ?? `/coin/${ef.mint}`,
      ew = !!ef.complete || !!ef.raydium_pool,
      eN = (0, v.i)(ef.created_timestamp),
      eC = ((...e) => {
        for (let t of e)
          if ("number" == typeof t && Number.isFinite(t)) return t;
        return null;
      })(es, ed?.usd_market_cap, et.usd_market_cap),
      eA = null === es && null !== eC,
      eF = eb.athMarketCap > 0 ? eb.athMarketCap : null;
    ee[6] !== et || ee[7] !== ed
      ? ((f = ed ?? (T(et) ? et : null)),
        (ee[6] = et),
        (ee[7] = ed),
        (ee[8] = f))
      : (f = ee[8]);
    let eE = f;
    ee[9] !== eE || ee[10] !== er
      ? ((g = eE ? z(eE, er) : null), (ee[9] = eE), (ee[10] = er), (ee[11] = g))
      : (g = ee[11]);
    let eS = g,
      eI =
        ef.creator && "11111111111111111111111111111111" !== ef.creator
          ? ef.creator
          : null,
      eB = q({ coin: ef, isMigrated: ew, t: er }),
      eD = async () => {
        try {
          (await navigator.clipboard.writeText(ef.mint),
            eg(!0),
            setTimeout(() => eg(!1), 2e3));
        } catch {}
      },
      eM =
        null === eC
          ? "—"
          : eA
            ? (0, t.jsx)(y.f, {
                content: er("web.coin.stale_market_cap_title"),
                density: "terminal",
                children: (0, t.jsx)("span", {
                  className: "text-text-secondary",
                  children: (0, N.l)(eC),
                }),
              })
            : (0, t.jsx)("span", {
                className: (0, s.c)("transition-colors", ep),
                children: (0, N.l)(eC),
              });
    (ee[12] === Symbol.for("react.memo_cache_sentinel")
      ? ((w = (0, s.c)("shrink-0 rounded-lg", S)), (ee[12] = w))
      : (w = ee[12]),
      ee[13] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = (0, s.c)("min-w-0 rounded-sm", S)), (ee[13] = C))
        : (C = ee[13]),
      ee[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((A = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "mt-2 border-t border-border-secondary",
          })),
          (ee[14] = A))
        : (A = ee[14]),
      ee[15] !== eS
        ? ((F = eS
            ? (0, t.jsx)("p", {
                className: (0, s.c)("mt-2 truncate", E),
                "data-testid": "coin-hover-origin",
                children: eS,
              })
            : null),
          (ee[15] = eS),
          (ee[16] = F))
        : (F = ee[16]),
      ee[17] !== er
        ? ((D = er("web.common.market_cap")), (ee[17] = er), (ee[18] = D))
        : (D = ee[18]));
    let eU = null === eC && eh;
    (ee[19] !== eM || ee[20] !== D || ee[21] !== eU
      ? ((M = (0, t.jsx)(H, { label: D, loading: eU, value: eM })),
        (ee[19] = eM),
        (ee[20] = D),
        (ee[21] = eU),
        (ee[22] = M))
      : (M = ee[22]),
      ee[23] !== er
        ? ((O = er("common.all_time_high_short")), (ee[23] = er), (ee[24] = O))
        : (O = ee[24]));
    let eH = null === eF && (eh || eb.isLoading);
    (ee[25] !== eF
      ? ((G = null === eF ? "—" : (0, N.l)(eF)), (ee[25] = eF), (ee[26] = G))
      : (G = ee[26]),
      ee[27] !== O || ee[28] !== eH || ee[29] !== G
        ? ((P = (0, t.jsx)(H, { label: O, loading: eH, value: G })),
          (ee[27] = O),
          (ee[28] = eH),
          (ee[29] = G),
          (ee[30] = P))
        : (P = ee[30]),
      ee[31] !== er
        ? (($ = er("web.coin.created")), (ee[31] = er), (ee[32] = $))
        : ($ = ee[32]));
    let eL = null === eN && eh,
      eT = null === eN ? "—" : (0, t.jsx)(_.f, { timestamp: eN });
    return (
      ee[33] !== $ || ee[34] !== eL || ee[35] !== eT
        ? ((R = (0, t.jsx)(H, { label: $, loading: eL, value: eT })),
          (ee[33] = $),
          (ee[34] = eL),
          (ee[35] = eT),
          (ee[36] = R))
        : (R = ee[36]),
      ee[37] !== M || ee[38] !== P || ee[39] !== R
        ? ((W = (0, t.jsxs)("dl", {
            className: "mt-1 grid grid-cols-[auto_1fr] items-center gap-x-3",
            "data-testid": "coin-hover-stats",
            children: [M, P, R],
          })),
          (ee[37] = M),
          (ee[38] = P),
          (ee[39] = R),
          (ee[40] = W))
        : (W = ee[40]),
      ee[41] !== ed || ee[42] !== ex || ee[43] !== er
        ? ((Q =
            ex && void 0 === ed
              ? (0, t.jsx)("p", {
                  className: (0, s.c)("mt-1 text-right", E),
                  "data-testid": "coin-hover-error",
                  children: er("web.coin.content_unavailable"),
                })
              : null),
          (ee[41] = ed),
          (ee[42] = ex),
          (ee[43] = er),
          (ee[44] = Q))
        : (Q = ee[44]),
      ee[45] !== er
        ? ((K = er("web.coin.view_coin")), (ee[45] = er), (ee[46] = K))
        : (K = ee[46]),
      ee[47] !== ek || ee[48] !== eu || ee[49] !== em || ee[50] !== K
        ? ((Z = (0, t.jsx)(c.default, {
            href: ek,
            prefetch: em,
            ...eu,
            className: I,
            children: K,
          })),
          (ee[47] = ek),
          (ee[48] = eu),
          (ee[49] = em),
          (ee[50] = K),
          (ee[51] = Z))
        : (Z = ee[51]),
      ee[52] !== e_ || ee[53] !== er
        ? ((J = er(e_ ? "web.common.copied" : "web.coin.copy_mint_address")),
          (ee[52] = e_),
          (ee[53] = er),
          (ee[54] = J))
        : (J = ee[54]),
      ee[55] !== e_
        ? ((V = e_
            ? (0, t.jsx)(a.sX, {
                "aria-hidden": !0,
                className: "size-3.5 text-gain",
              })
            : (0, t.jsx)(a.xR, { "aria-hidden": !0, className: "size-3.5" })),
          (ee[55] = e_),
          (ee[56] = V))
        : (V = ee[56]),
      ee[57] !== eD || ee[58] !== J || ee[59] !== V
        ? ((X = (0, t.jsx)("button", {
            type: "button",
            onClick: eD,
            "aria-label": J,
            className: B,
            children: V,
          })),
          (ee[57] = eD),
          (ee[58] = J),
          (ee[59] = V),
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
              (0, t.jsx)(c.default, {
                href: ek,
                prefetch: em,
                ...eu,
                className: w,
                children: (0, t.jsx)(m.CoinAvatar, {
                  optimisticImage: !0,
                  coin: {
                    mint: ef.mint,
                    name: ef.name,
                    symbol: ef.symbol,
                    image_uri: ef.image_uri,
                    is_banned: ef.is_banned,
                    chain_id: ef.chain_id,
                    program: ef.program,
                    platform: ef.platform,
                    protocol: ef.protocol,
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
                      (0, t.jsx)(c.default, {
                        href: ek,
                        prefetch: em,
                        ...eu,
                        className: C,
                        children: (0, t.jsx)("h4", {
                          className:
                            "truncate text-[13px] font-medium leading-4 text-text-primary",
                          children: ej ?? (0, l.d)(ef.mint, 4, 4),
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
                    children: (0, l.d)(ef.mint, 4, 4),
                  }),
                ],
              }),
            ],
          }),
          A,
          F,
          eI
            ? (0, t.jsxs)("p", {
                className: (0, s.c)("mt-1 flex min-w-0 items-center gap-1", E),
                "data-testid": "coin-hover-creator",
                children: [
                  (0, t.jsx)("span", {
                    className: "shrink-0",
                    children: er("web.coin.header_creator_by"),
                  }),
                  (0, t.jsx)(p.S, {
                    address: eI,
                    username: ef.username,
                    profileImage: ef.profile_image,
                    size: 16,
                    density: "terminal",
                    verified: "lookup",
                    hoverCard: !1,
                    href: (0, n.d)(eI, ef.username ?? void 0),
                    shallowProfileId: null,
                    className: "min-w-0",
                  }),
                ],
              })
            : null,
          W,
          Q,
          eB.length > 0
            ? (0, t.jsx)("div", {
                className: "mt-2 flex flex-wrap gap-1",
                "data-testid": "coin-hover-tags",
                children: eB.map(U),
              })
            : null,
          Y,
        ],
      })
    );
  }
  function U(e) {
    return (0, t.jsxs)(
      g.E,
      { density: "terminal", tone: e.tone, children: [e.icon, e.label] },
      e.key,
    );
  }
  function H(e) {
    let a,
      n,
      l,
      r,
      c,
      o = (0, i.c)(10),
      { label: d, value: h, loading: x } = e;
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, s.c)("flex h-6 items-center", E)), (o[0] = a))
        : (a = o[0]),
      o[1] !== d
        ? ((n = (0, t.jsx)("dt", { className: a, children: d })),
          (o[1] = d),
          (o[2] = n))
        : (n = o[2]),
      o[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, s.c)(
            "flex h-6 items-center justify-end",
            "min-w-0 text-right text-[13px] font-medium leading-4 tabular-nums text-text-primary",
          )),
          (o[3] = l))
        : (l = o[3]),
      o[4] !== x || o[5] !== h
        ? ((r = (0, t.jsx)("dd", {
            className: l,
            children: x
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className:
                    "inline-block h-3 w-12 animate-pulse rounded-sm bg-bg-tertiary align-middle",
                })
              : (0, t.jsx)("span", { className: "truncate", children: h }),
          })),
          (o[4] = x),
          (o[5] = h),
          (o[6] = r))
        : (r = o[6]),
      o[7] !== n || o[8] !== r
        ? ((c = (0, t.jsxs)(t.Fragment, { children: [n, r] })),
          (o[7] = n),
          (o[8] = r),
          (o[9] = c))
        : (c = o[9]),
      c
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
    T = (e) => !!(e.program || e.platform || e.protocol || e.chain_id),
    O = (e) => (0, C.T)(e, "brand-name"),
    z = (e, t) => {
      let i = (0, w.M)({
        mint: e.mint,
        chain_id: e.chain_id ?? void 0,
        program: e.program ?? void 0,
        platform: e.platform ?? void 0,
        protocol: e.protocol ?? void 0,
      });
      if ("launchpad" === i.kind)
        return t("web.coin.origin_launchpad_tooltip", {
          launchpad: O(i.launchpad.label),
          chain: F,
        });
      if ("solana" === i.kind)
        return t("web.coin.origin_chain_tooltip", { chain: F });
      if ("ton" === i.kind || "starknet" === i.kind) {
        let e = (0, f.z)(i.chainId, { includeTon: !0, includeStarknet: !0 });
        return e
          ? t("web.coin.origin_chain_tooltip", { chain: O(e.name) })
          : null;
      }
      let a =
        "near" === i.kind
          ? (0, f.z)(i.chainId, { includeNear: !0 })?.name
          : ((0, f.z)(i.chainId)?.name ?? (0, A.n)(i.chainId));
      if (!a) return null;
      let s = O(a),
        n = "near" === i.kind ? i.launchpad : i.launchpad?.label;
      return n
        ? t("web.coin.origin_launchpad_tooltip", { launchpad: O(n), chain: s })
        : i.venue
          ? t("web.coin.origin_venue_tooltip", { venue: O(i.venue), chain: s })
          : t("web.coin.origin_chain_tooltip", { chain: s });
    },
    q = ({ coin: e, isMigrated: i, t: s }) => {
      let n = [];
      return (
        e.is_currently_live &&
          n.push({
            key: "live",
            icon: (0, t.jsx)(a.UN, { "aria-hidden": !0 }),
            label: s("coin_details.live"),
            tone: "hot",
          }),
        ("active" === e.mayhem_state || "enabled" === e.mayhem_state) &&
          n.push({
            key: "mayhem",
            icon: (0, t.jsx)(a.iU, { "aria-hidden": !0 }),
            label: s("mayhem_mode.mayhem"),
            tone: "neutral",
          }),
        e.tokenized_agent &&
          n.push({
            key: "agent",
            icon: (0, t.jsx)(a.H5, { "aria-hidden": !0 }),
            label: s("web.coin.agent_badge"),
            tone: "neutral",
          }),
        e.is_charity &&
          n.push({
            key: "charity",
            icon: (0, t.jsx)(a.cJ, { "aria-hidden": !0 }),
            label: s("creator_fees.charity.label"),
            tone: "neutral",
          }),
        i &&
          n.push({
            key: "graduated",
            icon: (0, t.jsx)(a.SH, { "aria-hidden": !0 }),
            label: s("coin_details.boost.graduated_label"),
            tone: "neutral",
          }),
        n
      );
    };
  e.s([
    "f",
    0,
    function (e) {
      let a,
        s,
        n,
        l,
        c = (0, i.c)(20),
        {
          coin: d,
          liveMarketCap: h,
          tradeDirection: f,
          tradeFlashKey: m,
          href: u,
          openDelay: b,
          closeDelay: p,
          disabled: _,
          side: g,
          align: y,
          children: v,
        } = e,
        j = void 0 === b ? 140 : b,
        k = void 0 === p ? 120 : p,
        w = void 0 === g ? "top" : g,
        N = void 0 === y ? "center" : y,
        [C, A] = (0, o.useState)(!1);
      if (void 0 !== _ && _) {
        let e;
        return (
          c[0] !== v
            ? ((e = (0, t.jsx)(t.Fragment, { children: v })),
              (c[0] = v),
              (c[1] = e))
            : (e = c[1]),
          e
        );
      }
      c[2] !== v
        ? ((a = (0, t.jsx)(r.b, { asChild: !0, children: v })),
          (c[2] = v),
          (c[3] = a))
        : (a = c[3]);
      let F = h ?? null,
        E = f ?? null,
        S = m ?? 0;
      return (
        c[4] !== d ||
        c[5] !== u ||
        c[6] !== C ||
        c[7] !== F ||
        c[8] !== E ||
        c[9] !== S
          ? ((s = (0, t.jsx)(M, {
              coin: d,
              href: u,
              isOpen: C,
              liveMarketCap: F,
              tradeDirection: E,
              tradeFlashKey: S,
            })),
            (c[4] = d),
            (c[5] = u),
            (c[6] = C),
            (c[7] = F),
            (c[8] = E),
            (c[9] = S),
            (c[10] = s))
          : (s = c[10]),
        c[11] !== N || c[12] !== w || c[13] !== s
          ? ((n = (0, t.jsx)(r.P, {
              side: w,
              align: N,
              sideOffset: 8,
              collisionPadding: 12,
              className: x.C,
              "data-testid": "coin-hover-card",
              onClick: D,
              children: s,
            })),
            (c[11] = N),
            (c[12] = w),
            (c[13] = s),
            (c[14] = n))
          : (n = c[14]),
        c[15] !== k || c[16] !== j || c[17] !== n || c[18] !== a
          ? ((l = (0, t.jsxs)(r.c, {
              openDelay: j,
              closeDelay: k,
              onOpenChange: A,
              children: [a, n],
            })),
            (c[15] = k),
            (c[16] = j),
            (c[17] = n),
            (c[18] = a),
            (c[19] = l))
          : (l = c[19]),
        l
      );
    },
  ]);
};
