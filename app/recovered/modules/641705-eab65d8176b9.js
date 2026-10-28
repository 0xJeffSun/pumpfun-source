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
        fetchOptions: u,
        key: l = "http",
        methods: d,
        name: h = "HTTP JSON-RPC",
        onFetchRequest: f,
        onFetchResponse: p,
        retryDelay: b,
        raw: m,
      } = i;
      return ({ chain: g, retryCount: y, timeout: v }) => {
        let { batchSize: w = 1e3, wait: P = 0 } = "object" == typeof a ? a : {},
          x = i.retryCount ?? y,
          T = v ?? i.timeout ?? 1e4,
          $ = e || g?.rpcUrls.default.http[0];
        if (!$) throw new r.f();
        let R = (0, n.f)($, {
          fetchFn: c,
          fetchOptions: u,
          onRequest: f,
          onResponse: p,
          timeout: T,
        });
        return (0, o.f)(
          {
            key: l,
            methods: d,
            name: h,
            async request({ method: e, params: r }) {
              let n = { method: e, params: r },
                { schedule: o } = (0, s.f)({
                  id: $,
                  wait: P,
                  shouldSplitBatch: (e) => e.length > w,
                  fn: (e) => R.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                i = async (e) => (a ? o(e) : [await R.request({ body: e })]),
                [{ error: c, result: u }] = await i(n);
              if (m) return { error: c, result: u };
              if (c) throw new t.V({ body: n, error: c, url: $ });
              return u;
            },
            retryCount: x,
            retryDelay: b,
            timeout: T,
            type: "http",
          },
          { fetchOptions: u, url: $ },
        );
      };
    },
  ]);
};
