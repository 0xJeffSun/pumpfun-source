// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386);
  let i = 0.5,
    n = Math.log(1.1),
    l = (e, t) => {
      let r = t * (e.length - 1),
        a = Math.floor(r),
        i = e[Math.min(a + 1, e.length - 1)] ?? 0,
        n = e[a] ?? 0;
      return n + (i - n) * (r - a);
    },
    s = (e, t, r, a) => {
      let i = Math.hypot(t.x - e.x, t.y - e.y),
        n = i + Math.hypot(r.x - t.x, r.y - t.y),
        l = 0 === n ? 0 : (a * i) / n,
        s = a - l;
      return {
        cp1x: t.x - l * (r.x - e.x),
        cp1y: t.y - l * (r.y - e.y),
        cp2x: t.x + s * (r.x - e.x),
        cp2y: t.y + s * (r.y - e.y),
      };
    },
    o = (e) => String(Number(e.toFixed(2))),
    c = (e, t = i) => {
      let r = e.length;
      if (0 === r) return "";
      let a = e[0],
        n = [`M${o(a.x)} ${o(a.y)}`];
      for (let a = 0; a < r - 1; a++) {
        let i = 0 === a ? e[0] : e[a - 1],
          l = e[a],
          c = e[a + 1],
          d = a === r - 2 ? e[r - 1] : e[a + 2],
          m = s(i, l, c, t),
          u = s(l, c, d, t);
        if (
          !Number.isFinite(m.cp2x) ||
          !Number.isFinite(m.cp2y) ||
          !Number.isFinite(u.cp1x) ||
          !Number.isFinite(u.cp1y) ||
          !Number.isFinite(c.x) ||
          !Number.isFinite(c.y)
        ) {
          n.push(
            `L${o(Number.isFinite(c.x) ? c.x : 0)} ${o(Number.isFinite(c.y) ? c.y : 0)}`,
          );
          continue;
        }
        n.push(
          `C${o(m.cp2x)} ${o(m.cp2y)} ${o(u.cp1x)} ${o(u.cp1y)} ${o(c.x)} ${o(c.y)}`,
        );
      }
      return n.join(" ");
    };
  e.s(
    [
      "j",
      0,
      3.5,
      "B",
      0,
      1.744,
      "l",
      0,
      4,
      "n",
      0,
      5e3,
      "G",
      0,
      1.25,
      "R",
      0,
      (e, t, r) => {
        try {
          if (!(t > 0) || !(r > 0)) return null;
          let a = e.filter((e) => Number.isFinite(e.price));
          if (a.length < 2) return null;
          let s = ((e, t, r) => {
              let a = e.map((e) => e.price),
                i = Math.min(...a),
                s = Math.max(...a),
                { lo: o, hi: c } = ((e) => {
                  let t = [...e].sort((e, t) => e - t),
                    r = t[0] ?? 0,
                    a = t[t.length - 1] ?? 0,
                    i = l(t, 0.25),
                    s = l(t, 0.75),
                    o = 1.5 * (s - i),
                    c = Math.max(r, i - o),
                    d = Math.min(a, s + o);
                  if (d - c < n) {
                    let e = (d + c) / 2;
                    ((c = Math.max(r, e - n / 2)),
                      (d = Math.min(a, e + n / 2)));
                  }
                  return { lo: c, hi: d };
                })(a.map((e) => Math.log(Math.max(e, 1e-12)))),
                d = Math.max(c - o, 1e-9),
                m = Math.max(0, t - 12),
                u = Math.max(0, r - 12),
                f = Math.max(1, e.length - 1),
                h = e.map((e, t) => ({
                  x: 6 + (t / f) * m,
                  y:
                    6 +
                    (1 -
                      Math.max(
                        0,
                        Math.min(
                          1,
                          (Math.log(Math.max(e.price, 1e-12)) - o) / d,
                        ),
                      )) *
                      u,
                })),
                p = (s + i) / 2;
              if (!(p > 0 && (s - i) / p < 0.001)) return h;
              let x = h.reduce((e, t) => e + t.y, 0) / Math.max(1, h.length);
              return h.map((e) => ({
                x: e.x,
                y: Math.max(6, Math.min(6 + u, x + (e.y - x) * 10)),
              }));
            })(a, t, r),
            d = s[s.length - 1];
          if (2 === s.length) {
            let [e, t] = s;
            return { d: `M${o(e.x)} ${o(e.y)} L${o(t.x)} ${o(t.y)}`, tip: d };
          }
          return { d: c(s, i), tip: d };
        } catch {
          return null;
        }
      },
      "C",
      0,
      c,
    ],
    844969,
  );
  let d = [
      0.3, -0.4, -0.2, 0.5, 0.4, -0.6, -0.3, 0.7, 0.6, -0.5, 0.9, 0.8, 0.7,
    ],
    m = 50,
    u = 10,
    f = 0.3,
    h = 4;
  var p = e.i(338319);
  let x = (0, a.memo)((e) => {
    let a,
      i,
      n,
      l,
      s = (0, r.c)(15),
      { width: o, height: x, className: g, preserveAspectRatio: b } = e;
    s[0] !== x || s[1] !== o
      ? ((a = ((e, t) => {
          if (!(e > 0) || !(t > 0)) return null;
          let r = ((e, t) => {
              if (e <= 0 || 0 === t.length) return [];
              let r = [],
                a = 3;
              for (let i = 0; i < e; i++)
                (i > 0 && (a += t[(i - 1) % t.length]), r.push(a));
              return r;
            })(
              ((e, t = m, r = u) =>
                Math.min(t, Math.max(10, 2 * Math.floor(e / r))))(e),
              ((e, t, r = f) => {
                let a = Math.max(1, Math.floor(e / 250)),
                  i = ((e / 150 + t / 100) / 2) * r;
                return Array.from({ length: a })
                  .flatMap(() => d)
                  .map((e) => e * i);
              })(e, t),
            ),
            a = r.length * u,
            i = (t - 0.75 * t) / 2,
            n = Math.max(0, t - 2 * i),
            l = t - i,
            s = Math.min(...r),
            o = Math.max(...r) - s;
          return {
            d: c(
              ((e, t = h) => {
                if (e.length < 2 || t <= 1) return [...e];
                let r = [];
                for (let a = 0; a < e.length - 1; a++) {
                  let i = e[a],
                    n = e[a + 1];
                  r.push(i);
                  for (let e = 1; e < t; e++) {
                    let a = e / t,
                      l = (1 - Math.cos(a * Math.PI)) / 2;
                    r.push({
                      x: i.x + (n.x - i.x) * a,
                      y: i.y + (n.y - i.y) * l,
                    });
                  }
                }
                return (r.push(e[e.length - 1]), r);
              })(
                r.map((e, t) => ({
                  x: 1 === r.length ? a / 2 : (t / (r.length - 1)) * a,
                  y: 0 === o ? i + n / 2 : l - ((e - s) / o) * n,
                })),
              ),
              0.15,
            ),
            patternWidth: a,
            scaleX: e / a,
          };
        })(o, x)),
        (s[0] = x),
        (s[1] = o),
        (s[2] = a))
      : (a = s[2]);
    let v = a;
    if (!v) return null;
    s[3] !== g
      ? ((i = (0, p.c)(
          "block text-text-accent",
          "opacity-40 animate-[explore-sparkline-shimmer_750ms_ease-in-out_infinite_alternate] motion-reduce:animate-none",
          g,
        )),
        (s[3] = g),
        (s[4] = i))
      : (i = s[4]);
    let y = `0 0 ${o} ${x}`,
      j = `scale(${v.scaleX} 1)`;
    return (
      s[5] !== v.d || s[6] !== j
        ? ((n = (0, t.jsx)("path", {
            className:
              "animate-[explore-sparkline-dash_1000ms_linear_infinite] motion-reduce:animate-none",
            d: v.d,
            "data-sparkline-layer": "skeleton",
            fill: "none",
            stroke: "currentColor",
            strokeDasharray: "3 2",
            strokeWidth: 1,
            transform: j,
          })),
          (s[5] = v.d),
          (s[6] = j),
          (s[7] = n))
        : (n = s[7]),
      s[8] !== x ||
      s[9] !== b ||
      s[10] !== i ||
      s[11] !== y ||
      s[12] !== n ||
      s[13] !== o
        ? ((l = (0, t.jsx)("svg", {
            "aria-hidden": !0,
            className: i,
            "data-testid": "explore-sparkline-skeleton",
            height: x,
            preserveAspectRatio: b,
            viewBox: y,
            width: o,
            children: n,
          })),
          (s[8] = x),
          (s[9] = b),
          (s[10] = i),
          (s[11] = y),
          (s[12] = n),
          (s[13] = o),
          (s[14] = l))
        : (l = s[14]),
      l
    );
  });
  ((x.displayName = "ExploreSparklineSkeleton"), e.s(["f", 0, x], 618427));
};
