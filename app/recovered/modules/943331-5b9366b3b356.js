// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => "users" === e || "coins" === e,
    a = (e) => {
      if ("string" != typeof e) return;
      let t = e.trim().slice(0, 24).trim();
      return t.length > 0 ? t : void 0;
    },
    i = (e) => {
      if (!Array.isArray(e)) return [];
      let t = [];
      for (let a of e) {
        if (t.length >= 20) break;
        if ("string" != typeof a) continue;
        let e = a.trim();
        0 !== e.length && !(e.length > 128) && (t.includes(e) || t.push(e));
      }
      return t;
    };
  e.s([
    "f",
    0,
    20,
    "M",
    0,
    10,
    "c",
    0,
    24,
    "p",
    0,
    (e, t, n = []) => ({
      id: crypto.randomUUID(),
      name: a(e) ?? "List",
      kind: t,
      members: i(n),
    }),
    "L",
    0,
    i,
    "C",
    0,
    a,
    "P",
    0,
    (e) => {
      if (!Array.isArray(e)) return [];
      let n = new Set(),
        l = [];
      for (let r of e) {
        if (l.length >= 10) break;
        if ("object" != typeof r || null === r) continue;
        let { id: e, name: s, kind: d, members: o } = r;
        if ("string" != typeof e || 0 === e.length || n.has(e)) continue;
        let u = a(s);
        u &&
          t(d) &&
          (n.add(e), l.push({ id: e, name: u, kind: d, members: i(o) }));
      }
      return l;
    },
  ]);
};
