// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new WeakSet(),
    r = (e) =>
      "object" == typeof e &&
      null !== e &&
      !Array.isArray(e) &&
      Object.getPrototypeOf(e) === Object.prototype,
    i = (e, t) => {
      if (Array.isArray(e) && Array.isArray(t))
        return Array.from({ length: Math.max(e.length, t.length) }, (r, s) =>
          s < t.length ? i(e[s], t[s]) : e[s],
        );
      if (!r(e) || !r(t)) return t;
      let s = { ...e };
      for (let [e, r] of Object.entries(t)) s[e] = e in s ? i(s[e], r) : r;
      return s;
    },
    s = (e) => {
      try {
        let t = window.localStorage.getItem(e.key);
        if (null === t) return;
        if ("raw" === e.codec) return e.map(t);
        return e.map(JSON.parse(t));
      } catch {
        return;
      }
    };
  e.s([
    "f",
    0,
    (e) => {
      if (t.has(e)) return;
      t.add(e);
      let r = e.legacy;
      if (!r || 0 === r.length || void 0 !== e.adapter.read()) return;
      let n = e.default,
        o = !1;
      for (let e of r) {
        let t = s(e);
        void 0 !== t && ((o = !0), (n = i(n, t)));
      }
      if (o) {
        for (let t of (e.adapter.write(e.coerce(n)), r))
          if (!1 !== t.removeAfterAdopt)
            try {
              window.localStorage.removeItem(t.key);
            } catch {}
      }
    },
  ]);
};
