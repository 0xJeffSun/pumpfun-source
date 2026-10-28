// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    n = e.i(426091),
    s = e.i(205761),
    r = e.i(465085),
    l = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    d = e.i(441315),
    c = e.i(724423),
    u = e.i(90832);
  let m = (0, n.c)(c.F, c.D.valid, "h-10 px-3"),
    f = (0, n.c)(
      c.z,
      "flex-1 text-left text-[16px] font-medium leading-none caret-text-primary",
    );
  function p(e, t, i, a) {
    return 0 === e
      ? ""
      : "usd" === t
        ? e.toFixed(2).replace(/\.?0+$/, "")
        : "funding" === t
          ? (0, u.m)(e, i)
          : (0, u.p)(e, Math.min(a, 6));
  }
  let b = (e) => {
    if ("" === e || "0." === e) return 0;
    let t = Number(e);
    return Number.isFinite(t) ? t : null;
  };
  function x(e, t) {
    let i = e.replace(/[,\s]/g, (e) => ("," === e ? "." : ""));
    if ("" === i) return "";
    let a = i.match(/^(\d*)(\.?)(\d*)$/);
    if (!a) return null;
    let [, n, s, r] = a,
      l = n.replace(/^0+(?=\d)/, ""),
      o = "" === l ? (s || n.length > 0 ? "0" : "") : l,
      d = s && r.length > t ? r.slice(0, t) : r;
    return `${o}${s}${d}`;
  }
  e.s(
    [
      "i",
      0,
      m,
      "c",
      0,
      f,
      "k",
      0,
      function (e) {
        let c,
          y,
          h,
          g,
          _,
          v,
          j,
          w,
          k,
          N,
          S,
          U,
          P,
          F,
          C,
          I,
          q,
          $,
          T,
          A = (0, i.c)(64),
          { model: B, compact: O, footer: E } = e,
          {
            value: M,
            setValue: L,
            mode: D,
            cycleMode: z,
            canCycleMode: Q,
            funding: R,
            token: H,
            conversions: V,
            disabled: W,
          } = B,
          { t: G } = (0, o.f)(),
          K = (0, l.useRef)(null);
        A[0] !== M ? ((c = b(M) ?? 0), (A[0] = M), (A[1] = c)) : (c = A[1]);
        let J = c,
          Z = R.decimals,
          X = H.decimals;
        if (A[2] !== Z || A[3] !== D || A[4] !== X)
          ((y = "usd" === D ? 2 : "funding" === D ? Z : Math.min(X, 6)),
            (A[2] = Z),
            (A[3] = D),
            (A[4] = X),
            (A[5] = y));
        else y = A[5];
        let Y = y,
          ee = (({ mode: e, funding: t, token: i }) =>
            "usd" === e ? "USD" : "funding" === e ? t.symbol : i.symbol)(B);
        A[6] !== Z || A[7] !== D || A[8] !== X || A[9] !== J
          ? ((h = () => p(J, D, Z, X)),
            (A[6] = Z),
            (A[7] = D),
            (A[8] = X),
            (A[9] = J),
            (A[10] = h))
          : (h = A[10]);
        let [et, ei] = (0, l.useState)(h),
          ea = (0, l.useRef)(et);
        (A[11] !== et
          ? ((g = () => {
              ea.current = et;
            }),
            (A[11] = et),
            (A[12] = g))
          : (g = A[12]),
          (0, l.useEffect)(g),
          A[13] !== Z || A[14] !== D || A[15] !== X || A[16] !== J
            ? ((_ = () => {
                let e = ea.current,
                  t = "" === e ? 0 : Number(e),
                  i = Math.max(Math.abs(J), Math.abs(t), 1);
                (Number.isFinite(t) && Math.abs(t - J) <= 1e-9 * i) ||
                  ei(p(J, D, Z, X));
              }),
              (v = [J, D, Z, X]),
              (A[13] = Z),
              (A[14] = D),
              (A[15] = X),
              (A[16] = J),
              (A[17] = _),
              (A[18] = v))
            : ((_ = A[17]), (v = A[18])),
          (0, l.useEffect)(_, v),
          A[19] !== Y || A[20] !== L
            ? ((j = (e) => {
                let t = x(e.target.value, Y);
                null !== t && (ei(t), L(t));
              }),
              (A[19] = Y),
              (A[20] = L),
              (A[21] = j))
            : (j = A[21]));
        let en = j,
          es = R.symbol,
          er = R.isUsdPegged,
          el = H.symbol,
          { usd: eo, funding: ed, token: ec } = V;
        if (
          A[22] !== ed ||
          A[23] !== es ||
          A[24] !== er ||
          A[25] !== D ||
          A[26] !== ec ||
          A[27] !== el ||
          A[28] !== eo
        ) {
          if (((w = []), "usd" !== D && !er && eo > 0)) {
            let e;
            (A[30] !== eo
              ? ((e = (0, u.w)(eo)), (A[30] = eo), (A[31] = e))
              : (e = A[31]),
              w.push(`≈ ${e}`));
          }
          if ("funding" !== D && !er && ed > 0) {
            let e;
            (A[32] !== ed
              ? ((e = (0, u.m)(ed, 4)), (A[32] = ed), (A[33] = e))
              : (e = A[33]),
              w.push(`≈ ${e} ${es}`));
          }
          if ("token" === D && er && ed > 0) {
            let e;
            (A[34] !== ed
              ? ((e = (0, u.m)(ed, 2)), (A[34] = ed), (A[35] = e))
              : (e = A[35]),
              w.push(`≈ ${e} ${es}`));
          }
          if ("token" !== D && ec > 0) {
            let e;
            (A[36] !== ec
              ? ((e = (0, u.p)(ec, 2)), (A[36] = ec), (A[37] = e))
              : (e = A[37]),
              w.push(`≈ ${e} ${el}`));
          }
          ((A[22] = ed),
            (A[23] = es),
            (A[24] = er),
            (A[25] = D),
            (A[26] = ec),
            (A[27] = el),
            (A[28] = eo),
            (A[29] = w));
        } else w = A[29];
        let eu = w[0] ?? "";
        A[38] !== w
          ? ((k = w.slice(1)), (A[38] = w), (A[39] = k))
          : (k = A[39]);
        let em = k.join(" · ");
        A[40] !== em || A[41] !== eu
          ? ((N = { inField: eu, below: em }),
            (A[40] = em),
            (A[41] = eu),
            (A[42] = N))
          : (N = A[42]);
        let { inField: ef, below: ep } = N,
          eb = (0, l.useRef)(D);
        (A[43] !== D
          ? ((S = () => {
              if (eb.current === D) return;
              eb.current = D;
              let e = K.current;
              if (!e) return;
              let t = document.activeElement;
              (!(t instanceof HTMLElement && t.closest('[role="dialog"]')) ||
                t.closest('[role="dialog"]')?.contains(e)) &&
                e.focus();
            }),
            (U = [D]),
            (A[43] = D),
            (A[44] = S),
            (A[45] = U))
          : ((S = A[44]), (U = A[45])),
          (0, l.useEffect)(S, U));
        let ex = void 0 !== O && O ? "gap-1" : "gap-1.5";
        A[46] !== ex
          ? ((P = (0, n.c)(
              "relative flex w-full min-w-0 flex-col items-stretch",
              ex,
            )),
            (A[46] = ex),
            (A[47] = P))
          : (P = A[47]);
        let ey = W && "opacity-60";
        return (
          A[48] !== ey
            ? ((F = (0, n.c)(m, "min-w-0", ey)), (A[48] = ey), (A[49] = F))
            : (F = A[49]),
          A[50] !== D
            ? ((C =
                "usd" === D &&
                (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className:
                    "shrink-0 text-[12px] leading-none text-text-quaternary",
                  children: "$",
                })),
              (A[50] = D),
              (A[51] = C))
            : (C = A[51]),
          A[52] !== ef || A[53] !== J
            ? ((I =
                J > 0 &&
                ef &&
                (0, t.jsx)("span", {
                  className:
                    "shrink-0 whitespace-nowrap text-[11px] font-normal leading-none tabular-nums text-text-quaternary",
                  "data-testid": "amount-input-conversion",
                  children: ef,
                })),
              (A[52] = ef),
              (A[53] = J),
              (A[54] = I))
            : (I = A[54]),
          A[55] !== Q || A[56] !== D || A[57] !== ee
            ? ((q =
                !Q &&
                "usd" !== D &&
                (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className:
                    "shrink-0 text-[12px] font-medium leading-none text-text-tertiary",
                  children: ee,
                })),
              (A[55] = Q),
              (A[56] = D),
              (A[57] = ee),
              (A[58] = q))
            : (q = A[58]),
          A[59] !== ep || A[60] !== J
            ? (($ =
                J > 0 &&
                ep &&
                (0, t.jsx)(
                  r.f.div,
                  {
                    className:
                      "px-1 text-[12px] font-medium tabular-nums leading-4 text-text-tertiary",
                    "data-testid": "amount-input-secondary",
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -4 },
                    transition: { duration: 0.18 },
                    children: ep,
                  },
                  ep,
                )),
              (A[59] = ep),
              (A[60] = J),
              (A[61] = $))
            : ($ = A[61]),
          A[62] !== $
            ? ((T = (0, t.jsx)(s.f, { mode: "wait", children: $ })),
              (A[62] = $),
              (A[63] = T))
            : (T = A[63]),
          (0, t.jsxs)("div", {
            className: P,
            children: [
              (0, t.jsxs)("div", {
                className: F,
                children: [
                  (0, t.jsxs)("label", {
                    className:
                      "flex min-w-0 flex-1 cursor-text items-center gap-1.5 self-stretch",
                    children: [
                      C,
                      (0, t.jsx)("input", {
                        ref: K,
                        type: "text",
                        inputMode: "decimal",
                        pattern: "[0-9]*\\.?[0-9]*",
                        autoComplete: "off",
                        spellCheck: !1,
                        value: et,
                        onChange: en,
                        disabled: W,
                        placeholder: "0",
                        "aria-label": G("trade.enter_amount_in_currency", {
                          symbol: ee,
                        }),
                        className: f,
                      }),
                    ],
                  }),
                  I,
                  Q &&
                    (0, t.jsx)(d.p, {
                      density: "terminal",
                      variant: "raised",
                      onClick: z,
                      trailing: (0, t.jsx)(a.pn, { "aria-hidden": !0 }),
                      className: "-mr-1",
                      "aria-label": G("web.trade.switch_denomination", {
                        symbol: ee,
                      }),
                      children: ee,
                    }),
                  q,
                ],
              }),
              T,
              E,
            ],
          })
        );
      },
      "p",
      0,
      b,
      "l",
      0,
      x,
    ],
    280838,
  );
  var y = e.i(338319);
  let h = [25, 50, 100],
    g = "flex flex-wrap items-center gap-1",
    _ = (0, y.c)(
      (0, d.C)({ density: "terminal", variant: "raised", interactive: !0 }),
      "min-w-0 flex-auto justify-center truncate px-1 tabular-nums disabled:hover:!bg-bg-tertiary",
    );
  e.s(
    [
      "t",
      0,
      _,
      "b",
      0,
      g,
      "Q",
      0,
      function (e) {
        let a,
          n,
          s,
          r,
          l,
          d,
          c,
          u = (0, i.c)(18),
          { selector: m, shares: f, className: p } = e,
          { t: b } = (0, o.f)(),
          x = f.percents ?? h;
        (u[0] !== x ? ((a = new Set(x)), (u[0] = x), (u[1] = a)) : (a = u[1]),
          u[2] !== a ? ((n = [...a]), (u[2] = a), (u[3] = n)) : (n = u[3]));
        let v = n;
        return (
          u[4] !== p
            ? ((s = (0, y.c)(g, p)), (u[4] = p), (u[5] = s))
            : (s = u[5]),
          u[6] !== b
            ? ((r = b("web.trade.quick_amounts")), (u[6] = b), (u[7] = r))
            : (r = u[7]),
          u[8] !== v || u[9] !== f
            ? ((l = v.map((e) =>
                (0, t.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => f.onSelect(e),
                    disabled: f.disabled,
                    "data-testid": `amount-percent-${e}`,
                    className: _,
                    children: [e, "%"],
                  },
                  e,
                ),
              )),
              (u[8] = v),
              (u[9] = f),
              (u[10] = l))
            : (l = u[10]),
          u[11] !== r || u[12] !== l
            ? ((d = (0, t.jsx)("div", {
                role: "group",
                "aria-label": r,
                "data-testid": "amount-share-group",
                className: "flex min-w-0 flex-auto gap-1",
                children: l,
              })),
              (u[11] = r),
              (u[12] = l),
              (u[13] = d))
            : (d = u[13]),
          u[14] !== m || u[15] !== s || u[16] !== d
            ? ((c = (0, t.jsxs)("div", {
                "data-testid": "amount-preset-row",
                className: s,
                children: [m, d],
              })),
              (u[14] = m),
              (u[15] = s),
              (u[16] = d),
              (u[17] = c))
            : (c = u[17]),
          c
        );
      },
    ],
    505563,
  );
};
