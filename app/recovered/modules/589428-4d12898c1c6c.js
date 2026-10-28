// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n,
    i = e.i(732486),
    r = e.i(445242),
    a = e.i(254667),
    s = e.i(574472),
    l = e.i(136354),
    o = e.i(352386),
    c = e.i(149502),
    d = e.i(350741);
  e.i(12692);
  var u = e.i(398902),
    m = e.i(63289),
    f = e.i(21384),
    p = e.i(236810),
    h = e.i(952366),
    g = e.i(356647),
    y = e.i(266300),
    x = e.i(779642);
  function v(e) {
    return e.explicitSignIn;
  }
  function b(e) {
    return e.pendingLogin;
  }
  function _() {
    return (0, y.o)() || null !== (0, x.h)() || (0, x.B)();
  }
  let w = () => {
    let e,
      t = (0, r.c)(2),
      { reader: n } = (() => {
        let e,
          t,
          n,
          i,
          l,
          c,
          y = (0, r.c)(28),
          { t: w } = (0, u.f)(),
          I = (0, d.s)(),
          { shouldUsePrivy: j, loginLoading: E, logout: k } = (0, s.F)(),
          { method: N, reader: S } = (0, f.f)(),
          { recentAuthMethod: C, recentAuthMethodReady: U } = (0, h.Z)(),
          R = I?.address;
        (y[0] !== R || y[1] !== N || y[2] !== j
          ? ((e = !!R && !j && (0, g.l)(N)),
            (y[0] = R),
            (y[1] = N),
            (y[2] = j),
            (y[3] = e))
          : (e = y[3]),
          y[4] !== R || y[5] !== e
            ? ((t = { address: R, enabled: e }),
              (y[4] = R),
              (y[5] = e),
              (y[6] = t))
            : (t = y[6]));
        let { data: P } = (0, p.f)(t),
          L = U && (C?.kind === "email" || C?.kind === "oauth");
        y[7] !== R ||
        y[8] !== P ||
        y[9] !== E ||
        y[10] !== N ||
        y[11] !== L ||
        y[12] !== j
          ? ((n =
              !R || j || E
                ? null
                : (0, g._)({
                    method: N,
                    linkStatus: P,
                    rememberedPrivyLogin: L,
                  })),
            (y[7] = R),
            (y[8] = P),
            (y[9] = E),
            (y[10] = N),
            (y[11] = L),
            (y[12] = j),
            (y[13] = n))
          : (n = y[13]);
        let A = n,
          T = (0, o.useRef)(null),
          O = (0, x.i)(v),
          z = (0, x.i)(b);
        return (
          y[14] !== R || y[15] !== k || y[16] !== A || y[17] !== w
            ? ((i = () => {
                if (!A || !R || T.current === R) return;
                let e = 0,
                  t = () => {
                    _()
                      ? n()
                      : ((T.current = R),
                        a.y.warn(
                          "Ending the pump session: its Privy login lapsed",
                          {
                            reason: A,
                            surface: "lapsed_privy_session_sign_out",
                          },
                        ),
                        k().then(
                          () => {
                            m.c.info(w("web.auth.session_lapsed_signed_out"));
                          },
                          (e) => {
                            a.y.error("Ending a lapsed pump session failed", {
                              reason: A,
                              error: e instanceof Error ? e.message : String(e),
                            });
                          },
                        ));
                  },
                  n = () => {
                    e = _()
                      ? window.setTimeout(n, 15e3)
                      : window.setTimeout(t, 3e3);
                  };
                return (n(), () => window.clearTimeout(e));
              }),
              (y[14] = R),
              (y[15] = k),
              (y[16] = A),
              (y[17] = w),
              (y[18] = i))
            : (i = y[18]),
          y[19] !== R ||
          y[20] !== O ||
          y[21] !== k ||
          y[22] !== z ||
          y[23] !== A ||
          y[24] !== w
            ? ((l = [A, R, k, w, O, z]),
              (y[19] = R),
              (y[20] = O),
              (y[21] = k),
              (y[22] = z),
              (y[23] = A),
              (y[24] = w),
              (y[25] = l))
            : (l = y[25]),
          (0, o.useEffect)(i, l),
          y[26] !== S
            ? ((c = { reader: S }), (y[26] = S), (y[27] = c))
            : (c = y[27]),
          c
        );
      })();
    return (
      t[0] !== n
        ? ((e = (0, i.jsx)(i.Fragment, { children: n })),
          (t[0] = n),
          (t[1] = e))
        : (e = t[1]),
      e
    );
  };
  var I = e.i(292686),
    j = e.i(932177),
    E = e.i(754395),
    k = e.i(466931),
    N = e.i(595673);
  let S = () => {
    let e,
      t,
      n = (0, r.c)(4),
      { t: i } = (0, u.f)(),
      { privySignInError: a } = (0, s.F)(),
      l = (0, o.useRef)(!1);
    return (
      n[0] !== a || n[1] !== i
        ? ((e = () => {
            if (!a) {
              l.current = !1;
              return;
            }
            if (l.current) return;
            l.current = !0;
            let e = i(E.f[a]);
            (0, j._)(a) &&
            ((0, k.B)({
              name: "privy-mfa-prompt",
              feature: "auth",
              operation: a.slice(4),
              context: { surface: "sign_in" },
            }),
            "mfa_cancelled" === a)
              ? m.c.info(e)
              : (m.c.error(e),
                (0, N.Wz)({
                  authMethod: I.pi.PRIVY,
                  authVariant: I.LF.V2,
                  flowType: I.LB.LOGIN,
                  errorCategory: I.TF.PROVIDER,
                  errorReason: `signin_stopped_${a}`,
                }),
                (0, k.l)({
                  error: Error(`Privy sign-in stopped: ${a}`),
                  feature: "auth",
                  operation: "privy-sign-in-stopped",
                  context: { reason: a },
                }));
          }),
          (t = [a, i]),
          (n[0] = a),
          (n[1] = i),
          (n[2] = e),
          (n[3] = t))
        : ((e = n[2]), (t = n[3])),
      (0, o.useEffect)(e, t),
      null
    );
  };
  var C = e.i(599077),
    U = e.i(331809),
    R = e.i(745018),
    P = e.i(439587),
    L = e.i(453706),
    A = e.i(458310),
    T = e.i(338871),
    O = e.i(396466),
    z = e.i(198825),
    B = e.i(248208),
    F = e.i(187611),
    D = e.i(955332);
  let $ = (0, L.default)(() => e.A(484255).then((e) => e.LinkLoginDialog), {
      loadableGenerated: { modules: [168953] },
      ssr: !1,
    }),
    K = () => {
      let e,
        t,
        n,
        a,
        l,
        c,
        d,
        m,
        p,
        h,
        y,
        x,
        v,
        b,
        _,
        w,
        j,
        E,
        k,
        S,
        U,
        L,
        K,
        V,
        M,
        H,
        W,
        X,
        Q,
        q,
        G,
        J,
        Y,
        Z,
        ee,
        et,
        en,
        ei,
        er = (0, r.c)(96),
        { t: ea } = (0, u.f)(),
        es = (0, O.f)(),
        el = (0, C.usePathname)(),
        { address: eo, logout: ec } = (0, s.F)(),
        { method: ed, reader: eu } = (0, f.f)(),
        {
          showLinkLogin: em,
          setShowLinkLogin: ef,
          setShowWallet: ep,
        } = (0, z.useConnectWallet)(),
        { toggleChat: eh, isBooting: eg } = (0, T.f)(),
        [ey, ex] = (0, o.useState)(!1),
        ev = (0, o.useRef)(!1);
      (er[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = () => {
            ev.current ||
              ((ev.current = !0),
              (0, N.yt)({ surface: "wall", interactionType: "seen" }));
          }),
          (t = []),
          (er[0] = e),
          (er[1] = t))
        : ((e = er[0]), (t = er[1])),
        (0, o.useEffect)(e, t));
      let eb = "external" === ed.kind && ed.walletName ? ed.walletName : void 0;
      er[2] !== ef
        ? ((n = () => {
            ((0, N.yt)({
              surface: "wall",
              interactionType: "cta",
              cta: "link",
            }),
              ef(!0));
          }),
          (er[2] = ef),
          (er[3] = n))
        : (n = er[3]);
      let e_ = n;
      er[4] !== eo || er[5] !== ec || er[6] !== ep || er[7] !== ey
        ? ((a = async () => {
            if (ey) return;
            (ex(!0),
              (0, N.yt)({
                surface: "wall",
                interactionType: "cta",
                cta: "switch_login",
              }));
            let e = {
              authMethod: I.pi.WALLET_NONCUSTODIAL,
              authType: I.Db.CONTINUE_ACCOUNT,
              walletAddress: eo,
            };
            (0, N.Nb)(e);
            try {
              await ec();
            } catch (e) {
              throw (ex(!1), e);
            }
            ((0, N.QO)(e), ex(!1), ep(!0));
          }),
          (er[4] = eo),
          (er[5] = ec),
          (er[6] = ep),
          (er[7] = ey),
          (er[8] = a))
        : (a = er[8]);
      let ew = a;
      er[9] !== el
        ? ((l = () => {
            ((0, N.yt)({
              surface: "wall",
              interactionType: "cta",
              cta: "mobile_app",
            }),
              (0, N.LR)({ interactionType: "click" }),
              window.open(
                (0, D.d)(el, "import_keys"),
                "_blank",
                "noopener,noreferrer",
              ));
          }),
          (er[9] = el),
          (er[10] = l))
        : (l = er[10]);
      let eI = l;
      er[11] !== eh
        ? ((c = () => {
            ((0, N.yt)({
              surface: "wall",
              interactionType: "cta",
              cta: "support",
            }),
              (0, N.FN)(),
              eh());
          }),
          (er[11] = eh),
          (er[12] = c))
        : (c = er[12]);
      let ej = c;
      return (
        er[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, i.jsx)("div", {
              className:
                "bg-primary/15 flex size-12 items-center justify-center rounded-2xl",
              children: (0, i.jsx)(R.eb, {
                size: 22,
                className: "text-primary",
              }),
            })),
            (er[13] = d))
          : (d = er[13]),
        er[14] !== ea
          ? ((m = ea("web.wallet_deprecation.wall_title")),
            (er[14] = ea),
            (er[15] = m))
          : (m = er[15]),
        er[16] !== m
          ? ((p = (0, i.jsx)("h1", {
              className: "text-text-primary text-2xl font-semibold",
              children: m,
            })),
            (er[16] = m),
            (er[17] = p))
          : (p = er[17]),
        er[18] !== es || er[19] !== ea
          ? ((h = ea("web.wallet_deprecation.wall_body", { date: es })),
            (er[18] = es),
            (er[19] = ea),
            (er[20] = h))
          : (h = er[20]),
        er[21] !== h
          ? ((y = (0, i.jsx)("p", {
              className: "text-text-tertiary text-balance text-sm",
              children: h,
            })),
            (er[21] = h),
            (er[22] = y))
          : (y = er[22]),
        er[23] !== y || er[24] !== p
          ? ((x = (0, i.jsxs)("div", {
              className: "flex flex-col items-center gap-3 text-center",
              children: [d, p, y],
            })),
            (er[23] = y),
            (er[24] = p),
            (er[25] = x))
          : (x = er[25]),
        er[26] !== ea
          ? ((v = ea("web.wallet_deprecation.wall_current_login")),
            (er[26] = ea),
            (er[27] = v))
          : (v = er[27]),
        er[28] !== v
          ? ((b = (0, i.jsx)("span", {
              className: "text-text-tertiary text-xs font-semibold",
              children: v,
            })),
            (er[28] = v),
            (er[29] = b))
          : (b = er[29]),
        er[30] === Symbol.for("react.memo_cache_sentinel")
          ? ((_ = (0, i.jsx)(R.Cg, { size: 18, "aria-hidden": !0 })),
            (er[30] = _))
          : (_ = er[30]),
        er[31] !== eb
          ? ((w = eb
              ? (0, i.jsx)("span", {
                  className: "text-text-primary text-sm font-semibold",
                  children: (0, F.T)(eb, "brand-name"),
                })
              : null),
            (er[31] = eb),
            (er[32] = w))
          : (w = er[32]),
        er[33] !== eo
          ? ((j = eo
              ? (0, i.jsx)("span", {
                  className: "text-text-tertiary truncate text-xs",
                  children: (0, F.T)(eo, "wallet-address"),
                })
              : null),
            (er[33] = eo),
            (er[34] = j))
          : (j = er[34]),
        er[35] !== w || er[36] !== j
          ? ((E = (0, i.jsxs)("div", {
              className:
                "border-border-secondary/70 bg-bg-secondary flex items-center gap-3 rounded-xl border p-4",
              "data-testid": "wallet-adapter-cutover-gate-current-login",
              children: [
                _,
                (0, i.jsxs)("div", {
                  className: "flex min-w-0 flex-col",
                  children: [w, j],
                }),
              ],
            })),
            (er[35] = w),
            (er[36] = j),
            (er[37] = E))
          : (E = er[37]),
        er[38] !== b || er[39] !== E
          ? ((k = (0, i.jsxs)("div", {
              className: "flex flex-col gap-2",
              children: [b, E],
            })),
            (er[38] = b),
            (er[39] = E),
            (er[40] = k))
          : (k = er[40]),
        er[41] !== ea
          ? ((S = ea("account.privy_link.settings_row")),
            (er[41] = ea),
            (er[42] = S))
          : (S = er[42]),
        er[43] !== e_ || er[44] !== S
          ? ((U = (0, i.jsx)(P.K, {
              isFullWidth: !0,
              size: 40,
              variant: "primary",
              onClick: e_,
              "data-testid": "wallet-adapter-cutover-gate-link",
              children: S,
            })),
            (er[43] = e_),
            (er[44] = S),
            (er[45] = U))
          : (U = er[45]),
        er[46] !== ea
          ? ((L = ea("web.wallet_deprecation.wall_cta_app")),
            (er[46] = ea),
            (er[47] = L))
          : (L = er[47]),
        er[48] !== eI || er[49] !== L
          ? ((K = (0, i.jsx)(P.K, {
              isFullWidth: !0,
              size: 40,
              variant: "secondary",
              onClick: eI,
              "data-testid": "wallet-adapter-cutover-gate-app",
              children: L,
            })),
            (er[48] = eI),
            (er[49] = L),
            (er[50] = K))
          : (K = er[50]),
        er[51] !== ea
          ? ((V = ea("web.wallet_deprecation.wall_app_steps")),
            (er[51] = ea),
            (er[52] = V))
          : (V = er[52]),
        er[53] !== V
          ? ((M = (0, i.jsx)("p", {
              className: "text-text-tertiary text-center text-xs",
              children: V,
            })),
            (er[53] = V),
            (er[54] = M))
          : (M = er[54]),
        er[55] !== ew
          ? ((H = () => void ew()), (er[55] = ew), (er[56] = H))
          : (H = er[56]),
        er[57] !== ea
          ? ((W = ea("web.wallet_deprecation.wall_cta_signout")),
            (er[57] = ea),
            (er[58] = W))
          : (W = er[58]),
        er[59] !== ey || er[60] !== H || er[61] !== W
          ? ((X = (0, i.jsx)(P.K, {
              isFullWidth: !0,
              size: 40,
              variant: "secondary",
              isLoading: ey,
              onClick: H,
              "data-testid": "wallet-adapter-cutover-gate-signout",
              children: W,
            })),
            (er[59] = ey),
            (er[60] = H),
            (er[61] = W),
            (er[62] = X))
          : (X = er[62]),
        er[63] !== U || er[64] !== K || er[65] !== M || er[66] !== X
          ? ((Q = (0, i.jsxs)("div", {
              className: "flex flex-col gap-2",
              children: [U, K, M, X],
            })),
            (er[63] = U),
            (er[64] = K),
            (er[65] = M),
            (er[66] = X),
            (er[67] = Q))
          : (Q = er[67]),
        er[68] !== ea
          ? ((q = ea("web.wallet_deprecation.wall_footnote")),
            (er[68] = ea),
            (er[69] = q))
          : (q = er[69]),
        er[70] !== ea
          ? ((G = ea("web.wallet_deprecation.banner_learn_more")),
            (er[70] = ea),
            (er[71] = G))
          : (G = er[71]),
        er[72] !== G
          ? ((J = (0, i.jsx)(A.default, {
              href: g.O,
              className: "text-text-primary underline underline-offset-2",
              "data-testid": "wallet-adapter-cutover-gate-learn-more",
              children: G,
            })),
            (er[72] = G),
            (er[73] = J))
          : (J = er[73]),
        er[74] !== q || er[75] !== J
          ? ((Y = (0, i.jsxs)("p", {
              className: "text-text-tertiary text-center text-xs",
              children: [q, " ", J],
            })),
            (er[74] = q),
            (er[75] = J),
            (er[76] = Y))
          : (Y = er[76]),
        er[77] !== ea
          ? ((Z = ea("geo_block.contact_support")), (er[77] = ea), (er[78] = Z))
          : (Z = er[78]),
        er[79] !== eg || er[80] !== ej || er[81] !== Z
          ? ((ee = (0, i.jsx)(P.K, {
              isFullWidth: !0,
              size: 40,
              variant: "ghost",
              onClick: ej,
              isDisabled: eg,
              "data-testid": "wallet-adapter-cutover-gate-contact-support",
              children: Z,
            })),
            (er[79] = eg),
            (er[80] = ej),
            (er[81] = Z),
            (er[82] = ee))
          : (ee = er[82]),
        er[83] !== x ||
        er[84] !== k ||
        er[85] !== Q ||
        er[86] !== Y ||
        er[87] !== ee
          ? ((et = (0, i.jsxs)("div", {
              className: "flex w-full max-w-md flex-col gap-6",
              children: [x, k, Q, Y, ee],
            })),
            (er[83] = x),
            (er[84] = k),
            (er[85] = Q),
            (er[86] = Y),
            (er[87] = ee),
            (er[88] = et))
          : (et = er[88]),
        er[89] !== ef || er[90] !== em
          ? ((en = (0, i.jsx)(B.R, {
              children: (0, i.jsx)($, { open: em, onOpenChange: ef }),
            })),
            (er[89] = ef),
            (er[90] = em),
            (er[91] = en))
          : (en = er[91]),
        er[92] !== eu || er[93] !== et || er[94] !== en
          ? ((ei = (0, i.jsxs)("div", {
              className:
                "flex min-h-screen w-full items-center justify-center overflow-y-auto px-4 py-8",
              "data-testid": "wallet-adapter-cutover-gate",
              children: [et, en, eu],
            })),
            (er[92] = eu),
            (er[93] = et),
            (er[94] = en),
            (er[95] = ei))
          : (ei = er[95]),
        ei
      );
    },
    V = (e) => {
      let t,
        n,
        a = (0, r.c)(6),
        { children: s } = e,
        { walled: l, reader: o } = (() => {
          let e,
            t,
            n = (0, r.c)(8),
            i = (0, U.f)(),
            a = (0, d.s)(),
            s = (0, C.usePathname)(),
            { method: l, reader: o } = (0, f.f)();
          n[0] !== i || n[1] !== l || n[2] !== s || n[3] !== a
            ? ((e = i && !!a && !s?.startsWith(g.O) && (0, g.l)(l)),
              (n[0] = i),
              (n[1] = l),
              (n[2] = s),
              (n[3] = a),
              (n[4] = e))
            : (e = n[4]);
          let c = e;
          return (
            n[5] !== o || n[6] !== c
              ? ((t = { walled: c, reader: o }),
                (n[5] = o),
                (n[6] = c),
                (n[7] = t))
              : (t = n[7]),
            t
          );
        })();
      return (
        a[0] !== s || a[1] !== l
          ? ((t = l ? (0, i.jsx)(K, {}) : s),
            (a[0] = s),
            (a[1] = l),
            (a[2] = t))
          : (t = a[2]),
        a[3] !== o || a[4] !== t
          ? ((n = (0, i.jsxs)(i.Fragment, { children: [t, o] })),
            (a[3] = o),
            (a[4] = t),
            (a[5] = n))
          : (n = a[5]),
        n
      );
    };
  var M = e.i(867480),
    H = e.i(880227);
  function W(e) {
    return "twitter" === e;
  }
  let X = (0, L.default)(
      () => e.A(673515).then((e) => e.XBackupLinkGateContent),
      { loadableGenerated: { modules: [959245] }, ssr: !1 },
    ),
    Q = (e) => {
      let t,
        n,
        a,
        l = (0, r.c)(9),
        { children: c } = e,
        { shouldUsePrivy: d } = (0, s.F)(),
        [u, m] = (0, o.useState)(!1);
      return (
        l[0] !== d
          ? ((t = d ? (0, i.jsx)(q, { onChange: m }) : null),
            (l[0] = d),
            (l[1] = t))
          : (t = l[1]),
        l[2] !== c || l[3] !== u || l[4] !== d
          ? ((n =
              d && u ? (0, i.jsx)(B.R, { children: (0, i.jsx)(X, {}) }) : c),
            (l[2] = c),
            (l[3] = u),
            (l[4] = d),
            (l[5] = n))
          : (n = l[5]),
        l[6] !== t || l[7] !== n
          ? ((a = (0, i.jsxs)(i.Fragment, { children: [t, n] })),
            (l[6] = t),
            (l[7] = n),
            (l[8] = a))
          : (a = l[8]),
        a
      );
    },
    q = (e) => {
      let t,
        n,
        i,
        a,
        s = (0, r.c)(7),
        { onChange: l } = e,
        { needsBackupLink: c, reader: u } = (() => {
          let e,
            t,
            n = (0, r.c)(11),
            i = (0, d.s)(),
            { snapshot: a, reader: s } = (0, H.f)();
          if (!i) {
            let e;
            return (
              n[0] !== s
                ? ((e = { needsBackupLink: !1, reader: s }),
                  (n[0] = s),
                  (n[1] = e))
                : (e = n[1]),
              e
            );
          }
          if (!a?.ready || !a.authenticated || !a.user) {
            let e;
            return (
              n[2] !== s
                ? ((e = { needsBackupLink: !1, reader: s }),
                  (n[2] = s),
                  (n[3] = e))
                : (e = n[3]),
              e
            );
          }
          let { user: l } = a;
          if (!(0, M.H)({ user: l, walletAddress: i.address })) {
            let e;
            return (
              n[4] !== s
                ? ((e = { needsBackupLink: !1, reader: s }),
                  (n[4] = s),
                  (n[5] = e))
                : (e = n[5]),
              e
            );
          }
          if (n[6] !== l) {
            let t = (0, M.b)(l);
            ((e = t.length > 0 && t.every(W)), (n[6] = l), (n[7] = e));
          } else e = n[7];
          return (
            n[8] !== s || n[9] !== e
              ? ((t = { needsBackupLink: e, reader: s }),
                (n[8] = s),
                (n[9] = e),
                (n[10] = t))
              : (t = n[10]),
            t
          );
        })();
      return (
        s[0] !== c || s[1] !== l
          ? ((t = () => {
              l(c);
            }),
            (n = [c, l]),
            (s[0] = c),
            (s[1] = l),
            (s[2] = t),
            (s[3] = n))
          : ((t = s[2]), (n = s[3])),
        (0, o.useEffect)(t, n),
        s[4] !== l
          ? ((i = () => () => l(!1)),
            (a = [l]),
            (s[4] = l),
            (s[5] = i),
            (s[6] = a))
          : ((i = s[5]), (a = s[6])),
        (0, o.useEffect)(i, a),
        u
      );
    };
  var G = e.i(79472);
  let J = (e) => {
    let t,
      n,
      a,
      s,
      l,
      o,
      c,
      d,
      m,
      f,
      p,
      h,
      g,
      y,
      x,
      v = (0, r.c)(28),
      { t: b } = (0, u.f)(),
      { children: _ } = e,
      { toggleChat: w } = (0, T.f)(),
      I =
        ((g = (0, r.c)(2)),
        (y = (0, G.b)()),
        (x = (0, G.y)() ? void 0 : !y),
        g[0] !== x
          ? ((h = { isAllowed: x }), (g[0] = x), (g[1] = h))
          : (h = g[1]),
        h);
    if (void 0 === I.isAllowed || I.isAllowed) {
      let e;
      return (
        v[0] !== _
          ? ((e = (0, i.jsx)(i.Fragment, { children: _ })),
            (v[0] = _),
            (v[1] = e))
          : (e = v[1]),
        e
      );
    }
    return (
      v[2] !== b
        ? ((t = b("geo_block.restricted_jurisdiction")), (v[2] = b), (v[3] = t))
        : (t = v[3]),
      v[4] !== t
        ? ((n = (0, i.jsx)("h1", {
            className: "mb-4 text-2xl font-bold text-white",
            children: t,
          })),
          (v[4] = t),
          (v[5] = n))
        : (n = v[5]),
      v[6] !== b
        ? ((a = b("web.geo_block.jurisdiction_description_uk")),
          (v[6] = b),
          (v[7] = a))
        : (a = v[7]),
      v[8] !== a
        ? ((s = (0, i.jsx)("p", {
            className: "text-text-tertiary",
            children: a,
          })),
          (v[8] = a),
          (v[9] = s))
        : (s = v[9]),
      v[10] !== n || v[11] !== s
        ? ((l = (0, i.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [n, s],
          })),
          (v[10] = n),
          (v[11] = s),
          (v[12] = l))
        : (l = v[12]),
      v[13] !== b
        ? ((o = b("geo_block.access_privy_wallet")), (v[13] = b), (v[14] = o))
        : (o = v[14]),
      v[15] !== o
        ? ((c = (0, i.jsx)(P.K, {
            isFullWidth: !0,
            onClick: Y,
            size: 40,
            variant: "primary",
            children: o,
          })),
          (v[15] = o),
          (v[16] = c))
        : (c = v[16]),
      v[17] !== b
        ? ((d = b("geo_block.contact_support")), (v[17] = b), (v[18] = d))
        : (d = v[18]),
      v[19] !== d || v[20] !== w
        ? ((m = (0, i.jsx)(P.K, {
            isFullWidth: !0,
            onClick: w,
            size: 40,
            variant: "ghost",
            children: d,
          })),
          (v[19] = d),
          (v[20] = w),
          (v[21] = m))
        : (m = v[21]),
      v[22] !== c || v[23] !== m
        ? ((f = (0, i.jsxs)("div", {
            className: "flex flex-col gap-4",
            children: [c, m],
          })),
          (v[22] = c),
          (v[23] = m),
          (v[24] = f))
        : (f = v[24]),
      v[25] !== l || v[26] !== f
        ? ((p = (0, i.jsx)("div", {
            className:
              "flex h-screen w-full items-center justify-center overflow-y-hidden",
            children: (0, i.jsx)("div", {
              className: "flex h-[300px] items-center justify-center",
              children: (0, i.jsx)("div", {
                className:
                  "h-8/12 flex w-8/12 items-center rounded-lg border border-white",
                children: (0, i.jsxs)("div", {
                  className:
                    "flex max-w-lg flex-col gap-4 px-4 py-8 text-center",
                  children: [l, f],
                }),
              }),
            }),
          })),
          (v[25] = l),
          (v[26] = f),
          (v[27] = p))
        : (p = v[27]),
      p
    );
  };
  function Y() {
    window.location.href = "https://privy-wallet.pump.fun";
  }
  var Z = {
      scriptHostname:
        ("u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_HOST
          : void 0) ?? "https://vercel.live",
      ownerId:
        "u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_OWNER_ID
          : void 0,
      projectId:
        "u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_PROJECT_ID
          : void 0,
      branch:
        "u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_BRANCH
          : void 0,
      deploymentId:
        "u" > typeof c.default ? "dpl_AimdmiN1oNXBp4XEjm3dPQeskJrw" : void 0,
    },
    ee = e.i(54403),
    et = {
      scriptHostname:
        ("u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_HOST
          : void 0) ?? "https://vercel.live",
      ownerId:
        "u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_OWNER_ID
          : void 0,
      projectId:
        "u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_PROJECT_ID
          : void 0,
      branch:
        "u" > typeof c.default
          ? c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_BRANCH
          : void 0,
      deploymentId:
        "u" > typeof c.default ? "dpl_AimdmiN1oNXBp4XEjm3dPQeskJrw" : void 0,
    },
    en = !1;
  function ei({ shouldMount: e }) {
    return (
      (0, o.useEffect)(
        () => (
          e &&
            en &&
            (function (e = {}) {
              if (
                typeof window > "u" ||
                null === document.querySelector("vercel-live-feedback")
              ) {
                Object.assign(et, e);
                let t = document.createElement("script");
                for (let [
                  e,
                  i,
                ] of ((t.src = `${et.scriptHostname}/_next-live/feedback/feedback.js`),
                t.setAttribute("data-explicit-opt-in", "true"),
                Object.entries(
                  (et.ownerId && et.projectId
                    ? {
                        "data-owner-id": et.ownerId,
                        "data-project-id": et.projectId,
                        "data-branch": n ?? et.branch,
                      }
                    : et.deploymentId
                      ? { "data-deployment-id": et.deploymentId }
                      : void 0) ?? {},
                )))
                  i && t.setAttribute(e, i);
                (document.head || document.documentElement).appendChild(t);
              }
            })(),
          (en = !0),
          () => {
            (typeof window > "u" ? void 0 : window.__vercel_toolbar)?.unmount();
          }
        ),
        [],
      ),
      null
    );
  }
  function er(e) {
    return (0, i.jsxs)(i.Fragment, {
      children: [
        (0, i.jsx)(ee.default, {
          strategy: "afterInteractive",
          ...e,
          ...(Z.ownerId && Z.projectId
            ? {
                "data-owner-id": Z.ownerId,
                "data-project-id": Z.projectId,
                "data-branch": t ?? Z.branch,
              }
            : Z.deploymentId
              ? { "data-deployment-id": Z.deploymentId }
              : void 0),
          id: "vercel-toolbar",
          src: `${Z.scriptHostname}/_next-live/feedback/feedback.js`,
          "data-explicit-opt-in": "true",
        }),
        (0, i.jsx)(ei, { shouldMount: !0 }),
      ],
    });
  }
  ["1", "true"].includes(
    c.default.env.NEXT_PUBLIC_VERCEL_TOOLBAR_INJECT_IN_DEVELOPMENT ?? "",
  );
  var ea = e.i(833997);
  function es() {
    let e,
      t = (0, r.c)(3),
      n = (0, ea.f)("pump.staff_toolbar.open");
    return (
      t[1] !== n
        ? ((e = n ? (0, i.jsx)(er, {}) : null), (t[1] = n), (t[2] = e))
        : (e = t[2]),
      e
    );
  }
  var el = e.i(545063),
    eo = e.i(606933),
    ec = e.i(649826);
  let ed = [
    ["bookmarks"],
    ["bookmarkedCoins"],
    ["sidebarBookmarkedCoins"],
    ["dms"],
    ["mutes"],
    ["hermes-notifications"],
    ["viewer-following"],
    ["followingFeedNewCountBadge"],
    ["callouts", "alerts-feed-rail"],
    ["callouts", "following-alerts"],
    ["callouts", "followed-holders"],
    ["explore", "followed-holders"],
    ["perps", "markets"],
    ["callouts", "rewards-tos"],
    ["callouts", "eligibility"],
    ["callouts", "own-mint"],
    ["callouts", "by-user"],
    ["bounties", "myDrafts"],
    ["bounties", "mySubmissions"],
    ["bounties", "pendingAttention"],
    ["squads", "my-memberships"],
    ["users", "mention-candidates"],
    ["x", "connectionStatus"],
  ];
  function eu() {
    let e,
      t,
      n = (0, r.c)(4),
      i = (0, eo.useQueryClient)(),
      a = (0, el._)(),
      s = (0, o.useRef)(a);
    return (
      n[0] !== i || n[1] !== a
        ? ((e = () => {
            let e = s.current;
            if (((s.current = a), null !== e && e !== a)) {
              for (let e of ed) i.removeQueries({ queryKey: e });
              (0, ec.I)();
            }
          }),
          (t = [i, a]),
          (n[0] = i),
          (n[1] = a),
          (n[2] = e),
          (n[3] = t))
        : ((e = n[2]), (t = n[3])),
      (0, o.useEffect)(e, t),
      null
    );
  }
  let em = (0, e.i(763916).f)(
    () => e.A(891625).then((e) => e.TpSlAutoCancelOnSell),
    (e) => {
      a.y.warn("TP/SL auto-cancel chunk warm-up failed", {
        reason: e instanceof Error ? e.message : String(e),
      });
    },
  ).load;
  var ef = e.i(322315),
    ep = e.i(254010),
    eh = e.i(506486),
    eg = e.i(695705),
    ey = e.i(605587);
  let ex = (e) => {
      let t = e.mint;
      return `${e.evm?.chainId ?? "solana"}:${(0, ey.c)(t ?? "")}`;
    },
    ev = {
      "slippage tolerance exceeded": "web.toasts.limit_order_reason_slippage",
      "insufficient funds": "web.toasts.limit_order_reason_insufficient_funds",
      "unknown error": "web.toasts.limit_order_reason_unknown",
    };
  var eb = e.i(90832);
  let e_ = (e) => {
      let t,
        n,
        a,
        s,
        l,
        o,
        c,
        d,
        m,
        f,
        p,
        h,
        g,
        y,
        x = (0, r.c)(52),
        { outcome: v, coin: b, onOpenCoin: _, onDismiss: w } = e,
        { t: I } = (0, u.f)(),
        { order: j, kind: E, siblingCancelled: k } = v,
        N = "stop_loss" !== j.orderType,
        S = "filled" === E;
      if (x[0] !== b?.symbol || x[1] !== j.mint) {
        let e;
        ((t = b?.symbol || ((e = j.mint), `${e.slice(0, 4)}…${e.slice(-4)}`)),
          (x[0] = b?.symbol),
          (x[1] = j.mint),
          (x[2] = t));
      } else t = x[2];
      let C = t;
      x[3] !== S || x[4] !== N || x[5] !== I
        ? ((n = I(
            S
              ? N
                ? "web.toasts.limit_order_filled_take_profit"
                : "web.toasts.limit_order_filled_stop_loss"
              : N
                ? "web.toasts.limit_order_failed_take_profit"
                : "web.toasts.limit_order_failed_stop_loss",
          )),
          (x[3] = S),
          (x[4] = N),
          (x[5] = I),
          (x[6] = n))
        : (n = x[6]);
      let U = n;
      if (x[7] !== S || x[8] !== j || x[9] !== I) {
        let e = (0, eg.A)(j);
        e: {
          var P;
          if (S) {
            a =
              null != e
                ? I("coin_details.manage_orders.row_target_mc", {
                    value: (0, eb.v)(e),
                  })
                : null;
            break e;
          }
          let t =
            null == (P = j.displayError)
              ? null
              : (ev[P.trim().toLowerCase()] ?? null);
          if (t) {
            a = I(t);
            break e;
          }
          a = j.displayError || j.reason || null;
        }
        ((x[7] = S), (x[8] = j), (x[9] = I), (x[10] = a));
      } else a = x[10];
      let L = a,
        A = null != L ? `${C} \xb7 ${L}` : C;
      (x[11] !== A
        ? ((s = (0, i.jsx)("span", {
            className: "block truncate",
            children: A,
          })),
          (x[11] = A),
          (x[12] = s))
        : (s = x[12]),
        x[13] !== S || x[14] !== k || x[15] !== C || x[16] !== I
          ? ((l =
              S && k
                ? (0, i.jsx)("span", {
                    className: "block truncate",
                    children: I("web.toasts.limit_order_sibling_cancelled", {
                      symbol: C,
                    }),
                  })
                : null),
            (x[13] = S),
            (x[14] = k),
            (x[15] = C),
            (x[16] = I),
            (x[17] = l))
          : (l = x[17]),
        x[18] !== s || x[19] !== l
          ? ((o = (0, i.jsxs)(i.Fragment, { children: [s, l] })),
            (x[18] = s),
            (x[19] = l),
            (x[20] = o))
          : (o = x[20]));
      let T = o,
        O = S ? "gain" : "loss";
      x[21] !== b || x[22] !== j.mint
        ? ((c = b
            ? {
                mint: j.mint,
                symbol: b.symbol,
                image_uri: b.imageUrl,
                is_banned: b.isBanned,
              }
            : void 0),
          (x[21] = b),
          (x[22] = j.mint),
          (x[23] = c))
        : (c = x[23]);
      let z = j.mint,
        B = S ? "limit-order-filled-toast" : "limit-order-failed-toast";
      (x[24] !== S || x[25] !== I
        ? ((d = I(
            S
              ? "web.toasts.limit_order_filled_aria"
              : "web.toasts.limit_order_failed_aria",
          )),
          (x[24] = S),
          (x[25] = I),
          (x[26] = d))
        : (d = x[26]),
        x[27] !== S
          ? ((m = S ? (0, i.jsx)(R.y$, {}) : (0, i.jsx)(R.ck, {})),
            (x[27] = S),
            (x[28] = m))
          : (m = x[28]));
      let F = `/coin/${j.mint}`;
      return (
        x[29] !== I
          ? ((f = I("web.toasts.open_coin")), (x[29] = I), (x[30] = f))
          : (f = x[30]),
        x[31] !== _ || x[32] !== F || x[33] !== f
          ? ((p = (0, i.jsx)(eh.m, {
              href: F,
              target: "_self",
              onClick: _,
              children: f,
            })),
            (x[31] = _),
            (x[32] = F),
            (x[33] = f),
            (x[34] = p))
          : (p = x[34]),
        x[35] !== j.evm?.chainId || x[36] !== j.txHash
          ? ((h = j.txHash
              ? (0, i.jsx)(eh.v, {
                  signature: j.txHash,
                  chainId: j.evm?.chainId,
                  compact: !0,
                })
              : null),
            (x[35] = j.evm?.chainId),
            (x[36] = j.txHash),
            (x[37] = h))
          : (h = x[37]),
        x[38] !== p || x[39] !== h
          ? ((g = (0, i.jsxs)(i.Fragment, { children: [p, h] })),
            (x[38] = p),
            (x[39] = h),
            (x[40] = g))
          : (g = x[40]),
        x[41] !== w ||
        x[42] !== j.mint ||
        x[43] !== T ||
        x[44] !== B ||
        x[45] !== d ||
        x[46] !== m ||
        x[47] !== g ||
        x[48] !== O ||
        x[49] !== c ||
        x[50] !== U
          ? ((y = (0, i.jsx)(eh.O, {
              tone: O,
              coin: c,
              mint: z,
              testId: B,
              ariaLabel: d,
              onDismiss: w,
              glyph: m,
              title: U,
              subtitle: T,
              subtitleLines: 2,
              durationMs: ew,
              actionBelow: !0,
              action: g,
            })),
            (x[41] = w),
            (x[42] = j.mint),
            (x[43] = T),
            (x[44] = B),
            (x[45] = d),
            (x[46] = m),
            (x[47] = g),
            (x[48] = O),
            (x[49] = c),
            (x[50] = U),
            (x[51] = y))
          : (y = x[51]),
        y
      );
    },
    ew = 1e4,
    eI = ({ outcome: e, coin: t, onOpenCoin: n }) => {
      m.c.custom(
        (r) =>
          (0, i.jsx)(e_, {
            outcome: e,
            coin: t,
            onOpenCoin: n,
            onDismiss: () => m.c.dismiss(r),
          }),
        { id: `limit-order-outcome-${e.order.orderId}`, duration: ew },
      );
    };
  var ej = e.i(280740),
    eE = e.i(670821),
    ek = e.i(997887),
    eN = e.i(689943),
    eS = e.i(986274),
    eC = e.i(369091),
    eU = e.i(54567),
    eR = e.i(493025);
  let eP = async ({ queryClient: e, mint: t, ipfsPrefix: n }) => {
      let i,
        r = new Promise((e) => {
          i = setTimeout(() => e(null), 2500);
        }),
        a = e
          .fetchQuery({
            queryKey: eN.o.coin(t),
            queryFn: () => (0, ek.k)({ coinAddress: t }),
            staleTime: 3e5,
          })
          .catch(() => null);
      try {
        let e = await Promise.race([a, r]);
        if (!e) return null;
        let [t] = (0, eR.f)([{ ...e }], n);
        return {
          symbol: t?.symbol ?? e.symbol ?? "",
          imageUrl: t?.image_uri ?? e.image_uri ?? null,
          isBanned: e.is_banned ?? !1,
        };
      } finally {
        clearTimeout(i);
      }
    },
    eL = async ({
      outcomes: e,
      queryClient: t,
      ipfsPrefix: n,
      notified: i,
    }) => {
      for (let r of e) {
        let { orderId: e, mint: a } = r.order;
        if (!i.has(e)) {
          if ((i.add(e), i.size > 200)) {
            let e = i.values().next().value;
            void 0 !== e && i.delete(e);
          }
          (eI({
            outcome: r,
            coin: await eP({ queryClient: t, mint: a, ipfsPrefix: n }),
            onOpenCoin: () => (0, N.Do)(a),
          }),
            eU.logger.info("[useLimitOrderOutcomeToasts] announced", {
              mint: a,
              orderId: e,
              chainId: r.order.evm?.chainId,
              kind: r.kind,
              siblingCancelled: r.siblingCancelled,
            }));
        }
      }
    },
    eA = ({ baseline: e, next: t }) => {
      if (void 0 === t || t === e.current) return [];
      let n = (({ previous: e, next: t }) => {
        if (void 0 === e) return [];
        let n = new Set(
          e.filter((e) => (0, eg.z)(e.status)).map((e) => e.orderId),
        );
        if (0 === n.size) return [];
        let i = new Set(
            t
              .filter(
                (e) =>
                  n.has(e.orderId) &&
                  "cancelled" === (0, eg.H)(e.status) &&
                  "sibling_filled" === e.cancelReason,
              )
              .map(ex),
          ),
          r = [];
        for (let e of t) {
          if (!n.has(e.orderId)) continue;
          let t = (0, eg.H)(e.status);
          "success" === t
            ? r.push({
                kind: "filled",
                order: e,
                siblingCancelled: i.has(ex(e)),
              })
            : "failure" === t &&
              r.push({ kind: "failed", order: e, siblingCancelled: !1 });
        }
        return r;
      })({ previous: e.current, next: t });
      return ((e.current = t), n);
    },
    eT = (e) => {
      let t,
        n,
        i,
        a,
        s,
        l,
        c = (0, r.c)(12),
        { walletAddress: d } = e,
        u = (0, eo.useQueryClient)(),
        { ipfsPrefix: m } = (0, eC.useIpfsPrefix)();
      c[0] !== d ? ((t = { user: d }), (c[0] = d), (c[1] = t)) : (t = c[1]);
      let { data: f } = (0, eE.f)(t);
      c[2] !== d ? ((n = { owner: d }), (c[2] = d), (c[3] = n)) : (n = c[3]);
      let { data: p } = (0, ej.s)(n),
        h = (0, o.useRef)(void 0),
        g = (0, o.useRef)(void 0);
      c[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = new Set()), (c[4] = i))
        : (i = c[4]);
      let y = (0, o.useRef)(i);
      return (
        c[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = []), (c[5] = a))
          : (a = c[5]),
        (0, o.useEffect)(ez, a),
        c[6] !== p || c[7] !== m || c[8] !== u || c[9] !== f
          ? ((s = () => {
              let e = [
                ...eA({ baseline: h, next: f }),
                ...eA({ baseline: g, next: p }),
              ];
              0 !== e.length &&
                eL({
                  outcomes: e,
                  queryClient: u,
                  ipfsPrefix: m,
                  notified: y.current,
                });
            }),
            (l = [f, p, u, m]),
            (c[6] = p),
            (c[7] = m),
            (c[8] = u),
            (c[9] = f),
            (c[10] = s),
            (c[11] = l))
          : ((s = c[10]), (l = c[11])),
        (0, o.useEffect)(s, l),
        null
      );
    },
    eO = () => {
      let e,
        t = (0, r.c)(2),
        n = (0, ep.k)(ef.D.WEB_BLOCKCHAIN_LIMIT_ORDERS, !1),
        { address: a } = (0, s.F)();
      return n && a
        ? (t[0] !== a
            ? ((e = (0, i.jsx)(eT, { walletAddress: a }, a)),
              (t[0] = a),
              (t[1] = e))
            : (e = t[1]),
          e)
        : null;
    };
  function ez() {
    return (0, eS.I)();
  }
  var eB = e.i(544514),
    eF = e.i(690877),
    eD = e.i(759257);
  let e$ = { livestreams: !1, all: !1, perps: !1, bridge: !1 },
    eK = async () =>
      (0, eD.j)()("GET /auth/disabled-features", {
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (e, t, n) => {
              if (!n.ok)
                throw Error(`Failed to fetch disabled features: ${n.status}`);
            },
          ],
        },
      });
  var eV = e.i(697453),
    eM = e.i(313017),
    eH = e.i(233404),
    eW = e.i(93903),
    eX = e.i(493870),
    eQ = e.i(797658),
    eq = e.i(569526),
    eG = e.i(32596),
    eJ = e.i(561667),
    eY = e.i(921999),
    eZ = e.i(456753),
    e0 = e.i(56999),
    e1 = e.i(675500),
    e2 = e.i(719421);
  function e3(e) {
    let t,
      n,
      l,
      d,
      u,
      m,
      f,
      p,
      h,
      g,
      y,
      x,
      v,
      b,
      _,
      I = (0, r.c)(23),
      { children: j } = e,
      { address: E, shouldUsePrivy: k, isPrivyEmbeddedSigner: N } = (0, s.F)(),
      U = (0, ep.k)(ef.D.WEB_V1_TRANSACTIONS),
      R = (0, eV.l)();
    (() => {
      let e,
        t,
        n,
        i,
        a,
        s,
        l,
        d = (0, r.c)(17),
        u = (0, C.usePathname)();
      (d[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = /^\/moderation(\/|$)/), (d[0] = e))
        : (e = d[0]),
        d[1] !== u ? ((t = e.test(u)), (d[1] = u), (d[2] = t)) : (t = d[2]));
      let m = t,
        f =
          m ||
          "true" === c.default.env.NEXT_PUBLIC_SKIP_JURISDICTION_CHECK ||
          !1;
      (d[3] !== m
        ? ((n = ["disabled-features", m]), (d[3] = m), (d[4] = n))
        : (n = d[4]),
        d[5] !== f
          ? ((i = () => (f ? e$ : eK())), (d[5] = f), (d[6] = i))
          : (i = d[6]));
      let p = !m;
      d[7] !== n || d[8] !== i || d[9] !== p
        ? ((a = { queryKey: n, queryFn: i, staleTime: 1 / 0, enabled: p }),
          (d[7] = n),
          (d[8] = i),
          (d[9] = p),
          (d[10] = a))
        : (a = d[10]);
      let { data: h, isLoading: g, isError: y } = (0, eF.useQuery)(a);
      (d[11] !== h || d[12] !== y || d[13] !== g || d[14] !== m
        ? ((s = () => {
            if (m) {
              let e = G.K.getState();
              (e.setDisabledFeatures(e$), e.setLoading(!1));
              return;
            }
            let e = G.K.getState();
            (e.setLoading(g),
              h ? e.setDisabledFeatures(h) : y && e.setDisabledFeatures(e$));
          }),
          (l = [h, g, y, m]),
          (d[11] = h),
          (d[12] = y),
          (d[13] = g),
          (d[14] = m),
          (d[15] = s),
          (d[16] = l))
        : ((s = d[15]), (l = d[16])),
        (0, o.useEffect)(s, l));
    })();
    let P = (0, eB.f)() && !!E,
      [L, A] = (0, o.useState)(null);
    return (
      I[0] !== L || I[1] !== P
        ? ((t = () => {
            if (!P || null !== L) return;
            let e = !1;
            return (
              em().then(
                (t) => {
                  e || A(() => t);
                },
                (t) => {
                  e ||
                    ((0, e2.P)(t) &&
                      "reloading" === (0, e2.m)("tp-sl-auto-cancel")) ||
                    a.y.error("TP/SL auto-cancel chunk failed to load", {
                      reason: t instanceof Error ? t.message : String(t),
                    });
                },
              ),
              () => {
                e = !0;
              }
            );
          }),
          (n = [P, L]),
          (I[0] = L),
          (I[1] = P),
          (I[2] = t),
          (I[3] = n))
        : ((t = I[2]), (n = I[3])),
      (0, o.useEffect)(t, n),
      I[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = []), (I[4] = l))
        : (l = I[4]),
      (0, o.useEffect)(e4, l),
      I[5] !== R
        ? ((d = () => {
            (0, eM.D)(R);
          }),
          (u = [R]),
          (I[5] = R),
          (I[6] = d),
          (I[7] = u))
        : ((d = I[6]), (u = I[7])),
      (0, o.useLayoutEffect)(d, u),
      I[8] !== E
        ? ((m = () => {
            (0, e1.m)(E ?? void 0);
          }),
          (f = [E]),
          (I[8] = E),
          (I[9] = m),
          (I[10] = f))
        : ((m = I[9]), (f = I[10])),
      (0, o.useEffect)(m, f),
      (0, eH.W)({
        flagEnabled: U,
        shouldUsePrivy: k,
        isPrivyEmbeddedSigner: N,
      }),
      I[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = (0, i.jsx)(eO, {})), (I[11] = p))
        : (p = I[11]),
      I[12] !== j
        ? ((h = (0, i.jsxs)(eC.IpfsPrefixProvider, {
            children: [
              p,
              (0, i.jsx)(eq.l, {
                children: (0, i.jsx)(eZ.l, {
                  children: (0, i.jsx)(eJ.Q, {
                    children: (0, i.jsx)(eG.Q, {
                      children: (0, i.jsx)(e0.c, {
                        children: (0, i.jsx)(eQ.Y, {
                          appId: "w7scljv7",
                          autoBootEnabled: !1,
                          children: (0, i.jsx)(J, {
                            children: (0, i.jsx)(Q, {
                              children: (0, i.jsx)(V, {
                                children: (0, i.jsx)(o.Suspense, {
                                  children: (0, i.jsx)(eX.t, {
                                    children: (0, i.jsx)(eY.M, { children: j }),
                                  }),
                                }),
                              }),
                            }),
                          }),
                        }),
                      }),
                    }),
                  }),
                }),
              }),
            ],
          })),
          (I[12] = j),
          (I[13] = h))
        : (h = I[13]),
      I[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, i.jsx)(es, {})),
          (g = (0, i.jsx)(eu, {})),
          (I[14] = g),
          (I[15] = y))
        : ((g = I[14]), (y = I[15])),
      I[16] !== L
        ? ((x = L ? (0, i.jsx)(L, {}) : null), (I[16] = L), (I[17] = x))
        : (x = I[17]),
      I[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = (0, i.jsx)(S, {})),
          (b = (0, i.jsx)(w, {})),
          (I[18] = v),
          (I[19] = b))
        : ((v = I[18]), (b = I[19])),
      I[20] !== x || I[21] !== h
        ? ((_ = (0, i.jsxs)(i.Fragment, { children: [h, y, g, x, v, b] })),
          (I[20] = x),
          (I[21] = h),
          (I[22] = _))
        : (_ = I[22]),
      _
    );
  }
  function e4() {
    (0, eW.s)(eW.U);
  }
  var e5 = e.i(30181),
    e6 = e.i(683023),
    e8 = e.i(594435);
  let e9 = "decoded-jwt",
    e7 = !1;
  async function te(e) {
    let { clientServerUrl: t } = e;
    if (e7 || ((e7 = !0), (0, d.D)())) return !1;
    try {
      if (null != localStorage.getItem(e9)) return !1;
    } catch {
      return !1;
    }
    if ((0, e8.g)()) return !1;
    let n = new AbortController(),
      i = setTimeout(() => n.abort(), 8e3);
    try {
      let e = await (0, e5.K)({ clientServerUrl: t })("GET /auth/my-profile", {
          credentials: "include",
          headers: { "Cache-Control": "no-cache" },
          signal: n.signal,
        }),
        i = (0, e6.S)(e);
      if (!i || (0, e8.g)()) return !1;
      if ((0, d.D)()) return !0;
      return (
        localStorage.setItem(e9, JSON.stringify(i)),
        (0, d.I)(),
        a.y.info("cookie-session-recovery: restored display session", {}),
        !0
      );
    } catch {
      return !1;
    } finally {
      clearTimeout(i);
    }
  }
  function tt() {
    let e,
      t,
      n = (0, r.c)(3),
      { clientServerUrl: i } = (0, l.useUserConfig)();
    return (
      n[0] !== i
        ? ((e = () => {
            te({ clientServerUrl: i });
          }),
          (t = [i]),
          (n[0] = i),
          (n[1] = e),
          (n[2] = t))
        : ((e = n[1]), (t = n[2])),
      (0, o.useEffect)(e, t),
      null
    );
  }
  var tn = e.i(195636),
    ti = e.i(536925),
    tr = e.i(598695),
    ta = e.i(663930);
  let ts = "consentModeBanner",
    tl = "consentMode",
    to = {
      ad_storage: "denied",
      analytics_storage: "granted",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
    };
  function tc(e) {
    try {
      let t = localStorage.getItem(e);
      if (null == t) return;
      return JSON.parse(t);
    } catch {
      return;
    }
  }
  function td(e, t) {
    try {
      localStorage.setItem(e, JSON.stringify(t));
    } catch {}
  }
  function tu(e) {
    ((window.dataLayer = window.dataLayer || []), window.dataLayer.push(e));
  }
  function tm(e) {
    return {
      analytics: "granted" === e.analytics_storage,
      marketing: "granted" === e.ad_storage,
      necessary: "granted" === e.functionality_storage,
      preferences: "granted" === e.personalization_storage,
    };
  }
  function tf() {
    let e,
      t,
      n,
      a,
      s,
      l,
      c,
      d,
      m,
      f,
      p,
      h,
      g,
      y,
      x,
      v,
      b,
      _,
      w,
      I,
      j,
      E,
      k,
      N,
      S,
      U,
      R,
      L,
      A,
      T,
      O,
      z,
      B,
      F,
      D,
      $,
      K,
      V,
      M,
      H,
      W,
      X,
      Q,
      q,
      G,
      J,
      Y,
      Z = (0, r.c)(113),
      { t: ee } = (0, u.f)(),
      [et, en] = (0, o.useState)(!1);
    (Z[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = () => {
          let e = () => en(!0);
          return (
            window.addEventListener(ta.I, e),
            () => window.removeEventListener(ta.I, e)
          );
        }),
        (t = []),
        (Z[0] = e),
        (Z[1] = t))
      : ((e = Z[0]), (t = Z[1])),
      (0, o.useEffect)(e, t));
    let ei = (0, C.usePathname)(),
      er = (0, ti.m)();
    Z[2] !== ei
      ? ((n = () => tc(ts) ?? !ei.startsWith("/mobile")),
        (Z[2] = ei),
        (Z[3] = n))
      : (n = Z[3]);
    let [ea, es] = (0, o.useState)(n),
      [el, eo] = (0, o.useState)(tp);
    Z[4] !== el
      ? ((a = () =>
          0 === Object.entries(el).length
            ? { analytics: !0, marketing: !1, necessary: !0, preferences: !0 }
            : tm(el)),
        (Z[4] = el),
        (Z[5] = a))
      : (a = Z[5]);
    let [ec, ed] = (0, o.useState)(a);
    Z[6] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = (e) => {
          (es(e), td(ts, e));
        }),
        (Z[6] = s))
      : (s = Z[6]);
    let eu = s;
    Z[7] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = (e) => {
          (eo(e), td(tl, e), Object.entries(e).length > 0 && ed(tm(e)));
        }),
        (Z[7] = l))
      : (l = Z[7]);
    let em = l;
    Z[8] !== er
      ? ((c = function () {
          er && tu(arguments);
        }),
        (Z[8] = er),
        (Z[9] = c))
      : (c = Z[9]);
    let ef = c,
      ep = (0, o.useRef)(!1);
    (Z[10] !== el
      ? ((d = () => {
          ep.current ||
            ((ep.current = !0),
            tu({ 0: "consent", 1: "default", 2: el, length: 3 }));
        }),
        (m = [el]),
        (Z[10] = el),
        (Z[11] = d),
        (Z[12] = m))
      : ((d = Z[11]), (m = Z[12])),
      (0, o.useEffect)(d, m),
      Z[13] !== ef
        ? ((f = function (e) {
            var t;
            let n = {
              security_storage: e.necessary ? "granted" : "denied",
              functionality_storage: e.necessary ? "granted" : "denied",
              personalization_storage: e.preferences ? "granted" : "denied",
              ad_storage: e.marketing ? "granted" : "denied",
              analytics_storage: e.analytics ? "granted" : "denied",
            };
            (em(n),
              eu(!1),
              en(!1),
              (t = () => ef("consent", "update", n)),
              "function" != typeof requestAnimationFrame
                ? setTimeout(t, 0)
                : requestAnimationFrame(() => {
                    setTimeout(t, 0);
                  }));
          }),
          (Z[13] = ef),
          (Z[14] = f))
        : (f = Z[14]));
    let eh = f;
    Z[15] !== eh
      ? ((p = function () {
          eh({ necessary: !0, analytics: !0, preferences: !0, marketing: !0 });
        }),
        (Z[15] = eh),
        (Z[16] = p))
      : (p = Z[16]);
    let eg = p;
    Z[17] !== eh
      ? ((h = function () {
          eh({ necessary: !1, analytics: !1, preferences: !1, marketing: !1 });
        }),
        (Z[17] = eh),
        (Z[18] = h))
      : (h = Z[18]);
    let ey = h;
    Z[19] !== ec || Z[20] !== eh
      ? ((g = function () {
          eh(ec);
        }),
        (Z[19] = ec),
        (Z[20] = eh),
        (Z[21] = g))
      : (g = Z[21]);
    let ex = g;
    Z[22] !== ec
      ? ((y = function (e) {
          let t = { [e.target.name]: e.target.checked };
          ed({ ...ec, ...t });
        }),
        (Z[22] = ec),
        (Z[23] = y))
      : (y = Z[23]);
    let ev = y;
    return (
      Z[24] !== eg ||
      Z[25] !== er ||
      Z[26] !== et ||
      Z[27] !== ey ||
      Z[28] !== ea ||
      Z[29] !== ee
        ? ((x =
            er &&
            ea &&
            !et &&
            (0, i.jsxs)("div", {
              className:
                "fixed bottom-4 right-0 flex flex-col max-w-[420px] mx-4 w-full rounded-xl border border-solid border-border-secondary isolate z-20 shadow-lg overflow-hidden max-md:bottom-20 max-sm:w-auto",
              "data-testid": "cookie-consent-modal",
              children: [
                (0, i.jsxs)("div", {
                  className: "flex flex-col p-4 bg-bg-primary",
                  children: [
                    (0, i.jsx)("p", {
                      className: "text-base font-medium text-text-primary mb-2",
                      children: ee("web.consent.banner_title"),
                    }),
                    (0, i.jsx)("p", {
                      className: "text-sm text-text-secondary",
                      children: ee("web.consent.banner_description"),
                    }),
                  ],
                }),
                (0, i.jsxs)("div", {
                  className:
                    "flex border-t border-solid border-border-secondary px-4 py-3 items-center justify-between bg-bg-secondary gap-x-2",
                  children: [
                    (0, i.jsxs)("div", {
                      className: "flex items-center gap-x-2",
                      children: [
                        (0, i.jsx)(P.K, {
                          onClick: ey,
                          size: 32,
                          variant: "secondary",
                          "data-testid": "reject-all-button",
                          children: ee("web.consent.reject_all"),
                        }),
                        (0, i.jsx)(P.K, {
                          size: 32,
                          onClick: () => en(!0),
                          variant: "secondary",
                          "data-testid": "customize-button",
                          children: ee("web.consent.customize"),
                        }),
                      ],
                    }),
                    (0, i.jsx)(P.K, {
                      onClick: eg,
                      size: 32,
                      variant: "primary",
                      "data-testid": "accept-all-button",
                      children: ee("web.consent.accept_all"),
                    }),
                  ],
                }),
              ],
            })),
          (Z[24] = eg),
          (Z[25] = er),
          (Z[26] = et),
          (Z[27] = ey),
          (Z[28] = ea),
          (Z[29] = ee),
          (Z[30] = x))
        : (x = Z[30]),
      Z[31] !== ee
        ? ((v = ee("web.consent.privacy_settings")), (Z[31] = ee), (Z[32] = v))
        : (v = Z[32]),
      Z[33] !== v
        ? ((b = (0, i.jsx)("p", {
            className: "text-lg font-medium mb-2",
            children: v,
          })),
          (Z[33] = v),
          (Z[34] = b))
        : (b = Z[34]),
      Z[35] !== ee
        ? ((_ = ee("web.consent.privacy_settings_description")),
          (Z[35] = ee),
          (Z[36] = _))
        : (_ = Z[36]),
      Z[37] !== _
        ? ((w = (0, i.jsx)("p", {
            className: "text-base text-text-secondary",
            children: _,
          })),
          (Z[37] = _),
          (Z[38] = w))
        : (w = Z[38]),
      Z[39] !== b || Z[40] !== w
        ? ((I = (0, i.jsxs)("div", {
            className: "flex flex-col mb-4",
            "data-testid": "customize-cookie-consent-modal",
            children: [b, w],
          })),
          (Z[39] = b),
          (Z[40] = w),
          (Z[41] = I))
        : (I = Z[41]),
      Z[42] !== ev
        ? ((j = (e) => ev(e)), (Z[42] = ev), (Z[43] = j))
        : (j = Z[43]),
      Z[44] !== ec.necessary || Z[45] !== j
        ? ((E = (0, i.jsx)("input", {
            checked: ec.necessary,
            disabled: !0,
            id: "consent-necessary",
            name: "necessary",
            onChange: j,
            type: "checkbox",
            "data-testid": "consent-necessary",
          })),
          (Z[44] = ec.necessary),
          (Z[45] = j),
          (Z[46] = E))
        : (E = Z[46]),
      Z[47] !== ee
        ? ((k = ee("web.consent.necessary")), (Z[47] = ee), (Z[48] = k))
        : (k = Z[48]),
      Z[49] !== k
        ? ((N = (0, i.jsx)(P.Q, {
            className: "text-sm text-text-secondary",
            htmlFor: "consent-necessary",
            children: k,
          })),
          (Z[49] = k),
          (Z[50] = N))
        : (N = Z[50]),
      Z[51] !== E || Z[52] !== N
        ? ((S = (0, i.jsxs)("div", {
            className: "flex items-center gap-x-2",
            children: [E, N],
          })),
          (Z[51] = E),
          (Z[52] = N),
          (Z[53] = S))
        : (S = Z[53]),
      Z[54] !== ev
        ? ((U = (e) => ev(e)), (Z[54] = ev), (Z[55] = U))
        : (U = Z[55]),
      Z[56] !== ec.analytics || Z[57] !== U
        ? ((R = (0, i.jsx)("input", {
            checked: ec.analytics,
            id: "consent-analytics",
            name: "analytics",
            onChange: U,
            type: "checkbox",
            "data-testid": "consent-analytics",
          })),
          (Z[56] = ec.analytics),
          (Z[57] = U),
          (Z[58] = R))
        : (R = Z[58]),
      Z[59] !== ee
        ? ((L = ee("web.consent.analytics")), (Z[59] = ee), (Z[60] = L))
        : (L = Z[60]),
      Z[61] !== L
        ? ((A = (0, i.jsx)(P.Q, {
            className: "text-sm text-text-secondary",
            htmlFor: "consent-analytics",
            children: L,
          })),
          (Z[61] = L),
          (Z[62] = A))
        : (A = Z[62]),
      Z[63] !== R || Z[64] !== A
        ? ((T = (0, i.jsxs)("div", {
            className: "flex items-center gap-x-2",
            children: [R, A],
          })),
          (Z[63] = R),
          (Z[64] = A),
          (Z[65] = T))
        : (T = Z[65]),
      Z[66] !== ev
        ? ((O = (e) => ev(e)), (Z[66] = ev), (Z[67] = O))
        : (O = Z[67]),
      Z[68] !== ec.preferences || Z[69] !== O
        ? ((z = (0, i.jsx)("input", {
            checked: ec.preferences,
            id: "consent-preferences",
            name: "preferences",
            onChange: O,
            type: "checkbox",
            "data-testid": "consent-preferences",
          })),
          (Z[68] = ec.preferences),
          (Z[69] = O),
          (Z[70] = z))
        : (z = Z[70]),
      Z[71] !== ee
        ? ((B = ee("web.consent.preferences")), (Z[71] = ee), (Z[72] = B))
        : (B = Z[72]),
      Z[73] !== B
        ? ((F = (0, i.jsx)(P.Q, {
            className: "text-sm text-text-secondary",
            htmlFor: "consent-preferences",
            children: B,
          })),
          (Z[73] = B),
          (Z[74] = F))
        : (F = Z[74]),
      Z[75] !== z || Z[76] !== F
        ? ((D = (0, i.jsxs)("div", {
            className: "flex items-center gap-x-2",
            children: [z, F],
          })),
          (Z[75] = z),
          (Z[76] = F),
          (Z[77] = D))
        : (D = Z[77]),
      Z[78] !== S || Z[79] !== T || Z[80] !== D
        ? (($ = (0, i.jsxs)("div", {
            className: "flex flex-col gap-y-2 mb-6",
            children: [S, T, D],
          })),
          (Z[78] = S),
          (Z[79] = T),
          (Z[80] = D),
          (Z[81] = $))
        : ($ = Z[81]),
      Z[82] !== ee
        ? ((K = ee("web.consent.reject_all")), (Z[82] = ee), (Z[83] = K))
        : (K = Z[83]),
      Z[84] !== ey || Z[85] !== K
        ? ((V = (0, i.jsx)(P.K, {
            className: "max-[380px]:w-full",
            onClick: ey,
            variant: "secondary",
            "data-testid": "reject-all-button",
            children: K,
          })),
          (Z[84] = ey),
          (Z[85] = K),
          (Z[86] = V))
        : (V = Z[86]),
      Z[87] !== ee
        ? ((M = ee("web.consent.accept_all")), (Z[87] = ee), (Z[88] = M))
        : (M = Z[88]),
      Z[89] !== eg || Z[90] !== M
        ? ((H = (0, i.jsx)(P.K, {
            className: "max-[380px]:w-full",
            onClick: eg,
            variant: "secondary",
            "data-testid": "accept-all-button",
            children: M,
          })),
          (Z[89] = eg),
          (Z[90] = M),
          (Z[91] = H))
        : (H = Z[91]),
      Z[92] !== V || Z[93] !== H
        ? ((W = (0, i.jsxs)("div", {
            className:
              "flex items-center gap-x-2 max-[380px]:flex-col max-[380px]:gap-y-2 max-[380px]:w-full",
            children: [V, H],
          })),
          (Z[92] = V),
          (Z[93] = H),
          (Z[94] = W))
        : (W = Z[94]),
      Z[95] !== ee
        ? ((X = ee("web.consent.save_changes")), (Z[95] = ee), (Z[96] = X))
        : (X = Z[96]),
      Z[97] !== ex || Z[98] !== X
        ? ((Q = (0, i.jsx)(P.K, {
            className: "max-[380px]:w-full",
            onClick: ex,
            variant: "primary",
            "data-testid": "save-changes-button",
            children: X,
          })),
          (Z[97] = ex),
          (Z[98] = X),
          (Z[99] = Q))
        : (Q = Z[99]),
      Z[100] !== W || Z[101] !== Q
        ? ((q = (0, i.jsxs)("div", {
            className:
              "flex items-center justify-between gap-x-2 max-[380px]:flex-col max-[380px]:gap-y-2",
            children: [W, Q],
          })),
          (Z[100] = W),
          (Z[101] = Q),
          (Z[102] = q))
        : (q = Z[102]),
      Z[103] !== I || Z[104] !== $ || Z[105] !== q
        ? ((G = (0, i.jsxs)(tr.f, {
            className: "max-w-[420px]",
            children: [I, $, q],
          })),
          (Z[103] = I),
          (Z[104] = $),
          (Z[105] = q),
          (Z[106] = G))
        : (G = Z[106]),
      Z[107] !== et || Z[108] !== G
        ? ((J = (0, i.jsx)(tn.f.Root, {
            onOpenChange: en,
            open: et,
            children: G,
          })),
          (Z[107] = et),
          (Z[108] = G),
          (Z[109] = J))
        : (J = Z[109]),
      Z[110] !== x || Z[111] !== J
        ? ((Y = (0, i.jsxs)(i.Fragment, { children: [x, J] })),
          (Z[110] = x),
          (Z[111] = J),
          (Z[112] = Y))
        : (Y = Z[112]),
      Y
    );
  }
  function tp() {
    return tc(tl) ?? to;
  }
  var th = e.i(30824);
  function tg() {
    let e,
      t,
      n = (0, r.c)(4),
      i = (0, eV.l)(),
      a = (0, th.f)(ty);
    return (
      n[0] !== i || n[1] !== a
        ? ((e = () => {
            a(i);
          }),
          (t = [i, a]),
          (n[0] = i),
          (n[1] = a),
          (n[2] = e),
          (n[3] = t))
        : ((e = n[2]), (t = n[3])),
      (0, o.useEffect)(e, t),
      null
    );
  }
  function ty(e) {
    return e.setEmployeeUnlocked;
  }
  var tx = e.i(184350),
    tv = e.i(503630),
    tb = e.i(466786);
  let t_ = () => {
    let t,
      n,
      i,
      a = (0, r.c)(7),
      { address: l, decodedJwt: c } = (0, s.F)();
    a[0] !== l || a[1] !== c
      ? ((t = (0, tb.f)(c, l)), (a[0] = l), (a[1] = c), (a[2] = t))
      : (t = a[2]);
    let d = t;
    return (
      a[3] !== l || a[4] !== d
        ? ((n = () => {
            let t = !1;
            return (
              e.A(276838).then((e) => {
                let { datadogRum: n } = e;
                if (!t) {
                  if (!l) return void n.clearUser();
                  n.setUser({
                    id: d ?? l,
                    id_kind: d ? "cc_user_id" : "wallet",
                    wallet_address: l,
                  });
                }
              }),
              () => {
                t = !0;
              }
            );
          }),
          (i = [l, d]),
          (a[3] = l),
          (a[4] = d),
          (a[5] = n),
          (a[6] = i))
        : ((n = a[5]), (i = a[6])),
      (0, o.useEffect)(n, i),
      null
    );
  };
  var tw = e.i(553301),
    tI = e.i(528600),
    tj = e.i(174764),
    tE = e.i(516755);
  let tk = () => {};
  function tN(e) {
    try {
      localStorage.removeItem(e);
    } catch {}
  }
  function tS(e) {
    let t,
      n,
      a,
      l,
      c,
      u,
      m,
      f,
      p,
      h,
      g = (0, r.c)(26),
      { authReady: x, children: v } = e,
      b = (0, d.s)(),
      [_, w] = (0, o.useState)(!1),
      I = _ ? null : (b ?? null),
      j = I?.address,
      E = I?.userId ?? j ?? "";
    g[0] !== E
      ? ((t = { userIdentifier: E }), (g[0] = E), (g[1] = t))
      : (t = g[1]);
    let { data: k, refetch: N } = (0, tI.U)(t),
      { publicKey: S } = (0, tE.P)();
    g[2] !== S ? ((n = S?.toBase58()), (g[2] = S), (g[3] = n)) : (n = g[3]);
    let C = n;
    g[4] !== I || g[5] !== C
      ? ((a = (0, tw.K)({
          decodedJwt: I,
          privyAuthenticated: !1,
          publicKeyAddress: C,
        })),
        (g[4] = I),
        (g[5] = C),
        (g[6] = a))
      : (a = g[6]);
    let U = a,
      R = !!I && !!C && I.address !== C;
    (g[7] !== R
      ? ((l = () => {
          R && (0, y.f)();
        }),
        (c = [R]),
        (g[7] = R),
        (g[8] = l),
        (g[9] = c))
      : ((l = g[8]), (c = g[9])),
      (0, o.useEffect)(l, c),
      g[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = () => {
            ((0, d.c)(), tN("decoded-jwt"), tN("moderator-storage"), w(!0));
          }),
          (g[10] = u))
        : (u = g[10]));
    let P = u;
    g[11] === Symbol.for("react.memo_cache_sentinel")
      ? ((m = async () => {
          let { verdict: e } = await (0, tj.f)((0, eD.j)());
          return "rejected" !== e ? "ok" : (P(), "invalid");
        }),
        (g[11] = m))
      : (m = g[11]);
    let L = m;
    g[12] === Symbol.for("react.memo_cache_sentinel")
      ? ((f = async () => {
          P();
          let e = (0, eD.j)()("POST /auth/logout", {
            credentials: "include",
            throwHttpErrors: !1,
          }).then(tL, tP);
          ((0, e8.c)(), (0, y.f)(), await e);
        }),
        (g[12] = f))
      : (f = g[12]);
    let A = f,
      T = I?.roles,
      O = I?.permissions,
      z = I?.userId,
      B = x || !!b || _;
    g[13] !== I ||
    g[14] !== j ||
    g[15] !== N ||
    g[16] !== U ||
    g[17] !== T ||
    g[18] !== O ||
    g[19] !== z ||
    g[20] !== B ||
    g[21] !== k
      ? ((p = {
          login: tR,
          privyLogin: tU,
          privyLoginFailed: !1,
          resetPrivyLoginFailure: tk,
          xSignupBlocked: !1,
          resetXSignupBlocked: tk,
          privySignInError: null,
          privyMfaEnrolled: !1,
          resetPrivySignInError: tk,
          privySignInStage: null,
          logout: A,
          loginLoading: !1,
          address: j,
          XAccountConnected: !1,
          setXAccountConnected: tk,
          roles: T,
          permissions: O,
          userId: z,
          user: k,
          fetchUser: N,
          decodedJwt: I,
          requiresLogin: U,
          wallet: void 0,
          shouldUsePrivy: !1,
          isPrivyEmbeddedSigner: !1,
          authReady: B,
          revalidateSession: L,
          signSolanaMessage: tC,
        }),
        (g[13] = I),
        (g[14] = j),
        (g[15] = N),
        (g[16] = U),
        (g[17] = T),
        (g[18] = O),
        (g[19] = z),
        (g[20] = B),
        (g[21] = k),
        (g[22] = p))
      : (p = g[22]);
    let F = p;
    return (
      g[23] !== v || g[24] !== F
        ? ((h = (0, i.jsx)(s.$.Provider, { value: F, children: v })),
          (g[23] = v),
          (g[24] = F),
          (g[25] = h))
        : (h = g[25]),
      h
    );
  }
  async function tC() {
    throw ((0, y.f)(), Error("Sign in to sign messages"));
  }
  function tU() {
    (0, y.f)();
  }
  async function tR() {
    (0, y.f)();
  }
  function tP() {}
  function tL() {}
  var tA = e.i(911938);
  let tT = () => {
    let e,
      t = (0, r.c)(3),
      { address: n, decodedJwt: a, userId: l } = (0, s.F)(),
      o = a?.address === n ? l : void 0;
    return (
      t[0] !== n || t[1] !== o
        ? ((e = (0, i.jsx)(tA.LaunchDarklyUser, { address: n, ccUserId: o })),
          (t[0] = n),
          (t[1] = o),
          (t[2] = e))
        : (e = t[2]),
      e
    );
  };
  var tO = e.i(127962),
    tz = e.i(30775);
  let tB = null,
    tF = "walletName";
  function tD() {
    try {
      let e = localStorage.getItem(tF);
      if (!e) return null;
      let t = JSON.parse(e);
      return "string" == typeof t && t ? t : null;
    } catch {
      return null;
    }
  }
  var t$ = e.i(344500);
  function tK() {
    let e = (0, d.D)();
    return null !== e && Number.isFinite(e.exp) && 1e3 * e.exp > Date.now();
  }
  function tV() {
    try {
      let e;
      !(function ({ hasSession: e, rememberedWalletName: t }) {
        let n = tD();
        if (!e) return null === n || localStorage.removeItem(tF);
        null !== n || (t && localStorage.setItem(tF, JSON.stringify(t)));
      })({
        hasSession: tK(),
        rememberedWalletName: !(function () {
          if ("u" < typeof navigator) return !1;
          let e = navigator.userAgent.toLowerCase();
          return (
            (e.includes("iphone") || e.includes("ipad")) &&
            e.includes("safari") &&
            !(0, t$.X)()
          );
        })()
          ? ((e = (0, h.S)()), e?.kind === "wallet" ? e.name : null)
          : null,
      });
    } catch (e) {
      a.y.error("Error reconciling the persisted wallet selection", {
        error: e,
      });
    }
  }
  let tM = (t) => {
    let n,
      a,
      s,
      l,
      c = (0, r.c)(9),
      { children: d } = t;
    (0, o.useState)(tH);
    let [u, m] = (0, o.useState)(null),
      f = (0, eB.f)();
    (c[0] !== f
      ? ((n = () => {
          let t = !1,
            n = () => {
              (tV(),
                (tB ??= e
                  .A(104132)
                  .then((e) => e.WalletProviderTree)
                  .catch((e) => {
                    throw ((tB = null), e);
                  }))
                  .then((e) => {
                    t || m(() => e);
                  })
                  .catch(tW));
            },
            i = (0, tO._)(n);
          return (
            ((0, tO.W)() ||
              (f &&
                (function () {
                  try {
                    return null !== tD() && tK();
                  } catch {
                    return !1;
                  }
                })())) &&
              n(),
            () => {
              ((t = !0), i());
            }
          );
        }),
        (a = [f]),
        (c[0] = f),
        (c[1] = n),
        (c[2] = a))
      : ((n = c[1]), (a = c[2])),
      (0, o.useEffect)(n, a));
    let p = (0, o.useSyncExternalStore)(tz.z, tz.Z, tz.s);
    return (
      c[3] !== u
        ? ((s = u ? (0, i.jsx)(u, {}) : null), (c[3] = u), (c[4] = s))
        : (s = c[4]),
      c[5] !== d || c[6] !== s || c[7] !== p
        ? ((l = (0, i.jsxs)(tE.x.Provider, { value: p, children: [s, d] })),
          (c[5] = d),
          (c[6] = s),
          (c[7] = p),
          (c[8] = l))
        : (l = c[8]),
      l
    );
  };
  function tH() {
    return (tV(), null);
  }
  function tW(e) {
    a.y.error("Failed to load wallet provider tree", { error: e });
  }
  let tX = () => ((0, y.L)() ? "loading" : "cold"),
    tQ = () => "loading";
  function tq(e) {
    let t,
      n,
      a,
      l,
      c,
      d = (0, r.c)(12),
      { children: u } = e,
      m = (0, o.use)(s.$),
      f = (0, o.use)(tx.j),
      p = (0, o.use)(eV.O),
      h = (0, B.m)(s.$) ?? m,
      g = (0, B.m)(tx.j) ?? f,
      y = (0, B.m)(eV.O) ?? p;
    return (
      d[0] !== y
        ? ((t = () => (0, eM.D)(y)),
          (n = [y]),
          (d[0] = y),
          (d[1] = t),
          (d[2] = n))
        : ((t = d[1]), (n = d[2])),
      (0, o.useEffect)(t, n),
      d[3] !== u || d[4] !== y
        ? ((a = (0, i.jsx)(eV.O, { value: y, children: u })),
          (d[3] = u),
          (d[4] = y),
          (d[5] = a))
        : (a = d[5]),
      d[6] !== g || d[7] !== a
        ? ((l = (0, i.jsx)(tx.j, { value: g, children: a })),
          (d[6] = g),
          (d[7] = a),
          (d[8] = l))
        : (l = d[8]),
      d[9] !== h || d[10] !== l
        ? ((c = (0, i.jsx)(s.$, { value: h, children: l })),
          (d[9] = h),
          (d[10] = l),
          (d[11] = c))
        : (c = d[11]),
      c
    );
  }
  e.s(
    [
      "AuthProviders",
      0,
      function (e) {
        let t,
          n,
          s,
          c,
          d,
          u,
          m,
          f,
          p,
          h,
          g,
          x,
          v,
          b = (0, r.c)(24),
          { children: _ } = e,
          w = (0, o.useSyncExternalStore)(y.e, tX, tQ),
          [I, j] = (0, o.useState)(null),
          [E, k] = (0, o.useState)(!1),
          [N, S] = (0, o.useState)(!1);
        b[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = () => S(!0)), (b[0] = t))
          : (t = b[0]);
        let C = t,
          U = (0, eB.f)();
        (b[1] !== U
          ? ((n = () => {
              let e = !1,
                t = () => {
                  ((0, y.v)() || (U && (0, y.L)())) &&
                    (0, y.H)()
                      .then((t) => {
                        e || j(() => t);
                      })
                      .catch((t) => {
                        (a.y.error("Failed to load Privy auth tree", {
                          error: t,
                        }),
                          e || k(!0));
                      });
                };
              t();
              let n = (0, y.e)(t);
              return () => {
                ((e = !0), n());
              };
            }),
            (s = [U]),
            (b[1] = U),
            (b[2] = n),
            (b[3] = s))
          : ((n = b[2]), (s = b[3])),
          (0, o.useEffect)(n, s),
          b[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = (0, i.jsx)(tT, {})),
              (d = (0, i.jsx)(tg, {})),
              (u = (0, i.jsx)(t_, {})),
              (b[4] = c),
              (b[5] = d),
              (b[6] = u))
            : ((c = b[4]), (d = b[5]), (u = b[6])),
          b[7] !== _
            ? ((m = (0, i.jsxs)(tq, {
                children: [c, d, u, (0, i.jsx)(e3, { children: _ })],
              })),
              (b[7] = _),
              (b[8] = m))
            : (m = b[8]));
        let R = m;
        return (
          b[9] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = (0, tv.R)()), (b[9] = f))
            : (f = b[9]),
          b[10] !== I ||
          b[11] !== R ||
          b[12] !== N ||
          b[13] !== E ||
          b[14] !== w
            ? ((p =
                I && N
                  ? (0, i.jsx)(B._, {
                      value: !0,
                      children: (0, i.jsxs)(I, {
                        children: [(0, i.jsx)(B.j, {}), R],
                      }),
                    })
                  : (0, i.jsx)(tS, {
                      authReady: "cold" === w || E,
                      children: R,
                    })),
              (b[10] = I),
              (b[11] = R),
              (b[12] = N),
              (b[13] = E),
              (b[14] = w),
              (b[15] = p))
            : (p = b[15]),
          b[16] !== I || b[17] !== N
            ? ((h =
                I && !N
                  ? (0, i.jsx)(B._, {
                      value: !0,
                      children: (0, i.jsx)(I, {
                        children: (0, i.jsx)(B.p, { onUnavailable: C }),
                      }),
                    })
                  : null),
              (b[16] = I),
              (b[17] = N),
              (b[18] = h))
            : (h = b[18]),
          b[19] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (0, i.jsx)(tt, {})),
              (x = (0, i.jsx)(tf, {})),
              (b[19] = g),
              (b[20] = x))
            : ((g = b[19]), (x = b[20])),
          b[21] !== h || b[22] !== p
            ? ((v = (0, i.jsx)(tM, {
                children: (0, i.jsxs)(l.UserConfigProvider, {
                  clientServerUrl: f,
                  children: [p, h, g, x],
                }),
              })),
              (b[21] = h),
              (b[22] = p),
              (b[23] = v))
            : (v = b[23]),
          v
        );
      },
    ],
    589428,
  );
};
