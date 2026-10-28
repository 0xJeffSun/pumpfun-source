// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279),
    n = e.i(997887),
    r = e.i(759257);
  async function i(e) {
    let {
        fetchOptions: i,
        limit: a = t.v.USER_CREATED_COINS.LIMIT,
        offset: o = t.v.USER_CREATED_COINS.OFFSET,
        userAddress: s,
      } = e,
      l = await (0, r.j)()("GET /coins-v2/user-created-coins/{creator}", {
        params: { creator: s },
        query: { limit: a, offset: o },
        ...i,
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
      ...l,
      coins: l.coins.map((e) =>
        (0, n.X)({ ...e, created_timestamp: (0, n.i)(e.created_timestamp) }),
      ),
    };
  }
  e.s(["f", 0, i]);
};
