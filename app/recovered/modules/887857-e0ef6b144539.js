// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(183249),
    s = e.i(811369),
    n = e.i(612735),
    o = e.i(989494),
    i = e.i(449985),
    a = e.i(108270),
    c = e.i(382772),
    u = e.i(19648);
  function l(e, t = {}) {
    void 0 !== t.size && (0, c.u)(e, { size: t.size });
    let r = (0, u.v)(e, t);
    return (0, c.T)(r, t);
  }
  var d = e.i(590719),
    h = e.i(971860);
  function f(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(f);
    let r = (0, h.t)(e.type);
    return !!(r && f({ ...e, type: r[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, p) {
        let b = "string" == typeof p ? (0, d.X)(p) : p,
          m = (0, s.f)(b);
        if (0 === (0, n.f)(b) && e.length > 0) throw new t.g();
        if ((0, n.f)(p) && 32 > (0, n.f)(p))
          throw new t.D({
            data: "string" == typeof p ? p : (0, u.v)(p),
            params: e,
            size: (0, n.f)(p),
          });
        let g = 0,
          y = [];
        for (let s = 0; s < e.length; ++s) {
          let n = e[s];
          m.setPosition(g);
          let [d, p] = (function e(s, n, { staticPosition: d }) {
            let p = (0, h.t)(n.type);
            if (p) {
              let [t, r] = p;
              return (function (t, r, { length: s, staticPosition: n }) {
                if (!s) {
                  let s = n + l(t.readBytes(32)),
                    o = s + 32;
                  t.setPosition(s);
                  let i = l(t.readBytes(32)),
                    a = f(r),
                    c = 0,
                    u = [];
                  for (let s = 0; s < i; ++s) {
                    t.setPosition(o + (a ? 32 * s : c));
                    let [n, i] = e(t, r, { staticPosition: o });
                    ((c += i), u.push(n));
                  }
                  return (t.setPosition(n + 32), [u, 32]);
                }
                if (f(r)) {
                  let o = n + l(t.readBytes(32)),
                    i = [];
                  for (let n = 0; n < s; ++n) {
                    t.setPosition(o + 32 * n);
                    let [s] = e(t, r, { staticPosition: o });
                    i.push(s);
                  }
                  return (t.setPosition(n + 32), [i, 32]);
                }
                let o = 0,
                  i = [];
                for (let a = 0; a < s; ++a) {
                  let [s, a] = e(t, r, { staticPosition: n + o });
                  ((o += a), i.push(s));
                }
                return [i, o];
              })(s, { ...n, type: r }, { length: t, staticPosition: d });
            }
            if ("tuple" === n.type)
              return (function (t, r, { staticPosition: s }) {
                let n =
                    0 === r.components.length ||
                    r.components.some(({ name: e }) => !e),
                  o = n ? [] : {},
                  i = 0;
                if (f(r)) {
                  let a = s + l(t.readBytes(32));
                  for (let s = 0; s < r.components.length; ++s) {
                    let c = r.components[s];
                    t.setPosition(a + i);
                    let [u, l] = e(t, c, { staticPosition: a });
                    ((i += l), (o[n ? s : c?.name] = u));
                  }
                  return (t.setPosition(s + 32), [o, 32]);
                }
                for (let a = 0; a < r.components.length; ++a) {
                  let c = r.components[a],
                    [u, l] = e(t, c, { staticPosition: s });
                  ((o[n ? a : c?.name] = u), (i += l));
                }
                return [o, i];
              })(s, n, { staticPosition: d });
            if ("address" === n.type) {
              let e;
              return (
                (e = s.readBytes(32)),
                [(0, r.b)((0, u.v)((0, o.S)(e, -20))), 32]
              );
            }
            if ("bool" === n.type)
              return [
                (function (e, t = {}) {
                  let r = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, c.u)(r, { size: t.size }), (r = (0, i.f)(r))),
                    r.length > 1 || r[0] > 1)
                  )
                    throw new a.C(r);
                  return !!r[0];
                })(s.readBytes(32), { size: 32 }),
                32,
              ];
            if (n.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: r }) {
                let [s, n] = t.type.split("bytes");
                if (!n) {
                  let t = l(e.readBytes(32));
                  e.setPosition(r + t);
                  let s = l(e.readBytes(32));
                  if (0 === s) return (e.setPosition(r + 32), ["0x", 32]);
                  let n = e.readBytes(s);
                  return (e.setPosition(r + 32), [(0, u.v)(n), 32]);
                }
                return [(0, u.v)(e.readBytes(Number.parseInt(n, 10), 32)), 32];
              })(s, n, { staticPosition: d });
            if (n.type.startsWith("uint") || n.type.startsWith("int")) {
              var b, m;
              let e, t, r;
              return (
                (b = s),
                (e = (m = n).type.startsWith("int")),
                (t = Number.parseInt(m.type.split("int")[1] || "256", 10)),
                (r = b.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, c.u)(e, { size: t.size });
                        let r = (0, u.v)(e, t);
                        return (0, c.K)(r, t);
                      })(r, { signed: e })
                    : l(r, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === n.type)
              return (function (e, { staticPosition: t }) {
                let r = l(e.readBytes(32));
                e.setPosition(t + r);
                let s = l(e.readBytes(32));
                if (0 === s) return (e.setPosition(t + 32), ["", 32]);
                let n = e.readBytes(s, 32),
                  o = (function (e, t = {}) {
                    let r = e;
                    return (
                      void 0 !== t.size &&
                        ((0, c.u)(r, { size: t.size }),
                        (r = (0, i.f)(r, { dir: "right" }))),
                      new TextDecoder().decode(r)
                    );
                  })((0, i.f)(n));
                return (e.setPosition(t + 32), [o, 32]);
              })(s, { staticPosition: d });
            throw new t.l(n.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(m, n, { staticPosition: 0 });
          ((g += p), y.push(d));
        }
        return y;
      },
    ],
    887857,
  );
};
