// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class a extends t.f {
    constructor({ offset: e, position: t, size: a }) {
      super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset "${e}" is out-of-bounds (size: ${a}).`,
        { name: "SliceOffsetOutOfBoundsError" },
      );
    }
  }
  class r extends t.f {
    constructor({ size: e, targetSize: t, type: a }) {
      super(
        `${a.charAt(0).toUpperCase()}${a.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`,
        { name: "SizeExceedsPaddingSizeError" },
      );
    }
  }
  class n extends t.f {
    constructor({ size: e, targetSize: t, type: a }) {
      super(
        `${a.charAt(0).toUpperCase()}${a.slice(1).toLowerCase()} is expected to be ${t} ${a} long, but is ${e} ${a} long.`,
        { name: "InvalidBytesLengthError" },
      );
    }
  }
  function i(e, { dir: t, size: a = 32 } = {}) {
    if (null === a) return e;
    let n = e.replace("0x", "");
    if (n.length > 2 * a)
      throw new r({
        size: Math.ceil(n.length / 2),
        targetSize: a,
        type: "hex",
      });
    return `0x${n["right" === t ? "padEnd" : "padStart"](2 * a, "0")}`;
  }
  (e.s(["i", 0, n, "G", 0, r, "p", 0, a], 213090),
    e.s(
      [
        "g",
        0,
        function (e, { dir: t, size: a = 32 } = {}) {
          return "string" == typeof e
            ? i(e, { dir: t, size: a })
            : (function (e, { dir: t, size: a = 32 } = {}) {
                if (null === a) return e;
                if (e.length > a)
                  throw new r({ size: e.length, targetSize: a, type: "bytes" });
                let n = new Uint8Array(a);
                for (let r = 0; r < a; r++) {
                  let i = "right" === t;
                  n[i ? r : a - r - 1] = e[i ? r : e.length - r - 1];
                }
                return n;
              })(e, { dir: t, size: a });
        },
        "n",
        0,
        i,
      ],
      160642,
    ));
};
