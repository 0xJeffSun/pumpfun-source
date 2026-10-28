// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(254667),
    n = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    l = e.i(670550);
  let a = null,
    o = (e) => (
      (a = e),
      () => {
        a === e && (a = null);
      }
    );
  e.s(
    [
      "b",
      0,
      (e) => {
        (0, l.d)(e.chainId)
          ? a
            ? a(e)
            : i.y.warn("[nativeConvert] open_without_host", {
                chainId: e.chainId,
              })
          : i.y.warn("[nativeConvert] open_unconvertible_chain", {
              chainId: e.chainId,
            });
      },
      "w",
      0,
      o,
    ],
    77048,
  );
  var u = e.i(167958),
    c = e.i(248496),
    d = e.i(266300),
    f = e.i(248208);
  let h = (0, n.lazy)(() =>
    e.A(18541).then((e) => ({ default: e.NativeConvertDialogBody })),
  );
  function m() {
    let e,
      i,
      n = (0, r.c)(2);
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsxs)(u.K, {
            className: "flex flex-col gap-3",
            "aria-busy": "true",
            "data-testid": "native-convert-loading",
            children: [
              (0, t.jsx)(c.l, { height: 24, width: "60%" }),
              (0, t.jsx)(c.l, { height: 44, width: "100%" }),
              (0, t.jsx)(u.a, { className: "my-1" }),
              (0, t.jsx)(c.l, { height: 24, width: "40%" }),
              (0, t.jsx)(c.l, { height: 44, width: "100%" }),
            ],
          })),
          (n[0] = e))
        : (e = n[0]),
      n[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsxs)(t.Fragment, {
            children: [
              e,
              (0, t.jsxs)(u.c, {
                children: [
                  (0, t.jsx)(c.l, { height: u.Z, width: 80 }),
                  (0, t.jsx)(c.l, { height: u.$, width: 136 }),
                ],
              }),
            ],
          })),
          (n[1] = i))
        : (i = n[1]),
      i
    );
  }
  function p() {
    return !1;
  }
  e.s(
    [
      "NativeConvertDialogHost",
      0,
      function () {
        let e,
          a,
          c,
          b,
          g,
          y,
          v,
          w,
          _ = (0, r.c)(20),
          { t: x } = (0, s.f)(),
          [E, N] = (0, n.useState)(null),
          [S, R] = (0, n.useState)(!1),
          [T, C] = (0, n.useState)(!1);
        (_[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = () =>
              o((e) => {
                (0, d.c)()
                  ? (N(e), R(!0))
                  : i.y.warn("[nativeConvert] open_without_privy_tree", {
                      chainId: e.chainId,
                    });
              })),
            (a = []),
            (_[0] = e),
            (_[1] = a))
          : ((e = _[0]), (a = _[1])),
          (0, n.useEffect)(e, a));
        let P = (0, n.useSyncExternalStore)(d.$, d.c, p);
        if ((!S && T && C(!1), null === E || !P)) return null;
        _[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = () => R(!1)), (_[2] = c))
          : (c = _[2]);
        let k = c;
        return (
          _[3] !== T
            ? ((b = (e) => {
                (e || !T) && R(e);
              }),
              (_[3] = T),
              (_[4] = b))
            : (b = _[4]),
          _[5] !== x
            ? ((g = x("common.convert")), (_[5] = x), (_[6] = g))
            : (g = _[6]),
          _[7] !== E.chainId
            ? ((y = (0, l.A)(E.chainId)?.chainName),
              (_[7] = E.chainId),
              (_[8] = y))
            : (y = _[8]),
          _[9] !== S || _[10] !== E.chainId || _[11] !== E.usdPrice
            ? ((v = S
                ? (0, t.jsx)(f.R, {
                    children: (0, t.jsx)(n.Suspense, {
                      fallback: (0, t.jsx)(m, {}),
                      children: (0, t.jsx)(
                        h,
                        {
                          chainId: E.chainId,
                          usdPrice: E.usdPrice,
                          onClose: k,
                          onSubmittingChange: C,
                        },
                        E.chainId,
                      ),
                    }),
                  })
                : null),
              (_[9] = S),
              (_[10] = E.chainId),
              (_[11] = E.usdPrice),
              (_[12] = v))
            : (v = _[12]),
          _[13] !== S ||
          _[14] !== T ||
          _[15] !== b ||
          _[16] !== g ||
          _[17] !== y ||
          _[18] !== v
            ? ((w = (0, t.jsx)(u.N, {
                open: S,
                onOpenChange: b,
                density: "comfortable",
                size: "sm",
                title: g,
                aside: y,
                hideClose: T,
                "data-testid": "native-convert-dialog",
                children: v,
              })),
              (_[13] = S),
              (_[14] = T),
              (_[15] = b),
              (_[16] = g),
              (_[17] = y),
              (_[18] = v),
              (_[19] = w))
            : (w = _[19]),
          w
        );
      },
      "preloadNativeConvertDialog",
      0,
      () => {
        e.A(18541).catch((e) => {
          i.y.warn("[nativeConvert] preload_failed", {
            error: e instanceof Error ? e.message : String(e),
          });
        });
      },
    ],
    634741,
  );
};
