// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(291967),
    r = e.i(144977),
    o = e.i(156207),
    i = e.i(461194),
    a = e.i(534643),
    s = e.i(60212),
    l = e.i(89535),
    u = e.i(614952),
    d = e.i(653747),
    c = e.i(556872),
    f = e.i(371353),
    p = e.i(621790),
    m = e.i(73772),
    v = e.i(93074),
    y = e.i(732486),
    g = "Dialog",
    [b, h] = (0, o.c)(g),
    [x, E] = b(g),
    w = (e) => {
      let {
          __scopeDialog: n,
          children: r,
          open: o,
          defaultOpen: s,
          onOpenChange: l,
          modal: u = !0,
        } = e,
        d = t.useRef(null),
        c = t.useRef(null),
        [f, p] = (0, a.f)({
          prop: o,
          defaultProp: s ?? !1,
          onChange: l,
          caller: g,
        });
      return (0, y.jsx)(x, {
        scope: n,
        triggerRef: d,
        contentRef: c,
        contentId: (0, i.f)(),
        titleId: (0, i.f)(),
        descriptionId: (0, i.f)(),
        open: f,
        onOpenChange: p,
        onOpenToggle: t.useCallback(() => p((e) => !e), [p]),
        modal: u,
        children: r,
      });
    };
  w.displayName = g;
  var N = "DialogTrigger",
    j = t.forwardRef((e, t) => {
      let { __scopeDialog: o, ...i } = e,
        a = E(N, o),
        s = (0, r.j)(t, a.triggerRef);
      return (0, y.jsx)(c.V.button, {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "aria-controls": a.contentId,
        "data-state": z(a.open),
        ...i,
        ref: s,
        onClick: (0, n.f)(e.onClick, a.onOpenToggle),
      });
    });
  j.displayName = N;
  var C = "DialogPortal",
    [D, R] = b(C, { forceMount: void 0 }),
    O = (e) => {
      let { __scopeDialog: n, forceMount: r, children: o, container: i } = e,
        a = E(C, n);
      return (0, y.jsx)(D, {
        scope: n,
        forceMount: r,
        children: t.Children.map(o, (e) =>
          (0, y.jsx)(d.f, {
            present: r || a.open,
            children: (0, y.jsx)(u.f, {
              asChild: !0,
              container: i,
              children: e,
            }),
          }),
        ),
      });
    };
  O.displayName = C;
  var P = "DialogOverlay",
    T = t.forwardRef((e, t) => {
      let n = R(P, e.__scopeDialog),
        { forceMount: r = n.forceMount, ...o } = e,
        i = E(P, e.__scopeDialog);
      return i.modal
        ? (0, y.jsx)(d.f, {
            present: r || i.open,
            children: (0, y.jsx)(S, { ...o, ref: t }),
          })
        : null;
    });
  T.displayName = P;
  var I = (0, v.B)("DialogOverlay.RemoveScroll"),
    S = t.forwardRef((e, t) => {
      let { __scopeDialog: n, ...r } = e,
        o = E(P, n);
      return (0, y.jsx)(p.f, {
        as: I,
        allowPinchZoom: !0,
        shards: [o.contentRef],
        children: (0, y.jsx)(c.V.div, {
          "data-state": z(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style },
        }),
      });
    }),
    A = "DialogContent",
    _ = t.forwardRef((e, t) => {
      let n = R(A, e.__scopeDialog),
        { forceMount: r = n.forceMount, ...o } = e,
        i = E(A, e.__scopeDialog);
      return (0, y.jsx)(d.f, {
        present: r || i.open,
        children: i.modal
          ? (0, y.jsx)(M, { ...o, ref: t })
          : (0, y.jsx)(L, { ...o, ref: t }),
      });
    });
  _.displayName = A;
  var M = t.forwardRef((e, o) => {
      let i = E(A, e.__scopeDialog),
        a = t.useRef(null),
        s = (0, r.j)(o, i.contentRef, a);
      return (
        t.useEffect(() => {
          let e = a.current;
          if (e) return (0, m.f)(e);
        }, []),
        (0, y.jsx)(F, {
          ...e,
          ref: s,
          trapFocus: i.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: (0, n.f)(e.onCloseAutoFocus, (e) => {
            (e.preventDefault(), i.triggerRef.current?.focus());
          }),
          onPointerDownOutside: (0, n.f)(e.onPointerDownOutside, (e) => {
            let t = e.detail.originalEvent,
              n = 0 === t.button && !0 === t.ctrlKey;
            (2 === t.button || n) && e.preventDefault();
          }),
          onFocusOutside: (0, n.f)(e.onFocusOutside, (e) => e.preventDefault()),
        })
      );
    }),
    L = t.forwardRef((e, n) => {
      let r = E(A, e.__scopeDialog),
        o = t.useRef(!1),
        i = t.useRef(!1);
      return (0, y.jsx)(F, {
        ...e,
        ref: n,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (t) => {
          (e.onCloseAutoFocus?.(t),
            t.defaultPrevented ||
              (o.current || r.triggerRef.current?.focus(), t.preventDefault()),
            (o.current = !1),
            (i.current = !1));
        },
        onInteractOutside: (t) => {
          (e.onInteractOutside?.(t),
            t.defaultPrevented ||
              ((o.current = !0),
              "pointerdown" === t.detail.originalEvent.type &&
                (i.current = !0)));
          let n = t.target;
          (r.triggerRef.current?.contains(n) && t.preventDefault(),
            "focusin" === t.detail.originalEvent.type &&
              i.current &&
              t.preventDefault());
        },
      });
    }),
    F = t.forwardRef((e, n) => {
      let {
          __scopeDialog: o,
          trapFocus: i,
          onOpenAutoFocus: a,
          onCloseAutoFocus: u,
          ...d
        } = e,
        c = E(A, o),
        p = t.useRef(null),
        m = (0, r.j)(n, p);
      return (
        (0, f.f)(),
        (0, y.jsxs)(y.Fragment, {
          children: [
            (0, y.jsx)(l.f, {
              asChild: !0,
              loop: !0,
              trapped: i,
              onMountAutoFocus: a,
              onUnmountAutoFocus: u,
              children: (0, y.jsx)(s.f, {
                role: "dialog",
                id: c.contentId,
                "aria-describedby": c.descriptionId,
                "aria-labelledby": c.titleId,
                "data-state": z(c.open),
                ...d,
                ref: m,
                onDismiss: () => c.onOpenChange(!1),
              }),
            }),
            (0, y.jsxs)(y.Fragment, {
              children: [
                (0, y.jsx)(Q, { titleId: c.titleId }),
                (0, y.jsx)(G, {
                  contentRef: p,
                  descriptionId: c.descriptionId,
                }),
              ],
            }),
          ],
        })
      );
    }),
    k = "DialogTitle",
    $ = t.forwardRef((e, t) => {
      let { __scopeDialog: n, ...r } = e,
        o = E(k, n);
      return (0, y.jsx)(c.V.h2, { id: o.titleId, ...r, ref: t });
    });
  $.displayName = k;
  var W = "DialogDescription",
    V = t.forwardRef((e, t) => {
      let { __scopeDialog: n, ...r } = e,
        o = E(W, n);
      return (0, y.jsx)(c.V.p, { id: o.descriptionId, ...r, ref: t });
    });
  V.displayName = W;
  var U = "DialogClose",
    B = t.forwardRef((e, t) => {
      let { __scopeDialog: r, ...o } = e,
        i = E(U, r);
      return (0, y.jsx)(c.V.button, {
        type: "button",
        ...o,
        ref: t,
        onClick: (0, n.f)(e.onClick, () => i.onOpenChange(!1)),
      });
    });
  function z(e) {
    return e ? "open" : "closed";
  }
  B.displayName = U;
  var K = "DialogTitleWarning",
    [Z, q] = (0, o.e)(K, { contentName: A, titleName: k, docsSlug: "dialog" }),
    Q = ({ titleId: e }) => {
      let n = q(K),
        r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
      return (
        t.useEffect(() => {
          e && (document.getElementById(e) || console.error(r));
        }, [r, e]),
        null
      );
    },
    G = ({ contentRef: e, descriptionId: n }) => {
      let r = q("DialogDescriptionWarning"),
        o = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${r.contentName}}.`;
      return (
        t.useEffect(() => {
          let t = e.current?.getAttribute("aria-describedby");
          n && t && (document.getElementById(n) || console.warn(o));
        }, [o, e, n]),
        null
      );
    };
  e.s([
    "K",
    0,
    B,
    "c",
    0,
    _,
    "u",
    0,
    V,
    "N",
    0,
    w,
    "t",
    0,
    B,
    "d",
    0,
    _,
    "C",
    0,
    V,
    "F",
    0,
    $,
    "k",
    0,
    T,
    "z",
    0,
    O,
    "G",
    0,
    w,
    "Z",
    0,
    $,
    "e",
    0,
    j,
  ]);
};
