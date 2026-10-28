// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(426091),
    r = e.i(352386);
  let s = ({ cardCount: e, gapPx: t }) => {
    let i = "number" == typeof e,
      r = i ? e : e.large,
      s = i ? e : e.small,
      l = i ? e : e.extraSmall;
    if (r < 1 || s < 1 || l < 1)
      throw Error("Card count must be greater than 0");
    return {
      "--card-width-extra-small": `calc((100cqw - ${(({ itemCount: e, gapPx: t }) => t * (e - 1))({ itemCount: l, gapPx: t })}px) / ${l})`,
      "--card-width-small": `calc((100cqw - ${(({ itemCount: e, gapPx: t }) => t * (e - 1))({ itemCount: s, gapPx: t })}px) / ${s})`,
      "--card-width-large": `calc((100cqw - ${(({ itemCount: e, gapPx: t }) => t * (e - 1))({ itemCount: r, gapPx: t })}px) / ${r})`,
    };
  };
  e.s(["f", 0, s], 502540);
  var l = e.i(445242);
  let a = (e) => {
    let i,
      s,
      a,
      n = (0, l.c)(6),
      { children: o, scrollRoot: c } = e,
      d = (0, r.useRef)(null),
      [m, u] = (0, r.useState)(!1);
    (n[0] !== m || n[1] !== c
      ? ((i = () => {
          if (m || !d.current || !c.current) return;
          let e = new IntersectionObserver(
            (t) => {
              let [i] = t;
              i.isIntersecting && (u(!0), e.disconnect());
            },
            { root: c.current, rootMargin: "0px 300px 0px 300px" },
          );
          return (e.observe(d.current), () => e.disconnect());
        }),
        (s = [m, c]),
        (n[0] = m),
        (n[1] = c),
        (n[2] = i),
        (n[3] = s))
      : ((i = n[2]), (s = n[3])),
      (0, r.useEffect)(i, s));
    let f = m ? o : null;
    return (
      n[4] !== f
        ? ((a = (0, t.jsx)("div", {
            ref: d,
            className: "w-full h-full",
            children: f,
          })),
          (n[4] = f),
          (n[5] = a))
        : (a = n[5]),
      a
    );
  };
  var n = e.i(798394),
    o = e.i(70678),
    c = e.i(65769);
  e.s(
    [
      "Carousel",
      0,
      ({
        cardCount: e,
        gapPx: l,
        children: d,
        className: m,
        scrollContainerClassName: u,
        selectedIndex: f,
        onSnapIndexChange: h,
        onScrollNearEnd: x,
        useViewportIntersection: p = !1,
        eager: v = !1,
      }) => {
        let {
          containerRef: g,
          scrollRef: b,
          cardWidth: w,
        } = (0, n.f)({ gapPx: l });
        ((0, o.f)({ selectedIndex: f, scrollRef: b, cardWidth: w }),
          (0, c.f)({ scrollRef: b, cardWidth: w, onSnapIndexChange: h }));
        let y = (0, r.useRef)(null),
          N = (0, r.useRef)(x);
        N.current = x;
        let j = !!x;
        return (
          (0, r.useEffect)(() => {
            let e = y.current,
              t = b.current;
            if (!e || !j || (!p && !t)) return;
            let i = new IntersectionObserver(
              (e) => {
                e[0].isIntersecting && N.current?.();
              },
              {
                root: p ? null : t,
                rootMargin: p ? "0px 0px 400px 0px" : "0px 200px 200px 0px",
                threshold: 0,
              },
            );
            return (i.observe(e), () => i.disconnect());
          }, [j, b, u, p, d.length]),
          (0, t.jsx)("div", {
            ref: g,
            className: (0, i.c)("@container -my-2", m),
            style: s({ cardCount: e, gapPx: l }),
            children: (0, t.jsxs)("div", {
              ref: b,
              className: (0, i.c)(
                "flex flex-row overflow-x-auto scrollbar-hidden snap-x snap-mandatory py-2",
                u,
              ),
              style: { gap: l },
              children: [
                d.map((e, i) =>
                  (0, t.jsx)(
                    "div",
                    {
                      className:
                        "snap-start flex-shrink-0 w-[var(--card-width-extra-small)] md:w-[var(--card-width-small)] xl:w-[var(--card-width-large)]",
                      children: v
                        ? (0, t.jsx)("div", {
                            className: "w-full h-full",
                            children: e,
                          })
                        : (0, t.jsx)(a, { scrollRoot: b, children: e }),
                    },
                    i,
                  ),
                ),
                x &&
                  (0, t.jsx)("div", {
                    ref: y,
                    "aria-hidden": !0,
                    className: "pointer-events-none flex-shrink-0 h-px w-px",
                  }),
              ],
            }),
          })
        );
      },
    ],
    1074,
  );
};
