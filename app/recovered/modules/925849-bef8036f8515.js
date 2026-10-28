// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(565693),
    n = e.i(303232);
  function r(e) {
    let t = {
      current: e,
      next: e,
      effect: () => {
        t.current = t.next;
      },
    };
    return t;
  }
  e.s([
    "f",
    0,
    function (e) {
      let i = (0, n.f)(r, e).current;
      return ((i.next = e), (0, t.f)(i.effect), i);
    },
  ]);
};
