// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    r = e.i(990149),
    n = e.i(19648),
    o = e.i(497763),
    s = e.i(76373),
    a = e.i(296006),
    i = e.i(393547),
    c = e.i(532617);
  class u extends c.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, i.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class d extends c.f {
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
  class l extends c.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  var f = e.i(4911),
    p = e.i(612735),
    h = e.i(308286);
  function m({ data: e, primaryType: r, types: s }) {
    let a = (function e({ data: r, primaryType: s, types: a }) {
      let i = [{ type: "bytes32" }],
        c = [
          (function ({ primaryType: e, types: t }) {
            let r = (0, n.g)(
              (function ({ primaryType: e, types: t }) {
                let r = "",
                  n = (function e({ primaryType: t, types: r }, n = new Set()) {
                    let o = t.match(/^\w*/u),
                      s = o?.[0];
                    if (n.has(s) || void 0 === r[s]) return n;
                    for (let t of (n.add(s), r[s]))
                      e({ primaryType: t.type, types: r }, n);
                    return n;
                  })({ primaryType: e, types: t });
                for (let o of (n.delete(e), [e, ...Array.from(n).sort()]))
                  r += `${o}(${t[o].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return r;
              })({ primaryType: e, types: t }),
            );
            return (0, o.f)(r);
          })({ primaryType: s, types: a }),
        ];
      for (let u of a[s]) {
        let [s, d] = (function r({ types: s, name: a, type: i, value: c }) {
          if (void 0 !== s[i])
            return [
              { type: "bytes32" },
              (0, o.f)(e({ data: c, primaryType: i, types: s })),
            ];
          if ("bytes" === i) return [{ type: "bytes32" }, (0, o.f)(c)];
          if ("string" === i)
            return [{ type: "bytes32" }, (0, o.f)((0, n.g)(c))];
          if (i.lastIndexOf("]") === i.length - 1) {
            let e = i.slice(0, i.lastIndexOf("[")),
              n = c.map((t) => r({ name: a, type: e, types: s, value: t }));
            return [
              { type: "bytes32" },
              (0, o.f)(
                (0, t.N)(
                  n.map(([e]) => e),
                  n.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: i }, c];
        })({ types: a, name: u.name, type: u.type, value: r[u.name] });
        (i.push(s), c.push(d));
      }
      return (0, t.N)(i, c);
    })({ data: e, primaryType: r, types: s });
    return (0, o.f)(a);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: i, primaryType: c } = e,
          b = {
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
          let { domain: t, message: r, primaryType: o, types: i } = e,
            c = (e, t) => {
              for (let r of e) {
                let { name: e, type: o } = r,
                  u = t[e],
                  d = o.match(h.x);
                if (d && ("number" == typeof u || "bigint" == typeof u)) {
                  let [e, t, r] = d;
                  (0, n.N)(u, {
                    signed: "int" === t,
                    size: Number.parseInt(r, 10) / 8,
                  });
                }
                if ("address" === o && "string" == typeof u && !(0, f.f)(u))
                  throw new a.f({ address: u });
                let m = o.match(h.h);
                if (m) {
                  let [e, t] = m;
                  if (t && (0, p.f)(u) !== Number.parseInt(t, 10))
                    throw new s.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, p.f)(u),
                    });
                }
                let b = i[o];
                b &&
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
                  })(o),
                  c(b, u));
              }
            };
          if (i.EIP712Domain && t) {
            if ("object" != typeof t) throw new u({ domain: t });
            c(i.EIP712Domain, t);
          }
          if ("EIP712Domain" !== o)
            if (i[o]) c(i[o], r);
            else throw new d({ primaryType: o, types: i });
        })({ domain: t, message: i, primaryType: c, types: b });
        let y = ["0x1901"];
        return (
          t &&
            y.push(
              (function ({ domain: e, types: t }) {
                return m({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: b }),
            ),
          "EIP712Domain" !== c &&
            y.push(m({ data: i, primaryType: c, types: b })),
          (0, o.f)((0, r.w)(y))
        );
      },
    ],
    136636,
  );
};
