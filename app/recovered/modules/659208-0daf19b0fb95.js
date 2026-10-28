// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(352386),
    r = e.i(303232);
  let i = [];
  function o(e) {
    let n = (n, o) => {
      let s,
        u = (0, r.f)(l).current;
      try {
        for (let e of ((t = u), i)) e.before(u);
        for (let t of ((s = e(n, o)), i)) t.after(u);
        u.didInitialize = !0;
      } finally {
        t = void 0;
      }
      return s;
    };
    return ((n.displayName = e.displayName || e.name), n);
  }
  function l() {
    return { didInitialize: !1 };
  }
  e.s([
    "U",
    0,
    o,
    "u",
    0,
    function (e) {
      return n.forwardRef(o(e));
    },
    "_",
    0,
    function () {
      return t;
    },
    "V",
    0,
    function (e) {
      i.push(e);
    },
  ]);
};
