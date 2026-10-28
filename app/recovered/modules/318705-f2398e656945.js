// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(247071),
    i = e.r(580740),
    { ANY: n } = i,
    o = e.r(38104),
    a = e.r(352628),
    l = [new i(">=0.0.0-0")],
    p = [new i(">=0.0.0")],
    c = (e, r, t) => {
      let s, i, c, E, d, f, m;
      if (e === r) return !0;
      if (1 === e.length && e[0].semver === n)
        if (1 === r.length && r[0].semver === n) return !0;
        else e = t.includePrerelease ? l : p;
      if (1 === r.length && r[0].semver === n)
        if (t.includePrerelease) return !0;
        else r = p;
      let I = new Set();
      for (let r of e)
        ">" === r.operator || ">=" === r.operator
          ? (s = h(s, r, t))
          : "<" === r.operator || "<=" === r.operator
            ? (i = u(i, r, t))
            : I.add(r.semver);
      if (I.size > 1) return null;
      if (
        s &&
        i &&
        ((c = a(s.semver, i.semver, t)) > 0 ||
          (0 === c && (">=" !== s.operator || "<=" !== i.operator)))
      )
        return null;
      for (let e of I) {
        if ((s && !o(e, String(s), t)) || (i && !o(e, String(i), t)))
          return null;
        for (let s of r) if (!o(e, String(s), t)) return !1;
        return !0;
      }
      let $ =
          !!i &&
          !t.includePrerelease &&
          !!i.semver.prerelease.length &&
          i.semver,
        R =
          !!s &&
          !t.includePrerelease &&
          !!s.semver.prerelease.length &&
          s.semver;
      for (let e of ($ &&
        1 === $.prerelease.length &&
        "<" === i.operator &&
        0 === $.prerelease[0] &&
        ($ = !1),
      r)) {
        if (
          ((m = m || ">" === e.operator || ">=" === e.operator),
          (f = f || "<" === e.operator || "<=" === e.operator),
          s)
        ) {
          if (
            (R &&
              e.semver.prerelease &&
              e.semver.prerelease.length &&
              e.semver.major === R.major &&
              e.semver.minor === R.minor &&
              e.semver.patch === R.patch &&
              (R = !1),
            ">" === e.operator || ">=" === e.operator)
          ) {
            if ((E = h(s, e, t)) === e && E !== s) return !1;
          } else if (">=" === s.operator && !e.test(s.semver)) return !1;
        }
        if (i) {
          if (
            ($ &&
              e.semver.prerelease &&
              e.semver.prerelease.length &&
              e.semver.major === $.major &&
              e.semver.minor === $.minor &&
              e.semver.patch === $.patch &&
              ($ = !1),
            "<" === e.operator || "<=" === e.operator)
          ) {
            if ((d = u(i, e, t)) === e && d !== i) return !1;
          } else if ("<=" === i.operator && !e.test(i.semver)) return !1;
        }
        if (!e.operator && (i || s) && 0 !== c) return !1;
      }
      return (
        (!s || !f || !!i || 0 === c) &&
        (!i || !m || !!s || 0 === c) &&
        !R &&
        !$ &&
        !0
      );
    },
    h = (e, r, t) => {
      if (!e) return r;
      let s = a(e.semver, r.semver, t);
      return s > 0
        ? e
        : s < 0 || (">" === r.operator && ">=" === e.operator)
          ? r
          : e;
    },
    u = (e, r, t) => {
      if (!e) return r;
      let s = a(e.semver, r.semver, t);
      return s < 0
        ? e
        : s > 0 || ("<" === r.operator && "<=" === e.operator)
          ? r
          : e;
    };
  r.exports = (e, r, t = {}) => {
    if (e === r) return !0;
    ((e = new s(e, t)), (r = new s(r, t)));
    let i = !1;
    e: for (let s of e.set) {
      for (let e of r.set) {
        let r = c(s, e, t);
        if (((i = i || null !== r), r)) continue e;
      }
      if (i) return !1;
    }
    return !0;
  };
};
