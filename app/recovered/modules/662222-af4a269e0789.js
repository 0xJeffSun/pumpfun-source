// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(436057);
  e.i(84455);
  var i = e.i(540805),
    s = e.i(908163),
    n = e.i(257505),
    o = e.i(917341),
    d = e.i(267146),
    c = e.i(338319);
  let u = ["home.gacha"];
  e.s([
    "f",
    0,
    function (e) {
      let p,
        m,
        f,
        x = (0, l.c)(107),
        { embed: h, variant: g, density: y, className: v } = e,
        b = void 0 === g ? "feed" : g,
        w = void 0 === y ? "terminal" : y,
        { t: j } = (0, r.f)(),
        N = (0, n.f)(u);
      x[0] !== N || x[1] !== h.name || x[2] !== j
        ? ((p = h.name ?? (N ? j("home.gacha.slab.slab_a11y") : "")),
          (x[0] = N),
          (x[1] = h.name),
          (x[2] = j),
          (x[3] = p))
        : (p = x[3]);
      let I = p;
      if (
        x[4] !== v ||
        x[5] !== N ||
        x[6] !== w ||
        x[7] !== h.grade ||
        x[8] !== h.image ||
        x[9] !== h.isClosed ||
        x[10] !== h.listingUsd ||
        x[11] !== h.markUsd ||
        x[12] !== h.multiple ||
        x[13] !== h.nftAddress ||
        x[14] !== h.provider ||
        x[15] !== h.setName ||
        x[16] !== h.status ||
        x[17] !== I ||
        x[18] !== j ||
        x[19] !== b
      ) {
        f = Symbol.for("react.early_return_sentinel");
        e: {
          let e,
            l,
            r,
            n,
            u,
            p,
            g,
            y,
            _,
            k,
            C = N
              ? j(
                  "phygitals" === h.provider
                    ? "home.gacha.slab.provider.phygitals"
                    : "home.gacha.slab.provider.collector_crypt",
                )
              : "",
            S = !h.isClosed && null !== h.markUsd;
          x[22] !== h.multiple
            ? ((e = null === h.multiple ? null : (0, o.k)(h.multiple)),
              (x[22] = h.multiple),
              (x[23] = e))
            : (e = x[23]);
          let P = e;
          if (
            x[24] !== v ||
            x[25] !== N ||
            x[26] !== w ||
            x[27] !== h.grade ||
            x[28] !== h.image ||
            x[29] !== h.markUsd ||
            x[30] !== h.multiple ||
            x[31] !== h.nftAddress ||
            x[32] !== h.setName ||
            x[33] !== h.status ||
            x[34] !== P ||
            x[35] !== I ||
            x[36] !== S ||
            x[37] !== j ||
            x[38] !== b
          ) {
            let e,
              o,
              m,
              k,
              C,
              U,
              A,
              E,
              D = (0, i.k)((h.multiple ?? 1) - 1),
              F = h.status ?? void 0;
            x[47] !== h.nftAddress || x[48] !== F || x[49] !== b
              ? ((e = {
                  "data-testid": "collectible-callout-card",
                  "data-variant": b,
                  "data-nft": h.nftAddress,
                  "data-status": F,
                }),
                (x[47] = h.nftAddress),
                (x[48] = F),
                (x[49] = b),
                (x[50] = e))
              : (e = x[50]);
            let q = e;
            if ("strip" === b) {
              let e, l, r, i, s, n, o;
              x[51] !== v
                ? ((e = (0, c.c)(
                    "flex min-w-0 items-center gap-1.5 rounded-md bg-bg-tertiary px-2 py-1.5 text-[12px] leading-4",
                    v,
                  )),
                  (x[51] = v),
                  (x[52] = e))
                : (e = x[52]);
              let u = h.image ?? void 0;
              (x[53] !== I || x[54] !== u
                ? ((l = (0, t.jsx)(a.f, {
                    src: u,
                    alt: I,
                    className: "aspect-auto h-7 w-5 shrink-0 rounded-sm",
                  })),
                  (x[53] = I),
                  (x[54] = u),
                  (x[55] = l))
                : (l = x[55]),
                x[56] !== I
                  ? ((r = (0, t.jsx)("span", {
                      "data-testid": "collectible-callout-card-name",
                      className:
                        "min-w-0 truncate font-medium text-text-primary",
                      children: I,
                    })),
                    (x[56] = I),
                    (x[57] = r))
                  : (r = x[57]),
                x[58] !== h.grade
                  ? ((i = h.grade
                      ? (0, t.jsx)("span", {
                          "data-testid": "collectible-callout-card-grade",
                          className: "shrink-0 text-text-tertiary",
                          children: h.grade,
                        })
                      : null),
                    (x[58] = h.grade),
                    (x[59] = i))
                  : (i = x[59]),
                x[60] !== h.markUsd || x[61] !== S
                  ? ((s =
                      S && null !== h.markUsd
                        ? (0, t.jsx)("span", {
                            "data-testid": "collectible-callout-card-value",
                            className: "font-medium text-text-primary",
                            children: (0, d.H)(h.markUsd),
                          })
                        : null),
                    (x[60] = h.markUsd),
                    (x[61] = S),
                    (x[62] = s))
                  : (s = x[62]));
              let p = P
                ? (0, t.jsx)("span", {
                    "data-testid": "collectible-callout-card-multiple",
                    className: (0, c.c)("font-medium", D),
                    children: P,
                  })
                : null;
              (x[63] !== s || x[64] !== p
                ? ((n = (0, t.jsxs)("span", {
                    className:
                      "ml-auto flex shrink-0 items-center gap-1.5 tabular-nums",
                    children: [s, p],
                  })),
                  (x[63] = s),
                  (x[64] = p),
                  (x[65] = n))
                : (n = x[65]),
                x[66] !== q ||
                x[67] !== e ||
                x[68] !== l ||
                x[69] !== r ||
                x[70] !== i ||
                x[71] !== n
                  ? ((o = (0, t.jsxs)("div", {
                      ...q,
                      className: e,
                      children: [l, r, i, n],
                    })),
                    (x[66] = q),
                    (x[67] = e),
                    (x[68] = l),
                    (x[69] = r),
                    (x[70] = i),
                    (x[71] = n),
                    (x[72] = o))
                  : (o = x[72]),
                (f = o));
              break e;
            }
            let M = (l = "comfortable" === w)
              ? "text-[12px] leading-4"
              : "text-[11px] leading-4";
            x[73] !== M
              ? ((o = (0, c.c)("text-text-quaternary", M)),
                (x[73] = M),
                (x[74] = o))
              : (o = x[74]);
            let z = o,
              T = (0, c.c)(
                "font-medium tabular-nums",
                l ? "text-[14px] leading-5" : "text-[13px] leading-4",
              );
            u = q;
            let L = !l && "border border-border-secondary";
            (x[75] !== v || x[76] !== L
              ? ((p = (0, c.c)(
                  "flex w-full flex-col gap-2 rounded-xl bg-bg-secondary p-3",
                  L,
                  v,
                )),
                (x[75] = v),
                (x[76] = L),
                (x[77] = p))
              : (p = x[77]),
              (g = "flex w-full items-center gap-3"));
            let O = h.image ?? void 0,
              Q = l ? "h-14 w-10" : "h-12 w-9";
            (x[78] !== Q
              ? ((m = (0, c.c)("aspect-auto shrink-0 rounded-md", Q)),
                (x[78] = Q),
                (x[79] = m))
              : (m = x[79]),
              x[80] !== I || x[81] !== O || x[82] !== m
                ? ((y = (0, t.jsx)(a.f, { src: O, alt: I, className: m })),
                  (x[80] = I),
                  (x[81] = O),
                  (x[82] = m),
                  (x[83] = y))
                : (y = x[83]));
            let B = l ? "text-[14px] leading-5" : "text-[13px] leading-4";
            (x[84] !== B
              ? ((k = (0, c.c)("truncate font-medium text-text-primary", B)),
                (x[84] = B),
                (x[85] = k))
              : (k = x[85]),
              x[86] !== I || x[87] !== k
                ? ((C = (0, t.jsx)("span", {
                    "data-testid": "collectible-callout-card-name",
                    className: k,
                    children: I,
                  })),
                  (x[86] = I),
                  (x[87] = k),
                  (x[88] = C))
                : (C = x[88]),
              x[89] !== w || x[90] !== h.grade
                ? ((U = h.grade
                    ? (0, t.jsx)(s.E, {
                        density: w,
                        "data-testid": "collectible-callout-card-grade",
                        children: h.grade,
                      })
                    : null),
                  (x[89] = w),
                  (x[90] = h.grade),
                  (x[91] = U))
                : (U = x[91]),
              x[92] !== l || x[93] !== h.setName
                ? ((A = h.setName
                    ? (0, t.jsx)("span", {
                        "data-testid": "collectible-callout-card-set",
                        className: (0, c.c)(
                          "min-w-0 truncate text-text-tertiary",
                          l
                            ? "text-[13px] leading-[18px]"
                            : "text-[12px] leading-4",
                        ),
                        children: h.setName,
                      })
                    : null),
                  (x[92] = l),
                  (x[93] = h.setName),
                  (x[94] = A))
                : (A = x[94]),
              x[95] !== U || x[96] !== A
                ? ((E = (0, t.jsxs)("span", {
                    className: "flex min-w-0 items-center gap-1.5",
                    children: [U, A],
                  })),
                  (x[95] = U),
                  (x[96] = A),
                  (x[97] = E))
                : (E = x[97]),
              x[98] !== C || x[99] !== E
                ? ((_ = (0, t.jsxs)("div", {
                    className: "flex min-w-0 flex-1 flex-col gap-0.5",
                    children: [C, E],
                  })),
                  (x[98] = C),
                  (x[99] = E),
                  (x[100] = _))
                : (_ = x[100]),
              (r =
                S && null !== h.markUsd
                  ? (0, t.jsxs)("div", {
                      "data-testid": "collectible-callout-card-value",
                      className: "flex shrink-0 flex-col items-end",
                      children: [
                        (0, t.jsx)("span", {
                          className: z,
                          children: N ? j("home.gacha.feed.value") : null,
                        }),
                        (0, t.jsx)("span", {
                          className: (0, c.c)(T, "text-text-primary"),
                          children: (0, d.H)(h.markUsd),
                        }),
                      ],
                    })
                  : null),
              (n = P
                ? (0, t.jsxs)("div", {
                    "data-testid": "collectible-callout-card-multiple",
                    className: "flex shrink-0 flex-col items-end",
                    children: [
                      (0, t.jsx)("span", {
                        className: z,
                        children: N ? j("home.gacha.feed.call") : null,
                      }),
                      (0, t.jsx)("span", {
                        className: (0, c.c)(T, D),
                        children: P,
                      }),
                    ],
                  })
                : null),
              (x[24] = v),
              (x[25] = N),
              (x[26] = w),
              (x[27] = h.grade),
              (x[28] = h.image),
              (x[29] = h.markUsd),
              (x[30] = h.multiple),
              (x[31] = h.nftAddress),
              (x[32] = h.setName),
              (x[33] = h.status),
              (x[34] = P),
              (x[35] = I),
              (x[36] = S),
              (x[37] = j),
              (x[38] = b),
              (x[39] = l),
              (x[40] = r),
              (x[41] = n),
              (x[42] = u),
              (x[43] = p),
              (x[44] = g),
              (x[45] = y),
              (x[46] = _));
          } else
            ((l = x[39]),
              (r = x[40]),
              (n = x[41]),
              (u = x[42]),
              (p = x[43]),
              (g = x[44]),
              (y = x[45]),
              (_ = x[46]));
          (x[101] !== r ||
          x[102] !== n ||
          x[103] !== g ||
          x[104] !== y ||
          x[105] !== _
            ? ((k = (0, t.jsxs)("div", {
                className: g,
                children: [y, _, r, n],
              })),
              (x[101] = r),
              (x[102] = n),
              (x[103] = g),
              (x[104] = y),
              (x[105] = _),
              (x[106] = k))
            : (k = x[106]),
            (m = (0, t.jsxs)("div", {
              ...u,
              className: p,
              children: [
                k,
                null !== h.listingUsd && N
                  ? (0, t.jsx)("span", {
                      "data-testid": "collectible-callout-card-listing",
                      className: (0, c.c)(
                        "truncate text-text-secondary",
                        l
                          ? "text-[13px] leading-[18px]"
                          : "text-[12px] leading-4",
                      ),
                      children: j("home.gacha.feed.listed_on", {
                        price: (0, d.H)(h.listingUsd),
                        marketplace: C,
                      }),
                    })
                  : null,
              ],
            })));
        }
        ((x[4] = v),
          (x[5] = N),
          (x[6] = w),
          (x[7] = h.grade),
          (x[8] = h.image),
          (x[9] = h.isClosed),
          (x[10] = h.listingUsd),
          (x[11] = h.markUsd),
          (x[12] = h.multiple),
          (x[13] = h.nftAddress),
          (x[14] = h.provider),
          (x[15] = h.setName),
          (x[16] = h.status),
          (x[17] = I),
          (x[18] = j),
          (x[19] = b),
          (x[20] = m),
          (x[21] = f));
      } else ((m = x[20]), (f = x[21]));
      return f !== Symbol.for("react.early_return_sentinel") ? f : m;
    },
  ]);
};
