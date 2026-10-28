// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279),
    r = e.i(759257);
  let n = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    a = (e) => n.test(e);
  e.s(["f", 0, a], 652853);
  let i = (e) => e,
    s = (e) => e;
  class o extends Error {
    constructor(e) {
      (super(e), (this.name = "CoinNotFoundError"));
    }
  }
  class l extends Error {
    status;
    constructor(e, t) {
      (super(e), (this.name = "CoinFetchError"), (this.status = t));
    }
  }
  function u(e) {
    if (null == e || "" === e) return null;
    let t = "string" == typeof e ? parseInt(e, 10) : e;
    return !Number.isFinite(t) || t <= 0 ? null : t < 1e12 ? 1e3 * t : t;
  }
  async function d(e) {
    let {
        coinAddress: n,
        includeDataLivestream: a = t.v.COIN.INCLUDE_DATA_LIVESTREAM,
        chainId: s,
        fetchOptions: d,
      } = e,
      c = await (0, r.j)()("GET /coins-v3/{address}", {
        params: { address: n },
        query: { includeLiveStreamInfo: a, ...(s ? { chain: s } : {}) },
        ...d,
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            async (e, t, r) => {
              if (!r.ok) {
                let e = `Failed to fetch coin ${n}: ${r.status} ${r.statusText}`;
                if (404 === r.status) throw new o(e);
                throw new l(e, r.status);
              }
              if (!(await r.clone().text()))
                throw new o(`Empty response body for coin ${n}`);
            },
          ],
        },
        parseJson: (e) => {
          try {
            return JSON.parse(e);
          } catch (t) {
            let e = t instanceof Error ? t.message : String(t);
            throw Error(`Invalid JSON response for coin ${n}: ${e}`);
          }
        },
      });
    if (null === c) throw new o(`No coin for mint ${n}`);
    return i({ ...c, created_timestamp: u(c.created_timestamp) });
  }
  let c = ({ coinAddress: e, chainId: t }) => void 0 === t && a(e),
    m = async ({ coinAddress: e, fetchOptions: t }) => {
      try {
        let n = await (0, r.j)()("POST /coins-v2/mints", {
            body: { mints: [e] },
            ...t,
            hooks: {
              afterResponse: [
                (e, t, r) => {
                  if (!r.ok)
                    throw Error(`Failed to fetch coins-v2 mints: ${r.status}`);
                },
              ],
            },
          }),
          a = s(n).find((t) => t.mint === e && !1 === t.initialized);
        if (!a) return null;
        return { ...a, created_timestamp: u(a.created_timestamp) };
      } catch (t) {
        return (f(e, t), null);
      }
    },
    f = async (t, r) => {
      try {
        let { logger: n } = await e.A(570729);
        n.warn("Off-chain coin probe failed; keeping the coins-v3 miss", {
          coinAddress: t,
          error: r,
        });
      } catch {}
    },
    h = (e) => "number" == typeof e && e > 0;
  async function p(e) {
    let t;
    try {
      t = await d(e);
    } catch (r) {
      if (!(r instanceof o) || !c(e)) throw r;
      let t = await m(e);
      if (null === t) throw r;
      return t;
    }
    return !0 !== t.is_multichain_fallback ||
      !c(e) ||
      h(t.usd_market_cap) ||
      h(t.price_usd)
      ? t
      : ((await m(e)) ?? t);
  }
  e.s(
    ["h", 0, l, "V", 0, o, "X", 0, i, "l", 0, s, "k", 0, p, "i", 0, u],
    997887,
  );
};
