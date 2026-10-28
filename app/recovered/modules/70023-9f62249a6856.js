// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(402030);
  e.i(12692);
  var n = e.i(398902),
    a = e.i(745018),
    r = e.i(439587),
    s = e.i(352386),
    o = e.i(63289),
    c = e.i(486467),
    d = e.i(167958),
    u = e.i(908163),
    x = e.i(944410),
    m = e.i(574472),
    f = e.i(132838),
    b = e.i(606933),
    p = e.i(599077),
    _ = e.i(392972),
    g = e.i(799484),
    h = e.i(819757),
    y = e.i(443437),
    w = e.i(836119),
    j = e.i(466931),
    k = e.i(905208);
  let v = ["x-link", "unlink"];
  function N(e) {
    (0, k.a)(e) ||
      (0, j.l)({
        error: e,
        feature: "profile",
        operation: "x-unlink",
        context: (0, h.M)(e),
      });
  }
  var C = e.i(890088),
    T = e.i(592209),
    S = e.i(187611);
  let O = (0, S.T)("X", "brand-name");
  function L(e) {
    let l,
      h,
      j,
      S,
      L,
      A,
      E,
      D,
      I,
      q = (0, i.c)(29),
      { social: K } = e,
      { t: U, i18n: z } = (0, n.f)(),
      F = (0, T.v)(z.language) ?? T.T,
      R = (() => {
        let e,
          t,
          l,
          n = (0, i.c)(11),
          a = (0, x.useClientServerContract)(),
          r = (0, b.useQueryClient)(),
          s = (0, p.useRouter)(),
          { address: o, userId: c, user: d } = (0, m.F)();
        return (
          n[0] !== a
            ? ((e = async () => {
                await a(k.C, { retry: 0 });
              }),
              (n[0] = a),
              (n[1] = e))
            : (e = n[1]),
          n[2] !== o ||
          n[3] !== r ||
          n[4] !== s ||
          n[5] !== d?.username ||
          n[6] !== c
            ? ((t = async () => {
                await Promise.all([
                  r.invalidateQueries({ queryKey: g.g }),
                  r.invalidateQueries({ queryKey: _.V }),
                  (0, w.f)({
                    address: o,
                    userId: c,
                    userIdentifier: o ?? "",
                    queryClient: r,
                    router: s,
                  }),
                  (0, y.f)({
                    queryClient: r,
                    address: o,
                    userId: c,
                    username: d?.username,
                  }),
                ]);
              }),
              (n[2] = o),
              (n[3] = r),
              (n[4] = s),
              (n[5] = d?.username),
              (n[6] = c),
              (n[7] = t))
            : (t = n[7]),
          n[8] !== e || n[9] !== t
            ? ((l = {
                mutationKey: v,
                mutationFn: e,
                onSuccess: t,
                onError: N,
              }),
              (n[8] = e),
              (n[9] = t),
              (n[10] = l))
            : (l = n[10]),
          (0, f.f)(l)
        );
      })(),
      [P, Q] = (0, s.useState)(!1),
      X = ((e) => {
        if (!e) return;
        let t = new Date(e);
        return Number.isNaN(t.getTime()) ? void 0 : t;
      })(K.linkedAt),
      B = () => {
        (Q(!1),
          R.mutate(void 0, {
            onSuccess: () => {
              o.c.success(U("web.x_link.unlinked_success", { platform: O }));
            },
            onError: (e) => {
              o.c.error((0, k.h)({ error: e, t: U, locale: F }));
            },
          }));
      },
      W = d.K,
      M = c.f,
      V = K.username,
      G =
        void 0 === X
          ? U("web.x_link.linked_label")
          : U("web.x_link.linked_since", { date: (0, C.G)(X, F) });
    return (
      q[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(a.R5, { "aria-hidden": !0 })), (q[0] = l))
        : (l = q[0]),
      q[1] !== U
        ? ((h = U("web.x_link.linked_label")), (q[1] = U), (q[2] = h))
        : (h = q[2]),
      q[3] !== h
        ? ((j = (0, t.jsxs)(u.E, {
            density: "comfortable",
            tone: "mint",
            "data-testid": "x-link-status-tag",
            children: [l, h],
          })),
          (q[3] = h),
          (q[4] = j))
        : (j = q[4]),
      q[5] !== M ||
      q[6] !== K.url ||
      q[7] !== K.username ||
      q[8] !== G ||
      q[9] !== j
        ? ((S = (0, t.jsx)(M, {
            username: V,
            subtitle: G,
            trailing: j,
            href: K.url,
            testId: "x-link-linked-row",
          })),
          (q[5] = M),
          (q[6] = K.url),
          (q[7] = K.username),
          (q[8] = G),
          (q[9] = j),
          (q[10] = S))
        : (S = q[10]),
      q[11] !== U
        ? ((L = U("web.x_link.linked_body")), (q[11] = U), (q[12] = L))
        : (L = q[12]),
      q[13] !== L
        ? ((A = (0, t.jsx)("p", {
            className: "text-[13px] leading-[18px] text-text-tertiary",
            children: L,
          })),
          (q[13] = L),
          (q[14] = A))
        : (A = q[14]),
      q[15] !== W || q[16] !== A || q[17] !== S
        ? ((E = (0, t.jsxs)(W, {
            className: "flex flex-col gap-4",
            "data-testid": "x-link-linked",
            children: [S, A],
          })),
          (q[15] = W),
          (q[16] = A),
          (q[17] = S),
          (q[18] = E))
        : (E = q[18]),
      q[19] !== P ||
      q[20] !== B ||
      q[21] !== Q ||
      q[22] !== K.username ||
      q[23] !== U ||
      q[24] !== R.isPending
        ? ((D = (0, t.jsx)(d.c, {
            className: "flex-col items-stretch",
            children: P
              ? (0, t.jsxs)("div", {
                  role: "group",
                  "aria-label": U("web.x_link.unlink_confirm_title", {
                    platform: O,
                  }),
                  "data-testid": "x-link-unlink-confirm",
                  className:
                    "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "min-w-0",
                      children: [
                        (0, t.jsx)("p", {
                          className:
                            "text-sm font-medium leading-5 text-text-primary",
                          children: U("web.x_link.unlink_confirm_title", {
                            platform: O,
                          }),
                        }),
                        (0, t.jsx)("p", {
                          className:
                            "text-[13px] leading-[18px] text-text-tertiary",
                          children: U("web.x_link.unlink_confirm_message", {
                            username: K.username,
                          }),
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex shrink-0 gap-2",
                      children: [
                        (0, t.jsx)(r.K, {
                          variant: "secondary",
                          size: d.Z,
                          onClick: () => Q(!1),
                          "data-testid": "x-link-unlink-cancel",
                          children: U("common.cancel"),
                        }),
                        (0, t.jsx)(r.K, {
                          variant: "secondary",
                          size: d.Z,
                          className: "!text-loss",
                          onClick: B,
                          "data-testid": "x-link-unlink-yes",
                          children: U("common.disconnect"),
                        }),
                      ],
                    }),
                  ],
                })
              : (0, t.jsx)(r.K, {
                  variant: "secondary",
                  size: d.Z,
                  isFullWidth: !0,
                  className: "!text-loss",
                  onClick: () => Q(!0),
                  isLoading: R.isPending,
                  isDisabled: R.isPending,
                  "data-testid": "x-link-unlink",
                  children: U("web.x_link.unlink_account"),
                }),
          })),
          (q[19] = P),
          (q[20] = B),
          (q[21] = Q),
          (q[22] = K.username),
          (q[23] = U),
          (q[24] = R.isPending),
          (q[25] = D))
        : (D = q[25]),
      q[26] !== E || q[27] !== D
        ? ((I = (0, t.jsxs)(t.Fragment, { children: [E, D] })),
          (q[26] = E),
          (q[27] = D),
          (q[28] = I))
        : (I = q[28]),
      I
    );
  }
  var A = e.i(668487);
  function E(e) {
    let l,
      n,
      a,
      r,
      s = (0, i.c)(8),
      { title: o, body: c } = e;
    return (
      s[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "mt-2 size-1.5 shrink-0 rounded-full bg-text-quaternary",
          })),
          (s[0] = l))
        : (l = s[0]),
      s[1] !== o
        ? ((n = (0, t.jsx)("span", {
            className: "text-sm font-medium leading-5 text-text-primary",
            children: o,
          })),
          (s[1] = o),
          (s[2] = n))
        : (n = s[2]),
      s[3] !== c
        ? ((a = (0, t.jsx)("span", {
            className: "text-[13px] leading-[18px] text-text-tertiary",
            children: c,
          })),
          (s[3] = c),
          (s[4] = a))
        : (a = s[4]),
      s[5] !== n || s[6] !== a
        ? ((r = (0, t.jsxs)("li", {
            className: "flex items-start gap-3",
            children: [
              l,
              (0, t.jsxs)("span", {
                className: "flex min-w-0 flex-1 flex-col gap-0.5",
                children: [n, a],
              }),
            ],
          })),
          (s[5] = n),
          (s[6] = a),
          (s[7] = r))
        : (r = s[7]),
      r
    );
  }
  function D(e) {
    let l,
      a,
      r,
      s,
      o,
      x,
      m,
      f,
      b,
      p,
      _,
      g,
      h,
      y,
      w,
      j,
      k,
      v = (0, i.c)(42),
      { pending: N } = e,
      { t: S, i18n: O } = (0, n.f)();
    if (
      v[0] !== O.language ||
      v[1] !== N.requestedAt ||
      v[2] !== N.xUsername ||
      v[3] !== S
    ) {
      let e = (0, T.v)(O.language) ?? T.T;
      ((a = d.K),
        (o = "flex flex-col gap-5"),
        (x = "x-link-pending"),
        (l = c.f),
        (r = N.xUsername),
        (s = ((e, t, i) => {
          let l,
            n = new Date(i);
          return Number.isNaN(n.getTime())
            ? e("web.x_link.submitted_label")
            : ((l = new Date((0, A.t)())),
                n.getFullYear() === l.getFullYear() &&
                  n.getMonth() === l.getMonth() &&
                  n.getDate() === l.getDate())
              ? e("web.x_link.submitted_today", { time: (0, C.a)(n, t) })
              : e("web.x_link.submitted_on", { date: (0, C.V)(n, t) });
        })(S, e, N.requestedAt)),
        (v[0] = O.language),
        (v[1] = N.requestedAt),
        (v[2] = N.xUsername),
        (v[3] = S),
        (v[4] = l),
        (v[5] = a),
        (v[6] = r),
        (v[7] = s),
        (v[8] = o),
        (v[9] = x));
    } else
      ((l = v[4]), (a = v[5]), (r = v[6]), (s = v[7]), (o = v[8]), (x = v[9]));
    return (
      v[10] !== S
        ? ((m = S("web.x_link.status_in_review")), (v[10] = S), (v[11] = m))
        : (m = v[11]),
      v[12] !== m
        ? ((f = (0, t.jsx)(u.E, {
            density: "comfortable",
            "data-testid": "x-link-status-tag",
            children: m,
          })),
          (v[12] = m),
          (v[13] = f))
        : (f = v[13]),
      v[14] !== l || v[15] !== r || v[16] !== s || v[17] !== f
        ? ((b = (0, t.jsx)(l, {
            username: r,
            subtitle: s,
            trailing: f,
            testId: "x-link-pending-row",
          })),
          (v[14] = l),
          (v[15] = r),
          (v[16] = s),
          (v[17] = f),
          (v[18] = b))
        : (b = v[18]),
      v[19] !== S
        ? ((p = S("web.x_link.pending_keep_title")), (v[19] = S), (v[20] = p))
        : (p = v[20]),
      v[21] !== S
        ? ((_ = S("web.x_link.pending_keep_body")), (v[21] = S), (v[22] = _))
        : (_ = v[22]),
      v[23] !== p || v[24] !== _
        ? ((g = (0, t.jsx)(E, { title: p, body: _ })),
          (v[23] = p),
          (v[24] = _),
          (v[25] = g))
        : (g = v[25]),
      v[26] !== S
        ? ((h = S("web.x_link.pending_wait_title")), (v[26] = S), (v[27] = h))
        : (h = v[27]),
      v[28] !== S
        ? ((y = S("web.x_link.pending_wait_body")), (v[28] = S), (v[29] = y))
        : (y = v[29]),
      v[30] !== h || v[31] !== y
        ? ((w = (0, t.jsx)(E, { title: h, body: y })),
          (v[30] = h),
          (v[31] = y),
          (v[32] = w))
        : (w = v[32]),
      v[33] !== g || v[34] !== w
        ? ((j = (0, t.jsxs)("ul", {
            className: "flex flex-col gap-3.5",
            children: [g, w],
          })),
          (v[33] = g),
          (v[34] = w),
          (v[35] = j))
        : (j = v[35]),
      v[36] !== a || v[37] !== j || v[38] !== o || v[39] !== x || v[40] !== b
        ? ((k = (0, t.jsxs)(a, {
            className: o,
            "data-testid": x,
            children: [b, j],
          })),
          (v[36] = a),
          (v[37] = j),
          (v[38] = o),
          (v[39] = x),
          (v[40] = b),
          (v[41] = k))
        : (k = v[41]),
      k
    );
  }
  var I = e.i(724423),
    q = e.i(779106);
  let K = ["x-link", "request"];
  function U(e) {
    (0, k.a)(e) ||
      (0, j.l)({
        error: e,
        feature: "profile",
        operation: "x-link-request",
        context: (0, h.M)(e),
      });
  }
  var z = e.i(338319);
  let F = /^[A-Za-z0-9_]{1,15}$/,
    R =
      /^(?:https?:\/\/)?(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:#!\/)?@?([^/?#]+)/i,
    P = new Set([
      "i",
      "intent",
      "home",
      "explore",
      "search",
      "hashtag",
      "messages",
      "notifications",
      "compose",
      "settings",
      "account",
      "login",
      "logout",
      "signup",
      "share",
      "about",
      "privacy",
      "tos",
      "download",
      "help",
    ]);
  function Q(e) {
    let l,
      n,
      a,
      r,
      s = (0, i.c)(9),
      { number: o, title: c } = e,
      d = String(o);
    return (
      s[0] !== d
        ? ((l = (0, S.T)(d, "number-format")), (s[0] = d), (s[1] = l))
        : (l = s[1]),
      s[2] !== l
        ? ((n = (0, t.jsx)(u.E, { density: "comfortable", children: l })),
          (s[2] = l),
          (s[3] = n))
        : (n = s[3]),
      s[4] !== c
        ? ((a = (0, t.jsx)("h3", {
            className: "text-sm font-medium leading-5 text-text-primary",
            children: c,
          })),
          (s[4] = c),
          (s[5] = a))
        : (a = s[5]),
      s[6] !== n || s[7] !== a
        ? ((r = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [n, a],
          })),
          (s[6] = n),
          (s[7] = a),
          (s[8] = r))
        : (r = s[8]),
      r
    );
  }
  function X(e) {
    let l,
      s,
      c,
      d,
      u,
      x,
      m,
      f,
      b,
      p,
      _ = (0, i.c)(27),
      { walletAddress: g } = e,
      { t: h } = (0, n.f)();
    if (0 === g.length) {
      let e, i;
      return (
        _[0] !== h
          ? ((e = h("web.x_link.error_wallet_required")),
            (_[0] = h),
            (_[1] = e))
          : (e = _[1]),
        _[2] !== e
          ? ((i = (0, t.jsx)("p", {
              role: "alert",
              className: "text-[13px] leading-[18px] text-loss",
              children: e,
            })),
            (_[2] = e),
            (_[3] = i))
          : (i = _[3]),
        i
      );
    }
    _[4] !== h || _[5] !== g
      ? ((l = async () => {
          try {
            (await navigator.clipboard.writeText(g),
              o.c.success(h("common.copied_to_clipboard")));
          } catch {
            o.c.error(h("web.errors.http.unknown"));
          }
        }),
        (_[4] = h),
        (_[5] = g),
        (_[6] = l))
      : (l = _[6]);
    let y = l;
    return (
      _[7] !== g
        ? ((s = (0, S.T)(g, "wallet-address")), (_[7] = g), (_[8] = s))
        : (s = _[8]),
      _[9] !== s
        ? ((c = (0, t.jsx)("p", {
            "data-testid": "x-link-wallet-address",
            className:
              "break-all rounded-md bg-bg-tertiary px-3 py-2.5 text-sm leading-5 text-text-primary",
            children: s,
          })),
          (_[9] = s),
          (_[10] = c))
        : (c = _[10]),
      _[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, t.jsx)(a.QO, {})), (_[11] = d))
        : (d = _[11]),
      _[12] !== y
        ? ((u = () => void y()), (_[12] = y), (_[13] = u))
        : (u = _[13]),
      _[14] !== h
        ? ((x = h("common.copy_address")), (_[14] = h), (_[15] = x))
        : (x = _[15]),
      _[16] !== u || _[17] !== x
        ? ((m = (0, t.jsx)(r.K, {
            type: "button",
            variant: "secondary",
            size: 36,
            isFullWidth: !0,
            iconStart: d,
            onClick: u,
            "data-testid": "x-link-copy-address",
            children: x,
          })),
          (_[16] = u),
          (_[17] = x),
          (_[18] = m))
        : (m = _[18]),
      _[19] !== h
        ? ((f = h("web.x_link.step_address_hint")), (_[19] = h), (_[20] = f))
        : (f = _[20]),
      _[21] !== f
        ? ((b = (0, t.jsx)("p", {
            className: "text-xs leading-4 text-text-tertiary",
            children: f,
          })),
          (_[21] = f),
          (_[22] = b))
        : (b = _[22]),
      _[23] !== c || _[24] !== m || _[25] !== b
        ? ((p = (0, t.jsxs)(t.Fragment, { children: [c, m, b] })),
          (_[23] = c),
          (_[24] = m),
          (_[25] = b),
          (_[26] = p))
        : (p = _[26]),
      p
    );
  }
  function B(e) {
    let l,
      o,
      c,
      u,
      m,
      p,
      _,
      h,
      y,
      w,
      j,
      v,
      N,
      S,
      O,
      L,
      E,
      D,
      B,
      W,
      M,
      V,
      G,
      H,
      Z,
      Y,
      $,
      J,
      ee,
      et,
      ei,
      el = (0, i.c)(68),
      { state: en } = e,
      { t: ea, i18n: er } = (0, n.f)(),
      es = (0, T.v)(er.language) ?? T.T,
      eo =
        ((J = (0, i.c)(8)),
        (ee = (0, x.useClientServerContract)()),
        (et = (0, b.useQueryClient)()),
        (ei = (0, q.f)("x-link")),
        J[0] !== ee
          ? ((Z = (e) =>
              ee(k.O, { body: { username: e }, timeout: 3e4, retry: 0 })),
            (J[0] = ee),
            (J[1] = Z))
          : (Z = J[1]),
        J[2] !== et || J[3] !== ei
          ? ((Y = (e) => {
              let t = (0, g.X)(ei);
              (et.setQueryData(t, (t) => ({
                walletAddress: t?.walletAddress ?? "",
                intakeOpen: t?.intakeOpen ?? !0,
                cooldownUntil: t?.cooldownUntil ?? null,
                pending: e.pending,
              })),
                et.invalidateQueries({ queryKey: t }));
            }),
            (J[2] = et),
            (J[3] = ei),
            (J[4] = Y))
          : (Y = J[4]),
        J[5] !== Z || J[6] !== Y
          ? (($ = { mutationKey: K, mutationFn: Z, onSuccess: Y, onError: U }),
            (J[5] = Z),
            (J[6] = Y),
            (J[7] = $))
          : ($ = J[7]),
        (0, f.f)($)),
      ec = (0, s.useId)(),
      [ed, eu] = (0, s.useState)(""),
      [ex, em] = (0, s.useState)(!1);
    if (el[0] !== ed) {
      let e, t, i;
      ((e = ed.trim()),
        (i = l =
          void 0 !== (t = R.exec(e)?.[1])
            ? P.has(t.toLowerCase())
              ? e
              : t
            : e.replace(/^@/, "")),
        (o = F.test(i)),
        (el[0] = ed),
        (el[1] = l),
        (el[2] = o));
    } else ((l = el[1]), (o = el[2]));
    let ef = o,
      eb = ((e) => {
        if (null === e) return;
        let t = new Date(e).getTime();
        return !Number.isNaN(t) && t > (0, A.t)() ? t : void 0;
      })(en.cooldownUntil),
      ep = en.walletAddress.length > 0,
      e_ = en.intakeOpen && void 0 === eb && ep && !eo.isPending && ef,
      eg =
        null === eo.error
          ? void 0
          : (0, k.h)({
              error: eo.error,
              t: ea,
              locale: es,
              handle: eo.variables,
            }),
      eh = null !== eo.error && (0, k.f)(eo.error) ? eg : void 0,
      ey = null === eo.error || (0, k.f)(eo.error) ? void 0 : eg;
    el[3] !== ef || el[4] !== ed || el[5] !== ea || el[6] !== ex
      ? ((c =
          ex && "" === ed.trim()
            ? ea("web.x_link.handle_required")
            : "" === ed.trim() || ef
              ? void 0
              : ea("web.x_link.handle_invalid")),
        (el[3] = ef),
        (el[4] = ed),
        (el[5] = ea),
        (el[6] = ex),
        (el[7] = c))
      : (c = el[7]);
    let ew = c,
      ej = eh ?? ew;
    el[8] !== eo
      ? ((u = (e) => {
          (null !== eo.error && eo.reset(), em(!0), eu(e));
        }),
        (el[8] = eo),
        (el[9] = u))
      : (u = el[9]);
    let ek = u;
    el[10] !== e_ || el[11] !== l || el[12] !== eo
      ? ((m = (e) => {
          (e.preventDefault(), e_ && eo.mutate(l));
        }),
        (el[10] = e_),
        (el[11] = l),
        (el[12] = eo),
        (el[13] = m))
      : (m = el[13]);
    let ev = m,
      eN = en.intakeOpen
        ? void 0 !== eb
          ? (0, t.jsx)("p", {
              role: "status",
              className: "text-center text-xs leading-4 text-text-secondary",
              children: ea("web.x_link.cooldown_note", {
                date: (0, C.u)({ locale: es, timestampMs: eb }),
              }),
            })
          : (0, t.jsx)("p", {
              className: "text-center text-xs leading-4 text-text-tertiary",
              children: ea("web.x_link.review_time_note"),
            })
        : (0, t.jsx)("p", {
            role: "status",
            className: "text-center text-xs leading-4 text-text-secondary",
            children: ea("web.x_link.intake_closed_note"),
          }),
      eC = eo.isPending || void 0;
    (el[14] !== ea
      ? ((p = ea("web.x_link.intro")), (el[14] = ea), (el[15] = p))
      : (p = el[15]),
      el[16] !== p
        ? ((_ = (0, t.jsx)("p", {
            className: "text-sm leading-5 text-text-tertiary",
            children: p,
          })),
          (el[16] = p),
          (el[17] = _))
        : (_ = el[17]),
      el[18] !== ea
        ? ((h = ea("web.x_link.step_address_title")),
          (el[18] = ea),
          (el[19] = h))
        : (h = el[19]),
      el[20] !== h
        ? ((y = (0, t.jsx)(Q, { number: 1, title: h })),
          (el[20] = h),
          (el[21] = y))
        : (y = el[21]),
      el[22] !== en.walletAddress
        ? ((w = (0, t.jsx)(X, { walletAddress: en.walletAddress })),
          (el[22] = en.walletAddress),
          (el[23] = w))
        : (w = el[23]),
      el[24] !== w || el[25] !== y
        ? ((j = (0, t.jsxs)("section", {
            className: "flex flex-col gap-3",
            children: [y, w],
          })),
          (el[24] = w),
          (el[25] = y),
          (el[26] = j))
        : (j = el[26]),
      el[27] !== ea
        ? ((v = ea("web.x_link.step_handle_title")),
          (el[27] = ea),
          (el[28] = v))
        : (v = el[28]),
      el[29] !== v
        ? ((N = (0, t.jsx)(Q, { number: 2, title: v })),
          (el[29] = v),
          (el[30] = N))
        : (N = el[30]),
      el[31] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, t.jsx)(a.Tc, { "aria-hidden": !0 })), (el[31] = S))
        : (S = el[31]),
      el[32] !== ea
        ? ((O = ea("web.x_link.handle_placeholder")),
          (el[32] = ea),
          (el[33] = O))
        : (O = el[33]),
      el[34] !== ea
        ? ((L = ea("web.x_link.step_handle_title")),
          (el[34] = ea),
          (el[35] = L))
        : (L = el[35]));
    let eT = void 0 !== ej;
    (el[36] !== ej ||
    el[37] !== ec ||
    el[38] !== ed ||
    el[39] !== ek ||
    el[40] !== O ||
    el[41] !== L ||
    el[42] !== eT
      ? ((E = (0, t.jsx)(I.N, {
          id: ec,
          density: "comfortable",
          value: ed,
          onValueChange: ek,
          leading: S,
          placeholder: O,
          "aria-label": L,
          maxLength: 120,
          autoCapitalize: "none",
          autoCorrect: "off",
          autoComplete: "off",
          spellCheck: !1,
          invalid: eT,
          helper: ej,
          "data-testid": "x-link-handle",
        })),
        (el[36] = ej),
        (el[37] = ec),
        (el[38] = ed),
        (el[39] = ek),
        (el[40] = O),
        (el[41] = L),
        (el[42] = eT),
        (el[43] = E))
      : (E = el[43]),
      el[44] !== N || el[45] !== E
        ? ((D = (0, t.jsxs)("section", {
            className: "flex flex-col gap-3",
            children: [N, E],
          })),
          (el[44] = N),
          (el[45] = E),
          (el[46] = D))
        : (D = el[46]),
      el[47] !== j || el[48] !== D || el[49] !== _
        ? ((B = (0, t.jsxs)(d.K, {
            className: "flex flex-col gap-5",
            children: [_, j, D],
          })),
          (el[47] = j),
          (el[48] = D),
          (el[49] = _),
          (el[50] = B))
        : (B = el[50]));
    let eS = !e_,
      eO = eo.isPending;
    return (
      el[51] !== ea
        ? ((W = ea("web.x_link.submit")), (el[51] = ea), (el[52] = W))
        : (W = el[52]),
      el[53] !== eo.isPending || el[54] !== eS || el[55] !== W
        ? ((M = (0, t.jsx)(r.K, {
            type: "submit",
            variant: "primary",
            size: d.$,
            isFullWidth: !0,
            isDisabled: eS,
            isLoading: eO,
            "data-testid": "x-link-submit",
            children: W,
          })),
          (el[53] = eo.isPending),
          (el[54] = eS),
          (el[55] = W),
          (el[56] = M))
        : (M = el[56]),
      el[57] !== ey
        ? ((V =
            void 0 === ey
              ? null
              : (0, t.jsx)("p", {
                  role: "alert",
                  "data-testid": "x-link-notice-error",
                  className: (0, z.c)(
                    "text-center text-xs leading-4 text-loss",
                  ),
                  children: ey,
                })),
          (el[57] = ey),
          (el[58] = V))
        : (V = el[58]),
      el[59] !== eN || el[60] !== M || el[61] !== V
        ? ((G = (0, t.jsxs)(d.c, {
            className: "flex-col items-stretch",
            children: [M, V, eN],
          })),
          (el[59] = eN),
          (el[60] = M),
          (el[61] = V),
          (el[62] = G))
        : (G = el[62]),
      el[63] !== ev || el[64] !== B || el[65] !== G || el[66] !== eC
        ? ((H = (0, t.jsxs)("form", {
            onSubmit: ev,
            "aria-busy": eC,
            "data-testid": "x-link-form",
            className: "flex min-h-0 flex-1 flex-col",
            children: [B, G],
          })),
          (el[63] = ev),
          (el[64] = B),
          (el[65] = G),
          (el[66] = eC),
          (el[67] = H))
        : (H = el[67]),
      H
    );
  }
  var W = e.i(967694),
    M = e.i(248496),
    V = e.i(690877);
  function G() {
    let e,
      l,
      n,
      a = (0, i.c)(3);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(M.l, { height: 20 })), (a[0] = e))
        : (e = a[0]),
      a[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsxs)("div", {
            className: "flex flex-col gap-3",
            children: [
              (0, t.jsx)(M.l, { height: 20, width: "60%" }),
              (0, t.jsx)(M.l, { height: 40 }),
              (0, t.jsx)(M.l, { height: 36 }),
            ],
          })),
          (a[1] = l))
        : (l = a[1]),
      a[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsxs)(d.K, {
            "aria-busy": !0,
            "data-testid": "x-link-loading",
            className: "flex flex-col gap-5",
            children: [
              e,
              l,
              (0, t.jsxs)("div", {
                className: "flex flex-col gap-3",
                children: [
                  (0, t.jsx)(M.l, { height: 20, width: "45%" }),
                  (0, t.jsx)(M.l, { height: 44 }),
                ],
              }),
            ],
          })),
          (a[2] = n))
        : (n = a[2]),
      n
    );
  }
  function H() {
    let e,
      a,
      r,
      s = (0, i.c)(17),
      { t: o, i18n: c } = (0, n.f)(),
      u = (0, T.v)(c.language) ?? T.T,
      m =
        ((a = (0, x.useClientServerContract)()),
        (r = (0, q.f)("x-link")),
        (0, V.useQuery)({
          queryKey: [...g.g, "viewer-social", r ?? ""],
          enabled: null !== r,
          staleTime: 6e4,
          retry: !1,
          queryFn: async ({ signal: e }) => {
            try {
              let t = await a("GET /users/{id}/socials", {
                params: { id: r ?? "" },
                signal: e,
                retry: 0,
              });
              return (0, _.A)(t);
            } catch (e) {
              if ((0, l.isContractError)(e) && 404 === e.status) return null;
              throw e;
            }
          },
        })),
      f = (0, g.L)();
    if (m.data) {
      let e;
      return (
        s[0] !== m.data
          ? ((e = (0, t.jsx)(L, { social: m.data })),
            (s[0] = m.data),
            (s[1] = e))
          : (e = s[1]),
        e
      );
    }
    if (m.isLoading || f.isLoading) {
      let e;
      return (
        s[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(G, {})), (s[2] = e))
          : (e = s[2]),
        e
      );
    }
    let b = void 0 === m.data;
    if (b || void 0 === f.data) {
      let e,
        i,
        n,
        a = f.error ?? m.error,
        r =
          (0, k.a)(a) && null !== a.code
            ? (0, k.h)({ error: a, t: o, locale: u })
            : o((0, h.v)((0, l.isContractError)(a) ? a.status : null));
      return (
        s[3] !== o
          ? ((e = o("web.x_link.unavailable_title")), (s[3] = o), (s[4] = e))
          : (e = s[4]),
        s[5] !== m || s[6] !== b || s[7] !== f
          ? ((i = () => {
              (b && m.refetch(), void 0 === f.data && f.refetch());
            }),
            (s[5] = m),
            (s[6] = b),
            (s[7] = f),
            (s[8] = i))
          : (i = s[8]),
        s[9] !== r || s[10] !== e || s[11] !== i
          ? ((n = (0, t.jsx)(d.K, {
              children: (0, t.jsx)(W.f, {
                density: "comfortable",
                title: e,
                onRetry: i,
                className: "px-0",
                children: r,
              }),
            })),
            (s[9] = r),
            (s[10] = e),
            (s[11] = i),
            (s[12] = n))
          : (n = s[12]),
        n
      );
    }
    if (null !== f.data.pending) {
      let e;
      return (
        s[13] !== f.data.pending
          ? ((e = (0, t.jsx)(D, { pending: f.data.pending })),
            (s[13] = f.data.pending),
            (s[14] = e))
          : (e = s[14]),
        e
      );
    }
    return (
      s[15] !== f.data
        ? ((e = (0, t.jsx)(B, { state: f.data })),
          (s[15] = f.data),
          (s[16] = e))
        : (e = s[16]),
      e
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          a,
          r,
          s = (0, i.c)(9),
          { open: o, onOpenChange: c } = e,
          { t: u } = (0, n.f)();
        return (
          s[0] !== u
            ? ((l = u("web.x_link.title")), (s[0] = u), (s[1] = l))
            : (l = s[1]),
          s[2] !== o
            ? ((a = o ? (0, t.jsx)(H, {}) : null), (s[2] = o), (s[3] = a))
            : (a = s[3]),
          s[4] !== c || s[5] !== o || s[6] !== l || s[7] !== a
            ? ((r = (0, t.jsx)(d.N, {
                open: o,
                onOpenChange: c,
                size: "md",
                title: l,
                "data-testid": "x-link-dialog",
                children: a,
              })),
              (s[4] = c),
              (s[5] = o),
              (s[6] = l),
              (s[7] = a),
              (s[8] = r))
            : (r = s[8]),
          r
        );
      },
    ],
    70023,
  );
  var Z = e.i(292686),
    Y = e.i(880227),
    $ = e.i(595673);
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          t,
          l = (0, i.c)(10),
          { address: n, logout: a, shouldUsePrivy: r } = (0, m.F)(),
          { snapshot: s, reader: o } = (0, Y.f)(),
          c = s?.user ?? null;
        l[0] !== n ||
        l[1] !== a ||
        l[2] !== c?.apple ||
        l[3] !== c?.google ||
        l[4] !== c?.twitter ||
        l[5] !== r
          ? ((e = async () => {
              let e = r ? Z.pi.PRIVY : Z.pi.WALLET_NONCUSTODIAL,
                t = r
                  ? (0, $.ia)(
                      c?.apple
                        ? "apple"
                        : c?.google
                          ? "google"
                          : c?.twitter
                            ? "twitter"
                            : "email",
                    )
                  : Z.Db.CONTINUE_ACCOUNT;
              ((0, $.Nb)({ authMethod: e, authType: t, walletAddress: n }),
                await a(),
                (0, $.QO)({ authMethod: e, authType: t, walletAddress: n }));
            }),
            (l[0] = n),
            (l[1] = a),
            (l[2] = c?.apple),
            (l[3] = c?.google),
            (l[4] = c?.twitter),
            (l[5] = r),
            (l[6] = e))
          : (e = l[6]);
        let d = e;
        return (
          l[7] !== o || l[8] !== d
            ? ((t = { signOut: d, privyReader: o }),
              (l[7] = o),
              (l[8] = d),
              (l[9] = t))
            : (t = l[9]),
          t
        );
      },
    ],
    624876,
  );
};
