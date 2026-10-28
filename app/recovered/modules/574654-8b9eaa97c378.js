// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279);
  async function r(e) {
    let {
        walletAddress: r,
        cursor: a,
        dustFilter: i = !0,
        includeEvm: n = !0,
        limit: l,
        fetchOptions: s,
      } = e,
      o = new URL(`/transactions/${encodeURIComponent(r)}`, t.C.PROFILE);
    (a && o.searchParams.set("cursor", a),
      void 0 !== l && o.searchParams.set("limit", String(l)),
      i && o.searchParams.set("dustFilter", "true"),
      n && o.searchParams.set("includeEvm", "true"));
    let d = await fetch(o.toString(), s);
    if (!d.ok) throw Error(`Failed to fetch user transactions: ${d.status}`);
    return d.json();
  }
  e.s(["f", 0, r]);
};
