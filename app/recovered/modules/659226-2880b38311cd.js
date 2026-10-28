// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(231332);
  function s(e, t, i) {
    let s,
      n = i.initialDeps ?? [],
      l = !0;
    function r() {
      var r, o, a;
      let c, d;
      i.key && (null == (r = i.debug) ? void 0 : r.call(i)) && (c = Date.now());
      let h = e();
      if (!(h.length !== n.length || h.some((e, t) => n[t] !== e))) return s;
      if (
        ((n = h),
        i.key &&
          (null == (o = i.debug) ? void 0 : o.call(i)) &&
          (d = Date.now()),
        (s = t(...h)),
        i.key && (null == (a = i.debug) ? void 0 : a.call(i)))
      ) {
        let e = Math.round((Date.now() - c) * 100) / 100,
          t = Math.round((Date.now() - d) * 100) / 100,
          s = t / 16,
          n = (e, t) => {
            for (e = String(e); e.length < t; ) e = " " + e;
            return e;
          };
        console.info(
          `%c⏱ ${n(t, 5)} /${n(e, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * s, 120))}deg 100% 31%);`,
          null == i ? void 0 : i.key,
        );
      }
      return (
        (null == i ? void 0 : i.onChange) &&
          !(l && i.skipInitialOnChange) &&
          i.onChange(s),
        (l = !1),
        s
      );
    }
    return (
      (r.updateDeps = (e) => {
        n = e;
      }),
      r
    );
  }
  function n(e, t) {
    if (void 0 !== e) return e;
    throw Error(`Unexpected undefined${t ? `: ${t}` : ""}`);
  }
  let l = (e) => {
      let { offsetWidth: t, offsetHeight: i } = e;
      return { width: t, height: i };
    },
    r = (e) => e,
    o = (e) => {
      let t = Math.max(e.startIndex - e.overscan, 0),
        i = Math.min(e.endIndex + e.overscan, e.count - 1),
        s = [];
      for (let e = t; e <= i; e++) s.push(e);
      return s;
    },
    a = (e, t) => {
      let i = e.scrollElement;
      if (!i) return;
      let s = e.targetWindow;
      if (!s) return;
      let n = (e) => {
        let { width: i, height: s } = e;
        t({ width: Math.round(i), height: Math.round(s) });
      };
      if ((n(l(i)), !s.ResizeObserver)) return () => {};
      let r = new s.ResizeObserver((t) => {
        let s = () => {
          let e = t[0];
          if (null == e ? void 0 : e.borderBoxSize) {
            let t = e.borderBoxSize[0];
            if (t) return void n({ width: t.inlineSize, height: t.blockSize });
          }
          n(l(i));
        };
        e.options.useAnimationFrameWithResizeObserver
          ? requestAnimationFrame(s)
          : s();
      });
      return (
        r.observe(i, { box: "border-box" }),
        () => {
          r.unobserve(i);
        }
      );
    },
    c = { passive: !0 },
    d = "u" < typeof window || "onscrollend" in window,
    h = (e, t) => {
      var i, s;
      let n,
        l = e.scrollElement;
      if (!l) return;
      let r = e.targetWindow;
      if (!r) return;
      let o = 0,
        a =
          e.options.useScrollendEvent && d
            ? () => void 0
            : ((i = () => {
                t(o, !1);
              }),
              (s = e.options.isScrollingResetDelay),
              function (...e) {
                (r.clearTimeout(n),
                  (n = r.setTimeout(() => i.apply(this, e), s)));
              }),
        h = (i) => () => {
          let { horizontal: s, isRtl: n } = e.options;
          ((o = s ? l.scrollLeft * ((n && -1) || 1) : l.scrollTop),
            a(),
            t(o, i));
        },
        u = h(!0),
        m = h(!1);
      (m(), l.addEventListener("scroll", u, c));
      let f = e.options.useScrollendEvent && d;
      return (
        f && l.addEventListener("scrollend", m, c),
        () => {
          (l.removeEventListener("scroll", u),
            f && l.removeEventListener("scrollend", m));
        }
      );
    },
    u = (e, t, i) => {
      if (null == t ? void 0 : t.borderBoxSize) {
        let e = t.borderBoxSize[0];
        if (e)
          return Math.round(
            e[i.options.horizontal ? "inlineSize" : "blockSize"],
          );
      }
      return e[i.options.horizontal ? "offsetWidth" : "offsetHeight"];
    },
    m = (e, { adjustments: t = 0, behavior: i }, s) => {
      var n, l;
      null == (l = null == (n = s.scrollElement) ? void 0 : n.scrollTo) ||
        l.call(n, {
          [s.options.horizontal ? "left" : "top"]: e + t,
          behavior: i,
        });
    };
  class f {
    constructor(e) {
      let t, i;
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
          (i = () =>
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
              (null == (e = i()) || e.disconnect(), (t = null));
            },
            observe: (e) => {
              var t;
              return null == (t = i())
                ? void 0
                : t.observe(e, { box: "border-box" });
            },
            unobserve: (e) => {
              var t;
              return null == (t = i()) ? void 0 : t.unobserve(e);
            },
          })),
        (this.range = null),
        (this.setOptions = (e) => {
          (Object.entries(e).forEach(([t, i]) => {
            void 0 === i && delete e[t];
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
          var t, i;
          null == (i = (t = this.options).onChange) || i.call(t, this, e);
        }),
        (this.maybeNotify = s(
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
          let i = new Map(),
            s = new Map();
          for (let n = t - 1; n >= 0; n--) {
            let t = e[n];
            if (i.has(t.lane)) continue;
            let l = s.get(t.lane);
            if (
              (null == l || t.end > l.end
                ? s.set(t.lane, t)
                : t.end < l.end && i.set(t.lane, !0),
              i.size === this.options.lanes)
            )
              break;
          }
          return s.size === this.options.lanes
            ? Array.from(s.values()).sort((e, t) =>
                e.end === t.end ? e.index - t.index : e.end - t.end,
              )[0]
            : void 0;
        }),
        (this.getMeasurementOptions = s(
          () => [
            this.options.count,
            this.options.paddingStart,
            this.options.scrollMargin,
            this.options.getItemKey,
            this.options.enabled,
            this.options.lanes,
          ],
          (e, t, i, s, n, l) => (
            void 0 !== this.prevLanes &&
              this.prevLanes !== l &&
              (this.lanesChangedFlag = !0),
            (this.prevLanes = l),
            (this.pendingMeasuredCacheIndexes = []),
            {
              count: e,
              paddingStart: t,
              scrollMargin: i,
              getItemKey: s,
              enabled: n,
              lanes: l,
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
        (this.getMeasurements = s(
          () => [this.getMeasurementOptions(), this.itemSizeCache],
          (
            {
              count: e,
              paddingStart: t,
              scrollMargin: i,
              getItemKey: s,
              enabled: n,
              lanes: l,
            },
            r,
          ) => {
            if (!n)
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
              c = Array(l).fill(void 0);
            for (let e = 0; e < o; e++) {
              let t = a[e];
              t && (c[t.lane] = e);
            }
            for (let n = o; n < e; n++) {
              let e,
                l,
                o = s(n),
                d = this.laneAssignments.get(n);
              if (void 0 !== d && this.options.lanes > 1) {
                let s = c[(e = d)],
                  n = void 0 !== s ? a[s] : void 0;
                l = n ? n.end + this.options.gap : t + i;
              } else {
                let s =
                  1 === this.options.lanes
                    ? a[n - 1]
                    : this.getFurthestMeasurement(a, n);
                ((l = s ? s.end + this.options.gap : t + i),
                  (e = s ? s.lane : n % this.options.lanes),
                  this.options.lanes > 1 && this.laneAssignments.set(n, e));
              }
              let h = r.get(o),
                u = "number" == typeof h ? h : this.options.estimateSize(n),
                m = l + u;
              ((a[n] = {
                index: n,
                start: l,
                size: u,
                end: m,
                key: o,
                lane: e,
              }),
                (c[e] = n));
            }
            return ((this.measurementsCache = a), a);
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.calculateRange = s(
          () => [
            this.getMeasurements(),
            this.getSize(),
            this.getScrollOffset(),
            this.options.lanes,
          ],
          (e, t, i, s) =>
            (this.range =
              e.length > 0 && t > 0
                ? (function ({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: i,
                    lanes: s,
                  }) {
                    let n = e.length - 1;
                    if (e.length <= s) return { startIndex: 0, endIndex: n };
                    let l = p(0, n, (t) => e[t].start, i),
                      r = l;
                    if (1 === s) for (; r < n && e[r].end < i + t; ) r++;
                    else if (s > 1) {
                      let o = Array(s).fill(0);
                      for (; r < n && o.some((e) => e < i + t); ) {
                        let t = e[r];
                        ((o[t.lane] = t.end), r++);
                      }
                      let a = Array(s).fill(i + t);
                      for (; l >= 0 && a.some((e) => e >= i); ) {
                        let t = e[l];
                        ((a[t.lane] = t.start), l--);
                      }
                      ((l = Math.max(0, l - (l % s))),
                        (r = Math.min(n, r + (s - 1 - (r % s)))));
                    }
                    return { startIndex: l, endIndex: r };
                  })({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: i,
                    lanes: s,
                  })
                : null),
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualIndexes = s(
          () => {
            let e = null,
              t = null,
              i = this.calculateRange();
            return (
              i && ((e = i.startIndex), (t = i.endIndex)),
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
          (e, t, i, s, n) =>
            null === s || null === n
              ? []
              : e({ startIndex: s, endIndex: n, overscan: t, count: i }),
          { key: !1, debug: () => this.options.debug },
        )),
        (this.indexFromElement = (e) => {
          let t = this.options.indexAttribute,
            i = e.getAttribute(t);
          return i
            ? parseInt(i, 10)
            : (console.warn(
                `Missing attribute name '${t}={index}' on measured element.`,
              ),
              -1);
        }),
        (this._measureElement = (e, t) => {
          let i = this.indexFromElement(e),
            s = this.measurementsCache[i];
          if (!s) return;
          let n = s.key,
            l = this.elementsCache.get(n);
          (l !== e &&
            (l && this.observer.unobserve(l),
            this.observer.observe(e),
            this.elementsCache.set(n, e)),
            e.isConnected &&
              this.resizeItem(i, this.options.measureElement(e, t, this)));
        }),
        (this.resizeItem = (e, t) => {
          let i = this.measurementsCache[e];
          if (!i) return;
          let s = t - (this.itemSizeCache.get(i.key) ?? i.size);
          0 !== s &&
            ((void 0 !== this.shouldAdjustScrollPositionOnItemSizeChange
              ? this.shouldAdjustScrollPositionOnItemSizeChange(i, s, this)
              : i.start < this.getScrollOffset() + this.scrollAdjustments) &&
              this._scrollToOffset(this.getScrollOffset(), {
                adjustments: (this.scrollAdjustments += s),
                behavior: void 0,
              }),
            this.pendingMeasuredCacheIndexes.push(i.index),
            (this.itemSizeCache = new Map(this.itemSizeCache.set(i.key, t))),
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
        (this.getVirtualItems = s(
          () => [this.getVirtualIndexes(), this.getMeasurements()],
          (e, t) => {
            let i = [];
            for (let s = 0, n = e.length; s < n; s++) {
              let n = t[e[s]];
              i.push(n);
            }
            return i;
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualItemForOffset = (e) => {
          let t = this.getMeasurements();
          if (0 !== t.length)
            return n(t[p(0, t.length - 1, (e) => n(t[e]).start, e)]);
        }),
        (this.getOffsetForAlignment = (e, t, i = 0) => {
          let s = this.getSize(),
            n = this.getScrollOffset();
          return (
            "auto" === t && (t = e >= n + s ? "end" : "start"),
            "center" === t ? (e += (i - s) / 2) : "end" === t && (e -= s),
            Math.max(
              Math.min(this.getTotalSize() + this.options.scrollMargin - s, e),
              0,
            )
          );
        }),
        (this.getOffsetForIndex = (e, t = "auto") => {
          e = Math.max(0, Math.min(e, this.options.count - 1));
          let i = this.measurementsCache[e];
          if (!i) return;
          let s = this.getSize(),
            n = this.getScrollOffset();
          if ("auto" === t)
            if (i.end >= n + s - this.options.scrollPaddingEnd) t = "end";
            else {
              if (!(i.start <= n + this.options.scrollPaddingStart))
                return [n, t];
              t = "start";
            }
          let l =
            "end" === t
              ? i.end + this.options.scrollPaddingEnd
              : i.start - this.options.scrollPaddingStart;
          return [this.getOffsetForAlignment(l, t, i.size), t];
        }),
        (this.isDynamicMode = () => this.elementsCache.size > 0),
        (this.scrollToOffset = (
          e,
          { align: t = "start", behavior: i } = {},
        ) => {
          ("smooth" === i &&
            this.isDynamicMode() &&
            console.warn(
              "The `smooth` scroll behavior is not fully supported with dynamic size.",
            ),
            this._scrollToOffset(this.getOffsetForAlignment(e, t), {
              adjustments: void 0,
              behavior: i,
            }));
        }),
        (this.scrollToIndex = (e, { align: t = "auto", behavior: i } = {}) => {
          ("smooth" === i &&
            this.isDynamicMode() &&
            console.warn(
              "The `smooth` scroll behavior is not fully supported with dynamic size.",
            ),
            (e = Math.max(0, Math.min(e, this.options.count - 1))));
          let s = 0,
            n = (t) => {
              if (!this.targetWindow) return;
              let s = this.getOffsetForIndex(e, t);
              if (!s)
                return void console.warn("Failed to get offset for index:", e);
              let [n, r] = s;
              (this._scrollToOffset(n, { adjustments: void 0, behavior: i }),
                this.targetWindow.requestAnimationFrame(() => {
                  let t = this.getScrollOffset(),
                    i = this.getOffsetForIndex(e, r);
                  i
                    ? 1.01 > Math.abs(i[0] - t) || l(r)
                    : console.warn("Failed to get offset for index:", e);
                }));
            },
            l = (t) => {
              this.targetWindow &&
                (++s < 10
                  ? this.targetWindow.requestAnimationFrame(() => n(t))
                  : console.warn(
                      `Failed to scroll to index ${e} after 10 attempts.`,
                    ));
            };
          n(t);
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
            i = this.getMeasurements();
          if (0 === i.length) t = this.options.paddingStart;
          else if (1 === this.options.lanes)
            t = (null == (e = i[i.length - 1]) ? void 0 : e.end) ?? 0;
          else {
            let e = Array(this.options.lanes).fill(null),
              s = i.length - 1;
            for (; s >= 0 && e.some((e) => null === e); ) {
              let t = i[s];
              (null === e[t.lane] && (e[t.lane] = t.end), s--);
            }
            t = Math.max(...e.filter((e) => null !== e));
          }
          return Math.max(
            t - this.options.scrollMargin + this.options.paddingEnd,
            0,
          );
        }),
        (this._scrollToOffset = (e, { adjustments: t, behavior: i }) => {
          this.options.scrollToFn(e, { behavior: i, adjustments: t }, this);
        }),
        (this.measure = () => {
          ((this.itemSizeCache = new Map()),
            (this.laneAssignments = new Map()),
            this.notify(!1));
        }),
        this.setOptions(e));
    }
  }
  let p = (e, t, i, s) => {
      for (; e <= t; ) {
        let n = ((e + t) / 2) | 0,
          l = i(n);
        if (l < s) e = n + 1;
        else {
          if (!(l > s)) return n;
          t = n - 1;
        }
      }
      return e > 0 ? e - 1 : 0;
    },
    g = "u" > typeof document ? t.useLayoutEffect : t.useEffect;
  e.s(
    [
      "f",
      0,
      function (e) {
        return (function (e) {
          let s = t.useReducer(() => ({}), {})[1],
            n = {
              ...e,
              onChange: (t, n) => {
                var l;
                (n ? (0, i.flushSync)(s) : s(),
                  null == (l = e.onChange) || l.call(e, t, n));
              },
            },
            [l] = t.useState(() => new f(n));
          return (
            l.setOptions(n),
            g(() => l._didMount(), []),
            g(() => l._willUpdate()),
            l
          );
        })({
          observeElementRect: a,
          observeElementOffset: h,
          scrollToFn: m,
          ...e,
        });
      },
    ],
    659226,
  );
};
