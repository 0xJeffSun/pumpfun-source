// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(439587),
    i = e.i(93074),
    n = e.i(294237),
    l = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(274518);
  function c(e) {
    return (0, o.f)({
      tag: "svg",
      attr: {
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
      },
      child: [
        {
          tag: "path",
          attr: {
            fillRule: "evenodd",
            d: "M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z",
            clipRule: "evenodd",
          },
        },
      ],
    })(e);
  }
  var d = e.i(200165),
    u = e.i(556872),
    m = "horizontal",
    f = ["horizontal", "vertical"],
    p = l.forwardRef((e, r) => {
      var a;
      let { decorative: i, orientation: n = m, ...l } = e,
        s = ((a = n), f.includes(a)) ? n : m;
      return (0, t.jsx)(u.V.div, {
        "data-orientation": s,
        ...(i
          ? { role: "none" }
          : {
              "aria-orientation": "vertical" === s ? s : void 0,
              role: "separator",
            }),
        ...l,
        ref: r,
      });
    });
  p.displayName = "Separator";
  var h = e.i(426091);
  let b = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o,
      c,
      d = (0, r.c)(14);
    d[0] !== e
      ? (({ className: i, orientation: l, decorative: s, ...n } = e),
        (d[0] = e),
        (d[1] = i),
        (d[2] = n),
        (d[3] = l),
        (d[4] = s))
      : ((i = d[1]), (n = d[2]), (l = d[3]), (s = d[4]));
    let u = void 0 === l ? "horizontal" : l,
      m = void 0 === s || s,
      f = "horizontal" === u ? "h-[1px] w-full" : "h-full w-[1px]";
    return (
      d[5] !== i || d[6] !== f
        ? ((o = (0, h.c)("shrink-0 bg-border-secondary", f, i)),
          (d[5] = i),
          (d[6] = f),
          (d[7] = o))
        : (o = d[7]),
      d[8] !== m || d[9] !== u || d[10] !== n || d[11] !== a || d[12] !== o
        ? ((c = (0, t.jsx)(p, {
            ref: a,
            decorative: m,
            orientation: u,
            className: o,
            ...n,
          })),
          (d[8] = m),
          (d[9] = u),
          (d[10] = n),
          (d[11] = a),
          (d[12] = o),
          (d[13] = c))
        : (c = d[13]),
      c
    );
  });
  b.displayName = p.displayName;
  var x = e.i(206261),
    g = e.i(375670),
    y = e.i(338319);
  let v = { position: "fixed", top: 0, bottom: 0 },
    w = l.createContext(null);
  function _() {
    let e = l.useContext(w);
    if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
    return e;
  }
  let j = l.forwardRef((e, a) => {
    let i,
      n,
      s,
      o,
      c,
      d,
      u,
      m,
      f,
      p,
      h,
      b,
      x,
      g,
      v,
      _,
      j = (0, r.c)(35);
    j[0] !== e
      ? (({
          defaultOpen: u,
          open: s,
          onOpenChange: c,
          className: n,
          style: d,
          children: i,
          ...o
        } = e),
        (j[0] = e),
        (j[1] = i),
        (j[2] = n),
        (j[3] = s),
        (j[4] = o),
        (j[5] = c),
        (j[6] = d),
        (j[7] = u))
      : ((i = j[1]),
        (n = j[2]),
        (s = j[3]),
        (o = j[4]),
        (c = j[5]),
        (d = j[6]),
        (u = j[7]));
    let C = void 0 === u || u,
      [N, S] = l.useState(!1),
      [k, E] = l.useState(C),
      A = s ?? k;
    j[8] !== A || j[9] !== c
      ? ((m = (e) => {
          let t = "function" == typeof e ? e(A) : e;
          c ? c(t) : E(t);
        }),
        (j[8] = A),
        (j[9] = c),
        (j[10] = m))
      : (m = j[10]);
    let I = m;
    j[11] !== I
      ? ((f = () => {
          window.matchMedia("(max-width: 767px)").matches ? S(M) : I(D);
        }),
        (j[11] = I),
        (j[12] = f))
      : (f = j[12]);
    let T = f;
    (j[13] !== T
      ? ((p = () => {
          let e = (e) => {
            "b" === e.key &&
              (e.metaKey || e.ctrlKey) &&
              (e.preventDefault(), T());
          };
          return (
            window.addEventListener("keydown", e),
            () => window.removeEventListener("keydown", e)
          );
        }),
        (h = [T]),
        (j[13] = T),
        (j[14] = p),
        (j[15] = h))
      : ((p = j[14]), (h = j[15])),
      l.useEffect(p, h));
    let R = A ? "expanded" : "collapsed";
    j[16] !== A || j[17] !== N || j[18] !== I || j[19] !== R || j[20] !== T
      ? ((b = {
          state: R,
          open: A,
          setOpen: I,
          openMobile: N,
          setOpenMobile: S,
          toggleSidebar: T,
        }),
        (j[16] = A),
        (j[17] = N),
        (j[18] = I),
        (j[19] = R),
        (j[20] = T),
        (j[21] = b))
      : (b = j[21]);
    let L = b;
    j[22] !== d
      ? ((x = {
          "--sidebar-width": "13rem",
          "--sidebar-width-icon": "3.5rem",
          ...d,
        }),
        (j[22] = d),
        (j[23] = x))
      : (x = j[23]);
    let O = x;
    return (
      j[24] !== n
        ? ((g = (0, y.c)("group/sidebar-wrapper flex min-h-svh w-full", n)),
          (j[24] = n),
          (j[25] = g))
        : (g = j[25]),
      j[26] !== i || j[27] !== o || j[28] !== a || j[29] !== O || j[30] !== g
        ? ((v = (0, t.jsx)("div", {
            style: O,
            className: g,
            ref: a,
            ...o,
            children: i,
          })),
          (j[26] = i),
          (j[27] = o),
          (j[28] = a),
          (j[29] = O),
          (j[30] = g),
          (j[31] = v))
        : (v = j[31]),
      j[32] !== L || j[33] !== v
        ? ((_ = (0, t.jsx)(w.Provider, { value: L, children: v })),
          (j[32] = L),
          (j[33] = v),
          (j[34] = _))
        : (_ = j[34]),
      _
    );
  });
  j.displayName = "SidebarProvider";
  let C = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      o,
      c,
      d,
      u,
      m,
      f,
      p,
      h,
      b,
      g,
      w,
      j,
      C,
      N,
      S,
      k,
      E,
      A,
      I,
      T,
      R,
      L = (0, r.c)(65);
    L[0] !== e
      ? (({
          side: c,
          variant: d,
          collapsible: u,
          className: n,
          style: o,
          children: i,
          ...l
        } = e),
        (L[0] = e),
        (L[1] = i),
        (L[2] = n),
        (L[3] = l),
        (L[4] = o),
        (L[5] = c),
        (L[6] = d),
        (L[7] = u))
      : ((i = L[1]),
        (n = L[2]),
        (l = L[3]),
        (o = L[4]),
        (c = L[5]),
        (d = L[6]),
        (u = L[7]));
    let O = void 0 === c ? "left" : c,
      M = void 0 === d ? "sidebar" : d,
      D = void 0 === u ? "offcanvas" : u,
      { state: F, openMobile: P, setOpenMobile: z } = _(),
      { t: K } = (0, s.f)();
    if ("none" === D) {
      let e, r;
      return (
        L[8] !== n
          ? ((e = (0, y.c)("flex h-full w-[--sidebar-width] flex-col", n)),
            (L[8] = n),
            (L[9] = e))
          : (e = L[9]),
        L[10] !== i || L[11] !== l || L[12] !== a || L[13] !== e
          ? ((r = (0, t.jsx)("div", {
              className: e,
              ref: a,
              ...l,
              children: i,
            })),
            (L[10] = i),
            (L[11] = l),
            (L[12] = a),
            (L[13] = e),
            (L[14] = r))
          : (r = L[14]),
        r
      );
    }
    (L[15] === Symbol.for("react.memo_cache_sentinel")
      ? ((m = { "--sidebar-width": "18rem" }), (L[15] = m))
      : (m = L[15]),
      L[16] !== K
        ? ((f = K("web.sidebar.title")), (L[16] = K), (L[17] = f))
        : (f = L[17]),
      L[18] !== f
        ? ((p = (0, t.jsx)(x.L, { children: f })), (L[18] = f), (L[19] = p))
        : (p = L[19]),
      L[20] !== K
        ? ((h = K("web.sidebar.mobile_description")), (L[20] = K), (L[21] = h))
        : (h = L[21]),
      L[22] !== h
        ? ((b = (0, t.jsx)(x.c, { children: h })), (L[22] = h), (L[23] = b))
        : (b = L[23]),
      L[24] !== p || L[25] !== b
        ? ((g = (0, t.jsxs)(x.D, { className: "sr-only", children: [p, b] })),
          (L[24] = p),
          (L[25] = b),
          (L[26] = g))
        : (g = L[26]),
      L[27] !== i
        ? ((w = (0, t.jsx)("div", {
            className: "flex h-full w-full flex-col",
            children: i,
          })),
          (L[27] = i),
          (L[28] = w))
        : (w = L[28]),
      L[29] !== O || L[30] !== w || L[31] !== g
        ? ((j = (0, t.jsxs)(x.U, {
            "data-sidebar": "sidebar",
            "data-mobile": "true",
            className:
              "w-[--sidebar-width] border-r border-border-secondary bg-bg-primary p-0 md:hidden [&>button]:hidden",
            overlayClassName: "md:hidden",
            style: m,
            side: O,
            children: [g, w],
          })),
          (L[29] = O),
          (L[30] = w),
          (L[31] = g),
          (L[32] = j))
        : (j = L[32]),
      L[33] !== P || L[34] !== z || L[35] !== j
        ? ((C = (0, t.jsx)(x.j, { open: P, onOpenChange: z, children: j })),
          (L[33] = P),
          (L[34] = z),
          (L[35] = j),
          (L[36] = C))
        : (C = L[36]));
    let B = "collapsed" === F ? D : "",
      H =
        "floating" === M || "inset" === M
          ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
          : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]";
    (L[37] !== H
      ? ((N = (0, y.c)(
          "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          H,
        )),
        (L[37] = H),
        (L[38] = N))
      : (N = L[38]),
      L[39] !== N
        ? ((S = (0, t.jsx)("div", { className: N })), (L[39] = N), (L[40] = S))
        : (S = L[40]));
    let q =
        "left" === O
          ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
          : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
      W =
        "floating" === M || "inset" === M
          ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
          : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l";
    return (
      L[41] !== n || L[42] !== q || L[43] !== W
        ? ((k = (0, y.c)(
            "z-40 hidden w-[--sidebar-width] transform-gpu transition-[left,right,width] duration-200 ease-linear md:flex",
            q,
            W,
            n,
          )),
          (L[41] = n),
          (L[42] = q),
          (L[43] = W),
          (L[44] = k))
        : (k = L[44]),
      L[45] !== o
        ? ((E = { ...v, ...o }), (L[45] = o), (L[46] = E))
        : (E = L[46]),
      L[47] !== i
        ? ((A = (0, t.jsx)("div", {
            "data-sidebar": "sidebar",
            className:
              "relative flex h-full w-full flex-col bg-bg-primary group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-border-secondary group-data-[variant=floating]:shadow",
            children: i,
          })),
          (L[47] = i),
          (L[48] = A))
        : (A = L[48]),
      L[49] !== l || L[50] !== k || L[51] !== E || L[52] !== A
        ? ((I = (0, t.jsx)("div", {
            className: k,
            style: E,
            ...l,
            children: A,
          })),
          (L[49] = l),
          (L[50] = k),
          (L[51] = E),
          (L[52] = A),
          (L[53] = I))
        : (I = L[53]),
      L[54] !== a ||
      L[55] !== O ||
      L[56] !== F ||
      L[57] !== B ||
      L[58] !== S ||
      L[59] !== I ||
      L[60] !== M
        ? ((T = (0, t.jsxs)("div", {
            ref: a,
            className: "group peer hidden text-text-primary md:block",
            "data-state": F,
            "data-collapsible": B,
            "data-variant": M,
            "data-side": O,
            children: [S, I],
          })),
          (L[54] = a),
          (L[55] = O),
          (L[56] = F),
          (L[57] = B),
          (L[58] = S),
          (L[59] = I),
          (L[60] = M),
          (L[61] = T))
        : (T = L[61]),
      L[62] !== C || L[63] !== T
        ? ((R = (0, t.jsxs)(t.Fragment, { children: [C, T] })),
          (L[62] = C),
          (L[63] = T),
          (L[64] = R))
        : (R = L[64]),
      R
    );
  });
  C.displayName = "Sidebar";
  let N = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      o,
      d,
      u,
      m,
      f,
      p,
      h = (0, r.c)(21);
    h[0] !== e
      ? (({ className: i, onClick: n, ...l } = e),
        (h[0] = e),
        (h[1] = i),
        (h[2] = n),
        (h[3] = l))
      : ((i = h[1]), (n = h[2]), (l = h[3]));
    let { toggleSidebar: b } = _(),
      { t: x } = (0, s.f)();
    return (
      h[4] !== x
        ? ((o = x("web.sidebar.toggle")), (h[4] = x), (h[5] = o))
        : (o = h[5]),
      h[6] !== x
        ? ((d = x("web.sidebar.toggle")), (h[6] = x), (h[7] = d))
        : (d = h[7]),
      h[8] !== n || h[9] !== b
        ? ((u = (e) => {
            (n?.(e), b());
          }),
          (h[8] = n),
          (h[9] = b),
          (h[10] = u))
        : (u = h[10]),
      h[11] !== i
        ? ((m = (0, y.c)(
            "flex size-6 shrink-0 items-center justify-center rounded-full border border-border-secondary bg-bg-primary text-text-quaternary transition-colors hover:border-border-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent [&>svg]:size-3.5",
            i,
          )),
          (h[11] = i),
          (h[12] = m))
        : (m = h[12]),
      h[13] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = (0, t.jsx)(c, {
            className:
              "transition-transform duration-200 group-data-[state=collapsed]:rotate-180",
          })),
          (h[13] = f))
        : (f = h[13]),
      h[14] !== l ||
      h[15] !== a ||
      h[16] !== o ||
      h[17] !== d ||
      h[18] !== u ||
      h[19] !== m
        ? ((p = (0, t.jsx)("button", {
            ref: a,
            type: "button",
            "data-sidebar": "trigger",
            "aria-label": o,
            title: d,
            onClick: u,
            className: m,
            ...l,
            children: f,
          })),
          (h[14] = l),
          (h[15] = a),
          (h[16] = o),
          (h[17] = d),
          (h[18] = u),
          (h[19] = m),
          (h[20] = p))
        : (p = h[20]),
      p
    );
  });
  N.displayName = "SidebarTrigger";
  let S = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      o,
      c,
      d,
      u = (0, r.c)(16);
    u[0] !== e
      ? (({ className: i, ...n } = e), (u[0] = e), (u[1] = i), (u[2] = n))
      : ((i = u[1]), (n = u[2]));
    let { toggleSidebar: m } = _(),
      { t: f } = (0, s.f)();
    return (
      u[3] !== f
        ? ((l = f("web.sidebar.toggle")), (u[3] = f), (u[4] = l))
        : (l = u[4]),
      u[5] !== f
        ? ((o = f("web.sidebar.toggle")), (u[5] = f), (u[6] = o))
        : (o = u[6]),
      u[7] !== i
        ? ((c = (0, y.c)(
            "hover:after:bg-border-tertiary absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
            "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
            "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
            "group-data-[collapsible=offcanvas]:hover:bg-bg-primary group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
            "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
            "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
            i,
          )),
          (u[7] = i),
          (u[8] = c))
        : (c = u[8]),
      u[9] !== n ||
      u[10] !== a ||
      u[11] !== l ||
      u[12] !== o ||
      u[13] !== c ||
      u[14] !== m
        ? ((d = (0, t.jsx)("button", {
            ref: a,
            "data-sidebar": "rail",
            "aria-label": l,
            tabIndex: -1,
            onClick: m,
            title: o,
            className: c,
            ...n,
          })),
          (u[9] = n),
          (u[10] = a),
          (u[11] = l),
          (u[12] = o),
          (u[13] = c),
          (u[14] = m),
          (u[15] = d))
        : (d = u[15]),
      d
    );
  });
  S.displayName = "SidebarRail";
  let k = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o = (0, r.c)(9);
    return (
      o[0] !== e
        ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
        : ((i = o[1]), (n = o[2])),
      o[3] !== i
        ? ((l = (0, y.c)(
            "relative flex w-full flex-1 flex-col bg-bg-primary",
            "w-px md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
            i,
          )),
          (o[3] = i),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== a || o[7] !== l
        ? ((s = (0, t.jsx)("main", { ref: a, className: l, ...n })),
          (o[5] = n),
          (o[6] = a),
          (o[7] = l),
          (o[8] = s))
        : (s = o[8]),
      s
    );
  });
  ((k.displayName = "SidebarInset"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l,
        s,
        o = (0, r.c)(9);
      return (
        o[0] !== e
          ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
          : ((i = o[1]), (n = o[2])),
        o[3] !== i
          ? ((l = (0, y.c)(
              "h-8 w-full bg-bg-tertiary shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
              i,
            )),
            (o[3] = i),
            (o[4] = l))
          : (l = o[4]),
        o[5] !== n || o[6] !== a || o[7] !== l
          ? ((s = (0, t.jsx)(d.f, {
              ref: a,
              "data-sidebar": "input",
              className: l,
              ...n,
            })),
            (o[5] = n),
            (o[6] = a),
            (o[7] = l),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    }).displayName = "SidebarInput"));
  let E = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o = (0, r.c)(9);
    return (
      o[0] !== e
        ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
        : ((i = o[1]), (n = o[2])),
      o[3] !== i
        ? ((l = (0, y.c)("flex flex-col gap-2 p-2", i)), (o[3] = i), (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== a || o[7] !== l
        ? ((s = (0, t.jsx)("div", {
            ref: a,
            "data-sidebar": "header",
            className: l,
            ...n,
          })),
          (o[5] = n),
          (o[6] = a),
          (o[7] = l),
          (o[8] = s))
        : (s = o[8]),
      s
    );
  });
  E.displayName = "SidebarHeader";
  let A = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o = (0, r.c)(9);
    return (
      o[0] !== e
        ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
        : ((i = o[1]), (n = o[2])),
      o[3] !== i
        ? ((l = (0, y.c)("flex flex-col gap-2 p-2", i)), (o[3] = i), (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== a || o[7] !== l
        ? ((s = (0, t.jsx)("div", {
            ref: a,
            "data-sidebar": "footer",
            className: l,
            ...n,
          })),
          (o[5] = n),
          (o[6] = a),
          (o[7] = l),
          (o[8] = s))
        : (s = o[8]),
      s
    );
  });
  ((A.displayName = "SidebarFooter"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l,
        s,
        o = (0, r.c)(9);
      return (
        o[0] !== e
          ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
          : ((i = o[1]), (n = o[2])),
        o[3] !== i
          ? ((l = (0, y.c)("mx-2 w-auto bg-border-secondary", i)),
            (o[3] = i),
            (o[4] = l))
          : (l = o[4]),
        o[5] !== n || o[6] !== a || o[7] !== l
          ? ((s = (0, t.jsx)(b, {
              ref: a,
              "data-sidebar": "separator",
              className: l,
              ...n,
            })),
            (o[5] = n),
            (o[6] = a),
            (o[7] = l),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    }).displayName = "SidebarSeparator"));
  let I = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o = (0, r.c)(9);
    return (
      o[0] !== e
        ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
        : ((i = o[1]), (n = o[2])),
      o[3] !== i
        ? ((l = (0, y.c)(
            "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-x-hidden group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:[scrollbar-width:none] group-data-[collapsible=icon]:[&::-webkit-scrollbar]:hidden",
            i,
          )),
          (o[3] = i),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== a || o[7] !== l
        ? ((s = (0, t.jsx)("div", {
            ref: a,
            "data-sidebar": "content",
            className: l,
            ...n,
          })),
          (o[5] = n),
          (o[6] = a),
          (o[7] = l),
          (o[8] = s))
        : (s = o[8]),
      s
    );
  });
  ((I.displayName = "SidebarContent"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l,
        s,
        o = (0, r.c)(9);
      return (
        o[0] !== e
          ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
          : ((i = o[1]), (n = o[2])),
        o[3] !== i
          ? ((l = (0, y.c)("relative flex w-full min-w-0 flex-col p-2", i)),
            (o[3] = i),
            (o[4] = l))
          : (l = o[4]),
        o[5] !== n || o[6] !== a || o[7] !== l
          ? ((s = (0, t.jsx)("div", {
              ref: a,
              "data-sidebar": "group",
              className: l,
              ...n,
            })),
            (o[5] = n),
            (o[6] = a),
            (o[7] = l),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    }).displayName = "SidebarGroup"),
    (l.forwardRef((e, a) => {
      let n,
        l,
        s,
        o,
        c,
        d = (0, r.c)(11);
      d[0] !== e
        ? (({ className: n, asChild: s, ...l } = e),
          (d[0] = e),
          (d[1] = n),
          (d[2] = l),
          (d[3] = s))
        : ((n = d[1]), (l = d[2]), (s = d[3]));
      let u = void 0 !== s && s ? i.M : "div";
      return (
        d[4] !== n
          ? ((o = (0, y.c)(
              "flex h-8 shrink-0 items-center rounded-md px-2 text-[11px] font-normal text-text-quaternary outline-none transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 focus-visible:ring-text-accent [&>svg]:size-4 [&>svg]:shrink-0",
              "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
              n,
            )),
            (d[4] = n),
            (d[5] = o))
          : (o = d[5]),
        d[6] !== u || d[7] !== l || d[8] !== a || d[9] !== o
          ? ((c = (0, t.jsx)(u, {
              ref: a,
              "data-sidebar": "group-label",
              className: o,
              ...l,
            })),
            (d[6] = u),
            (d[7] = l),
            (d[8] = a),
            (d[9] = o),
            (d[10] = c))
          : (c = d[10]),
        c
      );
    }).displayName = "SidebarGroupLabel"),
    (l.forwardRef((e, a) => {
      let n,
        l,
        s,
        o,
        c,
        d = (0, r.c)(11);
      d[0] !== e
        ? (({ className: n, asChild: s, ...l } = e),
          (d[0] = e),
          (d[1] = n),
          (d[2] = l),
          (d[3] = s))
        : ((n = d[1]), (l = d[2]), (s = d[3]));
      let u = void 0 !== s && s ? i.M : "button";
      return (
        d[4] !== n
          ? ((o = (0, y.c)(
              "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-text-secondary outline-none transition-transform hover:bg-bg-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-text-accent [&>svg]:size-4 [&>svg]:shrink-0",
              "after:absolute after:-inset-2 after:md:hidden",
              "group-data-[collapsible=icon]:hidden",
              n,
            )),
            (d[4] = n),
            (d[5] = o))
          : (o = d[5]),
        d[6] !== u || d[7] !== l || d[8] !== a || d[9] !== o
          ? ((c = (0, t.jsx)(u, {
              ref: a,
              "data-sidebar": "group-action",
              className: o,
              ...l,
            })),
            (d[6] = u),
            (d[7] = l),
            (d[8] = a),
            (d[9] = o),
            (d[10] = c))
          : (c = d[10]),
        c
      );
    }).displayName = "SidebarGroupAction"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l,
        s,
        o = (0, r.c)(9);
      return (
        o[0] !== e
          ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
          : ((i = o[1]), (n = o[2])),
        o[3] !== i
          ? ((l = (0, y.c)("w-full text-sm", i)), (o[3] = i), (o[4] = l))
          : (l = o[4]),
        o[5] !== n || o[6] !== a || o[7] !== l
          ? ((s = (0, t.jsx)("div", {
              ref: a,
              "data-sidebar": "group-content",
              className: l,
              ...n,
            })),
            (o[5] = n),
            (o[6] = a),
            (o[7] = l),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    }).displayName = "SidebarGroupContent"));
  let T = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o = (0, r.c)(9);
    return (
      o[0] !== e
        ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
        : ((i = o[1]), (n = o[2])),
      o[3] !== i
        ? ((l = (0, y.c)("flex w-full min-w-0 flex-col gap-1", i)),
          (o[3] = i),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== a || o[7] !== l
        ? ((s = (0, t.jsx)("ul", {
            ref: a,
            "data-sidebar": "menu",
            className: l,
            ...n,
          })),
          (o[5] = n),
          (o[6] = a),
          (o[7] = l),
          (o[8] = s))
        : (s = o[8]),
      s
    );
  });
  T.displayName = "SidebarMenu";
  let R = l.forwardRef((e, a) => {
    let i,
      n,
      l,
      s,
      o = (0, r.c)(9);
    return (
      o[0] !== e
        ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
        : ((i = o[1]), (n = o[2])),
      o[3] !== i
        ? ((l = (0, y.c)("group/menu-item relative", i)),
          (o[3] = i),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== a || o[7] !== l
        ? ((s = (0, t.jsx)("li", {
            ref: a,
            "data-sidebar": "menu-item",
            className: l,
            ...n,
          })),
          (o[5] = n),
          (o[6] = a),
          (o[7] = l),
          (o[8] = s))
        : (s = o[8]),
      s
    );
  });
  R.displayName = "SidebarMenuItem";
  let L = (0, n.f)(
      "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] hover:bg-bg-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-text-accent active:bg-bg-tertiary active:text-text-primary disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-bg-tertiary data-[active=true]:font-medium data-[active=true]:text-text-primary data-[state=open]:hover:bg-bg-secondary data-[state=open]:hover:text-text-primary group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span:last-child]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
      {
        variants: {
          variant: {
            default: "hover:bg-bg-secondary hover:text-text-primary",
            outline:
              "bg-bg-primary shadow-[0_0_0_1px_var(--color-border-secondary)] hover:bg-bg-secondary hover:text-text-primary hover:shadow-[0_0_0_1px_var(--color-border-tertiary)]",
          },
          size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
          },
        },
        defaultVariants: { variant: "default", size: "default" },
      },
    ),
    O = l.forwardRef((e, n) => {
      let l,
        s,
        o,
        c,
        d,
        u,
        m,
        f,
        p,
        h,
        b,
        x,
        g = (0, r.c)(29);
      g[0] !== e
        ? (({
            asChild: o,
            isActive: c,
            variant: d,
            size: u,
            tooltip: m,
            className: l,
            ...s
          } = e),
          (g[0] = e),
          (g[1] = l),
          (g[2] = s),
          (g[3] = o),
          (g[4] = c),
          (g[5] = d),
          (g[6] = u),
          (g[7] = m))
        : ((l = g[1]),
          (s = g[2]),
          (o = g[3]),
          (c = g[4]),
          (d = g[5]),
          (u = g[6]),
          (m = g[7]));
      let v = void 0 !== c && c,
        w = void 0 === d ? "default" : d,
        j = void 0 === u ? "default" : u,
        C = void 0 !== o && o ? i.M : "button",
        { state: N } = _();
      (g[8] !== l || g[9] !== j || g[10] !== w
        ? ((f = (0, y.c)(L({ variant: w, size: j }), l)),
          (g[8] = l),
          (g[9] = j),
          (g[10] = w),
          (g[11] = f))
        : (f = g[11]),
        g[12] !== C ||
        g[13] !== v ||
        g[14] !== s ||
        g[15] !== n ||
        g[16] !== j ||
        g[17] !== f
          ? ((p = (0, t.jsx)(C, {
              ref: n,
              "data-sidebar": "menu-button",
              "data-size": j,
              "data-active": v,
              className: f,
              ...s,
            })),
            (g[12] = C),
            (g[13] = v),
            (g[14] = s),
            (g[15] = n),
            (g[16] = j),
            (g[17] = f),
            (g[18] = p))
          : (p = g[18]));
      let S = p;
      if (!m) return S;
      if ("string" == typeof m) {
        let e;
        (g[19] !== m
          ? ((e = { children: m }), (g[19] = m), (g[20] = e))
          : (e = g[20]),
          (m = e));
      }
      g[21] !== S
        ? ((h = (0, t.jsx)(a._, { render: S })), (g[21] = S), (g[22] = h))
        : (h = g[22]);
      let k = "collapsed" !== N;
      return (
        g[23] !== k || g[24] !== m
          ? ((b = (0, t.jsx)(a.Y, { hidden: k, side: "right", ...m })),
            (g[23] = k),
            (g[24] = m),
            (g[25] = b))
          : (b = g[25]),
        g[26] !== h || g[27] !== b
          ? ((x = (0, t.jsxs)(a.W, { children: [h, b] })),
            (g[26] = h),
            (g[27] = b),
            (g[28] = x))
          : (x = g[28]),
        x
      );
    });
  function M(e) {
    return !e;
  }
  function D(e) {
    return !e;
  }
  ((O.displayName = "SidebarMenuButton"),
    (l.forwardRef((e, a) => {
      let n,
        l,
        s,
        o,
        c,
        d,
        u = (0, r.c)(13);
      u[0] !== e
        ? (({ className: n, asChild: s, showOnHover: o, ...l } = e),
          (u[0] = e),
          (u[1] = n),
          (u[2] = l),
          (u[3] = s),
          (u[4] = o))
        : ((n = u[1]), (l = u[2]), (s = u[3]), (o = u[4]));
      let m = void 0 !== o && o,
        f = void 0 !== s && s ? i.M : "button",
        p =
          m &&
          "peer-data-[active=true]/menu-button:text-text-primary group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0";
      return (
        u[5] !== n || u[6] !== p
          ? ((c = (0, y.c)(
              "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-text-secondary outline-none transition-transform hover:bg-bg-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-text-accent peer-hover/menu-button:text-text-primary [&>svg]:size-4 [&>svg]:shrink-0",
              "after:absolute after:-inset-2 after:md:hidden",
              "peer-data-[size=sm]/menu-button:top-1",
              "peer-data-[size=default]/menu-button:top-1.5",
              "peer-data-[size=lg]/menu-button:top-2.5",
              "group-data-[collapsible=icon]:hidden",
              p,
              n,
            )),
            (u[5] = n),
            (u[6] = p),
            (u[7] = c))
          : (c = u[7]),
        u[8] !== f || u[9] !== l || u[10] !== a || u[11] !== c
          ? ((d = (0, t.jsx)(f, {
              ref: a,
              "data-sidebar": "menu-action",
              className: c,
              ...l,
            })),
            (u[8] = f),
            (u[9] = l),
            (u[10] = a),
            (u[11] = c),
            (u[12] = d))
          : (d = u[12]),
        d
      );
    }).displayName = "SidebarMenuAction"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l,
        s,
        o = (0, r.c)(9);
      return (
        o[0] !== e
          ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
          : ((i = o[1]), (n = o[2])),
        o[3] !== i
          ? ((l = (0, y.c)(
              "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-text-secondary",
              "peer-hover/menu-button:text-text-primary peer-data-[active=true]/menu-button:text-text-primary",
              "peer-data-[size=sm]/menu-button:top-1",
              "peer-data-[size=default]/menu-button:top-1.5",
              "peer-data-[size=lg]/menu-button:top-2.5",
              "group-data-[collapsible=icon]:hidden",
              i,
            )),
            (o[3] = i),
            (o[4] = l))
          : (l = o[4]),
        o[5] !== n || o[6] !== a || o[7] !== l
          ? ((s = (0, t.jsx)("div", {
              ref: a,
              "data-sidebar": "menu-badge",
              className: l,
              ...n,
            })),
            (o[5] = n),
            (o[6] = a),
            (o[7] = l),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    }).displayName = "SidebarMenuBadge"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        s,
        o,
        c,
        d,
        u,
        m,
        f = (0, r.c)(18);
      f[0] !== e
        ? (({ className: i, showIcon: s, ...n } = e),
          (f[0] = e),
          (f[1] = i),
          (f[2] = n),
          (f[3] = s))
        : ((i = f[1]), (n = f[2]), (s = f[3]));
      let p = void 0 !== s && s,
        h = l.useId(),
        b = 0;
      for (let e = 0; e < h.length; e++) b = (31 * b + h.charCodeAt(e)) | 0;
      let x = `${(Math.abs(b) % 41) + 50}%`;
      (f[4] !== i
        ? ((o = (0, y.c)("flex h-8 items-center gap-2 rounded-md px-2", i)),
          (f[4] = i),
          (f[5] = o))
        : (o = f[5]),
        f[6] !== p
          ? ((c =
              p &&
              (0, t.jsx)(g.f, {
                className: "size-4 rounded-md",
                "data-sidebar": "menu-skeleton-icon",
              })),
            (f[6] = p),
            (f[7] = c))
          : (c = f[7]),
        f[8] !== x
          ? ((d = { "--skeleton-width": x }), (f[8] = x), (f[9] = d))
          : (d = f[9]));
      let v = d;
      return (
        f[10] !== v
          ? ((u = (0, t.jsx)(g.f, {
              className: "h-4 max-w-[--skeleton-width] flex-1",
              "data-sidebar": "menu-skeleton-text",
              style: v,
            })),
            (f[10] = v),
            (f[11] = u))
          : (u = f[11]),
        f[12] !== n || f[13] !== a || f[14] !== o || f[15] !== c || f[16] !== u
          ? ((m = (0, t.jsxs)("div", {
              ref: a,
              "data-sidebar": "menu-skeleton",
              className: o,
              ...n,
              children: [c, u],
            })),
            (f[12] = n),
            (f[13] = a),
            (f[14] = o),
            (f[15] = c),
            (f[16] = u),
            (f[17] = m))
          : (m = f[17]),
        m
      );
    }).displayName = "SidebarMenuSkeleton"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l,
        s,
        o = (0, r.c)(9);
      return (
        o[0] !== e
          ? (({ className: i, ...n } = e), (o[0] = e), (o[1] = i), (o[2] = n))
          : ((i = o[1]), (n = o[2])),
        o[3] !== i
          ? ((l = (0, y.c)(
              "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-border-secondary px-2.5 py-0.5",
              "group-data-[collapsible=icon]:hidden",
              i,
            )),
            (o[3] = i),
            (o[4] = l))
          : (l = o[4]),
        o[5] !== n || o[6] !== a || o[7] !== l
          ? ((s = (0, t.jsx)("ul", {
              ref: a,
              "data-sidebar": "menu-sub",
              className: l,
              ...n,
            })),
            (o[5] = n),
            (o[6] = a),
            (o[7] = l),
            (o[8] = s))
          : (s = o[8]),
        s
      );
    }).displayName = "SidebarMenuSub"),
    (l.forwardRef((e, a) => {
      let i,
        n,
        l = (0, r.c)(5);
      return (
        l[0] !== e ? (({ ...i } = e), (l[0] = e), (l[1] = i)) : (i = l[1]),
        l[2] !== i || l[3] !== a
          ? ((n = (0, t.jsx)("li", { ref: a, ...i })),
            (l[2] = i),
            (l[3] = a),
            (l[4] = n))
          : (n = l[4]),
        n
      );
    }).displayName = "SidebarMenuSubItem"),
    (l.forwardRef((e, a) => {
      let n,
        l,
        s,
        o,
        c,
        d,
        u,
        m = (0, r.c)(17);
      m[0] !== e
        ? (({ asChild: o, size: c, isActive: l, className: n, ...s } = e),
          (m[0] = e),
          (m[1] = n),
          (m[2] = l),
          (m[3] = s),
          (m[4] = o),
          (m[5] = c))
        : ((n = m[1]), (l = m[2]), (s = m[3]), (o = m[4]), (c = m[5]));
      let f = void 0 === c ? "md" : c,
        p = void 0 !== o && o ? i.M : "a",
        h = "sm" === f && "text-xs",
        b = "md" === f && "text-sm";
      return (
        m[6] !== n || m[7] !== h || m[8] !== b
          ? ((d = (0, y.c)(
              "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-text-secondary outline-none hover:bg-bg-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-text-accent active:bg-bg-tertiary active:text-text-primary disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-text-primary",
              "data-[active=true]:bg-bg-tertiary data-[active=true]:text-text-primary",
              h,
              b,
              "group-data-[collapsible=icon]:hidden",
              n,
            )),
            (m[6] = n),
            (m[7] = h),
            (m[8] = b),
            (m[9] = d))
          : (d = m[9]),
        m[10] !== p ||
        m[11] !== l ||
        m[12] !== s ||
        m[13] !== a ||
        m[14] !== f ||
        m[15] !== d
          ? ((u = (0, t.jsx)(p, {
              ref: a,
              "data-sidebar": "menu-sub-button",
              "data-size": f,
              "data-active": l,
              className: d,
              ...s,
            })),
            (m[10] = p),
            (m[11] = l),
            (m[12] = s),
            (m[13] = a),
            (m[14] = f),
            (m[15] = d),
            (m[16] = u))
          : (u = m[16]),
        u
      );
    }).displayName = "SidebarMenuSubButton"),
    e.s(
      [
        "Sidebar",
        0,
        C,
        "SidebarContent",
        0,
        I,
        "SidebarFooter",
        0,
        A,
        "SidebarHeader",
        0,
        E,
        "SidebarInset",
        0,
        k,
        "SidebarMenu",
        0,
        T,
        "SidebarMenuButton",
        0,
        O,
        "SidebarMenuItem",
        0,
        R,
        "SidebarProvider",
        0,
        j,
        "SidebarRail",
        0,
        S,
        "SidebarTrigger",
        0,
        N,
        "useSidebar",
        0,
        _,
      ],
      103547,
    ));
};
