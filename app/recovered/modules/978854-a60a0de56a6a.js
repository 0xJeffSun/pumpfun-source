// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    a = e.i(78436),
    r = e.i(634103),
    n = e.i(811005),
    l = e.i(803797),
    s = e.i(956113);
  let o = new Map(),
    d = new Map(),
    c = new Map(),
    u = (e) => {
      let t = c.get(e);
      if (
        !t ||
        (t.timer && (clearTimeout(t.timer), (t.timer = null)), !t.events.length)
      )
        return;
      let i = t.events;
      for (let e of ((t.events = []),
      (t.dropped = 0),
      (t.lastFlushAt = Date.now()),
      t.listeners))
        e(i);
    },
    m = ({ mint: e, onFlush: t }) => {
      let i = ((e) => {
        let t = c.get(e);
        if (t) return t;
        let i = {
          events: [],
          dropped: 0,
          listeners: new Set(),
          lastFlushAt: 0,
          timer: null,
        };
        return (c.set(e, i), i);
      })(e);
      return (
        i.listeners.add(t),
        () => {
          (i.listeners.delete(t),
            0 === i.listeners.size &&
              (i.timer && clearTimeout(i.timer), c.delete(e)));
        }
      );
    },
    p = (0, a.$)()(
      (0, r.u)((e) => {
        let t = (0, n.H)({
            onFlush: (t) =>
              e((e) => ({
                latestByMint: { ...e.latestByMint, ...Object.fromEntries(t) },
              })),
          }),
          i = (e, i, a) => {
            (o.set(e, Date.now()),
              t.set(e, i),
              a && !(0, s.R)(e, "header") && (0, l.x)({ mint: e, event: i }));
          };
        return {
          latestByMint: {},
          setLatest: (e, t, { fold: a = !0, buffer: r = !0 } = {}) => {
            r &&
              ((e, t) => {
                let i = c.get(e);
                if (
                  !i ||
                  0 === i.listeners.size ||
                  (i.events.push(t),
                  i.events.length > 200 &&
                    (i.events.splice(0, i.events.length - 200),
                    (i.dropped += 1)),
                  i.timer)
                )
                  return;
                let a = Math.max(0, Date.now() - i.lastFlushAt);
                a >= 1e3 ? u(e) : (i.timer = setTimeout(() => u(e), 1e3 - a));
              })(e, t);
            let n = d.get(e);
            if (n) {
              ((n.event = t), (n.fold = a));
              return;
            }
            let l = Math.max(0, Date.now() - (o.get(e) ?? 0));
            if (l >= 500) return void i(e, t, a);
            let s = {
              event: t,
              fold: a,
              timer: setTimeout(() => {
                let t = d.get(e);
                (d.delete(e), t && i(e, t.event, t.fold));
              }, 500 - l),
            };
            d.set(e, s);
          },
        };
      }),
    );
  e.s([
    "a",
    0,
    m,
    "b",
    0,
    (e) => {
      let a,
        r,
        n,
        l,
        s = (0, t.c)(7),
        { mint: o, onBatch: d, enabled: c } = e,
        u = void 0 === c || c,
        p = (0, i.useRef)(d);
      (s[0] !== d
        ? ((a = () => {
            p.current = d;
          }),
          (r = [d]),
          (s[0] = d),
          (s[1] = a),
          (s[2] = r))
        : ((a = s[1]), (r = s[2])),
        (0, i.useEffect)(a, r),
        s[3] !== u || s[4] !== o
          ? ((n = () => {
              if (u && o)
                return m({
                  mint: o,
                  onFlush: (e) => {
                    (0, i.startTransition)(() => p.current(e));
                  },
                });
            }),
            (l = [o, u]),
            (s[3] = u),
            (s[4] = o),
            (s[5] = n),
            (s[6] = l))
          : ((n = s[5]), (l = s[6])),
        (0, i.useEffect)(n, l));
    },
    "H",
    0,
    (e) => {
      let i,
        a = (0, t.c)(2);
      return (
        a[0] !== e
          ? ((i = (t) => t.latestByMint[e] ?? null), (a[0] = e), (a[1] = i))
          : (i = a[1]),
        p(i)
      );
    },
    "s",
    0,
    (e, a) => {
      let r,
        n,
        l,
        s,
        o = (0, t.c)(6),
        d = (0, i.useRef)(a);
      (o[0] !== a
        ? ((r = () => {
            d.current = a;
          }),
          (n = [a]),
          (o[0] = a),
          (o[1] = r),
          (o[2] = n))
        : ((r = o[1]), (n = o[2])),
        (0, i.useEffect)(r, n),
        o[3] !== e
          ? ((l = () =>
              p.subscribe(
                (t) => t.latestByMint[e] ?? null,
                (e) => {
                  e && d.current(e);
                },
              )),
            (s = [e]),
            (o[3] = e),
            (o[4] = l),
            (o[5] = s))
          : ((l = o[4]), (s = o[5])),
        (0, i.useEffect)(l, s));
    },
    "m",
    0,
    p,
  ]);
};
