// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(229993);
  let r = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function n(e) {
    return r.test(e);
  }
  function i(e) {
    return (0, t.q)(r, e);
  }
  let s = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function a(e) {
    return s.test(e);
  }
  function o(e) {
    return (0, t.q)(s, e);
  }
  let u =
    /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
  function c(e) {
    return u.test(e);
  }
  function l(e) {
    return (0, t.q)(u, e);
  }
  let f = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
  function d(e) {
    return f.test(e);
  }
  function h(e) {
    return (0, t.q)(f, e);
  }
  let p =
    /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
  function b(e) {
    return p.test(e);
  }
  function y(e) {
    return (0, t.q)(p, e);
  }
  let m = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
  function x(e) {
    return m.test(e);
  }
  function g(e) {
    return (0, t.q)(m, e);
  }
  let v = /^receive\(\) external payable$/;
  function w(e) {
    return v.test(e);
  }
  let $ = new Set(["memory", "indexed", "storage", "calldata"]),
    A = new Set(["indexed"]),
    I = new Set(["calldata", "memory", "storage"]);
  e.s(
    [
      "x",
      0,
      A,
      "Q",
      0,
      y,
      "h",
      0,
      i,
      "C",
      0,
      o,
      "L",
      0,
      g,
      "p",
      0,
      l,
      "q",
      0,
      h,
      "S",
      0,
      I,
      "R",
      0,
      b,
      "t",
      0,
      n,
      "c",
      0,
      a,
      "K",
      0,
      x,
      "k",
      0,
      c,
      "D",
      0,
      w,
      "J",
      0,
      d,
      "m",
      0,
      $,
    ],
    45732,
  );
  class E extends Error {
    constructor(e, t = {}) {
      let r =
          t.cause instanceof E
            ? t.cause.details
            : t.cause?.message
              ? t.cause.message
              : t.details,
        n = (t.cause instanceof E && t.cause.docsPath) || t.docsPath;
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
  class M extends E {
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
  class B extends E {
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
      class extends E {
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
      B,
      "I",
      0,
      M,
    ],
    639825,
  );
  class P extends E {
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
  class O extends E {
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
  class S extends E {
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
  class k extends E {
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
  class U extends E {
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
      class extends E {
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
      U,
      "P",
      0,
      k,
      "$",
      0,
      S,
      "q",
      0,
      P,
      "r",
      0,
      O,
    ],
    932826,
  );
  class N extends E {
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
  class z extends E {
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
  class j extends E {
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
  class D extends E {
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
  class F extends E {
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
  let H = new Map([
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
  function C(e, t = {}) {
    if (c(e))
      return (function (e, t = {}) {
        let r = l(e);
        if (!r) throw new N({ signature: e, type: "function" });
        let n = Z(r.parameters),
          i = [],
          s = n.length;
        for (let e = 0; e < s; e++)
          i.push(q(n[e], { modifiers: I, structs: t, type: "function" }));
        let a = [];
        if (r.returns) {
          let e = Z(r.returns),
            n = e.length;
          for (let r = 0; r < n; r++)
            a.push(q(e[r], { modifiers: I, structs: t, type: "function" }));
        }
        return {
          name: r.name,
          type: "function",
          stateMutability: r.stateMutability ?? "nonpayable",
          inputs: i,
          outputs: a,
        };
      })(e, t);
    if (a(e))
      return (function (e, t = {}) {
        let r = o(e);
        if (!r) throw new N({ signature: e, type: "event" });
        let n = Z(r.parameters),
          i = [],
          s = n.length;
        for (let e = 0; e < s; e++)
          i.push(q(n[e], { modifiers: A, structs: t, type: "event" }));
        return { name: r.name, type: "event", inputs: i };
      })(e, t);
    if (n(e))
      return (function (e, t = {}) {
        let r = i(e);
        if (!r) throw new N({ signature: e, type: "error" });
        let n = Z(r.parameters),
          s = [],
          a = n.length;
        for (let e = 0; e < a; e++)
          s.push(q(n[e], { structs: t, type: "error" }));
        return { name: r.name, type: "error", inputs: s };
      })(e, t);
    if (b(e))
      return (function (e, t = {}) {
        let r = y(e);
        if (!r) throw new N({ signature: e, type: "constructor" });
        let n = Z(r.parameters),
          i = [],
          s = n.length;
        for (let e = 0; e < s; e++)
          i.push(q(n[e], { structs: t, type: "constructor" }));
        return {
          type: "constructor",
          stateMutability: r.stateMutability ?? "nonpayable",
          inputs: i,
        };
      })(e, t);
    if (x(e)) {
      var r = e;
      let t = g(r);
      if (!t) throw new N({ signature: r, type: "fallback" });
      return {
        type: "fallback",
        stateMutability: t.stateMutability ?? "nonpayable",
      };
    }
    if (w(e)) return { type: "receive", stateMutability: "payable" };
    throw new z({ signature: e });
  }
  let L =
      /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    T =
      /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    _ = /^u?int$/;
  function q(e, r) {
    var n, i;
    let s,
      a = (function (e, t, r) {
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
    if (H.has(a)) return H.get(a);
    let o = t.S.test(e),
      u = (0, t.q)(o ? T : L, e);
    if (!u) throw new P({ param: e });
    if (
      u.name &&
      ("address" === (n = u.name) ||
        "bool" === n ||
        "function" === n ||
        "string" === n ||
        "tuple" === n ||
        t.h.test(n) ||
        t.x.test(n) ||
        W.test(n))
    )
      throw new O({ param: e, name: u.name });
    let c = u.name ? { name: u.name } : {},
      l = "indexed" === u.modifier ? { indexed: !0 } : {},
      f = r?.structs ?? {},
      d = {};
    if (o) {
      s = "tuple";
      let e = Z(u.type),
        t = [],
        r = e.length;
      for (let n = 0; n < r; n++) t.push(q(e[n], { structs: f }));
      d = { components: t };
    } else if (u.type in f) ((s = "tuple"), (d = { components: f[u.type] }));
    else if (_.test(u.type)) s = `${u.type}256`;
    else if ("address payable" === u.type) s = "address";
    else if (((s = u.type), r?.type !== "struct" && !G(s)))
      throw new B({ type: s });
    if (u.modifier) {
      if (!r?.modifiers?.has?.(u.modifier))
        throw new S({ param: e, type: r?.type, modifier: u.modifier });
      if (
        I.has(u.modifier) &&
        ((i = s), !u.array && "bytes" !== i && "string" !== i && "tuple" !== i)
      )
        throw new k({ param: e, type: r?.type, modifier: u.modifier });
    }
    let h = { type: `${s}${u.array ?? ""}`, ...c, ...l, ...d };
    return (H.set(a, h), h);
  }
  function Z(e, t = [], r = "", n = 0) {
    let i = e.trim().length;
    for (let s = 0; s < i; s++) {
      let i = e[s],
        a = e.slice(s + 1);
      switch (i) {
        case ",":
          return 0 === n ? Z(a, [...t, r.trim()]) : Z(a, t, `${r}${i}`, n);
        case "(":
          return Z(a, t, `${r}${i}`, n + 1);
        case ")":
          return Z(a, t, `${r}${i}`, n - 1);
        default:
          return Z(a, t, `${r}${i}`, n);
      }
    }
    if ("" === r) return t;
    if (0 !== n) throw new F({ current: r, depth: n });
    return (t.push(r.trim()), t);
  }
  function G(e) {
    return (
      "address" === e ||
      "bool" === e ||
      "function" === e ||
      "string" === e ||
      t.h.test(e) ||
      t.x.test(e)
    );
  }
  let W =
    /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  function J(e) {
    let r = {},
      n = e.length;
    for (let t = 0; t < n; t++) {
      let n = e[t];
      if (!d(n)) continue;
      let i = h(n);
      if (!i) throw new N({ signature: n, type: "struct" });
      let s = i.properties.split(";"),
        a = [],
        o = s.length;
      for (let e = 0; e < o; e++) {
        let t = s[e].trim();
        if (!t) continue;
        let r = q(t, { type: "struct" });
        a.push(r);
      }
      if (!a.length) throw new j({ signature: n });
      r[i.name] = a;
    }
    let i = {},
      s = Object.entries(r),
      a = s.length;
    for (let e = 0; e < a; e++) {
      let [n, a] = s[e];
      i[n] = (function e(r = [], n = {}, i = new Set()) {
        let s = [],
          a = r.length;
        for (let o = 0; o < a; o++) {
          let a = r[o];
          if (t.S.test(a.type)) s.push(a);
          else {
            let r = (0, t.q)(R, a.type);
            if (!r?.type) throw new U({ abiParameter: a });
            let { array: o, type: u } = r;
            if (u in n) {
              if (i.has(u)) throw new D({ type: u });
              s.push({
                ...a,
                type: `tuple${o ?? ""}`,
                components: e(n[u], n, new Set([...i, u])),
              });
            } else if (G(u)) s.push(a);
            else throw new M({ type: u });
          }
        }
        return s;
      })(a, r);
    }
    return i;
  }
  e.s(["n", 0, G, "l", 0, q, "F", 0, C, "Z", 0, Z], 892259);
  let R = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  (e.s(["f", 0, J], 203765),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t = J(e),
            r = [],
            n = e.length;
          for (let i = 0; i < n; i++) {
            let n = e[i];
            d(n) || r.push(C(n, t));
          }
          return r;
        },
      ],
      428296,
    ));
};
