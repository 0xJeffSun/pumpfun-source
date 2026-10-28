// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ({ t: e, convert: t }) =>
    e("notifications.toast.trade_pill.converting", {
      ticker: t.toSymbol.replace(/^\$/, ""),
    });
  e.s([
    "a",
    0,
    ({ t: e, cause: t }) => ({
      message: e("web.toasts.could_not_create_coin"),
      description: e(
        "not_configured" === t
          ? "web.toasts.create_coin_not_configured"
          : "web.toasts.create_coin_signature_failed",
      ),
    }),
    "V",
    0,
    ({ t: e, convert: t, reason: n }) => ({
      message: e("web.toasts.convert_failed", {
        symbol: t.toSymbol.replace(/^\$/, ""),
      }),
      description: n,
    }),
    "I",
    0,
    t,
    "N",
    0,
    ({ t: e, convert: n }) => ({
      message: t({ t: e, convert: n }),
      description: e("web.toasts.still_processing_body"),
    }),
    "b",
    0,
    ({ t: e, convert: t }) =>
      e("transactions.history.title_converted", {
        from_token: t.fromSymbol.replace(/^\$/, ""),
        to_token: t.toSymbol.replace(/^\$/, ""),
      }),
    "j",
    0,
    ({ t: e, symbol: t }) => ({
      message: e("web.trade.insufficient_symbol", { symbol: t }),
      description: e("web.toasts.insufficient_funding_body", { symbol: t }),
    }),
    "y",
    0,
    ({ t: e }) => ({
      message: e("web.toasts.invalid_amount"),
      description: e("web.toasts.invalid_amount_body"),
    }),
    "s",
    0,
    ({ t: e, side: t, symbol: n, amount: r }) =>
      [
        e("buy" === t ? "web.toasts.buying" : "web.toasts.selling"),
        r,
        n.replace(/^\$/, ""),
      ]
        .filter(Boolean)
        .join(" "),
    "h",
    0,
    ({ t: e, chainName: t }) =>
      e("web.toasts.slow_confirm_note", { chain: t ?? "EVM" }),
    "X",
    0,
    ({ t: e }) => e("web.toasts.sponsored_signing_voided"),
    "J",
    0,
    ({ t: e, side: t, symbol: n }) => ({
      message: e(
        "buy" === t
          ? "web.toasts.still_processing_buy"
          : "web.toasts.still_processing_sell",
        { symbol: n.replace(/^\$/, "") },
      ),
      description: e("web.toasts.still_processing_body"),
    }),
    "D",
    0,
    ({ t: e, side: t, symbol: n, reason: r }) => ({
      message: e(
        "buy" === t ? "web.toasts.buy_failed" : "web.toasts.sell_failed",
        { symbol: n.replace(/^\$/, "") },
      ),
      description: r,
    }),
    "o",
    0,
    ({ t: e, side: t, amount: n, symbol: r }) =>
      `${e("buy" === t ? "web.toasts.bought" : "web.toasts.sold")} ${n} ${r.replace(/^\$/, "")}`,
    "O",
    0,
    ({ t: e }) => e("web.toasts.v1_signing_refused"),
  ]);
};
