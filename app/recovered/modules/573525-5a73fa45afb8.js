// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    i = e.i(390065);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        s,
        l,
        a,
        o,
        u,
        c,
        d,
        f = (0, t.c)(19),
        {
          type: h,
          subject: m,
          enabled: p,
          onEvent: b,
          throttleMs: g,
          coalesce: y,
        } = e,
        v = void 0 === p || p,
        w = void 0 === g ? 0 : g,
        _ = void 0 !== y && y,
        { subscribe: x, unsubscribe: E } = (0, i.N)(),
        N = (0, r.useRef)(null),
        S = (0, r.useRef)(null),
        R = (0, r.useRef)(0),
        T = (0, r.useRef)(b);
      (f[0] !== b
        ? ((n = () => {
            T.current = b;
          }),
          (s = [b]),
          (f[0] = b),
          (f[1] = n),
          (f[2] = s))
        : ((n = f[1]), (s = f[2])),
        (0, r.useEffect)(n, s),
        f[3] !== w
          ? ((l = (e) => {
              if (w > 0) {
                let e = Date.now();
                if (e - R.current < w) return;
                R.current = e;
              }
              T.current?.(e);
            }),
            (f[3] = w),
            (f[4] = l))
          : (l = f[4]));
      let C = l;
      f[5] !== E
        ? ((a = () => {
            N.current &&
              S.current &&
              (E(S.current, N.current), (N.current = null), (S.current = null));
          }),
          (f[5] = E),
          (f[6] = a))
        : (a = f[6]);
      let P = a;
      (f[7] !== P ||
      f[8] !== _ ||
      f[9] !== v ||
      f[10] !== m ||
      f[11] !== x ||
      f[12] !== C ||
      f[13] !== h
        ? ((o = () => {
            if (!v || !m) return void P();
            try {
              ((N.current = x(h, m, C, void 0, { coalesce: _ })),
                (S.current = h));
            } catch (e) {
              console.error(`Failed to subscribe to NATS subject: ${m}`, e);
            }
            return P;
          }),
          (u = [v, h, m, C, x, P, _]),
          (f[7] = P),
          (f[8] = _),
          (f[9] = v),
          (f[10] = m),
          (f[11] = x),
          (f[12] = C),
          (f[13] = h),
          (f[14] = o),
          (f[15] = u))
        : ((o = f[14]), (u = f[15])),
        (0, r.useEffect)(o, u),
        f[16] !== P
          ? ((c = () => P), (d = [P]), (f[16] = P), (f[17] = c), (f[18] = d))
          : ((c = f[17]), (d = f[18])),
        (0, r.useEffect)(c, d));
    },
  ]);
};
