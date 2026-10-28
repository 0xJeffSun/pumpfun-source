// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(503630);
  async function i(e) {
    let { query: i, limit: r, cursor: a, signal: n } = e,
      s = new URLSearchParams({ term: i });
    (void 0 !== r && s.set("limit", String(r)),
      null != a && s.set("cursor", a));
    let l = await fetch(
      `${(0, t.u)()}/donate/charities/search?${s.toString()}`,
      { credentials: "include", signal: n },
    );
    if (!l.ok) throw Error(`Charity search failed: HTTP ${l.status}`);
    let o = await l.json();
    if (!o || !Array.isArray(o.response))
      throw Error("Charity search returned an unexpected response shape");
    return o;
  }
  async function r(e) {
    let i = await fetch(`${(0, t.u)()}/donate/configs`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ charityBeneficiaries: e }),
    });
    if (!i.ok) {
      let e = await i.json().catch(() => null);
      throw Error(
        e && "object" == typeof e && "message" in e
          ? String(e.message)
          : `Create donate config failed: HTTP ${i.status}`,
      );
    }
    return await i.json();
  }
  e.s(["c", 0, r, "A", 0, i]);
};
