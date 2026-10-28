// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(231332);
  e.i(12692);
  var l = e.i(398902),
    o = e.i(536925),
    n = e.i(352386);
  let s = (e) => {
    let i,
      l,
      o,
      s,
      a,
      c = (0, r.c)(8),
      { onSuccess: d, onError: u } = e,
      f = (0, n.useRef)(null),
      [p, m] = (0, n.useState)(!1),
      h = (0, n.useRef)(!1);
    return (
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = () => {
            new Promise((e, t) => {
              if (
                void 0 !== window.AwsWafCaptcha ||
                document.querySelector(
                  'script[src="https://c41f1c23b6a1.edge.captcha-sdk.awswaf.com/c41f1c23b6a1/jsapi.js"]',
                )
              )
                return void e(!0);
              let r = document.createElement("script");
              ((r.src =
                "https://c41f1c23b6a1.edge.captcha-sdk.awswaf.com/c41f1c23b6a1/jsapi.js"),
                (r.defer = !0),
                (r.onload = () => e(!0)),
                (r.onerror = () => t(!1)),
                document.head.appendChild(r));
            })
              .then(() => m(!0))
              .catch(console.error);
          }),
          (l = []),
          (c[0] = i),
          (c[1] = l))
        : ((i = c[0]), (l = c[1])),
      (0, n.useEffect)(i, l),
      c[2] !== p || c[3] !== u || c[4] !== d
        ? ((o = () => {
            p &&
              f.current &&
              !h.current &&
              void 0 !== window.AwsWafCaptcha &&
              ((h.current = !0),
              window.AwsWafCaptcha.renderCaptcha(f.current, {
                apiKey:
                  "DHALRu6yRSoqO7d+uVcmX2fp1O6/PyKjgXfbKIoPNTZiQgRQmO2GBzfaZOCqO988PiicrPv/WJMX0O23Szck0fy2VTcAQz45tEYieIrPeAEIgv6BDHRIVSRbhoJnW5m7Vd8z1vEd3+D2Il28D2r8G9/q/W2ei8P2fVCq6+9Fwaw9yLUYGKz3hKQPfodzOmiJ9qTlGbkgp+jc6+moFAZY47iZIvaEq+lRxo8RtNSsEZFdFXpMU4CSPYIsEzeC+nzZIOcn3KNsmo7EL/wfWPH4RPSiJF5o3hqWDUhWDt0uX5BtljDPDkJC6hr+cPLKIJ8a7mzn6lrFx7+sNjgz3QH71wj/YXpvs6DtS5iqX+pxPdIyPVcZZ+fAOZ6Ohh7SsCIuqELymuoaKugZz3+FqqC//aTYR8jFzAZJhMNgHZyx3mIjG9uRu1Jxt2Qy+GRlEVb8IKSxIYVhA/bvZl6/5vdONLHKCheKMZNLU7MugpiGoXHTilsYW9VOveamSjvRXz424CnuelnKaWTvsP9jFBrA8GtXxoevYqTDKblfS44jPMM/1RF0uYeErcMoA+gIgnuFXU4RUFxPkdF0Mr8YI/vjebLbGmeltDbzAtX0Q1UwQJaQxw8lhhPPbhTHHhDNX8mMPjdVkt7MqDmpMKCX70EJQFUwcyJolaVV4Hxy2/w0peY=_1_1",
                onSuccess: (e) => {
                  ((h.current = !1), d(e));
                },
                onError: (e) => {
                  ((h.current = !1), u(e));
                },
              }));
          }),
          (s = [p, d, u]),
          (c[2] = p),
          (c[3] = u),
          (c[4] = d),
          (c[5] = o),
          (c[6] = s))
        : ((o = c[5]), (s = c[6])),
      (0, n.useEffect)(o, s),
      c[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("div", { ref: f })), (c[7] = a))
        : (a = c[7]),
      a
    );
  };
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          a,
          c,
          d,
          u,
          f,
          p = (0, r.c)(16),
          { onClose: m, onSuccess: h, onError: x } = e,
          { t: g } = (0, l.f)();
        return (0, o.m)()
          ? (p[0] !== g
              ? ((n = g("web.captcha.verification_title")),
                (p[0] = g),
                (p[1] = n))
              : (n = p[1]),
            p[2] !== n
              ? ((a = (0, t.jsx)("h2", {
                  className: "mb-4 text-lg font-bold text-text-inverse",
                  children: n,
                })),
                (p[2] = n),
                (p[3] = a))
              : (a = p[3]),
            p[4] !== x || p[5] !== h
              ? ((c = (0, t.jsx)(s, { onSuccess: h, onError: x })),
                (p[4] = x),
                (p[5] = h),
                (p[6] = c))
              : (c = p[6]),
            p[7] !== g
              ? ((d = g("common.close")), (p[7] = g), (p[8] = d))
              : (d = p[8]),
            p[9] !== m || p[10] !== d
              ? ((u = (0, t.jsx)("button", {
                  onClick: m,
                  className: "mt-4 rounded-md bg-red-500 px-4 py-2 text-white",
                  children: d,
                })),
                (p[9] = m),
                (p[10] = d),
                (p[11] = u))
              : (u = p[11]),
            p[12] !== a || p[13] !== c || p[14] !== u
              ? ((f = (0, i.createPortal)(
                  (0, t.jsx)("div", {
                    className:
                      "fixed inset-0 z-[60] flex items-center justify-center bg-bg-secondary bg-opacity-75",
                    children: (0, t.jsxs)("div", {
                      className:
                        "w-full max-w-md rounded-lg bg-white p-8 shadow-lg",
                      children: [a, c, u],
                    }),
                  }),
                  document.body,
                )),
                (p[12] = a),
                (p[13] = c),
                (p[14] = u),
                (p[15] = f))
              : (f = p[15]),
            f)
          : null;
      },
    ],
    974246,
  );
  var a = e.i(745018),
    c = e.i(29542),
    d = e.i(338319);
  let { FOLLOW: u, FOLLOWING: f, UNFOLLOW: p } = c.f.PROFILE_PAGE.FOLLOW_BUTTON,
    m = "col-start-1 row-start-1 transition-opacity duration-100",
    h = `${m} group-hover/follow:opacity-0 group-focus-visible/follow:opacity-0`,
    x = `${m} opacity-0 group-hover/follow:opacity-100 group-focus-visible/follow:opacity-100`,
    g = "grid grid-cols-1 grid-rows-1 place-items-center";
  function y(e) {
    return e ? f : u;
  }
  e.s(
    [
      "a",
      0,
      function (e) {
        let i,
          l,
          o,
          n,
          s,
          c,
          u = (0, r.c)(14),
          { isFollowing: f, className: p } = e;
        if (!f) {
          let e;
          return (
            u[0] !== p
              ? ((e = (0, t.jsx)(a.i8, { "aria-hidden": !0, className: p })),
                (u[0] = p),
                (u[1] = e))
              : (e = u[1]),
            e
          );
        }
        return (
          u[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((i = (0, d.c)(g, "shrink-0")), (u[2] = i))
            : (i = u[2]),
          u[3] !== p
            ? ((l = (0, d.c)(p, h)), (u[3] = p), (u[4] = l))
            : (l = u[4]),
          u[5] !== l
            ? ((o = (0, t.jsx)(a.so, { "aria-hidden": !0, className: l })),
              (u[5] = l),
              (u[6] = o))
            : (o = u[6]),
          u[7] !== p
            ? ((n = (0, d.c)(p, x)), (u[7] = p), (u[8] = n))
            : (n = u[8]),
          u[9] !== n
            ? ((s = (0, t.jsx)(a.gL, { "aria-hidden": !0, className: n })),
              (u[9] = n),
              (u[10] = s))
            : (s = u[10]),
          u[11] !== o || u[12] !== s
            ? ((c = (0, t.jsxs)("span", { className: i, children: [o, s] })),
              (u[11] = o),
              (u[12] = s),
              (u[13] = c))
            : (c = u[13]),
          c
        );
      },
      "H",
      0,
      function (e) {
        let i,
          l = (0, r.c)(2),
          { isFollowing: o } = e;
        if (!o) {
          let e;
          return (
            l[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsx)(t.Fragment, { children: u })), (l[0] = e))
              : (e = l[0]),
            e
          );
        }
        return (
          l[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((i = (0, t.jsxs)("span", {
                className: g,
                children: [
                  (0, t.jsx)("span", { className: h, children: f }),
                  (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className: x,
                    children: p,
                  }),
                ],
              })),
              (l[1] = i))
            : (i = l[1]),
          i
        );
      },
      "V",
      0,
      function (e) {
        return e ? p : u;
      },
      "I",
      0,
      y,
      "i",
      0,
      function (e) {
        let { isFollowing: t, isIntent: r } = e;
        return t && r ? p : y(t);
      },
      "G",
      0,
      function () {
        let e,
          t,
          i = (0, r.c)(3),
          [l, o] = (0, n.useState)(!1);
        return (
          i[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = {
                onMouseEnter: () => o(!0),
                onMouseLeave: () => o(!1),
                onFocus: () => o(!0),
                onBlur: () => o(!1),
              }),
              (i[0] = e))
            : (e = i[0]),
          i[1] !== l
            ? ((t = { isIntent: l, intentProps: e }), (i[1] = l), (i[2] = t))
            : (t = i[2]),
          t
        );
      },
    ],
    925331,
  );
};
