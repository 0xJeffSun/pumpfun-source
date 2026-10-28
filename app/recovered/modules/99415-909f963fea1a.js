// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(254667),
    a = e.i(759257);
  let i = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    s = () => (0, a.j)({ retry: 0 }),
    n = (e) =>
      (0, t.isContractError)(e)
        ? 429 === e.status || e.status >= 500
        : "object" != typeof e || null === e || "AbortError" !== e.name,
    o = async (e, a, i) => {
      try {
        return await a();
      } catch (e) {
        if (!n(e)) throw e;
      }
      await new Promise((e, t) => {
        if (i?.aborted) return void t(i.reason);
        let r = setTimeout(e, 500);
        i?.addEventListener(
          "abort",
          () => {
            (clearTimeout(r), t(i.reason));
          },
          { once: !0 },
        );
      });
      try {
        return await a();
      } catch (a) {
        if (n(a)) {
          let i = (0, t.isContractError)(a) ? a.status : void 0;
          r.y.warn("fees read unavailable", { route: e, status: i });
        }
        throw a;
      }
    };
  e.s([
    "y",
    0,
    i,
    "i",
    0,
    ({ mint: e, cursor: t, signal: r }) =>
      o(
        "GET /fees/coin/{chainId}/{address}",
        () =>
          s()("GET /fees/coin/{chainId}/{address}", {
            params: { chainId: i, address: e },
            query: { cursor: t },
            signal: r,
          }),
        r,
      ),
    "P",
    0,
    ({ address: e, mint: t, signal: r }) =>
      o(
        "GET /fees/creator/{address}",
        () =>
          s()("GET /fees/creator/{address}", {
            params: { address: e },
            query: { interval: "1d", period: "30d", mint: t },
            signal: r,
          }),
        r,
      ),
    "I",
    0,
    ({ id: e, cursor: t, signal: r }) =>
      o(
        "GET /fees/shareholder/{id}",
        () =>
          s()("GET /fees/shareholder/{id}", {
            params: { id: e },
            query: { cursor: t },
            signal: r,
          }),
        r,
      ),
  ]);
};
