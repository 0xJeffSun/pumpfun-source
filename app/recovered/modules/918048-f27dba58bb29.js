// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(636447),
    o = r.i(995040);
  r.s([
    "t",
    0,
    function ({ title: r }) {
      let {
        currentScreen: t,
        navigateBack: a,
        navigate: n,
        data: l,
        setModalData: s,
      } = (0, i.u)();
      return (0, e.jsx)(o.M, {
        title: r,
        backFn:
          "ManualTransferScreen" === t
            ? a
            : t === l?.funding?.methodScreen
              ? l.funding.comingFromSendTransactionScreen
                ? () => n("SendTransactionScreen")
                : void 0
              : l?.funding?.methodScreen
                ? () => {
                    let r = l.funding;
                    (r.usingDefaultFundingMethod &&
                      (r.usingDefaultFundingMethod = !1),
                      s({
                        funding: r,
                        solanaFundingData: l?.solanaFundingData,
                      }),
                      n(r.methodScreen));
                  }
                : void 0,
      });
    },
  ]);
};
