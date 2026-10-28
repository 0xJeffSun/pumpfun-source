// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(530689),
    o = t.r(364367),
    i = t.r(61494),
    a = t.r(3442);
  function l(t, e, r, i, a) {
    let l = [].slice.call(arguments, 1),
      s = l.length,
      u = "function" == typeof l[s - 1];
    if (!u && !n()) throw Error("Callback required as last argument");
    if (u) {
      if (s < 2) throw Error("Too few arguments provided");
      2 === s
        ? ((a = r), (r = e), (e = i = void 0))
        : 3 === s &&
          (e.getContext && void 0 === a
            ? ((a = i), (i = void 0))
            : ((a = i), (i = r), (r = e), (e = void 0)));
    } else {
      if (s < 1) throw Error("Too few arguments provided");
      return (
        1 === s
          ? ((r = e), (e = i = void 0))
          : 2 !== s || e.getContext || ((i = r), (r = e), (e = void 0)),
        new Promise(function (n, a) {
          try {
            let a = o.create(r, i);
            n(t(a, e, i));
          } catch (t) {
            a(t);
          }
        })
      );
    }
    try {
      let n = o.create(r, i);
      a(null, t(n, e, i));
    } catch (t) {
      a(t);
    }
  }
  ((r.create = o.create),
    (r.toCanvas = l.bind(null, i.render)),
    (r.toDataURL = l.bind(null, i.renderToDataURL)),
    (r.toString = l.bind(null, function (t, e, r) {
      return a.render(t, r);
    })));
};
