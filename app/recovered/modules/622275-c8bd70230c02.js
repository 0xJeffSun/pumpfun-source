// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(229993);
  let r = /^tuple(?<array>(\[(\d*)\])*)$/;
  function n(e) {
    let n = "",
      i = e.length;
    for (let s = 0; s < i; s++)
      ((n += (function e(n) {
        let i = n.type;
        if (r.test(n.type) && "components" in n) {
          i = "(";
          let s = n.components.length;
          for (let t = 0; t < s; t++)
            ((i += e(n.components[t])), t < s - 1 && (i += ", "));
          let a = (0, t.q)(r, n.type);
          return ((i += `)${a?.array || ""}`), e({ ...n, type: i }));
        }
        return ("indexed" in n && n.indexed && (i = `${i} indexed`), n.name)
          ? `${i} ${n.name}`
          : i;
      })(e[s])),
        s !== i - 1 && (n += ", "));
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
