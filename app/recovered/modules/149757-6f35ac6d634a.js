// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(92245),
    l = e.i(545063),
    a = e.i(352386),
    n = e.i(213618),
    i = e.i(690877),
    s = e.i(536925),
    o = e.i(759257);
  let u = async (e, t) => {
    let r = await (0, o.j)()("GET /users/mention-candidates", {
      query: { searchTerm: e, limit: 10 },
      signal: t,
      credentials: "include",
    });
    return Array.isArray(r) ? r : [];
  };
  var d = e.i(314012);
  e.s(
    [
      "f",
      0,
      (e) => {
        let o,
          c,
          m,
          f,
          p,
          h,
          y,
          g,
          x,
          I,
          v,
          w,
          b,
          A,
          N,
          k,
          C = (0, t.c)(44),
          { content: E, setContent: _ } = e,
          R = (0, l.U)();
        C[0] !== R ? ((o = (0, r.$)(R)), (C[0] = R), (C[1] = o)) : (o = C[1]);
        let T = !!o;
        C[2] !== R
          ? ((c = (e) => (0, r.Z)(R, e.userId) || (0, r.Z)(R, e.walletAddress)),
            (C[2] = R),
            (C[3] = c))
          : (c = C[3]);
        let j = c;
        C[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = []), (C[4] = m))
          : (m = C[4]);
        let [F, P] = (0, a.useState)(m);
        if (C[5] !== E || C[6] !== F) {
          let e;
          (C[8] !== E
            ? ((e = (e) => (0, d.s)(E, e.username)), (C[8] = E), (C[9] = e))
            : (e = C[9]),
            (f = F.filter(e)),
            (C[5] = E),
            (C[6] = F),
            (C[7] = f));
        } else f = C[7];
        let D = f;
        (D.length !== F.length && P(D),
          C[10] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = { start: 0, end: 0 }), (C[10] = p))
            : (p = C[10]));
        let [S, q] = (0, a.useState)(p),
          L = (0, a.useRef)(null),
          M = (0, a.useRef)(null);
        (C[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = () => {
              let e = M.current,
                t = L.current;
              null !== e &&
                t &&
                ((M.current = null), t.focus(), t.setSelectionRange(e, e));
            }),
            (C[11] = h))
          : (h = C[11]),
          C[12] !== E ? ((y = [E]), (C[12] = E), (C[13] = y)) : (y = C[13]),
          (0, a.useEffect)(h, y),
          C[14] !== E || C[15] !== S.end || C[16] !== S.start
            ? ((g = S.start === S.end ? (0, d.N)(E, S.start) : null),
              (C[14] = E),
              (C[15] = S.end),
              (C[16] = S.start),
              (C[17] = g))
            : (g = C[17]));
        let B = g,
          $ = (0, d.j)(E, D) < d.P,
          O = null !== B && $,
          U = B ? B.query : "",
          Q = $ && T;
        C[18] !== Q || C[19] !== U
          ? ((x = { searchTerm: U, enabled: Q }),
            (C[18] = Q),
            (C[19] = U),
            (C[20] = x))
          : (x = C[20]);
        let K = ((e) => {
          let r,
            l,
            a,
            o,
            d = (0, t.c)(9),
            { searchTerm: c, enabled: m } = e,
            [f] = (0, s.r)(c, 250);
          d[0] !== f
            ? ((r = f.slice(0, 50)), (d[0] = f), (d[1] = r))
            : (r = d[1]);
          let p = r;
          return (
            d[2] !== p
              ? ((l = ["users", "mention-candidates", p]),
                (a = (e) => {
                  let { signal: t } = e;
                  return u(p, t);
                }),
                (d[2] = p),
                (d[3] = l),
                (d[4] = a))
              : ((l = d[3]), (a = d[4])),
            d[5] !== m || d[6] !== l || d[7] !== a
              ? ((o = {
                  queryKey: l,
                  queryFn: a,
                  enabled: m,
                  staleTime: 3e4,
                  placeholderData: n.y,
                  refetchOnWindowFocus: !1,
                }),
                (d[5] = m),
                (d[6] = l),
                (d[7] = a),
                (d[8] = o))
              : (o = d[8]),
            (0, i.useQuery)(o)
          );
        })(x);
        C[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((I = []), (C[21] = I))
          : (I = C[21]);
        let z = I;
        if (O && K.data) {
          let e;
          if (C[22] !== K.data || C[23] !== j) {
            let t;
            (C[25] !== j
              ? ((t = (e) => !j(e)), (C[25] = j), (C[26] = t))
              : (t = C[26]),
              (e = K.data.filter(t)),
              (C[22] = K.data),
              (C[23] = j),
              (C[24] = e));
          } else e = C[24];
          z = e;
        }
        C[27] !== B || C[28] !== $ || C[29] !== E || C[30] !== _
          ? ((v = (e) => {
              if (!B || !$) return;
              let { username: t } = e,
                r = E.slice(0, B.start),
                l = E.slice(B.end);
              _(`${r}@${t} ${l}`);
              let a = B.start + t.length + 2;
              ((M.current = a),
                q({ start: a, end: a }),
                P((r) =>
                  r.some((t) => t.userId === e.userId)
                    ? r
                    : [...r, { userId: e.userId, username: t }],
                ));
            }),
            (C[27] = B),
            (C[28] = $),
            (C[29] = E),
            (C[30] = _),
            (C[31] = v))
          : (v = C[31]);
        let V = v;
        C[32] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = (e) => {
              L.current = e;
              let t = { start: e.selectionStart, end: e.selectionEnd };
              q((e) => (e.start === t.start && e.end === t.end ? e : t));
            }),
            (C[32] = w))
          : (w = C[32]);
        let W = w;
        C[33] !== _
          ? ((b = (e) => {
              (W(e.target), _(e.target.value));
            }),
            (C[33] = _),
            (C[34] = b))
          : (b = C[34]);
        let Z = b;
        C[35] === Symbol.for("react.memo_cache_sentinel")
          ? ((A = (e) => {
              W(e.currentTarget);
            }),
            (C[35] = A))
          : (A = C[35]);
        let G = A;
        C[36] !== D
          ? ((N = (e) => (0, d.k)(e, D)), (C[36] = D), (C[37] = N))
          : (N = C[37]);
        let Y = N;
        return (
          C[38] !== Z ||
          C[39] !== O ||
          C[40] !== V ||
          C[41] !== Y ||
          C[42] !== z
            ? ((k = {
                suggestions: z,
                isPicking: O,
                selectSuggestion: V,
                handleChange: Z,
                handleSelect: G,
                serialize: Y,
              }),
              (C[38] = Z),
              (C[39] = O),
              (C[40] = V),
              (C[41] = Y),
              (C[42] = z),
              (C[43] = k))
            : (k = C[43]),
          k
        );
      },
    ],
    149757,
  );
};
