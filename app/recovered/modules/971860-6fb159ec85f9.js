// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, { includeName: n = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new M(e.type);
    return `${e.name}(${r(e.inputs, { includeName: n })})`;
  }
  function r(e, { includeName: t = !1 } = {}) {
    return e
      ? e
          .map((e) =>
            (function (e, { includeName: t }) {
              return e.type.startsWith("tuple")
                ? `(${r(e.components, { includeName: t })})${e.type.slice(5)}`
                : e.type + (t && e.name ? ` ${e.name}` : "");
            })(e, { includeName: t }),
          )
          .join(t ? ", " : ",")
      : "";
  }
  (e.s(
    [
      "j",
      () => o,
      "B",
      () => i,
      "D",
      () => a,
      "g",
      () => c,
      "S",
      () => u,
      "T",
      () => l,
      "U",
      () => d,
      "A",
      () => f,
      "k",
      () => h,
      "J",
      () => p,
      "V",
      () => y,
      "R",
      () => b,
      "u",
      () => m,
      "$",
      () => g,
      "Y",
      () => v,
      "N",
      () => w,
      "r",
      () => x,
      "M",
      () => P,
      "t",
      () => $,
      "s",
      () => I,
      "l",
      () => B,
      "v",
      () => E,
      "w",
      () => T,
      "d",
      () => M,
      "b",
      () => A,
    ],
    76373,
  ),
    e.s(["r", () => t, "Q", () => r], 515752));
  var n = e.i(612735),
    s = e.i(532617);
  class o extends s.f {
    constructor({ docsPath: e }) {
      super(
        "A constructor was not found on the ABI.\nMake sure you are using the correct ABI and that the constructor exists on it.",
        { docsPath: e, name: "AbiConstructorNotFoundError" },
      );
    }
  }
  class i extends s.f {
    constructor({ docsPath: e }) {
      super(
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.\nMake sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        { docsPath: e, name: "AbiConstructorParamsNotFoundError" },
      );
    }
  }
  s.f;
  class a extends s.f {
    constructor({ data: e, params: t, size: n }) {
      (super(`Data size of ${n} bytes is too small for given parameters.`, {
        metaMessages: [
          `Params: (${r(t, { includeName: !0 })})`,
          `Data:   ${e} (${n} bytes)`,
        ],
        name: "AbiDecodingDataSizeTooSmallError",
      }),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "params", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "size", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = e),
        (this.params = t),
        (this.size = n));
    }
  }
  class c extends s.f {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  }
  class u extends s.f {
    constructor({ expectedLength: e, givenLength: t, type: r }) {
      super(
        `ABI encoding array length mismatch for type ${r}.
Expected length: ${e}
Given length: ${t}`,
        { name: "AbiEncodingArrayLengthMismatchError" },
      );
    }
  }
  class l extends s.f {
    constructor({ expectedSize: e, value: t }) {
      super(
        `Size of bytes "${t}" (bytes${(0, n.f)(t)}) does not match expected size (bytes${e}).`,
        { name: "AbiEncodingBytesSizeMismatchError" },
      );
    }
  }
  class d extends s.f {
    constructor({ expectedLength: e, givenLength: t }) {
      super(
        `ABI encoding params/values length mismatch.
Expected length (params): ${e}
Given length (values): ${t}`,
        { name: "AbiEncodingLengthMismatchError" },
      );
    }
  }
  class f extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Arguments (\`args\`) were provided to "${e}", but "${e}" on the ABI does not contain any parameters (\`inputs\`).
Cannot encode error result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the inputs exist on it.`,
        { docsPath: t, name: "AbiErrorInputsNotFoundError" },
      );
    }
  }
  class h extends s.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Error ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.`,
        { docsPath: t, name: "AbiErrorNotFoundError" },
      );
    }
  }
  class p extends s.f {
    constructor(e, { docsPath: t }) {
      (super(
        `Encoded error signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.
