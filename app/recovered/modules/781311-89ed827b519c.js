// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(584229),
    n = e.i(896545);
  let i = n.K + 2,
    l = (e) => {
      if (!Number.isFinite(e) || e <= 0) return;
      let [t = "0", r = ""] = e.toFixed(i).split("."),
        l = r.slice(0, n.K).replace(/0+$/, ""),
        a = 0 === l.length ? t : `${t}.${l}`;
      return "0" === a ? void 0 : a;
    },
    a = (e) => {
      let t = 0,
        r = !1;
      for (let n of e) {
        if (void 0 === n) continue;
        let e = Number(n);
        Number.isFinite(e) && !(e <= 0) && ((t += e), (r = !0));
      }
      return r ? l(t) : void 0;
    };
  e.s(
    [
      "o",
      0,
      (e) => {
        if (void 0 === e) return;
        let t = Number(e.totalSz),
          r = Number(e.avgPx);
        if (Number.isFinite(t) && Number.isFinite(r)) return l(t * r);
      },
      "a",
      0,
      l,
      "g",
      0,
      a,
    ],
    139271,
  );
  var s = e.i(791175);
  let o = "perp-payout-owed-v1",
    u = { owed: {}, lastSeq: 0 },
    d = new Set(),
    c = () => {
      try {
        return window.localStorage;
      } catch {
        return null;
      }
    },
    m = () => {
      let e = c()?.getItem(o);
      if (!e) return u;
      let t = JSON.parse(e);
      return "object" == typeof t &&
        null !== t &&
        "object" == typeof t.owed &&
        "number" == typeof t.lastSeq
        ? t
        : u;
    },
    p = (e) => {
      for (let t of (c()?.setItem(o, JSON.stringify(e)), d)) t();
    },
    f = (e) => (e ? (m().owed[e.trim()] ?? null) : null),
    _ = (e, t, r) => {
      let n = m(),
        i = e.trim(),
        l = n.owed[i];
      if (!l || l.evmWallet.toLowerCase() !== t.toLowerCase()) return null;
      let a = l.marks.filter((e) => r.includes(e.seq));
      if (0 === a.length) return null;
      let s = l.marks.filter((e) => !r.includes(e.seq)),
        { [i]: o, ...u } = n.owed;
      return (
        p({
          lastSeq: n.lastSeq,
          owed: 0 === s.length ? u : { ...u, [i]: { ...l, marks: s } },
        }),
        { removed: a, left: s.length }
      );
    },
    v = new Set(),
    g = (e, n, i) => {
      t.y.warn(`[perpPayoutOwed] ${e}_failed`, {
        evm_wallet: n.evmWallet,
        error: (0, r.A)(i),
      });
    },
    h = (e, { removed: r, left: n }, i, l) => {
      let a = r[r.length - 1],
        s = r[0];
      t.y.info("perp_payout_owed_cleared", {
        evm_wallet: e.evmWallet,
        reason: i,
        coin: a.coin,
        denomination: a.denominationOut,
        owed_seq: a.seq,
        owed_marks: r.length,
        owed_left: n,
        owed_age_ms: Date.now() - s.markedAt,
        ...l,
      });
    };
  e.s(
    [
      "N",
      0,
      (e, r, n) => {
        try {
          var i, l;
          let a,
            s,
            o,
            u,
            d,
            c,
            f =
              ((i = e.solanaWallet),
              (l = { evmWallet: e.evmWallet, coin: r, denominationOut: n }),
              (o = {
                seq: (s = (a = m()).lastSeq + 1),
                coin: l.coin,
                denominationOut: l.denominationOut,
                markedAt: Date.now(),
              }),
              (u = i.trim()),
              (c =
                (d = a.owed[u]) &&
                d.evmWallet.toLowerCase() === l.evmWallet.toLowerCase()
                  ? [...d.marks, o]
                  : [o]),
              p({
                lastSeq: s,
                owed: {
                  ...a.owed,
                  [u]: { evmWallet: l.evmWallet, marks: c, attempts: 0 },
                },
              }),
              o);
          return (
            v.add(f.seq),
            t.y.info("perp_payout_owed_marked", {
              evm_wallet: e.evmWallet,
              coin: r,
              denomination: n,
              owed_seq: f.seq,
            }),
            f.seq
          );
        } catch (t) {
          g("mark", e, t);
          return;
        }
      },
      "a",
      0,
      (e) => {
        let t = m(),
          { [e.trim()]: r, ...n } = t.owed;
        p({ lastSeq: t.lastSeq, owed: n });
      },
      "G",
      0,
      (e, t, r, n = {}) => {
        if (void 0 !== t) {
          if ((v.delete(t), "filled" === r && void 0 !== n.closeNotionalUsdc))
            try {
              var i, l, a, s;
              let r, o, u;
              ((i = e.solanaWallet),
                (l = e.evmWallet),
                (a = t),
                (s = n.closeNotionalUsdc),
                (r = m()),
                (o = i.trim()),
                (u = r.owed[o]) &&
                  u.evmWallet.toLowerCase() === l.toLowerCase() &&
                  u.marks.some((e) => e.seq === a) &&
                  p({
                    lastSeq: r.lastSeq,
                    owed: {
                      ...r.owed,
                      [o]: {
                        ...u,
                        marks: u.marks.map((e) =>
                          e.seq === a ? { ...e, closeNotionalUsdc: s } : e,
                        ),
                      },
                    },
                  }));
            } catch (t) {
              g("notional", e, t);
            }
          if ("filled" !== r && "unknown" !== r)
            try {
              let n = _(e.solanaWallet, e.evmWallet, [t]);
              if (null === n) return;
              h(
                e,
                n,
                "partial" === r ? "close_partial" : "close_not_filled",
                {},
              );
            } catch (t) {
              g("unmark", e, t);
            }
        }
      },
      "Y",
      0,
      f,
      "J",
      0,
      (e) => e.marks[e.marks.length - 1],
      "H",
      0,
      (e, t) => {
        let r = m(),
          n = e.trim(),
          i = r.owed[n];
        if (!i) return null;
        let l = i.attempts + 1;
        return (
          p({
            lastSeq: r.lastSeq,
            owed: { ...r.owed, [n]: { ...i, attempts: l, lastAttemptAt: t } },
          }),
          { attempts: l }
        );
      },
      "O",
      0,
      (e, t) => {
        let r = m(),
          n = e.trim(),
          i = r.owed[n];
        if (!i) return !1;
        let l = i.loggedSkips ?? [];
        return (
          !l.includes(t) &&
          (p({
            lastSeq: r.lastSeq,
            owed: { ...r.owed, [n]: { ...i, loggedSkips: [...l, t] } },
          }),
          !0)
        );
      },
      "L",
      0,
      (e) => {
        try {
          let t = f(e.solanaWallet);
          if (null === t) return;
          let r = t.marks.map((e) => e.seq).filter((e) => !v.has(e));
          return 0 === r.length ? void 0 : r;
        } catch (t) {
          g("read", e, t);
          return;
        }
      },
      "m",
      0,
      (e, t, r) => {
        if (void 0 !== t)
          try {
            let n = f(e.solanaWallet);
            if (null === n) return;
            return a(
              n.marks
                .filter((e) => t.includes(e.seq) && e.seq !== r)
                .map((e) => e.closeNotionalUsdc),
            );
          } catch (t) {
            g("read", e, t);
            return;
          }
      },
      "I",
      0,
      ({ deps: e, covered: t, payout: r, denominationOut: n, resumed: i }) => {
        if (void 0 === t) return;
        let l =
          "withdrawn" === r.status
            ? "paid"
            : "withdrawn" === r.status
              ? null
              : (0, s.B)(r.serverReason)
                ? "nothing_withdrawable"
                : "perp_amount_too_small" === r.reason
                  ? "amount_too_small"
                  : null;
        if (null !== l)
          try {
            let a = _(e.solanaWallet, e.evmWallet, t);
            if (null === a) return;
            h(e, a, l, {
              denomination: n,
              request_id: r.requestId,
              ...(i ? { payout_resumed: !0 } : {}),
            });
          } catch (t) {
            g("clear", e, t);
          }
      },
      "E",
      0,
      (e) => (
        d.add(e),
        () => {
          d.delete(e);
        }
      ),
    ],
    781311,
  );
};
