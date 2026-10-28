// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, { includeName: n = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new P(e.type);
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
      () => s,
      "B",
      () => a,
      "D",
      () => o,
      "g",
      () => u,
      "S",
      () => c,
      "T",
      () => l,
      "U",
      () => f,
      "A",
      () => d,
      "k",
      () => h,
      "J",
      () => p,
      "V",
      () => m,
      "R",
      () => b,
      "u",
      () => y,
      "$",
      () => x,
      "Y",
      () => g,
      "N",
      () => v,
      "r",
      () => w,
      "M",
      () => $,
      "t",
      () => A,
      "s",
      () => I,
      "l",
      () => M,
      "v",
      () => E,
      "w",
      () => B,
      "d",
      () => P,
      "b",
      () => O,
    ],
    76373,
  ),
    e.s(["r", () => t, "Q", () => r], 515752));
  var n = e.i(612735),
    i = e.i(532617);
  class s extends i.f {
    constructor({ docsPath: e }) {
      super(
        "A constructor was not found on the ABI.\nMake sure you are using the correct ABI and that the constructor exists on it.",
        { docsPath: e, name: "AbiConstructorNotFoundError" },
      );
    }
  }
  class a extends i.f {
    constructor({ docsPath: e }) {
      super(
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.\nMake sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        { docsPath: e, name: "AbiConstructorParamsNotFoundError" },
      );
    }
  }
  i.f;
  class o extends i.f {
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
  class u extends i.f {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  }
  class c extends i.f {
    constructor({ expectedLength: e, givenLength: t, type: r }) {
      super(
        `ABI encoding array length mismatch for type ${r}.
Expected length: ${e}
Given length: ${t}`,
        { name: "AbiEncodingArrayLengthMismatchError" },
      );
    }
  }
  class l extends i.f {
    constructor({ expectedSize: e, value: t }) {
      super(
        `Size of bytes "${t}" (bytes${(0, n.f)(t)}) does not match expected size (bytes${e}).`,
        { name: "AbiEncodingBytesSizeMismatchError" },
      );
    }
  }
  class f extends i.f {
    constructor({ expectedLength: e, givenLength: t }) {
      super(
        `ABI encoding params/values length mismatch.
Expected length (params): ${e}
Given length (values): ${t}`,
        { name: "AbiEncodingLengthMismatchError" },
      );
    }
  }
  class d extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Arguments (\`args\`) were provided to "${e}", but "${e}" on the ABI does not contain any parameters (\`inputs\`).
Cannot encode error result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the inputs exist on it.`,
        { docsPath: t, name: "AbiErrorInputsNotFoundError" },
      );
    }
  }
  class h extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Error ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.`,
        { docsPath: t, name: "AbiErrorNotFoundError" },
      );
    }
  }
  class p extends i.f {
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
  class b extends i.f {
    constructor({ docsPath: e }) {
      super("Cannot extract event signature from empty topics.", {
        docsPath: e,
        name: "AbiEventSignatureEmptyTopicsError",
      });
    }
  }
  class y extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded event signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiEventSignatureNotFoundError" },
      );
    }
  }
  class m extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Event ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.`,
        { docsPath: t, name: "AbiEventNotFoundError" },
      );
    }
  }
  class x extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Function ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionNotFoundError" },
      );
    }
  }
  class g extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Function "${e}" does not contain any \`outputs\` on ABI.
Cannot decode function result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionOutputsNotFoundError" },
      );
    }
  }
  class v extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded function signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiFunctionSignatureNotFoundError" },
      );
    }
  }
  class w extends i.f {
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
  class $ extends i.f {
    constructor({ expectedSize: e, givenSize: t }) {
      super(`Expected bytes${e}, got bytes${t}.`, {
        name: "BytesSizeMismatchError",
      });
    }
  }
  class A extends i.f {
    constructor({ abiItem: e, data: t, params: n, size: i }) {
      (super(
        `Data size of ${i} bytes is too small for non-indexed event parameters.`,
        {
          metaMessages: [
            `Params: (${r(n, { includeName: !0 })})`,
            `Data:   ${t} (${i} bytes)`,
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
        (this.size = i));
    }
  }
  class I extends i.f {
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
  class E extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid encoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiEncodingType" },
      );
    }
  }
  class M extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid decoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiDecodingType" },
      );
    }
  }
  class B extends i.f {
    constructor(e) {
      super(`Value "${e}" is not a valid array.`, {
        name: "InvalidArrayError",
      });
    }
  }
  class P extends i.f {
    constructor(e) {
      super(
        `"${e}" is not a valid definition type.
