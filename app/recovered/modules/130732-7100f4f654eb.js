// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    n = e.i(913719),
    r = e.i(946985),
    i = e.i(605587);
  let l = /^native:(\d+)$/,
    a = /^0x[0-9a-fA-F]{40}$/,
    s = (e, n) =>
      null != e && (0, r.Z)(n).some((t) => t.id === e)
        ? ((0, t.findChainByEvmChainId)(e) ?? null)
        : null,
    o = (e) =>
      (0, r.Z)(e)
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
    h = (e, t) => Number(e) / 10 ** t;
  e.s([
    "I",
    0,
    (e, t) => {
      let n = [];
      for (let r of e) {
        let e = u(r.network_id),
          i = s(e, t);
        if (!i || null === e) continue;
        let o = r.token_mint ?? "",
          h = u(r.balance) ?? 0,
          f = u(r.value),
          p = u(r.token_price);
        if (o.match(l)) {
          n.push({ ...m(i, e), balanceUi: h, valueUsd: f, priceUsd: p });
          continue;
        }
        if (!a.test(o) || h <= 0) continue;
        let g = u(r.decimals);
        n.push({
          id: d(e, o),
          chainId: e,
          chainSlug: i.slug,
          chainName: c(i),
          contract: o,
          isNative: !1,
          symbol: r.token_symbol?.trim() || "???",
          name: r.token_name?.trim() || o,
          imageUri: r.token_image?.trim() || null,
          decimals: null !== g && Number.isInteger(g) && g >= 0 ? g : 18,
          balanceRaw: null,
          balanceUi: h,
          valueUsd: f,
          priceUsd: p,
        });
      }
      return n;
    },
    "g",
    0,
    s,
    "N",
    0,
    o,
    "A",
    0,
    ({ chainStateHoldings: e, nativeBalances: t, exposure: n }) => {
      let r = [],
        i = [],
        l = new Set();
      for (let n of e) {
        if (!n.isNative) {
          i.push(n);
          continue;
        }
        l.add(n.chainId);
        let e = t.get(n.chainId);
        r.push(
          null == e
            ? n
            : {
                ...n,
                balanceRaw: e,
                balanceUi: h(e, n.decimals),
                valueUsd:
                  null === n.priceUsd
                    ? n.valueUsd
                    : n.priceUsd * h(e, n.decimals),
              },
        );
      }
      for (let e of o(n)) {
        let n = e.evmChainId;
        if (null === n || l.has(n)) continue;
        let i = t.get(n);
        null != i &&
          r.push({
            ...m(e, n),
            balanceRaw: i,
            balanceUi: h(i, e.nativeCurrency.decimals || 18),
          });
      }
      return [
        ...i,
        ...r.filter(
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
      let n = e.toString().padStart(t + 1, "0"),
        r = n.slice(0, n.length - t) || "0",
        i = n.slice(n.length - t).replace(/0+$/, "");
      return i ? `${r}.${i}` : r;
    },
    "S",
    0,
    h,
    "Z",
    0,
    d,
    "T",
    0,
    (e, t) =>
      !Number.isFinite(e) || e < 0
        ? null
        : (0, n.v)(
            ((e) => {
              let t = String(e);
              if (!/e/i.test(t)) return t;
              let [n = "0", r = "0"] = t.split(/e/i),
                [i = "0", l = ""] = n.split("."),
                a = `${i}${l}`,
                s = i.length + Number(r);
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
