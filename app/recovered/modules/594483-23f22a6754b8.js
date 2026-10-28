// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    n = e.i(352386),
    i = e.i(384886),
    r = e.i(582453);
  let l = new Set();
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
                    .map((e) => (0, r.f)(e.coinMint)),
                );
              } catch {
                return new Set();
              }
            },
          }),
          d = (0, n.useMemo)(() => {
            if (!s.data || 0 === o.length) return l;
            let e = new Set();
            for (let t of o) {
              let n = (0, r.f)(t);
              s.data.has(n) && e.add(n);
            }
            return e;
          }, [s.data, o]),
          c = (0, n.useRef)(null),
          { data: f, isPlaceholderData: m } = s;
        return (
          (0, n.useEffect)(() => {
            void 0 === f || m || (c.current = new Set(o.map(r.f)));
          }, [f, m, o]),
          {
            exitedMints: d,
            coveredMints: (0, n.useMemo)(() => {
              if (!u || void 0 === s.data || 0 === o.length) return l;
              if (!s.isPlaceholderData) return new Set(o.map(r.f));
              let e = c.current;
              if (!e) return l;
              let t = new Set();
              for (let n of o) {
                let i = (0, r.f)(n);
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
  function m(e) {
    return !(0, o.w)(e);
  }
  function p(e) {
    return `${e.chainId}:${(0, r.f)(e.coinMint)}`;
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
          l,
          u,
          g,
          v,
          y,
          _ = (0, a.c)(20),
          { address: k, holdings: w, enabled: S } = e;
        _[0] !== w
          ? ((n = w.flatMap(b).sort(h).slice(0, o.y)), (_[0] = w), (_[1] = n))
          : (n = _[1]);
        let U = n;
        _[2] !== U ? ((i = U.map(p)), (_[2] = U), (_[3] = i)) : (i = _[3]);
        let N = i;
        _[4] !== k || _[5] !== N
          ? ((l = ["chainHeldMints", k, N]), (_[4] = k), (_[5] = N), (_[6] = l))
          : (l = _[6]);
        let M = (void 0 === S || S) && !!k && N.length > 0;
        (_[7] !== k
          ? ((u = (e, t) => (t?.queryKey[1] === k ? e : void 0)),
            (_[7] = k),
            (_[8] = u))
          : (u = _[8]),
          _[9] !== k || _[10] !== U
            ? ((g = async (e) => {
                let { signal: t } = e,
                  n = U.filter(o.w),
                  i = U.filter(m),
                  [l, a] = await Promise.all([
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
                return new Set([...l, ...a].map(r.f));
              }),
              (_[9] = k),
              (_[10] = U),
              (_[11] = g))
            : (g = _[11]),
          _[12] !== l || _[13] !== M || _[14] !== u || _[15] !== g
            ? ((v = {
                queryKey: l,
                enabled: M,
                staleTime: 3e4,
                gcTime: 3e5,
                retry: !1,
                placeholderData: u,
                queryFn: g,
              }),
              (_[12] = l),
              (_[13] = M),
              (_[14] = u),
              (_[15] = g),
              (_[16] = v))
            : (v = _[16]));
        let P = (0, t.useQuery)(v);
        e: {
          let e;
          if (!P.data || 0 === N.length) {
            y = d;
            break e;
          }
          if (_[17] !== P.data || _[18] !== U) {
            for (let t of ((e = new Set()), U)) {
              let n = (0, r.f)(t.coinMint);
              P.data.has(n) && e.add(n);
            }
            ((_[17] = P.data), (_[18] = U), (_[19] = e));
          } else e = _[19];
          y = e;
        }
        return y;
      },
    ],
    592036,
  );
  var g = e.i(38279),
    v = e.i(528766),
    y = e.i(42095);
  let _ = (e) => {
      if (null == e || "" === e) return null;
      let t = "number" == typeof e ? e : Number(e);
      return Number.isFinite(t) ? t : null;
    },
    k = (e) => {
      let t = _(e);
      return null !== t && (0, v.L)(t) ? null : t;
    },
    w = (e, t = {}) => {
      let n = e.token_mint,
        i = _(e.network_id),
        r = _(e.balance);
      if (!n || null === i || null === r || r <= 0) return null;
      let l = k(e.value),
        a = null === l ? null : _(e.token_price),
        u = _(e.tokenPnL?.cost_basis_usd),
        o = k(e.tokenPnL?.unrealized_usd),
        s = _(e.tokenPnL?.percentage_usd);
      return {
        coinMint: n,
        chainId: i,
        isExited: !1,
        amountHeld: r,
        pnlUsd: null === u ? null : o,
        pnlPercentage: null === u ? null : s,
        ...(null === l ? {} : { valueUsd: l }),
        ...(null === a ? {} : { tokenPriceUsd: a }),
        ...(t.snapshotUpdatedAt ? { updatedAt: t.snapshotUpdatedAt } : {}),
      };
    },
    S = (e) => {
      let t = _(e);
      return null === t || t <= 0 ? null : new Date(1e3 * t).toISOString();
    },
    U = (e) => {
      if (!e) return null;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : null;
    },
    N = ({ holdings: e, mint: t, chainId: n }) => {
      if (!e?.length) return null;
      let i = (0, r.f)(t),
        l = e.find(
          (e) => (0, r.f)(e.coinMint) === i && (null == n || e.chainId === n),
        );
      return l && void 0 !== l.valueUsd
        ? {
            valueUsd: l.valueUsd,
            pnlUsd: l.pnlUsd,
            pnlPercentage: l.pnlPercentage,
          }
        : null;
    },
    M = ({ positions: e, holdings: t, indexedBoardComplete: n }) => {
      if (!e || !n || !t?.length) return [];
      let i = new Set(e.map((e) => (0, r.f)(e.coinMint)));
      return t.filter(
        (e) =>
          !i.has((0, r.f)(e.coinMint)) &&
          e.coinMint !== y.v &&
          (e.valueUsd ?? 0) >= 1,
      );
    };
  e.s(
    [
      "N",
      0,
      S,
      "v",
      0,
      w,
      "H",
      0,
      N,
      "m",
      0,
      ({
        positions: e,
        holdings: t,
        indexedBoardComplete: n,
        closedMints: i,
      }) => {
        if (!e) return e;
        let l = (({ positions: e, holdings: t }) => {
            if (!t?.length) return e;
            let n = new Map();
            for (let e of t) n.set(`${(0, r.f)(e.coinMint)}:${e.chainId}`, e);
            let i = !1,
              l = e.map((e) => {
                if (e.isNative || e.isExited || !(e.amountHeld > 0)) return e;
                let t = n.get(`${(0, r.f)(e.coinMint)}:${e.chainId}`);
                if (
                  !t ||
                  !(t.amountHeld > 0) ||
                  t.amountHeld >= e.amountHeld * (1 - 1e-9)
                )
                  return e;
                let l = U(t.updatedAt);
                if (null === l) return e;
                let a = U(e.updatedAt);
                if (null !== a && a > l) return e;
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
            return i ? l : e;
          })({
            positions: (({ positions: e, holdings: t }) => {
              if (!t?.length) return e;
              let n = !1,
                i = e.map((e) => {
                  if (!e.servedQuoteRejected) return e;
                  let i = N({
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
          a = M({ positions: l, holdings: t, indexedBoardComplete: n }),
          u = i?.size ? a.filter((e) => !i.has((0, r.f)(e.coinMint))) : a;
        return 0 === u.length ? l : [...l, ...u];
      },
      "K",
      0,
      M,
    ],
    906305,
  );
  let P = [];
  function I(e) {
    return !!e;
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          i,
          r,
          l = (0, a.c)(8),
          { address: u, enabled: o } = e;
        l[0] !== u
          ? ((n = ["chainStateHoldings", u]), (l[0] = u), (l[1] = n))
          : (n = l[1]);
        let s = !!u && (void 0 === o || o);
        return (
          l[2] !== u
            ? ((i = async (e) => {
                let { signal: t } = e,
                  n = await fetch(
                    `${g.C.PROFILE}/balance/tokens/${u}?page=1&size=200&chain=all`,
                    { signal: t },
                  );
                if (404 === n.status) return P;
                if (!n.ok) throw Error(`Failed to fetch holdings: ${n.status}`);
                let i = await n.json(),
                  r = i.data?.tokens ?? [],
                  l = S(i.data?.last_update_ts);
                return r.map((e) => w(e, { snapshotUpdatedAt: l })).filter(I);
              }),
              (l[2] = u),
              (l[3] = i))
            : (i = l[3]),
          l[4] !== n || l[5] !== s || l[6] !== i
            ? ((r = { queryKey: n, enabled: s, staleTime: 3e4, queryFn: i }),
              (l[4] = n),
              (l[5] = s),
              (l[6] = i),
              (l[7] = r))
            : (r = l[7]),
          (0, t.useQuery)(r).data ?? P
        );
      },
    ],
    861398,
  );
  var F = e.i(213618),
    E = e.i(674801);
  let T = new Set();
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          i,
          r,
          l,
          u,
          o,
          d = (0, a.c)(16),
          { mints: c, enabled: f } = e,
          m = void 0 === f || f;
        d[0] !== c ? ((n = [...c].sort()), (d[0] = c), (d[1] = n)) : (n = d[1]);
        let p = n;
        (d[2] !== p
          ? ((i = ["closedMints", p]), (d[2] = p), (d[3] = i))
          : (i = d[3]),
          d[4] !== m || d[5] !== p
            ? ((r = m && p.length > 0 && !!(0, s.L)()),
              (d[4] = m),
              (d[5] = p),
              (d[6] = r))
            : (r = d[6]),
          d[7] !== p
            ? ((l = (e) => {
                let { signal: t } = e;
                return (0, E.l)({ mints: p, endpoint: (0, s.L)(), signal: t });
              }),
              (d[7] = p),
              (d[8] = l))
            : (l = d[8]),
          d[9] !== i || d[10] !== r || d[11] !== l
            ? ((u = {
                queryKey: i,
                enabled: r,
                staleTime: 3e5,
                gcTime: 18e5,
                placeholderData: F.y,
                retry: !1,
                queryFn: l,
              }),
              (d[9] = i),
              (d[10] = r),
              (d[11] = l),
              (d[12] = u))
            : (u = d[12]));
        let { data: h } = (0, t.useQuery)(u);
        e: {
          let e;
          if (!h || 0 === p.length) {
            o = T;
            break e;
          }
          if (d[13] !== h || d[14] !== p) {
            for (let t of ((e = new Set()), p)) h.has(t) && e.add(t);
            ((d[13] = h), (d[14] = p), (d[15] = e));
          } else e = d[15];
          o = e;
        }
        return o;
      },
    ],
    940106,
  );
  var A = e.i(70527);
  let C = new Set();
  function q(e) {
    return (0, r.f)(e.mint);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          n,
          i,
          r,
          l,
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
        let { data: f } = (0, A.f)(n),
          m = f?.count ?? 0,
          p = o ?? "",
          h = d && m > 1;
        (u[5] !== h
          ? ((i = { enabled: h, staleTime: 6e4 }), (u[5] = h), (u[6] = i))
          : (i = u[6]),
          u[7] !== p || u[8] !== i
            ? ((r = { userAddress: p, limit: 50, queryOptions: i }),
              (u[7] = p),
              (u[8] = i),
              (u[9] = r))
            : (r = u[9]));
        let { data: b } = (0, A.f)(r),
          g = b?.coins ?? f?.coins;
        e: {
          let e;
          if (!d || !g?.length) {
            l = C;
            break e;
          }
          (u[10] !== g
            ? ((e = new Set(g.map(q))), (u[10] = g), (u[11] = e))
            : (e = u[11]),
            (l = e));
        }
        return l;
      },
    ],
    784521,
  );
  var D = e.i(917341),
    z = e.i(549613);
  let B = (e) => {
      if (null == e) return null;
      let t = e.trim();
      return "" === t ? null : t;
    },
    R = (e) => ("number" == typeof e && Number.isFinite(e) && e > 0 ? e : null),
    x = (e) => e.assetClass === D.R || null != e.collectible;
  e.s(
    [
      "$",
      0,
      x,
      "L",
      0,
      (e) => {
        let t = e.collectible ?? null;
        return {
          nftAddress: e.coinMint,
          name: B(t?.name),
          image: (0, z.G)(t?.provider, t?.imageUrl),
          grade: B(t?.grade),
          setName: B(t?.setName),
          status: B(t?.status)?.toLowerCase() ?? null,
          markUsd: R(t?.markUsd) ?? R(t?.insuredValueUsd),
          provider: B(t?.provider),
        };
      },
    ],
    622285,
  );
  let H = BigInt(1),
    L = (e) => {
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
        })(i) <= H
      );
    };
  async function O({ mints: e, endpoint: t, signal: n }) {
    let i = new Set();
    if (!t || 0 === e.length) return i;
    for (let r = 0; r < e.length; r += E.C) {
      let l = e.slice(r, r + E.C);
      try {
        let e = await fetch(t, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getMultipleAccounts",
            params: [
              l,
              { encoding: "base64", dataSlice: { offset: 36, length: 9 } },
            ],
          }),
          signal: n,
        });
        if (!e.ok) continue;
        let r = await e.json(),
          a = r?.result?.value;
        if (r?.error != null || !Array.isArray(a) || a.length !== l.length)
          continue;
        a.forEach((e, t) => {
          L(e) && i.add(l[t]);
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
      O,
      "f",
      0,
      function (e) {
        let t = new Set();
        for (let n of e ?? [])
          n.chainId !== E.S ||
            n.isNative ||
            x(n) ||
            n.coin ||
            null != n.tokenPriceUsd ||
            (n.valueUsd ?? 0) > 0 ||
            t.add(n.coinMint);
        return [...t];
      },
    ],
    973698,
  );
  let $ = new Set();
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          i,
          r,
          l,
          u,
          o,
          d = (0, a.c)(16),
          { mints: c, enabled: f } = e,
          m = void 0 === f || f;
        d[0] !== c ? ((n = [...c].sort()), (d[0] = c), (d[1] = n)) : (n = d[1]);
        let p = n;
        (d[2] !== p
          ? ((i = ["nftMints", p]), (d[2] = p), (d[3] = i))
          : (i = d[3]),
          d[4] !== m || d[5] !== p
            ? ((r = m && p.length > 0 && !!(0, s.L)()),
              (d[4] = m),
              (d[5] = p),
              (d[6] = r))
            : (r = d[6]),
          d[7] !== p
            ? ((l = (e) => {
                let { signal: t } = e;
                return O({ mints: p, endpoint: (0, s.L)(), signal: t });
              }),
              (d[7] = p),
              (d[8] = l))
            : (l = d[8]),
          d[9] !== i || d[10] !== r || d[11] !== l
            ? ((u = {
                queryKey: i,
                enabled: r,
                staleTime: 1 / 0,
                gcTime: 18e5,
                placeholderData: F.y,
                retry: !1,
                queryFn: l,
              }),
              (d[9] = i),
              (d[10] = r),
              (d[11] = l),
              (d[12] = u))
            : (u = d[12]));
        let { data: h } = (0, t.useQuery)(u);
        e: {
          let e;
          if (!h || 0 === p.length) {
            o = $;
            break e;
          }
          if (d[13] !== h || d[14] !== p) {
            for (let t of ((e = new Set()), p)) h.has(t) && e.add(t);
            ((d[13] = h), (d[14] = p), (d[15] = e));
          } else e = d[15];
          o = e;
        }
        return o;
      },
    ],
    364245,
  );
};
