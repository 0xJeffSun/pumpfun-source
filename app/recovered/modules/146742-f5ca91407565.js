// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var n = t.i(445242),
    i = t.i(944410),
    o = t.i(690877),
    e = t.i(38279),
    r = t.i(314197),
    a = t.i(711902),
    s = t.i(310717),
    l = t.i(959193);
  let z = (t, n) => (n || "creatorXFollowerCount" !== t ? t : void 0);
  t.s([
    "H",
    0,
    "OPEN,PENDING_RESOLUTION,CLOSED,IN_DISPUTE_PERIOD",
    "G",
    0,
    z,
    "Q",
    0,
    (t) => {
      let d,
        u,
        p = (0, n.c)(32),
        {
          q: m,
          creatorAddress: b,
          coinAddress: g,
          rewardMints: c,
          status: I,
          phase: y,
          expiresAtGte: A,
          expiresAtLte: S,
          rewardTotalUsdGte: f,
          rewardTotalUsdLte: h,
          likeCountGte: j,
          submissionCountGte: w,
          creatorXFollowerCountGte: E,
          sort: D,
          order: N,
          lat: C,
          lng: x,
          radiusKm: _,
          limit: k,
          cursor: O,
          includeBanned: R,
          listedOpenOnly: P,
          enabled: U,
          queryOptions: T,
        } = void 0 === t ? {} : t,
        L = void 0 !== P && P,
        v = void 0 === U || U,
        M = (0, i.useLivestreamApiClient)(),
        B = (0, r.f)(),
        V = z(D, B),
        F = B ? E : void 0,
        q = (0, s.f)(m),
        G =
          null != C &&
          null != x &&
          null != _ &&
          Number.isFinite(C) &&
          Number.isFinite(x) &&
          Number.isFinite(_),
        X = k ?? 50,
        W = Math.max(1, k ?? 50),
        H = y ?? (L ? l.d : void 0),
        $ = e.Q.BOUNTY_PUBLIC_LIST_V2({
          q: q,
          creatorAddress: b,
          coinAddress: g,
          rewardMints: c,
          status: I,
          phase: H,
          sort: V,
          order: N,
          limit: k,
          cursor: L ? void 0 : O,
          expiresAtGte: A,
          expiresAtLte: S,
          rewardTotalUsdGte: f,
          rewardTotalUsdLte: h,
          likeCountGte: j,
          submissionCountGte: w,
          creatorXFollowerCountGte: F,
          includeBanned: R,
          listedOpenOnly: !!L || void 0,
          ...(G ? { lat: C, lng: x, radiusKm: _ } : {}),
        });
      return (
        p[0] !== M ||
        p[1] !== q ||
        p[2] !== g ||
        p[3] !== b ||
        p[4] !== F ||
        p[5] !== O ||
        p[6] !== H ||
        p[7] !== A ||
        p[8] !== S ||
        p[9] !== G ||
        p[10] !== R ||
        p[11] !== C ||
        p[12] !== j ||
        p[13] !== k ||
        p[14] !== L ||
        p[15] !== x ||
        p[16] !== N ||
        p[17] !== W ||
        p[18] !== _ ||
        p[19] !== c ||
        p[20] !== f ||
        p[21] !== h ||
        p[22] !== V ||
        p[23] !== I ||
        p[24] !== w ||
        p[25] !== X
          ? ((d = async () => {
              let t,
                n = {};
              if (
                (q && q.length > 0 && (n.q = q),
                b && (n.creatorAddress = b),
                g && (n.coinAddress = g),
                c && c.length > 0 && (n.rewardMints = c.join(",")),
                I && (n.status = I),
                H && (n.phase = H),
                A && (n.expiresAtGte = A),
                S && (n.expiresAtLte = S),
                null != f && (n.rewardTotalUsdGte = String(f)),
                null != h && (n.rewardTotalUsdLte = String(h)),
                null != j && (n.likeCountGte = String(j)),
                null != w && (n.submissionCountGte = String(w)),
                null != F && (n.creatorXFollowerCountGte = String(F)),
                R && (n.includeBanned = "true"),
                V && (n.sort = V),
                N && (n.order = N),
                G &&
                  ((n.lat = String(C)),
                  (n.lng = String(x)),
                  (n.radiusKm = String(_))),
                !L)
              ) {
                let t = { ...n };
                (null != k && (t.limit = String(k)),
                  null != O && "" !== O && (t.cursor = O));
                let i = await M.get("bounties/v2/tasks", {
                  searchParams: t,
                }).json();
                return a.L.parse(i);
              }
              let i = [];
              for (let o = 0; o < l.P; o++) {
                let o = { ...n, limit: String(W), ...(t ? { cursor: t } : {}) },
                  e = await M.get("bounties/v2/tasks", {
                    searchParams: o,
                  }).json(),
                  r = a.L.parse(e);
                for (let t of r.items)
                  if ((0, l.S)(t) && (i.push(t), i.length >= X)) break;
                if (i.length >= X || !r.nextCursor) break;
                t = r.nextCursor;
              }
              return { items: i.slice(0, X) };
            }),
            (p[0] = M),
            (p[1] = q),
            (p[2] = g),
            (p[3] = b),
            (p[4] = F),
            (p[5] = O),
            (p[6] = H),
            (p[7] = A),
            (p[8] = S),
            (p[9] = G),
            (p[10] = R),
            (p[11] = C),
            (p[12] = j),
            (p[13] = k),
            (p[14] = L),
            (p[15] = x),
            (p[16] = N),
            (p[17] = W),
            (p[18] = _),
            (p[19] = c),
            (p[20] = f),
            (p[21] = h),
            (p[22] = V),
            (p[23] = I),
            (p[24] = w),
            (p[25] = X),
            (p[26] = d))
          : (d = p[26]),
        p[27] !== v || p[28] !== T || p[29] !== $ || p[30] !== d
          ? ((u = { enabled: v, queryKey: $, queryFn: d, ...T }),
            (p[27] = v),
            (p[28] = T),
            (p[29] = $),
            (p[30] = d),
            (p[31] = u))
          : (u = p[31]),
        (0, o.useQuery)(u)
      );
    },
  ]);
};
