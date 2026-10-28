// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(982253);
  var t = e.i(117852),
    r = e.i(933185),
    n = e.i(565530),
    a = e.i(336291);
  function i(e) {
    return crypto.getRandomValues(new Uint8Array(e));
  }
  function o() {
    return t.f.encode(i(36));
  }
  async function s(e, r = "S256") {
    if ("S256" != r) return e;
    {
      let r = await (async function (e) {
        let t = new TextEncoder().encode(e);
        return new Uint8Array(await crypto.subtle.digest("SHA-256", t));
      })(e);
      return t.f.encode(r);
    }
  }
  e.s([
    "a",
    0,
    function () {
      return o();
    },
    "c",
    0,
    o,
    "d",
    0,
    s,
    "g",
    0,
    function () {
      let e = a.s.get(r.t);
      if (!e) throw new n.P("Authentication error.");
      return e;
    },
    "r",
    0,
    i,
  ]);
};
