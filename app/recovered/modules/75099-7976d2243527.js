// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(599077),
    a = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(322315),
    s = e.i(254010),
    o = e.i(745018),
    c = e.i(439587),
    d = e.i(211502),
    u = e.i(595673),
    m = e.i(338319);
  let f = (0, m.c)(
    "flex h-7 min-w-0 flex-1 items-center justify-center gap-1.5 rounded px-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
  );
  function h(e) {
    let l,
      a,
      i,
      s,
      c,
      h,
      p,
      x,
      b,
      g,
      v,
      y,
      w,
      j,
      _,
      C,
      N,
      k = (0, r.c)(43),
      { showTextLabels: S } = e,
      M = void 0 === S || S,
      { t: E } = (0, n.f)(),
      { homeLayout: T, setHomeLayout: A } = (0, d.e)();
    k[0] !== T || k[1] !== A
      ? ((l = function (e) {
          e !== T && (A(e), (0, u.ze)({ fromLayout: T, toLayout: e }));
        }),
        (k[0] = T),
        (k[1] = A),
        (k[2] = l))
      : (l = k[2]);
    let L = l;
    k[3] !== E
      ? ((a = E("web.home.feed_layout_a11y")), (k[3] = E), (k[4] = a))
      : (a = k[4]);
    let I = T === d.M.GRID;
    k[5] !== L ? ((i = () => L(d.M.GRID)), (k[5] = L), (k[6] = i)) : (i = k[6]);
    let R =
      T === d.M.GRID
        ? "bg-bg-tertiary text-text-primary"
        : "text-text-tertiary hover:text-text-primary";
    (k[7] !== R ? ((s = (0, m.c)(f, R)), (k[7] = R), (k[8] = s)) : (s = k[8]),
      k[9] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsx)(o.nF, { className: "h-4 w-4 shrink-0" })),
          (k[9] = c))
        : (c = k[9]));
    let F = !M && "sr-only";
    (k[10] !== F ? ((h = (0, m.c)(F)), (k[10] = F), (k[11] = h)) : (h = k[11]),
      k[12] !== E
        ? ((p = E("web.home.layout_grid")), (k[12] = E), (k[13] = p))
        : (p = k[13]),
      k[14] !== h || k[15] !== p
        ? ((x = (0, t.jsx)("span", { className: h, children: p })),
          (k[14] = h),
          (k[15] = p),
          (k[16] = x))
        : (x = k[16]),
      k[17] !== x || k[18] !== I || k[19] !== i || k[20] !== s
        ? ((b = (0, t.jsxs)("button", {
            type: "button",
            "aria-pressed": I,
            onClick: i,
            className: s,
            children: [c, x],
          })),
          (k[17] = x),
          (k[18] = I),
          (k[19] = i),
          (k[20] = s),
          (k[21] = b))
        : (b = k[21]));
    let O = T === d.M.TABLE;
    k[22] !== L
      ? ((g = () => L(d.M.TABLE)), (k[22] = L), (k[23] = g))
      : (g = k[23]);
    let W =
      T === d.M.TABLE
        ? "bg-bg-tertiary text-text-primary"
        : "text-text-tertiary hover:text-text-primary";
    (k[24] !== W
      ? ((v = (0, m.c)(f, W)), (k[24] = W), (k[25] = v))
      : (v = k[25]),
      k[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)(o.cb, { className: "h-4 w-4 shrink-0" })),
          (k[26] = y))
        : (y = k[26]));
    let B = !M && "sr-only";
    return (
      k[27] !== B ? ((w = (0, m.c)(B)), (k[27] = B), (k[28] = w)) : (w = k[28]),
      k[29] !== E
        ? ((j = E("web.home.layout_table")), (k[29] = E), (k[30] = j))
        : (j = k[30]),
      k[31] !== w || k[32] !== j
        ? ((_ = (0, t.jsx)("span", { className: w, children: j })),
          (k[31] = w),
          (k[32] = j),
          (k[33] = _))
        : (_ = k[33]),
      k[34] !== O || k[35] !== g || k[36] !== v || k[37] !== _
        ? ((C = (0, t.jsxs)("button", {
            type: "button",
            "aria-pressed": O,
            onClick: g,
            className: v,
            children: [y, _],
          })),
          (k[34] = O),
          (k[35] = g),
          (k[36] = v),
          (k[37] = _),
          (k[38] = C))
        : (C = k[38]),
      k[39] !== b || k[40] !== C || k[41] !== a
        ? ((N = (0, t.jsxs)("div", {
            role: "group",
            "aria-label": a,
            className:
              "inline-flex h-8 shrink-0 items-center rounded-md border border-border-tertiary bg-transparent p-px",
            children: [b, C],
          })),
          (k[39] = b),
          (k[40] = C),
          (k[41] = a),
          (k[42] = N))
        : (N = k[42]),
      N
    );
  }
  var p = e.i(548630),
    x = e.i(402732),
    b = e.i(426091),
    g = e.i(938277),
    v = e.i(725776),
    y = e.i(259948);
  let w = {
      strategy: "progressive",
      progressiveSteps: [
        { threshold: 0, step: 100 },
        { threshold: 1e4, step: 500 },
        { threshold: 5e4, step: 1e3 },
        { threshold: 2e5, step: 5e3 },
        { threshold: 1e6, step: 25e3 },
        { threshold: 1e7, step: 1e5 },
      ],
    },
    j = {
      strategy: "progressive",
      progressiveSteps: [
        { threshold: 0, step: 100 },
        { threshold: 5e3, step: 500 },
        { threshold: 25e3, step: 1e3 },
        { threshold: 1e5, step: 5e3 },
      ],
    },
    _ =
      "block size-4 rounded-full border-2 border-bg-accent bg-bg-primary shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/50 disabled:pointer-events-none disabled:opacity-50",
    C =
      "w-full rounded-lg border border-border-secondary bg-bg-tertiary/60 px-2.5 py-1.5 text-xs text-text-primary transition-colors placeholder:text-text-tertiary hover:border-border-tertiary focus:border-border-tertiary focus:outline-none focus:ring-1 focus:ring-text-accent/40",
    N = (e) => e.toString(),
    k = (e, t, r) => Math.max(t, Math.min(r, e)),
    S = (e, t, r, l) => {
      let a = ((e, t, r, l) => {
        switch (l.strategy) {
          case "fixed":
            return l.fixedStep || 1;
          case "progressive":
            if (!l.progressiveSteps) return 1;
            for (let t = l.progressiveSteps.length - 1; t >= 0; t--)
              if (e >= l.progressiveSteps[t].threshold)
                return l.progressiveSteps[t].step;
            return l.progressiveSteps[0].step;
          case "logarithmic": {
            let l = r - t,
              a = 0.001 * l;
            return Math.max(a, a * Math.pow(10, ((e - t) / l) * 2));
          }
          case "custom":
            return l.customStepFn?.(e, t, r) || 1;
          default:
            return 1;
        }
      })(e, t, r, l);
      if ("progressive" === l.strategy && l.progressiveSteps) {
        let n = 0;
        for (let t of l.progressiveSteps)
          if (e >= t.threshold) n = t.threshold;
          else break;
        let i = Math.round((e - n) / a) * a;
        return k(n + i, t, r);
      }
      return 0.001 > Math.abs(e % a)
        ? k(e, t, r)
        : k(Math.round(e / a) * a, t, r);
    },
    M = a.forwardRef((e, l) => {
      let i,
        s,
        o,
        c,
        d,
        u,
        m,
        f,
        h,
        p,
        x,
        g,
        v,
        w,
        j,
        M,
        R,
        F,
        O,
        W,
        B,
        z,
        P,
        V,
        D,
        U,
        $,
        H,
        G,
        K,
        q,
        X,
        Z,
        J,
        Q,
        Y,
        ee,
        et = (0, r.c)(105);
      et[0] !== e
        ? (({
            min: d,
            max: c,
            step: f,
            value: x,
            onValueChange: u,
            formatValue: h,
            label: o,
            className: i,
            showInputs: p,
            inputPlaceholder: s,
            ...m
          } = e),
          (et[0] = e),
          (et[1] = i),
          (et[2] = s),
          (et[3] = o),
          (et[4] = c),
          (et[5] = d),
          (et[6] = u),
          (et[7] = m),
          (et[8] = f),
          (et[9] = h),
          (et[10] = p),
          (et[11] = x))
        : ((i = et[1]),
          (s = et[2]),
          (o = et[3]),
          (c = et[4]),
          (d = et[5]),
          (u = et[6]),
          (m = et[7]),
          (f = et[8]),
          (h = et[9]),
          (p = et[10]),
          (x = et[11]));
      let er = void 0 === f ? 1 : f,
        el = void 0 === h ? N : h,
        ea = void 0 !== p && p,
        { t: en } = (0, n.f)();
      e: {
        if ("number" == typeof er) {
          let e;
          (et[12] !== er
            ? ((e = { strategy: "fixed", fixedStep: er }),
              (et[12] = er),
              (et[13] = e))
            : (e = et[13]),
            (g = e));
          break e;
        }
        g = er;
      }
      let ei = g;
      et[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = ["", ""]), (et[14] = v))
        : (v = et[14]);
      let [es, eo] = a.useState(v),
        [ec, ed] = a.useState(!1),
        {
          encode: eu,
          decode: em,
          mode: ef,
        } = ((e, t, l) => {
          let a,
            n,
            i,
            s,
            o = (0, r.c)(21);
          o[0] !== l || o[1] !== t
            ? ((a = (e) => Math.log10(k(e, t, l) - t + 1)),
              (o[0] = l),
              (o[1] = t),
              (o[2] = a))
            : (a = o[2]);
          let c = a;
          o[3] !== l || o[4] !== t
            ? ((n = (e) => k(Math.pow(10, e) + t - 1, t, l)),
              (o[3] = l),
              (o[4] = t),
              (o[5] = n))
            : (n = o[5]);
          let d = n;
          o[6] !== l || o[7] !== t || o[8] !== e.progressiveSteps
            ? ((i = (r) => {
                if (!e.progressiveSteps?.length) return r;
                let a = e.progressiveSteps
                    .map(E)
                    .filter((e) => e > t && e < l)
                    .sort(T),
                  n = [t, ...a, l];
                for (let e = 0; e < n.length - 1; e++) {
                  let t = n[e],
                    l = n[e + 1];
                  if (r <= l) {
                    let a = l - t;
                    return e + (0 === a ? 0 : (r - t) / a);
                  }
                }
                return n.length - 2;
              }),
              (o[6] = l),
              (o[7] = t),
              (o[8] = e.progressiveSteps),
              (o[9] = i))
            : (i = o[9]);
          let u = i;
          o[10] !== l || o[11] !== t || o[12] !== e.progressiveSteps
            ? ((s = (r) => {
                if (!e.progressiveSteps?.length) return r;
                let a = e.progressiveSteps
                    .map(A)
                    .filter((e) => e > t && e < l)
                    .sort(L),
                  n = [t, ...a, l],
                  i = Math.min(Math.floor(r), n.length - 2),
                  s = n[i],
                  o = n[i + 1];
                return s + (r - i) * (o - s);
              }),
              (o[10] = l),
              (o[11] = t),
              (o[12] = e.progressiveSteps),
              (o[13] = s))
            : (s = o[13]);
          let m = s;
          switch (e.strategy) {
            case "logarithmic": {
              let e;
              return (
                o[14] !== d || o[15] !== c
                  ? ((e = { encode: c, decode: d, mode: "log" }),
                    (o[14] = d),
                    (o[15] = c),
                    (o[16] = e))
                  : (e = o[16]),
                e
              );
            }
            case "progressive": {
              let e;
              return (
                o[17] !== m || o[18] !== u
                  ? ((e = { encode: u, decode: m, mode: "progressive" }),
                    (o[17] = m),
                    (o[18] = u),
                    (o[19] = e))
                  : (e = o[19]),
                e
              );
            }
            default: {
              let e;
              return (
                o[20] === Symbol.for("react.memo_cache_sentinel")
                  ? ((e = { encode: I, decode: I, mode: "linear" }),
                    (o[20] = e))
                  : (e = o[20]),
                e
              );
            }
          }
        })(ei, d, c),
        eh = eu(d),
        ep = eu(c),
        ex = eu(x[0]),
        eb = eu(x[1]);
      et[15] !== ex || et[16] !== eb
        ? ((w = [ex, eb]), (et[15] = ex), (et[16] = eb), (et[17] = w))
        : (w = et[17]);
      let eg = w;
      t: {
        let e = ep - eh;
        switch (ef) {
          case "log":
            j = e / 10;
            break t;
          case "progressive":
            j = 0.001;
            break t;
          default:
            j = e / 10;
        }
      }
      let ev = j;
      (et[18] !== el ||
      et[19] !== ec ||
      et[20] !== s ||
      et[21] !== en ||
      et[22] !== x[0]
        ? ((M = ec ? el(x[0]) : s || en("web.ui.range_min_placeholder")),
          (et[18] = el),
          (et[19] = ec),
          (et[20] = s),
          (et[21] = en),
          (et[22] = x[0]),
          (et[23] = M))
        : (M = et[23]),
        et[24] !== el ||
        et[25] !== ec ||
        et[26] !== s ||
        et[27] !== c ||
        et[28] !== en ||
        et[29] !== x[1]
          ? ((R = ec
              ? `${el(x[1])}${x[1] >= c ? "+" : ""}`
              : s || en("web.ui.range_max_placeholder")),
            (et[24] = el),
            (et[25] = ec),
            (et[26] = s),
            (et[27] = c),
            (et[28] = en),
            (et[29] = x[1]),
            (et[30] = R))
          : (R = et[30]),
        et[31] !== M || et[32] !== R
          ? ((F = [M, R]), (et[31] = M), (et[32] = R), (et[33] = F))
          : (F = et[33]));
      let ey = F;
      et[34] !== em || et[35] !== c || et[36] !== d || et[37] !== u
        ? ((O = (e) => {
            ed(!0);
            let t = [k(em(e[0]), d, c), k(em(e[1]), d, c)];
            u(t);
          }),
          (et[34] = em),
          (et[35] = c),
          (et[36] = d),
          (et[37] = u),
          (et[38] = O))
        : (O = et[38]);
      let ew = O;
      et[39] !== em ||
      et[40] !== c ||
      et[41] !== d ||
      et[42] !== u ||
      et[43] !== ei
        ? ((W = (e) => {
            let t = [em(e[0]), em(e[1])],
              r = S(t[0], d, c, ei),
              l = S(t[1], d, c, ei);
            u([Math.min(r, l), Math.max(r, l)]);
          }),
          (et[39] = em),
          (et[40] = c),
          (et[41] = d),
          (et[42] = u),
          (et[43] = ei),
          (et[44] = W))
        : (W = et[44]);
      let ej = W;
      et[45] === Symbol.for("react.memo_cache_sentinel")
        ? ((B = (e, t) => {
            eo((r) => {
              let l = [...r];
              return ((l[e] = t), l);
            });
          }),
          (et[45] = B))
        : (B = et[45]);
      let e_ = B;
      et[46] !== es ||
      et[47] !== c ||
      et[48] !== d ||
      et[49] !== u ||
      et[50] !== ei ||
      et[51] !== x
        ? ((z = (e) => {
            let t,
              r,
              l,
              a,
              n = es[e].trim();
            if (!n) return;
            ed(!0);
            let i = S(
                k(
                  isNaN(
                    (a =
                      parseFloat(
                        (l =
                          (r =
                            { k: 1e3, m: 1e6, b: 1e9 }[
                              (t = n.replace(/[$,\s]/g, ""))
                                .toLowerCase()
                                .slice(-1)
                            ] || 1) > 1
                            ? t.slice(0, -1)
                            : t),
                      ) * r),
                  )
                    ? 0
                    : r > 1 && Number.isInteger(parseFloat(l))
                      ? Math.round(a)
                      : a,
                  d,
                  c,
                ),
                d,
                c,
                ei,
              ),
              s = [...x];
            s[e] = i;
            let o = [Math.min(s[0], s[1]), Math.max(s[0], s[1])];
            (u(o),
              eo((t) => {
                let r = [...t];
                return ((r[e] = ""), r);
              }));
          }),
          (et[46] = es),
          (et[47] = c),
          (et[48] = d),
          (et[49] = u),
          (et[50] = ei),
          (et[51] = x),
          (et[52] = z))
        : (z = et[52]);
      let eC = z;
      et[53] !== eC
        ? ((P = (e, t) => {
            "Enter" === e.key && (eC(t), e.target.blur());
          }),
          (et[53] = eC),
          (et[54] = P))
        : (P = et[54]);
      let eN = P;
      return (
        et[55] !== i
          ? ((V = (0, b.c)("space-y-2", i)), (et[55] = i), (et[56] = V))
          : (V = et[56]),
        et[57] !== el ||
        et[58] !== o ||
        et[59] !== c ||
        et[60] !== x[0] ||
        et[61] !== x[1]
          ? ((D =
              o &&
              (0, t.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, t.jsx)("span", {
                    className: "text-sm font-medium text-text-primary",
                    children: o,
                  }),
                  (0, t.jsxs)("span", {
                    className: "text-sm tabular-nums text-text-tertiary",
                    children: [el(x[0]), " - ", el(x[1]), x[1] >= c ? "+" : ""],
                  }),
                ],
              })),
            (et[57] = el),
            (et[58] = o),
            (et[59] = c),
            (et[60] = x[0]),
            (et[61] = x[1]),
            (et[62] = D))
          : (D = et[62]),
        et[63] !== i
          ? ((U = (0, b.c)(
              "relative flex w-full touch-none select-none items-center",
              i,
            )),
            (et[63] = i),
            (et[64] = U))
          : (U = et[64]),
        et[65] === Symbol.for("react.memo_cache_sentinel")
          ? (($ = (0, t.jsx)(y.m, {
              className:
                "relative h-1.5 w-full grow overflow-hidden rounded-full bg-bg-tertiary",
              children: (0, t.jsx)(y.h, {
                className: "absolute h-full bg-bg-accent",
              }),
            })),
            (H = (0, t.jsx)(y.w, { className: _ })),
            (G = (0, t.jsx)(y.w, { className: _ })),
            (et[65] = $),
            (et[66] = H),
            (et[67] = G))
          : (($ = et[65]), (H = et[66]), (G = et[67])),
        et[68] !== ep ||
        et[69] !== eh ||
        et[70] !== eg ||
        et[71] !== ew ||
        et[72] !== ej ||
        et[73] !== m ||
        et[74] !== l ||
        et[75] !== ev ||
        et[76] !== U
          ? ((K = (0, t.jsxs)(y.F, {
              ref: l,
              className: U,
              value: eg,
              onValueChange: ew,
              onValueCommit: ej,
              min: eh,
              max: ep,
              step: ev,
              ...m,
              children: [$, H, G],
            })),
            (et[68] = ep),
            (et[69] = eh),
            (et[70] = eg),
            (et[71] = ew),
            (et[72] = ej),
            (et[73] = m),
            (et[74] = l),
            (et[75] = ev),
            (et[76] = U),
            (et[77] = K))
          : (K = et[77]),
        et[78] !== el || et[79] !== d
          ? ((q = el(d)), (et[78] = el), (et[79] = d), (et[80] = q))
          : (q = et[80]),
        et[81] !== q
          ? ((X = (0, t.jsx)("span", { children: q })),
            (et[81] = q),
            (et[82] = X))
          : (X = et[82]),
        et[83] !== el || et[84] !== c
          ? ((Z = el(c)), (et[83] = el), (et[84] = c), (et[85] = Z))
          : (Z = et[85]),
        et[86] !== Z
          ? ((J = (0, t.jsxs)("span", { children: [Z, "+"] })),
            (et[86] = Z),
            (et[87] = J))
          : (J = et[87]),
        et[88] !== X || et[89] !== J
          ? ((Q = (0, t.jsxs)("div", {
              className:
                "flex justify-between text-xs tabular-nums text-text-tertiary",
              children: [X, J],
            })),
            (et[88] = X),
            (et[89] = J),
            (et[90] = Q))
          : (Q = et[90]),
        et[91] !== eN ||
        et[92] !== eC ||
        et[93] !== es[0] ||
        et[94] !== es[1] ||
        et[95] !== ey ||
        et[96] !== ea ||
        et[97] !== en
          ? ((Y =
              ea &&
              (0, t.jsxs)("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("label", {
                        className: "mb-1 block text-xs text-text-tertiary",
                        children: en("web.ui.minimum"),
                      }),
                      (0, t.jsx)("input", {
                        type: "text",
                        value: es[0],
                        onChange: (e) => e_(0, e.target.value),
                        onBlur: () => eC(0),
                        onKeyDown: (e) => eN(e, 0),
                        placeholder: ey[0],
                        className: C,
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("label", {
                        className: "mb-1 block text-xs text-text-tertiary",
                        children: en("web.ui.maximum"),
                      }),
                      (0, t.jsx)("input", {
                        type: "text",
                        value: es[1],
                        onChange: (e) => e_(1, e.target.value),
                        onBlur: () => eC(1),
                        onKeyDown: (e) => eN(e, 1),
                        placeholder: ey[1],
                        className: C,
                      }),
                    ],
                  }),
                ],
              })),
            (et[91] = eN),
            (et[92] = eC),
            (et[93] = es[0]),
            (et[94] = es[1]),
            (et[95] = ey),
            (et[96] = ea),
            (et[97] = en),
            (et[98] = Y))
          : (Y = et[98]),
        et[99] !== V ||
        et[100] !== D ||
        et[101] !== K ||
        et[102] !== Q ||
        et[103] !== Y
          ? ((ee = (0, t.jsxs)("div", {
              className: V,
              children: [D, K, Q, Y],
            })),
            (et[99] = V),
            (et[100] = D),
            (et[101] = K),
            (et[102] = Q),
            (et[103] = Y),
            (et[104] = ee))
          : (ee = et[104]),
        ee
      );
    });
  function E(e) {
    return e.threshold;
  }
  function T(e, t) {
    return e - t;
  }
  function A(e) {
    return e.threshold;
  }
  function L(e, t) {
    return e - t;
  }
  function I(e) {
    return e;
  }
  M.displayName = "DoubleRangeSlider";
  let R = "explore-filter-verified-only";
  function F(e) {
    let l,
      i,
      s,
      o,
      d,
      u,
      m,
      f,
      h,
      p,
      x,
      y,
      _,
      C,
      N,
      k,
      S,
      E,
      T,
      A,
      L,
      I,
      F,
      O,
      W,
      B = (0, r.c)(76),
      { t: z } = (0, n.f)(),
      {
        marketCapRange: P,
        volumeRange: V,
        verifiedOnly: D,
        onApply: U,
        onClear: $,
        marketCapMin: H,
        marketCapMax: G,
        volumeMin: K,
        volumeMax: q,
        className: X,
      } = e,
      Z = void 0 !== D && D,
      J = void 0 === H ? 1e3 : H,
      Q = void 0 === G ? 5e7 : G,
      Y = void 0 === K ? 0 : K,
      ee = void 0 === q ? 5e5 : q,
      [et, er] = a.useState(P),
      [el, ea] = a.useState(V),
      [en, ei] = a.useState(Z);
    B[0] !== P || B[1] !== Z || B[2] !== V
      ? ((l = { marketCapRange: P, volumeRange: V, verifiedOnly: Z }),
        (B[0] = P),
        (B[1] = Z),
        (B[2] = V),
        (B[3] = l))
      : (l = B[3]);
    let [es, eo] = a.useState(l);
    ((es.marketCapRange !== P ||
      es.volumeRange !== V ||
      es.verifiedOnly !== Z) &&
      (eo({ marketCapRange: P, volumeRange: V, verifiedOnly: Z }),
      er(P),
      ea(V),
      ei(Z)),
      B[4] !== U || B[5] !== et || B[6] !== en || B[7] !== el
        ? ((i = () => {
            U({ marketCap: et, volume: el, verifiedOnly: en });
          }),
          (B[4] = U),
          (B[5] = et),
          (B[6] = en),
          (B[7] = el),
          (B[8] = i))
        : (i = B[8]));
    let ec = i;
    B[9] !== Q || B[10] !== J || B[11] !== $ || B[12] !== ee || B[13] !== Y
      ? ((s = () => {
          let e = [Y, ee];
          (er([J, Q]), ea(e), ei(!1), $());
        }),
        (B[9] = Q),
        (B[10] = J),
        (B[11] = $),
        (B[12] = ee),
        (B[13] = Y),
        (B[14] = s))
      : (s = B[14]);
    let ed = s,
      eu =
        et[0] !== P[0] ||
        et[1] !== P[1] ||
        el[0] !== V[0] ||
        el[1] !== V[1] ||
        en !== Z;
    (B[15] !== X
      ? ((o = (0, b.c)("space-y-4 rounded-lg p-4", X)),
        (B[15] = X),
        (B[16] = o))
      : (o = B[16]),
      B[17] !== z
        ? ((d = z("web.filters.mcap")), (B[17] = z), (B[18] = d))
        : (d = B[18]),
      B[19] !== z
        ? ((u = z("web.filters.range_placeholder_mcap")),
          (B[19] = z),
          (B[20] = u))
        : (u = B[20]),
      B[21] !== Q || B[22] !== J || B[23] !== u || B[24] !== d || B[25] !== et
        ? ((m = (0, t.jsx)(M, {
            label: d,
            min: J,
            max: Q,
            step: w,
            value: et,
            onValueChange: er,
            formatValue: g.a,
            showInputs: !0,
            inputPlaceholder: u,
          })),
          (B[21] = Q),
          (B[22] = J),
          (B[23] = u),
          (B[24] = d),
          (B[25] = et),
          (B[26] = m))
        : (m = B[26]),
      B[27] !== z
        ? ((f = z("web.filters.volume_24h")), (B[27] = z), (B[28] = f))
        : (f = B[28]),
      B[29] !== z
        ? ((h = z("web.filters.range_placeholder_volume")),
          (B[29] = z),
          (B[30] = h))
        : (h = B[30]),
      B[31] !== f || B[32] !== h || B[33] !== el || B[34] !== ee || B[35] !== Y
        ? ((p = (0, t.jsx)(M, {
            label: f,
            min: Y,
            max: ee,
            step: j,
            value: el,
            onValueChange: ea,
            formatValue: g.a,
            showInputs: !0,
            inputPlaceholder: h,
          })),
          (B[31] = f),
          (B[32] = h),
          (B[33] = el),
          (B[34] = ee),
          (B[35] = Y),
          (B[36] = p))
        : (p = B[36]),
      B[37] !== en
        ? ((x = (0, t.jsx)(c.Z, {
            id: R,
            isChecked: en,
            onCheckedChange: ei,
            size: 18,
          })),
          (B[37] = en),
          (B[38] = x))
        : (x = B[38]),
      B[39] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)("span", {
            "aria-hidden": "true",
            className: "inline-flex shrink-0",
            children: (0, t.jsx)(v.f, { size: 14 }),
          })),
          (B[39] = y))
        : (y = B[39]),
      B[40] !== z
        ? ((_ = z("web.filters.verified_only")), (B[40] = z), (B[41] = _))
        : (_ = B[41]),
      B[42] !== _
        ? ((C = (0, t.jsxs)(c.Q, {
            className:
              "flex cursor-pointer select-none items-center gap-x-1.5 text-sm text-text-primary",
            htmlFor: R,
            children: [y, _],
          })),
          (B[42] = _),
          (B[43] = C))
        : (C = B[43]),
      B[44] !== z
        ? ((N = z("web.filters.verified_only_hint")), (B[44] = z), (B[45] = N))
        : (N = B[45]),
      B[46] !== N
        ? ((k = (0, t.jsx)("span", {
            className: "text-text-tertiary text-xs",
            children: N,
          })),
          (B[46] = N),
          (B[47] = k))
        : (k = B[47]),
      B[48] !== C || B[49] !== k
        ? ((S = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col gap-y-0.5",
            children: [C, k],
          })),
          (B[48] = C),
          (B[49] = k),
          (B[50] = S))
        : (S = B[50]),
      B[51] !== x || B[52] !== S
        ? ((E = (0, t.jsxs)("div", {
            className: "flex items-start gap-x-3",
            children: [x, S],
          })),
          (B[51] = x),
          (B[52] = S),
          (B[53] = E))
        : (E = B[53]),
      B[54] !== m || B[55] !== p || B[56] !== E
        ? ((T = (0, t.jsxs)("div", {
            className: "space-y-6",
            children: [m, p, E],
          })),
          (B[54] = m),
          (B[55] = p),
          (B[56] = E),
          (B[57] = T))
        : (T = B[57]),
      B[58] !== z
        ? ((A = z("common.clear")), (B[58] = z), (B[59] = A))
        : (A = B[59]),
      B[60] !== ed || B[61] !== A
        ? ((L = (0, t.jsx)(c.K, {
            onClick: ed,
            variant: "secondary",
            size: 36,
            children: A,
          })),
          (B[60] = ed),
          (B[61] = A),
          (B[62] = L))
        : (L = B[62]));
    let em = !eu;
    return (
      B[63] !== z
        ? ((I = z("web.common.apply")), (B[63] = z), (B[64] = I))
        : (I = B[64]),
      B[65] !== ec || B[66] !== em || B[67] !== I
        ? ((F = (0, t.jsx)(c.K, {
            onClick: ec,
            size: 36,
            isDisabled: em,
            children: I,
          })),
          (B[65] = ec),
          (B[66] = em),
          (B[67] = I),
          (B[68] = F))
        : (F = B[68]),
      B[69] !== L || B[70] !== F
        ? ((O = (0, t.jsxs)("div", {
            className: "flex gap-2 border-t border-border-secondary pt-2",
            children: [L, F],
          })),
          (B[69] = L),
          (B[70] = F),
          (B[71] = O))
        : (O = B[71]),
      B[72] !== T || B[73] !== O || B[74] !== o
        ? ((W = (0, t.jsxs)("div", { className: o, children: [T, O] })),
          (B[72] = T),
          (B[73] = O),
          (B[74] = o),
          (B[75] = W))
        : (W = B[75]),
      W
    );
  }
  var O = e.i(66732),
    W = e.i(441315),
    B = e.i(908163);
  let z = {
    always: "gap-2 px-3",
    "md-up": "gap-2 px-2.5 md:px-3",
    never: "w-8 gap-0 px-0",
  };
  function P(e) {
    let l,
      i,
      s,
      c,
      d,
      u,
      f,
      h,
      p,
      x,
      b,
      g,
      v,
      y = (0, r.c)(51),
      { t: w } = (0, n.f)(),
      {
        appliedMarketCapRange: j,
        appliedVolumeRange: _,
        appliedVerifiedOnly: C,
        handleApplyFilters: N,
        handleClearFilters: k,
        filterConstants: S,
        onFiltersChange: M,
        showLabel: E,
        labelKey: T,
        activeCount: A,
        hideLabelBelowMd: L,
        className: I,
        density: R,
      } = e,
      P = void 0 === E || E,
      V = void 0 === T ? "common.filter" : T,
      D = void 0 === A ? 0 : A,
      U = void 0 !== L && L,
      [$, H] = (0, a.useState)(!1);
    if (y[0] !== D || y[1] !== U || y[2] !== V || y[3] !== P || y[4] !== w)
      ((i = P ? (U ? "md-up" : "always") : "never"),
        (l =
          D > 0 ? w("web.home.filters_active_count_aria", { count: D }) : null),
        (s = (function ({
          mode: e,
          label: t,
          activeCountLabel: r,
          iconOnlyLabel: l,
        }) {
          return "never" === e
            ? l
            : "always" !== e
              ? r
                ? `${t}, ${r}`
                : t
              : void 0;
        })({
          mode: i,
          label: w(V),
          activeCountLabel: l,
          iconOnlyLabel: w("web.ui.filters"),
        })),
        (y[0] = D),
        (y[1] = U),
        (y[2] = V),
        (y[3] = P),
        (y[4] = w),
        (y[5] = l),
        (y[6] = i),
        (y[7] = s));
    else ((l = y[5]), (i = y[6]), (s = y[7]));
    let G = s;
    y[8] !== N || y[9] !== M
      ? ((c = (e) => {
          (N(e), M?.(), H(!1));
        }),
        (y[8] = N),
        (y[9] = M),
        (y[10] = c))
      : (c = y[10]);
    let K = c;
    y[11] !== k || y[12] !== M
      ? ((d = () => {
          (k(), M?.(), H(!1));
        }),
        (y[11] = k),
        (y[12] = M),
        (y[13] = d))
      : (d = y[13]);
    let q = d;
    y[14] !== I || y[15] !== R || y[16] !== i
      ? ((u = R
          ? (0, W.C)({
              density: R,
              interactive: !0,
              className: (0, m.c)("shrink-0", I),
            })
          : (0, m.c)(
              "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border-tertiary bg-transparent text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
              z[i],
              I,
            )),
        (y[14] = I),
        (y[15] = R),
        (y[16] = i),
        (y[17] = u))
      : (u = y[17]);
    let X = R ? "size-3.5" : "size-4";
    return (
      y[18] !== X
        ? ((f = (0, m.c)("shrink-0", X)), (y[18] = X), (y[19] = f))
        : (f = y[19]),
      y[20] !== f
        ? ((h = (0, t.jsx)(o.w3, { className: f })), (y[20] = f), (y[21] = h))
        : (h = y[21]),
      y[22] !== R || y[23] !== V || y[24] !== i || y[25] !== w
        ? ((p =
            "never" === i
              ? null
              : (0, t.jsx)("span", {
                  className: (0, m.c)(
                    R ? "text-xs leading-4 font-medium" : "text-sm font-medium",
                    "md-up" === i && "hidden md:inline",
                  ),
                  children: w(V),
                })),
          (y[22] = R),
          (y[23] = V),
          (y[24] = i),
          (y[25] = w),
          (y[26] = p))
        : (p = y[26]),
      y[27] !== D || y[28] !== l || y[29] !== R
        ? ((x = l
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  R
                    ? (0, t.jsx)(B.E, {
                        "aria-hidden": !0,
                        "data-testid": "filter-button-count",
                        density: R,
                        tone: "mint",
                        children: D,
                      })
                    : (0, t.jsx)("span", {
                        "aria-hidden": !0,
                        className:
                          "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-bg-accent px-1 text-[11px] font-bold tabular-nums text-bg-primary",
                        "data-testid": "filter-button-count",
                        children: D,
                      }),
                  (0, t.jsx)("span", {
                    className: "sr-only",
                    children: `, ${l}`,
                  }),
                ],
              })
            : null),
          (y[27] = D),
          (y[28] = l),
          (y[29] = R),
          (y[30] = x))
        : (x = y[30]),
      y[31] !== G || y[32] !== h || y[33] !== p || y[34] !== x || y[35] !== u
        ? ((b = (0, t.jsx)(O.J, {
            asChild: !0,
            children: (0, t.jsxs)("button", {
              type: "button",
              "aria-label": G,
              className: u,
              children: [h, p, x],
            }),
          })),
          (y[31] = G),
          (y[32] = h),
          (y[33] = p),
          (y[34] = x),
          (y[35] = u),
          (y[36] = b))
        : (b = y[36]),
      y[37] !== j ||
      y[38] !== C ||
      y[39] !== _ ||
      y[40] !== S.MARKET_CAP_MAX ||
      y[41] !== S.MARKET_CAP_MIN ||
      y[42] !== S.VOLUME_MAX ||
      y[43] !== S.VOLUME_MIN ||
      y[44] !== K ||
      y[45] !== q
        ? ((g = (0, t.jsx)(O.T, {
            align: "start",
            side: "bottom",
            className: "w-96 border-border-secondary bg-bg-secondary p-0",
            children: (0, t.jsx)(F, {
              marketCapRange: j,
              volumeRange: _,
              verifiedOnly: C,
              onApply: K,
              onClear: q,
              marketCapMin: S.MARKET_CAP_MIN,
              marketCapMax: S.MARKET_CAP_MAX,
              volumeMin: S.VOLUME_MIN,
              volumeMax: S.VOLUME_MAX,
            }),
          })),
          (y[37] = j),
          (y[38] = C),
          (y[39] = _),
          (y[40] = S.MARKET_CAP_MAX),
          (y[41] = S.MARKET_CAP_MIN),
          (y[42] = S.VOLUME_MAX),
          (y[43] = S.VOLUME_MIN),
          (y[44] = K),
          (y[45] = q),
          (y[46] = g))
        : (g = y[46]),
      y[47] !== $ || y[48] !== b || y[49] !== g
        ? ((v = (0, t.jsxs)(O.V, {
            open: $,
            onOpenChange: H,
            children: [b, g],
          })),
          (y[47] = $),
          (y[48] = b),
          (y[49] = g),
          (y[50] = v))
        : (v = y[50]),
      v
    );
  }
  var V = e.i(51206);
  function D(e) {
    let l,
      a,
      i,
      s = (0, r.c)(6),
      { t: c } = (0, n.f)();
    return (
      s[0] !== c
        ? ((l = c("web.home.feed_settings")), (s[0] = c), (s[1] = l))
        : (l = s[1]),
      s[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(o.xF, { "aria-hidden": !0 })), (s[2] = a))
        : (a = s[2]),
      s[3] !== e || s[4] !== l
        ? ((i = (0, t.jsx)(V._, {
            density: "comfortable",
            size: 32,
            variant: "ghost",
            "aria-label": l,
            ...e,
            children: a,
          })),
          (s[3] = e),
          (s[4] = l),
          (s[5] = i))
        : (i = s[5]),
      i
    );
  }
  function U(e) {
    let l,
      a,
      n,
      i = (0, r.c)(7);
    if (!(0, x.f)()) {
      let r;
      return (
        i[0] !== e
          ? ((r = (0, t.jsx)($, { ...e })), (i[0] = e), (i[1] = r))
          : (r = i[1]),
        r
      );
    }
    return (
      i[2] !== e.dockedFilter
        ? ((l = e.dockedFilter
            ? (0, t.jsx)("span", {
                className: "md:hidden",
                children: (0, t.jsx)(P, { ...e.dockedFilter }),
              })
            : null),
          (i[2] = e.dockedFilter),
          (i[3] = l))
        : (l = i[3]),
      i[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(p.S, {
            section: "feed",
            settingId: "feed.includeNsfw",
            trigger: (0, t.jsx)(D, {}),
            children: null,
          })),
          (i[4] = a))
        : (a = i[4]),
      i[5] !== l
        ? ((n = (0, t.jsxs)("span", {
            className: "inline-flex items-center gap-2",
            children: [l, a],
          })),
          (i[5] = l),
          (i[6] = n))
        : (n = i[6]),
      n
    );
  }
  function $(e) {
    let l,
      i,
      s,
      o,
      u,
      m,
      f,
      x,
      b,
      g,
      v,
      y = (0, r.c)(27),
      {
        includeNsfw: w,
        setIncludeNsfw: j,
        showAnimations: _,
        setShowAnimations: C,
        dockedFilter: N,
      } = e,
      k = void 0 === N ? null : N,
      { t: S } = (0, n.f)(),
      { homeLayout: M } = (0, d.e)(),
      [E, T] = (0, a.useState)(!1);
    return (
      y[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(O.J, { asChild: !0, children: (0, t.jsx)(D, {}) })),
          (y[0] = l))
        : (l = y[0]),
      y[1] !== k
        ? ((i = k
            ? (0, t.jsx)("div", {
                className:
                  "w-full border-b border-border-secondary pb-3 md:hidden",
                children: (0, t.jsx)(P, { ...k, showLabel: !0 }),
              })
            : null),
          (y[1] = k),
          (y[2] = i))
        : (i = y[2]),
      y[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)("div", {
            className: "w-full xl:hidden",
            children: (0, t.jsx)(h, { showTextLabels: !0 }),
          })),
          (y[3] = s))
        : (s = y[3]),
      y[4] !== w || y[5] !== j
        ? ((o = (0, t.jsx)(c.Z, {
            id: "nsfw",
            isChecked: w,
            onCheckedChange: j,
            size: 18,
          })),
          (y[4] = w),
          (y[5] = j),
          (y[6] = o))
        : (o = y[6]),
      y[7] !== S
        ? ((u = S("web.home.nsfw_label")), (y[7] = S), (y[8] = u))
        : (u = y[8]),
      y[9] !== u
        ? ((m = (0, t.jsx)(c.Q, {
            className: "cursor-pointer select-none text-white",
            htmlFor: "nsfw",
            children: u,
          })),
          (y[9] = u),
          (y[10] = m))
        : (m = y[10]),
      y[11] !== o || y[12] !== m
        ? ((f = (0, t.jsxs)("div", {
            className: "flex items-center gap-x-2",
            children: [o, m],
          })),
          (y[11] = o),
          (y[12] = m),
          (y[13] = f))
        : (f = y[13]),
      y[14] !== M || y[15] !== C || y[16] !== _ || y[17] !== S
        ? ((x =
            M === d.M.GRID &&
            (0, t.jsxs)("div", {
              className: "flex items-center gap-x-2",
              children: [
                (0, t.jsx)(c.Z, {
                  id: "animations",
                  isChecked: _,
                  onCheckedChange: C,
                  size: 18,
                }),
                (0, t.jsx)(c.Q, {
                  className: "cursor-pointer select-none text-white",
                  htmlFor: "animations",
                  children: S("web.home.animations_label"),
                }),
              ],
            })),
          (y[14] = M),
          (y[15] = C),
          (y[16] = _),
          (y[17] = S),
          (y[18] = x))
        : (x = y[18]),
      y[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((b = (0, t.jsx)(p.E, {
            section: "feed",
            onBeforeOpen: () => T(!1),
          })),
          (y[19] = b))
        : (b = y[19]),
      y[20] !== i || y[21] !== f || y[22] !== x
        ? ((g = (0, t.jsx)(O.T, {
            align: "start",
            side: "bottom",
            className:
              "w-max min-w-[260px] max-w-[calc(100vw-2rem)] border-border-secondary bg-bg-secondary p-3 xl:min-w-0",
            children: (0, t.jsxs)("div", {
              className: "flex flex-col gap-y-3",
              children: [i, s, f, x, b],
            }),
          })),
          (y[20] = i),
          (y[21] = f),
          (y[22] = x),
          (y[23] = g))
        : (g = y[23]),
      y[24] !== E || y[25] !== g
        ? ((v = (0, t.jsxs)(O.V, {
            open: E,
            onOpenChange: T,
            children: [l, g],
          })),
          (y[24] = E),
          (y[25] = g),
          (y[26] = v))
        : (v = y[26]),
      v
    );
  }
  var H = e.i(928529),
    G = e.i(642357),
    K = e.i(862507),
    q = e.i(538459),
    X = e.i(367310);
  function Z(e) {
    let l,
      i,
      s,
      c,
      d,
      f,
      h,
      p,
      x,
      b,
      g,
      v,
      y,
      w,
      j,
      _,
      C,
      N,
      k,
      S,
      M = (0, r.c)(58),
      { className: E } = e,
      { t: T } = (0, n.f)(),
      A = (0, q.N)(),
      L = (0, q.T)(),
      I = (0, X.E)(),
      R = (0, q.r)(),
      F = (0, q.E)(),
      O = (0, q.U)(),
      W = (0, q.X)(),
      B = L ?? A,
      z = "usdc" === B,
      P = z ? F : R,
      V = z ? W : O;
    M[0] !== P ? ((l = () => String(P)), (M[0] = P), (M[1] = l)) : (l = M[1]);
    let [D, U] = (0, a.useState)(l),
      $ = (0, a.useRef)(null);
    M[2] !== P || M[3] !== B
      ? ((i = { currency: B, amount: P }), (M[2] = P), (M[3] = B), (M[4] = i))
      : (i = M[4]);
    let [Z, J] = (0, a.useState)(i);
    ((Z.currency !== B || Z.amount !== P) &&
      (J({ currency: B, amount: P }), Number(D) !== P && U(String(P))),
      M[5] !== E
        ? ((s = (0, m.c)(
            "flex h-8 shrink-0 items-center gap-2 rounded-md border border-border-tertiary bg-transparent pl-3 pr-1 transition-colors focus-within:border-bg-accent",
            E,
          )),
          (M[5] = E),
          (M[6] = s))
        : (s = M[6]),
      M[7] !== T
        ? ((c = T("web.trade.quick_buy")), (M[7] = T), (M[8] = c))
        : (c = M[8]),
      M[9] !== c
        ? ((d = (0, t.jsx)("span", {
            className:
              "whitespace-nowrap text-sm font-medium text-text-tertiary",
            children: c,
          })),
          (M[9] = c),
          (M[10] = d))
        : (d = M[10]));
    let Q = z ? "USDC" : "SOL";
    (M[11] !== T || M[12] !== Q
      ? ((f = T("web.trade.quick_buy_amount_aria", { currency: Q })),
        (M[11] = T),
        (M[12] = Q),
        (M[13] = f))
      : (f = M[13]),
      M[14] !== V
        ? ((h = (e) => {
            let t = (function (e) {
              let [t, ...r] = e.replace(/[^0-9.]/g, "").split(".");
              return r.length ? `${t}.${r.join("")}` : t;
            })(e.target.value);
            U(t);
            let r = Number(t);
            Number.isFinite(r) && r > 0 && V(r);
          }),
          (M[14] = V),
          (M[15] = h))
        : (h = M[15]),
      M[16] !== P || M[17] !== B
        ? ((p = () => {
            $.current = { amount: P, currency: B };
          }),
          (M[16] = P),
          (M[17] = B),
          (M[18] = p))
        : (p = M[18]),
      M[19] !== P || M[20] !== B || M[21] !== D
        ? ((x = () => {
            (D && Number(D) > 0) || U(String(P));
            let e = $.current;
            (null !== e &&
              e.currency === B &&
              e.amount !== P &&
              (0, u.UJ)({
                type: "buy_amount",
                fromValues: [e.amount],
                toValues: [P],
                surface: "quick_trade",
              }),
              ($.current = null));
          }),
          (M[19] = P),
          (M[20] = B),
          (M[21] = D),
          (M[22] = x))
        : (x = M[22]),
      M[23] !== x || M[24] !== f || M[25] !== h || M[26] !== p || M[27] !== D
        ? ((b = (0, t.jsx)("input", {
            "aria-label": f,
            inputMode: "decimal",
            value: D,
            onChange: h,
            onFocus: p,
            onBlur: x,
            className:
              "w-12 bg-transparent text-right text-sm font-semibold tabular-nums text-text-primary outline-none",
          })),
          (M[23] = x),
          (M[24] = f),
          (M[25] = h),
          (M[26] = p),
          (M[27] = D),
          (M[28] = b))
        : (b = M[28]),
      M[29] !== b || M[30] !== d
        ? ((g = (0, t.jsxs)("label", {
            className: "flex cursor-text items-center gap-2",
            children: [d, b],
          })),
          (M[29] = b),
          (M[30] = d),
          (M[31] = g))
        : (g = M[31]),
      M[32] !== z || M[33] !== I
        ? ((v = () => I(!z)), (M[32] = z), (M[33] = I), (M[34] = v))
        : (v = M[34]));
    let Y = `Switch quick buy currency to ${z ? "SOL" : "USDC"}`,
      ee = `Switch quick buy currency to ${z ? "SOL" : "USDC"}`,
      et = G.H[B],
      er = z ? "USDC" : "SOL";
    return (
      M[35] !== et || M[36] !== er
        ? ((y = (0, t.jsx)(H.default, {
            src: et,
            alt: er,
            width: 16,
            height: 16,
            className: "size-4 shrink-0 rounded-full",
          })),
          (M[35] = et),
          (M[36] = er),
          (M[37] = y))
        : (y = M[37]),
      M[38] !== v || M[39] !== Y || M[40] !== ee || M[41] !== y
        ? ((w = (0, t.jsx)("button", {
            type: "button",
            onClick: v,
            "aria-label": Y,
            title: ee,
            className:
              "flex size-5 shrink-0 items-center justify-center rounded-full outline-none ring-offset-2 ring-offset-bg-primary transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-bg-accent",
            children: y,
          })),
          (M[38] = v),
          (M[39] = Y),
          (M[40] = ee),
          (M[41] = y),
          (M[42] = w))
        : (w = M[42]),
      M[43] !== g || M[44] !== w
        ? ((j = (0, t.jsxs)("span", {
            className: "flex items-center gap-1.5",
            children: [g, w],
          })),
          (M[43] = g),
          (M[44] = w),
          (M[45] = j))
        : (j = M[45]),
      M[46] !== T
        ? ((_ = T("web.trade.trade_settings")), (M[46] = T), (M[47] = _))
        : (_ = M[47]),
      M[48] !== T
        ? ((C = T("web.trade.trade_settings")), (M[48] = T), (M[49] = C))
        : (C = M[49]),
      M[50] === Symbol.for("react.memo_cache_sentinel")
        ? ((N = (0, t.jsx)(o.xF, { className: "size-4", "aria-hidden": !0 })),
          (M[50] = N))
        : (N = M[50]),
      M[51] !== _ || M[52] !== C
        ? ((k = (0, t.jsx)(K.C, {
            trigger: (0, t.jsx)("button", {
              type: "button",
              "aria-label": _,
              title: C,
              className:
                "flex size-7 shrink-0 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
              children: N,
            }),
          })),
          (M[51] = _),
          (M[52] = C),
          (M[53] = k))
        : (k = M[53]),
      M[54] !== j || M[55] !== k || M[56] !== s
        ? ((S = (0, t.jsxs)("div", { className: s, children: [j, k] })),
          (M[54] = j),
          (M[55] = k),
          (M[56] = s),
          (M[57] = S))
        : (S = M[57]),
      S
    );
  }
  var J = e.i(818724),
    Q = e.i(649927),
    Y = e.i(84121),
    ee = e.i(946129),
    et = e.i(148269),
    er = e.i(456753),
    el = e.i(187611),
    ea = e.i(583448),
    en = e.i(412237);
  function ei(e) {
    let l,
      a,
      n,
      i,
      s = (0, r.c)(12);
    s[0] !== e
      ? ((l = void 0 === e ? {} : e), (s[0] = e), (s[1] = l))
      : (l = s[1]);
    let { className: o } = l,
      c = void 0 === o ? "shrink-0" : o,
      { homeSort: d } = (0, ee.f)(),
      { homeChain: m, setHomeChain: f } = (0, Q.f)(),
      { setHomeOffset: h } = (0, Y.f)(),
      { generateNewSession: p, notifyPageOrFilterChange: x } = (0, er.j)();
    if (d !== et.E.FEATURED) return null;
    s[2] !== p || s[3] !== x || s[4] !== f || s[5] !== h
      ? ((a = (e) => {
          ((0, u.qm)({ status: "apply", filtersSet: { chain: e } }),
            f(e),
            h(0),
            (0, en.n)(),
            p(),
            x());
        }),
        (s[2] = p),
        (s[3] = x),
        (s[4] = f),
        (s[5] = h),
        (s[6] = a))
      : (a = s[6]);
    let b = a;
    return (
      s[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, el.G)("Filter coins by chain")), (s[7] = n))
        : (n = s[7]),
      s[8] !== c || s[9] !== b || s[10] !== m
        ? ((i = (0, t.jsx)(J.A, {
            value: m,
            onChange: b,
            options: ea.D,
            ariaLabel: n,
            className: c,
          })),
          (s[8] = c),
          (s[9] = b),
          (s[10] = m),
          (s[11] = i))
        : (i = s[11]),
      i
    );
  }
  function es(e) {
    let l,
      a,
      n,
      i,
      s,
      c,
      d,
      u = (0, r.c)(16),
      { label: m, value: f, onRemove: h, className: p } = e;
    (u[0] !== p
      ? ((l = (0, b.c)(
          "flex h-9 items-center rounded-full border border-primary/20 bg-bg-accent/10 py-1 pl-3 pr-1 text-xs text-primary",
          "transition-all duration-200 hover:border-primary/30 hover:bg-primary/15",
          "min-w-0 backdrop-blur-sm",
          p,
        )),
        (u[0] = p),
        (u[1] = l))
      : (l = u[1]),
      u[2] !== f
        ? ((a =
            void 0 === f
              ? null
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    ": ",
                    (0, t.jsx)("span", {
                      className: "font-normal",
                      children: f,
                    }),
                  ],
                })),
          (u[2] = f),
          (u[3] = a))
        : (a = u[3]),
      u[4] !== m || u[5] !== a
        ? ((n = (0, t.jsxs)("span", {
            className: "truncate font-medium",
            children: [m, a],
          })),
          (u[4] = m),
          (u[5] = a),
          (u[6] = n))
        : (n = u[6]),
      u[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, b.c)(
            "ml-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
            "bg-bg-accent/20 text-primary hover:bg-primary/30 hover:text-primary-foreground",
            "transition-all duration-200 hover:scale-110",
          )),
          (u[7] = i))
        : (i = u[7]));
    let x = `Remove ${m} filter`;
    return (
      u[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(o.x6, { className: "h-3 w-3" })), (u[8] = s))
        : (s = u[8]),
      u[9] !== h || u[10] !== x
        ? ((c = (0, t.jsx)("button", {
            className: i,
            onClick: h,
            "aria-label": x,
            children: s,
          })),
          (u[9] = h),
          (u[10] = x),
          (u[11] = c))
        : (c = u[11]),
      u[12] !== l || u[13] !== n || u[14] !== c
        ? ((d = (0, t.jsxs)("div", { className: l, children: [n, c] })),
          (u[12] = l),
          (u[13] = n),
          (u[14] = c),
          (u[15] = d))
        : (d = u[15]),
      d
    );
  }
  var eo = e.i(678700),
    ec = e.i(455418),
    ed = e.i(358893);
  let eu = () => {
    let e,
      t = (0, r.c)(6),
      l = (0, ed.M)(),
      a = (0, ed.O)(),
      { setHomeOffset: n } = (0, Y.f)(),
      { generateNewSession: i, notifyPageOrFilterChange: s } = (0, er.j)();
    return (
      t[0] !== i || t[1] !== l || t[2] !== s || t[3] !== n || t[4] !== a
        ? ((e = (e) => {
            e !== l &&
              ((0, u.qm)({ status: "apply", filtersSet: { include_nsfw: e } }),
              a(),
              n(0),
              (0, en.n)(),
              i(),
              s());
          }),
          (t[0] = i),
          (t[1] = l),
          (t[2] = s),
          (t[3] = n),
          (t[4] = a),
          (t[5] = e))
        : (e = t[5]),
      e
    );
  };
  var em = e.i(364043),
    ef = e.i(921999);
  function eh() {
    let e,
      l = (0, r.c)(1);
    return (0, s.G)(i.D.HOME_FEED_QUICK_BUY_V2)
      ? (l[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("div", {
              className: "order-first hidden shrink-0 items-center lg:flex",
              children: (0, t.jsx)(Z, {}),
            })),
            (l[0] = e))
          : (e = l[0]),
        e)
      : null;
  }
  function ep(e) {
    let l,
      i,
      s,
      o,
      c,
      d,
      u,
      f,
      p,
      x,
      b,
      g,
      v,
      y = (0, r.c)(64),
      { t: w } = (0, n.f)(),
      { className: j, showExploreFilterText: _, toolbarRowWidth: C } = e,
      N = void 0 !== _ && _,
      k = void 0 === C ? 1280 : C,
      { homeFeed: S } = (0, eo.N)(),
      { isSearchMode: M, searchTerm: E, handleClearSearch: T } = (0, ef.u)(),
      { setHomeOffset: A } = (0, Y.f)(),
      [L, I] = (0, ec.f)(),
      R = (0, ed.M)(),
      F = eu(),
      {
        appliedMarketCapRange: O,
        appliedVolumeRange: W,
        appliedVerifiedOnly: B,
        hasActiveFilters: z,
        hasMarketCapFilter: V,
        hasVolumeFilter: D,
        hasVerifiedFilter: $,
        handleApplyFilters: H,
        handleClearFilters: G,
        resetMarketCapFilter: K,
        resetVolumeFilter: q,
        resetVerifiedFilter: X,
        formatFilterValue: Z,
        constants: J,
      } = (0, em.f)();
    y[0] !== A
      ? ((l = () => {
          A(0);
        }),
        (y[0] = A),
        (y[1] = l))
      : (l = y[1]);
    let Q = l;
    y[2] !== Q || y[3] !== K
      ? ((i = () => {
          (K(), Q());
        }),
        (y[2] = Q),
        (y[3] = K),
        (y[4] = i))
      : (i = y[4]);
    let ee = i;
    y[5] !== Q || y[6] !== q
      ? ((s = () => {
          (q(), Q());
        }),
        (y[5] = Q),
        (y[6] = q),
        (y[7] = s))
      : (s = y[7]);
    let et = s;
    y[8] !== Q || y[9] !== X
      ? ((o = () => {
          (X(), Q());
        }),
        (y[8] = Q),
        (y[9] = X),
        (y[10] = o))
      : (o = y[10]);
    let er = o;
    y[11] !== k
      ? ((c =
          720 > Math.max(0, k - 12 - 360)
            ? { showLayoutTextLabels: !1 }
            : { showLayoutTextLabels: !0 }),
        (y[11] = k),
        (y[12] = c))
      : (c = y[12]);
    let { showLayoutTextLabels: el } = c,
      ea = S === eo.z.TERMINAL,
      en = ea && !M;
    y[13] !== O ||
    y[14] !== B ||
    y[15] !== W ||
    y[16] !== J ||
    y[17] !== H ||
    y[18] !== G ||
    y[19] !== Q ||
    y[20] !== en
      ? ((d = en
          ? {
              appliedMarketCapRange: O,
              appliedVolumeRange: W,
              appliedVerifiedOnly: B,
              handleApplyFilters: H,
              handleClearFilters: G,
              filterConstants: J,
              onFiltersChange: Q,
            }
          : null),
        (y[13] = O),
        (y[14] = B),
        (y[15] = W),
        (y[16] = J),
        (y[17] = H),
        (y[18] = G),
        (y[19] = Q),
        (y[20] = en),
        (y[21] = d))
      : (d = y[21]);
    let ep = d;
    return (
      y[22] !== j
        ? ((u = (0, m.c)(
            "flex min-w-0 max-w-full shrink-0 flex-wrap items-center justify-end gap-2",
            j,
          )),
          (y[22] = j),
          (y[23] = u))
        : (u = y[23]),
      y[24] !== T || y[25] !== M || y[26] !== ea || y[27] !== E || y[28] !== w
        ? ((f =
            ea &&
            M &&
            E?.trim() &&
            (0, t.jsx)(es, {
              label: w("web.explore.filter_search_label"),
              value: E.trim(),
              onRemove: T,
            })),
          (y[24] = T),
          (y[25] = M),
          (y[26] = ea),
          (y[27] = E),
          (y[28] = w),
          (y[29] = f))
        : (f = y[29]),
      y[30] !== O ||
      y[31] !== B ||
      y[32] !== W ||
      y[33] !== J ||
      y[34] !== Z ||
      y[35] !== H ||
      y[36] !== G ||
      y[37] !== z ||
      y[38] !== V ||
      y[39] !== $ ||
      y[40] !== D ||
      y[41] !== Q ||
      y[42] !== ee ||
      y[43] !== er ||
      y[44] !== et ||
      y[45] !== N ||
      y[46] !== en ||
      y[47] !== w
        ? ((p =
            en &&
            (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(ei, {}),
                z &&
                  (0, t.jsxs)("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                      V &&
                        (0, t.jsx)(es, {
                          label: w("common.market_cap_short"),
                          value: Z(O, "marketCap"),
                          onRemove: ee,
                        }),
                      D &&
                        (0, t.jsx)(es, {
                          label: w("web.explore.filter_vol_label"),
                          value: Z(W, "volume"),
                          onRemove: et,
                        }),
                      $ &&
                        (0, t.jsx)(es, {
                          label: w("web.filters.verified_only"),
                          onRemove: er,
                        }),
                    ],
                  }),
                (0, t.jsx)("div", {
                  className:
                    "hidden shrink-0 items-center gap-1 sm:mb-0 md:flex",
                  children: (0, t.jsx)(P, {
                    appliedMarketCapRange: O,
                    appliedVolumeRange: W,
                    appliedVerifiedOnly: B,
                    handleApplyFilters: H,
                    handleClearFilters: G,
                    filterConstants: J,
                    onFiltersChange: Q,
                    showLabel: N,
                  }),
                }),
              ],
            })),
          (y[30] = O),
          (y[31] = B),
          (y[32] = W),
          (y[33] = J),
          (y[34] = Z),
          (y[35] = H),
          (y[36] = G),
          (y[37] = z),
          (y[38] = V),
          (y[39] = $),
          (y[40] = D),
          (y[41] = Q),
          (y[42] = ee),
          (y[43] = er),
          (y[44] = et),
          (y[45] = N),
          (y[46] = en),
          (y[47] = w),
          (y[48] = p))
        : (p = y[48]),
      y[49] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, t.jsx)(a.Suspense, {
            fallback: null,
            children: (0, t.jsx)(eh, {}),
          })),
          (y[49] = x))
        : (x = y[49]),
      y[50] !== el
        ? ((b = (0, t.jsx)("div", {
            className: "hidden shrink-0 items-center xl:flex",
            children: (0, t.jsx)(h, { showTextLabels: el }),
          })),
          (y[50] = el),
          (y[51] = b))
        : (b = y[51]),
      y[52] !== ep || y[53] !== R || y[54] !== F || y[55] !== I || y[56] !== L
        ? ((g = (0, t.jsx)(U, {
            dockedFilter: ep,
            includeNsfw: R,
            setIncludeNsfw: F,
            setShowAnimations: I,
            showAnimations: L,
          })),
          (y[52] = ep),
          (y[53] = R),
          (y[54] = F),
          (y[55] = I),
          (y[56] = L),
          (y[57] = g))
        : (g = y[57]),
      y[58] !== p || y[59] !== b || y[60] !== g || y[61] !== u || y[62] !== f
        ? ((v = (0, t.jsxs)("div", {
            className: u,
            children: [f, p, x, b, g],
          })),
          (y[58] = p),
          (y[59] = b),
          (y[60] = g),
          (y[61] = u),
          (y[62] = f),
          (y[63] = v))
        : (v = y[63]),
      v
    );
  }
  var ex = e.i(458310);
  let eb = "storage",
    eg = (e) => `explore-board-moved:${e}`,
    ev = new Set(),
    ey = (e) => (
      window.addEventListener(eb, e),
      () => window.removeEventListener(eb, e)
    ),
    ew = () => !1,
    ej = {
      generic: "web.home.board_moved_generic",
      mayhem: "web.home.board_moved_mayhem",
      new: "web.home.board_moved_new",
    };
  function e_(e) {
    let l,
      i,
      s,
      c,
      d,
      m,
      f,
      h,
      p,
      x,
      b,
      g,
      v = (0, r.c)(27),
      { notice: y } = e,
      { t: w } = (0, n.f)();
    v[0] !== y.from
      ? ((l = () =>
          ((e) => {
            if (ev.has(e)) return !0;
            try {
              return "1" === window.localStorage.getItem(eg(e));
            } catch {
              return !1;
            }
          })(y.from)),
        (v[0] = y.from),
        (v[1] = l))
      : (l = v[1]);
    let j = (0, a.useSyncExternalStore)(ey, l, ew);
    if (
      (v[2] !== j || v[3] !== y.from
        ? ((i = () => {
            j || (0, u.ri)({ buttonId: `explore_board_moved:${y.from}` });
          }),
          (s = [j, y.from]),
          (v[2] = j),
          (v[3] = y.from),
          (v[4] = i),
          (v[5] = s))
        : ((i = v[4]), (s = v[5])),
      (0, a.useEffect)(i, s),
      j)
    )
      return null;
    v[6] !== y.from
      ? ((c = () => {
          var e = y.from;
          ev.add(e);
          try {
            window.localStorage.setItem(eg(e), "1");
          } catch {}
          (window.dispatchEvent(new StorageEvent(eb, { key: eg(e) })),
            (0, u.ri)({ buttonId: `explore_board_moved_dismiss:${y.from}` }));
        }),
        (v[6] = y.from),
        (v[7] = c))
      : (c = v[7]);
    let _ = c;
    v[8] === Symbol.for("react.memo_cache_sentinel")
      ? ((d = (0, t.jsx)(o.wB, {
          "aria-hidden": !0,
          className: "size-4 shrink-0 text-text-tertiary",
        })),
        (v[8] = d))
      : (d = v[8]);
    let C = ej[y.kind];
    return (
      v[9] !== w || v[10] !== C
        ? ((m = w(C)), (v[9] = w), (v[10] = C), (v[11] = m))
        : (m = v[11]),
      v[12] !== m
        ? ((f = (0, t.jsx)("span", {
            className: "min-w-0 truncate",
            children: m,
          })),
          (v[12] = m),
          (v[13] = f))
        : (f = v[13]),
      v[14] !== y.kind || v[15] !== w
        ? ((h =
            "mayhem" === y.kind
              ? (0, t.jsx)(ex.default, {
                  className:
                    "shrink-0 font-medium text-text-accent hover:underline",
                  href: "/mayhem",
                  children: w("web.home.board_moved_open_mayhem"),
                })
              : null),
          (v[14] = y.kind),
          (v[15] = w),
          (v[16] = h))
        : (h = v[16]),
      v[17] !== w
        ? ((p = w("common.dismiss")), (v[17] = w), (v[18] = p))
        : (p = v[18]),
      v[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, t.jsx)(o.x6, { "aria-hidden": !0, className: "size-3.5" })),
          (v[19] = x))
        : (x = v[19]),
      v[20] !== _ || v[21] !== p
        ? ((b = (0, t.jsx)("button", {
            "aria-label": p,
            className:
              "ml-auto inline-flex size-6 shrink-0 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
            onClick: _,
            type: "button",
            children: x,
          })),
          (v[20] = _),
          (v[21] = p),
          (v[22] = b))
        : (b = v[22]),
      v[23] !== b || v[24] !== f || v[25] !== h
        ? ((g = (0, t.jsxs)("div", {
            className:
              "flex h-9 min-w-0 items-center gap-2 rounded-lg border border-border-secondary bg-bg-secondary px-3 text-[13px] text-text-secondary",
            "data-testid": "explore-board-moved-notice",
            role: "status",
            children: [d, f, h, b],
          })),
          (v[23] = b),
          (v[24] = f),
          (v[25] = h),
          (v[26] = g))
        : (g = v[26]),
      g
    );
  }
  var eC = e.i(574472),
    eN = e.i(453706),
    ek = e.i(182303),
    eS = e.i(802763),
    eM = e.i(170450),
    eE = e.i(671722),
    eT = e.i(198825),
    eA = e.i(761234);
  function eL() {
    let e,
      l,
      a = (0, r.c)(11),
      { setHomeOffset: n } = (0, Y.f)(),
      {
        appliedMarketCapRange: i,
        appliedVolumeRange: s,
        appliedVerifiedOnly: o,
        handleApplyFilters: c,
        handleClearFilters: d,
        hasMarketCapFilter: u,
        hasVolumeFilter: m,
        hasVerifiedFilter: f,
        constants: h,
      } = (0, em.f)();
    a[0] !== n
      ? ((e = () => {
          n(0);
        }),
        (a[0] = n),
        (a[1] = e))
      : (e = a[1]);
    let p = e,
      x = Number(u) + Number(m) + Number(f);
    return (
      a[2] !== i ||
      a[3] !== o ||
      a[4] !== s ||
      a[5] !== h ||
      a[6] !== c ||
      a[7] !== d ||
      a[8] !== p ||
      a[9] !== x
        ? ((l = (0, t.jsx)(P, {
            activeCount: x,
            appliedMarketCapRange: i,
            appliedVerifiedOnly: o,
            appliedVolumeRange: s,
            density: eA.f,
            filterConstants: h,
            handleApplyFilters: c,
            handleClearFilters: d,
            hideLabelBelowMd: !0,
            labelKey: "web.ui.filters",
            onFiltersChange: p,
          })),
          (a[2] = i),
          (a[3] = o),
          (a[4] = s),
          (a[5] = h),
          (a[6] = c),
          (a[7] = d),
          (a[8] = p),
          (a[9] = x),
          (a[10] = l))
        : (l = a[10]),
      l
    );
  }
  var eI = e.i(640412);
  function eR() {
    let e,
      l,
      a,
      i,
      s,
      c,
      d,
      u,
      m,
      f,
      h,
      p = (0, r.c)(20),
      { t: x } = (0, n.f)(),
      b = (0, q.N)(),
      g = (0, q.r)(),
      v = (0, q.E)(),
      y = "usdc" === b,
      w = y ? v : g,
      j = y ? "USDC" : "SOL";
    return (
      p[0] !== x
        ? ((e = x("web.home.quick_buy_menu_aria")), (p[0] = x), (p[1] = e))
        : (e = p[1]),
      p[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, W.C)({
            density: eA.f,
            interactive: !0,
            className: "hidden shrink-0 lg:inline-flex",
          })),
          (p[2] = l))
        : (l = p[2]),
      p[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(o.$U, {
            "aria-hidden": !0,
            className: "size-3.5 shrink-0",
          })),
          (p[3] = a))
        : (a = p[3]),
      p[4] !== x
        ? ((i = x("web.trade.quick_buy")), (p[4] = x), (p[5] = i))
        : (i = p[5]),
      p[6] !== i
        ? ((s = (0, t.jsx)("span", { children: i })), (p[6] = i), (p[7] = s))
        : (s = p[7]),
      p[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "text-text-tertiary",
            children: "·",
          })),
          (p[8] = c))
        : (c = p[8]),
      p[9] !== w || p[10] !== j
        ? ((d = (0, t.jsxs)("span", {
            className: "tabular-nums text-text-primary",
            children: [w, " ", j],
          })),
          (p[9] = w),
          (p[10] = j),
          (p[11] = d))
        : (d = p[11]),
      p[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(o.vY, {
            "aria-hidden": !0,
            className: "size-3 shrink-0 text-text-quaternary",
          })),
          (p[12] = u))
        : (u = p[12]),
      p[13] !== e || p[14] !== s || p[15] !== d
        ? ((m = (0, t.jsx)(O.J, {
            asChild: !0,
            children: (0, t.jsxs)("button", {
              "aria-label": e,
              className: l,
              "data-testid": "explore-quick-buy-menu",
              type: "button",
              children: [a, s, c, d, u],
            }),
          })),
          (p[13] = e),
          (p[14] = s),
          (p[15] = d),
          (p[16] = m))
        : (m = p[16]),
      p[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = (0, t.jsx)(O.T, {
            align: "end",
            className: "w-auto rounded-xl p-2",
            side: "bottom",
            children: (0, t.jsx)(Z, {}),
          })),
          (p[17] = f))
        : (f = p[17]),
      p[18] !== m
        ? ((h = (0, t.jsxs)(O.V, { children: [m, f] })),
          (p[18] = m),
          (p[19] = h))
        : (h = p[19]),
      h
    );
  }
  function eF() {
    let e,
      l = (0, r.c)(1);
    return (0, s.G)(i.D.HOME_FEED_QUICK_BUY_V2)
      ? (l[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(eR, {})), (l[0] = e))
          : (e = l[0]),
        e)
      : null;
  }
  function eO() {
    let e,
      l = (0, r.c)(1);
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(a.Suspense, {
            fallback: null,
            children: (0, t.jsx)(eF, {}),
          })),
          (l[0] = e))
        : (e = l[0]),
      e
    );
  }
  function eW() {
    let e,
      l,
      a,
      i,
      s,
      u,
      m,
      f,
      p,
      x,
      b,
      g,
      v,
      y,
      w,
      j,
      _,
      C,
      N,
      k,
      S,
      M = (0, r.c)(51),
      { t: E } = (0, n.f)(),
      { homeLayout: T } = (0, d.e)(),
      A = (0, ed.M)(),
      L = eu(),
      [I, R] = (0, ec.f)(),
      F = T === d.M.GRID,
      B = F ? o.nF : o.cb;
    return (
      M[0] !== E
        ? ((e = E("web.home.view_menu")), (M[0] = E), (M[1] = e))
        : (e = M[1]),
      M[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, W.C)({
            density: eA.f,
            interactive: !0,
            className: "shrink-0",
          })),
          (M[2] = l))
        : (l = M[2]),
      M[3] !== B
        ? ((a = (0, t.jsx)(B, {
            "aria-hidden": !0,
            className: "size-3.5 shrink-0",
          })),
          (M[3] = B),
          (M[4] = a))
        : (a = M[4]),
      M[5] !== F || M[6] !== E
        ? ((i = E(F ? "web.home.layout_grid" : "web.home.layout_table")),
          (M[5] = F),
          (M[6] = E),
          (M[7] = i))
        : (i = M[7]),
      M[8] !== i
        ? ((s = (0, t.jsx)("span", { children: i })), (M[8] = i), (M[9] = s))
        : (s = M[9]),
      M[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(o.vY, {
            "aria-hidden": !0,
            className: "size-3 shrink-0 text-text-quaternary",
          })),
          (M[10] = u))
        : (u = M[10]),
      M[11] !== e || M[12] !== a || M[13] !== s
        ? ((m = (0, t.jsx)(O.J, {
            asChild: !0,
            children: (0, t.jsxs)("button", {
              "aria-label": e,
              className: l,
              "data-testid": "explore-view-menu",
              type: "button",
              children: [a, s, u],
            }),
          })),
          (M[11] = e),
          (M[12] = a),
          (M[13] = s),
          (M[14] = m))
        : (m = M[14]),
      M[15] !== E
        ? ((f = E("web.home.view_layout")), (M[15] = E), (M[16] = f))
        : (f = M[16]),
      M[17] !== f
        ? ((p = (0, t.jsx)("p", {
            className: "text-xs font-semibold text-text-tertiary",
            children: f,
          })),
          (M[17] = f),
          (M[18] = p))
        : (p = M[18]),
      M[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, t.jsx)(h, { showTextLabels: !0 })), (M[19] = x))
        : (x = M[19]),
      M[20] !== p
        ? ((b = (0, t.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [p, x],
          })),
          (M[20] = p),
          (M[21] = b))
        : (b = M[21]),
      M[22] !== A || M[23] !== L
        ? ((g = (0, t.jsx)(c.Z, {
            id: "explore-view-nsfw",
            isChecked: A,
            onCheckedChange: L,
            size: 18,
          })),
          (M[22] = A),
          (M[23] = L),
          (M[24] = g))
        : (g = M[24]),
      M[25] !== E
        ? ((v = E("web.home.nsfw_label")), (M[25] = E), (M[26] = v))
        : (v = M[26]),
      M[27] !== v
        ? ((y = (0, t.jsx)(c.Q, {
            className: "cursor-pointer select-none text-sm text-text-primary",
            htmlFor: "explore-view-nsfw",
            children: v,
          })),
          (M[27] = v),
          (M[28] = y))
        : (y = M[28]),
      M[29] !== E
        ? ((w = E("web.settings.feed.nsfw_description")),
          (M[29] = E),
          (M[30] = w))
        : (w = M[30]),
      M[31] !== w
        ? ((j = (0, t.jsx)("p", {
            className: "text-xs text-text-tertiary",
            children: w,
          })),
          (M[31] = w),
          (M[32] = j))
        : (j = M[32]),
      M[33] !== y || M[34] !== j
        ? ((_ = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col gap-0.5",
            children: [y, j],
          })),
          (M[33] = y),
          (M[34] = j),
          (M[35] = _))
        : (_ = M[35]),
      M[36] !== g || M[37] !== _
        ? ((C = (0, t.jsxs)("div", {
            className: "flex items-start gap-3",
            children: [g, _],
          })),
          (M[36] = g),
          (M[37] = _),
          (M[38] = C))
        : (C = M[38]),
      M[39] !== F || M[40] !== R || M[41] !== I || M[42] !== E
        ? ((N = F
            ? (0, t.jsxs)("div", {
                className: "flex items-start gap-3",
                children: [
                  (0, t.jsx)(c.Z, {
                    id: "explore-view-animations",
                    isChecked: I,
                    onCheckedChange: R,
                    size: 18,
                  }),
                  (0, t.jsxs)("div", {
                    className: "flex min-w-0 flex-col gap-0.5",
                    children: [
                      (0, t.jsx)(c.Q, {
                        className:
                          "cursor-pointer select-none text-sm text-text-primary",
                        htmlFor: "explore-view-animations",
                        children: E("web.home.animations_label"),
                      }),
                      (0, t.jsx)("p", {
                        className: "text-xs text-text-tertiary",
                        children: E("settings.animations_desc"),
                      }),
                    ],
                  }),
                ],
              })
            : null),
          (M[39] = F),
          (M[40] = R),
          (M[41] = I),
          (M[42] = E),
          (M[43] = N))
        : (N = M[43]),
      M[44] !== b || M[45] !== C || M[46] !== N
        ? ((k = (0, t.jsx)(O.T, {
            align: "end",
            className: "w-72 rounded-xl p-3",
            side: "bottom",
            children: (0, t.jsxs)("div", {
              className: "flex flex-col gap-4",
              children: [b, C, N],
            }),
          })),
          (M[44] = b),
          (M[45] = C),
          (M[46] = N),
          (M[47] = k))
        : (k = M[47]),
      M[48] !== k || M[49] !== m
        ? ((S = (0, t.jsxs)(O.V, { children: [m, k] })),
          (M[48] = k),
          (M[49] = m),
          (M[50] = S))
        : (S = M[50]),
      S
    );
  }
  let eB = (0, eN.default)(
    () => e.A(175745).then((e) => e.ExploreLensCustomizer),
    { loadableGenerated: { modules: [832557] }, ssr: !1 },
  );
  function ez(e) {
    let l,
      i,
      s,
      o,
      c,
      d,
      m,
      f,
      h,
      p,
      x,
      b,
      g,
      v = (0, r.c)(43),
      { timeframeSlot: y } = e,
      { t: w } = (0, n.f)(),
      { homeSort: j, setHomeSort: _ } = (0, ee.f)(),
      { homeFeed: C, setHomeFeed: N } = (0, eo.N)(),
      { setHomeOffset: k } = (0, Y.f)(),
      { isSearchMode: S, searchTerm: M, handleClearSearch: E } = (0, ef.u)(),
      { decodedJwt: T } = (0, eC.F)(),
      A = (0, eM.f)(),
      { setShowWallet: L } = (0, eT.useConnectWallet)(),
      { visibleBox: I, moreLensIds: R } = (0, eS.f)();
    v[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = { enabled: !0 }), (v[0] = l))
      : (l = v[0]);
    let { liveCount: F, callsCount: O } = (0, ek.n)(l),
      [W, B] = (0, a.useState)(!1),
      z = A && !!T?.address,
      P = C === eo.z.WATCHLIST;
    v[1] !== j || v[2] !== P
      ? ((i = P ? "watchlist" : ((0, eE.V)(j) ?? null)),
        (v[1] = j),
        (v[2] = P),
        (v[3] = i))
      : (i = v[3]);
    let V = i;
    v[4] !== C ||
    v[5] !== z ||
    v[6] !== N ||
    v[7] !== k ||
    v[8] !== _ ||
    v[9] !== L
      ? ((s = (e) => {
          let t = eE.M[e].target;
          "watchlist" === t.kind
            ? ((0, u.$j)({ toValue: "__watchlist__" }), z)
              ? (k(0), N(eo.z.WATCHLIST))
              : L(!0)
            : ((0, u.$j)({ toValue: t.sort }),
              k(0),
              C !== eo.z.TERMINAL && N(eo.z.TERMINAL),
              _(t.sort));
        }),
        (v[4] = C),
        (v[5] = z),
        (v[6] = N),
        (v[7] = k),
        (v[8] = _),
        (v[9] = L),
        (v[10] = s))
      : (s = v[10]);
    let D = s;
    v[11] === Symbol.for("react.memo_cache_sentinel")
      ? ((o = () => {
          ((0, u.ri)({ buttonId: "explore_lens_customizer_open" }), B(!0));
        }),
        (v[11] = o))
      : (o = v[11]);
    let U = o;
    v[12] !== M
      ? ((c = M?.trim() ?? ""), (v[12] = M), (v[13] = c))
      : (c = v[13]);
    let $ = c,
      H = S && "" !== $,
      G = !S && !P && j === et.E.FEATURED;
    return (
      v[14] !== V ||
      v[15] !== O ||
      v[16] !== E ||
      v[17] !== F ||
      v[18] !== R ||
      v[19] !== D ||
      v[20] !== G ||
      v[21] !== H ||
      v[22] !== w ||
      v[23] !== $ ||
      v[24] !== I
        ? ((d = H
            ? (0, t.jsx)(es, {
                label: w("web.explore.filter_search_label"),
                onRemove: E,
                value: $,
              })
            : (0, t.jsx)(eI.E, {
                activeLens: V,
                callsCount: O,
                lenses: I,
                liveCount: F,
                moreLenses: R,
                onCustomize: U,
                onSelect: D,
                trailing: G
                  ? (0, t.jsx)(ei, { className: "h-6 shrink-0 px-1.5" })
                  : void 0,
              })),
          (v[14] = V),
          (v[15] = O),
          (v[16] = E),
          (v[17] = F),
          (v[18] = R),
          (v[19] = D),
          (v[20] = G),
          (v[21] = H),
          (v[22] = w),
          (v[23] = $),
          (v[24] = I),
          (v[25] = d))
        : (d = v[25]),
      v[26] !== d || v[27] !== y
        ? ((m = (0, t.jsxs)("div", {
            className:
              "scrollbar-hide @container -my-1 flex min-w-0 flex-1 items-center gap-x-3 overflow-x-auto py-1",
            children: [d, y],
          })),
          (v[26] = d),
          (v[27] = y),
          (v[28] = m))
        : (m = v[28]),
      v[29] !== S || v[30] !== P
        ? ((f =
            S || P
              ? null
              : (0, t.jsxs)(t.Fragment, {
                  children: [(0, t.jsx)(eO, {}), (0, t.jsx)(eL, {})],
                })),
          (v[29] = S),
          (v[30] = P),
          (v[31] = f))
        : (f = v[31]),
      v[32] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (0, t.jsx)(eW, {})), (v[32] = h))
        : (h = v[32]),
      v[33] !== f
        ? ((p = (0, t.jsxs)("div", {
            className: "flex shrink-0 items-center gap-x-3",
            children: [f, h],
          })),
          (v[33] = f),
          (v[34] = p))
        : (p = v[34]),
      v[35] !== p || v[36] !== m
        ? ((x = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 items-center gap-x-3",
            children: [m, p],
          })),
          (v[35] = p),
          (v[36] = m),
          (v[37] = x))
        : (x = v[37]),
      v[38] !== W
        ? ((b = W ? (0, t.jsx)(eB, { onClose: () => B(!1) }) : null),
          (v[38] = W),
          (v[39] = b))
        : (b = v[39]),
      v[40] !== x || v[41] !== b
        ? ((g = (0, t.jsxs)(t.Fragment, { children: [x, b] })),
          (v[40] = x),
          (v[41] = b),
          (v[42] = g))
        : (g = v[42]),
      g
    );
  }
  e.i(751275);
  var eP = e.i(741430),
    eV = e.i(372550),
    eD = e.i(607122),
    eU = e.i(524517),
    e$ = e.i(722876),
    eH = e.i(530501),
    eG = e.i(346431),
    eK = e.i(965690);
  function eq() {
    let e,
      l,
      a,
      i,
      s,
      o,
      c,
      m,
      f,
      h,
      p,
      x,
      b,
      g,
      v,
      y,
      w = (0, r.c)(55),
      { t: j } = (0, n.f)(),
      { homeLayout: _ } = (0, d.e)(),
      { homeFeed: C } = (0, eo.N)(),
      { homeSort: N } = (0, ee.f)(),
      { setHomeOffset: k } = (0, Y.f)(),
      [S, M] = (0, e$.f)(),
      [E] = (0, eU.f)();
    if (
      w[0] !== C ||
      w[1] !== _ ||
      w[2] !== N ||
      w[3] !== E ||
      w[4] !== k ||
      w[5] !== M ||
      w[6] !== j ||
      w[7] !== S
    ) {
      x = Symbol.for("react.early_return_sentinel");
      e: {
        let r, n, b, g;
        if (
          (w[20] !== E
            ? ((r = E.trim()), (w[20] = E), (w[21] = r))
            : (r = w[21]),
          (l = (0, eH.n)({ sort: N, hasSearchTerm: "" !== r })),
          _ !== d.M.TABLE || C !== eo.z.TERMINAL)
        ) {
          x = null;
          break e;
        }
        a = j("web.home.window_calls_unsupported");
        let v = (e) => {
            ((0, u.ri)({ buttonId: `explore_window:${e}` }),
              l && (k(0), (0, en.n)()),
              M(e));
          },
          y = eK.D.filter((e) => !l || (0, eG.p)(e));
        ((f = "inline-flex shrink-0 items-center"),
          (h = "explore-window-control"),
          w[22] !== j
            ? ((n = j("web.leaderboard.time_window")), (w[22] = j), (w[23] = n))
            : (n = w[23]),
          w[24] !== S
            ? ((b = (0, el.T)(S, "unit-code")), (w[24] = S), (w[25] = b))
            : (b = w[25]),
          w[26] !== j
            ? ((g = (e) => ({
                value: e,
                label: j("web.home.window_aria", { window: e }),
              })),
              (w[26] = j),
              (w[27] = g))
            : (g = w[27]));
        let T = y.map(g);
        (w[28] !== v || w[29] !== n || w[30] !== b || w[31] !== T || w[32] !== S
          ? ((p = (0, t.jsx)("span", {
              className: "@[760px]:hidden",
              children: (0, t.jsx)(eV.f, {
                "aria-label": n,
                "data-testid": "explore-window-select",
                density: eA.f,
                label: b,
                onChange: v,
                options: T,
                value: S,
              }),
            })),
            (w[28] = v),
            (w[29] = n),
            (w[30] = b),
            (w[31] = T),
            (w[32] = S),
            (w[33] = p))
          : (p = w[33]),
          (m = "hidden @[760px]:inline-flex"),
          (e = eD.X),
          w[34] !== j
            ? ((i = j("web.leaderboard.time_window")), (w[34] = j), (w[35] = i))
            : (i = w[35]),
          (s = eA.f),
          (o = v),
          (c = eK.D.map((e) => {
            let r = l && !(0, eG.p)(e);
            return {
              value: e,
              disabled: r,
              disabledReason: r ? a : void 0,
              label: (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className: "tabular-nums",
                    "data-testid": `explore-window-${e}`,
                    children: e,
                  }),
                  (0, t.jsx)("span", {
                    className: "sr-only",
                    children: j("web.home.window_aria", { window: e }),
                  }),
                ],
              }),
            };
          })));
      }
      ((w[0] = C),
        (w[1] = _),
        (w[2] = N),
        (w[3] = E),
        (w[4] = k),
        (w[5] = M),
        (w[6] = j),
        (w[7] = S),
        (w[8] = e),
        (w[9] = l),
        (w[10] = a),
        (w[11] = i),
        (w[12] = s),
        (w[13] = o),
        (w[14] = c),
        (w[15] = m),
        (w[16] = f),
        (w[17] = h),
        (w[18] = p),
        (w[19] = x));
    } else
      ((e = w[8]),
        (l = w[9]),
        (a = w[10]),
        (i = w[11]),
        (s = w[12]),
        (o = w[13]),
        (c = w[14]),
        (m = w[15]),
        (f = w[16]),
        (h = w[17]),
        (p = w[18]),
        (x = w[19]));
    return x !== Symbol.for("react.early_return_sentinel")
      ? x
      : (w[36] !== e ||
        w[37] !== i ||
        w[38] !== s ||
        w[39] !== o ||
        w[40] !== c ||
        w[41] !== S
          ? ((b = (0, t.jsx)(e, {
              "aria-label": i,
              density: s,
              onValueChange: o,
              options: c,
              value: S,
            })),
            (w[36] = e),
            (w[37] = i),
            (w[38] = s),
            (w[39] = o),
            (w[40] = c),
            (w[41] = S),
            (w[42] = b))
          : (b = w[42]),
        w[43] !== l || w[44] !== a
          ? ((g = l
              ? (0, t.jsx)("span", { className: "sr-only", children: a })
              : null),
            (w[43] = l),
            (w[44] = a),
            (w[45] = g))
          : (g = w[45]),
        w[46] !== g || w[47] !== m || w[48] !== b
          ? ((v = (0, t.jsxs)("span", { className: m, children: [b, g] })),
            (w[46] = g),
            (w[47] = m),
            (w[48] = b),
            (w[49] = v))
          : (v = w[49]),
        w[50] !== v || w[51] !== f || w[52] !== h || w[53] !== p
          ? ((y = (0, t.jsxs)("span", {
              className: f,
              "data-testid": h,
              children: [p, v],
            })),
            (w[50] = v),
            (w[51] = f),
            (w[52] = h),
            (w[53] = p),
            (w[54] = y))
          : (y = w[54]),
        y);
  }
  var eX = e.i(157633),
    eZ = e.i(56267),
    eJ = e.i(590757),
    eQ = e.i(513466);
  let eY = "__watchlist__",
    e0 = (e) => [
      {
        icon: { fill: eX.tZ, line: o.tZ },
        label: e("home.movers.title"),
        value: et.E.FEATURED,
      },
      {
        icon: { fill: eX.Ip, line: o.Ip },
        label: e("common.new"),
        value: et.E.NEWEST,
      },
      {
        icon: { fill: eX.HU, line: o.HU },
        label: e("web.home.tab_custom_pairs"),
        value: et.E.CUSTOM_PAIRS,
      },
      {
        icon: { fill: eX.cJ, line: o.cJ },
        label: e("web.home.tab_charities"),
        value: et.E.CHARITY,
      },
      {
        icon: { fill: eX.oX, line: o.oX },
        label: e("search.sort_options.market_cap"),
        value: et.E.MARKET_CAP,
      },
      {
        icon: { fill: eX.s6, line: o.s6 },
        label: e("web.home.tab_oldest"),
        value: et.E.OLDEST,
      },
      {
        icon: { fill: eX.zF, line: o.zF },
        label: e("web.home.tab_last_trade"),
        value: et.E.TRADE,
      },
    ];
  function e1(e) {
    let l,
      a,
      n,
      i = (0, r.c)(9),
      { tab: s, isActive: o, glyphClassName: c } = e,
      d = void 0 === c ? "size-3.5 shrink-0" : c,
      u = o ? s.icon.fill : s.icon.line,
      m = o ? "fill" : "line";
    return (
      i[0] !== u || i[1] !== d
        ? ((l = (0, t.jsx)(u, { className: d })),
          (i[0] = u),
          (i[1] = d),
          (i[2] = l))
        : (l = i[2]),
      i[3] !== m || i[4] !== l
        ? ((a = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "inline-flex shrink-0",
            "data-glyph": m,
            children: l,
          })),
          (i[3] = m),
          (i[4] = l),
          (i[5] = a))
        : (a = i[5]),
      i[6] !== a || i[7] !== s.label
        ? ((n = (0, t.jsxs)("span", {
            className: "inline-flex items-center gap-1.5",
            children: [a, s.label],
          })),
          (i[6] = a),
          (i[7] = s.label),
          (i[8] = n))
        : (n = i[8]),
      n
    );
  }
  function e2(e) {
    let l,
      i,
      s,
      c,
      d,
      m,
      f,
      h,
      p,
      x,
      g,
      v,
      y,
      w,
      j,
      _,
      C,
      N,
      k,
      S,
      M,
      E = (0, r.c)(62),
      { onExploreToolbarFit: T } = e,
      { t: A } = (0, n.f)(),
      { homeSort: L, setHomeSort: I } = (0, ee.f)(),
      { homeFeed: R, setHomeFeed: F } = (0, eo.N)(),
      { setHomeOffset: O } = (0, Y.f)(),
      { decodedJwt: W } = (0, eC.F)(),
      B = (0, eM.f)(),
      z = B && !!W?.address,
      { isSearchMode: P } = (0, ef.u)(),
      V = B && P;
    if (E[0] !== z || E[1] !== V || E[2] !== A) {
      let e = V
        ? [
            {
              icon: { fill: eX.WW, line: o.WW },
              label: A("web.home.tab_closest_match"),
              value: et.E.CLOSEST_MATCH,
            },
            ...e0(A),
          ]
        : e0(A);
      ((l = z
        ? [
            ...e,
            {
              icon: { fill: eX.G3, line: o.G3 },
              label: A("home.tabs.watchlist"),
              value: eY,
            },
          ]
        : e),
        (E[0] = z),
        (E[1] = V),
        (E[2] = A),
        (E[3] = l));
    } else l = E[3];
    let D = l,
      U = (0, a.useRef)(null),
      $ = (0, a.useRef)(null),
      H = (0, a.useRef)(null);
    E[4] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = new Map()), (E[4] = i))
      : (i = E[4]);
    let G = (0, a.useRef)(i),
      K = (0, a.useRef)(null);
    E[5] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = new Map()), (E[5] = s))
      : (s = E[5]);
    let q = (0, a.useRef)(s),
      [X, Z] = (0, a.useState)(!1),
      [J, Q] = (0, a.useState)(D.length),
      [er, el] = (0, a.useState)(null),
      [ea, en] = (0, a.useState)(!1),
      ei = (0, a.useRef)(0),
      es = R === eo.z.WATCHLIST,
      ec = es ? eY : L,
      [ed, eu] = (0, a.useOptimistic)(ec);
    (E[6] !== B || E[7] !== z || E[8] !== es || E[9] !== F
      ? ((c = () => {
          B && es && !z && F(eo.z.TERMINAL);
        }),
        (d = [B, es, z, F]),
        (E[6] = B),
        (E[7] = z),
        (E[8] = es),
        (E[9] = F),
        (E[10] = c),
        (E[11] = d))
      : ((c = E[10]), (d = E[11])),
      (0, a.useEffect)(c, d),
      E[12] !== D
        ? ((m = (e) => {
            let t = 2;
            for (let e = 0; e < D.length; e++) {
              let r = 4 * (e > 0);
              t += (q.current.get(D[e].value) ?? 0) + r;
            }
            if (t <= e) return D.length;
            let r = 2,
              l = 0,
              a = e - 90 - 4;
            for (let e of D) {
              let t = 4 * (l > 0),
                n = (q.current.get(e.value) ?? 0) + t;
              if (r + n > a) break;
              ((r += n), l++);
            }
            return Math.max(1, l);
          }),
          (E[12] = D),
          (E[13] = m))
        : (m = E[13]));
    let em = m;
    (E[14] !== em
      ? ((f = () => {
          let e = $.current,
            t = U.current;
          if (!e || !t) return;
          for (let t of e.querySelectorAll("[data-measure-tab]")) {
            let e = t.getAttribute("data-measure-tab");
            q.current.set(e, t.offsetWidth);
          }
          let r = t.offsetWidth;
          ((ei.current = r), Q(em(r)), Z(!0));
        }),
        (E[14] = em),
        (E[15] = f))
      : (f = E[15]),
      E[16] !== D || E[17] !== em
        ? ((h = [em, D]), (E[16] = D), (E[17] = em), (E[18] = h))
        : (h = E[18]),
      (0, a.useEffect)(f, h),
      E[19] !== em || E[20] !== X
        ? ((x = () => {
            let e = U.current;
            if (!e || !X) return;
            let t = new ResizeObserver((e) => {
              let t = e[0]?.contentRect.width;
              null != t && ((ei.current = t), Q(em(t)));
            });
            return (t.observe(e), () => t.disconnect());
          }),
          (p = [em, X]),
          (E[19] = em),
          (E[20] = X),
          (E[21] = p),
          (E[22] = x))
        : ((p = E[21]), (x = E[22])),
      (0, a.useEffect)(x, p),
      E[23] !== D.length ||
      E[24] !== em ||
      E[25] !== T ||
      E[26] !== X ||
      E[27] !== J
        ? ((g = () => {
            if (!X) return;
            let e = ei.current,
              t = J >= D.length,
              r = e > 0 && em(Math.max(0, e - 56)) >= D.length,
              l = window.setTimeout(() => {
                T?.({ allTabsOnBar: t, roomForFilterText: r });
              }, 120);
            return () => window.clearTimeout(l);
          }),
          (v = [X, J, D.length, T, em]),
          (E[23] = D.length),
          (E[24] = em),
          (E[25] = T),
          (E[26] = X),
          (E[27] = J),
          (E[28] = g),
          (E[29] = v))
        : ((g = E[28]), (v = E[29])),
      (0, a.useEffect)(g, v));
    let eh = D.slice(J);
    E[30] !== ed
      ? ((y = (e) => e.value === ed), (E[30] = ed), (E[31] = y))
      : (y = E[31]);
    let ep = eh.some(y);
    ((0, a.useLayoutEffect)(() => {
      let e;
      if (!X) return;
      let t = H.current;
      if (!t) return;
      if (!(e = ep ? K.current : (G.current.get(ed) ?? null)))
        return void el(null);
      let r = t.getBoundingClientRect(),
        l = e.getBoundingClientRect();
      (el({ left: l.left - r.left - t.clientLeft, width: l.width }),
        ea ||
          requestAnimationFrame(() => {
            en(!0);
          }));
    }, [ed, X, J, ep, ea]),
      E[32] !== R || E[33] !== F || E[34] !== O || E[35] !== I || E[36] !== eu
        ? ((w = function (e) {
            ((0, u.$j)({ toValue: e }),
              (0, a.startTransition)(() => {
                (eu(e),
                  O(0),
                  e === eY
                    ? F(eo.z.WATCHLIST)
                    : (R !== eo.z.TERMINAL && F(eo.z.TERMINAL), I(e)));
              }));
          }),
          (E[32] = R),
          (E[33] = F),
          (E[34] = O),
          (E[35] = I),
          (E[36] = eu),
          (E[37] = w))
        : (w = E[37]));
    let ex = w;
    (E[38] !== D ? ((j = D.map(e3)), (E[38] = D), (E[39] = j)) : (j = E[39]),
      E[40] !== j
        ? ((_ = (0, t.jsx)("div", {
            ref: $,
            "aria-hidden": !0,
            className:
              "pointer-events-none invisible absolute left-0 top-0 flex gap-1 p-1",
            children: j,
          })),
          (E[40] = j),
          (E[41] = _))
        : (_ = E[41]));
    let eb = eQ.i,
      eg = eQ.U;
    (E[42] !== ea || E[43] !== er
      ? ((C =
          er &&
          (0, t.jsx)("div", {
            className: (0, b.c)(
              "pointer-events-none absolute left-0 rounded bg-bg-accent will-change-transform",
              ea &&
                "md:transition-[transform,width] md:duration-200 md:ease-out",
            ),
            style: {
              width: er.width,
              top: 1,
              bottom: 1,
              transform: `translateX(${er.left}px)`,
            },
          })),
        (E[42] = ea),
        (E[43] = er),
        (E[44] = C))
      : (C = E[44]),
      E[45] !== D || E[46] !== ed || E[47] !== J
        ? ((N = D.map((e, r) =>
            (0, t.jsx)(
              eQ.k,
              {
                className: (0, b.c)(
                  "relative z-10 rounded px-3 py-1 text-sm font-medium text-text-tertiary transition-colors duration-200 data-[state=active]:text-bg-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=inactive]:hover:bg-bg-tertiary data-[state=inactive]:hover:text-text-primary",
                  r >= J && "hidden",
                ),
                ref: (t) => {
                  t ? G.current.set(e.value, t) : G.current.delete(e.value);
                },
                value: e.value,
                children: (0, t.jsx)(e1, { isActive: e.value === ed, tab: e }),
              },
              e.value,
            ),
          )),
          (E[45] = D),
          (E[46] = ed),
          (E[47] = J),
          (E[48] = N))
        : (N = E[48]));
    let ev =
      eh.length > 0
        ? (0, t.jsxs)(eJ.G, {
            modal: !1,
            children: [
              (0, t.jsx)(eJ.X, {
                asChild: !0,
                children: (0, t.jsxs)("button", {
                  className: (0, b.c)(
                    "relative z-10 inline-flex h-7 items-center gap-1 rounded px-3 text-sm font-medium transition-colors duration-200",
                    ep
                      ? "text-bg-primary"
                      : "text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary",
                  ),
                  "data-testid": "explore-sort-more",
                  ref: K,
                  type: "button",
                  children: [
                    A("common.more"),
                    (0, t.jsx)(eZ.o, { className: "size-3.5" }),
                  ],
                }),
              }),
              (0, t.jsx)(eJ.L, {
                align: "end",
                children: eh.map((e) =>
                  (0, t.jsx)(
                    eJ.r,
                    {
                      className: (0, b.c)(
                        "cursor-pointer px-3 py-2 text-sm",
                        e.value === ed &&
                          "bg-bg-tertiary font-medium text-text-primary",
                      ),
                      onClick: () => ex(e.value),
                      children: (0, t.jsx)(e1, {
                        glyphClassName: "size-4 shrink-0",
                        isActive: e.value === ed,
                        tab: e,
                      }),
                    },
                    e.value,
                  ),
                ),
              }),
            ],
          })
        : null;
    return (
      E[49] !== eg || E[50] !== C || E[51] !== N || E[52] !== ev
        ? ((k = (0, t.jsxs)(eg, {
            className:
              "relative h-auto w-auto justify-start gap-1 rounded-md border border-border-tertiary bg-transparent p-px text-text-tertiary",
            "data-testid": "explore-sort-tabs",
            ref: H,
            children: [C, N, ev],
          })),
          (E[49] = eg),
          (E[50] = C),
          (E[51] = N),
          (E[52] = ev),
          (E[53] = k))
        : (k = E[53]),
      E[54] !== eb || E[55] !== ex || E[56] !== k || E[57] !== ed
        ? ((S = (0, t.jsx)("div", {
            children: (0, t.jsx)(eb, {
              onValueChange: ex,
              value: ed,
              children: k,
            }),
          })),
          (E[54] = eb),
          (E[55] = ex),
          (E[56] = k),
          (E[57] = ed),
          (E[58] = S))
        : (S = E[58]),
      E[59] !== _ || E[60] !== S
        ? ((M = (0, t.jsxs)("div", {
            className: "relative min-h-0 min-w-0 w-full flex-1 overflow-hidden",
            ref: U,
            children: [_, S],
          })),
          (E[59] = _),
          (E[60] = S),
          (E[61] = M))
        : (M = E[61]),
      M
    );
  }
  function e3(e) {
    return (0, t.jsx)(
      "div",
      {
        className: "whitespace-nowrap rounded px-3 py-1 text-sm font-medium",
        "data-measure-tab": e.value,
        children: (0, t.jsx)(e1, { isActive: !1, tab: e }),
      },
      e.value,
    );
  }
  var e4 = e.i(786147);
  let e5 = "/explore";
  function e6() {
    let e,
      a,
      i,
      s,
      o,
      c,
      d,
      u,
      m = (0, r.c)(21),
      { t: f } = (0, n.f)(),
      h = (0, l.usePathname)(),
      { homeSort: p, legacyNotice: x } = (0, ee.f)(),
      { homeFeed: b } = (0, eo.N)(),
      { isSearchMode: g } = (0, ef.u)(),
      [v] = (0, e$.f)();
    if (h !== e5) return null;
    let y = b === eo.z.WATCHLIST ? "watchlist" : (0, eE.V)(p),
      w = y ? eE.M[y].descriptionKey : void 0;
    return (
      m[0] !== f
        ? ((e = f("web.home.explore_coins")), (m[0] = f), (m[1] = e))
        : (e = m[1]),
      m[2] !== e
        ? ((a = (0, t.jsx)("h1", {
            className: "font-medium text-xl text-text-primary",
            children: e,
          })),
          (m[2] = e),
          (m[3] = a))
        : (a = m[3]),
      m[4] !== w || m[5] !== g || m[6] !== f || m[7] !== v
        ? ((i = w && !g ? (0, e4.f)(f, w, { window: v }) : null),
          (m[4] = w),
          (m[5] = g),
          (m[6] = f),
          (m[7] = v),
          (m[8] = i))
        : (i = m[8]),
      m[9] !== i
        ? ((s = (0, t.jsx)("p", {
            className:
              "min-h-[18px] text-[13px] leading-[18px] text-text-tertiary",
            "data-testid": "explore-lens-description",
            children: i,
          })),
          (m[9] = i),
          (m[10] = s))
        : (s = m[10]),
      m[11] !== a || m[12] !== s
        ? ((o = (0, t.jsxs)("div", {
            className: "flex flex-col gap-0.5 pt-3",
            children: [a, s],
          })),
          (m[11] = a),
          (m[12] = s),
          (m[13] = o))
        : (o = m[13]),
      m[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsx)("div", {
            className:
              "sticky top-[var(--layout-top-offset,68px)] z-[15] flex min-w-0 items-center gap-x-3 bg-bg-primary pt-0.5 pb-2",
            children: (0, t.jsx)(ez, { timeframeSlot: (0, t.jsx)(eq, {}) }),
          })),
          (m[14] = c))
        : (c = m[14]),
      m[15] !== g || m[16] !== x
        ? ((d = x && !g ? (0, t.jsx)(e_, { notice: x }) : null),
          (m[15] = g),
          (m[16] = x),
          (m[17] = d))
        : (d = m[17]),
      m[18] !== o || m[19] !== d
        ? ((u = (0, t.jsxs)(t.Fragment, { children: [o, c, d] })),
          (m[18] = o),
          (m[19] = d),
          (m[20] = u))
        : (u = m[20]),
      u
    );
  }
  function e7() {
    let e,
      i,
      s,
      o,
      c,
      d,
      u,
      m,
      f,
      h = (0, r.c)(15),
      { t: p } = (0, n.f)(),
      x = (0, l.usePathname)(),
      b = (0, a.useRef)(null),
      [g, v] = (0, a.useState)(1280),
      [y, w] = (0, a.useState)(!1);
    h[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = (e) => {
          w((t) => !!e.allTabsOnBar && (!!t || e.roomForFilterText));
        }),
        (h[0] = e))
      : (e = h[0]);
    let j = e;
    h[1] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = () => {
          let e = b.current;
          e && v(e.getBoundingClientRect().width);
        }),
        (h[1] = i))
      : (i = h[1]);
    let _ = i;
    return (h[2] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = () => {
          let e = b.current;
          if (!e || "u" < typeof ResizeObserver) return;
          _();
          let t = new ResizeObserver(() => {
            _();
          });
          return (
            t.observe(e),
            () => {
              t.disconnect();
            }
          );
        }),
        (o = [_]),
        (h[2] = s),
        (h[3] = o))
      : ((s = h[2]), (o = h[3])),
    (0, a.useLayoutEffect)(s, o),
    x !== e5)
      ? null
      : (h[4] !== p
          ? ((c = p("web.home.explore_coins")), (h[4] = p), (h[5] = c))
          : (c = h[5]),
        h[6] !== c
          ? ((d = (0, t.jsx)("div", {
              className: "pt-3",
              children: (0, t.jsx)("h1", {
                className: "font-medium text-xl text-text-primary",
                children: c,
              }),
            })),
            (h[6] = c),
            (h[7] = d))
          : (d = h[7]),
        h[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)("div", {
              className: "flex min-w-0 flex-1",
              children: (0, t.jsx)(e2, { onExploreToolbarFit: j }),
            })),
            (h[8] = u))
          : (u = h[8]),
        h[9] !== y || h[10] !== g
          ? ((m = (0, t.jsxs)("div", {
              ref: b,
              className:
                "sticky top-[var(--layout-top-offset)] z-[15] flex min-w-0 items-center gap-x-3 bg-bg-primary pt-0.5 pb-2",
              children: [
                u,
                (0, t.jsx)(ep, {
                  showExploreFilterText: y,
                  toolbarRowWidth: g,
                }),
              ],
            })),
            (h[9] = y),
            (h[10] = g),
            (h[11] = m))
          : (m = h[11]),
        h[12] !== d || h[13] !== m
          ? ((f = (0, t.jsxs)(t.Fragment, { children: [d, m] })),
            (h[12] = d),
            (h[13] = m),
            (h[14] = f))
          : (f = h[14]),
        f);
  }
  e.s(
    [
      "DiscoveryTabFilters",
      0,
      function (e) {
        let l,
          a = (0, r.c)(2),
          { variant: n } = e;
        if ("social-terminal" === (void 0 === n ? eP.f : n)) {
          let e;
          return (
            a[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsx)(e6, {})), (a[0] = e))
              : (e = a[0]),
            e
          );
        }
        return (
          a[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, t.jsx)(e7, {})), (a[1] = l))
            : (l = a[1]),
          l
        );
      },
    ],
    75099,
  );
};
