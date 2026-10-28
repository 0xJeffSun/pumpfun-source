// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(352386),
    i = e.i(25572),
    l = e.i(690877),
    a = e.i(637782),
    s = e.i(613677),
    o = e.i(866890),
    u = e.i(342463),
    d = e.i(38279),
    c = e.i(503630);
  let m = a.z.number().int().min(0).max(1e4),
    p = s.z.object({
      protocol_bps: m,
      referrer_bps: m,
      reduced: s.z.object({
        protocol_bps: m,
        referrer_bps: m,
        mints: o.z.array(u.z.string()),
      }),
    });
  async function f() {
    let e = (0, c.e)().replace(/\/+$/, ""),
      t = await fetch(`${e}/referrals/fee-rates`, {
        signal: AbortSignal.timeout(15e3),
      });
    if (!t.ok) throw Error(`referral fee-rates request failed (${t.status})`);
    return p.parse(await t.json());
  }
  function _() {
    return null;
  }
  e.s(
    [
      "f",
      0,
      function (e, a) {
        let s,
          o,
          u,
          c = (0, t.c)(6),
          { address: m } = (0, r.F)(),
          p = (0, n.useSyncExternalStore)(i._, i.A, _),
          v =
            ((u = (0, t.c)(1))[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((o = {
                  queryKey: d.Q.REFERRAL_FEE_RATES,
                  queryFn: f,
                  staleTime: 6e5,
                  retry: 1,
                  refetchOnWindowFocus: !1,
                }),
                (u[0] = o))
              : (o = u[0]),
            (0, l.useQuery)(o).data),
          g = m ?? void 0;
        return (
          c[0] !== p || c[1] !== e || c[2] !== v || c[3] !== a || c[4] !== g
            ? ((s = (0, i.d)({
                info: p,
                user: g,
                reportedKind: a,
                rates: v,
                mint: e,
              })),
              (c[0] = p),
              (c[1] = e),
              (c[2] = v),
              (c[3] = a),
              (c[4] = g),
              (c[5] = s))
            : (s = c[5]),
          s
        );
      },
    ],
    714549,
  );
};
