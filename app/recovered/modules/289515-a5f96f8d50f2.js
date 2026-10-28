// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(357500),
    r = e.i(426091),
    i = e.i(690877),
    l = e.i(85324),
    a = e.i(38279),
    s = e.i(399015),
    o = e.i(369091);
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
          m,
          f = (0, t.c)(18),
          {
            address: g,
            limit: p,
            offset: h,
            showDustCoin: y,
            refetchIntervalMs: b,
          } = e,
          { ipfsPrefix: x } = (0, o.useIpfsPrefix)(),
          v = (0, l.q)(b);
        f[0] !== g || f[1] !== x || f[2] !== p || f[3] !== h || f[4] !== y
          ? ((n = ["balances", g, p, h, y, x]),
            (s = async () => {
              let e = Math.max(Math.floor(h / p) + 1, 1),
                t = await fetch(
                  `${a.C.PROFILE}/balance/tokens/${g}?page=${e}&size=${p}`,
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
            (f[0] = g),
            (f[1] = x),
            (f[2] = p),
            (f[3] = h),
            (f[4] = y),
            (f[5] = n),
            (f[6] = s))
          : ((n = f[5]), (s = f[6]));
        let w = !!g && !!x;
        f[7] !== v || f[8] !== n || f[9] !== s || f[10] !== w
          ? ((u = {
              queryKey: n,
              queryFn: s,
              enabled: w,
              staleTime: 15e3,
              refetchInterval: v,
              refetchIntervalInBackground: !1,
            }),
            (f[7] = v),
            (f[8] = n),
            (f[9] = s),
            (f[10] = w),
            (f[11] = u))
          : (u = f[11]);
        let { data: _, isLoading: k, refetch: P } = (0, i.useQuery)(u);
        return (
          f[12] !== _ ? ((d = _ ?? []), (f[12] = _), (f[13] = d)) : (d = f[13]),
          f[14] !== P || f[15] !== k || f[16] !== d
            ? ((m = { balances: d, fetchBalances: P, isLoading: k }),
              (f[14] = P),
              (f[15] = k),
              (f[16] = d),
              (f[17] = m))
            : (m = f[17]),
          m
        );
      },
    ],
    289515,
  );
};
