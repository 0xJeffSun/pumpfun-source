// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(213148),
    n = e.i(950185);
  let r = /^tuple(?<array>(\[(\d*)\])*)$/;
  function a(e) {
    let t = "",
      a = e.length;
    for (let i = 0; i < a; i++)
      ((t += (function e(t) {
        let a = t.type;
        if (r.test(t.type) && "components" in t) {
          a = "(";
          let i = t.components.length;
          for (let n = 0; n < i; n++)
            ((a += e(t.components[n])), n < i - 1 && (a += ", "));
          let s = (0, n.q)(r, t.type);
          return ((a += `)${s?.array || ""}`), e({ ...t, type: a }));
        }
        return ("indexed" in t && t.indexed && (a = `${a} indexed`), t.name)
          ? `${a} ${t.name}`
          : a;
      })(e[i])),
        i !== a - 1 && (t += ", "));
    return t;
  }
  function i(e) {
    return "function" === e.type
      ? `function ${e.name}(${a(e.inputs)})${e.stateMutability && "nonpayable" !== e.stateMutability ? ` ${e.stateMutability}` : ""}${e.outputs?.length ? ` returns (${a(e.outputs)})` : ""}`
      : "event" === e.type
        ? `event ${e.name}(${a(e.inputs)})`
        : "error" === e.type
          ? `error ${e.name}(${a(e.inputs)})`
          : "constructor" === e.type
            ? `constructor(${a(e.inputs)})${"payable" === e.stateMutability ? " payable" : ""}`
            : "fallback" === e.type
              ? `fallback() external${"payable" === e.stateMutability ? " payable" : ""}`
              : "receive() external payable";
  }
  (e.s(["f", 0, a], 44688), e.s(["f", 0, i], 412932));
  var s = e.i(548801);
  e.s(
    [
      "f",
      0,
      function (e) {
        return (0, t.f)(
          (function (e) {
            let t = !0,
              n = "",
              r = 0,
              a = "",
              i = !1;
            for (let s = 0; s < e.length; s++) {
              let o = e[s];
              if (
                (["(", ")", ","].includes(o) && (t = !0),
                "(" === o && r++,
                ")" === o && r--,
                t)
              ) {
                if (0 === r) {
                  if (" " === o && ["event", "function", ""].includes(a))
                    a = "";
                  else if (((a += o), ")" === o)) {
                    i = !0;
                    break;
                  }
                  continue;
                }
                if (" " === o) {
                  "," !== e[s - 1] &&
                    "," !== n &&
                    ",(" !== n &&
                    ((n = ""), (t = !1));
                  continue;
                }
                ((a += o), (n += o));
              }
            }
            if (!i) throw new s.f("Unable to normalize signature.");
            return a;
          })("string" == typeof e ? e : i(e)),
        );
      },
    ],
    724782,
  );
};
