// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(996972),
    r = e.i(92615),
    i = e.i(617821),
    o = e.i(925849),
    l = e.i(278051),
    s = e.i(565693),
    u = e.i(732612),
    a = e.i(234006),
    c = e.i(575272),
    f = e.i(226115),
    d = e.i(285182),
    p = e.i(62819),
    g = e.i(430186),
    h = e.i(36177),
    m = e.i(493798),
    v = e.i(50408),
    y = e.i(425939),
    b = e.i(523686),
    w = e.i(251669),
    E = e.i(875355),
    x = e.i(128969),
    R = e.i(555877);
  let S = 0;
  function T(e, t = {}) {
    let { preventScroll: n = !1, cancelPrevious: r = !0, sync: i = !1 } = t;
    r && cancelAnimationFrame(S);
    let o = () => e?.focus({ preventScroll: n });
    i ? o() : (S = requestAnimationFrame(o));
  }
  e.s(["f", 0, T], 854729);
  let C = { inert: new WeakMap(), "aria-hidden": new WeakMap() },
    k = "data-base-ui-inert",
    O = { inert: new WeakSet(), "aria-hidden": new WeakSet() },
    I = new WeakMap(),
    P = 0,
    M = (e, t) =>
      t
        .map((t) => {
          if (e.contains(t)) return t;
          let n = (function e(t) {
            return t ? ((0, r.R)(t) ? t.host : e(t.parentNode)) : null;
          })(t);
          return e.contains(n) ? n : null;
        })
        .filter((e) => null != e),
    A = (e) => {
      let t = new Set();
      return (
        e.forEach((e) => {
          let n = e;
          for (; n && !t.has(n); ) (t.add(n), (n = n.parentNode));
        }),
        t
      );
    },
    L = (e, t, n) => {
      let i = [],
        o = (e) => {
          !e ||
            n.has(e) ||
            Array.from(e.children).forEach((e) => {
              "script" !== (0, r.A)(e) && (t.has(e) ? o(e) : i.push(e));
            });
        };
      return (o(e), i);
    };
  function $(e, t = {}) {
    let {
        ariaHidden: n = !1,
        inert: r = !1,
        mark: i = !0,
        markerIgnoreElements: o = [],
      } = t,
      l = (0, f.f)(e[0]).body;
    return (function (
      e,
      t,
      n,
      r,
      { mark: i = !0, markerIgnoreElements: o = [] },
    ) {
      let l = r ? "inert" : n ? "aria-hidden" : null,
        s = null,
        u = null,
        a = M(t, e),
        c = new Set(i ? M(t, o) : []),
        f = i ? L(t, A(a), new Set(a)).filter((e) => !c.has(e)) : [],
        d = [],
        p = [];
      if (l) {
        let e = C[l],
          n = O[l];
        ((u = n), (s = e));
        let r = M(t, Array.from(t.querySelectorAll("[aria-live]"))),
          i = a.concat(r);
        L(t, A(i), new Set(i)).forEach((t) => {
          let r = t.getAttribute(l),
            i = null !== r && "false" !== r,
            o = (e.get(t) || 0) + 1;
          (e.set(t, o),
            d.push(t),
            1 === o && i && n.add(t),
            i || t.setAttribute(l, "inert" === l ? "" : "true"));
        });
      }
      return (
        i &&
          f.forEach((e) => {
            let t = (I.get(e) || 0) + 1;
            (I.set(e, t), p.push(e), 1 === t && e.setAttribute(k, ""));
          }),
        (P += 1),
        () => {
          (s &&
            d.forEach((e) => {
              let t = (s.get(e) || 0) - 1;
              (s.set(e, t),
                t || (!u?.has(e) && l && e.removeAttribute(l), u?.delete(e)));
            }),
            i &&
              p.forEach((e) => {
                let t = (I.get(e) || 0) - 1;
                (I.set(e, t), t || e.removeAttribute(k));
              }),
            (P -= 1) ||
              ((C.inert = new WeakMap()),
              (C["aria-hidden"] = new WeakMap()),
              (O.inert = new WeakSet()),
              (O["aria-hidden"] = new WeakSet()),
              (I = new WeakMap())));
        }
      );
    })(e, l, n, r, { mark: i, markerIgnoreElements: o });
  }
  var D = e.i(27369),
    H = e.i(656522),
    W = e.i(300310),
    B = e.i(701042),
    N = e.i(732486);
  let j = [];
  function F() {
    j = j.filter((e) => e.deref()?.isConnected);
  }
  function V() {
    return (F(), j[j.length - 1]?.deref());
  }
  function _(e, t) {
    if (
      !t.current.includes("floating") &&
      !e.getAttribute("role")?.includes("dialog")
    )
      return;
    let r = (0, v.C)(),
      i = (0, n.J)(e, r).filter((e) => {
        let t = e.getAttribute("data-tabindex") || "";
        return (
          (0, n.m)(e, r) ||
          (e.hasAttribute("data-tabindex") && !t.startsWith("-"))
        );
      }),
      o = e.getAttribute("tabindex");
    t.current.includes("floating") || 0 === i.length
      ? "0" !== o && e.setAttribute("tabindex", "0")
      : ("-1" !== o ||
          (e.hasAttribute("data-tabindex") &&
            "-1" !== e.getAttribute("data-tabindex"))) &&
        (e.setAttribute("tabindex", "-1"),
        e.setAttribute("data-tabindex", "-1"));
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let {
            context: S,
            children: C,
            disabled: k = !1,
            initialFocus: O = !0,
            returnFocus: I = !0,
            restoreFocus: P = !1,
            modal: M = !0,
            closeOnFocusOut: A = !0,
            openInteractionType: L = "",
            nextFocusableElement: U,
            previousFocusableElement: z,
            beforeContentFocusGuardRef: q,
            externalTree: X,
            getInsideElements: Y,
          } = e,
          K = "rootStore" in S ? S.rootStore : S,
          G = K.useState("open"),
          Z = K.useState("domReferenceElement"),
          J = K.useState("floatingElement"),
          { events: Q, dataRef: ee } = K.context,
          et = (0, l.f)(() => ee.current.floatingContext?.nodeId),
          en = !1 === O,
          er = (0, g.J)(Z) && en,
          ei = t.useRef(["content"]),
          eo = (0, o.f)(O),
          el = (0, o.f)(I),
          es = (0, o.f)(L),
          eu = (0, H.$)(X),
          ea = (0, D.M)(),
          ec = t.useRef(!1),
          ef = t.useRef(!1),
          ed = t.useRef(!1),
          ep = t.useRef(-1),
          eg = t.useRef(""),
          eh = t.useRef(""),
          em = t.useRef(null),
          ev = t.useRef(null),
          ey = (0, i.A)(em, q, ea?.beforeInsideRef),
          eb = (0, i.A)(ev, ea?.afterInsideRef),
          ew = (0, u.e)(),
          eE = (0, u.e)(),
          ex = (0, c.z)(),
          eR = null != ea,
          eS = (0, g.G)(J),
          eT = (0, l.f)((e = eS) => (e ? (0, n.T)(e, (0, v.C)()) : [])),
          eC = (0, l.f)(() => Y?.().filter((e) => null != e) ?? []),
          ek = (0, l.f)((e) => {
            let t = eT(e);
            return ei.current
              .map(() => t)
              .filter(Boolean)
              .flat();
          });
        (t.useEffect(() => {
          if (k || !M) return;
          function e(e) {
            "Tab" === e.key &&
              (0, g.I)(eS, (0, g.T)((0, f.f)(eS))) &&
              0 === eT().length &&
              !er &&
              (0, h.Y)(e);
          }
          let t = (0, f.f)(eS);
          return (
            t.addEventListener("keydown", e),
            () => {
              t.removeEventListener("keydown", e);
            }
          );
        }, [k, Z, eS, M, ei, er, eT, ek]),
          t.useEffect(() => {
            if (k || !G) return;
            let e = (0, f.f)(eS);
            function t() {
              ed.current = !1;
            }
            function n(e) {
              let t = (0, g.Z)(e),
                n = eC();
              ((ed.current = !(
                (0, g.I)(J, t) ||
                (0, g.I)(Z, t) ||
                (0, g.I)(ea?.portalNode, t) ||
                n.some((e) => e === t || (0, g.I)(e, t))
              )),
                (eh.current = e.pointerType || "keyboard"),
                t?.closest(`[${W.j}]`) && (ef.current = !0));
            }
            function r() {
              eh.current = "keyboard";
            }
            return (
              e.addEventListener("pointerdown", n, !0),
              e.addEventListener("pointerup", t, !0),
              e.addEventListener("pointercancel", t, !0),
              e.addEventListener("keydown", r, !0),
              () => {
                (e.removeEventListener("pointerdown", n, !0),
                  e.removeEventListener("pointerup", t, !0),
                  e.removeEventListener("pointercancel", t, !0),
                  e.removeEventListener("keydown", r, !0));
              }
            );
          }, [k, J, Z, eS, G, ea, eC]),
          t.useEffect(() => {
            if (k || !A) return;
            let e = (0, f.f)(eS);
            function t() {
              ((ef.current = !0),
                eE.start(0, () => {
                  ef.current = !1;
                }));
            }
            function n(e) {
              let t = (0, g.Z)(e),
                n = eT().indexOf(t);
              -1 !== n && (ep.current = n);
            }
            function i(t) {
              let n = t.relatedTarget,
                i = t.currentTarget,
                o = (0, g.Z)(t);
              queueMicrotask(() => {
                let l = et(),
                  s = K.context.triggerElements,
                  u = eC(),
                  a =
                    n?.hasAttribute((0, R.f)("focus-guard")) &&
                    [
                      em.current,
                      ev.current,
                      ea?.beforeInsideRef.current,
                      ea?.afterInsideRef.current,
                      ea?.beforeOutsideRef.current,
                      ea?.afterOutsideRef.current,
                      (0, B.f)(z),
                      (0, B.f)(U),
                    ].includes(n),
                  c = !(
                    (0, g.I)(Z, n) ||
                    (0, g.I)(J, n) ||
                    (0, g.I)(n, J) ||
                    (0, g.I)(ea?.portalNode, n) ||
                    u.some((e) => e === n || (0, g.I)(e, n)) ||
                    (null != n && s.hasElement(n)) ||
                    s.hasMatchingElement((e) => (0, g.I)(e, n)) ||
                    a ||
                    (eu &&
                      ((0, m.Q)(eu.nodesRef.current, l).find(
                        (e) =>
                          (0, g.I)(e.context?.elements.floating, n) ||
                          (0, g.I)(e.context?.elements.domReference, n),
                      ) ||
                        (0, m.V)(eu.nodesRef.current, l).find(
                          (e) =>
                            [
                              e.context?.elements.floating,
                              (0, g.G)(e.context?.elements.floating),
                            ].includes(n) ||
                            e.context?.elements.domReference === n,
                        )))
                  );
                if (
                  (i === Z && eS && _(eS, ei),
                  P &&
                    i !== Z &&
                    !(
                      o &&
                      o.isConnected &&
                      ("function" == typeof o.checkVisibility
                        ? o.checkVisibility()
                        : (0, y.v)(o))
                    ) &&
                    (0, g.T)(e) === e.body)
                ) {
                  if ((0, r.E)(eS) && (eS.focus(), "popup" === P))
                    return void ex.request(() => {
                      eS.focus();
                    });
                  let e = ep.current,
                    t = eT(),
                    n = t[e] || t[t.length - 1] || eS;
                  (0, r.E)(n) && n.focus();
                }
                if (ee.current.insideReactTree) {
                  ee.current.insideReactTree = !1;
                  return;
                }
                (er || !M) &&
                  n &&
                  c &&
                  !ef.current &&
                  (er || n !== V()) &&
                  ((ec.current = !0), K.setOpen(!1, (0, b.f)(w.f.focusOut, t)));
              });
            }
            function o() {
              ed.current ||
                ((ee.current.insideReactTree = !0),
                ew.start(0, () => {
                  ee.current.insideReactTree = !1;
                }));
            }
            let l = (0, r.E)(Z) ? Z : null,
              s = [];
            if (J || l)
              return (
                l &&
                  (l.addEventListener("focusout", i),
                  l.addEventListener("pointerdown", t),
                  s.push(() => {
                    (l.removeEventListener("focusout", i),
                      l.removeEventListener("pointerdown", t));
                  })),
                J &&
                  (J.addEventListener("focusin", n),
                  J.addEventListener("focusout", i),
                  ea &&
                    (J.addEventListener("focusout", o, !0),
                    s.push(() => {
                      J.removeEventListener("focusout", o, !0);
                    })),
                  s.push(() => {
                    (J.removeEventListener("focusin", n),
                      J.removeEventListener("focusout", i));
                  })),
                () => {
                  s.forEach((e) => {
                    e();
                  });
                }
              );
          }, [
            k,
            Z,
            J,
            eS,
            M,
            eu,
            ea,
            K,
            A,
            P,
            eT,
            er,
            et,
            ei,
            ee,
            ew,
            eE,
            ex,
            U,
            z,
            eC,
          ]),
          t.useEffect(() => {
            if (k || !J || !G) return;
            let e = Array.from(
                ea?.portalNode?.querySelectorAll(`[${(0, R.f)("portal")}]`) ||
                  [],
              ),
              t = eu ? (0, m.V)(eu.nodesRef.current, et()) : [],
              n = t.find((e) =>
                (0, g.J)(e.context?.elements.domReference || null),
              )?.context?.elements.domReference,
              r = $(
                [
                  J,
                  ...e,
                  em.current,
                  ev.current,
                  ea?.beforeOutsideRef.current,
                  ea?.afterOutsideRef.current,
                  ...eC(),
                  n,
                  (0, B.f)(z),
                  (0, B.f)(U),
                  er ? Z : null,
                ].filter((e) => null != e),
                { ariaHidden: M || er, mark: !1 },
              ),
              i = $([J, ...e].filter((e) => null != e));
            return () => {
              (i(), r());
            };
          }, [G, k, Z, J, M, ei, ea, er, eu, et, U, z, eC]),
          (0, s.f)(() => {
            if (!G || k || !(0, r.E)(eS)) return;
            let e = (0, f.f)(eS),
              t = (0, g.T)(e);
            queueMicrotask(() => {
              let e,
                n = ek(eS),
                r = eo.current,
                i = "function" == typeof r ? r(es.current || "") : r;
              void 0 === i ||
                !1 === i ||
                ((e =
                  (e = !0 === i || null === i ? n[0] || eS : (0, B.f)(i)) ||
                  n[0] ||
                  eS),
                (0, g.I)(eS, t) || T(e, { preventScroll: e === eS }));
            });
          }, [k, G, eS, en, ek, eo, es]),
          (0, s.f)(() => {
            var e;
            if (k || !eS) return;
            let t = (0, f.f)(eS);
            function i(e) {
              var t, n;
              let r;
              if (
                (e.open ||
                  ((t = e.nativeEvent),
                  (n = eh.current),
                  (r = (0, d.f)(t.target)),
                  (eg.current =
                    t instanceof r.KeyboardEvent
                      ? "keyboard"
                      : t instanceof r.FocusEvent
                        ? n || "keyboard"
                        : "pointerType" in t
                          ? t.pointerType || "keyboard"
                          : "touches" in t
                            ? "touch"
                            : t instanceof r.MouseEvent
                              ? n || (0 === t.detail ? "keyboard" : "mouse")
                              : "")),
                e.reason === E.f.triggerHover &&
                  "mouseleave" === e.nativeEvent.type &&
                  (ec.current = !0),
                e.reason === x.f.outsidePress)
              )
                if (e.nested) ec.current = !1;
                else if ((0, h.E)(e.nativeEvent) || (0, h.$)(e.nativeEvent))
                  ec.current = !1;
                else {
                  let e = !1;
                  (document.createElement("div").focus({
                    get preventScroll() {
                      return ((e = !0), !1);
                    },
                  }),
                    e ? (ec.current = !1) : (ec.current = !0));
                }
            }
            return (
              (e = (0, g.T)(t)),
              F(),
              e &&
                "body" !== (0, r.A)(e) &&
                (j.push(new WeakRef(e)), j.length > 20 && (j = j.slice(-20))),
              Q.on("openchange", i),
              () => {
                Q.off("openchange", i);
                let e = (0, g.T)(t),
                  o = eC(),
                  l =
                    (0, g.I)(J, e) ||
                    o.some((t) => t === e || (0, g.I)(t, e)) ||
                    (eu &&
                      (0, m.Q)(eu.nodesRef.current, et(), !1).some((t) =>
                        (0, g.I)(t.context?.elements.floating, e),
                      )),
                  s = (function () {
                    let e = el.current,
                      t = "function" == typeof e ? e(eg.current) : e;
                    if (void 0 === t || !1 === t) return null;
                    if ((null === t && (t = !0), "boolean" == typeof t)) {
                      let e = Z || V();
                      return e && e.isConnected ? e : null;
                    }
                    let n = Z || V();
                    return (0, B.f)(t) || n || null;
                  })();
                queueMicrotask(() => {
                  let i = (function (e) {
                      if (!e) return null;
                      let t = (0, v.C)();
                      return (0, n.m)(e, t) ? e : (0, n.T)(e, t)[0] || e;
                    })(s),
                    o = "boolean" != typeof el.current;
                  (el.current &&
                    !ec.current &&
                    (0, r.E)(i) &&
                    (o || i === e || e === t.body || l) &&
                    i.focus({ preventScroll: !0 }),
                    (ec.current = !1));
                });
              }
            );
          }, [k, J, eS, el, ee, Q, eu, Z, et, eC]),
          (0, s.f)(() => {
            if (!a.i || G || !J) return;
            let e = (0, g.T)((0, f.f)(J));
            (0, r.E)(e) && (0, g.Q)(e) && (0, g.I)(J, e) && e.blur();
          }, [G, J]),
          (0, s.f)(() => {
            if (!k && ea)
              return (
                ea.setFocusManagerState({
                  modal: M,
                  closeOnFocusOut: A,
                  open: G,
                  onOpenChange: K.setOpen,
                  domReference: Z,
                }),
                () => {
                  ea.setFocusManagerState(null);
                }
              );
          }, [k, ea, M, G, K, A, Z]),
          (0, s.f)(() => {
            if (!k && eS)
              return (
                _(eS, ei),
                () => {
                  queueMicrotask(F);
                }
              );
          }, [k, eS, ei]));
        let eO = !k && (!M || !er) && (eR || M);
        return (0, N.jsxs)(t.Fragment, {
          children: [
            eO &&
              (0, N.jsx)(p.f, {
                "data-type": "inside",
                ref: ey,
                onFocus: (e) => {
                  if (M) {
                    let e = ek();
                    T(e[e.length - 1]);
                  } else if (ea?.portalNode)
                    if (((ec.current = !1), (0, v.A)(e, ea.portalNode))) {
                      let e = (0, v.O)(Z);
                      e?.focus();
                    } else (0, B.f)(z ?? ea.beforeOutsideRef)?.focus();
                },
              }),
            C,
            eO &&
              (0, N.jsx)(p.f, {
                "data-type": "inside",
                ref: eb,
                onFocus: (e) => {
                  if (M) T(ek()[0]);
                  else if (ea?.portalNode)
                    if ((A && (ec.current = !0), (0, v.A)(e, ea.portalNode))) {
                      let e = (0, v.B)(Z);
                      e?.focus();
                    } else (0, B.f)(U ?? ea.afterOutsideRef)?.focus();
                },
              }),
          ],
        });
      },
    ],
    901348,
  );
};
