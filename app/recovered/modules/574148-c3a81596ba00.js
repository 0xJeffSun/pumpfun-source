// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667);
  let i = new Map(),
    n = new Map(),
    r = new Set(),
    s = new Set(),
    o = 1,
    a = (e) => e.toLowerCase(),
    l = () => {
      for (let e of s) e();
    },
    u = (e) => {
      if (!e.hlDone) for (let t of ((e.hlDone = !0), r)) t.check();
    };
  e.s([
    "Z",
    0,
    8e3,
    "e",
    0,
    (e) => {
      if (void 0 === e) return !1;
      let t = a(e);
      if (i.has(t)) return !0;
      for (let e of i.values())
        if (e.some((e) => void 0 !== e.solanaWallet && a(e.solanaWallet) === t))
          return !0;
      return !1;
    },
    "h",
    0,
    (e) => (void 0 === e ? 0 : (n.get(a(e)) ?? 0)),
    "P",
    0,
    ({
      evmWallet: e,
      solanaWallet: r,
      kind: s,
      coin: d,
      run: c,
      recover: p,
    }) => {
      let m = a(e),
        f = { seq: o++, kind: s, coin: d, solanaWallet: r, hlDone: !1 };
      (i.set(m, [...(i.get(m) ?? []), f]), l());
      let h = () => {
          let e;
          (u(f),
            0 === (e = (i.get(m) ?? []).filter((e) => e !== f)).length
              ? i.delete(m)
              : i.set(m, e));
          let t = Date.now();
          (n.set(m, t), void 0 !== r && n.set(a(r), t), l());
        },
        w = { seq: f.seq, markHlDone: () => u(f) };
      return new Promise((e) => e(c(w))).then(
        (e) => (h(), e),
        (i) => (
          t.y.error("[perpFollowOns] follow_on_rejected", {
            kind: s,
            coin: d,
            evm_wallet: e,
            error: i instanceof Error ? i.message : String(i),
          }),
          h(),
          p(i)
        ),
      );
    },
    "G",
    0,
    (e) => (
      s.add(e),
      () => {
        s.delete(e);
      }
    ),
    "t",
    0,
    (e, { maxMs: n, kinds: s, before: o }) => {
      let l = (i.get(a(e)) ?? []).filter(
        (e) =>
          !e.hlDone &&
          (void 0 === s || s.includes(e.kind)) &&
          (void 0 === o || e.seq < o),
      );
      return 0 === l.length
        ? Promise.resolve()
        : new Promise((i) => {
            let s = setTimeout(() => {
                (t.y.warn("[perpFollowOns] hl_wait_timeout", {
                  evm_wallet: e,
                  max_ms: n,
                  pending: l
                    .filter((e) => !e.hlDone)
                    .map((e) => `${e.kind}:${e.coin}`),
                }),
                  o.release());
              }, n),
              o = {
                check: () => {
                  l.every((e) => e.hlDone) && o.release();
                },
                release: () => {
                  (clearTimeout(s), r.delete(o), i());
                },
              };
            r.add(o);
          });
    },
  ]);
};
