// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(445242),
    r = t.i(944410),
    a = t.i(132838),
    i = t.i(606933),
    n = t.i(38279),
    o = t.i(689943),
    s = t.i(639374);
  function u(t, e) {
    (t.invalidateQueries({ queryKey: n.Q.COIN({ coinAddress: e }) }),
      t.invalidateQueries({ queryKey: n.Q.MAYHEM_STATS(e) }),
      t.invalidateQueries({ queryKey: n.Q.MAYHEM_STATE(e) }),
      t.invalidateQueries({ queryKey: o.o.mayhemAgentState(e) }));
  }
  t.s([
    "e",
    0,
    function () {
      let t,
        o,
        c,
        l = (0, e.c)(7),
        d = (0, r.useClientServerContract)(),
        h = (0, i.useQueryClient)();
      return (
        l[0] !== d
          ? ((t = async (t) => {
              let { mint: e, mode: r, multiplayer: a } = t;
              if (!(0, s.f)(e)) throw Error("Invalid mint");
              return d("POST /mayhem/{mint}/mode", {
                params: { mint: e },
                body: !0 === a ? { mode: r, multiplayer: !0 } : { mode: r },
              });
            }),
            (l[0] = d),
            (l[1] = t))
          : (t = l[1]),
        l[2] !== h
          ? ((o = (t, e) => {
              let { mint: r } = e;
              u(h, r);
            }),
            (l[2] = h),
            (l[3] = o))
          : (o = l[3]),
        l[4] !== t || l[5] !== o
          ? ((c = {
              mutationKey: n.Q.MAYHEM_SET_AGENT_MODE_MUTATION,
              mutationFn: t,
              onSuccess: o,
            }),
            (l[4] = t),
            (l[5] = o),
            (l[6] = c))
          : (c = l[6]),
        (0, a.f)(c)
      );
    },
    "q",
    0,
    function () {
      let t,
        o,
        c,
        l = (0, e.c)(7),
        d = (0, r.useClientServerContract)(),
        h = (0, i.useQueryClient)();
      return (
        l[0] !== d
          ? ((t = async (t) => {
              let { mint: e } = t;
              if (!(0, s.f)(e)) throw Error("Invalid mint");
              return d("POST /mayhem/{mint}/trigger-trade", {
                params: { mint: e },
              });
            }),
            (l[0] = d),
            (l[1] = t))
          : (t = l[1]),
        l[2] !== h
          ? ((o = (t, e) => {
              let { mint: r } = e;
              u(h, r);
            }),
            (l[2] = h),
            (l[3] = o))
          : (o = l[3]),
        l[4] !== t || l[5] !== o
          ? ((c = {
              mutationKey: n.Q.MAYHEM_TRIGGER_TRADE_AGENT_MUTATION,
              mutationFn: t,
              onSuccess: o,
            }),
            (l[4] = t),
            (l[5] = o),
            (l[6] = c))
          : (c = l[6]),
        (0, a.f)(c)
      );
    },
  ]);
};
