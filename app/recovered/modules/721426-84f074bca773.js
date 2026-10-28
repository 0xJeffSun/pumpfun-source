// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(157633),
    i = e.i(745018),
    n = e.i(322315),
    l = e.i(254010),
    s = e.i(574472),
    o = e.i(453706),
    c = e.i(458310),
    d = e.i(599077),
    u = e.i(352386);
  e.i(12692);
  var m = e.i(398902),
    f = e.i(612559),
    p = e.i(983044);
  let h = ["primary", "discover"],
    b = { primary: null, discover: "web.nav.discover" },
    x = [
      { key: "home", labelKey: "web.nav.home", group: "primary" },
      { key: "explore", labelKey: "web.nav.explore", group: "primary" },
      {
        key: "perps",
        labelKey: "web.nav.perps",
        group: "primary",
        requiresFlag: n.D.WEB_PERPS,
        isNew: !0,
      },
      { key: "leaderboard", labelKey: "web.nav.leaderboard", group: "primary" },
      { key: "live", labelKey: "web.nav.live", group: "primary" },
      { key: "bounties", labelKey: "web.nav.bounties", group: "discover" },
      { key: "mayhem", labelKey: "web.nav.mayhem", group: "discover" },
      {
        key: "holder_rewards",
        labelKey: "web.nav.holder_rewards",
        group: "discover",
        isNew: !0,
      },
      {
        key: "referrals",
        labelKey: "web.nav.referrals",
        group: "discover",
        requiresFlag: n.D.WEB_PROFILE_REFERRALS_TAB,
        requiresSession: !0,
      },
      {
        key: "packs",
        labelKey: "web.nav.packs",
        group: "discover",
        requiresFlag: n.D.WEB_PACKS,
        isNew: !0,
      },
      {
        key: "watchlist",
        labelKey: "web.nav.watchlist",
        group: "discover",
        requiresSession: !0,
      },
      {
        key: "orders",
        labelKey: "web.nav.orders",
        group: "discover",
        requiresFlag: n.D.WEB_BLOCKCHAIN_LIMIT_ORDERS,
        requiresSession: !0,
      },
      { key: "pump", labelKey: "web.nav.pump_token", group: "discover" },
    ],
    g = [
      {
        key: "messages",
        labelKey: "web.nav.messages",
        requiresFlag: n.D.WEB_DIRECT_MESSAGES,
        requiresSession: !0,
      },
      {
        key: "notifications",
        labelKey: "web.nav.notifications",
        requiresFlag: n.D.WEB_HERMES_NOTIFICATIONS,
      },
      {
        key: "settings",
        labelKey: "web.nav.settings",
        requiresFlag: n.D.WEB_SETTINGS_HUB,
      },
      { key: "support", labelKey: "web.nav.support" },
      { key: "terminal", labelKey: "web.nav.terminal" },
      { key: "get_app", labelKey: "web.nav.get_app" },
    ],
    y = (e) => void 0 === e.requiresFlag && !0 !== e.requiresSession;
  (x.filter(y), g.filter(y));
  var v = e.i(329892),
    w = e.i(344187),
    _ = e.i(839931),
    j = e.i(538943),
    C = e.i(907789);
  function N(e) {
    let a,
      i = (0, r.c)(2),
      { isNew: n } = e;
    return null !== (0, w.f)()
      ? null
      : (i[0] !== n
          ? ((a = n ? (0, t.jsx)(v.f, {}) : null), (i[0] = n), (i[1] = a))
          : (a = i[1]),
        a);
  }
  function S() {
    let e,
      i,
      n,
      l,
      s,
      o,
      d,
      u = (0, r.c)(15),
      { t: f } = (0, m.f)(),
      p = (0, w.f)();
    return null === p
      ? null
      : (u[0] !== p || u[1] !== f
          ? ((i = ((e, t) => {
              if (null === t.until) return e("web.nav.packs_lock_forever");
              let {
                days: r,
                hours: a,
                minutes: i,
              } = (0, j.W)(t.until - Date.now());
              return r > 0
                ? e("web.nav.packs_lock_left_days", { days: r, hours: a })
                : a > 0
                  ? e("web.nav.packs_lock_left_hours", { hours: a, minutes: i })
                  : e("web.nav.packs_lock_left_minutes", { minutes: i });
            })(f, p)),
            (e = c.default),
            u[6] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = (0, _.Q)()), (u[6] = n))
              : (n = u[6]),
            (l = f("web.nav.packs_rip_lock_a11y", { left: i })),
            (u[0] = p),
            (u[1] = f),
            (u[2] = e),
            (u[3] = i),
            (u[4] = n),
            (u[5] = l))
          : ((e = u[2]), (i = u[3]), (n = u[4]), (l = u[5])),
        u[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, t.jsx)(a.dl, { className: "size-3 shrink-0" })),
            (u[7] = s))
          : (s = u[7]),
        u[8] !== i
          ? ((o = (0, t.jsx)("span", { className: "truncate", children: i })),
            (u[8] = i),
            (u[9] = o))
          : (o = u[9]),
        u[10] !== e || u[11] !== n || u[12] !== l || u[13] !== o
          ? ((d = (0, t.jsxs)(e, {
              href: n,
              "aria-label": l,
              onClick: k,
              className:
                "inline-flex max-w-[6.5rem] shrink-0 items-center gap-1 rounded-full bg-bg-tertiary px-2 py-0.5 text-[11px] leading-4 text-text-secondary tabular-nums hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
              "data-testid": "sidebar-packs-rip-lock",
              children: [s, o],
            })),
            (u[10] = e),
            (u[11] = n),
            (u[12] = l),
            (u[13] = o),
            (u[14] = d))
          : (d = u[14]),
        d);
  }
  function k() {
    return (0, C.d)("sidebar");
  }
  var E = e.i(439587);
  let A = (e) => {
    let a,
      i,
      n = (0, r.c)(3),
      { className: l } = e,
      s = void 0 === l ? "" : l;
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("path", {
            d: "M8.50033 3.56641V8.89974M8.50033 8.89974V14.2331M8.50033 8.89974H3.16699M8.50033 8.89974H13.8337",
            stroke: "currentColor",
            strokeWidth: "1.33",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          })),
          (n[0] = a))
        : (a = n[0]),
      n[1] !== s
        ? ((i = (0, t.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "17",
            height: "17",
            viewBox: "0 0 17 17",
            fill: "none",
            className: s,
            children: a,
          })),
          (n[1] = s),
          (n[2] = i))
        : (i = n[2]),
      i
    );
  };
  var I = e.i(554056),
    T = e.i(410718),
    R = e.i(171840),
    L = e.i(534867),
    O = e.i(382828),
    M = e.i(693957),
    D = e.i(231417),
    F = e.i(886973),
    P = e.i(397836),
    z = e.i(595673),
    K = e.i(198825);
  function B() {
    let e,
      a,
      n,
      l,
      o,
      d,
      f,
      p,
      h,
      b,
      x,
      g,
      y,
      v,
      w,
      _,
      j,
      C,
      N,
      S,
      k,
      B,
      q,
      W,
      U,
      V = (0, r.c)(55),
      { t: G } = (0, m.f)(),
      { address: $ } = (0, s.F)(),
      { setShowWallet: Q } = (0, K.useConnectWallet)(),
      { open: Z } = (0, T.useBountyCreateDialog)(),
      [Y, X] = (0, u.useState)(!1),
      [J, ee] = (0, u.useState)(!1);
    V[0] !== $ || V[1] !== Q
      ? ((e = (e) => {
          $ ? e() : Q(!0);
        }),
        (V[0] = $),
        (V[1] = Q),
        (V[2] = e))
      : (e = V[2]);
    let et = e;
    V[3] !== et
      ? ((a = () => et(() => X(!0))), (V[3] = et), (V[4] = a))
      : (a = V[4]);
    let er = a;
    V[5] !== Z || V[6] !== et
      ? ((n = () => {
          ((0, P.J)({ source: "global-sidebar" }), et(Z));
        }),
        (V[5] = Z),
        (V[6] = et),
        (V[7] = n))
      : (n = V[7]);
    let ea = n;
    V[8] !== et
      ? ((l = () =>
          et(() => {
            ((0, z.bh)(), ee(!0));
          })),
        (V[8] = et),
        (V[9] = l))
      : (l = V[9]);
    let ei = l;
    return (
      V[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(E.K, {
            variant: "primary",
            size: 32,
            isFullWidth: !0,
            iconStart: (0, t.jsx)(A, { className: "!size-4" }),
            className:
              "overflow-hidden whitespace-nowrap !text-[13px] !font-medium group-data-[state=collapsed]:mx-auto group-data-[state=collapsed]:!size-8 group-data-[state=collapsed]:!p-0 group-data-[state=collapsed]:[&>span]:hidden",
            "data-testid": "create-button-sidebar",
          })),
          (V[10] = o))
        : (o = V[10]),
      V[11] !== G
        ? ((d = G("web.nav.create")), (V[11] = G), (V[12] = d))
        : (d = V[12]),
      V[13] !== d
        ? ((f = (0, t.jsx)(F.f, { render: o, children: d })),
          (V[13] = d),
          (V[14] = f))
        : (f = V[14]),
      V[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = (0, t.jsx)(i.EX, {})), (V[15] = p))
        : (p = V[15]),
      V[16] !== G
        ? ((h = G("web.nav.callout")), (V[16] = G), (V[17] = h))
        : (h = V[17]),
      V[18] !== ei || V[19] !== h
        ? ((b = (0, t.jsxs)(D.f, {
            className: L.E,
            onClick: ei,
            children: [p, h],
          })),
          (V[18] = ei),
          (V[19] = h),
          (V[20] = b))
        : (b = V[20]),
      V[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, t.jsx)(i.vW, {})), (V[21] = x))
        : (x = V[21]),
      V[22] !== G
        ? ((g = G("web.nav.create_bounty")), (V[22] = G), (V[23] = g))
        : (g = V[23]),
      V[24] !== ea || V[25] !== g
        ? ((y = (0, t.jsxs)(D.f, {
            className: L.E,
            onClick: ea,
            children: [x, g],
          })),
          (V[24] = ea),
          (V[25] = g),
          (V[26] = y))
        : (y = V[26]),
      V[27] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = (0, t.jsx)(i.s4, {})), (V[27] = v))
        : (v = V[27]),
      V[28] !== G
        ? ((w = G("web.nav.go_live")), (V[28] = G), (V[29] = w))
        : (w = V[29]),
      V[30] !== er || V[31] !== w
        ? ((_ = (0, t.jsxs)(D.f, {
            className: L.E,
            onClick: er,
            children: [v, w],
          })),
          (V[30] = er),
          (V[31] = w),
          (V[32] = _))
        : (_ = V[32]),
      V[33] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = (0, t.jsx)(c.default, { href: "/create" })), (V[33] = j))
        : (j = V[33]),
      V[34] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = (0, t.jsx)(A, {})), (V[34] = C))
        : (C = V[34]),
      V[35] !== G
        ? ((N = G("web.nav.create_coin")), (V[35] = G), (V[36] = N))
        : (N = V[36]),
      V[37] !== N
        ? ((S = (0, t.jsxs)(D.f, {
            className: L.E,
            render: j,
            onClick: H,
            children: [C, N],
          })),
          (V[37] = N),
          (V[38] = S))
        : (S = V[38]),
      V[39] !== y || V[40] !== _ || V[41] !== S || V[42] !== b
        ? ((k = (0, t.jsxs)(M.f, {
            side: "right",
            align: "end",
            sideOffset: 5,
            positionMethod: "fixed",
            className: L.J,
            children: [b, y, _, S],
          })),
          (V[39] = y),
          (V[40] = _),
          (V[41] = S),
          (V[42] = b),
          (V[43] = k))
        : (k = V[43]),
      V[44] !== k || V[45] !== f
        ? ((B = (0, t.jsxs)(O.f, { modal: !1, children: [f, k] })),
          (V[44] = k),
          (V[45] = f),
          (V[46] = B))
        : (B = V[46]),
      V[47] !== Y
        ? ((q = (0, t.jsx)(I.f, { isOpen: Y, onOpenChange: X })),
          (V[47] = Y),
          (V[48] = q))
        : (q = V[48]),
      V[49] !== J
        ? ((W = (0, t.jsx)(R.f, { isOpen: J, onOpenChange: ee })),
          (V[49] = J),
          (V[50] = W))
        : (W = V[50]),
      V[51] !== B || V[52] !== q || V[53] !== W
        ? ((U = (0, t.jsxs)(t.Fragment, { children: [B, q, W] })),
          (V[51] = B),
          (V[52] = q),
          (V[53] = W),
          (V[54] = U))
        : (U = V[54]),
      U
    );
  }
  function H() {
    ((0, z.gt)({ source: "sidebar" }),
      window.dispatchEvent(new Event("exit-search")));
  }
  var q = e.i(261907);
  function W(e) {
    let a,
      i,
      n,
      l,
      s,
      o,
      c,
      d,
      u,
      f,
      p,
      h,
      b,
      x = (0, r.c)(28),
      { isOpen: g, onOpenChange: y } = e,
      { t: v } = (0, m.f)();
    return (
      x[0] !== v
        ? ((a = v("web.upsell.title")), (x[0] = v), (x[1] = a))
        : (a = x[1]),
      x[2] !== a
        ? ((i = (0, t.jsx)("h2", {
            className: "text-center text-xl font-semibold text-text-primary",
            children: a,
          })),
          (x[2] = a),
          (x[3] = i))
        : (i = x[3]),
      x[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(E.k, { height: 8 })), (x[4] = n))
        : (n = x[4]),
      x[5] !== v
        ? ((l = v("web.upsell.subtitle")), (x[5] = v), (x[6] = l))
        : (l = x[6]),
      x[7] !== l
        ? ((s = (0, t.jsx)("p", {
            className: "text-center text-text-tertiary",
            children: l,
          })),
          (x[7] = l),
          (x[8] = s))
        : (s = x[8]),
      x[9] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)(E.k, { height: 24 })), (x[9] = o))
        : (o = x[9]),
      x[10] !== v
        ? ((c = v("web.upsell.qr_alt")), (x[10] = v), (x[11] = c))
        : (c = x[11]),
      x[12] !== c
        ? ((d = (0, t.jsx)("div", {
            className: "flex justify-center",
            children: (0, t.jsx)("img", {
              src: "/mobile-upsell.svg",
              alt: c,
              width: 200,
              height: 200,
              className: "rounded",
            }),
          })),
          (x[12] = c),
          (x[13] = d))
        : (d = x[13]),
      x[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(E.k, { height: 24 })), (x[14] = u))
        : (u = x[14]),
      x[15] !== v
        ? ((f = v("web.upsell.learn_more")), (x[15] = v), (x[16] = f))
        : (f = x[16]),
      x[17] !== f
        ? ((p = (0, t.jsx)(E.K, {
            onClick: U,
            isFullWidth: !0,
            size: 48,
            children: f,
          })),
          (x[17] = f),
          (x[18] = p))
        : (p = x[18]),
      x[19] !== p || x[20] !== i || x[21] !== s || x[22] !== d
        ? ((h = (0, t.jsxs)(E.s, {
            className: "max-w-[400px]",
            children: [i, n, s, o, d, u, p],
          })),
          (x[19] = p),
          (x[20] = i),
          (x[21] = s),
          (x[22] = d),
          (x[23] = h))
        : (h = x[23]),
      x[24] !== g || x[25] !== y || x[26] !== h
        ? ((b = (0, t.jsx)(E.v, { isOpen: g, onIsOpenChange: y, children: h })),
          (x[24] = g),
          (x[25] = y),
          (x[26] = h),
          (x[27] = b))
        : (b = x[27]),
      b
    );
  }
  function U() {
    ((0, z.LR)({ interactionType: "click" }),
      window.open(q.f.LEARN_MORE_URL, "_blank"));
  }
  var V = e.i(146695),
    G = e.i(365089),
    $ = e.i(705313),
    Q = e.i(953283),
    Z = e.i(897665),
    Y = e.i(279602),
    X = e.i(410668),
    J = e.i(918094);
  function ee() {
    let e,
      a,
      i,
      n,
      l,
      o,
      d,
      u,
      m = (0, r.c)(25),
      { address: f, userId: p, user: h } = (0, s.F)(),
      b = (0, X.f)(),
      x = (0, Y.f)(h?.resolved_avatar_decoration);
    if (!f) return null;
    m[0] !== f || m[1] !== h || m[2] !== p
      ? ((e =
          (0, J.f)({ address: f, userId: p, user: h }) ??
          (0, V.d)("", h?.username)),
        (m[0] = f),
        (m[1] = h),
        (m[2] = p),
        (m[3] = e))
      : (e = m[3]);
    let g = e;
    m[4] !== f ? ((a = (0, G.d)(f)), (m[4] = f), (m[5] = a)) : (a = m[5]);
    let y = a,
      v = h?.username ? `@${h.username}` : y;
    return (
      m[6] !== f || m[7] !== b
        ? ((i = (0, t.jsx)($.f, {
            className: "size-8 shrink-0 rounded-full object-cover",
            ipfsPrefix: Z.f,
            isAnonymous: !1,
            src: b,
            address: f,
            width: 64,
            height: 64,
          })),
          (m[6] = f),
          (m[7] = b),
          (m[8] = i))
        : (i = m[8]),
      m[9] !== x || m[10] !== i
        ? ((n = (0, t.jsx)(Q.f, {
            decoration: x,
            variant: "list",
            children: i,
          })),
          (m[9] = x),
          (m[10] = i),
          (m[11] = n))
        : (n = m[11]),
      m[12] !== v
        ? ((l = (0, t.jsx)("span", {
            className:
              "truncate text-[13px] font-medium leading-4 text-text-primary",
            children: v,
          })),
          (m[12] = v),
          (m[13] = l))
        : (l = m[13]),
      m[14] !== y || m[15] !== h?.username
        ? ((o = h?.username
            ? (0, t.jsx)("span", {
                className:
                  "truncate text-[11px] leading-[14px] text-text-quaternary",
                children: y,
              })
            : null),
          (m[14] = y),
          (m[15] = h?.username),
          (m[16] = o))
        : (o = m[16]),
      m[17] !== l || m[18] !== o
        ? ((d = (0, t.jsxs)("span", {
            className:
              "flex min-w-0 flex-col group-data-[collapsible=icon]:hidden",
            children: [l, o],
          })),
          (m[17] = l),
          (m[18] = o),
          (m[19] = d))
        : (d = m[19]),
      m[20] !== v || m[21] !== g || m[22] !== n || m[23] !== d
        ? ((u = (0, t.jsxs)(c.default, {
            href: g,
            "aria-label": v,
            "data-testid": "sidebar-identity",
            className:
              "flex items-center gap-2.5 rounded-md p-1 text-left transition-colors hover:bg-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0",
            children: [n, d],
          })),
          (m[20] = v),
          (m[21] = g),
          (m[22] = n),
          (m[23] = d),
          (m[24] = u))
        : (u = m[24]),
      u
    );
  }
  var et = e.i(103547),
    er = e.i(338319);
  function ea(e) {
    let a,
      i,
      n,
      l,
      s,
      o = (0, r.c)(12),
      { items: c, title: d, className: u } = e;
    return 0 === c.length
      ? null
      : (o[0] !== u
          ? ((a = (0, er.c)("flex flex-col", u)), (o[0] = u), (o[1] = a))
          : (a = o[1]),
        o[2] !== d
          ? ((i = d
              ? (0, t.jsx)("div", {
                  className:
                    "px-2.5 pb-1 text-[11px] font-normal leading-none text-text-quaternary group-data-[collapsible=icon]:hidden",
                  children: d,
                })
              : null),
            (o[2] = d),
            (o[3] = i))
          : (i = o[3]),
        o[4] !== c ? ((n = c.map(ei)), (o[4] = c), (o[5] = n)) : (n = o[5]),
        o[6] !== n
          ? ((l = (0, t.jsx)(et.SidebarMenu, {
              className: "gap-0.5",
              children: n,
            })),
            (o[6] = n),
            (o[7] = l))
          : (l = o[7]),
        o[8] !== a || o[9] !== i || o[10] !== l
          ? ((s = (0, t.jsxs)("div", { className: a, children: [i, l] })),
            (o[8] = a),
            (o[9] = i),
            (o[10] = l),
            (o[11] = s))
          : (s = o[11]),
        s);
  }
  function ei(e) {
    return (0, t.jsx)(en, { item: e }, e.key);
  }
  function en(e) {
    let a,
      i,
      n,
      l,
      s,
      o,
      d,
      u,
      m,
      f,
      p,
      h = (0, r.c)(37),
      { item: b } = e,
      x = b.isActive ? b.icon.fill : b.icon.line,
      g = b.external ? "a" : c.default;
    h[0] !== b.external
      ? ((a = b.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
        (h[0] = b.external),
        (h[1] = a))
      : (a = h[1]);
    let y = a,
      w = b.action ? "pr-28" : void 0;
    h[2] !== w
      ? ((i = (0, er.c)(
          "relative h-8 gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary data-[active=true]:bg-bg-tertiary data-[active=true]:font-medium data-[active=true]:text-text-primary group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center [&>svg]:size-[18px] [&>svg]:shrink-0",
          w,
        )),
        (h[2] = w),
        (h[3] = i))
      : (i = h[3]);
    let _ = b.isActive ? "page" : void 0,
      j = b.isActive
        ? "text-text-primary"
        : "text-text-tertiary group-hover/menu-item:text-text-primary";
    return (
      h[4] !== x || h[5] !== j
        ? ((n = (0, t.jsx)(x, { className: j })),
          (h[4] = x),
          (h[5] = j),
          (h[6] = n))
        : (n = h[6]),
      h[7] !== b.isNew
        ? ((l = b.isNew
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute right-1 top-1 hidden size-1.5 rounded-full bg-bg-accent group-data-[collapsible=icon]:block",
              })
            : null),
          (h[7] = b.isNew),
          (h[8] = l))
        : (l = h[8]),
      h[9] !== b.label
        ? ((s = (0, t.jsx)("span", {
            className: "truncate",
            children: b.label,
          })),
          (h[9] = b.label),
          (h[10] = s))
        : (s = h[10]),
      h[11] !== b.badge || h[12] !== b.isNew
        ? ((o = b.badge ?? (b.isNew ? (0, t.jsx)(v.f, {}) : null)),
          (h[11] = b.badge),
          (h[12] = b.isNew),
          (h[13] = o))
        : (o = h[13]),
      h[14] !== s || h[15] !== o
        ? ((d = (0, t.jsxs)("span", {
            className:
              "flex min-w-0 flex-1 items-center gap-1.5 group-data-[collapsible=icon]:hidden",
            children: [s, o],
          })),
          (h[14] = s),
          (h[15] = o),
          (h[16] = d))
        : (d = h[16]),
      h[17] !== g ||
      h[18] !== y ||
      h[19] !== b.dataTestId ||
      h[20] !== b.href ||
      h[21] !== b.onClick ||
      h[22] !== d ||
      h[23] !== _ ||
      h[24] !== n ||
      h[25] !== l
        ? ((u = (0, t.jsxs)(g, {
            href: b.href,
            "aria-current": _,
            "data-testid": b.dataTestId,
            onClick: b.onClick,
            ...y,
            children: [n, l, d],
          })),
          (h[17] = g),
          (h[18] = y),
          (h[19] = b.dataTestId),
          (h[20] = b.href),
          (h[21] = b.onClick),
          (h[22] = d),
          (h[23] = _),
          (h[24] = n),
          (h[25] = l),
          (h[26] = u))
        : (u = h[26]),
      h[27] !== b.isActive || h[28] !== b.label || h[29] !== u || h[30] !== i
        ? ((m = (0, t.jsx)(et.SidebarMenuButton, {
            className: i,
            isActive: b.isActive,
            tooltip: b.label,
            asChild: !0,
            children: u,
          })),
          (h[27] = b.isActive),
          (h[28] = b.label),
          (h[29] = u),
          (h[30] = i),
          (h[31] = m))
        : (m = h[31]),
      h[32] !== b.action
        ? ((f = b.action
            ? (0, t.jsx)("span", {
                className:
                  "absolute inset-y-0 right-1.5 flex items-center group-data-[collapsible=icon]:hidden",
                children: b.action,
              })
            : null),
          (h[32] = b.action),
          (h[33] = f))
        : (f = h[33]),
      h[34] !== m || h[35] !== f
        ? ((p = (0, t.jsxs)(et.SidebarMenuItem, { children: [m, f] })),
          (h[34] = m),
          (h[35] = f),
          (h[36] = p))
        : (p = h[36]),
      p
    );
  }
  let el =
    "relative h-8 gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-text-tertiary hover:bg-bg-secondary hover:text-text-primary data-[active=true]:bg-bg-tertiary data-[active=true]:text-text-primary group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center [&>svg]:size-[18px] [&>svg]:shrink-0";
  function es(e) {
    let a,
      i,
      n,
      l = (0, r.c)(7),
      { items: s, className: o } = e;
    return 0 === s.length
      ? null
      : (l[0] !== o
          ? ((a = (0, er.c)("gap-0.5", o)), (l[0] = o), (l[1] = a))
          : (a = l[1]),
        l[2] !== s ? ((i = s.map(eo)), (l[2] = s), (l[3] = i)) : (i = l[3]),
        l[4] !== a || l[5] !== i
          ? ((n = (0, t.jsx)(et.SidebarMenu, { className: a, children: i })),
            (l[4] = a),
            (l[5] = i),
            (l[6] = n))
          : (n = l[6]),
        n);
  }
  function eo(e) {
    return (0, t.jsx)(
      et.SidebarMenuItem,
      {
        children: e.href
          ? (0, t.jsx)(ec, { item: e, href: e.href })
          : (0, t.jsx)(ed, { item: e }),
      },
      e.key,
    );
  }
  function ec(e) {
    let a,
      i,
      n,
      l,
      s = (0, r.c)(17),
      { item: o, href: d } = e,
      u = o.external ? "a" : c.default;
    s[0] !== o.external
      ? ((a = o.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
        (s[0] = o.external),
        (s[1] = a))
      : (a = s[1]);
    let m = a,
      f = o.isActive ?? !1,
      p = o.isActive ? "page" : void 0;
    return (
      s[2] !== o
        ? ((i = (0, t.jsx)(eu, { item: o })), (s[2] = o), (s[3] = i))
        : (i = s[3]),
      s[4] !== u ||
      s[5] !== m ||
      s[6] !== d ||
      s[7] !== o.ariaLabel ||
      s[8] !== o.dataTestId ||
      s[9] !== o.onClick ||
      s[10] !== p ||
      s[11] !== i
        ? ((n = (0, t.jsx)(u, {
            href: d,
            "aria-current": p,
            "aria-label": o.ariaLabel,
            "data-testid": o.dataTestId,
            onClick: o.onClick,
            ...m,
            children: i,
          })),
          (s[4] = u),
          (s[5] = m),
          (s[6] = d),
          (s[7] = o.ariaLabel),
          (s[8] = o.dataTestId),
          (s[9] = o.onClick),
          (s[10] = p),
          (s[11] = i),
          (s[12] = n))
        : (n = s[12]),
      s[13] !== o.label || s[14] !== f || s[15] !== n
        ? ((l = (0, t.jsx)(et.SidebarMenuButton, {
            className: el,
            isActive: f,
            tooltip: o.label,
            asChild: !0,
            children: n,
          })),
          (s[13] = o.label),
          (s[14] = f),
          (s[15] = n),
          (s[16] = l))
        : (l = s[16]),
      l
    );
  }
  function ed(e) {
    let a,
      i,
      n = (0, r.c)(9),
      { item: l } = e,
      s = l.isLoading || void 0;
    return (
      n[0] !== l
        ? ((a = (0, t.jsx)(eu, { item: l })), (n[0] = l), (n[1] = a))
        : (a = n[1]),
      n[2] !== l.ariaLabel ||
      n[3] !== l.dataTestId ||
      n[4] !== l.label ||
      n[5] !== l.onClick ||
      n[6] !== s ||
      n[7] !== a
        ? ((i = (0, t.jsx)(et.SidebarMenuButton, {
            type: "button",
            className: el,
            isActive: !1,
            tooltip: l.label,
            onClick: l.onClick,
            "data-testid": l.dataTestId,
            "aria-busy": s,
            "aria-label": l.ariaLabel,
            children: a,
          })),
          (n[2] = l.ariaLabel),
          (n[3] = l.dataTestId),
          (n[4] = l.label),
          (n[5] = l.onClick),
          (n[6] = s),
          (n[7] = a),
          (n[8] = i))
        : (i = n[8]),
      i
    );
  }
  function eu(e) {
    let a,
      n,
      l,
      s,
      o,
      c = (0, r.c)(16),
      { item: d } = e,
      u = d.icon,
      m = Number(d.unreadCount);
    (c[0] !== u || c[1] !== d.dataTestId || c[2] !== d.isLoading
      ? ((a = d.isLoading
          ? (0, t.jsx)("span", {
              "aria-hidden": !0,
              "data-testid": d.dataTestId ? `${d.dataTestId}-spinner` : void 0,
              className:
                "size-[18px] animate-spin rounded-full border-2 border-current border-t-transparent",
            })
          : (0, t.jsx)(u, {})),
        (c[0] = u),
        (c[1] = d.dataTestId),
        (c[2] = d.isLoading),
        (c[3] = a))
      : (a = c[3]),
      c[4] !== m
        ? ((n =
            m > 0
              ? (0, t.jsx)("span", {
                  className:
                    "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-bg-accent text-[11px] font-medium leading-none text-text-on-accent",
                  children: m > 9 ? "9+" : m,
                })
              : null),
          (c[4] = m),
          (c[5] = n))
        : (n = c[5]),
      c[6] !== d.label
        ? ((l = (0, t.jsx)("span", {
            className: "flex-1 truncate group-data-[collapsible=icon]:hidden",
            children: d.label,
          })),
          (c[6] = d.label),
          (c[7] = l))
        : (l = c[7]));
    let f = d.badge ?? null;
    return (
      c[8] !== d.external
        ? ((s = d.external
            ? (0, t.jsx)(i.x8, {
                "aria-hidden": !0,
                className:
                  "!size-3.5 text-text-quaternary group-data-[collapsible=icon]:hidden",
              })
            : null),
          (c[8] = d.external),
          (c[9] = s))
        : (s = c[9]),
      c[10] !== a || c[11] !== n || c[12] !== l || c[13] !== f || c[14] !== s
        ? ((o = (0, t.jsxs)(t.Fragment, { children: [a, n, l, f, s] })),
          (c[10] = a),
          (c[11] = n),
          (c[12] = l),
          (c[13] = f),
          (c[14] = s),
          (c[15] = o))
        : (o = c[15]),
      o
    );
  }
  var em = e.i(613768),
    ef = e.i(731756),
    ep = e.i(10738);
  let eh = (0, o.default)(
    () => e.A(970796).then((e) => e.SidebarSidePanelTriggersBody),
    { loadableGenerated: { modules: [888605] }, ssr: !1 },
  );
  function eb() {
    let e,
      a = (0, r.c)(1),
      i = (0, ep.f)(ef.H),
      n = (0, d.usePathname)();
    return i || (0, em.f)(n)
      ? null
      : (a[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(et.SidebarFooter, {
              className: "px-3 pb-2 pt-0",
              children: (0, t.jsx)(eh, {}),
            })),
            (a[0] = e))
          : (e = a[0]),
        e);
  }
  var ex = e.i(532160),
    eg = e.i(499141);
  let ey = "feed",
    ev = "watchlist",
    ew = "/explore",
    e_ = {
      home: "/",
      explore: ew,
      perps: eg.z,
      leaderboard: "/leaderboard",
      live: "/live",
      bounties: "/go",
      mayhem: "/mayhem",
      holder_rewards: "/holder-rewards",
      referrals: "/referrals",
      packs: _.m,
      watchlist: `${ew}?${ey}=${ev}`,
      orders: "/orders",
      pump: "/pump-token",
    };
  var ej = e.i(292686),
    eC = e.i(119524),
    eN = e.i(763238);
  function eS(e) {
    let a,
      i,
      n,
      l = (0, r.c)(5),
      { unreadCount: s } = e;
    return s <= 0
      ? null
      : (l[0] !== s
          ? ((a = (0, t.jsx)(eN.f, {
              className: "group-data-[collapsible=icon]:hidden",
              muted: !1,
              spoken: !1,
              testId: "messages-link-sidebar-unread",
              unreadCount: s,
            })),
            (l[0] = s),
            (l[1] = a))
          : (a = l[1]),
        l[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className:
                "absolute right-1 top-1 hidden size-1.5 rounded-full bg-bg-accent group-data-[collapsible=icon]:block",
              "data-testid": "messages-link-sidebar-rail-dot",
            })),
            (l[2] = i))
          : (i = l[2]),
        l[3] !== a
          ? ((n = (0, t.jsxs)(t.Fragment, { children: [a, i] })),
            (l[3] = a),
            (l[4] = n))
          : (n = l[4]),
        n);
  }
  var ek = e.i(205869),
    eE = e.i(409747),
    eA = e.i(338871),
    eI = e.i(208912),
    eT = e.i(468293),
    eR = e.i(487832);
  let eL = "/notifications";
  function eO() {
    return (0, z.Px)();
  }
  function eM() {
    (0, eR.v)({ section: "account" });
  }
  var eD = e.i(170450),
    eF = e.i(82604);
  let eP = (0, o.default)(() => e.A(266349).then((e) => e.SidebarRewards), {
      loadableGenerated: { modules: [298816] },
      ssr: !1,
    }),
    ez = (e) => {
      let a,
        i = (0, r.c)(2),
        { className: n } = e;
      return (
        i[0] !== n
          ? ((a = (0, t.jsx)(f.f, { variant: "nav", className: n })),
            (i[0] = n),
            (i[1] = a))
          : (a = i[1]),
        a
      );
    },
    eK = {
      home: { fill: a.KH, line: i.KH },
      explore: { fill: a.Jd, line: i.Jd },
      perps: { fill: a.lm, line: i.lm },
      leaderboard: { fill: a.WV, line: i.WV },
      live: { fill: a.s4, line: i.s4 },
      bounties: { fill: a.vW, line: i.vW },
      mayhem: { fill: ez, line: ez },
      holder_rewards: { fill: a.Z7, line: i.Z7 },
      referrals: { fill: a.Dz, line: i.Dz },
      packs: { fill: a.wa, line: i.wa },
      watchlist: { fill: a.G3, line: i.G3 },
      orders: { fill: a.WC, line: i.WC },
      pump: { fill: a.$2, line: i.$2 },
    };
  function eB(e, r) {
    return (0, t.jsxs)(
      u.Fragment,
      {
        children: [
          r > 0
            ? (0, t.jsx)("div", {
                "aria-hidden": !0,
                className:
                  "mx-auto my-2 hidden h-px w-6 bg-border-secondary group-data-[collapsible=icon]:block",
              })
            : null,
          (0, t.jsx)(ea, {
            title: e.title,
            items: e.items,
            className:
              0 === r ? "mt-2" : "mt-4 group-data-[collapsible=icon]:mt-0",
          }),
        ],
      },
      e.group,
    );
  }
  function eH() {
    return (0, P.$)({ source: "global-sidebar" });
  }
  e.s(
    [
      "AppSidebar",
      0,
      function (e) {
        let a,
          o,
          f,
          y,
          v,
          _,
          j,
          C,
          k,
          E,
          A,
          I,
          T,
          R,
          L,
          O,
          M,
          D,
          F,
          P,
          K,
          H,
          q,
          U,
          V = (0, r.c)(57);
        V[0] !== e
          ? (({
              limitOrdersEnabled: o,
              hermesNotificationsEnabled: f,
              settingsHubEnabled: y,
              perpsEnabled: v,
              packsEnabled: _,
              ...a
            } = e),
            (V[0] = e),
            (V[1] = a),
            (V[2] = o),
            (V[3] = f),
            (V[4] = y),
            (V[5] = v),
            (V[6] = _))
          : ((a = V[1]),
            (o = V[2]),
            (f = V[3]),
            (y = V[4]),
            (v = V[5]),
            (_ = V[6]));
        let G = void 0 !== o && o,
          $ = void 0 !== f && f,
          Q = void 0 !== y && y,
          Z = void 0 !== v && v,
          Y = void 0 !== _ && _,
          { t: X } = (0, m.f)(),
          { open: J } = (0, et.useSidebar)(),
          { address: er } = (0, s.F)(),
          ea = (0, eD.f)(),
          ei = (0, w.f)(),
          en = ea && !!er,
          el = (0, l.k)(n.D.WEB_BLOCKCHAIN_LIMIT_ORDERS, G),
          eo = (0, l.k)(n.D.WEB_HERMES_NOTIFICATIONS, $),
          ec = (0, l.k)(n.D.WEB_SETTINGS_HUB, Q),
          ed = (0, l.k)(n.D.WEB_PERPS, Z),
          eu = (0, l.k)(n.D.WEB_PACKS, Y),
          em = (0, l.k)(n.D.WEB_DIRECT_MESSAGES),
          ef = (0, l.k)(n.D.WEB_PROFILE_REFERRALS_TAB);
        V[7] !== em ||
        V[8] !== eo ||
        V[9] !== el ||
        V[10] !== eu ||
        V[11] !== ed ||
        V[12] !== ef ||
        V[13] !== ec
          ? ((j = {
              [n.D.WEB_BLOCKCHAIN_LIMIT_ORDERS]: el,
              [n.D.WEB_HERMES_NOTIFICATIONS]: eo,
              [n.D.WEB_SETTINGS_HUB]: ec,
              [n.D.WEB_DIRECT_MESSAGES]: em,
              [n.D.WEB_PERPS]: ed,
              [n.D.WEB_PROFILE_REFERRALS_TAB]: ef,
              [n.D.WEB_PACKS]: eu,
            }),
            (V[7] = em),
            (V[8] = eo),
            (V[9] = el),
            (V[10] = eu),
            (V[11] = ed),
            (V[12] = ef),
            (V[13] = ec),
            (V[14] = j))
          : (j = V[14]);
        let ep = j;
        V[15] !== ep || V[16] !== en
          ? ((C = (e) =>
              (void 0 === e.requiresFlag || !0 === ep[e.requiresFlag]) &&
              (!0 !== e.requiresSession || en)),
            (V[15] = ep),
            (V[16] = en),
            (V[17] = C))
          : (C = V[17]);
        let eh = C,
          eg = (0, d.usePathname)(),
          eN = (0, d.useSearchParams)().get(ey),
          eR = (0, eF.f)(eg) ? "go" : "default",
          ez = h.map((e) => {
            let r = b[e];
            return {
              group: e,
              title: r ? X(r) : void 0,
              items: x
                .filter((t) => t.group === e)
                .flatMap((e) =>
                  eh(e)
                    ? [
                        {
                          key: e.key,
                          href: e_[e.key],
                          label: X(e.labelKey),
                          icon: eK[e.key],
                          isActive: ((
                            e,
                            t,
                            r,
                            { watchlistRowShown: a = !0 } = {},
                          ) => {
                            if ("explore" === e || "watchlist" === e) {
                              let i = (0, ex.f)(ew, t),
                                n = r === ev && a;
                              return "watchlist" === e ? i && n : i && !n;
                            }
                            return (0, ex.f)(e_[e], t);
                          })(e.key, eg, eN, { watchlistRowShown: en }),
                          isNew: e.isNew,
                          badge:
                            "packs" === e.key
                              ? (0, t.jsx)(N, { isNew: !0 === e.isNew })
                              : void 0,
                          action:
                            "packs" === e.key && null !== ei
                              ? (0, t.jsx)(S, {})
                              : void 0,
                          onClick: "bounties" === e.key ? eH : void 0,
                        },
                      ]
                    : [],
                ),
            };
          }),
          [eq, eW] = (0, u.useState)(!1);
        V[18] !== eW
          ? ((k = () => eW(!0)), (V[18] = eW), (V[19] = k))
          : (k = V[19]);
        let eU = k;
        (V[20] !== eh
          ? ((E = g.filter(eh)), (V[20] = eh), (V[21] = E))
          : (E = V[21]),
          V[22] !== eU || V[23] !== E
            ? ((A = { descriptors: E, onGetApp: eU }),
              (V[22] = eU),
              (V[23] = E),
              (V[24] = A))
            : (A = V[24]));
        let eV = (function (e) {
            let t,
              a,
              n,
              l,
              s = (0, r.c)(15),
              { descriptors: o, onGetApp: c } = e,
              { t: f } = (0, m.f)(),
              p = (0, d.usePathname)(),
              { toggleChat: h, unreadCount: b, isBooting: x } = (0, eA.f)(),
              g = (0, eE.f)();
            s[0] !== h
              ? ((t = () => {
                  ((0, z.FN)(), h());
                }),
                (s[0] = h),
                (s[1] = t))
              : (t = s[1]);
            let y = t;
            s[2] !== c
              ? ((a = () => {
                  ((0, z.LR)({
                    interactionType: "click",
                    sourceElement: ej.k9.UPSELL_CARD_GENERIC,
                    sourceElementType: ej.eD.BUTTON,
                  }),
                    c());
                }),
                (s[2] = c),
                (s[3] = a))
              : (a = s[3]);
            let v = a;
            s[4] !== v ||
            s[5] !== y ||
            s[6] !== x ||
            s[7] !== p ||
            s[8] !== f ||
            s[9] !== b ||
            s[10] !== g
              ? ((n = (e) => {
                  let t = { key: e.key, label: f(e.labelKey) };
                  switch (e.key) {
                    case "messages": {
                      let e = (0, ex.f)(eT.f, p);
                      return {
                        ...t,
                        icon: i.t7,
                        href: eT.f,
                        isActive: e,
                        onClick: e
                          ? void 0
                          : (0, eI.L)({
                              pathname: eT.f,
                              entryPoint: ej.z.UNSPECIFIED,
                            }),
                        ariaLabel:
                          g > 0
                            ? f("web.nav.messages_unread", { count: g })
                            : void 0,
                        badge: (0, u.createElement)(eS, { unreadCount: g }),
                        dataTestId: "messages-link-sidebar",
                      };
                    }
                    case "notifications":
                      return {
                        ...t,
                        icon: i.YM,
                        href: eL,
                        isActive: (0, ex.f)(eL, p),
                      };
                    case "settings":
                      return {
                        ...t,
                        icon: i.xF,
                        onClick: eM,
                        dataTestId: "settings-button-sidebar",
                      };
                    case "support":
                      return {
                        ...t,
                        icon: i.fs,
                        onClick: y,
                        unreadCount: b,
                        isLoading: x,
                        dataTestId: "help-support-button-sidebar",
                      };
                    case "terminal":
                      return {
                        ...t,
                        icon: eC.f,
                        href: (0, ek.S)(),
                        external: !0,
                        onClick: eO,
                      };
                    case "get_app":
                      return {
                        ...t,
                        icon: i.TI,
                        onClick: v,
                        dataTestId: "try-app-button-sidebar",
                      };
                  }
                }),
                (s[4] = v),
                (s[5] = y),
                (s[6] = x),
                (s[7] = p),
                (s[8] = f),
                (s[9] = b),
                (s[10] = g),
                (s[11] = n))
              : (n = s[11]);
            let w = n;
            return (
              s[12] !== w || s[13] !== o
                ? ((l = o.map(w)), (s[12] = w), (s[13] = o), (s[14] = l))
                : (l = s[14]),
              l
            );
          })(A),
          eG = et.Sidebar,
          e$ = !J;
        (V[25] !== eR || V[26] !== e$
          ? ((I = (0, t.jsx)(c.default, {
              className:
                "flex h-full items-center overflow-hidden pl-[19px] pr-2 group-data-[collapsible=icon]:px-4",
              href: "/",
              children: (0, t.jsx)(p.f, { isCollapsed: e$, variant: eR }),
            })),
            (V[25] = eR),
            (V[26] = e$),
            (V[27] = I))
          : (I = V[27]),
          V[28] === Symbol.for("react.memo_cache_sentinel")
            ? ((T = (0, t.jsx)(et.SidebarTrigger, {
                className:
                  "mr-3 md:absolute md:right-0 md:top-3 md:z-50 md:mr-0 md:translate-x-1/2",
              })),
              (V[28] = T))
            : (T = V[28]),
          V[29] !== I
            ? ((R = (0, t.jsxs)(et.SidebarHeader, {
                className:
                  "h-12 shrink-0 flex-row items-center justify-between gap-0 p-0",
                children: [I, T],
              })),
              (V[29] = I),
              (V[30] = R))
            : (R = V[30]));
        let eQ = et.SidebarContent;
        V[31] !== en
          ? ((L = en
              ? (0, t.jsx)("div", {
                  className: "pt-1",
                  children: (0, t.jsx)(ee, {}),
                })
              : null),
            (V[31] = en),
            (V[32] = L))
          : (L = V[32]);
        let eZ = ez.map(eB);
        return (
          V[33] === Symbol.for("react.memo_cache_sentinel")
            ? ((O = (0, t.jsx)(B, {})), (V[33] = O))
            : (O = V[33]),
          V[34] !== en
            ? ((M = en
                ? (0, t.jsx)("div", {
                    className: "group-data-[state=collapsed]:hidden",
                    children: (0, t.jsx)(eP, {}),
                  })
                : null),
              (V[34] = en),
              (V[35] = M))
            : (M = V[35]),
          V[36] !== M
            ? ((D = (0, t.jsxs)("div", {
                className: "mt-3",
                children: [O, M],
              })),
              (V[36] = M),
              (V[37] = D))
            : (D = V[37]),
          V[38] !== eQ || V[39] !== L || V[40] !== eZ || V[41] !== D
            ? ((F = (0, t.jsxs)(eQ, {
                className: "custom-scrollbar dark gap-0 px-3 pb-3",
                children: [L, eZ, D],
              })),
              (V[38] = eQ),
              (V[39] = L),
              (V[40] = eZ),
              (V[41] = D),
              (V[42] = F))
            : (F = V[42]),
          V[43] !== eV
            ? ((P = (0, t.jsx)(et.SidebarFooter, {
                className: "border-t border-border-secondary px-3 py-2",
                children: (0, t.jsx)(es, { items: eV }),
              })),
              (V[43] = eV),
              (V[44] = P))
            : (P = V[44]),
          V[45] === Symbol.for("react.memo_cache_sentinel")
            ? ((K = (0, t.jsx)(eb, {})),
              (H = (0, t.jsx)(et.SidebarRail, {})),
              (V[45] = K),
              (V[46] = H))
            : ((K = V[45]), (H = V[46])),
          V[47] !== eq || V[48] !== eW
            ? ((q = (0, t.jsx)(W, { isOpen: eq, onOpenChange: eW })),
              (V[47] = eq),
              (V[48] = eW),
              (V[49] = q))
            : (q = V[49]),
          V[50] !== eG ||
          V[51] !== a ||
          V[52] !== R ||
          V[53] !== F ||
          V[54] !== P ||
          V[55] !== q
            ? ((U = (0, t.jsxs)(eG, {
                collapsible: "icon",
                ...a,
                children: [R, F, P, K, H, q],
              })),
              (V[50] = eG),
              (V[51] = a),
              (V[52] = R),
              (V[53] = F),
              (V[54] = P),
              (V[55] = q),
              (V[56] = U))
            : (U = V[56]),
          U
        );
      },
    ],
    721426,
  );
};
