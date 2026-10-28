// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class r extends t.f {
    constructor({ offset: e, position: t, size: r }) {
      super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset "${e}" is out-of-bounds (size: ${r}).`,
        { name: "SliceOffsetOutOfBoundsError" },
      );
    }
  }
  class n extends t.f {
    constructor({ size: e, targetSize: t, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`,
        { name: "SizeExceedsPaddingSizeError" },
      );
    }
  }
  class s extends t.f {
    constructor({ size: e, targetSize: t, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} is expected to be ${t} ${r} long, but is ${e} ${r} long.`,
        { name: "InvalidBytesLengthError" },
      );
    }
  }
  function i(e, { dir: t, size: r = 32 } = {}) {
    if (null === r) return e;
    let s = e.replace("0x", "");
    if (s.length > 2 * r)
      throw new n({
        size: Math.ceil(s.length / 2),
        targetSize: r,
        type: "hex",
      });
    return `0x${s["right" === t ? "padEnd" : "padStart"](2 * r, "0")}`;
  }
  (e.s(["i", 0, s, "G", 0, n, "p", 0, r], 213090),
    e.s(
      [
        "g",
        0,
        function (e, { dir: t, size: r = 32 } = {}) {
          return "string" == typeof e
            ? i(e, { dir: t, size: r })
            : (function (e, { dir: t, size: r = 32 } = {}) {
                if (null === r) return e;
                if (e.length > r)
                  throw new n({ size: e.length, targetSize: r, type: "bytes" });
                let s = new Uint8Array(r);
                for (let n = 0; n < r; n++) {
                  let i = "right" === t;
                  s[i ? n : r - n - 1] = e[i ? n : e.length - n - 1];
                }
                return s;
              })(e, { dir: t, size: r });
        },
        "n",
        0,
        i,
      ],
      160642,
    ));
};
