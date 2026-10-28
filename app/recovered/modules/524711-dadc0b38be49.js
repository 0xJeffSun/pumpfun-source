// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(38279);
  class i extends Error {
    status;
    retryAfterMs;
    constructor(e, t, r) {
      (super(e),
        (this.name = "BalanceSummaryHttpError"),
        (this.status = t),
        (this.retryAfterMs = r?.retryAfterMs));
    }
  }
  let s = (e, t) => {
      if ("object" != typeof e || null === e) return;
      let r = e[t];
      return "number" == typeof r && Number.isFinite(r) ? r : void 0;
    },
    o = (e) => s(e, "status"),
    a = (e) => s(e, "retryAfterMs");
  async function l(e) {
    let { fetchOptions: t, userAddress: r, multiChain: s } = e,
      o = new URL(`${n.t.BALANCE_SUMMARY}/${r}`);
    s && o.searchParams.set("multi_chain", "true");
    let a = await fetch(o.toString(), t);
    if (401 === a.status) throw new i("Unauthorized", 401);
    if (!a.ok)
      throw new i(`Failed to fetch wallet summary (${a.status})`, a.status, {
        retryAfterMs:
          429 === a.status
            ? ((e, t = Date.now()) => {
                if (!e) return;
                let r = e.trim();
                if (/^-?\d+$/.test(r)) {
                  let e = Number(r);
                  return e >= 0 ? 1e3 * e : void 0;
                }
                let n = Date.parse(r);
                return Number.isNaN(n) ? void 0 : Math.max(0, n - t);
              })(a.headers.get("retry-after"))
            : void 0,
      });
    return a.json();
  }
  e.s(["P", 0, a, "W", 0, o, "K", 0, l], 349572);
  let u = (e, t) => 401 !== o(t) && e < 2,
    c = (e, t) => {
      if (429 !== o(t)) return Math.min(1e3 * 2 ** e, 3e4);
      let r = a(t);
      return void 0 !== r ? Math.min(r, 6e4) : 5e3 * (e + 1);
    },
    h = (e) => {
      let { userAddress: t, fetchOptions: r } = e;
      return {
        queryFn: () => l({ userAddress: t, multiChain: !0, fetchOptions: r }),
        queryKey: n.Q.BALANCE_SUMMARY(t),
        retry: u,
        retryDelay: c,
      };
    };
  function d(e) {
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
      h,
      "_",
      0,
      function (e) {
        let n,
          i,
          s = (0, t.c)(7),
          { userAddress: o, fetchOptions: a, queryOptions: l } = e,
          u = !!o;
        return (
          s[0] !== a || s[1] !== o
            ? ((n = h({ userAddress: o, fetchOptions: a })),
              (s[0] = a),
              (s[1] = o),
              (s[2] = n))
            : (n = s[2]),
          s[3] !== u || s[4] !== l || s[5] !== n
            ? ((i = {
                enabled: u,
                ...n,
                staleTime: 1 / 0,
                refetchOnMount: !0,
                refetchOnWindowFocus: !0,
                refetchOnReconnect: !0,
                refetchInterval: d,
                ...l,
              }),
              (s[3] = u),
              (s[4] = l),
              (s[5] = n),
              (s[6] = i))
            : (i = s[6]),
          (0, r.useQuery)(i)
        );
      },
    ],
    524711,
  );
};
