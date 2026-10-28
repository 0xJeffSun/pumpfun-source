// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503725),
    r = e.i(523837),
    s = e.i(343213),
    n = e.i(443481),
    o = e.i(262356);
  e.s([
    "f",
    0,
    function (e, i = {}) {
      let {
        batch: a,
        fetchFn: c,
        fetchOptions: l,
        key: u = "http",
        methods: h,
        name: d = "HTTP JSON-RPC",
        onFetchRequest: f,
        onFetchResponse: p,
        retryDelay: g,
        raw: m,
      } = i;
      return ({ chain: b, retryCount: w, timeout: y }) => {
        let { batchSize: E = 1e3, wait: v = 0 } = "object" == typeof a ? a : {},
          $ = i.retryCount ?? w,
          _ = y ?? i.timeout ?? 1e4,
          A = e || b?.rpcUrls.default.http[0];
        if (!A) throw new r.f();
        let O = (0, n.f)(A, {
          fetchFn: c,
          fetchOptions: l,
          onRequest: f,
          onResponse: p,
          timeout: _,
        });
        return (0, o.f)(
          {
            key: u,
            methods: h,
            name: d,
            async request({ method: e, params: r }) {
              let n = { method: e, params: r },
                { schedule: o } = (0, s.f)({
                  id: A,
                  wait: v,
                  shouldSplitBatch: (e) => e.length > E,
                  fn: (e) => O.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                i = async (e) => (a ? o(e) : [await O.request({ body: e })]),
                [{ error: c, result: l }] = await i(n);
              if (m) return { error: c, result: l };
              if (c) throw new t.V({ body: n, error: c, url: A });
              return l;
            },
            retryCount: $,
            retryDelay: g,
            timeout: _,
            type: "http",
          },
          { fetchOptions: l, url: A },
        );
      };
    },
  ]);
};
