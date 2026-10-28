// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503630);
  async function r(e) {
    let { query: r, limit: n, cursor: a, signal: i } = e,
      o = new URLSearchParams({ term: r });
    (void 0 !== n && o.set("limit", String(n)),
      null != a && o.set("cursor", a));
    let l = await fetch(
      `${(0, t.u)()}/donate/charities/search?${o.toString()}`,
      { credentials: "include", signal: i },
    );
    if (!l.ok) throw Error(`Charity search failed: HTTP ${l.status}`);
    let s = await l.json();
    if (!s || !Array.isArray(s.response))
      throw Error("Charity search returned an unexpected response shape");
    return s;
  }
  async function n(e) {
    let r = await fetch(`${(0, t.u)()}/donate/configs`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ charityBeneficiaries: e }),
    });
    if (!r.ok) {
      let e = await r.json().catch(() => null);
      throw Error(
        e && "object" == typeof e && "message" in e
          ? String(e.message)
          : `Create donate config failed: HTTP ${r.status}`,
      );
    }
    return await r.json();
  }
  e.s(["c", 0, n, "A", 0, r]);
};
