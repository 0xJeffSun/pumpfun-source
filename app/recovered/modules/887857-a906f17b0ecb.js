// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    n = e.i(183249),
    i = e.i(811369),
    r = e.i(612735),
    s = e.i(989494),
    o = e.i(449985),
    a = e.i(108270),
    u = e.i(382772),
    c = e.i(19648);
  function l(e, t = {}) {
    void 0 !== t.size && (0, u.u)(e, { size: t.size });
    let n = (0, c.v)(e, t);
    return (0, u.T)(n, t);
  }
  var d = e.i(590719),
    p = e.i(971860);
  function h(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(h);
    let n = (0, p.t)(e.type);
    return !!(n && h({ ...e, type: n[1] }));
  }
  e.s(
    [
      "f",
      0,
      function (e, f) {
        let y = "string" == typeof f ? (0, d.X)(f) : f,
          m = (0, i.f)(y);
        if (0 === (0, r.f)(y) && e.length > 0) throw new t.g();
        if ((0, r.f)(f) && 32 > (0, r.f)(f))
          throw new t.D({
            data: "string" == typeof f ? f : (0, c.v)(f),
            params: e,
            size: (0, r.f)(f),
          });
        let g = 0,
          b = [];
        for (let i = 0; i < e.length; ++i) {
          let r = e[i];
          m.setPosition(g);
          let [d, f] = (function e(i, r, { staticPosition: d }) {
            let f = (0, p.t)(r.type);
            if (f) {
              let [t, n] = f;
              return (function (t, n, { length: i, staticPosition: r }) {
                if (!i) {
                  let i = r + l(t.readBytes(32)),
                    s = i + 32;
                  t.setPosition(i);
                  let o = l(t.readBytes(32)),
                    a = h(n),
                    u = 0,
                    c = [];
                  for (let i = 0; i < o; ++i) {
                    t.setPosition(s + (a ? 32 * i : u));
                    let [r, o] = e(t, n, { staticPosition: s });
                    ((u += o), c.push(r));
                  }
                  return (t.setPosition(r + 32), [c, 32]);
                }
                if (h(n)) {
                  let s = r + l(t.readBytes(32)),
                    o = [];
                  for (let r = 0; r < i; ++r) {
                    t.setPosition(s + 32 * r);
                    let [i] = e(t, n, { staticPosition: s });
                    o.push(i);
                  }
                  return (t.setPosition(r + 32), [o, 32]);
                }
                let s = 0,
                  o = [];
                for (let a = 0; a < i; ++a) {
                  let [i, a] = e(t, n, { staticPosition: r + s });
                  ((s += a), o.push(i));
                }
                return [o, s];
              })(i, { ...r, type: n }, { length: t, staticPosition: d });
            }
            if ("tuple" === r.type)
              return (function (t, n, { staticPosition: i }) {
                let r =
                    0 === n.components.length ||
                    n.components.some(({ name: e }) => !e),
                  s = r ? [] : {},
                  o = 0;
                if (h(n)) {
                  let a = i + l(t.readBytes(32));
                  for (let i = 0; i < n.components.length; ++i) {
                    let u = n.components[i];
                    t.setPosition(a + o);
                    let [c, l] = e(t, u, { staticPosition: a });
                    ((o += l), (s[r ? i : u?.name] = c));
                  }
                  return (t.setPosition(i + 32), [s, 32]);
                }
                for (let a = 0; a < n.components.length; ++a) {
                  let u = n.components[a],
                    [c, l] = e(t, u, { staticPosition: i });
                  ((s[r ? a : u?.name] = c), (o += l));
                }
                return [s, o];
              })(i, r, { staticPosition: d });
            if ("address" === r.type) {
              let e;
              return (
                (e = i.readBytes(32)),
                [(0, n.b)((0, c.v)((0, s.S)(e, -20))), 32]
              );
            }
            if ("bool" === r.type)
              return [
                (function (e, t = {}) {
                  let n = e;
                  if (
                    (void 0 !== t.size &&
                      ((0, u.u)(n, { size: t.size }), (n = (0, o.f)(n))),
                    n.length > 1 || n[0] > 1)
                  )
                    throw new a.C(n);
                  return !!n[0];
                })(i.readBytes(32), { size: 32 }),
                32,
              ];
            if (r.type.startsWith("bytes"))
              return (function (e, t, { staticPosition: n }) {
                let [i, r] = t.type.split("bytes");
                if (!r) {
                  let t = l(e.readBytes(32));
                  e.setPosition(n + t);
                  let i = l(e.readBytes(32));
                  if (0 === i) return (e.setPosition(n + 32), ["0x", 32]);
                  let r = e.readBytes(i);
                  return (e.setPosition(n + 32), [(0, c.v)(r), 32]);
                }
                return [(0, c.v)(e.readBytes(Number.parseInt(r, 10), 32)), 32];
              })(i, r, { staticPosition: d });
            if (r.type.startsWith("uint") || r.type.startsWith("int")) {
              var y, m;
              let e, t, n;
              return (
                (y = i),
                (e = (m = r).type.startsWith("int")),
                (t = Number.parseInt(m.type.split("int")[1] || "256", 10)),
                (n = y.readBytes(32)),
                [
                  t > 48
                    ? (function (e, t = {}) {
                        void 0 !== t.size && (0, u.u)(e, { size: t.size });
                        let n = (0, c.v)(e, t);
                        return (0, u.K)(n, t);
                      })(n, { signed: e })
                    : l(n, { signed: e }),
                  32,
                ]
              );
            }
            if ("string" === r.type)
              return (function (e, { staticPosition: t }) {
                let n = l(e.readBytes(32));
                e.setPosition(t + n);
                let i = l(e.readBytes(32));
                if (0 === i) return (e.setPosition(t + 32), ["", 32]);
                let r = e.readBytes(i, 32),
                  s = (function (e, t = {}) {
                    let n = e;
                    return (
                      void 0 !== t.size &&
                        ((0, u.u)(n, { size: t.size }),
                        (n = (0, o.f)(n, { dir: "right" }))),
                      new TextDecoder().decode(n)
                    );
                  })((0, o.f)(r));
                return (e.setPosition(t + 32), [s, 32]);
              })(i, { staticPosition: d });
            throw new t.l(r.type, {
              docsPath: "/docs/contract/decodeAbiParameters",
            });
          })(m, r, { staticPosition: 0 });
          ((g += f), b.push(d));
        }
        return b;
      },
    ],
    887857,
  );
};
