// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(229993);
  let r = /^tuple(?<array>(\[(\d*)\])*)$/;
  function n(e) {
    let n = "",
      s = e.length;
    for (let i = 0; i < s; i++)
      ((n += (function e(n) {
        let s = n.type;
        if (r.test(n.type) && "components" in n) {
          s = "(";
          let i = n.components.length;
          for (let t = 0; t < i; t++)
            ((s += e(n.components[t])), t < i - 1 && (s += ", "));
          let o = (0, t.q)(r, n.type);
          return ((s += `)${o?.array || ""}`), e({ ...n, type: s }));
        }
        return ("indexed" in n && n.indexed && (s = `${s} indexed`), n.name)
          ? `${s} ${n.name}`
          : s;
      })(e[i])),
        i !== s - 1 && (n += ", "));
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
