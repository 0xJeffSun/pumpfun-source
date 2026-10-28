// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(955337),
    o = t.r(410090),
    i = t.r(778116),
    a = t.r(432816),
    u = t.r(860059),
    c = t.r(905330),
    l = Object.prototype.hasOwnProperty;
  e.exports = function (t, e) {
    var r = i(t),
      s = !r && o(t),
      f = !r && !s && a(t),
      p = !r && !s && !f && c(t),
      d = r || s || f || p,
      h = d ? n(t.length, String) : [],
      y = h.length;
    for (var v in t)
      (e || l.call(t, v)) &&
        !(
          d &&
          ("length" == v ||
            (f && ("offset" == v || "parent" == v)) ||
            (p && ("buffer" == v || "byteLength" == v || "byteOffset" == v)) ||
            u(v, y))
        ) &&
        h.push(v);
    return h;
  };
};
