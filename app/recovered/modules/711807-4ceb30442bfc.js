// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let n = async (e) =>
    "u" > typeof window &&
    "PaymentRequest" in window &&
    (await new window.PaymentRequest([{ supportedMethods: e }], {
      id: "0",
      total: { label: "Item", amount: { currency: "USD", value: "1.00" } },
    }).canMakePayment());
  e.s([
    "a",
    0,
    () => n("https://google.com/pay"),
    "i",
    0,
    () => n("https://apple.com/apple-pay"),
    "u",
    0,
    (e) => {
      let [n, a] = (0, t.useState)();
      return (
        (0, t.useEffect)(() => {
          e()
            .then((e) => {
              a(e);
            })
            .catch(() => {});
        }, []),
        n
      );
    },
  ]);
};
