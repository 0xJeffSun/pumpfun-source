// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(458310);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(436057),
    a = e.i(457463);
  e.i(84455);
  var r = e.i(540805),
    o = e.i(908163),
    d = e.i(257505);
  e.i(267146);
  var c = e.i(406288),
    u = e.i(839931),
    m = e.i(338664),
    p = e.i(338319),
    f = e.i(634029),
    h = e.i(90832);
  let x = ["home.gacha"];
  function v(e) {
    let o,
      d,
      c,
      u,
      m,
      f,
      x,
      v,
      b,
      g,
      w,
      N,
      y,
      j,
      _,
      U,
      C,
      A,
      P,
      S,
      k,
      I,
      E = (0, l.c)(101),
      {
        rowId: M,
        observeLiveRow: L,
        href: O,
        onPark: F,
        nftAddress: T,
        status: R,
        image: z,
        name: $,
        subtitle: D,
        valueUsd: B,
        pnlUsd: q,
        isClosed: K,
        density: V,
      } = e,
      { t: Q } = (0, n.f)(),
      H = "comfortable" === V,
      Z = H ? "size-10" : "size-9",
      W = H
        ? "text-sm leading-5 font-medium text-text-primary"
        : "text-xs leading-4 font-medium text-text-primary",
      Y = H
        ? "text-[13px] leading-[18px] text-text-tertiary"
        : "text-xs leading-4 text-text-tertiary",
      G = H
        ? "text-xs leading-4 text-text-quaternary"
        : "text-xs leading-4 text-text-tertiary",
      J = H
        ? "text-sm leading-5 font-medium tabular-nums"
        : "text-xs leading-4 font-medium tabular-nums";
    E[0] !== B
      ? ((o = null != B && Number.isFinite(B)), (E[0] = B), (E[1] = o))
      : (o = E[1]);
    let X = o;
    E[2] !== q
      ? ((d = null != q && Number.isFinite(q)), (E[2] = q), (E[3] = d))
      : (d = E[3]);
    let ee = d;
    if (
      E[4] !== Z ||
      E[5] !== V ||
      E[6] !== J ||
      E[7] !== ee ||
      E[8] !== X ||
      E[9] !== O ||
      E[10] !== z ||
      E[11] !== K ||
      E[12] !== G ||
      E[13] !== Y ||
      E[14] !== $ ||
      E[15] !== T ||
      E[16] !== L ||
      E[17] !== F ||
      E[18] !== q ||
      E[19] !== M ||
      E[20] !== R ||
      E[21] !== D ||
      E[22] !== Q ||
      E[23] !== W ||
      E[24] !== B
    ) {
      let e,
        l,
        n,
        o,
        d,
        S,
        k,
        I,
        H,
        et,
        el,
        ei = (0, r.k)(q);
      ((c = i.default),
        (P = M),
        (u = L),
        (m = O),
        (f = F),
        (x = a.f),
        (v = "profile-collectible-row"),
        (b = "list"),
        (g = V),
        (w = T),
        (N = R),
        (U = "flex w-full min-w-0 items-center gap-3"),
        E[42] !== Z
          ? ((e = (0, p.c)("aspect-auto shrink-0 rounded-[10px]", Z)),
            (E[42] = Z),
            (E[43] = e))
          : (e = E[43]),
        E[44] !== z || E[45] !== e
          ? ((C = (0, t.jsx)(s.f, { src: z, alt: "", className: e })),
            (E[44] = z),
            (E[45] = e),
            (E[46] = C))
          : (C = E[46]),
        E[47] !== W
          ? ((l = (0, p.c)("truncate", W)), (E[47] = W), (E[48] = l))
          : (l = E[48]),
        E[49] !== $ || E[50] !== l
          ? ((n = (0, t.jsx)("span", {
              className: l,
              "data-testid": "profile-collectible-row-title",
              children: $,
            })),
            (E[49] = $),
            (E[50] = l),
            (E[51] = n))
          : (n = E[51]),
        E[52] !== Y
          ? ((o = (0, p.c)("flex min-w-0", Y)), (E[52] = Y), (E[53] = o))
          : (o = E[53]),
        E[54] !== D || E[55] !== o
          ? ((d = (0, t.jsx)("span", { className: o, children: D })),
            (E[54] = D),
            (E[55] = o),
            (E[56] = d))
          : (d = E[56]),
        E[57] !== n || E[58] !== d
          ? ((A = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col gap-0.5",
              children: [n, d],
            })),
            (E[57] = n),
            (E[58] = d),
            (E[59] = A))
          : (A = E[59]),
        (y = "flex shrink-0 items-start gap-3 text-right"),
        E[60] !== G
          ? ((S = (0, p.c)("whitespace-nowrap", G)), (E[60] = G), (E[61] = S))
          : (S = E[61]),
        E[62] !== K || E[63] !== Q
          ? ((k = Q(K ? "common.closed" : "coin_details.position")),
            (E[62] = K),
            (E[63] = Q),
            (E[64] = k))
          : (k = E[64]),
        E[65] !== S || E[66] !== k
          ? ((I = (0, t.jsx)("span", { className: S, children: k })),
            (E[65] = S),
            (E[66] = k),
            (E[67] = I))
          : (I = E[67]),
        E[68] !== J
          ? ((H = (0, p.c)("whitespace-nowrap text-text-primary", J)),
            (E[68] = J),
            (E[69] = H))
          : (H = E[69]),
        E[70] !== X || E[71] !== B
          ? ((et = X ? (0, h.w)(B) : "—"),
            (E[70] = X),
            (E[71] = B),
            (E[72] = et))
          : (et = E[72]),
        E[73] !== H || E[74] !== et
          ? ((el = (0, t.jsx)("span", {
              className: H,
              "data-testid": "holding-row-value",
              children: et,
            })),
            (E[73] = H),
            (E[74] = et),
            (E[75] = el))
          : (el = E[75]),
        E[76] !== I || E[77] !== el
          ? ((j = (0, t.jsxs)("div", {
              className: "flex flex-col items-end gap-0.5",
              children: [I, el],
            })),
            (E[76] = I),
            (E[77] = el),
            (E[78] = j))
          : (j = E[78]),
        (_ = ee
          ? (0, t.jsxs)("div", {
              className: "flex flex-col items-end gap-0.5",
              children: [
                (0, t.jsx)("span", {
                  className: (0, p.c)("whitespace-nowrap", G),
                  children: Q("coin_details.profit"),
                }),
                (0, t.jsx)("span", {
                  className: (0, p.c)("whitespace-nowrap", J, ei),
                  "data-testid": "holding-row-pnl",
                  children: (0, r.u)(q),
                }),
              ],
            })
          : null),
        (E[4] = Z),
        (E[5] = V),
        (E[6] = J),
        (E[7] = ee),
        (E[8] = X),
        (E[9] = O),
        (E[10] = z),
        (E[11] = K),
        (E[12] = G),
        (E[13] = Y),
        (E[14] = $),
        (E[15] = T),
        (E[16] = L),
        (E[17] = F),
        (E[18] = q),
        (E[19] = M),
        (E[20] = R),
        (E[21] = D),
        (E[22] = Q),
        (E[23] = W),
        (E[24] = B),
        (E[25] = c),
        (E[26] = u),
        (E[27] = m),
        (E[28] = f),
        (E[29] = x),
        (E[30] = v),
        (E[31] = b),
        (E[32] = g),
        (E[33] = w),
        (E[34] = N),
        (E[35] = y),
        (E[36] = j),
        (E[37] = _),
        (E[38] = U),
        (E[39] = C),
        (E[40] = A),
        (E[41] = P));
    } else
      ((c = E[25]),
        (u = E[26]),
        (m = E[27]),
        (f = E[28]),
        (x = E[29]),
        (v = E[30]),
        (b = E[31]),
        (g = E[32]),
        (w = E[33]),
        (N = E[34]),
        (y = E[35]),
        (j = E[36]),
        (_ = E[37]),
        (U = E[38]),
        (C = E[39]),
        (A = E[40]),
        (P = E[41]));
    return (
      E[79] !== y || E[80] !== j || E[81] !== _
        ? ((S = (0, t.jsxs)("div", { className: y, children: [j, _] })),
          (E[79] = y),
          (E[80] = j),
          (E[81] = _),
          (E[82] = S))
        : (S = E[82]),
      E[83] !== S || E[84] !== U || E[85] !== C || E[86] !== A
        ? ((k = (0, t.jsxs)("div", { className: U, children: [C, A, S] })),
          (E[83] = S),
          (E[84] = U),
          (E[85] = C),
          (E[86] = A),
          (E[87] = k))
        : (k = E[87]),
      E[88] !== c ||
      E[89] !== u ||
      E[90] !== m ||
      E[91] !== f ||
      E[92] !== x ||
      E[93] !== v ||
      E[94] !== b ||
      E[95] !== g ||
      E[96] !== w ||
      E[97] !== N ||
      E[98] !== k ||
      E[99] !== P
        ? ((I = (0, t.jsx)(c, {
            id: P,
            ref: u,
            href: m,
            onClick: f,
            className: x,
            "data-testid": v,
            "data-appearance": b,
            "data-density": g,
            "data-nft": w,
            "data-status": N,
            children: k,
          })),
          (E[88] = c),
          (E[89] = u),
          (E[90] = m),
          (E[91] = f),
          (E[92] = x),
          (E[93] = v),
          (E[94] = b),
          (E[95] = g),
          (E[96] = w),
          (E[97] = N),
          (E[98] = k),
          (E[99] = P),
          (E[100] = I))
        : (I = E[100]),
      I
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          r,
          p,
          h,
          b,
          g,
          w,
          N,
          y,
          j,
          _ = (0, l.c)(55),
          {
            balance: U,
            isClosed: C,
            observeLiveRow: A,
            liveRowIdPrefix: P,
            isLastRow: S,
          } = e,
          { t: k } = (0, n.f)(),
          I = (0, d.f)(x),
          E = U.collectible;
        if (!E) return null;
        let M = void 0 !== P ? P + U.mint : void 0;
        _[0] !== E.name || _[1] !== I || _[2] !== k
          ? ((i = E.name ?? (I ? k("home.gacha.slab.slab_a11y") : null)),
            (_[0] = E.name),
            (_[1] = I),
            (_[2] = k),
            (_[3] = i))
          : (i = _[3]);
        let L = i;
        _[4] !== E.nftAddress || _[5] !== E.provider
          ? ((r = (0, u.o)(
              E.nftAddress,
              "profile",
              (0, c.W)(E.provider) ?? void 0,
            )),
            (_[4] = E.nftAddress),
            (_[5] = E.provider),
            (_[6] = r))
          : (r = _[6]);
        let O = r;
        _[7] !== E
          ? ((p = () => (0, f.C)((0, m.A)(E))), (_[7] = E), (_[8] = p))
          : (p = _[8]);
        let F = p,
          T = C ? null : U.quoteUnavailable ? E.markUsd : U.balanceUSD,
          R = U.pnl?.total_pnl.usd ?? null,
          z = U.pnl?.total_pnl.percent;
        _[9] !== z
          ? ((h = ((e) => {
              if (void 0 === e) return null;
              let t = Number(e);
              return Number.isFinite(t) ? t : null;
            })(z)),
            (_[9] = z),
            (_[10] = h))
          : (h = _[10]);
        let $ = h;
        (_[11] !== E.grade
          ? ((b = E.grade
              ? (0, t.jsx)(o.E, {
                  density: "comfortable",
                  "data-testid": "profile-collectible-row-grade",
                  children: E.grade,
                })
              : null),
            (_[11] = E.grade),
            (_[12] = b))
          : (b = _[12]),
          _[13] !== E.setName
            ? ((g = E.setName
                ? (0, t.jsx)("span", {
                    className: "min-w-0 truncate",
                    "data-testid": "profile-collectible-row-set",
                    children: E.setName,
                  })
                : null),
              (_[13] = E.setName),
              (_[14] = g))
            : (g = _[14]),
          _[15] !== b || _[16] !== g
            ? ((w = (0, t.jsxs)("span", {
                className: "flex min-w-0 items-center gap-2",
                children: [b, g],
              })),
              (_[15] = b),
              (_[16] = g),
              (_[17] = w))
            : (w = _[17]));
        let D = w;
        if ("list" === e.rowAppearance) {
          let l,
            i = E.status ?? void 0,
            n = E.image ?? void 0,
            s = e.density ?? "terminal";
          return (
            _[18] !== E.nftAddress ||
            _[19] !== O ||
            _[20] !== C ||
            _[21] !== L ||
            _[22] !== A ||
            _[23] !== F ||
            _[24] !== R ||
            _[25] !== M ||
            _[26] !== D ||
            _[27] !== n ||
            _[28] !== s ||
            _[29] !== i ||
            _[30] !== T
              ? ((l = (0, t.jsx)(v, {
                  rowId: M,
                  observeLiveRow: A,
                  href: O,
                  onPark: F,
                  nftAddress: E.nftAddress,
                  status: i,
                  image: n,
                  name: L,
                  subtitle: D,
                  valueUsd: T,
                  pnlUsd: R,
                  isClosed: C,
                  density: s,
                })),
                (_[18] = E.nftAddress),
                (_[19] = O),
                (_[20] = C),
                (_[21] = L),
                (_[22] = A),
                (_[23] = F),
                (_[24] = R),
                (_[25] = M),
                (_[26] = D),
                (_[27] = n),
                (_[28] = s),
                (_[29] = i),
                (_[30] = T),
                (_[31] = l))
              : (l = _[31]),
            l
          );
        }
        let B = E.status ?? void 0,
          q = void 0 !== S && S ? "border-b-0" : void 0,
          K = E.image ?? void 0;
        _[32] !== K
          ? ((N = (0, t.jsx)(s.f, {
              src: K,
              alt: "",
              className: "aspect-auto size-10 shrink-0 rounded-[10px]",
            })),
            (_[32] = K),
            (_[33] = N))
          : (N = _[33]);
        let V = C ? null : U.openedAt;
        return (
          _[34] !== U.updatedAt ||
          _[35] !== E.image ||
          _[36] !== E.nftAddress ||
          _[37] !== O ||
          _[38] !== C ||
          _[39] !== L ||
          _[40] !== $ ||
          _[41] !== R ||
          _[42] !== D ||
          _[43] !== q ||
          _[44] !== N ||
          _[45] !== V ||
          _[46] !== T
            ? ((y = (0, t.jsx)(a.d, {
                className: q,
                mint: E.nftAddress,
                href: O,
                name: L,
                symbol: null,
                imageUri: E.image,
                art: N,
                amount: null,
                valueUsd: T,
                pnlUsd: R,
                pnlPct: $,
                isClosed: C,
                closedAt: U.updatedAt,
                openedAt: V,
                subtitle: D,
              })),
              (_[34] = U.updatedAt),
              (_[35] = E.image),
              (_[36] = E.nftAddress),
              (_[37] = O),
              (_[38] = C),
              (_[39] = L),
              (_[40] = $),
              (_[41] = R),
              (_[42] = D),
              (_[43] = q),
              (_[44] = N),
              (_[45] = V),
              (_[46] = T),
              (_[47] = y))
            : (y = _[47]),
          _[48] !== E.nftAddress ||
          _[49] !== A ||
          _[50] !== F ||
          _[51] !== M ||
          _[52] !== y ||
          _[53] !== B
            ? ((j = (0, t.jsx)("div", {
                id: M,
                ref: A,
                className: a.K,
                "data-testid": "profile-collectible-row",
                "data-nft": E.nftAddress,
                "data-status": B,
                onClickCapture: F,
                children: y,
              })),
              (_[48] = E.nftAddress),
              (_[49] = A),
              (_[50] = F),
              (_[51] = M),
              (_[52] = y),
              (_[53] = B),
              (_[54] = j))
            : (j = _[54]),
          j
        );
      },
    ],
    652502,
  );
  var b = e.i(322315),
    g = e.i(254010),
    w = e.i(574472),
    N = e.i(223363),
    y = e.i(634741),
    j = e.i(77048),
    _ = e.i(51206);
  let U = (0, p.c)(
    (0, _.x)({ density: "comfortable", size: 20, variant: "ghost" }),
    "p-0",
  );
  var C = e.i(999139);
  let A = "-mr-1.5 -mt-1 size-6 shrink-0 self-start",
    P = (0, p.c)(
      (0, _.x)({ density: "comfortable", size: 24, variant: "ghost" }),
      A,
      "p-0",
    );
  function S(e) {
    let i,
      n = (0, l.c)(6),
      { share: s, variant: a } = e,
      r = "board" === (void 0 === a ? "card" : a);
    if (null == s) {
      let e;
      return (
        n[0] !== r
          ? ((e = r
              ? null
              : (0, t.jsx)("span", { "aria-hidden": !0, className: A })),
            (n[0] = r),
            (n[1] = e))
          : (e = n[1]),
        e
      );
    }
    let o = r ? U : P;
    return (
      n[2] !== s.data || n[3] !== s.sourceElement || n[4] !== o
        ? ((i = (0, t.jsx)(C.f, {
            data: s.data,
            sourceElement: s.sourceElement,
            className: o,
          })),
          (n[2] = s.data),
          (n[3] = s.sourceElement),
          (n[4] = o),
          (n[5] = i))
        : (i = n[5]),
      i
    );
  }
  e.s(["B", 0, "w-full pr-[30px]", "O", 0, S], 547613);
  var k = e.i(605255),
    I = e.i(541710),
    E = e.i(670550),
    M = e.i(130732),
    L = e.i(198825);
  let O = (0, p.c)(
    k.cr,
    "font-medium underline-offset-2 transition-colors hover:text-text-primary hover:underline",
  );
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          s,
          r,
          o,
          d,
          c,
          u,
          m,
          p,
          f,
          h = (0, l.c)(72),
          {
            balance: x,
            isClosed: v,
            isOwner: _,
            rowAppearance: U,
            density: C,
            hideShare: A,
            subtitle: P,
            observeLiveRow: k,
            liveRowIdPrefix: F,
            isLastRow: T,
          } = e,
          R = void 0 !== A && A,
          { t: z } = (0, n.f)(),
          { openWithdraw: $ } = (0, L.useConnectWallet)(),
          { shouldUsePrivy: D } = (0, w.F)(),
          B = (0, g.k)(b.D.WEB_NATIVE_CONVERT),
          q = (0, I.l)(),
          K = x.chainId;
        h[0] !== K
          ? ((i = null != K ? (0, E.A)(K) : null), (h[0] = K), (h[1] = i))
          : (i = h[1]);
        let V = i,
          Q = String(x.chainId),
          H = void 0 !== F ? F + x.mint : void 0,
          Z = v ? null : x.balance,
          W = v || x.quoteUnavailable ? null : Number(x.balanceUSD) || 0;
        h[2] !== x.balance ||
        h[3] !== q ||
        h[4] !== K ||
        h[5] !== v ||
        h[6] !== _
          ? ((s =
              _ && !v && x.balance > 0 && null != K && null !== (0, M.g)(K, q)),
            (h[2] = x.balance),
            (h[3] = q),
            (h[4] = K),
            (h[5] = v),
            (h[6] = _),
            (h[7] = s))
          : (s = h[7]);
        let Y = s;
        h[8] !== Y || h[9] !== K || h[10] !== $ || h[11] !== z
          ? ((r = Y
              ? (0, t.jsx)("button", {
                  type: "button",
                  onClick: () => {
                    null != K && $({ evmHoldingId: (0, E.U)(K) });
                  },
                  className: O,
                  "data-testid": "profile-native-gas-withdraw",
                  children: z("web.account.withdraw"),
                })
              : null),
            (h[8] = Y),
            (h[9] = K),
            (h[10] = $),
            (h[11] = z),
            (h[12] = r))
          : (r = h[12]);
        let G = r;
        h[13] !== x.balance ||
        h[14] !== K ||
        h[15] !== v ||
        h[16] !== B ||
        h[17] !== _ ||
        h[18] !== D
          ? ((o = B && !0 === D && _ && !v && x.balance > 0 && (0, E.d)(K)),
            (h[13] = x.balance),
            (h[14] = K),
            (h[15] = v),
            (h[16] = B),
            (h[17] = _),
            (h[18] = D),
            (h[19] = o))
          : (o = h[19]);
        let J = o;
        h[20] !== x.balance ||
        h[21] !== x.balanceUSD ||
        h[22] !== x.quoteUnavailable ||
        h[23] !== J ||
        h[24] !== K ||
        h[25] !== z
          ? ((d =
              J && null != K
                ? (0, t.jsx)("button", {
                    type: "button",
                    onClick: () =>
                      (0, j.b)({
                        chainId: K,
                        usdPrice: (0, E.D)({
                          balance: x.balance,
                          balanceUsd: x.balanceUSD,
                          quoteUnavailable: x.quoteUnavailable,
                        }),
                      }),
                    onPointerEnter: y.preloadNativeConvertDialog,
                    onFocus: y.preloadNativeConvertDialog,
                    className: O,
                    "data-testid": "profile-native-gas-convert",
                    children: z("common.convert"),
                  })
                : null),
            (h[20] = x.balance),
            (h[21] = x.balanceUSD),
            (h[22] = x.quoteUnavailable),
            (h[23] = J),
            (h[24] = K),
            (h[25] = z),
            (h[26] = d))
          : (d = h[26]);
        let X = d;
        h[27] !== X || h[28] !== G
          ? ((c =
              null === X
                ? G
                : (0, t.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [G, X],
                  })),
            (h[27] = X),
            (h[28] = G),
            (h[29] = c))
          : (c = h[29]);
        let ee = c;
        if ("holdings" === U) {
          let e,
            l,
            i,
            n = void 0 !== T && T ? "border-b-0" : void 0,
            s = V?.name,
            r = V?.symbol,
            o = V?.imageUri;
          h[30] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(S, { share: null, variant: "board" })),
              (h[30] = e))
            : (e = h[30]);
          let d = ee ?? void 0;
          return (
            h[31] !== Z ||
            h[32] !== x.mint ||
            h[33] !== x.updatedAt ||
            h[34] !== Q ||
            h[35] !== v ||
            h[36] !== P ||
            h[37] !== r ||
            h[38] !== o ||
            h[39] !== d ||
            h[40] !== n ||
            h[41] !== s ||
            h[42] !== W
              ? ((l = (0, t.jsx)(a.d, {
                  className: n,
                  mint: x.mint,
                  name: s,
                  symbol: r,
                  imageUri: o,
                  chainId: Q,
                  amount: Z,
                  valueUsd: W,
                  pnlUsd: null,
                  pnlPct: null,
                  isClosed: v,
                  closedAt: x.updatedAt,
                  subtitle: P,
                  actions: e,
                  footer: d,
                  interactive: !1,
                })),
                (h[31] = Z),
                (h[32] = x.mint),
                (h[33] = x.updatedAt),
                (h[34] = Q),
                (h[35] = v),
                (h[36] = P),
                (h[37] = r),
                (h[38] = o),
                (h[39] = d),
                (h[40] = n),
                (h[41] = s),
                (h[42] = W),
                (h[43] = l))
              : (l = h[43]),
            h[44] !== k || h[45] !== H || h[46] !== l
              ? ((i = (0, t.jsx)("div", {
                  id: H,
                  ref: k,
                  className: a.y,
                  "data-testid": "profile-native-gas-row",
                  children: l,
                })),
                (h[44] = k),
                (h[45] = H),
                (h[46] = l),
                (h[47] = i))
              : (i = h[47]),
            i
          );
        }
        h[48] !== R
          ? ((u = R ? void 0 : (0, t.jsx)(S, { share: null })),
            (h[48] = R),
            (h[49] = u))
          : (u = h[49]);
        let et = u,
          el = "list" === U,
          ei = el ? a.u : "block w-full py-1 text-left",
          en = el ? "row" : "elevated",
          es = el ? C : void 0,
          ea = V?.symbol,
          er = V?.name,
          eo = V?.imageUri,
          ed = x.updatedAt ?? null;
        return (
          h[50] !== ee
            ? ((m = ee
                ? (0, t.jsx)("div", { className: "pt-2", children: ee })
                : null),
              (h[50] = ee),
              (h[51] = m))
            : (m = h[51]),
          h[52] !== et ||
          h[53] !== Z ||
          h[54] !== x.mint ||
          h[55] !== Q ||
          h[56] !== v ||
          h[57] !== P ||
          h[58] !== en ||
          h[59] !== es ||
          h[60] !== ea ||
          h[61] !== er ||
          h[62] !== eo ||
          h[63] !== ed ||
          h[64] !== m ||
          h[65] !== W
            ? ((p = (0, t.jsx)(N.f, {
                variant: en,
                density: es,
                subtitle: P,
                mint: x.mint,
                symbol: ea,
                name: er,
                imageUri: eo,
                chainId: Q,
                heldAmount: Z,
                positionUsd: W,
                isClosed: v,
                closedAt: ed,
                netPnlUsd: null,
                actions: et,
                className: "w-full",
                children: m,
              })),
              (h[52] = et),
              (h[53] = Z),
              (h[54] = x.mint),
              (h[55] = Q),
              (h[56] = v),
              (h[57] = P),
              (h[58] = en),
              (h[59] = es),
              (h[60] = ea),
              (h[61] = er),
              (h[62] = eo),
              (h[63] = ed),
              (h[64] = m),
              (h[65] = W),
              (h[66] = p))
            : (p = h[66]),
          h[67] !== k || h[68] !== H || h[69] !== p || h[70] !== ei
            ? ((f = (0, t.jsx)("div", {
                id: H,
                ref: k,
                className: ei,
                "data-testid": "profile-native-gas-row",
                children: p,
              })),
              (h[67] = k),
              (h[68] = H),
              (h[69] = p),
              (h[70] = ei),
              (h[71] = f))
            : (f = h[71]),
          f
        );
      },
    ],
    336700,
  );
  var F = e.i(745018),
    T = e.i(592209),
    R = e.i(243719);
  let z = (e) => {
    if (null === e) return null;
    let t = "string" == typeof e ? Number(e) : e;
    return Number.isFinite(t) && t > 0 ? e : null;
  };
  function $(e) {
    let i,
      s,
      a = (0, l.c)(8),
      { marginUsd: o, entryPx: d, markPx: c, testId: u } = e,
      { t: m, i18n: p } = (0, n.f)();
    if (
      a[0] !== d ||
      a[1] !== p.language ||
      a[2] !== o ||
      a[3] !== c ||
      a[4] !== m ||
      a[5] !== u
    ) {
      s = Symbol.for("react.early_return_sentinel");
      e: {
        let e = (0, T.v)(p.language) ?? T.T,
          l = null !== o && Number.isFinite(o) && o > 0 ? o : null,
          n = z(d),
          a = z(c);
        if (null === l && null === n && null === a) {
          s = null;
          break e;
        }
        i = (0, t.jsxs)("div", {
          "data-testid": u,
          className:
            "flex w-full items-center justify-between gap-x-3 whitespace-nowrap text-xs leading-4",
          children: [
            null !== l
              ? (0, t.jsxs)("span", {
                  className: "flex items-center gap-1",
                  children: [
                    (0, t.jsx)("span", {
                      className: "text-text-tertiary",
                      children: m("callouts.position_card.spent_label"),
                    }),
                    (0, t.jsx)("span", {
                      className: "font-medium text-text-secondary",
                      "data-testid": u ? `${u}-spent` : void 0,
                      children: (0, r.l)(l),
                    }),
                  ],
                })
              : (0, t.jsx)("span", {}),
            null !== n || null !== a
              ? (0, t.jsxs)("span", {
                  className: "flex items-center justify-end gap-1",
                  children: [
                    null !== n
                      ? (0, t.jsxs)("span", {
                          className: "flex items-center gap-1",
                          children: [
                            (0, t.jsx)("span", {
                              className: "text-text-tertiary",
                              children: m(
                                "callouts.position_card.avg_entry_label",
                              ),
                            }),
                            (0, t.jsx)("span", {
                              className:
                                "font-medium text-text-secondary tabular-nums",
                              "data-testid": u ? `${u}-entry` : void 0,
                              children: (0, R.Q)({ px: n, locale: e }),
                            }),
                          ],
                        })
                      : null,
                    null !== n && null !== a
                      ? (0, t.jsx)(F.A3, {
                          "aria-hidden": !0,
                          className: "size-3 shrink-0 text-text-tertiary",
                        })
                      : null,
                    null !== a
                      ? (0, t.jsx)("span", {
                          className:
                            "font-medium text-text-secondary tabular-nums",
                          "data-testid": u ? `${u}-mark` : void 0,
                          children: (0, R.Q)({ px: a, locale: e }),
                        })
                      : null,
                  ],
                })
              : null,
          ],
        });
      }
      ((a[0] = d),
        (a[1] = p.language),
        (a[2] = o),
        (a[3] = c),
        (a[4] = m),
        (a[5] = u),
        (a[6] = i),
        (a[7] = s));
    } else ((i = a[6]), (s = a[7]));
    return s !== Symbol.for("react.early_return_sentinel") ? s : i;
  }
  var D = e.i(931333),
    B = e.i(499141),
    q = e.i(21617);
  let K = (e) => {
    let t = "string" == typeof e ? Number(e) : e;
    return null !== t && Number.isFinite(t) && t > 0 ? t : null;
  };
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          r,
          d,
          c,
          u,
          m,
          f,
          h,
          x,
          v,
          b,
          g,
          w,
          y,
          j,
          _,
          U,
          C,
          A,
          P,
          I,
          E,
          M,
          L,
          O,
          F,
          z,
          V,
          Q,
          H,
          Z,
          W,
          Y,
          G,
          J = (0, l.c)(118),
          {
            balance: X,
            observeLiveRow: ee,
            liveRowIdPrefix: et,
            hideShare: el,
            isLastRow: ei,
            rowAppearance: en,
            viewMode: es,
            density: ea,
          } = e,
          er = void 0 !== el && el,
          eo = void 0 !== ei && ei,
          { t: ed, i18n: ec } = (0, n.f)(),
          eu = X.perp;
        if (!eu) return null;
        if (
          J[0] !== X.mint ||
          J[1] !== ea ||
          J[2] !== er ||
          J[3] !== ec.language ||
          J[4] !== eo ||
          J[5] !== et ||
          J[6] !== ee ||
          J[7] !== eu.coin ||
          J[8] !== eu.displayName ||
          J[9] !== eu.entryPx ||
          J[10] !== eu.equityUsd ||
          J[11] !== eu.imageUri ||
          J[12] !== eu.leverage ||
          J[13] !== eu.marginUsd ||
          J[14] !== eu.markPx ||
          J[15] !== eu.notionalUsd ||
          J[16] !== eu.openedAt ||
          J[17] !== eu.side ||
          J[18] !== eu.sizeCoins ||
          J[19] !== eu.stateAsOf ||
          J[20] !== eu.ticker ||
          J[21] !== eu.unrealizedPnlPct ||
          J[22] !== eu.unrealizedPnlUsd ||
          J[23] !== en ||
          J[24] !== ed ||
          J[25] !== es
        ) {
          M = Symbol.for("react.early_return_sentinel");
          e: {
            let e,
              l,
              n,
              Z = (0, T.v)(ec.language) ?? T.T,
              W = void 0 !== et ? et + X.mint : void 0,
              Y = "long" === eu.side,
              G = null !== eu.stateAsOf,
              el = K(eu.entryPx),
              ei = G ? K(eu.markPx) : null,
              em = G ? eu.marginUsd : null,
              ep = Y ? "gain" : "loss";
            (J[56] !== Y || J[57] !== eu.leverage || J[58] !== ed
              ? ((e = ed("web.perps.market.position_badge", {
                  leverage: eu.leverage,
                  side: ed(
                    Y
                      ? "web.perps.market.side_long"
                      : "web.perps.market.side_short",
                  ),
                })),
                (J[56] = Y),
                (J[57] = eu.leverage),
                (J[58] = ed),
                (J[59] = e))
              : (e = J[59]),
              J[60] !== ep || J[61] !== e
                ? ((l = (0, t.jsx)(o.E, {
                    density: "comfortable",
                    tone: ep,
                    "data-testid": "profile-perp-row-side",
                    children: e,
                  })),
                  (J[60] = ep),
                  (J[61] = e),
                  (J[62] = l))
                : (l = J[62]));
            let ef = l;
            if (
              (J[63] !== er
                ? ((n = er
                    ? void 0
                    : (0, t.jsx)(S, { share: null, variant: "board" })),
                  (J[63] = er),
                  (J[64] = n))
                : (n = J[64]),
              (r = n),
              "list" === en && "compressed" === es)
            ) {
              let e, l, n, s;
              (J[65] !== eu.coin
                ? ((e = (0, B.o)(eu.coin)), (J[65] = eu.coin), (J[66] = e))
                : (e = J[66]),
                J[67] !== eu.displayName
                  ? ((l = (0, t.jsx)("span", {
                      className: "truncate",
                      children: eu.displayName,
                    })),
                    (J[67] = eu.displayName),
                    (J[68] = l))
                  : (l = J[68]),
                J[69] !== ef || J[70] !== l
                  ? ((n = (0, t.jsxs)("span", {
                      className: "flex min-w-0 items-center gap-2",
                      children: [l, ef],
                    })),
                    (J[69] = ef),
                    (J[70] = l),
                    (J[71] = n))
                  : (n = J[71]));
              let o = (0, t.jsx)(N.f, {
                variant: "row",
                density: ea ?? "terminal",
                mint: eu.coin,
                symbol: eu.ticker,
                name: eu.displayName,
                imageUri: eu.imageUri,
                chainId: q.g,
                heldAmount: Number(eu.sizeCoins),
                positionUsd: G ? eu.equityUsd : null,
                netPnlUsd: eu.unrealizedPnlUsd,
                subtitle: n,
                actions: r,
                className: "w-full",
                children: (0, t.jsx)($, {
                  marginUsd: em,
                  entryPx: el,
                  markPx: ei,
                  testId: "profile-perp-row-basis",
                }),
              });
              (J[72] !== ee ||
              J[73] !== eu.coin ||
              J[74] !== eu.side ||
              J[75] !== W ||
              J[76] !== e ||
              J[77] !== o
                ? ((s = (0, t.jsx)(i.default, {
                    id: W,
                    ref: ee,
                    href: e,
                    prefetch: !1,
                    className: a.f,
                    "data-testid": "profile-perp-row",
                    "data-appearance": "list",
                    "data-coin": eu.coin,
                    "data-side": eu.side,
                    children: o,
                  })),
                  (J[72] = ee),
                  (J[73] = eu.coin),
                  (J[74] = eu.side),
                  (J[75] = W),
                  (J[76] = e),
                  (J[77] = o),
                  (J[78] = s))
                : (s = J[78]),
                (M = s));
              break e;
            }
            ((_ = W),
              (U = ee),
              (C = a.K),
              (A = "profile-perp-row"),
              (P = "board"),
              (I = eu.coin),
              (E = eu.side),
              (s = a.d),
              (V = eo ? "border-b-0" : void 0),
              (Q = eu.coin),
              J[79] !== eu.coin
                ? ((H = (0, B.o)(eu.coin)), (J[79] = eu.coin), (J[80] = H))
                : (H = J[80]),
              (d = eu.displayName),
              (c = eu.ticker),
              (u = eu.imageUri),
              (m = q.g),
              (f = Number(eu.sizeCoins)),
              (h = eu.notionalUsd),
              (x = em),
              (v = null === ei ? void 0 : (0, R.Q)({ px: ei, locale: Z })),
              (b =
                null === el
                  ? void 0
                  : ed("web.chart.avg_entry_line", {
                      market_cap: (0, R.Q)({ px: el, locale: Z }),
                    })),
              (g = eu.unrealizedPnlUsd),
              (y = G ? eu.unrealizedPnlPct : null),
              (j = eu.openedAt),
              (F = "flex min-w-0 items-center gap-2"),
              (z = ef),
              J[81] === Symbol.for("react.memo_cache_sentinel")
                ? ((L = (0, p.c)(k.cr, "truncate tabular-nums")), (J[81] = L))
                : (L = J[81]),
              (O = "profile-perp-row-size"),
              (w = (0, D.$)({ size: eu.sizeCoins, locale: Z })));
          }
          ((J[0] = X.mint),
            (J[1] = ea),
            (J[2] = er),
            (J[3] = ec.language),
            (J[4] = eo),
            (J[5] = et),
            (J[6] = ee),
            (J[7] = eu.coin),
            (J[8] = eu.displayName),
            (J[9] = eu.entryPx),
            (J[10] = eu.equityUsd),
            (J[11] = eu.imageUri),
            (J[12] = eu.leverage),
            (J[13] = eu.marginUsd),
            (J[14] = eu.markPx),
            (J[15] = eu.notionalUsd),
            (J[16] = eu.openedAt),
            (J[17] = eu.side),
            (J[18] = eu.sizeCoins),
            (J[19] = eu.stateAsOf),
            (J[20] = eu.ticker),
            (J[21] = eu.unrealizedPnlPct),
            (J[22] = eu.unrealizedPnlUsd),
            (J[23] = en),
            (J[24] = ed),
            (J[25] = es),
            (J[26] = s),
            (J[27] = r),
            (J[28] = d),
            (J[29] = c),
            (J[30] = u),
            (J[31] = m),
            (J[32] = f),
            (J[33] = h),
            (J[34] = x),
            (J[35] = v),
            (J[36] = b),
            (J[37] = g),
            (J[38] = w),
            (J[39] = y),
            (J[40] = j),
            (J[41] = _),
            (J[42] = U),
            (J[43] = C),
            (J[44] = A),
            (J[45] = P),
            (J[46] = I),
            (J[47] = E),
            (J[48] = M),
            (J[49] = L),
            (J[50] = O),
            (J[51] = F),
            (J[52] = z),
            (J[53] = V),
            (J[54] = Q),
            (J[55] = H));
        } else
          ((s = J[26]),
            (r = J[27]),
            (d = J[28]),
            (c = J[29]),
            (u = J[30]),
            (m = J[31]),
            (f = J[32]),
            (h = J[33]),
            (x = J[34]),
            (v = J[35]),
            (b = J[36]),
            (g = J[37]),
            (w = J[38]),
            (y = J[39]),
            (j = J[40]),
            (_ = J[41]),
            (U = J[42]),
            (C = J[43]),
            (A = J[44]),
            (P = J[45]),
            (I = J[46]),
            (E = J[47]),
            (M = J[48]),
            (L = J[49]),
            (O = J[50]),
            (F = J[51]),
            (z = J[52]),
            (V = J[53]),
            (Q = J[54]),
            (H = J[55]));
        if (M !== Symbol.for("react.early_return_sentinel")) return M;
        let em = `${w} ${eu.ticker}`;
        return (
          J[82] !== L || J[83] !== em || J[84] !== O
            ? ((Z = (0, t.jsx)("span", {
                className: L,
                "data-testid": O,
                children: em,
              })),
              (J[82] = L),
              (J[83] = em),
              (J[84] = O),
              (J[85] = Z))
            : (Z = J[85]),
          J[86] !== Z || J[87] !== F || J[88] !== z
            ? ((W = (0, t.jsxs)("span", { className: F, children: [z, Z] })),
              (J[86] = Z),
              (J[87] = F),
              (J[88] = z),
              (J[89] = W))
            : (W = J[89]),
          J[90] !== s ||
          J[91] !== r ||
          J[92] !== d ||
          J[93] !== c ||
          J[94] !== u ||
          J[95] !== m ||
          J[96] !== f ||
          J[97] !== h ||
          J[98] !== x ||
          J[99] !== v ||
          J[100] !== b ||
          J[101] !== g ||
          J[102] !== y ||
          J[103] !== j ||
          J[104] !== W ||
          J[105] !== V ||
          J[106] !== Q ||
          J[107] !== H
            ? ((Y = (0, t.jsx)(s, {
                className: V,
                mint: Q,
                href: H,
                name: d,
                symbol: c,
                imageUri: u,
                chainId: m,
                amount: f,
                valueUsd: h,
                spentUsd: x,
                originFigure: v,
                originLine: b,
                pnlUsd: g,
                pnlPct: y,
                openedAt: j,
                subtitle: W,
                actions: r,
              })),
              (J[90] = s),
              (J[91] = r),
              (J[92] = d),
              (J[93] = c),
              (J[94] = u),
              (J[95] = m),
              (J[96] = f),
              (J[97] = h),
              (J[98] = x),
              (J[99] = v),
              (J[100] = b),
              (J[101] = g),
              (J[102] = y),
              (J[103] = j),
              (J[104] = W),
              (J[105] = V),
              (J[106] = Q),
              (J[107] = H),
              (J[108] = Y))
            : (Y = J[108]),
          J[109] !== _ ||
          J[110] !== U ||
          J[111] !== C ||
          J[112] !== A ||
          J[113] !== P ||
          J[114] !== I ||
          J[115] !== E ||
          J[116] !== Y
            ? ((G = (0, t.jsx)("div", {
                id: _,
                ref: U,
                className: C,
                "data-testid": A,
                "data-appearance": P,
                "data-coin": I,
                "data-side": E,
                children: Y,
              })),
              (J[109] = _),
              (J[110] = U),
              (J[111] = C),
              (J[112] = A),
              (J[113] = P),
              (J[114] = I),
              (J[115] = E),
              (J[116] = Y),
              (J[117] = G))
            : (G = J[117]),
          G
        );
      },
    ],
    453248,
  );
  var V = e.i(595673),
    Q = e.i(786740);
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          s,
          a,
          r,
          o = (0, l.c)(9),
          { mint: d, sourceElement: c } = e,
          { t: u } = (0, n.f)();
        o[0] !== d || o[1] !== c
          ? ((i = (e) => {
              (e.preventDefault(),
                e.stopPropagation(),
                (0, Q.d)(d),
                (0, V.Sl)({ mint: d, sourceElement: c }));
            }),
            (o[0] = d),
            (o[1] = c),
            (o[2] = i))
          : (i = o[2]);
        let m = i;
        return (
          o[3] !== u
            ? ((s = u("coin_details.actions.copy_contract_address")),
              (o[3] = u),
              (o[4] = s))
            : (s = o[4]),
          o[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((a = (0, t.jsx)(F.xR, {})), (o[5] = a))
            : (a = o[5]),
          o[6] !== m || o[7] !== s
            ? ((r = (0, t.jsx)("button", {
                type: "button",
                onClick: m,
                "aria-label": s,
                "data-testid": "profile-position-copy-ca",
                className: U,
                children: a,
              })),
              (o[6] = m),
              (o[7] = s),
              (o[8] = r))
            : (r = o[8]),
          r
        );
      },
    ],
    510861,
  );
  var H = e.i(362324),
    Z = e.i(957487),
    W = e.i(459177),
    Y = e.i(582453),
    G = e.i(653805);
  let J = [];
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          i = (0, l.c)(6),
          {
            rows: n,
            dustFloorUsd: s,
            pricedAtByMint: a,
            fallbackPricedAtMs: r,
            enabled: o,
          } = e;
        return (
          i[0] !== s || i[1] !== o || i[2] !== r || i[3] !== a || i[4] !== n
            ? ((t = (e) =>
                o && 0 !== n.length
                  ? n.map((t) => {
                      let { position: l, balance: i } = t,
                        n = (0, W.C)({
                          entry: e.coins[i.mint],
                          pricedAtMs: a.get((0, Y.f)(i.mint))?.pricedAtMs ?? r,
                          isEvm: i.mint.startsWith("0x"),
                          anchorMarketCapUsd: i.liveAnchorMarketCapUsd,
                          anchorSupplyUi: i.liveAnchorSupplyUi,
                          positionUsd: l.valueUsd ?? null,
                        });
                      return (0, Z.m)(l, s, n);
                    })
                  : J),
              (i[0] = s),
              (i[1] = o),
              (i[2] = r),
              (i[3] = a),
              (i[4] = n),
              (i[5] = t))
            : (t = i[5]),
          (0, G.x)((0, H.f)(t))
        );
      },
    ],
    478957,
  );
  var X = e.i(930519),
    ee = e.i(646908),
    et = e.i(987425);
  function el(e) {
    return e.updateCoin;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          i,
          n,
          s = (0, l.c)(10),
          {
            mint: a,
            chainId: r,
            anchorMarketCapUsd: o,
            anchorSupplyUi: d,
            pricedAtMs: c,
            positionUsd: u,
            pnlUsd: m,
            enabled: p,
            isVisible: f,
          } = e,
          h = !(0, ee.B)(r) && a.startsWith("0x"),
          x = p && void 0 !== o,
          v = (0, G.x)(el);
        s[0] !== a || s[1] !== v
          ? ((t = (e) => {
              let t = Number(e.priceUsd),
                l = Number(e.marketCap);
              if (!(t > 0) && !(l > 0)) return;
              let i =
                e.timestamp instanceof Date
                  ? e.timestamp.getTime()
                  : Date.parse(e.timestamp);
              v(a, {
                ...(l > 0
                  ? { usdMarketCap: l, priceUsd: t > 0 ? t : void 0 }
                  : { priceUsd: t }),
                lastTradeTimestamp: Number.isFinite(i) ? i : Date.now(),
                lastTradeIsBuy: "buy" === e.type,
              });
            }),
            (s[0] = a),
            (s[1] = v),
            (s[2] = t))
          : (t = s[2]);
        let b = t;
        ((0, X.f)({
          mint: a,
          chainId: h ? (0, et.f)(r) : null,
          isEnabled: x && h && f,
          onTrade: b,
        }),
          s[3] !== x || s[4] !== a
            ? ((i = (e) => (x ? e.coins[a] : void 0)),
              (s[3] = x),
              (s[4] = a),
              (s[5] = i))
            : (i = s[5]));
        let g = (0, G.x)(i),
          w = (0, W.p)({
            entry: g,
            pricedAtMs: c,
            isEvm: h,
            anchorSupplyUi: d,
          }),
          N = (0, W.t)({
            baseMarketCapUsd: x ? o : void 0,
            liveMarketCapUsd: w,
            positionUsd: u,
            pnlUsd: m,
          }),
          y = N.positionUsd ?? u,
          j = x ? w : void 0;
        return (
          s[6] !== N.pnlUsd || s[7] !== y || s[8] !== j
            ? ((n = { positionUsd: y, pnlUsd: N.pnlUsd, liveMarketCapUsd: j }),
              (s[6] = N.pnlUsd),
              (s[7] = y),
              (s[8] = j),
              (s[9] = n))
            : (n = s[9]),
          n
        );
      },
    ],
    123328,
  );
  var ei = e.i(352386);
  let en = new Map(),
    es = (e, t) =>
      e.valueUsd === t.valueUsd &&
      e.pnlUsd === t.pnlUsd &&
      e.amountHeld === t.amountHeld;
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let i,
          n,
          s = (0, l.c)(4),
          [a, r] = (0, ei.useState)(en);
        return (
          s[0] !== t || s[1] !== e
            ? ((i = () => {
                r((l) => {
                  let i = new Map(),
                    n = l.size !== e.length;
                  for (let s of e) {
                    let e = (0, Y.f)(s.coinMint),
                      a = l.get(e);
                    if (void 0 !== a && es(a, s)) {
                      i.set(e, a);
                      continue;
                    }
                    ((n = !0),
                      i.set(e, {
                        valueUsd: s.valueUsd,
                        pnlUsd: s.pnlUsd,
                        amountHeld: s.amountHeld,
                        pricedAtMs: t,
                      }));
                  }
                  return n ? i : l;
                });
              }),
              (n = [e, t]),
              (s[0] = t),
              (s[1] = e),
              (s[2] = i),
              (s[3] = n))
            : ((i = s[2]), (n = s[3])),
          (0, ei.useEffect)(i, n),
          a
        );
      },
    ],
    302515,
  );
  var ea = e.i(132838),
    er = e.i(606933),
    eo = e.i(768359),
    ed = e.i(947305),
    ec = e.i(759257);
  let eu = (e, t, l) =>
    e
      ? {
          ...e,
          pages: e.pages.map((e) => ({
            ...e,
            positions: e.positions.map((e) =>
              e.coinMint === t ? { ...e, userMarkedNonSpam: l } : e,
            ),
          })),
        }
      : e;
  async function em(e) {
    await (0, ec.j)()("POST /user-portfolio/non-spam/{mint}", {
      params: { mint: e },
      credentials: "include",
      parseJson: ef,
      throwHttpErrors: !1,
      hooks: { afterResponse: [ep] },
    });
  }
  function ep(e, t, l) {
    if (!l.ok) throw Error(`Failed to mark position as not spam: ${l.status}`);
  }
  function ef() {}
  (e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          i = (0, l.c)(3),
          n = (0, er.useQueryClient)();
        return (
          i[0] !== e || i[1] !== n
            ? ((t = {
                mutationFn: em,
                onMutate: async (t) => {
                  if (!e) return;
                  let l = eo.m.subject(e),
                    i = (0, ed.F)(e);
                  await Promise.all([
                    n.cancelQueries({ queryKey: l }),
                    n.cancelQueries({ queryKey: i }),
                  ]);
                  let s = (0, ed.m)(n.getQueryData(i), t);
                  return (
                    n.setQueriesData({ queryKey: l }, (e) => eu(e, t, !0)),
                    n.setQueryData(i, (e) => (0, ed.Y)(e, t)),
                    { wasInSpamSet: s }
                  );
                },
                onError: (t, l, i) => {
                  e &&
                    (n.setQueriesData({ queryKey: eo.m.subject(e) }, (e) =>
                      eu(e, l, !1),
                    ),
                    i?.wasInSpamSet &&
                      n.setQueryData((0, ed.F)(e), (e) => (0, ed.r)(e, l)));
                },
                onSuccess: () => {
                  e &&
                    (n.invalidateQueries({
                      queryKey: eo.m.subject(e),
                      refetchType: "none",
                    }),
                    n.invalidateQueries({
                      queryKey: (0, ed.F)(e),
                      refetchType: "none",
                    }));
                },
              }),
              (i[0] = e),
              (i[1] = n),
              (i[2] = t))
            : (t = i[2]),
          (0, ea.f)(t)
        );
      },
    ],
    291902,
  ),
    e.s(
      [
        "I",
        0,
        (e, t) =>
          !t || (!0 !== e.isExited && (e.amountHeld ?? 0) > 0)
            ? e
            : {
                ...e,
                pnlUsd: t.pnlUsd,
                realizedPnlUsd: t.pnlUsd,
                pnlPercentage: t.pnlPercentage,
              },
        "g",
        0,
        (e) => {
          if (!e?.realized || (e.unrealized?.amount_held ?? 0) > 0) return null;
          let t = e.realized.pnl?.usd;
          if ("number" != typeof t || !Number.isFinite(t)) return null;
          let l = e.realized.percentage?.usd;
          return {
            pnlUsd: t,
            pnlPercentage:
              "number" == typeof l && Number.isFinite(l) ? l : null,
          };
        },
      ],
      127879,
    ));
};
