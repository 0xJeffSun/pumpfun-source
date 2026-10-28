// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641802),
    n = e.i(389238),
    r = e.i(173169),
    i = e.i(415415),
    a = e.i(612164),
    s = e.i(501261),
    o = e.i(990963),
    f = e.i(339513),
    c = e.i(703114);
  function u(e, t = {}) {
    void 0 !== t.size && (0, f.u)(e, { size: t.size });
    let n = (0, c.v)(e);
    return (0, f.T)(n, t);
  }
  var d = e.i(67223),
    b = e.i(411792),
    l = e.i(927974),
    p = e.i(858042);
  function h(e) {
    return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
  }
  e.s(
    [
      "w",
      0,
      function (e) {
        return "string" == typeof e[0]
          ? h(e)
          : (function (e) {
              let t = 0;
              for (let n of e) t += n.length;
              let n = new Uint8Array(t),
                r = 0;
              for (let t of e) (n.set(t, r), (r += t.length));
              return n;
            })(e);
      },
      "s",
      0,
      h,
    ],
    850697,
  );
  var m = e.i(160642);
  let y =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  e.s(["h", 0, /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, "x", 0, y], 244945);
  function g(e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let { dynamic: r, encoded: a } = e[n];
      r ? (t += 32) : (t += (0, i.f)(a));
    }
    let n = [],
      r = [],
      a = 0;
    for (let s = 0; s < e.length; s++) {
      let { dynamic: o, encoded: f } = e[s];
      o
        ? (n.push((0, c.N)(t + a, { size: 32 })), r.push(f), (a += (0, i.f)(f)))
        : n.push(f);
    }
    return h([...n, ...r]);
  }
  function v(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  e.s(
    [
      "N",
      0,
      function (e, n) {
        if (e.length !== n.length)
          throw new t.U({ expectedLength: e.length, givenLength: n.length });
        return g(
          (function ({ params: e, values: n }) {
            let r = [];
            for (let o = 0; o < e.length; o++)
              r.push(
                (function e({ param: n, value: r }) {
                  let o = v(n.type);
                  if (o) {
                    let [i, a] = o;
                    return (function (n, { length: r, param: i }) {
                      let a = null === r;
                      if (!Array.isArray(n)) throw new t.w(n);
                      if (!a && n.length !== r)
                        throw new t.S({
                          expectedLength: r,
                          givenLength: n.length,
                          type: `${i.type}[${r}]`,
                        });
                      let s =
                          0 === n.length &&
                          (function e(t) {
                            let { type: n } = t;
                            if (
                              "string" === n ||
                              "bytes" === n ||
                              n.endsWith("[]")
                            )
                              return !0;
                            if ("tuple" === n) return t.components.some(e);
                            let r = v(n);
                            return !!r && e({ ...t, type: r[1] });
                          })(i),
                        o = [];
                      for (let t = 0; t < n.length; t++) {
                        let r = e({ param: i, value: n[t] });
                        (r.dynamic && (s = !0), o.push(r));
                      }
                      if (a || s) {
                        let e = g(o);
                        if (a)
                          return {
                            dynamic: !0,
                            encoded: h([(0, c.N)(o.length, { size: 32 }), e]),
                          };
                        if (s) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: h(o.map(({ encoded: e }) => e)),
                      };
                    })(r, { length: i, param: { ...n, type: a } });
                  }
                  if ("tuple" === n.type)
                    return (function (t, { param: n }) {
                      let r = !1,
                        i = [];
                      for (let a = 0; a < n.components.length; a++) {
                        let s = n.components[a],
                          o = Array.isArray(t) ? a : s.name,
                          f = e({ param: s, value: t[o] });
                        (i.push(f), f.dynamic && (r = !0));
                      }
                      return {
                        dynamic: r,
                        encoded: r ? g(i) : h(i.map(({ encoded: e }) => e)),
                      };
                    })(r, { param: n });
                  if ("address" === n.type) {
                    var f = r;
                    if (!(0, p.f)(f)) throw new b.f({ address: f });
                    return { dynamic: !1, encoded: (0, m.n)(f.toLowerCase()) };
                  }
                  if ("bool" === n.type) {
                    var u = r;
                    if ("boolean" != typeof u)
                      throw new l.f(
                        `Invalid boolean value: "${u}" (type: ${typeof u}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, m.n)((0, c.V)(u)) };
                  }
                  if (n.type.startsWith("uint") || n.type.startsWith("int")) {
                    let e = n.type.startsWith("int"),
                      [, , t = "256"] = y.exec(n.type) ?? [];
                    return (function (e, { signed: t, size: n = 256 }) {
                      if ("number" == typeof n) {
                        let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
                          i = t ? -r - 1n : 0n;
                        if (e > r || e < i)
                          throw new s.d({
                            max: r.toString(),
                            min: i.toString(),
                            signed: t,
                            size: n / 8,
                            value: e.toString(),
                          });
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, c.N)(e, { size: 32, signed: t }),
                      };
                    })(r, { signed: e, size: Number(t) });
                  }
                  if (n.type.startsWith("bytes"))
                    return (function (e, { param: n }) {
                      let [, r] = n.type.split("bytes"),
                        a = (0, i.f)(e);
                      if (!r) {
                        let t = e;
                        return (
                          a % 32 != 0 &&
                            (t = (0, m.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: h([
                              (0, m.n)((0, c.N)(a, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (a !== Number.parseInt(r, 10))
                        throw new t.T({
                          expectedSize: Number.parseInt(r, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, m.n)(e, { dir: "right" }),
                      };
                    })(r, { param: n });
                  if ("string" === n.type) {
                    var d = r;
                    let e = (0, c.B)(d),
                      t = Math.ceil((0, i.f)(e) / 32),
                      n = [];
                    for (let r = 0; r < t; r++)
                      n.push(
                        (0, m.n)((0, a.M)(e, 32 * r, (r + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: h([
                        (0, m.n)((0, c.N)((0, i.f)(e), { size: 32 })),
                        ...n,
                      ]),
                    };
                  }
                  throw new t.v(n.type, {
                    docsPath: "/docs/contract/encodeAbiParameters",
                  });
                })({ param: e[o], value: n[o] }),
              );
            return r;
          })({ params: e, values: n }),
        );
      },
      "t",
      0,
      v,
    ],
    640279,
  );
  function w(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(w);
    let n = v(e.type);
    return !!(n && w({ ...e, type: n[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, b) {
        let l = "string" == typeof b ? (0, d.X)(b) : b,
          p = (0, r.f)(l);
        if (0 === (0, i.f)(l) && e.length > 0) throw new t.g();
        if ((0, i.f)(b) && 32 > (0, i.f)(b))
          throw new t.D({
            data: "string" == typeof b ? b : (0, c.v)(b),
            params: e,
            size: (0, i.f)(b),
          });
        let h = 0,
          m = [];
        for (let r = 0; r < e.length; ++r) {
          let i = e[r];
          h < l.length && p.setPosition(h);
          let [d, b] = (function e(r, i, { staticPosition: d }) {
            let b = v(i.type);
            if (b) {
              let [t, n] = b;
              return (function (t, n, { length: r, staticPosition: i }) {
                if (null === r) {
                  let r = i + u(t.readBytes(32)),
                    a = r + 32;
                  t.setPosition(r);
                  let s = u(t.readBytes(32)),
                    o = w(n),
                    f = 0,
                    c = [];
                  for (let r = 0; r < s; ++r) {
                    t.setPosition(a + (o ? 32 * r : f));
                    let [i, s] = e(t, n, { staticPosition: a });
                    ((f += s),
                      c.push(i),
                      0 === s && (t.assertReadLimit(), t._touch()));
                  }
                  return (t.setPosition(i + 32), [c, 32]);
                }
                if (w(n)) {
                  let a = i + u(t.readBytes(32)),
                    s = [];
                  for (let i = 0; i < r; ++i) {
                    t.setPosition(a + 32 * i);
                    let [r] = e(t, n, { staticPosition: a });
                    s.push(r);
                  }
                  return (t.setPosition(i + 32), [s, 32]);
                }
                let a = 0,
                  s = [];
                for (let o = 0; o < r; ++o) {
                  let [r, o] = e(t, n, { staticPosition: i + a });
                  ((a += o),
                    s.push(r),
                    0 === o && (t.assertReadLimit(), t._touch()));
                }
                return [s, a];
              })(r, { ...i, type: n }, { length: t, staticPosition: d });
            }
            if ("tuple" === i.type)
              return (function (t, n, { staticPosition: r }) {
                let i =
                    0 === n.components.length ||
                    n.components.some(({ name: e }) => !e),
                  a = i ? [] : {},
                  s = 0;
                if (w(n)) {
                  let o = r + u(t.readBytes(32));
                  for (let r = 0; r < n.components.length; ++r) {
                    let f = n.components[r];
                    t.setPosition(o + s);
                    let [c, u] = e(t, f, { staticPosition: o });
                    ((s += u), (a[i ? r : f?.name] = c));
                  }
                  return (t.setPosition(r + 32), [a, 32]);
                }
                for (let o = 0; o < n.components.length; ++o) {
                  let f = n.components[o],
                    [c, u] = e(t, f, { staticPosition: r });
                  ((a[i ? o : f?.name] = c), (s += u));
                }
                return [a, s];
              })(r, i, { staticPosition: d });
            if ("address" === i.type) {
              let e;
              return (
                (e = r.readBytes(32)),
                [(0, n.b)((0, c.v)((0, a.S)(e, -20))), 32]
              );
            }
            if ("bool" === i.type)
              return [
                (function (e, t = {}) {
                  let n = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, f.u)(n, { size: t.size }), (n = (0, o.f)(n))),
                    n.length > 1 || n[0] > 1)
                  )
                    throw new s.C(n);
                  return !!n[0];
                })(r.readBytes(32), { size: 32 }),
                32,
              ];
            if (i.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: n }) {
                let [r, i] = t.type.split("bytes");
                if (!i) {
                  let t = u(e.readBytes(32));
                  e.setPosition(n + t);
                  let r = u(e.readBytes(32));
                  if (0 === r) return (e.setPosition(n + 32), ["0x", 32]);
                  let i = e.readBytes(r);
                  return (e.setPosition(n + 32), [(0, c.v)(i), 32]);
                }
                return [(0, c.v)(e.readBytes(Number.parseInt(i, 10), 32)), 32];
              })(r, i, { staticPosition: d });
            if (i.type.startsWith("uint") || i.type.startsWith("int")) {
              var l, p;
              let e, t, n;
              return (
                (l = r),
                (e = (p = i).type.startsWith("int")),
                (t = Number.parseInt(p.type.split("int")[1] || "256", 10)),
                (n = l.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, f.u)(e, { size: t.size });
                        let n = (0, c.v)(e);
                        return (0, f.K)(n, t);
                      })(n, { signed: e })
                    : u(n, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === i.type)
              return (function (e, { staticPosition: t }) {
                let n = u(e.readBytes(32));
                e.setPosition(t + n);
                let r = u(e.readBytes(32));
                if (0 === r) return (e.setPosition(t + 32), ["", 32]);
                let i = (function (e, t = {}) {
                  let n = e;
                  return (
                    void 0 !== t.size &&
                      ((0, f.u)(n, { size: t.size }),
                      (n = (0, o.f)(n, { dir: "right" }))),
                    new TextDecoder().decode(n)
                  );
                })(e.readBytes(r, 32));
                return (e.setPosition(t + 32), [i, 32]);
              })(r, { staticPosition: d });
            throw new t.l(i.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(p, i, { staticPosition: 0 });
          ((h += b), m.push(d));
        }
        return m;
      },
    ],
    990834,
  );
};
