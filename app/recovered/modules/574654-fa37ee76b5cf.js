// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279);
  async function a(e) {
    let {
        walletAddress: a,
        cursor: i,
        dustFilter: l = !0,
        includeEvm: r = !0,
        limit: n,
        fetchOptions: o,
      } = e,
      s = new URL(`/transactions/${encodeURIComponent(a)}`, t.C.PROFILE);
    (i && s.searchParams.set("cursor", i),
      void 0 !== n && s.searchParams.set("limit", String(n)),
      l && s.searchParams.set("dustFilter", "true"),
      r && s.searchParams.set("includeEvm", "true"));
    let d = await fetch(s.toString(), o);
    if (!d.ok) throw Error(`Failed to fetch user transactions: ${d.status}`);
    return d.json();
  }
  e.s(["f", 0, a]);
};
