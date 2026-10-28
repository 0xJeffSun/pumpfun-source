// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(576766),
    i = e.i(456647),
    s = e.i(462024),
    a = e.i(242663);
  function o(e) {
    let t = new Map(),
      r = (e) => {
        !e ||
          t.has(e) ||
          [s.i.SOL.mint, s.i.USDC.mint].includes(e) ||
          t.set(e, {
            id: e,
            mint: e,
            name: e,
            symbol: e.slice(0, 4),
            imageUri: "",
          });
      };
    for (let t of e)
      for (let e of (r(t.coinAddress), t.rewardLegs ?? [])) r(e.mintAddress);
    return [...t.values()];
  }
  e.s([
    "o",
    0,
    function (e) {
      let r,
        n = (0, t.c)(2);
      n[0] !== e ? ((r = o([...e])), (n[0] = e), (n[1] = r)) : (r = n[1]);
      let i = r;
      return (0, a.f)(i).liveTokens;
    },
    "E",
    0,
    function (e) {
      let s,
        l,
        u,
        d,
        c,
        f,
        m = (0, t.c)(21),
        { address: p } = (0, r.F)();
      m[0] !== e ? ((s = o(e)), (m[0] = e), (m[1] = s)) : (s = m[1]);
      let w = s,
        { liveTokens: g, isLoading: b } = (0, a.f)(w);
      m[2] !== e
        ? ((l = (function (e) {
            let t = new Set();
            for (let r of e) r.creatorAddress && t.add(r.creatorAddress);
            return [...t];
          })(e)),
          (m[2] = e),
          (m[3] = l))
        : (l = m[3]);
      let h = l;
      m[4] !== h
        ? ((u = { userAddresses: h }), (m[4] = h), (m[5] = u))
        : (u = m[5]);
      let { data: v, isPending: y } = (0, n.f)(u);
      if (m[6] !== v) {
        for (let e of ((d = new Map()), v ?? [])) d.set(e.address, e);
        ((m[6] = v), (m[7] = d));
      } else d = m[7];
      let x = d;
      if (m[8] !== g || m[9] !== e || m[10] !== x || m[11] !== p) {
        let t;
        (m[13] !== g || m[14] !== x || m[15] !== p
          ? ((t = (e) => {
              let t = e.coinAddress ? g.get(e.coinAddress) : void 0;
              return (0, i.m)(e, {
                creatorUser: x.get(e.creatorAddress),
                coinMeta: t
                  ? {
                      mint: t.mint,
                      name: t.liveName,
                      symbol: t.liveSymbol,
                      imageUri: t.liveImageUri,
                    }
                  : void 0,
                viewerAddress: p ?? void 0,
              });
            }),
            (m[13] = g),
            (m[14] = x),
            (m[15] = p),
            (m[16] = t))
          : (t = m[16]),
          (c = e.map(t)),
          (m[8] = g),
          (m[9] = e),
          (m[10] = x),
          (m[11] = p),
          (m[12] = c));
      } else c = m[12];
      let S = c,
        N = (h.length > 0 && y) || (w.length > 0 && b);
      return (
        m[17] !== S || m[18] !== N || m[19] !== g
          ? ((f = { bounties: S, liveTokens: g, isEnriching: N }),
            (m[17] = S),
            (m[18] = N),
            (m[19] = g),
            (m[20] = f))
          : (f = m[20]),
        f
      );
    },
  ]);
};
