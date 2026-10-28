// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(545063),
    i = e.i(606933),
    n = e.i(599077),
    l = e.i(352386),
    s = e.i(336228),
    o = e.i(132838),
    c = e.i(574472),
    d = e.i(690877),
    u = e.i(759257),
    m = e.i(779106);
  let f = (e) => ["callouts", "rewards-tos", e];
  async function p(e) {
    let { signal: t } = e;
    return (0, u.j)()("GET /creator-rewards-tos", {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: t,
      retry: 0,
      throwHttpErrors: !1,
      hooks: { afterResponse: [h] },
    });
  }
  function h(e, t, r) {
    if (!r.ok)
      throw Error(`Failed to fetch callout-rewards ToS status: ${r.status}`);
  }
  var b = e.i(466931),
    x = e.i(728923);
  class g extends Error {
    status;
    constructor(e) {
      (super(
        void 0 === e
          ? "Failed to record callout-rewards ToS consent"
          : `Failed to record callout-rewards ToS consent: ${e}`,
      ),
        (this.name = "CalloutRewardsTosAcceptError"),
        (this.status = e));
    }
  }
  let y = (e) => e instanceof g && 404 === e.status;
  function v(e) {
    return 500 * 2 ** e;
  }
  function w(e, t) {
    return e < 2 && !y(t);
  }
  async function _() {
    let e = !1;
    try {
      return await (0, u.j)()("POST /creator-rewards-tos/accept", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (t, r, a) => {
              if (((e = !0), !a.ok)) throw new g(a.status);
            },
          ],
        },
      });
    } catch (t) {
      if (e) throw t;
      throw new g(void 0);
    }
  }
  var j = e.i(399346);
  function C(e) {
    return e.pendingTrigger;
  }
  function N(e) {
    let n,
      u,
      h,
      g,
      C,
      N,
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
      P = (0, r.c)(42),
      { trigger: z } = e,
      K = (0, a.U)(),
      { userId: B, address: H } = K,
      q = (0, m.f)("rewards-tos"),
      W = (0, x.F)(k);
    P[0] !== K ? ((n = (0, x.f)(K)), (P[0] = K), (P[1] = n)) : (n = P[1]);
    let U = n;
    P[2] !== U
      ? ((u = (e) => (0, x.D)(e.localConsents, U)), (P[2] = U), (P[3] = u))
      : (u = P[3]);
    let V = (0, x.F)(u),
      G = void 0 !== V,
      $ = !G;
    P[4] !== $ ? ((h = { enabled: $ }), (P[4] = $), (P[5] = h)) : (h = P[5]);
    let { data: Q, isError: Z } = (function (e) {
      let t,
        a,
        i,
        n = (0, r.c)(7);
      n[0] !== e
        ? ((t = void 0 === e ? {} : e), (n[0] = e), (n[1] = t))
        : (t = n[1]);
      let { enabled: l } = t,
        { address: s } = (0, c.F)(),
        o = (0, m.f)("rewards-tos");
      n[2] !== o ? ((a = f(o)), (n[2] = o), (n[3] = a)) : (a = n[3]);
      let u = (void 0 === l || l) && !!s;
      return (
        n[4] !== a || n[5] !== u
          ? ((i = {
              queryKey: a,
              queryFn: p,
              enabled: u,
              staleTime: 1 / 0,
              retry: !1,
              refetchOnWindowFocus: !1,
            }),
            (n[4] = a),
            (n[5] = u),
            (n[6] = i))
          : (i = n[6]),
        (0, d.useQuery)(i)
      );
    })(h);
    P[6] !== H
      ? ((g = (e) => !!H && e.unavailableWallets.includes(H)),
        (P[6] = H),
        (P[7] = g))
      : (g = P[7]);
    let Y = (0, x.F)(g),
      [X] = (0, l.useState)(x.z),
      J = "route_change" === z && !X,
      ee = J && !G;
    P[8] !== ee ? ((C = { enabled: ee }), (P[8] = ee), (P[9] = C)) : (C = P[9]);
    let et = (function (e) {
        let t,
          a,
          i = (0, r.c)(5);
        i[0] !== e
          ? ((t = void 0 === e ? {} : e), (i[0] = e), (i[1] = t))
          : (t = i[1]);
        let { enabled: n } = t,
          l = void 0 === n || n,
          s = (0, m.f)("has-any-callout"),
          o = l && !!s;
        i[2] !== o || i[3] !== s
          ? ((a = {
              userId: s,
              limit: 1,
              sortBy: "TIMESTAMP",
              sortOrder: "DESC",
              enabled: o,
            }),
            (i[2] = o),
            (i[3] = s),
            (i[4] = a))
          : (a = i[4]);
        let { callouts: c, isLoading: d, isError: u } = (0, j.f)(a);
        return l ? !!s && !u && (d ? void 0 : c.length > 0) : void 0;
      })(C),
      er = (function () {
        let e,
          t,
          n,
          l,
          s = (0, r.c)(11),
          c = (0, i.useQueryClient)(),
          d = (0, a.U)(),
          { address: u } = d,
          p = (0, m.f)("rewards-tos");
        s[0] !== d ? ((e = (0, x.f)(d)), (s[0] = d), (s[1] = e)) : (e = s[1]);
        let h = e;
        return (
          s[2] !== h || s[3] !== c || s[4] !== p
            ? ((t = (e) => {
                let t = { accepted: !0, acceptedAt: e.acceptedAt };
                (c.setQueryData(f(p), t), (0, x.b)(h, e.acceptedAt));
              }),
              (s[2] = h),
              (s[3] = c),
              (s[4] = p),
              (s[5] = t))
            : (t = s[5]),
          s[6] !== u
            ? ((n = (e) => {
                let t = y(e);
                (t && u && (0, x._)(u),
                  (0, b.l)({
                    error: e,
                    feature: "callout",
                    operation: "accept-rewards-tos",
                    context: { missingProfile: t },
                  }));
              }),
              (s[6] = u),
              (s[7] = n))
            : (n = s[7]),
          s[8] !== t || s[9] !== n
            ? ((l = {
                mutationFn: _,
                retry: w,
                retryDelay: v,
                onSuccess: t,
                onError: n,
              }),
              (s[8] = t),
              (s[9] = n),
              (s[10] = l))
            : (l = s[10]),
          (0, o.f)(l)
        );
      })(),
      ea = !X && (!H || G || Z || Y || Q?.accepted === !0 || (J && !1 === et)),
      ei = X || (Q?.accepted === !1 && (!J || !0 === et));
    (P[10] !== W || P[11] !== ea
      ? ((N = () => {
          ea && W();
        }),
        (E = [ea, W]),
        (P[10] = W),
        (P[11] = ea),
        (P[12] = N),
        (P[13] = E))
      : ((N = P[12]), (E = P[13])),
      (0, l.useEffect)(N, E));
    let en = Q?.accepted === !0,
      el = Q?.acceptedAt ?? null;
    (P[14] !== H || P[15] !== en || P[16] !== el || P[17] !== B
      ? ((A = () => {
          en && (0, x.b)((0, x.f)({ userId: B, address: H }), el);
        }),
        (I = [en, el, B, H]),
        (P[14] = H),
        (P[15] = en),
        (P[16] = el),
        (P[17] = B),
        (P[18] = A),
        (P[19] = I))
      : ((A = P[18]), (I = P[19])),
      (0, l.useEffect)(A, I));
    let es = (0, x.F)(S);
    P[20] !== q
      ? ((T = (e) => null === q || e.syncAttemptedViewers.includes(q)),
        (P[20] = q),
        (P[21] = T))
      : (T = P[21]);
    let eo = (0, x.F)(T),
      ec = void 0 !== V && !V.confirmed && !Y && !eo,
      { mutate: ed } = er;
    (P[22] !== ed || P[23] !== es || P[24] !== ec || P[25] !== q
      ? ((R = () => {
          ec && null !== q && (es(q), ed());
        }),
        (L = [ec, q, es, ed]),
        (P[22] = ed),
        (P[23] = es),
        (P[24] = ec),
        (P[25] = q),
        (P[26] = R),
        (P[27] = L))
      : ((R = P[26]), (L = P[27])),
      (0, l.useEffect)(R, L));
    let eu = (0, i.useQueryClient)();
    (P[28] !== Z || P[29] !== eu || P[30] !== q
      ? ((O = () => {
          if (!Z) return;
          let e = f(q);
          return () => {
            eu.removeQueries({ queryKey: e, exact: !0 });
          };
        }),
        (M = [Z, q, eu]),
        (P[28] = Z),
        (P[29] = eu),
        (P[30] = q),
        (P[31] = O),
        (P[32] = M))
      : ((O = P[31]), (M = P[32])),
      (0, l.useEffect)(O, M),
      P[33] !== er || P[34] !== W || P[35] !== U || P[36] !== es || P[37] !== q
        ? ((D = () => {
            ((0, x.S)(U), null !== q && es(q), W(), er.mutate());
          }),
          (P[33] = er),
          (P[34] = W),
          (P[35] = U),
          (P[36] = es),
          (P[37] = q),
          (P[38] = D))
        : (D = P[38]));
    let em = D;
    return ea || !ei
      ? null
      : (P[39] !== W || P[40] !== em
          ? ((F = (0, t.jsx)(s.O, { onAccept: em, onDecline: W })),
            (P[39] = W),
            (P[40] = em),
            (P[41] = F))
          : (F = P[41]),
        F);
  }
  function S(e) {
    return e.markConsentSyncAttempted;
  }
  function k(e) {
    return e.clearRequest;
  }
  e.s(
    [
      "CalloutRewardsTosHost",
      0,
      function () {
        let e,
          a,
          i,
          s,
          o,
          c,
          d = (0, r.c)(2);
        ((s = (0, r.c)(3)),
          (o = (0, n.usePathname)()),
          (c = (0, l.useRef)(o)),
          s[0] !== o
            ? ((a = () => {
                let e = c.current;
                ((c.current = o),
                  e === o ||
                    o?.startsWith("/docs") ||
                    (0, x.g)("route_change"));
              }),
              (i = [o]),
              (s[0] = o),
              (s[1] = a),
              (s[2] = i))
            : ((a = s[1]), (i = s[2])),
          (0, l.useEffect)(a, i));
        let u = (0, x.F)(C);
        return null === u
          ? null
          : (d[0] !== u
              ? ((e = (0, t.jsx)(N, { trigger: u })), (d[0] = u), (d[1] = e))
              : (e = d[1]),
            e);
      },
    ],
    338819,
  );
};
