// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386);
  e.i(550675);
  var l = e.i(547562),
    i = e.i(893823);
  let a = "tradebox.display-mode.buy",
    r = "tradebox.display-mode",
    s = "tradebox.display-mode.heal-buy-token-v1";
  e.s([
    "f",
    0,
    function (e, o, u, c, d) {
      let m,
        b,
        f,
        y,
        h,
        v,
        p,
        g,
        x = (0, t.c)(28),
        _ = void 0 !== o && o,
        k = void 0 !== c && c,
        w = void 0 === d || d,
        S = k && "buy" === e,
        [N, q] = (0, l.l)("trading.inputUnit.buy"),
        [C, I] = (0, l.l)("trading.inputUnit.sell");
      (x[0] !== q || x[1] !== I
        ? ((m = () => {
            try {
              let e = window.localStorage.getItem(r);
              if (e) {
                try {
                  let t = JSON.parse(e);
                  (0, i.f)(t) &&
                    (window.localStorage.getItem(a) || q(t),
                    window.localStorage.getItem("tradebox.display-mode.sell") ||
                      I(t));
                } catch {}
                window.localStorage.removeItem(r);
              }
              if (!window.localStorage.getItem(s)) {
                let e = window.localStorage.getItem(a);
                if (e)
                  try {
                    let t = JSON.parse(e);
                    "token" === t && q("usd");
                  } catch {}
                window.localStorage.setItem(s, JSON.stringify(!0));
              }
            } catch {}
          }),
          (b = [q, I]),
          (x[0] = q),
          (x[1] = I),
          (x[2] = m),
          (x[3] = b))
        : ((m = x[2]), (b = x[3])),
        (0, n.useEffect)(m, b));
      let j = "buy" === e ? N : C,
        $ = "buy" === e ? q : I;
      e: {
        let e;
        if (S) {
          let e;
          (x[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = ["usd"]), (x[4] = e))
            : (e = x[4]),
            (f = e));
          break e;
        }
        (x[5] !== _
          ? ((e = _ ? ["usd", "token"] : ["usd", "sol", "token"]),
            (x[5] = _),
            (x[6] = e))
          : (e = x[6]),
          (f = e));
      }
      let E = f,
        L = _ && "sol" === j ? "usd" : j,
        P = void 0 !== u && u && "usd" === L && !_ ? "sol" : L,
        R = S ? (E.includes(P) ? P : E[0]) : P,
        D = (0, n.useRef)(!1);
      (x[7] !== w || x[8] !== _ || x[9] !== j || x[10] !== k || x[11] !== $
        ? ((y = () => {
            if (!_ || k || !w) {
              D.current = !1;
              return;
            }
            "sol" !== j || D.current || ((D.current = !0), $("usd"));
          }),
          (h = [w, _, j, k, $]),
          (x[7] = w),
          (x[8] = _),
          (x[9] = j),
          (x[10] = k),
          (x[11] = $),
          (x[12] = y),
          (x[13] = h))
        : ((y = x[12]), (h = x[13])),
        (0, n.useEffect)(y, h),
        x[14] !== E || x[15] !== S || x[16] !== $
          ? ((v = (e) => {
              if (!S) {
                if (!E.includes(e)) return void $(E[0]);
                $(e);
              }
            }),
            (x[14] = E),
            (x[15] = S),
            (x[16] = $),
            (x[17] = v))
          : (v = x[17]));
      let T = v;
      x[18] !== R || x[19] !== E || x[20] !== S || x[21] !== $
        ? ((p = () => {
            if (S) return;
            let e = Math.max(0, E.indexOf(R));
            $(E[(e + 1) % E.length]);
          }),
          (x[18] = R),
          (x[19] = E),
          (x[20] = S),
          (x[21] = $),
          (x[22] = p))
        : (p = x[22]);
      let A = p,
        F = !S;
      return (
        x[23] !== F || x[24] !== A || x[25] !== R || x[26] !== T
          ? ((g = { mode: R, setMode: T, cycle: A, canCycle: F }),
            (x[23] = F),
            (x[24] = A),
            (x[25] = R),
            (x[26] = T),
            (x[27] = g))
          : (g = x[27]),
        g
      );
    },
  ]);
};
