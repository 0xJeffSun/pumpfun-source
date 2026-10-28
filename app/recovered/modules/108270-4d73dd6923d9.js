// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(532617);
  class n extends e.f {
    constructor({ max: t, min: e, signed: n, size: i, value: s }) {
      super(
        `Number "${s}" is not in safe ${i ? `${8 * i}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${e} to ${t})` : `(above ${e})`}`,
        { name: "IntegerOutOfRangeError" },
      );
    }
  }
  class i extends e.f {
    constructor(t) {
      super(
        `Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" },
      );
    }
  }
  class s extends e.f {
    constructor(t) {
      super(
        `Hex value "${t}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`,
        { name: "InvalidHexBooleanError" },
      );
    }
  }
  e.f;
  class r extends e.f {
    constructor({ givenSize: t, maxSize: e }) {
      super(`Size cannot exceed ${e} bytes. Given size: ${t} bytes.`, {
        name: "SizeOverflowError",
      });
    }
  }
  t.s(["d", 0, n, "C", 0, i, "l", 0, s, "j", 0, r]);
};
