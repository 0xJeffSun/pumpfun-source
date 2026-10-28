// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["collector_crypt", "phygitals"],
    n = (e) => "string" == typeof e && t.includes(e),
    r = { collector_crypt: "cc", phygitals: "phy" },
    o = { cc: "collector_crypt", phy: "phygitals" },
    i = /^(cc|phy):([A-Za-z0-9_-]{1,64})$/,
    a = (e) => {
      let t = i.exec(e);
      if (null === t) return null;
      let n = o[t[1] ?? ""],
        r = t[2];
      return void 0 === n || void 0 === r
        ? null
        : { provider: n, providerPackId: r };
    };
  e.s([
    "V",
    0,
    (e) =>
      void 0 === e.pack_id
        ? "collector_crypt"
        : (a(e.pack_id)?.provider ?? "collector_crypt"),
    "_",
    0,
    n,
    "y",
    0,
    a,
    "U",
    0,
    (e, t) => `${r[e]}:${t}`,
    "W",
    0,
    (e) => (n(e) ? e : null),
  ]);
};
