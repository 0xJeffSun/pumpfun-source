// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(426091);
  e.i(267146);
  var l = e.i(540805),
    a = e.i(361284);
  let s = (e, t = 0) =>
      0 === e || Math.abs(e) < t ? "neutral" : e > 0 ? "gain" : "loss",
    o = (e) =>
      `${Math.abs(e).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`,
    u =
      "inline-flex items-center gap-x-0.5 text-xs font-medium leading-[14px] tabular-nums",
    d = "rounded px-1.5 py-0.5",
    c = {
      terminal: "h-[18px] rounded-sm px-1.5 text-[11px] leading-4",
      comfortable: "h-5 rounded-sm px-1.5 text-xs leading-4",
    },
    m = { terminal: "text-[11px] leading-4", comfortable: "text-xs leading-4" },
    p = {
      gain: "bg-gain-surface text-gain",
      loss: "bg-loss-surface text-loss",
      neutral: "bg-bg-tertiary text-text-tertiary",
    };
  e.s(
    [
      "B",
      0,
      u,
      "N",
      0,
      d,
      "h",
      0,
      c,
      "j",
      0,
      p,
      "x",
      0,
      m,
      "H",
      0,
      o,
      "P",
      0,
      s,
      "F",
      0,
      (e) => l.v["buy" === e ? "gain" : "loss"],
    ],
    678730,
  );
  var f = l;
  e.s(["f", () => f.v], 242917);
  var f = l;
  (e.s(
    [
      "f",
      0,
      (e) => {
        let _,
          v,
          g,
          h,
          w,
          y,
          b = (0, r.c)(30),
          {
            changePercent: S,
            variant: A,
            density: x,
            neutralThreshold: U,
            hideArrow: P,
            isPnl: E,
            signed: k,
            className: I,
            "data-testid": F,
          } = e,
          T = void 0 === A ? "pill" : A,
          L = void 0 === U ? 0 : U,
          C = void 0 !== P && P,
          q = void 0 !== E && E,
          R = void 0 !== k && k;
        if (
          b[0] !== S ||
          b[1] !== I ||
          b[2] !== F ||
          b[3] !== x ||
          b[4] !== C ||
          b[5] !== q ||
          b[6] !== L ||
          b[7] !== R ||
          b[8] !== T
        ) {
          _ = Symbol.for("react.early_return_sentinel");
          e: {
            let e =
                null != S && Number.isFinite(S) ? (q ? (0, a.f)(S) : S) : null,
              r = "pill" === T && !R,
              y = x ? (r ? c[x] : m[x]) : r ? d : void 0;
            if (null === e) {
              let e,
                r,
                n = x && m[x];
              (b[14] !== I || b[15] !== y || b[16] !== n
                ? ((e = (0, i.c)(
                    "inline-flex items-center text-xs leading-[14px] text-text-tertiary",
                    n,
                    y,
                    I,
                  )),
                  (b[14] = I),
                  (b[15] = y),
                  (b[16] = n),
                  (b[17] = e))
                : (e = b[17]),
                b[18] !== F || b[19] !== e
                  ? ((r = (0, t.jsx)("span", {
                      className: e,
                      "data-testid": F,
                      children: "—",
                    })),
                    (b[18] = F),
                    (b[19] = e),
                    (b[20] = r))
                  : (r = b[20]),
                (_ = r));
              break e;
            }
            let A = s(e, L),
              U = "loss" === A ? n.kg : n.DD,
              P = r ? p[A] : f.v[A];
            (b[21] !== I || b[22] !== y || b[23] !== P
              ? ((v = (0, i.c)(u, y, P, I)),
                (b[21] = I),
                (b[22] = y),
                (b[23] = P),
                (b[24] = v))
              : (v = b[24]),
              (g = F),
              (h =
                C || R || "neutral" === A
                  ? null
                  : (0, t.jsx)(U, { "aria-hidden": !0, className: "h-3 w-3" })),
              (w = R ? (0, l.c)(e) : o(e)));
          }
          ((b[0] = S),
            (b[1] = I),
            (b[2] = F),
            (b[3] = x),
            (b[4] = C),
            (b[5] = q),
            (b[6] = L),
            (b[7] = R),
            (b[8] = T),
            (b[9] = _),
            (b[10] = v),
            (b[11] = g),
            (b[12] = h),
            (b[13] = w));
        } else ((_ = b[9]), (v = b[10]), (g = b[11]), (h = b[12]), (w = b[13]));
        return _ !== Symbol.for("react.early_return_sentinel")
          ? _
          : (b[25] !== v || b[26] !== g || b[27] !== h || b[28] !== w
              ? ((y = (0, t.jsxs)("span", {
                  className: v,
                  "data-testid": g,
                  children: [h, w],
                })),
                (b[25] = v),
                (b[26] = g),
                (b[27] = h),
                (b[28] = w),
                (b[29] = y))
              : (y = b[29]),
            y);
      },
    ],
    392968,
  ),
    e.s([], 84455));
};
