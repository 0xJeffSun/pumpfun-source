// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(636447),
    a = e.i(995040);
  e.s([
    "t",
    0,
    function ({ title: e }) {
      let {
        currentScreen: l,
        navigateBack: i,
        navigate: o,
        data: r,
        setModalData: c,
      } = (0, t.u)();
      return (0, n.jsx)(a.M, {
        title: e,
        backFn:
          "ManualTransferScreen" === l
            ? i
            : l === r?.funding?.methodScreen
              ? r.funding.comingFromSendTransactionScreen
                ? () => o("SendTransactionScreen")
                : void 0
              : r?.funding?.methodScreen
                ? () => {
                    let e = r.funding;
                    (e.usingDefaultFundingMethod &&
                      (e.usingDefaultFundingMethod = !1),
                      c({
                        funding: e,
                        solanaFundingData: r?.solanaFundingData,
                      }),
                      o(e.methodScreen));
                  }
                : void 0,
      });
    },
  ]);
};
