// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(352386);
  (e.s(
    [
      "f",
      0,
      (e) => {
        let i,
          l,
          r,
          s = (0, t.c)(5),
          { gapPx: n } = e,
          c = (0, a.useRef)(null),
          o = (0, a.useRef)(null),
          [d, m] = (0, a.useState)(null);
        return (
          s[0] !== n
            ? ((i = () => {
                let e = c.current,
                  t = o.current;
                if (!e || !t) return;
                let a = () => {
                    let e = t.children[0];
                    return e ? e.offsetWidth + n : null;
                  },
                  i = () => {
                    let e = a();
                    null !== e && m(e);
                  },
                  l = new ResizeObserver(() => {
                    let e = a();
                    if (!e) return;
                    m(e);
                    let i = Math.round(t.scrollLeft / e);
                    t.scrollTo({ left: i * e, behavior: "instant" });
                  });
                l.observe(e);
                let r = new MutationObserver(i);
                return (
                  r.observe(t, { childList: !0 }),
                  i(),
                  () => {
                    (l.disconnect(), r.disconnect());
                  }
                );
              }),
              (l = [n]),
              (s[0] = n),
              (s[1] = i),
              (s[2] = l))
            : ((i = s[1]), (l = s[2])),
          (0, a.useEffect)(i, l),
          s[3] !== d
            ? ((r = { containerRef: c, scrollRef: o, cardWidth: d }),
              (s[3] = d),
              (s[4] = r))
            : (r = s[4]),
          r
        );
      },
    ],
    798394,
  ),
    e.s(
      [
        "f",
        0,
        ({
          selectedIndex: e,
          scrollRef: t,
          cardWidth: i,
          skipBehavior: l,
          isSkip: r,
        }) => {
          let s = (0, a.useRef)(null),
            n = (0, a.useRef)(r);
          ((n.current = r),
            (0, a.useEffect)(() => {
              if (void 0 === e || null === i) return;
              let a = s.current;
              s.current = e;
              let r =
                null !== a &&
                (n.current ?? ((e, t) => Math.abs(t - e) > 1))(a, e);
              t.current?.scrollTo({
                left: e * i,
                behavior: r && l ? l : "smooth",
              });
            }, [e, i, t, l]));
        },
      ],
      70678,
    ),
    e.s(
      [
        "f",
        0,
        ({ scrollRef: e, cardWidth: t, onSnapIndexChange: i }) => {
          let l = (0, a.useRef)(i);
          ((l.current = i),
            (0, a.useEffect)(() => {
              let a = e.current;
              if (!a || null === t || !l.current) return;
              let i = () => {
                if (0 === t) return;
                let e = Math.round(a.scrollLeft / t);
                l.current?.(e);
              };
              return (
                a.addEventListener("scrollend", i),
                () => {
                  a.removeEventListener("scrollend", i);
                }
              );
            }, [e, t]));
        },
      ],
      65769,
    ));
};
