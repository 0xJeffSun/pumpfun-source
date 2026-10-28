// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370),
    n = e.i(489442);
  function i(e, t) {
    let n = Math.min(e.length, t.length);
    for (let i = 0; i < n; i += 1) {
      let n = e[i] ?? 0,
        r = t[i] ?? 0;
      if (n !== r) return n - r;
    }
    return e.length - t.length;
  }
  let r = (e) => {
      let t = e.startsWith("0x") ? e.slice(2) : e;
      if (64 !== t.length) throw Error("Expected 32-byte (64 hex char) input.");
      let n = new Uint8Array(32);
      for (let e = 0; e < 32; e += 1) {
        let i = Number.parseInt(t.slice(2 * e, 2 * e + 2), 16);
        if (Number.isNaN(i)) throw Error("Invalid hex input.");
        n[e] = i;
      }
      return n;
    },
    a = (e) =>
      Array.from(e instanceof Uint8Array ? e : new Uint8Array(e), (e) =>
        e.toString(16).padStart(2, "0"),
      ).join(""),
    s = (e) => {
      let n = [
          ...e.map((e) => ({
            submissionCommitment: r(e.submissionCommitmentHex),
            mint: new t.PublicKey(e.mint),
            amount: BigInt(e.amountAtomic),
          })),
        ].sort((e, t) => {
          let n = i(
            new Uint8Array(e.submissionCommitment),
            new Uint8Array(t.submissionCommitment),
          );
          return 0 !== n
            ? n
            : i(
                new Uint8Array(e.mint.toBuffer()),
                new Uint8Array(t.mint.toBuffer()),
              );
        }),
        s = new Map(
          e.map((e) => {
            let t = e.submissionCommitmentHex.toLowerCase(),
              n = t.startsWith("0x") ? t.slice(2) : t;
            return [`${n}#${e.mint}`, e];
          }),
        );
      return {
        sorted: n.map((e) => {
          let t = `${a(e.submissionCommitment)}#${e.mint.toBase58()}`,
            n = s.get(t);
          if (!n) throw Error(`Canonical entry dropped during sort: ${t}`);
          return n;
        }),
        sdk: n,
      };
    };
  e.s(
    [
      "v",
      0,
      a,
      "A",
      0,
      (e) => {
        let { sdk: t } = s(e);
        return a(
          (function (e) {
            let t = (0, n.createHash)("sha256"),
              i = new Uint8Array(4);
            for (let n of (new DataView(i.buffer).setUint32(0, e.length, !0),
            t.update(i),
            e)) {
              var r = n.submissionCommitment;
              if (32 !== r.length)
                throw Error(
                  `submissionCommitment must be 32 bytes, got ${r.length}`,
                );
              (t.update(n.submissionCommitment),
                t.update(new Uint8Array(n.mint.toBuffer())));
              let e = new Uint8Array(8);
              (new DataView(e.buffer).setBigUint64(0, n.amount, !0),
                t.update(e));
            }
            return new Uint8Array(t.digest());
          })(t),
        );
      },
      "B",
      0,
      r,
      "U",
      0,
      s,
    ],
    565070,
  );
};
