// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(980075),
    o = t.r(454118),
    n = t.r(298325),
    a = t.r(598639);
  function s(t, e, i, n, a) {
    let s = [].slice.call(arguments, 1),
      l = s.length,
      c = "function" == typeof s[l - 1];
    if (!c && !r()) throw Error("Callback required as last argument");
    if (c) {
      if (l < 2) throw Error("Too few arguments provided");
      2 === l
        ? ((a = i), (i = e), (e = n = void 0))
        : 3 === l &&
          (e.getContext && void 0 === a
            ? ((a = n), (n = void 0))
            : ((a = n), (n = i), (i = e), (e = void 0)));
    } else {
      if (l < 1) throw Error("Too few arguments provided");
      return (
        1 === l
          ? ((i = e), (e = n = void 0))
          : 2 !== l || e.getContext || ((n = i), (i = e), (e = void 0)),
        new Promise(function (r, a) {
          try {
            let a = o.create(i, n);
            r(t(a, e, n));
          } catch (t) {
            a(t);
          }
        })
      );
    }
    try {
      let r = o.create(i, n);
      a(null, t(r, e, n));
    } catch (t) {
      a(t);
    }
  }
  ((i.create = o.create),
    (i.toCanvas = s.bind(null, n.render)),
    (i.toDataURL = s.bind(null, n.renderToDataURL)),
    (i.toString = s.bind(null, function (t, e, i) {
      return a.render(t, i);
    })));
};
