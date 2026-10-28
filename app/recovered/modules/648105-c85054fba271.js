// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(92615),
    n = e.i(234006),
    r = e.i(226115),
    i = e.i(285182),
    o = e.i(565693),
    l = e.i(732612),
    s = e.i(575272),
    u = e.i(297454);
  let a = {},
    c = {},
    f = "",
    d = new (class {
      lockCount = 0;
      restore = null;
      timeoutLock = l.U.create();
      timeoutUnlock = l.U.create();
      acquire(e) {
        return (
          (this.lockCount += 1),
          1 === this.lockCount &&
            null === this.restore &&
            this.timeoutLock.start(0, () => this.lock(e)),
          this.release
        );
      }
      release = () => {
        ((this.lockCount -= 1),
          0 === this.lockCount &&
            this.restore &&
            this.timeoutUnlock.start(0, this.unlock));
      };
      unlock = () => {
        0 === this.lockCount &&
          this.restore &&
          (this.restore?.(), (this.restore = null));
      };
      lock(e) {
        let o, l, d, p, g;
        if (0 === this.lockCount || null !== this.restore) return;
        let h = (0, r.f)(e).documentElement,
          m = (0, i.f)(h).getComputedStyle(h).overflowY;
        if ("hidden" === m || "clip" === m) {
          this.restore = u.x;
          return;
        }
        let v =
          n.I ||
          !(function (e) {
            if ("u" < typeof document) return !1;
            let t = (0, r.f)(e);
            return (0, i.f)(t).innerWidth - t.documentElement.clientWidth > 0;
          })(e);
        this.restore = v
          ? ((l = (o = (0, r.f)(e)).documentElement),
            (d = o.body),
            (g = {
              overflowY: (p = (0, t.B)(l) ? l : d).style.overflowY,
              overflowX: p.style.overflowX,
            }),
            Object.assign(p.style, {
              overflowY: "hidden",
              overflowX: "hidden",
            }),
            () => {
              Object.assign(p.style, g);
            })
          : (function (e) {
              let o = (0, r.f)(e),
                l = o.documentElement,
                u = o.body,
                d = (0, i.f)(l),
                p = 0,
                g = 0,
                h = !1,
                m = s.$.create();
              if (n.i && (d.visualViewport?.scale ?? 1) !== 1) return () => {};
              function v() {
                let n = d.getComputedStyle(l),
                  i = d.getComputedStyle(u),
                  o = (n.scrollbarGutter || "").includes("both-edges")
                    ? "stable both-edges"
                    : "stable";
                ((p = l.scrollTop),
                  (g = l.scrollLeft),
                  (a = {
                    scrollbarGutter: l.style.scrollbarGutter,
                    overflowY: l.style.overflowY,
                    overflowX: l.style.overflowX,
                  }),
                  (f = l.style.scrollBehavior),
                  (c = {
                    position: u.style.position,
                    height: u.style.height,
                    width: u.style.width,
                    boxSizing: u.style.boxSizing,
                    overflowY: u.style.overflowY,
                    overflowX: u.style.overflowX,
                    scrollBehavior: u.style.scrollBehavior,
                  }));
                let s = l.scrollHeight > l.clientHeight,
                  m = l.scrollWidth > l.clientWidth,
                  v = "scroll" === n.overflowY || "scroll" === i.overflowY,
                  y = "scroll" === n.overflowX || "scroll" === i.overflowX,
                  b = Math.max(0, d.innerWidth - u.clientWidth),
                  w = Math.max(0, d.innerHeight - u.clientHeight),
                  E = parseFloat(i.marginTop) + parseFloat(i.marginBottom),
                  x = parseFloat(i.marginLeft) + parseFloat(i.marginRight),
                  R = (0, t.B)(l) ? l : u;
                if (
                  (h = (function (e) {
                    if (
                      !(
                        "u" > typeof CSS &&
                        CSS.supports &&
                        CSS.supports("scrollbar-gutter", "stable")
                      ) ||
                      "u" < typeof document
                    )
                      return !1;
                    let n = (0, r.f)(e),
                      i = n.documentElement,
                      o = n.body,
                      l = (0, t.B)(i) ? i : o,
                      s = l.style.overflowY,
                      u = i.style.scrollbarGutter;
                    ((i.style.scrollbarGutter = "stable"),
                      (l.style.overflowY = "scroll"));
                    let a = l.offsetWidth;
                    l.style.overflowY = "hidden";
                    let c = l.offsetWidth;
                    return (
                      (l.style.overflowY = s),
                      (i.style.scrollbarGutter = u),
                      a === c
                    );
                  })(e))
                ) {
                  ((l.style.scrollbarGutter = o),
                    (R.style.overflowY = "hidden"),
                    (R.style.overflowX = "hidden"));
                  return;
                }
                (Object.assign(l.style, {
                  scrollbarGutter: o,
                  overflowY: "hidden",
                  overflowX: "hidden",
                }),
                  (s || v) && (l.style.overflowY = "scroll"),
                  (m || y) && (l.style.overflowX = "scroll"),
                  Object.assign(u.style, {
                    position: "relative",
                    height: E || w ? `calc(100dvh - ${E + w}px)` : "100dvh",
                    width: x || b ? `calc(100vw - ${x + b}px)` : "100vw",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    scrollBehavior: "unset",
                  }),
                  (u.scrollTop = p),
                  (u.scrollLeft = g),
                  l.setAttribute("data-base-ui-scroll-locked", ""),
                  (l.style.scrollBehavior = "unset"));
              }
              function y() {
                (Object.assign(l.style, a),
                  Object.assign(u.style, c),
                  h ||
                    ((l.scrollTop = p),
                    (l.scrollLeft = g),
                    l.removeAttribute("data-base-ui-scroll-locked"),
                    (l.style.scrollBehavior = f)));
              }
              function b() {
                (y(), m.request(v));
              }
              return (
                v(),
                d.addEventListener("resize", b),
                () => {
                  (m.cancel(),
                    y(),
                    "function" == typeof d.removeEventListener &&
                      d.removeEventListener("resize", b));
                }
              );
            })(e);
      }
    })();
  e.s(
    [
      "f",
      0,
      function (e = !0, t = null) {
        (0, o.f)(() => {
          if (e) return d.acquire(t);
        }, [e, t]);
      },
    ],
    648105,
  );
  var p = e.i(352386),
    g = e.i(761806),
    h = e.i(430186),
    m = e.i(656522);
  let v = new Map([
    ["select", "listbox"],
    ["combobox", "listbox"],
    ["label", !1],
  ]);
  e.s(
    [
      "f",
      0,
      function (e, t = {}) {
        let n = "rootStore" in e ? e.rootStore : e,
          r = n.useState("open"),
          i = n.useState("floatingId"),
          o = n.useState("domReferenceElement"),
          l = n.useState("floatingElement"),
          { role: s = "dialog" } = t,
          a = (0, g.f)(),
          c = o?.id || a,
          f = p.useMemo(() => (0, h.G)(l)?.id || i, [l, i]),
          d = v.get(s) ?? s,
          y = null != (0, m.G)(),
          b = p.useMemo(
            () =>
              "tooltip" === d || "label" === s
                ? u.w
                : {
                    "aria-haspopup": "alertdialog" === d ? "dialog" : d,
                    "aria-expanded": "false",
                    ...("listbox" === d && { role: "combobox" }),
                    ...("menu" === d && y && { role: "menuitem" }),
                    ...("select" === s && { "aria-autocomplete": "none" }),
                    ...("combobox" === s && { "aria-autocomplete": "list" }),
                  },
            [d, y, s],
          ),
          w = p.useMemo(
            () =>
              "tooltip" === d || "label" === s
                ? {
                    [`aria-${"label" === s ? "labelledby" : "describedby"}`]: r
                      ? f
                      : void 0,
                  }
                : {
                    ...b,
                    "aria-expanded": r ? "true" : "false",
                    "aria-controls": r ? f : void 0,
                    ...("menu" === d && { id: c }),
                  },
            [d, f, r, c, s, b],
          ),
          E = p.useMemo(() => {
            let e = { id: f, ...(d && { role: d }) };
            return "tooltip" === d || "label" === s
              ? e
              : { ...e, ...("menu" === d && { "aria-labelledby": c }) };
          }, [d, f, c, s]),
          x = p.useCallback(
            ({ active: e, selected: t }) => {
              let n = { role: "option", ...(e && { id: `${f}-fui-option` }) };
              switch (s) {
                case "select":
                case "combobox":
                  return { ...n, "aria-selected": t };
              }
              return {};
            },
            [f, s],
          );
        return p.useMemo(
          () => ({ reference: w, floating: E, item: x, trigger: b }),
          [w, E, b, x],
        );
      },
    ],
    271983,
  );
  var y = e.i(278051),
    b = e.i(498546);
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          r,
          [i, o] = p.useState(null),
          l = (0, y.f)((t, r) => {
            e || o(r || (n.I ? "touch" : ""));
          });
        (0, b.f)(e, (t) => {
          t && !e && o(null);
        });
        let { onClick: s, onPointerDown: u } =
          ((t = p.useRef("")),
          (r = p.useCallback(
            (e) => {
              e.defaultPrevented ||
                ((t.current = e.pointerType), l(e, e.pointerType));
            },
            [l],
          )),
          {
            onClick: p.useCallback(
              (e) => {
                0 === e.detail
                  ? l(e, "keyboard")
                  : (l(e, "pointerType" in e ? e.pointerType : t.current),
                    (t.current = ""));
              },
              [l],
            ),
            onPointerDown: r,
          });
        return p.useMemo(
          () => ({
            openMethod: i,
            triggerProps: { onClick: s, onPointerDown: u },
          }),
          [i, s, u],
        );
      },
    ],
    87893,
  );
};
