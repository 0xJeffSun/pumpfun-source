// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(231332);
  function n(e, t, i) {
    let n,
      a = i.initialDeps ?? [],
      l = !0;
    function r() {
      var r, o, s;
      let c, d;
      i.key && (null == (r = i.debug) ? void 0 : r.call(i)) && (c = Date.now());
      let h = e();
      if (!(h.length !== a.length || h.some((e, t) => a[t] !== e))) return n;
      if (
        ((a = h),
        i.key &&
          (null == (o = i.debug) ? void 0 : o.call(i)) &&
          (d = Date.now()),
        (n = t(...h)),
        i.key && (null == (s = i.debug) ? void 0 : s.call(i)))
      ) {
        let e = Math.round((Date.now() - c) * 100) / 100,
          t = Math.round((Date.now() - d) * 100) / 100,
          n = t / 16,
          a = (e, t) => {
            for (e = String(e); e.length < t; ) e = " " + e;
            return e;
          };
        console.info(
          `%c⏱ ${a(t, 5)} /${a(e, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * n, 120))}deg 100% 31%);`,
          null == i ? void 0 : i.key,
        );
      }
      return (
        (null == i ? void 0 : i.onChange) &&
          !(l && i.skipInitialOnChange) &&
          i.onChange(n),
        (l = !1),
        n
      );
    }
    return (
      (r.updateDeps = (e) => {
        a = e;
      }),
      r
    );
  }
  function a(e, t) {
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
        n = [];
      for (let e = t; e <= i; e++) n.push(e);
      return n;
    },
    s = (e, t) => {
      let i = e.scrollElement;
      if (!i) return;
      let n = e.targetWindow;
      if (!n) return;
      let a = (e) => {
        let { width: i, height: n } = e;
        t({ width: Math.round(i), height: Math.round(n) });
      };
      if ((a(l(i)), !n.ResizeObserver)) return () => {};
      let r = new n.ResizeObserver((t) => {
        let n = () => {
          let e = t[0];
          if (null == e ? void 0 : e.borderBoxSize) {
            let t = e.borderBoxSize[0];
            if (t) return void a({ width: t.inlineSize, height: t.blockSize });
          }
          a(l(i));
        };
        e.options.useAnimationFrameWithResizeObserver
          ? requestAnimationFrame(n)
          : n();
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
      var i, n;
      let a,
        l = e.scrollElement;
      if (!l) return;
      let r = e.targetWindow;
      if (!r) return;
      let o = 0,
        s =
          e.options.useScrollendEvent && d
            ? () => void 0
            : ((i = () => {
                t(o, !1);
              }),
              (n = e.options.isScrollingResetDelay),
              function (...e) {
                (r.clearTimeout(a),
                  (a = r.setTimeout(() => i.apply(this, e), n)));
              }),
        h = (i) => () => {
          let { horizontal: n, isRtl: a } = e.options;
          ((o = n ? l.scrollLeft * ((a && -1) || 1) : l.scrollTop),
            s(),
            t(o, i));
        },
        u = h(!0),
        p = h(!1);
      (p(), l.addEventListener("scroll", u, c));
      let g = e.options.useScrollendEvent && d;
      return (
        g && l.addEventListener("scrollend", p, c),
        () => {
          (l.removeEventListener("scroll", u),
            g && l.removeEventListener("scrollend", p));
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
    p = (e, { adjustments: t = 0, behavior: i }, n) => {
      var a, l;
      null == (l = null == (a = n.scrollElement) ? void 0 : a.scrollTo) ||
        l.call(a, {
          [n.options.horizontal ? "left" : "top"]: e + t,
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
        (this.maybeNotify = n(
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
            n = new Map();
          for (let a = t - 1; a >= 0; a--) {
            let t = e[a];
            if (i.has(t.lane)) continue;
            let l = n.get(t.lane);
            if (
              (null == l || t.end > l.end
                ? n.set(t.lane, t)
                : t.end < l.end && i.set(t.lane, !0),
              i.size === this.options.lanes)
            )
              break;
          }
          return n.size === this.options.lanes
            ? Array.from(n.values()).sort((e, t) =>
                e.end === t.end ? e.index - t.index : e.end - t.end,
              )[0]
            : void 0;
        }),
        (this.getMeasurementOptions = n(
          () => [
            this.options.count,
            this.options.paddingStart,
            this.options.scrollMargin,
            this.options.getItemKey,
            this.options.enabled,
            this.options.lanes,
          ],
          (e, t, i, n, a, l) => (
            void 0 !== this.prevLanes &&
              this.prevLanes !== l &&
              (this.lanesChangedFlag = !0),
            (this.prevLanes = l),
            (this.pendingMeasuredCacheIndexes = []),
            {
              count: e,
              paddingStart: t,
              scrollMargin: i,
              getItemKey: n,
              enabled: a,
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
        (this.getMeasurements = n(
          () => [this.getMeasurementOptions(), this.itemSizeCache],
          (
            {
              count: e,
              paddingStart: t,
              scrollMargin: i,
              getItemKey: n,
              enabled: a,
              lanes: l,
            },
            r,
          ) => {
            if (!a)
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
            let s = this.measurementsCache.slice(0, o),
              c = Array(l).fill(void 0);
            for (let e = 0; e < o; e++) {
              let t = s[e];
              t && (c[t.lane] = e);
            }
            for (let a = o; a < e; a++) {
              let e,
                l,
                o = n(a),
                d = this.laneAssignments.get(a);
              if (void 0 !== d && this.options.lanes > 1) {
                let n = c[(e = d)],
                  a = void 0 !== n ? s[n] : void 0;
                l = a ? a.end + this.options.gap : t + i;
              } else {
                let n =
                  1 === this.options.lanes
                    ? s[a - 1]
                    : this.getFurthestMeasurement(s, a);
                ((l = n ? n.end + this.options.gap : t + i),
                  (e = n ? n.lane : a % this.options.lanes),
                  this.options.lanes > 1 && this.laneAssignments.set(a, e));
              }
              let h = r.get(o),
                u = "number" == typeof h ? h : this.options.estimateSize(a),
                p = l + u;
              ((s[a] = {
                index: a,
                start: l,
                size: u,
                end: p,
                key: o,
                lane: e,
              }),
                (c[e] = a));
            }
            return ((this.measurementsCache = s), s);
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.calculateRange = n(
          () => [
            this.getMeasurements(),
            this.getSize(),
            this.getScrollOffset(),
            this.options.lanes,
          ],
          (e, t, i, n) =>
            (this.range =
              e.length > 0 && t > 0
                ? (function ({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: i,
                    lanes: n,
                  }) {
                    let a = e.length - 1;
                    if (e.length <= n) return { startIndex: 0, endIndex: a };
                    let l = m(0, a, (t) => e[t].start, i),
                      r = l;
                    if (1 === n) for (; r < a && e[r].end < i + t; ) r++;
                    else if (n > 1) {
                      let o = Array(n).fill(0);
                      for (; r < a && o.some((e) => e < i + t); ) {
                        let t = e[r];
                        ((o[t.lane] = t.end), r++);
                      }
                      let s = Array(n).fill(i + t);
                      for (; l >= 0 && s.some((e) => e >= i); ) {
                        let t = e[l];
                        ((s[t.lane] = t.start), l--);
                      }
                      ((l = Math.max(0, l - (l % n))),
                        (r = Math.min(a, r + (n - 1 - (r % n)))));
                    }
                    return { startIndex: l, endIndex: r };
                  })({
                    measurements: e,
                    outerSize: t,
                    scrollOffset: i,
                    lanes: n,
                  })
                : null),
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualIndexes = n(
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
          (e, t, i, n, a) =>
            null === n || null === a
              ? []
              : e({ startIndex: n, endIndex: a, overscan: t, count: i }),
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
            n = this.measurementsCache[i];
          if (!n) return;
          let a = n.key,
            l = this.elementsCache.get(a);
          (l !== e &&
            (l && this.observer.unobserve(l),
            this.observer.observe(e),
            this.elementsCache.set(a, e)),
            e.isConnected &&
              this.resizeItem(i, this.options.measureElement(e, t, this)));
        }),
        (this.resizeItem = (e, t) => {
          let i = this.measurementsCache[e];
          if (!i) return;
          let n = t - (this.itemSizeCache.get(i.key) ?? i.size);
          0 !== n &&
            ((void 0 !== this.shouldAdjustScrollPositionOnItemSizeChange
              ? this.shouldAdjustScrollPositionOnItemSizeChange(i, n, this)
              : i.start < this.getScrollOffset() + this.scrollAdjustments) &&
              this._scrollToOffset(this.getScrollOffset(), {
                adjustments: (this.scrollAdjustments += n),
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
        (this.getVirtualItems = n(
          () => [this.getVirtualIndexes(), this.getMeasurements()],
          (e, t) => {
            let i = [];
            for (let n = 0, a = e.length; n < a; n++) {
              let a = t[e[n]];
              i.push(a);
            }
            return i;
          },
          { key: !1, debug: () => this.options.debug },
        )),
        (this.getVirtualItemForOffset = (e) => {
          let t = this.getMeasurements();
          if (0 !== t.length)
            return a(t[m(0, t.length - 1, (e) => a(t[e]).start, e)]);
        }),
        (this.getOffsetForAlignment = (e, t, i = 0) => {
          let n = this.getSize(),
            a = this.getScrollOffset();
          return (
            "auto" === t && (t = e >= a + n ? "end" : "start"),
            "center" === t ? (e += (i - n) / 2) : "end" === t && (e -= n),
            Math.max(
              Math.min(this.getTotalSize() + this.options.scrollMargin - n, e),
              0,
            )
          );
        }),
        (this.getOffsetForIndex = (e, t = "auto") => {
          e = Math.max(0, Math.min(e, this.options.count - 1));
          let i = this.measurementsCache[e];
          if (!i) return;
          let n = this.getSize(),
            a = this.getScrollOffset();
          if ("auto" === t)
            if (i.end >= a + n - this.options.scrollPaddingEnd) t = "end";
            else {
              if (!(i.start <= a + this.options.scrollPaddingStart))
                return [a, t];
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
          let n = 0,
            a = (t) => {
              if (!this.targetWindow) return;
              let n = this.getOffsetForIndex(e, t);
              if (!n)
                return void console.warn("Failed to get offset for index:", e);
              let [a, r] = n;
              (this._scrollToOffset(a, { adjustments: void 0, behavior: i }),
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
                (++n < 10
                  ? this.targetWindow.requestAnimationFrame(() => a(t))
                  : console.warn(
                      `Failed to scroll to index ${e} after 10 attempts.`,
                    ));
            };
          a(t);
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
              n = i.length - 1;
            for (; n >= 0 && e.some((e) => null === e); ) {
              let t = i[n];
              (null === e[t.lane] && (e[t.lane] = t.end), n--);
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
  let m = (e, t, i, n) => {
      for (; e <= t; ) {
        let a = ((e + t) / 2) | 0,
          l = i(a);
        if (l < n) e = a + 1;
        else {
          if (!(l > n)) return a;
          t = a - 1;
        }
      }
      return e > 0 ? e - 1 : 0;
    },
    w = "u" > typeof document ? t.useLayoutEffect : t.useEffect;
  e.s(
    [
      "f",
      0,
      function (e) {
        return (function (e) {
          let n = t.useReducer(() => ({}), {})[1],
            a = {
              ...e,
              onChange: (t, a) => {
                var l;
                (a ? (0, i.flushSync)(n) : n(),
                  null == (l = e.onChange) || l.call(e, t, a));
              },
            },
            [l] = t.useState(() => new g(a));
          return (
            l.setOptions(a),
            w(() => l._didMount(), []),
            w(() => l._willUpdate()),
            l
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
