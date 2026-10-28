// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(695705),
    n = e.i(605587);
  let r = /^\d+$/;
  e.s([
    "j",
    0,
    (e) => {
      let t = e.evm?.deadline;
      return null != t && Number.isFinite(t) && t > 0 && t <= 0x2540be3ff
        ? new Date(1e3 * t)
        : null;
    },
    "u",
    0,
    (e) => (0, n.n)(e.chainId) ?? e.chainId,
    "S",
    0,
    (e) => (void 0 !== e && r.test(e) ? Number(e) / 1e6 : null),
    "t",
    0,
    (e) => {
      if (void 0 === e.evm || "success" !== (0, t.H)(e.status)) return null;
      let n = e.evm.settlement?.status.trim().toLowerCase();
      return void 0 === n || "" === n || "pending" === n
        ? "pending"
        : "completed" === n
          ? "completed"
          : "attention";
    },
    "H",
    0,
    ({ order: e, tokenDecimals: t = e.evm?.tokenDecimals }) => {
      let { evm: n, quantityAtomic: i } = e;
      if (
        void 0 === n ||
        void 0 === i ||
        !r.test(i) ||
        null == t ||
        !Number.isInteger(t) ||
        t < 0
      )
        return null;
      let a = ((e) => {
        if (void 0 === e || "" === e.trim()) return;
        let t = Number(e);
        return Number.isFinite(t) ? t : void 0;
      })(n.triggerPriceUsd);
      if (void 0 === a) return null;
      let o = (Number(i) / 10 ** t) * a;
      return Number.isFinite(o) && o > 0 ? o : null;
    },
    "m",
    0,
    (e) => {
      let t = (0, n.w)(e);
      return null !== t && /^\d+$/.test(t) ? `eip155:${t}` : null;
    },
  ]);
};
