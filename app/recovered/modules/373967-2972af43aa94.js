// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(590719),
    n = e.i(19648);
  function r(e) {
    let { kzg: r } = e,
      i = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      s =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      o = [];
    for (let e of s) o.push(Uint8Array.from(r.blobToKzgCommitment(e)));
    return "bytes" === i ? o : o.map((e) => (0, n.v)(e));
  }
  function i(e) {
    let { kzg: r } = e,
      i = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      s =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      o =
        "string" == typeof e.commitments[0]
          ? e.commitments.map((e) => (0, t.X)(e))
          : e.commitments,
      a = [];
    for (let e = 0; e < s.length; e++) {
      let t = s[e],
        n = o[e];
      a.push(Uint8Array.from(r.computeBlobKzgProof(t, n)));
    }
    return "bytes" === i ? a : a.map((e) => (0, n.v)(e));
  }
  (e.s(["f", 0, r], 373967), e.s(["f", 0, i], 873055));
  var s = e.i(403893),
    o = e.i(470083);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { commitments: r, version: i } = e,
          a = e.to ?? ("string" == typeof r[0] ? "hex" : "bytes"),
          f = [];
        for (let e of r)
          f.push(
            (function (e) {
              let { commitment: r, version: i = 1 } = e,
                a = e.to ?? ("string" == typeof r ? "hex" : "bytes"),
                f = (0, s.f)((0, o.f)(r, { strict: !1 }) ? (0, t.D)(r) : r);
              return (f.set([i], 0), "bytes" === a ? f : (0, n.v)(f));
            })({ commitment: e, to: a, version: i }),
          );
        return f;
      },
    ],
    651464,
  );
  e.s(["f", 0, 1], 242749);
  var a = e.i(532617);
  class f extends a.f {
    constructor({ maxSize: e, size: t }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
        name: "BlobSizeTooLargeError",
      });
    }
  }
  class c extends a.f {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  }
  class u extends a.f {
    constructor({ hash: e, size: t }) {
      super(`Versioned hash "${e}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${t}`],
        name: "InvalidVersionedHashSizeError",
      });
    }
  }
  class l extends a.f {
    constructor({ hash: e, version: t }) {
      super(`Versioned hash "${e}" version is invalid.`, {
        metaMessages: ["Expected: 1", `Received: ${t}`],
        name: "InvalidVersionedHashVersionError",
      });
    }
  }
  e.s(["G", 0, f, "h", 0, c, "S", 0, u, "t", 0, l], 995688);
  var d = e.i(811369),
    h = e.i(612735);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { data: s, kzg: o, to: a } = e,
          u =
            e.blobs ??
            (function (e) {
              let r = e.to ?? ("string" == typeof e.data ? "hex" : "bytes"),
                i = "string" == typeof e.data ? (0, t.X)(e.data) : e.data,
                s = (0, h.f)(i);
              if (!s) throw new c();
              if (s > 761855) throw new f({ maxSize: 761855, size: s });
              let o = [],
                a = !0,
                u = 0;
              for (; a; ) {
                let e = (0, d.f)(new Uint8Array(131072)),
                  t = 0;
                for (; t < 4096; ) {
                  let n = i.slice(u, u + 31);
                  if ((e.pushByte(0), e.pushBytes(n), n.length < 31)) {
                    (e.pushByte(128), (a = !1));
                    break;
                  }
                  (t++, (u += 31));
                }
                o.push(e);
              }
              return "bytes" === r
                ? o.map((e) => e.bytes)
                : o.map((e) => (0, n.v)(e.bytes));
            })({ data: s, to: a }),
          l = e.commitments ?? r({ blobs: u, kzg: o, to: a }),
          p = e.proofs ?? i({ blobs: u, commitments: l, kzg: o, to: a }),
          b = [];
        for (let e = 0; e < u.length; e++)
          b.push({ blob: u[e], commitment: l[e], proof: p[e] });
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
