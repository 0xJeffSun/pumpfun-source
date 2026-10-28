// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(663628),
    i = e.i(188902),
    l = e.i(639374);
  let a = { wallet: (e, t) => ["walletMintTokenAccounts", e, t] };
  e.s([
    "b",
    0,
    a,
    "H",
    0,
    function (e) {
      let s,
        o,
        u,
        c,
        d,
        m,
        f,
        g = (0, t.c)(24),
        { owner: p, mint: h, enabled: y } = e,
        b = void 0 === y || y;
      g[0] !== b || g[1] !== h || g[2] !== p
        ? ((s = b && !!p && !!h && (0, l.f)(p ?? "") && (0, l.f)(h ?? "")),
          (g[0] = b),
          (g[1] = h),
          (g[2] = p),
          (g[3] = s))
        : (s = g[3]);
      let x = s;
      (g[4] !== h || g[5] !== p
        ? ((o = a.wallet(p ?? void 0, h ?? void 0)),
          (g[4] = h),
          (g[5] = p),
          (g[6] = o))
        : (o = g[6]),
        g[7] !== h || g[8] !== p
          ? ((u = async (e) => {
              let { signal: t } = e,
                n = await (0, r.G)({
                  owner: p,
                  mint: h,
                  endpoint: (0, i.L)(),
                  signal: t,
                });
              if (null === n)
                throw Error("getTokenAccountsByOwner read failed");
              return n;
            }),
            (g[7] = h),
            (g[8] = p),
            (g[9] = u))
          : (u = g[9]),
        g[10] !== x || g[11] !== o || g[12] !== u
          ? ((c = {
              queryKey: o,
              enabled: x,
              staleTime: 3e4,
              gcTime: 3e5,
              retry: 2,
              refetchOnWindowFocus: !1,
              queryFn: u,
            }),
            (g[10] = x),
            (g[11] = o),
            (g[12] = u),
            (g[13] = c))
          : (c = g[13]));
      let v = (0, n.useQuery)(c),
        w = v.data;
      g[14] !== w
        ? ((d =
            void 0 === w
              ? void 0
              : w.reduce(
                  (e, t) => e + ((0, r.Y)(t.amountRaw, t.decimals) ?? 0),
                  0,
                )),
          (g[14] = w),
          (g[15] = d))
        : (d = g[15]);
      let _ = x && v.isPending;
      return (
        g[16] !== v
          ? ((m = async () => {
              await v.refetch();
            }),
            (g[16] = v),
            (g[17] = m))
          : (m = g[17]),
        g[18] !== w ||
        g[19] !== v.dataUpdatedAt ||
        g[20] !== d ||
        g[21] !== _ ||
        g[22] !== m
          ? ((f = {
              accounts: w,
              totalUi: d,
              isPending: _,
              dataUpdatedAt: v.dataUpdatedAt,
              refetch: m,
            }),
            (g[18] = w),
            (g[19] = v.dataUpdatedAt),
            (g[20] = d),
            (g[21] = _),
            (g[22] = m),
            (g[23] = f))
          : (f = g[23]),
        f
      );
    },
  ]);
};
