// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    i = e.i(38279);
  class a extends Error {
    status;
    retryAfterMs;
    constructor(e, t, n) {
      (super(e),
        (this.name = "BalanceSummaryHttpError"),
        (this.status = t),
        (this.retryAfterMs = n?.retryAfterMs));
    }
  }
  let r = (e, t) => {
      if ("object" != typeof e || null === e) return;
      let n = e[t];
      return "number" == typeof n && Number.isFinite(n) ? n : void 0;
    },
    s = (e) => r(e, "status"),
    l = (e) => r(e, "retryAfterMs");
  async function o(e) {
    let { fetchOptions: t, userAddress: n, multiChain: r } = e,
      s = new URL(`${i.t.BALANCE_SUMMARY}/${n}`);
    r && s.searchParams.set("multi_chain", "true");
    let l = await fetch(s.toString(), t);
    if (401 === l.status) throw new a("Unauthorized", 401);
    if (!l.ok)
      throw new a(`Failed to fetch wallet summary (${l.status})`, l.status, {
        retryAfterMs:
          429 === l.status
            ? ((e, t = Date.now()) => {
                if (!e) return;
                let n = e.trim();
                if (/^-?\d+$/.test(n)) {
                  let e = Number(n);
                  return e >= 0 ? 1e3 * e : void 0;
                }
                let i = Date.parse(n);
                return Number.isNaN(i) ? void 0 : Math.max(0, i - t);
              })(l.headers.get("retry-after"))
            : void 0,
      });
    return l.json();
  }
  e.s(["P", 0, l, "W", 0, s, "K", 0, o], 349572);
  let u = (e, t) => 401 !== s(t) && e < 2,
    d = (e, t) => {
      if (429 !== s(t)) return Math.min(1e3 * 2 ** e, 3e4);
      let n = l(t);
      return void 0 !== n ? Math.min(n, 6e4) : 5e3 * (e + 1);
    },
    c = (e) => {
      let { userAddress: t, fetchOptions: n } = e;
      return {
        queryFn: () => o({ userAddress: t, multiChain: !0, fetchOptions: n }),
        queryKey: i.Q.BALANCE_SUMMARY(t),
        retry: u,
        retryDelay: d,
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
      c,
      "_",
      0,
      function (e) {
        let i,
          a,
          r = (0, t.c)(7),
          { userAddress: s, fetchOptions: l, queryOptions: o } = e,
          u = !!s;
        return (
          r[0] !== l || r[1] !== s
            ? ((i = c({ userAddress: s, fetchOptions: l })),
              (r[0] = l),
              (r[1] = s),
              (r[2] = i))
            : (i = r[2]),
          r[3] !== u || r[4] !== o || r[5] !== i
            ? ((a = {
                enabled: u,
                ...i,
                staleTime: 1 / 0,
                refetchOnMount: !0,
                refetchOnWindowFocus: !0,
                refetchOnReconnect: !0,
                refetchInterval: m,
                ...o,
              }),
              (r[3] = u),
              (r[4] = o),
              (r[5] = i),
              (r[6] = a))
            : (a = r[6]),
          (0, n.useQuery)(a)
        );
      },
    ],
    524711,
  );
};
