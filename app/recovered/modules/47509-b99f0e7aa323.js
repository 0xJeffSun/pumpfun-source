// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(411365),
    n = e.i(54913),
    r = e.i(70296);
  let i = [];
  e.s([
    "f",
    0,
    function (e, o, s, u) {
      var a, l;
      let c = ((a = s), (l = u), `_dd_c_${a}_${l}`);
      (i.push(
        (0, t.W)(e, window, "storage", ({ key: e }) => {
          c === e && o.setContext(f());
        }),
      ),
        o.changeObservable.subscribe(function () {
          localStorage.setItem(c, JSON.stringify(o.getContext()));
        }));
      let d = (0, n.i)(f(), o.getContext());
      function f() {
        let e = localStorage.getItem(c);
        return e ? JSON.parse(e) : {};
      }
      (0, r.n)(d) || o.setContext(d);
    },
  ]);
};
