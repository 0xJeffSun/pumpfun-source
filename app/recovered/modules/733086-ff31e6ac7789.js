// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(586844),
    r = e.i(640279),
    n = e.i(850697),
    i = e.i(703114),
    a = e.i(772488),
    s = e.i(115178);
  function o({ data: e, primaryType: t, types: n }) {
    let s = (function e({ data: t, primaryType: n, types: s }) {
      let o = [{ type: "bytes32" }],
        u = [
          (function ({ primaryType: e, types: t }) {
            let r = (0, i.g)(
              (function ({ primaryType: e, types: t }) {
                let r = "",
                  n = (function e({ primaryType: t, types: r }, n = new Set()) {
                    let i = t.match(/^\w*/u),
                      a = i?.[0];
                    if (n.has(a) || void 0 === r[a]) return n;
                    for (let t of (n.add(a), r[a]))
                      e({ primaryType: t.type, types: r }, n);
                    return n;
                  })({ primaryType: e, types: t });
                for (let i of (n.delete(e), [e, ...Array.from(n).sort()]))
                  r += `${i}(${t[i].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return r;
              })({ primaryType: e, types: t }),
            );
            return (0, a.f)(r);
          })({ primaryType: n, types: s }),
        ];
      for (let l of s[n]) {
        let [n, c] = (function t({ types: n, name: s, type: o, value: u }) {
          if (void 0 !== n[o])
            return [
              { type: "bytes32" },
              (0, a.f)(e({ data: u, primaryType: o, types: n })),
            ];
          if ("bytes" === o) return [{ type: "bytes32" }, (0, a.f)(u)];
          if ("string" === o)
            return [{ type: "bytes32" }, (0, a.f)((0, i.g)(u))];
          if (o.lastIndexOf("]") === o.length - 1) {
            let e = o.slice(0, o.lastIndexOf("[")),
              i = u.map((r) => t({ name: s, type: e, types: n, value: r }));
            return [
              { type: "bytes32" },
              (0, a.f)(
                (0, r.N)(
                  i.map(([e]) => e),
                  i.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: o }, u];
        })({ types: s, name: l.name, type: l.type, value: t[l.name] });
        (o.push(n), u.push(c));
      }
      return (0, r.N)(o, u);
    })({ data: e, primaryType: t, types: n });
    return (0, a.f)(s);
  }
  var u = e.i(278133);
  async function l(e, r) {
    let {
        address: i,
        factory: l,
        factoryData: c,
        signature: f,
        message: d,
        primaryType: p,
        types: y,
        domain: h,
        ...m
      } = r,
      g = (function (e) {
        let { domain: t = {}, message: r, primaryType: i } = e,
          u = { EIP712Domain: (0, s.m)({ domain: t }), ...e.types };
        (0, s.N)({ domain: t, message: r, primaryType: i, types: u });
        let l = ["0x1901"];
        return (
          t &&
            l.push(
              (function ({ domain: e, types: t }) {
                return o({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: u }),
            ),
          "EIP712Domain" !== i &&
            l.push(o({ data: r, primaryType: i, types: u })),
          (0, a.f)((0, n.w)(l))
        );
      })({ message: d, primaryType: p, types: y, domain: h });
    return (0, t.f)(
      e,
      u.f,
      "verifyHash",
    )({ address: i, factory: l, factoryData: c, hash: g, signature: f, ...m });
  }
  e.s(["f", 0, l], 733086);
};
