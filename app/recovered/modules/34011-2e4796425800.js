// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(426091),
    n = e.i(352386),
    a = e.i(65407),
    o = e.i(713380),
    l = e.i(725776),
    s = e.i(464649),
    d = e.i(909318),
    c = e.i(56087),
    u = e.i(248496),
    m = e.i(256617),
    h = e.i(707393),
    p = e.i(12345),
    f = e.i(389270),
    b = e.i(541710),
    g = e.i(646908),
    x = e.i(605587),
    v = e.i(924631);
  let y = (e) => Math.min(14, Math.max(10, Math.round(0.5 * e))),
    w = ({ seal: e, cornerSeal: t }) => e ?? (!0 === t ? "corner" : "name"),
    _ = (e) => {
      let t = Math.min(256, Math.ceil(2 * e));
      return m.h.find((e) => e >= t) ?? 256;
    },
    k = (e) => ("string" == typeof e ? e : null),
    j = (e, t, r = !1) => {
      if (
        !0 === e.is_banned ||
        !(
          r ||
          (0, p.X)({
            mint: e.mint,
            image_uri: e.image_uri,
            chain_id: k(e.chain_id),
          })
        )
      )
        return null;
      let i = _(t);
      return (
        (0, c.t)({
          sourceImageUrl: e.image_uri ?? void 0,
          mint: e.mint,
          imageType: c.d.COIN_IMAGE,
          width: i,
          height: i,
          suppressPlaceholder: !0,
        }) || null
      );
    },
    C = new Set(),
    z = (e) => {
      if (!e || C.has(e)) return;
      C.add(e);
      let t = new window.Image();
      ((t.decoding = "async"), (t.fetchPriority = "high"), (t.src = e));
    };
  e.s(
    [
      "CoinAvatar",
      0,
      function (e) {
        let m,
          j,
          C,
          z,
          S,
          N,
          $,
          M,
          I,
          A,
          T,
          O,
          P,
          R,
          E,
          q,
          L,
          B,
          U,
          W,
          G = (0, r.c)(93),
          {
            coin: F,
            size: Q,
            shape: K,
            seal: D,
            verified: X,
            cornerSeal: Z,
            hideCorner: H,
            cornerSize: V,
            cornerRingClassName: Y,
            cornerFrameSize: J,
            testIdPrefix: ee,
            optimisticImage: et,
            eager: er,
            bone: ei,
            imageRetries: en,
            framed: ea,
            children: eo,
            className: el,
            frameClassName: es,
            backdrop: ed,
            imageClassName: ec,
          } = e,
          eu = void 0 === K ? "squircle" : K,
          em = void 0 === X ? "lookup" : X,
          eh = void 0 !== H && H,
          ep = void 0 === Y ? "ring-bg-primary" : Y,
          ef = void 0 !== et && et,
          eb = void 0 !== er && er,
          eg = void 0 !== ei && ei,
          ex = void 0 !== ea && ea,
          ev = void 0 === ed ? null : ed,
          { showCoinImage: ey, onImageError: ew } = (function (e) {
            let t,
              i,
              a = (0, r.c)(5),
              [o, l] = (0, n.useState)(null),
              s = o !== e;
            return (
              a[0] !== e
                ? ((t = () => l(e)), (a[0] = e), (a[1] = t))
                : (t = a[1]),
              a[2] !== s || a[3] !== t
                ? ((i = { showCoinImage: s, onImageError: t }),
                  (a[2] = s),
                  (a[3] = t),
                  (a[4] = i))
                : (i = a[4]),
              i
            );
          })(F.mint),
          [e_, ek] = (0, n.useState)(null),
          ej = e_ === F.mint;
        G[0] !== F.mint
          ? ((m = (e) => {
              e.currentTarget.naturalWidth > 0 && ek(F.mint);
            }),
            (G[0] = F.mint),
            (G[1] = m))
          : (m = G[1]);
        let eC = m;
        G[2] !== F.chain_id ||
        G[3] !== F.image_uri ||
        G[4] !== F.mint ||
        G[5] !== ef
          ? ((j =
              ef ||
              (0, p.X)({
                mint: F.mint,
                image_uri: F.image_uri,
                chain_id: k(F.chain_id),
              })),
            (G[2] = F.chain_id),
            (G[3] = F.image_uri),
            (G[4] = F.mint),
            (G[5] = ef),
            (G[6] = j))
          : (j = G[6]);
        let ez = j;
        G[7] !== Q ? ((C = _(Q)), (G[7] = Q), (G[8] = C)) : (C = G[8]);
        let eS = C;
        G[9] !== Z || G[10] !== D
          ? ((z = w({ seal: D, cornerSeal: Z })),
            (G[9] = Z),
            (G[10] = D),
            (G[11] = z))
          : (z = G[11]);
        let eN = z,
          e$ = J ?? Q,
          eM = null == J ? 0 : Math.max(0, (J - Q) / 2);
        G[12] !== eM
          ? ((S = (e) => (eM > 0 ? { bottom: e - eM, right: e - eM } : void 0)),
            (G[12] = eM),
            (G[13] = S))
          : (S = G[13]);
        let eI = S;
        G[14] !== e$ || G[15] !== V
          ? ((N = V ?? Math.max(12, Math.round(0.4 * e$))),
            (G[14] = e$),
            (G[15] = V),
            (G[16] = N))
          : (N = G[16]);
        let eA = N,
          eT = k(F.chain_id),
          eO = (0, b.l)(),
          eP = !0 === eO.ton,
          eR = !0 === eO.starknet,
          eE = !0 === eO.near,
          eq = (0, s.z)(eT, {
            includeTon: eP,
            includeStarknet: eR,
            includeNear: eE,
          }),
          eL = e$ >= a.z,
          eB = eL
            ? (0, f.O)({
                mint: F.mint,
                chain_id: eT ?? void 0,
                program: F.program ?? void 0,
                platform: F.platform ?? void 0,
                protocol: F.protocol ?? void 0,
                board_program: F.board_program ?? void 0,
              })
            : null,
          eU =
            eq ??
            (!eB ||
            (0, x.N)({ mint: F.mint, chainId: eT }) ||
            (0, g.L)(eT) ||
            (0, g._)(eT) ||
            (0, g.B)(eT)
              ? null
              : (0, s.z)("solana", { includeSolana: !0 }));
        G[17] !== e$ ? (($ = y(e$)), (G[17] = e$), (G[18] = $)) : ($ = G[18]);
        let eW = $;
        G[19] !== ep
          ? ((M = (0, i.c)("rounded-full ring-2", ep)),
            (G[19] = ep),
            (G[20] = M))
          : (M = G[20]);
        let eG = M,
          eF = eL ? F.program : void 0,
          eQ = eL ? F.platform : void 0,
          eK = eL ? F.protocol : void 0,
          eD = eL ? F.board_program : void 0;
        (G[21] !== e$
          ? ((I = (0, a.P)(e$)), (G[21] = e$), (G[22] = I))
          : (I = G[22]),
          G[23] !== eE ||
          G[24] !== eR ||
          G[25] !== eP ||
          G[26] !== eF ||
          G[27] !== eQ ||
          G[28] !== eK ||
          G[29] !== eD ||
          G[30] !== I
            ? ((A = {
                program: eF,
                platform: eQ,
                protocol: eK,
                boardProgram: eD,
                venueSize: I,
                includeTon: eP,
                includeStarknet: eR,
                includeNear: eE,
              }),
              (G[23] = eE),
              (G[24] = eR),
              (G[25] = eP),
              (G[26] = eF),
              (G[27] = eQ),
              (G[28] = eK),
              (G[29] = eD),
              (G[30] = I),
              (G[31] = A))
            : (A = G[31]));
        let eX = A,
          eZ = null == eo && ez && ey,
          eH = eg && eZ && !ej;
        G[32] !== eT ||
        G[33] !== eG ||
        G[34] !== eW ||
        G[35] !== F.mint ||
        G[36] !== eU ||
        G[37] !== eI ||
        G[38] !== eX ||
        G[39] !== ee ||
        G[40] !== eB
          ? ((T =
              eU || eB
                ? (0, t.jsx)("span", {
                    "data-testid": ee
                      ? `${ee}-${eU ? "chain" : "venue"}`
                      : void 0,
                    "data-chain": eU?.slug,
                    "data-venue": eB?.label,
                    className: "absolute -bottom-0.5 -right-0.5 flex",
                    style: eI(-2),
                    children: (0, t.jsx)(o.f, {
                      mint: F.mint,
                      chainId: eT,
                      seal: !1,
                      size: eW,
                      chainSize: eW,
                      chainClassName: eG,
                      ...eX,
                    }),
                  })
                : null),
            (G[32] = eT),
            (G[33] = eG),
            (G[34] = eW),
            (G[35] = F.mint),
            (G[36] = eU),
            (G[37] = eI),
            (G[38] = eX),
            (G[39] = ee),
            (G[40] = eB),
            (G[41] = T))
          : (T = G[41]);
        let eV = T;
        G[42] !== eV ||
        G[43] !== eT ||
        G[44] !== eG ||
        G[45] !== eW ||
        G[46] !== F.mint ||
        G[47] !== eI ||
        G[48] !== eh ||
        G[49] !== eX ||
        G[50] !== eN ||
        G[51] !== eA ||
        G[52] !== ee ||
        G[53] !== em
          ? ((O = eh
              ? null
              : "corner" !== eN || !1 === em
                ? eV
                : !0 === em
                  ? (0, t.jsx)("span", {
                      "data-testid": ee ? `${ee}-verified` : void 0,
                      className: "absolute -bottom-1 -right-1",
                      style: eI(-4),
                      children: (0, t.jsx)(l.f, { size: eA }),
                    })
                  : (0, t.jsx)("span", {
                      className: "absolute -bottom-0.5 -right-0.5 flex",
                      style: eI(-2),
                      children: (0, t.jsx)(o.f, {
                        mint: F.mint,
                        chainId: eT,
                        size: eA,
                        chainSize: eW,
                        seal: !0,
                        chainClassName: eG,
                        ...eX,
                      }),
                    })),
            (G[42] = eV),
            (G[43] = eT),
            (G[44] = eG),
            (G[45] = eW),
            (G[46] = F.mint),
            (G[47] = eI),
            (G[48] = eh),
            (G[49] = eX),
            (G[50] = eN),
            (G[51] = eA),
            (G[52] = ee),
            (G[53] = em),
            (G[54] = O))
          : (O = G[54]);
        let eY = O;
        ((G[55] !== el
          ? ((P = (0, i.c)("relative block shrink-0", el)),
            (G[55] = el),
            (G[56] = P))
          : (P = G[56]),
        G[57] !== Q
          ? ((R = { width: Q, height: Q }), (G[57] = Q), (G[58] = R))
          : (R = G[58]),
        G[59] !== es || G[60] !== ex || G[61] !== eu || G[62] !== Q)
          ? ((E = (0, i.c)(
              "relative flex size-full items-center justify-center overflow-hidden bg-bg-tertiary",
              "round" === eu
                ? "rounded-full"
                : Q >= 40
                  ? "rounded-xl"
                  : "rounded-md",
              ex && "border border-border-secondary",
              es,
            )),
            (G[59] = es),
            (G[60] = ex),
            (G[61] = eu),
            (G[62] = Q),
            (G[63] = E))
          : (E = G[63]),
          G[64] !== ev
            ? ((q = (0, h.h)(ev)), (G[64] = ev), (G[65] = q))
            : (q = G[65]));
        let eJ = ev ?? void 0;
        return (
          G[66] !== ev ||
          G[67] !== eg ||
          G[68] !== eo ||
          G[69] !== F ||
          G[70] !== eb ||
          G[71] !== ec ||
          G[72] !== en ||
          G[73] !== ew ||
          G[74] !== eC ||
          G[75] !== eZ ||
          G[76] !== eS
            ? ((L =
                eo ??
                (eZ
                  ? (0, t.jsx)(d.f, {
                      alt: "",
                      className: (0, i.c)(
                        ev
                          ? "size-[70%] object-contain"
                          : "size-full object-cover",
                        ec,
                      ),
                      height: eS,
                      imageType: c.d.COIN_IMAGE,
                      mint: F.mint,
                      onError: ew,
                      onLoad: eg ? eC : void 0,
                      sourceImageUrl: F.image_uri ?? void 0,
                      suppressPlaceholder: !0,
                      isBanned: F.is_banned ?? void 0,
                      width: eS,
                      maxRetries: en,
                      loading: eb ? "eager" : void 0,
                      fetchPriority: eb ? "high" : void 0,
                    })
                  : (0, t.jsx)("span", {
                      className:
                        "text-[11px] font-medium uppercase text-text-tertiary",
                      children: (0, v.G)(F),
                    }))),
              (G[66] = ev),
              (G[67] = eg),
              (G[68] = eo),
              (G[69] = F),
              (G[70] = eb),
              (G[71] = ec),
              (G[72] = en),
              (G[73] = ew),
              (G[74] = eC),
              (G[75] = eZ),
              (G[76] = eS),
              (G[77] = L))
            : (L = G[77]),
          G[78] !== eu || G[79] !== eH || G[80] !== Q
            ? ((B = eH
                ? (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    "data-skeleton": "art",
                    className: (0, i.c)(
                      "absolute inset-0",
                      u.e,
                      "round" === eu ? "rounded-full" : (0, u.R)(Q),
                    ),
                  })
                : null),
              (G[78] = eu),
              (G[79] = eH),
              (G[80] = Q),
              (G[81] = B))
            : (B = G[81]),
          G[82] !== E ||
          G[83] !== q ||
          G[84] !== eJ ||
          G[85] !== L ||
          G[86] !== B
            ? ((U = (0, t.jsxs)("span", {
                className: E,
                style: q,
                "data-backdrop": eJ,
                children: [L, B],
              })),
              (G[82] = E),
              (G[83] = q),
              (G[84] = eJ),
              (G[85] = L),
              (G[86] = B),
              (G[87] = U))
            : (U = G[87]),
          G[88] !== eY || G[89] !== P || G[90] !== R || G[91] !== U
            ? ((W = (0, t.jsxs)("span", {
                className: P,
                style: R,
                children: [U, eY],
              })),
              (G[88] = eY),
              (G[89] = P),
              (G[90] = R),
              (G[91] = U),
              (G[92] = W))
            : (W = G[92]),
          W
        );
      },
      "coinAvatarImageUrl",
      0,
      j,
      "coinChainCornerSize",
      0,
      y,
      "resolveCoinAvatarSeal",
      0,
      w,
      "warmCoinArtUrl",
      0,
      z,
      "warmCoinAvatarArt",
      0,
      (e, t, r = !1) => {
        e && !0 !== e.is_banned && z(j(e, t, r));
      },
    ],
    34011,
  );
};
