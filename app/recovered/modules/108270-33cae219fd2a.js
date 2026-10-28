// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617);
  class n extends t.f {
    constructor({ max: e, min: t, signed: n, size: r, value: i }) {
      super(
        `Number "${i}" is not in safe ${r ? `${8 * r}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`,
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
  class i extends t.f {
    constructor(e) {
      super(
        `Hex value "${e}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`,
        { name: "InvalidHexBooleanError" },
      );
    }
  }
  t.f;
  class o extends t.f {
    constructor({ givenSize: e, maxSize: t }) {
      super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, {
        name: "SizeOverflowError",
      });
    }
  }
  e.s(["d", 0, n, "C", 0, r, "l", 0, i, "j", 0, o]);
};
