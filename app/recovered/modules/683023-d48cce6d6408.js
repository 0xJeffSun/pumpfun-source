// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
    if (!e || "object" != typeof e) return null;
    let { address: t, userId: n, roles: r, permissions: i, exp: l, iat: a } = e;
    return "string" == typeof t && Number.isFinite(l)
      ? {
          address: t,
          ...("string" == typeof n && "" !== n ? { userId: n } : {}),
          roles: Array.isArray(r) ? r : [],
          ...(Array.isArray(i) && i.every((e) => "string" == typeof e)
            ? { permissions: i }
            : {}),
          exp: l,
          iat: Number.isFinite(a) ? a : 0,
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
        let n = e.split(".");
        if (3 !== n.length) return null;
        let r = n[1];
        if (!r) return null;
        return t(JSON.parse(atob(r.replace(/-/g, "+").replace(/_/g, "/"))));
      } catch {
        return null;
      }
    },
  ]);
};
