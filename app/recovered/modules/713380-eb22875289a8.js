// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(606933),
    n = e.i(352386),
    a = e.i(926872),
    o = e.i(65407),
    l = e.i(725776),
    s = e.i(464649),
    d = e.i(555501),
    c = e.i(389270),
    u = e.i(646908),
    m = e.i(338319),
    h = e.i(605587);
  function p(e) {
    let i,
      n,
      l,
      d,
      p = (0, r.c)(28),
      {
        mint: f,
        chainId: b,
        size: g,
        chainSize: x,
        className: v,
        chainClassName: y,
        program: w,
        platform: _,
        protocol: k,
        boardProgram: j,
        venueSize: C,
        includeTon: z,
        includeStarknet: S,
        includeNear: N,
      } = e,
      $ = void 0 === g ? 16 : g,
      M = void 0 !== z && z,
      I = void 0 !== S && S,
      A = void 0 !== N && N,
      T = b ?? void 0,
      O = w ?? void 0,
      P = _ ?? void 0,
      R = k ?? void 0,
      E = j ?? void 0;
    p[0] !== f ||
    p[1] !== T ||
    p[2] !== O ||
    p[3] !== P ||
    p[4] !== R ||
    p[5] !== E
      ? ((i = (0, c.O)({
          mint: f,
          chain_id: T,
          program: O,
          platform: P,
          protocol: R,
          board_program: E,
        })),
        (p[0] = f),
        (p[1] = T),
        (p[2] = O),
        (p[3] = P),
        (p[4] = R),
        (p[5] = E),
        (p[6] = i))
      : (i = p[6]);
    let q = i;
    if (!q) {
      let e,
        r,
        i = x ?? $;
      return (
        p[7] !== y || p[8] !== v
          ? ((e = y ?? (0, m.c)("rounded-full ring-2 ring-bg-primary", v)),
            (p[7] = y),
            (p[8] = v),
            (p[9] = e))
          : (e = p[9]),
        p[10] !== b || p[11] !== i || p[12] !== e
          ? ((r = (0, t.jsx)(a.f, { chainId: b, size: i, className: e })),
            (p[10] = b),
            (p[11] = i),
            (p[12] = e),
            (p[13] = r))
          : (r = p[13]),
        r
      );
    }
    p[14] !== b || p[15] !== A || p[16] !== I || p[17] !== M || p[18] !== f
      ? ((n =
          (0, s.z)(b, { includeTon: M, includeStarknet: I, includeNear: A }) ??
          ((0, h.N)({ mint: f, chainId: b }) ||
          (0, u.L)(b) ||
          (0, u._)(b) ||
          (0, u.B)(b)
            ? null
            : (0, s.z)("solana", { includeSolana: !0 }))),
        (p[14] = b),
        (p[15] = A),
        (p[16] = I),
        (p[17] = M),
        (p[18] = f),
        (p[19] = n))
      : (n = p[19]);
    let L = n,
      B = C ?? x ?? $;
    return (
      p[20] !== y || p[21] !== v
        ? ((l = y ?? (0, m.c)("rounded-full ring-2 ring-bg-primary", v)),
          (p[20] = y),
          (p[21] = v),
          (p[22] = l))
        : (l = p[22]),
      p[23] !== L || p[24] !== B || p[25] !== l || p[26] !== q
        ? ((d = (0, t.jsx)(o.e, { venue: q, chain: L, size: B, className: l })),
          (p[23] = L),
          (p[24] = B),
          (p[25] = l),
          (p[26] = q),
          (p[27] = d))
        : (d = p[27]),
      d
    );
  }
  function f(e) {
    let i,
      n = (0, r.c)(5);
    if (!(0, d.v)(e.mint, e.chainId ?? e.sealChainId) || !1 === e.seal) {
      let r;
      return (
        n[0] !== e
          ? ((r = (0, t.jsx)(p, { ...e })), (n[0] = e), (n[1] = r))
          : (r = n[1]),
        r
      );
    }
    return (
      n[2] !== e.className || n[3] !== e.size
        ? ((i = (0, t.jsx)(l.f, { size: e.size, className: e.className })),
          (n[2] = e.className),
          (n[3] = e.size),
          (n[4] = i))
        : (i = n[4]),
      i
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let a,
        o,
        l,
        s = (0, r.c)(9);
      s[0] !== e
        ? (({ size: o, ...a } = e), (s[0] = e), (s[1] = a), (s[2] = o))
        : ((a = s[1]), (o = s[2]));
      let d = void 0 === o ? 16 : o;
      if (void 0 === (0, n.useContext)(i.QueryClientContext)) {
        let e;
        return (
          s[3] !== a || s[4] !== d
            ? ((e = (0, t.jsx)(p, { size: d, ...a })),
              (s[3] = a),
              (s[4] = d),
              (s[5] = e))
            : (e = s[5]),
          e
        );
      }
      return (
        s[6] !== a || s[7] !== d
          ? ((l = (0, t.jsx)(f, { size: d, ...a })),
            (s[6] = a),
            (s[7] = d),
            (s[8] = l))
          : (l = s[8]),
        l
      );
    },
  ]);
};
