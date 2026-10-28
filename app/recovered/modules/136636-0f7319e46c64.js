// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    r = e.i(990149),
    n = e.i(19648),
    i = e.i(497763),
    a = e.i(76373),
    o = e.i(296006),
    s = e.i(393547),
    l = e.i(532617);
  class u extends l.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, s.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class d extends l.f {
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
  class c extends l.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  var p = e.i(4911),
    f = e.i(612735),
    m = e.i(308286);
  function g({ data: e, primaryType: r, types: a }) {
    let o = (function e({ data: r, primaryType: a, types: o }) {
      let s = [{ type: "bytes32" }],
        l = [
          (function ({ primaryType: e, types: t }) {
            let r = (0, n.g)(
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
            return (0, i.f)(r);
          })({ primaryType: a, types: o }),
        ];
      for (let u of o[a]) {
        let [a, d] = (function r({ types: a, name: o, type: s, value: l }) {
          if (void 0 !== a[s])
            return [
              { type: "bytes32" },
              (0, i.f)(e({ data: l, primaryType: s, types: a })),
            ];
          if ("bytes" === s) return [{ type: "bytes32" }, (0, i.f)(l)];
          if ("string" === s)
            return [{ type: "bytes32" }, (0, i.f)((0, n.g)(l))];
          if (s.lastIndexOf("]") === s.length - 1) {
            let e = s.slice(0, s.lastIndexOf("[")),
              n = l.map((t) => r({ name: o, type: e, types: a, value: t }));
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
          return [{ type: s }, l];
        })({ types: o, name: u.name, type: u.type, value: r[u.name] });
        (s.push(a), l.push(d));
      }
      return (0, t.N)(s, l);
    })({ data: e, primaryType: r, types: a });
    return (0, i.f)(o);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: s, primaryType: l } = e,
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
            l = (e, t) => {
              for (let r of e) {
                let { name: e, type: i } = r,
                  u = t[e],
                  d = i.match(m.x);
                if (d && ("number" == typeof u || "bigint" == typeof u)) {
                  let [e, t, r] = d;
                  (0, n.N)(u, {
                    signed: "int" === t,
                    size: Number.parseInt(r, 10) / 8,
                  });
                }
                if ("address" === i && "string" == typeof u && !(0, p.f)(u))
                  throw new o.f({ address: u });
                let g = i.match(m.h);
                if (g) {
                  let [e, t] = g;
                  if (t && (0, f.f)(u) !== Number.parseInt(t, 10))
                    throw new a.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, f.f)(u),
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
                      throw new c({ type: e });
                  })(i),
                  l(y, u));
              }
            };
          if (s.EIP712Domain && t) {
            if ("object" != typeof t) throw new u({ domain: t });
            l(s.EIP712Domain, t);
          }
          if ("EIP712Domain" !== i)
            if (s[i]) l(s[i], r);
            else throw new d({ primaryType: i, types: s });
        })({ domain: t, message: s, primaryType: l, types: y });
        let h = ["0x1901"];
        return (
          t &&
            h.push(
              (function ({ domain: e, types: t }) {
                return g({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: y }),
            ),
          "EIP712Domain" !== l &&
            h.push(g({ data: s, primaryType: l, types: y })),
          (0, i.f)((0, r.w)(h))
        );
      },
    ],
    136636,
  );
};
