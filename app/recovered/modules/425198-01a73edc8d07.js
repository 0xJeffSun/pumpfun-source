// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(838976),
    i = t.i(610927),
    s = t.i(488133);
  function n(t, e) {
    let i = (0, s.f)(t),
      n = new AbortController();
    return [i, { passive: !0, ...e, signal: n.signal }, () => n.abort()];
  }
  var r = t.i(907953),
    o = t.i(373184);
  function a(t, e, i) {
    let { props: s } = t;
    t.animationState &&
      s.whileHover &&
      t.animationState.setActive("whileHover", "Start" === i);
    let n = s["onHover" + i];
    n && r.y.postRender(() => n(e, (0, o.j)(e)));
  }
  class l extends e.f {
    mount() {
      let { current: t } = this.node;
      t &&
        (this.unmount = (function (t, e, s = {}) {
          let [r, o, a] = n(t, s);
          return (
            r.forEach((t) => {
              let s,
                n = !1,
                r = !1,
                a = (e) => {
                  (s && (s(e), (s = void 0)),
                    t.removeEventListener("pointerleave", h));
                },
                l = (t) => {
                  ((n = !1),
                    window.removeEventListener("pointerup", l),
                    window.removeEventListener("pointercancel", l),
                    r && ((r = !1), a(t)));
                },
                h = (t) => {
                  if ("touch" !== t.pointerType) {
                    if (n) {
                      r = !0;
                      return;
                    }
                    a(t);
                  }
                };
              (t.addEventListener(
                "pointerenter",
                (n) => {
                  if ("touch" === n.pointerType || (0, i.E)()) return;
                  r = !1;
                  let a = e(t, n);
                  "function" == typeof a &&
                    ((s = a), t.addEventListener("pointerleave", h, o));
                },
                o,
              ),
                t.addEventListener(
                  "pointerdown",
                  () => {
                    ((n = !0),
                      window.addEventListener("pointerup", l, o),
                      window.addEventListener("pointercancel", l, o));
                  },
                  o,
                ));
            }),
            a
          );
        })(
          t,
          (t, e) => (a(this.node, e, "Start"), (t) => a(this.node, t, "End")),
        ));
    }
    unmount() {}
  }
  var h = e,
    u = t.i(508821),
    d = t.i(815645);
  class c extends h.f {
    constructor() {
      (super(...arguments), (this.isActive = !1));
    }
    onFocus() {
      let t = !1;
      try {
        t = this.node.current.matches(":focus-visible");
      } catch (e) {
        t = !0;
      }
      t &&
        this.node.animationState &&
        (this.node.animationState.setActive("whileFocus", !0),
        (this.isActive = !0));
    }
    onBlur() {
      this.isActive &&
        this.node.animationState &&
        (this.node.animationState.setActive("whileFocus", !1),
        (this.isActive = !1));
    }
    mount() {
      this.unmount = (0, d.f)(
        (0, u.f)(this.node.current, "focus", () => this.onFocus()),
        (0, u.f)(this.node.current, "blur", () => this.onBlur()),
      );
    }
    unmount() {}
  }
  var p = e,
    m = t.i(261427);
  let f = (t, e) => !!e && (t === e || f(t, e.parentElement));
  var y = t.i(658904),
    v = t.i(996584);
  let g = new WeakSet();
  function x(t) {
    return (e) => {
      "Enter" === e.key && t(e);
    };
  }
  function P(t, e) {
    t.dispatchEvent(
      new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }),
    );
  }
  function T(t) {
    return (0, y.f)(t) && !(0, i.E)();
  }
  let w = new WeakSet();
  function S(t, e, i) {
    let { props: s } = t;
    if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
    t.animationState &&
      s.whileTap &&
      t.animationState.setActive("whileTap", "Start" === i);
    let n = s["onTap" + ("End" === i ? "" : i)];
    n && r.y.postRender(() => n(e, (0, o.j)(e)));
  }
  class A extends p.f {
    mount() {
      let { current: t } = this.node;
      if (!t) return;
      let { globalTapTarget: e, propagate: i } = this.node.props;
      this.unmount = (function (t, e, i = {}) {
        let [s, r, o] = n(t, i),
          a = (t) => {
            let s = t.currentTarget;
            if (!T(t) || w.has(t)) return;
            (g.add(s), i.stopPropagation && w.add(t));
            let n = e(s, t),
              o = (t, e) => {
                (window.removeEventListener("pointerup", a),
                  window.removeEventListener("pointercancel", l),
                  g.has(s) && g.delete(s),
                  T(t) && "function" == typeof n && n(t, { success: e }));
              },
              a = (t) => {
                o(
                  t,
                  s === window ||
                    s === document ||
                    i.useGlobalTarget ||
                    f(s, t.target),
                );
              },
              l = (t) => {
                o(t, !1);
              };
            (window.addEventListener("pointerup", a, r),
              window.addEventListener("pointercancel", l, r));
          };
        return (
          s.forEach((t) => {
            ((i.useGlobalTarget ? window : t).addEventListener(
              "pointerdown",
              a,
              r,
            ),
              (0, m.f)(t) &&
                (t.addEventListener("focus", (t) =>
                  ((t, e) => {
                    let i = t.currentTarget;
                    if (!i) return;
                    let s = x(() => {
                      if (g.has(i)) return;
                      P(i, "down");
                      let t = x(() => {
                        P(i, "up");
                      });
                      (i.addEventListener("keyup", t, e),
                        i.addEventListener("blur", () => P(i, "cancel"), e));
                    });
                    (i.addEventListener("keydown", s, e),
                      i.addEventListener(
                        "blur",
                        () => i.removeEventListener("keydown", s),
                        e,
                      ));
                  })(t, r),
                ),
                (0, v.Y)(t) || t.hasAttribute("tabindex") || (t.tabIndex = 0)));
          }),
          o
        );
      })(
        t,
        (t, e) => (
          S(this.node, e, "Start"),
          (t, { success: e }) => S(this.node, t, e ? "End" : "Cancel")
        ),
        { useGlobalTarget: e, stopPropagation: i?.tap === !1 },
      );
    }
    unmount() {}
  }
  var E = e;
  let D = new WeakMap(),
    b = new WeakMap(),
    M = (t) => {
      let e = D.get(t.target);
      e && e(t);
    },
    k = (t) => {
      t.forEach(M);
    },
    V = { some: 0, all: 1 };
  class L extends E.f {
    constructor() {
      (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
    }
    startObserver() {
      var t;
      let e;
      this.stopObserver?.();
      let { viewport: i = {} } = this.node.getProps(),
        { root: s, margin: n, amount: r = "some", once: o } = i,
        a = {
          root: s ? s.current : void 0,
          rootMargin: n,
          threshold: "number" == typeof r ? r : V[r],
        },
        l = (t) => {
          let { isIntersecting: e } = t;
          if (
            this.isInView === e ||
            ((this.isInView = e), o && !e && this.hasEnteredView)
          )
            return;
          (e && (this.hasEnteredView = !0),
            this.node.animationState &&
              this.node.animationState.setActive("whileInView", e));
          let { onViewportEnter: i, onViewportLeave: s } = this.node.getProps(),
            n = e ? i : s;
          n && n(t);
        };
      this.stopObserver =
        ((t = this.node.current),
        (e = (function ({ root: t, ...e }) {
          let i = t || document;
          b.has(i) || b.set(i, {});
          let s = b.get(i),
            n = JSON.stringify(e);
          return (
            s[n] || (s[n] = new IntersectionObserver(k, { root: t, ...e })),
            s[n]
          );
        })(a)),
        D.set(t, l),
        e.observe(t),
        () => {
          (D.delete(t), e.unobserve(t));
        });
    }
    mount() {
      this.startObserver();
    }
    update() {
      if ("u" < typeof IntersectionObserver) return;
      let { props: t, prevProps: e } = this.node;
      ["amount", "margin", "root"].some(
        (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
          return (i) => t[i] !== e[i];
        })(t, e),
      ) && this.startObserver();
    }
    unmount() {
      (this.stopObserver?.(), (this.hasEnteredView = !1), (this.isInView = !1));
    }
  }
  t.s(
    [
      "f",
      0,
      {
        inView: { Feature: L },
        tap: { Feature: A },
        focus: { Feature: c },
        hover: { Feature: l },
      },
    ],
    425198,
  );
};
