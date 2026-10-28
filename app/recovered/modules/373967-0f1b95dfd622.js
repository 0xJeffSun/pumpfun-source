// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(590719),
    r = e.i(19648);
  function o(e) {
    let { kzg: o } = e,
      a = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      s =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      n = [];
    for (let e of s) n.push(Uint8Array.from(o.blobToKzgCommitment(e)));
    return "bytes" === a ? n : n.map((e) => (0, r.v)(e));
  }
  function a(e) {
    let { kzg: o } = e,
      a = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      s =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, t.X)(e))
          : e.blobs,
      n =
        "string" == typeof e.commitments[0]
          ? e.commitments.map((e) => (0, t.X)(e))
          : e.commitments,
      i = [];
    for (let e = 0; e < s.length; e++) {
      let t = s[e],
        r = n[e];
      i.push(Uint8Array.from(o.computeBlobKzgProof(t, r)));
    }
    return "bytes" === a ? i : i.map((e) => (0, r.v)(e));
  }
  (e.s(["f", 0, o], 373967), e.s(["f", 0, a], 873055));
  var s = e.i(403893),
    n = e.i(470083);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { commitments: o, version: a } = e,
          i = e.to ?? ("string" == typeof o[0] ? "hex" : "bytes"),
          c = [];
        for (let e of o)
          c.push(
            (function (e) {
              let { commitment: o, version: a = 1 } = e,
                i = e.to ?? ("string" == typeof o ? "hex" : "bytes"),
                c = (0, s.f)((0, n.f)(o, { strict: !1 }) ? (0, t.D)(o) : o);
              return (c.set([a], 0), "bytes" === i ? c : (0, r.v)(c));
            })({ commitment: e, to: i, version: a }),
          );
        return c;
      },
    ],
    651464,
  );
  e.s(["f", 0, 1], 242749);
  var i = e.i(532617);
  class c extends i.f {
    constructor({ maxSize: e, size: t }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
        name: "BlobSizeTooLargeError",
      });
    }
  }
  class l extends i.f {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  }
  class u extends i.f {
    constructor({ hash: e, size: t }) {
      super(`Versioned hash "${e}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${t}`],
        name: "InvalidVersionedHashSizeError",
      });
    }
  }
  class d extends i.f {
    constructor({ hash: e, version: t }) {
      super(`Versioned hash "${e}" version is invalid.`, {
        metaMessages: ["Expected: 1", `Received: ${t}`],
        name: "InvalidVersionedHashVersionError",
      });
    }
  }
  e.s(["G", 0, c, "h", 0, l, "S", 0, u, "t", 0, d], 995688);
  var f = e.i(811369),
    b = e.i(612735);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { data: s, kzg: n, to: i } = e,
          u =
            e.blobs ??
            (function (e) {
              let o = e.to ?? ("string" == typeof e.data ? "hex" : "bytes"),
                a = "string" == typeof e.data ? (0, t.X)(e.data) : e.data,
                s = (0, b.f)(a);
              if (!s) throw new l();
              if (s > 761855) throw new c({ maxSize: 761855, size: s });
              let n = [],
                i = !0,
                u = 0;
              for (; i; ) {
                let e = (0, f.f)(new Uint8Array(131072)),
                  t = 0;
                for (; t < 4096; ) {
                  let r = a.slice(u, u + 31);
                  if ((e.pushByte(0), e.pushBytes(r), r.length < 31)) {
                    (e.pushByte(128), (i = !1));
                    break;
                  }
                  (t++, (u += 31));
                }
                n.push(e);
              }
              return "bytes" === o
                ? n.map((e) => e.bytes)
                : n.map((e) => (0, r.v)(e.bytes));
            })({ data: s, to: i }),
          d = e.commitments ?? o({ blobs: u, kzg: n, to: i }),
          h = e.proofs ?? a({ blobs: u, commitments: d, kzg: n, to: i }),
          p = [];
        for (let e = 0; e < u.length; e++)
          p.push({ blob: u[e], commitment: d[e], proof: h[e] });
        return p;
      },
    ],
    406638,
  );
  var h = e.i(534446);
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
        throw new h.v({ transaction: e });
      },
    ],
    23094,
  );
};
