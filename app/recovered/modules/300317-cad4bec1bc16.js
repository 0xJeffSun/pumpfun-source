// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  function t(e, t) {
    return "function" == typeof e ? e(t) : e;
  }
  function l(e, l) {
    return (n) => {
      l.setState((l) => ({ ...l, [e]: t(n, l[e]) }));
    };
  }
  function n(e) {
    return e instanceof Function;
  }
  function o(e, t, l) {
    let n,
      o = [];
    return (i) => {
      let r, a;
      l.key && l.debug && (r = Date.now());
      let u = e(i);
      if (!(u.length !== o.length || u.some((e, t) => o[t] !== e))) return n;
      if (
        ((o = u),
        l.key && l.debug && (a = Date.now()),
        (n = t(...u)),
        null == l || null == l.onChange || l.onChange(n),
        l.key && l.debug && null != l && l.debug())
      ) {
        let e = Math.round((Date.now() - r) * 100) / 100,
          t = Math.round((Date.now() - a) * 100) / 100,
          n = t / 16,
          o = (e, t) => {
            for (e = String(e); e.length < t; ) e = " " + e;
            return e;
          };
        console.info(
          `%c⏱ ${o(t, 5)} /${o(e, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * n, 120))}deg 100% 31%);`,
          null == l ? void 0 : l.key,
        );
      }
      return n;
    };
  }
  function i(e, t, l, n) {
    return {
      debug: () => {
        var l;
        return null != (l = null == e ? void 0 : e.debugAll) ? l : e[t];
      },
      key: !1,
      onChange: n,
    };
  }
  let r = "debugHeaders";
  function a(e, t, l) {
    var n;
    let o = {
      id: null != (n = l.id) ? n : t.id,
      column: t,
      index: l.index,
      isPlaceholder: !!l.isPlaceholder,
      placeholderId: l.placeholderId,
      depth: l.depth,
      subHeaders: [],
      colSpan: 0,
      rowSpan: 0,
      headerGroup: null,
      getLeafHeaders: () => {
        let e = [],
          t = (l) => {
            (l.subHeaders && l.subHeaders.length && l.subHeaders.map(t),
              e.push(l));
          };
        return (t(o), e);
      },
      getContext: () => ({ table: e, header: o, column: t }),
    };
    return (
      e._features.forEach((t) => {
        null == t.createHeader || t.createHeader(o, e);
      }),
      o
    );
  }
  function u(e, t, l, n) {
    var o, i;
    let r = 0,
      u = function (e, t) {
        (void 0 === t && (t = 1),
          (r = Math.max(r, t)),
          e
            .filter((e) => e.getIsVisible())
            .forEach((e) => {
              var l;
              null != (l = e.columns) && l.length && u(e.columns, t + 1);
            }, 0));
      };
    u(e);
    let g = [],
      s = (e, t) => {
        let o = {
            depth: t,
            id: [n, `${t}`].filter(Boolean).join("_"),
            headers: [],
          },
          i = [];
        (e.forEach((e) => {
          let r,
            u = [...i].reverse()[0],
            g = e.column.depth === o.depth,
            s = !1;
          if (
            (g && e.column.parent
              ? (r = e.column.parent)
              : ((r = e.column), (s = !0)),
            u && (null == u ? void 0 : u.column) === r)
          )
            u.subHeaders.push(e);
          else {
            let o = a(l, r, {
              id: [n, t, r.id, null == e ? void 0 : e.id]
                .filter(Boolean)
                .join("_"),
              isPlaceholder: s,
              placeholderId: s
                ? `${i.filter((e) => e.column === r).length}`
                : void 0,
              depth: t,
              index: i.length,
            });
            (o.subHeaders.push(e), i.push(o));
          }
          (o.headers.push(e), (e.headerGroup = o));
        }),
          g.push(o),
          t > 0 && s(i, t - 1));
      };
    (s(
      t.map((e, t) => a(l, e, { depth: r, index: t })),
      r - 1,
    ),
      g.reverse());
    let d = (e) =>
      e
        .filter((e) => e.column.getIsVisible())
        .map((e) => {
          let t = 0,
            l = 0,
            n = [0];
          return (
            e.subHeaders && e.subHeaders.length
              ? ((n = []),
                d(e.subHeaders).forEach((e) => {
                  let { colSpan: l, rowSpan: o } = e;
                  ((t += l), n.push(o));
                }))
              : (t = 1),
            (l += Math.min(...n)),
            (e.colSpan = t),
            (e.rowSpan = l),
            { colSpan: t, rowSpan: l }
          );
        });
    return (
      d(null != (o = null == (i = g[0]) ? void 0 : i.headers) ? o : []),
      g
    );
  }
  let g = (e, t, l, n, r, a, u) => {
      let g = {
        id: t,
        index: n,
        original: l,
        depth: r,
        parentId: u,
        _valuesCache: {},
        _uniqueValuesCache: {},
        getValue: (t) => {
          if (g._valuesCache.hasOwnProperty(t)) return g._valuesCache[t];
          let l = e.getColumn(t);
          if (null != l && l.accessorFn)
            return (
              (g._valuesCache[t] = l.accessorFn(g.original, n)),
              g._valuesCache[t]
            );
        },
        getUniqueValues: (t) => {
          if (g._uniqueValuesCache.hasOwnProperty(t))
            return g._uniqueValuesCache[t];
          let l = e.getColumn(t);
          if (null != l && l.accessorFn)
            return (
              l.columnDef.getUniqueValues
                ? (g._uniqueValuesCache[t] = l.columnDef.getUniqueValues(
                    g.original,
                    n,
                  ))
                : (g._uniqueValuesCache[t] = [g.getValue(t)]),
              g._uniqueValuesCache[t]
            );
        },
        renderValue: (t) => {
          var l;
          return null != (l = g.getValue(t))
            ? l
            : e.options.renderFallbackValue;
        },
        subRows: null != a ? a : [],
        getLeafRows: () => {
          var e, t;
          let l, n;
          return (
            (e = g.subRows),
            (t = (e) => e.subRows),
            (l = []),
            (n = (e) => {
              e.forEach((e) => {
                l.push(e);
                let o = t(e);
                null != o && o.length && n(o);
              });
            })(e),
            l
          );
        },
        getParentRow: () => (g.parentId ? e.getRow(g.parentId, !0) : void 0),
        getParentRows: () => {
          let e = [],
            t = g;
          for (;;) {
            let l = t.getParentRow();
            if (!l) break;
            (e.push(l), (t = l));
          }
          return e.reverse();
        },
        getAllCells: o(
          () => [e.getAllLeafColumns()],
          (t) =>
            t.map((t) => {
              var l;
              let n;
              return (
                (l = t.id),
                (n = {
                  id: `${g.id}_${t.id}`,
                  row: g,
                  column: t,
                  getValue: () => g.getValue(l),
                  renderValue: () => {
                    var t;
                    return null != (t = n.getValue())
                      ? t
                      : e.options.renderFallbackValue;
                  },
                  getContext: o(
                    () => [e, t, g, n],
                    (e, t, l, n) => ({
                      table: e,
                      column: t,
                      row: l,
                      cell: n,
                      getValue: n.getValue,
                      renderValue: n.renderValue,
                    }),
                    i(e.options, "debugCells", "cell.getContext"),
                  ),
                }),
                e._features.forEach((l) => {
                  null == l.createCell || l.createCell(n, t, g, e);
                }, {}),
                n
              );
            }),
          i(e.options, "debugRows", "getAllCells"),
        ),
        _getAllCellsByColumnId: o(
          () => [g.getAllCells()],
          (e) => e.reduce((e, t) => ((e[t.column.id] = t), e), {}),
          i(e.options, "debugRows", "getAllCellsByColumnId"),
        ),
      };
      for (let t = 0; t < e._features.length; t++) {
        let l = e._features[t];
        null == l || null == l.createRow || l.createRow(g, e);
      }
      return g;
    },
    s = (e, t, l) => {
      var n, o;
      let i =
        null == l || null == (n = l.toString()) ? void 0 : n.toLowerCase();
      return !!(null == (o = e.getValue(t)) ||
      null == (o = o.toString()) ||
      null == (o = o.toLowerCase())
        ? void 0
        : o.includes(i));
    };
  s.autoRemove = (e) => w(e);
  let d = (e, t, l) => {
    var n;
    return !!(null == (n = e.getValue(t)) || null == (n = n.toString())
      ? void 0
      : n.includes(l));
  };
  d.autoRemove = (e) => w(e);
  let c = (e, t, l) => {
    var n;
    return (
      (null == (n = e.getValue(t)) || null == (n = n.toString())
        ? void 0
        : n.toLowerCase()) === (null == l ? void 0 : l.toLowerCase())
    );
  };
  c.autoRemove = (e) => w(e);
  let p = (e, t, l) => {
    var n;
    return null == (n = e.getValue(t)) ? void 0 : n.includes(l);
  };
  p.autoRemove = (e) => w(e);
  let f = (e, t, l) =>
    !l.some((l) => {
      var n;
      return !(null != (n = e.getValue(t)) && n.includes(l));
    });
  f.autoRemove = (e) => w(e) || !(null != e && e.length);
  let m = (e, t, l) =>
    l.some((l) => {
      var n;
      return null == (n = e.getValue(t)) ? void 0 : n.includes(l);
    });
  m.autoRemove = (e) => w(e) || !(null != e && e.length);
  let C = (e, t, l) => e.getValue(t) === l;
  C.autoRemove = (e) => w(e);
  let S = (e, t, l) => e.getValue(t) == l;
  S.autoRemove = (e) => w(e);
  let v = (e, t, l) => {
    let [n, o] = l,
      i = e.getValue(t);
    return i >= n && i <= o;
  };
  ((v.resolveFilterValue = (e) => {
    let [t, l] = e,
      n = "number" != typeof t ? parseFloat(t) : t,
      o = "number" != typeof l ? parseFloat(l) : l,
      i = null === t || Number.isNaN(n) ? -1 / 0 : n,
      r = null === l || Number.isNaN(o) ? 1 / 0 : o;
    if (i > r) {
      let e = i;
      ((i = r), (r = e));
    }
    return [i, r];
  }),
    (v.autoRemove = (e) => w(e) || (w(e[0]) && w(e[1]))));
  let h = {
    includesString: s,
    includesStringSensitive: d,
    equalsString: c,
    arrIncludes: p,
    arrIncludesAll: f,
    arrIncludesSome: m,
    equals: C,
    weakEquals: S,
    inNumberRange: v,
  };
  function w(e) {
    return null == e || "" === e;
  }
  function R(e, t, l) {
    return (
      (!!e && !!e.autoRemove && e.autoRemove(t, l)) ||
      void 0 === t ||
      ("string" == typeof t && !t)
    );
  }
  let b = {
      sum: (e, t, l) =>
        l.reduce((t, l) => {
          let n = l.getValue(e);
          return t + ("number" == typeof n ? n : 0);
        }, 0),
      min: (e, t, l) => {
        let n;
        return (
          l.forEach((t) => {
            let l = t.getValue(e);
            null != l && (n > l || (void 0 === n && l >= l)) && (n = l);
          }),
          n
        );
      },
      max: (e, t, l) => {
        let n;
        return (
          l.forEach((t) => {
            let l = t.getValue(e);
            null != l && (n < l || (void 0 === n && l >= l)) && (n = l);
          }),
          n
        );
      },
      extent: (e, t, l) => {
        let n, o;
        return (
          l.forEach((t) => {
            let l = t.getValue(e);
            null != l &&
              (void 0 === n
                ? l >= l && (n = o = l)
                : (n > l && (n = l), o < l && (o = l)));
          }),
          [n, o]
        );
      },
      mean: (e, t) => {
        let l = 0,
          n = 0;
        if (
          (t.forEach((t) => {
            let o = t.getValue(e);
            null != o && (o *= 1) >= o && (++l, (n += o));
          }),
          l)
        )
          return n / l;
      },
      median: (e, t) => {
        if (!t.length) return;
        let l = t.map((t) => t.getValue(e));
        if (!(Array.isArray(l) && l.every((e) => "number" == typeof e))) return;
        if (1 === l.length) return l[0];
        let n = Math.floor(l.length / 2),
          o = l.sort((e, t) => e - t);
        return l.length % 2 != 0 ? o[n] : (o[n - 1] + o[n]) / 2;
      },
      unique: (e, t) =>
        Array.from(new Set(t.map((t) => t.getValue(e))).values()),
      uniqueCount: (e, t) => new Set(t.map((t) => t.getValue(e))).size,
      count: (e, t) => t.length,
    },
    F = () => ({ left: [], right: [] }),
    M = { size: 150, minSize: 20, maxSize: Number.MAX_SAFE_INTEGER },
    V = () => ({
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      isResizingColumn: !1,
      columnSizingStart: [],
    }),
    x = null;
  function P(e) {
    return "touchstart" === e.type;
  }
  function I(e, t) {
    return t
      ? "center" === t
        ? e.getCenterVisibleLeafColumns()
        : "left" === t
          ? e.getLeftVisibleLeafColumns()
          : e.getRightVisibleLeafColumns()
      : e.getVisibleLeafColumns();
  }
  let _ = () => ({ pageIndex: 0, pageSize: 10 }),
    y = () => ({ top: [], bottom: [] }),
    L = (e, t, l, n, o) => {
      var i;
      let r = o.getRow(t, !0);
      (l
        ? (r.getCanMultiSelect() || Object.keys(e).forEach((t) => delete e[t]),
          r.getCanSelect() && (e[t] = !0))
        : delete e[t],
        n &&
          null != (i = r.subRows) &&
          i.length &&
          r.getCanSelectSubRows() &&
          r.subRows.forEach((t) => L(e, t.id, l, n, o)));
    };
  function E(e, t) {
    let l = e.getState().rowSelection,
      n = [],
      o = {},
      i = function (e, t) {
        return e
          .map((e) => {
            var t;
            let r = G(e, l);
            if (
              (r && (n.push(e), (o[e.id] = e)),
              null != (t = e.subRows) &&
                t.length &&
                (e = { ...e, subRows: i(e.subRows) }),
              r)
            )
              return e;
          })
          .filter(Boolean);
      };
    return { rows: i(t.rows), flatRows: n, rowsById: o };
  }
  function G(e, t) {
    var l;
    return null != (l = t[e.id]) && l;
  }
  function A(e, t, l) {
    var n;
    if (!(null != (n = e.subRows) && n.length)) return !1;
    let o = !0,
      i = !1;
    return (
      e.subRows.forEach((e) => {
        if (
          (!i || o) &&
          (e.getCanSelect() && (G(e, t) ? (i = !0) : (o = !1)),
          e.subRows && e.subRows.length)
        ) {
          let l = A(e, t);
          "all" === l ? (i = !0) : ("some" === l && (i = !0), (o = !1));
        }
      }),
      o ? "all" : !!i && "some"
    );
  }
  let H = /([0-9]+)/gm;
  function D(e, t) {
    return e === t ? 0 : e > t ? 1 : -1;
  }
  function z(e) {
    return "number" == typeof e
      ? isNaN(e) || 1 / 0 === e || -1 / 0 === e
        ? ""
        : String(e)
      : "string" == typeof e
        ? e
        : "";
  }
  function O(e, t) {
    let l = e.split(H).filter(Boolean),
      n = t.split(H).filter(Boolean);
    for (; l.length && n.length; ) {
      let e = l.shift(),
        t = n.shift(),
        o = parseInt(e, 10),
        i = parseInt(t, 10),
        r = [o, i].sort();
      if (isNaN(r[0])) {
        if (e > t) return 1;
        if (t > e) return -1;
        continue;
      }
      if (isNaN(r[1])) return isNaN(o) ? -1 : 1;
      if (o > i) return 1;
      if (i > o) return -1;
    }
    return l.length - n.length;
  }
  let T = {
      alphanumeric: (e, t, l) =>
        O(z(e.getValue(l)).toLowerCase(), z(t.getValue(l)).toLowerCase()),
      alphanumericCaseSensitive: (e, t, l) =>
        O(z(e.getValue(l)), z(t.getValue(l))),
      text: (e, t, l) =>
        D(z(e.getValue(l)).toLowerCase(), z(t.getValue(l)).toLowerCase()),
      textCaseSensitive: (e, t, l) => D(z(e.getValue(l)), z(t.getValue(l))),
      datetime: (e, t, l) => {
        let n = e.getValue(l),
          o = t.getValue(l);
        return n > o ? 1 : n < o ? -1 : 0;
      },
      basic: (e, t, l) => D(e.getValue(l), t.getValue(l)),
    },
    B = [
      {
        createTable: (e) => {
          ((e.getHeaderGroups = o(
            () => [
              e.getAllColumns(),
              e.getVisibleLeafColumns(),
              e.getState().columnPinning.left,
              e.getState().columnPinning.right,
            ],
            (t, l, n, o) => {
              var i, r;
              let a =
                  null !=
                  (i =
                    null == n
                      ? void 0
                      : n.map((e) => l.find((t) => t.id === e)).filter(Boolean))
                    ? i
                    : [],
                g =
                  null !=
                  (r =
                    null == o
                      ? void 0
                      : o.map((e) => l.find((t) => t.id === e)).filter(Boolean))
                    ? r
                    : [];
              return u(
                t,
                [
                  ...a,
                  ...l.filter(
                    (e) =>
                      !(null != n && n.includes(e.id)) &&
                      !(null != o && o.includes(e.id)),
                  ),
                  ...g,
                ],
                e,
              );
            },
            i(e.options, r, "getHeaderGroups"),
          )),
            (e.getCenterHeaderGroups = o(
              () => [
                e.getAllColumns(),
                e.getVisibleLeafColumns(),
                e.getState().columnPinning.left,
                e.getState().columnPinning.right,
              ],
              (t, l, n, o) =>
                u(
                  t,
                  (l = l.filter(
                    (e) =>
                      !(null != n && n.includes(e.id)) &&
                      !(null != o && o.includes(e.id)),
                  )),
                  e,
                  "center",
                ),
              i(e.options, r, "getCenterHeaderGroups"),
            )),
            (e.getLeftHeaderGroups = o(
              () => [
                e.getAllColumns(),
                e.getVisibleLeafColumns(),
                e.getState().columnPinning.left,
              ],
              (t, l, n) => {
                var o;
                return u(
                  t,
                  null !=
                    (o =
                      null == n
                        ? void 0
                        : n
                            .map((e) => l.find((t) => t.id === e))
                            .filter(Boolean))
                    ? o
                    : [],
                  e,
                  "left",
                );
              },
              i(e.options, r, "getLeftHeaderGroups"),
            )),
            (e.getRightHeaderGroups = o(
              () => [
                e.getAllColumns(),
                e.getVisibleLeafColumns(),
                e.getState().columnPinning.right,
              ],
              (t, l, n) => {
                var o;
                return u(
                  t,
                  null !=
                    (o =
                      null == n
                        ? void 0
                        : n
                            .map((e) => l.find((t) => t.id === e))
                            .filter(Boolean))
                    ? o
                    : [],
                  e,
                  "right",
                );
              },
              i(e.options, r, "getRightHeaderGroups"),
            )),
            (e.getFooterGroups = o(
              () => [e.getHeaderGroups()],
              (e) => [...e].reverse(),
              i(e.options, r, "getFooterGroups"),
            )),
            (e.getLeftFooterGroups = o(
              () => [e.getLeftHeaderGroups()],
              (e) => [...e].reverse(),
              i(e.options, r, "getLeftFooterGroups"),
            )),
            (e.getCenterFooterGroups = o(
              () => [e.getCenterHeaderGroups()],
              (e) => [...e].reverse(),
              i(e.options, r, "getCenterFooterGroups"),
            )),
            (e.getRightFooterGroups = o(
              () => [e.getRightHeaderGroups()],
              (e) => [...e].reverse(),
              i(e.options, r, "getRightFooterGroups"),
            )),
            (e.getFlatHeaders = o(
              () => [e.getHeaderGroups()],
              (e) => e.map((e) => e.headers).flat(),
              i(e.options, r, "getFlatHeaders"),
            )),
            (e.getLeftFlatHeaders = o(
              () => [e.getLeftHeaderGroups()],
              (e) => e.map((e) => e.headers).flat(),
              i(e.options, r, "getLeftFlatHeaders"),
            )),
            (e.getCenterFlatHeaders = o(
              () => [e.getCenterHeaderGroups()],
              (e) => e.map((e) => e.headers).flat(),
              i(e.options, r, "getCenterFlatHeaders"),
            )),
            (e.getRightFlatHeaders = o(
              () => [e.getRightHeaderGroups()],
              (e) => e.map((e) => e.headers).flat(),
              i(e.options, r, "getRightFlatHeaders"),
            )),
            (e.getCenterLeafHeaders = o(
              () => [e.getCenterFlatHeaders()],
              (e) =>
                e.filter((e) => {
                  var t;
                  return !(null != (t = e.subHeaders) && t.length);
                }),
              i(e.options, r, "getCenterLeafHeaders"),
            )),
            (e.getLeftLeafHeaders = o(
              () => [e.getLeftFlatHeaders()],
              (e) =>
                e.filter((e) => {
                  var t;
                  return !(null != (t = e.subHeaders) && t.length);
                }),
              i(e.options, r, "getLeftLeafHeaders"),
            )),
            (e.getRightLeafHeaders = o(
              () => [e.getRightFlatHeaders()],
              (e) =>
                e.filter((e) => {
                  var t;
                  return !(null != (t = e.subHeaders) && t.length);
                }),
              i(e.options, r, "getRightLeafHeaders"),
            )),
            (e.getLeafHeaders = o(
              () => [
                e.getLeftHeaderGroups(),
                e.getCenterHeaderGroups(),
                e.getRightHeaderGroups(),
              ],
              (e, t, l) => {
                var n, o, i, r, a, u;
                return [
                  ...(null != (n = null == (o = e[0]) ? void 0 : o.headers)
                    ? n
                    : []),
                  ...(null != (i = null == (r = t[0]) ? void 0 : r.headers)
                    ? i
                    : []),
                  ...(null != (a = null == (u = l[0]) ? void 0 : u.headers)
                    ? a
                    : []),
                ]
                  .map((e) => e.getLeafHeaders())
                  .flat();
              },
              i(e.options, r, "getLeafHeaders"),
            )));
        },
      },
      {
        getInitialState: (e) => ({ columnVisibility: {}, ...e }),
        getDefaultOptions: (e) => ({
          onColumnVisibilityChange: l("columnVisibility", e),
        }),
        createColumn: (e, t) => {
          ((e.toggleVisibility = (l) => {
            e.getCanHide() &&
              t.setColumnVisibility((t) => ({
                ...t,
                [e.id]: null != l ? l : !e.getIsVisible(),
              }));
          }),
            (e.getIsVisible = () => {
              var l, n;
              let o = e.columns;
              return (
                null ==
                  (l = o.length
                    ? o.some((e) => e.getIsVisible())
                    : null == (n = t.getState().columnVisibility)
                      ? void 0
                      : n[e.id]) || l
              );
            }),
            (e.getCanHide = () => {
              var l, n;
              return (
                (null == (l = e.columnDef.enableHiding) || l) &&
                (null == (n = t.options.enableHiding) || n)
              );
            }),
            (e.getToggleVisibilityHandler = () => (t) => {
              null == e.toggleVisibility ||
                e.toggleVisibility(t.target.checked);
            }));
        },
        createRow: (e, t) => {
          ((e._getAllVisibleCells = o(
            () => [e.getAllCells(), t.getState().columnVisibility],
            (e) => e.filter((e) => e.column.getIsVisible()),
            i(t.options, "debugRows", "_getAllVisibleCells"),
          )),
            (e.getVisibleCells = o(
              () => [
                e.getLeftVisibleCells(),
                e.getCenterVisibleCells(),
                e.getRightVisibleCells(),
              ],
              (e, t, l) => [...e, ...t, ...l],
              i(t.options, "debugRows", "getVisibleCells"),
            )));
        },
        createTable: (e) => {
          let t = (t, l) =>
            o(
              () => [
                l(),
                l()
                  .filter((e) => e.getIsVisible())
                  .map((e) => e.id)
                  .join("_"),
              ],
              (e) =>
                e.filter((e) =>
                  null == e.getIsVisible ? void 0 : e.getIsVisible(),
                ),
              i(e.options, "debugColumns", t),
            );
          ((e.getVisibleFlatColumns = t("getVisibleFlatColumns", () =>
            e.getAllFlatColumns(),
          )),
            (e.getVisibleLeafColumns = t("getVisibleLeafColumns", () =>
              e.getAllLeafColumns(),
            )),
            (e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () =>
              e.getLeftLeafColumns(),
            )),
            (e.getRightVisibleLeafColumns = t(
              "getRightVisibleLeafColumns",
              () => e.getRightLeafColumns(),
            )),
            (e.getCenterVisibleLeafColumns = t(
              "getCenterVisibleLeafColumns",
              () => e.getCenterLeafColumns(),
            )),
            (e.setColumnVisibility = (t) =>
              null == e.options.onColumnVisibilityChange
                ? void 0
                : e.options.onColumnVisibilityChange(t)),
            (e.resetColumnVisibility = (t) => {
              var l;
              e.setColumnVisibility(
                t ? {} : null != (l = e.initialState.columnVisibility) ? l : {},
              );
            }),
            (e.toggleAllColumnsVisible = (t) => {
              var l;
              ((t = null != (l = t) ? l : !e.getIsAllColumnsVisible()),
                e.setColumnVisibility(
                  e
                    .getAllLeafColumns()
                    .reduce(
                      (e, l) => ({
                        ...e,
                        [l.id]: t || !(null != l.getCanHide && l.getCanHide()),
                      }),
                      {},
                    ),
                ));
            }),
            (e.getIsAllColumnsVisible = () =>
              !e
                .getAllLeafColumns()
                .some((e) => !(null != e.getIsVisible && e.getIsVisible()))),
            (e.getIsSomeColumnsVisible = () =>
              e
                .getAllLeafColumns()
                .some((e) =>
                  null == e.getIsVisible ? void 0 : e.getIsVisible(),
                )),
            (e.getToggleAllColumnsVisibilityHandler = () => (t) => {
              var l;
              e.toggleAllColumnsVisible(
                null == (l = t.target) ? void 0 : l.checked,
              );
            }));
        },
      },
      {
        getInitialState: (e) => ({ columnOrder: [], ...e }),
        getDefaultOptions: (e) => ({
          onColumnOrderChange: l("columnOrder", e),
        }),
        createColumn: (e, t) => {
          ((e.getIndex = o(
            (e) => [I(t, e)],
            (t) => t.findIndex((t) => t.id === e.id),
            i(t.options, "debugColumns", "getIndex"),
          )),
            (e.getIsFirstColumn = (l) => {
              var n;
              return (null == (n = I(t, l)[0]) ? void 0 : n.id) === e.id;
            }),
            (e.getIsLastColumn = (l) => {
              var n;
              let o = I(t, l);
              return (null == (n = o[o.length - 1]) ? void 0 : n.id) === e.id;
            }));
        },
        createTable: (e) => {
          ((e.setColumnOrder = (t) =>
            null == e.options.onColumnOrderChange
              ? void 0
              : e.options.onColumnOrderChange(t)),
            (e.resetColumnOrder = (t) => {
              var l;
              e.setColumnOrder(
                t ? [] : null != (l = e.initialState.columnOrder) ? l : [],
              );
            }),
            (e._getOrderColumnsFn = o(
              () => [
                e.getState().columnOrder,
                e.getState().grouping,
                e.options.groupedColumnMode,
              ],
              (e, t, l) => (n) => {
                let o = [];
                if (null != e && e.length) {
                  let t = [...e],
                    l = [...n];
                  for (; l.length && t.length; ) {
                    let e = t.shift(),
                      n = l.findIndex((t) => t.id === e);
                    n > -1 && o.push(l.splice(n, 1)[0]);
                  }
                  o = [...o, ...l];
                } else o = n;
                var i = o;
                if (!(null != t && t.length) || !l) return i;
                let r = i.filter((e) => !t.includes(e.id));
                return "remove" === l
                  ? r
                  : [
                      ...t
                        .map((e) => i.find((t) => t.id === e))
                        .filter(Boolean),
                      ...r,
                    ];
              },
              i(e.options, "debugTable", "_getOrderColumnsFn"),
            )));
        },
      },
      {
        getInitialState: (e) => ({ columnPinning: F(), ...e }),
        getDefaultOptions: (e) => ({
          onColumnPinningChange: l("columnPinning", e),
        }),
        createColumn: (e, t) => {
          ((e.pin = (l) => {
            let n = e
              .getLeafColumns()
              .map((e) => e.id)
              .filter(Boolean);
            t.setColumnPinning((e) => {
              var t, o, i, r, a, u;
              return "right" === l
                ? {
                    left: (null != (i = null == e ? void 0 : e.left)
                      ? i
                      : []
                    ).filter((e) => !(null != n && n.includes(e))),
                    right: [
                      ...(null != (r = null == e ? void 0 : e.right)
                        ? r
                        : []
                      ).filter((e) => !(null != n && n.includes(e))),
                      ...n,
                    ],
                  }
                : "left" === l
                  ? {
                      left: [
                        ...(null != (a = null == e ? void 0 : e.left)
                          ? a
                          : []
                        ).filter((e) => !(null != n && n.includes(e))),
                        ...n,
                      ],
                      right: (null != (u = null == e ? void 0 : e.right)
                        ? u
                        : []
                      ).filter((e) => !(null != n && n.includes(e))),
                    }
                  : {
                      left: (null != (t = null == e ? void 0 : e.left)
                        ? t
                        : []
                      ).filter((e) => !(null != n && n.includes(e))),
                      right: (null != (o = null == e ? void 0 : e.right)
                        ? o
                        : []
                      ).filter((e) => !(null != n && n.includes(e))),
                    };
            });
          }),
            (e.getCanPin = () =>
              e.getLeafColumns().some((e) => {
                var l, n, o;
                return (
                  (null == (l = e.columnDef.enablePinning) || l) &&
                  (null ==
                    (n =
                      null != (o = t.options.enableColumnPinning)
                        ? o
                        : t.options.enablePinning) ||
                    n)
                );
              })),
            (e.getIsPinned = () => {
              let l = e.getLeafColumns().map((e) => e.id),
                { left: n, right: o } = t.getState().columnPinning,
                i = l.some((e) => (null == n ? void 0 : n.includes(e))),
                r = l.some((e) => (null == o ? void 0 : o.includes(e)));
              return i ? "left" : !!r && "right";
            }),
            (e.getPinnedIndex = () => {
              var l, n;
              let o = e.getIsPinned();
              return o
                ? null !=
                  (l =
                    null == (n = t.getState().columnPinning) ||
                    null == (n = n[o])
                      ? void 0
                      : n.indexOf(e.id))
                  ? l
                  : -1
                : 0;
            }));
        },
        createRow: (e, t) => {
          ((e.getCenterVisibleCells = o(
            () => [
              e._getAllVisibleCells(),
              t.getState().columnPinning.left,
              t.getState().columnPinning.right,
            ],
            (e, t, l) => {
              let n = [...(null != t ? t : []), ...(null != l ? l : [])];
              return e.filter((e) => !n.includes(e.column.id));
            },
            i(t.options, "debugRows", "getCenterVisibleCells"),
          )),
            (e.getLeftVisibleCells = o(
              () => [e._getAllVisibleCells(), t.getState().columnPinning.left],
              (e, t) =>
                (null != t ? t : [])
                  .map((t) => e.find((e) => e.column.id === t))
                  .filter(Boolean)
                  .map((e) => ({ ...e, position: "left" })),
              i(t.options, "debugRows", "getLeftVisibleCells"),
            )),
            (e.getRightVisibleCells = o(
              () => [e._getAllVisibleCells(), t.getState().columnPinning.right],
              (e, t) =>
                (null != t ? t : [])
                  .map((t) => e.find((e) => e.column.id === t))
                  .filter(Boolean)
                  .map((e) => ({ ...e, position: "right" })),
              i(t.options, "debugRows", "getRightVisibleCells"),
            )));
        },
        createTable: (e) => {
          ((e.setColumnPinning = (t) =>
            null == e.options.onColumnPinningChange
              ? void 0
              : e.options.onColumnPinningChange(t)),
            (e.resetColumnPinning = (t) => {
              var l, n;
              return e.setColumnPinning(
                t
                  ? F()
                  : null !=
                      (l =
                        null == (n = e.initialState) ? void 0 : n.columnPinning)
                    ? l
                    : F(),
              );
            }),
            (e.getIsSomeColumnsPinned = (t) => {
              var l, n, o;
              let i = e.getState().columnPinning;
              return t
                ? !!(null == (l = i[t]) ? void 0 : l.length)
                : !!(
                    (null == (n = i.left) ? void 0 : n.length) ||
                    (null == (o = i.right) ? void 0 : o.length)
                  );
            }),
            (e.getLeftLeafColumns = o(
              () => [e.getAllLeafColumns(), e.getState().columnPinning.left],
              (e, t) =>
                (null != t ? t : [])
                  .map((t) => e.find((e) => e.id === t))
                  .filter(Boolean),
              i(e.options, "debugColumns", "getLeftLeafColumns"),
            )),
            (e.getRightLeafColumns = o(
              () => [e.getAllLeafColumns(), e.getState().columnPinning.right],
              (e, t) =>
                (null != t ? t : [])
                  .map((t) => e.find((e) => e.id === t))
                  .filter(Boolean),
              i(e.options, "debugColumns", "getRightLeafColumns"),
            )),
            (e.getCenterLeafColumns = o(
              () => [
                e.getAllLeafColumns(),
                e.getState().columnPinning.left,
                e.getState().columnPinning.right,
              ],
              (e, t, l) => {
                let n = [...(null != t ? t : []), ...(null != l ? l : [])];
                return e.filter((e) => !n.includes(e.id));
              },
              i(e.options, "debugColumns", "getCenterLeafColumns"),
            )));
        },
      },
      {
        createColumn: (e, t) => {
          ((e._getFacetedRowModel =
            t.options.getFacetedRowModel &&
            t.options.getFacetedRowModel(t, e.id)),
            (e.getFacetedRowModel = () =>
              e._getFacetedRowModel
                ? e._getFacetedRowModel()
                : t.getPreFilteredRowModel()),
            (e._getFacetedUniqueValues =
              t.options.getFacetedUniqueValues &&
              t.options.getFacetedUniqueValues(t, e.id)),
            (e.getFacetedUniqueValues = () =>
              e._getFacetedUniqueValues
                ? e._getFacetedUniqueValues()
                : new Map()),
            (e._getFacetedMinMaxValues =
              t.options.getFacetedMinMaxValues &&
              t.options.getFacetedMinMaxValues(t, e.id)),
            (e.getFacetedMinMaxValues = () => {
              if (e._getFacetedMinMaxValues) return e._getFacetedMinMaxValues();
            }));
        },
      },
      {
        getDefaultColumnDef: () => ({ filterFn: "auto" }),
        getInitialState: (e) => ({ columnFilters: [], ...e }),
        getDefaultOptions: (e) => ({
          onColumnFiltersChange: l("columnFilters", e),
          filterFromLeafRows: !1,
          maxLeafRowFilterDepth: 100,
        }),
        createColumn: (e, l) => {
          ((e.getAutoFilterFn = () => {
            let t = l.getCoreRowModel().flatRows[0],
              n = null == t ? void 0 : t.getValue(e.id);
            return "string" == typeof n
              ? h.includesString
              : "number" == typeof n
                ? h.inNumberRange
                : "boolean" == typeof n || (null !== n && "object" == typeof n)
                  ? h.equals
                  : Array.isArray(n)
                    ? h.arrIncludes
                    : h.weakEquals;
          }),
            (e.getFilterFn = () => {
              var t, o;
              return n(e.columnDef.filterFn)
                ? e.columnDef.filterFn
                : "auto" === e.columnDef.filterFn
                  ? e.getAutoFilterFn()
                  : null !=
                      (t =
                        null == (o = l.options.filterFns)
                          ? void 0
                          : o[e.columnDef.filterFn])
                    ? t
                    : h[e.columnDef.filterFn];
            }),
            (e.getCanFilter = () => {
              var t, n, o;
              return (
                (null == (t = e.columnDef.enableColumnFilter) || t) &&
                (null == (n = l.options.enableColumnFilters) || n) &&
                (null == (o = l.options.enableFilters) || o) &&
                !!e.accessorFn
              );
            }),
            (e.getIsFiltered = () => e.getFilterIndex() > -1),
            (e.getFilterValue = () => {
              var t;
              return null == (t = l.getState().columnFilters) ||
                null == (t = t.find((t) => t.id === e.id))
                ? void 0
                : t.value;
            }),
            (e.getFilterIndex = () => {
              var t, n;
              return null !=
                (t =
                  null == (n = l.getState().columnFilters)
                    ? void 0
                    : n.findIndex((t) => t.id === e.id))
                ? t
                : -1;
            }),
            (e.setFilterValue = (n) => {
              l.setColumnFilters((l) => {
                var o, i;
                let r = e.getFilterFn(),
                  a = null == l ? void 0 : l.find((t) => t.id === e.id),
                  u = t(n, a ? a.value : void 0);
                if (R(r, u, e))
                  return null !=
                    (o = null == l ? void 0 : l.filter((t) => t.id !== e.id))
                    ? o
                    : [];
                let g = { id: e.id, value: u };
                return a
                  ? null !=
                    (i =
                      null == l
                        ? void 0
                        : l.map((t) => (t.id === e.id ? g : t)))
                    ? i
                    : []
                  : null != l && l.length
                    ? [...l, g]
                    : [g];
              });
            }));
        },
        createRow: (e, t) => {
          ((e.columnFilters = {}), (e.columnFiltersMeta = {}));
        },
        createTable: (e) => {
          ((e.setColumnFilters = (l) => {
            let n = e.getAllLeafColumns();
            null == e.options.onColumnFiltersChange ||
              e.options.onColumnFiltersChange((e) => {
                var o;
                return null == (o = t(l, e))
                  ? void 0
                  : o.filter((e) => {
                      let t = n.find((t) => t.id === e.id);
                      return !(t && R(t.getFilterFn(), e.value, t)) && !0;
                    });
              });
          }),
            (e.resetColumnFilters = (t) => {
              var l, n;
              e.setColumnFilters(
                t
                  ? []
                  : null !=
                      (l =
                        null == (n = e.initialState) ? void 0 : n.columnFilters)
                    ? l
                    : [],
              );
            }),
            (e.getPreFilteredRowModel = () => e.getCoreRowModel()),
            (e.getFilteredRowModel = () =>
              (!e._getFilteredRowModel &&
                e.options.getFilteredRowModel &&
                (e._getFilteredRowModel = e.options.getFilteredRowModel(e)),
              e.options.manualFiltering || !e._getFilteredRowModel)
                ? e.getPreFilteredRowModel()
                : e._getFilteredRowModel()));
        },
      },
      {
        createTable: (e) => {
          ((e._getGlobalFacetedRowModel =
            e.options.getFacetedRowModel &&
            e.options.getFacetedRowModel(e, "__global__")),
            (e.getGlobalFacetedRowModel = () =>
              e.options.manualFiltering || !e._getGlobalFacetedRowModel
                ? e.getPreFilteredRowModel()
                : e._getGlobalFacetedRowModel()),
            (e._getGlobalFacetedUniqueValues =
              e.options.getFacetedUniqueValues &&
              e.options.getFacetedUniqueValues(e, "__global__")),
            (e.getGlobalFacetedUniqueValues = () =>
              e._getGlobalFacetedUniqueValues
                ? e._getGlobalFacetedUniqueValues()
                : new Map()),
            (e._getGlobalFacetedMinMaxValues =
              e.options.getFacetedMinMaxValues &&
              e.options.getFacetedMinMaxValues(e, "__global__")),
            (e.getGlobalFacetedMinMaxValues = () => {
              if (e._getGlobalFacetedMinMaxValues)
                return e._getGlobalFacetedMinMaxValues();
            }));
        },
      },
      {
        getInitialState: (e) => ({ globalFilter: void 0, ...e }),
        getDefaultOptions: (e) => ({
          onGlobalFilterChange: l("globalFilter", e),
          globalFilterFn: "auto",
          getColumnCanGlobalFilter: (t) => {
            var l;
            let n =
              null == (l = e.getCoreRowModel().flatRows[0]) ||
              null == (l = l._getAllCellsByColumnId()[t.id])
                ? void 0
                : l.getValue();
            return "string" == typeof n || "number" == typeof n;
          },
        }),
        createColumn: (e, t) => {
          e.getCanGlobalFilter = () => {
            var l, n, o, i;
            return (
              (null == (l = e.columnDef.enableGlobalFilter) || l) &&
              (null == (n = t.options.enableGlobalFilter) || n) &&
              (null == (o = t.options.enableFilters) || o) &&
              (null ==
                (i =
                  null == t.options.getColumnCanGlobalFilter
                    ? void 0
                    : t.options.getColumnCanGlobalFilter(e)) ||
                i) &&
              !!e.accessorFn
            );
          };
        },
        createTable: (e) => {
          ((e.getGlobalAutoFilterFn = () => h.includesString),
            (e.getGlobalFilterFn = () => {
              var t, l;
              let { globalFilterFn: o } = e.options;
              return n(o)
                ? o
                : "auto" === o
                  ? e.getGlobalAutoFilterFn()
                  : null !=
                      (t = null == (l = e.options.filterFns) ? void 0 : l[o])
                    ? t
                    : h[o];
            }),
            (e.setGlobalFilter = (t) => {
              null == e.options.onGlobalFilterChange ||
                e.options.onGlobalFilterChange(t);
            }),
            (e.resetGlobalFilter = (t) => {
              e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
            }));
        },
      },
      {
        getInitialState: (e) => ({ sorting: [], ...e }),
        getDefaultColumnDef: () => ({ sortingFn: "auto", sortUndefined: 1 }),
        getDefaultOptions: (e) => ({
          onSortingChange: l("sorting", e),
          isMultiSortEvent: (e) => e.shiftKey,
        }),
        createColumn: (e, t) => {
          ((e.getAutoSortingFn = () => {
            let l = t.getFilteredRowModel().flatRows.slice(10),
              n = !1;
            for (let t of l) {
              let l = null == t ? void 0 : t.getValue(e.id);
              if ("[object Date]" === Object.prototype.toString.call(l))
                return T.datetime;
              if ("string" == typeof l && ((n = !0), l.split(H).length > 1))
                return T.alphanumeric;
            }
            return n ? T.text : T.basic;
          }),
            (e.getAutoSortDir = () => {
              let l = t.getFilteredRowModel().flatRows[0];
              return "string" == typeof (null == l ? void 0 : l.getValue(e.id))
                ? "asc"
                : "desc";
            }),
            (e.getSortingFn = () => {
              var l, o;
              if (!e) throw Error();
              return n(e.columnDef.sortingFn)
                ? e.columnDef.sortingFn
                : "auto" === e.columnDef.sortingFn
                  ? e.getAutoSortingFn()
                  : null !=
                      (l =
                        null == (o = t.options.sortingFns)
                          ? void 0
                          : o[e.columnDef.sortingFn])
                    ? l
                    : T[e.columnDef.sortingFn];
            }),
            (e.toggleSorting = (l, n) => {
              let o = e.getNextSortingOrder(),
                i = null != l;
              t.setSorting((r) => {
                let a,
                  u = null == r ? void 0 : r.find((t) => t.id === e.id),
                  g = null == r ? void 0 : r.findIndex((t) => t.id === e.id),
                  s = [],
                  d = i ? l : "desc" === o;
                if (
                  ("toggle" !=
                    (a =
                      null != r && r.length && e.getCanMultiSort() && n
                        ? u
                          ? "toggle"
                          : "add"
                        : null != r && r.length && g !== r.length - 1
                          ? "replace"
                          : u
                            ? "toggle"
                            : "replace") ||
                    i ||
                    o ||
                    (a = "remove"),
                  "add" === a)
                ) {
                  var c;
                  (s = [...r, { id: e.id, desc: d }]).splice(
                    0,
                    s.length -
                      (null != (c = t.options.maxMultiSortColCount)
                        ? c
                        : Number.MAX_SAFE_INTEGER),
                  );
                } else
                  s =
                    "toggle" === a
                      ? r.map((t) => (t.id === e.id ? { ...t, desc: d } : t))
                      : "remove" === a
                        ? r.filter((t) => t.id !== e.id)
                        : [{ id: e.id, desc: d }];
                return s;
              });
            }),
            (e.getFirstSortDir = () => {
              var l, n;
              return (
                null !=
                (l =
                  null != (n = e.columnDef.sortDescFirst)
                    ? n
                    : t.options.sortDescFirst)
                  ? l
                  : "desc" === e.getAutoSortDir()
              )
                ? "desc"
                : "asc";
            }),
            (e.getNextSortingOrder = (l) => {
              var n, o;
              let i = e.getFirstSortDir(),
                r = e.getIsSorted();
              return r
                ? (r === i ||
                    (null != (n = t.options.enableSortingRemoval) && !n) ||
                    (!!l && null != (o = t.options.enableMultiRemove) && !o)) &&
                    ("desc" === r ? "asc" : "desc")
                : i;
            }),
            (e.getCanSort = () => {
              var l, n;
              return (
                (null == (l = e.columnDef.enableSorting) || l) &&
                (null == (n = t.options.enableSorting) || n) &&
                !!e.accessorFn
              );
            }),
            (e.getCanMultiSort = () => {
              var l, n;
              return null !=
                (l =
                  null != (n = e.columnDef.enableMultiSort)
                    ? n
                    : t.options.enableMultiSort)
                ? l
                : !!e.accessorFn;
            }),
            (e.getIsSorted = () => {
              var l;
              let n =
                null == (l = t.getState().sorting)
                  ? void 0
                  : l.find((t) => t.id === e.id);
              return !!n && (n.desc ? "desc" : "asc");
            }),
            (e.getSortIndex = () => {
              var l, n;
              return null !=
                (l =
                  null == (n = t.getState().sorting)
                    ? void 0
                    : n.findIndex((t) => t.id === e.id))
                ? l
                : -1;
            }),
            (e.clearSorting = () => {
              t.setSorting((t) =>
                null != t && t.length ? t.filter((t) => t.id !== e.id) : [],
              );
            }),
            (e.getToggleSortingHandler = () => {
              let l = e.getCanSort();
              return (n) => {
                l &&
                  (null == n.persist || n.persist(),
                  null == e.toggleSorting ||
                    e.toggleSorting(
                      void 0,
                      !!e.getCanMultiSort() &&
                        (null == t.options.isMultiSortEvent
                          ? void 0
                          : t.options.isMultiSortEvent(n)),
                    ));
              };
            }));
        },
        createTable: (e) => {
          ((e.setSorting = (t) =>
            null == e.options.onSortingChange
              ? void 0
              : e.options.onSortingChange(t)),
            (e.resetSorting = (t) => {
              var l, n;
              e.setSorting(
                t
                  ? []
                  : null !=
                      (l = null == (n = e.initialState) ? void 0 : n.sorting)
                    ? l
                    : [],
              );
            }),
            (e.getPreSortedRowModel = () => e.getGroupedRowModel()),
            (e.getSortedRowModel = () =>
              (!e._getSortedRowModel &&
                e.options.getSortedRowModel &&
                (e._getSortedRowModel = e.options.getSortedRowModel(e)),
              e.options.manualSorting || !e._getSortedRowModel)
                ? e.getPreSortedRowModel()
                : e._getSortedRowModel()));
        },
      },
      {
        getDefaultColumnDef: () => ({
          aggregatedCell: (e) => {
            var t, l;
            return null !=
              (t =
                null == (l = e.getValue()) || null == l.toString
                  ? void 0
                  : l.toString())
              ? t
              : null;
          },
          aggregationFn: "auto",
        }),
        getInitialState: (e) => ({ grouping: [], ...e }),
        getDefaultOptions: (e) => ({
          onGroupingChange: l("grouping", e),
          groupedColumnMode: "reorder",
        }),
        createColumn: (e, t) => {
          ((e.toggleGrouping = () => {
            t.setGrouping((t) =>
              null != t && t.includes(e.id)
                ? t.filter((t) => t !== e.id)
                : [...(null != t ? t : []), e.id],
            );
          }),
            (e.getCanGroup = () => {
              var l, n;
              return (
                (null == (l = e.columnDef.enableGrouping) || l) &&
                (null == (n = t.options.enableGrouping) || n) &&
                (!!e.accessorFn || !!e.columnDef.getGroupingValue)
              );
            }),
            (e.getIsGrouped = () => {
              var l;
              return null == (l = t.getState().grouping)
                ? void 0
                : l.includes(e.id);
            }),
            (e.getGroupedIndex = () => {
              var l;
              return null == (l = t.getState().grouping)
                ? void 0
                : l.indexOf(e.id);
            }),
            (e.getToggleGroupingHandler = () => {
              let t = e.getCanGroup();
              return () => {
                t && e.toggleGrouping();
              };
            }),
            (e.getAutoAggregationFn = () => {
              let l = t.getCoreRowModel().flatRows[0],
                n = null == l ? void 0 : l.getValue(e.id);
              return "number" == typeof n
                ? b.sum
                : "[object Date]" === Object.prototype.toString.call(n)
                  ? b.extent
                  : void 0;
            }),
            (e.getAggregationFn = () => {
              var l, o;
              if (!e) throw Error();
              return n(e.columnDef.aggregationFn)
                ? e.columnDef.aggregationFn
                : "auto" === e.columnDef.aggregationFn
                  ? e.getAutoAggregationFn()
                  : null !=
                      (l =
                        null == (o = t.options.aggregationFns)
                          ? void 0
                          : o[e.columnDef.aggregationFn])
                    ? l
                    : b[e.columnDef.aggregationFn];
            }));
        },
        createTable: (e) => {
          ((e.setGrouping = (t) =>
            null == e.options.onGroupingChange
              ? void 0
              : e.options.onGroupingChange(t)),
            (e.resetGrouping = (t) => {
              var l, n;
              e.setGrouping(
                t
                  ? []
                  : null !=
                      (l = null == (n = e.initialState) ? void 0 : n.grouping)
                    ? l
                    : [],
              );
            }),
            (e.getPreGroupedRowModel = () => e.getFilteredRowModel()),
            (e.getGroupedRowModel = () =>
              (!e._getGroupedRowModel &&
                e.options.getGroupedRowModel &&
                (e._getGroupedRowModel = e.options.getGroupedRowModel(e)),
              e.options.manualGrouping || !e._getGroupedRowModel)
                ? e.getPreGroupedRowModel()
                : e._getGroupedRowModel()));
        },
        createRow: (e, t) => {
          ((e.getIsGrouped = () => !!e.groupingColumnId),
            (e.getGroupingValue = (l) => {
              if (e._groupingValuesCache.hasOwnProperty(l))
                return e._groupingValuesCache[l];
              let n = t.getColumn(l);
              return null != n && n.columnDef.getGroupingValue
                ? ((e._groupingValuesCache[l] = n.columnDef.getGroupingValue(
                    e.original,
                  )),
                  e._groupingValuesCache[l])
                : e.getValue(l);
            }),
            (e._groupingValuesCache = {}));
        },
        createCell: (e, t, l, n) => {
          ((e.getIsGrouped = () =>
            t.getIsGrouped() && t.id === l.groupingColumnId),
            (e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped()),
            (e.getIsAggregated = () => {
              var t;
              return (
                !e.getIsGrouped() &&
                !e.getIsPlaceholder() &&
                !!(null != (t = l.subRows) && t.length)
              );
            }));
        },
      },
      {
        getInitialState: (e) => ({ expanded: {}, ...e }),
        getDefaultOptions: (e) => ({
          onExpandedChange: l("expanded", e),
          paginateExpandedRows: !0,
        }),
        createTable: (e) => {
          let t = !1,
            l = !1;
          ((e._autoResetExpanded = () => {
            var n, o;
            if (!t)
              return void e._queue(() => {
                t = !0;
              });
            if (
              null !=
              (n =
                null != (o = e.options.autoResetAll)
                  ? o
                  : e.options.autoResetExpanded)
                ? n
                : !e.options.manualExpanding
            ) {
              if (l) return;
              ((l = !0),
                e._queue(() => {
                  (e.resetExpanded(), (l = !1));
                }));
            }
          }),
            (e.setExpanded = (t) =>
              null == e.options.onExpandedChange
                ? void 0
                : e.options.onExpandedChange(t)),
            (e.toggleAllRowsExpanded = (t) => {
              (null != t ? t : !e.getIsAllRowsExpanded())
                ? e.setExpanded(!0)
                : e.setExpanded({});
            }),
            (e.resetExpanded = (t) => {
              var l, n;
              e.setExpanded(
                t
                  ? {}
                  : null !=
                      (l = null == (n = e.initialState) ? void 0 : n.expanded)
                    ? l
                    : {},
              );
            }),
            (e.getCanSomeRowsExpand = () =>
              e
                .getPrePaginationRowModel()
                .flatRows.some((e) => e.getCanExpand())),
            (e.getToggleAllRowsExpandedHandler = () => (t) => {
              (null == t.persist || t.persist(), e.toggleAllRowsExpanded());
            }),
            (e.getIsSomeRowsExpanded = () => {
              let t = e.getState().expanded;
              return !0 === t || Object.values(t).some(Boolean);
            }),
            (e.getIsAllRowsExpanded = () => {
              let t = e.getState().expanded;
              return "boolean" == typeof t
                ? !0 === t
                : !(
                    !Object.keys(t).length ||
                    e.getRowModel().flatRows.some((e) => !e.getIsExpanded())
                  );
            }),
            (e.getExpandedDepth = () => {
              let t = 0;
              return (
                (!0 === e.getState().expanded
                  ? Object.keys(e.getRowModel().rowsById)
                  : Object.keys(e.getState().expanded)
                ).forEach((e) => {
                  let l = e.split(".");
                  t = Math.max(t, l.length);
                }),
                t
              );
            }),
            (e.getPreExpandedRowModel = () => e.getSortedRowModel()),
            (e.getExpandedRowModel = () =>
              (!e._getExpandedRowModel &&
                e.options.getExpandedRowModel &&
                (e._getExpandedRowModel = e.options.getExpandedRowModel(e)),
              e.options.manualExpanding || !e._getExpandedRowModel)
                ? e.getPreExpandedRowModel()
                : e._getExpandedRowModel()));
        },
        createRow: (e, t) => {
          ((e.toggleExpanded = (l) => {
            t.setExpanded((n) => {
              var o;
              let i = !0 === n || !!(null != n && n[e.id]),
                r = {};
              if (
                (!0 === n
                  ? Object.keys(t.getRowModel().rowsById).forEach((e) => {
                      r[e] = !0;
                    })
                  : (r = n),
                (l = null != (o = l) ? o : !i),
                !i && l)
              )
                return { ...r, [e.id]: !0 };
              if (i && !l) {
                let { [e.id]: t, ...l } = r;
                return l;
              }
              return n;
            });
          }),
            (e.getIsExpanded = () => {
              var l;
              let n = t.getState().expanded;
              return !!(null !=
              (l =
                null == t.options.getIsRowExpanded
                  ? void 0
                  : t.options.getIsRowExpanded(e))
                ? l
                : !0 === n || (null == n ? void 0 : n[e.id]));
            }),
            (e.getCanExpand = () => {
              var l, n, o;
              return null !=
                (l =
                  null == t.options.getRowCanExpand
                    ? void 0
                    : t.options.getRowCanExpand(e))
                ? l
                : (null == (n = t.options.enableExpanding) || n) &&
                    !!(null != (o = e.subRows) && o.length);
            }),
            (e.getIsAllParentsExpanded = () => {
              let l = !0,
                n = e;
              for (; l && n.parentId; )
                l = (n = t.getRow(n.parentId, !0)).getIsExpanded();
              return l;
            }),
            (e.getToggleExpandedHandler = () => {
              let t = e.getCanExpand();
              return () => {
                t && e.toggleExpanded();
              };
            }));
        },
      },
      {
        getInitialState: (e) => ({
          ...e,
          pagination: { ..._(), ...(null == e ? void 0 : e.pagination) },
        }),
        getDefaultOptions: (e) => ({ onPaginationChange: l("pagination", e) }),
        createTable: (e) => {
          let l = !1,
            n = !1;
          ((e._autoResetPageIndex = () => {
            var t, o;
            if (!l)
              return void e._queue(() => {
                l = !0;
              });
            if (
              null !=
              (t =
                null != (o = e.options.autoResetAll)
                  ? o
                  : e.options.autoResetPageIndex)
                ? t
                : !e.options.manualPagination
            ) {
              if (n) return;
              ((n = !0),
                e._queue(() => {
                  (e.resetPageIndex(), (n = !1));
                }));
            }
          }),
            (e.setPagination = (l) =>
              null == e.options.onPaginationChange
                ? void 0
                : e.options.onPaginationChange((e) => t(l, e))),
            (e.resetPagination = (t) => {
              var l;
              e.setPagination(
                t ? _() : null != (l = e.initialState.pagination) ? l : _(),
              );
            }),
            (e.setPageIndex = (l) => {
              e.setPagination((n) => {
                let o = t(l, n.pageIndex);
                return (
                  (o = Math.max(
                    0,
                    Math.min(
                      o,
                      void 0 === e.options.pageCount ||
                        -1 === e.options.pageCount
                        ? Number.MAX_SAFE_INTEGER
                        : e.options.pageCount - 1,
                    ),
                  )),
                  { ...n, pageIndex: o }
                );
              });
            }),
            (e.resetPageIndex = (t) => {
              var l, n;
              e.setPageIndex(
                t
                  ? 0
                  : null !=
                      (l =
                        null == (n = e.initialState) ||
                        null == (n = n.pagination)
                          ? void 0
                          : n.pageIndex)
                    ? l
                    : 0,
              );
            }),
            (e.resetPageSize = (t) => {
              var l, n;
              e.setPageSize(
                t
                  ? 10
                  : null !=
                      (l =
                        null == (n = e.initialState) ||
                        null == (n = n.pagination)
                          ? void 0
                          : n.pageSize)
                    ? l
                    : 10,
              );
            }),
            (e.setPageSize = (l) => {
              e.setPagination((e) => {
                let n = Math.max(1, t(l, e.pageSize)),
                  o = Math.floor((e.pageSize * e.pageIndex) / n);
                return { ...e, pageIndex: o, pageSize: n };
              });
            }),
            (e.setPageCount = (l) =>
              e.setPagination((n) => {
                var o;
                let i = t(l, null != (o = e.options.pageCount) ? o : -1);
                return (
                  "number" == typeof i && (i = Math.max(-1, i)),
                  { ...n, pageCount: i }
                );
              })),
            (e.getPageOptions = o(
              () => [e.getPageCount()],
              (e) => {
                let t = [];
                return (
                  e && e > 0 && (t = [...Array(e)].fill(null).map((e, t) => t)),
                  t
                );
              },
              i(e.options, "debugTable", "getPageOptions"),
            )),
            (e.getCanPreviousPage = () =>
              e.getState().pagination.pageIndex > 0),
            (e.getCanNextPage = () => {
              let { pageIndex: t } = e.getState().pagination,
                l = e.getPageCount();
              return -1 === l || (0 !== l && t < l - 1);
            }),
            (e.previousPage = () => e.setPageIndex((e) => e - 1)),
            (e.nextPage = () => e.setPageIndex((e) => e + 1)),
            (e.firstPage = () => e.setPageIndex(0)),
            (e.lastPage = () => e.setPageIndex(e.getPageCount() - 1)),
            (e.getPrePaginationRowModel = () => e.getExpandedRowModel()),
            (e.getPaginationRowModel = () =>
              (!e._getPaginationRowModel &&
                e.options.getPaginationRowModel &&
                (e._getPaginationRowModel = e.options.getPaginationRowModel(e)),
              e.options.manualPagination || !e._getPaginationRowModel)
                ? e.getPrePaginationRowModel()
                : e._getPaginationRowModel()),
            (e.getPageCount = () => {
              var t;
              return null != (t = e.options.pageCount)
                ? t
                : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
            }),
            (e.getRowCount = () => {
              var t;
              return null != (t = e.options.rowCount)
                ? t
                : e.getPrePaginationRowModel().rows.length;
            }));
        },
      },
      {
        getInitialState: (e) => ({ rowPinning: y(), ...e }),
        getDefaultOptions: (e) => ({ onRowPinningChange: l("rowPinning", e) }),
        createRow: (e, t) => {
          ((e.pin = (l, n, o) => {
            let i = n
                ? e.getLeafRows().map((e) => {
                    let { id: t } = e;
                    return t;
                  })
                : [],
              r = new Set([
                ...(o
                  ? e.getParentRows().map((e) => {
                      let { id: t } = e;
                      return t;
                    })
                  : []),
                e.id,
                ...i,
              ]);
            t.setRowPinning((e) => {
              var t, n, o, i, a, u;
              return "bottom" === l
                ? {
                    top: (null != (o = null == e ? void 0 : e.top)
                      ? o
                      : []
                    ).filter((e) => !(null != r && r.has(e))),
                    bottom: [
                      ...(null != (i = null == e ? void 0 : e.bottom)
                        ? i
                        : []
                      ).filter((e) => !(null != r && r.has(e))),
                      ...Array.from(r),
                    ],
                  }
                : "top" === l
                  ? {
                      top: [
                        ...(null != (a = null == e ? void 0 : e.top)
                          ? a
                          : []
                        ).filter((e) => !(null != r && r.has(e))),
                        ...Array.from(r),
                      ],
                      bottom: (null != (u = null == e ? void 0 : e.bottom)
                        ? u
                        : []
                      ).filter((e) => !(null != r && r.has(e))),
                    }
                  : {
                      top: (null != (t = null == e ? void 0 : e.top)
                        ? t
                        : []
                      ).filter((e) => !(null != r && r.has(e))),
                      bottom: (null != (n = null == e ? void 0 : e.bottom)
                        ? n
                        : []
                      ).filter((e) => !(null != r && r.has(e))),
                    };
            });
          }),
            (e.getCanPin = () => {
              var l;
              let { enableRowPinning: n, enablePinning: o } = t.options;
              return "function" == typeof n
                ? n(e)
                : null == (l = null != n ? n : o) || l;
            }),
            (e.getIsPinned = () => {
              let l = [e.id],
                { top: n, bottom: o } = t.getState().rowPinning,
                i = l.some((e) => (null == n ? void 0 : n.includes(e))),
                r = l.some((e) => (null == o ? void 0 : o.includes(e)));
              return i ? "top" : !!r && "bottom";
            }),
            (e.getPinnedIndex = () => {
              var l, n;
              let o = e.getIsPinned();
              if (!o) return -1;
              let i =
                null == (l = "top" === o ? t.getTopRows() : t.getBottomRows())
                  ? void 0
                  : l.map((e) => {
                      let { id: t } = e;
                      return t;
                    });
              return null != (n = null == i ? void 0 : i.indexOf(e.id))
                ? n
                : -1;
            }));
        },
        createTable: (e) => {
          ((e.setRowPinning = (t) =>
            null == e.options.onRowPinningChange
              ? void 0
              : e.options.onRowPinningChange(t)),
            (e.resetRowPinning = (t) => {
              var l, n;
              return e.setRowPinning(
                t
                  ? y()
                  : null !=
                      (l = null == (n = e.initialState) ? void 0 : n.rowPinning)
                    ? l
                    : y(),
              );
            }),
            (e.getIsSomeRowsPinned = (t) => {
              var l, n, o;
              let i = e.getState().rowPinning;
              return t
                ? !!(null == (l = i[t]) ? void 0 : l.length)
                : !!(
                    (null == (n = i.top) ? void 0 : n.length) ||
                    (null == (o = i.bottom) ? void 0 : o.length)
                  );
            }),
            (e._getPinnedRows = (t, l, n) => {
              var o;
              return (
                null == (o = e.options.keepPinnedRows) || o
                  ? (null != l ? l : []).map((t) => {
                      let l = e.getRow(t, !0);
                      return l.getIsAllParentsExpanded() ? l : null;
                    })
                  : (null != l ? l : []).map((e) => t.find((t) => t.id === e))
              )
                .filter(Boolean)
                .map((e) => ({ ...e, position: n }));
            }),
            (e.getTopRows = o(
              () => [e.getRowModel().rows, e.getState().rowPinning.top],
              (t, l) => e._getPinnedRows(t, l, "top"),
              i(e.options, "debugRows", "getTopRows"),
            )),
            (e.getBottomRows = o(
              () => [e.getRowModel().rows, e.getState().rowPinning.bottom],
              (t, l) => e._getPinnedRows(t, l, "bottom"),
              i(e.options, "debugRows", "getBottomRows"),
            )),
            (e.getCenterRows = o(
              () => [
                e.getRowModel().rows,
                e.getState().rowPinning.top,
                e.getState().rowPinning.bottom,
              ],
              (e, t, l) => {
                let n = new Set([
                  ...(null != t ? t : []),
                  ...(null != l ? l : []),
                ]);
                return e.filter((e) => !n.has(e.id));
              },
              i(e.options, "debugRows", "getCenterRows"),
            )));
        },
      },
      {
        getInitialState: (e) => ({ rowSelection: {}, ...e }),
        getDefaultOptions: (e) => ({
          onRowSelectionChange: l("rowSelection", e),
          enableRowSelection: !0,
          enableMultiRowSelection: !0,
          enableSubRowSelection: !0,
        }),
        createTable: (e) => {
          ((e.setRowSelection = (t) =>
            null == e.options.onRowSelectionChange
              ? void 0
              : e.options.onRowSelectionChange(t)),
            (e.resetRowSelection = (t) => {
              var l;
              return e.setRowSelection(
                t ? {} : null != (l = e.initialState.rowSelection) ? l : {},
              );
            }),
            (e.toggleAllRowsSelected = (t) => {
              e.setRowSelection((l) => {
                t = void 0 !== t ? t : !e.getIsAllRowsSelected();
                let n = { ...l },
                  o = e.getPreGroupedRowModel().flatRows;
                return (
                  t
                    ? o.forEach((e) => {
                        e.getCanSelect() && (n[e.id] = !0);
                      })
                    : o.forEach((e) => {
                        delete n[e.id];
                      }),
                  n
                );
              });
            }),
            (e.toggleAllPageRowsSelected = (t) =>
              e.setRowSelection((l) => {
                let n = void 0 !== t ? t : !e.getIsAllPageRowsSelected(),
                  o = { ...l };
                return (
                  e.getRowModel().rows.forEach((t) => {
                    L(o, t.id, n, !0, e);
                  }),
                  o
                );
              })),
            (e.getPreSelectedRowModel = () => e.getCoreRowModel()),
            (e.getSelectedRowModel = o(
              () => [e.getState().rowSelection, e.getCoreRowModel()],
              (t, l) =>
                Object.keys(t).length
                  ? E(e, l)
                  : { rows: [], flatRows: [], rowsById: {} },
              i(e.options, "debugTable", "getSelectedRowModel"),
            )),
            (e.getFilteredSelectedRowModel = o(
              () => [e.getState().rowSelection, e.getFilteredRowModel()],
              (t, l) =>
                Object.keys(t).length
                  ? E(e, l)
                  : { rows: [], flatRows: [], rowsById: {} },
              i(e.options, "debugTable", "getFilteredSelectedRowModel"),
            )),
            (e.getGroupedSelectedRowModel = o(
              () => [e.getState().rowSelection, e.getSortedRowModel()],
              (t, l) =>
                Object.keys(t).length
                  ? E(e, l)
                  : { rows: [], flatRows: [], rowsById: {} },
              i(e.options, "debugTable", "getGroupedSelectedRowModel"),
            )),
            (e.getIsAllRowsSelected = () => {
              let t = e.getFilteredRowModel().flatRows,
                { rowSelection: l } = e.getState(),
                n = !!(t.length && Object.keys(l).length);
              return (
                n && t.some((e) => e.getCanSelect() && !l[e.id]) && (n = !1),
                n
              );
            }),
            (e.getIsAllPageRowsSelected = () => {
              let t = e
                  .getPaginationRowModel()
                  .flatRows.filter((e) => e.getCanSelect()),
                { rowSelection: l } = e.getState(),
                n = !!t.length;
              return (n && t.some((e) => !l[e.id]) && (n = !1), n);
            }),
            (e.getIsSomeRowsSelected = () => {
              var t;
              let l = Object.keys(
                null != (t = e.getState().rowSelection) ? t : {},
              ).length;
              return l > 0 && l < e.getFilteredRowModel().flatRows.length;
            }),
            (e.getIsSomePageRowsSelected = () => {
              let t = e.getPaginationRowModel().flatRows;
              return (
                !e.getIsAllPageRowsSelected() &&
                t
                  .filter((e) => e.getCanSelect())
                  .some((e) => e.getIsSelected() || e.getIsSomeSelected())
              );
            }),
            (e.getToggleAllRowsSelectedHandler = () => (t) => {
              e.toggleAllRowsSelected(t.target.checked);
            }),
            (e.getToggleAllPageRowsSelectedHandler = () => (t) => {
              e.toggleAllPageRowsSelected(t.target.checked);
            }));
        },
        createRow: (e, t) => {
          ((e.toggleSelected = (l, n) => {
            let o = e.getIsSelected();
            t.setRowSelection((i) => {
              var r;
              if (((l = void 0 !== l ? l : !o), e.getCanSelect() && o === l))
                return i;
              let a = { ...i };
              return (
                L(
                  a,
                  e.id,
                  l,
                  null == (r = null == n ? void 0 : n.selectChildren) || r,
                  t,
                ),
                a
              );
            });
          }),
            (e.getIsSelected = () => {
              let { rowSelection: l } = t.getState();
              return G(e, l);
            }),
            (e.getIsSomeSelected = () => {
              let { rowSelection: l } = t.getState();
              return "some" === A(e, l);
            }),
            (e.getIsAllSubRowsSelected = () => {
              let { rowSelection: l } = t.getState();
              return "all" === A(e, l);
            }),
            (e.getCanSelect = () => {
              var l;
              return "function" == typeof t.options.enableRowSelection
                ? t.options.enableRowSelection(e)
                : null == (l = t.options.enableRowSelection) || l;
            }),
            (e.getCanSelectSubRows = () => {
              var l;
              return "function" == typeof t.options.enableSubRowSelection
                ? t.options.enableSubRowSelection(e)
                : null == (l = t.options.enableSubRowSelection) || l;
            }),
            (e.getCanMultiSelect = () => {
              var l;
              return "function" == typeof t.options.enableMultiRowSelection
                ? t.options.enableMultiRowSelection(e)
                : null == (l = t.options.enableMultiRowSelection) || l;
            }),
            (e.getToggleSelectedHandler = () => {
              let t = e.getCanSelect();
              return (l) => {
                var n;
                t &&
                  e.toggleSelected(null == (n = l.target) ? void 0 : n.checked);
              };
            }));
        },
      },
      {
        getDefaultColumnDef: () => M,
        getInitialState: (e) => ({
          columnSizing: {},
          columnSizingInfo: V(),
          ...e,
        }),
        getDefaultOptions: (e) => ({
          columnResizeMode: "onEnd",
          columnResizeDirection: "ltr",
          onColumnSizingChange: l("columnSizing", e),
          onColumnSizingInfoChange: l("columnSizingInfo", e),
        }),
        createColumn: (e, t) => {
          ((e.getSize = () => {
            var l, n, o;
            let i = t.getState().columnSizing[e.id];
            return Math.min(
              Math.max(
                null != (l = e.columnDef.minSize) ? l : M.minSize,
                null != (n = null != i ? i : e.columnDef.size) ? n : M.size,
              ),
              null != (o = e.columnDef.maxSize) ? o : M.maxSize,
            );
          }),
            (e.getStart = o(
              (e) => [e, I(t, e), t.getState().columnSizing],
              (t, l) =>
                l.slice(0, e.getIndex(t)).reduce((e, t) => e + t.getSize(), 0),
              i(t.options, "debugColumns", "getStart"),
            )),
            (e.getAfter = o(
              (e) => [e, I(t, e), t.getState().columnSizing],
              (t, l) =>
                l.slice(e.getIndex(t) + 1).reduce((e, t) => e + t.getSize(), 0),
              i(t.options, "debugColumns", "getAfter"),
            )),
            (e.resetSize = () => {
              t.setColumnSizing((t) => {
                let { [e.id]: l, ...n } = t;
                return n;
              });
            }),
            (e.getCanResize = () => {
              var l, n;
              return (
                (null == (l = e.columnDef.enableResizing) || l) &&
                (null == (n = t.options.enableColumnResizing) || n)
              );
            }),
            (e.getIsResizing = () =>
              t.getState().columnSizingInfo.isResizingColumn === e.id));
        },
        createHeader: (e, t) => {
          ((e.getSize = () => {
            let t = 0,
              l = (e) => {
                if (e.subHeaders.length) e.subHeaders.forEach(l);
                else {
                  var n;
                  t += null != (n = e.column.getSize()) ? n : 0;
                }
              };
            return (l(e), t);
          }),
            (e.getStart = () => {
              if (e.index > 0) {
                let t = e.headerGroup.headers[e.index - 1];
                return t.getStart() + t.getSize();
              }
              return 0;
            }),
            (e.getResizeHandler = (l) => {
              let n = t.getColumn(e.column.id),
                o = null == n ? void 0 : n.getCanResize();
              return (i) => {
                if (
                  !n ||
                  !o ||
                  (null == i.persist || i.persist(),
                  P(i) && i.touches && i.touches.length > 1)
                )
                  return;
                let r = e.getSize(),
                  a = e
                    ? e
                        .getLeafHeaders()
                        .map((e) => [e.column.id, e.column.getSize()])
                    : [[n.id, n.getSize()]],
                  u = P(i) ? Math.round(i.touches[0].clientX) : i.clientX,
                  g = {},
                  s = (e, l) => {
                    "number" == typeof l &&
                      (t.setColumnSizingInfo((e) => {
                        var n, o;
                        let i =
                            "rtl" === t.options.columnResizeDirection ? -1 : 1,
                          r =
                            (l -
                              (null != (n = null == e ? void 0 : e.startOffset)
                                ? n
                                : 0)) *
                            i,
                          a = Math.max(
                            r /
                              (null != (o = null == e ? void 0 : e.startSize)
                                ? o
                                : 0),
                            -0.999999,
                          );
                        return (
                          e.columnSizingStart.forEach((e) => {
                            let [t, l] = e;
                            g[t] =
                              Math.round(100 * Math.max(l + l * a, 0)) / 100;
                          }),
                          { ...e, deltaOffset: r, deltaPercentage: a }
                        );
                      }),
                      ("onChange" === t.options.columnResizeMode ||
                        "end" === e) &&
                        t.setColumnSizing((e) => ({ ...e, ...g })));
                  },
                  d = (e) => {
                    (s("end", e),
                      t.setColumnSizingInfo((e) => ({
                        ...e,
                        isResizingColumn: !1,
                        startOffset: null,
                        startSize: null,
                        deltaOffset: null,
                        deltaPercentage: null,
                        columnSizingStart: [],
                      })));
                  },
                  c = l || "u" > typeof document ? document : null,
                  p = {
                    moveHandler: (e) => s("move", e.clientX),
                    upHandler: (e) => {
                      (null == c ||
                        c.removeEventListener("mousemove", p.moveHandler),
                        null == c ||
                          c.removeEventListener("mouseup", p.upHandler),
                        d(e.clientX));
                    },
                  },
                  f = {
                    moveHandler: (e) => (
                      e.cancelable && (e.preventDefault(), e.stopPropagation()),
                      s("move", e.touches[0].clientX),
                      !1
                    ),
                    upHandler: (e) => {
                      var t;
                      (null == c ||
                        c.removeEventListener("touchmove", f.moveHandler),
                        null == c ||
                          c.removeEventListener("touchend", f.upHandler),
                        e.cancelable &&
                          (e.preventDefault(), e.stopPropagation()),
                        d(null == (t = e.touches[0]) ? void 0 : t.clientX));
                    },
                  },
                  m = !!(function () {
                    if ("boolean" == typeof x) return x;
                    let e = !1;
                    try {
                      let t = () => {};
                      (window.addEventListener("test", t, {
                        get passive() {
                          return ((e = !0), !1);
                        },
                      }),
                        window.removeEventListener("test", t));
                    } catch (t) {
                      e = !1;
                    }
                    return (x = e);
                  })() && { passive: !1 };
                (P(i)
                  ? (null == c ||
                      c.addEventListener("touchmove", f.moveHandler, m),
                    null == c || c.addEventListener("touchend", f.upHandler, m))
                  : (null == c ||
                      c.addEventListener("mousemove", p.moveHandler, m),
                    null == c || c.addEventListener("mouseup", p.upHandler, m)),
                  t.setColumnSizingInfo((e) => ({
                    ...e,
                    startOffset: u,
                    startSize: r,
                    deltaOffset: 0,
                    deltaPercentage: 0,
                    columnSizingStart: a,
                    isResizingColumn: n.id,
                  })));
              };
            }));
        },
        createTable: (e) => {
          ((e.setColumnSizing = (t) =>
            null == e.options.onColumnSizingChange
              ? void 0
              : e.options.onColumnSizingChange(t)),
            (e.setColumnSizingInfo = (t) =>
              null == e.options.onColumnSizingInfoChange
                ? void 0
                : e.options.onColumnSizingInfoChange(t)),
            (e.resetColumnSizing = (t) => {
              var l;
              e.setColumnSizing(
                t ? {} : null != (l = e.initialState.columnSizing) ? l : {},
              );
            }),
            (e.resetHeaderSizeInfo = (t) => {
              var l;
              e.setColumnSizingInfo(
                t
                  ? V()
                  : null != (l = e.initialState.columnSizingInfo)
                    ? l
                    : V(),
              );
            }),
            (e.getTotalSize = () => {
              var t, l;
              return null !=
                (t =
                  null == (l = e.getHeaderGroups()[0])
                    ? void 0
                    : l.headers.reduce((e, t) => e + t.getSize(), 0))
                ? t
                : 0;
            }),
            (e.getLeftTotalSize = () => {
              var t, l;
              return null !=
                (t =
                  null == (l = e.getLeftHeaderGroups()[0])
                    ? void 0
                    : l.headers.reduce((e, t) => e + t.getSize(), 0))
                ? t
                : 0;
            }),
            (e.getCenterTotalSize = () => {
              var t, l;
              return null !=
                (t =
                  null == (l = e.getCenterHeaderGroups()[0])
                    ? void 0
                    : l.headers.reduce((e, t) => e + t.getSize(), 0))
                ? t
                : 0;
            }),
            (e.getRightTotalSize = () => {
              var t, l;
              return null !=
                (t =
                  null == (l = e.getRightHeaderGroups()[0])
                    ? void 0
                    : l.headers.reduce((e, t) => e + t.getSize(), 0))
                ? t
                : 0;
            }));
        },
      },
    ];
  function j(e) {
    var l, n;
    let r = [...B, ...(null != (l = e._features) ? l : [])],
      a = { _features: r },
      u = a._features.reduce(
        (e, t) =>
          Object.assign(
            e,
            null == t.getDefaultOptions ? void 0 : t.getDefaultOptions(a),
          ),
        {},
      ),
      g = { ...(null != (n = e.initialState) ? n : {}) };
    a._features.forEach((e) => {
      var t;
      g =
        null != (t = null == e.getInitialState ? void 0 : e.getInitialState(g))
          ? t
          : g;
    });
    let s = [],
      d = !1,
      c = {
        _features: r,
        options: { ...u, ...e },
        initialState: g,
        _queue: (e) => {
          (s.push(e),
            d ||
              ((d = !0),
              Promise.resolve()
                .then(() => {
                  for (; s.length; ) s.shift()();
                  d = !1;
                })
                .catch((e) =>
                  setTimeout(() => {
                    throw e;
                  }),
                )));
        },
        reset: () => {
          a.setState(a.initialState);
        },
        setOptions: (e) => {
          var l;
          ((l = t(e, a.options)),
            (a.options = a.options.mergeOptions
              ? a.options.mergeOptions(u, l)
              : { ...u, ...l }));
        },
        getState: () => a.options.state,
        setState: (e) => {
          null == a.options.onStateChange || a.options.onStateChange(e);
        },
        _getRowId: (e, t, l) => {
          var n;
          return null !=
            (n =
              null == a.options.getRowId ? void 0 : a.options.getRowId(e, t, l))
            ? n
            : `${l ? [l.id, t].join(".") : t}`;
        },
        getCoreRowModel: () => (
          a._getCoreRowModel ||
            (a._getCoreRowModel = a.options.getCoreRowModel(a)),
          a._getCoreRowModel()
        ),
        getRowModel: () => a.getPaginationRowModel(),
        getRow: (e, t) => {
          let l = (t ? a.getPrePaginationRowModel() : a.getRowModel()).rowsById[
            e
          ];
          if (!l && !(l = a.getCoreRowModel().rowsById[e])) throw Error();
          return l;
        },
        _getDefaultColumnDef: o(
          () => [a.options.defaultColumn],
          (e) => {
            var t;
            return (
              (e = null != (t = e) ? t : {}),
              {
                header: (e) => {
                  let t = e.header.column.columnDef;
                  return t.accessorKey
                    ? t.accessorKey
                    : t.accessorFn
                      ? t.id
                      : null;
                },
                cell: (e) => {
                  var t, l;
                  return null !=
                    (t =
                      null == (l = e.renderValue()) || null == l.toString
                        ? void 0
                        : l.toString())
                    ? t
                    : null;
                },
                ...a._features.reduce(
                  (e, t) =>
                    Object.assign(
                      e,
                      null == t.getDefaultColumnDef
                        ? void 0
                        : t.getDefaultColumnDef(),
                    ),
                  {},
                ),
                ...e,
              }
            );
          },
          i(e, "debugColumns", "_getDefaultColumnDef"),
        ),
        _getColumnDefs: () => a.options.columns,
        getAllColumns: o(
          () => [a._getColumnDefs()],
          (e) => {
            let t = function (e, l, n) {
              return (
                void 0 === n && (n = 0),
                e.map((e) => {
                  let r = (function (e, t, l, n) {
                    var r, a;
                    let u,
                      g = { ...e._getDefaultColumnDef(), ...t },
                      s = g.accessorKey,
                      d =
                        null !=
                        (r =
                          null != (a = g.id)
                            ? a
                            : s
                              ? "function" == typeof String.prototype.replaceAll
                                ? s.replaceAll(".", "_")
                                : s.replace(/\./g, "_")
                              : void 0)
                          ? r
                          : "string" == typeof g.header
                            ? g.header
                            : void 0;
                    if (
                      (g.accessorFn
                        ? (u = g.accessorFn)
                        : s &&
                          (u = s.includes(".")
                            ? (e) => {
                                let t = e;
                                for (let e of s.split(".")) {
                                  var l;
                                  t = null == (l = t) ? void 0 : l[e];
                                }
                                return t;
                              }
                            : (e) => e[g.accessorKey]),
                      !d)
                    )
                      throw Error();
                    let c = {
                      id: `${String(d)}`,
                      accessorFn: u,
                      parent: n,
                      depth: l,
                      columnDef: g,
                      columns: [],
                      getFlatColumns: o(
                        () => [!0],
                        () => {
                          var e;
                          return [
                            c,
                            ...(null == (e = c.columns)
                              ? void 0
                              : e.flatMap((e) => e.getFlatColumns())),
                          ];
                        },
                        i(e.options, "debugColumns", "column.getFlatColumns"),
                      ),
                      getLeafColumns: o(
                        () => [e._getOrderColumnsFn()],
                        (e) => {
                          var t;
                          return null != (t = c.columns) && t.length
                            ? e(c.columns.flatMap((e) => e.getLeafColumns()))
                            : [c];
                        },
                        i(e.options, "debugColumns", "column.getLeafColumns"),
                      ),
                    };
                    for (let t of e._features)
                      null == t.createColumn || t.createColumn(c, e);
                    return c;
                  })(a, e, n, l);
                  return (
                    (r.columns = e.columns ? t(e.columns, r, n + 1) : []),
                    r
                  );
                })
              );
            };
            return t(e);
          },
          i(e, "debugColumns", "getAllColumns"),
        ),
        getAllFlatColumns: o(
          () => [a.getAllColumns()],
          (e) => e.flatMap((e) => e.getFlatColumns()),
          i(e, "debugColumns", "getAllFlatColumns"),
        ),
        _getAllFlatColumnsById: o(
          () => [a.getAllFlatColumns()],
          (e) => e.reduce((e, t) => ((e[t.id] = t), e), {}),
          i(e, "debugColumns", "getAllFlatColumnsById"),
        ),
        getAllLeafColumns: o(
          () => [a.getAllColumns(), a._getOrderColumnsFn()],
          (e, t) => t(e.flatMap((e) => e.getLeafColumns())),
          i(e, "debugColumns", "getAllLeafColumns"),
        ),
        getColumn: (e) => a._getAllFlatColumnsById()[e],
      };
    Object.assign(a, c);
    for (let e = 0; e < a._features.length; e++) {
      let t = a._features[e];
      null == t || null == t.createTable || t.createTable(a);
    }
    return a;
  }
  e.s(
    [
      "Q",
      0,
      j,
      "Z",
      0,
      function () {
        return (e) =>
          o(
            () => [e.options.data],
            (t) => {
              let l = { rows: [], flatRows: [], rowsById: {} },
                n = function (t, o, i) {
                  void 0 === o && (o = 0);
                  let r = [];
                  for (let u = 0; u < t.length; u++) {
                    let s = g(
                      e,
                      e._getRowId(t[u], u, i),
                      t[u],
                      u,
                      o,
                      void 0,
                      null == i ? void 0 : i.id,
                    );
                    if (
                      (l.flatRows.push(s),
                      (l.rowsById[s.id] = s),
                      r.push(s),
                      e.options.getSubRows)
                    ) {
                      var a;
                      ((s.originalSubRows = e.options.getSubRows(t[u], u)),
                        null != (a = s.originalSubRows) &&
                          a.length &&
                          (s.subRows = n(s.originalSubRows, o + 1, s)));
                    }
                  }
                  return r;
                };
              return ((l.rows = n(t)), l);
            },
            i(e.options, "debugTable", "getRowModel", () =>
              e._autoResetPageIndex(),
            ),
          );
      },
      "a",
      0,
      function () {
        return (e) =>
          o(
            () => [e.getState().sorting, e.getPreSortedRowModel()],
            (t, l) => {
              if (!l.rows.length || !(null != t && t.length)) return l;
              let n = e.getState().sorting,
                o = [],
                i = n.filter((t) => {
                  var l;
                  return null == (l = e.getColumn(t.id))
                    ? void 0
                    : l.getCanSort();
                }),
                r = {};
              i.forEach((t) => {
                let l = e.getColumn(t.id);
                l &&
                  (r[t.id] = {
                    sortUndefined: l.columnDef.sortUndefined,
                    invertSorting: l.columnDef.invertSorting,
                    sortingFn: l.getSortingFn(),
                  });
              });
              let a = (e) => {
                let t = e.map((e) => ({ ...e }));
                return (
                  t.sort((e, t) => {
                    for (let n = 0; n < i.length; n += 1) {
                      var l;
                      let o = i[n],
                        a = r[o.id],
                        u = a.sortUndefined,
                        g = null != (l = null == o ? void 0 : o.desc) && l,
                        s = 0;
                      if (u) {
                        let l = e.getValue(o.id),
                          n = t.getValue(o.id),
                          i = void 0 === l,
                          r = void 0 === n;
                        if (i || r) {
                          if ("first" === u) return i ? -1 : 1;
                          if ("last" === u) return i ? 1 : -1;
                          s = i && r ? 0 : i ? u : -u;
                        }
                      }
                      if ((0 === s && (s = a.sortingFn(e, t, o.id)), 0 !== s))
                        return (
                          g && (s *= -1),
                          a.invertSorting && (s *= -1),
                          s
                        );
                    }
                    return e.index - t.index;
                  }),
                  t.forEach((e) => {
                    var t;
                    (o.push(e),
                      null != (t = e.subRows) &&
                        t.length &&
                        (e.subRows = a(e.subRows)));
                  }),
                  t
                );
              };
              return { rows: a(l.rows), flatRows: o, rowsById: l.rowsById };
            },
            i(e.options, "debugTable", "getSortedRowModel", () =>
              e._autoResetPageIndex(),
            ),
          );
      },
    ],
    300317,
  );
  var k = e.i(352386);
  e.s(
    [
      "T",
      0,
      function (e, t) {
        var l, n, o;
        let i;
        return e
          ? ("function" == typeof (n = l = e) &&
              (i = Object.getPrototypeOf(n)).prototype &&
              i.prototype.isReactComponent) ||
            "function" == typeof l ||
            ("object" == typeof (o = l) &&
              "symbol" == typeof o.$$typeof &&
              ["react.memo", "react.forward_ref"].includes(
                o.$$typeof.description,
              ))
            ? k.createElement(e, t)
            : e
          : null;
      },
      "W",
      0,
      function (e) {
        let t = {
            state: {},
            onStateChange: () => {},
            renderFallbackValue: null,
            ...e,
          },
          [l] = k.useState(() => ({ current: j(t) })),
          [n, o] = k.useState(() => l.current.initialState);
        return (
          l.current.setOptions((t) => ({
            ...t,
            ...e,
            state: { ...n, ...e.state },
            onStateChange: (t) => {
              (o(t), null == e.onStateChange || e.onStateChange(t));
            },
          })),
          l.current
        );
      },
    ],
    339403,
  );
  var N = e.i(732486),
    q = e.i(445242);
  e.s(
    [
      "f",
      0,
      (e) => {
        let t,
          l,
          n,
          o,
          i,
          r = (0, q.c)(11),
          { title: a, message: u, className: g } = e,
          s = void 0 === a ? "Nothing to see here" : a,
          d =
            void 0 === u
              ? "We didn't find any coins that match your search criteria, try a different search term."
              : u,
          c = `flex items-center justify-center ${void 0 === g ? "" : g}`;
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((t = (0, N.jsxs)("svg", {
                width: "114px",
                className: "mx-auto",
                viewBox: "0 0 539 451",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  (0, N.jsx)("path", {
                    d: "M36 295.5L492 116C492 116 547.5 135 537.5 228C527.5 321 390 372 390 372L300 345L332.5 408.5C267.5 438.5 213.5 452.5 182.5 450.5C151.5 448.5 115.5 449 74 403.5C32.5 358 36 295.5 36 295.5Z",
                    fill: "black",
                    fillOpacity: "0.1",
                  }),
                  (0, N.jsx)("path", {
                    d: "M470.947 161.304C432.771 200.378 401.81 229.18 380.427 248.187C369.735 257.69 361.438 264.745 355.831 269.411C355.242 269.901 354.683 270.364 354.154 270.801L233.113 107.167C235.279 105.188 238.461 102.418 243.094 98.6121C257.347 86.902 284.906 65.7353 337.904 28.1688C386.822 -6.50546 437.236 8.80343 467.214 42.2822C497.544 76.1541 505.202 126.243 470.947 161.304Z",
                    fill: "white",
                    stroke: "#1D3934",
                    strokeWidth: "17",
                  }),
                  (0, N.jsx)("path", {
                    d: "M351.065 149.236C367.757 172.887 375.745 198.897 375.516 221.589C375.288 244.295 366.925 262.971 351.737 273.69C336.548 284.409 316.15 286.032 294.679 278.641C273.223 271.254 251.392 255.013 234.7 231.363C218.008 207.712 210.02 181.702 210.248 159.01C210.477 136.304 218.84 117.628 234.028 106.909C249.217 96.1897 269.615 94.5665 291.085 101.958C312.542 109.345 334.373 125.586 351.065 149.236Z",
                    fill: "#E1E1E1",
                    stroke: "#1D3934",
                    strokeWidth: "17",
                  }),
                  (0, N.jsx)("path", {
                    d: "M16.0141 246.223C7.54956 186.447 49.3591 131.097 109.398 122.596L219.075 107.065C219.075 107.065 242.161 156.219 249.79 221.618C257.419 287.017 249.728 323.532 249.728 323.532L140.051 339.062C80.0118 347.564 24.4786 305.999 16.0141 246.223Z",
                    fill: "#5FCB88",
                  }),
                  (0, N.jsx)("path", {
                    d: "M110.727 130.019L214.27 115.357C214.602 116.154 214.962 117.031 215.347 117.984C217.577 123.498 220.647 131.564 223.958 141.664C230.587 161.887 238.146 190.155 241.908 222.374C245.694 254.792 245.683 279.958 244.747 296.919C244.279 305.4 243.58 311.832 243.008 316.095C242.991 316.218 242.975 316.34 242.958 316.46L139.208 331.152C83.6668 339.016 32.266 300.367 24.4011 244.826C16.5362 189.285 55.1855 137.884 110.727 130.019Z",
                    stroke: "#1D3934",
                    strokeWidth: "17",
                  }),
                  (0, N.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M69.0978 252.344C71.1796 251.763 73.3384 252.979 73.9197 255.061L75.8974 262.144C76.4787 264.226 75.2623 266.385 73.1805 266.966C71.0987 267.548 68.9399 266.331 68.3586 264.249L66.3809 257.166C65.7996 255.084 67.016 252.925 69.0978 252.344ZM79.9079 277.183C81.461 275.68 83.9387 275.721 85.4418 277.274C92.6431 284.715 101.241 289.943 110.217 292.733C112.281 293.374 113.434 295.568 112.792 297.632C112.15 299.696 109.957 300.849 107.893 300.207C97.6304 297.017 87.9063 291.075 79.8173 282.717C78.3141 281.164 78.3547 278.686 79.9079 277.183ZM124.884 300.453C124.554 298.317 126.018 296.318 128.154 295.988L137.353 294.569C139.489 294.239 141.488 295.703 141.818 297.839C142.148 299.976 140.683 301.975 138.547 302.304L129.348 303.724C127.212 304.054 125.213 302.589 124.884 300.453Z",
                    fill: "white",
                  }),
                ],
              })),
              (r[0] = t))
            : (t = r[0]),
          r[1] !== s
            ? ((l = (0, N.jsx)("h2", {
                className: "my-4 text-sm font-bold",
                children: s,
              })),
              (r[1] = s),
              (r[2] = l))
            : (l = r[2]),
          r[3] !== d
            ? ((n = (0, N.jsx)("div", {
                className: "mb-4 text-sm",
                children: (0, N.jsx)("p", { children: d }),
              })),
              (r[3] = d),
              (r[4] = n))
            : (n = r[4]),
          r[5] !== l || r[6] !== n
            ? ((o = (0, N.jsx)("div", {
                className:
                  "mx-auto flex h-fit items-center justify-center p-4 text-center text-white",
                children: (0, N.jsxs)("div", {
                  className: "",
                  children: [t, l, n],
                }),
              })),
              (r[5] = l),
              (r[6] = n),
              (r[7] = o))
            : (o = r[7]),
          r[8] !== c || r[9] !== o
            ? ((i = (0, N.jsx)("div", { className: c, children: o })),
              (r[8] = c),
              (r[9] = o),
              (r[10] = i))
            : (i = r[10]),
          i
        );
      },
    ],
    202942,
  );
  var U = e.i(292686),
    $ = e.i(599077),
    X = e.i(595673);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          t = (0, q.c)(2),
          l = (0, $.usePathname)().includes("/watchlist")
            ? U.Ae.WATCHLIST
            : U.Ae.HOME;
        return (
          t[0] !== l
            ? ((e = {
                trackBookmarkToggle: (e, t) => {
                  "add" === t &&
                    (0, X.Op)({
                      mint: e,
                      screen: l,
                      sourceElement: U.k9.COIN_ROW,
                    });
                },
              }),
              (t[0] = l),
              (t[1] = e))
            : (e = t[1]),
          e
        );
      },
    ],
    610387,
  );
};
