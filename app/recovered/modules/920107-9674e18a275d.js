// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(548801);
  class n extends t.f {
    constructor({ offset: e, position: t, size: n }) {
      super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset "${e}" is out-of-bounds (size: ${n}).`,
        { name: "SliceOffsetOutOfBoundsError" },
      );
    }
  }
  class r extends t.f {
    constructor({ size: e, targetSize: t, type: n }) {
      super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`,
        { name: "SizeExceedsPaddingSizeError" },
      );
    }
  }
  class a extends t.f {
    constructor({ size: e, targetSize: t, type: n }) {
      super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} is expected to be ${t} ${n} long, but is ${e} ${n} long.`,
        { name: "InvalidBytesLengthError" },
      );
    }
  }
  e.s(["i", 0, a, "G", 0, r, "p", 0, n]);
};
