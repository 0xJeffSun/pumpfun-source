// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(157633),
    l = e.i(96224),
    o = e.i(426091),
    n = e.i(146695),
    s = e.i(365089),
    a = e.i(432626),
    c = e.i(705313),
    d = e.i(98525),
    u = e.i(179736);
  e.i(12692);
  var f = e.i(398902),
    p = e.i(875737),
    m = e.i(545063),
    h = e.i(574472),
    x = e.i(31802),
    g = e.i(303599);
  function y(e) {
    let i,
      l,
      o = (0, r.c)(7),
      { userAddress: n, displayName: s } = e,
      { address: a } = (0, h.F)(),
      c = (0, m.$)(),
      d = (0, g.G)(n);
    if (!n || c(n)) return null;
    o[0] !== s
      ? ((i = s?.trim() || void 0), (o[0] = s), (o[1] = i))
      : (i = o[1]);
    let u = !!a;
    return (
      o[2] !== d || o[3] !== i || o[4] !== u || o[5] !== n
        ? ((l = (0, t.jsx)(x.f, {
            displayName: i,
            hideUntilReady: !0,
            initialIsFollowing: d,
            isLoggedIn: u,
            useRetailButton: !0,
            userAddress: n,
          })),
          (o[2] = d),
          (o[3] = i),
          (o[4] = u),
          (o[5] = n),
          (o[6] = l))
        : (l = o[6]),
      l
    );
  }
  e.s(["f", 0, y], 949060);
  var w = e.i(953283),
    b = e.i(409954),
    v = e.i(279602),
    j = e.i(10738),
    _ = e.i(646908),
    I = e.i(253623),
    k = e.i(369091),
    N = e.i(605587),
    F = e.i(116549),
    C = e.i(813792),
    O = e.i(733089),
    E = e.i(908163);
  let L = {
      you: "bg-bg-accent/10 text-text-accent",
      dev: "bg-bg-tertiary text-text-primary",
      sniper: "bg-loss/[0.12] text-loss",
      bundler: "bg-loss/[0.12] text-loss",
      fresh: "bg-bg-tertiary text-text-secondary",
      following: "bg-bg-tertiary text-text-secondary",
      verified: "bg-bg-tertiary text-text-secondary",
      tracked: "bg-bg-tertiary text-text-secondary",
      lp: "bg-bg-tertiary text-text-tertiary",
      pump_user: "bg-bg-tertiary text-text-tertiary",
      outside_top: "bg-bg-tertiary text-text-tertiary",
    },
    P = {
      you: "common.you",
      dev: "coin_details.holders.badges.creator",
      sniper: "web.coin.tag_sniper",
      bundler: "web.coin.tag_bundler",
      fresh: "coin_details.holders.audit.flags.fresh_title",
      following: "common.following",
      verified: "web.coin.tag_verified",
      tracked: "web.coin.tag_tracked",
      lp: "web.holders.liquidity_pool",
      pump_user: "web.coin.tag_pump_user",
      outside_top: "web.coin.tag_outside_top",
    },
    T = `${E.G} ${E.q.terminal}`;
  function S(e) {
    let i,
      l,
      n,
      s,
      a = (0, r.c)(16),
      { tag: c, onClick: d, className: u } = e,
      { t: p } = (0, f.f)(),
      m = P[c];
    a[0] !== p || a[1] !== m
      ? ((i = p(m)), (a[0] = p), (a[1] = m), (a[2] = i))
      : (i = a[2]);
    let h = i;
    if (a[3] !== u || a[4] !== h || a[5] !== d || a[6] !== c) {
      n = Symbol.for("react.early_return_sentinel");
      e: if (((l = (0, o.c)(T, L[c], u)), d)) {
        let e;
        (a[9] !== d || a[10] !== c
          ? ((e = (e) => {
              (e.stopPropagation(), d(c));
            }),
            (a[9] = d),
            (a[10] = c),
            (a[11] = e))
          : (e = a[11]),
          (n = (0, t.jsx)("button", {
            type: "button",
            "data-tag": c,
            onClick: e,
            className: (0, o.c)(l, "hover:brightness-125"),
            children: h,
          })));
        break e;
      }
      ((a[3] = u), (a[4] = h), (a[5] = d), (a[6] = c), (a[7] = l), (a[8] = n));
    } else ((l = a[7]), (n = a[8]));
    return n !== Symbol.for("react.early_return_sentinel")
      ? n
      : (a[12] !== l || a[13] !== h || a[14] !== c
          ? ((s = (0, t.jsx)("span", {
              "data-tag": c,
              className: l,
              children: h,
            })),
            (a[12] = l),
            (a[13] = h),
            (a[14] = c),
            (a[15] = s))
          : (s = a[15]),
        s);
  }
  function q(e) {
    let i,
      l,
      n,
      s,
      a,
      c,
      d = (0, r.c)(19),
      { tags: u, maxTags: f, onTagClick: p, className: m } = e,
      h = void 0 === f ? 3 : f,
      x = (0, F.x)();
    if (d[0] !== m || d[1] !== x || d[2] !== h || d[3] !== p || d[4] !== u) {
      a = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          r = (0, O.O)(u);
        if (0 === r.length) {
          a = null;
          break e;
        }
        let c = r.slice(0, h),
          f = r.length - c.length;
        (d[10] !== m
          ? ((i = (0, o.c)("inline-flex min-w-0 items-center gap-1", m)),
            (d[10] = m),
            (d[11] = i))
          : (i = d[11]),
          (l = "wallet-tags"),
          d[12] !== p
            ? ((e = (e) => (0, t.jsx)(S, { tag: e, onClick: p }, e)),
              (d[12] = p),
              (d[13] = e))
            : (e = d[13]),
          (n = c.map(e)),
          (s =
            f > 0
              ? (0, t.jsx)(C.f, {
                  content: r.slice(h).join(", "),
                  density: x,
                  children: (0, t.jsxs)("span", {
                    className: (0, o.c)(T, "bg-bg-tertiary text-text-tertiary"),
                    children: ["+", f],
                  }),
                })
              : null));
      }
      ((d[0] = m),
        (d[1] = x),
        (d[2] = h),
        (d[3] = p),
        (d[4] = u),
        (d[5] = i),
        (d[6] = l),
        (d[7] = n),
        (d[8] = s),
        (d[9] = a));
    } else ((i = d[5]), (l = d[6]), (n = d[7]), (s = d[8]), (a = d[9]));
    return a !== Symbol.for("react.early_return_sentinel")
      ? a
      : (d[14] !== i || d[15] !== l || d[16] !== n || d[17] !== s
          ? ((c = (0, t.jsxs)("span", {
              className: i,
              "data-testid": l,
              children: [n, s],
            })),
            (d[14] = i),
            (d[15] = l),
            (d[16] = n),
            (d[17] = s),
            (d[18] = c))
          : (c = d[18]),
        c);
  }
  e.s(["i", 0, T, "g", 0, P, "E", 0, L], 518516);
  let z = { xs: 20, sm: 24, md: 32, lg: 40 },
    R = { 16: 12, 20: 12, 24: 12, 28: 14, 32: 14, 36: 16, 40: 18 },
    A = {
      16: "size-4",
      20: "size-5",
      24: "size-6",
      28: "size-7",
      32: "size-8",
      36: "size-9",
      40: "size-10",
    },
    U = {
      terminal: "text-[13px] leading-[18px]",
      comfortable: "text-sm leading-5",
    },
    $ = "rounded-full";
  (e.s(
    [
      "a",
      0,
      $,
      "v",
      0,
      "flex items-center [&>*+*]:-ml-1.5",
      "C",
      0,
      R,
      "S",
      0,
      function (e) {
        let m,
          h,
          x,
          g,
          F,
          C,
          O,
          E,
          L,
          P,
          T,
          S,
          G,
          W,
          K,
          B,
          Q,
          H,
          D,
          M,
          J,
          X,
          Z,
          V = (0, r.c)(110),
          {
            address: Y,
            chain: ee,
            userId: et,
            username: er,
            profileImage: ei,
            avatarDecoration: el,
            size: eo,
            density: en,
            showAvatar: es,
            showName: ea,
            linkAvatar: ec,
            avatar: ed,
            facepile: eu,
            framed: ef,
            nameOverride: ep,
            outsideWallet: em,
            verified: eh,
            xUsername: ex,
            tags: eg,
            maxTags: ey,
            onTagClick: ew,
            hoverCard: eb,
            link: ev,
            href: ej,
            shallowProfileId: e_,
            linkProps: eI,
            onClick: ek,
            subline: eN,
            description: eF,
            trailing: eC,
            nameClassName: eO,
            className: eE,
          } = e,
          eL = void 0 === es || es,
          eP = void 0 !== ec && ec,
          eT = void 0 !== eu && eu,
          eS = void 0 === ef || ef,
          eq = void 0 !== em && em,
          ez = void 0 !== eh && eh,
          eR = void 0 === eb || eb,
          eA = void 0 === ev || ev,
          eU = void 0 === e_ ? (Y ?? et ?? null) : e_,
          e$ = void 0 === eN ? "none" : eN,
          { t: eG } = (0, f.f)(),
          { ipfsPrefix: eW } = (0, k.useIpfsPrefix)(),
          eK = (0, j.f)("(hover: none)"),
          eB = (0, l.useHasApiClientsConfig)();
        V[0] !== Y || V[1] !== ee || V[2] !== et
          ? ((m = (0, _.B)(ee) && !et && !!Y && !(0, I.D)(Y) && !(0, N.h)(Y)),
            (V[0] = Y),
            (V[1] = ee),
            (V[2] = et),
            (V[3] = m))
          : (m = V[3]);
        let eQ = m,
          eH = (0, u.s)("lookup" !== ez || eQ ? null : (et ?? Y ?? null)),
          eD = "lookup" === ez ? eH : ez,
          eM = "number" == typeof (Z = void 0 === eo ? "sm" : eo) ? Z : z[Z],
          eJ = (0, v.f)(el);
        if (
          V[4] !== Y ||
          V[5] !== ed ||
          V[6] !== eB ||
          V[7] !== ee ||
          V[8] !== eJ ||
          V[9] !== eT ||
          V[10] !== eS ||
          V[11] !== eR ||
          V[12] !== ej ||
          V[13] !== eW ||
          V[14] !== eA ||
          V[15] !== ep ||
          V[16] !== eK ||
          V[17] !== ek ||
          V[18] !== eq ||
          V[19] !== ei ||
          V[20] !== eM ||
          V[21] !== eL ||
          V[22] !== e$ ||
          V[23] !== eG ||
          V[24] !== eQ ||
          V[25] !== et ||
          V[26] !== er
        ) {
          let e,
            r,
            l,
            d = ep?.trim() || er?.trim() || null;
          ((x = d ?? (Y ? (0, I.j)(Y, ee, s.J) : eG("web.common.anon"))),
            V[33] !== Y ||
            V[34] !== ej ||
            V[35] !== eA ||
            V[36] !== eQ ||
            V[37] !== et
              ? ((e = eA
                  ? (ej ??
                    (eQ ? null : (0, n.$)({ address: Y ?? null, userId: et })))
                  : null),
                (V[33] = Y),
                (V[34] = ej),
                (V[35] = eA),
                (V[36] = eQ),
                (V[37] = et),
                (V[38] = e))
              : (e = V[38]),
            (h = e),
            (F = "address" === e$ && d && Y),
            V[39] !== eR
              ? ((r = !1 === eR ? null : "object" == typeof eR ? eR : {}),
                (V[39] = eR),
                (V[40] = r))
              : (r = V[40]));
          let u = r;
          ((O = (e) =>
            u && Y && !eK && eB && !eQ
              ? (0, t.jsx)(a.f, {
                  align: "start",
                  fallbackAvatarUrl: ei?.trim() || null,
                  fallbackUsername: d,
                  followSlot:
                    void 0 === u.followSlot
                      ? (0, t.jsx)(y, { displayName: d, userAddress: Y })
                      : u.followSlot,
                  ipfsPrefix: eW,
                  onOpenChange: u.onOpenChange,
                  userAddress: Y,
                  userProfileLink: h ?? void 0,
                  children: e,
                })
              : e),
            V[41] !== ek
              ? ((l = (e) => {
                  (e.stopPropagation(), ek?.(e));
                }),
                (V[41] = ek),
                (V[42] = l))
              : (l = V[42]),
            (g = l));
          let f = eT ? $ : eS ? "border border-border-secondary" : void 0;
          ((C = eL
            ? ed
              ? (0, t.jsx)("span", {
                  className: (0, o.c)("shrink-0", A[eM]),
                  children: ed,
                })
              : eq
                ? (0, t.jsx)("span", {
                    "data-testid": "outside-wallet-avatar",
                    className: (0, o.c)(
                      "flex shrink-0 items-center justify-center rounded-full bg-bg-secondary text-text-tertiary",
                      f,
                      A[eM],
                    ),
                    children: (0, t.jsx)(i.Cg, { size: Math.round(0.55 * eM) }),
                  })
                : (0, t.jsx)(w.f, {
                    decoration: eT ? null : eJ,
                    variant: "list",
                    children: (0, t.jsx)(c.f, {
                      ipfsPrefix: eW,
                      src: ei?.trim() || void 0,
                      address: Y ?? x,
                      isAnonymous: !d,
                      alt: eG("web.common.user_avatar_alt", { name: x }),
                      width: eM,
                      height: eM,
                      className: (0, o.c)("shrink-0 rounded-full", f, A[eM]),
                    }),
                  })
            : null),
            (V[4] = Y),
            (V[5] = ed),
            (V[6] = eB),
            (V[7] = ee),
            (V[8] = eJ),
            (V[9] = eT),
            (V[10] = eS),
            (V[11] = eR),
            (V[12] = ej),
            (V[13] = eW),
            (V[14] = eA),
            (V[15] = ep),
            (V[16] = eK),
            (V[17] = ek),
            (V[18] = eq),
            (V[19] = ei),
            (V[20] = eM),
            (V[21] = eL),
            (V[22] = e$),
            (V[23] = eG),
            (V[24] = eQ),
            (V[25] = et),
            (V[26] = er),
            (V[27] = h),
            (V[28] = x),
            (V[29] = g),
            (V[30] = F),
            (V[31] = C),
            (V[32] = O));
        } else
          ((h = V[27]),
            (x = V[28]),
            (g = V[29]),
            (F = V[30]),
            (C = V[31]),
            (O = V[32]));
        let eX = C;
        V[43] !== h ||
        V[44] !== x ||
        V[45] !== g ||
        V[46] !== eI ||
        V[47] !== eU
          ? ((E = (e) =>
              h && e
                ? (0, t.jsx)(b.o, {
                    ...eI,
                    profileId: eU ?? "",
                    href: h,
                    prefetch: !1,
                    "aria-label": x,
                    onClick: g,
                    className: "flex shrink-0 rounded-full",
                    children: e,
                  })
                : e),
            (V[43] = h),
            (V[44] = x),
            (V[45] = g),
            (V[46] = eI),
            (V[47] = eU),
            (V[48] = E))
          : (E = V[48]);
        let eZ = E;
        if (eT || !(void 0 === ea || ea)) {
          let e, r, i;
          V[49] !== eE
            ? ((e = (0, o.c)("relative flex shrink-0", eE)),
              (V[49] = eE),
              (V[50] = e))
            : (e = V[50]);
          let l = eT ? "" : void 0;
          return (
            V[51] !== eX || V[52] !== eZ || V[53] !== O
              ? ((r = O(eZ(eX))),
                (V[51] = eX),
                (V[52] = eZ),
                (V[53] = O),
                (V[54] = r))
              : (r = V[54]),
            V[55] !== e || V[56] !== l || V[57] !== r
              ? ((i = (0, t.jsx)("span", {
                  className: e,
                  "data-testid": "user-chip",
                  "data-facepile": l,
                  children: r,
                })),
                (V[55] = e),
                (V[56] = l),
                (V[57] = r),
                (V[58] = i))
              : (i = V[58]),
            i
          );
        }
        let eV = U[void 0 === en ? "terminal" : en];
        (V[59] !== eO || V[60] !== eV
          ? ((L = (0, o.c)("truncate font-medium text-text-primary", eV, eO)),
            (V[59] = eO),
            (V[60] = eV),
            (V[61] = L))
          : (L = V[61]),
          V[62] !== x || V[63] !== L
            ? ((P = (0, t.jsx)("span", { className: L, children: x })),
              (V[62] = x),
              (V[63] = L),
              (V[64] = P))
            : (P = V[64]));
        let eY = P;
        V[65] !== h ||
        V[66] !== g ||
        V[67] !== eI ||
        V[68] !== eY ||
        V[69] !== ek ||
        V[70] !== eU
          ? ((T = h
              ? (0, t.jsx)(b.o, {
                  ...eI,
                  profileId: eU ?? "",
                  href: h,
                  prefetch: !1,
                  onClick: g,
                  className: "min-w-0 truncate hover:underline",
                  children: eY,
                })
              : ek
                ? (0, t.jsx)("button", {
                    type: "button",
                    onClick: (e) => {
                      (e.stopPropagation(), ek(e));
                    },
                    className: "min-w-0 truncate hover:underline",
                    children: eY,
                  })
                : eY),
            (V[65] = h),
            (V[66] = g),
            (V[67] = eI),
            (V[68] = eY),
            (V[69] = ek),
            (V[70] = eU),
            (V[71] = T))
          : (T = V[71]);
        let e0 = T;
        (V[72] !== eD || V[73] !== eM
          ? ((S = eD ? (0, t.jsx)(d.f, { size: R[eM] }) : null),
            (V[72] = eD),
            (V[73] = eM),
            (V[74] = S))
          : (S = V[74]),
          V[75] !== ex
            ? ((G = ex
                ? (0, t.jsx)(p.f, {
                    xUsername: ex,
                    iconOnly: !0,
                    className: "text-text-quaternary",
                  })
                : null),
              (V[75] = ex),
              (V[76] = G))
            : (G = V[76]),
          V[77] !== e0 || V[78] !== S || V[79] !== G
            ? ((W = (0, t.jsxs)("span", {
                className: "flex min-w-0 items-center gap-1",
                children: [e0, S, G],
              })),
              (V[77] = e0),
              (V[78] = S),
              (V[79] = G),
              (V[80] = W))
            : (W = V[80]));
        let e1 = W;
        return (
          V[81] !== eE
            ? ((K = (0, o.c)("flex min-w-0 items-center gap-2", eE)),
              (V[81] = eE),
              (V[82] = K))
            : (K = V[82]),
          V[83] !== eX || V[84] !== eP || V[85] !== eZ
            ? ((B = eP ? eZ(eX) : eX),
              (V[83] = eX),
              (V[84] = eP),
              (V[85] = eZ),
              (V[86] = B))
            : (B = V[86]),
          V[87] !== e1 || V[88] !== O
            ? ((Q = O(e1)), (V[87] = e1), (V[88] = O), (V[89] = Q))
            : (Q = V[89]),
          V[90] !== ey || V[91] !== ew || V[92] !== eg
            ? ((H =
                eg && eg.length > 0
                  ? (0, t.jsx)(q, { tags: eg, maxTags: ey, onTagClick: ew })
                  : null),
              (V[90] = ey),
              (V[91] = ew),
              (V[92] = eg),
              (V[93] = H))
            : (H = V[93]),
          V[94] !== Q || V[95] !== H || V[96] !== eC
            ? ((D = (0, t.jsxs)("span", {
                className: "flex min-w-0 items-center gap-1.5",
                children: [Q, H, eC],
              })),
              (V[94] = Q),
              (V[95] = H),
              (V[96] = eC),
              (V[97] = D))
            : (D = V[97]),
          V[98] !== Y || V[99] !== ee || V[100] !== eF || V[101] !== F
            ? ((M = F
                ? (0, t.jsx)("span", {
                    className: "truncate text-xs text-text-tertiary",
                    children: (0, I.j)(Y, ee, s.J),
                  })
                : eF
                  ? (0, t.jsx)("span", {
                      className: "truncate text-xs text-text-tertiary",
                      children: eF,
                    })
                  : null),
              (V[98] = Y),
              (V[99] = ee),
              (V[100] = eF),
              (V[101] = F),
              (V[102] = M))
            : (M = V[102]),
          V[103] !== D || V[104] !== M
            ? ((J = (0, t.jsxs)("span", {
                className: "flex min-w-0 flex-col gap-0.5",
                children: [D, M],
              })),
              (V[103] = D),
              (V[104] = M),
              (V[105] = J))
            : (J = V[105]),
          V[106] !== K || V[107] !== B || V[108] !== J
            ? ((X = (0, t.jsxs)("span", {
                className: K,
                "data-testid": "user-chip",
                children: [B, J],
              })),
              (V[106] = K),
              (V[107] = B),
              (V[108] = J),
              (V[109] = X))
            : (X = V[109]),
          X
        );
      },
    ],
    693124,
  ),
    e.s([], 107240));
};
