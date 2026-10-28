// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(490831),
    n = e.i(612528),
    r = e.i(850936),
    a = e.i(539788),
    i = e.i(612684),
    s = e.i(31858),
    o = e.i(395255),
    f = e.i(932883),
    c = e.i(310191);
  function u(e, t = {}) {
    void 0 !== t.size && (0, f.u)(e, { size: t.size });
    let n = (0, c.v)(e, t);
    return (0, f.T)(n, t);
  }
  var l = e.i(821316),
    d = e.i(572659),
    b = e.i(548801),
    p = e.i(821292);
  function h(e) {
    return "string" == typeof e[0]
      ? m(e)
      : (function (e) {
          let t = 0;
          for (let n of e) t += n.length;
          let n = new Uint8Array(t),
            r = 0;
          for (let t of e) (n.set(t, r), (r += t.length));
          return n;
        })(e);
  }
  function m(e) {
    return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
  }
  e.s(["w", 0, h, "s", 0, m], 296354);
  var y = e.i(237098);
  let g =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  e.s(["h", 0, /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, "x", 0, g], 569318);
  function v(e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let { dynamic: r, encoded: i } = e[n];
      r ? (t += 32) : (t += (0, a.f)(i));
    }
    let n = [],
      r = [],
      i = 0;
    for (let s = 0; s < e.length; s++) {
      let { dynamic: o, encoded: f } = e[s];
      o
        ? (n.push((0, c.N)(t + i, { size: 32 })), r.push(f), (i += (0, a.f)(f)))
        : n.push(f);
    }
    return h([...n, ...r]);
  }
  function w(e) {
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
        let r = v(
          (function ({ params: e, values: n }) {
            let r = [];
            for (let s = 0; s < e.length; s++)
              r.push(
                (function e({ param: n, value: r }) {
                  let s = w(n.type);
                  if (s) {
                    let [a, i] = s;
                    return (function (n, { length: r, param: a }) {
                      let i = null === r;
                      if (!Array.isArray(n)) throw new t.w(n);
                      if (!i && n.length !== r)
                        throw new t.S({
                          expectedLength: r,
                          givenLength: n.length,
                          type: `${a.type}[${r}]`,
                        });
                      let s = !1,
                        o = [];
                      for (let t = 0; t < n.length; t++) {
                        let r = e({ param: a, value: n[t] });
                        (r.dynamic && (s = !0), o.push(r));
                      }
                      if (i || s) {
                        let e = v(o);
                        if (i) {
                          let t = (0, c.N)(o.length, { size: 32 });
                          return {
                            dynamic: !0,
                            encoded: o.length > 0 ? h([t, e]) : t,
                          };
                        }
                        if (s) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: h(o.map(({ encoded: e }) => e)),
                      };
                    })(r, { length: a, param: { ...n, type: i } });
                  }
                  if ("tuple" === n.type)
                    return (function (t, { param: n }) {
                      let r = !1,
                        a = [];
                      for (let i = 0; i < n.components.length; i++) {
                        let s = n.components[i],
                          o = Array.isArray(t) ? i : s.name,
                          f = e({ param: s, value: t[o] });
                        (a.push(f), f.dynamic && (r = !0));
                      }
                      return {
                        dynamic: r,
                        encoded: r ? v(a) : h(a.map(({ encoded: e }) => e)),
                      };
                    })(r, { param: n });
                  if ("address" === n.type) {
                    var f = r;
                    if (!(0, p.f)(f)) throw new d.f({ address: f });
                    return { dynamic: !1, encoded: (0, y.n)(f.toLowerCase()) };
                  }
                  if ("bool" === n.type) {
                    var u = r;
                    if ("boolean" != typeof u)
                      throw new b.f(
                        `Invalid boolean value: "${u}" (type: ${typeof u}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, y.n)((0, c.V)(u)) };
                  }
                  if (n.type.startsWith("uint") || n.type.startsWith("int")) {
                    let e = n.type.startsWith("int"),
                      [, , t = "256"] = g.exec(n.type) ?? [];
                    return (function (e, { signed: t, size: n = 256 }) {
                      if ("number" == typeof n) {
                        let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
                          a = t ? -r - 1n : 0n;
                        if (e > r || e < a)
                          throw new o.d({
                            max: r.toString(),
                            min: a.toString(),
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
                        i = (0, a.f)(e);
                      if (!r) {
                        let t = e;
                        return (
                          i % 32 != 0 &&
                            (t = (0, y.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: h([
                              (0, y.n)((0, c.N)(i, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (i !== Number.parseInt(r, 10))
                        throw new t.T({
                          expectedSize: Number.parseInt(r, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, y.n)(e, { dir: "right" }),
                      };
                    })(r, { param: n });
                  if ("string" === n.type) {
                    var l = r;
                    let e = (0, c.B)(l),
                      t = Math.ceil((0, a.f)(e) / 32),
                      n = [];
                    for (let r = 0; r < t; r++)
                      n.push(
                        (0, y.n)((0, i.M)(e, 32 * r, (r + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: h([
                        (0, y.n)((0, c.N)((0, a.f)(e), { size: 32 })),
                        ...n,
                      ]),
                    };
                  }
                  throw new t.v(n.type, {
                    docsPath: "/docs/contract/encodeAbiParameters",
                  });
                })({ param: e[s], value: n[s] }),
              );
            return r;
          })({ params: e, values: n }),
        );
        return 0 === r.length ? "0x" : r;
      },
      "t",
      0,
      w,
    ],
    141569,
  );
  function $(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some($);
    let n = w(e.type);
    return !!(n && $({ ...e, type: n[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, d) {
        let b = "string" == typeof d ? (0, l.X)(d) : d,
          p = (0, r.f)(b);
        if (0 === (0, a.f)(b) && e.length > 0) throw new t.g();
        if ((0, a.f)(d) && 32 > (0, a.f)(d))
          throw new t.D({
            data: "string" == typeof d ? d : (0, c.v)(d),
            params: e,
            size: (0, a.f)(d),
          });
        let h = 0,
          m = [];
        for (let r = 0; r < e.length; ++r) {
          let a = e[r];
          p.setPosition(h);
          let [l, d] = (function e(r, a, { staticPosition: l }) {
            let d = w(a.type);
            if (d) {
              let [t, n] = d;
              return (function (t, n, { length: r, staticPosition: a }) {
                if (!r) {
                  let r = a + u(t.readBytes(32)),
                    i = r + 32;
                  t.setPosition(r);
                  let s = u(t.readBytes(32)),
                    o = $(n),
                    f = 0,
                    c = [];
                  for (let r = 0; r < s; ++r) {
                    t.setPosition(i + (o ? 32 * r : f));
                    let [a, s] = e(t, n, { staticPosition: i });
                    ((f += s), c.push(a));
                  }
                  return (t.setPosition(a + 32), [c, 32]);
                }
                if ($(n)) {
                  let i = a + u(t.readBytes(32)),
                    s = [];
                  for (let a = 0; a < r; ++a) {
                    t.setPosition(i + 32 * a);
                    let [r] = e(t, n, { staticPosition: i });
                    s.push(r);
                  }
                  return (t.setPosition(a + 32), [s, 32]);
                }
                let i = 0,
                  s = [];
                for (let o = 0; o < r; ++o) {
                  let [r, o] = e(t, n, { staticPosition: a + i });
                  ((i += o), s.push(r));
                }
                return [s, i];
              })(r, { ...a, type: n }, { length: t, staticPosition: l });
            }
            if ("tuple" === a.type)
              return (function (t, n, { staticPosition: r }) {
                let a =
                    0 === n.components.length ||
                    n.components.some(({ name: e }) => !e),
                  i = a ? [] : {},
                  s = 0;
                if ($(n)) {
                  let o = r + u(t.readBytes(32));
                  for (let r = 0; r < n.components.length; ++r) {
                    let f = n.components[r];
                    t.setPosition(o + s);
                    let [c, u] = e(t, f, { staticPosition: o });
                    ((s += u), (i[a ? r : f?.name] = c));
                  }
                  return (t.setPosition(r + 32), [i, 32]);
                }
                for (let o = 0; o < n.components.length; ++o) {
                  let f = n.components[o],
                    [c, u] = e(t, f, { staticPosition: r });
                  ((i[a ? o : f?.name] = c), (s += u));
                }
                return [i, s];
              })(r, a, { staticPosition: l });
            if ("address" === a.type) {
              let e;
              return (
                (e = r.readBytes(32)),
                [(0, n.b)((0, c.v)((0, i.S)(e, -20))), 32]
              );
            }
            if ("bool" === a.type)
              return [
                (function (e, t = {}) {
                  let n = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, f.u)(n, { size: t.size }), (n = (0, s.f)(n))),
                    n.length > 1 || n[0] > 1)
                  )
                    throw new o.C(n);
                  return !!n[0];
                })(r.readBytes(32), { size: 32 }),
                32,
              ];
            if (a.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: n }) {
                let [r, a] = t.type.split("bytes");
                if (!a) {
                  let t = u(e.readBytes(32));
                  e.setPosition(n + t);
                  let r = u(e.readBytes(32));
                  if (0 === r) return (e.setPosition(n + 32), ["0x", 32]);
                  let a = e.readBytes(r);
                  return (e.setPosition(n + 32), [(0, c.v)(a), 32]);
                }
                return [(0, c.v)(e.readBytes(Number.parseInt(a, 10), 32)), 32];
              })(r, a, { staticPosition: l });
            if (a.type.startsWith("uint") || a.type.startsWith("int")) {
              var b, p;
              let e, t, n;
              return (
                (b = r),
                (e = (p = a).type.startsWith("int")),
                (t = Number.parseInt(p.type.split("int")[1] || "256", 10)),
                (n = b.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, f.u)(e, { size: t.size });
                        let n = (0, c.v)(e, t);
                        return (0, f.K)(n, t);
                      })(n, { signed: e })
                    : u(n, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === a.type)
              return (function (e, { staticPosition: t }) {
                let n = u(e.readBytes(32));
                e.setPosition(t + n);
                let r = u(e.readBytes(32));
                if (0 === r) return (e.setPosition(t + 32), ["", 32]);
                let a = e.readBytes(r, 32),
                  i = (function (e, t = {}) {
                    let n = e;
                    return (
                      void 0 !== t.size &&
                        ((0, f.u)(n, { size: t.size }),
                        (n = (0, s.f)(n, { dir: "right" }))),
                      new TextDecoder().decode(n)
                    );
                  })((0, s.f)(a));
                return (e.setPosition(t + 32), [i, 32]);
              })(r, { staticPosition: l });
            throw new t.l(a.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(p, a, { staticPosition: 0 });
          ((h += d), m.push(l));
        }
        return m;
      },
    ],
    797312,
  );
};
