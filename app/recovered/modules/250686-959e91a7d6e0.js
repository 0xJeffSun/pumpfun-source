// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "chartproperties",
    r = "mainSeriesProperties",
    i = [
      /^paneProperties\./,
      /^scalesProperties\./,
      /^volumePaneSize$/,
      /^priceScaleSelectionStrategyName$/,
      /^mainSeriesProperties\.[A-Za-z]+Style\./,
      /^mainSeriesProperties\.(highLowAvgPrice|bidAsk|prePostMarket)\./,
      /^mainSeriesProperties\.(showPriceLine|priceLineWidth|priceLineColor|showPrevClosePriceLine|prevClosePriceLineWidth|prevClosePriceLineColor|baseLineColor|showCountdown)$/,
    ],
    s = [
      /^paneProperties\.(topMargin|bottomMargin)$/,
      /^paneProperties\.axisProperties\./,
      /^scalesProperties\.barSpacing$/,
    ],
    n = (e) => i.some((t) => t.test(e)) && !s.some((t) => t.test(e)),
    o = (e) =>
      "string" == typeof e || "number" == typeof e || "boolean" == typeof e,
    a = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/,
    l =
      /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/,
    c = (e) => {
      let t = e.trim().toLowerCase(),
        r = a.exec(t)?.[1];
      if (r) {
        let e = r.length <= 4 ? [...r].map((e) => e + e).join("") : r,
          t = (t) => Number.parseInt(e.slice(t, t + 2), 16),
          i = 8 === e.length ? t(6) / 255 : 1;
        return [t(0), t(2), t(4), i];
      }
      let i = l.exec(t);
      if (i)
        return [
          Number(i[1]),
          Number(i[2]),
          Number(i[3]),
          void 0 === i[4] ? 1 : Number(i[4]),
        ];
    };
  e.s([
    "L",
    0,
    "coinTradingView_appearance",
    "f",
    0,
    t,
    "J",
    0,
    (e) =>
      e === t
        ? "chart"
        : "chartproperties.mainSeriesProperties" === e
          ? "series"
          : void 0,
    "$",
    0,
    (e) => ("series" === e ? r : ""),
    "j",
    0,
    (e) => ({ ...e }),
    "n",
    0,
    ({ written: e, reference: t, brand: r }) => {
      let i = (e, t, r) =>
        t in e &&
        ((e, t) => {
          if ("string" != typeof e || "string" != typeof t) return e === t;
          let r = c(e),
            i = c(t);
          return r && i
            ? r.every((e, t) => Math.abs(e - i[t]) <= (3 === t ? 0.005 : 0.5))
            : e.trim().toLowerCase() === t.trim().toLowerCase();
        })(r, e[t]);
      return Object.fromEntries(
        Object.entries(e).filter(
          ([e, s]) => n(e) && !i(r, e, s) && !i(t, e, s),
        ),
      );
    },
    "A",
    0,
    (e, t) => {
      let r = Object.keys(e);
      return (
        r.length === Object.keys(t).length &&
        r.every((r) => r in t && e[r] === t[r])
      );
    },
    "M",
    0,
    (e) =>
      !e || "object" != typeof e || Array.isArray(e)
        ? {}
        : Object.fromEntries(
            Object.entries(e).filter((e) => n(e[0]) && o(e[1])),
          ),
    "Q",
    0,
    (e, t = "") => {
      let r = {},
        i = (e, t) => {
          if (o(e)) {
            t && (r[t] = e);
            return;
          }
          if (!(!e || "object" != typeof e || Array.isArray(e)))
            for (let [r, s] of Object.entries(e)) i(s, t ? `${t}.${r}` : r);
        };
      return (i(e, t), r);
    },
    "V",
    0,
    ({ stored: e, group: t, tweaks: i }) => ({
      ...Object.fromEntries(
        Object.entries(e).filter(
          ([e]) => (e.startsWith(`${r}.`) ? "series" : "chart") !== t,
        ),
      ),
      ...i,
    }),
  ]);
};
