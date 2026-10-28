// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    r = e.i(990149),
    n = e.i(19648),
    i = e.i(497763),
    o = e.i(76373),
    a = e.i(296006),
    s = e.i(393547),
    u = e.i(532617);
  class c extends u.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, s.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class l extends u.f {
    constructor({ primaryType: e, types: t }) {
      super(
        `Invalid primary type \`${e}\` must be one of \`${JSON.stringify(Object.keys(t))}\`.`,
        {
          docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
          metaMessages: ["Check that the primary type is a key in `types`."],
        },
      );
    }
  }
  class d extends u.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  var f = e.i(4911),
    p = e.i(612735),
    m = e.i(308286);
  function h({ data: e, primaryType: r, types: o }) {
    let a = (function e({ data: r, primaryType: o, types: a }) {
      let s = [{ type: "bytes32" }],
        u = [
          (function ({ primaryType: e, types: t }) {
            let r = (0, n.g)(
              (function ({ primaryType: e, types: t }) {
                let r = "",
                  n = (function e({ primaryType: t, types: r }, n = new Set()) {
                    let i = t.match(/^\w*/u),
                      o = i?.[0];
                    if (n.has(o) || void 0 === r[o]) return n;
                    for (let t of (n.add(o), r[o]))
                      e({ primaryType: t.type, types: r }, n);
                    return n;
                  })({ primaryType: e, types: t });
                for (let i of (n.delete(e), [e, ...Array.from(n).sort()]))
                  r += `${i}(${t[i].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return r;
              })({ primaryType: e, types: t }),
            );
            return (0, i.f)(r);
          })({ primaryType: o, types: a }),
        ];
      for (let c of a[o]) {
        let [o, l] = (function r({ types: o, name: a, type: s, value: u }) {
          if (void 0 !== o[s])
            return [
              { type: "bytes32" },
              (0, i.f)(e({ data: u, primaryType: s, types: o })),
            ];
          if ("bytes" === s) return [{ type: "bytes32" }, (0, i.f)(u)];
          if ("string" === s)
            return [{ type: "bytes32" }, (0, i.f)((0, n.g)(u))];
          if (s.lastIndexOf("]") === s.length - 1) {
            let e = s.slice(0, s.lastIndexOf("[")),
              n = u.map((t) => r({ name: a, type: e, types: o, value: t }));
            return [
              { type: "bytes32" },
              (0, i.f)(
                (0, t.N)(
                  n.map(([e]) => e),
                  n.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: s }, u];
        })({ types: a, name: c.name, type: c.type, value: r[c.name] });
        (s.push(o), u.push(l));
      }
      return (0, t.N)(s, u);
    })({ data: e, primaryType: r, types: o });
    return (0, i.f)(a);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: s, primaryType: u } = e,
          y = {
            EIP712Domain: (function ({ domain: e }) {
              return [
                "string" == typeof e?.name && { name: "name", type: "string" },
                e?.version && { name: "version", type: "string" },
                ("number" == typeof e?.chainId ||
                  "bigint" == typeof e?.chainId) && {
                  name: "chainId",
                  type: "uint256",
                },
                e?.verifyingContract && {
                  name: "verifyingContract",
                  type: "address",
                },
                e?.salt && { name: "salt", type: "bytes32" },
              ].filter(Boolean);
            })({ domain: t }),
            ...e.types,
          };
        !(function (e) {
          let { domain: t, message: r, primaryType: i, types: s } = e,
            u = (e, t) => {
              for (let r of e) {
                let { name: e, type: i } = r,
                  c = t[e],
                  l = i.match(m.x);
                if (l && ("number" == typeof c || "bigint" == typeof c)) {
                  let [e, t, r] = l;
                  (0, n.N)(c, {
                    signed: "int" === t,
                    size: Number.parseInt(r, 10) / 8,
                  });
                }
                if ("address" === i && "string" == typeof c && !(0, f.f)(c))
                  throw new a.f({ address: c });
                let h = i.match(m.h);
                if (h) {
                  let [e, t] = h;
                  if (t && (0, p.f)(c) !== Number.parseInt(t, 10))
                    throw new o.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, p.f)(c),
                    });
                }
                let y = s[i];
                y &&
                  ((function (e) {
                    if (
                      "address" === e ||
                      "bool" === e ||
                      "string" === e ||
                      e.startsWith("bytes") ||
                      e.startsWith("uint") ||
                      e.startsWith("int")
                    )
                      throw new d({ type: e });
                  })(i),
                  u(y, c));
              }
            };
          if (s.EIP712Domain && t) {
            if ("object" != typeof t) throw new c({ domain: t });
            u(s.EIP712Domain, t);
          }
          if ("EIP712Domain" !== i)
            if (s[i]) u(s[i], r);
            else throw new l({ primaryType: i, types: s });
        })({ domain: t, message: s, primaryType: u, types: y });
        let g = ["0x1901"];
        return (
          t &&
            g.push(
              (function ({ domain: e, types: t }) {
                return h({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: y }),
            ),
          "EIP712Domain" !== u &&
            g.push(h({ data: s, primaryType: u, types: y })),
          (0, i.f)((0, r.w)(g))
        );
      },
    ],
    136636,
  );
};
