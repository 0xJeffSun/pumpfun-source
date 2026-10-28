// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(229993);
  let r = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function n(e) {
    return r.test(e);
  }
  function s(e) {
    return (0, t.q)(r, e);
  }
  let i = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function o(e) {
    return i.test(e);
  }
  function a(e) {
    return (0, t.q)(i, e);
  }
  let u =
    /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
  function l(e) {
    return u.test(e);
  }
  function c(e) {
    return (0, t.q)(u, e);
  }
  let p = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
  function f(e) {
    return p.test(e);
  }
  function d(e) {
    return (0, t.q)(p, e);
  }
  let y =
    /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
  function m(e) {
    return y.test(e);
  }
  function h(e) {
    return (0, t.q)(y, e);
  }
  let _ = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
  function b(e) {
    return _.test(e);
  }
  function g(e) {
    return (0, t.q)(_, e);
  }
  let E = /^receive\(\) external payable$/;
  function w(e) {
    return E.test(e);
  }
  let A = new Set(["memory", "indexed", "storage", "calldata"]),
    v = new Set(["indexed"]),
    $ = new Set(["calldata", "memory", "storage"]);
  e.s(
    [
      "x",
      0,
      v,
      "Q",
      0,
      h,
      "h",
      0,
      s,
      "C",
      0,
      a,
      "L",
      0,
      g,
      "p",
      0,
      c,
      "q",
      0,
      d,
      "S",
      0,
      $,
      "R",
      0,
      m,
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
      l,
      "D",
      0,
      w,
      "J",
      0,
      f,
      "m",
      0,
      A,
    ],
    45732,
  );
  class I extends Error {
    constructor(e, t = {}) {
      let r =
          t.cause instanceof I
            ? t.cause.details
            : t.cause?.message
              ? t.cause.message
              : t.details,
        n = (t.cause instanceof I && t.cause.docsPath) || t.docsPath;
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
  class x extends I {
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
  class O extends I {
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
      class extends I {
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
      O,
      "I",
      0,
      x,
    ],
    639825,
  );
  class S extends I {
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
  class T extends I {
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
  class N extends I {
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
  class R extends I {
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
  class D extends I {
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
      class extends I {
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
      D,
      "P",
      0,
      R,
      "$",
      0,
      N,
      "q",
      0,
      S,
      "r",
      0,
      T,
    ],
    932826,
  );
  class U extends I {
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
  class P extends I {
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
  class M extends I {
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
  class L extends I {
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
  class C extends I {
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
  let z = new Map([
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
    if (l(e))
      return (function (e, t = {}) {
        let r = c(e);
        if (!r) throw new U({ signature: e, type: "function" });
        let n = W(r.parameters),
          s = [],
          i = n.length;
        for (let e = 0; e < i; e++)
          s.push(F(n[e], { modifiers: $, structs: t, type: "function" }));
        let o = [];
        if (r.returns) {
          let e = W(r.returns),
            n = e.length;
          for (let r = 0; r < n; r++)
            o.push(F(e[r], { modifiers: $, structs: t, type: "function" }));
        }
        return {
          name: r.name,
          type: "function",
          stateMutability: r.stateMutability ?? "nonpayable",
          inputs: s,
          outputs: o,
        };
      })(e, t);
    if (o(e))
      return (function (e, t = {}) {
        let r = a(e);
        if (!r) throw new U({ signature: e, type: "event" });
        let n = W(r.parameters),
          s = [],
          i = n.length;
        for (let e = 0; e < i; e++)
          s.push(F(n[e], { modifiers: v, structs: t, type: "event" }));
        return { name: r.name, type: "event", inputs: s };
      })(e, t);
    if (n(e))
      return (function (e, t = {}) {
        let r = s(e);
        if (!r) throw new U({ signature: e, type: "error" });
        let n = W(r.parameters),
          i = [],
          o = n.length;
        for (let e = 0; e < o; e++)
          i.push(F(n[e], { structs: t, type: "error" }));
        return { name: r.name, type: "error", inputs: i };
      })(e, t);
    if (m(e))
      return (function (e, t = {}) {
        let r = h(e);
        if (!r) throw new U({ signature: e, type: "constructor" });
        let n = W(r.parameters),
          s = [],
          i = n.length;
        for (let e = 0; e < i; e++)
          s.push(F(n[e], { structs: t, type: "constructor" }));
        return {
          type: "constructor",
          stateMutability: r.stateMutability ?? "nonpayable",
          inputs: s,
        };
      })(e, t);
    if (b(e)) {
      var r = e;
      let t = g(r);
      if (!t) throw new U({ signature: r, type: "fallback" });
      return {
        type: "fallback",
        stateMutability: t.stateMutability ?? "nonpayable",
      };
    }
    if (w(e)) return { type: "receive", stateMutability: "payable" };
    throw new P({ signature: e });
  }
  let B =
      /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    q =
      /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    k = /^u?int$/;
  function F(e, r) {
    var n, s;
    let i,
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
    if (z.has(o)) return z.get(o);
    let a = t.S.test(e),
      u = (0, t.q)(a ? q : B, e);
    if (!u) throw new S({ param: e });
    if (
      u.name &&
      ("address" === (n = u.name) ||
        "bool" === n ||
        "function" === n ||
        "string" === n ||
        "tuple" === n ||
        t.h.test(n) ||
        t.x.test(n) ||
        Z.test(n))
    )
      throw new T({ param: e, name: u.name });
    let l = u.name ? { name: u.name } : {},
      c = "indexed" === u.modifier ? { indexed: !0 } : {},
      p = r?.structs ?? {},
      f = {};
    if (a) {
      i = "tuple";
      let e = W(u.type),
        t = [],
        r = e.length;
      for (let n = 0; n < r; n++) t.push(F(e[n], { structs: p }));
      f = { components: t };
    } else if (u.type in p) ((i = "tuple"), (f = { components: p[u.type] }));
    else if (k.test(u.type)) i = `${u.type}256`;
    else if ("address payable" === u.type) i = "address";
    else if (((i = u.type), r?.type !== "struct" && !H(i)))
      throw new O({ type: i });
    if (u.modifier) {
      if (!r?.modifiers?.has?.(u.modifier))
        throw new N({ param: e, type: r?.type, modifier: u.modifier });
      if (
        $.has(u.modifier) &&
        ((s = i), !u.array && "bytes" !== s && "string" !== s && "tuple" !== s)
      )
        throw new R({ param: e, type: r?.type, modifier: u.modifier });
    }
    let d = { type: `${i}${u.array ?? ""}`, ...l, ...c, ...f };
    return (z.set(o, d), d);
  }
  function W(e, t = [], r = "", n = 0) {
    let s = e.trim().length;
    for (let i = 0; i < s; i++) {
      let s = e[i],
        o = e.slice(i + 1);
      switch (s) {
        case ",":
          return 0 === n ? W(o, [...t, r.trim()]) : W(o, t, `${r}${s}`, n);
        case "(":
          return W(o, t, `${r}${s}`, n + 1);
        case ")":
          return W(o, t, `${r}${s}`, n - 1);
        default:
          return W(o, t, `${r}${s}`, n);
      }
    }
    if ("" === r) return t;
    if (0 !== n) throw new C({ current: r, depth: n });
    return (t.push(r.trim()), t);
  }
  function H(e) {
    return (
      "address" === e ||
      "bool" === e ||
      "function" === e ||
      "string" === e ||
      t.h.test(e) ||
      t.x.test(e)
    );
  }
  let Z =
    /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  function V(e) {
    let r = {},
      n = e.length;
    for (let t = 0; t < n; t++) {
      let n = e[t];
      if (!f(n)) continue;
      let s = d(n);
      if (!s) throw new U({ signature: n, type: "struct" });
      let i = s.properties.split(";"),
        o = [],
        a = i.length;
      for (let e = 0; e < a; e++) {
        let t = i[e].trim();
        if (!t) continue;
        let r = F(t, { type: "struct" });
        o.push(r);
      }
      if (!o.length) throw new M({ signature: n });
      r[s.name] = o;
    }
    let s = {},
      i = Object.entries(r),
      o = i.length;
    for (let e = 0; e < o; e++) {
      let [n, o] = i[e];
      s[n] = (function e(r = [], n = {}, s = new Set()) {
        let i = [],
          o = r.length;
        for (let a = 0; a < o; a++) {
          let o = r[a];
          if (t.S.test(o.type)) i.push(o);
          else {
            let r = (0, t.q)(G, o.type);
            if (!r?.type) throw new D({ abiParameter: o });
            let { array: a, type: u } = r;
            if (u in n) {
              if (s.has(u)) throw new L({ type: u });
              i.push({
                ...o,
                type: `tuple${a ?? ""}`,
                components: e(n[u], n, new Set([...s, u])),
              });
            } else if (H(u)) i.push(o);
            else throw new x({ type: u });
          }
        }
        return i;
      })(o, r);
    }
    return s;
  }
  e.s(["n", 0, H, "l", 0, F, "F", 0, j, "Z", 0, W], 892259);
  let G = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  (e.s(["f", 0, V], 203765),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t = V(e),
            r = [],
            n = e.length;
          for (let s = 0; s < n; s++) {
            let n = e[s];
            f(n) || r.push(j(n, t));
          }
          return r;
        },
      ],
      428296,
    ));
};
