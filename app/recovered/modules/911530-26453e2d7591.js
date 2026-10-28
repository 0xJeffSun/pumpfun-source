// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(426091),
    l = e.i(365089);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(790948),
    o = e.i(21094),
    c = e.i(478783),
    d = e.i(595673),
    m = e.i(786740);
  e.s(
    [
      "f",
      0,
      function (e) {
        let h,
          u,
          f,
          x,
          p = (0, n.c)(28),
          { t: g } = (0, a.f)(),
          {
            mintAddress: b,
            className: v,
            variant: w,
            label: y,
            name: j,
            symbol: _,
          } = e,
          C = void 0 === w ? "stub" : w;
        if (p[0] !== b || p[1] !== j || p[2] !== _) {
          var N;
          let e, t, n;
          ((N = { mintAddress: b, name: j, symbol: _ }),
            (e = (0, o.f)(N.symbol ?? "").trim()),
            (t = (N.name ?? "").trim()),
            (n = (0, o.f)(t).toLowerCase() === e.toLowerCase()),
            (h = [
              { kind: "address", value: N.mintAddress },
              ...("" === t || n ? [] : [{ kind: "name", value: t }]),
              ...("" !== e ? [{ kind: "ticker", value: e }] : []),
            ]),
            (p[0] = b),
            (p[1] = j),
            (p[2] = _),
            (p[3] = h));
        } else h = p[3];
        let k = h,
          L = "address" !== C && k.length > 1;
        p[4] !== b
          ? ((u = async () => {
              (await (0, m.d)(b), (0, d.Lg)({ mint: b }));
            }),
            (p[4] = b),
            (p[5] = u))
          : (u = p[5]);
        let S = u,
          P = L ? void 0 : S;
        if ("address" === C) {
          let e, n, r, a;
          return (
            p[6] !== g
              ? ((e = g("coin_details.actions.copy_contract_address")),
                (p[6] = g),
                (p[7] = e))
              : (e = p[7]),
            p[8] !== v
              ? ((n = (0, i.c)(
                  "shrink-0 whitespace-nowrap rounded-sm font-mono text-xs font-normal leading-5 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
                  v,
                )),
                (p[8] = v),
                (p[9] = n))
              : (n = p[9]),
            p[10] !== b
              ? ((r = (0, l.J)(b)), (p[10] = b), (p[11] = r))
              : (r = p[11]),
            p[12] !== S || p[13] !== e || p[14] !== n || p[15] !== r
              ? ((a = (0, t.jsx)("button", {
                  type: "button",
                  onClick: S,
                  "aria-label": e,
                  "data-testid": "copy-ca-button",
                  className: n,
                  children: r,
                })),
                (p[12] = S),
                (p[13] = e),
                (p[14] = n),
                (p[15] = r),
                (p[16] = a))
              : (a = p[16]),
            a
          );
        }
        p[17] !== v ||
        p[18] !== y ||
        p[19] !== b ||
        p[20] !== P ||
        p[21] !== g ||
        p[22] !== C
          ? ((f =
              "glyph" === C
                ? (0, t.jsx)("button", {
                    type: "button",
                    onClick: P,
                    "aria-label": y ?? g("web.coin.copy_mint_address"),
                    "data-testid": "copy-ca-glyph",
                    className: (0, i.c)(c.t, v),
                    children: (0, t.jsx)(r.xR, { className: c.v }),
                  })
                : (0, t.jsxs)("button", {
                    type: "button",
                    onClick: P,
                    "aria-label": y ?? g("web.coin.copy_mint_address"),
                    "data-testid": "copy-ca-button",
                    className: (0, i.c)(
                      "inline-flex items-center gap-1 text-xs font-normal leading-4 text-text-tertiary transition-colors hover:text-text-primary",
                      v,
                    ),
                    children: [
                      (0, t.jsx)(r.xR, { className: "size-3 shrink-0" }),
                      b.slice(0, 6),
                    ],
                  })),
            (p[17] = v),
            (p[18] = y),
            (p[19] = b),
            (p[20] = P),
            (p[21] = g),
            (p[22] = C),
            (p[23] = f))
          : (f = p[23]);
        let $ = f;
        return L
          ? (p[24] !== $ || p[25] !== S || p[26] !== k
              ? ((x = (0, t.jsx)(s.f, {
                  entries: k,
                  onCopyAddress: S,
                  trigger: $,
                })),
                (p[24] = $),
                (p[25] = S),
                (p[26] = k),
                (p[27] = x))
              : (x = p[27]),
            x)
          : $;
      },
    ],
    911530,
  );
};
