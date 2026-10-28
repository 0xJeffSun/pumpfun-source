// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(633836),
    i = t.i(719372),
    s = t.i(506222),
    n = t.i(904282),
    r = t.i(233278),
    o = t.i(425838),
    a = t.i(59778);
  let l = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
    h = { type: "keyframes", duration: 0.8 },
    u = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 };
  var d = t.i(412126);
  let c = new Set([
    "when",
    "delay",
    "delayChildren",
    "staggerChildren",
    "staggerDirection",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from",
    "elapsed",
  ]);
  var p = t.i(907953);
  t.s(
    [
      "f",
      0,
      (t, m, f, y = {}, v, g) =>
        (x) => {
          let P = (0, r.f)(y, t) || {},
            T = P.delay || y.delay || 0,
            { elapsed: w = 0 } = y;
          w -= (0, e.Z)(T);
          let S = {
            keyframes: Array.isArray(f) ? f : [null, f],
            ease: "easeOut",
            velocity: m.getVelocity(),
            ...P,
            delay: -w,
            onUpdate: (t) => {
              (m.set(t), P.onUpdate && P.onUpdate(t));
            },
            onComplete: () => {
              (x(), P.onComplete && P.onComplete());
            },
            name: t,
            motionValue: m,
            element: g ? void 0 : v,
          };
          (!(function (t) {
            for (let e in t) if (!c.has(e)) return !0;
            return !1;
          })(P) &&
            Object.assign(
              S,
              ((t, { keyframes: e }) =>
                e.length > 2
                  ? h
                  : a.P.has(t)
                    ? t.startsWith("scale")
                      ? {
                          type: "spring",
                          stiffness: 550,
                          damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                          restSpeed: 10,
                        }
                      : l
                    : u)(t, S),
            ),
            S.duration && (S.duration = (0, e.Z)(S.duration)),
            S.repeatDelay && (S.repeatDelay = (0, e.Z)(S.repeatDelay)),
            void 0 !== S.from && (S.keyframes[0] = S.from));
          let A = !1;
          if (
            ((!1 !== S.type && (0 !== S.duration || S.repeatDelay)) ||
              ((0, o.f)(S), 0 === S.delay && (A = !0)),
            (i.f.instantAnimations ||
              i.f.skipAnimations ||
              v?.shouldSkipAnimations ||
              P.skipAnimations) &&
              ((A = !0), (0, o.f)(S), (S.delay = 0)),
            (S.allowFlatten = !P.type && !P.ease),
            A && !g && void 0 !== m.get())
          ) {
            let t = (0, d.f)(S.keyframes, P);
            if (void 0 !== t)
              return void p.y.update(() => {
                (S.onUpdate(t), S.onComplete());
              });
          }
          return P.isSync ? new n.f(S) : new s.f(S);
        },
    ],
    490350,
  );
};
