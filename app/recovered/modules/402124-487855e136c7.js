// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(21384);
  e.s([
    "f",
    0,
    function () {
      let e,
        r = (0, t.c)(14),
        { t: l } = (0, n.f)(),
        { method: a, reader: s } = (0, i.f)();
      if (r[0] !== a || r[1] !== s || r[2] !== l) {
        e = Symbol.for("react.early_return_sentinel");
        e: {
          let t =
            "external" !== a.kind
              ? { kind: "default" }
              : a.walletName
                ? { kind: "external", wallet: a.walletName }
                : { kind: "external_unnamed" };
          switch (t.kind) {
            case "external":
              e = {
                helper: l("web.trade.auto_approve_helper_external", {
                  wallet: t.wallet,
                }),
                reader: s,
              };
              break e;
            case "external_unnamed": {
              let t, n;
              (r[4] !== l
                ? ((t = l("web.trade.auto_approve_helper_external_unnamed")),
                  (r[4] = l),
                  (r[5] = t))
                : (t = r[5]),
                r[6] !== s || r[7] !== t
                  ? ((n = { helper: t, reader: s }),
                    (r[6] = s),
                    (r[7] = t),
                    (r[8] = n))
                  : (n = r[8]),
                (e = n));
              break e;
            }
            default: {
              let t, n;
              (r[9] !== l
                ? ((t = l("web.trade.auto_approve_helper")),
                  (r[9] = l),
                  (r[10] = t))
                : (t = r[10]),
                r[11] !== s || r[12] !== t
                  ? ((n = { helper: t, reader: s }),
                    (r[11] = s),
                    (r[12] = t),
                    (r[13] = n))
                  : (n = r[13]),
                (e = n));
              break e;
            }
          }
        }
        ((r[0] = a), (r[1] = s), (r[2] = l), (r[3] = e));
      } else e = r[3];
      if (e !== Symbol.for("react.early_return_sentinel")) return e;
    },
  ]);
};
