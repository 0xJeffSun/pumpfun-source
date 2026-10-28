// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    l = e.i(78436),
    n = e.i(634103),
    a = e.i(362324),
    i = e.i(526080);
  function s(e, t) {
    if (!Number.isFinite(e) || 0 === e || t < 1) return e;
    let r = Math.floor(Math.log10(Math.abs(e))),
      l = 10 ** (r - t + 1);
    return Math.round(e / l) * l;
  }
  e.s(["f", 0, s], 789793);
  var u = e.i(646908);
  let o = (e) => {
    if (!e) return 0;
    let t = Number(e.circulatingSupply);
    if (Number.isFinite(t) && t > 0) return t;
    let r = Number(e.totalSupply);
    return Number.isFinite(r) && r > 0 ? r : 0;
  };
  e.s(["f", 0, o], 532895);
  var c = e.i(653805),
    d = e.i(605587);
  let f = (e) => e.toLowerCase(),
    p = (0, l.$)()(
      (0, n.u)((e) => ({
        byMint: {},
        register: (t, r) =>
          e((e) => {
            let l,
              n,
              a = f(t),
              i = e.byMint[a],
              s = { ...i, ...r };
            return i &&
              i.codexSupply === s.codexSupply &&
              ((l = i.ladderSupply) === (n = s.ladderSupply) ||
                (void 0 !== l &&
                  void 0 !== n &&
                  Math.abs(l - n) <= 1e-6 * Math.max(Math.abs(l), Math.abs(n))))
              ? e
              : { byMint: { ...e.byMint, [a]: s } };
          }),
      })),
    ),
    m = (e) => "number" == typeof e && Number.isFinite(e) && e > 0,
    h = (e) => p.getState().byMint[f(e)],
    b = (e) => {
      let r,
        l = (0, t.c)(2);
      return (
        l[0] !== e
          ? ((r = (t) => t.byMint[f(e)]), (l[0] = e), (l[1] = r))
          : (r = l[1]),
        p(r)
      );
    },
    g = (e, t) => {
      m(t) && p.getState().register(e, { codexSupply: t });
    },
    y = (e, t) => {
      m(t) && p.getState().register(e, { ladderSupply: t });
    },
    v = (e) =>
      e && (0, d.N)({ mint: e.mint, chainId: e.chain_id }) && (0, i.u)(e)
        ? (0, i.B)(e)
        : 0,
    S = ({ restMarketCap: e, basis: t }) =>
      m(e) && m(t?.codexSupply) && m(t?.ladderSupply)
        ? (e * t.codexSupply) / t.ladderSupply
        : e,
    x = ({ row: e, basis: t }) => {
      if (e && m(e.usdMarketCap))
        return m(e.priceUsd) && m(t?.codexSupply)
          ? e.priceUsd * t.codexSupply
          : e.isLiveData
            ? e.usdMarketCap
            : S({ restMarketCap: e.usdMarketCap, basis: t });
    },
    w = new Map(),
    N = new Set(),
    E = new Map(),
    M = null,
    I = async (e) => {
      let t = e.map((e) => f(e.mint));
      for (let e of t) N.add(e);
      try {
        let r = new Set(e.map((e) => (0, u.U)(e.chainId) ?? void 0)),
          l = 1 === r.size ? [...r][0] : void 0,
          n = await fetch("/api/relay/rpc/tokens/batch", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(
              l ? { addresses: t, chain: l } : { addresses: t },
            ),
          });
        if (!n.ok) throw Error(`tokens/batch ${n.status}`);
        let a = await n.json(),
          i = new Set();
        for (let e of a.tokens ?? []) {
          let t = o(e);
          m(t) && (g(e.address, t), i.add(f(e.address)));
        }
        let s = Date.now() + 6e5;
        for (let e of t) i.has(e) || E.set(e, s);
      } catch {
        let e = Date.now() + 6e4;
        for (let r of t) E.set(r, e);
      } finally {
        for (let e of t) N.delete(e);
      }
    },
    O = () => {
      M = null;
      let e = [...w.values()];
      w.clear();
      for (let t = 0; t < e.length; t += 50) I(e.slice(t, t + 50));
    },
    T = (e) => {
      let t = p.getState().byMint,
        r = Date.now();
      for (let l of e) {
        if (!l.mint || !(0, d.N)({ mint: l.mint, chainId: l.chainId }))
          continue;
        let e = f(l.mint);
        if (m(t[e]?.codexSupply) || N.has(e) || w.has(e)) continue;
        let n = E.get(e);
        (void 0 !== n && n > r) || w.set(e, l);
      }
      w.size > 0 && null === M && (M = setTimeout(O, 25));
    },
    _ = (e) => {
      let l,
        n,
        a,
        i = (0, t.c)(5);
      i[0] !== e
        ? ((l = e
            .filter(
              (e) => e.mint && (0, d.N)({ mint: e.mint, chainId: e.chainId }),
            )
            .map((e) => `${f(e.mint)}|${e.chainId ?? ""}`)
            .sort()
            .join(",")),
          (i[0] = e),
          (i[1] = l))
        : (l = i[1]);
      let s = l;
      (i[2] !== s
        ? ((n = () => {
            T(
              "" === s
                ? []
                : s.split(",").map((e) => {
                    let [t, r] = e.split("|");
                    return { mint: t, chainId: r || void 0 };
                  }),
            );
          }),
          (a = [s]),
          (i[2] = s),
          (i[3] = n),
          (i[4] = a))
        : ((n = i[3]), (a = i[4])),
        (0, r.useEffect)(n, a));
    },
    j = (e) => {
      let l,
        n,
        a,
        i = (0, t.c)(5);
      i[0] !== e
        ? ((l = e.map(D).join(",")), (i[0] = e), (i[1] = l))
        : (l = i[1]);
      let s = l;
      (i[2] !== s
        ? ((n = () => {
            if ("" !== s)
              for (let e of s.split(",")) {
                let [t, r] = e.split("|");
                y(t, Number(r));
              }
          }),
          (a = [s]),
          (i[2] = s),
          (i[3] = n),
          (i[4] = a))
        : ((n = i[3]), (a = i[4])),
        (0, r.useEffect)(n, a));
    },
    R = (e) => {
      let l,
        n,
        a,
        i,
        s,
        u = (0, t.c)(14),
        { mint: o, chainId: c, coin: f } = e;
      u[0] !== c || u[1] !== o
        ? ((l = (0, d.N)({ mint: o, chainId: c })),
          (u[0] = c),
          (u[1] = o),
          (u[2] = l))
        : (l = u[2]);
      let p = l,
        m = b(o);
      u[3] !== f ? ((n = v(f)), (u[3] = f), (u[4] = n)) : (n = u[4]);
      let h = n;
      return (
        u[5] !== c || u[6] !== p || u[7] !== h || u[8] !== o
          ? ((a = () => {
              p && (y(o, h), T([{ mint: o, chainId: c }]));
            }),
            (i = [p, o, c, h]),
            (u[5] = c),
            (u[6] = p),
            (u[7] = h),
            (u[8] = o),
            (u[9] = a),
            (u[10] = i))
          : ((a = u[9]), (i = u[10])),
        (0, r.useEffect)(a, i),
        u[11] !== m || u[12] !== p
          ? ((s = { isEvm: p, basis: m }),
            (u[11] = m),
            (u[12] = p),
            (u[13] = s))
          : (s = u[13]),
        s
      );
    },
    k = ({ isEvm: e, row: t, basis: r, fallbackMarketCap: l }) => {
      let n = m(l) ? l : void 0;
      if (!e) return m(t?.usdMarketCap) ? t.usdMarketCap : n;
      let a = x({ row: t, basis: r });
      return void 0 !== a
        ? a
        : void 0 === n
          ? void 0
          : S({ restMarketCap: n, basis: r });
    },
    A = ({ coin: e, basis: t }) =>
      (0, d.N)({ mint: e.mint, chainId: e.chain_id })
        ? m(t?.codexSupply)
          ? t.codexSupply
          : (0, i.u)(e)
            ? (0, i.B)(e)
            : 0
        : (0, i.B)(e),
    C = (e) => {
      let r,
        l = (0, t.c)(4),
        n = e?.mint ?? "",
        a = e?.chain_id;
      l[0] !== e || l[1] !== n || l[2] !== a
        ? ((r = { mint: n, chainId: a, coin: e }),
          (l[0] = e),
          (l[1] = n),
          (l[2] = a),
          (l[3] = r))
        : (r = l[3]);
      let { isEvm: i, basis: s } = R(r);
      return i ? s : void 0;
    };
  function D(e) {
    return `${f(e.mint)}|${v(e)}`;
  }
  function q(e) {
    return e.mint;
  }
  function U(e) {
    return e.coin && (0, d.N)({ mint: e.mint, chainId: e.chainId })
      ? [e.coin]
      : [];
  }
  e.s(
    [
      "g",
      0,
      ({ priceUsd: e, wireMarketCap: t, basis: r }) =>
        m(e) && m(r?.codexSupply) ? e * r.codexSupply : t,
      "W",
      0,
      x,
      "l",
      0,
      h,
      "X",
      0,
      A,
      "y",
      0,
      ({ mint: e, chainId: t, fallbackMarketCap: r }) =>
        k({
          isEvm: (0, d.N)({ mint: e, chainId: t }),
          row: c.x.getState().coins[e],
          basis: h(e),
          fallbackMarketCap: r,
        }),
      "H",
      0,
      ({ mint: e, priceUsd: t, marketCapUsd: r }) => {
        !(0, d.N)({ mint: e }) || (m(t) && m(r) && y(e, r / t));
      },
      "z",
      0,
      S,
      "h",
      0,
      (e) => {
        let r,
          l,
          n = (0, t.c)(9),
          { mint: a, chainId: i, fallbackMarketCap: s, coin: u } = e;
        n[0] !== i || n[1] !== u || n[2] !== a
          ? ((r = { mint: a, chainId: i, coin: u }),
            (n[0] = i),
            (n[1] = u),
            (n[2] = a),
            (n[3] = r))
          : (r = n[3]);
        let { isEvm: o, basis: d } = R(r),
          f = (0, c.F)(a);
        return (
          n[4] !== d || n[5] !== s || n[6] !== o || n[7] !== f
            ? ((l = k({ isEvm: o, row: f, basis: d, fallbackMarketCap: s })),
              (n[4] = d),
              (n[5] = s),
              (n[6] = o),
              (n[7] = f),
              (n[8] = l))
            : (l = n[8]),
          l
        );
      },
      "P",
      0,
      (e) => {
        let r,
          l,
          n = (0, t.c)(9),
          { mint: a, chainId: i, coin: s, row: u, fallbackMarketCap: o } = e;
        n[0] !== i || n[1] !== s || n[2] !== a
          ? ((r = { mint: a, chainId: i, coin: s }),
            (n[0] = i),
            (n[1] = s),
            (n[2] = a),
            (n[3] = r))
          : (r = n[3]);
        let { isEvm: c, basis: d } = R(r);
        return (
          n[4] !== d || n[5] !== o || n[6] !== c || n[7] !== u
            ? ((l = k({ isEvm: c, row: u, basis: d, fallbackMarketCap: o })),
              (n[4] = d),
              (n[5] = o),
              (n[6] = c),
              (n[7] = u),
              (n[8] = l))
            : (l = n[8]),
          l
        );
      },
      "F",
      0,
      (e) => {
        let r,
          l,
          n,
          i,
          s = (0, t.c)(13);
        s[0] !== e ? ((r = e.map(q)), (s[0] = e), (s[1] = r)) : (r = s[1]);
        let u = r,
          o = (0, c.k)(u);
        s[2] !== u
          ? ((l = (e) => u.map((t) => e.byMint[f(t)])), (s[2] = u), (s[3] = l))
          : (l = s[3]);
        let m = p((0, a.f)(l));
        s[4] !== e ? ((n = e.flatMap(U)), (s[4] = e), (s[5] = n)) : (n = s[5]);
        let h = n;
        if ((_(e), j(h), s[6] !== m || s[7] !== e || s[8] !== o)) {
          let t;
          (s[10] !== m || s[11] !== o
            ? ((t = (e, t) =>
                k({
                  isEvm: (0, d.N)({ mint: e.mint, chainId: e.chainId }),
                  row: o[t],
                  basis: m[t],
                  fallbackMarketCap: e.fallbackMarketCap,
                })),
              (s[10] = m),
              (s[11] = o),
              (s[12] = t))
            : (t = s[12]),
            (i = e.map(t)),
            (s[6] = m),
            (s[7] = e),
            (s[8] = o),
            (s[9] = i));
        } else i = s[9];
        return i;
      },
      "b",
      0,
      (e) => {
        let r,
          l = (0, t.c)(3),
          n = C(e);
        return e
          ? (l[0] !== n || l[1] !== e
              ? ((r = A({ coin: e, basis: n }) || (0, i.B)(e)),
                (l[0] = n),
                (l[1] = e),
                (l[2] = r))
              : (r = l[2]),
            r)
          : 0;
      },
      "c",
      0,
      _,
      "k",
      0,
      b,
      "n",
      0,
      p,
      "_",
      0,
      j,
      "O",
      0,
      (e) => {
        let r,
          l,
          n = (0, t.c)(7),
          { mint: a, chainId: i, coin: s } = e;
        n[0] !== i || n[1] !== s || n[2] !== a
          ? ((r = { mint: a, chainId: i, coin: s }),
            (n[0] = i),
            (n[1] = s),
            (n[2] = a),
            (n[3] = r))
          : (r = n[3]);
        let { isEvm: u, basis: o } = R(r);
        return (
          n[4] !== o || n[5] !== u
            ? ((l = (e) => (u && m(e) ? S({ restMarketCap: e, basis: o }) : e)),
              (n[4] = o),
              (n[5] = u),
              (n[6] = l))
            : (l = n[6]),
          l
        );
      },
      "I",
      0,
      (e) => {
        let r,
          l,
          n = (0, t.c)(10),
          {
            mint: a,
            chainId: i,
            fallbackMarketCap: u,
            coin: o,
            significantDigits: d,
          } = e;
        n[0] !== i || n[1] !== o || n[2] !== a
          ? ((r = { mint: a, chainId: i, coin: o }),
            (n[0] = i),
            (n[1] = o),
            (n[2] = a),
            (n[3] = r))
          : (r = n[3]);
        let { isEvm: f, basis: p } = R(r);
        return (
          n[4] !== p || n[5] !== u || n[6] !== f || n[7] !== a || n[8] !== d
            ? ((l = (e) => {
                let t = k({
                  isEvm: f,
                  row: e.coins[a],
                  basis: p,
                  fallbackMarketCap: u,
                });
                return void 0 === t ? void 0 : s(t, d);
              }),
              (n[4] = p),
              (n[5] = u),
              (n[6] = f),
              (n[7] = a),
              (n[8] = d),
              (n[9] = l))
            : (l = n[9]),
          (0, c.x)(l)
        );
      },
      "m",
      0,
      C,
    ],
    662093,
  );
};
