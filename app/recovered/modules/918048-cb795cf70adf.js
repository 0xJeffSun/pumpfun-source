// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(636447),
    i = r.i(995040);
  r.s([
    "t",
    0,
    function ({ title: r }) {
      let {
        currentScreen: t,
        navigateBack: a,
        navigate: l,
        data: n,
        setModalData: s,
      } = (0, o.u)();
      return (0, e.jsx)(i.M, {
        title: r,
        backFn:
          "ManualTransferScreen" === t
            ? a
            : t === n?.funding?.methodScreen
              ? n.funding.comingFromSendTransactionScreen
                ? () => l("SendTransactionScreen")
                : void 0
              : n?.funding?.methodScreen
                ? () => {
                    let r = n.funding;
                    (r.usingDefaultFundingMethod &&
                      (r.usingDefaultFundingMethod = !1),
                      s({
                        funding: r,
                        solanaFundingData: n?.solanaFundingData,
                      }),
                      l(r.methodScreen));
                  }
                : void 0,
      });
    },
  ]);
};
