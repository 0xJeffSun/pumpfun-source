// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.createItemWeightMapping =
      r.smoothCurveWeightCalculator =
      r.stepwiseWeightCalculator =
      r.selectRandomItemByWeight =
      r.selectItem =
      r.calculateAndNormalizeWeights =
      r.getEligibleItems =
        void 0),
    (r.getEligibleItems = (e, t) => e.filter((e) => !t.has(e))),
    (r.calculateAndNormalizeWeights = (e, t) => {
      let { weightCalculator: l, rangeMap: a, excludedItems: n } = t,
        i = n ? (0, r.getEligibleItems)(e, n) : e;
      if (0 === i.length) return new Map();
      let s = i.map((e, t) => {
          if (a) {
            let [t, r] = a.get(e) || [0, 0];
            return r - t;
          }
          return l ? l(t, i) : 1;
        }),
        o = s.reduce((e, t) => e + t, 0),
        c = 0;
      return new Map(
        i.map((e, t) => {
          let r = 0 === o ? 1 / i.length : s[t] / o;
          return [e, [c, (c += r)]];
        }),
      );
    }),
    (r.selectItem = (e, t, r) => {
      for (let l of e) {
        let [e, a] = t.get(l) || [0, 0];
        if (r >= e && r < a) return l;
      }
      return e[0];
    }),
    (r.selectRandomItemByWeight = (e, t, l) => {
      let a = (0, r.calculateAndNormalizeWeights)(e, {
          rangeMap: t,
          excludedItems: l,
        }),
        n = Array.from(a.keys());
      if (0 === n.length) return;
      let i = Math.random();
      return (0, r.selectItem)(n, a, i);
    }),
    (r.stepwiseWeightCalculator = (e) =>
      e < 5 ? 0.08 : e < 10 ? 0.04 : e < 20 ? 0.02 : 0.01 * (e < 40)),
    (r.smoothCurveWeightCalculator = (e) =>
      e < 40 ? Math.exp(-(0.1 * e)) : 0),
    (r.createItemWeightMapping = (e, t) =>
      (0, r.calculateAndNormalizeWeights)(e, { weightCalculator: t })));
};
