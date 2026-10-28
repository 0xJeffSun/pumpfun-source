// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(636447),
    a = e.i(995040);
  e.s([
    "t",
    0,
    function ({ title: e }) {
      let {
        currentScreen: i,
        navigateBack: r,
        navigate: o,
        data: d,
        setModalData: l,
      } = (0, n.u)();
      return (0, t.jsx)(a.M, {
        title: e,
        backFn:
          "ManualTransferScreen" === i
            ? r
            : i === d?.funding?.methodScreen
              ? d.funding.comingFromSendTransactionScreen
                ? () => o("SendTransactionScreen")
                : void 0
              : d?.funding?.methodScreen
                ? () => {
                    let e = d.funding;
                    (e.usingDefaultFundingMethod &&
                      (e.usingDefaultFundingMethod = !1),
                      l({
                        funding: e,
                        solanaFundingData: d?.solanaFundingData,
                      }),
                      o(e.methodScreen));
                  }
                : void 0,
      });
    },
  ]);
};
