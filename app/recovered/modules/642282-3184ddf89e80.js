// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(705313),
    a = e.i(388528),
    n = e.i(360827),
    i = e.i(338319),
    s = e.i(369091);
  function o(e) {
    return e.preventDefault();
  }
  e.s([
    "f",
    0,
    function (e) {
      let u,
        d,
        c,
        m = (0, r.c)(13),
        { suggestions: f, onSelect: p, testId: h } = e,
        { ipfsPrefix: y } = (0, s.useIpfsPrefix)();
      if (0 === f.length) return null;
      if (
        (m[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, i.c)(
              n.V,
              a.t,
              "flex max-h-[168px] flex-col overflow-y-auto",
            )),
            (m[0] = u))
          : (u = m[0]),
        m[1] !== y || m[2] !== p || m[3] !== f || m[4] !== h)
      ) {
        let e;
        (m[6] !== y || m[7] !== p || m[8] !== h
          ? ((e = (e) =>
              (0, t.jsxs)(
                "button",
                {
                  type: "button",
                  "data-testid": `${h}-candidate`,
                  onMouseDown: o,
                  onClick: () => p(e),
                  className: (0, i.c)((0, a.q)("comfortable"), "shrink-0"),
                  children: [
                    (0, t.jsx)(l.f, {
                      address: e.walletAddress ?? void 0,
                      alt: "",
                      className: "size-5 shrink-0 rounded-full object-cover",
                      height: 20,
                      ipfsPrefix: y,
                      isAnonymous: !1,
                      src: e.profileImageUrl || void 0,
                      width: 20,
                    }),
                    (0, t.jsxs)("span", {
                      className: "truncate",
                      children: ["@", e.username],
                    }),
                  ],
                },
                e.userId,
              )),
            (m[6] = y),
            (m[7] = p),
            (m[8] = h),
            (m[9] = e))
          : (e = m[9]),
          (d = f.map(e)),
          (m[1] = y),
          (m[2] = p),
          (m[3] = f),
          (m[4] = h),
          (m[5] = d));
      } else d = m[5];
      return (
        m[10] !== d || m[11] !== h
          ? ((c = (0, t.jsx)("div", {
              "data-testid": h,
              className: u,
              children: d,
            })),
            (m[10] = d),
            (m[11] = h),
            (m[12] = c))
          : (c = m[12]),
        c
      );
    },
  ]);
};
