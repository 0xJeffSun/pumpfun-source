// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map(),
    r = new Map();
  async function n(e, { cacheKey: i, cacheTime: a = 1 / 0 }) {
    let s,
      o,
      u,
      l =
        ((o = (s = (e, t) => ({
          clear: () => t.delete(e),
          get: () => t.get(e),
          set: (r) => t.set(e, r),
        }))(i, t)),
        {
          clear: () => {
            (o.clear(), u.clear());
          },
          promise: o,
          response: (u = s(i, r)),
        }),
      c = l.response.get();
    if (c && a > 0 && Date.now() - c.created.getTime() < a) return c.data;
    let f = l.promise.get();
    f || ((f = e()), l.promise.set(f));
    try {
      let e = await f;
      return (l.response.set({ created: new Date(), data: e }), e);
    } finally {
      l.promise.clear();
    }
  }
  async function i(e, { cacheTime: t = e.cacheTime } = {}) {
    let r;
    return BigInt(
      await n(() => e.request({ method: "eth_blockNumber" }), {
        cacheKey: ((r = e.uid), `blockNumber.${r}`),
        cacheTime: t,
      }),
    );
  }
  e.s(["f", 0, i], 274994);
};
