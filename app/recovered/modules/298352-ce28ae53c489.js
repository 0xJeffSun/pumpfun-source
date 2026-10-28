// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  function r(t) {
    if (("number" == typeof t && (t = t.toString()), "string" != typeof t))
      throw Error("Color should be defined as hex string");
    let e = t.slice().replace("#", "").split("");
    if (e.length < 3 || 5 === e.length || e.length > 8)
      throw Error("Invalid hex color: " + t);
    ((3 === e.length || 4 === e.length) &&
      (e = Array.prototype.concat.apply(
        [],
        e.map(function (t) {
          return [t, t];
        }),
      )),
      6 === e.length && e.push("F", "F"));
    let i = parseInt(e.join(""), 16);
    return {
      r: (i >> 24) & 255,
      g: (i >> 16) & 255,
      b: (i >> 8) & 255,
      a: 255 & i,
      hex: "#" + e.slice(0, 6).join(""),
    };
  }
  ((i.getOptions = function (t) {
    (t || (t = {}), t.color || (t.color = {}));
    let e =
        void 0 === t.margin || null === t.margin || t.margin < 0 ? 4 : t.margin,
      i = t.width && t.width >= 21 ? t.width : void 0,
      o = t.scale || 4;
    return {
      width: i,
      scale: i ? 4 : o,
      margin: e,
      color: {
        dark: r(t.color.dark || "#000000ff"),
        light: r(t.color.light || "#ffffffff"),
      },
      type: t.type,
      rendererOpts: t.rendererOpts || {},
    };
  }),
    (i.getScale = function (t, e) {
      return e.width && e.width >= t + 2 * e.margin
        ? e.width / (t + 2 * e.margin)
        : e.scale;
    }),
    (i.getImageWidth = function (t, e) {
      let r = i.getScale(t, e);
      return Math.floor((t + 2 * e.margin) * r);
    }),
    (i.qrToImageData = function (t, e, r) {
      let o = e.modules.size,
        n = e.modules.data,
        a = i.getScale(o, r),
        s = Math.floor((o + 2 * r.margin) * a),
        l = r.margin * a,
        c = [r.color.light, r.color.dark];
      for (let e = 0; e < s; e++)
        for (let i = 0; i < s; i++) {
          let u = (e * s + i) * 4,
            d = r.color.light;
          (e >= l &&
            i >= l &&
            e < s - l &&
            i < s - l &&
            (d =
              c[+!!n[Math.floor((e - l) / a) * o + Math.floor((i - l) / a)]]),
            (t[u++] = d.r),
            (t[u++] = d.g),
            (t[u++] = d.b),
            (t[u] = d.a));
        }
    }));
};
