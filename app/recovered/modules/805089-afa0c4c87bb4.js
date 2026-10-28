// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function ({
      value: e,
      showCurrency: t = !0,
      currencySymbol: r = "$",
      fixedDecimalLength: i,
      format: l = "plain",
    }) {
      let a,
        [n, o = ""] = ("number" == typeof e ? e : parseFloat(e))
          .toFixed(20)
          .replace(/\.?0+$/, "")
          .split("."),
        s = o.match(/^(0+)(.+)$/),
        c = s ? s[1].length : 0,
        d = (s ? s[2] : o).slice(0, i ?? void 0),
        u = "";
      return (
        t && r && (u += r),
        (u += n),
        o &&
          ((u += "."),
          c > 0 &&
            ("html" === l
              ? (u += `0<sub>${c}</sub>`)
              : (u +=
                  "0" +
                  ((a = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"]),
                  String(c)
                    .split("")
                    .map((e) => a[parseInt(e)])
                    .join("")))),
          (u += d)),
        u
      );
    },
  ]);
};
