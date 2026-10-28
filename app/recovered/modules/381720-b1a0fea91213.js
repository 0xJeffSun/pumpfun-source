// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var l = e.i(445242),
    t = e.i(352386),
    n = e.i(85324),
    s = e.i(345924),
    r = e.i(83421),
    i = e.i(251397);
  let u = (e) => ({
      subject: e,
      balance: { status: "unresolved" },
      sawHeld: !1,
      ledger: null,
      ledgerStatus: "idle",
      ledgerEmpty: !1,
      pairProvider: null,
      pendingFills: [],
      exit: null,
      transitionalZeroSince: null,
      lastKnownNetPnlUsd: null,
      lastResolvedBalance: null,
      poll: { reason: "none", attempt: 0, startedAt: null, gaveUp: null },
    }),
    o = (e) => e.subject.decimals ?? null,
    a = (e, l) =>
      null != e.ledger &&
      0 === e.pendingFills.length &&
      (0, i.c)(e.ledger, {
        exit: e.exit,
        now: l,
        transitionalZeroSince: e.transitionalZeroSince,
      }),
    d = (e, l) => {
      if ("error" === e.ledgerStatus) return "error";
      let { balance: t } = e;
      if ("resolved" !== t.status) return "none";
      if (e.pendingFills.length > 0) return "fill";
      let n = (0, r.J)(t) ?? 0,
        s = (0, i.K)(o(e), n, e.ledger?.amountHeld);
      return n > s
        ? null == e.ledger || e.ledger.reportsClosed
          ? "first-index"
          : "none"
        : null != e.exit
          ? a(e, l)
            ? "none"
            : "exit"
          : null != e.ledger && a(e, l)
            ? (0, i.B)(e.ledger, l, e.transitionalZeroSince)
              ? "cold-settle"
              : "none"
            : e.ledger?.reportsClosed === !0
              ? "cold-settle"
              : e.sawHeld && "idle" !== e.ledgerStatus
                ? "exit"
                : null != e.ledger &&
                    !e.ledger.reportsClosed &&
                    (e.ledger.amountHeld ?? 0) > 0
                  ? "cold-settle"
                  : "none";
    },
    c = (e, l) => {
      let t = d(e, l),
        { poll: n } = e;
      return t === n.reason
        ? e
        : "none" !== t && t === n.gaveUp
          ? "none" === n.reason
            ? e
            : { ...e, poll: { ...n, reason: "none", startedAt: null } }
          : {
              ...e,
              poll: {
                reason: t,
                attempt: 0,
                startedAt: "none" === t ? null : l,
                gaveUp: n.gaveUp,
              },
            };
    },
    f = (e) =>
      null == e.poll.gaveUp ? e : { ...e, poll: { ...e.poll, gaveUp: null } },
    m = (e, l) =>
      null != e &&
      e.source === l.source &&
      e.cursor.slot === l.cursor.slot &&
      ("cc" !== e.source || e.cursor.at === l.cursor.at) &&
      e.amountHeld === l.amountHeld &&
      e.remainingBasisUsd === l.remainingBasisUsd &&
      e.remainingBasisTokens === l.remainingBasisTokens &&
      e.realizedUsd === l.realizedUsd &&
      e.lifetimeSpentUsd === l.lifetimeSpentUsd &&
      e.lifetimeBoughtTokens === l.lifetimeBoughtTokens &&
      e.reportsClosed === l.reportsClosed &&
      e.hasTransfers === l.hasTransfers &&
      e.untrustedBasis === l.untrustedBasis &&
      e.untrustedUsdBasis === l.untrustedUsdBasis,
    p = (e, l, t) =>
      l > t ||
      e.every((e) => "sell" !== e.direction || null != e.chainTokensAfter)
        ? e
        : e.map((e) =>
            "sell" === e.direction && null == e.chainTokensAfter
              ? { ...e, chainTokensAfter: l }
              : e,
          ),
    g = (e) =>
      null != e.tokens && (e.sources.has("nats") || e.sources.has("ataDelta")),
    k = (e) => null != e.tokens && ("sell" === e.direction || g(e)),
    h = (e, l, t) => {
      let n = e?.lifetimeBoughtTokens ?? null,
        s = l.reduce(
          (e, l) =>
            "buy" !== l.direction || null == l.tokens
              ? e
              : e +
                (g(l) || l.sources.has("ataShare")
                  ? l.tokens
                  : 0.75 * l.tokens),
          0,
        );
      return {
        at: t,
        slotCursor: e?.cursor.slot ?? null,
        ccUpdatedAt: e?.source === "cc" ? e.cursor.at : null,
        lifetimeBoughtTokens: n,
        ledgerReportedClosed: e?.reportsClosed === !0,
        requiredLifetimeBoughtTokens: null == n ? (s > 0 ? s : null) : n + s,
      };
    },
    y = (e) => ({
      ...e,
      exit: null,
      pairProvider: null,
      transitionalZeroSince: null,
    }),
    v = (e) =>
      e.sources.has("ataDelta")
        ? 3
        : e.sources.has("nats")
          ? 2
          : +!!e.sources.has("ataShare"),
    U = (e, l, t, n) => {
      if (e.every((e) => null != e.chainTokensAfter)) return e;
      let s = t - l,
        r = (0, i.K)(n, t, l);
      if (Math.abs(s) <= r) return e;
      let u = [],
        o = 0,
        a = null;
      for (let t of e) {
        if (
          null == t.tokens ||
          (u.push(t),
          l + (o += "buy" === t.direction ? t.tokens : -t.tokens) < -r)
        )
          break;
        let e = u.filter((e) => !k(e)),
          n = 1 === e.length ? (e[0]?.tokens ?? 0) * 0.25 : 0,
          i = Math.abs(o - s);
        i <= r + n &&
          (null == a || i < a.residual) &&
          (a = { length: u.length, residual: i });
      }
      if (null == a) return e;
      let d = new Map(),
        c = l,
        f = !1;
      return (
        e.slice(0, a.length).forEach((e, l) => {
          c += "buy" === e.direction ? (e.tokens ?? 0) : -(e.tokens ?? 0);
          let n = l === a.length - 1;
          (null == e.chainTokensAfter && (n || !f) && d.set(e.key, n ? t : c),
            k(e) || (f = !0));
        }),
        e.map((e) => {
          let l = d.get(e.key);
          return null == l ? e : { ...e, chainTokensAfter: l };
        })
      );
    },
    T = (e, l, t, n, s) => {
      if (s - e.at >= i.A) return !0;
      let r = o(n);
      if (
        (0, i.X)(l, {
          fill: e,
          exit: n.exit,
          chainTokens: e.chainTokensAfter,
          decimals: r,
          now: s,
          transitionalZeroSince: n.transitionalZeroSince,
        })
      )
        return !0;
      if (
        m(n.ledger, l) ||
        t?.source !== "optimistic" ||
        null == t.amountHeld ||
        null == l.amountHeld
      )
        return !1;
      let u = (0, i.K)(r, l.amountHeld, t.amountHeld);
      return l.amountHeld > u && Math.abs(l.amountHeld - t.amountHeld) <= u;
    };
  e.s(
    [
      "P",
      0,
      d,
      "I",
      0,
      u,
      "Q",
      0,
      a,
      "G",
      0,
      (e, l) => {
        switch (l.type) {
          case "SUBJECT_CHANGED":
            return u({
              wallet: l.wallet,
              mint: l.mint,
              decimals:
                void 0 !== l.decimals
                  ? l.decimals
                  : l.mint === e.subject.mint
                    ? e.subject.decimals
                    : null,
            });
          case "BALANCE":
            return ((e, l, t) => {
              let n =
                  "resolved" === e.balance.status
                    ? e.balance
                    : (e.lastResolvedBalance ?? e.balance),
                s = (0, r.J)(n),
                u = (0, r.J)(l),
                a = o(e),
                d = (0, i.K)(a, u ?? s, e.ledger?.amountHeld),
                m = {
                  ...e,
                  balance: l,
                  lastResolvedBalance:
                    "resolved" === l.status
                      ? null
                      : "resolved" === e.balance.status
                        ? e.balance
                        : e.lastResolvedBalance,
                };
              if ("resolved" === l.status && null != u) {
                let r = "resolved" === n.status && (s ?? 0) <= d,
                  o = "resolved" === n.status && (s ?? 0) > d,
                  c = "resolved" !== n.status || n.raw !== l.raw || s !== u;
                (u > d
                  ? ((m = { ...m, sawHeld: !0 }),
                    c && (null != e.exit || r) && (m = f(y(m))))
                  : o &&
                    null == e.exit &&
                    (m = f({ ...m, exit: h(e.ledger, e.pendingFills, t) })),
                  "resolved" === n.status &&
                  n.raw !== l.raw &&
                  e.pendingFills.length > 0
                    ? (m = {
                        ...m,
                        pendingFills: ((e, l, t, n, s) => {
                          let r = e.filter((e) => null == e.chainTokensAfter);
                          if (0 === r.length || 0 === n) return e;
                          let u = (0, i.K)(s, t, l),
                            o = [],
                            a = 0,
                            d = null;
                          for (let e of r) {
                            if (null == e.tokens) break;
                            (o.push(e),
                              (a +=
                                "buy" === e.direction ? e.tokens : -e.tokens));
                            let l = o.filter((e) => !k(e)),
                              t = o.every(
                                (e) => e.direction === o[0]?.direction,
                              ),
                              s =
                                1 === l.length || t
                                  ? l.reduce(
                                      (e, l) => e + (l.tokens ?? 0) * 0.25,
                                      0,
                                    )
                                  : 0,
                              r = Math.abs(a - n);
                            !(r > u + s) &&
                              (null == d || r < d.residual) &&
                              (d = {
                                length: o.length,
                                cumulative: a,
                                residual: r,
                              });
                          }
                          if (null != d) {
                            ((o.length = d.length), (a = d.cumulative));
                            let s = o.filter((e) => !k(e)),
                              r = s.reduce((e, l) => e + (l.tokens ?? 0), 0),
                              i =
                                s.length > 1 && r > 0
                                  ? (r +
                                      (o[0]?.direction === "buy" ? 1 : -1) *
                                        (n - a)) /
                                    r
                                  : 1,
                              u = new Map();
                            for (let e of o)
                              if (1 === s.length && e === s[0]) {
                                let l =
                                  ("buy" === e.direction
                                    ? (e.tokens ?? 0)
                                    : -(e.tokens ?? 0)) +
                                  (n - a);
                                u.set(e.key, {
                                  ...e,
                                  tokens: Math.abs(l),
                                  sources: new Set([...e.sources, "ataDelta"]),
                                });
                              } else
                                s.length > 1 && !k(e) && i > 0
                                  ? u.set(e.key, {
                                      ...e,
                                      tokens: (e.tokens ?? 0) * i,
                                      sources: new Set([
                                        ...e.sources,
                                        "ataShare",
                                      ]),
                                    })
                                  : u.set(e.key, e);
                            let c = l,
                              f = new Map();
                            for (let e of o) {
                              let l = u.get(e.key) ?? e;
                              ((c +=
                                "buy" === l.direction
                                  ? (l.tokens ?? 0)
                                  : -(l.tokens ?? 0)),
                                f.set(e.key, c));
                            }
                            let m = o[o.length - 1];
                            return (
                              null != m && f.set(m.key, t),
                              e.map((e) => {
                                let l = f.get(e.key);
                                return null == l
                                  ? e
                                  : {
                                      ...(u.get(e.key) ?? e),
                                      chainTokensAfter: l,
                                    };
                              })
                            );
                          }
                          let c = n > 0 ? "buy" : "sell",
                            f = r.filter((e) => e.direction === c),
                            m = f.find((e) => {
                              if (null == e.tokens) return !1;
                              let l = k(e) ? 0 : 0.25 * e.tokens;
                              return Math.abs(Math.abs(n) - e.tokens) <= u + l;
                            }),
                            p = m ?? f[0];
                          if (null == p) return e;
                          let g =
                            null == m || k(m)
                              ? p
                              : {
                                  ...m,
                                  tokens: Math.abs(n),
                                  sources: new Set([...m.sources, "ataDelta"]),
                                };
                          return e.map((e) =>
                            e.key === p.key ? { ...g, chainTokensAfter: t } : e,
                          );
                        })(e.pendingFills, s ?? 0, u, l.tokens - n.tokens, a),
                      })
                    : "resolved" !== n.status &&
                      e.pendingFills.length > 0 &&
                      e.ledger?.amountHeld != null &&
                      (m = {
                        ...m,
                        pendingFills: U(
                          e.pendingFills,
                          e.ledger.amountHeld,
                          u,
                          a,
                        ),
                      }),
                  (m = { ...m, pendingFills: p(m.pendingFills, u, d) }));
              }
              return c(m, t);
            })(e, l.balance, l.now);
          case "LEDGER_LOADING":
            return "loading" === e.ledgerStatus
              ? e
              : { ...e, ledgerStatus: "loading" };
          case "LEDGER_OK":
            return ((e, l, t) => {
              if (
                null != e.pairProvider &&
                l.source !== e.pairProvider &&
                e.ledger?.source === e.pairProvider &&
                a(e, t)
              )
                return c({ ...e, ledgerStatus: "ok" }, t);
              let n = (0, r.i)(e, null),
                s = (0, r.J)(e.balance),
                u = e.pendingFills.filter((e) => t - e.at < i.A);
              for (let r = 0; r < 4; r += 1) {
                let r =
                    null != s && null != l.amountHeld
                      ? U(u, l.amountHeld, s, o(e))
                      : u,
                  i = { ...e, pendingFills: r },
                  a = r.filter((e) => !T(e, l, n, i, t)),
                  d = a.length !== u.length || a.some((e, l) => e !== u[l]);
                if (((u = a), !d)) break;
              }
              let d = u.reduce(
                  (e, l) =>
                    null == l.tokens
                      ? e
                      : e + ("buy" === l.direction ? l.tokens : -l.tokens),
                  0,
                ),
                p = u.some((e) => {
                  let t = (0, i.F)(e.slot);
                  return (
                    null != t &&
                    null != l.cursor.slot &&
                    0 > (0, i.t)(l.cursor.slot, t)
                  );
                }),
                g =
                  !m(e.ledger, l) &&
                  u.length > 0 &&
                  u.every((e) => null != e.chainTokensAfter) &&
                  !p &&
                  null != s &&
                  "resolved" === e.balance.status &&
                  void 0 !== e.balance.offAtaTokens &&
                  null != l.amountHeld &&
                  Math.abs(d) > (0, i.K)(o(e), s, l.amountHeld) &&
                  Math.abs(l.amountHeld - s) <= (0, i.K)(o(e), s, l.amountHeld)
                    ? []
                    : u,
                k = l.transitionalZero ? (e.transitionalZeroSince ?? t) : null,
                h = {
                  ...e,
                  ledger: l,
                  ledgerStatus: "ok",
                  ledgerEmpty: !1,
                  pendingFills: g,
                  transitionalZeroSince: k,
                },
                y = m(e.ledger, l) ? h : f(h);
              return c(
                (0 === g.length &&
                  (0, i.X)(l, {
                    exit: e.exit,
                    chainTokens: (0, r.J)(e.balance),
                    decimals: o(e),
                    now: t,
                    transitionalZeroSince: k,
                  })) ||
                  null == e.pairProvider
                  ? { ...y, pairProvider: l.source }
                  : y,
                t,
              );
            })(e, l.ledger, l.now);
          case "LEDGER_EMPTY":
            if (null != e.ledger)
              return c(
                "ok" === e.ledgerStatus ? e : { ...e, ledgerStatus: "ok" },
                l.now,
              );
            return c(
              {
                ...e,
                ledger: null,
                ledgerStatus: "ok",
                ledgerEmpty: !0,
                transitionalZeroSince: null,
              },
              l.now,
            );
          case "LEDGER_ERROR":
            return c({ ...e, ledgerStatus: "error" }, l.now);
          case "OWN_FILL":
            return ((e, l, t) => {
              let n,
                u,
                a,
                d = o(e),
                m = (0, r.J)(e.balance),
                g = e.pendingFills.find((e) => e.key === l.key),
                U = (0, s.f)(
                  e.ledger,
                  e.pendingFills.filter((e) => e.key !== l.key),
                  { priceUsd: l.priceUsd, decimals: d },
                ),
                T =
                  e.pendingFills.findLast(
                    (e) => e.key !== l.key && null != e.chainTokensAfter,
                  )?.chainTokensAfter ??
                  e.ledger?.amountHeld ??
                  (e.ledgerEmpty ? 0 : null),
                b = ((e, l, t, n, s) => {
                  if (
                    null != e.chainTokensAfter ||
                    null == l ||
                    null == e.tokens
                  )
                    return e;
                  if (
                    null != t &&
                    Math.abs(
                      l - ("buy" === e.direction ? t + e.tokens : t - e.tokens),
                    ) <= (0, i.K)(s, l, t)
                  )
                    return { ...e, chainTokensAfter: l };
                  if (null == n) return e;
                  let r = l - n;
                  if (("buy" === e.direction) != r > 0) return e;
                  let u = k(e),
                    o = (0, i.K)(s, l, n) + (u ? 0 : 0.25 * e.tokens);
                  return Math.abs(Math.abs(r) - e.tokens) > o
                    ? e
                    : u
                      ? { ...e, chainTokensAfter: l }
                      : {
                          ...e,
                          tokens: Math.abs(r),
                          chainTokensAfter: l,
                          sources: new Set([...e.sources, "ataDelta"]),
                        };
                })(
                  g
                    ? ((n = l.sources.has("nats")),
                      (u = v(l) > v(g)),
                      (a =
                        "buy" === g.direction
                          ? l.sources.has("tradeSuccess") &&
                            !g.sources.has("tradeSuccess")
                          : n),
                      {
                        key: g.key,
                        direction: g.direction,
                        tokens: u
                          ? (l.tokens ?? g.tokens)
                          : (g.tokens ?? l.tokens),
                        usd: a ? (l.usd ?? g.usd) : (g.usd ?? l.usd),
                        priceUsd: n
                          ? (l.priceUsd ?? g.priceUsd)
                          : (g.priceUsd ?? l.priceUsd),
                        slot: n ? (l.slot ?? g.slot) : (g.slot ?? l.slot),
                        at: Math.min(g.at, l.at),
                        chainTokensAfter:
                          g.chainTokensAfter ?? l.chainTokensAfter,
                        sources: new Set([...g.sources, ...l.sources]),
                      })
                    : l,
                  m,
                  U?.amountHeld,
                  T,
                  d,
                ),
                B = p(
                  g
                    ? e.pendingFills.map((e) => (e.key === l.key ? b : e))
                    : [...e.pendingFills, b],
                  m ?? 1 / 0,
                  (0, i.K)(d, m, e.ledger?.amountHeld),
                ),
                A = f({ ...e, pendingFills: B });
              if ("buy" === l.direction) null != e.exit && (A = y(A));
              else {
                let n = (0, r.i)(A, l.priceUsd),
                  s = (0, i.K)(d, m, e.ledger?.amountHeld),
                  u =
                    null == e.ledger ||
                    !(e.ledger.reportsClosed && null != m && m > s),
                  o = B.reduce(
                    (e, l) =>
                      l.key === b.key ||
                      null != l.chainTokensAfter ||
                      null == l.tokens
                        ? e
                        : e + ("buy" === l.direction ? l.tokens : -l.tokens),
                    0,
                  );
                ((null != b.chainTokensAfter && b.chainTokensAfter <= s) ||
                  (u
                    ? n?.source === "optimistic" &&
                      null != n.amountHeld &&
                      n.amountHeld <= s
                    : null != m &&
                      null != b.tokens &&
                      m + o - b.tokens <= s)) &&
                  null == e.exit &&
                  (A = { ...A, exit: h(e.ledger, B, t) });
              }
              return c(A, t);
            })(e, l.fill, l.now);
          case "POLL_TICK":
            return { ...e, poll: { ...e.poll, attempt: e.poll.attempt + 1 } };
          case "POLL_GIVE_UP":
            return "none" === e.poll.reason
              ? e
              : {
                  ...e,
                  poll: {
                    ...e.poll,
                    reason: "none",
                    startedAt: null,
                    gaveUp: e.poll.reason,
                  },
                };
          case "VIEW_SHOWN":
            return null == l.netPnlUsd || l.netPnlUsd === e.lastKnownNetPnlUsd
              ? e
              : { ...e, lastKnownNetPnlUsd: l.netPnlUsd };
          default:
            throw Error(`Unhandled position event: ${JSON.stringify(l)}`);
        }
      },
    ],
    855914,
  );
  let b = [500, 1e3, 2e3],
    B = [5e3, 1e4, 2e4, 3e4],
    A = (e) => b[e] ?? 4e3,
    w = (e, l, t) =>
      e < t ? { kind: "tick", delayMs: l } : { kind: "give-up", delayMs: l },
    H = (e, l) => {
      switch (e) {
        case "none":
        default:
          return null;
        case "first-index": {
          let e = ((e) => {
              let l = 0;
              for (let t = 0; t < e; t += 1) l += A(t);
              return l;
            })(l),
            t = A(l);
          return e + t <= 6e4
            ? { kind: "tick", delayMs: t }
            : { kind: "give-up", delayMs: Math.max(0, 6e4 - e) };
        }
        case "fill":
          return w(l, 0 === l ? 1e3 : 2e3, 15);
        case "exit":
          return w(l, 2e3, 15);
        case "cold-settle":
          return w(l, 2e3, 5);
        case "error":
          return {
            kind: "tick",
            delayMs: B[Math.min(l, B.length - 1)] ?? B[0],
          };
      }
    },
    E = (e) => {
      let { balance: l } = e;
      if ("resolved" !== l.status) return !1;
      let t = (0, r.J)(l) ?? 0;
      return t > (0, i.K)(e.subject.decimals, t, e.ledger?.amountHeld);
    };
  e.s(
    [
      "z",
      0,
      3e4,
      "c",
      0,
      (e) => {
        let s,
          r,
          i,
          u,
          o,
          c,
          f,
          m = (0, l.c)(24),
          { state: p, now: g, onTick: k, onGiveUp: h } = e,
          { reason: y, attempt: v } = p.poll,
          U = "none" !== y && d(p, g) === y ? y : "none",
          T = (0, n.W)();
        m[0] !== k
          ? ((s = () => {
              k(Date.now());
            }),
            (m[0] = k),
            (m[1] = s))
          : (s = m[1]);
        let b = (0, t.useEffectEvent)(s);
        m[2] !== h
          ? ((r = () => {
              h(Date.now());
            }),
            (m[2] = h),
            (m[3] = r))
          : (r = m[3]);
        let B = (0, t.useEffectEvent)(r);
        (m[4] !== v || m[5] !== T || m[6] !== B || m[7] !== U || m[8] !== b
          ? ((i = () => {
              if (!T) return;
              let e = H(U, v);
              if (null == e) return;
              let l = setTimeout(() => {
                "tick" === e.kind ? b() : B();
              }, e.delayMs);
              return () => clearTimeout(l);
            }),
            (m[4] = v),
            (m[5] = T),
            (m[6] = B),
            (m[7] = U),
            (m[8] = b),
            (m[9] = i))
          : (i = m[9]),
          m[10] !== v || m[11] !== T || m[12] !== U
            ? ((u = [T, U, v]),
              (m[10] = v),
              (m[11] = T),
              (m[12] = U),
              (m[13] = u))
            : (u = m[13]),
          (0, t.useEffect)(i, u),
          m[14] !== v || m[15] !== U
            ? ((o = H(U, v)), (m[14] = v), (m[15] = U), (m[16] = o))
            : (o = m[16]));
        let A = o;
        if (m[17] !== g || m[18] !== p || m[19] !== A)
          ((c =
            null != A
              ? "tick" === A.kind && A.delayMs
              : !!(
                  E(p) ||
                  (!E(p) &&
                    "resolved" === p.balance.status &&
                    (null != p.exit || p.sawHeld) &&
                    (null == p.ledger || !a(p, g)))
                ) && 3e4),
            (m[17] = g),
            (m[18] = p),
            (m[19] = A),
            (m[20] = c));
        else c = m[20];
        let w = c,
          _ = "exit" === U || "cold-settle" === U;
        return (
          m[21] !== _ || m[22] !== w
            ? ((f = { v2RefetchInterval: w, armCc: _ }),
              (m[21] = _),
              (m[22] = w),
              (m[23] = f))
            : (f = m[23]),
          f
        );
      },
    ],
    381720,
  );
};
