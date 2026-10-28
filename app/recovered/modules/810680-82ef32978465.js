// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "home_feed_layout",
    r = { GRID: "grid", TABLE: "table" },
    i = r.TABLE,
    s = new Set(Object.values(r)),
    n = (e) => (e === r.GRID ? r.GRID : e === r.TABLE ? r.TABLE : i);
  e.s([
    "x",
    0,
    i,
    "E",
    0,
    r,
    "g",
    0,
    n,
    "i",
    0,
    () => {
      if ("u" < typeof document) return null;
      for (let e of document.cookie.split(";")) {
        let [r, ...i] = e.trim().split("=");
        if (r === t && i.length > 0) {
          let e = decodeURIComponent(i.join("="));
          return s.has(e) ? e : null;
        }
      }
      return null;
    },
    "b",
    0,
    (e) => {
      if (!e) return i;
      for (let r of e.split(";")) {
        let [e, ...i] = r.trim().split("=");
        if (e === t && i.length > 0) return n(decodeURIComponent(i.join("=")));
      }
      return i;
    },
    "m",
    0,
    (e) => {
      if ("u" < typeof document) return;
      let r = "https:" === location.protocol ? "; secure" : "";
      document.cookie = `${t}=${e}; path=/; max-age=31536000; samesite=lax${r}`;
    },
  ]);
};
