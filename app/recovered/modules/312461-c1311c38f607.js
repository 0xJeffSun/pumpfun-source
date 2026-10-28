// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(401542),
    i = e.r(424522),
    { safeRe: n, t: o } = e.r(990950);
  r.exports = (e, r) => {
    if (e instanceof s) return e;
    if (("number" == typeof e && (e = String(e)), "string" != typeof e))
      return null;
    let t = null;
    if ((r = r || {}).rtl) {
      let s,
        i = r.includePrerelease ? n[o.COERCERTLFULL] : n[o.COERCERTL];
      for (; (s = i.exec(e)) && (!t || t.index + t[0].length !== e.length); )
        ((t && s.index + s[0].length === t.index + t[0].length) || (t = s),
          (i.lastIndex = s.index + s[1].length + s[2].length));
      i.lastIndex = -1;
    } else t = e.match(r.includePrerelease ? n[o.COERCEFULL] : n[o.COERCE]);
    if (null === t) return null;
    let a = t[2],
      l = t[3] || "0",
      p = t[4] || "0",
      c = r.includePrerelease && t[5] ? `-${t[5]}` : "",
      h = r.includePrerelease && t[6] ? `+${t[6]}` : "";
    return i(`${a}.${l}.${p}${c}${h}`, r);
  };
};
