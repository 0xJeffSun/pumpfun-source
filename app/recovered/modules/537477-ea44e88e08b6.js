// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(729304),
    n = e.i(367036);
  e.s(
    [
      "f",
      0,
      ({ taskId: e, purpose: a, enabled: i, pools: o }) => {
        let [l, u] = (0, t.useState)(n.Q),
          [s, c] = (0, t.useState)(null),
          [d, f] = (0, t.useState)(null),
          m = (0, r.j)(),
          { mutateAsync: p } = m,
          h = o ? JSON.stringify(o) : "",
          b = (0, t.useCallback)(
            async (t) => {
              if (!i || !e) return null;
              let r = (0, n.y)(t?.symbol ?? l),
                u = t?.pools ?? o;
              try {
                let t = await p({
                  taskId: e,
                  purpose: a,
                  feeMint: r.mintAddress,
                  ...(u && u.length > 0 ? { pools: u } : {}),
                });
                return (c(t), f(null), t);
              } catch (e) {
                return (
                  f(e instanceof Error ? e : Error("Quote failed")),
                  c(null),
                  null
                );
              }
            },
            [i, e, a, l, o, p],
          ),
          v = (0, t.useCallback)(
            async (t) => {
              let r;
              if (!i || !e) return null;
              if (void 0 !== t) return b({ symbol: l, pools: t });
              let a = (0, n.y)(l).mintAddress;
              return s &&
                !(
                  Number.isNaN((r = Date.parse(s.expiresAt))) ||
                  r <= Date.now() + 2e3
                ) &&
                s.feeMint === a
                ? s
                : b({ symbol: l });
            },
            [i, e, s, l, b],
          );
        return (
          (0, t.useEffect)(() => {
            if (i && e) {
              if (void 0 !== o && 0 === o.length) {
                (c(null), f(null));
                return;
              }
              b({ symbol: l });
            }
          }, [i, e, a, l, h, b]),
          {
            feeMintSymbol: l,
            setFeeMintSymbol: u,
            quote: s,
            isQuoting: m.isPending,
            quoteError: d,
            requote: b,
            ensureFreshQuote: v,
          }
        );
      },
    ],
    537477,
  );
  var a = e.i(315558);
  let i = 400;
  e.s(
    [
      "f",
      0,
      ({ pools: e, connection: r, enabled: n, debounceMs: o = i }) => {
        let [l, u] = (0, t.useState)([]),
          s = JSON.stringify(e),
          c = (0, t.useRef)(0),
          d = (0, t.useRef)(r);
        d.current = r;
        let f = (0, t.useRef)(e);
        return (
          (f.current = e),
          (0, t.useEffect)(() => {
            if (!n) return void u((e) => (0 === e.length ? e : []));
            let e = ++c.current,
              t = setTimeout(() => {
                (0, a.J)(d.current, f.current)
                  .catch(() => [])
                  .then((t) => {
                    e === c.current && u(t);
                  });
              }, o);
            return () => clearTimeout(t);
          }, [n, s, o]),
          l
        );
      },
    ],
    838701,
  );
};
