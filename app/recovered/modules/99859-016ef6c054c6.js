// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(352386),
    i = e.i(349879),
    l = e.i(735821),
    a = e.i(154703),
    o = e.i(894107);
  let s = i.t,
    u = new Set(),
    c = (e) => {
      let {
        pageSize: t,
        chain: n,
        includeFollowedHolders: r,
        viewerAddress: i,
      } = e;
      return {
        queryKey: ["callouts", "home-feed", n, t, r, i],
        queryFn: ({ signal: e }) =>
          (0, l.Z)({
            pageSize: t,
            chain: n,
            includeFollowedHolders: r,
            viewerAddress: i,
            signal: e,
          }),
        staleTime: s,
        retry: 3,
      };
    };
  function d() {
    return new WeakMap();
  }
  function m(e) {
    return e.key;
  }
  function f(e) {
    return e.key;
  }
  function p(e) {
    return [e.key, e];
  }
  function h(e) {
    return e.key;
  }
  function g(e) {
    return { key: e.key, coinMint: e.coinMint, coinSymbol: e.coinSymbol };
  }
  function y(e) {
    return e.key;
  }
  function v(e) {
    return e.key;
  }
  function b(e) {
    return e.key;
  }
  function w(e) {
    return e.key;
  }
  e.s([
    "Z",
    0,
    (e, t = {}) => {
      let {
        pageSize: n = l.c,
        chain: r = "all",
        includeFollowedHolders: i = !1,
        viewerAddress: a = null,
      } = t;
      return e.prefetchQuery(
        c({
          pageSize: n,
          chain: r,
          includeFollowedHolders: i,
          viewerAddress: a,
        }),
      );
    },
    "r",
    0,
    (e) => {
      let s,
        x,
        k,
        M,
        C,
        I,
        S,
        N,
        A,
        j,
        _,
        U,
        E,
        T,
        $,
        R = (0, t.c)(51),
        {
          enabled: D,
          pageSize: F,
          chain: P,
          includeFollowedHolders: B,
          viewerAddress: q,
        } = void 0 === e ? {} : e,
        O = void 0 === D || D,
        z = void 0 === F ? l.c : F,
        W = void 0 === P ? "all" : P,
        L = void 0 === q ? null : q,
        V = (0, o.useHomeFeedSeed)(),
        [Q] = (0, r.useState)(L),
        G = V?.chain === W && L === Q ? V.response : void 0,
        H = c({
          pageSize: z,
          chain: W,
          includeFollowedHolders: void 0 !== B && B,
          viewerAddress: L,
        });
      R[0] !== O || R[1] !== G || R[2] !== H
        ? ((s = {
            ...H,
            enabled: O,
            placeholderData: G,
            refetchOnWindowFocus: !0,
            refetchInterval: 15e3,
            refetchIntervalInBackground: !1,
          }),
          (R[0] = O),
          (R[1] = G),
          (R[2] = H),
          (R[3] = s))
        : (s = R[3]);
      let K = (0, n.useQuery)(s),
        Z = K.data ?? G,
        [X] = (0, r.useState)(d);
      if (R[4] !== X || R[5] !== Z?.coins) {
        let e = new Set();
        for (let t of ((x = []), Z?.coins ?? [])) {
          let n = X.get(t);
          (void 0 === n && ((n = (0, a.y)(t)), X.set(t, n)),
            !n || e.has(n.key) || (e.add(n.key), x.push(n)));
        }
        ((R[4] = X), (R[5] = Z?.coins), (R[6] = x));
      } else x = R[6];
      let J = x,
        [Y, ee] = (0, r.useState)(null),
        [et, en] = (0, r.useState)(u),
        [er, ei] = (0, r.useState)(0);
      R[7] !== J
        ? ((k = new Set(J.map(m))), (R[7] = J), (R[8] = k))
        : (k = R[8]);
      let el = k,
        [ea, eo] = (0, r.useState)(L);
      (ea !== L && (eo(L), ee(null), ei(0), en(u)),
        J.length > 0 &&
          (null === Y || !Y.some((e) => el.has(e))) &&
          (ee(J.slice(0, 12).map(f)), ei(0)),
        R[9] !== J
          ? ((M = new Map(J.map(p))), (R[9] = J), (R[10] = M))
          : (M = R[10]));
      let es = M;
      if (R[11] !== es || R[12] !== J || R[13] !== Y) {
        let e = Y ?? J.slice(0, 12).map(h);
        for (let t of ((I = new Set()), (C = []), e)) {
          let e = es.get(t);
          !e || I.has(t) || (I.add(t), C.push(e));
        }
        ((R[11] = es), (R[12] = J), (R[13] = Y), (R[14] = C), (R[15] = I));
      } else ((C = R[14]), (I = R[15]));
      if (R[16] !== C || R[17] !== I || R[18] !== J || R[19] !== et) {
        let e = J.filter((e) => !I.has(e.key));
        ((S = {
          callouts: C,
          unseen: e.filter((e) => !et.has(e.key)),
          retiredRows: e.filter((e) => et.has(e.key)),
        }),
          (R[16] = C),
          (R[17] = I),
          (R[18] = J),
          (R[19] = et),
          (R[20] = S));
      } else S = R[20];
      let { callouts: eu, unseen: ec, retiredRows: ed } = S,
        em = (0, r.useRef)(0);
      (R[21] !== ec.length
        ? ((N = () => {
            em.current = ec.length;
          }),
          (A = [ec.length]),
          (R[21] = ec.length),
          (R[22] = N),
          (R[23] = A))
        : ((N = R[22]), (A = R[23])),
        (0, r.useEffect)(N, A));
      let ef = ec.length > 0;
      (R[24] !== O || R[25] !== ef
        ? ((j = () => {
            if (!O || !ef) return;
            let e = setInterval(() => {
              let e = Math.min(em.current, 25);
              ei((t) => (t >= e ? t : t + 1));
            }, 2500);
            return () => clearInterval(e);
          }),
          (_ = [O, ef]),
          (R[24] = O),
          (R[25] = ef),
          (R[26] = j),
          (R[27] = _))
        : ((j = R[26]), (_ = R[27])),
        (0, r.useEffect)(j, _));
      let ep = Math.min(er, ec.length, 25),
        eh = Math.min(ep, i.I);
      R[28] !== eh || R[29] !== ec
        ? ((U = ec.slice(0, eh).map(g)),
          (R[28] = eh),
          (R[29] = ec),
          (R[30] = U))
        : (U = R[30]);
      let eg = U;
      R[31] !== eu ||
      R[32] !== el ||
      R[33] !== er ||
      R[34] !== et ||
      R[35] !== ec
        ? ((E = () => {
            if (0 === ec.length) return;
            let e = Math.max(Math.min(er, ec.length), 1),
              t = ec.slice(0, e).map(y),
              n = eu.map(v),
              r = new Set(t),
              i = [...t, ...n.filter((e) => !r.has(e))];
            (ee(i.slice(0, 40)),
              en(
                new Set([
                  ...Array.from(et).filter((e) => el.has(e)),
                  ...i.slice(40),
                ]),
              ),
              ei(0));
          }),
          (R[31] = eu),
          (R[32] = el),
          (R[33] = er),
          (R[34] = et),
          (R[35] = ec),
          (R[36] = E))
        : (E = R[36]);
      let ey = E;
      R[37] !== eu || R[38] !== ed || R[39] !== ec
        ? ((T = () => {
            let e = (ec.length > 0 ? ec : ed).slice(0, 12);
            if (0 === e.length) return;
            ee([...eu.map(b), ...e.map(w)]);
            let t = Math.max(ec.length - 12, 0);
            ei((e) => Math.min(e, t));
          }),
          (R[37] = eu),
          (R[38] = ed),
          (R[39] = ec),
          (R[40] = T))
        : (T = R[40]);
      let ev = T,
        eb = O && K.isPending && !Z,
        ew =
          K.isError && !Z && 0 === eu.length
            ? "Could not load the callouts feed"
            : null,
        ex = ec.length > 0 || ed.length > 0,
        ek = ec.length > 0;
      return (
        R[41] !== eu ||
        R[42] !== ev ||
        R[43] !== ep ||
        R[44] !== eg ||
        R[45] !== ey ||
        R[46] !== eb ||
        R[47] !== ew ||
        R[48] !== ex ||
        R[49] !== ek
          ? (($ = {
              callouts: eu,
              isLoadingHistory: eb,
              error: ew,
              pendingNewCount: ep,
              pendingPreview: eg,
              showNewCallouts: ey,
              hasNextPage: ex,
              hasUnseen: ek,
              isFetchingNextPage: !1,
              fetchNextPage: ev,
            }),
            (R[41] = eu),
            (R[42] = ev),
            (R[43] = ep),
            (R[44] = eg),
            (R[45] = ey),
            (R[46] = eb),
            (R[47] = ew),
            (R[48] = ex),
            (R[49] = ek),
            (R[50] = $))
          : ($ = R[50]),
        $
      );
    },
  ]);
};
