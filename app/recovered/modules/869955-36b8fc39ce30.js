// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(157633),
    n = e.i(745018),
    r = e.i(426091),
    s = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    o = e.i(51206),
    c = e.i(21384),
    d = e.i(300898),
    m = e.i(595673),
    u = e.i(358893);
  let p = {
    google: a.Ao,
    apple: n.Te,
    twitter: n.Tc,
    github: n.lX,
    email: n.Wl,
  };
  function f(e) {
    let a,
      l = (0, i.c)(13),
      { method: o, className: c } = e,
      [d, m] = (0, s.useState)(null);
    if ("external" === o.kind && o.walletIcon && d !== o.walletIcon) {
      let e,
        i,
        a,
        n = o.walletIcon;
      return (
        l[0] !== c
          ? ((e = (0, r.c)("object-contain", c)), (l[0] = c), (l[1] = e))
          : (e = l[1]),
        l[2] !== n ? ((i = () => m(n)), (l[2] = n), (l[3] = i)) : (i = l[3]),
        l[4] !== n || l[5] !== e || l[6] !== i
          ? ((a = (0, t.jsx)("img", {
              src: n,
              alt: "",
              "aria-hidden": !0,
              className: e,
              onError: i,
            })),
            (l[4] = n),
            (l[5] = e),
            (l[6] = i),
            (l[7] = a))
          : (a = l[7]),
        a
      );
    }
    if ("embedded" === o.kind && o.provider) {
      let e,
        i = p[o.provider];
      return (
        l[8] !== i || l[9] !== c
          ? ((e = (0, t.jsx)(i, { className: c })),
            (l[8] = i),
            (l[9] = c),
            (l[10] = e))
          : (e = l[10]),
        e
      );
    }
    return (
      l[11] !== c
        ? ((a = (0, t.jsx)(n.Of, { className: c })), (l[11] = c), (l[12] = a))
        : (a = l[12]),
      a
    );
  }
  function x(e) {
    let a,
      n,
      s,
      l,
      o,
      c = (0, i.c)(12),
      { method: m, hidden: p, density: f } = e;
    if ("embedded" !== m.kind) return null;
    if (c[0] !== m) {
      s = Symbol.for("react.early_return_sentinel");
      e: {
        if (!(a = (0, d.t)(m))) {
          s = null;
          break e;
        }
        n = a.provider === m.provider ? null : ` (${(0, d.c)(a.provider)})`;
      }
      ((c[0] = m), (c[1] = a), (c[2] = n), (c[3] = s));
    } else ((a = c[1]), (n = c[2]), (s = c[3]));
    if (s !== Symbol.for("react.early_return_sentinel")) return s;
    let x = n,
      g =
        "comfortable" === (void 0 === f ? "compact" : f)
          ? "text-[13px] leading-[18px]"
          : "text-xs";
    c[4] !== g
      ? ((l = (0, r.c)("text-text-tertiary truncate", g)),
        (c[4] = g),
        (c[5] = l))
      : (l = c[5]);
    let h = p ? void 0 : a.value,
      b = p || void 0,
      y = p ? u.V : a.value;
    return (
      c[6] !== x || c[7] !== l || c[8] !== h || c[9] !== b || c[10] !== y
        ? ((o = (0, t.jsxs)("p", {
            className: l,
            title: h,
            "data-testid": "connection-method-identifier",
            "data-hidden": b,
            children: [y, x],
          })),
          (c[6] = x),
          (c[7] = l),
          (c[8] = h),
          (c[9] = b),
          (c[10] = y),
          (c[11] = o))
        : (o = c[11]),
      o
    );
  }
  function g(e) {
    let a,
      s,
      c,
      d,
      p,
      f = (0, i.c)(21),
      { density: x } = e,
      { t: g } = (0, l.f)(),
      h = (0, u.L)(),
      b = (0, u.C)();
    f[0] !== h || f[1] !== g
      ? ((a = g(
          h ? "web.auth.show_personal_info" : "web.auth.hide_personal_info",
        )),
        (f[0] = h),
        (f[1] = g),
        (f[2] = a))
      : (a = f[2]);
    let y = a;
    f[3] !== h || f[4] !== b
      ? ((s = () => {
          let e = !h;
          b();
          try {
            (0, m.jC)({ nowHidden: e });
          } catch {}
        }),
        (f[3] = h),
        (f[4] = b),
        (f[5] = s))
      : (s = f[5]);
    let v = s;
    f[6] !== h
      ? ((c = h
          ? (0, t.jsx)(n.cT, { "aria-hidden": !0 })
          : (0, t.jsx)(n.a6, { "aria-hidden": !0 })),
        (f[6] = h),
        (f[7] = c))
      : (c = f[7]);
    let w = c;
    if ("comfortable" === (void 0 === x ? "compact" : x)) {
      let e;
      return (
        f[8] !== w || f[9] !== v || f[10] !== h || f[11] !== y
          ? ((e = (0, t.jsx)(o._, {
              density: "comfortable",
              size: 24,
              variant: "ghost",
              active: h,
              "aria-pressed": h,
              "aria-label": y,
              title: y,
              onClick: v,
              "data-testid": "profile-hide-personal-info",
              children: w,
            })),
            (f[8] = w),
            (f[9] = v),
            (f[10] = h),
            (f[11] = y),
            (f[12] = e))
          : (e = f[12]),
        e
      );
    }
    let _ = h && "bg-bg-secondary text-text-primary";
    return (
      f[13] !== _
        ? ((d = (0, r.c)(
            "flex size-6 shrink-0 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-secondary [&>svg]:size-3.5",
            _,
          )),
          (f[13] = _),
          (f[14] = d))
        : (d = f[14]),
      f[15] !== w || f[16] !== v || f[17] !== h || f[18] !== y || f[19] !== d
        ? ((p = (0, t.jsx)("button", {
            type: "button",
            onClick: v,
            "aria-pressed": h,
            "aria-label": y,
            title: y,
            "data-testid": "profile-hide-personal-info",
            className: d,
            children: w,
          })),
          (f[15] = w),
          (f[16] = v),
          (f[17] = h),
          (f[18] = y),
          (f[19] = d),
          (f[20] = p))
        : (p = f[20]),
      p
    );
  }
  e.s([
    "O",
    0,
    function () {
      let e,
        a,
        n,
        r,
        s = (0, i.c)(13),
        { t: o } = (0, l.f)(),
        { method: m, reader: u } = (0, c.f)();
      if ("none" === m.kind || "resolving" === m.kind) {
        let e;
        return (
          s[0] !== u
            ? ((e = (0, t.jsx)(t.Fragment, { children: u })),
              (s[0] = u),
              (s[1] = e))
            : (e = s[1]),
          e
        );
      }
      s[2] !== m || s[3] !== o
        ? ((e = o("web.auth.connected_with_method", { method: (0, d.B)(m) })),
          (s[2] = m),
          (s[3] = o),
          (s[4] = e))
        : (e = s[4]);
      let p = e;
      return (
        s[5] !== m
          ? ((a = (0, t.jsx)(f, { method: m, className: "size-3" })),
            (s[5] = m),
            (s[6] = a))
          : (a = s[6]),
        s[7] !== p || s[8] !== a
          ? ((n = (0, t.jsx)("span", {
              "data-testid": "connection-method-badge",
              "aria-label": p,
              title: p,
              className:
                "bg-bg-tertiary border-bg-secondary text-text-primary absolute -bottom-0.5 -right-0.5 flex size-[18px] items-center justify-center overflow-hidden rounded-full border-2",
              children: a,
            })),
            (s[7] = p),
            (s[8] = a),
            (s[9] = n))
          : (n = s[9]),
        s[10] !== u || s[11] !== n
          ? ((r = (0, t.jsxs)(t.Fragment, { children: [n, u] })),
            (s[10] = u),
            (s[11] = n),
            (s[12] = r))
          : (r = s[12]),
        r
      );
    },
    "a",
    0,
    function (e) {
      let a,
        n,
        o,
        m,
        p,
        h,
        b,
        y,
        v,
        w,
        _,
        k,
        j,
        C,
        N = (0, i.c)(60),
        { className: S, compact: P, showHideToggle: V, density: A } = e,
        T = void 0 !== P && P,
        L = void 0 !== V && V,
        $ = void 0 === A ? "compact" : A,
        { t: z } = (0, l.f)(),
        { method: O, reader: W } = (0, c.f)(),
        I = (0, u.L)(),
        F = "comfortable" === $,
        R = "resolving" === O.kind,
        [K, q] = (0, s.useState)(!1);
      if (
        (N[0] !== R
          ? ((a = () => {
              if (!R) return;
              let e = window.setTimeout(() => q(!0), 6e3);
              return () => window.clearTimeout(e);
            }),
            (n = [R]),
            (N[0] = R),
            (N[1] = a),
            (N[2] = n))
          : ((a = N[1]), (n = N[2])),
        (0, s.useEffect)(a, n),
        "none" === O.kind || (R && K))
      ) {
        let e, i, a;
        if (!L) {
          let e;
          return (
            N[3] !== W
              ? ((e = (0, t.jsx)(t.Fragment, { children: W })),
                (N[3] = W),
                (N[4] = e))
              : (e = N[4]),
            e
          );
        }
        return (
          N[5] !== S
            ? ((e = (0, r.c)("flex items-start justify-end", S)),
              (N[5] = S),
              (N[6] = e))
            : (e = N[6]),
          N[7] !== $
            ? ((i = (0, t.jsx)(g, { density: $ })), (N[7] = $), (N[8] = i))
            : (i = N[8]),
          N[9] !== W || N[10] !== e || N[11] !== i
            ? ((a = (0, t.jsxs)("div", { className: e, children: [i, W] })),
              (N[9] = W),
              (N[10] = e),
              (N[11] = i),
              (N[12] = a))
            : (a = N[12]),
          a
        );
      }
      let D = F ? "gap-3" : "gap-2.5";
      N[13] !== S || N[14] !== D
        ? ((o = (0, r.c)("flex items-start", D, S)),
          (N[13] = S),
          (N[14] = D),
          (N[15] = o))
        : (o = N[15]);
      let Q = F
          ? "mt-0.5 inline-grid size-7 shrink-0 place-items-center overflow-hidden rounded-md bg-bg-tertiary text-text-tertiary"
          : "bg-bg-secondary text-text-secondary mt-0.5 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full",
        U = F ? "size-4" : "size-3.5";
      (N[16] !== O || N[17] !== U
        ? ((m = (0, t.jsx)(f, { method: O, className: U })),
          (N[16] = O),
          (N[17] = U),
          (N[18] = m))
        : (m = N[18]),
        N[19] !== m || N[20] !== Q
          ? ((p = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className: Q,
              children: m,
            })),
            (N[19] = m),
            (N[20] = Q),
            (N[21] = p))
          : (p = N[21]),
        N[22] !== F || N[23] !== T || N[24] !== z
          ? ((h = T
              ? null
              : (0, t.jsx)("p", {
                  className: F
                    ? "text-xs leading-4 font-normal text-text-quaternary"
                    : "text-text-tertiary text-[11px] font-medium uppercase tracking-wide",
                  children: z("web.auth.connected_with"),
                })),
            (N[22] = F),
            (N[23] = T),
            (N[24] = z),
            (N[25] = h))
          : (h = N[25]));
      let E = F
        ? "text-text-primary truncate text-sm leading-5 font-medium"
        : "text-text-primary truncate text-xs font-semibold";
      return (
        N[26] !== O
          ? ((b = (0, d.B)(O)), (N[26] = O), (N[27] = b))
          : (b = N[27]),
        N[28] !== O.kind || N[29] !== O.walletName || N[30] !== z
          ? ((y =
              "external" === O.kind && O.walletName
                ? (0, t.jsxs)("span", {
                    className: "text-text-tertiary font-medium",
                    children: [" · ", z("web.auth.external_wallet_suffix")],
                  })
                : null),
            (N[28] = O.kind),
            (N[29] = O.walletName),
            (N[30] = z),
            (N[31] = y))
          : (y = N[31]),
        N[32] !== E || N[33] !== b || N[34] !== y
          ? ((v = (0, t.jsxs)("p", {
              className: E,
              "data-testid": "connection-method-label",
              children: [b, y],
            })),
            (N[32] = E),
            (N[33] = b),
            (N[34] = y),
            (N[35] = v))
          : (v = N[35]),
        N[36] !== $ || N[37] !== I || N[38] !== O
          ? ((w = (0, t.jsx)(x, { method: O, hidden: I, density: $ })),
            (N[36] = $),
            (N[37] = I),
            (N[38] = O),
            (N[39] = w))
          : (w = N[39]),
        N[40] !== F || N[41] !== O.connected || N[42] !== O.kind || N[43] !== z
          ? ((_ =
              "external" !== O.kind || O.connected
                ? null
                : (0, t.jsx)("p", {
                    className: (0, r.c)(
                      "text-text-tertiary",
                      F ? "text-[13px] leading-[18px]" : "text-xs",
                    ),
                    "data-testid": "connection-method-not-connected",
                    children: z("web.auth.not_connected_in_browser"),
                  })),
            (N[40] = F),
            (N[41] = O.connected),
            (N[42] = O.kind),
            (N[43] = z),
            (N[44] = _))
          : (_ = N[44]),
        N[45] !== h || N[46] !== v || N[47] !== w || N[48] !== _
          ? ((k = (0, t.jsxs)("div", {
              className: "min-w-0 flex-1",
              children: [h, v, w, _],
            })),
            (N[45] = h),
            (N[46] = v),
            (N[47] = w),
            (N[48] = _),
            (N[49] = k))
          : (k = N[49]),
        N[50] !== $ || N[51] !== L
          ? ((j = L ? (0, t.jsx)(g, { density: $ }) : null),
            (N[50] = $),
            (N[51] = L),
            (N[52] = j))
          : (j = N[52]),
        N[53] !== $ ||
        N[54] !== W ||
        N[55] !== p ||
        N[56] !== k ||
        N[57] !== j ||
        N[58] !== o
          ? ((C = (0, t.jsxs)("div", {
              "data-testid": "connection-method",
              "data-density": $,
              className: o,
              children: [p, k, j, W],
            })),
            (N[53] = $),
            (N[54] = W),
            (N[55] = p),
            (N[56] = k),
            (N[57] = j),
            (N[58] = o),
            (N[59] = C))
          : (C = N[59]),
        C
      );
    },
  ]);
};
