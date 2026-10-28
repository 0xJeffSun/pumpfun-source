// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(229993);
  let r = /^tuple(?<array>(\[(\d*)\])*)$/;
  function n(e) {
    let n = "",
      a = e.length;
    for (let s = 0; s < a; s++)
      ((n += (function e(n) {
        let a = n.type;
        if (r.test(n.type) && "components" in n) {
          a = "(";
          let s = n.components.length;
          for (let t = 0; t < s; t++)
            ((a += e(n.components[t])), t < s - 1 && (a += ", "));
          let o = (0, t.q)(r, n.type);
          return ((a += `)${o?.array || ""}`), e({ ...n, type: a }));
        }
        return ("indexed" in n && n.indexed && (a = `${a} indexed`), n.name)
          ? `${a} ${n.name}`
          : a;
      })(e[s])),
        s !== a - 1 && (n += ", "));
    return n;
  }
  (e.s(["f", 0, n], 269953),
    e.s(
      [
        "f",
        0,
        function (e) {
          return "function" === e.type
            ? `function ${e.name}(${n(e.inputs)})${e.stateMutability && "nonpayable" !== e.stateMutability ? ` ${e.stateMutability}` : ""}${e.outputs?.length ? ` returns (${n(e.outputs)})` : ""}`
            : "event" === e.type
              ? `event ${e.name}(${n(e.inputs)})`
              : "error" === e.type
                ? `error ${e.name}(${n(e.inputs)})`
                : "constructor" === e.type
                  ? `constructor(${n(e.inputs)})${"payable" === e.stateMutability ? " payable" : ""}`
                  : "fallback" === e.type
                    ? `fallback() external${"payable" === e.stateMutability ? " payable" : ""}`
                    : "receive() external payable";
        },
      ],
      622275,
    ));
};
