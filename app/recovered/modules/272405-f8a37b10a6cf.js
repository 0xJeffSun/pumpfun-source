// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  var r = e.i(753887);
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.toBigIntLE = function (e) {
      {
        let t = r.Buffer.from(e);
        t.reverse();
        let n = t.toString("hex");
        return 0 === n.length ? BigInt(0) : BigInt(`0x${n}`);
      }
    }),
    (n.toBigIntBE = function (e) {
      {
        let t = e.toString("hex");
        return 0 === t.length ? BigInt(0) : BigInt(`0x${t}`);
      }
    }),
    (n.toBufferLE = function (e, t) {
      {
        let n = e.toString(16),
          o = r.Buffer.from(n.padStart(2 * t, "0").slice(0, 2 * t), "hex");
        return (o.reverse(), o);
      }
    }),
    (n.toBufferBE = function (e, t) {
      {
        let n = e.toString(16);
        return r.Buffer.from(n.padStart(2 * t, "0").slice(0, 2 * t), "hex");
      }
    }));
};
