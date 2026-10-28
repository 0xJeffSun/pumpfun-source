// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(606933),
    a = e.i(352386),
    i = e.i(997887),
    s = e.i(795663),
    o = e.i(50969),
    l = e.i(796654),
    u = e.i(402992),
    d = e.i(759257),
    c = e.i(503630),
    m = e.i(646908),
    f = e.i(26077);
  let h = { "5m": null, "1h": null, "6h": null, "24h": null },
    p = (e, t) => ({
      numTxs: null,
      numUsers: null,
      numBuys: null,
      numSells: null,
      numBuyers: null,
      numSellers: null,
      priceChangePercent: e,
      volumeUSD: (0, f.Y)(t),
      buyVolumeUSD: null,
      sellVolumeUSD: null,
    }),
    y = (e, t) =>
      "number" == typeof e && Number.isFinite(e) ? p(100 * e, t) : null;
  async function w(e, t) {
    try {
      let r = await fetch("/api/relay/rpc/tokens/batch", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ addresses: [e] }),
        signal: t,
      });
      if (!r.ok) return h;
      let { tokens: n } = await r.json(),
        a = n?.find((t) => t.address === e && "solana" === t.chain);
      if (!a?.poolAddress) return h;
      let i = await fetch(
        `/api/relay/rpc/tokens/pool/${encodeURIComponent(a.poolAddress)}?chain=solana&tokenAddress=${encodeURIComponent(e)}`,
        { signal: t },
      );
      if (!i.ok) return h;
      let s = await i.json();
      return {
        "5m": y(s.priceChange5m, s.volume5m),
        "1h": y(s.priceChange1, s.volume1),
        "6h": null,
        "24h": y(s.priceChange24, s.volume24),
      };
    } catch {
      return h;
    }
  }
  e.s(
    [
      "y",
      0,
      w,
      "w",
      0,
      (e) => {
        let t = e.price_change_24h_bps;
        return "number" == typeof t && Number.isFinite(t)
          ? p(t / 100, e.volume_24h_usd)
          : null;
      },
    ],
    783111,
  );
  var g = e.i(880783),
    b = e.i(426897),
    v = e.i(605587);
  let _ = 3e4,
    T = 6e4,
    A = 3e5,
    k = 6e4,
    S = 12e4,
    C = 6e5,
    E = 3e4,
    M = {
      coin: (e) => ["coin", e],
      coinAth: (e) => ["coin", "ath", e],
      coinAthByMint: (e, t, r) => ["coin", "ath", e, t, r ?? null],
      coinsByMints: (e, t = !1) => [
        "coinsByMints",
        t ? "nsfw" : "safe",
        ...[...e].sort(),
      ],
      similarCoins: (e) => ["similarCoins", e],
      topTraders: (e) => ["topTraders", e],
      holders: (e) => ["holders", e],
      marketActivity: (e) => ["marketActivity", e],
      marketActivityByMintPrefix: (e) => ["marketActivityByMint", e],
      marketActivityByMint: (e, t, r) => [
        ...M.marketActivityByMintPrefix(e),
        t,
        r ?? null,
      ],
      allUserTrades: (e, t, r, n, a, i = [], s, o = [], l = [], u = []) => [
        "allUserTrades",
        e,
        t,
        r,
        n || "",
        a || "",
        [...i].sort(),
        s || "",
        [...o].sort(),
        [...l].sort(),
        [...u].sort(),
      ],
      sniperCount: (e) => ["sniperCount", e],
      inMemoryCoin: (e) => ["inMemoryCoin", e],
      athBatch: (e, t = "USD") => ["athBatch", t, ...e.sort()],
      agentTransactions: (e) => ["agentTransactions", "history", e],
      mayhemAgentState: (e) => ["mayhemAgentState", "coins-v2", e],
    },
    U = (e, t, r) =>
      (!!t || (0, v.N)({ mint: e, chainId: r })) &&
      !(0, m.L)(r) &&
      !(0, m.B)(r) &&
      !(0, m._)(r),
    N = async (e, t, r) => {
      if (!U(e, t, r)) throw Error("Coin program is unavailable");
      let n = (0, g.X)(t),
        a = `${(0, c.V)()}/coins/${e}/ath?currency=USD${n ? `&program=${n}` : ""}`;
      r && (a += `&chainId=${r}`);
      let i = await (0, l.f)(a);
      if (404 === i.status) return null;
      if (!i.ok) throw Error(`Failed to fetch ATH data: ${i.statusText}`);
      return i.json();
    },
    j = async (e, t, r, n) => {
      if (!U(e, t, r)) throw Error("Coin program is unavailable");
      if (t === g.u && !r) return w(e);
      let a = [
          ...(t ? [`program=${t}`] : []),
          ...(r ? [`chainId=${r}`] : []),
        ].join("&"),
        i = `${(0, c.V)()}/coins/${e}/market-activity${a ? `?${a}` : ""}`,
        s = await (0, l.f)(i, { signal: n });
      if (!s.ok) throw Error("Failed to fetch market activity");
      return (0, f.O)(await s.json());
    },
    O = (e) => (e.startsWith("0x") ? e.toLowerCase() : e),
    I = async (e) => {
      let { identities: t, isEvm: r, queryClient: n } = e,
        a = {};
      if (!r) return { actorOf: (e) => e, evmAddressByWallet: a };
      let i = t.filter((e) => !(0, v.h)(e));
      if (i.length > 0) {
        let e = n
          ? await (0, s.m)({ solAddresses: i, queryClient: n })
          : await (0, s.i)({ solAddresses: i });
        for (let t of i) {
          let r = e[t];
          r && (a[t] = r);
        }
      }
      return {
        actorOf: (e) => ((0, v.h)(e) ? e : a[e]),
        evmAddressByWallet: a,
      };
    },
    $ = async (e, t) => {
      let r,
        n = [];
      for (let a = 0; a < 5; a++) {
        let a = await (0, d.j)()("GET /user-trades/{id}", {
          params: { id: t },
          query: { mint: e, limit: 100, cursor: r, chain: m.d },
        });
        for (let e of a.trades ?? []) {
          if (!e.timestamp) continue;
          let t = (0, u.E)(e, e.timestamp);
          (0, b.V)(t) && n.push(t);
        }
        if (!a.nextCursor) break;
        r = a.nextCursor;
      }
      return n;
    },
    F = async ({
      mintAddress: e,
      myWalletAddress: t,
      devWalletAddress: r,
      trackedWalletAddresses: n,
      kolWalletAddresses: a,
      followingWalletAddresses: i,
      verifiedWalletAddresses: s,
    }) => {
      let o = Array.from(new Set([...(t ? [t] : []), ...(r ? [r] : []), ...n])),
        l = await Promise.all(o.map((t) => $(e, t))),
        u = new Map(o.map((e, t) => [e, l[t]])),
        d = (e) => u.get(e) ?? [],
        c = (e) => Object.fromEntries(e.map((e) => [e, []]));
      return {
        myTrades: t ? d(t) : [],
        devTrades: r ? d(r) : [],
        trackedTrades: Object.fromEntries(n.map((e) => [e, d(e)])),
        mayhemTrades: [],
        kolTrades: c(a),
        followingTrades: c(i),
        verifiedTrades: c(s),
        evmAddressByWallet: {},
      };
    },
    B = async (e, t, r, n, a, i = [], s, o = [], u = [], d = [], f = {}) => {
      if ((0, m.B)(f.chainId))
        return F({
          mintAddress: e,
          myWalletAddress: n,
          devWalletAddress: a,
          trackedWalletAddresses: i,
          kolWalletAddresses: o,
          followingWalletAddresses: u,
          verifiedWalletAddresses: d,
        });
      if (!t) throw Error("Coin program is unavailable");
      let h = new Set([
          ...(n ? [n] : []),
          ...(a ? [a] : []),
          ...i,
          ...(s ? [s] : []),
          ...o,
          ...u,
          ...d,
        ]),
        { actorOf: p, evmAddressByWallet: y } = await I({
          identities: Array.from(h),
          isEvm: (0, v.N)({ mint: e, chainId: f.chainId }),
          queryClient: f.queryClient,
        }),
        w = new Set();
      for (let e of h) {
        let t = p(e);
        t && w.add(t);
      }
      if (0 === w.size)
        return {
          myTrades: [],
          devTrades: [],
          trackedTrades: Object.fromEntries(i.map((e) => [e, []])),
          mayhemTrades: [],
          kolTrades: Object.fromEntries(o.map((e) => [e, []])),
          followingTrades: Object.fromEntries(u.map((e) => [e, []])),
          verifiedTrades: Object.fromEntries(d.map((e) => [e, []])),
          evmAddressByWallet: y,
        };
      let _ = Array.from(w),
        T = [];
      for (let e = 0; e < _.length; e += 30) T.push(_.slice(e, e + 30));
      let A = new Set(
          [...(n ? [n] : []), ...(a ? [a] : []), ...i, ...(s ? [s] : [])]
            .map(p)
            .filter((e) => !!e),
        ),
        k = await Promise.allSettled(
          T.map(async (n) => {
            let a = await (0, l.f)(`${(0, c.V)()}/coins/${e}/trades/batch`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userAddresses: n,
                program: (0, g.X)(t),
                createdTs: r,
              }),
            });
            if (!a.ok)
              throw Error(`Failed to fetch batch trades: ${a.statusText}`);
            return a.json();
          }),
        ),
        S = k.findIndex(
          (e, t) => "rejected" === e.status && T[t].some((e) => A.has(e)),
        );
      if (-1 !== S) throw k[S].reason;
      let C = k.filter((e) => "fulfilled" === e.status).map((e) => e.value);
      if (0 === C.length) {
        let e = k.find((e) => "rejected" === e.status);
        throw e?.reason ?? Error("Failed to fetch batch trades");
      }
      let E = {};
      C.forEach((e) => {
        Object.entries(e).forEach(([e, t]) => {
          E[O(e)] = t.filter(b.V);
        });
      });
      let M = (e) => {
          let t = p(e);
          return (t && E[O(t)]) || [];
        },
        U = (e) => Object.fromEntries(e.map((e) => [e, M(e)]));
      return {
        myTrades: n ? M(n) : [],
        devTrades: a ? M(a) : [],
        trackedTrades: U(i),
        mayhemTrades: s ? M(s) : [],
        kolTrades: U(o),
        followingTrades: U(u),
        verifiedTrades: U(d),
        evmAddressByWallet: y,
      };
    },
    D = async (e, t) => {
      if (!e || 0 === e.length) return [];
      t?.includeNsfw;
      {
        let t = await (0, d.j)()("POST /coins-v2/mints", {
          body: { mints: e },
          credentials: "include",
          hooks: {
            afterResponse: [
              (e, t, r) => {
                if (!r.ok)
                  throw Error(`Failed to fetch coins: ${r.statusText}`);
              },
            ],
          },
        });
        return (0, i.l)(t);
      }
    },
    x = async (e) => {
      let t = `${(0, o.f)()}/in-memory-coin/${encodeURIComponent(e)}`,
        r = await fetch(t);
      if (404 === r.status) return null;
      if (!r.ok) throw Error(`Failed to fetch in-memory coin: ${r.status}`);
      return r.json();
    },
    q = (e) => null !== e.state.data && E;
  e.s(
    [
      "P",
      0,
      U,
      "a",
      0,
      (e, t) => {
        let r = M.coin(t.mint);
        void 0 === e.getQueryData(r) &&
          e.setQueryData(r, t, { updatedAt: Date.now() - T - 1 });
      },
      "o",
      0,
      M,
      "t",
      0,
      (e, a, i, s, o, l, u, d, c, f, h, p) => {
        let y,
          w,
          g,
          b,
          v,
          T,
          A,
          S,
          C,
          E,
          U = (0, t.c)(46);
        U[0] !== l
          ? ((y = void 0 === l ? [] : l), (U[0] = l), (U[1] = y))
          : (y = U[1]);
        let N = y,
          j = void 0 !== u && u;
        U[2] !== c
          ? ((w = void 0 === c ? [] : c), (U[2] = c), (U[3] = w))
          : (w = U[3]);
        let O = w;
        U[4] !== f
          ? ((g = void 0 === f ? [] : f), (U[4] = f), (U[5] = g))
          : (g = U[5]);
        let I = g;
        U[6] !== h
          ? ((b = void 0 === h ? [] : h), (U[6] = h), (U[7] = b))
          : (b = U[7]);
        let $ = b;
        U[8] !== p
          ? ((v = void 0 === p ? {} : p), (U[8] = p), (U[9] = v))
          : (v = U[9]);
        let F = v,
          D = (0, n.useQueryClient)();
        return (
          U[10] !== i ||
          U[11] !== o ||
          U[12] !== I ||
          U[13] !== O ||
          U[14] !== d ||
          U[15] !== e ||
          U[16] !== s ||
          U[17] !== a ||
          U[18] !== N ||
          U[19] !== $
            ? ((T = M.allUserTrades(e, a, i, s, o, N, d, O, I, $)),
              (U[10] = i),
              (U[11] = o),
              (U[12] = I),
              (U[13] = O),
              (U[14] = d),
              (U[15] = e),
              (U[16] = s),
              (U[17] = a),
              (U[18] = N),
              (U[19] = $),
              (U[20] = T))
            : (T = U[20]),
          U[21] !== i ||
          U[22] !== o ||
          U[23] !== I ||
          U[24] !== O ||
          U[25] !== d ||
          U[26] !== e ||
          U[27] !== s ||
          U[28] !== F ||
          U[29] !== a ||
          U[30] !== D ||
          U[31] !== N ||
          U[32] !== $
            ? ((A = () =>
                B(e, a, i, s, o, N, d, O, I, $, {
                  chainId: F.chainId,
                  queryClient: D,
                })),
              (U[21] = i),
              (U[22] = o),
              (U[23] = I),
              (U[24] = O),
              (U[25] = d),
              (U[26] = e),
              (U[27] = s),
              (U[28] = F),
              (U[29] = a),
              (U[30] = D),
              (U[31] = N),
              (U[32] = $),
              (U[33] = A))
            : (A = U[33]),
          U[34] !== j || U[35] !== e || U[36] !== F || U[37] !== a
            ? ((S = !!e && (!!a || (0, m.B)(F.chainId)) && !j),
              (U[34] = j),
              (U[35] = e),
              (U[36] = F),
              (U[37] = a),
              (U[38] = S))
            : (S = U[38]),
          U[39] !== e
            ? ((C = (t, r) => (r?.queryKey[1] === e ? t : void 0)),
              (U[39] = e),
              (U[40] = C))
            : (C = U[40]),
          U[41] !== T || U[42] !== A || U[43] !== S || U[44] !== C
            ? ((E = {
                queryKey: T,
                queryFn: A,
                enabled: S,
                placeholderData: C,
                staleTime: _,
                gcTime: k,
              }),
              (U[41] = T),
              (U[42] = A),
              (U[43] = S),
              (U[44] = C),
              (U[45] = E))
            : (E = U[45]),
          (0, r.useQuery)(E)
        );
      },
      "n",
      0,
      (e, n, a) => {
        let i,
          s,
          o,
          l,
          u = (0, t.c)(13);
        return (
          u[0] !== a || u[1] !== e || u[2] !== n
            ? ((i = M.coinAthByMint(e, n, a)),
              (u[0] = a),
              (u[1] = e),
              (u[2] = n),
              (u[3] = i))
            : (i = u[3]),
          u[4] !== a || u[5] !== e || u[6] !== n
            ? ((s = () => N(e, n, a)),
              (o = !!e && U(e, n, a)),
              (u[4] = a),
              (u[5] = e),
              (u[6] = n),
              (u[7] = s),
              (u[8] = o))
            : ((s = u[7]), (o = u[8])),
          u[9] !== i || u[10] !== s || u[11] !== o
            ? ((l = {
                queryKey: i,
                queryFn: s,
                enabled: o,
                staleTime: A,
                gcTime: C,
              }),
              (u[9] = i),
              (u[10] = s),
              (u[11] = o),
              (u[12] = l))
            : (l = u[12]),
          (0, r.useQuery)(l)
        );
      },
      "V",
      0,
      (e, a) => {
        let i,
          s,
          o,
          l,
          u,
          d,
          c,
          f,
          h,
          p,
          y,
          w,
          g,
          b,
          _ = (0, t.c)(52);
        (_[0] !== a
          ? ((i = void 0 === a ? {} : a), (_[0] = a), (_[1] = i))
          : (i = _[1]),
          _[2] !== i
            ? (({
                limit: o,
                offset: l,
                sort: u,
                order: d,
                includeNsfw: c,
                disabled: f,
                ...s
              } = i),
              (_[2] = i),
              (_[3] = s),
              (_[4] = o),
              (_[5] = l),
              (_[6] = u),
              (_[7] = d),
              (_[8] = c),
              (_[9] = f))
            : ((s = _[3]),
              (o = _[4]),
              (l = _[5]),
              (u = _[6]),
              (d = _[7]),
              (c = _[8]),
              (f = _[9])));
        let A = void 0 !== c && c,
          k = void 0 !== f && f,
          C = (0, n.useQueryClient)();
        e: {
          let t, r, n, a;
          if (!e.length || k) {
            let e;
            (_[10] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = {
                  cachedCoins: [],
                  staleCoins: [],
                  missingMints: [],
                  hasCachedData: !1,
                  hasNewMints: !1,
                }),
                (_[10] = e))
              : (e = _[10]),
              (h = e));
            break e;
          }
          if (A) {
            let t, r, n;
            _[11] === Symbol.for("react.memo_cache_sentinel")
              ? ((r = []), (t = []), (_[11] = t), (_[12] = r))
              : ((t = _[11]), (r = _[12]));
            let a = e.length > 0;
            (_[13] !== e || _[14] !== a
              ? ((n = {
                  cachedCoins: r,
                  staleCoins: t,
                  missingMints: e,
                  hasCachedData: !1,
                  hasNewMints: a,
                }),
                (_[13] = e),
                (_[14] = a),
                (_[15] = n))
              : (n = _[15]),
              (h = n));
            break e;
          }
          if (_[16] !== e || _[17] !== C) {
            let a = null,
              i = (e) => {
                if (!a)
                  for (let e of ((a = new Map()),
                  C.getQueryCache().findAll({ queryKey: ["coin"] }))) {
                    let { queryKey: t } = e;
                    if (2 !== t.length || "string" != typeof t[1]) continue;
                    let r = e.state.data;
                    if (!r || "string" != typeof r.mint) continue;
                    let n = (0, v.c)(t[1]),
                      i = a.get(n);
                    (i && i.dataUpdatedAt >= e.state.dataUpdatedAt) ||
                      a.set(n, {
                        coin: r,
                        dataUpdatedAt: e.state.dataUpdatedAt,
                      });
                  }
                return a.get((0, v.c)(e));
              };
            ((t = []), (n = []), (r = []));
            let s = Date.now();
            for (let a of e) {
              let e = C.getQueryState(M.coin(a)),
                o =
                  e?.data !== void 0
                    ? { coin: e.data, dataUpdatedAt: e.dataUpdatedAt }
                    : a.startsWith("0x")
                      ? i(a)
                      : void 0;
              if (!o) {
                r.push(a);
                continue;
              }
              !(s - o.dataUpdatedAt > T) ||
              (0, m.L)(o.coin.chain_id) ||
              (0, m.B)(o.coin.chain_id) ||
              (0, m._)(o.coin.chain_id)
                ? t.push(o.coin)
                : (n.push(o.coin), r.push(a));
            }
            ((_[16] = e), (_[17] = C), (_[18] = t), (_[19] = r), (_[20] = n));
          } else ((t = _[18]), (r = _[19]), (n = _[20]));
          let i = t.length > 0,
            s = r.length > 0;
          (_[21] !== t ||
          _[22] !== r ||
          _[23] !== n ||
          _[24] !== s ||
          _[25] !== i
            ? ((a = {
                cachedCoins: t,
                staleCoins: n,
                missingMints: r,
                hasCachedData: i,
                hasNewMints: s,
              }),
              (_[21] = t),
              (_[22] = r),
              (_[23] = n),
              (_[24] = s),
              (_[25] = i),
              (_[26] = a))
            : (a = _[26]),
            (h = a));
        }
        let E = h;
        (_[27] !== E.missingMints || _[28] !== A
          ? ((p = M.coinsByMints(E.missingMints, A)),
            (_[27] = E.missingMints),
            (_[28] = A),
            (_[29] = p))
          : (p = _[29]),
          _[30] !== E.missingMints || _[31] !== A || _[32] !== C
            ? ((y = async () => {
                if (0 === E.missingMints.length) return [];
                let e = await D(E.missingMints, { includeNsfw: A });
                return (
                  e.forEach((e) => {
                    C.setQueryData(M.coin(e.mint), e);
                  }),
                  e
                );
              }),
              (_[30] = E.missingMints),
              (_[31] = A),
              (_[32] = C),
              (_[33] = y))
            : (y = _[33]));
        let U = E.hasNewMints && !k;
        _[34] !== s || _[35] !== y || _[36] !== U || _[37] !== p
          ? ((w = {
              queryKey: p,
              queryFn: y,
              enabled: U,
              staleTime: T,
              gcTime: S,
              ...s,
            }),
            (_[34] = s),
            (_[35] = y),
            (_[36] = U),
            (_[37] = p),
            (_[38] = w))
          : (w = _[38]);
        let N = (0, r.useQuery)(w);
        if (
          _[39] !== N.data ||
          _[40] !== E.cachedCoins ||
          _[41] !== E.staleCoins ||
          _[42] !== e
        ) {
          let t = N.data || [],
            r = [...E.staleCoins, ...E.cachedCoins, ...t],
            n = new Map();
          (r.forEach((e) => {
            n.set((0, v.c)(e.mint), e);
          }),
            (g = e.map((e) => n.get((0, v.c)(e))).filter(Boolean)),
            (_[39] = N.data),
            (_[40] = E.cachedCoins),
            (_[41] = E.staleCoins),
            (_[42] = e),
            (_[43] = g));
        } else g = _[43];
        let j = g,
          O = !!E.hasNewMints && j.length < e.length && N.isLoading,
          I = N.error,
          $ = !O && !I;
        return (
          _[44] !== j ||
          _[45] !== N.isError ||
          _[46] !== N.isLoadingError ||
          _[47] !== N.refetch ||
          _[48] !== I ||
          _[49] !== O ||
          _[50] !== $
            ? ((b = {
                data: j,
                isLoading: O,
                error: I,
                isSuccess: $,
                refetch: N.refetch,
                isError: N.isError,
                isLoadingError: N.isLoadingError,
              }),
              (_[44] = j),
              (_[45] = N.isError),
              (_[46] = N.isLoadingError),
              (_[47] = N.refetch),
              (_[48] = I),
              (_[49] = O),
              (_[50] = $),
              (_[51] = b))
            : (b = _[51]),
          b
        );
      },
      "w",
      0,
      (e) => {
        let n,
          a,
          i,
          s = (0, t.c)(8);
        (s[0] !== e
          ? ((n = M.inMemoryCoin(e)), (s[0] = e), (s[1] = n))
          : (n = s[1]),
          s[2] !== e ? ((a = () => x(e)), (s[2] = e), (s[3] = a)) : (a = s[3]));
        let o = !!e;
        return (
          s[4] !== n || s[5] !== a || s[6] !== o
            ? ((i = {
                queryKey: n,
                queryFn: a,
                enabled: o,
                staleTime: _,
                refetchInterval: q,
              }),
              (s[4] = n),
              (s[5] = a),
              (s[6] = o),
              (s[7] = i))
            : (i = s[7]),
          (0, r.useQuery)(i)
        );
      },
      "F",
      0,
      (e) => {
        let n,
          i,
          s,
          o,
          l = (0, t.c)(19),
          {
            mintAddress: u,
            program: d,
            chainId: c,
            enabled: m,
            refetchInterval: f,
            onFetched: h,
          } = e,
          p = void 0 === m || m,
          y = void 0 !== f && f,
          w = (0, a.useRef)(0);
        return (
          l[0] !== c || l[1] !== u || l[2] !== d
            ? ((n = M.marketActivityByMint(u, d, c)),
              (l[0] = c),
              (l[1] = u),
              (l[2] = d),
              (l[3] = n))
            : (n = l[3]),
          l[4] !== c || l[5] !== u || l[6] !== h || l[7] !== d
            ? ((i = async (e) => {
                let { signal: t } = e,
                  r = (w.current = w.current + 1),
                  n = await j(u, d, c, t);
                return (r === w.current && h?.(n), n);
              }),
              (l[4] = c),
              (l[5] = u),
              (l[6] = h),
              (l[7] = d),
              (l[8] = i))
            : (i = l[8]),
          l[9] !== c || l[10] !== p || l[11] !== u || l[12] !== d
            ? ((s = p && !!u && U(u, d, c)),
              (l[9] = c),
              (l[10] = p),
              (l[11] = u),
              (l[12] = d),
              (l[13] = s))
            : (s = l[13]),
          l[14] !== y || l[15] !== n || l[16] !== i || l[17] !== s
            ? ((o = {
                queryKey: n,
                queryFn: i,
                enabled: s,
                staleTime: T,
                gcTime: S,
                refetchInterval: y,
              }),
              (l[14] = y),
              (l[15] = n),
              (l[16] = i),
              (l[17] = s),
              (l[18] = o))
            : (o = l[18]),
          (0, r.useQuery)(o)
        );
      },
    ],
    689943,
  );
};
