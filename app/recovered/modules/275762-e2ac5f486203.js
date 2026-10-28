// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(445242),
    t = e.i(352386),
    s = e.i(732486),
    n = e.i(182251);
  let o = (0, t.createContext)(null),
    a = () => (0, t.useContext)(o);
  e.s(
    [
      "h",
      0,
      (e) => {
        let a,
          i,
          d,
          l,
          u = (0, r.c)(11),
          { mintId: c, livestream: m, children: g } = e,
          f = (0, n.U)(c),
          v = (0, t.useRef)(null);
        (u[0] !== m || u[1] !== c
          ? ((a = () => {
              if (void 0 === m) return;
              let e = v.current;
              (e?.mintId !== c || e.livestream !== m) &&
                ((v.current = { mintId: c, livestream: m }),
                queueMicrotask(() => {
                  n.F.getState().setLivestream(c, m);
                }));
            }),
            (i = [c, m]),
            (u[0] = m),
            (u[1] = c),
            (u[2] = a),
            (u[3] = i))
          : ((a = u[2]), (i = u[3])),
          (0, t.useEffect)(a, i),
          u[4] !== m || u[5] !== c || u[6] !== f
            ? ((d = { mintId: c, livestream: m, startRevision: f }),
              (u[4] = m),
              (u[5] = c),
              (u[6] = f),
              (u[7] = d))
            : (d = u[7]));
        let y = d;
        return (
          u[8] !== g || u[9] !== y
            ? ((l = (0, s.jsx)(o.Provider, { value: y, children: g })),
              (u[8] = g),
              (u[9] = y),
              (u[10] = l))
            : (l = u[10]),
          l
        );
      },
      "C",
      0,
      a,
    ],
    726266,
  );
  var i = e.i(202565);
  let d = ({ stored: e, revision: r, initial: t, startRevision: s }) =>
      void 0 !== t && null !== s && r <= s ? t : void 0 !== e ? e : (t ?? null),
    l = (e) => {
      let r = (0, t.useRef)(e);
      return ((0, i.f)(r.current, e) || (r.current = e), r.current);
    };
  e.s(
    [
      "X",
      0,
      (e) => {
        let t,
          s,
          o = (0, r.c)(7);
        o[0] !== e
          ? ((t = (r) => r.livestreamsByMintId[e]), (o[0] = e), (o[1] = t))
          : (t = o[1]);
        let i = (0, n.F)(t),
          u = (0, n.E)(e),
          c = a(),
          m = c?.mintId === e ? c : null,
          g = m?.livestream,
          f = m?.startRevision ?? null;
        return (
          o[2] !== u || o[3] !== i || o[4] !== g || o[5] !== f
            ? ((s = d({
                stored: i,
                revision: u,
                initial: g,
                startRevision: f,
              })),
              (o[2] = u),
              (o[3] = i),
              (o[4] = g),
              (o[5] = f),
              (o[6] = s))
            : (s = o[6]),
          l(s)
        );
      },
      "D",
      0,
      (e) => {
        let t,
          s,
          o = (0, r.c)(7),
          { mintId: a, initial: i } = e;
        o[0] !== a
          ? ((t = (e) => e.livestreamsByMintId[a]), (o[0] = a), (o[1] = t))
          : (t = o[1]);
        let u = (0, n.F)(t),
          c = (0, n.E)(a),
          m = (0, n.U)(a);
        return (
          o[2] !== i || o[3] !== c || o[4] !== m || o[5] !== u
            ? ((s = d({
                stored: u,
                revision: c,
                initial: i,
                startRevision: m,
              })),
              (o[2] = i),
              (o[3] = c),
              (o[4] = m),
              (o[5] = u),
              (o[6] = s))
            : (s = o[6]),
          l(s)
        );
      },
    ],
    275762,
  );
};
