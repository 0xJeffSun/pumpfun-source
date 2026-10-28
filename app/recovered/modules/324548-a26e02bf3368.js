// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(192098);
  let n = /^\d+$/,
    r = (e) => {
      if ((0, t.Q)(e) || (0, t.E)(e) || (0, t.a)(e)) return { kind: "success" };
      let n =
          "string" == typeof e.fail_reason && e.fail_reason.length > 0
            ? e.fail_reason
            : void 0,
        r = (e) => (void 0 === n ? e : { ...e, failReason: n });
      switch (e.status) {
        case "refunded":
          return r({ kind: "refunded", code: "bridge_refunded" });
        case "expired":
          return r({ kind: "expired", code: "bridge_expired" });
        default:
          return r({ kind: "failed", code: "bridge_failed" });
      }
    };
  class i extends Error {
    code;
    intent;
    failReason;
    constructor(e, t) {
      let n = t ?? r(e),
        i =
          "success" === n.kind ? { kind: "failed", code: "bridge_failed" } : n;
      (super(
        void 0 === i.failReason
          ? `bridge intent ${e.status}`
          : `bridge intent ${e.status}: ${i.failReason}`,
      ),
        (this.name = "BridgeIntentFailedError"),
        (this.code = i.code),
        (this.intent = e),
        void 0 !== i.failReason && (this.failReason = i.failReason));
    }
  }
  e.s([
    "B",
    0,
    i,
    "i",
    0,
    (e) => {
      if ("string" == typeof e.amount_out && n.test(e.amount_out))
        return BigInt(e.amount_out);
      if ("sell" !== e.direction) return null;
      let t = e.matched_in;
      if (
        "string" != typeof t ||
        !n.test(t) ||
        !Number.isInteger(e.skim) ||
        e.skim < 0
      )
        return null;
      let r = BigInt(t) - BigInt(e.skim);
      return r > BigInt(0) ? r : null;
    },
    "Z",
    0,
    r,
    "a",
    0,
    (e) => {
      let t = [],
        n = [];
      return (
        "buy" === e.direction
          ? (e.deposit_tx && t.push(e.deposit_tx),
            e.swap_tx && n.push(e.swap_tx))
          : (e.swap_tx && t.push(e.swap_tx),
            e.deposit_tx && n.push(e.deposit_tx)),
        e.payout_tx && n.push(e.payout_tx),
        { inTxHashes: t, txHashes: n }
      );
    },
    "f",
    0,
    (e) => e instanceof i,
  ]);
};
