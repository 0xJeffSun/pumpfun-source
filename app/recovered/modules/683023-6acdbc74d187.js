// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
    if (!e || "object" != typeof e) return null;
    let { address: t, userId: r, roles: n, permissions: i, exp: s, iat: o } = e;
    return "string" == typeof t && Number.isFinite(s)
      ? {
          address: t,
          ...("string" == typeof r && "" !== r ? { userId: r } : {}),
          roles: Array.isArray(n) ? n : [],
          ...(Array.isArray(i) && i.every((e) => "string" == typeof e)
            ? { permissions: i }
            : {}),
          exp: s,
          iat: Number.isFinite(o) ? o : 0,
        }
      : null;
  };
  e.s([
    "S",
    0,
    t,
    "e",
    0,
    (e) => {
      if (!e) return null;
      try {
        let r = e.split(".");
        if (3 !== r.length) return null;
        let n = r[1];
        if (!n) return null;
        return t(JSON.parse(atob(n.replace(/-/g, "+").replace(/_/g, "/"))));
      } catch {
        return null;
      }
    },
  ]);
};
