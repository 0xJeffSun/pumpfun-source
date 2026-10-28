// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(672082),
    i = r.i(520818),
    a = r.i(727472),
    l = r.i(933185),
    t = r.i(335341);
  (r.i(352386), r.i(785373), r.i(768820), r.i(535391), r.i(252494));
  let n = ({
      title: r = "Connect your email",
      subtitle: l = "Add your email to your account",
    }) =>
      (0, e.jsx)(t.S, {
        title: r,
        subtitle: l,
        icon: o.f,
        watermark: !0,
        children: (0, e.jsx)(a.B, {
          children: (0, e.jsx)(i.C, { stacked: !0 }),
        }),
      }),
    c = {
      component: () => {
        let r = (0, l.a)();
        return (0, e.jsx)(n, {
          subtitle: `Add your email to your ${r?.name} account`,
        });
      },
    };
  r.s(["LinkEmailScreen", 0, c, "LinkEmailScreenView", 0, n, "default", 0, c]);
};
