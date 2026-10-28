// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(787331),
    o = t.r(878524);
  e.exports = function (t, e, r) {
    var i = !0,
      a = !0;
    if ("function" != typeof t) throw TypeError("Expected a function");
    return (
      o(r) &&
        ((i = "leading" in r ? !!r.leading : i),
        (a = "trailing" in r ? !!r.trailing : a)),
      n(t, e, { leading: i, maxWait: e, trailing: a })
    );
  };
};
