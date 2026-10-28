// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(690877),
    i = e.i(38279),
    s = e.i(314197),
    a = e.i(711902),
    o = e.i(310717),
    l = e.i(959193);
  let u = (e, t) => (t || "creatorXFollowerCount" !== e ? e : void 0);
  e.s([
    "H",
    0,
    "OPEN,PENDING_RESOLUTION,CLOSED,IN_DISPUTE_PERIOD",
    "G",
    0,
    u,
    "Q",
    0,
    (e) => {
      let d,
        c,
        f = (0, t.c)(32),
        {
          q: m,
          creatorAddress: p,
          coinAddress: w,
          rewardMints: g,
          status: b,
          phase: h,
          expiresAtGte: v,
          expiresAtLte: y,
          rewardTotalUsdGte: x,
          rewardTotalUsdLte: S,
          likeCountGte: N,
          submissionCountGte: E,
          creatorXFollowerCountGte: j,
          sort: I,
          order: R,
          lat: A,
          lng: _,
          radiusKm: L,
          limit: T,
          cursor: O,
          includeBanned: D,
          listedOpenOnly: M,
          enabled: P,
          queryOptions: k,
        } = void 0 === e ? {} : e,
        U = void 0 !== M && M,
        C = void 0 === P || P,
        F = (0, r.useLivestreamApiClient)(),
        B = (0, s.f)(),
        G = u(I, B),
        $ = B ? j : void 0,
        K = (0, o.f)(m),
        q =
          null != A &&
          null != _ &&
          null != L &&
          Number.isFinite(A) &&
          Number.isFinite(_) &&
          Number.isFinite(L),
        X = T ?? 50,
        z = Math.max(1, T ?? 50),
        V = h ?? (U ? l.d : void 0),
        Q = i.Q.BOUNTY_PUBLIC_LIST_V2({
          q: K,
          creatorAddress: p,
          coinAddress: w,
          rewardMints: g,
          status: b,
          phase: V,
          sort: G,
          order: R,
          limit: T,
          cursor: U ? void 0 : O,
          expiresAtGte: v,
          expiresAtLte: y,
          rewardTotalUsdGte: x,
          rewardTotalUsdLte: S,
          likeCountGte: N,
          submissionCountGte: E,
          creatorXFollowerCountGte: $,
          includeBanned: D,
          listedOpenOnly: !!U || void 0,
          ...(q ? { lat: A, lng: _, radiusKm: L } : {}),
        });
      return (
        f[0] !== F ||
        f[1] !== K ||
        f[2] !== w ||
        f[3] !== p ||
        f[4] !== $ ||
        f[5] !== O ||
        f[6] !== V ||
        f[7] !== v ||
        f[8] !== y ||
        f[9] !== q ||
        f[10] !== D ||
        f[11] !== A ||
        f[12] !== N ||
        f[13] !== T ||
        f[14] !== U ||
        f[15] !== _ ||
        f[16] !== R ||
        f[17] !== z ||
        f[18] !== L ||
        f[19] !== g ||
        f[20] !== x ||
        f[21] !== S ||
        f[22] !== G ||
        f[23] !== b ||
        f[24] !== E ||
        f[25] !== X
          ? ((d = async () => {
              let e,
                t = {};
              if (
                (K && K.length > 0 && (t.q = K),
                p && (t.creatorAddress = p),
                w && (t.coinAddress = w),
                g && g.length > 0 && (t.rewardMints = g.join(",")),
                b && (t.status = b),
                V && (t.phase = V),
                v && (t.expiresAtGte = v),
                y && (t.expiresAtLte = y),
                null != x && (t.rewardTotalUsdGte = String(x)),
                null != S && (t.rewardTotalUsdLte = String(S)),
                null != N && (t.likeCountGte = String(N)),
                null != E && (t.submissionCountGte = String(E)),
                null != $ && (t.creatorXFollowerCountGte = String($)),
                D && (t.includeBanned = "true"),
                G && (t.sort = G),
                R && (t.order = R),
                q &&
                  ((t.lat = String(A)),
                  (t.lng = String(_)),
                  (t.radiusKm = String(L))),
                !U)
              ) {
                let e = { ...t };
                (null != T && (e.limit = String(T)),
                  null != O && "" !== O && (e.cursor = O));
                let r = await F.get("bounties/v2/tasks", {
                  searchParams: e,
                }).json();
                return a.L.parse(r);
              }
              let r = [];
              for (let n = 0; n < l.P; n++) {
                let n = { ...t, limit: String(z), ...(e ? { cursor: e } : {}) },
                  i = await F.get("bounties/v2/tasks", {
                    searchParams: n,
                  }).json(),
                  s = a.L.parse(i);
                for (let e of s.items)
                  if ((0, l.S)(e) && (r.push(e), r.length >= X)) break;
                if (r.length >= X || !s.nextCursor) break;
                e = s.nextCursor;
              }
              return { items: r.slice(0, X) };
            }),
            (f[0] = F),
            (f[1] = K),
            (f[2] = w),
            (f[3] = p),
            (f[4] = $),
            (f[5] = O),
            (f[6] = V),
            (f[7] = v),
            (f[8] = y),
            (f[9] = q),
            (f[10] = D),
            (f[11] = A),
            (f[12] = N),
            (f[13] = T),
            (f[14] = U),
            (f[15] = _),
            (f[16] = R),
            (f[17] = z),
            (f[18] = L),
            (f[19] = g),
            (f[20] = x),
            (f[21] = S),
            (f[22] = G),
            (f[23] = b),
            (f[24] = E),
            (f[25] = X),
            (f[26] = d))
          : (d = f[26]),
        f[27] !== C || f[28] !== k || f[29] !== Q || f[30] !== d
          ? ((c = { enabled: C, queryKey: Q, queryFn: d, ...k }),
            (f[27] = C),
            (f[28] = k),
            (f[29] = Q),
            (f[30] = d),
            (f[31] = c))
          : (c = f[31]),
        (0, n.useQuery)(c)
      );
    },
  ]);
};
