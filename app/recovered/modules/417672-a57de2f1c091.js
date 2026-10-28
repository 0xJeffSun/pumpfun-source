// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(532617);
  class n extends e.f {
    constructor({ offset: t, position: e, size: n }) {
      super(
        `Slice ${"start" === e ? "starting" : "ending"} at offset "${t}" is out-of-bounds (size: ${n}).`,
        { name: "SliceOffsetOutOfBoundsError" },
      );
    }
  }
  class i extends e.f {
    constructor({ size: t, targetSize: e, type: n }) {
      super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (${t}) exceeds padding size (${e}).`,
        { name: "SizeExceedsPaddingSizeError" },
      );
    }
  }
  class s extends e.f {
    constructor({ size: t, targetSize: e, type: n }) {
      super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} is expected to be ${e} ${n} long, but is ${t} ${n} long.`,
        { name: "InvalidBytesLengthError" },
      );
    }
  }
  function r(t, { dir: e, size: n = 32 } = {}) {
    if (null === n) return t;
    let s = t.replace("0x", "");
    if (s.length > 2 * n)
      throw new i({
        size: Math.ceil(s.length / 2),
        targetSize: n,
        type: "hex",
      });
    return `0x${s["right" === e ? "padEnd" : "padStart"](2 * n, "0")}`;
  }
  (t.s(["i", 0, s, "G", 0, i, "p", 0, n], 702737),
    t.s(
      [
        "g",
        0,
        function (t, { dir: e, size: n = 32 } = {}) {
          return "string" == typeof t
            ? r(t, { dir: e, size: n })
            : (function (t, { dir: e, size: n = 32 } = {}) {
                if (null === n) return t;
                if (t.length > n)
                  throw new i({ size: t.length, targetSize: n, type: "bytes" });
                let s = new Uint8Array(n);
                for (let i = 0; i < n; i++) {
                  let r = "right" === e;
                  s[r ? i : n - i - 1] = t[r ? i : t.length - i - 1];
                }
                return s;
              })(t, { dir: e, size: n });
        },
        "n",
        0,
        r,
      ],
      417672,
    ));
};
