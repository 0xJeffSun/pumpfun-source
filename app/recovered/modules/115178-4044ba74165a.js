// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641802),
    r = e.i(411792),
    n = e.i(225587),
    i = e.i(927974);
  class a extends i.f {
    constructor({ domain: e }) {
      super(`Invalid domain "${(0, n.f)(e)}".`, {
        metaMessages: ["Must be a valid EIP-712 domain."],
      });
    }
  }
  class s extends i.f {
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
  class o extends i.f {
    constructor({ type: e }) {
      super(`Struct type "${e}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError",
      });
    }
  }
  class u extends i.f {
    constructor({ type: e }) {
      let t = e.replace(/^(u?int)/, "$&256");
      super(`Type "${e}" is not a valid EIP-712 type.`, {
        metaMessages: [`Use "${t}" instead.`],
        name: "InvalidTypedDataTypeError",
      });
    }
  }
  var l = e.i(858042),
    c = e.i(415415),
    f = e.i(703114),
    d = e.i(244945);
  e.s(
    [
      "m",
      0,
      function ({ domain: e }) {
        return [
          "string" == typeof e?.name && { name: "name", type: "string" },
          e?.version && { name: "version", type: "string" },
          ("number" == typeof e?.chainId || "bigint" == typeof e?.chainId) && {
            name: "chainId",
            type: "uint256",
          },
          e?.verifyingContract && {
            name: "verifyingContract",
            type: "address",
          },
          e?.salt && { name: "salt", type: "bytes32" },
        ].filter(Boolean);
      },
      "f",
      0,
      function (e) {
        let { domain: t, message: r, primaryType: i, types: a } = e,
          s = (e, t) => {
            let r = { ...t };
            for (let t of e) {
              let { name: e, type: n } = t;
              "address" === n && (r[e] = r[e].toLowerCase());
            }
            return r;
          },
          o = a.EIP712Domain && t ? s(a.EIP712Domain, t) : {},
          u = (() => {
            if ("EIP712Domain" !== i) return s(a[i], r);
          })();
        return (0, n.f)({ domain: o, message: u, primaryType: i, types: a });
      },
      "N",
      0,
      function (e) {
        let { domain: n, message: i, primaryType: p, types: y } = e,
          h = (e, n) => {
            for (let i of e) {
              let { name: e, type: a } = i,
                s = n[e],
                p = a.replace(/(\[[0-9]*\])+$/, "");
              if ("int" === p || "uint" === p) throw new u({ type: a });
              let m = a.match(d.x);
              if (m && ("number" == typeof s || "bigint" == typeof s)) {
                let [e, t, r] = m;
                (0, f.N)(s, {
                  signed: "int" === t,
                  size: Number.parseInt(r, 10) / 8,
                });
              }
              if ("address" === a && "string" == typeof s && !(0, l.f)(s))
                throw new r.f({ address: s });
              let g = a.match(d.h);
              if (g) {
                let [e, r] = g;
                if (r && (0, c.f)(s) !== Number.parseInt(r, 10))
                  throw new t.M({
                    expectedSize: Number.parseInt(r, 10),
                    givenSize: (0, c.f)(s),
                  });
              }
              let b = y[a];
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
                    throw new o({ type: e });
                })(a),
                h(b, s));
            }
          };
        if (y.EIP712Domain && n) {
          if ("object" != typeof n) throw new a({ domain: n });
          h(y.EIP712Domain, n);
        }
        if ("EIP712Domain" !== p)
          if (y[p]) h(y[p], i);
          else throw new s({ primaryType: p, types: y });
      },
    ],
    115178,
  );
};
