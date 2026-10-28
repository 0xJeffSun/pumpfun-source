// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(250686);
  e.i(550675);
  var r = e.i(547562),
    a = e.i(272700);
  let i = () => (0, r.L)("chart.appearance"),
    s = ({ brandOverrides: e }) => {
      let a = new Map(),
        s = (0, t.Q)(e);
      return {
        record: (e, n) => {
          let o = (0, t.J)(e);
          if (!o) return;
          let l = ((e) => {
            try {
              return JSON.parse(e);
            } catch {
              return;
            }
          })(n);
          if (!l || "object" != typeof l) return;
          let m = (0, t.Q)(l, (0, t.$)(o)),
            u = a.get(o);
          if (!u) return void a.set(o, m);
          let c = i(),
            d = (0, t.V)({
              stored: c,
              group: o,
              tweaks: (0, t.n)({ written: m, reference: u, brand: s }),
            });
          !(0, t.A)(c, d) && (0, r.i)("chart.appearance", d);
        },
        defaults: (e) => {
          let t = Object.fromEntries(
            [...a.values()].flatMap((e) => Object.entries(e)),
          );
          return Object.fromEntries(
            e.flatMap((e) => (e in t ? [[e, t[e]]] : [])),
          );
        },
      };
    };
  e.s(
    [
      "q",
      0,
      s,
      "j",
      0,
      i,
      "Q",
      0,
      (e) => a.k["chart.appearance"].adapter.subscribe(e),
    ],
    241404,
  );
  var n = e.i(510632);
  let o = "IntervalWidget.quicks",
    l = "coinTradingView_drawingTemplates",
    m = "coinTradingView_studyTemplates",
    u = "coinTradingView_chartTemplates",
    c = (e) => "object" == typeof e && null !== e && !Array.isArray(e),
    d = (e, t) => {
      if (!e) return {};
      try {
        let r = JSON.parse(e.getItem(t) ?? "{}");
        if (!c(r)) return {};
        return Object.fromEntries(Object.entries(r).filter((e) => c(e[1])));
      } catch {
        return {};
      }
    },
    h = (e, t, r) => {
      if (e)
        try {
          e.setItem(t, JSON.stringify(r));
        } catch {}
    },
    p = (e, t) => Promise.reject(Error(`${e} "${t}" is not stored`));
  var b = e.i(638202);
  let f = () => (0, r.L)("chart.drawingTools"),
    y = (e) => {
      (0, r.i)("chart.drawingTools", e);
    };
  var g = e.i(661434);
  let v = (e) =>
      ({
        "1s": 1e3,
        "15s": 15e3,
        "30s": 3e4,
        "1m": 6e4,
        "5m": 3e5,
        "15m": 9e5,
        "30m": 18e5,
        "1h": 36e5,
        "4h": 144e5,
        "6h": 216e5,
        "12h": 432e5,
        "1d": 864e5,
        "1w": 6048e5,
      })[e],
    w = ["1s", "15s", "30s"],
    A = (e) => w.includes(e),
    M = (e) => {
      let t = new Date(e),
        r = t.getUTCDay();
      return (
        Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()) -
        ((r + 6) % 7) * 864e5
      );
    };
  e.s(
    [
      "H",
      0,
      (e) => {
        if (0 === e.length) return [];
        let t = [...e].sort((e, t) => e.timestamp - t.timestamp),
          r = new Map();
        for (let e of t) {
          let t = M(e.timestamp),
            a = r.get(t);
          if (!a) {
            r.set(t, { ...e, timestamp: t });
            continue;
          }
          ((a.high = Math.max(a.high, e.high)),
            (a.low = Math.min(a.low, e.low)),
            (a.close = e.close),
            (a.volume = Number(a.volume) + Number(e.volume)));
        }
        return Array.from(r.values()).sort((e, t) => e.timestamp - t.timestamp);
      },
      "v",
      0,
      (e, t) => {
        if ("1w" === t) return M(e);
        let r = v(t);
        return r <= 0
          ? (console.error(
              `Invalid interval duration ${r} for interval ${t}. Falling back to raw timestamp.`,
            ),
            e)
          : Math.floor(e / r) * r;
      },
      "h",
      0,
      M,
      "b",
      0,
      (e) => (A(e) ? "1m" : e),
      "e",
      0,
      (e, t, r) =>
        "SOL" === r ? parseFloat(e.toFixed(2)) : parseFloat(t.toFixed(2)),
      "K",
      0,
      (e, t) => (t.has(e) || t.set(e, new Map()), t.get(e)),
      "t",
      0,
      (e) =>
        ({
          "1S": "1s",
          "15S": "15s",
          "30S": "30s",
          1: "1m",
          5: "5m",
          15: "15m",
          30: "30m",
          60: "1h",
          240: "4h",
          360: "6h",
          720: "12h",
          1440: "1d",
          D: "1d",
          "1D": "1d",
          W: "1w",
          "1W": "1w",
        })[e] || "1m",
      "E",
      0,
      (e, a, i, v, w = "dark", A = [], M = {}) => ({
        symbol: e,
        interval: a,
        container: i,
        datafeed: v,
        library_path: "/tradingview/charting_library/",
        custom_css_url: "/tradingview/chart-custom.css",
        locale: M.locale ?? "en",
        ...(M.minBarSpacing
          ? { time_scale: { min_bar_spacing: M.minBarSpacing } }
          : {}),
        disabled_features: [
          "header_symbol_search",
          "symbol_search_hot_key",
          "search_button",
          "symbol_search",
          "header_compare",
          "compare_symbol",
          "header_widget_buttons_mode",
          "show_symbol_logo_in_header",
          "use_localstorage_for_settings",
          ...A,
        ],
        enabled_features: [
          "create_volume_indicator_by_default",
          "header_widget",
          "seconds_resolution",
          "two_character_bar_marks_labels",
          "items_favoriting",
          "timezone_menu",
          "saveload_separate_drawings_storage",
        ],
        timezone: (0, g.X)(),
        favorites: { intervals: n.M },
        settings_adapter: (({ appearanceRecorder: e }) => {
          let a = (() => {
            try {
              let e = window.localStorage.getItem(n.x);
              if (null === e) return;
              return (0, n.e)(JSON.parse(e));
            } catch {
              return;
            }
          })();
          return {
            initialSettings: {
              ...{ ...f() },
              ...(a ? { [o]: JSON.stringify(a) } : {}),
            },
            setValue: (a, i) => {
              if (a === o) {
                try {
                  var s;
                  let e;
                  ((s = JSON.parse(i)),
                    (e = (0, n.e)(s)) &&
                      (0, r.i)("chart.favoriteIntervals", e));
                } catch {}
                return;
              }
              (0, b.Z)(a)
                ? (({ key: e, value: t }) => {
                    if (!(0, b.Z)(e) || !(0, b.m)({ key: e, value: t })) return;
                    let r = f(),
                      a = (0, b.P)({ settings: r, key: e, value: t });
                    a !== r && y(a);
                  })({ key: a, value: i })
                : (a === t.f && (0, g.T)((0, g.N)(i)), e.record(a, i));
            },
            removeValue: (e) => {
              e === o
                ? (() => {
                    try {
                      window.localStorage.removeItem(n.x);
                    } catch {}
                  })()
                : ((e) => {
                    if (!(0, b.Z)(e)) return;
                    let t = f(),
                      r = (0, b.G)({ settings: t, key: e });
                    r !== t && y(r);
                  })(e);
            },
          };
        })({
          appearanceRecorder: M.appearanceRecorder ?? s({ brandOverrides: {} }),
        }),
        time_frames: [
          { text: "1d", resolution: "15", description: "1 Day", title: "1D" },
          { text: "5d", resolution: "60", description: "5 Days", title: "5D" },
          {
            text: "1m",
            resolution: "720",
            description: "1 Month",
            title: "1M",
          },
          {
            text: "3m",
            resolution: "1D",
            description: "3 Months",
            title: "3M",
          },
          { text: "1y", resolution: "1W", description: "1 Year", title: "1Y" },
        ],
        save_load_adapter: (({ storage: e } = {}) => {
          let t = () =>
            ((e) => {
              if (e) return e;
              try {
                return window.localStorage;
              } catch {
                return null;
              }
            })(e);
          return {
            getAllCharts: () => Promise.resolve([]),
            removeChart: () => Promise.resolve(),
            saveChart: (e) => Promise.resolve(e.id ?? "pump-chart"),
            getChartContent: (e) => p("Chart layout", String(e)),
            getAllStudyTemplates: () =>
              Promise.resolve(Object.keys(d(t(), m)).map((e) => ({ name: e }))),
            removeStudyTemplate: ({ name: e }) => {
              let { [e]: r, ...a } = d(t(), m);
              return (h(t(), m, a), Promise.resolve());
            },
            saveStudyTemplate: ({ name: e, content: r }) => (
              h(t(), m, { ...d(t(), m), [e]: { content: r } }),
              Promise.resolve()
            ),
            getStudyTemplateContent: ({ name: e }) => {
              let r = d(t(), m)[e]?.content;
              return "string" == typeof r
                ? Promise.resolve(r)
                : p("Indicator template", e);
            },
            getDrawingTemplates: (e) =>
              Promise.resolve(Object.keys(d(t(), l)[e] ?? {})),
            loadDrawingTemplate: (e, r) => {
              let a = d(t(), l)[e]?.[r];
              return "string" == typeof a
                ? Promise.resolve(a)
                : p("Drawing template", r);
            },
            removeDrawingTemplate: (e, r) => {
              let a = d(t(), l),
                { [r]: i, ...s } = a[e] ?? {};
              return (h(t(), l, { ...a, [e]: s }), Promise.resolve());
            },
            saveDrawingTemplate: (e, r, a) => {
              let i = d(t(), l);
              return (
                h(t(), l, { ...i, [e]: { ...(i[e] ?? {}), [r]: a } }),
                Promise.resolve()
              );
            },
            getChartTemplateContent: (e) => {
              let r = d(t(), u)[e]?.content;
              return c(r)
                ? Promise.resolve({ content: r })
                : p("Chart template", e);
            },
            getAllChartTemplates: () => Promise.resolve(Object.keys(d(t(), u))),
            saveChartTemplate: (e, r) => (
              h(t(), u, { ...d(t(), u), [e]: { content: r } }),
              Promise.resolve()
            ),
            removeChartTemplate: (e) => {
              let { [e]: r, ...a } = d(t(), u);
              return (h(t(), u, a), Promise.resolve());
            },
            saveLineToolsAndGroups: () => Promise.resolve(),
            loadLineToolsAndGroups: () => Promise.resolve(null),
          };
        })(),
        autosize: !0,
        theme: w,
      }),
      "B",
      0,
      v,
      "W",
      0,
      A,
      "i",
      0,
      (e) => {
        let t = new Map();
        for (let r of [...e].sort((e, t) => e.timestamp - t.timestamp)) {
          let e = t.get(r.timestamp);
          if (!e) {
            t.set(r.timestamp, { ...r });
            continue;
          }
          ((e.high = Math.max(e.high, r.high)),
            (e.low = Math.min(e.low, r.low)),
            (e.close = r.close),
            (e.volume = Number(e.volume) + Number(r.volume)));
        }
        return Array.from(t.values()).sort((e, t) => e.timestamp - t.timestamp);
      },
      "V",
      0,
      (e, t) => {
        let r = new Set(e.map((e) => e.timestamp));
        return [...e, ...t.filter((e) => !r.has(e.timestamp))].sort(
          (e, t) => e.timestamp - t.timestamp,
        );
      },
      "N",
      0,
      (e) =>
        ({
          "1s": "1S",
          "15s": "15S",
          "30s": "30S",
          "1m": "1",
          "5m": "5",
          "15m": "15",
          "30m": "30",
          "1h": "60",
          "4h": "240",
          "6h": "360",
          "12h": "720",
          "1d": "1D",
          "1w": "1W",
        })[e],
      "_",
      0,
      function (e, t, r, a, i, s, n = !1, o = !1, l = !1) {
        if (!t?.current || !e) return !1;
        let m = t.current.activeWalletFilter === e;
        if (m) return !0;
        let u =
            r && t.current.buttonDisplayOptions.myTrades.walletAddress === e,
          c = a && t.current.buttonDisplayOptions.devTrades.walletAddress === e,
          d =
            i &&
            !!t.current.buttonDisplayOptions.trackedTrades?.trackedWallets?.some(
              (t) => t.trackedWalletAddress === e,
            ),
          h =
            s &&
            t.current.buttonDisplayOptions.mayhemTrades?.walletAddress === e,
          p = n && !!t.current.buttonDisplayOptions.kolTrades?.kolByWallet?.[e],
          b =
            o &&
            !!t.current.buttonDisplayOptions.followingTrades
              ?.followingByWallet?.[e],
          f =
            l &&
            !!t.current.buttonDisplayOptions.verifiedTrades?.verifiedWallets?.[
              e
            ];
        return u || c || d || h || p || b || f || m;
      },
    ],
    921152,
  );
};
