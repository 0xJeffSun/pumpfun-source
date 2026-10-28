// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(798430),
    o = t.r(878524),
    i = t.r(692558),
    a = /^[-+]0x[0-9a-f]+$/i,
    u = /^0b[01]+$/i,
    c = /^0o[0-7]+$/i,
    l = parseInt;
  e.exports = function (t) {
    if ("number" == typeof t) return t;
    if (i(t)) return 0 / 0;
    if (o(t)) {
      var e = "function" == typeof t.valueOf ? t.valueOf() : t;
      t = o(e) ? e + "" : e;
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = n(t);
    var r = u.test(t);
    return r || c.test(t) ? l(t.slice(2), r ? 2 : 8) : a.test(t) ? 0 / 0 : +t;
  };
};
