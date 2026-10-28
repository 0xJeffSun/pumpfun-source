// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(38279);
  class i extends Error {
    status;
    retryAfterMs;
    constructor(e, t, n) {
      (super(e),
        (this.name = "BalanceSummaryHttpError"),
        (this.status = t),
        (this.retryAfterMs = n?.retryAfterMs));
    }
  }
  let a = (e, t) => {
      if ("object" != typeof e || null === e) return;
      let n = e[t];
      return "number" == typeof n && Number.isFinite(n) ? n : void 0;
    },
    s = (e) => a(e, "status"),
    l = (e) => a(e, "retryAfterMs");
  async function o(e) {
    let { fetchOptions: t, userAddress: n, multiChain: a } = e,
      s = new URL(`${r.t.BALANCE_SUMMARY}/${n}`);
    a && s.searchParams.set("multi_chain", "true");
    let l = await fetch(s.toString(), t);
    if (401 === l.status) throw new i("Unauthorized", 401);
    if (!l.ok)
      throw new i(`Failed to fetch wallet summary (${l.status})`, l.status, {
        retryAfterMs:
          429 === l.status
            ? ((e, t = Date.now()) => {
                if (!e) return;
                let n = e.trim();
                if (/^-?\d+$/.test(n)) {
                  let e = Number(n);
                  return e >= 0 ? 1e3 * e : void 0;
                }
                let r = Date.parse(n);
                return Number.isNaN(r) ? void 0 : Math.max(0, r - t);
              })(l.headers.get("retry-after"))
            : void 0,
      });
    return l.json();
  }
  e.s(["P", 0, l, "W", 0, s, "K", 0, o], 349572);
  let u = (e, t) => 401 !== s(t) && e < 2,
    c = (e, t) => {
      if (429 !== s(t)) return Math.min(1e3 * 2 ** e, 3e4);
      let n = l(t);
      return void 0 !== n ? Math.min(n, 6e4) : 5e3 * (e + 1);
    },
    d = (e) => {
      let { userAddress: t, fetchOptions: n } = e;
      return {
        queryFn: () => o({ userAddress: t, multiChain: !0, fetchOptions: n }),
        queryKey: r.Q.BALANCE_SUMMARY(t),
        retry: u,
        retryDelay: c,
      };
    };
  function m(e) {
    let t;
    return (
      (t = e.state.data),
      "success" === e.state.status && t?.success === !0 ? 6e4 : 15e3
    );
  }
  e.s(
    [
      "g",
      0,
      d,
      "_",
      0,
      function (e) {
        let r,
          i,
          a = (0, t.c)(7),
          { userAddress: s, fetchOptions: l, queryOptions: o } = e,
          u = !!s;
        return (
          a[0] !== l || a[1] !== s
            ? ((r = d({ userAddress: s, fetchOptions: l })),
              (a[0] = l),
              (a[1] = s),
              (a[2] = r))
            : (r = a[2]),
          a[3] !== u || a[4] !== o || a[5] !== r
            ? ((i = {
                enabled: u,
                ...r,
                staleTime: 1 / 0,
                refetchOnMount: !0,
                refetchOnWindowFocus: !0,
                refetchOnReconnect: !0,
                refetchInterval: m,
                ...o,
              }),
              (a[3] = u),
              (a[4] = o),
              (a[5] = r),
              (a[6] = i))
            : (i = a[6]),
          (0, n.useQuery)(i)
        );
      },
    ],
    524711,
  );
};
