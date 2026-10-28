// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    r = e.i(990149),
    n = e.i(19648),
    i = e.i(497763),
    s = e.i(76373),
    a = e.i(296006),
    o = e.i(393547),
    u = e.i(532617);
  class c extends u.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, o.f)(e)}".`, {
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
  class f extends u.f {
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
  function b({ data: e, primaryType: r, types: s }) {
    let a = (function e({ data: r, primaryType: s, types: a }) {
      let o = [{ type: "bytes32" }],
        u = [
          (function ({ primaryType: e, types: t }) {
            let r = (0, n.g)(
              (function ({ primaryType: e, types: t }) {
                let r = "",
                  n = (function e({ primaryType: t, types: r }, n = new Set()) {
                    let i = t.match(/^\w*/u),
                      s = i?.[0];
                    if (n.has(s) || void 0 === r[s]) return n;
                    for (let t of (n.add(s), r[s]))
                      e({ primaryType: t.type, types: r }, n);
                    return n;
                  })({ primaryType: e, types: t });
                for (let i of (n.delete(e), [e, ...Array.from(n).sort()]))
                  r += `${i}(${t[i].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return r;
              })({ primaryType: e, types: t }),
            );
            return (0, i.f)(r);
          })({ primaryType: s, types: a }),
        ];
      for (let c of a[s]) {
        let [s, l] = (function r({ types: s, name: a, type: o, value: u }) {
          if (void 0 !== s[o])
            return [
              { type: "bytes32" },
              (0, i.f)(e({ data: u, primaryType: o, types: s })),
            ];
          if ("bytes" === o) return [{ type: "bytes32" }, (0, i.f)(u)];
          if ("string" === o)
            return [{ type: "bytes32" }, (0, i.f)((0, n.g)(u))];
          if (o.lastIndexOf("]") === o.length - 1) {
            let e = o.slice(0, o.lastIndexOf("[")),
              n = u.map((t) => r({ name: a, type: e, types: s, value: t }));
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
          return [{ type: o }, u];
        })({ types: a, name: c.name, type: c.type, value: r[c.name] });
        (o.push(s), u.push(l));
      }
      return (0, t.N)(o, u);
    })({ data: e, primaryType: r, types: s });
    return (0, i.f)(a);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: o, primaryType: u } = e,
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
          let { domain: t, message: r, primaryType: i, types: o } = e,
            u = (e, t) => {
              for (let r of e) {
                let { name: e, type: i } = r,
                  c = t[e],
                  l = i.match(p.x);
                if (l && ("number" == typeof c || "bigint" == typeof c)) {
                  let [e, t, r] = l;
                  (0, n.N)(c, {
                    signed: "int" === t,
                    size: Number.parseInt(r, 10) / 8,
                  });
                }
                if ("address" === i && "string" == typeof c && !(0, d.f)(c))
                  throw new a.f({ address: c });
                let b = i.match(p.h);
                if (b) {
                  let [e, t] = b;
                  if (t && (0, h.f)(c) !== Number.parseInt(t, 10))
                    throw new s.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, h.f)(c),
                    });
                }
                let y = o[i];
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
                      throw new f({ type: e });
                  })(i),
                  u(y, c));
              }
            };
          if (o.EIP712Domain && t) {
            if ("object" != typeof t) throw new c({ domain: t });
            u(o.EIP712Domain, t);
          }
          if ("EIP712Domain" !== i)
            if (o[i]) u(o[i], r);
            else throw new l({ primaryType: i, types: o });
        })({ domain: t, message: o, primaryType: u, types: y });
        let m = ["0x1901"];
        return (
          t &&
            m.push(
              (function ({ domain: e, types: t }) {
                return b({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: y }),
            ),
          "EIP712Domain" !== u &&
            m.push(b({ data: o, primaryType: u, types: y })),
          (0, i.f)((0, r.w)(m))
        );
      },
    ],
    136636,
  );
};
