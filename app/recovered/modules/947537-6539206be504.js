// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(757086),
    o = r.i(352386),
    a = r.i(933185),
    i = r.i(748117),
    l = r.i(636447),
    t = r.i(679594);
  let n = "moonpay";
  r.s([
    "a",
    0,
    function (r) {
      return parseFloat(r);
    },
    "u",
    0,
    function (r, c = !1) {
      let [d, s] = (0, o.useState)(null),
        { createAnalyticsEvent: v } = (0, i.u)(),
        { data: u, navigate: p, setModalData: g } = (0, l.u)(),
        h = u?.funding,
        f = (0, o.useRef)(0);
      return (
        (0, o.useEffect)(() => {
          let o = setInterval(async () => {
            if (r)
              try {
                let [i] = await (async function (r, o) {
                    return (0, e.f)(`${o ? a.Y : a.Z}/transactions/ext/${r}`, {
                      query: { apiKey: o ? a._ : a.$ },
                    });
                  })(r, c),
                  l =
                    "waitingAuthorization" === i.status &&
                    "credit_debit_card" === i.paymentMethod
                      ? "pending"
                      : i.status;
                if (
                  (["failed", "completed", "awaitingAuthorization"].includes(
                    l,
                  ) &&
                    (v({
                      eventName: t.O,
                      payload: {
                        status: l,
                        provider: n,
                        paymentMethod: i.paymentMethod,
                        cardPaymentType: i.cardPaymentType,
                        currency: i.currency?.code,
                        baseCurrencyAmount: i.baseCurrencyAmount,
                        quoteCurrencyAmount: i.quoteCurrencyAmount,
                        feeAmount: i.feeAmount,
                        extraFeeAmount: i.extraFeeAmount,
                        networkFeeAmount: i.networkFeeAmount,
                        isSandbox: c,
                      },
                    }),
                    clearInterval(o)),
                  "failed" === l || "serviceFailure" === l)
                )
                  return (
                    g({
                      funding: {
                        ...h,
                        errorMessage:
                          "Something went wrong adding funds from Moonpay. Please try again or use another method to fund your wallet.",
                      },
                      solanaFundingData: u?.solanaFundingData,
                    }),
                    void p("FundingMethodSelectionScreen")
                  );
                s(l);
              } catch (r) {
                (404 !== r.response?.status && (f.current += 1),
                  f.current >= 3 &&
                    (v({
                      eventName: t.O,
                      payload: { status: "serviceFailure", provider: n },
                    }),
                    clearInterval(o),
                    g({
                      funding: {
                        ...h,
                        errorMessage:
                          "Something went wrong adding funds from Moonpay. Please try again or use another method to fund your wallet.",
                      },
                      solanaFundingData: u?.solanaFundingData,
                    }),
                    p("FundingMethodSelectionScreen")));
              }
          }, 3e3);
          return () => clearInterval(o);
        }, [r, f]),
        d
      );
    },
  ]);
};
