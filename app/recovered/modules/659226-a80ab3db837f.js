// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    s = e.i(231332);
  function i(e, t, s) {
    let i,
      l = s.initialDeps ?? [],
      n = !0;
    function r() {
      var r, o, a;
      let h, d;
      s.key && (null == (r = s.debug) ? void 0 : r.call(s)) && (h = Date.now());
      let c = e();
      if (!(c.length !== l.length || c.some((e, t) => l[t] !== e))) return i;
      if (
        ((l = c),
        s.key &&
          (null == (o = s.debug) ? void 0 : o.call(s)) &&
          (d = Date.now()),
        (i = t(...c)),
        s.key && (null == (a = s.debug) ? void 0 : a.call(s)))
      ) {
        let e = Math.round((Date.now() - h) * 100) / 100,
          t = Math.round((Date.now() - d) * 100) / 100,
          i = t / 16,
          l = (e, t) => {
            for (e = String(e); e.length < t; ) e = " " + e;
            return e;
          };
        console.info(
          `%c⏱ ${l(t, 5)} /${l(e, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * i, 120))}deg 100% 31%);`,
          null == s ? void 0 : s.key,
        );
      }
      return (
        (null == s ? void 0 : s.onChange) &&
          !(n && s.skipInitialOnChange) &&
          s.onChange(i),
        (n = !1),
        i
      );
    }
    return (
      (r.updateDeps = (e) => {
        l = e;
      }),
      r
    );
  }
  function l(e, t) {
    if (void 0 !== e) return e;
    throw Error(`Unexpected undefined${t ? `: ${t}` : ""}`);
  }
  let n = (e) => {
      let { offsetWidth: t, offsetHeight: s } = e;
      return { width: t, height: s };
    },
    r = (e) => e,
    o = (e) => {
      let t = Math.max(e.startIndex - e.overscan, 0),
        s = Math.min(e.endIndex + e.overscan, e.count - 1),
        i = [];
      for (let e = t; e <= s; e++) i.push(e);
      return i;
    },
    a = (e, t) => {
      let s = e.scrollElement;
      if (!s) return;
      let i = e.targetWindow;
      if (!i) return;
      let l = (e) => {
        let { width: s, height: i } = e;
        t({ width: Math.round(s), height: Math.round(i) });
      };
      if ((l(n(s)), !i.ResizeObserver)) return () => {};
      let r = new i.ResizeObserver((t) => {
        let i = () => {
          let e = t[0];
          if (null == e ? void 0 : e.borderBoxSize) {
            let t = e.borderBoxSize[0];
            if (t) return void l({ width: t.inlineSize, height: t.blockSize });
          }
          l(n(s));
        };
        e.options.useAnimationFrameWithResizeObserver
          ? requestAnimationFrame(i)
          : i();
      });
      return (
        r.observe(s, { box: "border-box" }),
        () => {
          r.unobserve(s);
        }
      );
    },
    h = { passive: !0 },
    d = "u" < typeof window || "onscrollend" in window,
    c = (e, t) => {
      var s, i;
      let l,
        n = e.scrollElement;
      if (!n) return;
      let r = e.targetWindow;
      if (!r) return;
      let o = 0,
        a =
          e.options.useScrollendEvent && d
            ? () => void 0
            : ((s = () => {
                t(o, !1);
              }),
              (i = e.options.isScrollingResetDelay),
              function (...e) {
                (r.clearTimeout(l),
                  (l = r.setTimeout(() => s.apply(this, e), i)));
              }),
        c = (s) => () => {
          let { horizontal: i, isRtl: l } = e.options;
          ((o = i ? n.scrollLeft * ((l && -1) || 1) : n.scrollTop),
            a(),
            t(o, s));
        },
        u = c(!0),
        m = c(!1);
      (m(), n.addEventListener("scroll", u, h));
      let f = e.options.useScrollendEvent && d;
      return (
        f && n.addEventListener("scrollend", m, h),
        () => {
          (n.removeEventListener("scroll", u),
            f && n.removeEventListener("scrollend", m));
        }
      );
    },
    u = (e, t, s) => {
      if (null == t ? void 0 : t.borderBoxSize) {
        let e = t.borderBoxSize[0];
        if (e)
          return Math.round(
            e[s.options.horizontal ? "inlineSize" : "blockSize"],
          );
      }
      return e[s.options.horizontal ? "offsetWidth" : "offsetHeight"];
    },
    m = (e, { adjustments: t = 0, behavior: s }, i) => {
      var l, n;
      null == (n = null == (l = i.scrollElement) ? void 0 : l.scrollTo) ||
        n.call(l, {
          [i.options.horizontal ? "left" : "top"]: e + t,
          behavior: s,
        });
    };
  class f {
    constructor(e) {
      let t, s;
      ((this.unsubs = []),
        (this.scrollElement = null),
        (this.targetWindow = null),
        (this.isScrolling = !1),
        (this.measurementsCache = []),
        (this.itemSizeCache = new Map()),
        (this.laneAssignments = new Map()),
        (this.pendingMeasuredCacheIndexes = []),
        (this.prevLanes = void 0),
        (this.lanesChangedFlag = !1),
        (this.lanesSettling = !1),
        (this.scrollRect = null),
        (this.scrollOffset = null),
        (this.scrollDirection = null),
        (this.scrollAdjustments = 0),
        (this.elementsCache = new Map()),
        (this.observer =
          ((t = null),
          (s = () =>
            t ||
            (this.targetWindow && this.targetWindow.ResizeObserver
              ? (t = new this.targetWindow.ResizeObserver((e) => {
                  e.forEach((e) => {
                    let t = () => {
                      this._measureElement(e.target, e);
                    };
                    this.options.useAnimationFrameWithResizeObserver
                      ? requestAnimationFrame(t)
                      : t();
                  });
                }))
              : null)),
          {
            disconnect: () => {
              var e;
              (null == (e = s()) || e.disconnect(), (t = null));
            },
            observe: (e) => {
              var t;
              return null == (t = s())
                ? void 0
                : t.observe(e, { box: "border-box" });
            },
            unobserve: (e) => {
              var t;
              return null == (t = s()) ? void 0 : t.unobserve(e);
            },
          })),
        (this.range = null),
        (this.setOptions = (e) => {
          (Object.entries(e).forEach(([t, s]) => {
            void 0 === s && delete e[t];
          }),
            (this.options = {
              debug: !1,
              initialOffset: 0,
              overscan: 1,
              paddingStart: 0,
              paddingEnd: 0,
              scrollPaddingStart: 0,
              scrollPaddingEnd: 0,
              horizontal: !1,
              getItemKey: r,
              rangeExtractor: o,
              onChange: () => {},
              measureElement: u,
              initialRect: { width: 0, height: 0 },
              scrollMargin: 0,
              gap: 0,
              indexAttribute: "data-index",
              initialMeasurementsCache: [],
              lanes: 1,
              isScrollingResetDelay: 150,
              enabled: !0,
              isRtl: !1,
              useScrollendEvent: !1,
              useAnimationFrameWithResizeObserver: !1,
              ...e,
            }));
        }),
        (this.notify = (e) => {
          var t, s;
          null == (s = (t = this.options).onChange) || s.call(t, this, e);
        }),
        (this.maybeNotify = i(
          () => (
            this.calculateRange(),
            [
              this.isScrolling,
              this.range ? this.range.startIndex : null,
              this.range ? this.range.endIndex : null,
            ]
          ),
          (e) => {
            this.notify(e);
          },
          {
            key: !1,
            debug: () => this.options.debug,
            initialDeps: [
              this.isScrolling,
              this.range ? this.range.startIndex : null,
              this.range ? this.range.endIndex : null,
            ],
          },
        )),
        (this.cleanup = () => {
          (this.unsubs.filter(Boolean).forEach((e) => e()),
            (this.unsubs = []),
            this.observer.disconnect(),
            (this.scrollElement = null),
            (this.targetWindow = null));
        }),
        (this._didMount = () => () => {
          this.cleanup();
        }),
        (this._willUpdate = () => {
          var e;
          let t = this.options.enabled ? this.options.getScrollElement() : null;
          if (this.scrollElement !== t) {
            if ((this.cleanup(), !t)) return void this.maybeNotify();
            ((this.scrollElement = t),
              this.scrollElement && "ownerDocument" in this.scrollElement
                ? (this.targetWindow =
                    this.scrollElement.ownerDocument.defaultView)
                : (this.targetWindow =
                    (null == (e = this.scrollElement) ? void 0 : e.window) ??
                    null),
              this.elementsCache.forEach((e) => {
                this.observer.observe(e);
              }),
              this._scrollToOffset(this.getScrollOffset(), {
                adjustments: void 0,
                behavior: void 0,
              }),
              this.unsubs.push(
                this.options.observeElementRect(this, (e) => {
                  ((this.scrollRect = e), this.maybeNotify());
                }),
              ),
              this.unsubs.push(
                this.options.observeElementOffset(this, (e, t) => {
                  ((this.scrollAdjustments = 0),
                    (this.scrollDirection = t
                      ? this.getScrollOffset() < e
                        ? "forward"
                        : "backward"
                      : null),
                    (this.scrollOffset = e),
                    (this.isScrolling = t),
                    this.maybeNotify());
                }),
              ));
          }
        }),
        (this.getSize = () =>
          this.options.enabled
            ? ((this.scrollRect = this.scrollRect ?? this.options.initialRect),
              this.scrollRect[this.options.horizontal ? "width" : "height"])
            : ((this.scrollRect = null), 0)),
        (this.getScrollOffset = () =>
          this.options.enabled
            ? ((this.scrollOffset =
                this.scrollOffset ??
                ("function" == typeof this.options.initialOffset
                  ? this.options.initialOffset()
                  : this.options.initialOffset)),
              this.scrollOffset)
            : ((this.scrollOffset = null), 0)),
        (this.getFurthestMeasurement = (e, t) => {
          let s = new Map(),
            i = new Map();
          for (let l = t - 1; l >= 0; l--) {
            let t = e[l];
            if (s.has(t.lane)) continue;
            let n = i.get(t.lane);
            if (
              (null == n || t.end > n.end
                ? i.set(t.lane, t)
                : t.end < n.end && s.set(t.lane, !0),
              s.size === this.options.lanes)
            )
              break;
          }
          return i.size === this.options.lanes
            ? Array.from(i.values()).sort((e, t) =>
                e.end === t.end ? e.index - t.index : e.end - t.end,
              )[0]
            : void 0;
        }),
        (this.getMeasurementOptions = i(
          () => [
            this.options.count,
            this.options.paddingStart,
            this.options.scrollMargin,
            this.options.getItemKey,
            this.options.enabled,
            this.options.lanes,
          ],
          (e, t, s, i, l, n) => (
            void 0 !== this.prevLanes &&
              this.prevLanes !== n &&
              (this.lanesChangedFlag = !0),
            (this.prevLanes = n),
            (this.pendingMeasuredCacheIndexes = []),
            {
              count: e,
              paddingStart: t,
              scrollMargin: s,
              getItemKey: i,
              enabled: l,
              lanes: n,
            }
          ),
          {
            key: !1,
            skipInitialOnChange: !0,
            onChange: () => {
              this.notify(this.isScrolling);
            },
          },
        )),
        (this.getMeasurements = i(
          () => [this.getMeasurementOptions(), this.itemSizeCache],
          (
            {
              count: e,
              paddingStart: t,
              scrollMargin: s,
              getItemKey: i,
              enabled: l,
              lanes: n,
            },
            r,
          ) => {
            if (!l)
              return (
                (this.measurementsCache = []),
                this.itemSizeCache.clear(),
                this.laneAssignments.clear(),
                []
              );
            if (this.laneAssignments.size > e)
              for (let t of this.laneAssignments.keys())
                t >= e && this.laneAssignments.delete(t);
            (this.lanesChangedFlag &&
              ((this.lanesChangedFlag = !1),
              (this.lanesSettling = !0),
              (this.measurementsCache = []),
              this.itemSizeCache.clear(),
              this.laneAssignments.clear(),
              (this.pendingMeasuredCacheIndexes = [])),
              0 === this.measurementsCache.length &&
                ((this.measurementsCache =
                  this.options.initialMeasurementsCache),
                this.measurementsCache.forEach((e) => {
                  this.itemSizeCache.set(e.key, e.size);
                })));
            let o = this.lanesSettling
              ? 0
              : this.pendingMeasuredCacheIndexes.length > 0
                ? Math.min(...this.pendingMeasuredCacheIndexes)
                : 0;
            ((this.pendingMeasuredCacheIndexes = []),
              this.lanesSettling &&
                this.measurementsCache.length === e &&
                (this.lanesSettling = !1));
            let a = this.measurementsCache.slice(0, o),
              h = Array(n).fill(void 0);
            for (let e = 0; e < o; e++) {
              let t = a[e];
              t && (h[t.lane] = e);
            }
            for (let l = o; l < e; l++) {
              let e,
                n,
                o = i(l),
                d = this.laneAssignments.get(l);
              if (void 0 !== d && this.options.lanes > 1) {
                let i = h[(e = d)],
                  l = void 0 !== i ? a[i] : void 0;
                n = l ? l.end + this.options.gap : t + s;
              } else {
                let i =
                  1 === this.options.lanes
                    ? a[l - 1]
                    : this.getFurthestMeasurement(a, l);
                ((n = i ? i.end + this.options.gap : t + s),
                  (e = i ? i.lane : l % this.options.lanes),
                  this.options.lanes > 1 && this.laneAssignments.set(l, e));
              }
              let c = r.get(o),
                u = "number" == typeof c ? c : this.options.estimateSize(l),
                m = n + u;
              ((a[l] = {
                index: l,
                start: n,
                size: u,
                end: m,
                key: o,
                lane: e,
              }),
                (h[e] = l));
            }
            return ((this.measurementsCache = a), a);
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.calculateRange = i(
          () => [
            this.getMeasurements(),
            this.getSize(),
            this.getScrollOffset(),
            this.options.lanes,
          ],
          (e, t, s, i) =>
            (this.range =
              e.length > 0 && t > 0
                ? (function ({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: s,
                    lanes: i,
                  }) {
                    let l = e.length - 1;
                    if (e.length <= i) return { startIndex: 0, endIndex: l };
                    let n = g(0, l, (t) => e[t].start, s),
                      r = n;
                    if (1 === i) for (; r < l && e[r].end < s + t; ) r++;
                    else if (i > 1) {
                      let o = Array(i).fill(0);
                      for (; r < l && o.some((e) => e < s + t); ) {
                        let t = e[r];
                        ((o[t.lane] = t.end), r++);
                      }
                      let a = Array(i).fill(s + t);
                      for (; n >= 0 && a.some((e) => e >= s); ) {
                        let t = e[n];
                        ((a[t.lane] = t.start), n--);
                      }
                      ((n = Math.max(0, n - (n % i))),
                        (r = Math.min(l, r + (i - 1 - (r % i)))));
                    }
                    return { startIndex: n, endIndex: r };
                  })({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: s,
                    lanes: i,
                  })
                : null),
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualIndexes = i(
          () => {
            let e = null,
              t = null,
              s = this.calculateRange();
            return (
              s && ((e = s.startIndex), (t = s.endIndex)),
              this.maybeNotify.updateDeps([this.isScrolling, e, t]),
              [
                this.options.rangeExtractor,
                this.options.overscan,
                this.options.count,
                e,
                t,
              ]
            );
          },
          (e, t, s, i, l) =>
            null === i || null === l
              ? []
              : e({ startIndex: i, endIndex: l, overscan: t, count: s }),
          { key: !1, debug: () => this.options.debug },
        )),
        (this.indexFromElement = (e) => {
          let t = this.options.indexAttribute,
            s = e.getAttribute(t);
          return s
            ? parseInt(s, 10)
            : (console.warn(
                `Missing attribute name '${t}={index}' on measured element.`,
              ),
              -1);
        }),
        (this._measureElement = (e, t) => {
          let s = this.indexFromElement(e),
            i = this.measurementsCache[s];
          if (!i) return;
          let l = i.key,
            n = this.elementsCache.get(l);
          (n !== e &&
            (n && this.observer.unobserve(n),
            this.observer.observe(e),
            this.elementsCache.set(l, e)),
            e.isConnected &&
              this.resizeItem(s, this.options.measureElement(e, t, this)));
        }),
        (this.resizeItem = (e, t) => {
          let s = this.measurementsCache[e];
          if (!s) return;
          let i = t - (this.itemSizeCache.get(s.key) ?? s.size);
          0 !== i &&
            ((void 0 !== this.shouldAdjustScrollPositionOnItemSizeChange
              ? this.shouldAdjustScrollPositionOnItemSizeChange(s, i, this)
              : s.start < this.getScrollOffset() + this.scrollAdjustments) &&
              this._scrollToOffset(this.getScrollOffset(), {
                adjustments: (this.scrollAdjustments += i),
                behavior: void 0,
              }),
            this.pendingMeasuredCacheIndexes.push(s.index),
            (this.itemSizeCache = new Map(this.itemSizeCache.set(s.key, t))),
            this.notify(!1));
        }),
        (this.measureElement = (e) => {
          e
            ? this._measureElement(e, void 0)
            : this.elementsCache.forEach((e, t) => {
                e.isConnected ||
                  (this.observer.unobserve(e), this.elementsCache.delete(t));
              });
        }),
        (this.getVirtualItems = i(
          () => [this.getVirtualIndexes(), this.getMeasurements()],
          (e, t) => {
            let s = [];
            for (let i = 0, l = e.length; i < l; i++) {
              let l = t[e[i]];
              s.push(l);
            }
            return s;
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualItemForOffset = (e) => {
          let t = this.getMeasurements();
          if (0 !== t.length)
            return l(t[g(0, t.length - 1, (e) => l(t[e]).start, e)]);
        }),
        (this.getOffsetForAlignment = (e, t, s = 0) => {
          let i = this.getSize(),
            l = this.getScrollOffset();
          return (
            "auto" === t && (t = e >= l + i ? "end" : "start"),
            "center" === t ? (e += (s - i) / 2) : "end" === t && (e -= i),
            Math.max(
              Math.min(this.getTotalSize() + this.options.scrollMargin - i, e),
              0,
            )
          );
        }),
        (this.getOffsetForIndex = (e, t = "auto") => {
          e = Math.max(0, Math.min(e, this.options.count - 1));
          let s = this.measurementsCache[e];
          if (!s) return;
          let i = this.getSize(),
            l = this.getScrollOffset();
          if ("auto" === t)
            if (s.end >= l + i - this.options.scrollPaddingEnd) t = "end";
            else {
              if (!(s.start <= l + this.options.scrollPaddingStart))
                return [l, t];
              t = "start";
            }
          let n =
            "end" === t
              ? s.end + this.options.scrollPaddingEnd
              : s.start - this.options.scrollPaddingStart;
          return [this.getOffsetForAlignment(n, t, s.size), t];
        }),
        (this.isDynamicMode = () => this.elementsCache.size > 0),
        (this.scrollToOffset = (
          e,
          { align: t = "start", behavior: s } = {},
        ) => {
          ("smooth" === s &&
            this.isDynamicMode() &&
            console.warn(
              "The `smooth` scroll behavior is not fully supported with dynamic size.",
            ),
            this._scrollToOffset(this.getOffsetForAlignment(e, t), {
              adjustments: void 0,
              behavior: s,
            }));
        }),
        (this.scrollToIndex = (e, { align: t = "auto", behavior: s } = {}) => {
          ("smooth" === s &&
            this.isDynamicMode() &&
            console.warn(
              "The `smooth` scroll behavior is not fully supported with dynamic size.",
            ),
            (e = Math.max(0, Math.min(e, this.options.count - 1))));
          let i = 0,
            l = (t) => {
              if (!this.targetWindow) return;
              let i = this.getOffsetForIndex(e, t);
              if (!i)
                return void console.warn("Failed to get offset for index:", e);
              let [l, r] = i;
              (this._scrollToOffset(l, { adjustments: void 0, behavior: s }),
                this.targetWindow.requestAnimationFrame(() => {
                  let t = this.getScrollOffset(),
                    s = this.getOffsetForIndex(e, r);
                  s
                    ? 1.01 > Math.abs(s[0] - t) || n(r)
                    : console.warn("Failed to get offset for index:", e);
                }));
            },
            n = (t) => {
              this.targetWindow &&
                (++i < 10
                  ? this.targetWindow.requestAnimationFrame(() => l(t))
                  : console.warn(
                      `Failed to scroll to index ${e} after 10 attempts.`,
                    ));
            };
          l(t);
        }),
        (this.scrollBy = (e, { behavior: t } = {}) => {
          ("smooth" === t &&
            this.isDynamicMode() &&
            console.warn(
              "The `smooth` scroll behavior is not fully supported with dynamic size.",
            ),
            this._scrollToOffset(this.getScrollOffset() + e, {
              adjustments: void 0,
              behavior: t,
            }));
        }),
        (this.getTotalSize = () => {
          var e;
          let t,
            s = this.getMeasurements();
          if (0 === s.length) t = this.options.paddingStart;
          else if (1 === this.options.lanes)
            t = (null == (e = s[s.length - 1]) ? void 0 : e.end) ?? 0;
          else {
            let e = Array(this.options.lanes).fill(null),
              i = s.length - 1;
            for (; i >= 0 && e.some((e) => null === e); ) {
              let t = s[i];
              (null === e[t.lane] && (e[t.lane] = t.end), i--);
            }
            t = Math.max(...e.filter((e) => null !== e));
          }
          return Math.max(
            t - this.options.scrollMargin + this.options.paddingEnd,
            0,
          );
        }),
        (this._scrollToOffset = (e, { adjustments: t, behavior: s }) => {
          this.options.scrollToFn(e, { behavior: s, adjustments: t }, this);
        }),
        (this.measure = () => {
          ((this.itemSizeCache = new Map()),
            (this.laneAssignments = new Map()),
            this.notify(!1));
        }),
        this.setOptions(e));
    }
  }
  let g = (e, t, s, i) => {
      for (; e <= t; ) {
        let l = ((e + t) / 2) | 0,
          n = s(l);
        if (n < i) e = l + 1;
        else {
          if (!(n > i)) return l;
          t = l - 1;
        }
      }
      return e > 0 ? e - 1 : 0;
    },
    p = "u" > typeof document ? t.useLayoutEffect : t.useEffect;
  e.s(
    [
      "f",
      0,
      function (e) {
        return (function (e) {
          let i = t.useReducer(() => ({}), {})[1],
            l = {
              ...e,
              onChange: (t, l) => {
                var n;
                (l ? (0, s.flushSync)(i) : i(),
                  null == (n = e.onChange) || n.call(e, t, l));
              },
            },
            [n] = t.useState(() => new f(l));
          return (
            n.setOptions(l),
            p(() => n._didMount(), []),
            p(() => n._willUpdate()),
            n
          );
        })({
          observeElementRect: a,
          observeElementOffset: c,
          scrollToFn: m,
          ...e,
        });
      },
    ],
    659226,
  );
};
