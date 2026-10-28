// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["k", () => B, "u", () => E], 161892);
  var t = e.i(534446),
    s = e.i(19648),
    i = e.i(373967),
    r = e.i(873055),
    n = e.i(651464),
    a = e.i(406638),
    o = e.i(990149),
    l = e.i(449985),
    c = e.i(711753),
    d = e.i(242749),
    u = e.i(315857),
    h = e.i(296006),
    f = e.i(532617),
    p = e.i(995688),
    m = e.i(246666),
    b = e.i(960872),
    g = e.i(4911),
    x = e.i(612735),
    y = e.i(989494),
    v = e.i(382772);
  function w(e) {
    let { chainId: t, maxPriorityFeePerGas: s, maxFeePerGas: i, to: r } = e;
    if (t <= 0) throw new m.O({ chainId: t });
    if (r && !(0, g.f)(r)) throw new h.f({ address: r });
    if (i && i > u.f) throw new b.k({ maxFeePerGas: i });
    if (s && i && s > i)
      throw new b.M({ maxFeePerGas: i, maxPriorityFeePerGas: s });
  }
  var P = e.i(23094);
  function k(e) {
    if (!e || 0 === e.length) return [];
    let s = [];
    for (let i = 0; i < e.length; i++) {
      let { address: r, storageKeys: n } = e[i];
      for (let e = 0; e < n.length; e++)
        if (n[e].length - 2 != 64) throw new t.J({ storageKey: n[e] });
      if (!(0, g.f)(r, { strict: !1 })) throw new h.f({ address: r });
      s.push([r, n]);
    }
    return s;
  }
  function B(e, B) {
    let U = (0, P.f)(e);
    return "eip1559" === U
      ? (function (e, t) {
          let {
            chainId: i,
            gas: r,
            nonce: n,
            to: a,
            value: l,
            maxFeePerGas: d,
            maxPriorityFeePerGas: u,
            accessList: h,
            data: f,
          } = e;
          w(e);
          let p = k(h),
            m = [
              (0, s.N)(i),
              n ? (0, s.N)(n) : "0x",
              u ? (0, s.N)(u) : "0x",
              d ? (0, s.N)(d) : "0x",
              r ? (0, s.N)(r) : "0x",
              a ?? "0x",
              l ? (0, s.N)(l) : "0x",
              f ?? "0x",
              p,
              ...E(e, t),
            ];
          return (0, o.s)(["0x02", (0, c.f)(m)]);
        })(e, B)
      : "eip2930" === U
        ? (function (e, t) {
            let {
              chainId: i,
              gas: r,
              data: n,
              nonce: a,
              to: l,
              value: d,
              accessList: p,
              gasPrice: x,
            } = e;
            !(function (e) {
              let {
                chainId: t,
                maxPriorityFeePerGas: s,
                gasPrice: i,
                maxFeePerGas: r,
                to: n,
              } = e;
              if (t <= 0) throw new m.O({ chainId: t });
              if (n && !(0, g.f)(n)) throw new h.f({ address: n });
              if (s || r)
                throw new f.f(
                  "`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.",
                );
              if (i && i > u.f) throw new b.k({ maxFeePerGas: i });
            })(e);
            let y = k(p),
              v = [
                (0, s.N)(i),
                a ? (0, s.N)(a) : "0x",
                x ? (0, s.N)(x) : "0x",
                r ? (0, s.N)(r) : "0x",
                l ?? "0x",
                d ? (0, s.N)(d) : "0x",
                n ?? "0x",
                y,
                ...E(e, t),
              ];
            return (0, o.s)(["0x01", (0, c.f)(v)]);
          })(e, B)
        : "eip4844" === U
          ? (function (e, t) {
              let {
                chainId: l,
                gas: u,
                nonce: h,
                to: f,
                value: m,
                maxFeePerBlobGas: b,
                maxFeePerGas: g,
                maxPriorityFeePerGas: P,
                accessList: B,
                data: U,
              } = e;
              !(function (e) {
                let { blobVersionedHashes: t } = e;
                if (t) {
                  if (0 === t.length) throw new p.h();
                  for (let e of t) {
                    let t = (0, x.f)(e),
                      s = (0, v.T)((0, y.M)(e, 0, 1));
                    if (32 !== t) throw new p.S({ hash: e, size: t });
                    if (s !== d.f) throw new p.t({ hash: e, version: s });
                  }
                }
                w(e);
              })(e);
              let T = e.blobVersionedHashes,
                C = e.sidecars;
              if (e.blobs && (void 0 === T || void 0 === C)) {
                let t =
                    "string" == typeof e.blobs[0]
                      ? e.blobs
                      : e.blobs.map((e) => (0, s.v)(e)),
                  o = e.kzg,
                  l = (0, i.f)({ blobs: t, kzg: o });
                if (
                  (void 0 === T && (T = (0, n.f)({ commitments: l })),
                  void 0 === C)
                ) {
                  let e = (0, r.f)({ blobs: t, commitments: l, kzg: o });
                  C = (0, a.f)({ blobs: t, commitments: l, proofs: e });
                }
              }
              let N = k(B),
                I = [
                  (0, s.N)(l),
                  h ? (0, s.N)(h) : "0x",
                  P ? (0, s.N)(P) : "0x",
                  g ? (0, s.N)(g) : "0x",
                  u ? (0, s.N)(u) : "0x",
                  f ?? "0x",
                  m ? (0, s.N)(m) : "0x",
                  U ?? "0x",
                  N,
                  b ? (0, s.N)(b) : "0x",
                  T ?? [],
                  ...E(e, t),
                ],
                $ = [],
                G = [],
                F = [];
              if (C)
                for (let e = 0; e < C.length; e++) {
                  let { blob: t, commitment: s, proof: i } = C[e];
                  ($.push(t), G.push(s), F.push(i));
                }
              return (0, o.s)([
                "0x03",
                C ? (0, c.f)([I, $, G, F]) : (0, c.f)(I),
              ]);
            })(e, B)
          : "eip7702" === U
            ? (function (e, t) {
                let {
                  authorizationList: i,
                  chainId: r,
                  gas: n,
                  nonce: a,
                  to: l,
                  value: d,
                  maxFeePerGas: u,
                  maxPriorityFeePerGas: f,
                  accessList: p,
                  data: b,
                } = e;
                !(function (e) {
                  let { authorizationList: t } = e;
                  if (t)
                    for (let e of t) {
                      let { chainId: t } = e,
                        s = e.address;
                      if (!(0, g.f)(s)) throw new h.f({ address: s });
                      if (t < 0) throw new m.O({ chainId: t });
                    }
                  w(e);
                })(e);
                let x = k(p),
                  y = (function (e) {
                    if (!e || 0 === e.length) return [];
                    let t = [];
                    for (let i of e) {
                      let { chainId: e, nonce: r, ...n } = i,
                        a = i.address;
                      t.push([
                        e ? (0, s.g)(e) : "0x",
                        a,
                        r ? (0, s.g)(r) : "0x",
                        ...E({}, n),
                      ]);
                    }
                    return t;
                  })(i);
                return (0, o.s)([
                  "0x04",
                  (0, c.f)([
                    (0, s.N)(r),
                    a ? (0, s.N)(a) : "0x",
                    f ? (0, s.N)(f) : "0x",
                    u ? (0, s.N)(u) : "0x",
                    n ? (0, s.N)(n) : "0x",
                    l ?? "0x",
                    d ? (0, s.N)(d) : "0x",
                    b ?? "0x",
                    x,
                    y,
                    ...E(e, t),
                  ]),
                ]);
              })(e, B)
            : (function (e, i) {
                let {
                  chainId: r = 0,
                  gas: n,
                  data: a,
                  nonce: o,
                  to: d,
                  value: p,
                  gasPrice: x,
                } = e;
                !(function (e) {
                  let {
                    chainId: t,
                    maxPriorityFeePerGas: s,
                    gasPrice: i,
                    maxFeePerGas: r,
                    to: n,
                  } = e;
                  if (n && !(0, g.f)(n)) throw new h.f({ address: n });
                  if (void 0 !== t && t <= 0) throw new m.O({ chainId: t });
                  if (s || r)
                    throw new f.f(
                      "`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.",
                    );
                  if (i && i > u.f) throw new b.k({ maxFeePerGas: i });
                })(e);
                let y = [
                  o ? (0, s.N)(o) : "0x",
                  x ? (0, s.N)(x) : "0x",
                  n ? (0, s.N)(n) : "0x",
                  d ?? "0x",
                  p ? (0, s.N)(p) : "0x",
                  a ?? "0x",
                ];
                if (i) {
                  let e = (() => {
                      if (i.v >= 35n)
                        return (i.v - 35n) / 2n > 0
                          ? i.v
                          : 27n + (35n === i.v ? 0n : 1n);
                      if (r > 0) return BigInt(2 * r) + BigInt(35n + i.v - 27n);
                      let e = 27n + (27n === i.v ? 0n : 1n);
                      if (i.v !== e) throw new t.t({ v: i.v });
                      return e;
                    })(),
                    n = (0, l.f)(i.r),
                    a = (0, l.f)(i.s);
                  y = [
                    ...y,
                    (0, s.N)(e),
                    "0x00" === n ? "0x" : n,
                    "0x00" === a ? "0x" : a,
                  ];
                } else r > 0 && (y = [...y, (0, s.N)(r), "0x", "0x"]);
                return (0, c.f)(y);
              })(e, B);
  }
  function E(e, t) {
    let i = t ?? e,
      { v: r, yParity: n } = i;
    if (void 0 === i.r || void 0 === i.s || (void 0 === r && void 0 === n))
      return [];
    let a = (0, l.f)(i.r),
      o = (0, l.f)(i.s);
    return [
      "number" == typeof n
        ? n
          ? (0, s.N)(1)
          : "0x"
        : 0n === r
          ? "0x"
          : 1n === r
            ? (0, s.N)(1)
            : 27n === r
              ? "0x"
              : (0, s.N)(1),
      "0x00" === a ? "0x" : a,
      "0x00" === o ? "0x" : o,
    ];
  }
};
