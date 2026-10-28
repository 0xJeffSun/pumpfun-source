// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(574472),
    i = e.i(352386),
    n = e.i(745018),
    l = e.i(439587),
    s = e.i(458310);
  e.i(12692);
  var o = e.i(398902),
    c = e.i(980268),
    d = e.i(167958),
    u = e.i(36489);
  let m = () => void 0,
    f = (e) => {
      let a,
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
        E = (0, r.c)(38),
        { isAccepting: A, onAccept: I } = e,
        { t: T } = (0, o.f)(),
        [R, L] = (0, i.useState)(!1);
      (E[0] !== T
        ? ((a = T("web.competitions.tos.title")), (E[0] = T), (E[1] = a))
        : (a = E[1]),
        E[2] !== T
          ? ((f = T("web.competitions.tos.summary")), (E[2] = T), (E[3] = f))
          : (f = E[3]),
        E[4] !== f
          ? ((p = (0, t.jsx)("p", {
              className: "text-sm text-text-secondary",
              children: f,
            })),
            (E[4] = f),
            (E[5] = p))
          : (p = E[5]),
        E[6] !== T
          ? ((h = T("web.competitions.tos.agreement_competition_terms")),
            (E[6] = T),
            (E[7] = h))
          : (h = E[7]),
        E[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, t.jsx)(n.x8, {
              className: "size-3.5 text-text-tertiary",
              "aria-hidden": !0,
            })),
            (E[8] = b))
          : (b = E[8]),
        E[9] !== h
          ? ((x = (0, t.jsxs)(s.default, {
              href: u.s,
              target: "_blank",
              rel: "noopener",
              prefetch: !1,
              "data-testid": "competition-tos-terms-link",
              className:
                "inline-flex w-fit items-center gap-1.5 text-sm text-text-primary underline underline-offset-4 hover:text-text-accent",
              children: [h, b],
            })),
            (E[9] = h),
            (E[10] = x))
          : (x = E[10]),
        E[11] !== T
          ? ((g = T("web.competitions.tos.agree_checkbox")),
            (E[11] = T),
            (E[12] = g))
          : (g = E[12]),
        E[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((y = (e) => L(!!e)), (E[13] = y))
          : (y = E[13]),
        E[14] !== R || E[15] !== g
          ? ((v = (0, t.jsx)(c.f, {
              "aria-label": g,
              checked: R,
              className: "mt-0.5 shrink-0",
              "data-testid": "competition-tos-checkbox",
              onCheckedChange: y,
            })),
            (E[14] = R),
            (E[15] = g),
            (E[16] = v))
          : (v = E[16]),
        E[17] !== T
          ? ((w = T("web.competitions.tos.agree_checkbox")),
            (E[17] = T),
            (E[18] = w))
          : (w = E[18]),
        E[19] !== w
          ? ((_ = (0, t.jsx)("span", { children: w })),
            (E[19] = w),
            (E[20] = _))
          : (_ = E[20]),
        E[21] !== _ || E[22] !== v
          ? ((j = (0, t.jsxs)("label", {
              className:
                "flex cursor-pointer items-start gap-3 text-sm leading-5 text-text-secondary",
              "data-testid": "competition-tos-checkbox-row",
              children: [v, _],
            })),
            (E[21] = _),
            (E[22] = v),
            (E[23] = j))
          : (j = E[23]),
        E[24] !== j || E[25] !== p || E[26] !== x
          ? ((C = (0, t.jsxs)(d.K, {
              className: "flex flex-col gap-4",
              children: [p, x, j],
            })),
            (E[24] = j),
            (E[25] = p),
            (E[26] = x),
            (E[27] = C))
          : (C = E[27]));
      let O = !R || A;
      return (
        E[28] !== T
          ? ((N = T("web.competitions.tos.agree_button")),
            (E[28] = T),
            (E[29] = N))
          : (N = E[29]),
        E[30] !== I || E[31] !== O || E[32] !== N
          ? ((S = (0, t.jsx)(d.c, {
              children: (0, t.jsx)(l.K, {
                variant: "primary",
                size: d.$,
                isFullWidth: !0,
                isDisabled: O,
                onClick: I,
                "data-testid": "competition-tos-agree",
                children: N,
              }),
            })),
            (E[30] = I),
            (E[31] = O),
            (E[32] = N),
            (E[33] = S))
          : (S = E[33]),
        E[34] !== a || E[35] !== C || E[36] !== S
          ? ((k = (0, t.jsxs)(d.N, {
              open: !0,
              onOpenChange: m,
              size: "sm",
              hideClose: !0,
              title: a,
              "data-testid": "competition-tos-dialog",
              children: [C, S],
            })),
            (E[34] = a),
            (E[35] = C),
            (E[36] = S),
            (E[37] = k))
          : (k = E[37]),
        k
      );
    };
  var p = e.i(402030),
    h = e.i(944410),
    b = e.i(132838),
    x = e.i(606933),
    g = e.i(63289),
    y = e.i(639287),
    v = e.i(466931),
    w = e.i(935258),
    _ = e.i(690877),
    j = e.i(599077),
    C = e.i(875429),
    N = e.i(779106),
    S = e.i(728923);
  let k = (e) => "registration" === e.phase || "live" === e.phase;
  function E(e) {
    return null !== e.pendingTrigger;
  }
  var A = e.i(257505),
    I = e.i(595673);
  let T = ["web.competitions"];
  e.s(
    [
      "CompetitionTosHost",
      0,
      () => {
        let e,
          n,
          l,
          s,
          c = (0, r.c)(10),
          { isOpen: d, competitionId: u } = (() => {
            let e,
              t,
              n,
              l,
              s,
              o,
              c,
              d,
              u,
              m,
              f = (0, r.c)(29),
              p = (0, h.useClientServerContract)(),
              {
                address: b,
                decodedJwt: x,
                authReady: g,
                loginLoading: v,
              } = (0, a.F)(),
              A = (0, N.f)("competitions"),
              I = !!b && null !== x && g && !v,
              T = (() => {
                let e,
                  t,
                  a = (0, r.c)(2),
                  [n, l] = (0, i.useState)(!1);
                return (
                  a[0] === Symbol.for("react.memo_cache_sentinel")
                    ? ((e = () => (
                        l((0, C.P)()),
                        (0, C.a)(() => l((0, C.P)()))
                      )),
                      (t = []),
                      (a[0] = e),
                      (a[1] = t))
                    : ((e = a[0]), (t = a[1])),
                  (0, i.useEffect)(e, t),
                  n
                );
              })(),
              R = (0, j.usePathname)();
            f[0] !== R
              ? ((e = R?.startsWith("/docs") ?? !1), (f[0] = R), (f[1] = e))
              : (e = f[1]);
            let L = e,
              O = (0, S.F)(E);
            (f[2] !== A
              ? ((t = y.f.list(A)), (f[2] = A), (f[3] = t))
              : (t = f[3]),
              f[4] !== p
                ? ((n = (e) => {
                    let { signal: t } = e;
                    return p("GET /competitions", { signal: t });
                  }),
                  (f[4] = p),
                  (f[5] = n))
                : (n = f[5]),
              f[6] !== I || f[7] !== t || f[8] !== n
                ? ((l = {
                    queryKey: t,
                    queryFn: n,
                    enabled: I,
                    staleTime: 1 / 0,
                    refetchOnWindowFocus: !1,
                    refetchOnReconnect: !1,
                  }),
                  (f[6] = I),
                  (f[7] = t),
                  (f[8] = n),
                  (f[9] = l))
                : (l = f[9]));
            let M = (0, _.useQuery)(l);
            if (f[10] !== p || f[11] !== I || f[12] !== M || f[13] !== A) {
              let e;
              ((s = I ? (M.data?.live ?? []).filter(k) : []),
                (c = w.f),
                f[17] !== p || f[18] !== I || f[19] !== A
                  ? ((e = (e) => ({
                      queryKey: y.f.detail(e.id, A),
                      queryFn: (t) => {
                        let { signal: r } = t;
                        return p("GET /competitions/{idOrSlug}", {
                          params: { idOrSlug: e.id },
                          signal: r,
                        });
                      },
                      enabled: I,
                      staleTime: 1 / 0,
                      refetchOnWindowFocus: !1,
                      refetchOnReconnect: !1,
                    })),
                    (f[17] = p),
                    (f[18] = I),
                    (f[19] = A),
                    (f[20] = e))
                  : (e = f[20]),
                (o = s.map(e)),
                (f[10] = p),
                (f[11] = I),
                (f[12] = M),
                (f[13] = A),
                (f[14] = s),
                (f[15] = o),
                (f[16] = c));
            } else ((s = f[14]), (o = f[15]), (c = f[16]));
            (f[21] !== s
              ? ((d = (e) =>
                  s.find((t, r) => {
                    let a = e[r]?.data?.viewer;
                    return !!a?.entry && a?.tosAcceptedAt === null;
                  })?.id ?? null),
                (f[21] = s),
                (f[22] = d))
              : (d = f[22]),
              f[23] !== o || f[24] !== d
                ? ((u = { queries: o, combine: d }),
                  (f[23] = o),
                  (f[24] = d),
                  (f[25] = u))
                : (u = f[25]));
            let D = c(u),
              F = I && null !== D && T && !L && !O;
            return (
              f[26] !== D || f[27] !== F
                ? ((m = { isOpen: F, competitionId: D }),
                  (f[26] = D),
                  (f[27] = F),
                  (f[28] = m))
                : (m = f[28]),
              m
            );
          })(),
          { address: m } = (0, a.F)(),
          R = (0, A.f)(T),
          [L, O] = (0, i.useState)(null),
          [M, D] = (0, i.useState)(null);
        c[0] !== m
          ? ((e = {
              onSuccess: () => {
                (D(m ?? null), (0, I.FI)());
              },
              onMissingProfile: () => O(m ?? null),
            }),
            (c[0] = m),
            (c[1] = e))
          : (e = c[1]);
        let { mutate: F, isPending: P } = ((e) => {
            let t,
              a,
              i,
              n,
              l,
              s = (0, r.c)(14);
            s[0] !== e
              ? ((t = void 0 === e ? {} : e), (s[0] = e), (s[1] = t))
              : (t = s[1]);
            let c = t,
              d = (0, h.useClientServerContract)(),
              u = (0, x.useQueryClient)(),
              { t: m } = (0, o.f)(),
              { onSuccess: f, onMissingProfile: w } = c;
            return (
              s[2] !== d
                ? ((a = () => d("POST /competitions/tos/accept")),
                  (s[2] = d),
                  (s[3] = a))
                : (a = s[3]),
              s[4] !== f || s[5] !== u
                ? ((i = (e) => {
                    (u.setQueriesData({ queryKey: y.f.details }, (t) =>
                      t?.viewer
                        ? {
                            ...t,
                            viewer: {
                              ...t.viewer,
                              tosAcceptedAt: e.acceptedAt,
                            },
                          }
                        : t,
                    ),
                      u.invalidateQueries({ queryKey: y.f.details }),
                      f?.(e));
                  }),
                  (s[4] = f),
                  (s[5] = u),
                  (s[6] = i))
                : (i = s[6]),
              s[7] !== w || s[8] !== m
                ? ((n = (e) => {
                    let t = (0, p.isContractError)(e) && 404 === e.status;
                    ((0, v.l)({
                      error: e,
                      feature: "competitions",
                      operation: "accept-tos",
                      context: { missingProfile: t },
                    }),
                    t)
                      ? w?.()
                      : g.c.error(m("web.errors.http.unknown"));
                  }),
                  (s[7] = w),
                  (s[8] = m),
                  (s[9] = n))
                : (n = s[9]),
              s[10] !== a || s[11] !== i || s[12] !== n
                ? ((l = {
                    mutationKey: y.f.tosAccept,
                    mutationFn: a,
                    onSuccess: i,
                    onError: n,
                  }),
                  (s[10] = a),
                  (s[11] = i),
                  (s[12] = n),
                  (s[13] = l))
                : (l = s[13]),
              (0, b.f)(l)
            );
          })(e),
          z = d && R && (null === L || L !== m) && (null === M || M !== m),
          K = (0, i.useRef)(null);
        return (
          c[2] !== u || c[3] !== z
            ? ((n = () => {
                if (!z) {
                  K.current = null;
                  return;
                }
                let e = u ?? "none";
                K.current !== e && ((K.current = e), (0, I._O)());
              }),
              (l = [z, u]),
              (c[2] = u),
              (c[3] = z),
              (c[4] = n),
              (c[5] = l))
            : ((n = c[4]), (l = c[5])),
          (0, i.useEffect)(n, l),
          c[6] !== F || c[7] !== P || c[8] !== z
            ? ((s = z
                ? (0, t.jsx)(f, { isAccepting: P, onAccept: () => F() })
                : null),
              (c[6] = F),
              (c[7] = P),
              (c[8] = z),
              (c[9] = s))
            : (s = c[9]),
          s
        );
      },
    ],
    190069,
  );
};
