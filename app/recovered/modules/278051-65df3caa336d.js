// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(352386),
    n = e.i(303232);
  let r = t[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)],
    i = r && r !== t.useLayoutEffect ? r : (e) => e();
  function o() {
    let e = {
      next: void 0,
      callback: l,
      trampoline: (...t) => e.callback?.(...t),
      effect: () => {
        e.callback = e.next;
      },
    };
    return e;
  }
  function l() {}
  e.s([
    "f",
    0,
    function (e) {
      let t = (0, n.f)(o).current;
      return ((t.next = e), i(t.effect), t.trampoline);
    },
  ]);
};
