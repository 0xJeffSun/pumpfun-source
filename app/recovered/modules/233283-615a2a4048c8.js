// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(886813),
    i = e.i(759257),
    s = e.i(541710),
    a = e.i(646908),
    r = e.i(605587);
  async function n(e) {
    let {
        mint: r,
        sortBy: n = "TOP",
        withThesis: l = !0,
        pageSize: o,
        page: c,
        updatesLimit: d,
        chainId: x,
        chain: h,
        sessionId: u,
        signal: f,
      } = e,
      b = "RANKED" === n,
      p = await (0, i.j)()("GET /mint-positions/{mint}", {
        params: { mint: r },
        query: {
          sortBy: n,
          withThesis: l || void 0,
          pageSize: o,
          page: b ? void 0 : c,
          updatesLimit: d,
          ...(b
            ? (({ sessionId: e, chainId: i }) => ({
                platform: "WEB",
                session_id: e || void 0,
                device_id: (0, t.$)() || void 0,
                chainId: i ?? void 0,
              }))({ sessionId: u, chainId: x })
            : {}),
          ...(h ? { chain: h } : {}),
        },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: f,
        hooks: {
          afterResponse: [
            (e, t, i) => {
              if (400 === i.status && ((0, a.L)(h) || null != (0, s.T)(h)))
                return Response.json({ positions: [] });
              if (!i.ok)
                throw Error(`Failed to fetch mint positions: ${i.status}`);
            },
          ],
        },
      });
    return {
      positions: p.positions ?? [],
      totalCount: "number" == typeof p.totalCount ? p.totalCount : null,
      ...("boolean" == typeof p.hasMore ? { hasMore: p.hasMore } : {}),
    };
  }
  e.s([
    "_",
    0,
    n,
    "t",
    0,
    function (e) {
      return (0, s.T)(e.chain_id);
    },
    "$",
    0,
    function (e) {
      if (
        (0, a.B)(e.chain_id) ||
        !(0, r.N)({ mint: e.mint, chainId: e.chain_id })
      )
        return;
      let t = Number((0, r.w)(e.chain_id));
      return Number.isInteger(t) && t > 0 ? t : void 0;
    },
  ]);
};
