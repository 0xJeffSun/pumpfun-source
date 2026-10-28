// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    n = e.i(464649),
    r = e.i(834247);
  let i = (e) => (e.startsWith("0x") ? e.toLowerCase() : e);
  e.s(["f", 0, i], 582453);
  let a = (e) =>
      "native" === e || e.includes("/native") || e.startsWith("native:"),
    o = (e, t) =>
      !!t.createdMints?.has(i(e.coinMint)) ||
      (0, r.f)(t.creatorOf?.(e.coinMint), t.wallet);
  e.s(
    [
      "K",
      0,
      (e, t) =>
        (e.amountBoughtUsd ?? 0) > 0 ||
        (e.amountBought ?? 0) > 0 ||
        (void 0 !== t && o(e, t)),
      "P",
      0,
      a,
      "V",
      0,
      (e, t) =>
        !(a(e.coinMint) || (void 0 !== t && o(e, t))) &&
        !0 === e.potentialSpam &&
        !0 !== e.userMarkedNonSpam,
    ],
    699365,
  );
  var s = e.i(399015),
    l = e.i(460261);
  let u = "native:",
    c = (e) => `${u}${e}`,
    d = (e) => !0 === e.isNative || a(e.coinMint),
    f = { ETH: "ethereum", BNB: "bsc", MON: "monad", HYPE: "hyperevm" },
    h = (e) => {
      let r = (0, t.findChainByEvmChainId)(e);
      if (!r) return null;
      let i = (0, n.z)(String(e));
      if (!i) return null;
      let { name: a, symbol: o } = r.nativeCurrency,
        s = f[o];
      return {
        name: a,
        symbol: o,
        imageUri: s ? n.T[s] : i.src,
        chainName: i.name,
      };
    },
    p = new Set([1, 8453, 56, 4663, 57073, 5042, 999]),
    m = BigInt("2000000000000000");
  e.s(
    [
      "F",
      0,
      u,
      "d",
      0,
      (e) => null != e && p.has(e),
      "k",
      0,
      d,
      "J",
      0,
      (e, t) => {
        if (!0 !== e.isNative || !t || null == e.chainId) return !1;
        let n = h(e.chainId);
        return (
          !!n &&
          [n.name, n.symbol, n.chainName].some((e) =>
            e.toLowerCase().includes(t),
          )
        );
      },
      "A",
      0,
      h,
      "x",
      0,
      c,
      "D",
      0,
      ({ balance: e, balanceUsd: t, quoteUnavailable: n }) => {
        if (n || !Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t <= 0)
          return null;
        let r = t / e;
        return Number.isFinite(r) && r > 0 ? r : null;
      },
      "y",
      0,
      ({ token: e, chainId: t }) => ((0, s.G)(e) && t === l.a ? m : BigInt(0)),
      "U",
      0,
      (e) => `${e}:native`,
      "K",
      0,
      ({ balanceRaw: e, reserveRaw: t }) => (e > t ? e - t : BigInt(0)),
      "V",
      0,
      (e) => {
        if (!d(e) || null == e.chainId) return e;
        let t = c(e.chainId);
        return !0 === e.isNative && e.coinMint === t
          ? e
          : { ...e, coinMint: t, isNative: !0 };
      },
    ],
    670550,
  );
};
