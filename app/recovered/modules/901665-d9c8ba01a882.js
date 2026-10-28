// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(498936),
    i = e.i(574472),
    a = e.i(102824),
    r = e.i(524711),
    s = e.i(363250),
    l = e.i(824425),
    o = e.i(575281),
    u = e.i(971370),
    d = e.i(690877),
    c = e.i(656846);
  e.i(70833);
  var m = e.i(66961),
    g = e.i(85324),
    p = e.i(38279),
    f = e.i(228935),
    h = e.i(655397);
  async function _(e, t) {
    let n = (0, o.h)((0, h.p)(), new u.PublicKey(t), !0),
      i = await e.getAccountInfo(n);
    if (!i) return { uiAmount: 0, atomicAmount: BigInt(0), ataExists: !1 };
    let a = BigInt(l.d.decode(new Uint8Array(i.data)).amount.toString());
    return {
      uiAmount: (0, f.f)(a, c.f.decimals),
      atomicAmount: a,
      ataExists: !0,
    };
  }
  function b(e) {
    let n,
      i,
      a,
      r = (0, t.c)(11),
      { connection: s } = (0, m.f)(),
      { wallet: l, enabled: o, refetchIntervalMs: u } = e,
      c = void 0 === u ? 6e4 : u,
      f = (void 0 === o || o) && !!l,
      h = (0, g.q)(c, f);
    (r[0] !== l
      ? ((n = p.Q.USDC_TOKEN_BALANCE(l ?? "")), (r[0] = l), (r[1] = n))
      : (n = r[1]),
      r[2] !== s || r[3] !== l
        ? ((i = () => _(s, l)), (r[2] = s), (r[3] = l), (r[4] = i))
        : (i = r[4]));
    let b = Math.min(6e4, c);
    return (
      r[5] !== f || r[6] !== h || r[7] !== n || r[8] !== i || r[9] !== b
        ? ((a = {
            enabled: f,
            queryKey: n,
            queryFn: i,
            staleTime: b,
            refetchInterval: h,
            refetchIntervalInBackground: !1,
            refetchOnWindowFocus: !0,
          }),
          (r[5] = f),
          (r[6] = h),
          (r[7] = n),
          (r[8] = i),
          (r[9] = b),
          (r[10] = a))
        : (a = r[10]),
      (0, d.useQuery)(a)
    );
  }
  (e.s(["q", 0, _, "G", 0, b], 505102),
    e.s(
      [
        "O",
        0,
        3e4,
        "Y",
        0,
        function (e) {
          let l,
            o,
            u,
            d,
            c,
            m,
            g,
            p = (0, t.c)(26),
            { wallet: f } = e,
            { address: h } = (0, i.F)();
          p[0] !== h || p[1] !== f
            ? ((l = f && h && f.toLowerCase() === h.toLowerCase()),
              (p[0] = h),
              (p[1] = f),
              (p[2] = l))
            : (l = p[2]);
          let _ = !!l,
            y = f ?? "";
          p[3] !== y
            ? ((o = { userAddress: y }), (p[3] = y), (p[4] = o))
            : (o = p[4]);
          let { data: v } = (0, r._)(o);
          p[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = {}), (p[5] = u))
            : (u = p[5]);
          let { data: w } = (0, s.f)(u),
            { usdcBalance: x } = (0, a.f)(),
            z = _ && null !== x,
            A = !!f && !z,
            S = _ ? 3e4 : void 0;
          p[6] !== A || p[7] !== S || p[8] !== f
            ? ((d = { wallet: f, enabled: A, refetchIntervalMs: S }),
              (p[6] = A),
              (p[7] = S),
              (p[8] = f),
              (p[9] = d))
            : (d = p[9]);
          let k = b(d),
            I = v?.success === !0;
          p[10] !== v || p[11] !== I
            ? ((c = I && v.data ? (0, n.f)(v.data) : null),
              (p[10] = v),
              (p[11] = I),
              (p[12] = c))
            : (c = p[12]);
          let q = c,
            $ = q && q.solPrice > 0 ? q.solPrice : void 0 === w ? 0 : w,
            B = q?.nativeBalance ?? 0,
            N = null !== q,
            M = B * $;
          p[13] !== k || p[14] !== _ || p[15] !== x
            ? ((m = _
                ? null !== x
                  ? { usdcAmount: x.balance, usdcError: !1 }
                  : {
                      usdcAmount: k.data ? k.data.uiAmount : null,
                      usdcError: !1,
                    }
                : k.isError
                  ? { usdcAmount: null, usdcError: !0 }
                  : {
                      usdcAmount: k.data ? k.data.uiAmount : null,
                      usdcError: !1,
                    }),
              (p[13] = k),
              (p[14] = _),
              (p[15] = x),
              (p[16] = m))
            : (m = p[16]);
          let { usdcAmount: T, usdcError: j } = m,
            U = null === T ? null : T,
            P = null === U ? null : M + U;
          return (
            p[17] !== P ||
            p[18] !== _ ||
            p[19] !== B ||
            p[20] !== N ||
            p[21] !== M ||
            p[22] !== T ||
            p[23] !== j ||
            p[24] !== U
              ? ((g = {
                  solAmount: B,
                  solLoaded: N,
                  solUsd: M,
                  usdcAmount: T,
                  usdcUsd: U,
                  usdcError: j,
                  combinedUsd: P,
                  isSelf: _,
                }),
                (p[17] = P),
                (p[18] = _),
                (p[19] = B),
                (p[20] = N),
                (p[21] = M),
                (p[22] = T),
                (p[23] = j),
                (p[24] = U),
                (p[25] = g))
              : (g = p[25]),
            g
          );
        },
      ],
      901665,
    ));
};
