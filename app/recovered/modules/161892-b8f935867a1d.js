// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["k", () => P, "u", () => E], 161892);
  var t = e.i(534446),
    n = e.i(19648),
    r = e.i(373967),
    i = e.i(873055),
    s = e.i(651464),
    o = e.i(406638),
    a = e.i(990149),
    f = e.i(449985),
    c = e.i(711753),
    u = e.i(242749),
    l = e.i(315857),
    d = e.i(296006),
    h = e.i(532617),
    p = e.i(995688),
    b = e.i(246666),
    m = e.i(960872),
    g = e.i(4911),
    y = e.i(612735),
    x = e.i(989494),
    v = e.i(382772);
  function w(e) {
    let { chainId: t, maxPriorityFeePerGas: n, maxFeePerGas: r, to: i } = e;
    if (t <= 0) throw new b.O({ chainId: t });
    if (i && !(0, g.f)(i)) throw new d.f({ address: i });
    if (r && r > l.f) throw new m.k({ maxFeePerGas: r });
    if (n && r && n > r)
      throw new m.M({ maxFeePerGas: r, maxPriorityFeePerGas: n });
  }
  var $ = e.i(23094);
  function I(e) {
    if (!e || 0 === e.length) return [];
    let n = [];
    for (let r = 0; r < e.length; r++) {
      let { address: i, storageKeys: s } = e[r];
      for (let e = 0; e < s.length; e++)
        if (s[e].length - 2 != 64) throw new t.J({ storageKey: s[e] });
      if (!(0, g.f)(i, { strict: !1 })) throw new d.f({ address: i });
      n.push([i, s]);
    }
    return n;
  }
  function P(e, P) {
    let B = (0, $.f)(e);
    return "eip1559" === B
      ? (function (e, t) {
          let {
            chainId: r,
            gas: i,
            nonce: s,
            to: o,
            value: f,
            maxFeePerGas: u,
            maxPriorityFeePerGas: l,
            accessList: d,
            data: h,
          } = e;
          w(e);
          let p = I(d),
            b = [
              (0, n.N)(r),
              s ? (0, n.N)(s) : "0x",
              l ? (0, n.N)(l) : "0x",
              u ? (0, n.N)(u) : "0x",
              i ? (0, n.N)(i) : "0x",
              o ?? "0x",
              f ? (0, n.N)(f) : "0x",
              h ?? "0x",
              p,
              ...E(e, t),
            ];
          return (0, a.s)(["0x02", (0, c.f)(b)]);
        })(e, P)
      : "eip2930" === B
        ? (function (e, t) {
            let {
              chainId: r,
              gas: i,
              data: s,
              nonce: o,
              to: f,
              value: u,
              accessList: p,
              gasPrice: y,
            } = e;
            !(function (e) {
              let {
                chainId: t,
                maxPriorityFeePerGas: n,
                gasPrice: r,
                maxFeePerGas: i,
                to: s,
              } = e;
              if (t <= 0) throw new b.O({ chainId: t });
              if (s && !(0, g.f)(s)) throw new d.f({ address: s });
              if (n || i)
                throw new h.f(
                  "`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.",
                );
              if (r && r > l.f) throw new m.k({ maxFeePerGas: r });
            })(e);
            let x = I(p),
              v = [
                (0, n.N)(r),
                o ? (0, n.N)(o) : "0x",
                y ? (0, n.N)(y) : "0x",
                i ? (0, n.N)(i) : "0x",
                f ?? "0x",
                u ? (0, n.N)(u) : "0x",
                s ?? "0x",
                x,
                ...E(e, t),
              ];
            return (0, a.s)(["0x01", (0, c.f)(v)]);
          })(e, P)
        : "eip4844" === B
          ? (function (e, t) {
              let {
                chainId: f,
                gas: l,
                nonce: d,
                to: h,
                value: b,
                maxFeePerBlobGas: m,
                maxFeePerGas: g,
                maxPriorityFeePerGas: $,
                accessList: P,
                data: B,
              } = e;
              !(function (e) {
                let { blobVersionedHashes: t } = e;
                if (t) {
                  if (0 === t.length) throw new p.h();
                  for (let e of t) {
                    let t = (0, y.f)(e),
                      n = (0, v.T)((0, x.M)(e, 0, 1));
                    if (32 !== t) throw new p.S({ hash: e, size: t });
                    if (n !== u.f) throw new p.t({ hash: e, version: n });
                  }
                }
                w(e);
              })(e);
              let N = e.blobVersionedHashes,
                A = e.sidecars;
              if (e.blobs && (void 0 === N || void 0 === A)) {
                let t =
                    "string" == typeof e.blobs[0]
                      ? e.blobs
                      : e.blobs.map((e) => (0, n.v)(e)),
                  a = e.kzg,
                  f = (0, r.f)({ blobs: t, kzg: a });
                if (
                  (void 0 === N && (N = (0, s.f)({ commitments: f })),
                  void 0 === A)
                ) {
                  let e = (0, i.f)({ blobs: t, commitments: f, kzg: a });
                  A = (0, o.f)({ blobs: t, commitments: f, proofs: e });
                }
              }
              let T = I(P),
                M = [
                  (0, n.N)(f),
                  d ? (0, n.N)(d) : "0x",
                  $ ? (0, n.N)($) : "0x",
                  g ? (0, n.N)(g) : "0x",
                  l ? (0, n.N)(l) : "0x",
                  h ?? "0x",
                  b ? (0, n.N)(b) : "0x",
                  B ?? "0x",
                  T,
                  m ? (0, n.N)(m) : "0x",
                  N ?? [],
                  ...E(e, t),
                ],
                _ = [],
                z = [],
                C = [];
              if (A)
                for (let e = 0; e < A.length; e++) {
                  let { blob: t, commitment: n, proof: r } = A[e];
                  (_.push(t), z.push(n), C.push(r));
                }
              return (0, a.s)([
                "0x03",
                A ? (0, c.f)([M, _, z, C]) : (0, c.f)(M),
              ]);
            })(e, P)
          : "eip7702" === B
            ? (function (e, t) {
                let {
                  authorizationList: r,
                  chainId: i,
                  gas: s,
                  nonce: o,
                  to: f,
                  value: u,
                  maxFeePerGas: l,
                  maxPriorityFeePerGas: h,
                  accessList: p,
                  data: m,
                } = e;
                !(function (e) {
                  let { authorizationList: t } = e;
                  if (t)
                    for (let e of t) {
                      let { chainId: t } = e,
                        n = e.address;
                      if (!(0, g.f)(n)) throw new d.f({ address: n });
                      if (t < 0) throw new b.O({ chainId: t });
                    }
                  w(e);
                })(e);
                let y = I(p),
                  x = (function (e) {
                    if (!e || 0 === e.length) return [];
                    let t = [];
                    for (let r of e) {
                      let { chainId: e, nonce: i, ...s } = r,
                        o = r.address;
                      t.push([
                        e ? (0, n.g)(e) : "0x",
                        o,
                        i ? (0, n.g)(i) : "0x",
                        ...E({}, s),
                      ]);
                    }
                    return t;
                  })(r);
                return (0, a.s)([
                  "0x04",
                  (0, c.f)([
                    (0, n.N)(i),
                    o ? (0, n.N)(o) : "0x",
                    h ? (0, n.N)(h) : "0x",
                    l ? (0, n.N)(l) : "0x",
                    s ? (0, n.N)(s) : "0x",
                    f ?? "0x",
                    u ? (0, n.N)(u) : "0x",
                    m ?? "0x",
                    y,
                    x,
                    ...E(e, t),
                  ]),
                ]);
              })(e, P)
            : (function (e, r) {
                let {
                  chainId: i = 0,
                  gas: s,
                  data: o,
                  nonce: a,
                  to: u,
                  value: p,
                  gasPrice: y,
                } = e;
                !(function (e) {
                  let {
                    chainId: t,
                    maxPriorityFeePerGas: n,
                    gasPrice: r,
                    maxFeePerGas: i,
                    to: s,
                  } = e;
                  if (s && !(0, g.f)(s)) throw new d.f({ address: s });
                  if (void 0 !== t && t <= 0) throw new b.O({ chainId: t });
                  if (n || i)
                    throw new h.f(
                      "`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.",
                    );
                  if (r && r > l.f) throw new m.k({ maxFeePerGas: r });
                })(e);
                let x = [
                  a ? (0, n.N)(a) : "0x",
                  y ? (0, n.N)(y) : "0x",
                  s ? (0, n.N)(s) : "0x",
                  u ?? "0x",
                  p ? (0, n.N)(p) : "0x",
                  o ?? "0x",
                ];
                if (r) {
                  let e = (() => {
                      if (r.v >= 35n)
                        return (r.v - 35n) / 2n > 0
                          ? r.v
                          : 27n + (35n === r.v ? 0n : 1n);
                      if (i > 0) return BigInt(2 * i) + BigInt(35n + r.v - 27n);
                      let e = 27n + (27n === r.v ? 0n : 1n);
                      if (r.v !== e) throw new t.t({ v: r.v });
                      return e;
                    })(),
                    s = (0, f.f)(r.r),
                    o = (0, f.f)(r.s);
                  x = [
                    ...x,
                    (0, n.N)(e),
                    "0x00" === s ? "0x" : s,
                    "0x00" === o ? "0x" : o,
                  ];
                } else i > 0 && (x = [...x, (0, n.N)(i), "0x", "0x"]);
                return (0, c.f)(x);
              })(e, P);
  }
  function E(e, t) {
    let r = t ?? e,
      { v: i, yParity: s } = r;
    if (void 0 === r.r || void 0 === r.s || (void 0 === i && void 0 === s))
      return [];
    let o = (0, f.f)(r.r),
      a = (0, f.f)(r.s);
    return [
      "number" == typeof s
        ? s
          ? (0, n.N)(1)
          : "0x"
        : 0n === i
          ? "0x"
          : 1n === i
            ? (0, n.N)(1)
            : 27n === i
              ? "0x"
              : (0, n.N)(1),
      "0x00" === o ? "0x" : o,
      "0x00" === a ? "0x" : a,
    ];
  }
};
