// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(192098);
  let n = /^\d+$/,
    i = (e) => {
      if ((0, t.Q)(e) || (0, t.E)(e) || (0, t.a)(e)) return { kind: "success" };
      let n =
          "string" == typeof e.fail_reason && e.fail_reason.length > 0
            ? e.fail_reason
            : void 0,
        i = (e) => (void 0 === n ? e : { ...e, failReason: n });
      switch (e.status) {
        case "refunded":
          return i({ kind: "refunded", code: "bridge_refunded" });
        case "expired":
          return i({ kind: "expired", code: "bridge_expired" });
        default:
          return i({ kind: "failed", code: "bridge_failed" });
      }
    };
  class r extends Error {
    code;
    intent;
    failReason;
    constructor(e, t) {
      let n = t ?? i(e),
        r =
          "success" === n.kind ? { kind: "failed", code: "bridge_failed" } : n;
      (super(
        void 0 === r.failReason
          ? `bridge intent ${e.status}`
          : `bridge intent ${e.status}: ${r.failReason}`,
      ),
        (this.name = "BridgeIntentFailedError"),
        (this.code = r.code),
        (this.intent = e),
        void 0 !== r.failReason && (this.failReason = r.failReason));
    }
  }
  e.s([
    "B",
    0,
    r,
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
      let i = BigInt(t) - BigInt(e.skim);
      return i > BigInt(0) ? i : null;
    },
    "Z",
    0,
    i,
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
    (e) => e instanceof r,
  ]);
};
