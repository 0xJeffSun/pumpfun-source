// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682);
  let a = BigInt(0),
    i = (e) => (e ? `${e.chainId}/${e.address}` : ""),
    r = (e) => `coin/${e.chainId}/${e.address}`,
    s = (e, t) => {
      if (!t.holders) return e;
      let a = new Map(e?.rows),
        i = t.holders.delta;
      for (let e of i?.upserts ?? []) a.set(e.address, e);
      for (let e of i?.removed ?? []) a.delete(e);
      return {
        summary: t.holders.summary ?? e?.summary,
        rows: a,
        total: i?.holderCount ?? e?.total,
        asOf: i?.asOf ?? t.holders.summary?.asOf ?? e?.asOf,
      };
    },
    l = (e, t) => {
      let a = new Map(e);
      for (let e of t) a.set(e.wallet, e);
      return a;
    };
  function n(e, a, i, r) {
    return e && a.kind !== t.FrameKind.SNAPSHOT
      ? {
          ...e,
          id: a.id ?? e.id,
          block: a.block ?? e.block,
          kind: a.kind,
          updatedAt: r,
          market: a.market ?? e.market,
          phase: a.phase ?? e.phase,
          coin: a.coin ?? e.coin,
          aggregates: a.aggregates ?? e.aggregates,
          holders: s(e.holders, a),
          position: a.position ?? e.position,
          followed: a.followed.length ? l(e.followed, a.followed) : e.followed,
          marks: a.marks.length ? a.marks : e.marks,
          candles: a.candles.length ? a.candles : e.candles,
          unavailable: a.unavailable.length
            ? a.unavailable
            : e.unavailable.filter(
                (e) =>
                  !((e, a) => {
                    switch (a) {
                      case t.Part.MARKET:
                        return !!e.market;
                      case t.Part.PHASE:
                        return !!e.phase;
                      case t.Part.META:
                        return !!e.coin;
                      case t.Part.HOLDERS:
                        return !!e.holders;
                      case t.Part.POSITION:
                        return !!e.position;
                      case t.Part.MARKS:
                        return e.marks.length > 0;
                      case t.Part.CANDLES:
                        return e.candles.length > 0;
                      default:
                        return !1;
                    }
                  })(a, e),
              ),
        }
      : {
          topic: i,
          id: a.id,
          block: a.block,
          kind: a.kind,
          snapshotAt: r,
          updatedAt: r,
          market: a.market,
          phase: a.phase,
          coin: a.coin,
          aggregates: a.aggregates,
          holders: s(void 0, a),
          position: a.position,
          followed: l(void 0, a.followed),
          marks: a.marks,
          candles: a.candles,
          unavailable: a.unavailable,
        };
  }
  let o = (e) => i(e.coin?.id ?? e.market?.id),
    d = (e) => {
      let t = new Map();
      return (e.forEach((e, a) => t.set(o(e), a + 1)), t);
    },
    c = (e, t, a) => {
      let i = Math.max(0, Math.min(e.length, t - 1));
      e.splice(i, 0, a);
    },
    u = (e, t) => {
      t?.has(e.members) ||
        ((e.members = new Map(e.members)), t?.add(e.members));
    };
  e.s([
    "foldCoin",
    0,
    n,
    "foldList",
    0,
    function (e, s, l, p, m) {
      let f = e
        ? { ...e }
        : {
            topic: l,
            kind: s.kind || t.ListKind.UNSPECIFIED,
            version: a,
            cards: [],
            rank: new Map(),
            members: new Map(),
            marks: [],
          };
      (s.kind && (f.kind = s.kind),
        s.version > a && (f.version = s.version),
        s.asOf && (f.asOf = s.asOf));
      let S = s.body;
      if ("snapshot" === S.case)
        ((f.cards = [...S.value.cards]),
          (f.rank = d(f.cards)),
          (f.aggregates = S.value.aggregates),
          (f.marks = S.value.marks),
          (f.members = new Map([...f.members].filter(([e]) => f.rank.has(e)))));
      else if ("patch" === S.case) {
        let e = [...f.cards];
        for (let t of S.value.ops)
          if ("add" === t.op.case) {
            let a = t.op.value.card;
            if (!a) continue;
            let i = o(a),
              r = e.findIndex((e) => o(e) === i);
            (r >= 0 && e.splice(r, 1), c(e, t.op.value.rank, a));
          } else if ("remove" === t.op.case) {
            let a = i(t.op.value),
              r = e.findIndex((e) => o(e) === a);
            (r >= 0 && e.splice(r, 1),
              f.members.has(a) && (u(f, m), f.members.delete(a)));
          } else if ("move" === t.op.case) {
            let a = i(t.op.value.ref),
              r = e.findIndex((e) => o(e) === a);
            if (r < 0) continue;
            let [s] = e.splice(r, 1);
            s && c(e, t.op.value.rank, s);
          }
        ((f.cards = e),
          (f.rank = d(e)),
          S.value.aggregates && (f.aggregates = S.value.aggregates),
          S.value.marks.length && (f.marks = S.value.marks));
      } else if ("member" === S.case) {
        let e = S.value;
        if (e.id) {
          let t = i(e.id);
          (u(f, m), f.members.set(t, n(f.members.get(t), e, r(e.id), p)));
        }
      }
      return f;
    },
    "isCoinState",
    0,
    (e) => !!e && "followed" in e,
    "isListState",
    0,
    (e) => !!e && "cards" in e,
    "memberTopic",
    0,
    r,
    "refKey",
    0,
    i,
  ]);
};
