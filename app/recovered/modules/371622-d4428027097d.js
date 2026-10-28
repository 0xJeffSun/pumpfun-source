// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(745018),
    n = e.i(439587),
    a = e.i(426091),
    r = e.i(574472),
    s = e.i(458310);
  e.i(12692);
  var o = e.i(398902),
    c = e.i(548630),
    d = e.i(21384),
    u = e.i(338871),
    x = e.i(236810),
    m = e.i(356647),
    f = e.i(595673),
    b = e.i(198825),
    p = e.i(779642);
  let _ = "/settings/account",
    g = {
      compact:
        "flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-xs font-medium text-text-primary transition-colors hover:bg-bg-secondary [&>svg]:size-5",
      comfortable:
        "flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm leading-5 font-medium text-text-primary transition-colors hover:bg-bg-tertiary [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-text-tertiary",
    },
    h = {
      compact:
        "size-5 animate-spin rounded-full border-2 border-current border-t-transparent",
      comfortable:
        "size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
    };
  function y(e) {
    let l,
      n,
      a,
      r = (0, i.c)(13),
      { icon: s, label: o, onClick: c, testId: d, busy: u, density: x } = e,
      m = u || void 0,
      f = g[x];
    return (
      r[0] !== u || r[1] !== x || r[2] !== s
        ? ((l = u
            ? (0, t.jsx)("span", { "aria-hidden": !0, className: h[x] })
            : s),
          (r[0] = u),
          (r[1] = x),
          (r[2] = s),
          (r[3] = l))
        : (l = r[3]),
      r[4] !== o
        ? ((n = (0, t.jsx)("span", { children: o })), (r[4] = o), (r[5] = n))
        : (n = r[5]),
      r[6] !== c ||
      r[7] !== m ||
      r[8] !== f ||
      r[9] !== l ||
      r[10] !== n ||
      r[11] !== d
        ? ((a = (0, t.jsxs)("button", {
            type: "button",
            onClick: c,
            "data-testid": d,
            "aria-busy": m,
            className: f,
            children: [l, n],
          })),
          (r[6] = c),
          (r[7] = m),
          (r[8] = f),
          (r[9] = l),
          (r[10] = n),
          (r[11] = d),
          (r[12] = a))
        : (a = r[12]),
      a
    );
  }
  function w(e) {
    let l,
      n,
      a = (0, i.c)(9),
      { icon: r, label: o, href: c, onClick: d, testId: u, density: x } = e,
      m = g[x];
    return (
      a[0] !== o
        ? ((l = (0, t.jsx)("span", { children: o })), (a[0] = o), (a[1] = l))
        : (l = a[1]),
      a[2] !== c ||
      a[3] !== r ||
      a[4] !== d ||
      a[5] !== m ||
      a[6] !== l ||
      a[7] !== u
        ? ((n = (0, t.jsxs)(s.default, {
            href: c,
            onClick: d,
            "data-testid": u,
            className: m,
            children: [r, l],
          })),
          (a[2] = c),
          (a[3] = r),
          (a[4] = d),
          (a[5] = m),
          (a[6] = l),
          (a[7] = u),
          (a[8] = n))
        : (n = a[8]),
      n
    );
  }
  function j(e) {
    let n,
      a,
      r,
      s,
      d = (0, i.c)(12),
      { onAction: u, onRequestLanguage: x, density: m } = e,
      { t: f } = (0, o.f)();
    d[0] !== m || d[1] !== f
      ? ((n = (e) =>
          (0, t.jsx)(y, {
            icon: (0, t.jsx)(l.DZ, {}),
            label: f("settings.language_menu_title"),
            onClick: e,
            testId: "profile-action-language",
            density: m,
          })),
        (d[0] = m),
        (d[1] = f),
        (d[2] = n))
      : (n = d[2]);
    let b = n;
    return (
      d[3] !== b ? ((a = b()), (d[3] = b), (d[4] = a)) : (a = d[4]),
      d[5] !== b || d[6] !== x
        ? ((r = b(x)), (d[5] = b), (d[6] = x), (d[7] = r))
        : (r = d[7]),
      d[8] !== u || d[9] !== a || d[10] !== r
        ? ((s = (0, t.jsx)(c.S, {
            section: "display",
            settingId: "display.language",
            onBeforeOpen: u,
            trigger: a,
            children: r,
          })),
          (d[8] = u),
          (d[9] = a),
          (d[10] = r),
          (d[11] = s))
        : (s = d[11]),
      s
    );
  }
  e.s(
    [
      "p",
      0,
      _,
      "L",
      0,
      function (e) {
        let s,
          g,
          h,
          k,
          v,
          N,
          C,
          T,
          S,
          O,
          L,
          A,
          E,
          D,
          I,
          q,
          K,
          U,
          z,
          F,
          R = (0, i.c)(81),
          {
            className: P,
            onAction: Q,
            onRequestLogout: X,
            onRequestLanguage: B,
            onRequestXLink: W,
            density: M,
          } = e,
          V = void 0 === M ? "compact" : M,
          { t: G } = (0, o.f)(),
          { address: H, shouldUsePrivy: Z } = (0, r.F)(),
          {
            setShowExport: Y,
            setShowWithdraw: $,
            setShowLinkLogin: J,
          } = (0, b.useConnectWallet)(),
          { toggleChat: ee, isBooting: et } = (0, u.f)(),
          { method: ei, reader: el, ownsSessionWallet: en } = (0, d.f)();
        R[0] !== ei
          ? ((s = (0, m.l)(ei)), (R[0] = ei), (R[1] = s))
          : (s = R[1]);
        let ea = s;
        R[2] !== H || R[3] !== ea
          ? ((g = { address: H, enabled: ea }),
            (R[2] = H),
            (R[3] = ea),
            (R[4] = g))
          : (g = R[4]);
        let { data: er } = (0, x.f)(g),
          es = ea && er?.linked !== !0;
        R[5] !== H
          ? ((h = (e) => (H ? e.progressByWallet[H] : void 0)),
            (R[5] = H),
            (R[6] = h))
          : (h = R[6]);
        let eo = (0, p.i)(h),
          ec = "comfortable" === V,
          ed = ec
            ? "-mx-3 gap-x-1 gap-y-0.5"
            : "gap-1 rounded-xl border border-border-secondary p-2";
        (R[7] !== P || R[8] !== ed
          ? ((k = (0, a.c)(
              "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
              ed,
              P,
            )),
            (R[7] = P),
            (R[8] = ed),
            (R[9] = k))
          : (k = R[9]),
          R[10] === Symbol.for("react.memo_cache_sentinel")
            ? ((v = (0, t.jsx)(l.aj, {})), (R[10] = v))
            : (v = R[10]),
          R[11] !== G
            ? ((N = G("common.support")), (R[11] = G), (R[12] = N))
            : (N = R[12]),
          R[13] !== Q || R[14] !== ee
            ? ((C = () => {
                (Q?.(), ee());
              }),
              (R[13] = Q),
              (R[14] = ee),
              (R[15] = C))
            : (C = R[15]),
          R[16] !== V || R[17] !== et || R[18] !== N || R[19] !== C
            ? ((T = (0, t.jsx)(y, {
                icon: v,
                label: N,
                onClick: C,
                busy: et,
                testId: "profile-action-support",
                density: V,
              })),
              (R[16] = V),
              (R[17] = et),
              (R[18] = N),
              (R[19] = C),
              (R[20] = T))
            : (T = R[20]),
          R[21] !== V || R[22] !== Q || R[23] !== en || R[24] !== G
            ? ((S = en
                ? (0, t.jsx)(w, {
                    icon: (0, t.jsx)(l._6, {}),
                    label: G("account.management.title"),
                    href: _,
                    onClick: Q,
                    testId: "profile-action-account-management",
                    density: V,
                  })
                : null),
              (R[21] = V),
              (R[22] = Q),
              (R[23] = en),
              (R[24] = G),
              (R[25] = S))
            : (S = R[25]),
          R[26] === Symbol.for("react.memo_cache_sentinel")
            ? ((O = (0, t.jsx)(l.Tc, {})), (R[26] = O))
            : (O = R[26]),
          R[27] !== G
            ? ((L = G("web.x_link.title")), (R[27] = G), (R[28] = L))
            : (L = R[28]),
          R[29] !== Q || R[30] !== W
            ? ((A = () => {
                (Q?.(), W());
              }),
              (R[29] = Q),
              (R[30] = W),
              (R[31] = A))
            : (A = R[31]),
          R[32] !== V || R[33] !== L || R[34] !== A
            ? ((E = (0, t.jsx)(y, {
                icon: O,
                label: L,
                onClick: A,
                testId: "profile-action-x-link",
                density: V,
              })),
              (R[32] = V),
              (R[33] = L),
              (R[34] = A),
              (R[35] = E))
            : (E = R[35]),
          R[36] !== V ||
          R[37] !== eo ||
          R[38] !== Q ||
          R[39] !== J ||
          R[40] !== es ||
          R[41] !== G
            ? ((D = es
                ? (0, t.jsx)(y, {
                    icon: (0, t.jsx)(l.HU, {}),
                    label: G(
                      eo
                        ? "account.privy_link.settings_row_finish"
                        : "account.privy_link.settings_row",
                    ),
                    onClick: () => {
                      (Q?.(),
                        (0, f.yt)({
                          surface: "profile",
                          interactionType: "cta",
                          cta: "link",
                        }),
                        J(!0));
                    },
                    testId: "profile-action-link-login",
                    density: V,
                  })
                : null),
              (R[36] = V),
              (R[37] = eo),
              (R[38] = Q),
              (R[39] = J),
              (R[40] = es),
              (R[41] = G),
              (R[42] = D))
            : (D = R[42]),
          R[43] !== H ||
          R[44] !== V ||
          R[45] !== Q ||
          R[46] !== $ ||
          R[47] !== Z ||
          R[48] !== G
            ? ((I = Z
                ? (0, t.jsx)(y, {
                    icon: (0, t.jsx)(l.q4, {}),
                    label: G("web.account.withdraw"),
                    onClick: () => {
                      (Q?.(), (0, f.sT)({ profileId: H }), $(!0));
                    },
                    testId: "profile-action-withdraw",
                    density: V,
                  })
                : null),
              (R[43] = H),
              (R[44] = V),
              (R[45] = Q),
              (R[46] = $),
              (R[47] = Z),
              (R[48] = G),
              (R[49] = I))
            : (I = R[49]),
          R[50] !== V ||
          R[51] !== Q ||
          R[52] !== Y ||
          R[53] !== Z ||
          R[54] !== G
            ? ((q = Z
                ? (0, t.jsx)(y, {
                    icon: (0, t.jsx)(l.bi, {}),
                    label: G("settings.export_wallet"),
                    onClick: () => {
                      (Q?.(), (0, f.Gu)(), Y(!0));
                    },
                    testId: "profile-action-export-wallet",
                    density: V,
                  })
                : null),
              (R[50] = V),
              (R[51] = Q),
              (R[52] = Y),
              (R[53] = Z),
              (R[54] = G),
              (R[55] = q))
            : (q = R[55]),
          R[56] !== V || R[57] !== Q || R[58] !== B
            ? ((K = (0, t.jsx)(j, {
                onAction: Q,
                onRequestLanguage: B,
                density: V,
              })),
              (R[56] = V),
              (R[57] = Q),
              (R[58] = B),
              (R[59] = K))
            : (K = R[59]),
          R[60] !== ec || R[61] !== V || R[62] !== X || R[63] !== G
            ? ((U = ec
                ? (0, t.jsx)("div", {
                    className: "col-span-full px-3 pt-2",
                    children: (0, t.jsx)(n.K, {
                      variant: "secondary",
                      size: 36,
                      isFullWidth: !0,
                      iconStart: (0, t.jsx)(l.jC, {}),
                      onClick: X,
                      className: "!text-loss",
                      "data-testid": "profile-action-logout",
                      children: G("account.logout"),
                    }),
                  })
                : (0, t.jsx)(y, {
                    icon: (0, t.jsx)(l.jC, {}),
                    label: G("account.logout"),
                    onClick: X,
                    testId: "profile-action-logout",
                    density: V,
                  })),
              (R[60] = ec),
              (R[61] = V),
              (R[62] = X),
              (R[63] = G),
              (R[64] = U))
            : (U = R[64]));
        let eu = ec
          ? "col-span-full h-10 justify-center rounded-md text-[13px] leading-[18px] hover:bg-bg-tertiary"
          : "col-span-full h-9 justify-center rounded-lg hover:bg-bg-secondary";
        return (
          R[65] !== Q || R[66] !== eu
            ? ((z = (0, t.jsx)(c.E, {
                section: "account",
                onBeforeOpen: Q,
                className: eu,
              })),
              (R[65] = Q),
              (R[66] = eu),
              (R[67] = z))
            : (z = R[67]),
          R[68] !== el ||
          R[69] !== V ||
          R[70] !== T ||
          R[71] !== S ||
          R[72] !== E ||
          R[73] !== D ||
          R[74] !== I ||
          R[75] !== q ||
          R[76] !== K ||
          R[77] !== U ||
          R[78] !== z ||
          R[79] !== k
            ? ((F = (0, t.jsxs)("div", {
                "data-testid": "profile-session-actions",
                "data-density": V,
                className: k,
                children: [T, S, E, D, I, q, K, U, z, el],
              })),
              (R[68] = el),
              (R[69] = V),
              (R[70] = T),
              (R[71] = S),
              (R[72] = E),
              (R[73] = D),
              (R[74] = I),
              (R[75] = q),
              (R[76] = K),
              (R[77] = U),
              (R[78] = z),
              (R[79] = k),
              (R[80] = F))
            : (F = R[80]),
          F
        );
      },
    ],
    371622,
  );
  var k = e.i(187611);
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          a,
          r,
          s,
          o,
          c,
          d = (0, i.c)(15),
          { username: u, subtitle: x, trailing: m, href: f, testId: b } = e,
          p = `@${u}`;
        d[0] !== p
          ? ((n = (0, k.T)(p, "x-handle")), (d[0] = p), (d[1] = n))
          : (n = d[1]);
        let _ = n;
        return (
          d[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((a = (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "flex size-9 shrink-0 items-center justify-center rounded-md bg-bg-tertiary text-text-primary",
                children: (0, t.jsx)(l.Tc, { size: 18 }),
              })),
              (d[2] = a))
            : (a = d[2]),
          d[3] !== _ || d[4] !== f
            ? ((r = f
                ? (0, t.jsx)("a", {
                    href: f,
                    target: "_blank",
                    rel: "noreferrer",
                    className:
                      "truncate text-sm font-medium leading-5 text-text-primary hover:underline",
                    children: _,
                  })
                : (0, t.jsx)("p", {
                    className:
                      "truncate text-sm font-medium leading-5 text-text-primary",
                    children: _,
                  })),
              (d[3] = _),
              (d[4] = f),
              (d[5] = r))
            : (r = d[5]),
          d[6] !== x
            ? ((s = (0, t.jsx)("p", {
                className:
                  "truncate text-[13px] leading-[18px] text-text-tertiary",
                children: x,
              })),
              (d[6] = x),
              (d[7] = s))
            : (s = d[7]),
          d[8] !== r || d[9] !== s
            ? ((o = (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-1 flex-col gap-0.5",
                children: [r, s],
              })),
              (d[8] = r),
              (d[9] = s),
              (d[10] = o))
            : (o = d[10]),
          d[11] !== o || d[12] !== b || d[13] !== m
            ? ((c = (0, t.jsxs)("div", {
                "data-testid": b,
                className: "flex items-center gap-3",
                children: [a, o, m],
              })),
              (d[11] = o),
              (d[12] = b),
              (d[13] = m),
              (d[14] = c))
            : (c = d[14]),
          c
        );
      },
    ],
    486467,
  );
};
