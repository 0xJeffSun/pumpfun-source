// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(590719),
    r = e.i(19648);
  function n(e) {
    let { kzg: n } = e,
      s = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      o =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      i = [];
    for (let e of o) i.push(Uint8Array.from(n.blobToKzgCommitment(e)));
    return "bytes" === s ? i : i.map((e) => (0, r.v)(e));
  }
  function s(e) {
    let { kzg: n } = e,
      s = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      o =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      i =
        "string" == typeof e.commitments[0]
          ? e.commitments.map((e) => (0, t.X)(e))
          : e.commitments,
      a = [];
    for (let e = 0; e < o.length; e++) {
      let t = o[e],
        r = i[e];
      a.push(Uint8Array.from(n.computeBlobKzgProof(t, r)));
    }
    return "bytes" === s ? a : a.map((e) => (0, r.v)(e));
  }
  (e.s(["f", 0, n], 373967), e.s(["f", 0, s], 873055));
  var o = e.i(403893),
    i = e.i(470083);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { commitments: n, version: s } = e,
          a = e.to ?? ("string" == typeof n[0] ? "hex" : "bytes"),
          c = [];
        for (let e of n)
          c.push(
            (function (e) {
              let { commitment: n, version: s = 1 } = e,
                a = e.to ?? ("string" == typeof n ? "hex" : "bytes"),
                c = (0, o.f)((0, i.f)(n, { strict: !1 }) ? (0, t.D)(n) : n);
              return (c.set([s], 0), "bytes" === a ? c : (0, r.v)(c));
            })({ commitment: e, to: a, version: s }),
          );
        return c;
      },
    ],
    651464,
  );
  e.s(["f", 0, 1], 242749);
  var a = e.i(532617);
  class c extends a.f {
    constructor({ maxSize: e, size: t }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
        name: "BlobSizeTooLargeError",
      });
    }
  }
  class u extends a.f {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  }
  class l extends a.f {
    constructor({ hash: e, size: t }) {
      super(`Versioned hash "${e}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${t}`],
        name: "InvalidVersionedHashSizeError",
      });
    }
  }
  class d extends a.f {
    constructor({ hash: e, version: t }) {
      super(`Versioned hash "${e}" version is invalid.`, {
        metaMessages: ["Expected: 1", `Received: ${t}`],
        name: "InvalidVersionedHashVersionError",
      });
    }
  }
  e.s(["G", 0, c, "h", 0, u, "S", 0, l, "t", 0, d], 995688);
  var f = e.i(811369),
    h = e.i(612735);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { data: o, kzg: i, to: a } = e,
          l =
            e.blobs ??
            (function (e) {
              let n = e.to ?? ("string" == typeof e.data ? "hex" : "bytes"),
                s = "string" == typeof e.data ? (0, t.X)(e.data) : e.data,
                o = (0, h.f)(s);
              if (!o) throw new u();
              if (o > 761855) throw new c({ maxSize: 761855, size: o });
              let i = [],
                a = !0,
                l = 0;
              for (; a; ) {
                let e = (0, f.f)(new Uint8Array(131072)),
                  t = 0;
                for (; t < 4096; ) {
                  let r = s.slice(l, l + 31);
                  if ((e.pushByte(0), e.pushBytes(r), r.length < 31)) {
                    (e.pushByte(128), (a = !1));
                    break;
                  }
                  (t++, (l += 31));
                }
                i.push(e);
              }
              return "bytes" === n
                ? i.map((e) => e.bytes)
                : i.map((e) => (0, r.v)(e.bytes));
            })({ data: o, to: a }),
          d = e.commitments ?? n({ blobs: l, kzg: i, to: a }),
          p = e.proofs ?? s({ blobs: l, commitments: d, kzg: i, to: a }),
          b = [];
        for (let e = 0; e < l.length; e++)
          b.push({ blob: l[e], commitment: d[e], proof: p[e] });
        return b;
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
