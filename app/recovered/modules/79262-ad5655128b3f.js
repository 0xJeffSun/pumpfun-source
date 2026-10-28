// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(878660),
    r = t.i(944445),
    n = t.i(288667);
  let i = e.s;
  function o(t, e) {
    if ((l(t), l(e), t < 0 || t >= 1 << (8 * e)))
      throw Error("invalid I2OSP input: " + t);
    let r = Array.from({ length: e }).fill(0);
    for (let n = e - 1; n >= 0; n--) ((r[n] = 255 & t), (t >>>= 8));
    return new Uint8Array(r);
  }
  function l(t) {
    if (!Number.isSafeInteger(t)) throw Error("number expected");
  }
  function s(t) {
    if (!(0, r.g)(t) && "string" != typeof t)
      throw Error("DST must be Uint8Array or string");
    return "string" == typeof t ? (0, r.k)(t) : t;
  }
  function u(t, e, n, i) {
    ((0, r.C)(t),
      l(n),
      (e = s(e)).length > 255 &&
        (e = i((0, r.t)((0, r.k)("H2C-OVERSIZE-DST-"), e))));
    let { outputLen: u, blockLen: a } = i,
      f = Math.ceil(n / u);
    if (n > 65535 || f > 255)
      throw Error("expand_message_xmd: invalid lenInBytes");
    let d = (0, r.t)(e, o(e.length, 1)),
      c = o(0, a),
      h = o(n, 2),
      m = Array(f),
      p = i((0, r.t)(c, t, h, o(0, 1), d));
    m[0] = i((0, r.t)(p, o(1, 1), d));
    for (let t = 1; t <= f; t++) {
      let e = [
        (function (t, e) {
          let r = new Uint8Array(t.length);
          for (let n = 0; n < t.length; n++) r[n] = t[n] ^ e[n];
          return r;
        })(p, m[t - 1]),
        o(t + 1, 1),
        d,
      ];
      m[t] = i((0, r.t)(...e));
    }
    return (0, r.t)(...m).slice(0, n);
  }
  function a(t, a, f) {
    let d;
    (0, e.S)(f, { p: "bigint", m: "number", k: "number", hash: "function" });
    let { p: c, k: h, m, hash: p, expand: g, DST: y } = f;
    if (!(0, e.N)(f.hash)) throw Error("expected valid hash");
    ((0, r.C)(t), l(a));
    let w = Math.ceil((c.toString(2).length + h) / 8),
      E = a * m * w;
    if ("xmd" === g) d = u(t, y, E, p);
    else if ("xof" === g)
      d = (function (t, e, n, i, u) {
        if (((0, r.C)(t), l(n), (e = s(e)).length > 255)) {
          let t = Math.ceil((2 * i) / 8);
          e = u
            .create({ dkLen: t })
            .update((0, r.k)("H2C-OVERSIZE-DST-"))
            .update(e)
            .digest();
        }
        if (n > 65535 || e.length > 255)
          throw Error("expand_message_xof: invalid lenInBytes");
        return u
          .create({ dkLen: n })
          .update(t)
          .update(o(n, 2))
          .update(e)
          .update(o(e.length, 1))
          .digest();
      })(t, y, E, h, p);
    else if ("_internal_pass" === g) d = t;
    else throw Error('expand must be "xmd" or "xof"');
    let b = Array(a);
    for (let t = 0; t < a; t++) {
      let e = Array(m);
      for (let r = 0; r < m; r++) {
        let o = w * (r + t * m),
          l = d.subarray(o, o + w);
        e[r] = (0, n.K)(i(l), c);
      }
      b[t] = e;
    }
    return b;
  }
  let f = (0, r.k)("HashToScalar-");
  t.s([
    "C",
    0,
    f,
    "O",
    0,
    function (t, e, r) {
      if ("function" != typeof e) throw Error("mapToCurve() must be defined");
      function n(r) {
        return t.fromAffine(e(r));
      }
      function i(e) {
        let r = e.clearCofactor();
        return r.equals(t.ZERO) ? t.ZERO : (r.assertValidity(), r);
      }
      return {
        defaults: r,
        hashToCurve(t, e) {
          let o = a(t, 2, Object.assign({}, r, e)),
            l = n(o[0]),
            s = n(o[1]);
          return i(l.add(s));
        },
        encodeToCurve(t, e) {
          let o = r.encodeDST ? { DST: r.encodeDST } : {};
          return i(n(a(t, 1, Object.assign({}, r, o, e))[0]));
        },
        mapToCurve(t) {
          if (!Array.isArray(t)) throw Error("expected array of bigints");
          for (let e of t)
            if ("bigint" != typeof e) throw Error("expected array of bigints");
          return i(n(t));
        },
        hashToScalar: (e, n) =>
          a(
            e,
            1,
            Object.assign({}, r, { p: t.Fn.ORDER, m: 1, DST: f }, n),
          )[0][0],
      };
    },
    "y",
    0,
    u,
    "J",
    0,
    function (t, e) {
      let r = e.map((t) => Array.from(t).reverse());
      return (e, i) => {
        let [o, l, s, u] = r.map((r) =>
            r.reduce((r, n) => t.add(t.mul(r, e), n)),
          ),
          [a, f] = (0, n.R)(t, [l, u], !0);
        return ((e = t.mul(o, a)), (i = t.mul(i, t.mul(s, f))), { x: e, y: i });
      };
    },
  ]);
};
