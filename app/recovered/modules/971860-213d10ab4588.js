// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, { includeName: r = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new P(e.type);
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
      () => i,
      "B",
      () => a,
      "D",
      () => o,
      "g",
      () => u,
      "S",
      () => p,
      "T",
      () => y,
      "U",
      () => c,
      "A",
      () => d,
      "k",
      () => l,
      "J",
      () => m,
      "V",
      () => b,
      "R",
      () => f,
      "u",
      () => h,
      "$",
      () => g,
      "Y",
      () => v,
      "N",
      () => w,
      "r",
      () => x,
      "M",
      () => $,
      "t",
      () => A,
      "s",
      () => I,
      "l",
      () => B,
      "v",
      () => E,
      "w",
      () => M,
      "d",
      () => P,
      "b",
      () => N,
    ],
    76373,
  ),
    e.s(["r", () => t, "Q", () => n], 515752));
  var r = e.i(612735),
    s = e.i(532617);
  class i extends s.f {
    constructor({ docsPath: e }) {
      super(
        "A constructor was not found on the ABI.\nMake sure you are using the correct ABI and that the constructor exists on it.",
        { docsPath: e, name: "AbiConstructorNotFoundError" },
      );
    }
  }
  class a extends s.f {
    constructor({ docsPath: e }) {
      super(
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.\nMake sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        { docsPath: e, name: "AbiConstructorParamsNotFoundError" },
      );
    }
  }
  s.f;
  class o extends s.f {
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
  class u extends s.f {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  }
  class p extends s.f {
    constructor({ expectedLength: e, givenLength: t, type: n }) {
      super(
        `ABI encoding array length mismatch for type ${n}.
Expected length: ${e}
Given length: ${t}`,
        { name: "AbiEncodingArrayLengthMismatchError" },
      );
    }
  }
  class y extends s.f {
    constructor({ expectedSize: e, value: t }) {
      super(
        `Size of bytes "${t}" (bytes${(0, r.f)(t)}) does not match expected size (bytes${e}).`,
        { name: "AbiEncodingBytesSizeMismatchError" },
      );
    }
  }
  class c extends s.f {
    constructor({ expectedLength: e, givenLength: t }) {
      super(
        `ABI encoding params/values length mismatch.
Expected length (params): ${e}
Given length (values): ${t}`,
        { name: "AbiEncodingLengthMismatchError" },
      );
    }
  }
  class d extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Arguments (\`args\`) were provided to "${e}", but "${e}" on the ABI does not contain any parameters (\`inputs\`).
Cannot encode error result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the inputs exist on it.`,
        { docsPath: t, name: "AbiErrorInputsNotFoundError" },
      );
    }
  }
  class l extends s.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Error ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.`,
        { docsPath: t, name: "AbiErrorNotFoundError" },
      );
    }
  }
  class m extends s.f {
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
  class f extends s.f {
    constructor({ docsPath: e }) {
      super("Cannot extract event signature from empty topics.", {
        docsPath: e,
        name: "AbiEventSignatureEmptyTopicsError",
      });
    }
  }
  class h extends s.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded event signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiEventSignatureNotFoundError" },
      );
    }
  }
  class b extends s.f {
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
  class $ extends s.f {
    constructor({ expectedSize: e, givenSize: t }) {
      super(`Expected bytes${e}, got bytes${t}.`, {
        name: "BytesSizeMismatchError",
      });
    }
  }
  class A extends s.f {
    constructor({ abiItem: e, data: t, params: r, size: s }) {
      (super(
        `Data size of ${s} bytes is too small for non-indexed event parameters.`,
        {
          metaMessages: [
            `Params: (${n(r, { includeName: !0 })})`,
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
        (this.params = r),
        (this.size = s));
    }
  }
  class I extends s.f {
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
  class M extends s.f {
    constructor(e) {
      super(`Value "${e}" is not a valid array.`, {
        name: "InvalidArrayError",
      });
    }
  }
  class P extends s.f {
    constructor(e) {
      super(
        `"${e}" is not a valid definition type.
