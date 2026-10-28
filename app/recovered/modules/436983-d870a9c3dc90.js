// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(439587);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(954644),
    a = e.i(167958);
  function s(e, t) {
    return !Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t <= 0
      ? null
      : Math.round((e / t - 1) * 100);
  }
  e.s(
    [
      "s",
      0,
      function (e, t) {
        if (!Number.isFinite(e) || e <= 0 || !Number.isFinite(t)) return null;
        let l = e * (1 + t / 100),
          r = t < 0 ? Math.floor(l) : Math.ceil(l);
        return r > 0 ? r : null;
      },
      "l",
      0,
      s,
    ],
    313986,
  );
  var o = e.i(90832);
  (e.s(
    [
      "f",
      0,
      (e) => {
        let c,
          d,
          u,
          m,
          f,
          x,
          h,
          p,
          g,
          b,
          v,
          y,
          _,
          j,
          w = (0, l.c)(40),
          { open: N, onOpenChange: k, onConfirm: S, summary: C } = e,
          { t: M } = (0, n.f)();
        w[0] !== C
          ? ((c =
              C?.triggerMcapUsd != null && null != C.avgEntryMcapUsd
                ? s(C.triggerMcapUsd, C.avgEntryMcapUsd)
                : null),
            (w[0] = C),
            (w[1] = c))
          : (c = w[1]);
        let I = c;
        w[2] !== C?.orderType || w[3] !== M
          ? ((d = M(
              C?.orderType === "stop_loss"
                ? "common.stop_loss"
                : "common.take_profit",
            )),
            (w[2] = C?.orderType),
            (w[3] = M),
            (w[4] = d))
          : (d = w[4]);
        let P = d;
        return (
          w[5] !== M
            ? ((u = M(
                "coin_details.manage_orders.cancel_order_confirmation_title",
              )),
              (w[5] = M),
              (w[6] = u))
            : (u = w[6]),
          w[7] !== M
            ? ((m = M(
                "coin_details.manage_orders.cancel_order_confirmation_body",
              )),
              (w[7] = M),
              (w[8] = m))
            : (m = w[8]),
          w[9] !== m
            ? ((f = (0, t.jsx)("p", {
                className: "text-[12px] leading-4 text-text-secondary",
                children: m,
              })),
              (w[9] = m),
              (w[10] = f))
            : (f = w[10]),
          w[11] !== I || w[12] !== P || w[13] !== C || w[14] !== M
            ? ((x = C
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(a.a, { className: "mt-1" }),
                      (0, t.jsxs)("dl", {
                        className: "flex flex-col",
                        children: [
                          "" !== C.quantity
                            ? (0, t.jsxs)("div", {
                                className: i.x,
                                children: [
                                  (0, t.jsx)("dt", {
                                    className: i.U,
                                    children: M(
                                      "coin_details.manage_orders.cancel_order_confirmation_row_order",
                                    ),
                                  }),
                                  (0, t.jsx)("dd", {
                                    className: i.s,
                                    children: M(
                                      "coin_details.manage_orders.cancel_order_confirmation_sell_quantity",
                                      {
                                        quantity: (0, o.p)(Number(C.quantity)),
                                        symbol: C.symbol,
                                      },
                                    ),
                                  }),
                                ],
                              })
                            : null,
                          null != C.triggerMcapUsd
                            ? (0, t.jsxs)("div", {
                                className: i.x,
                                children: [
                                  (0, t.jsx)("dt", {
                                    className: i.U,
                                    children: P,
                                  }),
                                  (0, t.jsxs)("dd", {
                                    className: i.s,
                                    children: [
                                      (0, o.v)(C.triggerMcapUsd),
                                      null != I
                                        ? ` (${I >= 0 ? "+" : ""}${I}%)`
                                        : "",
                                    ],
                                  }),
                                ],
                              })
                            : null,
                        ],
                      }),
                    ],
                  })
                : null),
              (w[11] = I),
              (w[12] = P),
              (w[13] = C),
              (w[14] = M),
              (w[15] = x))
            : (x = w[15]),
          w[16] !== f || w[17] !== x
            ? ((h = (0, t.jsxs)(a.K, {
                className: "flex flex-col gap-2",
                children: [f, x],
              })),
              (w[16] = f),
              (w[17] = x),
              (w[18] = h))
            : (h = w[18]),
          w[19] !== k
            ? ((p = () => k(!1)), (w[19] = k), (w[20] = p))
            : (p = w[20]),
          w[21] !== M
            ? ((g = M(
                "coin_details.manage_orders.cancel_order_confirmation_keep",
              )),
              (w[21] = M),
              (w[22] = g))
            : (g = w[22]),
          w[23] !== p || w[24] !== g
            ? ((b = (0, t.jsx)(r.K, {
                variant: "secondary",
                size: a.Z,
                onClick: p,
                children: g,
              })),
              (w[23] = p),
              (w[24] = g),
              (w[25] = b))
            : (b = w[25]),
          w[26] !== M
            ? ((v = M("coin_details.manage_orders.cancel_order")),
              (w[26] = M),
              (w[27] = v))
            : (v = w[27]),
          w[28] !== S || w[29] !== v
            ? ((y = (0, t.jsx)(r.K, {
                variant: "primary",
                size: a.$,
                className: "!bg-loss !text-text-on-error hover:!bg-loss/75",
                onClick: S,
                children: v,
              })),
              (w[28] = S),
              (w[29] = v),
              (w[30] = y))
            : (y = w[30]),
          w[31] !== b || w[32] !== y
            ? ((_ = (0, t.jsxs)(a.c, { children: [b, y] })),
              (w[31] = b),
              (w[32] = y),
              (w[33] = _))
            : (_ = w[33]),
          w[34] !== k ||
          w[35] !== N ||
          w[36] !== _ ||
          w[37] !== u ||
          w[38] !== h
            ? ((j = (0, t.jsxs)(a.N, {
                open: N,
                onOpenChange: k,
                density: "terminal",
                size: "sm",
                title: u,
                children: [h, _],
              })),
              (w[34] = k),
              (w[35] = N),
              (w[36] = _),
              (w[37] = u),
              (w[38] = h),
              (w[39] = j))
            : (j = w[39]),
          j
        );
      },
    ],
    436983,
  ),
    e.s(
      [
        "f",
        0,
        (e) => {
          try {
            return e.replace(/\$(\d+)(?!\.\d)/g, (e, t) => {
              let l = Number(t);
              return Number.isSafeInteger(l) ? (0, o.v)(l) : e;
            });
          } catch {
            return e;
          }
        },
      ],
      214618,
    ));
};
