// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(322315),
    r = e.i(254010),
    i = e.i(574472),
    l = e.i(761459),
    a = e.i(606933),
    o = e.i(352386),
    s = e.i(690877),
    u = e.i(175190),
    c = e.i(213618),
    d = e.i(500793),
    m = e.i(559015),
    f = e.i(605587);
  let p = [],
    h = (e) => ({ viewer: e, entries: {}, byMint: {} });
  var g = e.i(106411),
    y = e.i(85324),
    v = e.i(759257);
  async function b({ signal: e } = {}) {
    let { coins: t } = await (0, v.j)()("GET /followed-holders/coins", {
        query: { limit: 200, followedHoldersLimit: m.A },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: e,
        hooks: {
          afterResponse: [
            (e, t, n) => {
              if (!n.ok) throw new m.m(n.status);
            },
          ],
        },
      }),
      n = {};
    for (let e of t)
      n[(0, f.c)(e.mint)] = {
        holders: e.followed_holders.holders,
        totalCount: e.followed_holders.totalCount,
      };
    return n;
  }
  let w = (e, t) => e[(0, f.c)(t)] ?? null,
    x = (e, t) => {
      if (!t) return e;
      let n = !1,
        r = e.map((e) =>
          void 0 !== e.followed_holders
            ? e
            : ((n = !0), { ...e, followed_holders: w(t, e.mint) }),
        );
      return n ? r : e;
    },
    k = (e) => Object.keys(e).length >= 120,
    M = (e, t) =>
      t && 0 !== Object.keys(t).length ? (e ? { ...t, ...e } : t) : e,
    C = (e) => e.length > 0 && e.every((e) => void 0 !== e.followed_holders);
  e.s(
    ["m", 0, C, "d", 0, b, "k", 0, w, "I", 0, k, "t", 0, M, "a", 0, x],
    301179,
  );
  var I = e.i(779106);
  let S = [],
    N = (e) => {
      let n,
        r,
        l,
        a,
        v,
        b,
        w,
        x,
        C,
        N,
        j,
        _,
        U = (0, t.c)(36),
        { enabled: E, mints: T } = e,
        $ = (0, I.f)("followed-holder-coins"),
        R = E && null !== $,
        D = (0, y.q)(6e4, R);
      U[0] !== $
        ? ((n = ["callouts", "followed-holders", $, "coins"]),
          (U[0] = $),
          (U[1] = n))
        : (n = U[1]);
      let F = n;
      U[2] !== R || U[3] !== D || U[4] !== F
        ? ((r = {
            queryKey: F,
            queryFn: A,
            enabled: R,
            staleTime: 6e4,
            refetchInterval: D,
            retry: g.E,
          }),
          (U[2] = R),
          (U[3] = D),
          (U[4] = F),
          (U[5] = r))
        : (r = U[5]);
      let P = (0, s.useQuery)(r);
      (U[6] !== P
        ? ((l = { onSessionValid: () => void P.refetch() }),
          (U[6] = P),
          (U[7] = l))
        : (l = U[7]),
        (0, u.f)(P.error, m.X, "followed-holder-coins", l));
      let B = R ? P.data : void 0;
      U[8] !== B || U[9] !== T
        ? ((a = ((e, t) => {
            if (!e || !t) return "";
            let n = new Set();
            for (let r of t) {
              if (!r) continue;
              let t = (0, f.c)(r);
              Object.hasOwn(e, t) || n.add(t);
            }
            return Array.from(n).sort().join(",");
          })(B, T)),
          (U[8] = B),
          (U[9] = T),
          (U[10] = a))
        : (a = U[10]);
      let q = a,
        O = (0, o.useRef)(null),
        z = (0, o.useRef)(null),
        { refetch: W, dataUpdatedAt: L } = P;
      (U[11] !== R ||
      U[12] !== L ||
      U[13] !== B ||
      U[14] !== T ||
      U[15] !== W ||
      U[16] !== q ||
      U[17] !== $
        ? ((v = () => {
            if (!R || !B || !T || 0 === T.length) return;
            let e = "" === q ? [] : q.split(","),
              t = O.current;
            if (!t || t.viewer !== $) {
              O.current = { viewer: $, keys: new Set(e) };
              return;
            }
            let n = e.filter((e) => !t.keys.has(e));
            0 === n.length ||
              ((O.current = { viewer: $, keys: new Set([...t.keys, ...n]) }),
              null !== z.current ||
                (z.current = setTimeout(
                  () => {
                    ((z.current = null), W({ cancelRefetch: !1 }));
                  },
                  Math.max(0, L + 15e3 - Date.now()),
                )));
          }),
          (b = [R, B, T, q, $, L, W]),
          (U[11] = R),
          (U[12] = L),
          (U[13] = B),
          (U[14] = T),
          (U[15] = W),
          (U[16] = q),
          (U[17] = $),
          (U[18] = v),
          (U[19] = b))
        : ((v = U[18]), (b = U[19])),
        (0, o.useEffect)(v, b),
        U[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = () => () => {
              null !== z.current && clearTimeout(z.current);
            }),
            (x = []),
            (U[20] = w),
            (U[21] = x))
          : ((w = U[20]), (x = U[21])),
        (0, o.useEffect)(w, x));
      let V = T ?? S;
      (U[22] !== R || U[23] !== B || U[24] !== T
        ? ((C = R && void 0 !== T && void 0 !== B && k(B)),
          (U[22] = R),
          (U[23] = B),
          (U[24] = T),
          (U[25] = C))
        : (C = U[25]),
        U[26] !== B || U[27] !== V || U[28] !== C
          ? ((N = { mints: V, covered: B, enabled: C }),
            (U[26] = B),
            (U[27] = V),
            (U[28] = C),
            (U[29] = N))
          : (N = U[29]));
      let { fillByMint: Q } = ((e) => {
        let n,
          r,
          l,
          a,
          u,
          g,
          y,
          v,
          b,
          w,
          x,
          k,
          M = (0, t.c)(33),
          { mints: C, covered: I, enabled: S, settleMs: N } = e,
          A = void 0 === N ? d.S : N,
          { decodedJwt: j } = (0, i.F)();
        M[0] !== j?.address
          ? ((n = j?.address?.trim() || null), (M[0] = j?.address), (M[1] = n))
          : (n = M[1]);
        let _ = n,
          U = S && null !== _;
        M[2] !== _ ? ((r = () => h(_)), (M[2] = _), (M[3] = r)) : (r = M[3]);
        let [E, T] = (0, o.useState)(r),
          [$, R] = (0, o.useState)(p);
        (M[4] !== U || M[5] !== I || M[6] !== E || M[7] !== C || M[8] !== _
          ? ((l = () => {
              let e = U
                ? (({ mints: e, covered: t, fill: n, viewer: r, now: i }) => {
                    let l = new Set(),
                      a = [];
                    for (let o of e) {
                      if (!o) continue;
                      let e = (0, f.c)(o);
                      if (l.has(e) || (l.add(e), t && Object.hasOwn(t, e)))
                        continue;
                      let s = n.viewer === r ? n.entries[e] : void 0;
                      if (
                        (!s || !(i - s.fetchedAt < 6e4)) &&
                        (a.push(o), a.length >= 500)
                      )
                        break;
                    }
                    return a;
                  })({
                    mints: C,
                    covered: I,
                    fill: E,
                    viewer: _,
                    now: Date.now(),
                  })
                : p;
              R((t) =>
                t.length === e.length && t.every((t, n) => t === e[n]) ? t : e,
              );
            }),
            (a = [U, C, I, E, _]),
            (M[4] = U),
            (M[5] = I),
            (M[6] = E),
            (M[7] = C),
            (M[8] = _),
            (M[9] = l),
            (M[10] = a))
          : ((l = M[9]), (a = M[10])),
          (0, o.useEffect)(l, a),
          M[11] !== U || M[12] !== $ || M[13] !== A
            ? ((u = { mints: $, enabled: U, settleMs: A }),
              (M[11] = U),
              (M[12] = $),
              (M[13] = A),
              (M[14] = u))
            : (u = M[14]));
        let D = (0, d.m)(u);
        M[15] !== D
          ? ((g = "" === D ? p : D.split(",")), (M[15] = D), (M[16] = g))
          : (g = M[16]);
        let F = g;
        M[17] !== D || M[18] !== _
          ? ((y = ["callouts", "followed-holders", _, "fill", D]),
            (M[17] = D),
            (M[18] = _),
            (M[19] = y))
          : (y = M[19]);
        let P = y;
        M[20] !== F
          ? ((v = async (e) => {
              let { signal: t } = e;
              return {
                requested: F,
                rows: await (0, d.e)({
                  mints: [...F],
                  signal: t,
                  followedHoldersLimit: m.A,
                }),
              };
            }),
            (M[20] = F),
            (M[21] = v))
          : (v = M[21]);
        let B = U && F.length > 0;
        M[22] !== v || M[23] !== B || M[24] !== P
          ? ((b = {
              queryKey: P,
              queryFn: v,
              enabled: B,
              staleTime: 6e4,
              retry: d.Z,
            }),
            (M[22] = v),
            (M[23] = B),
            (M[24] = P),
            (M[25] = b))
          : (b = M[25]);
        let { data: q, dataUpdatedAt: O } = (0, s.useQuery)(b);
        (M[26] !== q || M[27] !== O || M[28] !== _
          ? ((w = () => {
              q &&
                T((e) =>
                  ((e, t, n, r) => {
                    let i = e.viewer === t ? e : h(t),
                      l = {};
                    for (let e of n.requested) l[(0, f.c)(e)] = null;
                    for (let e of n.rows)
                      "string" == typeof e.mint &&
                        0 !== e.mint.length &&
                        (l[(0, f.c)(e.mint)] = e.followed_holders ?? null);
                    let a = {
                        ...i.entries,
                        ...Object.fromEntries(
                          Object.entries(l).map(([e, t]) => [
                            e,
                            { facepile: t, fetchedAt: r },
                          ]),
                        ),
                      },
                      o = Object.fromEntries(
                        Object.entries(a).flatMap(([e, t]) =>
                          t.facepile && t.facepile.holders.length > 0
                            ? [[e, t.facepile]]
                            : [],
                        ),
                      );
                    return {
                      viewer: t,
                      entries: a,
                      byMint: (0, c.B)(i.byMint, o),
                    };
                  })(e, _, q, O),
                );
            }),
            (x = [q, O, _]),
            (M[26] = q),
            (M[27] = O),
            (M[28] = _),
            (M[29] = w),
            (M[30] = x))
          : ((w = M[29]), (x = M[30])),
          (0, o.useEffect)(w, x));
        let z = U && E.viewer === _ ? E.byMint : void 0;
        return (
          M[31] !== z
            ? ((k = { fillByMint: z }), (M[31] = z), (M[32] = k))
            : (k = M[32]),
          k
        );
      })(N);
      U[30] !== Q || U[31] !== B
        ? ((j = M(B, Q)), (U[30] = Q), (U[31] = B), (U[32] = j))
        : (j = U[32]);
      let G = j,
        H = void 0 !== G;
      return (
        U[33] !== G || U[34] !== H
          ? ((_ = { facepilesByMint: G, isLoaded: H }),
            (U[33] = G),
            (U[34] = H),
            (U[35] = _))
          : (_ = U[35]),
        _
      );
    };
  function A(e) {
    let { signal: t } = e;
    return b({ signal: t });
  }
  e.s(["f", 0, N], 839739);
  var j = e.i(541710),
    _ = e.i(231824);
  class U extends Error {
    status;
    constructor(e) {
      (super(`Failed to fetch trenches board: ${e}`),
        (this.name = "TrenchesBoardFetchError"),
        (this.status = e));
    }
  }
  let E = (e) => (t, n) => {
    if (n instanceof U && 429 === n.status) return !1;
    let r = e.getDefaultOptions().queries?.retry;
    return "function" == typeof r
      ? r(t, n)
      : "number" == typeof r
        ? t < r
        : "boolean" == typeof r
          ? r
          : t < 3;
  };
  async function T({ url: e, init: t }) {
    let n = await fetch(e, t);
    if (!n.ok) throw new U(n.status);
    return await n.json();
  }
  (e.s(["f", 0, E], 344005), e.s(["f", 0, T], 902178));
  var $ = e.i(491208),
    R = e.i(369091),
    D = e.i(583448),
    F = e.i(503774),
    P = e.i(493025);
  let B = { offset: 0 },
    q = [];
  async function O(
    {
      userId: e,
      pumpUserId: t,
      identity: n,
      offset: r,
      limit: i,
      board: l,
      window: a,
      chains: o,
      exposure: s,
      includeFollowedHolders: u,
    },
    c,
  ) {
    if (r >= D.y) return { coins: [], proStats: {} };
    let d = {
        limit: Math.min(i, D.y - r),
        offset: r,
        userId: e,
        pumpUserId: t,
        ...n,
        board: l,
        exposure: s,
        ...(a ? { window: a } : {}),
        ...(o?.length ? { chains: o } : {}),
        ...(u ? { includeFollowedHolders: u } : {}),
      },
      m = await T({
        url: (0, D.f)(d),
        init: {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          signal: c,
        },
      });
    return { coins: (0, D.$)(m, r), proStats: (0, F.Z)(m) };
  }
  function z(e) {
    return e.mint;
  }
  function W(e) {
    return e.mint;
  }
  function L(e) {
    return e.mint;
  }
  function V(e) {
    return e.pages;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          u,
          c,
          d,
          m,
          f,
          p,
          h,
          g,
          y,
          v,
          b,
          w,
          k,
          M,
          I,
          S,
          A,
          U,
          T,
          F,
          Q,
          G,
          H,
          K,
          Z,
          X = (0, t.c)(81);
        if (X[0] !== e) {
          let t = void 0 === e ? {} : e,
            { mode: n, enabled: r, paused: i } = t;
          ((d = void 0 === n ? "movers" : n),
            (u = void 0 === r || r),
            (m = void 0 !== i && i),
            (f = (c = "trending" === d) ? (t.window ?? $.L) : void 0),
            (p = (s = t.chains?.length ? t.chains : void 0)
              ? [...s].toSorted().join(",")
              : null),
            (X[0] = e),
            (X[1] = s),
            (X[2] = u),
            (X[3] = c),
            (X[4] = d),
            (X[5] = m),
            (X[6] = f),
            (X[7] = p));
        } else
          ((s = X[1]),
            (u = X[2]),
            (c = X[3]),
            (d = X[4]),
            (m = X[5]),
            (f = X[6]),
            (p = X[7]));
        let J = p,
          { ipfsPrefix: Y } = (0, R.useIpfsPrefix)(),
          { address: ee, userId: et } = (0, i.F)();
        X[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, _.f)()), (X[8] = h))
          : (h = X[8]);
        let en = h,
          er = ee || void 0,
          ei = et || void 0,
          el = (0, j.l)(),
          ea = (0, r.k)(n.D.WEB_BOARD_FACES_EMBEDDED) && !!er,
          eo = (0, a.useQueryClient)(),
          es = er ?? null,
          eu = ei ?? null,
          ec = f ?? null;
        X[9] !== J ||
        X[10] !== el.arbitrum ||
        X[11] !== el.megaeth ||
        X[12] !== el.near ||
        X[13] !== el.polygon ||
        X[14] !== el.starknet ||
        X[15] !== el.ton ||
        X[16] !== el.xlayer ||
        X[17] !== d ||
        X[18] !== es ||
        X[19] !== eu ||
        X[20] !== ec
          ? ((g = [
              "feed",
              "market-rail",
              d,
              es,
              eu,
              ec,
              el.megaeth,
              el.xlayer,
              el.polygon,
              el.arbitrum,
              el.ton,
              el.starknet,
              el.near,
              J,
            ]),
            (X[9] = J),
            (X[10] = el.arbitrum),
            (X[11] = el.megaeth),
            (X[12] = el.near),
            (X[13] = el.polygon),
            (X[14] = el.starknet),
            (X[15] = el.ton),
            (X[16] = el.xlayer),
            (X[17] = d),
            (X[18] = es),
            (X[19] = eu),
            (X[20] = ec),
            (X[21] = g))
          : (g = X[21]);
        let ed = g;
        (X[22] !== s ||
        X[23] !== el ||
        X[24] !== ea ||
        X[25] !== c ||
        X[26] !== d ||
        X[27] !== ei ||
        X[28] !== f ||
        X[29] !== er
          ? ((y = (e) => {
              let { pageParam: t, signal: n } = e;
              return O(
                {
                  userId: er,
                  pumpUserId: ei,
                  identity: en,
                  offset: t.offset,
                  limit: c ? 150 : 30,
                  board: d,
                  ...(f ? { window: f } : {}),
                  ...(s ? { chains: s } : {}),
                  exposure: el,
                  includeFollowedHolders: ea,
                },
                n,
              );
            }),
            (X[22] = s),
            (X[23] = el),
            (X[24] = ea),
            (X[25] = c),
            (X[26] = d),
            (X[27] = ei),
            (X[28] = f),
            (X[29] = er),
            (X[30] = y))
          : (y = X[30]),
          X[31] !== c
            ? ((v = (e, t, n) => {
                if (c || e.coins.length < 30) return;
                let r = n.offset + 30;
                if (!(r >= D.y)) return { offset: r };
              }),
              (X[31] = c),
              (X[32] = v))
            : (v = X[32]),
          X[33] !== eo ? ((b = E(eo)), (X[33] = eo), (X[34] = b)) : (b = X[34]),
          X[35] !== u ||
          X[36] !== b ||
          X[37] !== ed ||
          X[38] !== y ||
          X[39] !== v
            ? ((w = {
                queryKey: ed,
                queryFn: y,
                initialPageParam: B,
                getNextPageParam: v,
                enabled: u,
                staleTime: 2e4,
                retry: b,
                refetchInterval: 3e4,
                refetchIntervalInBackground: !1,
                refetchOnWindowFocus: !1,
                select: V,
              }),
              (X[35] = u),
              (X[36] = b),
              (X[37] = ed),
              (X[38] = y),
              (X[39] = v),
              (X[40] = w))
            : (w = X[40]));
        let em = (0, l.useInfiniteQuery)(w);
        if (X[41] !== Y || X[42] !== em.data) {
          let e = new Set();
          ((k = (em.data ?? []).map((t) => {
            let n = [];
            for (let r of (0, P.f)(t.coins, Y))
              !r?.mint || e.has(r.mint) || (e.add(r.mint), n.push(r));
            return n;
          })),
            (X[41] = Y),
            (X[42] = em.data),
            (X[43] = k));
        } else k = X[43];
        let ef = k;
        if (X[44] !== em.data) {
          M = {};
          let e = em.data ?? [];
          for (let t = e.length - 1; t >= 0; t -= 1)
            Object.assign(M, e[t]?.proStats);
          ((X[44] = em.data), (X[45] = M));
        } else M = X[45];
        let ep = M;
        X[46] !== ef[0]
          ? ((I = ef[0] ?? []), (X[46] = ef[0]), (X[47] = I))
          : (I = X[47]);
        let eh = I;
        X[48] !== ef
          ? ((S = ef.slice(1).flat()), (X[48] = ef), (X[49] = S))
          : (S = X[49]);
        let eg = S,
          ey = `${d}|${er ?? ""}|${ei ?? ""}|${f ?? ""}|${J ?? ""}`;
        X[50] !== ey
          ? ((A = { key: ey, rows: q }), (X[50] = ey), (X[51] = A))
          : (A = X[51]);
        let [ev, eb] = (0, o.useState)(A),
          ew = ev.key === ey ? ev.rows : q;
        (X[52] !== c ||
        X[53] !== ey ||
        X[54] !== eg ||
        X[55] !== m ||
        X[56] !== eh
          ? ((U = () => {
              eb((e) => {
                let t = e.key === ey ? e.rows : q;
                if (0 === t.length) return { key: ey, rows: [...eh, ...eg] };
                if (m) {
                  let n = new Set(t.map(L)),
                    r = eg.filter((e) => !n.has(e.mint));
                  return 0 === r.length ? e : { key: ey, rows: [...t, ...r] };
                }
                if (c) return { key: ey, rows: [...eh, ...eg] };
                let n = new Map();
                for (let e of [...eh, ...eg]) n.set(e.mint, e);
                let r = [];
                for (let e of t) {
                  let t = n.get(e.mint);
                  t && r.push(t);
                }
                let i = new Set(r.map(W));
                return {
                  key: ey,
                  rows: [
                    ...eh.filter((e) => !i.has(e.mint)),
                    ...r,
                    ...eg.filter((e) => !i.has(e.mint)),
                  ],
                };
              });
            }),
            (T = [c, ey, eh, eg, m]),
            (X[52] = c),
            (X[53] = ey),
            (X[54] = eg),
            (X[55] = m),
            (X[56] = eh),
            (X[57] = U),
            (X[58] = T))
          : ((U = X[57]), (T = X[58])),
          (0, o.useEffect)(U, T));
        let ex = ew.length > 0 ? ew : eh;
        X[59] !== ex
          ? ((F = ex.map(z)), (X[59] = ex), (X[60] = F))
          : (F = X[60]);
        let ek = F;
        X[61] !== ex ? ((Q = C(ex)), (X[61] = ex), (X[62] = Q)) : (Q = X[62]);
        let eM = Q,
          eC = !ea || (ex.length > 0 && !eM),
          eI = u && !!er && eC;
        X[63] !== ek || X[64] !== eI
          ? ((G = { enabled: eI, mints: ek }),
            (X[63] = ek),
            (X[64] = eI),
            (X[65] = G))
          : (G = X[65]);
        let { facepilesByMint: eS } = N(G);
        X[66] !== eS || X[67] !== ex
          ? ((H = x(ex, eS)), (X[66] = eS), (X[67] = ex), (X[68] = H))
          : (H = X[68]);
        let eN = H,
          { hasNextPage: eA, isFetchingNextPage: ej, fetchNextPage: e_ } = em;
        X[69] !== eA || X[70] !== ej || X[71] !== e_
          ? ((K = () => {
              eA && !ej && e_();
            }),
            (X[69] = eA),
            (X[70] = ej),
            (X[71] = e_),
            (X[72] = K))
          : (K = X[72]);
        let eU = K,
          eE = u && em.isPending,
          eT = em.isError && 0 === eN.length,
          e$ = !!eA;
        return (
          X[73] !== eN ||
          X[74] !== eU ||
          X[75] !== ej ||
          X[76] !== ep ||
          X[77] !== eE ||
          X[78] !== eT ||
          X[79] !== e$
            ? ((Z = {
                coins: eN,
                proStatsByMint: ep,
                isLoading: eE,
                isError: eT,
                hasNextPage: e$,
                isFetchingNextPage: ej,
                fetchNextPage: eU,
              }),
              (X[73] = eN),
              (X[74] = eU),
              (X[75] = ej),
              (X[76] = ep),
              (X[77] = eE),
              (X[78] = eT),
              (X[79] = e$),
              (X[80] = Z))
            : (Z = X[80]),
          Z
        );
      },
    ],
    56651,
  );
};
