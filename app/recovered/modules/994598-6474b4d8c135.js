// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462024);
  function r(e) {
    return "SOL" === e.kind
      ? t.i.SOL.mint
      : "PUMP" === e.kind
        ? t.i.PUMP.mint
        : e.customMint || void 0;
  }
  e.s([
    "o",
    0,
    function (e, t) {
      let n = r(e);
      return n
        ? t
            .filter((t) => t.id !== e.id && r(t) === n)
            .reduce((e, t) => {
              let r = Number(t.humanAmount || 0);
              return e + (Number.isFinite(r) && r > 0 ? r : 0);
            }, 0)
        : 0;
    },
    "k",
    0,
    function (e) {
      let t = new Map(),
        n = new Set();
      for (let a of e) {
        let e = r(a);
        if (!e) continue;
        let i = t.get(e);
        if (void 0 !== i) {
          (n.add(i), n.add(a.id));
          continue;
        }
        t.set(e, a.id);
      }
      return n;
    },
    "r",
    0,
    r,
    "$",
    0,
    function (e, t) {
      return t
        .filter((t) => r(t) === e)
        .reduce((e, t) => {
          let r = Number(t.humanAmount || 0);
          return e + (Number.isFinite(r) && r > 0 ? r : 0);
        }, 0);
    },
  ]);
};
