// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    n = e.i(990149),
    r = e.i(19648),
    i = e.i(497763),
    s = e.i(76373),
    o = e.i(296006),
    a = e.i(393547),
    f = e.i(532617);
  class c extends f.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, a.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class u extends f.f {
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
  class l extends f.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  var d = e.i(4911),
    h = e.i(612735),
    p = e.i(308286);
  function b({ data: e, primaryType: n, types: s }) {
    let o = (function e({ data: n, primaryType: s, types: o }) {
      let a = [{ type: "bytes32" }],
        f = [
          (function ({ primaryType: e, types: t }) {
            let n = (0, r.g)(
              (function ({ primaryType: e, types: t }) {
                let n = "",
                  r = (function e({ primaryType: t, types: n }, r = new Set()) {
                    let i = t.match(/^\w*/u),
                      s = i?.[0];
                    if (r.has(s) || void 0 === n[s]) return r;
                    for (let t of (r.add(s), n[s]))
                      e({ primaryType: t.type, types: n }, r);
                    return r;
                  })({ primaryType: e, types: t });
                for (let i of (r.delete(e), [e, ...Array.from(r).sort()]))
                  n += `${i}(${t[i].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return n;
              })({ primaryType: e, types: t }),
            );
            return (0, i.f)(n);
          })({ primaryType: s, types: o }),
        ];
      for (let c of o[s]) {
        let [s, u] = (function n({ types: s, name: o, type: a, value: f }) {
          if (void 0 !== s[a])
            return [
              { type: "bytes32" },
              (0, i.f)(e({ data: f, primaryType: a, types: s })),
            ];
          if ("bytes" === a) return [{ type: "bytes32" }, (0, i.f)(f)];
          if ("string" === a)
            return [{ type: "bytes32" }, (0, i.f)((0, r.g)(f))];
          if (a.lastIndexOf("]") === a.length - 1) {
            let e = a.slice(0, a.lastIndexOf("[")),
              r = f.map((t) => n({ name: o, type: e, types: s, value: t }));
            return [
              { type: "bytes32" },
              (0, i.f)(
                (0, t.N)(
                  r.map(([e]) => e),
                  r.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: a }, f];
        })({ types: o, name: c.name, type: c.type, value: n[c.name] });
        (a.push(s), f.push(u));
      }
      return (0, t.N)(a, f);
    })({ data: e, primaryType: n, types: s });
    return (0, i.f)(o);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: a, primaryType: f } = e,
          m = {
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
          let { domain: t, message: n, primaryType: i, types: a } = e,
            f = (e, t) => {
              for (let n of e) {
                let { name: e, type: i } = n,
                  c = t[e],
                  u = i.match(p.x);
                if (u && ("number" == typeof c || "bigint" == typeof c)) {
                  let [e, t, n] = u;
                  (0, r.N)(c, {
                    signed: "int" === t,
                    size: Number.parseInt(n, 10) / 8,
                  });
                }
                if ("address" === i && "string" == typeof c && !(0, d.f)(c))
                  throw new o.f({ address: c });
                let b = i.match(p.h);
                if (b) {
                  let [e, t] = b;
                  if (t && (0, h.f)(c) !== Number.parseInt(t, 10))
                    throw new s.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, h.f)(c),
                    });
                }
                let m = a[i];
                m &&
                  ((function (e) {
                    if (
                      "address" === e ||
                      "bool" === e ||
                      "string" === e ||
                      e.startsWith("bytes") ||
                      e.startsWith("uint") ||
                      e.startsWith("int")
                    )
                      throw new l({ type: e });
                  })(i),
                  f(m, c));
              }
            };
          if (a.EIP712Domain && t) {
            if ("object" != typeof t) throw new c({ domain: t });
            f(a.EIP712Domain, t);
          }
          if ("EIP712Domain" !== i)
            if (a[i]) f(a[i], n);
            else throw new u({ primaryType: i, types: a });
        })({ domain: t, message: a, primaryType: f, types: m });
        let g = ["0x1901"];
        return (
          t &&
            g.push(
              (function ({ domain: e, types: t }) {
                return b({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: m }),
            ),
          "EIP712Domain" !== f &&
            g.push(b({ data: a, primaryType: f, types: m })),
          (0, i.f)((0, n.w)(g))
        );
      },
    ],
    136636,
  );
};
