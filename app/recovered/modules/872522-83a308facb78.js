// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(352386);
  let i = { tone: null, nonce: 0 },
    l = {
      up: ["animate-value-flash-up", "animate-value-flash-up-alt"],
      down: ["animate-value-flash-down", "animate-value-flash-down-alt"],
    };
  e.s([
    "v",
    0,
    function (e) {
      let l,
        r,
        n = (0, t.c)(6),
        o = null != e && Number.isFinite(e) ? e : null;
      n[0] !== o
        ? ((l = { value: o, flash: i }), (n[0] = o), (n[1] = l))
        : (l = n[1]);
      let [s, d] = (0, a.useState)(l),
        c = s.value;
      if (Object.is(c, o)) return s.flash;
      n[2] !== c || n[3] !== s.flash.nonce || n[4] !== o
        ? ((r =
            null != o && null != c
              ? {
                  value: o,
                  flash: {
                    tone: o > c ? "up" : "down",
                    nonce: s.flash.nonce + 1,
                  },
                }
              : { value: o, flash: { tone: null, nonce: s.flash.nonce } }),
          (n[2] = c),
          (n[3] = s.flash.nonce),
          (n[4] = o),
          (n[5] = r))
        : (r = n[5]);
      let u = r;
      return (d(u), u.flash);
    },
    "_",
    0,
    function (e, t) {
      let i = null != e && Number.isFinite(e) ? e : null,
        [l, r] = (0, a.useState)(i);
      return null === i
        ? (null !== l && r(null), null)
        : null === l || (0 === l ? 0 !== i : Math.abs((i - l) / l) > t)
          ? (r(i), i)
          : l;
    },
    "a",
    0,
    (e) => (e.tone ? l[e.tone][e.nonce % 2] : void 0),
  ]);
};
