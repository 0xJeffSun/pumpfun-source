// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(402030),
    l = e.i(574472),
    a = e.i(352386),
    i = e.i(536925),
    s = e.i(751275),
    n = e.i(182303);
  e.i(946129);
  var o = e.i(148269),
    u = e.i(445242),
    c = e.i(311282),
    d = e.i(986071),
    m = (((t = {}).ASC = "ASC"), (t.DESC = "DESC"), t);
  let f = "DESC",
    p = ["ASC", "DESC"];
  e.s(
    [
      "I",
      0,
      f,
      "L",
      () => m,
      "J",
      0,
      function () {
        let e,
          t,
          r = (0, u.c)(4);
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, c.b)(p).withDefault(f)), (r[0] = e))
          : (e = r[0]);
        let [l, a] = (0, c.o)(d.f.HOME.SORT_ORDER, e);
        return (
          r[1] !== l || r[2] !== a
            ? ((t = { homeSortOrder: l, setHomeSortOrder: a }),
              (r[1] = l),
              (r[2] = a),
              (r[3] = t))
            : (t = r[3]),
          t
        );
      },
    ],
    998515,
  );
  var h = e.i(85324),
    g = e.i(997887),
    x = e.i(759257),
    b = e.i(346431);
  e.i(493367).W;
  var w = e.i(541710),
    y = e.i(646908),
    v = e.i(231824),
    E = e.i(192),
    k = e.i(569124),
    C = e.i(369091),
    S = e.i(293205),
    I = e.i(930234),
    N = e.i(583448),
    T = e.i(503774),
    A = e.i(493025);
  let j = new Map(),
    P = (e, t) => {
      if (
        (j.delete(e), j.set(e, { ...t, storedAt: Date.now() }), j.size > 24)
      ) {
        let e = j.keys().next().value;
        void 0 !== e && j.delete(e);
      }
    },
    _ = [],
    U = (e) => e === o.E.FEATURED || e === o.E.TRENDING || e === o.E.STOCKS;
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          {
            sort: u,
            offset: c,
            limit: d,
            includeNsfw: f,
            order: p,
            creator: M,
            isSearchMode: D = !1,
            searchTerm: R,
            searchRefetchTrigger: q,
            useUnrestrictedSearch: L = !1,
            includePerps: F = !1,
            chain: G = "all",
            callsWindow: B = b.W,
            forceLocalFiltering: O = !1,
            initialCoins: z,
          } = e,
          $ = "social-terminal" === (0, s.y)(),
          [V, Q] = (0, a.useState)(() => (z && $ && (0, T.$)(z), z ?? [])),
          [H, K] = (0, a.useState)(() => (z && u === o.E.TRENDING ? z : _)),
          [W, J] = (0, a.useState)(!z),
          [Y, Z] = (0, a.useState)(null),
          [X, ee] = (0, a.useState)(() => z?.length ?? 0),
          et = JSON.stringify([
            (t = {
              sort: u ?? "",
              order: p ?? "",
              offset: c,
              limit: d,
              includeNsfw: f,
              isSearchMode: D,
              searchTerm: R ?? "",
              chain: G,
              creator: M,
              callsWindow: B,
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
          [er, el] = (0, a.useState)(() => (z ? et : null)),
          [ea, ei] = (0, a.useState)(null),
          es = null !== ea && ea === et,
          en = (0, a.useRef)(et);
        en.current = et;
        let eo = (0, a.useRef)(er);
        eo.current = er;
        let eu = (0, a.useRef)(!!z?.length),
          ec = (0, a.useRef)(!1),
          { ipfsPrefix: ed } = (0, C.useIpfsPrefix)(),
          { address: em, userId: ef, authReady: ep } = (0, l.F)(),
          { sessionData: eh } = (0, S.useSession)(),
          eg = (0, E.d)() ?? eh?.pump_session_id,
          ex = (0, w.l)(),
          eb = (0, a.useRef)(e.onSearchSettled);
        eb.current = e.onSearchSettled;
        let ew = (0, a.useRef)(0),
          ey = (0, a.useRef)(null),
          ev = (0, a.useRef)(0),
          eE = (0, a.useRef)(!1),
          ek = (0, a.useRef)(null),
          eC = (0, a.useCallback)(
            (e) =>
              e
                ? e === o.E.FEATURED ||
                  e === o.E.CHARITY ||
                  e === o.E.CUSTOM_PAIRS ||
                  e === o.E.LIVE ||
                  e === o.E.CALLS ||
                  e === o.E.TRENDING ||
                  e === o.E.STOCKS ||
                  e === o.E.MAJORS
                  ? o.E.MARKET_CAP
                  : e === o.E.OLDEST
                    ? o.E.NEWEST
                    : e
                : e,
            [],
          ),
          eS = (0, a.useCallback)(
            (e, t) =>
              e === o.E.NEWEST && t ? t : e === o.E.OLDEST ? m.ASC : m.DESC,
            [],
          ),
          eI = (0, a.useCallback)(
            ({
              offset: e,
              order: t,
              searchTerm: r,
              sort: l,
              useLocalFilterLimit: a = !1,
            }) => {
              let i = eC(l),
                s = eS(l, t),
                n = {
                  offset: e || 0,
                  limit: a ? 100 : d,
                  ...(i ? { sort: i } : {}),
                  includeNsfw: f,
                  order: s,
                };
              if (r) {
                n.searchTerm = r;
                let { deviceId: e } = (0, v.f)(eg);
                (e && (n.deviceId = e), eg && (n.sessionId = eg));
              }
              return (
                M && (n.creator = M),
                l === o.E.CHARITY && (n.isCharity = !0),
                n
              );
            },
            [d, f, M, eg, 100, eC, eS],
          ),
          eN = (0, a.useCallback)(
            async (e, t = !0, r = !1, l = !1, a, i) => {
              let s,
                n = en.current,
                o =
                  "client" === e.kind
                    ? JSON.stringify([e.route, e.query])
                    : e.url,
                u = `${o}::${r ? `${c}:${d}` : "full"}`,
                m = l
                  ? null
                  : (s = j.get(u))
                    ? Date.now() - s.storedAt > 12e4
                      ? (j.delete(u), null)
                      : s
                    : null;
              (m
                ? (Q(m.coins),
                  ee(m.unfilteredPageSize),
                  Z(m.hasNextPage),
                  el(n),
                  ei(null))
                : t && J(!0),
                (ew.current += 1));
              let f = ew.current;
              ey.current && ey.current.abort();
              let p = new AbortController();
              ey.current = p;
              let h = p.signal,
                b = Date.now();
              try {
                let t;
                if ("board" === e.kind || "list" === e.kind) {
                  let r = await fetch(e.url, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    signal: h,
                    ...("list" === e.kind && e.cache ? { cache: e.cache } : {}),
                  });
                  if (!r.ok)
                    throw Error(`Error fetching coins: ${r.statusText}`);
                  let l = await r.json();
                  t =
                    "board" === e.kind
                      ? (0, N.$)(l)
                      : "list" === e.kind && e.parse
                        ? e.parse(l)
                        : l;
                } else {
                  let r = await (0, x.f)()(e.route, {
                    query: e.query,
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      "x-pump-source": "WEB",
                      "x-pump-platform": "web",
                    },
                    signal: h,
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
                  t = (0, g.l)(r);
                }
                let l = (0, A.f)(t, ed),
                  s = a ? a(l) : l,
                  o = f === ew.current;
                if (o) {
                  if (
                    (i?.(l.length, Date.now() - b),
                    ei(null),
                    K("board" === e.kind && "trending" === e.board ? t : _),
                    r)
                  ) {
                    let e = s.slice(c, c + d);
                    Q(e);
                    let t = l.slice(c, c + d).length,
                      r = l.length > c + d;
                    (ee(t),
                      Z(r),
                      P(u, {
                        coins: e,
                        unfilteredPageSize: t,
                        hasNextPage: r,
                      }));
                  } else
                    (Q(s),
                      ee(l.length),
                      Z(null),
                      P(u, {
                        coins: s,
                        unfilteredPageSize: l.length,
                        hasNextPage: null,
                      }));
                  el(n);
                }
                return o;
              } catch (t) {
                let e = $ ? l && eo.current === n : l;
                return (
                  "AbortError" === t.name ||
                    f !== ew.current ||
                    e ||
                    m ||
                    (Q([]), K(_), ee(0), Z(null), el(n), ei(n)),
                  !1
                );
              } finally {
                (f === ew.current && J(!1), (ey.current = null));
              }
            },
            [ed, c, d, $],
          ),
          eT = (0, a.useCallback)(
            async ({ searchTerm: e, useLocalFiltering: t = !1 }) => {
              if (!e?.trim()) return;
              let r = u === o.E.CHARITY,
                l = {
                  ...eI({
                    searchTerm: e,
                    offset: t ? 0 : c,
                    sort: r ? o.E.MARKET_CAP : u,
                    order: p,
                    useLocalFilterLimit: t,
                  }),
                };
              r && (l.isCharity = !0);
              let a = L
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
                i = t || 0 === c,
                s = e.trim();
              await eN(
                a,
                !1,
                t,
                !1,
                (e) =>
                  e.filter(
                    (e) => (0, I.f)(e) && ((0, w.M)(ex) || !(0, y.a)(e)),
                  ),
                (e, t) => {
                  i &&
                    eb.current?.({
                      searchTerm: s,
                      resultCount: e,
                      timeToLoadMs: t,
                    });
                },
              );
            },
            [eI, c, u, p, eN, L, F, ex],
          ),
          eA = (0, a.useCallback)(
            async (e = !1, t = !1) => {
              var l, a;
              let i,
                s,
                n,
                m = ({ board: e, chain: t }) => ({
                  kind: "board",
                  board: e,
                  url: (0, N.f)({
                    limit: 300,
                    userId: em || void 0,
                    pumpUserId: ef || void 0,
                    ...(0, v.f)(eg || void 0),
                    chain: t,
                    exposure: ex,
                    board: e,
                  }),
                }),
                h = {};
              switch (
                (u !== o.E.FEATURED &&
                  (h = eI({
                    sort: u,
                    offset: e ? 0 : c,
                    order: p,
                    includeNsfw: f,
                    useLocalFilterLimit: e,
                  })),
                u)
              ) {
                case o.E.CHARITY:
                  i = {
                    kind: "client",
                    route: "GET /coins/search-unrestricted",
                    query: h,
                  };
                  break;
                case o.E.CUSTOM_PAIRS:
                  i = {
                    kind: "list",
                    url:
                      ((s = new URLSearchParams({
                        offset: String(
                          (l = {
                            offset: e ? 0 : c,
                            limit: e ? 100 : d,
                            includeNsfw: f,
                          }).offset,
                        ),
                        limit: String(l.limit),
                        includeNsfw: String(l.includeNsfw),
                      })),
                      `/api/explore/custom-pairs?${s.toString()}`),
                  };
                  break;
                case o.E.MAJORS:
                  i = {
                    kind: "list",
                    url:
                      ((n = new URLSearchParams({
                        offset: String(
                          (a = { offset: e ? 0 : c, limit: e ? 100 : d })
                            .offset,
                        ),
                        limit: String(a.limit),
                      })),
                      `/api/explore/majors?${n.toString()}`),
                  };
                  break;
                case o.E.STOCKS:
                  i = { kind: "list", url: (0, k.m)(!!em), parse: k.K };
                  break;
                case o.E.LIVE:
                  ((ev.current = Date.now()),
                    (i = {
                      kind: "client",
                      route: "GET /coins/currently-live",
                      query: {
                        limit: e ? 100 : d,
                        offset: e ? 0 : c,
                        includeNsfw: f,
                      },
                    }));
                  break;
                case o.E.CALLS:
                  i = {
                    kind: "list",
                    url: (0, b.x)({
                      window: B,
                      offset: e ? 0 : c,
                      limit: e ? 100 : d,
                      includeNsfw: f,
                    }),
                    cache: "no-store",
                  };
                  break;
                case o.E.FEATURED:
                  i = m({ board: "movers", chain: G });
                  break;
                case o.E.TRENDING:
                  i = m({ board: "trending" });
                  break;
                default:
                  i = {
                    kind: "client",
                    route: "GET /coins",
                    query: r.contract["GET /coins"].query.parse(h),
                  };
              }
              return eN(i, !t, U(u) ? !e : e, t);
            },
            [u, p, c, d, f, eI, eN, 100, G, B, ex, em, ef, eg],
          );
        ek.current = eA;
        let ej = (0, a.useCallback)(
          (0, i.t)(async (e) => {
            try {
              (J(!0), await eT(e));
            } catch (e) {
              console.error("Error during debounced search:", e);
            } finally {
              J(!1);
            }
          }, 1e3),
          [eT],
        );
        ((0, a.useEffect)(
          () => (
            D &&
              R?.trim() &&
              !eE.current &&
              (J(!0), ej({ searchTerm: R, useLocalFiltering: O })),
            () => {
              ej.cancel();
            }
          ),
          [D, R, q, ej, O],
        ),
          (0, a.useEffect)(() => {
            let e = ek.current;
            !e || (ei(null), (!U(u) || 0 !== c || ec.current) && (D || e(O)));
          }, [D, u, p, c, d, f, G, B, ex, O]));
        let eP = (0, a.useRef)(void 0);
        (0, a.useEffect)(() => {
          if (!U(u) || D || 0 !== c || !ep || (ec.current && em === eP.current))
            return;
          let e = ec.current || eu.current;
          if (((ec.current = !0), $)) {
            ((eP.current = em), ek.current?.(O, e));
            return;
          }
          ek.current?.(O, e).then((e) => {
            e && (eP.current = em);
          });
        }, [ep, em, u, D, c, O, $]);
        let e_ = (0, h.q)(n.i, u === o.E.LIVE && !D);
        ((0, a.useEffect)(() => {
          if (!1 === e_) return;
          let e = () => {
              ek.current?.(O, !0);
            },
            t = ev.current;
          0 !== t && Date.now() - t >= e_ && e();
          let r = setInterval(e, e_);
          return () => clearInterval(r);
        }, [e_, O]),
          (0, a.useEffect)(
            () => () => {
              (ej.cancel(), ey.current && ey.current.abort());
            },
            [ej],
          ));
        let eU = (0, a.useCallback)(
            async (e) => {
              (ej.cancel(), (eE.current = !0), J(!0));
              try {
                await eT({ searchTerm: e, useLocalFiltering: O });
              } finally {
                (J(!1), (eE.current = !1));
              }
            },
            [ej, eT, O],
          ),
          eM = (0, a.useCallback)((e) => eA(O, e?.background === !0), [eA, O]);
        return {
          coins: V,
          loading: W,
          error: es,
          hasMorePages: $ ? (Y ?? X >= d) : X >= d,
          fetchCoins: eA,
          refetch: eM,
          fetchSearchCoins: eT,
          triggerSearch: eU,
          requestKey: et,
          rowsRequestKey: er,
          servedCoins: H,
          setCoins: (0, a.useCallback)((e) => {
            Q(e);
          }, []),
        };
      },
    ],
    379705,
  );
};
