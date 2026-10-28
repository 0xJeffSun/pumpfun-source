// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(352386),
    r = e.i(940721),
    a = e.i(148269),
    s = e.i(678700),
    l = e.i(84121),
    o = e.i(946129),
    c = e.i(524517),
    d = e.i(456753);
  let u = (0, i.createContext)(null);
  function m(e) {
    return e + 1;
  }
  function f(e) {
    return e + 1;
  }
  e.s([
    "M",
    0,
    function (e) {
      let p,
        h,
        g,
        y,
        x,
        v,
        b,
        _,
        w,
        I,
        j,
        E,
        k,
        N = (0, n.c)(53),
        { children: S } = e,
        { notifyPageOrFilterChange: C } = (0, d.j)(),
        { rawHomeSort: U, setHomeSort: R, setRawHomeSort: P } = (0, o.f)(),
        { setHomeOffset: L } = (0, l.f)(),
        { homeFeed: A, setHomeFeed: T } = (0, s.N)(),
        [O, z] = (0, c.f)(),
        [B, F] = (0, i.useState)(!!O),
        [D, $] = (0, i.useState)(!1),
        [K, V] = (0, i.useState)(0);
      N[0] !== U ? ((p = (0, a.H)(U)), (N[0] = U), (N[1] = p)) : (p = N[1]);
      let M = (0, i.useRef)(p),
        H = (0, i.useRef)(null);
      (N[2] !== B ||
      N[3] !== U ||
      N[4] !== O ||
      N[5] !== T ||
      N[6] !== L ||
      N[7] !== R
        ? ((h = () => {
            O && O !== H.current
              ? ((H.current = O),
                B ||
                  ((M.current = (0, a.H)(U)),
                  F(!0),
                  R(r.P),
                  L(0),
                  T(s.z.TERMINAL)),
                V(f))
              : !O && H.current && (H.current = null);
          }),
          (g = [O, U, R, L, T, B]),
          (N[2] = B),
          (N[3] = U),
          (N[4] = O),
          (N[5] = T),
          (N[6] = L),
          (N[7] = R),
          (N[8] = h),
          (N[9] = g))
        : ((h = N[8]), (g = N[9])),
        (0, i.useEffect)(h, g),
        N[10] !== B || N[11] !== U || N[12] !== L || N[13] !== R || N[14] !== z
          ? ((y = (e) => {
              B ||
                ((M.current = (0, a.H)(U)), F(!0), R(r.P), L(0), z(e.trim()));
            }),
            (N[10] = B),
            (N[11] = U),
            (N[12] = L),
            (N[13] = R),
            (N[14] = z),
            (N[15] = y))
          : (y = N[15]));
      let W = y;
      N[16] !== B || N[17] !== R || N[18] !== P || N[19] !== z
        ? ((x = (e) => {
            B &&
              ($(!1),
              F(!1),
              e?.skipSortReset ||
                (e?.sort ? R(e.sort) : P((0, a.D)(M.current))),
              z(null));
          }),
          (N[16] = B),
          (N[17] = R),
          (N[18] = P),
          (N[19] = z),
          (N[20] = x))
        : (x = N[20]);
      let X = x;
      N[21] !== W || N[22] !== B || N[23] !== O || N[24] !== L
        ? ((v = (e) => {
            (L(0), B && O.trim() === e.trim()) ? V(m) : W(e);
          }),
          (N[21] = W),
          (N[22] = B),
          (N[23] = O),
          (N[24] = L),
          (N[25] = v))
        : (v = N[25]);
      let Q = v;
      N[26] !== C || N[27] !== T
        ? ((b = () => {
            (C(), T(s.z.TERMINAL));
          }),
          (N[26] = C),
          (N[27] = T),
          (N[28] = b))
        : (b = N[28]);
      let q = b;
      N[29] !== X || N[30] !== L
        ? ((_ = () => {
            (L(0), X());
          }),
          (N[29] = X),
          (N[30] = L),
          (N[31] = _))
        : (_ = N[31]);
      let G = _;
      N[32] !== A || N[33] !== T
        ? ((w = () => {
            ($(!1), A === s.z.WATCHLIST && T(s.z.TERMINAL));
          }),
          (N[32] = A),
          (N[33] = T),
          (N[34] = w))
        : (w = N[34]);
      let J = w;
      (N[35] !== X
        ? ((j = () => {
            let e = () => {
              X();
            };
            return (
              window.addEventListener("exit-search", e),
              () => {
                window.removeEventListener("exit-search", e);
              }
            );
          }),
          (I = [X]),
          (N[35] = X),
          (N[36] = I),
          (N[37] = j))
        : ((I = N[36]), (j = N[37])),
        (0, i.useEffect)(j, I),
        N[38] !== G ||
        N[39] !== W ||
        N[40] !== X ||
        N[41] !== Q ||
        N[42] !== q ||
        N[43] !== J ||
        N[44] !== B ||
        N[45] !== K ||
        N[46] !== O ||
        N[47] !== z ||
        N[48] !== D
          ? ((E = {
              handleExitSearchMode: X,
              handleEnterSearchMode: W,
              handleFetchCoinsOnSearch: Q,
              setSearchTerm: z,
              searchTerm: O,
              searchRefetchTrigger: K,
              handleSearchCallback: q,
              handleClearSearch: G,
              shouldTriggerSearch: D,
              setShouldTriggerSearch: $,
              handleSearchTriggered: J,
              isSearchMode: B,
              setIsSearchMode: F,
              sortBeforeSearch: M,
            }),
            (N[38] = G),
            (N[39] = W),
            (N[40] = X),
            (N[41] = Q),
            (N[42] = q),
            (N[43] = J),
            (N[44] = B),
            (N[45] = K),
            (N[46] = O),
            (N[47] = z),
            (N[48] = D),
            (N[49] = E))
          : (E = N[49]));
      let Y = E;
      return (
        N[50] !== S || N[51] !== Y
          ? ((k = (0, t.jsx)(u.Provider, { value: Y, children: S })),
            (N[50] = S),
            (N[51] = Y),
            (N[52] = k))
          : (k = N[52]),
        k
      );
    },
    "u",
    0,
    () => {
      let e = (0, i.useContext)(u);
      if (!e) throw Error("useSearch must be used within a SearchProvider");
      return e;
    },
  ]);
};
