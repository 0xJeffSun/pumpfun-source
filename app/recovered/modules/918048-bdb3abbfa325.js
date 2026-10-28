// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var i = e.i(732486),
    t = e.i(636447),
    r = e.i(995040);
  e.s([
    "t",
    0,
    function ({ title: e }) {
      let {
        currentScreen: n,
        navigateBack: o,
        navigate: a,
        data: d,
        setModalData: l,
      } = (0, t.u)();
      return (0, i.jsx)(r.M, {
        title: e,
        backFn:
          "ManualTransferScreen" === n
            ? o
            : n === d?.funding?.methodScreen
              ? d.funding.comingFromSendTransactionScreen
                ? () => a("SendTransactionScreen")
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
                      a(e.methodScreen));
                  }
                : void 0,
      });
    },
  ]);
};
