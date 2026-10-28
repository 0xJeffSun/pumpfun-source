// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
      if (!e) return !1;
      let t = e.trim();
      return t.length > 0 && t === e;
    },
    i = (e, i) => (i && t(i) ? encodeURIComponent(i) : e);
  function r(e) {
    if (null == e) return null;
    let t =
      "string" == typeof e ? e : e.address?.trim() || e.userId?.trim() || "";
    return t ? `/profile/${encodeURIComponent(t)}` : null;
  }
  e.s([
    "C",
    0,
    t,
    "h",
    0,
    ({ address: e, username: t, userId: n }) => {
      let a = i(e?.trim() ?? "", t);
      return a ? `/profile/${a}` : r({ userId: n });
    },
    "$",
    0,
    r,
    "d",
    0,
    (e, t) => `/profile/${i(e, t)}`,
    "E",
    0,
    (e, t, r, n) => {
      let a = i(t, r);
      if (e === a || e === t || (n && e === n)) return !0;
      try {
        return e === decodeURIComponent(a);
      } catch {
        return !1;
      }
    },
  ]);
};
