// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(636447),
    n = e.i(995040);
  e.s([
    "t",
    0,
    function ({ title: e }) {
      let {
        currentScreen: r,
        navigateBack: a,
        navigate: s,
        data: o,
        setModalData: l,
      } = (0, i.u)();
      return (0, t.jsx)(n.M, {
        title: e,
        backFn:
          "ManualTransferScreen" === r
            ? a
            : r === o?.funding?.methodScreen
              ? o.funding.comingFromSendTransactionScreen
                ? () => s("SendTransactionScreen")
                : void 0
              : o?.funding?.methodScreen
                ? () => {
                    let e = o.funding;
                    (e.usingDefaultFundingMethod &&
                      (e.usingDefaultFundingMethod = !1),
                      l({
                        funding: e,
                        solanaFundingData: o?.solanaFundingData,
                      }),
                      s(e.methodScreen));
                  }
                : void 0,
      });
    },
  ]);
};
