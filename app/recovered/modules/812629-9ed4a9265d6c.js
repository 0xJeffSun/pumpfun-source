// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(439587),
    i = e.i(574472),
    n = e.i(453706),
    l = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(15359),
    c = e.i(121910),
    d = e.i(793371);
  let u = (0, n.default)(() => e.A(489652).then((e) => e.DmSharePicker), {
    loadableGenerated: { modules: [354112] },
    ssr: !1,
    loading: function () {
      let e,
        a,
        i = (0, r.c)(4),
        { t: n } = (0, s.f)();
      return (
        i[0] !== n
          ? ((e = n("chat.dms.share.send_to")), (i[0] = n), (i[1] = e))
          : (e = i[1]),
        i[2] !== e
          ? ((a = (0, t.jsx)(o.f, { label: e, variant: "picker" })),
            (i[2] = e),
            (i[3] = a))
          : (a = i[3]),
        a
      );
    },
  });
  e.s([
    "DmSharePickerHost",
    0,
    function () {
      let e,
        n,
        o,
        m,
        f,
        p,
        h,
        b = (0, r.c)(12),
        { t: x } = (0, s.f)(),
        g = (0, c.f)(),
        { address: y } = (0, i.F)(),
        v = g ? y : void 0,
        [w, _] = (0, l.useState)(null),
        j = (0, l.useRef)(0);
      (b[0] !== v
        ? ((e = () => {
            if (void 0 === v) return;
            let e = (0, d.r)((e) => {
              ((j.current = j.current + 1), _({ ...e, id: j.current }));
            });
            return () => {
              (e(), _(null));
            };
          }),
          (n = [v]),
          (b[0] = v),
          (b[1] = e),
          (b[2] = n))
        : ((e = b[1]), (n = b[2])),
        (0, l.useEffect)(e, n),
        b[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = () => _(null)), (b[3] = o))
          : (o = b[3]));
      let C = o;
      b[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = (e) => _((t) => (t?.id === e ? null : t))), (b[4] = m))
        : (m = b[4]);
      let N = m,
        S = null !== w;
      return (
        b[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (e) => {
              e || C();
            }),
            (b[5] = f))
          : (f = b[5]),
        b[6] !== w || b[7] !== x
          ? ((p = w
              ? (0, t.jsx)(a.s, {
                  "aria-label": x("chat.dms.share.send_to"),
                  className: "max-w-[420px]",
                  "data-testid": "dm-share-picker",
                  children: (0, t.jsxs)("div", {
                    className: "flex flex-col gap-3 p-1",
                    children: [
                      (0, t.jsx)("p", {
                        className: "text-lg font-semibold text-text-primary",
                        children: x("chat.dms.share.send_to"),
                      }),
                      (0, t.jsx)(
                        u,
                        {
                          onSent: () => {
                            (N(w.id), w.onSent?.());
                          },
                          url: w.url,
                        },
                        w.id,
                      ),
                    ],
                  }),
                })
              : null),
            (b[6] = w),
            (b[7] = x),
            (b[8] = p))
          : (p = b[8]),
        b[9] !== S || b[10] !== p
          ? ((h = (0, t.jsx)(a.v, {
              isOpen: S,
              onIsOpenChange: f,
              children: p,
            })),
            (b[9] = S),
            (b[10] = p),
            (b[11] = h))
          : (h = b[11]),
        h
      );
    },
  ]);
};
