// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, { includeName: r = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new T(e.type);
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
      () => a,
      "B",
      () => s,
      "D",
      () => o,
      "g",
      () => f,
      "S",
      () => c,
      "T",
      () => u,
      "U",
      () => d,
      "A",
      () => b,
      "k",
      () => l,
      "J",
      () => p,
      "V",
      () => y,
      "R",
      () => h,
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
      () => $,
      "t",
      () => P,
      "s",
      () => E,
      "l",
      () => A,
      "v",
      () => M,
      "w",
      () => O,
      "d",
      () => T,
    ],
    641802,
  ),
    e.s(["r", () => t, "Q", () => n], 730755));
  var r = e.i(415415),
    i = e.i(927974);
  class a extends i.f {
    constructor({ docsPath: e }) {
      super(
        "A constructor was not found on the ABI.\nMake sure you are using the correct ABI and that the constructor exists on it.",
        { docsPath: e, name: "AbiConstructorNotFoundError" },
      );
    }
  }
  class s extends i.f {
    constructor({ docsPath: e }) {
      super(
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.\nMake sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
        { docsPath: e, name: "AbiConstructorParamsNotFoundError" },
      );
    }
  }
  i.f;
  class o extends i.f {
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
    constructor({ cause: e } = {}) {
      super('Cannot decode zero data ("0x") with ABI parameters.', {
        name: "AbiDecodingZeroDataError",
        cause: e,
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
  class d extends i.f {
    constructor({ expectedLength: e, givenLength: t }) {
      super(
        `ABI encoding params/values length mismatch.
Expected length (params): ${e}
Given length (values): ${t}`,
        { name: "AbiEncodingLengthMismatchError" },
      );
    }
  }
  class b extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Arguments (\`args\`) were provided to "${e}", but "${e}" on the ABI does not contain any parameters (\`inputs\`).
Cannot encode error result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the inputs exist on it.`,
        { docsPath: t, name: "AbiErrorInputsNotFoundError" },
      );
    }
  }
  class l extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Error ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.`,
        { docsPath: t, name: "AbiErrorNotFoundError" },
      );
    }
  }
  class p extends i.f {
    constructor(e, { docsPath: t, cause: n }) {
      (super(
        `Encoded error signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the error exists on it.
You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${e}.`,
        { docsPath: t, name: "AbiErrorSignatureNotFoundError", cause: n },
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
  class h extends i.f {
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
You can look up the signature here: https://4byte.sourcify.dev/?q=${e}.`,
        { docsPath: t, name: "AbiEventSignatureNotFoundError" },
      );
    }
  }
  class y extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Event ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the event exists on it.`,
        { docsPath: t, name: "AbiEventNotFoundError" },
      );
    }
  }
  class g extends i.f {
    constructor(e, { docsPath: t } = {}) {
      super(
        `Function ${e ? `"${e}" ` : ""}not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionNotFoundError" },
      );
    }
  }
  class v extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Function "${e}" does not contain any \`outputs\` on ABI.
Cannot decode function result without knowing what the parameter types are.
Make sure you are using the correct ABI and that the function exists on it.`,
        { docsPath: t, name: "AbiFunctionOutputsNotFoundError" },
      );
    }
  }
  class w extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Encoded function signature "${e}" not found on ABI.
Make sure you are using the correct ABI and that the function exists on it.
You can look up the signature here: https://4byte.sourcify.dev/?q=${e}.`,
        { docsPath: t, name: "AbiFunctionSignatureNotFoundError" },
      );
    }
  }
  class x extends i.f {
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
  class P extends i.f {
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
  class E extends i.f {
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
  class M extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid encoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiEncodingType" },
      );
    }
  }
  class A extends i.f {
    constructor(e, { docsPath: t }) {
      super(
        `Type "${e}" is not a valid decoding type.
Please provide a valid ABI type.`,
        { docsPath: t, name: "InvalidAbiDecodingType" },
      );
    }
  }
  class O extends i.f {
    constructor(e) {
      super(`Value "${e}" is not a valid array.`, {
        name: "InvalidArrayError",
      });
    }
  }
  class T extends i.f {
    constructor(e) {
      super(
        `"${e}" is not a valid definition type.
Valid types: "function", "event", "error"`,
        { name: "InvalidDefinitionTypeError" },
      );
    }
  }
  i.f;
};
