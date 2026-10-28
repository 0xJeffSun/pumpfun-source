// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(357500),
    r = e.i(426091),
    i = e.i(690877),
    a = e.i(85324),
    o = e.i(38279),
    s = e.i(399015),
    l = e.i(369091);
  let u = "native:",
    c = (e) => {
      let t,
        r,
        i =
          !Number.isSafeInteger(
            (r = (t = e.token_mint.toLowerCase()).startsWith(u)
              ? Number(t.slice(u.length))
              : (0, s.G)(t) && null != e.network_id
                ? Number(e.network_id)
                : 0 / 0),
          ) || r <= 0
            ? null
            : ((0, n.findChainByEvmChainId)(r)?.nativeCurrency ?? null);
      return i
        ? {
            name: e.token_name?.trim() || i.name,
            symbol: e.token_symbol?.trim() || i.symbol,
          }
        : { name: e.token_name ?? "Unknown", symbol: e.token_symbol ?? "" };
    };
  e.s(
    [
      "w",
      0,
      c,
      "W",
      0,
      (e) => {
        let n,
          s,
          u,
          d,
          f,
          h = (0, t.c)(18),
          {
            address: p,
            limit: m,
            offset: g,
            showDustCoin: y,
            refetchIntervalMs: b,
          } = e,
          { ipfsPrefix: x } = (0, l.useIpfsPrefix)(),
          v = (0, a.q)(b);
        h[0] !== p || h[1] !== x || h[2] !== m || h[3] !== g || h[4] !== y
          ? ((n = ["balances", p, m, g, y, x]),
            (s = async () => {
              let e = Math.max(Math.floor(g / m) + 1, 1),
                t = await fetch(
                  `${o.C.PROFILE}/balance/tokens/${p}?page=${e}&size=${m}`,
                );
              if (404 === t.status) return [];
              if (!t.ok)
                throw Error(`Failed to fetch balances: ${t.statusText}`);
              let n = await t.json(),
                i = 0.001 * !y;
              return (n?.data?.tokens ?? [])
                .filter(
                  (e) =>
                    ("number" == typeof e.value
                      ? e.value
                      : Number(e.value ?? 0)) >= i,
                )
                .map((e) => {
                  let t =
                      "number" == typeof e.balance
                        ? e.balance
                        : Number(e.balance ?? 0),
                    n =
                      "number" == typeof e.value
                        ? e.value
                        : Number(e.value ?? 0);
                  return {
                    address: e.token_mint,
                    balance: t,
                    image_uri: (0, r.r)(e.token_image ?? "", x),
                    mint: e.token_mint,
                    ...c(e),
                    value: n,
                  };
                });
            }),
            (h[0] = p),
            (h[1] = x),
            (h[2] = m),
            (h[3] = g),
            (h[4] = y),
            (h[5] = n),
            (h[6] = s))
          : ((n = h[5]), (s = h[6]));
        let w = !!p && !!x;
        h[7] !== v || h[8] !== n || h[9] !== s || h[10] !== w
          ? ((u = {
              queryKey: n,
              queryFn: s,
              enabled: w,
              staleTime: 15e3,
              refetchInterval: v,
              refetchIntervalInBackground: !1,
            }),
            (h[7] = v),
            (h[8] = n),
            (h[9] = s),
            (h[10] = w),
            (h[11] = u))
          : (u = h[11]);
        let { data: k, isLoading: P, refetch: S } = (0, i.useQuery)(u);
        return (
          h[12] !== k ? ((d = k ?? []), (h[12] = k), (h[13] = d)) : (d = h[13]),
          h[14] !== S || h[15] !== P || h[16] !== d
            ? ((f = { balances: d, fetchBalances: S, isLoading: P }),
              (h[14] = S),
              (h[15] = P),
              (h[16] = d),
              (h[17] = f))
            : (f = h[17]),
          f
        );
      },
    ],
    289515,
  );
};
