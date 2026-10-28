// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function ({
      value: e,
      showCurrency: t = !0,
      currencySymbol: r = "$",
      fixedDecimalLength: l,
      format: o = "plain",
    }) {
      let i,
        [a, n = ""] = ("number" == typeof e ? e : parseFloat(e))
          .toFixed(20)
          .replace(/\.?0+$/, "")
          .split("."),
        s = n.match(/^(0+)(.+)$/),
        c = s ? s[1].length : 0,
        d = (s ? s[2] : n).slice(0, l ?? void 0),
        u = "";
      return (
        t && r && (u += r),
        (u += a),
        n &&
          ((u += "."),
          c > 0 &&
            ("html" === o
              ? (u += `0<sub>${c}</sub>`)
              : (u +=
                  "0" +
                  ((i = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"]),
                  String(c)
                    .split("")
                    .map((e) => i[parseInt(e)])
                    .join("")))),
          (u += d)),
        u
      );
    },
  ]);
};
