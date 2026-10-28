// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(352386),
    i = e.i(789214);
  let l = new Map();
  function a() {}
  e.s([
    "f",
    0,
    (e) => {
      let o,
        s,
        u,
        d,
        c = (0, t.c)(9),
        { address: p, enabled: f } = e,
        m = (0, r.useClientServerApiClient)();
      c[0] !== p
        ? ((o = () => {
            let e = p ? l.get(p) : void 0;
            return e && p ? { address: p, status: e.status } : null;
          }),
          (c[0] = p),
          (c[1] = o))
        : (o = c[1]);
      let [g, h] = (0, n.useState)(o);
      (c[2] !== p || c[3] !== m || c[4] !== f
        ? ((s = () => {
            if (!f || !p) return;
            let e = (e) =>
                h((t) =>
                  t && t.address === p && t.status === e
                    ? t
                    : { address: p, status: e },
                ),
              t = l.get(p);
            if (t && Date.now() - t.at < 6e4) return void e(t.status);
            let r = !1;
            return (
              Promise.resolve()
                .then(() => (0, i.i)({ client: m }))
                .then((t) => {
                  (l.set(p, { at: Date.now(), status: t }), r || e(t));
                })
                .catch(a),
              () => {
                r = !0;
              }
            );
          }),
          (u = [f, p, m]),
          (c[2] = p),
          (c[3] = m),
          (c[4] = f),
          (c[5] = s),
          (c[6] = u))
        : ((s = c[5]), (u = c[6])),
        (0, n.useEffect)(s, u));
      let y = g && p && g.address === p ? g.status : void 0;
      return (
        c[7] !== y ? ((d = { data: y }), (c[7] = y), (c[8] = d)) : (d = c[8]),
        d
      );
    },
  ]);
};
