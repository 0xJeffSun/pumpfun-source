// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    r = e.i(990149),
    n = e.i(19648),
    s = e.i(497763),
    o = e.i(76373),
    i = e.i(296006),
    a = e.i(393547),
    c = e.i(532617);
  class u extends c.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, a.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class l extends c.f {
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
  class d extends c.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  var f = e.i(4911),
    h = e.i(612735),
    p = e.i(308286);
  function b({ data: e, primaryType: r, types: o }) {
    let i = (function e({ data: r, primaryType: o, types: i }) {
      let a = [{ type: "bytes32" }],
        c = [
          (function ({ primaryType: e, types: t }) {
            let r = (0, n.g)(
              (function ({ primaryType: e, types: t }) {
                let r = "",
                  n = (function e({ primaryType: t, types: r }, n = new Set()) {
                    let s = t.match(/^\w*/u),
                      o = s?.[0];
                    if (n.has(o) || void 0 === r[o]) return n;
                    for (let t of (n.add(o), r[o]))
                      e({ primaryType: t.type, types: r }, n);
                    return n;
                  })({ primaryType: e, types: t });
                for (let s of (n.delete(e), [e, ...Array.from(n).sort()]))
                  r += `${s}(${t[s].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return r;
              })({ primaryType: e, types: t }),
            );
            return (0, s.f)(r);
          })({ primaryType: o, types: i }),
        ];
      for (let u of i[o]) {
        let [o, l] = (function r({ types: o, name: i, type: a, value: c }) {
          if (void 0 !== o[a])
            return [
              { type: "bytes32" },
              (0, s.f)(e({ data: c, primaryType: a, types: o })),
            ];
          if ("bytes" === a) return [{ type: "bytes32" }, (0, s.f)(c)];
          if ("string" === a)
            return [{ type: "bytes32" }, (0, s.f)((0, n.g)(c))];
          if (a.lastIndexOf("]") === a.length - 1) {
            let e = a.slice(0, a.lastIndexOf("[")),
              n = c.map((t) => r({ name: i, type: e, types: o, value: t }));
            return [
              { type: "bytes32" },
              (0, s.f)(
                (0, t.N)(
                  n.map(([e]) => e),
                  n.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: a }, c];
        })({ types: i, name: u.name, type: u.type, value: r[u.name] });
        (a.push(o), c.push(l));
      }
      return (0, t.N)(a, c);
    })({ data: e, primaryType: r, types: o });
    return (0, s.f)(i);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: a, primaryType: c } = e,
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
          let { domain: t, message: r, primaryType: s, types: a } = e,
            c = (e, t) => {
              for (let r of e) {
                let { name: e, type: s } = r,
                  u = t[e],
                  l = s.match(p.x);
                if (l && ("number" == typeof u || "bigint" == typeof u)) {
                  let [e, t, r] = l;
                  (0, n.N)(u, {
                    signed: "int" === t,
                    size: Number.parseInt(r, 10) / 8,
                  });
                }
                if ("address" === s && "string" == typeof u && !(0, f.f)(u))
                  throw new i.f({ address: u });
                let b = s.match(p.h);
                if (b) {
                  let [e, t] = b;
                  if (t && (0, h.f)(u) !== Number.parseInt(t, 10))
                    throw new o.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, h.f)(u),
                    });
                }
                let m = a[s];
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
                      throw new d({ type: e });
                  })(s),
                  c(m, u));
              }
            };
          if (a.EIP712Domain && t) {
            if ("object" != typeof t) throw new u({ domain: t });
            c(a.EIP712Domain, t);
          }
          if ("EIP712Domain" !== s)
            if (a[s]) c(a[s], r);
            else throw new l({ primaryType: s, types: a });
        })({ domain: t, message: a, primaryType: c, types: m });
        let y = ["0x1901"];
        return (
          t &&
            y.push(
              (function ({ domain: e, types: t }) {
                return b({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: m }),
            ),
          "EIP712Domain" !== c &&
            y.push(b({ data: a, primaryType: c, types: m })),
          (0, s.f)((0, r.w)(y))
        );
      },
    ],
    136636,
  );
};
