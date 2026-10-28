// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641645),
    n = e.i(92615),
    r = e.i(36177),
    i = e.i(839854);
  function o(e, t, n) {
    return Math.floor(e / t) !== n;
  }
  function l(e, t) {
    return t < 0 || t >= e.current.length;
  }
  function s(
    e,
    {
      startingIndex: t = -1,
      decrement: n = !1,
      disabledIndices: r,
      amount: i = 1,
    } = {},
  ) {
    let o = t;
    do o += n ? -i : i;
    while (o >= 0 && o <= e.current.length - 1 && u(e, o, r));
    return o;
  }
  function u(e, t, n) {
    if ("function" == typeof n ? n(t) : (n?.includes(t) ?? !1)) return !0;
    let r = e.current[t];
    return (
      !!r &&
      (!a(r) ||
        (!n &&
          (r.hasAttribute("disabled") ||
            "true" === r.getAttribute("aria-disabled"))))
    );
  }
  function a(e) {
    return "none" !== (0, n.X)(e).display;
  }
  e.s(
    [
      "N",
      0,
      function (e, t, n) {
        let r = [],
          i = 0;
        return (
          e.forEach(({ width: e, height: o }, l) => {
            let s = !1;
            for (n && (i = 0); !s; ) {
              let n = [];
              for (let r = 0; r < e; r += 1)
                for (let e = 0; e < o; e += 1) n.push(i + r + e * t);
              (i % t) + e <= t && n.every((e) => null == r[e])
                ? (n.forEach((e) => {
                    r[e] = l;
                  }),
                  (s = !0))
                : (i += 1);
            }
          }),
          [...r]
        );
      },
      "e",
      0,
      s,
      "z",
      0,
      function (e, t, n, r, i) {
        if (-1 === e) return -1;
        let o = n.indexOf(e),
          l = t[e];
        switch (i) {
          case "tl":
            return o;
          case "tr":
            if (!l) return o;
            return o + l.width - 1;
          case "bl":
            if (!l) return o;
            return o + (l.height - 1) * r;
          case "br":
            return n.lastIndexOf(e);
          default:
            return -1;
        }
      },
      "G",
      0,
      function (e, t) {
        return t.flatMap((t, n) => (e.includes(t) ? [n] : []));
      },
      "n",
      0,
      function (
        e,
        {
          event: n,
          orientation: a,
          loopFocus: c,
          rtl: f,
          cols: d,
          disabledIndices: p,
          minIndex: g,
          maxIndex: h,
          prevIndex: m,
          stopEvent: v = !1,
        },
      ) {
        let y,
          b = m;
        if ((n.key === i.V ? (y = "up") : n.key === i.e && (y = "down"), y)) {
          let i = [],
            o = [],
            a = !1,
            f = 0;
          {
            let t = null,
              n = -1;
            e.current.forEach((e, r) => {
              if (null == e) return;
              f += 1;
              let l = e.closest('[role="row"]');
              (l && (a = !0),
                (l !== t || -1 === n) && ((t = l), (i[(n += 1)] = [])),
                i[n].push(r),
                (o[r] = n));
            });
          }
          let w = !1,
            E = 0;
          if (a)
            for (let e of i) {
              let t = e.length;
              (t > E && (E = t), t !== d && (w = !0));
            }
          let x = w && f < e.current.length,
            R = E || d;
          v && (0, r.Y)(n);
          let S =
            ((t) => {
              if (!w || -1 === m) return;
              let n = o[m];
              if (null == n) return;
              let r = i[n].indexOf(m),
                l = "up" === t ? -1 : 1;
              for (let t = n + l, o = 0; o < i.length; o += 1, t += l) {
                if (t < 0 || t >= i.length) {
                  if (!c || x) return;
                  t = t < 0 ? i.length - 1 : 0;
                }
                let n = i[t];
                for (let t = Math.min(r, n.length - 1); t >= 0; t -= 1) {
                  let r = n[t];
                  if (!u(e, r, p)) return r;
                }
              }
            })(y) ??
            ((n) => {
              if (!x || -1 === m) return;
              let r = m % R,
                i = "up" === n ? -R : R,
                o = h - (h % R),
                l = (0, t.w)(h / R) + 1;
              for (let t = m - r + i, n = 0; n < l; n += 1, t += i) {
                if (t < 0 || t > h) {
                  if (!c) return;
                  t = t < 0 ? o : 0;
                }
                let n = Math.min(t + R - 1, h);
                for (let i = Math.min(t + r, n); i >= t; i -= 1)
                  if (!u(e, i, p)) return i;
              }
            })(y);
          if (void 0 !== S) b = S;
          else if (-1 === m) b = "up" === y ? h : g;
          else if (
            ((b = s(e, {
              startingIndex: m,
              amount: R,
              decrement: "up" === y,
              disabledIndices: p,
            })),
            c)
          ) {
            if ("up" === y && (m - R < g || b < 0)) {
              let e = m % R,
                t = h % R,
                n = h - (t - e);
              b = t === e ? h : t > e ? n : n - R;
            }
            "down" === y &&
              m + R > h &&
              (b = s(e, {
                startingIndex: (m % R) - R,
                amount: R,
                disabledIndices: p,
              }));
          }
          l(e, b) && (b = m);
        }
        if ("both" === a) {
          let u = (0, t.w)(m / d);
          (n.key === (f ? i.b : i.q) &&
            (v && (0, r.Y)(n),
            m % d != d - 1
              ? ((b = s(e, { startingIndex: m, disabledIndices: p })),
                c &&
                  o(b, d, u) &&
                  (b = s(e, {
                    startingIndex: m - (m % d) - 1,
                    disabledIndices: p,
                  })))
              : c &&
                (b = s(e, {
                  startingIndex: m - (m % d) - 1,
                  disabledIndices: p,
                })),
            o(b, d, u) && (b = m)),
            n.key === (f ? i.q : i.b) &&
              (v && (0, r.Y)(n),
              m % d != 0
                ? ((b = s(e, {
                    startingIndex: m,
                    decrement: !0,
                    disabledIndices: p,
                  })),
                  c &&
                    o(b, d, u) &&
                    (b = s(e, {
                      startingIndex: m + (d - (m % d)),
                      decrement: !0,
                      disabledIndices: p,
                    })))
                : c &&
                  (b = s(e, {
                    startingIndex: m + (d - (m % d)),
                    decrement: !0,
                    disabledIndices: p,
                  })),
              o(b, d, u) && (b = m)));
          let a = (0, t.w)(h / d) === u;
          l(e, b) &&
            (b =
              c && a
                ? n.key === (f ? i.q : i.b)
                  ? h
                  : s(e, { startingIndex: m - (m % d) - 1, disabledIndices: p })
                : m);
        }
        return b;
      },
      "_",
      0,
      function (e, t) {
        return s(e, {
          decrement: !0,
          startingIndex: e.current.length,
          disabledIndices: t,
        });
      },
      "J",
      0,
      function (e, t) {
        return s(e, { disabledIndices: t });
      },
      "v",
      0,
      a,
      "c",
      0,
      l,
      "K",
      0,
      u,
    ],
    425939,
  );
  let c = "ArrowUp",
    f = "ArrowDown",
    d = "ArrowLeft",
    p = "ArrowRight",
    g = "Home",
    h = new Set([d, p]),
    m = new Set([d, p, g, "End"]),
    v = new Set([c, f]),
    y = new Set([c, f, g, "End"]),
    b = new Set([...h, ...v]),
    w = new Set([...b, g, "End"]),
    E = new Set([c, f, d, p, g, "End"]),
    x = new Set(["Shift", "Control", "Alt", "Meta"]);
  function R(e, t, n) {
    let r = "left" === n ? "offsetLeft" : "offsetTop",
      i = 0;
    for (; t.offsetParent && ((i += t[r]), t.offsetParent !== e); )
      t = t.offsetParent;
    return i;
  }
  function S(e) {
    let t = getComputedStyle(e);
    return {
      scrollMarginTop: parseFloat(t.scrollMarginTop) || 0,
      scrollMarginRight: parseFloat(t.scrollMarginRight) || 0,
      scrollMarginBottom: parseFloat(t.scrollMarginBottom) || 0,
      scrollMarginLeft: parseFloat(t.scrollMarginLeft) || 0,
      scrollPaddingTop: parseFloat(t.scrollPaddingTop) || 0,
      scrollPaddingRight: parseFloat(t.scrollPaddingRight) || 0,
      scrollPaddingBottom: parseFloat(t.scrollPaddingBottom) || 0,
      scrollPaddingLeft: parseFloat(t.scrollPaddingLeft) || 0,
    };
  }
  e.s(
    [
      "O",
      0,
      w,
      "e",
      0,
      f,
      "P",
      0,
      b,
      "b",
      0,
      d,
      "q",
      0,
      p,
      "V",
      0,
      c,
      "J",
      0,
      E,
      "C",
      0,
      "End",
      "Z",
      0,
      g,
      "Y",
      0,
      h,
      "D",
      0,
      m,
      "a",
      0,
      x,
      "B",
      0,
      v,
      "m",
      0,
      y,
      "X",
      0,
      function (e) {
        return !!(
          ((0, n.E)(e) && "INPUT" === e.tagName && null != e.selectionStart) ||
          ((0, n.E)(e) && "TEXTAREA" === e.tagName)
        );
      },
      "l",
      0,
      function (e, t, n, r) {
        if (!e || !t || !t.scrollTo) return;
        let i = e.scrollLeft,
          o = e.scrollTop,
          l = e.clientWidth < e.scrollWidth,
          s = e.clientHeight < e.scrollHeight;
        if (l && "vertical" !== r) {
          let r = R(e, t, "left"),
            o = S(e),
            l = S(t);
          ("ltr" === n &&
            (r + t.offsetWidth + l.scrollMarginRight >
            e.scrollLeft + e.clientWidth - o.scrollPaddingRight
              ? (i =
                  r +
                  t.offsetWidth +
                  l.scrollMarginRight -
                  e.clientWidth +
                  o.scrollPaddingRight)
              : r - l.scrollMarginLeft < e.scrollLeft + o.scrollPaddingLeft &&
                (i = r - l.scrollMarginLeft - o.scrollPaddingLeft)),
            "rtl" === n &&
              (r - l.scrollMarginRight < e.scrollLeft + o.scrollPaddingLeft
                ? (i = r - l.scrollMarginLeft - o.scrollPaddingLeft)
                : r + t.offsetWidth + l.scrollMarginRight >
                    e.scrollLeft + e.clientWidth - o.scrollPaddingRight &&
                  (i =
                    r +
                    t.offsetWidth +
                    l.scrollMarginRight -
                    e.clientWidth +
                    o.scrollPaddingRight)));
        }
        if (s && "horizontal" !== r) {
          let n = R(e, t, "top"),
            r = S(e),
            i = S(t);
          n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop
            ? (o = n - i.scrollMarginTop - r.scrollPaddingTop)
            : n + t.offsetHeight + i.scrollMarginBottom >
                e.scrollTop + e.clientHeight - r.scrollPaddingBottom &&
              (o =
                n +
                t.offsetHeight +
                i.scrollMarginBottom -
                e.clientHeight +
                r.scrollPaddingBottom);
        }
        e.scrollTo({ left: i, top: o, behavior: "auto" });
      },
    ],
    845891,
  );
};
