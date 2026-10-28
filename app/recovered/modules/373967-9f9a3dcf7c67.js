// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(590719),
    s = e.i(19648);
  function i(e) {
    let { kzg: i } = e,
      r = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      n =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      a = [];
    for (let e of n) a.push(Uint8Array.from(i.blobToKzgCommitment(e)));
    return "bytes" === r ? a : a.map((e) => (0, s.v)(e));
  }
  function r(e) {
    let { kzg: i } = e,
      r = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      n =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      a =
        "string" == typeof e.commitments[0]
          ? e.commitments.map((e) => (0, t.X)(e))
          : e.commitments,
      o = [];
    for (let e = 0; e < n.length; e++) {
      let t = n[e],
        s = a[e];
      o.push(Uint8Array.from(i.computeBlobKzgProof(t, s)));
    }
    return "bytes" === r ? o : o.map((e) => (0, s.v)(e));
  }
  (e.s(["f", 0, i], 373967), e.s(["f", 0, r], 873055));
  var n = e.i(403893),
    a = e.i(470083);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { commitments: i, version: r } = e,
          o = e.to ?? ("string" == typeof i[0] ? "hex" : "bytes"),
          l = [];
        for (let e of i)
          l.push(
            (function (e) {
              let { commitment: i, version: r = 1 } = e,
                o = e.to ?? ("string" == typeof i ? "hex" : "bytes"),
                l = (0, n.f)((0, a.f)(i, { strict: !1 }) ? (0, t.D)(i) : i);
              return (l.set([r], 0), "bytes" === o ? l : (0, s.v)(l));
            })({ commitment: e, to: o, version: r }),
          );
        return l;
      },
    ],
    651464,
  );
  e.s(["f", 0, 1], 242749);
  var o = e.i(532617);
  class l extends o.f {
    constructor({ maxSize: e, size: t }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
        name: "BlobSizeTooLargeError",
      });
    }
  }
  class c extends o.f {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  }
  class d extends o.f {
    constructor({ hash: e, size: t }) {
      super(`Versioned hash "${e}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${t}`],
        name: "InvalidVersionedHashSizeError",
      });
    }
  }
  class u extends o.f {
    constructor({ hash: e, version: t }) {
      super(`Versioned hash "${e}" version is invalid.`, {
        metaMessages: ["Expected: 1", `Received: ${t}`],
        name: "InvalidVersionedHashVersionError",
      });
    }
  }
  e.s(["G", 0, l, "h", 0, c, "S", 0, d, "t", 0, u], 995688);
  var h = e.i(811369),
    f = e.i(612735);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { data: n, kzg: a, to: o } = e,
          d =
            e.blobs ??
            (function (e) {
              let i = e.to ?? ("string" == typeof e.data ? "hex" : "bytes"),
                r = "string" == typeof e.data ? (0, t.X)(e.data) : e.data,
                n = (0, f.f)(r);
              if (!n) throw new c();
              if (n > 761855) throw new l({ maxSize: 761855, size: n });
              let a = [],
                o = !0,
                d = 0;
              for (; o; ) {
                let e = (0, h.f)(new Uint8Array(131072)),
                  t = 0;
                for (; t < 4096; ) {
                  let s = r.slice(d, d + 31);
                  if ((e.pushByte(0), e.pushBytes(s), s.length < 31)) {
                    (e.pushByte(128), (o = !1));
                    break;
                  }
                  (t++, (d += 31));
                }
                a.push(e);
              }
              return "bytes" === i
                ? a.map((e) => e.bytes)
                : a.map((e) => (0, s.v)(e.bytes));
            })({ data: n, to: o }),
          u = e.commitments ?? i({ blobs: d, kzg: a, to: o }),
          p = e.proofs ?? r({ blobs: d, commitments: u, kzg: a, to: o }),
          m = [];
        for (let e = 0; e < d.length; e++)
          m.push({ blob: d[e], commitment: u[e], proof: p[e] });
        return m;
      },
    ],
    406638,
  );
  var p = e.i(534446);
  e.s(
    [
      "f",
      0,
      function (e) {
        if (e.type) return e.type;
        if (void 0 !== e.authorizationList) return "eip7702";
        if (
          void 0 !== e.blobs ||
          void 0 !== e.blobVersionedHashes ||
          void 0 !== e.maxFeePerBlobGas ||
          void 0 !== e.sidecars
        )
          return "eip4844";
        if (void 0 !== e.maxFeePerGas || void 0 !== e.maxPriorityFeePerGas)
          return "eip1559";
        if (void 0 !== e.gasPrice)
          return void 0 !== e.accessList ? "eip2930" : "legacy";
        throw new p.v({ transaction: e });
      },
    ],
    23094,
  );
};
