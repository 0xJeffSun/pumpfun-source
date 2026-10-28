// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(158774);
  function o(t, e) {
    if ("function" != typeof t || (null != e && "function" != typeof e))
      throw TypeError("Expected a function");
    var r = function () {
      var n = arguments,
        o = e ? e.apply(this, n) : n[0],
        i = r.cache;
      if (i.has(o)) return i.get(o);
      var a = t.apply(this, n);
      return ((r.cache = i.set(o, a) || i), a);
    };
    return ((r.cache = new (o.Cache || n)()), r);
  }
  ((o.Cache = n), (e.exports = o));
};