Valid types: "function", "event", "error"`,
        { name: "InvalidDefinitionTypeError" },
      );
    }
  }
  class N extends s.f {
    constructor(e) {
      super(`Type "${e}" is not supported for packed encoding.`, {
        name: "UnsupportedPackedAbiType",
      });
    }
  }
  var z = e.i(296006),
    S = e.i(108270),
    D = e.i(4911),
    T = e.i(990149),
    k = e.i(417672),
    F = e.i(989494),
    O = e.i(19648);
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
  function j(e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let { dynamic: s, encoded: i } = e[n];
      s ? (t += 32) : (t += (0, r.f)(i));
    }
    let n = [],
      s = [],
      i = 0;
    for (let a = 0; a < e.length; a++) {
      let { dynamic: o, encoded: u } = e[a];
      o
        ? (n.push((0, O.N)(t + i, { size: 32 })), s.push(u), (i += (0, r.f)(u)))
        : n.push(u);
    }
    return (0, T.w)([...n, ...s]);
  }
  function W(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  e.s(
    [
      "N",
      0,
      function (e, t) {
        if (e.length !== t.length)
          throw new c({ expectedLength: e.length, givenLength: t.length });
        let n = j(
          (function ({ params: e, values: t }) {
            let n = [];
            for (let i = 0; i < e.length; i++)
              n.push(
                (function e({ param: t, value: n }) {
                  let i = W(t.type);
                  if (i) {
                    let [r, s] = i;
                    return (function (t, { length: n, param: r }) {
                      let s = null === n;
                      if (!Array.isArray(t)) throw new M(t);
                      if (!s && t.length !== n)
                        throw new p({
                          expectedLength: n,
                          givenLength: t.length,
                          type: `${r.type}[${n}]`,
                        });
                      let i = !1,
                        a = [];
                      for (let n = 0; n < t.length; n++) {
                        let s = e({ param: r, value: t[n] });
                        (s.dynamic && (i = !0), a.push(s));
                      }
                      if (s || i) {
                        let e = j(a);
                        if (s) {
                          let t = (0, O.N)(a.length, { size: 32 });
                          return {
                            dynamic: !0,
                            encoded: a.length > 0 ? (0, T.w)([t, e]) : t,
                          };
                        }
                        if (i) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, T.w)(a.map(({ encoded: e }) => e)),
                      };
                    })(n, { length: r, param: { ...t, type: s } });
                  }
                  if ("tuple" === t.type)
                    return (function (t, { param: n }) {
                      let r = !1,
                        s = [];
                      for (let i = 0; i < n.components.length; i++) {
                        let a = n.components[i],
                          o = Array.isArray(t) ? i : a.name,
                          u = e({ param: a, value: t[o] });
                        (s.push(u), u.dynamic && (r = !0));
                      }
                      return {
                        dynamic: r,
                        encoded: r
                          ? j(s)
                          : (0, T.w)(s.map(({ encoded: e }) => e)),
                      };
                    })(n, { param: t });
                  if ("address" === t.type) {
                    var a = n;
                    if (!(0, D.f)(a)) throw new z.f({ address: a });
                    return { dynamic: !1, encoded: (0, k.n)(a.toLowerCase()) };
                  }
                  if ("bool" === t.type) {
                    var o = n;
                    if ("boolean" != typeof o)
                      throw new s.f(
                        `Invalid boolean value: "${o}" (type: ${typeof o}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, k.n)((0, O.V)(o)) };
                  }
                  if (t.type.startsWith("uint") || t.type.startsWith("int")) {
                    let e = t.type.startsWith("int"),
                      [, , r = "256"] = C.exec(t.type) ?? [];
                    return (function (e, { signed: t, size: n = 256 }) {
                      if ("number" == typeof n) {
                        let r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
                          s = t ? -r - 1n : 0n;
                        if (e > r || e < s)
                          throw new S.d({
                            max: r.toString(),
                            min: s.toString(),
                            signed: t,
                            size: n / 8,
                            value: e.toString(),
                          });
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, O.N)(e, { size: 32, signed: t }),
                      };
                    })(n, { signed: e, size: Number(r) });
                  }
                  if (t.type.startsWith("bytes"))
                    return (function (e, { param: t }) {
                      let [, n] = t.type.split("bytes"),
                        s = (0, r.f)(e);
                      if (!n) {
                        let t = e;
                        return (
                          s % 32 != 0 &&
                            (t = (0, k.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: (0, T.w)([
                              (0, k.n)((0, O.N)(s, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (s !== Number.parseInt(n, 10))
                        throw new y({
                          expectedSize: Number.parseInt(n, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, k.n)(e, { dir: "right" }),
                      };
                    })(n, { param: t });
                  if ("string" === t.type) {
                    var u = n;
                    let e = (0, O.B)(u),
                      t = Math.ceil((0, r.f)(e) / 32),
                      s = [];
                    for (let n = 0; n < t; n++)
                      s.push(
                        (0, k.n)((0, F.M)(e, 32 * n, (n + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: (0, T.w)([
                        (0, k.n)((0, O.N)((0, r.f)(e), { size: 32 })),
                        ...s,
                      ]),
                    };
                  }
                  throw new E(t.type, {
                    docsPath: "/docs/contract/encodeAbiParameters",
                  });
                })({ param: e[i], value: t[i] }),
              );
            return n;
          })({ params: e, values: t }),
        );
        return 0 === n.length ? "0x" : n;
      },
      "t",
      0,
      W,
    ],
    971860,
  );
};
