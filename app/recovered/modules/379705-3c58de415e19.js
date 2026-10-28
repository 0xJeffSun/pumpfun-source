// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(402030),
    l = e.i(574472),
    n = e.i(352386),
    i = e.i(536925),
    s = e.i(751275),
    a = e.i(182303);
  e.i(946129);
  var o = e.i(148269),
    u = e.i(445242),
    c = e.i(311282),
    f = e.i(986071),
    d = (((t = {}).ASC = "ASC"), (t.DESC = "DESC"), t);
  let E = "DESC",
    h = ["ASC", "DESC"];
  e.s(
    [
      "I",
      0,
      E,
      "L",
      () => d,
      "J",
      0,
      function () {
        let e,
          t,
          r = (0, u.c)(4);
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, c.b)(h).withDefault(E)), (r[0] = e))
          : (e = r[0]);
        let [l, n] = (0, c.o)(f.f.HOME.SORT_ORDER, e);
        return (
          r[1] !== l || r[2] !== n
            ? ((t = { homeSortOrder: l, setHomeSortOrder: n }),
              (r[1] = l),
              (r[2] = n),
              (r[3] = t))
            : (t = r[3]),
          t
        );
      },
    ],
    998515,
  );
  var m = e.i(85324),
    y = e.i(997887),
    p = e.i(759257),
    S = e.i(346431);
  e.i(493367).W;
  var w = e.i(541710),
    g = e.i(646908),
    k = e.i(231824),
    b = e.i(192),
    T = e.i(569124),
    C = e.i(369091),
    R = e.i(293205),
    v = e.i(930234),
    A = e.i(583448),
    D = e.i(503774),
    I = e.i(493025);
  let L = new Map(),
    N = (e, t) => {
      if (
        (L.delete(e), L.set(e, { ...t, storedAt: Date.now() }), L.size > 24)
      ) {
        let e = L.keys().next().value;
        void 0 !== e && L.delete(e);
      }
    },
    x = [],
    P = (e) => e === o.E.FEATURED || e === o.E.TRENDING || e === o.E.STOCKS;
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          {
            sort: u,
            offset: c,
            limit: f,
            includeNsfw: E,
            order: h,
            creator: O,
            isSearchMode: q = !1,
            searchTerm: M,
            searchRefetchTrigger: $,
            useUnrestrictedSearch: F = !1,
            includePerps: j = !1,
            chain: _ = "all",
            callsWindow: G = S.W,
            forceLocalFiltering: K = !1,
            initialCoins: U,
          } = e,
          H = "social-terminal" === (0, s.y)(),
          [W, B] = (0, n.useState)(() => (U && H && (0, D.$)(U), U ?? [])),
          [J, z] = (0, n.useState)(() => (U && u === o.E.TRENDING ? U : x)),
          [V, Y] = (0, n.useState)(!U),
          [Q, Z] = (0, n.useState)(null),
          [X, ee] = (0, n.useState)(() => U?.length ?? 0),
          et = JSON.stringify([
            (t = {
              sort: u ?? "",
              order: h ?? "",
              offset: c,
              limit: f,
              includeNsfw: E,
              isSearchMode: q,
              searchTerm: M ?? "",
              chain: _,
              creator: O,
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
          [er, el] = (0, n.useState)(() => (U ? et : null)),
          [en, ei] = (0, n.useState)(null),
          es = null !== en && en === et,
          ea = (0, n.useRef)(et);
        ea.current = et;
        let eo = (0, n.useRef)(er);
        eo.current = er;
        let eu = (0, n.useRef)(!!U?.length),
          ec = (0, n.useRef)(!1),
          { ipfsPrefix: ef } = (0, C.useIpfsPrefix)(),
          { address: ed, userId: eE, authReady: eh } = (0, l.F)(),
          { sessionData: em } = (0, R.useSession)(),
          ey = (0, b.d)() ?? em?.pump_session_id,
          ep = (0, w.l)(),
          eS = (0, n.useRef)(e.onSearchSettled);
        eS.current = e.onSearchSettled;
        let ew = (0, n.useRef)(0),
          eg = (0, n.useRef)(null),
          ek = (0, n.useRef)(0),
          eb = (0, n.useRef)(!1),
          eT = (0, n.useRef)(null),
          eC = (0, n.useCallback)(
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
          eR = (0, n.useCallback)(
            (e, t) =>
              e === o.E.NEWEST && t ? t : e === o.E.OLDEST ? d.ASC : d.DESC,
            [],
          ),
          ev = (0, n.useCallback)(
            ({
              offset: e,
              order: t,
              searchTerm: r,
              sort: l,
              useLocalFilterLimit: n = !1,
            }) => {
              let i = eC(l),
                s = eR(l, t),
                a = {
                  offset: e || 0,
                  limit: n ? 100 : f,
                  ...(i ? { sort: i } : {}),
                  includeNsfw: E,
                  order: s,
                };
              if (r) {
                a.searchTerm = r;
                let { deviceId: e } = (0, k.f)(ey);
                (e && (a.deviceId = e), ey && (a.sessionId = ey));
              }
              return (
                O && (a.creator = O),
                l === o.E.CHARITY && (a.isCharity = !0),
                a
              );
            },
            [f, E, O, ey, 100, eC, eR],
          ),
          eA = (0, n.useCallback)(
            async (e, t = !0, r = !1, l = !1, n, i) => {
              let s,
                a = ea.current,
                o =
                  "client" === e.kind
                    ? JSON.stringify([e.route, e.query])
                    : e.url,
                u = `${o}::${r ? `${c}:${f}` : "full"}`,
                d = l
                  ? null
                  : (s = L.get(u))
                    ? Date.now() - s.storedAt > 12e4
                      ? (L.delete(u), null)
                      : s
                    : null;
              (d
                ? (B(d.coins),
                  ee(d.unfilteredPageSize),
                  Z(d.hasNextPage),
                  el(a),
                  ei(null))
                : t && Y(!0),
                (ew.current += 1));
              let E = ew.current;
              eg.current && eg.current.abort();
              let h = new AbortController();
              eg.current = h;
              let m = h.signal,
                S = Date.now();
              try {
                let t;
                if ("board" === e.kind || "list" === e.kind) {
                  let r = await fetch(e.url, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    signal: m,
                    ...("list" === e.kind && e.cache ? { cache: e.cache } : {}),
                  });
                  if (!r.ok)
                    throw Error(`Error fetching coins: ${r.statusText}`);
                  let l = await r.json();
                  t =
                    "board" === e.kind
                      ? (0, A.$)(l)
                      : "list" === e.kind && e.parse
                        ? e.parse(l)
                        : l;
                } else {
                  let r = await (0, p.f)()(e.route, {
                    query: e.query,
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      "x-pump-source": "WEB",
                      "x-pump-platform": "web",
                    },
                    signal: m,
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
                  t = (0, y.l)(r);
                }
                let l = (0, I.f)(t, ef),
                  s = n ? n(l) : l,
                  o = E === ew.current;
                if (o) {
                  if (
                    (i?.(l.length, Date.now() - S),
                    ei(null),
                    z("board" === e.kind && "trending" === e.board ? t : x),
                    r)
                  ) {
                    let e = s.slice(c, c + f);
                    B(e);
                    let t = l.slice(c, c + f).length,
                      r = l.length > c + f;
                    (ee(t),
                      Z(r),
                      N(u, {
                        coins: e,
                        unfilteredPageSize: t,
                        hasNextPage: r,
                      }));
                  } else
                    (B(s),
                      ee(l.length),
                      Z(null),
                      N(u, {
                        coins: s,
                        unfilteredPageSize: l.length,
                        hasNextPage: null,
                      }));
                  el(a);
                }
                return o;
              } catch (t) {
                let e = H ? l && eo.current === a : l;
                return (
                  "AbortError" === t.name ||
                    E !== ew.current ||
                    e ||
                    d ||
                    (B([]), z(x), ee(0), Z(null), el(a), ei(a)),
                  !1
                );
              } finally {
                (E === ew.current && Y(!1), (eg.current = null));
              }
            },
            [ef, c, f, H],
          ),
          eD = (0, n.useCallback)(
            async ({ searchTerm: e, useLocalFiltering: t = !1 }) => {
              if (!e?.trim()) return;
              let r = u === o.E.CHARITY,
                l = {
                  ...ev({
                    searchTerm: e,
                    offset: t ? 0 : c,
                    sort: r ? o.E.MARKET_CAP : u,
                    order: h,
                    useLocalFilterLimit: t,
                  }),
                };
              r && (l.isCharity = !0);
              let n = F
                  ? {
                      kind: "client",
                      route: "GET /coins/search-unrestricted",
                      query: l,
                    }
                  : {
                      kind: "client",
                      route: "GET /coins/search-v2",
                      query: j ? { ...l, includePerps: !0 } : l,
                    },
                i = t || 0 === c,
                s = e.trim();
              await eA(
                n,
                !1,
                t,
                !1,
                (e) =>
                  e.filter(
                    (e) => (0, v.f)(e) && ((0, w.M)(ep) || !(0, g.a)(e)),
                  ),
                (e, t) => {
                  i &&
                    eS.current?.({
                      searchTerm: s,
                      resultCount: e,
                      timeToLoadMs: t,
                    });
                },
              );
            },
            [ev, c, u, h, eA, F, j, ep],
          ),
          eI = (0, n.useCallback)(
            async (e = !1, t = !1) => {
              var l, n;
              let i,
                s,
                a,
                d = ({ board: e, chain: t }) => ({
                  kind: "board",
                  board: e,
                  url: (0, A.f)({
                    limit: 300,
                    userId: ed || void 0,
                    pumpUserId: eE || void 0,
                    ...(0, k.f)(ey || void 0),
                    chain: t,
                    exposure: ep,
                    board: e,
                  }),
                }),
                m = {};
              switch (
                (u !== o.E.FEATURED &&
                  (m = ev({
                    sort: u,
                    offset: e ? 0 : c,
                    order: h,
                    includeNsfw: E,
                    useLocalFilterLimit: e,
                  })),
                u)
              ) {
                case o.E.CHARITY:
                  i = {
                    kind: "client",
                    route: "GET /coins/search-unrestricted",
                    query: m,
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
                            limit: e ? 100 : f,
                            includeNsfw: E,
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
                      ((a = new URLSearchParams({
                        offset: String(
                          (n = { offset: e ? 0 : c, limit: e ? 100 : f })
                            .offset,
                        ),
                        limit: String(n.limit),
                      })),
                      `/api/explore/majors?${a.toString()}`),
                  };
                  break;
                case o.E.STOCKS:
                  i = { kind: "list", url: (0, T.m)(!!ed), parse: T.K };
                  break;
                case o.E.LIVE:
                  ((ek.current = Date.now()),
                    (i = {
                      kind: "client",
                      route: "GET /coins/currently-live",
                      query: {
                        limit: e ? 100 : f,
                        offset: e ? 0 : c,
                        includeNsfw: E,
                      },
                    }));
                  break;
                case o.E.CALLS:
                  i = {
                    kind: "list",
                    url: (0, S.x)({
                      window: G,
                      offset: e ? 0 : c,
                      limit: e ? 100 : f,
                      includeNsfw: E,
                    }),
                    cache: "no-store",
                  };
                  break;
                case o.E.FEATURED:
                  i = d({ board: "movers", chain: _ });
                  break;
                case o.E.TRENDING:
                  i = d({ board: "trending" });
                  break;
                default:
                  i = {
                    kind: "client",
                    route: "GET /coins",
                    query: r.contract["GET /coins"].query.parse(m),
                  };
              }
              return eA(i, !t, P(u) ? !e : e, t);
            },
            [u, h, c, f, E, ev, eA, 100, _, G, ep, ed, eE, ey],
          );
        eT.current = eI;
        let eL = (0, n.useCallback)(
          (0, i.t)(async (e) => {
            try {
              (Y(!0), await eD(e));
            } catch (e) {
              console.error("Error during debounced search:", e);
            } finally {
              Y(!1);
            }
          }, 1e3),
          [eD],
        );
        ((0, n.useEffect)(
          () => (
            q &&
              M?.trim() &&
              !eb.current &&
              (Y(!0), eL({ searchTerm: M, useLocalFiltering: K })),
            () => {
              eL.cancel();
            }
          ),
          [q, M, $, eL, K],
        ),
          (0, n.useEffect)(() => {
            let e = eT.current;
            !e || (ei(null), (!P(u) || 0 !== c || ec.current) && (q || e(K)));
          }, [q, u, h, c, f, E, _, G, ep, K]));
        let eN = (0, n.useRef)(void 0);
        (0, n.useEffect)(() => {
          if (!P(u) || q || 0 !== c || !eh || (ec.current && ed === eN.current))
            return;
          let e = ec.current || eu.current;
          if (((ec.current = !0), H)) {
            ((eN.current = ed), eT.current?.(K, e));
            return;
          }
          eT.current?.(K, e).then((e) => {
            e && (eN.current = ed);
          });
        }, [eh, ed, u, q, c, K, H]);
        let ex = (0, m.q)(a.i, u === o.E.LIVE && !q);
        ((0, n.useEffect)(() => {
          if (!1 === ex) return;
          let e = () => {
              eT.current?.(K, !0);
            },
            t = ek.current;
          0 !== t && Date.now() - t >= ex && e();
          let r = setInterval(e, ex);
          return () => clearInterval(r);
        }, [ex, K]),
          (0, n.useEffect)(
            () => () => {
              (eL.cancel(), eg.current && eg.current.abort());
            },
            [eL],
          ));
        let eP = (0, n.useCallback)(
            async (e) => {
              (eL.cancel(), (eb.current = !0), Y(!0));
              try {
                await eD({ searchTerm: e, useLocalFiltering: K });
              } finally {
                (Y(!1), (eb.current = !1));
              }
            },
            [eL, eD, K],
          ),
          eO = (0, n.useCallback)((e) => eI(K, e?.background === !0), [eI, K]);
        return {
          coins: W,
          loading: V,
          error: es,
          hasMorePages: H ? (Q ?? X >= f) : X >= f,
          fetchCoins: eI,
          refetch: eO,
          fetchSearchCoins: eD,
          triggerSearch: eP,
          requestKey: et,
          rowsRequestKey: er,
          servedCoins: J,
          setCoins: (0, n.useCallback)((e) => {
            B(e);
          }, []),
        };
      },
    ],
    379705,
  );
};
