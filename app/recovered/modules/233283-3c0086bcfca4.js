// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(886813),
    i = e.i(759257),
    r = e.i(541710),
    a = e.i(646908),
    n = e.i(605587);
  async function l(e) {
    let {
        mint: n,
        sortBy: l = "TOP",
        withThesis: o = !0,
        pageSize: s,
        page: d,
        updatesLimit: c,
        chainId: u,
        chain: p,
        sessionId: m,
        signal: x,
      } = e,
      b = "RANKED" === l,
      f = await (0, i.j)()("GET /mint-positions/{mint}", {
        params: { mint: n },
        query: {
          sortBy: l,
          withThesis: o || void 0,
          pageSize: s,
          page: b ? void 0 : d,
          updatesLimit: c,
          ...(b
            ? (({ sessionId: e, chainId: i }) => ({
                platform: "WEB",
                session_id: e || void 0,
                device_id: (0, t.$)() || void 0,
                chainId: i ?? void 0,
              }))({ sessionId: m, chainId: u })
            : {}),
          ...(p ? { chain: p } : {}),
        },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: x,
        hooks: {
          afterResponse: [
            (e, t, i) => {
              if (400 === i.status && ((0, a.L)(p) || null != (0, r.T)(p)))
                return Response.json({ positions: [] });
              if (!i.ok)
                throw Error(`Failed to fetch mint positions: ${i.status}`);
            },
          ],
        },
      });
    return {
      positions: f.positions ?? [],
      totalCount: "number" == typeof f.totalCount ? f.totalCount : null,
      ...("boolean" == typeof f.hasMore ? { hasMore: f.hasMore } : {}),
    };
  }
  e.s([
    "_",
    0,
    l,
    "t",
    0,
    function (e) {
      return (0, r.T)(e.chain_id);
    },
    "$",
    0,
    function (e) {
      if (
        (0, a.B)(e.chain_id) ||
        !(0, n.N)({ mint: e.mint, chainId: e.chain_id })
      )
        return;
      let t = Number((0, n.w)(e.chain_id));
      return Number.isInteger(t) && t > 0 ? t : void 0;
    },
  ]);
};
