// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  let n = ["hour", "six_hours", "day", "three_days"],
    i = [...n, "forever"],
    a = { hour: 36e5, six_hours: 216e5, day: 864e5, three_days: 2592e5 },
    l = (e, t) => null !== e && (null === e.until || e.until > t),
    s = (e, t, r) => {
      let n = {
        tier: t,
        until: "forever" === t ? null : r + a[t],
        startedAt: r,
      };
      return l(e, r)
        ? null === e.until
          ? e
          : null === n.until || n.until > e.until
            ? n
            : e
        : n;
    },
    o = (e) => String(e).padStart(2, "0");
  e.s(
    [
      "Z",
      0,
      700,
      "x",
      0,
      3e3,
      "p",
      0,
      1800,
      "T",
      0,
      2,
      "P",
      0,
      i,
      "d",
      0,
      n,
      "u",
      0,
      s,
      "y",
      0,
      (e) => {
        let t = Math.max(0, Math.floor(e / 1e3)),
          r = Math.floor(t / 86400),
          n = `${o(Math.floor((t % 86400) / 3600))}:${o(Math.floor((t % 3600) / 60))}:${o(t % 60)}`;
        return r > 0 ? `${r}d ${n}` : n;
      },
      "W",
      0,
      (e) => {
        let t = Math.max(0, Math.ceil(e / 6e4));
        return {
          days: Math.floor(t / 1440),
          hours: Math.floor((t % 1440) / 60),
          minutes: t % 60,
        };
      },
      "s",
      0,
      l,
      "S",
      0,
      (e, t, r) => s(e, t, r) === e,
      "q",
      0,
      (e) => null !== e && "forever" !== e.tier && null !== e.until,
    ],
    538943,
  );
  var c = e.i(78436),
    u = e.i(634103);
  let d = "pump-packs-rip-lock",
    f = (0, c.$)()(
      (0, u.V)(
        (e) => ({
          lock: null,
          isCoachSeen: !1,
          lockFor: (t) => {
            (m(), e((e) => ({ lock: s(e.lock, t, Date.now()) })));
          },
          markCoachSeen: () => e({ isCoachSeen: !0 }),
        }),
        {
          name: d,
          storage: (0, u.j)(() => localStorage),
          partialize: (e) => ({ lock: e.lock, isCoachSeen: e.isCoachSeen }),
        },
      ),
    ),
    m = () => {
      f.persist.rehydrate();
    };
  e.s(
    [
      "Y",
      0,
      d,
      "i",
      0,
      () => {
        m();
        let { lock: e } = f.getState();
        return l(e, Date.now()) ? e : null;
      },
      "D",
      0,
      f,
    ],
    838067,
  );
  var p = e.i(170450);
  function h(e) {
    return e.lock;
  }
  function g() {
    return Date.now();
  }
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          n,
          i,
          a,
          s,
          o,
          c,
          u = (0, t.c)(13),
          m = (0, p.f)(),
          x = f(h),
          [v, y] = (0, r.useState)(g);
        (u[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = () => {
              let e = () => {
                  "visible" === document.visibilityState && y(Date.now());
                },
                t = (e) => {
                  (null === e.key || e.key === d) &&
                    (null === e.newValue
                      ? f.setState({ lock: null, isCoachSeen: !1 })
                      : f.persist.rehydrate(),
                    y(Date.now()));
                };
              return (
                document.addEventListener("visibilitychange", e),
                window.addEventListener("focus", e),
                window.addEventListener("storage", t),
                () => {
                  (document.removeEventListener("visibilitychange", e),
                    window.removeEventListener("focus", e),
                    window.removeEventListener("storage", t));
                }
              );
            }),
            (n = []),
            (u[0] = e),
            (u[1] = n))
          : ((e = u[0]), (n = u[1])),
          (0, r.useEffect)(e, n));
        let b = x?.until ?? null;
        (u[2] !== b
          ? ((i = () => {
              if (null === b) return;
              let e = b - Date.now();
              if (e <= 0) return;
              let t = setTimeout(
                () => y(Date.now()),
                Math.min(e + 50, 0x7fffffff),
              );
              return () => clearTimeout(t);
            }),
            (u[2] = b),
            (u[3] = i))
          : (i = u[3]),
          u[4] !== v || u[5] !== b
            ? ((a = [b, v]), (u[4] = v), (u[5] = b), (u[6] = a))
            : (a = u[6]),
          (0, r.useEffect)(i, a));
        let w = null !== b && b > v;
        return (u[7] !== w
          ? ((s = () => {
              if (!w) return;
              let e = setInterval(() => y(Date.now()), 6e4);
              return () => clearInterval(e);
            }),
            (o = [w]),
            (u[7] = w),
            (u[8] = s),
            (u[9] = o))
          : ((s = u[8]), (o = u[9])),
        (0, r.useEffect)(s, o),
        m)
          ? (u[10] !== x || u[11] !== v
              ? ((c = l(x, v) ? x : null),
                (u[10] = x),
                (u[11] = v),
                (u[12] = c))
              : (c = u[12]),
            c)
          : null;
      },
    ],
    344187,
  );
};
