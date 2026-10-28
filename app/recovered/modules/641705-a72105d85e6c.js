// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503725),
    r = e.i(523837),
    o = e.i(343213),
    a = e.i(443481),
    s = e.i(262356);
  e.s([
    "f",
    0,
    function (e, n = {}) {
      let {
        batch: i,
        fetchFn: c,
        fetchOptions: l,
        key: u = "http",
        methods: d,
        name: f = "HTTP JSON-RPC",
        onFetchRequest: b,
        onFetchResponse: h,
        retryDelay: p,
        raw: m,
      } = n;
      return ({ chain: g, retryCount: v, timeout: w }) => {
        let { batchSize: y = 1e3, wait: x = 0 } = "object" == typeof i ? i : {},
          P = n.retryCount ?? v,
          T = w ?? n.timeout ?? 1e4,
          $ = e || g?.rpcUrls.default.http[0];
        if (!$) throw new r.f();
        let E = (0, a.f)($, {
          fetchFn: c,
          fetchOptions: l,
          onRequest: b,
          onResponse: h,
          timeout: T,
        });
        return (0, s.f)(
          {
            key: u,
            methods: d,
            name: f,
            async request({ method: e, params: r }) {
              let a = { method: e, params: r },
                { schedule: s } = (0, o.f)({
                  id: $,
                  wait: x,
                  shouldSplitBatch: (e) => e.length > y,
                  fn: (e) => E.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                n = async (e) => (i ? s(e) : [await E.request({ body: e })]),
                [{ error: c, result: l }] = await n(a);
              if (m) return { error: c, result: l };
              if (c) throw new t.V({ body: a, error: c, url: $ });
              return l;
            },
            retryCount: P,
            retryDelay: p,
            timeout: T,
            type: "http",
          },
          { fetchOptions: l, url: $ },
        );
      };
    },
  ]);
};
