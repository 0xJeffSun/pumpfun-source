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
        currentScreen: a,
        navigateBack: t,
        navigate: n,
        data: l,
        setModalData: c,
      } = (0, o.u)();
      return (0, e.jsx)(i.M, {
        title: r,
        backFn:
          "ManualTransferScreen" === a
            ? t
            : a === l?.funding?.methodScreen
              ? l.funding.comingFromSendTransactionScreen
                ? () => n("SendTransactionScreen")
                : void 0
              : l?.funding?.methodScreen
                ? () => {
                    let r = l.funding;
                    (r.usingDefaultFundingMethod &&
                      (r.usingDefaultFundingMethod = !1),
                      c({
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
