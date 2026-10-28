// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386),
    r = e.i(668487);
  let i = (0, r.t)(),
    l = new Set(),
    a = null,
    o = !1;
  function s() {
    for (let e of ((i = (0, r.t)()), [...l])) e();
  }
  function u() {
    null !== a && (clearTimeout(a), (a = null));
  }
  function d() {
    (u(),
      (a = setTimeout(
        () => {
          (s(), d());
        },
        1e3 - ((0, r.t)() % 1e3),
      )));
  }
  function c() {
    let e = (0, r.s)();
    (0, r.G)().then(() => {
      l.size > 0 && (0, r.s)() !== e && s();
    });
  }
  function f() {
    document.hidden ? u() : (s(), d(), c());
  }
  function m(e) {
    let t = 0 === l.size;
    return (
      l.add(e),
      t &&
        (o || (document.addEventListener("visibilitychange", f), (o = !0)),
        (i = (0, r.t)()),
        document.hidden || d(),
        c()),
      () => {
        (l.delete(e),
          0 === l.size &&
            (u(),
            o &&
              (document.removeEventListener("visibilitychange", f), (o = !1))));
      }
    );
  }
  let p = () => () => {};
  e.s([
    "Y",
    0,
    0,
    "H",
    0,
    function (e, r) {
      let l,
        a,
        o = (0, t.c)(5),
        s = void 0 === r || r;
      o[0] !== s || o[1] !== e
        ? ((l = () => e(s ? i : 0)), (o[0] = s), (o[1] = e), (o[2] = l))
        : (l = o[2]);
      let u = l;
      o[3] !== e ? ((a = () => e(0)), (o[3] = e), (o[4] = a)) : (a = o[4]);
      let d = a;
      return (0, n.useSyncExternalStore)(s ? m : p, u, d);
    },
  ]);
};
