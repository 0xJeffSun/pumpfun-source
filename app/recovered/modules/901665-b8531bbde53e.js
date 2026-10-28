// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(498936),
    r = e.i(574472),
    i = e.i(102824),
    a = e.i(524711),
    s = e.i(363250),
    l = e.i(824425),
    o = e.i(575281),
    u = e.i(971370),
    c = e.i(690877),
    d = e.i(656846);
  e.i(70833);
  var m = e.i(66961),
    f = e.i(85324),
    p = e.i(38279),
    g = e.i(228935),
    h = e.i(655397);
  async function v(e, t) {
    let n = (0, o.h)((0, h.p)(), new u.PublicKey(t), !0),
      r = await e.getAccountInfo(n);
    if (!r) return { uiAmount: 0, atomicAmount: BigInt(0), ataExists: !1 };
    let i = BigInt(l.d.decode(new Uint8Array(r.data)).amount.toString());
    return {
      uiAmount: (0, g.f)(i, d.f.decimals),
      atomicAmount: i,
      ataExists: !0,
    };
  }
  function b(e) {
    let n,
      r,
      i,
      a = (0, t.c)(11),
      { connection: s } = (0, m.f)(),
      { wallet: l, enabled: o, refetchIntervalMs: u } = e,
      d = void 0 === u ? 6e4 : u,
      g = (void 0 === o || o) && !!l,
      h = (0, f.q)(d, g);
    (a[0] !== l
      ? ((n = p.Q.USDC_TOKEN_BALANCE(l ?? "")), (a[0] = l), (a[1] = n))
      : (n = a[1]),
      a[2] !== s || a[3] !== l
        ? ((r = () => v(s, l)), (a[2] = s), (a[3] = l), (a[4] = r))
        : (r = a[4]));
    let b = Math.min(6e4, d);
    return (
      a[5] !== g || a[6] !== h || a[7] !== n || a[8] !== r || a[9] !== b
        ? ((i = {
            enabled: g,
            queryKey: n,
            queryFn: r,
            staleTime: b,
            refetchInterval: h,
            refetchIntervalInBackground: !1,
            refetchOnWindowFocus: !0,
          }),
          (a[5] = g),
          (a[6] = h),
          (a[7] = n),
          (a[8] = r),
          (a[9] = b),
          (a[10] = i))
        : (i = a[10]),
      (0, c.useQuery)(i)
    );
  }
  (e.s(["q", 0, v, "G", 0, b], 505102),
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
            c,
            d,
            m,
            f,
            p = (0, t.c)(26),
            { wallet: g } = e,
            { address: h } = (0, r.F)();
          p[0] !== h || p[1] !== g
            ? ((l = g && h && g.toLowerCase() === h.toLowerCase()),
              (p[0] = h),
              (p[1] = g),
              (p[2] = l))
            : (l = p[2]);
          let v = !!l,
            y = g ?? "";
          p[3] !== y
            ? ((o = { userAddress: y }), (p[3] = y), (p[4] = o))
            : (o = p[4]);
          let { data: _ } = (0, a._)(o);
          p[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = {}), (p[5] = u))
            : (u = p[5]);
          let { data: w } = (0, s.f)(u),
            { usdcBalance: x } = (0, i.f)(),
            S = v && null !== x,
            A = !!g && !S,
            k = v ? 3e4 : void 0;
          p[6] !== A || p[7] !== k || p[8] !== g
            ? ((c = { wallet: g, enabled: A, refetchIntervalMs: k }),
              (p[6] = A),
              (p[7] = k),
              (p[8] = g),
              (p[9] = c))
            : (c = p[9]);
          let j = b(c),
            I = _?.success === !0;
          p[10] !== _ || p[11] !== I
            ? ((d = I && _.data ? (0, n.f)(_.data) : null),
              (p[10] = _),
              (p[11] = I),
              (p[12] = d))
            : (d = p[12]);
          let B = d,
            E = B && B.solPrice > 0 ? B.solPrice : void 0 === w ? 0 : w,
            $ = B?.nativeBalance ?? 0,
            N = null !== B,
            T = $ * E;
          p[13] !== j || p[14] !== v || p[15] !== x
            ? ((m = v
                ? null !== x
                  ? { usdcAmount: x.balance, usdcError: !1 }
                  : {
                      usdcAmount: j.data ? j.data.uiAmount : null,
                      usdcError: !1,
                    }
                : j.isError
                  ? { usdcAmount: null, usdcError: !0 }
                  : {
                      usdcAmount: j.data ? j.data.uiAmount : null,
                      usdcError: !1,
                    }),
              (p[13] = j),
              (p[14] = v),
              (p[15] = x),
              (p[16] = m))
            : (m = p[16]);
          let { usdcAmount: M, usdcError: U } = m,
            z = null === M ? null : M,
            C = null === z ? null : T + z;
          return (
            p[17] !== C ||
            p[18] !== v ||
            p[19] !== $ ||
            p[20] !== N ||
            p[21] !== T ||
            p[22] !== M ||
            p[23] !== U ||
            p[24] !== z
              ? ((f = {
                  solAmount: $,
                  solLoaded: N,
                  solUsd: T,
                  usdcAmount: M,
                  usdcUsd: z,
                  usdcError: U,
                  combinedUsd: C,
                  isSelf: v,
                }),
                (p[17] = C),
                (p[18] = v),
                (p[19] = $),
                (p[20] = N),
                (p[21] = T),
                (p[22] = M),
                (p[23] = U),
                (p[24] = z),
                (p[25] = f))
              : (f = p[25]),
            f
          );
        },
      ],
      901665,
    ));
};
