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
        high: l,
        topMarginPct: o = t,
        defaultBottomMarginPct: i = r,
      }) => {
        if (!Number.isFinite(e) || !Number.isFinite(l) || l <= 0) return i;
        if (e <= 0) return 0;
        let a = Math.max(l - e, 0);
        return Math.max(
          0,
          Math.floor(100 * Math.min(i, (100 * e * (1 - o / 100)) / (a + e))) /
            100,
        );
      },
      "s",
      0,
      ({ from: e, to: r, topMarginPct: l = t, bottomMarginPct: o }) => {
        if (!Number.isFinite(e) || !Number.isFinite(r) || r <= e) return null;
        let i = r - e,
          a = e + (o / 100) * i,
          n = r - (l / 100) * i;
        return Number.isFinite(a) && Number.isFinite(n) && !(n < a)
          ? { low: a, high: n }
          : null;
      },
    ],
    369085,
  );
  let l = {
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
    o = {
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
    i = () =>
      Object.fromEntries(
        Object.entries(o).map(([e, t]) => {
          var r;
          return [
            e,
            ((r = l[e]),
            getComputedStyle(document.documentElement)
              .getPropertyValue(t)
              .trim() || r),
          ];
        }),
      ),
    a = (e, t) => {
      let r = e.replace("#", "");
      if (6 !== r.length) return e;
      let l = Number.parseInt(r.slice(0, 2), 16),
        o = Number.parseInt(r.slice(2, 4), 16),
        i = Number.parseInt(r.slice(4, 6), 16);
      return `rgba(${l}, ${o}, ${i}, ${t})`;
    },
    n = (e, r) => {
      let l = a(e.borderTertiary, 0.55);
      return {
        "paneProperties.backgroundType": "solid",
        "paneProperties.background": r?.paneBackground ?? e.bgPrimary,
        "paneProperties.topMargin": t,
        "paneProperties.vertGridProperties.color": l,
        "paneProperties.horzGridProperties.color": l,
        "paneProperties.crossHairProperties.color": e.textTertiary,
        "paneProperties.separatorColor": e.borderSecondary,
        "scalesProperties.lineColor": e.borderSecondary,
        "scalesProperties.textColor": e.textTertiary,
        "scalesProperties.axisHighlightColor": a(e.livestreamAccent, 0.28),
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
      l,
      "v",
      0,
      n,
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
      () => i().accent,
      "p",
      0,
      ({ colors: e, chartSettingsRef: t, paneBackground: r }) => {
        let l = t?.current,
          o = r ?? l?.backgroundColor,
          i = l?.backgroundGradientStartColor,
          a = l?.backgroundGradientEndColor,
          s = !!(o || i || a) && l?.backgroundType === "gradient";
        return {
          ...n(e, { paneBackground: o ?? e.bgPrimary }),
          ...(s
            ? {
                "paneProperties.backgroundType": "gradient",
                "paneProperties.backgroundGradientStartColor": i ?? e.bgPrimary,
                "paneProperties.backgroundGradientEndColor": a ?? e.bgSecondary,
              }
            : {}),
        };
      },
      "A",
      0,
      i,
    ],
    549200,
  );
};
