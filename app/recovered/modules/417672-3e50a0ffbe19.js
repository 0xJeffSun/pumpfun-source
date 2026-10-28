// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617);
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
  class i extends t.f {
    constructor({ size: e, targetSize: t, type: n }) {
      super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} is expected to be ${t} ${n} long, but is ${e} ${n} long.`,
        { name: "InvalidBytesLengthError" },
      );
    }
  }
  function o(e, { dir: t, size: n = 32 } = {}) {
    if (null === n) return e;
    let i = e.replace("0x", "");
    if (i.length > 2 * n)
      throw new r({
        size: Math.ceil(i.length / 2),
        targetSize: n,
        type: "hex",
      });
    return `0x${i["right" === t ? "padEnd" : "padStart"](2 * n, "0")}`;
  }
  (e.s(["i", 0, i, "G", 0, r, "p", 0, n], 702737),
    e.s(
      [
        "g",
        0,
        function (e, { dir: t, size: n = 32 } = {}) {
          return "string" == typeof e
            ? o(e, { dir: t, size: n })
            : (function (e, { dir: t, size: n = 32 } = {}) {
                if (null === n) return e;
                if (e.length > n)
                  throw new r({ size: e.length, targetSize: n, type: "bytes" });
                let i = new Uint8Array(n);
                for (let r = 0; r < n; r++) {
                  let o = "right" === t;
                  i[o ? r : n - r - 1] = e[o ? r : e.length - r - 1];
                }
                return i;
              })(e, { dir: t, size: n });
        },
        "n",
        0,
        o,
      ],
      417672,
    ));
};
