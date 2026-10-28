// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = ({ t, convert: e }) =>
    t("notifications.toast.trade_pill.converting", {
      ticker: e.toSymbol.replace(/^\$/, ""),
    });
  t.s([
    "a",
    0,
    ({ t, cause: e }) => ({
      message: t("web.toasts.could_not_create_coin"),
      description: t(
        "not_configured" === e
          ? "web.toasts.create_coin_not_configured"
          : "web.toasts.create_coin_signature_failed",
      ),
    }),
    "V",
    0,
    ({ t, convert: e, reason: n }) => ({
      message: t("web.toasts.convert_failed", {
        symbol: e.toSymbol.replace(/^\$/, ""),
      }),
      description: n,
    }),
    "I",
    0,
    e,
    "N",
    0,
    ({ t, convert: n }) => ({
      message: e({ t, convert: n }),
      description: t("web.toasts.still_processing_body"),
    }),
    "b",
    0,
    ({ t, convert: e }) =>
      t("transactions.history.title_converted", {
        from_token: e.fromSymbol.replace(/^\$/, ""),
        to_token: e.toSymbol.replace(/^\$/, ""),
      }),
    "j",
    0,
    ({ t, symbol: e }) => ({
      message: t("web.trade.insufficient_symbol", { symbol: e }),
      description: t("web.toasts.insufficient_funding_body", { symbol: e }),
    }),
    "y",
    0,
    ({ t }) => ({
      message: t("web.toasts.invalid_amount"),
      description: t("web.toasts.invalid_amount_body"),
    }),
    "s",
    0,
    ({ t, side: e, symbol: n, amount: r }) =>
      [
        t("buy" === e ? "web.toasts.buying" : "web.toasts.selling"),
        r,
        n.replace(/^\$/, ""),
      ]
        .filter(Boolean)
        .join(" "),
    "h",
    0,
    ({ t, chainName: e }) =>
      t("web.toasts.slow_confirm_note", { chain: e ?? "EVM" }),
    "X",
    0,
    ({ t }) => t("web.toasts.sponsored_signing_voided"),
    "J",
    0,
    ({ t, side: e, symbol: n }) => ({
      message: t(
        "buy" === e
          ? "web.toasts.still_processing_buy"
          : "web.toasts.still_processing_sell",
        { symbol: n.replace(/^\$/, "") },
      ),
      description: t("web.toasts.still_processing_body"),
    }),
    "D",
    0,
    ({ t, side: e, symbol: n, reason: r }) => ({
      message: t(
        "buy" === e ? "web.toasts.buy_failed" : "web.toasts.sell_failed",
        { symbol: n.replace(/^\$/, "") },
      ),
      description: r,
    }),
    "o",
    0,
    ({ t, side: e, amount: n, symbol: r }) =>
      `${t("buy" === e ? "web.toasts.bought" : "web.toasts.sold")} ${n} ${r.replace(/^\$/, "")}`,
    "O",
    0,
    ({ t }) => t("web.toasts.v1_signing_refused"),
  ]);
};
