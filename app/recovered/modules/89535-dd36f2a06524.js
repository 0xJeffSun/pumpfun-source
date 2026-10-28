// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(352386),
    r = e.i(144977),
    o = e.i(556872),
    a = e.i(252960),
    i = e.i(732486),
    c = "focusScope.autoFocusOnMount",
    u = "focusScope.autoFocusOnUnmount",
    l = { bubbles: !1, cancelable: !0 },
    s = n.forwardRef((e, t) => {
      let {
          loop: s = !1,
          trapped: h = !1,
          onMountAutoFocus: m,
          onUnmountAutoFocus: y,
          ...g
        } = e,
        [b, w] = n.useState(null),
        E = (0, a.f)(m),
        S = (0, a.f)(y),
        C = n.useRef(null),
        T = (0, r.j)(t, (e) => w(e)),
        k = n.useRef({
          paused: !1,
          pause() {
            this.paused = !0;
          },
          resume() {
            this.paused = !1;
          },
        }).current;
      (n.useEffect(() => {
        if (h) {
          let e = function (e) {
              if (k.paused || !b) return;
              let t = e.target;
              b.contains(t) ? (C.current = t) : p(C.current, { select: !0 });
            },
            t = function (e) {
              if (k.paused || !b) return;
              let t = e.relatedTarget;
              null !== t && (b.contains(t) || p(C.current, { select: !0 }));
            };
          (document.addEventListener("focusin", e),
            document.addEventListener("focusout", t));
          let n = new MutationObserver(function (e) {
            if (document.activeElement === document.body)
              for (let t of e) t.removedNodes.length > 0 && p(b);
          });
          return (
            b && n.observe(b, { childList: !0, subtree: !0 }),
            () => {
              (document.removeEventListener("focusin", e),
                document.removeEventListener("focusout", t),
                n.disconnect());
            }
          );
        }
      }, [h, b, k.paused]),
        n.useEffect(() => {
          if (b) {
            v.add(k);
            let e = document.activeElement;
            if (!b.contains(e)) {
              let t = new CustomEvent(c, l);
              (b.addEventListener(c, E),
                b.dispatchEvent(t),
                t.defaultPrevented ||
                  ((function (e, { select: t = !1 } = {}) {
                    let n = document.activeElement;
                    for (let r of e)
                      if ((p(r, { select: t }), document.activeElement !== n))
                        return;
                  })(
                    f(b).filter((e) => "A" !== e.tagName),
                    { select: !0 },
                  ),
                  document.activeElement === e && p(b)));
            }
            return () => {
              (b.removeEventListener(c, E),
                setTimeout(() => {
                  let t = new CustomEvent(u, l);
                  (b.addEventListener(u, S),
                    b.dispatchEvent(t),
                    t.defaultPrevented || p(e ?? document.body, { select: !0 }),
                    b.removeEventListener(u, S),
                    v.remove(k));
                }, 0));
            };
          }
        }, [b, E, S, k]));
      let A = n.useCallback(
        (e) => {
          if ((!s && !h) || k.paused) return;
          let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
            n = document.activeElement;
          if (t && n) {
            var r;
            let t,
              o = e.currentTarget,
              [a, i] = [d((t = f((r = o))), r), d(t.reverse(), r)];
            a && i
              ? e.shiftKey || n !== i
                ? e.shiftKey &&
                  n === a &&
                  (e.preventDefault(), s && p(i, { select: !0 }))
                : (e.preventDefault(), s && p(a, { select: !0 }))
              : n === o && e.preventDefault();
          }
        },
        [s, h, k.paused],
      );
      return (0, i.jsx)(o.V.div, { tabIndex: -1, ...g, ref: T, onKeyDown: A });
    });
  function f(e) {
    let t = [],
      n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (e) => {
          let t = "INPUT" === e.tagName && "hidden" === e.type;
          return e.disabled || e.hidden || t
            ? NodeFilter.FILTER_SKIP
            : e.tabIndex >= 0
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP;
        },
      });
    for (; n.nextNode(); ) t.push(n.currentNode);
    return t;
  }
  function d(e, t) {
    for (let n of e)
      if (
        !(function (e, { upTo: t }) {
          if ("hidden" === getComputedStyle(e).visibility) return !0;
          for (; e && (void 0 === t || e !== t); ) {
            if ("none" === getComputedStyle(e).display) return !0;
            e = e.parentElement;
          }
          return !1;
        })(n, { upTo: t })
      )
        return n;
  }
  function p(e, { select: t = !1 } = {}) {
    if (e && e.focus) {
      var n;
      let r = document.activeElement;
      (e.focus({ preventScroll: !0 }),
        e !== r &&
          (n = e) instanceof HTMLInputElement &&
          "select" in n &&
          t &&
          e.select());
    }
  }
  s.displayName = "FocusScope";
  var v =
    ((t = []),
    {
      add(e) {
        let n = t[0];
        (e !== n && n?.pause(), (t = h(t, e)).unshift(e));
      },
      remove(e) {
        ((t = h(t, e)), t[0]?.resume());
      },
    });
  function h(e, t) {
    let n = [...e],
      r = n.indexOf(t);
    return (-1 !== r && n.splice(r, 1), n);
  }
  e.s(["f", 0, s]);
};
