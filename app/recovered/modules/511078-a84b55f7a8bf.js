// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(352386),
    r = e.i(313986);
  let n = [
      1632, 1776, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3664,
      3792, 3872, 4160, 6112, 6160, 65296,
    ],
    i = (e) =>
      e
        .replace(/\p{Nd}/gu, (e) => {
          let t = e.codePointAt(0) ?? 0;
          if (t >= 48 && t <= 57) return e;
          let l = n.find((e) => t >= e && t <= e + 9);
          return void 0 === l ? "" : String(t - l);
        })
        .replace(/\D/g, ""),
    a = /^-?\d+(?:\.\d+)?e[+-]?\d+$/i;
  function s(e) {
    let t = e.trim();
    if (a.test(t)) {
      let e = Number(t);
      return Number.isFinite(e) ? e : null;
    }
    let l = i(e);
    if ("" === l) return null;
    let r = Number(l);
    return Number.isFinite(r) ? r : null;
  }
  let o = (e) =>
      Number.isFinite(e)
        ? ((e) => {
            let t = e.trim();
            if (!/[Ee]/.test(t)) return t;
            let l = t.match(/^([+-]?)(\d+)(?:\.(\d+))?[Ee]([+-]?\d+)$/);
            if (!l) return t;
            let [, r, n, i = "", a] = l,
              s = Number.parseInt(a, 10),
              o = n + i,
              c = n.length + s;
            return c <= 0
              ? `${r}0.${"0".repeat(-c)}${o}`.replace(/\.$/, "")
              : c >= o.length
                ? `${r}${o}${"0".repeat(c - o.length)}`
                : `${r}${o.slice(0, c)}.${o.slice(c)}`;
          })(String(Math.round(e)))
        : "",
    c = (e, t) => {
      let l = s(e);
      if (null == l) return "";
      let r = Math.round(l);
      return r <= 0 ? "" : t(r);
    };
  function d(e, t) {
    let l = i(t);
    if ("" === l) return "";
    let r = Number(l),
      n = "sl" === e ? 99 : 1e5;
    return r > n ? String(n) : l;
  }
  function u(e, t, l) {
    let n = s(t);
    if (null === n) return "";
    let i = (0, r.s)(l, "sl" === e ? -n : n);
    return null === i ? "" : String(Math.min(i, 1e14));
  }
  function m(e, t) {
    let l = s(e);
    if (null === l || l <= 0) return "";
    let n = (0, r.l)(l, t);
    return null === n ? "" : String(Math.abs(n));
  }
  let f = (e) => (Number.isFinite(e) && e > 0 ? e : null);
  function x(e) {
    let t;
    return null == (t = s(e)) ? "" : o(t);
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          a,
          h,
          p,
          g,
          b,
          v,
          y,
          _,
          j,
          w,
          N = (0, t.c)(44),
          { kind: k, liveMcapUsd: S, formatWholeUsd: C } = e,
          [M, I] = (0, l.useState)("percent"),
          [P, E] = (0, l.useState)(""),
          [A, $] = (0, l.useState)(""),
          [T, R] = (0, l.useState)(!1),
          [U, D] = (0, l.useState)(!1),
          [F, L] = (0, l.useState)(100),
          [B, O] = (0, l.useState)(null),
          [q, z] = (0, l.useState)(!1);
        if (q) {
          let e = f(S);
          null !== e && (O(e), z(!1));
        }
        N[0] !== M || N[1] !== C || N[2] !== S || N[3] !== P
          ? ((n = (e) => {
              e !== M &&
                ("mcap" === e ? E((e) => c(e, C)) : $(m(P, S)), D(!1), I(e));
            }),
            (N[0] = M),
            (N[1] = C),
            (N[2] = S),
            (N[3] = P),
            (N[4] = n))
          : (n = N[4]);
        let K = n;
        N[5] !== M || N[6] !== k || N[7] !== S
          ? ((a = (e) => {
              if ("percent" === M) {
                let t = d(k, e);
                ($(t), E(u(k, t, S)));
              } else {
                let t;
                E("" === (t = i(e)) ? "" : Number(t) > 1e14 ? String(1e14) : t);
              }
              (O(f(S)), z(!1), D(!1));
            }),
            (N[5] = M),
            (N[6] = k),
            (N[7] = S),
            (N[8] = a))
          : (a = N[8]);
        let V = a;
        N[9] !== M
          ? ((h = () => {
              (R(!0), "mcap" === M && E(x));
            }),
            (N[9] = M),
            (N[10] = h))
          : (h = N[10]);
        let Q = h;
        N[11] !== M || N[12] !== C
          ? ((p = () => {
              (R(!1), D(!0), "mcap" === M && E((e) => c(e, C)));
            }),
            (N[11] = M),
            (N[12] = C),
            (N[13] = p))
          : (p = N[13]);
        let H = p;
        N[14] !== M || N[15] !== C || N[16] !== T || N[17] !== k || N[18] !== S
          ? ((g = (e) => {
              let t = (0, r.s)(S, e);
              if (null !== t) {
                if ("percent" === M) {
                  let t = d(k, String(Math.abs(e)));
                  ($(t), E(u(k, t, S)));
                } else E(T ? o(t) : C(t));
                (O(f(S)), z(!1), D(!1));
              }
            }),
            (N[14] = M),
            (N[15] = C),
            (N[16] = T),
            (N[17] = k),
            (N[18] = S),
            (N[19] = g))
          : (g = N[19]);
        let W = g;
        N[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = () => {
              D(!0);
            }),
            (N[20] = b))
          : (b = N[20]);
        let Y = b;
        N[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((v = () => {
              (E(""), $(""), O(null), z(!1), D(!1));
            }),
            (N[21] = v))
          : (v = N[21]);
        let X = v;
        N[22] === Symbol.for("react.memo_cache_sentinel")
          ? ((y = () => {
              (X(), I("percent"), L(100));
            }),
            (N[22] = y))
          : (y = N[22]);
        let G = y;
        N[23] !== C || N[24] !== S
          ? ((_ = (e) => {
              let t = String(Math.round(e.mcapUsd));
              (I("mcap"), E(c(t, C)), $(m(t, S)));
              let l = f(S);
              (O(l), z(null === l), L(e.sellPercent), D(!1));
            }),
            (N[23] = C),
            (N[24] = S),
            (N[25] = _))
          : (_ = N[25]);
        let J = _;
        return (
          N[26] !== P ? ((j = s(P)), (N[26] = P), (N[27] = j)) : (j = N[27]),
          N[28] !== W ||
          N[29] !== M ||
          N[30] !== H ||
          N[31] !== V ||
          N[32] !== Q ||
          N[33] !== U ||
          N[34] !== T ||
          N[35] !== k ||
          N[36] !== P ||
          N[37] !== A ||
          N[38] !== B ||
          N[39] !== J ||
          N[40] !== F ||
          N[41] !== K ||
          N[42] !== j
            ? ((w = {
                kind: k,
                entryMode: M,
                mcapValue: P,
                mcapUsd: j,
                referenceMcapUsd: B,
                percentValue: A,
                isFocused: T,
                isErrorRevealed: U,
                sellPercent: F,
                setSellPercent: L,
                setEntryMode: K,
                handleChangeText: V,
                handleFocus: Q,
                handleBlur: H,
                applyPresetPercent: W,
                revealError: Y,
                clear: X,
                reset: G,
                seed: J,
              }),
              (N[28] = W),
              (N[29] = M),
              (N[30] = H),
              (N[31] = V),
              (N[32] = Q),
              (N[33] = U),
              (N[34] = T),
              (N[35] = k),
              (N[36] = P),
              (N[37] = A),
              (N[38] = B),
              (N[39] = J),
              (N[40] = F),
              (N[41] = K),
              (N[42] = j),
              (N[43] = w))
            : (w = N[43]),
          w
        );
      },
    ],
    511078,
  );
  var h = e.i(695705);
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          n,
          i,
          a,
          s = (0, t.c)(18),
          { order: o, draft: c, coveragePercent: d } = e,
          [u, m] = (0, l.useState)(null);
        (s[0] !== u?.orderId || s[1] !== d || s[2] !== c || s[3] !== o
          ? ((r = () => {
              if (null == o) return void m(null);
              if (u?.orderId === o.orderId) return;
              if ((0, h.D)(o.status)) return void m(null);
              let e = (0, h.A)(o);
              if (null == e || null == d || d > 100) return void m(null);
              let t = Math.min(100, Math.max(1, Math.round(d))),
                l = Math.round(e);
              (c.seed({ mcapUsd: l, sellPercent: t }),
                m({ orderId: o.orderId, mcapUsd: l, sellPercent: t }));
            }),
            (s[0] = u?.orderId),
            (s[1] = d),
            (s[2] = c),
            (s[3] = o),
            (s[4] = r))
          : (r = s[4]),
          s[5] !== u || s[6] !== d || s[7] !== c || s[8] !== o
            ? ((n = [o, c, d, u]),
              (s[5] = u),
              (s[6] = d),
              (s[7] = c),
              (s[8] = o),
              (s[9] = n))
            : (n = s[9]),
          (0, l.useEffect)(r, n),
          s[10] !== u || s[11] !== d || s[12] !== o
            ? ((i =
                null != u &&
                null != o &&
                u.orderId === o.orderId &&
                !(0, h.D)(o.status) &&
                !(null != d && d > 100)),
              (s[10] = u),
              (s[11] = d),
              (s[12] = o),
              (s[13] = i))
            : (i = s[13]));
        let f = i,
          x =
            f &&
            null != u &&
            (c.mcapUsd !== u.mcapUsd || c.sellPercent !== u.sellPercent);
        return (
          s[14] !== u || s[15] !== x || s[16] !== f
            ? ((a = { baseline: u, isEditable: f, isEditDirty: x }),
              (s[14] = u),
              (s[15] = x),
              (s[16] = f),
              (s[17] = a))
            : (a = s[17]),
          a
        );
      },
    ],
    927608,
  );
};
