// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    a = e.i(690877),
    i = e.i(352386),
    n = e.i(38279),
    l = e.i(759257);
  async function s(e) {
    let { fetchOptions: t } = e;
    return (0, l.j)()("GET /fees/me", {
      credentials: "include",
      ...t,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw Error(`Failed to fetch fee state (${r.status})`);
          },
        ],
      },
    });
  }
  var o = e.i(25572),
    c = e.i(998243);
  e.s(
    [
      "ReferrerWalletSync",
      0,
      function () {
        let e,
          l = (0, t.c)(2),
          { address: d, decodedJwt: u } = (0, r.F)(),
          m = u ? (d ?? "") : "";
        return (
          l[0] !== m
            ? ((e = { userAddress: m }), (l[0] = m), (l[1] = e))
            : (e = l[1]),
          !(function (e) {
            let r,
              l,
              d,
              u,
              m,
              f = (0, t.c)(12),
              { queryOptions: p, userAddress: h } = e,
              b = !!h;
            (f[0] !== h
              ? ((r = () => s({ userAddress: h })),
                (l = n.Q.FEES_ME({ userAddress: h })),
                (f[0] = h),
                (f[1] = r),
                (f[2] = l))
              : ((r = f[1]), (l = f[2])),
              f[3] !== p || f[4] !== b || f[5] !== r || f[6] !== l
                ? ((d = {
                    enabled: b,
                    queryFn: r,
                    queryKey: l,
                    staleTime: 3e5,
                    ...p,
                  }),
                  (f[3] = p),
                  (f[4] = b),
                  (f[5] = r),
                  (f[6] = l),
                  (f[7] = d))
                : (d = f[7]));
            let { data: x } = (0, a.useQuery)(d);
            (f[8] !== x || f[9] !== h
              ? ((u = () => {
                  x &&
                    h &&
                    (0, c.f)(() =>
                      (0, o.I)({
                        owner: h,
                        referrerWallet: x.referredByWallet,
                        feeBypassBps: x.feeBypass,
                        referrerFeeSplitBps: x.referredByFeeSplit,
                      }),
                    );
                }),
                (m = [x, h]),
                (f[8] = x),
                (f[9] = h),
                (f[10] = u),
                (f[11] = m))
              : ((u = f[10]), (m = f[11])),
              (0, i.useEffect)(u, m));
          })(e),
          null
        );
      },
    ],
    523752,
  );
};
