// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(745018),
    n = e.i(426091),
    r = e.i(146695),
    l = e.i(365089),
    s = e.i(598883),
    o = e.i(458310),
    c = e.i(352386);
  e.i(12692);
  var d = e.i(398902),
    m = e.i(263889),
    u = e.i(833548),
    h = e.i(464649);
  e.i(12641);
  var p = e.i(34011),
    f = e.i(924631);
  e.i(84455);
  var x = e.i(678730);
  e.i(107240);
  var _ = e.i(693124),
    g = e.i(529841),
    y = e.i(908163),
    v = e.i(813792),
    b = e.i(997887),
    j = e.i(79395),
    k = e.i(850175),
    w = e.i(389270);
  e.i(267146);
  var N = e.i(540805),
    C = e.i(187611),
    S = e.i(605587);
  let A = (0, C.T)("Solana", "brand-name"),
    M = "text-[11px] font-normal leading-4 text-text-quaternary",
    T =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
    I = `inline-flex h-7 min-w-0 flex-1 items-center justify-center rounded-md bg-bg-tertiary px-2.5 text-[12px] font-medium leading-none text-text-primary transition-colors hover:bg-bg-tertiary/75 ${T}`,
    P = `inline-flex size-7 shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary ${T}`,
    z = (e) => e.stopPropagation();
  function D(e) {
    let s,
      u,
      h,
      y,
      w,
      C,
      S,
      A,
      z,
      D,
      O,
      H,
      U,
      R,
      K,
      $,
      W,
      J,
      V,
      G,
      Z,
      X,
      Y,
      ee = (0, a.c)(64),
      {
        coin: et,
        href: ea,
        isOpen: ei,
        liveMarketCap: en,
        tradeDirection: er,
        tradeFlashKey: el,
      } = e,
      { t: es } = (0, d.f)(),
      eo = et.chain_id ?? void 0,
      ec = ei && !!et.mint;
    (ee[0] !== ec
      ? ((s = { enabled: ec }), (ee[0] = ec), (ee[1] = s))
      : (s = ee[1]),
      ee[2] !== et.mint || ee[3] !== eo || ee[4] !== s
        ? ((u = { coinAddress: et.mint, chainId: eo, queryOptions: s }),
          (ee[2] = et.mint),
          (ee[3] = eo),
          (ee[4] = s),
          (ee[5] = u))
        : (u = ee[5]));
    let { data: ed, isLoading: em, isError: eu } = (0, j.f)(u),
      eh = q(et, ed ?? null),
      { prefetch: ep, hoverProps: ef } = (0, k.W)(ed ?? (0, k.e)(eh.mint)),
      ex = (0, m.f)({
        mint: eh.mint,
        program: eh.program ?? void 0,
        chain_id: eh.chain_id ?? void 0,
        protocol: eh.protocol ?? void 0,
        ath_market_cap: eh.ath_market_cap ?? void 0,
      }),
      e_ = ((e, t) => {
        let i,
          n,
          r,
          l = (0, a.c)(6),
          [s, o] = (0, c.useState)(0);
        if (
          (l[0] !== t || l[1] !== e
            ? ((i = () => {
                if (0 === e || !t) return;
                let a = setTimeout(() => o(e), 600);
                return () => clearTimeout(a);
              }),
              (n = [e, t]),
              (l[0] = t),
              (l[1] = e),
              (l[2] = i),
              (l[3] = n))
            : ((i = l[2]), (n = l[3])),
          (0, c.useEffect)(i, n),
          0 === e || !t || s === e)
        )
          return null;
        let d = "up" === t ? "buy" : "sell";
        return (
          l[4] !== d ? ((r = (0, x.F)(d)), (l[4] = d), (l[5] = r)) : (r = l[5]),
          r
        );
      })(el, er),
      [eg, ey] = (0, c.useState)(!1),
      ev = (0, f.W)(eh.symbol),
      eb = eh.name?.trim() || null,
      ej = eb ?? (ev ? `$${ev}` : null),
      ek = ea ?? `/coin/${eh.mint}`,
      ew = !!eh.complete || !!eh.raydium_pool,
      eN = (0, b.i)(eh.created_timestamp),
      eC = ((...e) => {
        for (let t of e)
          if ("number" == typeof t && Number.isFinite(t)) return t;
        return null;
      })(en, ed?.usd_market_cap, et.usd_market_cap),
      eS = null === en && null !== eC,
      eA = ex.athMarketCap > 0 ? ex.athMarketCap : null;
    ee[6] !== et || ee[7] !== ed
      ? ((h = ed ?? (B(et) ? et : null)),
        (ee[6] = et),
        (ee[7] = ed),
        (ee[8] = h))
      : (h = ee[8]);
    let eM = h;
    ee[9] !== eM || ee[10] !== es
      ? ((y = eM ? Q(eM, es) : null), (ee[9] = eM), (ee[10] = es), (ee[11] = y))
      : (y = ee[11]);
    let eT = y,
      eI =
        eh.creator && "11111111111111111111111111111111" !== eh.creator
          ? eh.creator
          : null,
      eP = E({ coin: eh, isMigrated: ew, t: es }),
      ez = async () => {
        try {
          (await navigator.clipboard.writeText(eh.mint),
            ey(!0),
            setTimeout(() => ey(!1), 2e3));
        } catch {}
      },
      eD =
        null === eC
          ? "—"
          : eS
            ? (0, t.jsx)(v.f, {
                content: es("web.coin.stale_market_cap_title"),
                density: "terminal",
                children: (0, t.jsx)("span", {
                  className: "text-text-secondary",
                  children: (0, N.l)(eC),
                }),
              })
            : (0, t.jsx)("span", {
                className: (0, n.c)("transition-colors", e_),
                children: (0, N.l)(eC),
              });
    (ee[12] === Symbol.for("react.memo_cache_sentinel")
      ? ((w = (0, n.c)("shrink-0 rounded-lg", T)), (ee[12] = w))
      : (w = ee[12]),
      ee[13] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = (0, n.c)("min-w-0 rounded-sm", T)), (ee[13] = C))
        : (C = ee[13]),
      ee[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "mt-2 border-t border-border-secondary",
          })),
          (ee[14] = S))
        : (S = ee[14]),
      ee[15] !== eT
        ? ((A = eT
            ? (0, t.jsx)("p", {
                className: (0, n.c)("mt-2 truncate", M),
                "data-testid": "coin-hover-origin",
                children: eT,
              })
            : null),
          (ee[15] = eT),
          (ee[16] = A))
        : (A = ee[16]),
      ee[17] !== es
        ? ((z = es("web.common.market_cap")), (ee[17] = es), (ee[18] = z))
        : (z = ee[18]));
    let eF = null === eC && em;
    (ee[19] !== eD || ee[20] !== z || ee[21] !== eF
      ? ((D = (0, t.jsx)(L, { label: z, loading: eF, value: eD })),
        (ee[19] = eD),
        (ee[20] = z),
        (ee[21] = eF),
        (ee[22] = D))
      : (D = ee[22]),
      ee[23] !== es
        ? ((O = es("common.all_time_high_short")), (ee[23] = es), (ee[24] = O))
        : (O = ee[24]));
    let eL = null === eA && (em || ex.isLoading);
    (ee[25] !== eA
      ? ((H = null === eA ? "—" : (0, N.l)(eA)), (ee[25] = eA), (ee[26] = H))
      : (H = ee[26]),
      ee[27] !== O || ee[28] !== eL || ee[29] !== H
        ? ((U = (0, t.jsx)(L, { label: O, loading: eL, value: H })),
          (ee[27] = O),
          (ee[28] = eL),
          (ee[29] = H),
          (ee[30] = U))
        : (U = ee[30]),
      ee[31] !== es
        ? ((R = es("web.coin.created")), (ee[31] = es), (ee[32] = R))
        : (R = ee[32]));
    let eq = null === eN && em,
      eB = null === eN ? "—" : (0, t.jsx)(g.f, { timestamp: eN });
    return (
      ee[33] !== R || ee[34] !== eq || ee[35] !== eB
        ? ((K = (0, t.jsx)(L, { label: R, loading: eq, value: eB })),
          (ee[33] = R),
          (ee[34] = eq),
          (ee[35] = eB),
          (ee[36] = K))
        : (K = ee[36]),
      ee[37] !== D || ee[38] !== U || ee[39] !== K
        ? (($ = (0, t.jsxs)("dl", {
            className: "mt-1 grid grid-cols-[auto_1fr] items-center gap-x-3",
            "data-testid": "coin-hover-stats",
            children: [D, U, K],
          })),
          (ee[37] = D),
          (ee[38] = U),
          (ee[39] = K),
          (ee[40] = $))
        : ($ = ee[40]),
      ee[41] !== ed || ee[42] !== eu || ee[43] !== es
        ? ((W =
            eu && void 0 === ed
              ? (0, t.jsx)("p", {
                  className: (0, n.c)("mt-1 text-right", M),
                  "data-testid": "coin-hover-error",
                  children: es("web.coin.content_unavailable"),
                })
              : null),
          (ee[41] = ed),
          (ee[42] = eu),
          (ee[43] = es),
          (ee[44] = W))
        : (W = ee[44]),
      ee[45] !== es
        ? ((J = es("web.coin.view_coin")), (ee[45] = es), (ee[46] = J))
        : (J = ee[46]),
      ee[47] !== ek || ee[48] !== ef || ee[49] !== ep || ee[50] !== J
        ? ((V = (0, t.jsx)(o.default, {
            href: ek,
            prefetch: ep,
            ...ef,
            className: I,
            children: J,
          })),
          (ee[47] = ek),
          (ee[48] = ef),
          (ee[49] = ep),
          (ee[50] = J),
          (ee[51] = V))
        : (V = ee[51]),
      ee[52] !== eg || ee[53] !== es
        ? ((G = es(eg ? "web.common.copied" : "web.coin.copy_mint_address")),
          (ee[52] = eg),
          (ee[53] = es),
          (ee[54] = G))
        : (G = ee[54]),
      ee[55] !== eg
        ? ((Z = eg
            ? (0, t.jsx)(i.sX, {
                "aria-hidden": !0,
                className: "size-3.5 text-gain",
              })
            : (0, t.jsx)(i.xR, { "aria-hidden": !0, className: "size-3.5" })),
          (ee[55] = eg),
          (ee[56] = Z))
        : (Z = ee[56]),
      ee[57] !== ez || ee[58] !== G || ee[59] !== Z
        ? ((X = (0, t.jsx)("button", {
            type: "button",
            onClick: ez,
            "aria-label": G,
            className: P,
            children: Z,
          })),
          (ee[57] = ez),
          (ee[58] = G),
          (ee[59] = Z),
          (ee[60] = X))
        : (X = ee[60]),
      ee[61] !== V || ee[62] !== X
        ? ((Y = (0, t.jsxs)("div", {
            className: "mt-2 flex items-center gap-2",
            "data-testid": "coin-hover-actions",
            children: [V, X],
          })),
          (ee[61] = V),
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
                href: ek,
                prefetch: ep,
                ...ef,
                className: w,
                children: (0, t.jsx)(p.CoinAvatar, {
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
                        href: ek,
                        prefetch: ep,
                        ...ef,
                        className: C,
                        children: (0, t.jsx)("h4", {
                          className:
                            "truncate text-[13px] font-medium leading-4 text-text-primary",
                          children: ej ?? (0, l.d)(eh.mint, 4, 4),
                        }),
                      }),
                      eb && ev
                        ? (0, t.jsxs)("span", {
                            className:
                              "shrink-0 text-[11px] leading-4 text-text-quaternary",
                            children: ["$", ev],
                          })
                        : null,
                    ],
                  }),
                  (0, t.jsx)("p", {
                    className:
                      "truncate font-mono text-[11px] font-normal leading-4 text-text-quaternary",
                    children: (0, l.d)(eh.mint, 4, 4),
                  }),
                ],
              }),
            ],
          }),
          S,
          A,
          eI
            ? (0, t.jsxs)("p", {
                className: (0, n.c)("mt-1 flex min-w-0 items-center gap-1", M),
                "data-testid": "coin-hover-creator",
                children: [
                  (0, t.jsx)("span", {
                    className: "shrink-0",
                    children: es("web.coin.header_creator_by"),
                  }),
                  (0, t.jsx)(_.S, {
                    address: eI,
                    username: eh.username,
                    profileImage: eh.profile_image,
                    size: 16,
                    density: "terminal",
                    verified: "lookup",
                    hoverCard: !1,
                    href: (0, r.d)(eI, eh.username ?? void 0),
                    shallowProfileId: null,
                    className: "min-w-0",
                  }),
                ],
              })
            : null,
          $,
          W,
          eP.length > 0
            ? (0, t.jsx)("div", {
                className: "mt-2 flex flex-wrap gap-1",
                "data-testid": "coin-hover-tags",
                children: eP.map(F),
              })
            : null,
          Y,
        ],
      })
    );
  }
  function F(e) {
    return (0, t.jsxs)(
      y.E,
      { density: "terminal", tone: e.tone, children: [e.icon, e.label] },
      e.key,
    );
  }
  function L(e) {
    let i,
      r,
      l,
      s,
      o,
      c = (0, a.c)(10),
      { label: d, value: m, loading: u } = e;
    return (
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, n.c)("flex h-6 items-center", M)), (c[0] = i))
        : (i = c[0]),
      c[1] !== d
        ? ((r = (0, t.jsx)("dt", { className: i, children: d })),
          (c[1] = d),
          (c[2] = r))
        : (r = c[2]),
      c[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, n.c)(
            "flex h-6 items-center justify-end",
            "min-w-0 text-right text-[13px] font-medium leading-4 tabular-nums text-text-primary",
          )),
          (c[3] = l))
        : (l = c[3]),
      c[4] !== u || c[5] !== m
        ? ((s = (0, t.jsx)("dd", {
            className: l,
            children: u
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className:
                    "inline-block h-3 w-12 animate-pulse rounded-sm bg-bg-tertiary align-middle",
                })
              : (0, t.jsx)("span", { className: "truncate", children: m }),
          })),
          (c[4] = u),
          (c[5] = m),
          (c[6] = s))
        : (s = c[6]),
      c[7] !== r || c[8] !== s
        ? ((o = (0, t.jsxs)(t.Fragment, { children: [r, s] })),
          (c[7] = r),
          (c[8] = s),
          (c[9] = o))
        : (o = c[9]),
      o
    );
  }
  let q = (e, t) => ({
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
    B = (e) => !!(e.program || e.platform || e.protocol || e.chain_id),
    O = (e) => (0, C.T)(e, "brand-name"),
    Q = (e, t) => {
      let a = (0, w.M)({
        mint: e.mint,
        chain_id: e.chain_id ?? void 0,
        program: e.program ?? void 0,
        platform: e.platform ?? void 0,
        protocol: e.protocol ?? void 0,
      });
      if ("launchpad" === a.kind)
        return t("web.coin.origin_launchpad_tooltip", {
          launchpad: O(a.launchpad.label),
          chain: A,
        });
      if ("solana" === a.kind)
        return t("web.coin.origin_chain_tooltip", { chain: A });
      if ("ton" === a.kind || "starknet" === a.kind) {
        let e = (0, h.z)(a.chainId, { includeTon: !0, includeStarknet: !0 });
        return e
          ? t("web.coin.origin_chain_tooltip", { chain: O(e.name) })
          : null;
      }
      let i =
        "near" === a.kind
          ? (0, h.z)(a.chainId, { includeNear: !0 })?.name
          : ((0, h.z)(a.chainId)?.name ?? (0, S.n)(a.chainId));
      if (!i) return null;
      let n = O(i),
        r = "near" === a.kind ? a.launchpad : a.launchpad?.label;
      return r
        ? t("web.coin.origin_launchpad_tooltip", { launchpad: O(r), chain: n })
        : a.venue
          ? t("web.coin.origin_venue_tooltip", { venue: O(a.venue), chain: n })
          : t("web.coin.origin_chain_tooltip", { chain: n });
    },
    E = ({ coin: e, isMigrated: a, t: n }) => {
      let r = [];
      return (
        e.is_currently_live &&
          r.push({
            key: "live",
            icon: (0, t.jsx)(i.UN, { "aria-hidden": !0 }),
            label: n("coin_details.live"),
            tone: "hot",
          }),
        ("active" === e.mayhem_state || "enabled" === e.mayhem_state) &&
          r.push({
            key: "mayhem",
            icon: (0, t.jsx)(i.iU, { "aria-hidden": !0 }),
            label: n("mayhem_mode.mayhem"),
            tone: "neutral",
          }),
        e.tokenized_agent &&
          r.push({
            key: "agent",
            icon: (0, t.jsx)(i.H5, { "aria-hidden": !0 }),
            label: n("web.coin.agent_badge"),
            tone: "neutral",
          }),
        e.is_charity &&
          r.push({
            key: "charity",
            icon: (0, t.jsx)(i.cJ, { "aria-hidden": !0 }),
            label: n("creator_fees.charity.label"),
            tone: "neutral",
          }),
        a &&
          r.push({
            key: "graduated",
            icon: (0, t.jsx)(i.SH, { "aria-hidden": !0 }),
            label: n("coin_details.boost.graduated_label"),
            tone: "neutral",
          }),
        r
      );
    };
  e.s([
    "f",
    0,
    function (e) {
      let i,
        n,
        r,
        l,
        o = (0, a.c)(20),
        {
          coin: d,
          liveMarketCap: m,
          tradeDirection: h,
          tradeFlashKey: p,
          href: f,
          openDelay: x,
          closeDelay: _,
          disabled: g,
          side: y,
          align: v,
          children: b,
        } = e,
        j = void 0 === x ? 140 : x,
        k = void 0 === _ ? 120 : _,
        w = void 0 === y ? "top" : y,
        N = void 0 === v ? "center" : v,
        [C, S] = (0, c.useState)(!1);
      if (void 0 !== g && g) {
        let e;
        return (
          o[0] !== b
            ? ((e = (0, t.jsx)(t.Fragment, { children: b })),
              (o[0] = b),
              (o[1] = e))
            : (e = o[1]),
          e
        );
      }
      o[2] !== b
        ? ((i = (0, t.jsx)(s.b, { asChild: !0, children: b })),
          (o[2] = b),
          (o[3] = i))
        : (i = o[3]);
      let A = m ?? null,
        M = h ?? null,
        T = p ?? 0;
      return (
        o[4] !== d ||
        o[5] !== f ||
        o[6] !== C ||
        o[7] !== A ||
        o[8] !== M ||
        o[9] !== T
          ? ((n = (0, t.jsx)(D, {
              coin: d,
              href: f,
              isOpen: C,
              liveMarketCap: A,
              tradeDirection: M,
              tradeFlashKey: T,
            })),
            (o[4] = d),
            (o[5] = f),
            (o[6] = C),
            (o[7] = A),
            (o[8] = M),
            (o[9] = T),
            (o[10] = n))
          : (n = o[10]),
        o[11] !== N || o[12] !== w || o[13] !== n
          ? ((r = (0, t.jsx)(s.P, {
              side: w,
              align: N,
              sideOffset: 8,
              collisionPadding: 12,
              className: u.C,
              "data-testid": "coin-hover-card",
              onClick: z,
              children: n,
            })),
            (o[11] = N),
            (o[12] = w),
            (o[13] = n),
            (o[14] = r))
          : (r = o[14]),
        o[15] !== k || o[16] !== j || o[17] !== r || o[18] !== i
          ? ((l = (0, t.jsxs)(s.c, {
              openDelay: j,
              closeDelay: k,
              onOpenChange: S,
              children: [i, r],
            })),
            (o[15] = k),
            (o[16] = j),
            (o[17] = r),
            (o[18] = i),
            (o[19] = l))
          : (l = o[19]),
        l
      );
    },
  ]);
};
