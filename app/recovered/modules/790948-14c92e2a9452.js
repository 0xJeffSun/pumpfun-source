// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    l = e.i(764844),
    a = e.i(786740);
  let s = new Set(["INPUT", "SELECT", "TEXTAREA"]),
    o = {
      address: "web.coin.copy_menu_address",
      name: "web.coin.copy_menu_name",
      ticker: "web.coin.copy_menu_ticker",
    },
    c = {
      name: "web.coin.copy_menu_name_copied",
      ticker: "web.coin.copy_menu_ticker_copied",
    };
  function d(e) {
    return (
      e instanceof HTMLElement && (e.isContentEditable || s.has(e.tagName))
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let s,
        m,
        h,
        u,
        f,
        x,
        p,
        g,
        b,
        v,
        w,
        y,
        j,
        _,
        C = (0, n.c)(25),
        { entries: N, onCopyAddress: k, trigger: L } = e,
        { t: S } = (0, i.f)(),
        P = (0, r.useRef)(null),
        $ = (0, r.useRef)(!0),
        T =
          ((j = (0, n.c)(3)),
          (_ = (0, r.useRef)(0)),
          j[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((v = () => {
                let e = (e) => {
                  d(e.target) && (_.current = Date.now());
                };
                return (
                  document.addEventListener("keydown", e, !0),
                  () => document.removeEventListener("keydown", e, !0)
                );
              }),
              (w = []),
              (j[0] = v),
              (j[1] = w))
            : ((v = j[0]), (w = j[1])),
          (0, r.useEffect)(v, w),
          j[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((y = () =>
                d(document.activeElement) && Date.now() - _.current < 1500),
              (j[2] = y))
            : (y = j[2]),
          y);
      C[0] !== T
        ? ((s = (e, t) => {
            e &&
              "trigger-hover" === t.reason &&
              (!$.current || T()) &&
              t.cancel();
          }),
          (C[0] = T),
          (C[1] = s))
        : (s = C[1]);
      let z = s;
      C[2] !== k || C[3] !== S
        ? ((m = (e) => {
            "address" === e.kind ? k() : (0, a.W)(e.value, S(c[e.kind]));
          }),
          (C[2] = k),
          (C[3] = S),
          (C[4] = m))
        : (m = C[4]);
      let A = m;
      C[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (e) => {
            (e.preventBaseUIHandler(), ($.current = !1));
          }),
          (C[5] = h))
        : (h = C[5]);
      let D = h;
      C[6] !== k
        ? ((u = (e) => {
            0 !== e.detail &&
              (e.preventBaseUIHandler(), P.current?.close(), k());
          }),
          (C[6] = k),
          (C[7] = u))
        : (u = C[7]);
      let R = u;
      C[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = () => {
            $.current = !0;
          }),
          (C[8] = f))
        : (f = C[8]);
      let E = f;
      if (
        (C[9] !== R || C[10] !== L
          ? ((x = (0, t.jsx)(l.g, {
              closeDelay: 120,
              delay: 150,
              onClick: R,
              onMouseDown: D,
              onMouseEnter: E,
              openOnHover: !0,
              render: L,
            })),
            (C[9] = R),
            (C[10] = L),
            (C[11] = x))
          : (x = C[11]),
        C[12] !== A || C[13] !== N || C[14] !== S)
      ) {
        let e;
        (C[16] !== A || C[17] !== S
          ? ((e = (e) =>
              (0, t.jsx)(
                l.d,
                {
                  "data-testid": `copy-ca-menu-${e.kind}`,
                  onClick: () => A(e),
                  children: S(o[e.kind]),
                },
                e.kind,
              )),
            (C[16] = A),
            (C[17] = S),
            (C[18] = e))
          : (e = C[18]),
          (p = N.map(e)),
          (C[12] = A),
          (C[13] = N),
          (C[14] = S),
          (C[15] = p));
      } else p = C[15];
      return (
        C[19] !== p
          ? ((g = (0, t.jsx)(l.A, {
              align: "start",
              "data-testid": "copy-ca-menu",
              dense: !0,
              sideOffset: 6,
              children: p,
            })),
            (C[19] = p),
            (C[20] = g))
          : (g = C[20]),
        C[21] !== z || C[22] !== x || C[23] !== g
          ? ((b = (0, t.jsxs)(l.k, {
              actionsRef: P,
              modal: !1,
              onOpenChange: z,
              children: [x, g],
            })),
            (C[21] = z),
            (C[22] = x),
            (C[23] = g),
            (C[24] = b))
          : (b = C[24]),
        b
      );
    },
  ]);
};
