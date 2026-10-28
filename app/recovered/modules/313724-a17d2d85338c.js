// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279),
    n = e.i(997887),
    i = e.i(759257);
  async function r(e) {
    let {
        fetchOptions: r,
        limit: l = t.v.USER_CREATED_COINS.LIMIT,
        offset: a = t.v.USER_CREATED_COINS.OFFSET,
        userAddress: u,
      } = e,
      o = await (0, i.j)()("GET /coins-v2/user-created-coins/{creator}", {
        params: { creator: u },
        query: { limit: l, offset: a },
        ...r,
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (e, t, n) => {
              if (!n.ok) throw Error("Failed to fetch user created coins");
            },
          ],
        },
      });
    return {
      ...o,
      coins: o.coins.map((e) =>
        (0, n.X)({ ...e, created_timestamp: (0, n.i)(e.created_timestamp) }),
      ),
    };
  }
  e.s(["f", 0, r]);
};
