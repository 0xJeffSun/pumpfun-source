// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503725),
    r = e.i(523837),
    n = e.i(343213),
    a = e.i(443481),
    i = e.i(262356);
  e.s([
    "f",
    0,
    function (e, s = {}) {
      let {
        batch: o,
        fetchFn: c,
        fetchOptions: l,
        key: u = "http",
        methods: f,
        name: d = "HTTP JSON-RPC",
        onFetchRequest: p,
        onFetchResponse: h,
        retryDelay: m,
        raw: y,
      } = s;
      return ({ chain: b, retryCount: g, timeout: w }) => {
        let { batchSize: v = 1e3, wait: P = 0 } = "object" == typeof o ? o : {},
          x = s.retryCount ?? g,
          B = w ?? s.timeout ?? 1e4,
          A = e || b?.rpcUrls.default.http[0];
        if (!A) throw new r.f();
        let N = (0, a.f)(A, {
          fetchFn: c,
          fetchOptions: l,
          onRequest: p,
          onResponse: h,
          timeout: B,
        });
        return (0, i.f)(
          {
            key: u,
            methods: f,
            name: d,
            async request({ method: e, params: r }) {
              let a = { method: e, params: r },
                { schedule: i } = (0, n.f)({
                  id: A,
                  wait: P,
                  shouldSplitBatch: (e) => e.length > v,
                  fn: (e) => N.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                s = async (e) => (o ? i(e) : [await N.request({ body: e })]),
                [{ error: c, result: l }] = await s(a);
              if (y) return { error: c, result: l };
              if (c) throw new t.V({ body: a, error: c, url: A });
              return l;
            },
            retryCount: x,
            retryDelay: m,
            timeout: B,
            type: "http",
          },
          { fetchOptions: l, url: A },
        );
      };
    },
  ]);
};
