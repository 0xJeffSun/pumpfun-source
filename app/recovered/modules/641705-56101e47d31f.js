// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503725),
    r = e.i(523837),
    n = e.i(343213),
    s = e.i(443481),
    o = e.i(262356);
  e.s([
    "f",
    0,
    function (e, i = {}) {
      let {
        batch: a,
        fetchFn: c,
        fetchOptions: u,
        key: l = "http",
        methods: d,
        name: f = "HTTP JSON-RPC",
        onFetchRequest: h,
        onFetchResponse: p,
        retryDelay: b,
        raw: m,
      } = i;
      return ({ chain: y, retryCount: g, timeout: v }) => {
        let { batchSize: w = 1e3, wait: x = 0 } = "object" == typeof a ? a : {},
          P = i.retryCount ?? g,
          $ = v ?? i.timeout ?? 1e4,
          I = e || y?.rpcUrls.default.http[0];
        if (!I) throw new r.f();
        let E = (0, s.f)(I, {
          fetchFn: c,
          fetchOptions: u,
          onRequest: h,
          onResponse: p,
          timeout: $,
        });
        return (0, o.f)(
          {
            key: l,
            methods: d,
            name: f,
            async request({ method: e, params: r }) {
              let s = { method: e, params: r },
                { schedule: o } = (0, n.f)({
                  id: I,
                  wait: x,
                  shouldSplitBatch: (e) => e.length > w,
                  fn: (e) => E.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                i = async (e) => (a ? o(e) : [await E.request({ body: e })]),
                [{ error: c, result: u }] = await i(s);
              if (m) return { error: c, result: u };
              if (c) throw new t.V({ body: s, error: c, url: I });
              return u;
            },
            retryCount: P,
            retryDelay: b,
            timeout: $,
            type: "http",
          },
          { fetchOptions: u, url: I },
        );
      };
    },
  ]);
};
