// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(759257),
    n = e.i(646908);
  let s = e.i(26077).N,
    i = (e) => "number" == typeof e && (!Number.isFinite(e) || Math.abs(e) > s),
    r = (e) => {
      let t =
        e.coin && i(e.coin.marketCapUsd)
          ? { ...e.coin, marketCapUsd: null }
          : e.coin;
      return i(e.valueUsd) || i(e.pnlUsd)
        ? {
            ...e,
            valueUsd: void 0,
            tokenPriceUsd: void 0,
            pnlUsd: null,
            pnlPercentage: null,
            coin: t ? { ...t, marketCapUsd: null } : t,
            servedQuoteRejected: !0,
          }
        : t === e.coin
          ? e
          : { ...e, coin: t };
    },
    a = (e) => e.map(r);
  e.s(["L", 0, i, "X", 0, a], 528766);
  let l = async (e, n) =>
      a(
        (
          await (0, t.j)()("GET /user-positions/{userId}", {
            params: { userId: e },
            query: { mints: [...n], updatesLimit: 0 },
            timeout: 8e3,
            hooks: {
              afterResponse: [
                (e, t, n) => {
                  if (404 === n.status) return Response.json({ positions: [] });
                  if (!n.ok)
                    throw Error(
                      `user-positions request failed: ${n.status} ${n.statusText}`,
                    );
                },
              ],
            },
          })
        ).positions ?? [],
      ),
    u = async ({ userId: e, mints: t }) => {
      let n = Array.from(new Set(t.filter(Boolean)));
      return 0 === n.length
        ? []
        : (
            await Promise.all(
              ((e) => {
                let t = [];
                for (let n = 0; n < e.length; n += 200)
                  t.push(e.slice(n, n + 200));
                return t;
              })(n).map((t) => l(e, t)),
            )
          ).flat();
    },
    o = async ({ userId: e, mint: t }) => {
      let n = await u({ userId: e, mints: [t] }),
        s = t.toLowerCase();
      return n.find((e) => e.coinMint?.toLowerCase() === s) ?? null;
    };
  e.s(
    [
      "E",
      0,
      o,
      "m",
      0,
      u,
      "l",
      0,
      (e, t) => (t ? e.get(t.toLowerCase()) : void 0),
      "u",
      0,
      (e) => {
        let t = new Map();
        for (let n of e) n.coinMint && t.set(n.coinMint.toLowerCase(), n);
        return t;
      },
      "h",
      0,
      (e, t) => ((0, n.C)(t) ? `${t}:${e}` : e),
    ],
    384886,
  );
};
