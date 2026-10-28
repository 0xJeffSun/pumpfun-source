// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class a extends t.f {
    constructor({ max: e, min: t, signed: a, size: r, value: n }) {
      super(
        `Number "${n}" is not in safe ${r ? `${8 * r}-bit ${a ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`,
        { name: "IntegerOutOfRangeError" },
      );
    }
  }
  class r extends t.f {
    constructor(e) {
      super(
        `Bytes value "${e}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" },
      );
    }
  }
  class n extends t.f {
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
  e.s(["d", 0, a, "C", 0, r, "l", 0, n, "j", 0, i]);
};
