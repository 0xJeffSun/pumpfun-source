// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(229993);
  let r = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function n(e) {
    return r.test(e);
  }
  function a(e) {
    return (0, t.q)(r, e);
  }
  let s = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function o(e) {
    return s.test(e);
  }
  function i(e) {
    return (0, t.q)(s, e);
  }
  let l =
    /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
  function u(e) {
    return l.test(e);
  }
  function p(e) {
    return (0, t.q)(l, e);
  }
  let c = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
  function d(e) {
    return c.test(e);
  }
  function f(e) {
    return (0, t.q)(c, e);
  }
  let _ =
    /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
  function y(e) {
    return _.test(e);
  }
  function m(e) {
    return (0, t.q)(_, e);
  }
  let h = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
  function b(e) {
    return h.test(e);
  }
  function E(e) {
    return (0, t.q)(h, e);
  }
  let g = /^receive\(\) external payable$/;
  function w(e) {
    return g.test(e);
  }
  let A = new Set(["memory", "indexed", "storage", "calldata"]),
    I = new Set(["indexed"]),
    v = new Set(["calldata", "memory", "storage"]);
  e.s(
    [
      "x",
      0,
      I,
      "Q",
      0,
      m,
      "h",
      0,
      a,
      "C",
      0,
      i,
      "L",
      0,
      E,
      "p",
      0,
      p,
      "q",
      0,
      f,
      "S",
      0,
      v,
      "R",
      0,
      y,
      "t",
      0,
      n,
      "c",
      0,
      o,
      "K",
      0,
      b,
      "k",
      0,
      u,
      "D",
      0,
      w,
      "J",
      0,
      d,
      "m",
      0,
      A,
    ],
    45732,
  );
  class T extends Error {
    constructor(e, t = {}) {
      let r =
          t.cause instanceof T
            ? t.cause.details
            : t.cause?.message
              ? t.cause.message
              : t.details,
        n = (t.cause instanceof T && t.cause.docsPath) || t.docsPath;
      (super(
        [
          e || "An error occurred.",
          "",
          ...(t.metaMessages ? [...t.metaMessages, ""] : []),
          ...(n ? [`Docs: https://abitype.dev${n}`] : []),
          ...(r ? [`Details: ${r}`] : []),
          "Version: abitype@1.2.3",
        ].join("\n"),
      ),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiTypeError",
        }),
        t.cause && (this.cause = t.cause),
        (this.details = r),
        (this.docsPath = n),
        (this.metaMessages = t.metaMessages),
        (this.shortMessage = e));
    }
  }
  class O extends T {
    constructor({ type: e }) {
      (super("Unknown type.", {
        metaMessages: [
          `Type "${e}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownTypeError",
        }));
    }
  }
  class S extends T {
    constructor({ type: e }) {
      (super("Unknown type.", {
        metaMessages: [`Type "${e}" is not a valid ABI type.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSolidityTypeError",
        }));
    }
  }
  e.s(
    [
      "s",
      0,
      class extends T {
        constructor({ signature: e }) {
          (super("Failed to parse ABI item.", {
            details: `parseAbiItem(${JSON.stringify(e, null, 2)})`,
            docsPath: "/api/human#parseabiitem-1",
          }),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "InvalidAbiItemError",
            }));
        }
      },
      "_",
      0,
      S,
      "I",
      0,
      O,
    ],
    639825,
  );
  class R extends T {
    constructor({ param: e }) {
      (super("Invalid ABI parameter.", { details: e }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParameterError",
        }));
    }
  }
  class N extends T {
    constructor({ param: e, name: t }) {
      (super("Invalid ABI parameter.", {
        details: e,
        metaMessages: [
          `"${t}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SolidityProtectedKeywordError",
        }));
    }
  }
  class $ extends T {
    constructor({ param: e, type: t, modifier: r }) {
      (super("Invalid ABI parameter.", {
        details: e,
        metaMessages: [
          `Modifier "${r}" not allowed${t ? ` in "${t}" type` : ""}.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidModifierError",
        }));
    }
  }
  class D extends T {
    constructor({ param: e, type: t, modifier: r }) {
      (super("Invalid ABI parameter.", {
        details: e,
        metaMessages: [
          `Modifier "${r}" not allowed${t ? ` in "${t}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${r}" was given.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidFunctionModifierError",
        }));
    }
  }
  class x extends T {
    constructor({ abiParameter: e }) {
      (super("Invalid ABI parameter.", {
        details: JSON.stringify(e, null, 2),
        metaMessages: ["ABI parameter type is invalid."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiTypeParameterError",
        }));
    }
  }
  e.s(
    [
      "N",
      0,
      class extends T {
        constructor({ params: e }) {
          (super("Failed to parse ABI parameters.", {
            details: `parseAbiParameters(${JSON.stringify(e, null, 2)})`,
            docsPath: "/api/human#parseabiparameters-1",
          }),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "InvalidAbiParametersError",
            }));
        }
      },
      "U",
      0,
      x,
      "P",
      0,
      D,
      "$",
      0,
      $,
      "q",
      0,
      R,
      "r",
      0,
      N,
    ],
    932826,
  );
  class P extends T {
    constructor({ signature: e, type: t }) {
      (super(`Invalid ${t} signature.`, { details: e }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidSignatureError",
        }));
    }
  }
  class M extends T {
    constructor({ signature: e }) {
      (super("Unknown signature.", { details: e }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSignatureError",
        }));
    }
  }
  class U extends T {
    constructor({ signature: e }) {
      (super("Invalid struct signature.", {
        details: e,
        metaMessages: ["No properties exist."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidStructSignatureError",
        }));
    }
  }
  class L extends T {
    constructor({ type: e }) {
      (super("Circular reference detected.", {
        metaMessages: [`Struct "${e}" is a circular reference.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "CircularReferenceError",
        }));
    }
  }
  class C extends T {
    constructor({ current: e, depth: t }) {
      (super("Unbalanced parentheses.", {
        metaMessages: [
          `"${e.trim()}" has too many ${t > 0 ? "opening" : "closing"} parentheses.`,
        ],
        details: `Depth "${t}"`,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParenthesisError",
        }));
    }
  }
  let q = new Map([
    ["address", { type: "address" }],
    ["bool", { type: "bool" }],
    ["bytes", { type: "bytes" }],
    ["bytes32", { type: "bytes32" }],
    ["int", { type: "int256" }],
    ["int256", { type: "int256" }],
    ["string", { type: "string" }],
    ["uint", { type: "uint256" }],
    ["uint8", { type: "uint8" }],
    ["uint16", { type: "uint16" }],
    ["uint24", { type: "uint24" }],
    ["uint32", { type: "uint32" }],
    ["uint64", { type: "uint64" }],
    ["uint96", { type: "uint96" }],
    ["uint112", { type: "uint112" }],
    ["uint160", { type: "uint160" }],
    ["uint192", { type: "uint192" }],
    ["uint256", { type: "uint256" }],
    ["address owner", { type: "address", name: "owner" }],
    ["address to", { type: "address", name: "to" }],
    ["bool approved", { type: "bool", name: "approved" }],
    ["bytes _data", { type: "bytes", name: "_data" }],
    ["bytes data", { type: "bytes", name: "data" }],
    ["bytes signature", { type: "bytes", name: "signature" }],
    ["bytes32 hash", { type: "bytes32", name: "hash" }],
    ["bytes32 r", { type: "bytes32", name: "r" }],
    ["bytes32 root", { type: "bytes32", name: "root" }],
    ["bytes32 s", { type: "bytes32", name: "s" }],
    ["string name", { type: "string", name: "name" }],
    ["string symbol", { type: "string", name: "symbol" }],
    ["string tokenURI", { type: "string", name: "tokenURI" }],
    ["uint tokenId", { type: "uint256", name: "tokenId" }],
    ["uint8 v", { type: "uint8", name: "v" }],
    ["uint256 balance", { type: "uint256", name: "balance" }],
    ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
    ["uint256 value", { type: "uint256", name: "value" }],
    [
      "event:address indexed from",
      { type: "address", name: "from", indexed: !0 },
    ],
    ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
    [
      "event:uint indexed tokenId",
      { type: "uint256", name: "tokenId", indexed: !0 },
    ],
    [
      "event:uint256 indexed tokenId",
      { type: "uint256", name: "tokenId", indexed: !0 },
    ],
  ]);
  function j(e, t = {}) {
    if (u(e))
      return (function (e, t = {}) {
        let r = p(e);
        if (!r) throw new P({ signature: e, type: "function" });
        let n = H(r.parameters),
          a = [],
          s = n.length;
        for (let e = 0; e < s; e++)
          a.push(B(n[e], { modifiers: v, structs: t, type: "function" }));
        let o = [];
        if (r.returns) {
          let e = H(r.returns),
            n = e.length;
          for (let r = 0; r < n; r++)
            o.push(B(e[r], { modifiers: v, structs: t, type: "function" }));
        }
        return {
          name: r.name,
          type: "function",
          stateMutability: r.stateMutability ?? "nonpayable",
          inputs: a,
          outputs: o,
        };
      })(e, t);
    if (o(e))
      return (function (e, t = {}) {
        let r = i(e);
        if (!r) throw new P({ signature: e, type: "event" });
        let n = H(r.parameters),
          a = [],
          s = n.length;
        for (let e = 0; e < s; e++)
          a.push(B(n[e], { modifiers: I, structs: t, type: "event" }));
        return { name: r.name, type: "event", inputs: a };
      })(e, t);
    if (n(e))
      return (function (e, t = {}) {
        let r = a(e);
        if (!r) throw new P({ signature: e, type: "error" });
        let n = H(r.parameters),
          s = [],
          o = n.length;
        for (let e = 0; e < o; e++)
          s.push(B(n[e], { structs: t, type: "error" }));
        return { name: r.name, type: "error", inputs: s };
      })(e, t);
    if (y(e))
      return (function (e, t = {}) {
        let r = m(e);
        if (!r) throw new P({ signature: e, type: "constructor" });
        let n = H(r.parameters),
          a = [],
          s = n.length;
        for (let e = 0; e < s; e++)
          a.push(B(n[e], { structs: t, type: "constructor" }));
        return {
          type: "constructor",
          stateMutability: r.stateMutability ?? "nonpayable",
          inputs: a,
        };
      })(e, t);
    if (b(e)) {
      var r = e;
      let t = E(r);
      if (!t) throw new P({ signature: r, type: "fallback" });
      return {
        type: "fallback",
        stateMutability: t.stateMutability ?? "nonpayable",
      };
    }
    if (w(e)) return { type: "receive", stateMutability: "payable" };
    throw new M({ signature: e });
  }
  let k =
      /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    F =
      /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    W = /^u?int$/;
  function B(e, r) {
    var n, a;
    let s,
      o = (function (e, t, r) {
        let n = "";
        if (r)
          for (let e of Object.entries(r)) {
            if (!e) continue;
            let t = "";
            for (let r of e[1]) t += `[${r.type}${r.name ? `:${r.name}` : ""}]`;
            n += `(${e[0]}{${t}})`;
          }
        return t ? `${t}:${e}${n}` : `${e}${n}`;
      })(e, r?.type, r?.structs);
    if (q.has(o)) return q.get(o);
    let i = t.S.test(e),
      l = (0, t.q)(i ? F : k, e);
    if (!l) throw new R({ param: e });
    if (
      l.name &&
      ("address" === (n = l.name) ||
        "bool" === n ||
        "function" === n ||
        "string" === n ||
        "tuple" === n ||
        t.h.test(n) ||
        t.x.test(n) ||
        z.test(n))
    )
      throw new N({ param: e, name: l.name });
    let u = l.name ? { name: l.name } : {},
      p = "indexed" === l.modifier ? { indexed: !0 } : {},
      c = r?.structs ?? {},
      d = {};
    if (i) {
      s = "tuple";
      let e = H(l.type),
        t = [],
        r = e.length;
      for (let n = 0; n < r; n++) t.push(B(e[n], { structs: c }));
      d = { components: t };
    } else if (l.type in c) ((s = "tuple"), (d = { components: c[l.type] }));
    else if (W.test(l.type)) s = `${l.type}256`;
    else if ("address payable" === l.type) s = "address";
    else if (((s = l.type), r?.type !== "struct" && !Z(s)))
      throw new S({ type: s });
    if (l.modifier) {
      if (!r?.modifiers?.has?.(l.modifier))
        throw new $({ param: e, type: r?.type, modifier: l.modifier });
      if (
        v.has(l.modifier) &&
        ((a = s), !l.array && "bytes" !== a && "string" !== a && "tuple" !== a)
      )
        throw new D({ param: e, type: r?.type, modifier: l.modifier });
    }
    let f = { type: `${s}${l.array ?? ""}`, ...u, ...p, ...d };
    return (q.set(o, f), f);
  }
  function H(e, t = [], r = "", n = 0) {
    let a = e.trim().length;
    for (let s = 0; s < a; s++) {
      let a = e[s],
        o = e.slice(s + 1);
      switch (a) {
        case ",":
          return 0 === n ? H(o, [...t, r.trim()]) : H(o, t, `${r}${a}`, n);
        case "(":
          return H(o, t, `${r}${a}`, n + 1);
        case ")":
          return H(o, t, `${r}${a}`, n - 1);
        default:
          return H(o, t, `${r}${a}`, n);
      }
    }
    if ("" === r) return t;
    if (0 !== n) throw new C({ current: r, depth: n });
    return (t.push(r.trim()), t);
  }
  function Z(e) {
    return (
      "address" === e ||
      "bool" === e ||
      "function" === e ||
      "string" === e ||
      t.h.test(e) ||
      t.x.test(e)
    );
  }
  let z =
    /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  function K(e) {
    let r = {},
      n = e.length;
    for (let t = 0; t < n; t++) {
      let n = e[t];
      if (!d(n)) continue;
      let a = f(n);
      if (!a) throw new P({ signature: n, type: "struct" });
      let s = a.properties.split(";"),
        o = [],
        i = s.length;
      for (let e = 0; e < i; e++) {
        let t = s[e].trim();
        if (!t) continue;
        let r = B(t, { type: "struct" });
        o.push(r);
      }
      if (!o.length) throw new U({ signature: n });
      r[a.name] = o;
    }
    let a = {},
      s = Object.entries(r),
      o = s.length;
    for (let e = 0; e < o; e++) {
      let [n, o] = s[e];
      a[n] = (function e(r = [], n = {}, a = new Set()) {
        let s = [],
          o = r.length;
        for (let i = 0; i < o; i++) {
          let o = r[i];
          if (t.S.test(o.type)) s.push(o);
          else {
            let r = (0, t.q)(V, o.type);
            if (!r?.type) throw new x({ abiParameter: o });
            let { array: i, type: l } = r;
            if (l in n) {
              if (a.has(l)) throw new L({ type: l });
              s.push({
                ...o,
                type: `tuple${i ?? ""}`,
                components: e(n[l], n, new Set([...a, l])),
              });
            } else if (Z(l)) s.push(o);
            else throw new O({ type: l });
          }
        }
        return s;
      })(o, r);
    }
    return a;
  }
  e.s(["n", 0, Z, "l", 0, B, "F", 0, j, "Z", 0, H], 892259);
  let V = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  (e.s(["f", 0, K], 203765),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t = K(e),
            r = [],
            n = e.length;
          for (let a = 0; a < n; a++) {
            let n = e[a];
            d(n) || r.push(j(n, t));
          }
          return r;
        },
      ],
      428296,
    ));
};
