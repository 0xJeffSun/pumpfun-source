// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503725),
    r = e.i(523837),
    o = e.i(343213),
    n = e.i(443481),
    s = e.i(262356);
  e.s([
    "f",
    0,
    function (e, a = {}) {
      let {
        batch: i,
        fetchFn: c,
        fetchOptions: l,
        key: u = "http",
        methods: d,
        name: f = "HTTP JSON-RPC",
        onFetchRequest: h,
        onFetchResponse: b,
        retryDelay: p,
        raw: m,
      } = a;
      return ({ chain: g, retryCount: y, timeout: v }) => {
        let { batchSize: w = 1e3, wait: x = 0 } = "object" == typeof i ? i : {},
          P = a.retryCount ?? y,
          T = v ?? a.timeout ?? 1e4,
          E = e || g?.rpcUrls.default.http[0];
        if (!E) throw new r.f();
        let $ = (0, n.f)(E, {
          fetchFn: c,
          fetchOptions: l,
          onRequest: h,
          onResponse: b,
          timeout: T,
        });
        return (0, s.f)(
          {
            key: u,
            methods: d,
            name: f,
            async request({ method: e, params: r }) {
              let n = { method: e, params: r },
                { schedule: s } = (0, o.f)({
                  id: E,
                  wait: x,
                  shouldSplitBatch: (e) => e.length > w,
                  fn: (e) => $.request({ body: e }),
                  sort: (e, t) => e.id - t.id,
                }),
                a = async (e) => (i ? s(e) : [await $.request({ body: e })]),
                [{ error: c, result: l }] = await a(n);
              if (m) return { error: c, result: l };
              if (c) throw new t.V({ body: n, error: c, url: E });
              return l;
            },
            retryCount: P,
            retryDelay: p,
            timeout: T,
            type: "http",
          },
          { fetchOptions: l, url: E },
        );
      };
    },
  ]);
};
