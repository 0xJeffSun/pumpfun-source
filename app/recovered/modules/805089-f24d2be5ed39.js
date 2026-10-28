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
      format: a = "plain",
    }) {
      let o,
        [i, n = ""] = ("number" == typeof e ? e : parseFloat(e))
          .toFixed(20)
          .replace(/\.?0+$/, "")
          .split("."),
        s = n.match(/^(0+)(.+)$/),
        c = s ? s[1].length : 0,
        d = (s ? s[2] : n).slice(0, l ?? void 0),
        m = "";
      return (
        t && r && (m += r),
        (m += i),
        n &&
          ((m += "."),
          c > 0 &&
            ("html" === a
              ? (m += `0<sub>${c}</sub>`)
              : (m +=
                  "0" +
                  ((o = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"]),
                  String(c)
                    .split("")
                    .map((e) => o[parseInt(e)])
                    .join("")))),
          (m += d)),
        m
      );
    },
  ]);
};
