// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971860),
    n = e.i(990149),
    r = e.i(19648),
    s = e.i(497763),
    i = e.i(76373),
    a = e.i(296006),
    o = e.i(393547),
    u = e.i(532617);
  class p extends u.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, o.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class y extends u.f {
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
  class c extends u.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  var d = e.i(4911),
    l = e.i(612735),
    m = e.i(308286);
  function f({ data: e, primaryType: n, types: i }) {
    let a = (function e({ data: n, primaryType: i, types: a }) {
      let o = [{ type: "bytes32" }],
        u = [
          (function ({ primaryType: e, types: t }) {
            let n = (0, r.g)(
              (function ({ primaryType: e, types: t }) {
                let n = "",
                  r = (function e({ primaryType: t, types: n }, r = new Set()) {
                    let s = t.match(/^\w*/u),
                      i = s?.[0];
                    if (r.has(i) || void 0 === n[i]) return r;
                    for (let t of (r.add(i), n[i]))
                      e({ primaryType: t.type, types: n }, r);
                    return r;
                  })({ primaryType: e, types: t });
                for (let s of (r.delete(e), [e, ...Array.from(r).sort()]))
                  n += `${s}(${t[s].map(({ name: e, type: t }) => `${t} ${e}`).join(",")})`;
                return n;
              })({ primaryType: e, types: t }),
            );
            return (0, s.f)(n);
          })({ primaryType: i, types: a }),
        ];
      for (let p of a[i]) {
        let [i, y] = (function n({ types: i, name: a, type: o, value: u }) {
          if (void 0 !== i[o])
            return [
              { type: "bytes32" },
              (0, s.f)(e({ data: u, primaryType: o, types: i })),
            ];
          if ("bytes" === o) return [{ type: "bytes32" }, (0, s.f)(u)];
          if ("string" === o)
            return [{ type: "bytes32" }, (0, s.f)((0, r.g)(u))];
          if (o.lastIndexOf("]") === o.length - 1) {
            let e = o.slice(0, o.lastIndexOf("[")),
              r = u.map((t) => n({ name: a, type: e, types: i, value: t }));
            return [
              { type: "bytes32" },
              (0, s.f)(
                (0, t.N)(
                  r.map(([e]) => e),
                  r.map(([, e]) => e),
                ),
              ),
            ];
          }
          return [{ type: o }, u];
        })({ types: a, name: p.name, type: p.type, value: n[p.name] });
        (o.push(i), u.push(y));
      }
      return (0, t.N)(o, u);
    })({ data: e, primaryType: n, types: i });
    return (0, s.f)(a);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { domain: t = {}, message: o, primaryType: u } = e,
          h = {
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
          let { domain: t, message: n, primaryType: s, types: o } = e,
            u = (e, t) => {
              for (let n of e) {
                let { name: e, type: s } = n,
                  p = t[e],
                  y = s.match(m.x);
                if (y && ("number" == typeof p || "bigint" == typeof p)) {
                  let [e, t, n] = y;
                  (0, r.N)(p, {
                    signed: "int" === t,
                    size: Number.parseInt(n, 10) / 8,
                  });
                }
                if ("address" === s && "string" == typeof p && !(0, d.f)(p))
                  throw new a.f({ address: p });
                let f = s.match(m.h);
                if (f) {
                  let [e, t] = f;
                  if (t && (0, l.f)(p) !== Number.parseInt(t, 10))
                    throw new i.M({
                      expectedSize: Number.parseInt(t, 10),
                      givenSize: (0, l.f)(p),
                    });
                }
                let h = o[s];
                h &&
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
                  })(s),
                  u(h, p));
              }
            };
          if (o.EIP712Domain && t) {
            if ("object" != typeof t) throw new p({ domain: t });
            u(o.EIP712Domain, t);
          }
          if ("EIP712Domain" !== s)
            if (o[s]) u(o[s], n);
            else throw new y({ primaryType: s, types: o });
        })({ domain: t, message: o, primaryType: u, types: h });
        let b = ["0x1901"];
        return (
          t &&
            b.push(
              (function ({ domain: e, types: t }) {
                return f({ data: e, primaryType: "EIP712Domain", types: t });
              })({ domain: t, types: h }),
            ),
          "EIP712Domain" !== u &&
            b.push(f({ data: o, primaryType: u, types: h })),
          (0, s.f)((0, n.w)(b))
        );
      },
    ],
    136636,
  );
};
