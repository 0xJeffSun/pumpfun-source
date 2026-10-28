// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386);
  let o = async (r) =>
    "u" > typeof window &&
    "PaymentRequest" in window &&
    (await new window.PaymentRequest([{ supportedMethods: r }], {
      id: "0",
      total: { label: "Item", amount: { currency: "USD", value: "1.00" } },
    }).canMakePayment());
  r.s([
    "a",
    0,
    () => o("https://google.com/pay"),
    "i",
    0,
    () => o("https://apple.com/apple-pay"),
    "u",
    0,
    (r) => {
      let [o, i] = (0, e.useState)();
      return (
        (0, e.useEffect)(() => {
          r()
            .then((r) => {
              i(r);
            })
            .catch(() => {});
        }, []),
        o
      );
    },
  ]);
};