Valid types: "function", "event", "error"`,
        { name: "InvalidDefinitionTypeError" },
      );
    }
  }
  class O extends i.f {
    constructor(e) {
      super(`Type "${e}" is not supported for packed encoding.`, {
        name: "UnsupportedPackedAbiType",
      });
    }
  }
  var S = e.i(296006),
    k = e.i(108270),
    U = e.i(4911),
    N = e.i(990149),
    z = e.i(417672),
    j = e.i(989494),
    D = e.i(19648);
  let F =
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
      F,
    ],
    308286,
  );
  function H(e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let { dynamic: i, encoded: s } = e[r];
      i ? (t += 32) : (t += (0, n.f)(s));
    }
    let r = [],
      i = [],
      s = 0;
    for (let a = 0; a < e.length; a++) {
      let { dynamic: o, encoded: u } = e[a];
      o
        ? (r.push((0, D.N)(t + s, { size: 32 })), i.push(u), (s += (0, n.f)(u)))
        : r.push(u);
    }
    return (0, N.w)([...r, ...i]);
  }
  function C(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  e.s(
    [
      "N",
      0,
      function (e, t) {
        if (e.length !== t.length)
          throw new f({ expectedLength: e.length, givenLength: t.length });
        let r = H(
          (function ({ params: e, values: t }) {
            let r = [];
            for (let s = 0; s < e.length; s++)
              r.push(
                (function e({ param: t, value: r }) {
                  let s = C(t.type);
                  if (s) {
                    let [n, i] = s;
                    return (function (t, { length: r, param: n }) {
                      let i = null === r;
                      if (!Array.isArray(t)) throw new B(t);
                      if (!i && t.length !== r)
                        throw new c({
                          expectedLength: r,
                          givenLength: t.length,
                          type: `${n.type}[${r}]`,
                        });
                      let s = !1,
                        a = [];
                      for (let r = 0; r < t.length; r++) {
                        let i = e({ param: n, value: t[r] });
                        (i.dynamic && (s = !0), a.push(i));
                      }
                      if (i || s) {
                        let e = H(a);
                        if (i) {
                          let t = (0, D.N)(a.length, { size: 32 });
                          return {
                            dynamic: !0,
                            encoded: a.length > 0 ? (0, N.w)([t, e]) : t,
                          };
                        }
                        if (s) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, N.w)(a.map(({ encoded: e }) => e)),
                      };
                    })(r, { length: n, param: { ...t, type: i } });
                  }
                  if ("tuple" === t.type)
                    return (function (t, { param: r }) {
                      let n = !1,
                        i = [];
                      for (let s = 0; s < r.components.length; s++) {
                        let a = r.components[s],
                          o = Array.isArray(t) ? s : a.name,
                          u = e({ param: a, value: t[o] });
                        (i.push(u), u.dynamic && (n = !0));
                      }
                      return {
                        dynamic: n,
                        encoded: n
                          ? H(i)
                          : (0, N.w)(i.map(({ encoded: e }) => e)),
                      };
                    })(r, { param: t });
                  if ("address" === t.type) {
                    var a = r;
                    if (!(0, U.f)(a)) throw new S.f({ address: a });
                    return { dynamic: !1, encoded: (0, z.n)(a.toLowerCase()) };
                  }
                  if ("bool" === t.type) {
                    var o = r;
                    if ("boolean" != typeof o)
                      throw new i.f(
                        `Invalid boolean value: "${o}" (type: ${typeof o}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, z.n)((0, D.V)(o)) };
                  }
                  if (t.type.startsWith("uint") || t.type.startsWith("int")) {
                    let e = t.type.startsWith("int"),
                      [, , n = "256"] = F.exec(t.type) ?? [];
                    return (function (e, { signed: t, size: r = 256 }) {
                      if ("number" == typeof r) {
                        let n = 2n ** (BigInt(r) - (t ? 1n : 0n)) - 1n,
                          i = t ? -n - 1n : 0n;
                        if (e > n || e < i)
                          throw new k.d({
                            max: n.toString(),
                            min: i.toString(),
                            signed: t,
                            size: r / 8,
                            value: e.toString(),
                          });
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, D.N)(e, { size: 32, signed: t }),
                      };
                    })(r, { signed: e, size: Number(n) });
                  }
                  if (t.type.startsWith("bytes"))
                    return (function (e, { param: t }) {
                      let [, r] = t.type.split("bytes"),
                        i = (0, n.f)(e);
                      if (!r) {
                        let t = e;
                        return (
                          i % 32 != 0 &&
                            (t = (0, z.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: (0, N.w)([
                              (0, z.n)((0, D.N)(i, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (i !== Number.parseInt(r, 10))
                        throw new l({
                          expectedSize: Number.parseInt(r, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, z.n)(e, { dir: "right" }),
                      };
                    })(r, { param: t });
                  if ("string" === t.type) {
                    var u = r;
                    let e = (0, D.B)(u),
                      t = Math.ceil((0, n.f)(e) / 32),
                      i = [];
                    for (let r = 0; r < t; r++)
                      i.push(
                        (0, z.n)((0, j.M)(e, 32 * r, (r + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: (0, N.w)([
                        (0, z.n)((0, D.N)((0, n.f)(e), { size: 32 })),
                        ...i,
                      ]),
                    };
                  }
                  throw new E(t.type, {
                    docsPath: "/docs/contract/encodeAbiParameters",
                  });
                })({ param: e[s], value: t[s] }),
              );
            return r;
          })({ params: e, values: t }),
        );
        return 0 === r.length ? "0x" : r;
      },
      "t",
      0,
      C,
    ],
    971860,
  );
};
