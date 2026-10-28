// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, l;
  var n = e.i(402030),
    i = e.i(322315),
    a = e.i(254010),
    r = e.i(690877),
    s = e.i(352386),
    o = e.i(445242);
  let d = (e) => {
      try {
        return BigInt(e.balance?.raw || "0");
      } catch {
        return BigInt(0);
      }
    },
    u = (e, t) => {
      let l = d(t) - d(e);
      return l !== BigInt(0)
        ? l > BigInt(0)
          ? 1
          : -1
        : e.address < t.address
          ? -1
          : +(e.address > t.address);
    },
    c = () => () => {},
    m = () => void 0;
  function f(e) {
    return [e.address, e];
  }
  var p = e.i(759257),
    h = e.i(541710),
    g = e.i(646908),
    x = e.i(639374);
  let b = { topHolders: [], totalHolders: void 0 };
  e.s(
    [
      "f",
      0,
      function (d) {
        var y, w;
        let { enabled: v = !0, mint: _, chain: I } = d,
          N = (0, g.L)(I),
          j = (0, h.l)(),
          k = (0, g.B)(I) && (0, h.M)(j),
          M = (0, g._)(I) && (0, h.k)(j),
          C = N ? g.J : k ? g.d : M ? g.W : void 0,
          U = v && !!_ && ((0, x.f)(_) || N || k || M),
          S = (0, a.k)(i.D.UAPI_STREAM_HOLDERS) && U && !N && !M,
          P = (0, s.useRef)(!1),
          A = (0, r.useQuery)({
            enabled: U,
            gcTime: 12e4,
            queryFn: async ({ signal: e }) => {
              if (!C)
                return (0, p.j)()("GET /coins/top-holders-v2/{mint}", {
                  params: { mint: _ },
                  signal: e,
                });
              try {
                return await (0, p.j)()("GET /coins/top-holders-v2/{mint}", {
                  params: { mint: _ },
                  query: { chain: C },
                  signal: e,
                });
              } catch (e) {
                if (
                  (N &&
                    (0, n.isContractError)(e) &&
                    (503 === e.status || 400 === e.status)) ||
                  ((M || k) && (0, n.isContractError)(e) && 400 === e.status)
                )
                  return b;
                throw e;
              }
            },
            queryKey:
              ((y = _), (w = C) ? ["top-holders", y, w] : ["top-holders", y]),
            refetchInterval: S ? () => !P.current && 6e4 : 6e4,
            staleTime: 6e4,
          }),
          F = A.data,
          T = (function (n) {
            let r,
              d,
              p,
              h = (0, o.c)(15),
              { chain: g, enabled: x, mint: b, restRows: y } = n,
              w = void 0 === x || x,
              v = (0, a.k)(i.D.UAPI_STREAM_HOLDERS),
              _ = "object" == typeof g ? g.evmChainId : void 0,
              I = "near" === g,
              N = "starknet" === g;
            if (
              h[0] !== w ||
              h[1] !== _ ||
              h[2] !== v ||
              h[3] !== b ||
              h[4] !== I ||
              h[5] !== N
            ) {
              var j;
              let n, i;
              ((r =
                v && w && b && !N
                  ? ((j = I
                      ? "near"
                      : void 0 === _
                        ? "solana"
                        : { evmChainId: _ }),
                    (i = (e) => (void 0 === n && (n = e.topic(j, b)), n)),
                    {
                      subscribe: (n) => {
                        let a,
                          r = !1;
                        return (
                          (
                            l ||
                            (l = Promise.all([
                              e.A(245781),
                              e.A(221329),
                              e.A(522454),
                            ]).then(
                              ([e, { Part: l }, { getUapiStreamClient: n }]) =>
                                (t = {
                                  topic: (t, l) => {
                                    try {
                                      return e.coinTopic(e.chainIdFor(t), l);
                                    } catch {
                                      return null;
                                    }
                                  },
                                  read: (t) => {
                                    let l = n().getState(t);
                                    return e.isCoinState(l)
                                      ? l.holders
                                      : void 0;
                                  },
                                  watch: (e, t) => {
                                    let i = n(),
                                      a = i.subscribe(
                                        e,
                                        {
                                          parts: [l.HOLDERS],
                                          delivery: "latest",
                                        },
                                        () => {},
                                      ),
                                      r = i.onTopic(e, t);
                                    return () => {
                                      (r(), a());
                                    };
                                  },
                                }),
                              (e) => {
                                throw ((l = void 0), e);
                              },
                            ))
                          ).then(
                            (e) => {
                              let t = i(e);
                              !r && t && ((a = e.watch(t, n)), n());
                            },
                            () => {},
                          ),
                          () => {
                            ((r = !0), a?.());
                          }
                        );
                      },
                      getSnapshot: () => {
                        if (!t) return;
                        let e = i(t);
                        return e ? t.read(e) : void 0;
                      },
                    })
                  : void 0),
                (h[0] = w),
                (h[1] = _),
                (h[2] = v),
                (h[3] = b),
                (h[4] = I),
                (h[5] = N),
                (h[6] = r));
            } else r = h[6];
            let k = r,
              M = (0, s.useSyncExternalStore)(
                k?.subscribe ?? c,
                k?.getSnapshot ?? m,
                m,
              );
            e: {
              let e;
              if (!M) {
                d = void 0;
                break e;
              }
              if (h[7] !== M.rows || h[8] !== y) {
                let t = new Map(y?.map(f));
                ((e = [...M.rows.values()].sort(u).map((e) => {
                  var l, n, i;
                  let a, r;
                  return (
                    (l = t.get(e.address)),
                    (a = e.tags),
                    {
                      address: e.address,
                      amount:
                        ((n = e.balance?.raw),
                        (i = e.balance?.decimals ?? 0),
                        Number.isFinite((r = Number(n || "0")))
                          ? r / 10 ** i
                          : 0),
                      isDev: a ? a.isDev : (l?.isDev ?? null),
                      isSniper: a ? a.isSniper : (l?.isSniper ?? null),
                      isBundler: a ? a.isBundler : (l?.isBundler ?? null),
                      enteredAt: l?.enteredAt ?? null,
                      funding: l?.funding ?? null,
                    }
                  );
                })),
                  (h[7] = M.rows),
                  (h[8] = y),
                  (h[9] = e));
              } else e = h[9];
              d = e;
            }
            let C = d,
              U = void 0 !== M,
              S = M?.summary,
              P = M?.total !== void 0 ? Number(M.total) : void 0;
            return (
              h[10] !== C || h[11] !== U || h[12] !== S || h[13] !== P
                ? ((p = { streaming: U, rows: C, summary: S, total: P }),
                  (h[10] = C),
                  (h[11] = U),
                  (h[12] = S),
                  (h[13] = P),
                  (h[14] = p))
                : (p = h[14]),
              p
            );
          })({
            enabled: U && !N && !M,
            mint: _,
            ...(k ? { chain: "near" } : {}),
            restRows: F?.topHolders,
          });
        P.current = T.streaming;
        let z = T.rows,
          W = (0, s.useMemo)(
            () =>
              z
                ? { topHolders: z, totalHolders: T.total ?? F?.totalHolders }
                : F,
            [z, T.total, F],
          );
        return (0, s.useMemo)(
          () =>
            W === F
              ? A
              : Object.defineProperties(
                  {},
                  {
                    ...Object.getOwnPropertyDescriptors(A),
                    data: { enumerable: !0, value: W },
                  },
                ),
          [A, W, F],
        );
      },
    ],
    836549,
  );
};
