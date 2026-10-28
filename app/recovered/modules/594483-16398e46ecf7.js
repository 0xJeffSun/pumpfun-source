// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    n = e.i(352386),
    i = e.i(384886),
    l = e.i(582453);
  let r = new Set();
  e.s(
    [
      "f",
      0,
      function ({ address: e, mints: a, enabled: u = !0 }) {
        let o = (0, n.useMemo)(() => [...a].sort(), [a]),
          s = (0, t.useQuery)({
            queryKey: ["ccExitedMints", e, o],
            enabled: u && !!e && o.length > 0,
            staleTime: 3e5,
            gcTime: 18e5,
            placeholderData: (t, n) => (n?.queryKey[1] === e ? t : void 0),
            retry: !1,
            queryFn: async () => {
              try {
                let t = await (0, i.m)({ userId: e, mints: o });
                return new Set(
                  t
                    .filter((e) => !0 === e.isExited)
                    .map((e) => (0, l.f)(e.coinMint)),
                );
              } catch {
                return new Set();
              }
            },
          }),
          d = (0, n.useMemo)(() => {
            if (!s.data || 0 === o.length) return r;
            let e = new Set();
            for (let t of o) {
              let n = (0, l.f)(t);
              s.data.has(n) && e.add(n);
            }
            return e;
          }, [s.data, o]),
          c = (0, n.useRef)(null),
          { data: f, isPlaceholderData: p } = s;
        return (
          (0, n.useEffect)(() => {
            void 0 === f || p || (c.current = new Set(o.map(l.f)));
          }, [f, p, o]),
          {
            exitedMints: d,
            coveredMints: (0, n.useMemo)(() => {
              if (!u || void 0 === s.data || 0 === o.length) return r;
              if (!s.isPlaceholderData) return new Set(o.map(l.f));
              let e = c.current;
              if (!e) return r;
              let t = new Set();
              for (let n of o) {
                let i = (0, l.f)(n);
                e.has(i) && t.add(i);
              }
              return t;
            }, [u, s.data, s.isPlaceholderData, o]),
          }
        );
      },
    ],
    594483,
  );
  var a = e.i(445242),
    u = e.i(795663),
    o = e.i(663628),
    s = e.i(188902);
  let d = new Set(),
    c = async (e, t) => {
      if (e.startsWith("0x")) return e;
      try {
        return await (0, u.a)({ solAddress: e, signal: t });
      } catch {
        return null;
      }
    };
  function f(e) {
    return e.coinMint;
  }
  function p(e) {
    return !(0, o.w)(e);
  }
  function m(e) {
    return `${e.chainId}:${(0, l.f)(e.coinMint)}`;
  }
  function h(e, t) {
    return e.coinMint.localeCompare(t.coinMint);
  }
  function b(e) {
    let { coinMint: t, chainId: n } = e;
    return null != n ? [{ coinMint: t, chainId: n }] : [];
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          i,
          r,
          u,
          g,
          y,
          _,
          v = (0, a.c)(20),
          { address: k, holdings: w, enabled: U } = e;
        v[0] !== w
          ? ((n = w.flatMap(b).sort(h).slice(0, o.y)), (v[0] = w), (v[1] = n))
          : (n = v[1]);
        let S = n;
        v[2] !== S ? ((i = S.map(m)), (v[2] = S), (v[3] = i)) : (i = v[3]);
        let M = i;
        v[4] !== k || v[5] !== M
          ? ((r = ["chainHeldMints", k, M]), (v[4] = k), (v[5] = M), (v[6] = r))
          : (r = v[6]);
        let P = (void 0 === U || U) && !!k && M.length > 0;
        (v[7] !== k
          ? ((u = (e, t) => (t?.queryKey[1] === k ? e : void 0)),
            (v[7] = k),
            (v[8] = u))
          : (u = v[8]),
          v[9] !== k || v[10] !== S
            ? ((g = async (e) => {
                let { signal: t } = e,
                  n = S.filter(o.w),
                  i = S.filter(p),
                  [r, a] = await Promise.all([
                    n.length > 0
                      ? (0, o.n)({
                          owner: k,
                          mints: n.map(f),
                          endpoint: (0, s.L)(),
                          signal: t,
                        })
                      : new Set(),
                    i.length > 0
                      ? c(k, t).then((e) =>
                          e
                            ? (0, o._)({ evmAddress: e, targets: i })
                            : new Set(),
                        )
                      : new Set(),
                  ]);
                return new Set([...r, ...a].map(l.f));
              }),
              (v[9] = k),
              (v[10] = S),
              (v[11] = g))
            : (g = v[11]),
          v[12] !== r || v[13] !== P || v[14] !== u || v[15] !== g
            ? ((y = {
                queryKey: r,
                enabled: P,
                staleTime: 3e4,
                gcTime: 3e5,
                retry: !1,
                placeholderData: u,
                queryFn: g,
              }),
              (v[12] = r),
              (v[13] = P),
              (v[14] = u),
              (v[15] = g),
              (v[16] = y))
            : (y = v[16]));
        let N = (0, t.useQuery)(y);
        e: {
          let e;
          if (!N.data || 0 === M.length) {
            _ = d;
            break e;
          }
          if (v[17] !== N.data || v[18] !== S) {
            for (let t of ((e = new Set()), S)) {
              let n = (0, l.f)(t.coinMint);
              N.data.has(n) && e.add(n);
            }
            ((v[17] = N.data), (v[18] = S), (v[19] = e));
          } else e = v[19];
          _ = e;
        }
        return _;
      },
    ],
    592036,
  );
  var g = e.i(38279),
    y = e.i(528766),
    _ = e.i(42095);
  let v = (e) => {
      if (null == e || "" === e) return null;
      let t = "number" == typeof e ? e : Number(e);
      return Number.isFinite(t) ? t : null;
    },
    k = (e) => {
      let t = v(e);
      return null !== t && (0, y.L)(t) ? null : t;
    },
    w = (e, t = {}) => {
      let n = e.token_mint,
        i = v(e.network_id),
        l = v(e.balance);
      if (!n || null === i || null === l || l <= 0) return null;
      let r = k(e.value),
        a = null === r ? null : v(e.token_price),
        u = v(e.tokenPnL?.cost_basis_usd),
        o = k(e.tokenPnL?.unrealized_usd),
        s = v(e.tokenPnL?.percentage_usd);
      return {
        coinMint: n,
        chainId: i,
        isExited: !1,
        amountHeld: l,
        pnlUsd: null === u ? null : o,
        pnlPercentage: null === u ? null : s,
        ...(null === r ? {} : { valueUsd: r }),
        ...(null === a ? {} : { tokenPriceUsd: a }),
        ...(t.snapshotUpdatedAt ? { updatedAt: t.snapshotUpdatedAt } : {}),
      };
    },
    U = (e) => {
      let t = v(e);
      return null === t || t <= 0 ? null : new Date(1e3 * t).toISOString();
    },
    S = (e) => {
      if (!e) return null;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : null;
    },
    M = ({ holdings: e, mint: t, chainId: n }) => {
      if (!e?.length) return null;
      let i = (0, l.f)(t),
        r = e.find(
          (e) => (0, l.f)(e.coinMint) === i && (null == n || e.chainId === n),
        );
      return r && void 0 !== r.valueUsd
        ? {
            valueUsd: r.valueUsd,
            pnlUsd: r.pnlUsd,
            pnlPercentage: r.pnlPercentage,
          }
        : null;
    },
    P = ({ positions: e, holdings: t, indexedBoardComplete: n }) => {
      if (!e || !n || !t?.length) return [];
      let i = new Set(e.map((e) => (0, l.f)(e.coinMint)));
      return t.filter(
        (e) =>
          !i.has((0, l.f)(e.coinMint)) &&
          e.coinMint !== _.v &&
          (e.valueUsd ?? 0) >= 1,
      );
    };
  e.s(
    [
      "N",
      0,
      U,
      "v",
      0,
      w,
      "H",
      0,
      M,
      "m",
      0,
      ({
        positions: e,
        holdings: t,
        indexedBoardComplete: n,
        closedMints: i,
      }) => {
        if (!e) return e;
        let r = (({ positions: e, holdings: t }) => {
            if (!t?.length) return e;
            let n = new Map();
            for (let e of t) n.set(`${(0, l.f)(e.coinMint)}:${e.chainId}`, e);
            let i = !1,
              r = e.map((e) => {
                if (e.isNative || e.isExited || !(e.amountHeld > 0)) return e;
                let t = n.get(`${(0, l.f)(e.coinMint)}:${e.chainId}`);
                if (
                  !t ||
                  !(t.amountHeld > 0) ||
                  t.amountHeld >= e.amountHeld * (1 - 1e-9)
                )
                  return e;
                let r = S(t.updatedAt);
                if (null === r) return e;
                let a = S(e.updatedAt);
                if (null !== a && a > r) return e;
                i = !0;
                let u =
                  t.valueUsd ??
                  (null != e.tokenPriceUsd
                    ? e.tokenPriceUsd * t.amountHeld
                    : void 0);
                return {
                  ...e,
                  amountHeld: t.amountHeld,
                  pnlUsd: t.pnlUsd,
                  pnlPercentage: t.pnlPercentage,
                  valueUsd: u,
                };
              });
            return i ? r : e;
          })({
            positions: (({ positions: e, holdings: t }) => {
              if (!t?.length) return e;
              let n = !1,
                i = e.map((e) => {
                  if (!e.servedQuoteRejected) return e;
                  let i = M({
                    holdings: t,
                    mint: e.coinMint,
                    chainId: e.chainId,
                  });
                  return i ? ((n = !0), { ...e, ...i }) : e;
                });
              return n ? i : e;
            })({ positions: e, holdings: t }),
            holdings: t,
          }),
          a = P({ positions: r, holdings: t, indexedBoardComplete: n }),
          u = i?.size ? a.filter((e) => !i.has((0, l.f)(e.coinMint))) : a;
        return 0 === u.length ? r : [...r, ...u];
      },
      "K",
      0,
      P,
    ],
    906305,
  );
  let N = [];
  function A(e) {
    return !!e;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          i,
          l,
          r = (0, a.c)(8),
          { address: u, enabled: o } = e;
        r[0] !== u
          ? ((n = ["chainStateHoldings", u]), (r[0] = u), (r[1] = n))
          : (n = r[1]);
        let s = !!u && (void 0 === o || o);
        return (
          r[2] !== u
            ? ((i = async (e) => {
                let { signal: t } = e,
                  n = await fetch(
                    `${g.C.PROFILE}/balance/tokens/${u}?page=1&size=200&chain=all`,
                    { signal: t },
                  );
                if (404 === n.status) return N;
                if (!n.ok) throw Error(`Failed to fetch holdings: ${n.status}`);
                let i = await n.json(),
                  l = i.data?.tokens ?? [],
                  r = U(i.data?.last_update_ts);
                return l.map((e) => w(e, { snapshotUpdatedAt: r })).filter(A);
              }),
              (r[2] = u),
              (r[3] = i))
            : (i = r[3]),
          r[4] !== n || r[5] !== s || r[6] !== i
            ? ((l = { queryKey: n, enabled: s, staleTime: 3e4, queryFn: i }),
              (r[4] = n),
              (r[5] = s),
              (r[6] = i),
              (r[7] = l))
            : (l = r[7]),
          (0, t.useQuery)(l).data ?? N
        );
      },
    ],
    861398,
  );
  var F = e.i(213618),
    T = e.i(674801);
  let I = new Set();
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          i,
          l,
          r,
          u,
          o,
          d = (0, a.c)(16),
          { mints: c, enabled: f } = e,
          p = void 0 === f || f;
        d[0] !== c ? ((n = [...c].sort()), (d[0] = c), (d[1] = n)) : (n = d[1]);
        let m = n;
        (d[2] !== m
          ? ((i = ["closedMints", m]), (d[2] = m), (d[3] = i))
          : (i = d[3]),
          d[4] !== p || d[5] !== m
            ? ((l = p && m.length > 0 && !!(0, s.L)()),
              (d[4] = p),
              (d[5] = m),
              (d[6] = l))
            : (l = d[6]),
          d[7] !== m
            ? ((r = (e) => {
                let { signal: t } = e;
                return (0, T.l)({ mints: m, endpoint: (0, s.L)(), signal: t });
              }),
              (d[7] = m),
              (d[8] = r))
            : (r = d[8]),
          d[9] !== i || d[10] !== l || d[11] !== r
            ? ((u = {
                queryKey: i,
                enabled: l,
                staleTime: 3e5,
                gcTime: 18e5,
                placeholderData: F.y,
                retry: !1,
                queryFn: r,
              }),
              (d[9] = i),
              (d[10] = l),
              (d[11] = r),
              (d[12] = u))
            : (u = d[12]));
        let { data: h } = (0, t.useQuery)(u);
        e: {
          let e;
          if (!h || 0 === m.length) {
            o = I;
            break e;
          }
          if (d[13] !== h || d[14] !== m) {
            for (let t of ((e = new Set()), m)) h.has(t) && e.add(t);
            ((d[13] = h), (d[14] = m), (d[15] = e));
          } else e = d[15];
          o = e;
        }
        return o;
      },
    ],
    940106,
  );
  var q = e.i(70527);
  let C = new Set();
  function z(e) {
    return (0, l.f)(e.mint);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          n,
          i,
          l,
          r,
          u = (0, a.c)(12),
          { address: o, enabled: s } = e,
          d = !!o && (void 0 === s || s),
          c = o ?? "";
        (u[0] !== d
          ? ((t = { enabled: d, staleTime: 6e4 }), (u[0] = d), (u[1] = t))
          : (t = u[1]),
          u[2] !== c || u[3] !== t
            ? ((n = { userAddress: c, limit: 1, queryOptions: t }),
              (u[2] = c),
              (u[3] = t),
              (u[4] = n))
            : (n = u[4]));
        let { data: f } = (0, q.f)(n),
          p = f?.count ?? 0,
          m = o ?? "",
          h = d && p > 1;
        (u[5] !== h
          ? ((i = { enabled: h, staleTime: 6e4 }), (u[5] = h), (u[6] = i))
          : (i = u[6]),
          u[7] !== m || u[8] !== i
            ? ((l = { userAddress: m, limit: 50, queryOptions: i }),
              (u[7] = m),
              (u[8] = i),
              (u[9] = l))
            : (l = u[9]));
        let { data: b } = (0, q.f)(l),
          g = b?.coins ?? f?.coins;
        e: {
          let e;
          if (!d || !g?.length) {
            r = C;
            break e;
          }
          (u[10] !== g
            ? ((e = new Set(g.map(z))), (u[10] = g), (u[11] = e))
            : (e = u[11]),
            (r = e));
        }
        return r;
      },
    ],
    784521,
  );
  var x = e.i(917341),
    D = e.i(549613);
  let E = (e) => {
      if (null == e) return null;
      let t = e.trim();
      return "" === t ? null : t;
    },
    H = (e) => ("number" == typeof e && Number.isFinite(e) && e > 0 ? e : null),
    L = (e) => e.assetClass === x.R || null != e.collectible;
  e.s(
    [
      "$",
      0,
      L,
      "L",
      0,
      (e) => {
        let t = e.collectible ?? null;
        return {
          nftAddress: e.coinMint,
          name: E(t?.name),
          image: (0, D.G)(t?.provider, t?.imageUrl),
          grade: E(t?.grade),
          setName: E(t?.setName),
          status: E(t?.status)?.toLowerCase() ?? null,
          markUsd: H(t?.markUsd) ?? H(t?.insuredValueUsd),
          provider: E(t?.provider),
        };
      },
    ],
    622285,
  );
  let $ = BigInt(1),
    B = (e) => {
      if (!e || !Array.isArray(e.data)) return !1;
      let [t, n] = e.data;
      if ("base64" !== n || "string" != typeof t) return !1;
      let i = ((e) => {
        try {
          let t = atob(e),
            n = new Uint8Array(t.length);
          for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
          return n;
        } catch {
          return null;
        }
      })(t);
      return (
        !!i &&
        9 === i.length &&
        0 === i[8] &&
        ((e) => {
          let t = BigInt(0);
          for (let n = 7; n >= 0; n--) t = (t << BigInt(8)) | BigInt(e[n]);
          return t;
        })(i) <= $
      );
    };
  async function K({ mints: e, endpoint: t, signal: n }) {
    let i = new Set();
    if (!t || 0 === e.length) return i;
    for (let l = 0; l < e.length; l += T.C) {
      let r = e.slice(l, l + T.C);
      try {
        let e = await fetch(t, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getMultipleAccounts",
            params: [
              r,
              { encoding: "base64", dataSlice: { offset: 36, length: 9 } },
            ],
          }),
          signal: n,
        });
        if (!e.ok) continue;
        let l = await e.json(),
          a = l?.result?.value;
        if (l?.error != null || !Array.isArray(a) || a.length !== r.length)
          continue;
        a.forEach((e, t) => {
          B(e) && i.add(r[t]);
        });
      } catch {
        continue;
      }
    }
    return i;
  }
  e.s(
    [
      "s",
      0,
      K,
      "f",
      0,
      function (e) {
        let t = new Set();
        for (let n of e ?? [])
          n.chainId !== T.S ||
            n.isNative ||
            L(n) ||
            n.coin ||
            null != n.tokenPriceUsd ||
            (n.valueUsd ?? 0) > 0 ||
            t.add(n.coinMint);
        return [...t];
      },
    ],
    973698,
  );
  let R = new Set();
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          i,
          l,
          r,
          u,
          o,
          d = (0, a.c)(16),
          { mints: c, enabled: f } = e,
          p = void 0 === f || f;
        d[0] !== c ? ((n = [...c].sort()), (d[0] = c), (d[1] = n)) : (n = d[1]);
        let m = n;
        (d[2] !== m
          ? ((i = ["nftMints", m]), (d[2] = m), (d[3] = i))
          : (i = d[3]),
          d[4] !== p || d[5] !== m
            ? ((l = p && m.length > 0 && !!(0, s.L)()),
              (d[4] = p),
              (d[5] = m),
              (d[6] = l))
            : (l = d[6]),
          d[7] !== m
            ? ((r = (e) => {
                let { signal: t } = e;
                return K({ mints: m, endpoint: (0, s.L)(), signal: t });
              }),
              (d[7] = m),
              (d[8] = r))
            : (r = d[8]),
          d[9] !== i || d[10] !== l || d[11] !== r
            ? ((u = {
                queryKey: i,
                enabled: l,
                staleTime: 1 / 0,
                gcTime: 18e5,
                placeholderData: F.y,
                retry: !1,
                queryFn: r,
              }),
              (d[9] = i),
              (d[10] = l),
              (d[11] = r),
              (d[12] = u))
            : (u = d[12]));
        let { data: h } = (0, t.useQuery)(u);
        e: {
          let e;
          if (!h || 0 === m.length) {
            o = R;
            break e;
          }
          if (d[13] !== h || d[14] !== m) {
            for (let t of ((e = new Set()), m)) h.has(t) && e.add(t);
            ((d[13] = h), (d[14] = m), (d[15] = e));
          } else e = d[15];
          o = e;
        }
        return o;
      },
    ],
    364245,
  );
};
