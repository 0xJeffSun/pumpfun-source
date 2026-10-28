// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, { includeName: r = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new A(e.type);
    return `${e.name}(${n(e.inputs, { includeName: r })})`;
  }
  function n(e, { includeName: t = !1 } = {}) {
    return e
      ? e
          .map((e) =>
            (function (e, { includeName: t }) {
              return e.type.startsWith("tuple")
                ? `(${n(e.components, { includeName: t })})${e.type.slice(5)}`
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
      () => o,
      "D",
      () => a,
      "g",
      () => f,
      "S",
      () => c,
      "T",
      () => u,
      "U",
      () => l,
      "A",
      () => d,
      "k",
      () => h,
      "J",
      () => p,
      "V",
      () => g,
      "R",
      () => b,
      "u",
      () => m,
      "$",
      () => y,
      "Y",
      () => x,
      "N",
      () => v,
      "r",
      () => w,
      "M",
      () => $,
      "t",
      () => I,
      "s",
      () => P,
      "l",
      () => B,
      "v",
      () => E,
      "w",
      () => N,
      "d",
      () => A,
      "b",
      () => T,
    ],
    76373,
  ),
    e.s(["r", () => t, "Q", () => n], 515752));
  var r = e.i(612735),
    i = e.i(532617);
  class s extends i.f {
    constructor({ docsPath: e }) {
      super(
        "A constructor was not found on the ABI.\nMake sure you are using the correct ABI and that the constructor exists on it.",
        { docsPath: e, name: "AbiConstructorNotFoundError" },
      );
    }
  }
  class o extends i.f {
    constructor({ docsPath: e }) {
      super(
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.\nMake sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        { docsPath: e, name: "AbiConstructorParamsNotFoundError" },
      );
    }
  }
  i.f;
  class a extends i.f {
    constructor({ data: e, params: t, size: r }) {
      (super(`Data size of ${r} bytes is too small for given parameters.`, {
        metaMessages: [
          `Params: (${n(t, { includeName: !0 })})`,
          `Data:   ${e} (${r} bytes)`,
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
        (this.size = r));
    }
  }
  class f extends i.f {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  }
  class c extends i.f {
    constructor({ expectedLength: e, givenLength: t, type: n }) {
      super(
        `ABI encoding array length mismatch for type ${n}.
Expected length: ${e}
Given length: ${t}`,
        { name: "AbiEncodingArrayLengthMismatchError" },
      );
    }
  }
  class u extends i.f {
    constructor({ expectedSize: e, value: t }) {
      super(
        `Size of bytes "${t}" (bytes${(0, r.f)(t)}) does not match expected size (bytes${e}).`,
        { name: "AbiEncodingBytesSizeMismatchError" },
      );
    }
  }
  class l extends i.f {
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
  class m extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded event signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiEventSignatureNotFoundError" },
      );
    }
  }
  class g extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Event ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.`,
        { docsPath: t, name: "AbiEventNotFoundError" },
      );
    }
  }
  class y extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Function ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionNotFoundError" },
      );
    }
  }
  class x extends i.f {
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
    constructor(e, n) {
      super("Found ambiguous types in overloaded ABI items.", {
        metaMessages: [
          `\`${e.type}\` in \`${t(e.abiItem)}\`, and`,
          `\`${n.type}\` in \`${t(n.abiItem)}\``,
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
  class I extends i.f {
    constructor({ abiItem: e, data: t, params: r, size: i }) {
      (super(
        `Data size of ${i} bytes is too small for non-indexed event parameters.`,
        {
          metaMessages: [
            `Params: (${n(r, { includeName: !0 })})`,
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
        (this.params = r),
        (this.size = i));
    }
  }
  class P extends i.f {
    constructor({ abiItem: e, param: n }) {
      (super(
        `Expected a topic for indexed event parameter${n.name ? ` "${n.name}"` : ""} on event "${t(e, { includeName: !0 })}".`,
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
  class B extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid decoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiDecodingType" },
      );
    }
  }
  class N extends i.f {
    constructor(e) {
      super(`Value "${e}" is not a valid array.`, {
        name: "InvalidArrayError",
      });
    }
  }
  class A extends i.f {
    constructor(e) {
      super(
        `"${e}" is not a valid definition type.
Valid types: "function", "event", "error"`,
        { name: "InvalidDefinitionTypeError" },
      );
    }
  }
  class T extends i.f {
    constructor(e) {
      super(`Type "${e}" is not supported for packed encoding.`, {
        name: "UnsupportedPackedAbiType",
      });
    }
  }
  var M = e.i(296006),
    _ = e.i(108270),
    z = e.i(4911),
    C = e.i(990149),
    S = e.i(417672),
    k = e.i(989494),
    U = e.i(19648);
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
  function j(e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let { dynamic: i, encoded: s } = e[n];
      i ? (t += 32) : (t += (0, r.f)(s));
    }
    let n = [],
      i = [],
      s = 0;
    for (let o = 0; o < e.length; o++) {
      let { dynamic: a, encoded: f } = e[o];
      a
        ? (n.push((0, U.N)(t + s, { size: 32 })), i.push(f), (s += (0, r.f)(f)))
        : n.push(f);
    }
    return (0, C.w)([...n, ...i]);
  }
  function O(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  e.s(
    [
      "N",
      0,
      function (e, t) {
        if (e.length !== t.length)
          throw new l({ expectedLength: e.length, givenLength: t.length });
        let n = j(
          (function ({ params: e, values: t }) {
            let n = [];
            for (let s = 0; s < e.length; s++)
              n.push(
                (function e({ param: t, value: n }) {
                  let s = O(t.type);
                  if (s) {
                    let [r, i] = s;
                    return (function (t, { length: n, param: r }) {
                      let i = null === n;
                      if (!Array.isArray(t)) throw new N(t);
                      if (!i && t.length !== n)
                        throw new c({
                          expectedLength: n,
                          givenLength: t.length,
                          type: `${r.type}[${n}]`,
                        });
                      let s = !1,
                        o = [];
                      for (let n = 0; n < t.length; n++) {
                        let i = e({ param: r, value: t[n] });
                        (i.dynamic && (s = !0), o.push(i));
                      }
                      if (i || s) {
                        let e = j(o);
                        if (i) {
                          let t = (0, U.N)(o.length, { size: 32 });
                          return {
                            dynamic: !0,
                            encoded: o.length > 0 ? (0, C.w)([t, e]) : t,
                          };
                        }
                        if (s) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, C.w)(o.map(({ encoded: e }) => e)),
                      };
                    })(n, { length: r, param: { ...t, type: i } });
                  }
                  if ("tuple" === t.type)
                    return (function (t, { param: n }) {
                      let r = !1,
                        i = [];
                      for (let s = 0; s < n.components.length; s++) {
                        let o = n.components[s],
                          a = Array.isArray(t) ? s : o.name,
                          f = e({ param: o, value: t[a] });
                        (i.push(f), f.dynamic && (r = !0));
                      }
                      return {
                        dynamic: r,
                        encoded: r
                          ? j(i)
                          : (0, C.w)(i.map(({ encoded: e }) => e)),
                      };
                    })(n, { param: t });
                  if ("address" === t.type) {
                    var o = n;
                    if (!(0, z.f)(o)) throw new M.f({ address: o });
                    return { dynamic: !1, encoded: (0, S.n)(o.toLowerCase()) };
                  }
                  if ("bool" === t.type) {
                    var a = n;
                    if ("boolean" != typeof a)
                      throw new i.f(
                        `Invalid boolean value: "${a}" (type: ${typeof a}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, S.n)((0, U.V)(a)) };
                  }
                  if (t.type.startsWith("uint") || t.type.startsWith("int")) {
                    let e = t.type.startsWith("int"),
                      [, , r = "256"] = F.exec(t.type) ?? [];
                    return (function (e, { signed: t, size: n = 256 }) {
                      if ("number" == typeof n) {
                        let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
                          i = t ? -r - 1n : 0n;
                        if (e > r || e < i)
                          throw new _.d({
                            max: r.toString(),
                            min: i.toString(),
                            signed: t,
                            size: n / 8,
                            value: e.toString(),
                          });
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, U.N)(e, { size: 32, signed: t }),
                      };
                    })(n, { signed: e, size: Number(r) });
                  }
                  if (t.type.startsWith("bytes"))
                    return (function (e, { param: t }) {
                      let [, n] = t.type.split("bytes"),
                        i = (0, r.f)(e);
                      if (!n) {
                        let t = e;
                        return (
                          i % 32 != 0 &&
                            (t = (0, S.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: (0, C.w)([
                              (0, S.n)((0, U.N)(i, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (i !== Number.parseInt(n, 10))
                        throw new u({
                          expectedSize: Number.parseInt(n, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, S.n)(e, { dir: "right" }),
                      };
                    })(n, { param: t });
                  if ("string" === t.type) {
                    var f = n;
                    let e = (0, U.B)(f),
                      t = Math.ceil((0, r.f)(e) / 32),
                      i = [];
                    for (let n = 0; n < t; n++)
                      i.push(
                        (0, S.n)((0, k.M)(e, 32 * n, (n + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: (0, C.w)([
                        (0, S.n)((0, U.N)((0, r.f)(e), { size: 32 })),
                        ...i,
                      ]),
                    };
                  }
                  throw new E(t.type, {
                    docsPath: "/docs/contract/encodeAbiParameters",
                  });
                })({ param: e[s], value: t[s] }),
              );
            return n;
          })({ params: e, values: t }),
        );
        return 0 === n.length ? "0x" : n;
      },
      "t",
      0,
      O,
    ],
    971860,
  );
};
