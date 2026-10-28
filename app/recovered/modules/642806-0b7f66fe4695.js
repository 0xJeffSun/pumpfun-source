// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386),
    r = e.i(363250),
    i = e.i(653805),
    s = e.i(32850),
    o = e.i(242663);
  function d(e, t) {
    let r = (0, n.useRef)({ key: t, value: e });
    return (
      r.current.key !== t && (r.current = { key: t, value: e }),
      r.current.value
    );
  }
  function a(e) {
    return { id: e, mint: e, name: e, symbol: e.slice(0, 4), imageUri: "" };
  }
  e.s([
    "g",
    0,
    (e) => {
      let t = [];
      for (let n of e.rewardBreakdown) {
        let e = n.token?.mint;
        e && t.push({ mintAddress: e, humanAmount: n.amount });
      }
      return {
        legs: t,
        rewardTotalUsd: e.rewardTotalUsd,
        rewardLegsUsd: e.rewardLegsUsd,
      };
    },
    "V",
    0,
    (e) => {
      let n,
        u,
        l,
        m,
        c,
        f,
        w,
        p,
        b,
        A,
        h,
        g,
        y,
        S = (0, t.c)(27);
      S[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = {}), (S[0] = n))
        : (n = S[0]);
      let { data: U } = (0, r.f)(n),
        $ = e.legs;
      if (S[1] !== e.legs) {
        let t;
        ((u =
          0 === (t = e.legs).length
            ? ""
            : t
                .map((e) => `${e.mintAddress}\x1f${e.humanAmount}`)
                .join("\x1e")),
          (S[1] = e.legs),
          (S[2] = u));
      } else u = S[2];
      let k = d($, u),
        v = e.rewardLegsUsd;
      if (S[3] !== e.rewardLegsUsd) {
        let t;
        ((l =
          null == (t = e.rewardLegsUsd)
            ? "null"
            : `len:${t.length}:${t.map((e) => `${e.mintAddress}\x1f${e.usdValue}\x1f${e.priceUsd}\x1f${+!!e.priced}`).join("\x1e")}`),
          (S[3] = e.rewardLegsUsd),
          (S[4] = l));
      } else l = S[4];
      let D = d(v, l);
      if (S[5] !== k) {
        let e = new Set();
        for (let t of k)
          t.mintAddress !== s.f &&
            t.mintAddress !== s.n &&
            e.add(t.mintAddress);
        ((m = [...e].map(a)), (S[5] = k), (S[6] = m));
      } else m = S[6];
      let I = m,
        { liveTokens: T } = (0, o.f)(I);
      if (S[7] !== k) {
        let e = new Set();
        for (let t of k) {
          let n = t.mintAddress;
          n && n !== s.f && n !== s.n && e.add(n);
        }
        ((c = [...e].sort()), (S[7] = k), (S[8] = c));
      } else c = S[8];
      let C = c,
        N = (0, i.k)(C);
      if (
        (S[9] !== N || S[10] !== C
          ? ((f = new Map()),
            C.forEach((e, t) => {
              f.set(e, N[t]);
            }),
            (S[9] = N),
            (S[10] = C),
            (S[11] = f))
          : (f = S[11]),
        S[12] !== f || S[13] !== T || S[14] !== U || S[15] !== k || S[16] !== D)
      ) {
        let e = ((e) => {
          let t = new Map();
          for (let n of e ?? []) t.set(n.mintAddress, n);
          return t;
        })(D);
        for (let t of ((b = []), (h = 0), (p = 0), (A = 0), (w = 0), k)) {
          let { mintAddress: n, humanAmount: r } = t;
          w += 1;
          let i = e.get(n);
          if (n === s.f) {
            if ("number" == typeof U && U > 0) {
              let e = r * U;
              (b.push({
                mintAddress: n,
                usdValue: e,
                priceUsd: U,
                priced: !0,
                tokenAmount: r,
              }),
                (h += e),
                (p += 1),
                (A += 1));
              continue;
            }
            if (i?.priced) {
              (b.push({
                mintAddress: n,
                usdValue: i.usdValue,
                priceUsd: i.priceUsd,
                priced: !0,
                tokenAmount: r,
              }),
                (h += i.usdValue),
                (A += 1));
              continue;
            }
            b.push({
              mintAddress: n,
              usdValue: 0,
              priceUsd: 0,
              priced: !1,
              tokenAmount: r,
            });
            continue;
          }
          if (n === s.n) {
            (b.push({
              mintAddress: n,
              usdValue: r,
              priceUsd: 1,
              priced: !0,
              tokenAmount: r,
            }),
              (h += r),
              (p += 1),
              (A += 1));
            continue;
          }
          let o = f.get(n)?.priceUsd,
            d = T.get(n),
            a = "number" == typeof o && o > 0 ? o : (d?.livePriceUsd ?? 0);
          if (a > 0) {
            let e = r * a;
            (b.push({
              mintAddress: n,
              usdValue: e,
              priceUsd: a,
              priced: !0,
              tokenAmount: r,
            }),
              (h += e),
              (p += 1),
              (A += 1));
            continue;
          }
          if (i?.priced) {
            (b.push({
              mintAddress: n,
              usdValue: i.usdValue,
              priceUsd: i.priceUsd,
              priced: !0,
              tokenAmount: r,
            }),
              (h += i.usdValue),
              (A += 1));
            continue;
          }
          b.push({
            mintAddress: n,
            usdValue: 0,
            priceUsd: 0,
            priced: !1,
            tokenAmount: r,
          });
        }
        ((S[12] = f),
          (S[13] = T),
          (S[14] = U),
          (S[15] = k),
          (S[16] = D),
          (S[17] = w),
          (S[18] = p),
          (S[19] = b),
          (S[20] = A),
          (S[21] = h));
      } else ((w = S[17]), (p = S[18]), (b = S[19]), (A = S[20]), (h = S[21]));
      let M = null == e.rewardTotalUsd && null == D;
      return (
        (g =
          0 === A
            ? "unpriced"
            : p === w
              ? "live"
              : 0 === p
                ? "snapshot"
                : "mixed"),
        S[22] !== M || S[23] !== b || S[24] !== g || S[25] !== h
          ? ((y = { totalUsd: h, perLeg: b, source: g, isSnapshotAbsent: M }),
            (S[22] = M),
            (S[23] = b),
            (S[24] = g),
            (S[25] = h),
            (S[26] = y))
          : (y = S[26]),
        y
      );
    },
  ]);
};