You can look up the decoded signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiErrorSignatureNotFoundError" },
      ),
        Object.defineProperty(this, "signature", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.signature = e));
    }
  }
  class b extends s.f {
    constructor({ docsPath: e }) {
      super("Cannot extract event signature from empty topics.", {
        docsPath: e,
        name: "AbiEventSignatureEmptyTopicsError",
      });
    }
  }
  class m extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded event signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiEventSignatureNotFoundError" },
      );
    }
  }
  class y extends s.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Event ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.`,
        { docsPath: t, name: "AbiEventNotFoundError" },
      );
    }
  }
  class g extends s.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Function ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionNotFoundError" },
      );
    }
  }
  class v extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Function "${e}" does not contain any \`outputs\` on ABI.
Cannot decode function result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionOutputsNotFoundError" },
      );
    }
  }
  class w extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded function signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiFunctionSignatureNotFoundError" },
      );
    }
  }
  class x extends s.f {
    constructor(e, r) {
      super("Found ambiguous types in overloaded ABI items.", {
        metaMessages: [
          `\`${e.type}\` in \`${t(e.abiItem)}\`, and`,
          `\`${r.type}\` in \`${t(r.abiItem)}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI.",
        ],
        name: "AbiItemAmbiguityError",
      });
    }
  }
  class P extends s.f {
    constructor({ expectedSize: e, givenSize: t }) {
      super(`Expected bytes${e}, got bytes${t}.`, {
        name: "BytesSizeMismatchError",
      });
    }
  }
  class $ extends s.f {
    constructor({ abiItem: e, data: t, params: n, size: s }) {
      (super(
        `Data size of ${s} bytes is too small for non-indexed event parameters.`,
        {
          metaMessages: [
            `Params: (${r(n, { includeName: !0 })})`,
            `Data:   ${t} (${s} bytes)`,
          ],
          name: "DecodeLogDataMismatch",
        },
      ),
        Object.defineProperty(this, "abiItem", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "params", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "size", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.abiItem = e),
        (this.data = t),
        (this.params = n),
        (this.size = s));
    }
  }
  class I extends s.f {
    constructor({ abiItem: e, param: r }) {
      (super(
        `Expected a topic for indexed event parameter${r.name ? ` "${r.name}"` : ""} on event "${t(e, { includeName: !0 })}".`,
        { name: "DecodeLogTopicsMismatch" },
      ),
        Object.defineProperty(this, "abiItem", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.abiItem = e));
    }
  }
  class E extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid encoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiEncodingType" },
      );
    }
  }
  class B extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid decoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiDecodingType" },
      );
    }
  }
  class T extends s.f {
    constructor(e) {
      super(`Value "${e}" is not a valid array.`, {
        name: "InvalidArrayError",
      });
    }
  }
  class M extends s.f {
    constructor(e) {
      super(
        `"${e}" is not a valid definition type.
