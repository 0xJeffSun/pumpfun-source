// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(402030),
    l = e.i(574472),
    i = e.i(352386),
    a = e.i(536925),
    n = e.i(751275),
    s = e.i(182303);
  e.i(946129);
  var c = e.i(148269),
    o = e.i(445242),
    u = e.i(311282),
    d = e.i(986071),
    f = (((t = {}).ASC = "ASC"), (t.DESC = "DESC"), t);
  let m = "DESC",
    h = ["ASC", "DESC"];
  e.s(
    [
      "I",
      0,
      m,
      "L",
      () => f,
      "J",
      0,
      function () {
        let e,
          t,
          r = (0, o.c)(4);
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, u.b)(h).withDefault(m)), (r[0] = e))
          : (e = r[0]);
        let [l, i] = (0, u.o)(d.f.HOME.SORT_ORDER, e);
        return (
          r[1] !== l || r[2] !== i
            ? ((t = { homeSortOrder: l, setHomeSortOrder: i }),
              (r[1] = l),
              (r[2] = i),
              (r[3] = t))
            : (t = r[3]),
          t
        );
      },
    ],
    998515,
  );
  var p = e.i(85324),
    E = e.i(997887),
    k = e.i(759257),
    S = e.i(346431);
  e.i(493367).W;
  var w = e.i(541710),
    x = e.i(646908),
    y = e.i(231824),
    g = e.i(192),
    b = e.i(569124),
    v = e.i(369091),
    C = e.i(293205),
    N = e.i(930234),
    T = e.i(583448),
    R = e.i(503774),
    A = e.i(493025);
  let P = new Map(),
    L = (e, t) => {
      if (
        (P.delete(e), P.set(e, { ...t, storedAt: Date.now() }), P.size > 24)
      ) {
        let e = P.keys().next().value;
        void 0 !== e && P.delete(e);
      }
    },
    j = [],
    I = (e) => e === c.E.FEATURED || e === c.E.TRENDING || e === c.E.STOCKS;
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          {
            sort: o,
            offset: u,
            limit: d,
            includeNsfw: m,
            order: h,
            creator: D,
            isSearchMode: O = !1,
            searchTerm: q,
            searchRefetchTrigger: M,
            useUnrestrictedSearch: $ = !1,
            includePerps: F = !1,
            chain: U = "all",
            callsWindow: G = S.W,
            forceLocalFiltering: _ = !1,
            initialCoins: z,
          } = e,
          K = "social-terminal" === (0, n.y)(),
          [H, W] = (0, i.useState)(() => (z && K && (0, R.$)(z), z ?? [])),
          [B, J] = (0, i.useState)(() => (z && o === c.E.TRENDING ? z : j)),
          [Y, Q] = (0, i.useState)(!z),
          [V, X] = (0, i.useState)(null),
          [Z, ee] = (0, i.useState)(() => z?.length ?? 0),
          et = JSON.stringify([
            (t = {
              sort: o ?? "",
              order: h ?? "",
              offset: u,
              limit: d,
              includeNsfw: m,
              isSearchMode: O,
              searchTerm: q ?? "",
              chain: U,
              creator: D,
              callsWindow: G,
            }).sort,
            t.order,
            t.offset,
            t.limit,
            t.includeNsfw,
            t.isSearchMode,
            t.searchTerm.trim(),
            t.chain,
            t.filterParams ?? null,
            t.creator ?? null,
            t.callsWindow ?? null,
          ]),
          [er, el] = (0, i.useState)(() => (z ? et : null)),
          [ei, ea] = (0, i.useState)(null),
          en = null !== ei && ei === et,
          es = (0, i.useRef)(et);
        es.current = et;
        let ec = (0, i.useRef)(er);
        ec.current = er;
        let eo = (0, i.useRef)(!!z?.length),
          eu = (0, i.useRef)(!1),
          { ipfsPrefix: ed } = (0, v.useIpfsPrefix)(),
          { address: ef, userId: em, authReady: eh } = (0, l.F)(),
          { sessionData: ep } = (0, C.useSession)(),
          eE = (0, g.d)() ?? ep?.pump_session_id,
          ek = (0, w.l)(),
          eS = (0, i.useRef)(e.onSearchSettled);
        eS.current = e.onSearchSettled;
        let ew = (0, i.useRef)(0),
          ex = (0, i.useRef)(null),
          ey = (0, i.useRef)(0),
          eg = (0, i.useRef)(!1),
          eb = (0, i.useRef)(null),
          ev = (0, i.useCallback)(
            (e) =>
              e
                ? e === c.E.FEATURED ||
                  e === c.E.CHARITY ||
                  e === c.E.CUSTOM_PAIRS ||
                  e === c.E.LIVE ||
                  e === c.E.CALLS ||
                  e === c.E.TRENDING ||
                  e === c.E.STOCKS ||
                  e === c.E.MAJORS
                  ? c.E.MARKET_CAP
                  : e === c.E.OLDEST
                    ? c.E.NEWEST
                    : e
                : e,
            [],
          ),
          eC = (0, i.useCallback)(
            (e, t) =>
              e === c.E.NEWEST && t ? t : e === c.E.OLDEST ? f.ASC : f.DESC,
            [],
          ),
          eN = (0, i.useCallback)(
            ({
              offset: e,
              order: t,
              searchTerm: r,
              sort: l,
              useLocalFilterLimit: i = !1,
            }) => {
              let a = ev(l),
                n = eC(l, t),
                s = {
                  offset: e || 0,
                  limit: i ? 100 : d,
                  ...(a ? { sort: a } : {}),
                  includeNsfw: m,
                  order: n,
                };
              if (r) {
                s.searchTerm = r;
                let { deviceId: e } = (0, y.f)(eE);
                (e && (s.deviceId = e), eE && (s.sessionId = eE));
              }
              return (
                D && (s.creator = D),
                l === c.E.CHARITY && (s.isCharity = !0),
                s
              );
            },
            [d, m, D, eE, 100, ev, eC],
          ),
          eT = (0, i.useCallback)(
            async (e, t = !0, r = !1, l = !1, i, a) => {
              let n,
                s = es.current,
                c =
                  "client" === e.kind
                    ? JSON.stringify([e.route, e.query])
                    : e.url,
                o = `${c}::${r ? `${u}:${d}` : "full"}`,
                f = l
                  ? null
                  : (n = P.get(o))
                    ? Date.now() - n.storedAt > 12e4
                      ? (P.delete(o), null)
                      : n
                    : null;
              (f
                ? (W(f.coins),
                  ee(f.unfilteredPageSize),
                  X(f.hasNextPage),
                  el(s),
                  ea(null))
                : t && Q(!0),
                (ew.current += 1));
              let m = ew.current;
              ex.current && ex.current.abort();
              let h = new AbortController();
              ex.current = h;
              let p = h.signal,
                S = Date.now();
              try {
                let t;
                if ("board" === e.kind || "list" === e.kind) {
                  let r = await fetch(e.url, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    signal: p,
                    ...("list" === e.kind && e.cache ? { cache: e.cache } : {}),
                  });
                  if (!r.ok)
                    throw Error(`Error fetching coins: ${r.statusText}`);
                  let l = await r.json();
                  t =
                    "board" === e.kind
                      ? (0, T.$)(l)
                      : "list" === e.kind && e.parse
                        ? e.parse(l)
                        : l;
                } else {
                  let r = await (0, k.f)()(e.route, {
                    query: e.query,
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      "x-pump-source": "WEB",
                      "x-pump-platform": "web",
                    },
                    signal: p,
                    throwHttpErrors: !1,
                    hooks: {
                      afterResponse: [
                        (e, t, r) => {
                          if (!r.ok)
                            throw Error(
                              `Error fetching coins: ${r.statusText}`,
                            );
                        },
                      ],
                    },
                  });
                  if (null === r) throw Error("Failed to fetch coins");
                  t = (0, E.l)(r);
                }
                let l = (0, A.f)(t, ed),
                  n = i ? i(l) : l,
                  c = m === ew.current;
                if (c) {
                  if (
                    (a?.(l.length, Date.now() - S),
                    ea(null),
                    J("board" === e.kind && "trending" === e.board ? t : j),
                    r)
                  ) {
                    let e = n.slice(u, u + d);
                    W(e);
                    let t = l.slice(u, u + d).length,
                      r = l.length > u + d;
                    (ee(t),
                      X(r),
                      L(o, {
                        coins: e,
                        unfilteredPageSize: t,
                        hasNextPage: r,
                      }));
                  } else
                    (W(n),
                      ee(l.length),
                      X(null),
                      L(o, {
                        coins: n,
                        unfilteredPageSize: l.length,
                        hasNextPage: null,
                      }));
                  el(s);
                }
                return c;
              } catch (t) {
                let e = K ? l && ec.current === s : l;
                return (
                  "AbortError" === t.name ||
                    m !== ew.current ||
                    e ||
                    f ||
                    (W([]), J(j), ee(0), X(null), el(s), ea(s)),
                  !1
                );
              } finally {
                (m === ew.current && Q(!1), (ex.current = null));
              }
            },
            [ed, u, d, K],
          ),
          eR = (0, i.useCallback)(
            async ({ searchTerm: e, useLocalFiltering: t = !1 }) => {
              if (!e?.trim()) return;
              let r = o === c.E.CHARITY,
                l = {
                  ...eN({
                    searchTerm: e,
                    offset: t ? 0 : u,
                    sort: r ? c.E.MARKET_CAP : o,
                    order: h,
                    useLocalFilterLimit: t,
                  }),
                };
              r && (l.isCharity = !0);
              let i = $
                  ? {
                      kind: "client",
                      route: "GET /coins/search-unrestricted",
                      query: l,
                    }
                  : {
                      kind: "client",
                      route: "GET /coins/search-v2",
                      query: F ? { ...l, includePerps: !0 } : l,
                    },
                a = t || 0 === u,
                n = e.trim();
              await eT(
                i,
                !1,
                t,
                !1,
                (e) =>
                  e.filter(
                    (e) => (0, N.f)(e) && ((0, w.M)(ek) || !(0, x.a)(e)),
                  ),
                (e, t) => {
                  a &&
                    eS.current?.({
                      searchTerm: n,
                      resultCount: e,
                      timeToLoadMs: t,
                    });
                },
              );
            },
            [eN, u, o, h, eT, $, F, ek],
          ),
          eA = (0, i.useCallback)(
            async (e = !1, t = !1) => {
              var l, i;
              let a,
                n,
                s,
                f = ({ board: e, chain: t }) => ({
                  kind: "board",
                  board: e,
                  url: (0, T.f)({
                    limit: 300,
                    userId: ef || void 0,
                    pumpUserId: em || void 0,
                    ...(0, y.f)(eE || void 0),
                    chain: t,
                    exposure: ek,
                    board: e,
                  }),
                }),
                p = {};
              switch (
                (o !== c.E.FEATURED &&
                  (p = eN({
                    sort: o,
                    offset: e ? 0 : u,
                    order: h,
                    includeNsfw: m,
                    useLocalFilterLimit: e,
                  })),
                o)
              ) {
                case c.E.CHARITY:
                  a = {
                    kind: "client",
                    route: "GET /coins/search-unrestricted",
                    query: p,
                  };
                  break;
                case c.E.CUSTOM_PAIRS:
                  a = {
                    kind: "list",
                    url:
                      ((n = new URLSearchParams({
                        offset: String(
                          (l = {
                            offset: e ? 0 : u,
                            limit: e ? 100 : d,
                            includeNsfw: m,
                          }).offset,
                        ),
                        limit: String(l.limit),
                        includeNsfw: String(l.includeNsfw),
                      })),
                      `/api/explore/custom-pairs?${n.toString()}`),
                  };
                  break;
                case c.E.MAJORS:
                  a = {
                    kind: "list",
                    url:
                      ((s = new URLSearchParams({
                        offset: String(
                          (i = { offset: e ? 0 : u, limit: e ? 100 : d })
                            .offset,
                        ),
                        limit: String(i.limit),
                      })),
                      `/api/explore/majors?${s.toString()}`),
                  };
                  break;
                case c.E.STOCKS:
                  a = { kind: "list", url: (0, b.m)(!!ef), parse: b.K };
                  break;
                case c.E.LIVE:
                  ((ey.current = Date.now()),
                    (a = {
                      kind: "client",
                      route: "GET /coins/currently-live",
                      query: {
                        limit: e ? 100 : d,
                        offset: e ? 0 : u,
                        includeNsfw: m,
                      },
                    }));
                  break;
                case c.E.CALLS:
                  a = {
                    kind: "list",
                    url: (0, S.x)({
                      window: G,
                      offset: e ? 0 : u,
                      limit: e ? 100 : d,
                      includeNsfw: m,
                    }),
                    cache: "no-store",
                  };
                  break;
                case c.E.FEATURED:
                  a = f({ board: "movers", chain: U });
                  break;
                case c.E.TRENDING:
                  a = f({ board: "trending" });
                  break;
                default:
                  a = {
                    kind: "client",
                    route: "GET /coins",
                    query: r.contract["GET /coins"].query.parse(p),
                  };
              }
              return eT(a, !t, I(o) ? !e : e, t);
            },
            [o, h, u, d, m, eN, eT, 100, U, G, ek, ef, em, eE],
          );
        eb.current = eA;
        let eP = (0, i.useCallback)(
          (0, a.t)(async (e) => {
            try {
              (Q(!0), await eR(e));
            } catch (e) {
              console.error("Error during debounced search:", e);
            } finally {
              Q(!1);
            }
          }, 1e3),
          [eR],
        );
        ((0, i.useEffect)(
          () => (
            O &&
              q?.trim() &&
              !eg.current &&
              (Q(!0), eP({ searchTerm: q, useLocalFiltering: _ })),
            () => {
              eP.cancel();
            }
          ),
          [O, q, M, eP, _],
        ),
          (0, i.useEffect)(() => {
            let e = eb.current;
            !e || (ea(null), (!I(o) || 0 !== u || eu.current) && (O || e(_)));
          }, [O, o, h, u, d, m, U, G, ek, _]));
        let eL = (0, i.useRef)(void 0);
        (0, i.useEffect)(() => {
          if (!I(o) || O || 0 !== u || !eh || (eu.current && ef === eL.current))
            return;
          let e = eu.current || eo.current;
          if (((eu.current = !0), K)) {
            ((eL.current = ef), eb.current?.(_, e));
            return;
          }
          eb.current?.(_, e).then((e) => {
            e && (eL.current = ef);
          });
        }, [eh, ef, o, O, u, _, K]);
        let ej = (0, p.q)(s.i, o === c.E.LIVE && !O);
        ((0, i.useEffect)(() => {
          if (!1 === ej) return;
          let e = () => {
              eb.current?.(_, !0);
            },
            t = ey.current;
          0 !== t && Date.now() - t >= ej && e();
          let r = setInterval(e, ej);
          return () => clearInterval(r);
        }, [ej, _]),
          (0, i.useEffect)(
            () => () => {
              (eP.cancel(), ex.current && ex.current.abort());
            },
            [eP],
          ));
        let eI = (0, i.useCallback)(
            async (e) => {
              (eP.cancel(), (eg.current = !0), Q(!0));
              try {
                await eR({ searchTerm: e, useLocalFiltering: _ });
              } finally {
                (Q(!1), (eg.current = !1));
              }
            },
            [eP, eR, _],
          ),
          eD = (0, i.useCallback)((e) => eA(_, e?.background === !0), [eA, _]);
        return {
          coins: H,
          loading: Y,
          error: en,
          hasMorePages: K ? (V ?? Z >= d) : Z >= d,
          fetchCoins: eA,
          refetch: eD,
          fetchSearchCoins: eR,
          triggerSearch: eI,
          requestKey: et,
          rowsRequestKey: er,
          servedCoins: B,
          setCoins: (0, i.useCallback)((e) => {
            W(e);
          }, []),
        };
      },
    ],
    379705,
  );
};
