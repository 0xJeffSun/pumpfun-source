// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  async function t({ mints: e, endpoint: n, signal: s }) {
    let i = new Set();
    if (!n || 0 === e.length) return i;
    for (let t = 0; t < e.length; t += 100) {
      let r = e.slice(t, t + 100);
      try {
        let e = await fetch(n, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getMultipleAccounts",
            params: [
              r,
              { encoding: "base64", dataSlice: { offset: 0, length: 0 } },
            ],
          }),
          signal: s,
        });
        if (!e.ok) continue;
        let t = await e.json(),
          a = t?.result?.value;
        if (t?.error != null || !Array.isArray(a) || a.length !== r.length)
          continue;
        a.forEach((e, t) => {
          null === e && i.add(r[t]);
        });
      } catch {
        continue;
      }
    }
    return i;
  }
  e.s([
    "C",
    0,
    100,
    "S",
    0,
    0x536f6c4d,
    "l",
    0,
    t,
    "R",
    0,
    function (e) {
      let t = new Set();
      for (let n of e ?? [])
        0x536f6c4d === n.chainId &&
          null == n.valueUsd &&
          n.amountHeld > 0 &&
          (n.isNative || t.add(n.coinMint));
      return [...t];
    },
  ]);
};
