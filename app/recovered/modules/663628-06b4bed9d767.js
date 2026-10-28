// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(707138),
    n = e.i(674801);
  let s = BigInt(0),
    i = [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
    ],
    r = (e) => "string" == typeof e && /^\d+$/.test(e),
    a = (e) => "number" == typeof e && Number.isInteger(e) && e >= 0,
    l = (e, t) => {
      if (null === t) return null;
      let n = Number(e) / 10 ** t;
      return Number.isFinite(n) ? n : null;
    },
    u = async ({ owner: e, filter: t, endpoint: n, signal: s }) => {
      if (!n || !e) return null;
      try {
        let i = await fetch(n, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenAccountsByOwner",
            params: [e, t, { encoding: "jsonParsed" }],
          }),
          signal: s,
        });
        if (!i.ok) return null;
        let l = await i.json(),
          u = l?.result?.value;
        if (l?.error != null || !Array.isArray(u)) return null;
        let o = [];
        for (let e of u) {
          let n = e?.account?.data?.parsed?.info,
            s = n?.tokenAmount?.amount,
            i =
              "string" == typeof n?.mint
                ? n.mint
                : "mint" in t
                  ? t.mint
                  : void 0;
          if (!r(s) || !i) continue;
          let l = n?.tokenAmount?.decimals;
          o.push({
            pubkey: "string" == typeof e?.pubkey ? e.pubkey : null,
            mint: i,
            amountRaw: BigInt(s),
            decimals: a(l) ? l : null,
          });
        }
        if (u.length > 0 && 0 === o.length) return null;
        return o;
      } catch {
        return null;
      }
    },
    o = ({ owner: e, mint: t, endpoint: n, signal: s }) =>
      u({ owner: e, filter: { mint: t }, endpoint: n, signal: s }),
    d = async ({ owner: e, mints: t, endpoint: n, signal: i }) => {
      let r = new Map();
      return (
        n &&
          e &&
          0 !== t.length &&
          (await Promise.all(
            t.map(async (t) => {
              let a = await o({ owner: e, mint: t, endpoint: n, signal: i });
              if (null === a) return;
              let l = s,
                u = null;
              for (let e of a) ((l += e.amountRaw), (u ??= e.decimals));
              r.set(t, { raw: l, decimals: u });
            }),
          )),
        r
      );
    },
    p = async ({ owner: e, endpoint: t, signal: n }) => {
      let r = new Map();
      if (!t || !e) return r;
      let a = new Map();
      for (let r of await Promise.all(
        i.map((s) =>
          u({ owner: e, filter: { programId: s }, endpoint: t, signal: n }),
        ),
      ))
        if (null !== r)
          for (let e of r) {
            let t = a.get(e.mint);
            a.set(e.mint, {
              raw: (t?.raw ?? s) + e.amountRaw,
              decimals: t?.decimals ?? e.decimals,
            });
          }
      for (let [e, { raw: t, decimals: n }] of a) {
        if (t === s) {
          r.set(e, 0);
          continue;
        }
        let i = l(t, n);
        null !== i && r.set(e, i);
      }
      return r;
    };
  async function c(e) {
    let t = await d(e),
      n = new Set();
    for (let [e, i] of t) i.raw > s && n.add(e);
    return n;
  }
  async function m(e) {
    let t = await d(e),
      n = new Map();
    for (let [e, { raw: i, decimals: r }] of t) {
      if (i === s) {
        n.set(e, 0);
        continue;
      }
      let t = l(i, r);
      null !== t && n.set(e, t);
    }
    return n;
  }
  async function y({ evmAddress: e, targets: n, readBalance: i = t.t }) {
    let r = new Set();
    return (
      e &&
        0 !== n.length &&
        (await Promise.all(
          n.map(async ({ coinMint: t, chainId: n }) => {
            try {
              let { balanceRaw: a } = await i(t, n, e);
              a > s && r.add(t);
            } catch {}
          }),
        )),
      r
    );
  }
  e.s([
    "y",
    0,
    10,
    "_",
    0,
    y,
    "L",
    0,
    m,
    "n",
    0,
    c,
    "z",
    0,
    p,
    "G",
    0,
    o,
    "w",
    0,
    (e) => e.chainId === n.S,
    "Y",
    0,
    l,
  ]);
};
