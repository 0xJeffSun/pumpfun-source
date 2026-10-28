// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  let a = { tone: null, nonce: 0 },
    i = {
      up: ["animate-value-flash-up", "animate-value-flash-up-alt"],
      down: ["animate-value-flash-down", "animate-value-flash-down-alt"],
    };
  e.s([
    "v",
    0,
    function (e) {
      let i,
        n,
        l = (0, t.c)(6),
        s = null != e && Number.isFinite(e) ? e : null;
      l[0] !== s
        ? ((i = { value: s, flash: a }), (l[0] = s), (l[1] = i))
        : (i = l[1]);
      let [o, d] = (0, r.useState)(i),
        u = o.value;
      if (Object.is(u, s)) return o.flash;
      l[2] !== u || l[3] !== o.flash.nonce || l[4] !== s
        ? ((n =
            null != s && null != u
              ? {
                  value: s,
                  flash: {
                    tone: s > u ? "up" : "down",
                    nonce: o.flash.nonce + 1,
                  },
                }
              : { value: s, flash: { tone: null, nonce: o.flash.nonce } }),
          (l[2] = u),
          (l[3] = o.flash.nonce),
          (l[4] = s),
          (l[5] = n))
        : (n = l[5]);
      let c = n;
      return (d(c), c.flash);
    },
    "_",
    0,
    function (e, t) {
      let a = null != e && Number.isFinite(e) ? e : null,
        [i, n] = (0, r.useState)(a);
      return null === a
        ? (null !== i && n(null), null)
        : null === i || (0 === i ? 0 !== a : Math.abs((a - i) / i) > t)
          ? (n(a), a)
          : i;
    },
    "a",
    0,
    (e) => (e.tone ? i[e.tone][e.nonce % 2] : void 0),
  ]);
};
