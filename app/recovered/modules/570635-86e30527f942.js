// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(
    [
      "d",
      () => eg,
      "h",
      () => e$,
      "G",
      () => eA,
      "j",
      () => ex,
      "p",
      () => eP,
      "w",
      () => ea,
      "f",
      () => ei,
      "U",
      () => es,
      "J",
      () => eo,
      "u",
      () => ef,
      "A",
      () => ec,
      "V",
      () => eu,
      "i",
      () => el,
      "o",
      () => eb,
      "M",
      () => ed,
      "k",
      () => eh,
      "L",
      () => em,
      "q",
      () => ep,
      "g",
      () => ey,
    ],
    341989,
  ),
    e.s(
      ["F", () => Q, "u", () => K, "E", () => Y, "g", () => X, "N", () => ee],
      316790,
    ));
  var t = e.i(950185);
  let n = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function r(e) {
    return n.test(e);
  }
  function a(e) {
    return (0, t.q)(n, e);
  }
  let i = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
  function s(e) {
    return i.test(e);
  }
  function o(e) {
    return (0, t.q)(i, e);
  }
  let f =
    /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
  function c(e) {
    return f.test(e);
  }
  function u(e) {
    return (0, t.q)(f, e);
  }
  let l = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
  function d(e) {
    return l.test(e);
  }
  function b(e) {
    return (0, t.q)(l, e);
  }
  let p =
    /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
  function h(e) {
    return p.test(e);
  }
  function m(e) {
    return (0, t.q)(p, e);
  }
  let y = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
  function g(e) {
    return y.test(e);
  }
  function v(e) {
    return (0, t.q)(y, e);
  }
  let w = /^receive\(\) external payable$/;
  function $(e) {
    return w.test(e);
  }
  let x = new Set(["memory", "indexed", "storage", "calldata"]),
    P = new Set(["indexed"]),
    A = new Set(["calldata", "memory", "storage"]);
  e.s(
    [
      "x",
      0,
      P,
      "Q",
      0,
      m,
      "h",
      0,
      a,
      "C",
      0,
      o,
      "L",
      0,
      v,
      "p",
      0,
      u,
      "q",
      0,
      b,
      "S",
      0,
      A,
      "R",
      0,
      h,
      "t",
      0,
      r,
      "c",
      0,
      s,
      "K",
      0,
      g,
      "k",
      0,
      c,
      "D",
      0,
      $,
      "J",
      0,
      d,
      "m",
      0,
      x,
    ],
    916067,
  );
  class M extends Error {
    constructor(e, t = {}) {
      let n =
          t.cause instanceof M
            ? t.cause.details
            : t.cause?.message
              ? t.cause.message
              : t.details,
        r = (t.cause instanceof M && t.cause.docsPath) || t.docsPath;
      (super(
        [
          e || "An error occurred.",
          "",
          ...(t.metaMessages ? [...t.metaMessages, ""] : []),
          ...(r ? [`Docs: https://abitype.dev${r}`] : []),
          ...(n ? [`Details: ${n}`] : []),
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
        (this.details = n),
        (this.docsPath = r),
        (this.metaMessages = t.metaMessages),
        (this.shortMessage = e));
    }
  }
  class E extends M {
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
  class z extends M {
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
      class extends M {
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
      z,
      "I",
      0,
      E,
    ],
    125500,
  );
  class I extends M {
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
  class O extends M {
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
  class j extends M {
    constructor({ param: e, type: t, modifier: n }) {
      (super("Invalid ABI parameter.", {
        details: e,
        metaMessages: [
          `Modifier "${n}" not allowed${t ? ` in "${t}" type` : ""}.`,
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
  class B extends M {
    constructor({ param: e, type: t, modifier: n }) {
      (super("Invalid ABI parameter.", {
        details: e,
        metaMessages: [
          `Modifier "${n}" not allowed${t ? ` in "${t}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${n}" was given.`,
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
  class T extends M {
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
      class extends M {
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
      T,
      "P",
      0,
      B,
      "$",
      0,
      j,
      "q",
      0,
      I,
      "r",
      0,
      O,
    ],
    759169,
  );
  class N extends M {
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
  class S extends M {
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
  class C extends M {
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
  class F extends M {
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
  class k extends M {
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
  let R = new Map([
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
  function U(e, t = {}) {
    if (c(e))
      return (function (e, t = {}) {
        let n = u(e);
        if (!n) throw new N({ signature: e, type: "function" });
        let r = V(n.parameters),
          a = [],
          i = r.length;
        for (let e = 0; e < i; e++)
          a.push(_(r[e], { modifiers: A, structs: t, type: "function" }));
        let s = [];
        if (n.returns) {
          let e = V(n.returns),
            r = e.length;
          for (let n = 0; n < r; n++)
            s.push(_(e[n], { modifiers: A, structs: t, type: "function" }));
        }
        return {
          name: n.name,
          type: "function",
          stateMutability: n.stateMutability ?? "nonpayable",
          inputs: a,
          outputs: s,
        };
      })(e, t);
    if (s(e))
      return (function (e, t = {}) {
        let n = o(e);
        if (!n) throw new N({ signature: e, type: "event" });
        let r = V(n.parameters),
          a = [],
          i = r.length;
        for (let e = 0; e < i; e++)
          a.push(_(r[e], { modifiers: P, structs: t, type: "event" }));
        return { name: n.name, type: "event", inputs: a };
      })(e, t);
    if (r(e))
      return (function (e, t = {}) {
        let n = a(e);
        if (!n) throw new N({ signature: e, type: "error" });
        let r = V(n.parameters),
          i = [],
          s = r.length;
        for (let e = 0; e < s; e++)
          i.push(_(r[e], { structs: t, type: "error" }));
        return { name: n.name, type: "error", inputs: i };
      })(e, t);
    if (h(e))
      return (function (e, t = {}) {
        let n = m(e);
        if (!n) throw new N({ signature: e, type: "constructor" });
        let r = V(n.parameters),
          a = [],
          i = r.length;
        for (let e = 0; e < i; e++)
          a.push(_(r[e], { structs: t, type: "constructor" }));
        return {
          type: "constructor",
          stateMutability: n.stateMutability ?? "nonpayable",
          inputs: a,
        };
      })(e, t);
    if (g(e)) {
      var n = e;
      let t = v(n);
      if (!t) throw new N({ signature: n, type: "fallback" });
      return {
        type: "fallback",
        stateMutability: t.stateMutability ?? "nonpayable",
      };
    }
    if ($(e)) return { type: "receive", stateMutability: "payable" };
    throw new S({ signature: e });
  }
  let D =
      /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    L =
      /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
    G = /^u?int$/;
  function _(e, n) {
    var r, a;
    let i,
      s = (function (e, t, n) {
        let r = "";
        if (n)
          for (let e of Object.entries(n)) {
            if (!e) continue;
            let t = "";
            for (let n of e[1]) t += `[${n.type}${n.name ? `:${n.name}` : ""}]`;
            r += `(${e[0]}{${t}})`;
          }
        return t ? `${t}:${e}${r}` : `${e}${r}`;
      })(e, n?.type, n?.structs);
    if (R.has(s)) return R.get(s);
    let o = t.S.test(e),
      f = (0, t.q)(o ? L : D, e);
    if (!f) throw new I({ param: e });
    if (
      f.name &&
      ("address" === (r = f.name) ||
        "bool" === r ||
        "function" === r ||
        "string" === r ||
        "tuple" === r ||
        t.h.test(r) ||
        t.x.test(r) ||
        H.test(r))
    )
      throw new O({ param: e, name: f.name });
    let c = f.name ? { name: f.name } : {},
      u = "indexed" === f.modifier ? { indexed: !0 } : {},
      l = n?.structs ?? {},
      d = {};
    if (o) {
      i = "tuple";
      let e = V(f.type),
        t = [],
        n = e.length;
      for (let r = 0; r < n; r++) t.push(_(e[r], { structs: l }));
      d = { components: t };
    } else if (f.type in l) ((i = "tuple"), (d = { components: l[f.type] }));
    else if (G.test(f.type)) i = `${f.type}256`;
    else if ("address payable" === f.type) i = "address";
    else if (((i = f.type), n?.type !== "struct" && !q(i)))
      throw new z({ type: i });
    if (f.modifier) {
      if (!n?.modifiers?.has?.(f.modifier))
        throw new j({ param: e, type: n?.type, modifier: f.modifier });
      if (
        A.has(f.modifier) &&
        ((a = i), !f.array && "bytes" !== a && "string" !== a && "tuple" !== a)
      )
        throw new B({ param: e, type: n?.type, modifier: f.modifier });
    }
    let b = { type: `${i}${f.array ?? ""}`, ...c, ...u, ...d };
    return (R.set(s, b), b);
  }
  function V(e, t = [], n = "", r = 0) {
    let a = e.trim().length;
    for (let i = 0; i < a; i++) {
      let a = e[i],
        s = e.slice(i + 1);
      switch (a) {
        case ",":
          return 0 === r ? V(s, [...t, n.trim()]) : V(s, t, `${n}${a}`, r);
        case "(":
          return V(s, t, `${n}${a}`, r + 1);
        case ")":
          return V(s, t, `${n}${a}`, r - 1);
        default:
          return V(s, t, `${n}${a}`, r);
      }
    }
    if ("" === n) return t;
    if (0 !== r) throw new k({ current: n, depth: r });
    return (t.push(n.trim()), t);
  }
  function q(e) {
    return (
      "address" === e ||
      "bool" === e ||
      "function" === e ||
      "string" === e ||
      t.h.test(e) ||
      t.x.test(e)
    );
  }
  let H =
    /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  function W(e) {
    let n = {},
      r = e.length;
    for (let t = 0; t < r; t++) {
      let r = e[t];
      if (!d(r)) continue;
      let a = b(r);
      if (!a) throw new N({ signature: r, type: "struct" });
      let i = a.properties.split(";"),
        s = [],
        o = i.length;
      for (let e = 0; e < o; e++) {
        let t = i[e].trim();
        if (!t) continue;
        let n = _(t, { type: "struct" });
        s.push(n);
      }
      if (!s.length) throw new C({ signature: r });
      n[a.name] = s;
    }
    let a = {},
      i = Object.entries(n),
      s = i.length;
    for (let e = 0; e < s; e++) {
      let [r, s] = i[e];
      a[r] = (function e(n = [], r = {}, a = new Set()) {
        let i = [],
          s = n.length;
        for (let o = 0; o < s; o++) {
          let s = n[o];
          if (t.S.test(s.type)) i.push(s);
          else {
            let n = (0, t.q)(Z, s.type);
            if (!n?.type) throw new T({ abiParameter: s });
            let { array: o, type: f } = n;
            if (f in r) {
              if (a.has(f)) throw new F({ type: f });
              i.push({
                ...s,
                type: `tuple${o ?? ""}`,
                components: e(r[f], r, new Set([...a, f])),
              });
            } else if (q(f)) i.push(s);
            else throw new E({ type: f });
          }
        }
        return i;
      })(s, n);
    }
    return a;
  }
  e.s(["n", 0, q, "l", 0, _, "F", 0, U, "Z", 0, V], 256881);
  let Z = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  (e.s(["f", 0, W], 156884),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t = W(e),
            n = [],
            r = e.length;
          for (let a = 0; a < r; a++) {
            let r = e[a];
            d(r) || n.push(U(r, t));
          }
          return n;
        },
      ],
      570635,
    ));
  class J extends Error {
    static setStaticOptions(e) {
      ((J.prototype.docsOrigin = e.docsOrigin),
        (J.prototype.showVersion = e.showVersion),
        (J.prototype.version = e.version));
    }
    constructor(e, t = {}) {
      let n = (() => {
          if (t.cause instanceof J) {
            if (t.cause.details) return t.cause.details;
            if (t.cause.shortMessage) return t.cause.shortMessage;
          }
          return t.cause &&
            "details" in t.cause &&
            "string" == typeof t.cause.details
            ? t.cause.details
            : t.cause?.message
              ? t.cause.message
              : t.details;
        })(),
        r = (t.cause instanceof J && t.cause.docsPath) || t.docsPath,
        a = t.docsOrigin ?? J.prototype.docsOrigin,
        i = `${a}${r ?? ""}`,
        s = !!(t.version ?? J.prototype.showVersion),
        o = t.version ?? J.prototype.version;
      (super(
        [
          e || "An error occurred.",
          ...(t.metaMessages ? ["", ...t.metaMessages] : []),
          ...(n || r || s
            ? [
                "",
                n ? `Details: ${n}` : void 0,
                r ? `See: ${i}` : void 0,
                s ? `Version: ${o}` : void 0,
              ]
            : []),
        ]
          .filter((e) => "string" == typeof e)
          .join("\n"),
        t.cause ? { cause: t.cause } : void 0,
      ),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsOrigin", {
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
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "showVersion", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "version", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "BaseError",
        }),
        (this.cause = t.cause),
        (this.details = n),
        (this.docs = i),
        (this.docsOrigin = a),
        (this.docsPath = r),
        (this.shortMessage = e),
        (this.showVersion = s),
        (this.version = o));
    }
    walk(e) {
      return (function e(t, n) {
        return n?.(t)
          ? t
          : t && "object" == typeof t && "cause" in t && t.cause
            ? e(t.cause, n)
            : n
              ? null
              : t;
      })(this, e);
    }
  }
  function K(e, t) {
    if (eb(e) > t) throw new ex({ givenSize: eb(e), maxSize: t });
  }
  function Y(e, t) {
    if ("number" == typeof t && t > 0 && t > eb(e) - 1)
      throw new eP({ offset: t, position: "start", size: eb(e) });
  }
  function Q(e, t, n) {
    if ("number" == typeof t && "number" == typeof n && eb(e) !== n - t)
      throw new eP({ offset: n, position: "end", size: eb(e) });
  }
  function X(e, t = {}) {
    let { dir: n, size: r = 32 } = t;
    if (0 === r) return e;
    let a = e.replace("0x", "");
    if (a.length > 2 * r)
      throw new eA({
        size: Math.ceil(a.length / 2),
        targetSize: r,
        type: "Hex",
      });
    return `0x${a["right" === n ? "padEnd" : "padStart"](2 * r, "0")}`;
  }
  function ee(e, t = {}) {
    let { dir: n = "left" } = t,
      r = e.replace("0x", ""),
      a = 0;
    for (let e = 0; e < r.length - 1; e++)
      if ("0" === r["left" === n ? e : r.length - e - 1].toString()) a++;
      else break;
    return "0" === (r = "left" === n ? r.slice(a) : r.slice(0, r.length - a))
      ? "0x"
      : "right" === n && r.length % 2 == 1
        ? `0x${r}0`
        : `0x${r}`;
  }
  function et(e, t, n) {
    return JSON.stringify(
      e,
      (e, n) =>
        "function" == typeof t
          ? t(e, n)
          : "bigint" == typeof n
            ? n.toString() + "#__bigint"
            : n,
      n,
    );
  }
  (Object.defineProperty(J, "defaultStaticOptions", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      docsOrigin: "https://oxlib.sh",
      showVersion: !1,
      version: "ox@0.1.1",
    },
  }),
    J.setStaticOptions(J.defaultStaticOptions),
    e.s(["f", 0, J], 214204),
    e.s(["f", 0, et], 719368));
  let en = new TextEncoder(),
    er = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function ea(...e) {
    return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
  }
  function ei(e) {
    return e instanceof Uint8Array
      ? eo(e)
      : Array.isArray(e)
        ? eo(new Uint8Array(e))
        : e;
  }
  function es(e, t = {}) {
    let n = `0x${Number(e)}`;
    return "number" == typeof t.size ? (K(n, t.size), eu(n, t.size)) : n;
  }
  function eo(e, t = {}) {
    let n = "";
    for (let t = 0; t < e.length; t++) n += er[e[t]];
    let r = `0x${n}`;
    return "number" == typeof t.size ? (K(r, t.size), el(r, t.size)) : r;
  }
  function ef(e, t = {}) {
    let n,
      { signed: r, size: a } = t,
      i = BigInt(e);
    a
      ? (n = r
          ? (1n << (8n * BigInt(a) - 1n)) - 1n
          : 2n ** (8n * BigInt(a)) - 1n)
      : "number" == typeof e && (n = BigInt(Number.MAX_SAFE_INTEGER));
    let s = "bigint" == typeof n && r ? -n - 1n : 0;
    if ((n && i > n) || i < s) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new eg({
        max: n ? `${n}${t}` : void 0,
        min: `${s}${t}`,
        signed: r,
        size: a,
        value: `${e}${t}`,
      });
    }
    let o = (r && i < 0 ? BigInt.asUintN(8 * a, BigInt(i)) : i).toString(16),
      f = `0x${o}`;
    return a ? eu(f, a) : f;
  }
  function ec(e, t = {}) {
    return eo(en.encode(e), t);
  }
  function eu(e, t) {
    return X(e, { dir: "left", size: t });
  }
  function el(e, t) {
    return X(e, { dir: "right", size: t });
  }
  function ed(e, t, n, r = {}) {
    let { strict: a } = r;
    Y(e, t);
    let i = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return (a && Q(i, t, n), i);
  }
  function eb(e) {
    return Math.ceil((e.length - 2) / 2);
  }
  function ep(e) {
    return ee(e, { dir: "left" });
  }
  function eh(e, t = {}) {
    let { signed: n } = t;
    t.size && K(e, t.size);
    let r = BigInt(e);
    if (!n) return r;
    let a = (1n << (8n * BigInt((e.length - 2) / 2))) - 1n;
    return r <= a >> 1n ? r : r - a - 1n;
  }
  function em(e, t = {}) {
    let { signed: n, size: r } = t;
    return n || r ? Number(eh(e, t)) : Number(e);
  }
  function ey(e, t = {}) {
    let { strict: n = !1 } = t;
    try {
      return (
        !(function (e, t = {}) {
          let { strict: n = !1 } = t;
          if (!e || "string" != typeof e) throw new ev(e);
          if ((n && !/^0x[0-9a-fA-F]*$/.test(e)) || !e.startsWith("0x"))
            throw new ew(e);
        })(e, { strict: n }),
        !0
      );
    } catch {
      return !1;
    }
  }
  class eg extends J {
    constructor({ max: e, min: t, signed: n, size: r, value: a }) {
      (super(
        `Number \`${a}\` is not in safe${r ? ` ${8 * r}-bit` : ""}${n ? " signed" : " unsigned"} integer range ${e ? `(\`${t}\` to \`${e}\`)` : `(above \`${t}\`)`}`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.IntegerOutOfRangeError",
        }));
    }
  }
  class ev extends J {
    constructor(e) {
      (super(
        `Value \`${"object" == typeof e ? et(e) : e}\` of type \`${typeof e}\` is an invalid hex type.`,
        { metaMessages: ['Hex types must be represented as `"0x${string}"`.'] },
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidHexTypeError",
        }));
    }
  }
  class ew extends J {
    constructor(e) {
      (super(`Value \`${e}\` is an invalid hex value.`, {
        metaMessages: [
          'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).',
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidHexValueError",
        }));
    }
  }
  class e$ extends J {
    constructor(e) {
      (super(
        `Hex value \`"${e}"\` is an odd length (${e.length - 2} nibbles).`,
        { metaMessages: ["It must be an even length."] },
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidLengthError",
        }));
    }
  }
  class ex extends J {
    constructor({ givenSize: e, maxSize: t }) {
      (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeOverflowError",
        }));
    }
  }
  class eP extends J {
    constructor({ offset: e, position: t, size: n }) {
      (super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${n}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SliceOffsetOutOfBoundsError",
        }));
    }
  }
  class eA extends J {
    constructor({ size: e, targetSize: t, type: n }) {
      (super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeExceedsPaddingSizeError",
        }));
    }
  }
  function eM(e) {
    return {
      address: e.address,
      amount: ef(e.amount),
      index: ef(e.index),
      validatorIndex: ef(e.validatorIndex),
    };
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        return {
          ...("bigint" == typeof e.baseFeePerGas && {
            baseFeePerGas: ef(e.baseFeePerGas),
          }),
          ...("bigint" == typeof e.blobBaseFee && {
            blobBaseFee: ef(e.blobBaseFee),
          }),
          ...("string" == typeof e.feeRecipient && {
            feeRecipient: e.feeRecipient,
          }),
          ...("bigint" == typeof e.gasLimit && { gasLimit: ef(e.gasLimit) }),
          ...("bigint" == typeof e.number && { number: ef(e.number) }),
          ...("bigint" == typeof e.prevRandao && {
            prevRandao: ef(e.prevRandao),
          }),
          ...("bigint" == typeof e.time && { time: ef(e.time) }),
          ...(e.withdrawals && { withdrawals: e.withdrawals.map(eM) }),
        };
      },
    ],
    586903,
  );
};
