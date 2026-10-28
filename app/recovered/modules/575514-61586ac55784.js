// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e, t, l, r) =>
      t + l === 0
        ? e(
            r
              ? "coin_details.add_tp_sl_edit_orders_resting"
              : "coin_details.add_tp_sl_create_orders_resting",
          )
        : 0 === l
          ? e("coin_details.add_tp_sl_create_orders", { count: t })
          : 0 === t
            ? e("coin_details.add_tp_sl_edit_orders", { count: l })
            : e("coin_details.add_tp_sl_edit_create_order"),
  ]);
};
