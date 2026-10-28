// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    n = e.i(363250),
    i = e.i(653805),
    a = e.i(32850),
    o = e.i(242663);
  function s(e, t) {
    let n = (0, r.useRef)({ key: t, value: e });
    return (
      n.current.key !== t && (n.current = { key: t, value: e }),
      n.current.value
    );
  }
  function l(e) {
    return { id: e, mint: e, name: e, symbol: e.slice(0, 4), imageUri: "" };
  }
  e.s([
    "g",
    0,
    (e) => {
      let t = [];
      for (let r of e.rewardBreakdown) {
        let e = r.token?.mint;
        e && t.push({ mintAddress: e, humanAmount: r.amount });
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
      let r,
        d,
        u,
        m,
        c,
        f,
        p,
        h,
        g,
        w,
        y,
        b,
        x,
        $ = (0, t.c)(27);
      $[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = {}), ($[0] = r))
        : (r = $[0]);
      let { data: S } = (0, n.f)(r),
        A = e.legs;
      if ($[1] !== e.legs) {
        let t;
        ((d =
          0 === (t = e.legs).length
            ? ""
            : t
                .map((e) => `${e.mintAddress}\x1f${e.humanAmount}`)
                .join("\x1e")),
          ($[1] = e.legs),
          ($[2] = d));
      } else d = $[2];
      let N = s(A, d),
        v = e.rewardLegsUsd;
      if ($[3] !== e.rewardLegsUsd) {
        let t;
        ((u =
          null == (t = e.rewardLegsUsd)
            ? "null"
            : `len:${t.length}:${t.map((e) => `${e.mintAddress}\x1f${e.usdValue}\x1f${e.priceUsd}\x1f${+!!e.priced}`).join("\x1e")}`),
          ($[3] = e.rewardLegsUsd),
          ($[4] = u));
      } else u = $[4];
      let U = s(v, u);
      if ($[5] !== N) {
        let e = new Set();
        for (let t of N)
          t.mintAddress !== a.f &&
            t.mintAddress !== a.n &&
            e.add(t.mintAddress);
        ((m = [...e].map(l)), ($[5] = N), ($[6] = m));
      } else m = $[6];
      let D = m,
        { liveTokens: _ } = (0, o.f)(D);
      if ($[7] !== N) {
        let e = new Set();
        for (let t of N) {
          let r = t.mintAddress;
          r && r !== a.f && r !== a.n && e.add(r);
        }
        ((c = [...e].sort()), ($[7] = N), ($[8] = c));
      } else c = $[8];
      let j = c,
        F = (0, i.k)(j);
      if (
        ($[9] !== F || $[10] !== j
          ? ((f = new Map()),
            j.forEach((e, t) => {
              f.set(e, F[t]);
            }),
            ($[9] = F),
            ($[10] = j),
            ($[11] = f))
          : (f = $[11]),
        $[12] !== f || $[13] !== _ || $[14] !== S || $[15] !== N || $[16] !== U)
      ) {
        let e = ((e) => {
          let t = new Map();
          for (let r of e ?? []) t.set(r.mintAddress, r);
          return t;
        })(U);
        for (let t of ((g = []), (y = 0), (h = 0), (w = 0), (p = 0), N)) {
          let { mintAddress: r, humanAmount: n } = t;
          p += 1;
          let i = e.get(r);
          if (r === a.f) {
            if ("number" == typeof S && S > 0) {
              let e = n * S;
              (g.push({
                mintAddress: r,
                usdValue: e,
                priceUsd: S,
                priced: !0,
                tokenAmount: n,
              }),
                (y += e),
                (h += 1),
                (w += 1));
              continue;
            }
            if (i?.priced) {
              (g.push({
                mintAddress: r,
                usdValue: i.usdValue,
                priceUsd: i.priceUsd,
                priced: !0,
                tokenAmount: n,
              }),
                (y += i.usdValue),
                (w += 1));
              continue;
            }
            g.push({
              mintAddress: r,
              usdValue: 0,
              priceUsd: 0,
              priced: !1,
              tokenAmount: n,
            });
            continue;
          }
          if (r === a.n) {
            (g.push({
              mintAddress: r,
              usdValue: n,
              priceUsd: 1,
              priced: !0,
              tokenAmount: n,
            }),
              (y += n),
              (h += 1),
              (w += 1));
            continue;
          }
          let o = f.get(r)?.priceUsd,
            s = _.get(r),
            l = "number" == typeof o && o > 0 ? o : (s?.livePriceUsd ?? 0);
          if (l > 0) {
            let e = n * l;
            (g.push({
              mintAddress: r,
              usdValue: e,
              priceUsd: l,
              priced: !0,
              tokenAmount: n,
            }),
              (y += e),
              (h += 1),
              (w += 1));
            continue;
          }
          if (i?.priced) {
            (g.push({
              mintAddress: r,
              usdValue: i.usdValue,
              priceUsd: i.priceUsd,
              priced: !0,
              tokenAmount: n,
            }),
              (y += i.usdValue),
              (w += 1));
            continue;
          }
          g.push({
            mintAddress: r,
            usdValue: 0,
            priceUsd: 0,
            priced: !1,
            tokenAmount: n,
          });
        }
        (($[12] = f),
          ($[13] = _),
          ($[14] = S),
          ($[15] = N),
          ($[16] = U),
          ($[17] = p),
          ($[18] = h),
          ($[19] = g),
          ($[20] = w),
          ($[21] = y));
      } else ((p = $[17]), (h = $[18]), (g = $[19]), (w = $[20]), (y = $[21]));
      let M = null == e.rewardTotalUsd && null == U;
      return (
        (b =
          0 === w
            ? "unpriced"
            : h === p
              ? "live"
              : 0 === h
                ? "snapshot"
                : "mixed"),
        $[22] !== M || $[23] !== g || $[24] !== b || $[25] !== y
          ? ((x = { totalUsd: y, perLeg: g, source: b, isSnapshotAbsent: M }),
            ($[22] = M),
            ($[23] = g),
            ($[24] = b),
            ($[25] = y),
            ($[26] = x))
          : (x = $[26]),
        x
      );
    },
  ]);
};
