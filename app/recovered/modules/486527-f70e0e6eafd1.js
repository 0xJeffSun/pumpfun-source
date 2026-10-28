// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var i = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    s = e.i(845785),
    a = e.i(426091),
    o = e.i(938277),
    l = e.i(146695),
    c = e.i(432626),
    d = e.i(705313),
    u = e.i(465085),
    m = e.i(458310),
    p = e.i(599077),
    f = e.i(352386);
  e.i(12692);
  var x = e.i(398902),
    b = e.i(569911),
    h = e.i(909318),
    y = e.i(56087),
    g = e.i(409954),
    v = e.i(640821),
    w = e.i(850175),
    k = e.i(711902),
    j = e.i(333407),
    _ = e.i(309445),
    N = e.i(668487),
    I = e.i(397836),
    C = e.i(369091),
    S = e.i(100172),
    A = e.i(392089),
    F = e.i(806968),
    U = e.i(462024),
    T = e.i(271373),
    E = e.i(410718),
    D = e.i(985788),
    B = e.i(467020),
    L = e.i(682246),
    P = e.i(405493),
    Q = e.i(716704),
    O = e.i(574472),
    K = e.i(944410),
    M = e.i(132838),
    R = e.i(606933),
    q = e.i(63289),
    $ = e.i(803736),
    Y = e.i(38279),
    H = e.i(777683);
  let W = (e, t) =>
    `bounties/tasks/${encodeURIComponent(e)}/submissions/${encodeURIComponent(t)}/like`;
  function V(e, t) {
    return { ...e, likeCount: (0, $.A)(e.likeCount, t), viewerLiked: t };
  }
  function z(e, t, i) {
    let r = !1,
      n = e.items.map((e) =>
        "submission" !== e.type || e.submission.submissionId !== t
          ? e
          : ((r = !0), { ...e, submission: V(e.submission, i) }),
      );
    return { touched: r, nextValue: r ? { ...e, items: n } : e };
  }
  function G(e, t, i) {
    let r = !1,
      n = e.items.map((e) => (e.submissionId !== t ? e : ((r = !0), V(e, i))));
    return { touched: r, nextValue: r ? { ...e, items: n } : e };
  }
  function X(e, t, i, r) {
    let n = [],
      s = Y.Q.BOUNTY_TASK_SUBMISSION(t, i),
      a = e.getQueryData(s);
    for (let [t, o] of (a &&
      a.submissionId === i &&
      (n.push({ queryKey: s, previous: a }), e.setQueryData(s, V(a, r))),
    e.getQueriesData({ queryKey: Y.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX }))) {
      if (!o || !Array.isArray(o.items)) continue;
      let { touched: s, nextValue: a } = G(o, i, r);
      s && (n.push({ queryKey: t, previous: o }), e.setQueryData(t, a));
    }
    for (let [t, s] of e.getQueriesData({
      queryKey: Y.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
    })) {
      if (!s || !Array.isArray(s.pages)) continue;
      let a = !1,
        o = s.pages.map((e) => {
          let { touched: t, nextValue: n } = G(e, i, r);
          return (t && (a = !0), n);
        });
      a &&
        (n.push({ queryKey: t, previous: s }),
        e.setQueryData(t, { ...s, pages: o }));
    }
    for (let [t, s] of e.getQueriesData({
      queryKey: ["bounties", "mySubmissions"],
    })) {
      if (!s || !Array.isArray(s.items)) continue;
      let a = !1,
        o = s.items.map((e) =>
          e.submission.submissionId !== i
            ? e
            : ((a = !0), { ...e, submission: V(e.submission, r) }),
        );
      a &&
        (n.push({ queryKey: t, previous: s }),
        e.setQueryData(t, { ...s, items: o }));
    }
    for (let t of Y.w)
      for (let [s, a] of e.getQueriesData({ queryKey: t })) {
        if (!a) continue;
        if ("items" in a && Array.isArray(a.items)) {
          let { touched: t, nextValue: o } = z(a, i, r);
          if (!t) continue;
          (n.push({ queryKey: s, previous: a }), e.setQueryData(s, o));
          continue;
        }
        if (!("pages" in a) || !Array.isArray(a.pages)) continue;
        let t = !1,
          o = a.pages.map((e) => {
            let { touched: n, nextValue: s } = z(e, i, r);
            return (n && (t = !0), s);
          });
        t &&
          (n.push({ queryKey: s, previous: a }),
          e.setQueryData(s, { ...a, pages: o }));
      }
    return { rollbacks: n };
  }
  async function Z(e, t, i) {
    await Promise.all(
      [
        Y.Q.BOUNTY_TASK_SUBMISSION(t, i),
        Y.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
        ["bounties", "mySubmissions"],
        ...Y.w,
      ].map((t) => e.cancelQueries({ queryKey: t })),
    );
  }
  function J(e, t, i) {
    var r, n;
    for (let s of ((r = t),
    (n = i),
    [
      Y.Q.BOUNTY_TASK_SUBMISSION(r, n),
      Y.Q.BOUNTY_TASK_SUBMISSIONS_PREFIX,
      ["bounties", "mySubmissions"],
    ]))
      e.invalidateQueries({ queryKey: s });
  }
  let ee = (e) => `bounties/tasks/${encodeURIComponent(e)}/like`,
    et = ["bounties", "publicListV2"],
    ei = ["bounties", "publicListV2Infinite"];
  function er(e, t) {
    return { ...e, likeCount: (0, $.A)(e.likeCount, t), viewerLiked: t };
  }
  function en(e, t, i) {
    let r = [],
      n = Y.Q.BOUNTY_PUBLIC_TASK(t),
      s = e.getQueryData(n);
    for (let a of (s &&
      s.taskId === t &&
      (r.push({ queryKey: n, previous: s }), e.setQueryData(n, er(s, i))),
    [["bounties", "publicList"], et]))
      for (let [n, s] of e.getQueriesData({ queryKey: a })) {
        if (!s || !Array.isArray(s.items)) continue;
        let a = !1,
          o = s.items.map((e) => (e.taskId !== t ? e : ((a = !0), er(e, i))));
        a &&
          (r.push({ queryKey: n, previous: s }),
          e.setQueryData(n, { ...s, items: o }));
      }
    for (let [n, s] of e.getQueriesData({ queryKey: ei })) {
      if (!s || !Array.isArray(s.pages)) continue;
      let a = !1,
        o = s.pages.map((e) => {
          if (!e || !Array.isArray(e.items)) return e;
          let r = !1,
            n = e.items.map((e) => (e.taskId !== t ? e : ((r = !0), er(e, i))));
          return r ? ((a = !0), { ...e, items: n }) : e;
        });
      a &&
        (r.push({ queryKey: n, previous: s }),
        e.setQueryData(n, { ...s, pages: o }));
    }
    for (let n of Y.w)
      for (let [s, a] of e.getQueriesData({ queryKey: n })) {
        if (!a || !Array.isArray(a.items)) continue;
        let n = !1,
          o = a.items.map((e) =>
            "bounty" === e.type && e.bounty.taskId === t
              ? ((n = !0),
                {
                  ...e,
                  bounty: {
                    ...e.bounty,
                    likeCount: (0, $.A)(e.bounty.likeCount, i),
                    viewerLiked: i,
                  },
                })
              : "submission" === e.type && e.parentTaskId === t
                ? ((n = !0),
                  {
                    ...e,
                    parentBounty: {
                      ...e.parentBounty,
                      likeCount: (0, $.A)(e.parentBounty.likeCount, i),
                      viewerLiked: i,
                    },
                  })
                : e,
          );
        n &&
          (r.push({ queryKey: s, previous: a }),
          e.setQueryData(s, { ...a, items: o }));
      }
    return { rollbacks: r };
  }
  async function es(e, t) {
    await Promise.all(
      [
        Y.Q.BOUNTY_PUBLIC_TASK(t),
        ["bounties", "publicList"],
        et,
        ei,
        ...Y.w,
      ].map((t) => e.cancelQueries({ queryKey: t })),
    );
  }
  function ea(e, t) {
    for (let i of [Y.Q.BOUNTY_PUBLIC_TASK(t)])
      e.invalidateQueries({ queryKey: i });
  }
  var eo = e.i(198825);
  function el(e) {
    let t,
      i,
      n,
      s,
      a,
      o,
      l,
      c,
      d,
      u,
      m,
      p,
      f,
      x,
      b,
      h,
      y,
      g,
      v,
      w,
      k,
      j,
      _,
      N,
      I,
      C,
      S,
      A,
      F = (0, r.c)(11),
      { taskId: U, viewerLiked: T } = e,
      { address: E } = (0, O.F)(),
      { setShowWallet: D } = (0, eo.useConnectWallet)(),
      B =
        (void 0 !== (f = (0, r.c)(24))[0]
          ? ((n = {}), (f[0] = void 0), (f[1] = n))
          : (n = f[1]),
        f[2] !== n
          ? (({ onMutate: a, onError: s, onSettled: o, ...l } = n),
            (f[2] = n),
            (f[3] = s),
            (f[4] = a),
            (f[5] = o),
            (f[6] = l))
          : ((s = f[3]), (a = f[4]), (o = f[5]), (l = f[6])),
        (x = (0, K.useLivestreamApiClient)()),
        (b = (0, R.useQueryClient)()),
        f[7] !== x
          ? ((c = async (e) => {
              let { taskId: t } = e;
              return await x.post(ee(t)).json();
            }),
            (f[7] = x),
            (f[8] = c))
          : (c = f[8]),
        f[9] !== a || f[10] !== b
          ? ((d = async (e) => {
              await es(b, e.taskId);
              let t = en(b, e.taskId, !0);
              return (a?.(e), t);
            }),
            (f[9] = a),
            (f[10] = b),
            (f[11] = d))
          : (d = f[11]),
        f[12] !== s || f[13] !== b
          ? ((u = async (e, t, i) => {
              (0, $.q)(b, i);
              let r = await (0, H.u)(e, "Could not save your like.");
              (q.c.error(r), s?.(e, t, i));
            }),
            (f[12] = s),
            (f[13] = b),
            (f[14] = u))
          : (u = f[14]),
        f[15] !== o || f[16] !== b
          ? ((m = (e, t, i, r) => {
              (ea(b, i.taskId), o?.(e, t, i, r));
            }),
            (f[15] = o),
            (f[16] = b),
            (f[17] = m))
          : (m = f[17]),
        f[18] !== l || f[19] !== c || f[20] !== d || f[21] !== u || f[22] !== m
          ? ((p = {
              ...l,
              mutationFn: c,
              onMutate: d,
              onError: u,
              onSettled: m,
            }),
            (f[18] = l),
            (f[19] = c),
            (f[20] = d),
            (f[21] = u),
            (f[22] = m),
            (f[23] = p))
          : (p = f[23]),
        (0, M.f)(p)),
      L =
        (void 0 !== (C = (0, r.c)(24))[0]
          ? ((h = {}), (C[0] = void 0), (C[1] = h))
          : (h = C[1]),
        C[2] !== h
          ? (({ onMutate: g, onError: y, onSettled: v, ...w } = h),
            (C[2] = h),
            (C[3] = y),
            (C[4] = g),
            (C[5] = v),
            (C[6] = w))
          : ((y = C[3]), (g = C[4]), (v = C[5]), (w = C[6])),
        (S = (0, K.useLivestreamApiClient)()),
        (A = (0, R.useQueryClient)()),
        C[7] !== S
          ? ((k = async (e) => {
              let { taskId: t } = e;
              return await S.delete(ee(t)).json();
            }),
            (C[7] = S),
            (C[8] = k))
          : (k = C[8]),
        C[9] !== g || C[10] !== A
          ? ((j = async (e) => {
              await es(A, e.taskId);
              let t = en(A, e.taskId, !1);
              return (g?.(e), t);
            }),
            (C[9] = g),
            (C[10] = A),
            (C[11] = j))
          : (j = C[11]),
        C[12] !== y || C[13] !== A
          ? ((_ = async (e, t, i) => {
              (0, $.q)(A, i);
              let r = await (0, H.u)(e, "Could not remove your like.");
              (q.c.error(r), y?.(e, t, i));
            }),
            (C[12] = y),
            (C[13] = A),
            (C[14] = _))
          : (_ = C[14]),
        C[15] !== v || C[16] !== A
          ? ((N = (e, t, i, r) => {
              (ea(A, i.taskId), v?.(e, t, i, r));
            }),
            (C[15] = v),
            (C[16] = A),
            (C[17] = N))
          : (N = C[17]),
        C[18] !== w || C[19] !== k || C[20] !== j || C[21] !== _ || C[22] !== N
          ? ((I = {
              ...w,
              mutationFn: k,
              onMutate: j,
              onError: _,
              onSettled: N,
            }),
            (C[18] = w),
            (C[19] = k),
            (C[20] = j),
            (C[21] = _),
            (C[22] = N),
            (C[23] = I))
          : (I = C[23]),
        (0, M.f)(I)),
      P = !!T;
    F[0] !== E ||
    F[1] !== B ||
    F[2] !== P ||
    F[3] !== D ||
    F[4] !== U ||
    F[5] !== L
      ? ((t = () => {
          E ? (P ? L.mutate({ taskId: U }) : B.mutate({ taskId: U })) : D(!0);
        }),
        (F[0] = E),
        (F[1] = B),
        (F[2] = P),
        (F[3] = D),
        (F[4] = U),
        (F[5] = L),
        (F[6] = t))
      : (t = F[6]);
    let Q = t,
      Y = B.isPending || L.isPending;
    return (
      F[7] !== P || F[8] !== Y || F[9] !== Q
        ? ((i = { liked: P, toggle: Q, pending: Y }),
          (F[7] = P),
          (F[8] = Y),
          (F[9] = Q),
          (F[10] = i))
        : (i = F[10]),
      i
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          i,
          n,
          s,
          a,
          o,
          l,
          c,
          d,
          u,
          m,
          p,
          f,
          x,
          b,
          h,
          y,
          g,
          v,
          w,
          k,
          j,
          _,
          N,
          I,
          C,
          S,
          A,
          F = (0, r.c)(12),
          { taskId: U, submissionId: T, viewerLiked: E } = e,
          { address: D } = (0, O.F)(),
          { setShowWallet: B } = (0, eo.useConnectWallet)(),
          L =
            (void 0 !== (f = (0, r.c)(24))[0]
              ? ((n = {}), (f[0] = void 0), (f[1] = n))
              : (n = f[1]),
            f[2] !== n
              ? (({ onMutate: a, onError: s, onSettled: o, ...l } = n),
                (f[2] = n),
                (f[3] = s),
                (f[4] = a),
                (f[5] = o),
                (f[6] = l))
              : ((s = f[3]), (a = f[4]), (o = f[5]), (l = f[6])),
            (x = (0, K.useLivestreamApiClient)()),
            (b = (0, R.useQueryClient)()),
            f[7] !== x
              ? ((c = async (e) => {
                  let { taskId: t, submissionId: i } = e;
                  return await x.post(W(t, i)).json();
                }),
                (f[7] = x),
                (f[8] = c))
              : (c = f[8]),
            f[9] !== a || f[10] !== b
              ? ((d = async (e) => {
                  await Z(b, e.taskId, e.submissionId);
                  let t = X(b, e.taskId, e.submissionId, !0);
                  return (a?.(e), t);
                }),
                (f[9] = a),
                (f[10] = b),
                (f[11] = d))
              : (d = f[11]),
            f[12] !== s || f[13] !== b
              ? ((u = async (e, t, i) => {
                  (0, $.q)(b, i);
                  let r = await (0, H.u)(e, "Could not save your like.");
                  (q.c.error(r), s?.(e, t, i));
                }),
                (f[12] = s),
                (f[13] = b),
                (f[14] = u))
              : (u = f[14]),
            f[15] !== o || f[16] !== b
              ? ((m = (e, t, i, r) => {
                  (J(b, i.taskId, i.submissionId), o?.(e, t, i, r));
                }),
                (f[15] = o),
                (f[16] = b),
                (f[17] = m))
              : (m = f[17]),
            f[18] !== l ||
            f[19] !== c ||
            f[20] !== d ||
            f[21] !== u ||
            f[22] !== m
              ? ((p = {
                  ...l,
                  mutationFn: c,
                  onMutate: d,
                  onError: u,
                  onSettled: m,
                }),
                (f[18] = l),
                (f[19] = c),
                (f[20] = d),
                (f[21] = u),
                (f[22] = m),
                (f[23] = p))
              : (p = f[23]),
            (0, M.f)(p)),
          P =
            (void 0 !== (C = (0, r.c)(24))[0]
              ? ((h = {}), (C[0] = void 0), (C[1] = h))
              : (h = C[1]),
            C[2] !== h
              ? (({ onMutate: g, onError: y, onSettled: v, ...w } = h),
                (C[2] = h),
                (C[3] = y),
                (C[4] = g),
                (C[5] = v),
                (C[6] = w))
              : ((y = C[3]), (g = C[4]), (v = C[5]), (w = C[6])),
            (S = (0, K.useLivestreamApiClient)()),
            (A = (0, R.useQueryClient)()),
            C[7] !== S
              ? ((k = async (e) => {
                  let { taskId: t, submissionId: i } = e;
                  return await S.delete(W(t, i)).json();
                }),
                (C[7] = S),
                (C[8] = k))
              : (k = C[8]),
            C[9] !== g || C[10] !== A
              ? ((j = async (e) => {
                  await Z(A, e.taskId, e.submissionId);
                  let t = X(A, e.taskId, e.submissionId, !1);
                  return (g?.(e), t);
                }),
                (C[9] = g),
                (C[10] = A),
                (C[11] = j))
              : (j = C[11]),
            C[12] !== y || C[13] !== A
              ? ((_ = async (e, t, i) => {
                  (0, $.q)(A, i);
                  let r = await (0, H.u)(e, "Could not remove your like.");
                  (q.c.error(r), y?.(e, t, i));
                }),
                (C[12] = y),
                (C[13] = A),
                (C[14] = _))
              : (_ = C[14]),
            C[15] !== v || C[16] !== A
              ? ((N = (e, t, i, r) => {
                  (J(A, i.taskId, i.submissionId), v?.(e, t, i, r));
                }),
                (C[15] = v),
                (C[16] = A),
                (C[17] = N))
              : (N = C[17]),
            C[18] !== w ||
            C[19] !== k ||
            C[20] !== j ||
            C[21] !== _ ||
            C[22] !== N
              ? ((I = {
                  ...w,
                  mutationFn: k,
                  onMutate: j,
                  onError: _,
                  onSettled: N,
                }),
                (C[18] = w),
                (C[19] = k),
                (C[20] = j),
                (C[21] = _),
                (C[22] = N),
                (C[23] = I))
              : (I = C[23]),
            (0, M.f)(I)),
          Q = !!E;
        F[0] !== D ||
        F[1] !== L ||
        F[2] !== Q ||
        F[3] !== B ||
        F[4] !== T ||
        F[5] !== U ||
        F[6] !== P
          ? ((t = () => {
              D
                ? Q
                  ? P.mutate({ taskId: U, submissionId: T })
                  : L.mutate({ taskId: U, submissionId: T })
                : B(!0);
            }),
            (F[0] = D),
            (F[1] = L),
            (F[2] = Q),
            (F[3] = B),
            (F[4] = T),
            (F[5] = U),
            (F[6] = P),
            (F[7] = t))
          : (t = F[7]);
        let Y = t,
          V = L.isPending || P.isPending;
        return (
          F[8] !== Q || F[9] !== V || F[10] !== Y
            ? ((i = { liked: Q, toggle: Y, pending: V }),
              (F[8] = Q),
              (F[9] = V),
              (F[10] = Y),
              (F[11] = i))
            : (i = F[11]),
          i
        );
      },
      "K",
      0,
      el,
    ],
    593888,
  );
  var ec = e.i(642806);
  function ed(e) {
    return e.stopPropagation();
  }
  function eu(e) {
    let t,
      s,
      a,
      o = (0, r.c)(10),
      { bounty: l } = e,
      { t: c } = (0, x.f)(),
      d = l.winnerCount > 0,
      u = l.viewerIsCreator && "none" !== l.refundStatus;
    return d || u
      ? (o[0] !== d || o[1] !== c
          ? ((t = d
              ? (0, i.jsx)(B.L, {
                  icon: (0, i.jsx)(n.vW, { className: "h-3 w-3" }),
                  label: c("home.bounties.badge_paid"),
                  tone: "muted",
                })
              : null),
            (o[0] = d),
            (o[1] = c),
            (o[2] = t))
          : (t = o[2]),
        o[3] !== l.refundStatus || o[4] !== u || o[5] !== c
          ? ((s = u
              ? "claimed" === l.refundStatus
                ? (0, i.jsx)(B.L, {
                    icon: (0, i.jsx)(n.y$, { className: "h-3 w-3" }),
                    label: c("web.bounties.refunded"),
                    tone: "positive",
                  })
                : (0, i.jsx)(B.L, {
                    icon: (0, i.jsx)(n.E$, { className: "h-3 w-3" }),
                    label: c("web.bounties.refund_pending"),
                    tone: "muted",
                  })
              : null),
            (o[3] = l.refundStatus),
            (o[4] = u),
            (o[5] = c),
            (o[6] = s))
          : (s = o[6]),
        o[7] !== t || o[8] !== s
          ? ((a = (0, i.jsxs)(i.Fragment, { children: [t, s] })),
            (o[7] = t),
            (o[8] = s),
            (o[9] = a))
          : (a = o[9]),
        a)
      : null;
  }
  function em(e) {
    let t,
      n,
      s,
      l,
      c,
      d,
      u,
      p,
      f,
      x,
      g,
      v = (0, r.c)(41),
      {
        mint: k,
        name: j,
        symbol: _,
        imageUri: N,
        priceChange24h: I,
        marketCap: C,
        variant: S,
        disableHoverCard: A,
        onClick: F,
      } = e,
      U = void 0 !== A && A,
      T = "onMedia" === (void 0 === S ? "default" : S);
    v[0] !== k ? ((t = (0, w.e)(k)), (v[0] = k), (v[1] = t)) : (t = v[1]);
    let { prefetch: E, hoverProps: D } = (0, w.W)(t),
      B = N ?? null,
      L = "number" == typeof C ? C : null;
    v[2] !== k || v[3] !== j || v[4] !== _ || v[5] !== B || v[6] !== L
      ? ((n = { mint: k, symbol: _, name: j, image_uri: B, usd_market_cap: L }),
        (v[2] = k),
        (v[3] = j),
        (v[4] = _),
        (v[5] = B),
        (v[6] = L),
        (v[7] = n))
      : (n = v[7]);
    let P = n,
      Q = "number" == typeof C ? C : null,
      O = T
        ? "border border-border-tertiary bg-[rgba(8,8,10,0.88)] text-white shadow-[0_1px_6px_rgba(0,0,0,0.45)] backdrop-blur-sm hover:border-border-tertiary hover:bg-[rgba(8,8,10,0.95)]"
        : "border border-border-tertiary bg-bg-tertiary text-text-secondary hover:border-border-tertiary hover:bg-bg-quaternary hover:text-white";
    v[8] !== O
      ? ((s = (0, a.c)(
          "inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-[3px] text-[11px] font-medium transition-colors",
          O,
        )),
        (v[8] = O),
        (v[9] = s))
      : (s = v[9]);
    let K = `/coin/${k}`;
    v[10] !== F
      ? ((l = (e) => {
          (F?.(e), e.isPropagationStopped() || e.stopPropagation());
        }),
        (v[10] = F),
        (v[11] = l))
      : (l = v[11]);
    let M = `${j} logo`,
      R = N ?? "";
    v[12] !== k || v[13] !== M || v[14] !== R
      ? ((c = (0, i.jsx)(h.f, {
          alt: M,
          className: "h-3 w-3 rounded-full object-cover",
          height: 16,
          imageType: y.d.COIN_IMAGE,
          mint: k,
          sourceImageUrl: R,
          width: 16,
        })),
        (v[12] = k),
        (v[13] = M),
        (v[14] = R),
        (v[15] = c))
      : (c = v[15]);
    let q = T && "font-semibold";
    return (
      v[16] !== q ? ((d = (0, a.c)(q)), (v[16] = q), (v[17] = d)) : (d = v[17]),
      v[18] !== _ || v[19] !== d
        ? ((u = (0, i.jsxs)("span", { className: d, children: ["$", _] })),
          (v[18] = _),
          (v[19] = d),
          (v[20] = u))
        : (u = v[20]),
      v[21] !== I
        ? ((p =
            "number" == typeof I
              ? (0, i.jsxs)("span", {
                  className: (0, a.c)(I >= 0 ? "text-gain" : "text-loss"),
                  children: [I >= 0 ? "+" : "", I.toFixed(1), "%"],
                })
              : null),
          (v[21] = I),
          (v[22] = p))
        : (p = v[22]),
      v[23] !== C || v[24] !== T
        ? ((f =
            "number" == typeof C && C > 0
              ? (0, i.jsxs)("span", {
                  className: "text-text-tertiary",
                  children: ["MC $", (0, o.M)(C)],
                })
              : null),
          (v[23] = C),
          (v[24] = T),
          (v[25] = f))
        : (f = v[25]),
      v[26] !== D ||
      v[27] !== E ||
      v[28] !== K ||
      v[29] !== l ||
      v[30] !== c ||
      v[31] !== u ||
      v[32] !== p ||
      v[33] !== f ||
      v[34] !== s
        ? ((x = (0, i.jsxs)(m.default, {
            className: s,
            href: K,
            prefetch: E,
            ...D,
            onClick: l,
            children: [c, u, p, f],
          })),
          (v[26] = D),
          (v[27] = E),
          (v[28] = K),
          (v[29] = l),
          (v[30] = c),
          (v[31] = u),
          (v[32] = p),
          (v[33] = f),
          (v[34] = s),
          (v[35] = x))
        : (x = v[35]),
      v[36] !== U || v[37] !== P || v[38] !== x || v[39] !== Q
        ? ((g = (0, i.jsx)(b.f, {
            coin: P,
            disabled: U,
            liveMarketCap: Q,
            children: x,
          })),
          (v[36] = U),
          (v[37] = P),
          (v[38] = x),
          (v[39] = Q),
          (v[40] = g))
        : (g = v[40]),
      g
    );
  }
  function ep(e) {
    let t,
      n,
      s,
      o,
      l,
      c,
      d,
      u,
      m,
      p,
      f,
      b = (0, r.c)(105),
      {
        bounty: h,
        resolvedToken: y,
        resolvedTokens: g,
        breakdown: v,
        label: w,
        labelClassName: k,
        itemsClassName: j,
        rewardRowTrailing: _,
        tone: N,
        liveUsd: I,
        layout: C,
        variant: S,
        disableCoinHoverCards: A,
      } = e,
      F = void 0 === N ? "positive" : N,
      T = void 0 !== A && A,
      { t: E } = (0, x.f)(),
      D = "discover-card" === (void 0 === S ? "default" : S),
      B = "stacked" === (void 0 === C ? "inline" : C),
      L = D && "text-[16px] font-bold leading-none tracking-[-0.01em]",
      P = !D && B && "text-[13px] font-semibold leading-none tabular-nums",
      Q =
        !D &&
        !B &&
        "text-[20px] font-semibold leading-[1.3] tracking-[-0.01em]",
      O = "winner" === F && "text-[#FBBF24]",
      K = "muted" === F && "text-text-tertiary",
      M = "positive" === F && "text-positive";
    b[0] !== M ||
    b[1] !== L ||
    b[2] !== P ||
    b[3] !== Q ||
    b[4] !== O ||
    b[5] !== K
      ? ((t = (0, a.c)(L, P, Q, O, K, M)),
        (b[0] = M),
        (b[1] = L),
        (b[2] = P),
        (b[3] = Q),
        (b[4] = O),
        (b[5] = K),
        (b[6] = t))
      : (t = b[6]);
    let R = t,
      q = B || D,
      $ = q
        ? "text-xs font-medium leading-none tabular-nums text-text-tertiary"
        : "text-[12px] font-medium leading-[1.3] tabular-nums",
      Y = !q && "winner" === F && "text-[#FBBF24]",
      H = !q && "muted" === F && "text-text-tertiary",
      W = !q && "positive" === F && "text-text-secondary",
      V = q && "winner" === F && "text-[#FBBF24]/90",
      z = q && "muted" === F && "text-text-tertiary",
      G = q && "positive" === F && "text-text-tertiary";
    b[7] !== $ ||
    b[8] !== Y ||
    b[9] !== H ||
    b[10] !== W ||
    b[11] !== V ||
    b[12] !== z ||
    b[13] !== G
      ? ((n = (0, a.c)($, Y, H, W, V, z, G)),
        (b[7] = $),
        (b[8] = Y),
        (b[9] = H),
        (b[10] = W),
        (b[11] = V),
        (b[12] = z),
        (b[13] = G),
        (b[14] = n))
      : (n = b[14]);
    let X = n,
      Z = v ?? h.rewardBreakdown;
    b[15] !== I
      ? ((s = I && I.totalUsd > 0 ? (0, U.n)(I.totalUsd) : null),
        (b[15] = I),
        (b[16] = s))
      : (s = b[16]);
    let J = s,
      ee = null != J;
    b[17] !== R ||
    b[18] !== h ||
    b[19] !== X ||
    b[20] !== T ||
    b[21] !== D ||
    b[22] !== y ||
    b[23] !== g ||
    b[24] !== ee
      ? ((o = (e) => {
          let t = `${e.token?.mint ?? e.currency}-${e.amount}`,
            r = D && !ee ? R : ee ? X : R;
          return (0, i.jsx)(
            ef,
            {
              amountClassName: r,
              bounty: h,
              disableHoverCard: T,
              item: e,
              nestedInLink: D,
              resolvedToken: y,
              resolvedTokens: g,
              size: D || ee ? "compact" : "expanded",
            },
            t,
          );
        }),
        (b[17] = R),
        (b[18] = h),
        (b[19] = X),
        (b[20] = T),
        (b[21] = D),
        (b[22] = y),
        (b[23] = g),
        (b[24] = ee),
        (b[25] = o))
      : (o = b[25]);
    let et = o;
    b[26] !== _
      ? ((l = _
          ? (0, i.jsx)("div", { className: "shrink-0", children: _ })
          : null),
        (b[26] = _),
        (b[27] = l))
      : (l = b[27]);
    let ei = l;
    if (ee && D) {
      let e, t, r, n, s;
      (b[28] !== j
        ? ((e = (0, a.c)(
            "flex min-w-0 flex-wrap items-end gap-x-3 gap-y-1",
            j,
          )),
          (b[28] = j),
          (b[29] = e))
        : (e = b[29]),
        b[30] !== R || b[31] !== J
          ? ((t = (0, i.jsx)("span", { className: R, children: J })),
            (b[30] = R),
            (b[31] = J),
            (b[32] = t))
          : (t = b[32]),
        b[33] !== Z || b[34] !== et
          ? ((r = Z.map(et)), (b[33] = Z), (b[34] = et), (b[35] = r))
          : (r = b[35]),
        b[36] !== r
          ? ((n = (0, i.jsx)("div", {
              className: "inline-flex flex-wrap items-end gap-x-2 gap-y-0.5",
              children: r,
            })),
            (b[36] = r),
            (b[37] = n))
          : (n = b[37]),
        b[38] !== e || b[39] !== t || b[40] !== n || b[41] !== ei
          ? ((s = (0, i.jsxs)("div", { className: e, children: [t, n, ei] })),
            (b[38] = e),
            (b[39] = t),
            (b[40] = n),
            (b[41] = ei),
            (b[42] = s))
          : (s = b[42]),
        (c = s));
    } else if (ee && B) {
      let e, t, r, n;
      (b[43] !== j
        ? ((e = (0, a.c)(
            "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5",
            j,
          )),
          (b[43] = j),
          (b[44] = e))
        : (e = b[44]),
        b[45] !== R || b[46] !== J
          ? ((t = (0, i.jsx)("span", { className: R, children: J })),
            (b[45] = R),
            (b[46] = J),
            (b[47] = t))
          : (t = b[47]),
        b[48] !== Z || b[49] !== et
          ? ((r = Z.map(et)), (b[48] = Z), (b[49] = et), (b[50] = r))
          : (r = b[50]),
        b[51] !== e || b[52] !== t || b[53] !== r || b[54] !== ei
          ? ((n = (0, i.jsxs)("div", { className: e, children: [t, r, ei] })),
            (b[51] = e),
            (b[52] = t),
            (b[53] = r),
            (b[54] = ei),
            (b[55] = n))
          : (n = b[55]),
        (c = n));
    } else if (ee) {
      let e, t, r, n, s;
      (b[56] !== j
        ? ((e = (0, a.c)("flex flex-wrap items-end gap-x-3 gap-y-1", j)),
          (b[56] = j),
          (b[57] = e))
        : (e = b[57]),
        b[58] !== R || b[59] !== J
          ? ((t = (0, i.jsx)("span", { className: R, children: J })),
            (b[58] = R),
            (b[59] = J),
            (b[60] = t))
          : (t = b[60]),
        b[61] !== Z || b[62] !== et
          ? ((r = Z.map(et)), (b[61] = Z), (b[62] = et), (b[63] = r))
          : (r = b[63]),
        b[64] !== r
          ? ((n = (0, i.jsx)("div", {
              className: "flex flex-wrap items-center gap-x-3 gap-y-1 pb-1",
              children: r,
            })),
            (b[64] = r),
            (b[65] = n))
          : (n = b[65]),
        b[66] !== e || b[67] !== t || b[68] !== n || b[69] !== ei
          ? ((s = (0, i.jsxs)("div", { className: e, children: [t, n, ei] })),
            (b[66] = e),
            (b[67] = t),
            (b[68] = n),
            (b[69] = ei),
            (b[70] = s))
          : (s = b[70]),
        (c = s));
    } else if (D) {
      let e, t, r;
      (b[71] !== j
        ? ((e = (0, a.c)(
            "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5",
            j,
          )),
          (b[71] = j),
          (b[72] = e))
        : (e = b[72]),
        b[73] !== Z || b[74] !== et
          ? ((t = Z.map(et)), (b[73] = Z), (b[74] = et), (b[75] = t))
          : (t = b[75]),
        b[76] !== e || b[77] !== t
          ? ((r = (0, i.jsx)("div", { className: e, children: t })),
            (b[76] = e),
            (b[77] = t),
            (b[78] = r))
          : (r = b[78]),
        (c = r));
    } else {
      let e,
        t,
        r,
        n = _ ? "items-end" : "items-center";
      (b[79] !== j || b[80] !== n
        ? ((e = (0, a.c)("flex flex-wrap gap-x-4 gap-y-2", n, j)),
          (b[79] = j),
          (b[80] = n),
          (b[81] = e))
        : (e = b[81]),
        b[82] !== Z || b[83] !== et || b[84] !== _ || b[85] !== ei
          ? ((t = _
              ? (0, i.jsxs)(i.Fragment, {
                  children: [
                    (0, i.jsx)("div", {
                      className:
                        "flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2",
                      children: Z.map(et),
                    }),
                    ei,
                  ],
                })
              : Z.map(et)),
            (b[82] = Z),
            (b[83] = et),
            (b[84] = _),
            (b[85] = ei),
            (b[86] = t))
          : (t = b[86]),
        b[87] !== e || b[88] !== t
          ? ((r = (0, i.jsx)("div", { className: e, children: t })),
            (b[87] = e),
            (b[88] = t),
            (b[89] = r))
          : (r = b[89]),
        (c = r));
    }
    let er = D ? "gap-0" : "gap-1.5";
    b[90] !== er
      ? ((d = (0, a.c)("flex min-w-0 flex-col", er)), (b[90] = er), (b[91] = d))
      : (d = b[91]);
    let en = D && "sr-only",
      es = k ?? "text-[10px]";
    return (
      b[92] !== en || b[93] !== es
        ? ((u = (0, a.c)(
            "uppercase tracking-[0.12em] text-text-tertiary",
            en,
            es,
          )),
          (b[92] = en),
          (b[93] = es),
          (b[94] = u))
        : (u = b[94]),
      b[95] !== w || b[96] !== E
        ? ((m = w ?? E("web.bounties.reward_label")),
          (b[95] = w),
          (b[96] = E),
          (b[97] = m))
        : (m = b[97]),
      b[98] !== u || b[99] !== m
        ? ((p = (0, i.jsx)("span", { className: u, children: m })),
          (b[98] = u),
          (b[99] = m),
          (b[100] = p))
        : (p = b[100]),
      b[101] !== c || b[102] !== d || b[103] !== p
        ? ((f = (0, i.jsxs)("div", { className: d, children: [p, c] })),
          (b[101] = c),
          (b[102] = d),
          (b[103] = p),
          (b[104] = f))
        : (f = b[104]),
      f
    );
  }
  function ef(e) {
    let t,
      n,
      s,
      o,
      l,
      c,
      d,
      u,
      x = (0, r.c)(57),
      {
        item: g,
        bounty: v,
        resolvedToken: k,
        resolvedTokens: j,
        size: _,
        amountClassName: N,
        wrapperClassName: I,
        nestedInLink: C,
        disableHoverCard: S,
      } = e,
      A = void 0 !== C && C,
      F = void 0 !== S && S,
      T = (0, p.useRouter)();
    x[0] !== g.token || x[1] !== j
      ? ((t = g.token ? j?.get(g.token.mint) : void 0),
        (x[0] = g.token),
        (x[1] = j),
        (x[2] = t))
      : (t = x[2]);
    let E = t;
    x[3] !== v?.token?.mint ||
    x[4] !== g.currency ||
    x[5] !== g.token ||
    x[6] !== E ||
    x[7] !== k
      ? ((n = E
          ? {
              id: E.mint,
              mint: E.mint,
              name: E.liveName,
              symbol: E.liveSymbol,
              imageUri: E.liveImageUri,
            }
          : g.token
            ? g.token.mint === v?.token?.mint
              ? (k ?? g.token)
              : g.token
            : (0, U.R)(g.currency, g.token ?? void 0)),
        (x[3] = v?.token?.mint),
        (x[4] = g.currency),
        (x[5] = g.token),
        (x[6] = E),
        (x[7] = k),
        (x[8] = n))
      : (n = x[8]);
    let D = n,
      B = D?.symbol ?? g.currency,
      L = D?.mint;
    x[9] !== L
      ? ((s = L && !(0, U.M)(L) ? `/coin/${L}` : null), (x[9] = L), (x[10] = s))
      : (s = x[10]);
    let P = s;
    x[11] !== P || x[12] !== L
      ? ((o = P && L ? (0, w.e)(L) : null),
        (x[11] = P),
        (x[12] = L),
        (x[13] = o))
      : (o = x[13]);
    let { prefetch: Q, hoverProps: O } = (0, w.W)(o);
    (x[14] !== P || x[15] !== Q || x[16] !== T
      ? ((l = () => {
          Q && P && T.prefetch(P);
        }),
        (c = [Q, P, T]),
        (x[14] = P),
        (x[15] = Q),
        (x[16] = T),
        (x[17] = l),
        (x[18] = c))
      : ((l = x[17]), (c = x[18])),
      (0, f.useEffect)(l, c));
    let K = "compact" === (void 0 === _ ? "expanded" : _);
    if (
      x[19] !== N ||
      x[20] !== D ||
      x[21] !== P ||
      x[22] !== F ||
      x[23] !== O ||
      x[24] !== K ||
      x[25] !== g.amount ||
      x[26] !== E?.liveMarketCap ||
      x[27] !== A ||
      x[28] !== Q ||
      x[29] !== T ||
      x[30] !== B ||
      x[31] !== I
    ) {
      u = Symbol.for("react.early_return_sentinel");
      e: {
        let e,
          t,
          r,
          n,
          s = K
            ? (0, a.c)("inline-flex gap-1", A ? "items-end" : "items-center")
            : "flex items-center gap-2",
          o = K
            ? "h-3.5 w-3.5 rounded-full object-cover"
            : "h-5 w-5 rounded-full object-cover",
          l = K ? 16 : 20;
        (x[34] !== D || x[35] !== l || x[36] !== o
          ? ((e = D
              ? (0, i.jsx)(h.f, {
                  alt: `${D.name} logo`,
                  className: o,
                  height: l,
                  imageType: y.d.COIN_IMAGE,
                  mint: D.mint,
                  sourceImageUrl: D.imageUri ?? "",
                  width: l,
                })
              : null),
            (x[34] = D),
            (x[35] = l),
            (x[36] = o),
            (x[37] = e))
          : (e = x[37]),
          x[38] !== g.amount || x[39] !== B
            ? ((t = (0, U.k)(g.amount, B)),
              (x[38] = g.amount),
              (x[39] = B),
              (x[40] = t))
            : (t = x[40]),
          x[41] !== N || x[42] !== t
            ? ((r = (0, i.jsx)("span", { className: N, children: t })),
              (x[41] = N),
              (x[42] = t),
              (x[43] = r))
            : (r = x[43]),
          x[44] !== e || x[45] !== r
            ? ((n = (0, i.jsxs)(i.Fragment, { children: [e, r] })),
              (x[44] = e),
              (x[45] = r),
              (x[46] = n))
            : (n = x[46]));
        let c = n;
        if (P && D?.mint) {
          let e,
            t = (0, a.c)(
              s,
              "outline-offset-2 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/25",
              K ? "rounded-sm" : "rounded-md",
              I,
            ),
            r = D.symbol ?? null,
            n = D.name ?? null,
            o = D.imageUri ?? null,
            l = E?.liveMarketCap ?? null;
          x[47] !== D.mint ||
          x[48] !== r ||
          x[49] !== n ||
          x[50] !== o ||
          x[51] !== l
            ? ((e = {
                mint: D.mint,
                symbol: r,
                name: n,
                image_uri: o,
                usd_market_cap: l,
              }),
              (x[47] = D.mint),
              (x[48] = r),
              (x[49] = n),
              (x[50] = o),
              (x[51] = l),
              (x[52] = e))
            : (e = x[52]);
          let d = e,
            p = E?.liveMarketCap ?? null;
          if (A) {
            let e, r;
            (x[53] !== P || x[54] !== T
              ? ((e = (e) => {
                  (e.preventDefault(), e.stopPropagation(), T.push(P));
                }),
                (r = (e) => {
                  ("Enter" === e.key || " " === e.key) &&
                    (e.preventDefault(), e.stopPropagation(), T.push(P));
                }),
                (x[53] = P),
                (x[54] = T),
                (x[55] = e),
                (x[56] = r))
              : ((e = x[55]), (r = x[56])),
              (u = (0, i.jsx)(b.f, {
                coin: d,
                disabled: F,
                liveMarketCap: p,
                children: (0, i.jsx)("span", {
                  className: (0, a.c)("cursor-pointer", t),
                  ...O,
                  onClick: e,
                  onKeyDown: r,
                  role: "link",
                  tabIndex: 0,
                  children: c,
                }),
              })));
            break e;
          }
          u = (0, i.jsx)(b.f, {
            coin: d,
            disabled: F,
            liveMarketCap: p,
            children: (0, i.jsx)(m.default, {
              className: t,
              href: P,
              prefetch: Q,
              ...O,
              onClick: ex,
              children: c,
            }),
          });
          break e;
        }
        let p = K ? "span" : "div";
        d = (0, i.jsx)(p, { className: (0, a.c)(s, I), children: c });
      }
      ((x[19] = N),
        (x[20] = D),
        (x[21] = P),
        (x[22] = F),
        (x[23] = O),
        (x[24] = K),
        (x[25] = g.amount),
        (x[26] = E?.liveMarketCap),
        (x[27] = A),
        (x[28] = Q),
        (x[29] = T),
        (x[30] = B),
        (x[31] = I),
        (x[32] = d),
        (x[33] = u));
    } else ((d = x[32]), (u = x[33]));
    return u !== Symbol.for("react.early_return_sentinel") ? u : d;
  }
  function ex(e) {
    return e.stopPropagation();
  }
  function eb(e) {
    let t,
      s,
      a,
      o = (0, r.c)(8),
      { bounty: l } = e,
      { t: c } = (0, x.f)(),
      d = ek(l.expiresAt),
      u = "done" === l.status,
      m = "closed" === l.status || null === d;
    o[0] !== d || o[1] !== m || o[2] !== u || o[3] !== c
      ? ((t = u ? c("common.completed") : m ? c("common.closed") : d),
        (o[0] = d),
        (o[1] = m),
        (o[2] = u),
        (o[3] = c),
        (o[4] = t))
      : (t = o[4]);
    let p = t;
    return (
      o[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, i.jsx)(n.E$, {
            className: "h-3 w-3 flex-shrink-0 text-text-tertiary",
          })),
          (o[5] = s))
        : (s = o[5]),
      o[6] !== p
        ? ((a = (0, i.jsxs)("span", {
            className:
              "inline-flex items-center gap-1.5 text-[13px] leading-[1.5] tabular-nums text-text-tertiary",
            children: [s, p],
          })),
          (o[6] = p),
          (o[7] = a))
        : (a = o[7]),
      a
    );
  }
  let eh = new Set(),
    ey = () => 1e3 * Math.floor((0, N.t)() / 1e3),
    eg = (e) => (0, N.M)() && (0, N.t)() >= e;
  function ev(e) {
    return (
      eh.add(e),
      void 0 === t &&
        (t = window.setInterval(() => {
          for (let e of eh) e();
        }, 1e3)),
      () => {
        (eh.delete(e),
          0 === eh.size &&
            void 0 !== t &&
            (window.clearInterval(t), (t = void 0)));
      }
    );
  }
  let ew = () => {};
  function ek(e) {
    let t,
      i,
      n,
      s = (0, r.c)(6);
    s[0] !== e ? ((t = (0, j.K)(e)), (s[0] = e), (s[1] = t)) : (t = s[1]);
    let a = t;
    s[2] !== a
      ? ((i = (e) => (void 0 === a || eg(a) ? ew : ev(e))),
        (s[2] = a),
        (s[3] = i))
      : (i = s[3]);
    let o = i;
    s[4] !== e ? ((n = () => (0, U.U)(e)), (s[4] = e), (s[5] = n)) : (n = s[5]);
    let l = n;
    return (0, f.useSyncExternalStore)(o, l, l);
  }
  function ej(e) {
    let t,
      i,
      n,
      s = (0, r.c)(6),
      a = e?.expiresAt ?? null;
    s[0] !== a
      ? ((t = null === a ? void 0 : (0, j.K)(a)), (s[0] = a), (s[1] = t))
      : (t = s[1]);
    let o = t;
    s[2] !== o
      ? ((i = (e) => (void 0 === o ? ew : ev(e))), (s[2] = o), (s[3] = i))
      : (i = s[3]);
    let l = i;
    s[4] !== o
      ? ((n = () => +!!(void 0 !== o && (0, N.t)() >= o)),
        (s[4] = o),
        (s[5] = n))
      : (n = s[5]);
    let c = n,
      d = (0, f.useSyncExternalStore)(l, c, e_),
      u = null === a || (void 0 !== o && 1 === d);
    return !!(e && "open" === e.status && !u);
  }
  function e_() {
    return 0;
  }
  function eN(e) {
    let t = (0, r.c)(19),
      { media: n, className: s, hoverPlayOnly: o, muxAnalytics: l } = e;
    if (!n) return null;
    if ("image" === n.type || "gallery" === n.type) {
      let e, r;
      t[0] !== n.type || t[1] !== n.url || t[2] !== n.urls
        ? ((e = "image" === n.type ? [n.url] : n.urls),
          (t[0] = n.type),
          (t[1] = n.url),
          (t[2] = n.urls),
          (t[3] = e))
        : (e = t[3]);
      let a = e;
      return (
        t[4] !== s || t[5] !== a
          ? ((r = (0, i.jsx)(L.f, { className: s, urls: a })),
            (t[4] = s),
            (t[5] = a),
            (t[6] = r))
          : (r = t[6]),
        r
      );
    }
    if ("video" === n.type) {
      let e, r, c;
      t[7] !== s
        ? ((e = (0, a.c)(
            "mt-1 overflow-hidden rounded-xl border border-border-secondary bg-black",
            s,
          )),
          (t[7] = s),
          (t[8] = e))
        : (e = t[8]);
      let d = void 0 !== o && o ? "hover" : "always";
      return (
        t[9] !== n.mimeType ||
        t[10] !== n.posterUrl ||
        t[11] !== n.sources ||
        t[12] !== n.url ||
        t[13] !== l ||
        t[14] !== d
          ? ((r = (0, i.jsx)(F.f, {
              controls: !0,
              controlsVisibility: d,
              maxHeight: 520,
              mediaClassName: "object-contain",
              muxAnalytics: l,
              poster: n.posterUrl,
              sources: n.sources,
              sourceType: n.mimeType,
              src: n.url,
            })),
            (t[9] = n.mimeType),
            (t[10] = n.posterUrl),
            (t[11] = n.sources),
            (t[12] = n.url),
            (t[13] = l),
            (t[14] = d),
            (t[15] = r))
          : (r = t[15]),
        t[16] !== e || t[17] !== r
          ? ((c = (0, i.jsx)("div", { className: e, children: r })),
            (t[16] = e),
            (t[17] = r),
            (t[18] = c))
          : (c = t[18]),
        c
      );
    }
    return null;
  }
  (e.s(
    [
      "t",
      0,
      em,
      "C",
      0,
      function (e) {
        let t,
          o,
          m,
          b,
          h,
          y,
          w,
          j,
          N,
          F,
          L,
          O,
          K,
          M,
          R,
          q,
          $,
          Y,
          H,
          W,
          V,
          z,
          G,
          X,
          Z,
          J,
          ee,
          et,
          ei,
          er,
          en = (0, r.c)(194),
          { t: es } = (0, x.f)(),
          {
            bounty: ea,
            index: eo,
            resolvedToken: ef,
            resolvedTokens: ex,
            showBadge: eh,
            isDraft: ey,
            videoPlayMode: eg,
            disableHoverCards: ev,
          } = e,
          ew = void 0 === eh || eh,
          ek = void 0 !== ey && ey,
          e_ = void 0 === eg ? "default" : eg,
          eI = void 0 !== ev && ev,
          eC = (0, p.useRouter)(),
          { openWithDraft: eS } = (0, E.useBountyCreateDialog)(),
          [eA, eF] = (0, f.useState)(!1);
        en[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = (e) => {
              (e.stopPropagation(), eF(!0));
            }),
            (en[0] = t))
          : (t = en[0]);
        let eU = t,
          { ipfsPrefix: eT } = (0, C.useIpfsPrefix)();
        en[1] !== ea.id || en[2] !== ea.viewerLiked
          ? ((o = { taskId: ea.id, viewerLiked: ea.viewerLiked }),
            (en[1] = ea.id),
            (en[2] = ea.viewerLiked),
            (en[3] = o))
          : (o = en[3]);
        let eE = el(o),
          eD = (0, v.f)();
        en[4] !== ea
          ? ((m = (0, k.S)(ea)), (en[4] = ea), (en[5] = m))
          : (m = en[5]);
        let eB = m;
        en[6] !== ea
          ? ((b = (0, k.e)(ea)), (en[6] = ea), (en[7] = b))
          : (b = en[7]);
        let eL = b,
          eP = ej(ea),
          eQ = ea.winnerCount > 0;
        en[8] !== ea
          ? ((h = (0, ec.g)(ea)), (en[8] = ea), (en[9] = h))
          : (h = en[9]);
        let eO = (0, ec.V)(h);
        en[10] !== ea.createdAt
          ? ((y = (0, U.$)(ea.createdAt)),
            (en[10] = ea.createdAt),
            (en[11] = y))
          : (y = en[11]);
        let eK = y;
        if (
          en[12] !== ea ||
          en[13] !== eI ||
          en[14] !== eA ||
          en[15] !== eQ ||
          en[16] !== eo ||
          en[17] !== eT ||
          en[18] !== eP ||
          en[19] !== ek ||
          en[20] !== eO ||
          en[21] !== eS ||
          en[22] !== ef ||
          en[23] !== ex ||
          en[24] !== eC ||
          en[25] !== ew ||
          en[26] !== es ||
          en[27] !== eK ||
          en[28] !== e_
        ) {
          let e, t, r, o, m, p, f, x, b, h, y, v, k, C, E, D, P, Q, Z;
          ((N = (0, T.h)(ea.attachments)),
            (F = (0, T.D)(N, ea.attachments) ?? void 0),
            en[47] !== ea.creator
              ? ((e = (0, U.B)(ea.creator)),
                (en[47] = ea.creator),
                (en[48] = e))
              : (e = en[48]));
          let J = e;
          en[49] !== ea.creator.address || en[50] !== ea.creator.username
            ? ((t = (0, l.d)(ea.creator.address, ea.creator.username)),
              (en[49] = ea.creator.address),
              (en[50] = ea.creator.username),
              (en[51] = t))
            : (t = en[51]);
          let ee = t;
          en[52] !== ea.id ||
          en[53] !== ea.status ||
          en[54] !== ek ||
          en[55] !== eS ||
          en[56] !== eC
            ? ((r = function (e) {
                if (!e.target.closest("button, a, media-player, video")) {
                  if (ek) return void eS(ea.id);
                  ((0, I.k)({
                    source: "discover",
                    bountyId: ea.id,
                    bountyStatus: (0, I.s)(ea.status),
                  }),
                    eC.push(`/go/${ea.id}`));
                }
              }),
              (en[52] = ea.id),
              (en[53] = ea.status),
              (en[54] = ek),
              (en[55] = eS),
              (en[56] = eC),
              (en[57] = r))
            : (r = en[57]);
          let et = r;
          ((j = u.f.article),
            en[58] === Symbol.for("react.memo_cache_sentinel")
              ? ((H = { opacity: 0, y: 12 }),
                (W = { opacity: 1, y: 0 }),
                (en[58] = H),
                (en[59] = W))
              : ((H = en[58]), (W = en[59])));
          let ei = 0.03 * Math.min(eo, 8);
          (en[60] !== ei
            ? ((V = { duration: 0.28, delay: ei }), (en[60] = ei), (en[61] = V))
            : (V = en[61]),
            (z =
              "group flex cursor-pointer gap-3 border-b border-border-secondary px-4 py-3.5 transition-colors hover:bg-bg-tertiary"),
            (G = et));
          let er = ea.creator.profileImage ?? null,
            el = ea.creator.username ?? null;
          (en[62] !== ea.creator.address
            ? ((o = (0, i.jsx)(S.f, { authorAddress: ea.creator.address })),
              (en[62] = ea.creator.address),
              (en[63] = o))
            : (o = en[63]),
            en[64] !== ea.creator.address ||
            en[65] !== ea.creator.profileImage ||
            en[66] !== J ||
            en[67] !== eT
              ? ((m = (0, i.jsx)(d.f, {
                  address: ea.creator.address,
                  alt: J,
                  className: "h-10 w-10",
                  height: 40,
                  ipfsPrefix: eT,
                  isAnonymous: !1,
                  src: ea.creator.profileImage,
                  width: 40,
                })),
                (en[64] = ea.creator.address),
                (en[65] = ea.creator.profileImage),
                (en[66] = J),
                (en[67] = eT),
                (en[68] = m))
              : (m = en[68]),
            en[69] !== ea.creator.address || en[70] !== ee || en[71] !== m
              ? ((p = (0, i.jsx)(g.o, {
                  profileId: ea.creator.address,
                  className: "inline-flex transition-opacity hover:opacity-80",
                  href: ee,
                  onClick: ed,
                  children: m,
                })),
                (en[69] = ea.creator.address),
                (en[70] = ee),
                (en[71] = m),
                (en[72] = p))
              : (p = en[72]),
            en[73] !== ea.creator.address ||
            en[74] !== ee ||
            en[75] !== eI ||
            en[76] !== eT ||
            en[77] !== er ||
            en[78] !== el ||
            en[79] !== o ||
            en[80] !== p
              ? ((X = (0, i.jsx)("div", {
                  className: "flex-shrink-0 pt-0.5",
                  children: (0, i.jsx)(c.f, {
                    disabled: eI,
                    fallbackAvatarUrl: er,
                    fallbackUsername: el,
                    followSlot: o,
                    ipfsPrefix: eT,
                    userAddress: ea.creator.address,
                    userProfileLink: ee,
                    children: p,
                  }),
                })),
                (en[73] = ea.creator.address),
                (en[74] = ee),
                (en[75] = eI),
                (en[76] = eT),
                (en[77] = er),
                (en[78] = el),
                (en[79] = o),
                (en[80] = p),
                (en[81] = X))
              : (X = en[81]),
            (M = "flex min-w-0 flex-1 flex-col gap-2"),
            en[82] !== ea.token ||
            en[83] !== eI ||
            en[84] !== ef?.liveImageUri ||
            en[85] !== ef?.liveMarketCap ||
            en[86] !== ef?.liveName ||
            en[87] !== ef?.liveSymbol ||
            en[88] !== ef?.mint
              ? ((f = ea.token
                  ? (0, i.jsx)(em, {
                      disableHoverCard: eI,
                      imageUri: ef?.liveImageUri ?? ea.token.imageUri ?? "",
                      marketCap: ef?.liveMarketCap,
                      mint: ef?.mint ?? ea.token.mint,
                      name: ef?.liveName ?? ea.token.name,
                      symbol: ef?.liveSymbol ?? ea.token.symbol,
                    })
                  : null),
                (en[82] = ea.token),
                (en[83] = eI),
                (en[84] = ef?.liveImageUri),
                (en[85] = ef?.liveMarketCap),
                (en[86] = ef?.liveName),
                (en[87] = ef?.liveSymbol),
                (en[88] = ef?.mint),
                (en[89] = f))
              : (f = en[89]),
            en[90] !== eQ ||
            en[91] !== eP ||
            en[92] !== ek ||
            en[93] !== ew ||
            en[94] !== es
              ? ((x = ew
                  ? ek
                    ? (0, i.jsx)(B.L, {
                        icon: (0, i.jsx)(n.wh, { className: "h-3 w-3" }),
                        label: es("home.bounties.draft_badge"),
                        tone: "warning",
                      })
                    : eQ
                      ? null
                      : (0, i.jsx)(B.L, {
                          icon: (0, i.jsx)(n.vW, { className: "h-3 w-3" }),
                          label: es(
                            eP
                              ? "home.bounties.detail.status_open"
                              : "web.bounties.bounty_label",
                          ),
                          tone: eP ? "positive" : "muted",
                        })
                  : null),
                (en[90] = eQ),
                (en[91] = eP),
                (en[92] = ek),
                (en[93] = ew),
                (en[94] = es),
                (en[95] = x))
              : (x = en[95]),
            en[96] !== ea
              ? ((b = (0, i.jsx)(eu, { bounty: ea })),
                (en[96] = ea),
                (en[97] = b))
              : (b = en[97]),
            en[98] !== ea || en[99] !== ek
              ? ((h = (0, i.jsx)(A.f, { bounty: ea, isDraft: ek })),
                (en[98] = ea),
                (en[99] = ek),
                (en[100] = h))
              : (h = en[100]),
            en[101] !== f || en[102] !== x || en[103] !== b || en[104] !== h
              ? ((y = (0, i.jsxs)(i.Fragment, { children: [f, x, b, h] })),
                (en[101] = f),
                (en[102] = x),
                (en[103] = b),
                (en[104] = h),
                (en[105] = y))
              : (y = en[105]),
            en[106] !== ea.creator.address ||
            en[107] !== ea.creator.profileImage ||
            en[108] !== ea.creator.username ||
            en[109] !== ee ||
            en[110] !== eI ||
            en[111] !== eT ||
            en[112] !== y ||
            en[113] !== eK
              ? ((R = (0, i.jsx)(B.Z, {
                  address: ea.creator.address,
                  hideAvatar: !0,
                  ipfsPrefix: eT,
                  profileHref: ee,
                  profileImage: ea.creator.profileImage,
                  disableProfileHoverCard: eI,
                  timeLabel: eK,
                  trailing: y,
                  username: ea.creator.username,
                })),
                (en[106] = ea.creator.address),
                (en[107] = ea.creator.profileImage),
                (en[108] = ea.creator.username),
                (en[109] = ee),
                (en[110] = eI),
                (en[111] = eT),
                (en[112] = y),
                (en[113] = eK),
                (en[114] = R))
              : (R = en[114]),
            en[115] !== ea.title
              ? ((q = (0, i.jsx)("h3", {
                  className:
                    "m-0 text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-white",
                  children: ea.title,
                })),
                (en[115] = ea.title),
                (en[116] = q))
              : (q = en[116]));
          let ec = !eA && "line-clamp-[9]";
          (en[117] !== ec
            ? ((v = (0, a.c)(
                "m-0 whitespace-pre-wrap text-[15px] leading-[1.55] text-text-secondary",
                ec,
              )),
              (en[117] = ec),
              (en[118] = v))
            : (v = en[118]),
            en[119] !== ea.summary || en[120] !== v
              ? ((k = (0, i.jsx)("p", { className: v, children: ea.summary })),
                (en[119] = ea.summary),
                (en[120] = v),
                (en[121] = k))
              : (k = en[121]),
            en[122] !== ea.summary || en[123] !== eA || en[124] !== es
              ? ((C =
                  !eA &&
                  ea.summary.length > 400 &&
                  (0, i.jsx)("button", {
                    className:
                      "mt-1 text-[13px] font-medium text-text-secondary transition-colors hover:text-white",
                    onClick: eU,
                    type: "button",
                    children: es("common.show_more"),
                  })),
                (en[122] = ea.summary),
                (en[123] = eA),
                (en[124] = es),
                (en[125] = C))
              : (C = en[125]),
            en[126] !== k || en[127] !== C
              ? (($ = (0, i.jsxs)("div", { children: [k, C] })),
                (en[126] = k),
                (en[127] = C),
                (en[128] = $))
              : ($ = en[128]));
          let eh = !eQ && eP ? "positive" : "muted";
          (en[129] !== ea ||
          en[130] !== eI ||
          en[131] !== eO ||
          en[132] !== ef ||
          en[133] !== ex ||
          en[134] !== eh
            ? ((E = (0, i.jsx)(ep, {
                bounty: ea,
                disableCoinHoverCards: eI,
                liveUsd: eO,
                resolvedToken: ef,
                resolvedTokens: ex,
                tone: eh,
              })),
              (en[129] = ea),
              (en[130] = eI),
              (en[131] = eO),
              (en[132] = ef),
              (en[133] = ex),
              (en[134] = eh),
              (en[135] = E))
            : (E = en[135]),
            en[136] !== ea
              ? ((D = (0, i.jsx)(eb, { bounty: ea })),
                (en[136] = ea),
                (en[137] = D))
              : (D = en[137]),
            en[138] === Symbol.for("react.memo_cache_sentinel")
              ? ((P = (0, i.jsx)(n.w7, {
                  className: "h-3 w-3 flex-shrink-0 text-text-tertiary",
                })),
                (en[138] = P))
              : (P = en[138]),
            en[139] !== ea.submissionCount
              ? ((Q = (0, U.l)(ea.submissionCount)),
                (en[139] = ea.submissionCount),
                (en[140] = Q))
              : (Q = en[140]),
            en[141] !== Q
              ? ((Z = (0, i.jsxs)("span", {
                  className:
                    "inline-flex items-center gap-1.5 text-[13px] leading-[1.5] tabular-nums text-text-tertiary",
                  children: [P, Q],
                })),
                (en[141] = Q),
                (en[142] = Z))
              : (Z = en[142]),
            en[143] !== E || en[144] !== D || en[145] !== Z
              ? ((Y = (0, i.jsxs)("div", {
                  className: "flex flex-wrap items-end gap-x-5 gap-y-2",
                  children: [E, D, Z],
                })),
                (en[143] = E),
                (en[144] = D),
                (en[145] = Z),
                (en[146] = Y))
              : (Y = en[146]),
            (w = eN),
            (L = "hover" === e_),
            (O = N),
            (K =
              N?.type === "video"
                ? (0, _.U)({
                    ...ea,
                    videoId: (0, _.p)({
                      src: N.url,
                      attachments: ea.attachments,
                    }),
                    page: s.j.WEB_BOUNTIES_FEED,
                    playerName: s.w.WEB_BOUNTY_FEED_PLAYER,
                  })
                : void 0),
            (en[12] = ea),
            (en[13] = eI),
            (en[14] = eA),
            (en[15] = eQ),
            (en[16] = eo),
            (en[17] = eT),
            (en[18] = eP),
            (en[19] = ek),
            (en[20] = eO),
            (en[21] = eS),
            (en[22] = ef),
            (en[23] = ex),
            (en[24] = eC),
            (en[25] = ew),
            (en[26] = es),
            (en[27] = eK),
            (en[28] = e_),
            (en[29] = w),
            (en[30] = j),
            (en[31] = N),
            (en[32] = F),
            (en[33] = L),
            (en[34] = O),
            (en[35] = K),
            (en[36] = M),
            (en[37] = R),
            (en[38] = q),
            (en[39] = $),
            (en[40] = Y),
            (en[41] = H),
            (en[42] = W),
            (en[43] = V),
            (en[44] = z),
            (en[45] = G),
            (en[46] = X));
        } else
          ((w = en[29]),
            (j = en[30]),
            (N = en[31]),
            (F = en[32]),
            (L = en[33]),
            (O = en[34]),
            (K = en[35]),
            (M = en[36]),
            (R = en[37]),
            (q = en[38]),
            ($ = en[39]),
            (Y = en[40]),
            (H = en[41]),
            (W = en[42]),
            (V = en[43]),
            (z = en[44]),
            (G = en[45]),
            (X = en[46]));
        en[147] !== w || en[148] !== L || en[149] !== O || en[150] !== K
          ? ((Z = (0, i.jsx)(w, {
              hoverPlayOnly: L,
              media: O,
              muxAnalytics: K,
            })),
            (en[147] = w),
            (en[148] = L),
            (en[149] = O),
            (en[150] = K),
            (en[151] = Z))
          : (Z = en[151]);
        let eM = ea.description[0],
          eR = ea.id;
        en[152] !== N
          ? ((J = (0, T.X)(N)), (en[152] = N), (en[153] = J))
          : (J = en[153]);
        let eq = N ? void 0 : (ef?.liveImageUri ?? ea.token?.imageUri),
          e$ = N ? void 0 : (ef?.mint ?? ea.token?.mint),
          eY = !ek,
          eH = !ek;
        return (
          en[154] !== ea.description[0] ||
          en[155] !== ea.id ||
          en[156] !== ea.likeCount ||
          en[157] !== ea.title ||
          en[158] !== eE.liked ||
          en[159] !== eE.pending ||
          en[160] !== eE.toggle ||
          en[161] !== F ||
          en[162] !== J ||
          en[163] !== eq ||
          en[164] !== e$ ||
          en[165] !== eY ||
          en[166] !== eH
            ? ((ee = (0, i.jsx)(D.f, {
                bountyDescription: eM,
                bountyId: eR,
                bountyImageUrl: J,
                bountyTitle: ea.title,
                coinImageUrl: eq,
                coinMint: e$,
                likeCount: ea.likeCount,
                onToggleLike: eE.toggle,
                pending: eE.pending,
                shareMedia: F,
                showLike: eY,
                showShare: eH,
                viewerLiked: eE.liked,
              })),
              (en[154] = ea.description[0]),
              (en[155] = ea.id),
              (en[156] = ea.likeCount),
              (en[157] = ea.title),
              (en[158] = eE.liked),
              (en[159] = eE.pending),
              (en[160] = eE.toggle),
              (en[161] = F),
              (en[162] = J),
              (en[163] = eq),
              (en[164] = e$),
              (en[165] = eY),
              (en[166] = eH),
              (en[167] = ee))
            : (ee = en[167]),
          en[168] !== ea.banInfo ||
          en[169] !== ea.id ||
          en[170] !== ea.unbanInfo ||
          en[171] !== eD ||
          en[172] !== eB ||
          en[173] !== eL ||
          en[174] !== ek
            ? ((et =
                !ek && eD
                  ? (0, i.jsxs)("div", {
                      className: "mt-1 flex justify-end gap-1.5",
                      children: [
                        (0, i.jsx)(P.f, {
                          className:
                            "w-auto rounded-full border border-[#FCA5A5]/35 bg-[#F87171]/10 px-2.5 py-1 text-[11px] font-semibold text-[#FCA5A5] hover:bg-[#F87171]/20",
                          isBanned: eB,
                          banInfo: ea.banInfo,
                          unbanInfo: ea.unbanInfo,
                          taskId: ea.id,
                        }),
                        (0, i.jsx)(Q.f, {
                          className:
                            "w-auto rounded-full border border-amber-300/35 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20",
                          isNsfw: eL,
                          taskId: ea.id,
                        }),
                      ],
                    })
                  : null),
              (en[168] = ea.banInfo),
              (en[169] = ea.id),
              (en[170] = ea.unbanInfo),
              (en[171] = eD),
              (en[172] = eB),
              (en[173] = eL),
              (en[174] = ek),
              (en[175] = et))
            : (et = en[175]),
          en[176] !== M ||
          en[177] !== R ||
          en[178] !== q ||
          en[179] !== $ ||
          en[180] !== Y ||
          en[181] !== Z ||
          en[182] !== ee ||
          en[183] !== et
            ? ((ei = (0, i.jsxs)("div", {
                className: M,
                children: [R, q, $, Y, Z, ee, et],
              })),
              (en[176] = M),
              (en[177] = R),
              (en[178] = q),
              (en[179] = $),
              (en[180] = Y),
              (en[181] = Z),
              (en[182] = ee),
              (en[183] = et),
              (en[184] = ei))
            : (ei = en[184]),
          en[185] !== j ||
          en[186] !== H ||
          en[187] !== W ||
          en[188] !== V ||
          en[189] !== z ||
          en[190] !== G ||
          en[191] !== X ||
          en[192] !== ei
            ? ((er = (0, i.jsxs)(j, {
                initial: H,
                animate: W,
                transition: V,
                className: z,
                onClick: G,
                children: [X, ei],
              })),
              (en[185] = j),
              (en[186] = H),
              (en[187] = W),
              (en[188] = V),
              (en[189] = z),
              (en[190] = G),
              (en[191] = X),
              (en[192] = ei),
              (en[193] = er))
            : (er = en[193]),
          er
        );
      },
      "u",
      0,
      ep,
      "Z",
      0,
      ef,
      "e",
      0,
      eN,
      "a",
      0,
      eb,
      "D",
      0,
      ek,
      "R",
      0,
      function (e) {
        let t,
          i,
          n = (0, r.c)(4);
        n[0] !== e ? ((t = (0, j.K)(e)), (n[0] = e), (n[1] = t)) : (t = n[1]);
        let s = t;
        n[2] !== s
          ? ((i = (e) => (void 0 === s || eg(s) ? ew : ev(e))),
            (n[2] = s),
            (n[3] = i))
          : (i = n[3]);
        let a = i;
        return (0, f.useSyncExternalStore)(a, ey, ey);
      },
      "s",
      0,
      ej,
    ],
    486527,
  ),
    e.s(
      [
        "f",
        0,
        "min-w-0 whitespace-normal break-words [overflow-wrap:anywhere]",
      ],
      610850,
    ));
};
