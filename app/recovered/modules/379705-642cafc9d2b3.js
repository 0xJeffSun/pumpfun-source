// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(402030),
    n = e.i(574472),
    l = e.i(352386),
    i = e.i(536925),
    u = e.i(751275),
    a = e.i(182303);
  e.i(946129);
  var s = e.i(148269),
    o = e.i(445242),
    c = e.i(311282),
    f = e.i(986071),
    d = (((t = {}).ASC = "ASC"), (t.DESC = "DESC"), t);
  let h = "DESC",
    E = ["ASC", "DESC"];
  e.s(
    [
      "I",
      0,
      h,
      "L",
      () => d,
      "J",
      0,
      function () {
        let e,
          t,
          r = (0, o.c)(4);
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, c.b)(E).withDefault(h)), (r[0] = e))
          : (e = r[0]);
        let [n, l] = (0, c.o)(f.f.HOME.SORT_ORDER, e);
        return (
          r[1] !== n || r[2] !== l
            ? ((t = { homeSortOrder: n, setHomeSortOrder: l }),
              (r[1] = n),
              (r[2] = l),
              (r[3] = t))
            : (t = r[3]),
          t
        );
      },
    ],
    998515,
  );
  var y = e.i(85324),
    m = e.i(997887),
    g = e.i(759257),
    S = e.i(346431);
  e.i(493367).W;
  var p = e.i(541710),
    w = e.i(646908),
    k = e.i(231824),
    b = e.i(192),
    T = e.i(569124),
    v = e.i(369091),
    C = e.i(293205),
    A = e.i(930234),
    R = e.i(583448),
    I = e.i(503774),
    O = e.i(493025);
  let M = new Map(),
    L = (e, t) => {
      if (
        (M.delete(e), M.set(e, { ...t, storedAt: Date.now() }), M.size > 24)
      ) {
        let e = M.keys().next().value;
        void 0 !== e && M.delete(e);
      }
    },
    N = [],
    j = (e) => e === s.E.FEATURED || e === s.E.TRENDING || e === s.E.STOCKS;
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          {
            sort: o,
            offset: c,
            limit: f,
            includeNsfw: h,
            order: E,
            creator: D,
            isSearchMode: P = !1,
            searchTerm: _,
            searchRefetchTrigger: x,
            useUnrestrictedSearch: q = !1,
            includePerps: F = !1,
            chain: K = "all",
            callsWindow: U = S.W,
            forceLocalFiltering: $ = !1,
            initialCoins: H,
          } = e,
          Q = "social-terminal" === (0, u.y)(),
          [Y, B] = (0, l.useState)(() => (H && Q && (0, I.$)(H), H ?? [])),
          [G, V] = (0, l.useState)(() => (H && o === s.E.TRENDING ? H : N)),
          [W, J] = (0, l.useState)(!H),
          [Z, z] = (0, l.useState)(null),
          [X, ee] = (0, l.useState)(() => H?.length ?? 0),
          et = JSON.stringify([
            (t = {
              sort: o ?? "",
              order: E ?? "",
              offset: c,
              limit: f,
              includeNsfw: h,
              isSearchMode: P,
              searchTerm: _ ?? "",
              chain: K,
              creator: D,
              callsWindow: U,
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
          [er, en] = (0, l.useState)(() => (H ? et : null)),
          [el, ei] = (0, l.useState)(null),
          eu = null !== el && el === et,
          ea = (0, l.useRef)(et);
        ea.current = et;
        let es = (0, l.useRef)(er);
        es.current = er;
        let eo = (0, l.useRef)(!!H?.length),
          ec = (0, l.useRef)(!1),
          { ipfsPrefix: ef } = (0, v.useIpfsPrefix)(),
          { address: ed, userId: eh, authReady: eE } = (0, n.F)(),
          { sessionData: ey } = (0, C.useSession)(),
          em = (0, b.d)() ?? ey?.pump_session_id,
          eg = (0, p.l)(),
          eS = (0, l.useRef)(e.onSearchSettled);
        eS.current = e.onSearchSettled;
        let ep = (0, l.useRef)(0),
          ew = (0, l.useRef)(null),
          ek = (0, l.useRef)(0),
          eb = (0, l.useRef)(!1),
          eT = (0, l.useRef)(null),
          ev = (0, l.useCallback)(
            (e) =>
              e
                ? e === s.E.FEATURED ||
                  e === s.E.CHARITY ||
                  e === s.E.CUSTOM_PAIRS ||
                  e === s.E.LIVE ||
                  e === s.E.CALLS ||
                  e === s.E.TRENDING ||
                  e === s.E.STOCKS ||
                  e === s.E.MAJORS
                  ? s.E.MARKET_CAP
                  : e === s.E.OLDEST
                    ? s.E.NEWEST
                    : e
                : e,
            [],
          ),
          eC = (0, l.useCallback)(
            (e, t) =>
              e === s.E.NEWEST && t ? t : e === s.E.OLDEST ? d.ASC : d.DESC,
            [],
          ),
          eA = (0, l.useCallback)(
            ({
              offset: e,
              order: t,
              searchTerm: r,
              sort: n,
              useLocalFilterLimit: l = !1,
            }) => {
              let i = ev(n),
                u = eC(n, t),
                a = {
                  offset: e || 0,
                  limit: l ? 100 : f,
                  ...(i ? { sort: i } : {}),
                  includeNsfw: h,
                  order: u,
                };
              if (r) {
                a.searchTerm = r;
                let { deviceId: e } = (0, k.f)(em);
                (e && (a.deviceId = e), em && (a.sessionId = em));
              }
              return (
                D && (a.creator = D),
                n === s.E.CHARITY && (a.isCharity = !0),
                a
              );
            },
            [f, h, D, em, 100, ev, eC],
          ),
          eR = (0, l.useCallback)(
            async (e, t = !0, r = !1, n = !1, l, i) => {
              let u,
                a = ea.current,
                s =
                  "client" === e.kind
                    ? JSON.stringify([e.route, e.query])
                    : e.url,
                o = `${s}::${r ? `${c}:${f}` : "full"}`,
                d = n
                  ? null
                  : (u = M.get(o))
                    ? Date.now() - u.storedAt > 12e4
                      ? (M.delete(o), null)
                      : u
                    : null;
              (d
                ? (B(d.coins),
                  ee(d.unfilteredPageSize),
                  z(d.hasNextPage),
                  en(a),
                  ei(null))
                : t && J(!0),
                (ep.current += 1));
              let h = ep.current;
              ew.current && ew.current.abort();
              let E = new AbortController();
              ew.current = E;
              let y = E.signal,
                S = Date.now();
              try {
                let t;
                if ("board" === e.kind || "list" === e.kind) {
                  let r = await fetch(e.url, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    signal: y,
                    ...("list" === e.kind && e.cache ? { cache: e.cache } : {}),
                  });
                  if (!r.ok)
                    throw Error(`Error fetching coins: ${r.statusText}`);
                  let n = await r.json();
                  t =
                    "board" === e.kind
                      ? (0, R.$)(n)
                      : "list" === e.kind && e.parse
                        ? e.parse(n)
                        : n;
                } else {
                  let r = await (0, g.f)()(e.route, {
                    query: e.query,
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      "x-pump-source": "WEB",
                      "x-pump-platform": "web",
                    },
                    signal: y,
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
                  t = (0, m.l)(r);
                }
                let n = (0, O.f)(t, ef),
                  u = l ? l(n) : n,
                  s = h === ep.current;
                if (s) {
                  if (
                    (i?.(n.length, Date.now() - S),
                    ei(null),
                    V("board" === e.kind && "trending" === e.board ? t : N),
                    r)
                  ) {
                    let e = u.slice(c, c + f);
                    B(e);
                    let t = n.slice(c, c + f).length,
                      r = n.length > c + f;
                    (ee(t),
                      z(r),
                      L(o, {
                        coins: e,
                        unfilteredPageSize: t,
                        hasNextPage: r,
                      }));
                  } else
                    (B(u),
                      ee(n.length),
                      z(null),
                      L(o, {
                        coins: u,
                        unfilteredPageSize: n.length,
                        hasNextPage: null,
                      }));
                  en(a);
                }
                return s;
              } catch (t) {
                let e = Q ? n && es.current === a : n;
                return (
                  "AbortError" === t.name ||
                    h !== ep.current ||
                    e ||
                    d ||
                    (B([]), V(N), ee(0), z(null), en(a), ei(a)),
                  !1
                );
              } finally {
                (h === ep.current && J(!1), (ew.current = null));
              }
            },
            [ef, c, f, Q],
          ),
          eI = (0, l.useCallback)(
            async ({ searchTerm: e, useLocalFiltering: t = !1 }) => {
              if (!e?.trim()) return;
              let r = o === s.E.CHARITY,
                n = {
                  ...eA({
                    searchTerm: e,
                    offset: t ? 0 : c,
                    sort: r ? s.E.MARKET_CAP : o,
                    order: E,
                    useLocalFilterLimit: t,
                  }),
                };
              r && (n.isCharity = !0);
              let l = q
                  ? {
                      kind: "client",
                      route: "GET /coins/search-unrestricted",
                      query: n,
                    }
                  : {
                      kind: "client",
                      route: "GET /coins/search-v2",
                      query: F ? { ...n, includePerps: !0 } : n,
                    },
                i = t || 0 === c,
                u = e.trim();
              await eR(
                l,
                !1,
                t,
                !1,
                (e) =>
                  e.filter(
                    (e) => (0, A.f)(e) && ((0, p.M)(eg) || !(0, w.a)(e)),
                  ),
                (e, t) => {
                  i &&
                    eS.current?.({
                      searchTerm: u,
                      resultCount: e,
                      timeToLoadMs: t,
                    });
                },
              );
            },
            [eA, c, o, E, eR, q, F, eg],
          ),
          eO = (0, l.useCallback)(
            async (e = !1, t = !1) => {
              var n, l;
              let i,
                u,
                a,
                d = ({ board: e, chain: t }) => ({
                  kind: "board",
                  board: e,
                  url: (0, R.f)({
                    limit: 300,
                    userId: ed || void 0,
                    pumpUserId: eh || void 0,
                    ...(0, k.f)(em || void 0),
                    chain: t,
                    exposure: eg,
                    board: e,
                  }),
                }),
                y = {};
              switch (
                (o !== s.E.FEATURED &&
                  (y = eA({
                    sort: o,
                    offset: e ? 0 : c,
                    order: E,
                    includeNsfw: h,
                    useLocalFilterLimit: e,
                  })),
                o)
              ) {
                case s.E.CHARITY:
                  i = {
                    kind: "client",
                    route: "GET /coins/search-unrestricted",
                    query: y,
                  };
                  break;
                case s.E.CUSTOM_PAIRS:
                  i = {
                    kind: "list",
                    url:
                      ((u = new URLSearchParams({
                        offset: String(
                          (n = {
                            offset: e ? 0 : c,
                            limit: e ? 100 : f,
                            includeNsfw: h,
                          }).offset,
                        ),
                        limit: String(n.limit),
                        includeNsfw: String(n.includeNsfw),
                      })),
                      `/api/explore/custom-pairs?${u.toString()}`),
                  };
                  break;
                case s.E.MAJORS:
                  i = {
                    kind: "list",
                    url:
                      ((a = new URLSearchParams({
                        offset: String(
                          (l = { offset: e ? 0 : c, limit: e ? 100 : f })
                            .offset,
                        ),
                        limit: String(l.limit),
                      })),
                      `/api/explore/majors?${a.toString()}`),
                  };
                  break;
                case s.E.STOCKS:
                  i = { kind: "list", url: (0, T.m)(!!ed), parse: T.K };
                  break;
                case s.E.LIVE:
                  ((ek.current = Date.now()),
                    (i = {
                      kind: "client",
                      route: "GET /coins/currently-live",
                      query: {
                        limit: e ? 100 : f,
                        offset: e ? 0 : c,
                        includeNsfw: h,
                      },
                    }));
                  break;
                case s.E.CALLS:
                  i = {
                    kind: "list",
                    url: (0, S.x)({
                      window: U,
                      offset: e ? 0 : c,
                      limit: e ? 100 : f,
                      includeNsfw: h,
                    }),
                    cache: "no-store",
                  };
                  break;
                case s.E.FEATURED:
                  i = d({ board: "movers", chain: K });
                  break;
                case s.E.TRENDING:
                  i = d({ board: "trending" });
                  break;
                default:
                  i = {
                    kind: "client",
                    route: "GET /coins",
                    query: r.contract["GET /coins"].query.parse(y),
                  };
              }
              return eR(i, !t, j(o) ? !e : e, t);
            },
            [o, E, c, f, h, eA, eR, 100, K, U, eg, ed, eh, em],
          );
        eT.current = eO;
        let eM = (0, l.useCallback)(
          (0, i.t)(async (e) => {
            try {
              (J(!0), await eI(e));
            } catch (e) {
              console.error("Error during debounced search:", e);
            } finally {
              J(!1);
            }
          }, 1e3),
          [eI],
        );
        ((0, l.useEffect)(
          () => (
            P &&
              _?.trim() &&
              !eb.current &&
              (J(!0), eM({ searchTerm: _, useLocalFiltering: $ })),
            () => {
              eM.cancel();
            }
          ),
          [P, _, x, eM, $],
        ),
          (0, l.useEffect)(() => {
            let e = eT.current;
            !e || (ei(null), (!j(o) || 0 !== c || ec.current) && (P || e($)));
          }, [P, o, E, c, f, h, K, U, eg, $]));
        let eL = (0, l.useRef)(void 0);
        (0, l.useEffect)(() => {
          if (!j(o) || P || 0 !== c || !eE || (ec.current && ed === eL.current))
            return;
          let e = ec.current || eo.current;
          if (((ec.current = !0), Q)) {
            ((eL.current = ed), eT.current?.($, e));
            return;
          }
          eT.current?.($, e).then((e) => {
            e && (eL.current = ed);
          });
        }, [eE, ed, o, P, c, $, Q]);
        let eN = (0, y.q)(a.i, o === s.E.LIVE && !P);
        ((0, l.useEffect)(() => {
          if (!1 === eN) return;
          let e = () => {
              eT.current?.($, !0);
            },
            t = ek.current;
          0 !== t && Date.now() - t >= eN && e();
          let r = setInterval(e, eN);
          return () => clearInterval(r);
        }, [eN, $]),
          (0, l.useEffect)(
            () => () => {
              (eM.cancel(), ew.current && ew.current.abort());
            },
            [eM],
          ));
        let ej = (0, l.useCallback)(
            async (e) => {
              (eM.cancel(), (eb.current = !0), J(!0));
              try {
                await eI({ searchTerm: e, useLocalFiltering: $ });
              } finally {
                (J(!1), (eb.current = !1));
              }
            },
            [eM, eI, $],
          ),
          eD = (0, l.useCallback)((e) => eO($, e?.background === !0), [eO, $]);
        return {
          coins: Y,
          loading: W,
          error: eu,
          hasMorePages: Q ? (Z ?? X >= f) : X >= f,
          fetchCoins: eO,
          refetch: eD,
          fetchSearchCoins: eI,
          triggerSearch: ej,
          requestKey: et,
          rowsRequestKey: er,
          servedCoins: G,
          setCoins: (0, l.useCallback)((e) => {
            B(e);
          }, []),
        };
      },
    ],
    379705,
  );
};
