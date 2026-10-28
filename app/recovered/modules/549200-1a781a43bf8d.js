// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = 15,
    r = 8;
  e.s(
    [
      "S",
      0,
      t,
      "w",
      0,
      r,
      "T",
      0,
      ({
        low: e,
        high: i,
        topMarginPct: l = t,
        defaultBottomMarginPct: a = r,
      }) => {
        if (!Number.isFinite(e) || !Number.isFinite(i) || i <= 0) return a;
        if (e <= 0) return 0;
        let n = Math.max(i - e, 0);
        return Math.max(
          0,
          Math.floor(100 * Math.min(a, (100 * e * (1 - l / 100)) / (n + e))) /
            100,
        );
      },
      "s",
      0,
      ({ from: e, to: r, topMarginPct: i = t, bottomMarginPct: l }) => {
        if (!Number.isFinite(e) || !Number.isFinite(r) || r <= e) return null;
        let a = r - e,
          n = e + (l / 100) * a,
          o = r - (i / 100) * a;
        return Number.isFinite(n) && Number.isFinite(o) && !(o < n)
          ? { low: n, high: o }
          : null;
      },
    ],
    369085,
  );
  let i = {
      bgPrimary: "#0B0B0E",
      bgSecondary: "#131316",
      bgTertiary: "#1B1B1F",
      borderSecondary: "#232327",
      borderTertiary: "#303036",
      textPrimary: "#E4E4E7",
      textSecondary: "#E4E4E7",
      textTertiary: "#A1A1AA",
      accent: "#86EFAC",
      candleUp: "#4ADE80",
      candleDown: "#F87171",
      livestreamAccent: "#60A5FA",
      livestreamAccentStrong: "#3B82F6",
    },
    l = {
      bgPrimary: "--color-bg-primary",
      bgSecondary: "--color-bg-secondary",
      bgTertiary: "--color-bg-tertiary",
      borderSecondary: "--color-border-secondary",
      borderTertiary: "--color-border-tertiary",
      textPrimary: "--color-text-primary",
      textSecondary: "--color-text-secondary",
      textTertiary: "--color-text-tertiary",
      accent: "--color-text-accent",
      candleUp: "--color-green-400",
      candleDown: "--color-red-400",
      livestreamAccent: "--color-bg-decorative-blue",
      livestreamAccentStrong: "--color-text-info",
    },
    a = () =>
      Object.fromEntries(
        Object.entries(l).map(([e, t]) => {
          var r;
          return [
            e,
            ((r = i[e]),
            getComputedStyle(document.documentElement)
              .getPropertyValue(t)
              .trim() || r),
          ];
        }),
      ),
    n = (e, t) => {
      let r = e.replace("#", "");
      if (6 !== r.length) return e;
      let i = Number.parseInt(r.slice(0, 2), 16),
        l = Number.parseInt(r.slice(2, 4), 16),
        a = Number.parseInt(r.slice(4, 6), 16);
      return `rgba(${i}, ${l}, ${a}, ${t})`;
    },
    o = (e, r) => {
      let i = n(e.borderTertiary, 0.55);
      return {
        "paneProperties.backgroundType": "solid",
        "paneProperties.background": r?.paneBackground ?? e.bgPrimary,
        "paneProperties.topMargin": t,
        "paneProperties.vertGridProperties.color": i,
        "paneProperties.horzGridProperties.color": i,
        "paneProperties.crossHairProperties.color": e.textTertiary,
        "paneProperties.separatorColor": e.borderSecondary,
        "scalesProperties.lineColor": e.borderSecondary,
        "scalesProperties.textColor": e.textTertiary,
        "scalesProperties.axisHighlightColor": n(e.livestreamAccent, 0.28),
        "scalesProperties.axisLineToolLabelBackgroundColorCommon":
          e.livestreamAccentStrong,
        "scalesProperties.axisLineToolLabelBackgroundColorActive":
          e.livestreamAccentStrong,
        "scalesProperties.crosshairLabelBgColorDark": e.bgSecondary,
        "scalesProperties.crosshairLabelBgColorLight": e.bgSecondary,
        ...{
          "mainSeriesProperties.candleStyle.upColor": e.candleUp,
          "mainSeriesProperties.candleStyle.downColor": e.candleDown,
          "mainSeriesProperties.candleStyle.borderUpColor": e.candleUp,
          "mainSeriesProperties.candleStyle.borderDownColor": e.candleDown,
          "mainSeriesProperties.candleStyle.wickUpColor": e.candleUp,
          "mainSeriesProperties.candleStyle.wickDownColor": e.candleDown,
          "mainSeriesProperties.volCandlesStyle.upColor": e.candleUp,
          "mainSeriesProperties.volCandlesStyle.downColor": e.candleDown,
          "mainSeriesProperties.volCandlesStyle.borderUpColor": e.candleUp,
          "mainSeriesProperties.volCandlesStyle.borderDownColor": e.candleDown,
          "mainSeriesProperties.volCandlesStyle.wickUpColor": e.candleUp,
          "mainSeriesProperties.volCandlesStyle.wickDownColor": e.candleDown,
          "mainSeriesProperties.hollowCandleStyle.upColor": e.candleUp,
          "mainSeriesProperties.hollowCandleStyle.downColor": e.candleDown,
          "mainSeriesProperties.hollowCandleStyle.borderUpColor": e.candleUp,
          "mainSeriesProperties.hollowCandleStyle.borderDownColor":
            e.candleDown,
          "mainSeriesProperties.hollowCandleStyle.wickUpColor": e.candleUp,
          "mainSeriesProperties.hollowCandleStyle.wickDownColor": e.candleDown,
          "mainSeriesProperties.haStyle.upColor": e.candleUp,
          "mainSeriesProperties.haStyle.downColor": e.candleDown,
          "mainSeriesProperties.haStyle.borderUpColor": e.candleUp,
          "mainSeriesProperties.haStyle.borderDownColor": e.candleDown,
          "mainSeriesProperties.haStyle.wickUpColor": e.candleUp,
          "mainSeriesProperties.haStyle.wickDownColor": e.candleDown,
          "mainSeriesProperties.barStyle.upColor": e.candleUp,
          "mainSeriesProperties.barStyle.downColor": e.candleDown,
          "mainSeriesProperties.columnStyle.upColor": e.candleUp,
          "mainSeriesProperties.columnStyle.downColor": e.candleDown,
        },
      };
    };
  e.s(
    [
      "g",
      0,
      i,
      "v",
      0,
      o,
      "w",
      0,
      (e, t) => [
        ["--tv-color-pane-background", t ?? e.bgPrimary],
        ["--tv-color-platform-background", t ?? e.bgSecondary],
        ["--tv-color-toolbar-divider-background", e.borderSecondary],
        ["--tv-color-popup-element-divider-background", e.borderSecondary],
        ["--tv-color-popup-element-secondary-text", e.textTertiary],
        ["--tv-color-scrollbar-thumb-background", e.bgTertiary],
        ["--themed-color-brand", e.accent],
        ["--tv-color-toolbar-button-text", e.textTertiary],
        ["--tv-color-toolbar-button-text-hover", e.textPrimary],
        ["--tv-color-toolbar-button-background-hover", e.bgTertiary],
        ["--tv-color-toolbar-button-text-active", e.accent],
        ["--tv-color-toolbar-button-text-active-hover", e.candleUp],
        ["--tv-color-toolbar-toggle-button-background-active", e.accent],
        [
          "--tv-color-toolbar-toggle-button-background-active-hover",
          e.candleUp,
        ],
        ["--tv-color-item-active-text", e.bgPrimary],
        ["--pf-chart-drawing-toggle-bg", e.borderTertiary],
        ["--pf-chart-drawing-toggle-bg-hover", e.bgTertiary],
        ["--pf-chart-drawing-toggle-icon", e.textPrimary],
        ["--pf-chart-drawing-toggle-icon-hover", e.accent],
      ],
      "Y",
      0,
      (e, t) => ({
        "linetoolcircle.color": e.livestreamAccentStrong,
        "linetoolcircle.backgroundColor": e.livestreamAccentStrong,
        "linetooltrendline.linecolor": e.livestreamAccent,
        "linetoolcircle.linewidth": t,
      }),
      "i",
      0,
      (e) => ({
        "volume.volume.transparency": 62,
        "volume.volume.color.0": e.candleDown,
        "volume.volume.color.1": e.candleUp,
      }),
      "W",
      0,
      () => a().accent,
      "p",
      0,
      ({ colors: e, chartSettingsRef: t, paneBackground: r }) => {
        let i = t?.current,
          l = r ?? i?.backgroundColor,
          a = i?.backgroundGradientStartColor,
          n = i?.backgroundGradientEndColor,
          s = !!(l || a || n) && i?.backgroundType === "gradient";
        return {
          ...o(e, { paneBackground: l ?? e.bgPrimary }),
          ...(s
            ? {
                "paneProperties.backgroundType": "gradient",
                "paneProperties.backgroundGradientStartColor": a ?? e.bgPrimary,
                "paneProperties.backgroundGradientEndColor": n ?? e.bgSecondary,
              }
            : {}),
        };
      },
      "A",
      0,
      a,
    ],
    549200,
  );
};
