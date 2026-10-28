// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, { includeName: i = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new z(e.type);
    return `${e.name}(${n(e.inputs, { includeName: i })})`;
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
      () => u,
      "S",
      () => c,
      "T",
      () => l,
      "U",
      () => d,
      "A",
      () => p,
      "k",
      () => h,
      "J",
      () => f,
      "V",
      () => g,
      "R",
      () => y,
      "u",
      () => m,
      "$",
      () => b,
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
      () => P,
      "w",
      () => E,
      "d",
      () => z,
      "b",
      () => N,
    ],
    76373,
  ),
    e.s(["r", () => t, "Q", () => n], 515752));
  var i = e.i(612735),
    r = e.i(532617);
  class s extends r.f {
    constructor({ docsPath: e }) {
      super(
        "A constructor was not found on the ABI.\nMake sure you are using the correct ABI and that the constructor exists on it.",
        { docsPath: e, name: "AbiConstructorNotFoundError" },
      );
    }
  }
  class o extends r.f {
    constructor({ docsPath: e }) {
      super(
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.\nMake sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        { docsPath: e, name: "AbiConstructorParamsNotFoundError" },
      );
    }
  }
  r.f;
  class a extends r.f {
    constructor({ data: e, params: t, size: i }) {
      (super(`Data size of ${i} bytes is too small for given parameters.`, {
        metaMessages: [
          `Params: (${n(t, { includeName: !0 })})`,
          `Data:   ${e} (${i} bytes)`,
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
        (this.size = i));
    }
  }
  class u extends r.f {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
      });
    }
  }
  class c extends r.f {
    constructor({ expectedLength: e, givenLength: t, type: n }) {
      super(
        `ABI encoding array length mismatch for type ${n}.
Expected length: ${e}
Given length: ${t}`,
        { name: "AbiEncodingArrayLengthMismatchError" },
      );
    }
  }
  class l extends r.f {
    constructor({ expectedSize: e, value: t }) {
      super(
        `Size of bytes "${t}" (bytes${(0, i.f)(t)}) does not match expected size (bytes${e}).`,
        { name: "AbiEncodingBytesSizeMismatchError" },
      );
    }
  }
  class d extends r.f {
    constructor({ expectedLength: e, givenLength: t }) {
      super(
        `ABI encoding params/values length mismatch.
Expected length (params): ${e}
Given length (values): ${t}`,
        { name: "AbiEncodingLengthMismatchError" },
      );
    }
  }
  class p extends r.f {
    constructor(e, { docsPath: t }) {
      super(
        `Arguments (\`args\`) were provided to "${e}", but "${e}" on the ABI does not contain any parameters (\`inputs\`).
Cannot encode error result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the inputs exist on it.`,
        { docsPath: t, name: "AbiErrorInputsNotFoundError" },
      );
    }
  }
  class h extends r.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Error ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.`,
        { docsPath: t, name: "AbiErrorNotFoundError" },
      );
    }
  }
  class f extends r.f {
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
  class y extends r.f {
    constructor({ docsPath: e }) {
      super("Cannot extract event signature from empty topics.", {
        docsPath: e,
        name: "AbiEventSignatureEmptyTopicsError",
      });
    }
  }
  class m extends r.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded event signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiEventSignatureNotFoundError" },
      );
    }
  }
  class g extends r.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Event ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.`,
        { docsPath: t, name: "AbiEventNotFoundError" },
      );
    }
  }
  class b extends r.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Function ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionNotFoundError" },
      );
    }
  }
  class v extends r.f {
    constructor(e, { docsPath: t }) {
      super(
        `Function "${e}" does not contain any \`outputs\` on ABI.
Cannot decode function result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionOutputsNotFoundError" },
      );
    }
  }
  class w extends r.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded function signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.
You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
        { docsPath: t, name: "AbiFunctionSignatureNotFoundError" },
      );
    }
  }
  class x extends r.f {
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
  class $ extends r.f {
    constructor({ expectedSize: e, givenSize: t }) {
      super(`Expected bytes${e}, got bytes${t}.`, {
        name: "BytesSizeMismatchError",
      });
    }
  }
  class A extends r.f {
    constructor({ abiItem: e, data: t, params: i, size: r }) {
      (super(
        `Data size of ${r} bytes is too small for non-indexed event parameters.`,
        {
          metaMessages: [
            `Params: (${n(i, { includeName: !0 })})`,
            `Data:   ${t} (${r} bytes)`,
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
        (this.params = i),
        (this.size = r));
    }
  }
  class I extends r.f {
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
  class P extends r.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid encoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiEncodingType" },
      );
    }
  }
  class B extends r.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid decoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiDecodingType" },
      );
    }
  }
  class E extends r.f {
    constructor(e) {
      super(`Value "${e}" is not a valid array.`, {
        name: "InvalidArrayError",
      });
    }
  }
  class z extends r.f {
    constructor(e) {
      super(
        `"${e}" is not a valid definition type.
Valid types: "function", "event", "error"`,
        { name: "InvalidDefinitionTypeError" },
      );
    }
  }
  class N extends r.f {
    constructor(e) {
      super(`Type "${e}" is not supported for packed encoding.`, {
        name: "UnsupportedPackedAbiType",
      });
    }
  }
  var C = e.i(296006),
    U = e.i(108270),
    M = e.i(4911),
    k = e.i(990149),
    S = e.i(417672),
    R = e.i(989494),
    O = e.i(19648);
  let L =
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
      L,
    ],
    308286,
  );
  function D(e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      let { dynamic: r, encoded: s } = e[n];
      r ? (t += 32) : (t += (0, i.f)(s));
    }
    let n = [],
      r = [],
      s = 0;
    for (let o = 0; o < e.length; o++) {
      let { dynamic: a, encoded: u } = e[o];
      a
        ? (n.push((0, O.N)(t + s, { size: 32 })), r.push(u), (s += (0, i.f)(u)))
        : n.push(u);
    }
    return (0, k.w)([...n, ...r]);
  }
  function T(e) {
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
        let n = D(
          (function ({ params: e, values: t }) {
            let n = [];
            for (let s = 0; s < e.length; s++)
              n.push(
                (function e({ param: t, value: n }) {
                  let s = T(t.type);
                  if (s) {
                    let [i, r] = s;
                    return (function (t, { length: n, param: i }) {
                      let r = null === n;
                      if (!Array.isArray(t)) throw new E(t);
                      if (!r && t.length !== n)
                        throw new c({
                          expectedLength: n,
                          givenLength: t.length,
                          type: `${i.type}[${n}]`,
                        });
                      let s = !1,
                        o = [];
                      for (let n = 0; n < t.length; n++) {
                        let r = e({ param: i, value: t[n] });
                        (r.dynamic && (s = !0), o.push(r));
                      }
                      if (r || s) {
                        let e = D(o);
                        if (r) {
                          let t = (0, O.N)(o.length, { size: 32 });
                          return {
                            dynamic: !0,
                            encoded: o.length > 0 ? (0, k.w)([t, e]) : t,
                          };
                        }
                        if (s) return { dynamic: !0, encoded: e };
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, k.w)(o.map(({ encoded: e }) => e)),
                      };
                    })(n, { length: i, param: { ...t, type: r } });
                  }
                  if ("tuple" === t.type)
                    return (function (t, { param: n }) {
                      let i = !1,
                        r = [];
                      for (let s = 0; s < n.components.length; s++) {
                        let o = n.components[s],
                          a = Array.isArray(t) ? s : o.name,
                          u = e({ param: o, value: t[a] });
                        (r.push(u), u.dynamic && (i = !0));
                      }
                      return {
                        dynamic: i,
                        encoded: i
                          ? D(r)
                          : (0, k.w)(r.map(({ encoded: e }) => e)),
                      };
                    })(n, { param: t });
                  if ("address" === t.type) {
                    var o = n;
                    if (!(0, M.f)(o)) throw new C.f({ address: o });
                    return { dynamic: !1, encoded: (0, S.n)(o.toLowerCase()) };
                  }
                  if ("bool" === t.type) {
                    var a = n;
                    if ("boolean" != typeof a)
                      throw new r.f(
                        `Invalid boolean value: "${a}" (type: ${typeof a}). Expected: \`true\` or \`false\`.`,
                      );
                    return { dynamic: !1, encoded: (0, S.n)((0, O.V)(a)) };
                  }
                  if (t.type.startsWith("uint") || t.type.startsWith("int")) {
                    let e = t.type.startsWith("int"),
                      [, , i = "256"] = L.exec(t.type) ?? [];
                    return (function (e, { signed: t, size: n = 256 }) {
                      if ("number" == typeof n) {
                        let i = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
                          r = t ? -i - 1n : 0n;
                        if (e > i || e < r)
                          throw new U.d({
                            max: i.toString(),
                            min: r.toString(),
                            signed: t,
                            size: n / 8,
                            value: e.toString(),
                          });
                      }
                      return {
                        dynamic: !1,
                        encoded: (0, O.N)(e, { size: 32, signed: t }),
                      };
                    })(n, { signed: e, size: Number(i) });
                  }
                  if (t.type.startsWith("bytes"))
                    return (function (e, { param: t }) {
                      let [, n] = t.type.split("bytes"),
                        r = (0, i.f)(e);
                      if (!n) {
                        let t = e;
                        return (
                          r % 32 != 0 &&
                            (t = (0, S.n)(t, {
                              dir: "right",
                              size: 32 * Math.ceil((e.length - 2) / 2 / 32),
                            })),
                          {
                            dynamic: !0,
                            encoded: (0, k.w)([
                              (0, S.n)((0, O.N)(r, { size: 32 })),
                              t,
                            ]),
                          }
                        );
                      }
                      if (r !== Number.parseInt(n, 10))
                        throw new l({
                          expectedSize: Number.parseInt(n, 10),
                          value: e,
                        });
                      return {
                        dynamic: !1,
                        encoded: (0, S.n)(e, { dir: "right" }),
                      };
                    })(n, { param: t });
                  if ("string" === t.type) {
                    var u = n;
                    let e = (0, O.B)(u),
                      t = Math.ceil((0, i.f)(e) / 32),
                      r = [];
                    for (let n = 0; n < t; n++)
                      r.push(
                        (0, S.n)((0, R.M)(e, 32 * n, (n + 1) * 32), {
                          dir: "right",
                        }),
                      );
                    return {
                      dynamic: !0,
                      encoded: (0, k.w)([
                        (0, S.n)((0, O.N)((0, i.f)(e), { size: 32 })),
                        ...r,
                      ]),
                    };
                  }
                  throw new P(t.type, {
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
      T,
    ],
    971860,
  );
};
