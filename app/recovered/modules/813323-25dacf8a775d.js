// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(
    [
      "f",
      0,
      function (t) {
        for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
      },
    ],
    813323,
  );
  let e = (t) => (180 * t) / Math.PI,
    i = (t) => r(e(Math.atan2(t[1], t[0]))),
    s = {
      x: 4,
      y: 5,
      translateX: 4,
      translateY: 5,
      scaleX: 0,
      scaleY: 3,
      scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
      rotate: i,
      rotateZ: i,
      skewX: (t) => e(Math.atan(t[1])),
      skewY: (t) => e(Math.atan(t[2])),
      skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
    },
    r = (t) => ((t %= 360) < 0 && (t += 360), t),
    n = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
    a = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
    o = {
      x: 12,
      y: 13,
      z: 14,
      translateX: 12,
      translateY: 13,
      translateZ: 14,
      scaleX: n,
      scaleY: a,
      scale: (t) => (n(t) + a(t)) / 2,
      rotateX: (t) => r(e(Math.atan2(t[6], t[5]))),
      rotateY: (t) => r(e(Math.atan2(-t[2], t[0]))),
      rotateZ: i,
      rotate: i,
      skewX: (t) => e(Math.atan(t[4])),
      skewY: (t) => e(Math.atan(t[1])),
      skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
    };
  function l(t) {
    return +!!t.includes("scale");
  }
  function h(t, e) {
    let i, r;
    if (!t || "none" === t) return l(e);
    let n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    if (n) ((i = o), (r = n));
    else {
      let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
      ((i = s), (r = e));
    }
    if (!r) return l(e);
    let a = i[e],
      h = r[1].split(",").map(u);
    return "function" == typeof a ? a(h) : h[a];
  }
  function u(t) {
    return parseFloat(t.trim());
  }
  t.s(
    [
      "P",
      0,
      l,
      "g",
      0,
      h,
      "o",
      0,
      (t, e) => {
        let { transform: i = "none" } = getComputedStyle(t);
        return h(i, e);
      },
    ],
    829451,
  );
};
