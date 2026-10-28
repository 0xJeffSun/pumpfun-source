// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503725),
    r = e.i(523837),
    n = e.i(343213),
    o = e.i(443481),
    s = e.i(262356);
  e.s([
    "f",
    0,
    function (e, a = {}) {
      let {
        batch: i,
        fetchFn: c,
        fetchOptions: u,
        key: d = "http",
        methods: l,
        name: f = "HTTP JSON-RPC",
        onFetchRequest: p,
        onFetchResponse: h,
        retryDelay: m,
        raw: b,
      } = a;
      return ({ chain: y, retryCount: g, timeout: w }) => {
        let { batchSize: v = 1e3, wait: x = 0 } = "object" == typeof i ? i : {},
          P = a.retryCount ?? g,
          E = w ?? a.timeout ?? 1e4,
          $ = e || y?.rpcUrls.default.http[0];
        if (!$) throw new r.f();
        let I = (0, o.f)($, {
          fetchFn: c,
          fetchOptions: u,
          onRequest: p,
          onResponse: h,
          timeout: E,
        });
        return (0, s.f)(
          {
            key: d,
            methods: l,
            name: f,
            async request({ method: e, params: r }) {
              let o = { method: e, params: r },
                { schedule: s } = (0, n.f)({
                  id: $,
                  wait: x,
                  shouldSplitBatch: (e) => e.length > v,
                  fn: (e) => I.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                a = async (e) => (i ? s(e) : [await I.request({ body: e })]),
                [{ error: c, result: u }] = await a(o);
              if (b) return { error: c, result: u };
              if (c) throw new t.V({ body: o, error: c, url: $ });
              return u;
            },
            retryCount: P,
            retryDelay: m,
            timeout: E,
            type: "http",
          },
          { fetchOptions: u, url: $ },
        );
      };
    },
  ]);
};
