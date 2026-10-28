// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    n = e.i(990149),
    i = e.i(19648),
    r = e.i(497763),
    s = e.i(76373),
    o = e.i(296006),
    a = e.i(393547),
    u = e.i(532617);
  class c extends u.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, a.f)(e)}".`, {
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
  var p = e.i(4911),
    h = e.i(612735),
    f = e.i(308286);
  function y({ data: e, primaryType: n, types: s }) {
    let o = (function e({ data: n, primaryType: s, types: o }) {
      let a = [{ type: "bytes32" }],
        u = [
          (function ({ primaryType: e, types: t }) {
            let n = (0, i.g)(
              (function ({ primaryType: e, types: t }) {
                let n = "",
                  i = (function e({ primaryType: t, types: n }, i = new Set()) {
                    let r = t.match(/^\w*/u),
                      s = r?.[0];
                    if (i.has(s) || void 0 === n[s]) return i;
                    for (let t of (i.add(s), n[s]))
                      e({ primaryType: t.type, types: n }, i);
                    return i;
                  })({ primaryType: e, types: t });
                for (let r of (i.delete(e), [e, ...Array.from(i).sort()]))
                  n += `${r}(${t[r].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return n;
              })({ primaryType: e, types: t }),
            );
            return (0, r.f)(n);
          })({ primaryType: s, types: o }),
        ];
      for (let c of o[s]) {
        let [s, l] = (function n({ types: s, name: o, type: a, value: u }) {
          if (void 0 !== s[a])
            return [
              { type: "bytes32" },
              (0, r.f)(e({ data: u, primaryType: a, types: s })),
            ];
          if ("bytes" === a) return [{ type: "bytes32" }, (0, r.f)(u)];
          if ("string" === a)
            return [{ type: "bytes32" }, (0, r.f)((0, i.g)(u))];
          if (a.lastIndexOf("]") === a.length - 1) {
            let e = a.slice(0, a.lastIndexOf("[")),
              i = u.map((t) => n({ name: o, type: e, types: s, value: t }));
            return [
              { type: "bytes32" },
              (0, r.f)(
                (0, t.N)(
                  i.map(([e]) => e),
                  i.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: a }, u];
        })({ types: o, name: c.name, type: c.type, value: n[c.name] });
        (a.push(s), u.push(l));
      }
      return (0, t.N)(a, u);
    })({ data: e, primaryType: n, types: s });
    return (0, r.f)(o);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: a, primaryType: u } = e,
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
          let { domain: t, message: n, primaryType: r, types: a } = e,
            u = (e, t) => {
              for (let n of e) {
                let { name: e, type: r } = n,
                  c = t[e],
                  l = r.match(f.x);
                if (l && ("number" == typeof c || "bigint" == typeof c)) {
                  let [e, t, n] = l;
                  (0, i.N)(c, {
                    signed: "int" === t,
                    size: Number.parseInt(n, 10) / 8,
                  });
                }
                if ("address" === r && "string" == typeof c && !(0, p.f)(c))
                  throw new o.f({ address: c });
                let y = r.match(f.h);
                if (y) {
                  let [e, t] = y;
                  if (t && (0, h.f)(c) !== Number.parseInt(t, 10))
                    throw new s.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, h.f)(c),
                    });
                }
                let m = a[r];
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
                  })(r),
                  u(m, c));
              }
            };
          if (a.EIP712Domain && t) {
            if ("object" != typeof t) throw new c({ domain: t });
            u(a.EIP712Domain, t);
          }
          if ("EIP712Domain" !== r)
            if (a[r]) u(a[r], n);
            else throw new l({ primaryType: r, types: a });
        })({ domain: t, message: a, primaryType: u, types: m });
        let g = ["0x1901"];
        return (
          t &&
            g.push(
              (function ({ domain: e, types: t }) {
                return y({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: m }),
            ),
          "EIP712Domain" !== u &&
            g.push(y({ data: a, primaryType: u, types: m })),
          (0, r.f)((0, n.w)(g))
        );
      },
    ],
    136636,
  );
};
