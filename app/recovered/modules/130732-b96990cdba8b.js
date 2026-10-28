// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    r = e.i(913719),
    n = e.i(946985),
    i = e.i(605587);
  let l = /^native:(\d+)$/,
    a = /^0x[0-9a-fA-F]{40}$/,
    s = (e, r) =>
      null != e && (0, n.Z)(r).some((t) => t.id === e)
        ? ((0, t.findChainByEvmChainId)(e) ?? null)
        : null,
    o = (e) =>
      (0, n.Z)(e)
        .map((e) => (0, t.findChainByEvmChainId)(e.id))
        .filter((e) => void 0 !== e)
        .filter((e) => null !== e.evmChainId),
    c = (e) => (0, i.n)(e.caip2) ?? e.displayName,
    u = (e) => {
      if (null == e || "" === e) return null;
      let t = "number" == typeof e ? e : Number(e);
      return Number.isFinite(t) ? t : null;
    },
    d = (e, t) => `${e}:${t.toLowerCase()}`,
    m = (e, t) => ({
      id: `${t}:native`,
      chainId: t,
      chainSlug: e.slug,
      chainName: c(e),
      contract: null,
      isNative: !0,
      symbol: e.nativeCurrency.symbol,
      name: e.nativeCurrency.name,
      imageUri: null,
      decimals: e.nativeCurrency.decimals || 18,
      balanceRaw: null,
      balanceUi: 0,
      valueUsd: null,
      priceUsd: null,
    }),
    f = (e, t) => Number(e) / 10 ** t;
  e.s([
    "I",
    0,
    (e, t) => {
      let r = [];
      for (let n of e) {
        let e = u(n.network_id),
          i = s(e, t);
        if (!i || null === e) continue;
        let o = n.token_mint ?? "",
          f = u(n.balance) ?? 0,
          h = u(n.value),
          p = u(n.token_price);
        if (o.match(l)) {
          r.push({ ...m(i, e), balanceUi: f, valueUsd: h, priceUsd: p });
          continue;
        }
        if (!a.test(o) || f <= 0) continue;
        let g = u(n.decimals);
        r.push({
          id: d(e, o),
          chainId: e,
          chainSlug: i.slug,
          chainName: c(i),
          contract: o,
          isNative: !1,
          symbol: n.token_symbol?.trim() || "???",
          name: n.token_name?.trim() || o,
          imageUri: n.token_image?.trim() || null,
          decimals: null !== g && Number.isInteger(g) && g >= 0 ? g : 18,
          balanceRaw: null,
          balanceUi: f,
          valueUsd: h,
          priceUsd: p,
        });
      }
      return r;
    },
    "g",
    0,
    s,
    "N",
    0,
    o,
    "A",
    0,
    ({ chainStateHoldings: e, nativeBalances: t, exposure: r }) => {
      let n = [],
        i = [],
        l = new Set();
      for (let r of e) {
        if (!r.isNative) {
          i.push(r);
          continue;
        }
        l.add(r.chainId);
        let e = t.get(r.chainId);
        n.push(
          null == e
            ? r
            : {
                ...r,
                balanceRaw: e,
                balanceUi: f(e, r.decimals),
                valueUsd:
                  null === r.priceUsd
                    ? r.valueUsd
                    : r.priceUsd * f(e, r.decimals),
              },
        );
      }
      for (let e of o(r)) {
        let r = e.evmChainId;
        if (null === r || l.has(r)) continue;
        let i = t.get(r);
        null != i &&
          n.push({
            ...m(e, r),
            balanceRaw: i,
            balanceUi: f(i, e.nativeCurrency.decimals || 18),
          });
      }
      return [
        ...i,
        ...n.filter(
          (e) =>
            (null !== e.balanceRaw && e.balanceRaw > BigInt(0)) ||
            (null === e.balanceRaw && e.balanceUi > 0),
        ),
      ];
    },
    "s",
    0,
    (e, t) => {
      if (e <= BigInt(0)) return "0";
      let r = e.toString().padStart(t + 1, "0"),
        n = r.slice(0, r.length - t) || "0",
        i = r.slice(r.length - t).replace(/0+$/, "");
      return i ? `${n}.${i}` : n;
    },
    "S",
    0,
    f,
    "Z",
    0,
    d,
    "T",
    0,
    (e, t) =>
      !Number.isFinite(e) || e < 0
        ? null
        : (0, r.v)(
            ((e) => {
              let t = String(e);
              if (!/e/i.test(t)) return t;
              let [r = "0", n = "0"] = t.split(/e/i),
                [i = "0", l = ""] = r.split("."),
                a = `${i}${l}`,
                s = i.length + Number(n);
              return s <= 0
                ? `0.${"0".repeat(-s)}${a}`
                : s >= a.length
                  ? `${a}${"0".repeat(s - a.length)}`
                  : `${a.slice(0, s)}.${a.slice(s)}`;
            })(e),
            t,
          ),
  ]);
};
