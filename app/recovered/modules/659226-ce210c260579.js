// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(231332);
  function r(e, t, i) {
    let r,
      n = i.initialDeps ?? [],
      o = !0;
    function a() {
      var a, l, s;
      let c, d;
      i.key && (null == (a = i.debug) ? void 0 : a.call(i)) && (c = Date.now());
      let h = e();
      if (!(h.length !== n.length || h.some((e, t) => n[t] !== e))) return r;
      if (
        ((n = h),
        i.key &&
          (null == (l = i.debug) ? void 0 : l.call(i)) &&
          (d = Date.now()),
        (r = t(...h)),
        i.key && (null == (s = i.debug) ? void 0 : s.call(i)))
      ) {
        let e = Math.round((Date.now() - c) * 100) / 100,
          t = Math.round((Date.now() - d) * 100) / 100,
          r = t / 16,
          n = (e, t) => {
            for (e = String(e); e.length < t; ) e = " " + e;
            return e;
          };
        console.info(
          `%c⏱ ${n(t, 5)} /${n(e, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * r, 120))}deg 100% 31%);`,
          null == i ? void 0 : i.key,
        );
      }
      return (
        (null == i ? void 0 : i.onChange) &&
          !(o && i.skipInitialOnChange) &&
          i.onChange(r),
        (o = !1),
        r
      );
    }
    return (
      (a.updateDeps = (e) => {
        n = e;
      }),
      a
    );
  }
  function n(e, t) {
    if (void 0 !== e) return e;
    throw Error(`Unexpected undefined${t ? `: ${t}` : ""}`);
  }
  let o = (e) => {
      let { offsetWidth: t, offsetHeight: i } = e;
      return { width: t, height: i };
    },
    a = (e) => e,
    l = (e) => {
      let t = Math.max(e.startIndex - e.overscan, 0),
        i = Math.min(e.endIndex + e.overscan, e.count - 1),
        r = [];
      for (let e = t; e <= i; e++) r.push(e);
      return r;
    },
    s = (e, t) => {
      let i = e.scrollElement;
      if (!i) return;
      let r = e.targetWindow;
      if (!r) return;
      let n = (e) => {
        let { width: i, height: r } = e;
        t({ width: Math.round(i), height: Math.round(r) });
      };
      if ((n(o(i)), !r.ResizeObserver)) return () => {};
      let a = new r.ResizeObserver((t) => {
        let r = () => {
          let e = t[0];
          if (null == e ? void 0 : e.borderBoxSize) {
            let t = e.borderBoxSize[0];
            if (t) return void n({ width: t.inlineSize, height: t.blockSize });
          }
          n(o(i));
        };
        e.options.useAnimationFrameWithResizeObserver
          ? requestAnimationFrame(r)
          : r();
      });
      return (
        a.observe(i, { box: "border-box" }),
        () => {
          a.unobserve(i);
        }
      );
    },
    c = { passive: !0 },
    d = "u" < typeof window || "onscrollend" in window,
    h = (e, t) => {
      var i, r;
      let n,
        o = e.scrollElement;
      if (!o) return;
      let a = e.targetWindow;
      if (!a) return;
      let l = 0,
        s =
          e.options.useScrollendEvent && d
            ? () => void 0
            : ((i = () => {
                t(l, !1);
              }),
              (r = e.options.isScrollingResetDelay),
              function (...e) {
                (a.clearTimeout(n),
                  (n = a.setTimeout(() => i.apply(this, e), r)));
              }),
        h = (i) => () => {
          let { horizontal: r, isRtl: n } = e.options;
          ((l = r ? o.scrollLeft * ((n && -1) || 1) : o.scrollTop),
            s(),
            t(l, i));
        },
        u = h(!0),
        p = h(!1);
      (p(), o.addEventListener("scroll", u, c));
      let g = e.options.useScrollendEvent && d;
      return (
        g && o.addEventListener("scrollend", p, c),
        () => {
          (o.removeEventListener("scroll", u),
            g && o.removeEventListener("scrollend", p));
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
    p = (e, { adjustments: t = 0, behavior: i }, r) => {
      var n, o;
      null == (o = null == (n = r.scrollElement) ? void 0 : n.scrollTo) ||
        o.call(n, {
          [r.options.horizontal ? "left" : "top"]: e + t,
          behavior: i,
        });
    };
  class g {
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
              getItemKey: a,
              rangeExtractor: l,
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
        (this.maybeNotify = r(
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
            r = new Map();
          for (let n = t - 1; n >= 0; n--) {
            let t = e[n];
            if (i.has(t.lane)) continue;
            let o = r.get(t.lane);
            if (
              (null == o || t.end > o.end
                ? r.set(t.lane, t)
                : t.end < o.end && i.set(t.lane, !0),
              i.size === this.options.lanes)
            )
              break;
          }
          return r.size === this.options.lanes
            ? Array.from(r.values()).sort((e, t) =>
                e.end === t.end ? e.index - t.index : e.end - t.end,
              )[0]
            : void 0;
        }),
        (this.getMeasurementOptions = r(
          () => [
            this.options.count,
            this.options.paddingStart,
            this.options.scrollMargin,
            this.options.getItemKey,
            this.options.enabled,
            this.options.lanes,
          ],
          (e, t, i, r, n, o) => (
            void 0 !== this.prevLanes &&
              this.prevLanes !== o &&
              (this.lanesChangedFlag = !0),
            (this.prevLanes = o),
            (this.pendingMeasuredCacheIndexes = []),
            {
              count: e,
              paddingStart: t,
              scrollMargin: i,
              getItemKey: r,
              enabled: n,
              lanes: o,
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
        (this.getMeasurements = r(
          () => [this.getMeasurementOptions(), this.itemSizeCache],
          (
            {
              count: e,
              paddingStart: t,
              scrollMargin: i,
              getItemKey: r,
              enabled: n,
              lanes: o,
            },
            a,
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
            let l = this.lanesSettling
              ? 0
              : this.pendingMeasuredCacheIndexes.length > 0
                ? Math.min(...this.pendingMeasuredCacheIndexes)
                : 0;
            ((this.pendingMeasuredCacheIndexes = []),
              this.lanesSettling &&
                this.measurementsCache.length === e &&
                (this.lanesSettling = !1));
            let s = this.measurementsCache.slice(0, l),
              c = Array(o).fill(void 0);
            for (let e = 0; e < l; e++) {
              let t = s[e];
              t && (c[t.lane] = e);
            }
            for (let n = l; n < e; n++) {
              let e,
                o,
                l = r(n),
                d = this.laneAssignments.get(n);
              if (void 0 !== d && this.options.lanes > 1) {
                let r = c[(e = d)],
                  n = void 0 !== r ? s[r] : void 0;
                o = n ? n.end + this.options.gap : t + i;
              } else {
                let r =
                  1 === this.options.lanes
                    ? s[n - 1]
                    : this.getFurthestMeasurement(s, n);
                ((o = r ? r.end + this.options.gap : t + i),
                  (e = r ? r.lane : n % this.options.lanes),
                  this.options.lanes > 1 && this.laneAssignments.set(n, e));
              }
              let h = a.get(l),
                u = "number" == typeof h ? h : this.options.estimateSize(n),
                p = o + u;
              ((s[n] = {
                index: n,
                start: o,
                size: u,
                end: p,
                key: l,
                lane: e,
              }),
                (c[e] = n));
            }
            return ((this.measurementsCache = s), s);
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.calculateRange = r(
          () => [
            this.getMeasurements(),
            this.getSize(),
            this.getScrollOffset(),
            this.options.lanes,
          ],
          (e, t, i, r) =>
            (this.range =
              e.length > 0 && t > 0
                ? (function ({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: i,
                    lanes: r,
                  }) {
                    let n = e.length - 1;
                    if (e.length <= r) return { startIndex: 0, endIndex: n };
                    let o = m(0, n, (t) => e[t].start, i),
                      a = o;
                    if (1 === r) for (; a < n && e[a].end < i + t; ) a++;
                    else if (r > 1) {
                      let l = Array(r).fill(0);
                      for (; a < n && l.some((e) => e < i + t); ) {
                        let t = e[a];
                        ((l[t.lane] = t.end), a++);
                      }
                      let s = Array(r).fill(i + t);
                      for (; o >= 0 && s.some((e) => e >= i); ) {
                        let t = e[o];
                        ((s[t.lane] = t.start), o--);
                      }
                      ((o = Math.max(0, o - (o % r))),
                        (a = Math.min(n, a + (r - 1 - (a % r)))));
                    }
                    return { startIndex: o, endIndex: a };
                  })({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: i,
                    lanes: r,
                  })
                : null),
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualIndexes = r(
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
          (e, t, i, r, n) =>
            null === r || null === n
              ? []
              : e({ startIndex: r, endIndex: n, overscan: t, count: i }),
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
            r = this.measurementsCache[i];
          if (!r) return;
          let n = r.key,
            o = this.elementsCache.get(n);
          (o !== e &&
            (o && this.observer.unobserve(o),
            this.observer.observe(e),
            this.elementsCache.set(n, e)),
            e.isConnected &&
              this.resizeItem(i, this.options.measureElement(e, t, this)));
        }),
        (this.resizeItem = (e, t) => {
          let i = this.measurementsCache[e];
          if (!i) return;
          let r = t - (this.itemSizeCache.get(i.key) ?? i.size);
          0 !== r &&
            ((void 0 !== this.shouldAdjustScrollPositionOnItemSizeChange
              ? this.shouldAdjustScrollPositionOnItemSizeChange(i, r, this)
              : i.start < this.getScrollOffset() + this.scrollAdjustments) &&
              this._scrollToOffset(this.getScrollOffset(), {
                adjustments: (this.scrollAdjustments += r),
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
        (this.getVirtualItems = r(
          () => [this.getVirtualIndexes(), this.getMeasurements()],
          (e, t) => {
            let i = [];
            for (let r = 0, n = e.length; r < n; r++) {
              let n = t[e[r]];
              i.push(n);
            }
            return i;
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualItemForOffset = (e) => {
          let t = this.getMeasurements();
          if (0 !== t.length)
            return n(t[m(0, t.length - 1, (e) => n(t[e]).start, e)]);
        }),
        (this.getOffsetForAlignment = (e, t, i = 0) => {
          let r = this.getSize(),
            n = this.getScrollOffset();
          return (
            "auto" === t && (t = e >= n + r ? "end" : "start"),
            "center" === t ? (e += (i - r) / 2) : "end" === t && (e -= r),
            Math.max(
              Math.min(this.getTotalSize() + this.options.scrollMargin - r, e),
              0,
            )
          );
        }),
        (this.getOffsetForIndex = (e, t = "auto") => {
          e = Math.max(0, Math.min(e, this.options.count - 1));
          let i = this.measurementsCache[e];
          if (!i) return;
          let r = this.getSize(),
            n = this.getScrollOffset();
          if ("auto" === t)
            if (i.end >= n + r - this.options.scrollPaddingEnd) t = "end";
            else {
              if (!(i.start <= n + this.options.scrollPaddingStart))
                return [n, t];
              t = "start";
            }
          let o =
            "end" === t
              ? i.end + this.options.scrollPaddingEnd
              : i.start - this.options.scrollPaddingStart;
          return [this.getOffsetForAlignment(o, t, i.size), t];
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
          let r = 0,
            n = (t) => {
              if (!this.targetWindow) return;
              let r = this.getOffsetForIndex(e, t);
              if (!r)
                return void console.warn("Failed to get offset for index:", e);
              let [n, a] = r;
              (this._scrollToOffset(n, { adjustments: void 0, behavior: i }),
                this.targetWindow.requestAnimationFrame(() => {
                  let t = this.getScrollOffset(),
                    i = this.getOffsetForIndex(e, a);
                  i
                    ? 1.01 > Math.abs(i[0] - t) || o(a)
                    : console.warn("Failed to get offset for index:", e);
                }));
            },
            o = (t) => {
              this.targetWindow &&
                (++r < 10
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
              r = i.length - 1;
            for (; r >= 0 && e.some((e) => null === e); ) {
              let t = i[r];
              (null === e[t.lane] && (e[t.lane] = t.end), r--);
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
  let m = (e, t, i, r) => {
      for (; e <= t; ) {
        let n = ((e + t) / 2) | 0,
          o = i(n);
        if (o < r) e = n + 1;
        else {
          if (!(o > r)) return n;
          t = n - 1;
        }
      }
      return e > 0 ? e - 1 : 0;
    },
    v = "u" > typeof document ? t.useLayoutEffect : t.useEffect;
  e.s(
    [
      "f",
      0,
      function (e) {
        return (function (e) {
          let r = t.useReducer(() => ({}), {})[1],
            n = {
              ...e,
              onChange: (t, n) => {
                var o;
                (n ? (0, i.flushSync)(r) : r(),
                  null == (o = e.onChange) || o.call(e, t, n));
              },
            },
            [o] = t.useState(() => new g(n));
          return (
            o.setOptions(n),
            v(() => o._didMount(), []),
            v(() => o._willUpdate()),
            o
          );
        })({
          observeElementRect: s,
          observeElementOffset: h,
          scrollToFn: p,
          ...e,
        });
      },
    ],
    659226,
  );
};
