// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    n = e.i(957680),
    i = e.i(1807),
    l = e.i(826085),
    a = e.i(430663),
    o = e.i(261427),
    s = r,
    u = e.i(144685);
  function d(e, t) {
    if ("function" == typeof e) return e(t);
    null != e && (e.current = t);
  }
  class c extends s.Component {
    getSnapshotBeforeUpdate(e) {
      let t = this.props.childRef.current;
      if (
        (0, o.f)(t) &&
        e.isPresent &&
        !this.props.isPresent &&
        !1 !== this.props.pop
      ) {
        let e = t.offsetParent,
          r = ((0, o.f)(e) && e.offsetWidth) || 0,
          n = ((0, o.f)(e) && e.offsetHeight) || 0,
          i = getComputedStyle(t),
          l = this.props.sizeRef.current;
        ((l.height = parseFloat(i.height)),
          (l.width = parseFloat(i.width)),
          (l.top = t.offsetTop),
          (l.left = t.offsetLeft),
          (l.right = r - l.width - l.left),
          (l.bottom = n - l.height - l.top),
          (l.direction = i.direction));
      }
      return null;
    }
    componentDidUpdate() {}
    render() {
      return this.props.children;
    }
  }
  function p({
    children: e,
    isPresent: n,
    anchorX: i,
    anchorY: l,
    root: a,
    pop: o,
  }) {
    let f = (0, s.useId)(),
      m = (0, s.useRef)(null),
      g = (0, s.useRef)({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        direction: "ltr",
      }),
      { nonce: h } = (0, s.useContext)(u.f),
      y = (function (...e) {
        return r.useCallback(
          (function (...e) {
            return (t) => {
              let r = !1,
                n = e.map((e) => {
                  let n = d(e, t);
                  return (r || "function" != typeof n || (r = !0), n);
                });
              if (r)
                return () => {
                  for (let t = 0; t < n.length; t++) {
                    let r = n[t];
                    "function" == typeof r ? r() : d(e[t], null);
                  }
                };
            };
          })(...e),
          e,
        );
      })(m, e.props?.ref ?? e?.ref);
    return (
      (0, s.useInsertionEffect)(() => {
        let {
          width: e,
          height: t,
          top: r,
          left: s,
          right: u,
          bottom: d,
          direction: c,
        } = g.current;
        if (n || !1 === o || !m.current || !e || !t) return;
        let p = "rtl" === c,
          y =
            "left" === i
              ? p
                ? `right: ${u}`
                : `left: ${s}`
              : p
                ? `left: ${s}`
                : `right: ${u}`,
          _ = "bottom" === l ? `bottom: ${d}` : `top: ${r}`;
        m.current.dataset.motionPopId = f;
        let v = document.createElement("style");
        h && (v.nonce = h);
        let w = a ?? document.head;
        return (
          w.appendChild(v),
          v.sheet &&
            v.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${y}px !important;
            ${_}px !important;
          }
        `),
          () => {
            (m.current?.removeAttribute("data-motion-pop-id"),
              w.contains(v) && w.removeChild(v));
          }
        );
      }, [n]),
      (0, t.jsx)(c, {
        isPresent: n,
        childRef: m,
        sizeRef: g,
        pop: o,
        children: !1 === o ? e : s.cloneElement(e, { ref: y }),
      })
    );
  }
  let f = ({
    children: e,
    initial: n,
    isPresent: l,
    onExitComplete: o,
    custom: s,
    presenceAffectsLayout: u,
    mode: d,
    anchorX: c,
    anchorY: f,
    root: g,
  }) => {
    let h = (0, i.f)(m),
      y = (0, r.useId)(),
      _ = !0,
      v = (0, r.useMemo)(
        () => (
          (_ = !1),
          {
            id: y,
            initial: n,
            isPresent: l,
            custom: s,
            onExitComplete: (e) => {
              for (let t of (h.set(e, !0), h.values())) if (!t) return;
              o && o();
            },
            register: (e) => (h.set(e, !1), () => h.delete(e)),
          }
        ),
        [l, h, o],
      );
    return (
      u && _ && (v = { ...v }),
      (0, r.useMemo)(() => {
        h.forEach((e, t) => h.set(t, !1));
      }, [l]),
      r.useEffect(() => {
        l || h.size || !o || o();
      }, [l]),
      (e = (0, t.jsx)(p, {
        pop: "popLayout" === d,
        isPresent: l,
        anchorX: c,
        anchorY: f,
        root: g,
        children: e,
      })),
      (0, t.jsx)(a.f.Provider, { value: v, children: e })
    );
  };
  function m() {
    return new Map();
  }
  var g = e.i(380585);
  let h = (e) => e.key || "";
  function y(e) {
    let t = [];
    return (
      r.Children.forEach(e, (e) => {
        (0, r.isValidElement)(e) && t.push(e);
      }),
      t
    );
  }
  e.s(
    [
      "f",
      0,
      ({
        children: e,
        custom: a,
        initial: o = !0,
        onExitComplete: s,
        presenceAffectsLayout: u = !0,
        mode: d = "sync",
        propagate: c = !1,
        anchorX: p = "left",
        anchorY: m = "top",
        root: _,
      }) => {
        let [v, w] = (0, g.f)(c),
          b = (0, r.useMemo)(() => y(e), [e]),
          k = c && !v ? [] : b.map(h),
          A = (0, r.useRef)(!0),
          x = (0, r.useRef)(b),
          S = (0, i.f)(() => new Map()),
          E = (0, r.useRef)(new Set()),
          [I, C] = (0, r.useState)(b),
          [O, j] = (0, r.useState)(b);
        (0, l.f)(() => {
          ((A.current = !1), (x.current = b));
          for (let e = 0; e < O.length; e++) {
            let t = h(O[e]);
            k.includes(t)
              ? (S.delete(t), E.current.delete(t))
              : !0 !== S.get(t) && S.set(t, !1);
          }
        }, [O, k.length, k.join("-")]);
        let L = [];
        if (b !== I) {
          let e = [...b];
          for (let t = 0; t < O.length; t++) {
            let r = O[t],
              n = h(r);
            k.includes(n) || (e.splice(t, 0, r), L.push(r));
          }
          return ("wait" === d && L.length && (e = L), j(y(e)), C(b), null);
        }
        let { forceRender: T } = (0, r.useContext)(n.f);
        return (0, t.jsx)(t.Fragment, {
          children: O.map((e) => {
            let r = h(e),
              n = (!c || !!v) && (b === O || k.includes(r));
            return (0, t.jsx)(
              f,
              {
                isPresent: n,
                initial: (!A.current || !!o) && void 0,
                custom: a,
                presenceAffectsLayout: u,
                mode: d,
                root: _,
                onExitComplete: n
                  ? void 0
                  : () => {
                      if (E.current.has(r) || !S.has(r)) return;
                      (E.current.add(r), S.set(r, !0));
                      let e = !0;
                      (S.forEach((t) => {
                        t || (e = !1);
                      }),
                        e && (T?.(), j(x.current), c && w?.(), s && s()));
                    },
                anchorX: p,
                anchorY: m,
                children: e,
              },
              r,
            );
          }),
        });
      },
    ],
    205761,
  );
};