Valid types: "function", "event", "error"`,
        { name: "InvalidDefinitionTypeError" },
      );
    }
  }
  class A extends s.f {
    constructor(e) {
      super(`Type "${e}" is not supported for packed encoding.`, {
        name: "UnsupportedPackedAbiType",
      });
    }
  }
  var R = e.i(296006),
    O = e.i(108270),
    N = e.i(4911),
    j = e.i(990149),
    k = e.i(417672),
    U = e.i(989494),
    z = e.i(19648);
  let C =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  e.s(
    [
      "c",
      0,
      /^(.*)\[([0-9]*)\]$/,
      "h",
      0,
      /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
      "x",
      0,
      C,
    ],
    308286,
  );
  function S(e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let { dynamic: s, encoded: o } = e[r];
      s ? (t += 32) : (t += (0, n.f)(o));
    }
    let r = [],
      s = [],
      o = 0;
    for (let i = 0; i < e.length; i++) {
      let { dynamic: a, encoded: c } = e[i];
      a
        ? (r.push((0, z.N)(t + o, { size: 32 })), s.push(c), (o += (0, n.f)(c)))
        : r.push(c);
    }
    return (0, j.w)([...r, ...s]);
  }
  function F(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  e.s(
    [
      "N",
      0,
      function (e, t) {
        if (e.length !== t.length)
          throw new d({ expectedLength: e.length, givenLength: t.length });
        let r = S(
          (function ({ params: e, values: t }) {
            let r = [];
            for (let o = 0; o < e.length; o++)
              r.push(
                (function e({ param: t, value: r }) {
                  let o = F(t.type);
                  if (o) {
                    let [n, s] = o;
                    return (function (t, { length: r, param: n }) {
                      let s = null === r;
                      if (!Array.isArray(t)) throw new T(t);
                      if (!s && t.length !== r)
                        throw new u({
                          expectedLength: r,
                          givenLength: t.length,
                          type: `${n.type}[${r}]`,
                        });
                      let o = !1,
                        i = [];
                      for (let r = 0; r < t.length; r++) {
                        let s = e({ param: n, value: t[r] });
                        (s.dynamic && (o = !0), i.push(s));
                      }
                      if (s || o) {
                        let e = S(i);
                        if (s) {
                          let t = (0, z.N)(i.length, { size: 32 });
                          return {
                            dynamic: !0,
                            encoded: i.length > 0 ? (0, j.w)([t, e]) : t,
                          };
                        }
                        if (o) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, j.w)(i.map(({ encoded: e }) => e)),
                      };
                    })(r, { length: n, param: { ...t, type: s } });
                  }
                  if ("tuple" === t.type)
                    return (function (t, { param: r }) {
                      let n = !1,
                        s = [];
                      for (let o = 0; o < r.components.length; o++) {
                        let i = r.components[o],
                          a = Array.isArray(t) ? o : i.name,
                          c = e({ param: i, value: t[a] });
                        (s.push(c), c.dynamic && (n = !0));
                      }
                      return {
                        dynamic: n,
                        encoded: n
                          ? S(s)
                          : (0, j.w)(s.map(({ encoded: e }) => e)),
                      };
                    })(r, { param: t });
                  if ("address" === t.type) {
                    var i = r;
                    if (!(0, N.f)(i)) throw new R.f({ address: i });
                    return { dynamic: !1, encoded: (0, k.n)(i.toLowerCase()) };
                  }
                  if ("bool" === t.type) {
                    var a = r;
                    if ("boolean" != typeof a)
                      throw new s.f(
                        `Invalid boolean value: "${a}" (type: ${typeof a}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, k.n)((0, z.V)(a)) };
                  }
                  if (t.type.startsWith("uint") || t.type.startsWith("int")) {
                    let e = t.type.startsWith("int"),
                      [, , n = "256"] = C.exec(t.type) ?? [];
                    return (function (e, { signed: t, size: r = 256 }) {
                      if ("number" == typeof r) {
                        let n = 2n ** (BigInt(r) - (t ? 1n : 0n)) - 1n,
                          s = t ? -n - 1n : 0n;
                        if (e > n || e < s)
                          throw new O.d({
                            max: n.toString(),
                            min: s.toString(),
                            signed: t,
                            size: r / 8,
                            value: e.toString(),
                          });
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, z.N)(e, { size: 32, signed: t }),
                      };
                    })(r, { signed: e, size: Number(n) });
                  }
                  if (t.type.startsWith("bytes"))
                    return (function (e, { param: t }) {
                      let [, r] = t.type.split("bytes"),
                        s = (0, n.f)(e);
                      if (!r) {
                        let t = e;
                        return (
                          s % 32 != 0 &&
                            (t = (0, k.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: (0, j.w)([
                              (0, k.n)((0, z.N)(s, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (s !== Number.parseInt(r, 10))
                        throw new l({
                          expectedSize: Number.parseInt(r, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, k.n)(e, { dir: "right" }),
                      };
                    })(r, { param: t });
                  if ("string" === t.type) {
                    var c = r;
                    let e = (0, z.B)(c),
                      t = Math.ceil((0, n.f)(e) / 32),
                      s = [];
                    for (let r = 0; r < t; r++)
                      s.push(
                        (0, k.n)((0, U.M)(e, 32 * r, (r + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: (0, j.w)([
                        (0, k.n)((0, z.N)((0, n.f)(e), { size: 32 })),
                        ...s,
                      ]),
                    };
                  }
                  throw new E(t.type, {
                    docsPath: "/docs/contract/encodeAbiParameters",
                  });
                })({ param: e[o], value: t[o] }),
              );
            return r;
          })({ params: e, values: t }),
        );
        return 0 === r.length ? "0x" : r;
      },
      "t",
      0,
      F,
    ],
    971860,
  );
};
