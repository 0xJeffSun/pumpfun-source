// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var f = e.i(753887);
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.toBigIntLE = function (e) {
      {
        let t = f.Buffer.from(e);
        t.reverse();
        let r = t.toString("hex");
        return 0 === r.length ? BigInt(0) : BigInt(`0x${r}`);
      }
    }),
    (r.toBigIntBE = function (e) {
      {
        let t = e.toString("hex");
        return 0 === t.length ? BigInt(0) : BigInt(`0x${t}`);
      }
    }),
    (r.toBufferLE = function (e, t) {
      {
        let r = e.toString(16),
          n = f.Buffer.from(r.padStart(2 * t, "0").slice(0, 2 * t), "hex");
        return (n.reverse(), n);
      }
    }),
    (r.toBufferBE = function (e, t) {
      {
        let r = e.toString(16);
        return f.Buffer.from(r.padStart(2 * t, "0").slice(0, 2 * t), "hex");
      }
    }));
};
