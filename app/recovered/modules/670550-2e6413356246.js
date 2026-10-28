// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    n = e.i(464649),
    i = e.i(834247);
  let r = (e) => (e.startsWith("0x") ? e.toLowerCase() : e);
  e.s(["f", 0, r], 582453);
  let l = (e) =>
      "native" === e || e.includes("/native") || e.startsWith("native:"),
    a = (e, t) =>
      !!t.createdMints?.has(r(e.coinMint)) ||
      (0, i.f)(t.creatorOf?.(e.coinMint), t.wallet);
  e.s(
    [
      "K",
      0,
      (e, t) =>
        (e.amountBoughtUsd ?? 0) > 0 ||
        (e.amountBought ?? 0) > 0 ||
        (void 0 !== t && a(e, t)),
      "P",
      0,
      l,
      "V",
      0,
      (e, t) =>
        !(l(e.coinMint) || (void 0 !== t && a(e, t))) &&
        !0 === e.potentialSpam &&
        !0 !== e.userMarkedNonSpam,
    ],
    699365,
  );
  var u = e.i(399015),
    o = e.i(460261);
  let s = "native:",
    d = (e) => `${s}${e}`,
    c = (e) => !0 === e.isNative || l(e.coinMint),
    f = { ETH: "ethereum", BNB: "bsc", MON: "monad", HYPE: "hyperevm" },
    m = (e) => {
      let i = (0, t.findChainByEvmChainId)(e);
      if (!i) return null;
      let r = (0, n.z)(String(e));
      if (!r) return null;
      let { name: l, symbol: a } = i.nativeCurrency,
        u = f[a];
      return {
        name: l,
        symbol: a,
        imageUri: u ? n.T[u] : r.src,
        chainName: r.name,
      };
    },
    p = new Set([1, 8453, 56, 4663, 57073, 5042, 999]),
    h = BigInt("2000000000000000");
  e.s(
    [
      "F",
      0,
      s,
      "d",
      0,
      (e) => null != e && p.has(e),
      "k",
      0,
      c,
      "J",
      0,
      (e, t) => {
        if (!0 !== e.isNative || !t || null == e.chainId) return !1;
        let n = m(e.chainId);
        return (
          !!n &&
          [n.name, n.symbol, n.chainName].some((e) =>
            e.toLowerCase().includes(t),
          )
        );
      },
      "A",
      0,
      m,
      "x",
      0,
      d,
      "D",
      0,
      ({ balance: e, balanceUsd: t, quoteUnavailable: n }) => {
        if (n || !Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t <= 0)
          return null;
        let i = t / e;
        return Number.isFinite(i) && i > 0 ? i : null;
      },
      "y",
      0,
      ({ token: e, chainId: t }) => ((0, u.G)(e) && t === o.a ? h : BigInt(0)),
      "U",
      0,
      (e) => `${e}:native`,
      "K",
      0,
      ({ balanceRaw: e, reserveRaw: t }) => (e > t ? e - t : BigInt(0)),
      "V",
      0,
      (e) => {
        if (!c(e) || null == e.chainId) return e;
        let t = d(e.chainId);
        return !0 === e.isNative && e.coinMint === t
          ? e
          : { ...e, coinMint: t, isNative: !0 };
      },
    ],
    670550,
  );
};
