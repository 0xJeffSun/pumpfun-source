// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class r extends t.f {
    constructor({ max: e, min: t, signed: r, size: n, value: s }) {
      super(
        `Number "${s}" is not in safe ${n ? `${8 * n}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`,
        { name: "IntegerOutOfRangeError" },
      );
    }
  }
  class n extends t.f {
    constructor(e) {
      super(
        `Bytes value "${e}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" },
      );
    }
  }
  class s extends t.f {
    constructor(e) {
      super(
        `Hex value "${e}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`,
        { name: "InvalidHexBooleanError" },
      );
    }
  }
  (t.f, t.f, t.f, t.f);
  class i extends t.f {
    constructor({ givenSize: e, maxSize: t }) {
      super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, {
        name: "SizeOverflowError",
      });
    }
  }
  e.s(["d", 0, r, "C", 0, n, "l", 0, s, "j", 0, i]);
};
