// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(813968);
  function i(t, e) {
    return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
  }
  let s = {
    correct: (t, s) => {
      if (!s.target) return t;
      if ("string" == typeof t)
        if (!e.L.test(t)) return t;
        else t = parseFloat(t);
      let r = i(t, s.target.x),
        n = i(t, s.target.y);
      return `${r}% ${n}%`;
    },
  };
  t.s(["f", 0, s]);
};
