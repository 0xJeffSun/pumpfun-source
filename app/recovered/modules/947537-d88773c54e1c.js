// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(757086),
    n = e.i(352386),
    a = e.i(933185),
    i = e.i(748117),
    r = e.i(636447),
    o = e.i(679594);
  let d = "moonpay";
  e.s([
    "a",
    0,
    function (e) {
      return parseFloat(e);
    },
    "u",
    0,
    function (e, l = !1) {
      let [s, c] = (0, n.useState)(null),
        { createAnalyticsEvent: u } = (0, i.u)(),
        { data: h, navigate: p, setModalData: f } = (0, r.u)(),
        g = h?.funding,
        m = (0, n.useRef)(0);
      return (
        (0, n.useEffect)(() => {
          let n = setInterval(async () => {
            if (e)
              try {
                let [i] = await (async function (e, n) {
                    return (0, t.f)(`${n ? a.Y : a.Z}/transactions/ext/${e}`, {
                      query: { apiKey: n ? a._ : a.$ },
                    });
                  })(e, l),
                  r =
                    "waitingAuthorization" === i.status &&
                    "credit_debit_card" === i.paymentMethod
                      ? "pending"
                      : i.status;
                if (
                  (["failed", "completed", "awaitingAuthorization"].includes(
                    r,
                  ) &&
                    (u({
                      eventName: o.O,
                      payload: {
                        status: r,
                        provider: d,
                        paymentMethod: i.paymentMethod,
                        cardPaymentType: i.cardPaymentType,
                        currency: i.currency?.code,
                        baseCurrencyAmount: i.baseCurrencyAmount,
                        quoteCurrencyAmount: i.quoteCurrencyAmount,
                        feeAmount: i.feeAmount,
                        extraFeeAmount: i.extraFeeAmount,
                        networkFeeAmount: i.networkFeeAmount,
                        isSandbox: l,
                      },
                    }),
                    clearInterval(n)),
                  "failed" === r || "serviceFailure" === r)
                )
                  return (
                    f({
                      funding: {
                        ...g,
                        errorMessage:
                          "Something went wrong adding funds from Moonpay. Please try again or use another method to fund your wallet.",
                      },
                      solanaFundingData: h?.solanaFundingData,
                    }),
                    void p("FundingMethodSelectionScreen")
                  );
                c(r);
              } catch (e) {
                (404 !== e.response?.status && (m.current += 1),
                  m.current >= 3 &&
                    (u({
                      eventName: o.O,
                      payload: { status: "serviceFailure", provider: d },
                    }),
                    clearInterval(n),
                    f({
                      funding: {
                        ...g,
                        errorMessage:
                          "Something went wrong adding funds from Moonpay. Please try again or use another method to fund your wallet.",
                      },
                      solanaFundingData: h?.solanaFundingData,
                    }),
                    p("FundingMethodSelectionScreen")));
              }
          }, 3e3);
          return () => clearInterval(n);
        }, [e, m]),
        s
      );
    },
  ]);
};
