// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(980987),
    r = e.i(586844),
    n = e.i(339513),
    i = e.i(95285);
  async function a(e) {
    return BigInt(await e.request({ method: "eth_gasPrice" }));
  }
  async function s(e, t) {
    return o(e, t);
  }
  async function o(e, s) {
    let { block: o, chain: u = e.chain, request: l } = s || {};
    try {
      let t = u?.fees?.maxPriorityFeePerGas ?? u?.fees?.defaultPriorityFee;
      if ("function" == typeof t) {
        let n = o || (await (0, r.f)(e, i.f, "getBlock")({})),
          a = await t({ block: n, client: e, request: l });
        if (null === a) throw Error();
        return a;
      }
      if (void 0 !== t) return t;
      let a = await e.request({ method: "eth_maxPriorityFeePerGas" });
      return (0, n.K)(a);
    } catch {
      let [n, s] = await Promise.all([
        o ? Promise.resolve(o) : (0, r.f)(e, i.f, "getBlock")({}),
        (0, r.f)(e, a, "getGasPrice")({}),
      ]);
      if ("bigint" != typeof n.baseFeePerGas) throw new t.D();
      let u = s - n.baseFeePerGas;
      if (u < 0n) return 0n;
      return u;
    }
  }
  async function u(e, t) {
    return l(e, t);
  }
  async function l(e, n) {
    let {
        block: s,
        chain: u = e.chain,
        request: l,
        type: c = "eip1559",
      } = n || {},
      f = await (async () =>
        "function" == typeof u?.fees?.baseFeeMultiplier
          ? u.fees.baseFeeMultiplier({ block: s, client: e, request: l })
          : (u?.fees?.baseFeeMultiplier ?? 1.2))();
    if (f < 1) throw new t.W();
    let d = f.toString().split(".")[1]?.length ?? 0,
      p = 10 ** d,
      y = (e) => (e * BigInt(Math.round(f * p))) / BigInt(p),
      h = s || (await (0, r.f)(e, i.f, "getBlock")({}));
    if ("function" == typeof u?.fees?.estimateFeesPerGas) {
      let t = await u.fees.estimateFeesPerGas({
        block: s,
        client: e,
        multiply: y,
        request: l,
        type: c,
      });
      if (null !== t) return t;
    }
    if ("eip1559" === c) {
      if ("bigint" != typeof h.baseFeePerGas) throw new t.D();
      let r =
          "bigint" == typeof l?.maxPriorityFeePerGas
            ? l.maxPriorityFeePerGas
            : await o(e, { block: h, chain: u, request: l }),
        n = y(h.baseFeePerGas);
      return {
        maxFeePerGas: l?.maxFeePerGas ?? n + r,
        maxPriorityFeePerGas: r,
      };
    }
    return {
      gasPrice: l?.gasPrice ?? y(await (0, r.f)(e, a, "getGasPrice")({})),
    };
  }
  (e.s(["f", 0, a], 289083),
    e.s(["D", 0, s, "o", 0, o], 863160),
    e.s(["w", 0, u, "p", 0, l], 767630));
  var c = e.i(698174);
  async function f(
    e,
    {
      address: t,
      blockHash: r,
      blockNumber: i,
      blockTag: a = "latest",
      requireCanonical: s,
    },
  ) {
    let o = (0, c.f)({
        blockHash: r,
        blockNumber: i,
        blockTag: a,
        requireCanonical: s,
      }),
      u = await e.request(
        { method: "eth_getTransactionCount", params: [t, o] },
        { dedupe: "bigint" == typeof i || void 0 !== r },
      );
    return (0, n.T)(u);
  }
  e.s(["f", 0, f], 204719);
  var d = e.i(67223),
    p = e.i(703114);
  function y(e) {
    let { kzg: t } = e,
      r = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      n =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, d.X)(e))
          : e.blobs,
      i = [];
    for (let e of n) i.push(Uint8Array.from(t.blobToKzgCommitment(e)));
    return "bytes" === r ? i : i.map((e) => (0, p.v)(e));
  }
  function h(e) {
    let { kzg: t } = e,
      r = e.to ?? ("string" == typeof e.blobs[0] ? "hex" : "bytes"),
      n =
        "string" == typeof e.blobs[0]
          ? e.blobs.map((e) => (0, d.X)(e))
          : e.blobs,
      i =
        "string" == typeof e.commitments[0]
          ? e.commitments.map((e) => (0, d.X)(e))
          : e.commitments,
      a = [];
    for (let e = 0; e < n.length; e++) {
      let r = n[e],
        s = i[e];
      a.push(Uint8Array.from(t.computeBlobKzgProof(r, s)));
    }
    return "bytes" === r ? a : a.map((e) => (0, p.v)(e));
  }
  (e.s(["f", 0, y], 177008), e.s(["f", 0, h], 927749));
  var m = e.i(403893),
    g = e.i(520417);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { commitments: t, version: r } = e,
          n = e.to ?? ("string" == typeof t[0] ? "hex" : "bytes"),
          i = [];
        for (let e of t)
          i.push(
            (function (e) {
              let { commitment: t, version: r = 1 } = e,
                n = e.to ?? ("string" == typeof t ? "hex" : "bytes"),
                i = (0, m.f)((0, g.f)(t, { strict: !1 }) ? (0, d.D)(t) : t);
              return (i.set([r], 0), "bytes" === n ? i : (0, p.v)(i));
            })({ commitment: e, to: n, version: r }),
          );
        return i;
      },
    ],
    663903,
  );
  e.s(["f", 0, 1], 212174);
  var b = e.i(927974);
  class w extends b.f {
    constructor({ maxSize: e, size: t }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
        name: "BlobSizeTooLargeError",
      });
    }
  }
  class v extends b.f {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  }
  class x extends b.f {
    constructor({ hash: e, size: t }) {
      super(`Versioned hash "${e}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${t}`],
        name: "InvalidVersionedHashSizeError",
      });
    }
  }
  class P extends b.f {
    constructor({ hash: e, version: t }) {
      super(`Versioned hash "${e}" version is invalid.`, {
        metaMessages: ["Expected: 1", `Received: ${t}`],
        name: "InvalidVersionedHashVersionError",
      });
    }
  }
  e.s(["G", 0, w, "h", 0, v, "S", 0, x, "t", 0, P], 562412);
  var k = e.i(173169),
    A = e.i(415415);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { data: t, kzg: r, to: n } = e,
          i =
            e.blobs ??
            (function (e) {
              let t = e.to ?? ("string" == typeof e.data ? "hex" : "bytes"),
                r = "string" == typeof e.data ? (0, d.X)(e.data) : e.data,
                n = (0, A.f)(r);
              if (!n) throw new v();
              if (n > 761855) throw new w({ maxSize: 761855, size: n });
              let i = [],
                a = !0,
                s = 0;
              for (; a; ) {
                let e = (0, k.f)(new Uint8Array(131072)),
                  t = 0;
                for (; t < 4096; ) {
                  let n = r.slice(s, s + 31);
                  if ((e.pushByte(0), e.pushBytes(n), n.length < 31)) {
                    (e.pushByte(128), (a = !1));
                    break;
                  }
                  (t++, (s += 31));
                }
                i.push(e);
              }
              return "bytes" === t
                ? i.map((e) => e.bytes)
                : i.map((e) => (0, p.v)(e.bytes));
            })({ data: t, to: n }),
          a = e.commitments ?? y({ blobs: i, kzg: r, to: n }),
          s = e.proofs ?? h({ blobs: i, commitments: a, kzg: r, to: n }),
          o = [];
        for (let e = 0; e < i.length; e++)
          o.push({ blob: i[e], commitment: a[e], proof: s[e] });
        return o;
      },
    ],
    512753,
  );
  var I = e.i(147864);
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
        throw new I.v({ transaction: e });
      },
    ],
    629173,
  );
};
