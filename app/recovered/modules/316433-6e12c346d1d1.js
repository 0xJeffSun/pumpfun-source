// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(692558);
  e.exports = function (t, e) {
    if (t !== e) {
      var r = void 0 !== t,
        o = null === t,
        i = t == t,
        a = n(t),
        u = void 0 !== e,
        c = null === e,
        l = e == e,
        s = n(e);
      if (
        (!c && !s && !a && t > e) ||
        (a && u && l && !c && !s) ||
        (o && u && l) ||
        (!r && l) ||
        !i
      )
        return 1;
      if (
        (!o && !a && !s && t < e) ||
        (s && r && i && !o && !a) ||
        (c && r && i) ||
        (!u && i) ||
        !l
      )
        return -1;
    }
    return 0;
  };
};
