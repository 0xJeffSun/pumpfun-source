// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  let n = "coin-chart-height-px",
    i = (e) => Math.round(Math.min(840, Math.max(370, e))),
    a = new Map(),
    l = (e) => {
      try {
        return window.localStorage.getItem(e);
      } catch {
        return null;
      }
    },
    s = (e) => {
      if (!e) return null;
      let t = Number(e);
      return Number.isFinite(t) ? i(t) : null;
    };
  function o() {
    return null;
  }
  e.s([
    "v",
    0,
    370,
    "H",
    0,
    () => s(l(n)),
    "P",
    0,
    function (e, c) {
      let u,
        d,
        f,
        m,
        p,
        h,
        g,
        x,
        v,
        y = (0, t.c)(27);
      y[0] !== c
        ? ((u = void 0 === c ? {} : c), (y[0] = c), (y[1] = u))
        : (u = y[1]);
      let { storageKey: b, restingHeightPx: w } = u,
        _ = void 0 === b ? n : b,
        C = void 0 === w ? 370 : w;
      if (y[2] !== _)
        ((d = (e) => {
          let t = a.get(_) ?? new Set();
          (t.add(e), a.set(_, t));
          let r = (t) => {
            t.key === _ && e();
          };
          return (
            window.addEventListener("storage", r),
            () => {
              (t.delete(e), window.removeEventListener("storage", r));
            }
          );
        }),
          (y[2] = _),
          (y[3] = d));
      else d = y[3];
      let S = d;
      y[4] !== _ ? ((f = () => l(_)), (y[4] = _), (y[5] = f)) : (f = y[5]);
      let k = (0, r.useSyncExternalStore)(S, f, o);
      y[6] !== k ? ((m = s(k)), (y[6] = k), (y[7] = m)) : (m = y[7]);
      let j = m,
        [N, I] = (0, r.useState)(null),
        [E, R] = (0, r.useState)(!1),
        A = (0, r.useRef)(null);
      y[8] !== N || y[9] !== C || y[10] !== j
        ? ((p = N ?? j ?? i(C)),
          (y[8] = N),
          (y[9] = C),
          (y[10] = j),
          (y[11] = p))
        : (p = y[11]);
      let P = p;
      y[12] !== _
        ? ((h = (e) => {
            let t = i(e);
            I(
              ((e, t) => {
                try {
                  window.localStorage.setItem(e, String(t));
                } catch {
                  return !1;
                }
                for (let t of a.get(e) ?? []) t();
                return !0;
              })(_, t)
                ? null
                : t,
            );
          }),
          (y[12] = _),
          (y[13] = h))
        : (h = y[13]);
      let L = h;
      y[14] !== L || y[15] !== e || y[16] !== P || y[17] !== N
        ? ((g = (t) => {
            let r = i(e.current?.getBoundingClientRect().height || P);
            ((A.current = {
              pointerY: t.clientY,
              height: r,
              latest: r,
              pickBefore: N,
            }),
              R(!0),
              I(r));
            let n = t.currentTarget;
            n.setPointerCapture(t.pointerId);
            let a = (e) => {
                let t = A.current;
                if (!t) return;
                let r = i(t.height + e.clientY - t.pointerY);
                ((A.current = { ...t, latest: r }), I(r));
              },
              l = () => {
                let e = A.current;
                ((A.current = null),
                  R(!1),
                  e && e.latest !== e.height
                    ? L(e.latest)
                    : e && I(e.pickBefore),
                  n.removeEventListener("pointermove", a),
                  n.removeEventListener("pointerup", l),
                  n.removeEventListener("pointercancel", l));
              };
            (n.addEventListener("pointermove", a),
              n.addEventListener("pointerup", l),
              n.addEventListener("pointercancel", l));
          }),
          (y[14] = L),
          (y[15] = e),
          (y[16] = P),
          (y[17] = N),
          (y[18] = g))
        : (g = y[18]);
      let M = g;
      y[19] !== L || y[20] !== P
        ? ((x = (e) => {
            var t;
            let r =
              ((t = e.key),
              "ArrowUp" === t
                ? P - 24
                : "ArrowDown" === t
                  ? P + 24
                  : "Home" === t
                    ? 370
                    : "End" === t
                      ? 840
                      : null);
            null !== r && (e.preventDefault(), L(r));
          }),
          (y[19] = L),
          (y[20] = P),
          (y[21] = x))
        : (x = y[21]);
      let $ = x;
      return (
        y[22] !== P || y[23] !== E || y[24] !== $ || y[25] !== M
          ? ((v = {
              heightPx: P,
              isResizing: E,
              onHandlePointerDown: M,
              onHandleKeyDown: $,
            }),
            (y[22] = P),
            (y[23] = E),
            (y[24] = $),
            (y[25] = M),
            (y[26] = v))
          : (v = y[26]),
        v
      );
    },
  ]);
};
