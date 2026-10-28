// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(732486);
  e.s(
    [
      "e",
      0,
      function (e, r) {
        let o = t.createContext(r),
          i = (e) => {
            let { children: r, ...i } = e,
              a = t.useMemo(() => i, Object.values(i));
            return (0, n.jsx)(o.Provider, { value: a, children: r });
          };
        return (
          (i.displayName = e + "Provider"),
          [
            i,
            function (n) {
              let i = t.useContext(o);
              if (i) return i;
              if (void 0 !== r) return r;
              throw Error(`\`${n}\` must be used within \`${e}\``);
            },
          ]
        );
      },
      "c",
      0,
      function (e, r = []) {
        let o = [],
          i = () => {
            let n = o.map((e) => t.createContext(e));
            return function (r) {
              let o = r?.[e] || n;
              return t.useMemo(
                () => ({ [`__scope${e}`]: { ...r, [e]: o } }),
                [r, o],
              );
            };
          };
        return (
          (i.scopeName = e),
          [
            function (r, i) {
              let a = t.createContext(i),
                s = o.length;
              o = [...o, i];
              let l = (r) => {
                let { scope: o, children: i, ...l } = r,
                  u = o?.[e]?.[s] || a,
                  d = t.useMemo(() => l, Object.values(l));
                return (0, n.jsx)(u.Provider, { value: d, children: i });
              };
              return (
                (l.displayName = r + "Provider"),
                [
                  l,
                  function (n, o) {
                    let l = o?.[e]?.[s] || a,
                      u = t.useContext(l);
                    if (u) return u;
                    if (void 0 !== i) return i;
                    throw Error(`\`${n}\` must be used within \`${r}\``);
                  },
                ]
              );
            },
            (function (...e) {
              let n = e[0];
              if (1 === e.length) return n;
              let r = () => {
                let r = e.map((e) => ({
                  useScope: e(),
                  scopeName: e.scopeName,
                }));
                return function (e) {
                  let o = r.reduce((t, { useScope: n, scopeName: r }) => {
                    let o = n(e)[`__scope${r}`];
                    return { ...t, ...o };
                  }, {});
                  return t.useMemo(
                    () => ({ [`__scope${n.scopeName}`]: o }),
                    [o],
                  );
                };
              };
              return ((r.scopeName = n.scopeName), r);
            })(i, ...r),
          ]
        );
      },
    ],
    156207,
  );
  var r = globalThis?.document ? t.useLayoutEffect : () => {};
  (e.s(["f", 0, r], 127864),
    t[" useEffectEvent ".trim().toString()],
    t[" useInsertionEffect ".trim().toString()]);
  var o = t[" useInsertionEffect ".trim().toString()] || r;
  (Symbol("RADIX:SYNC_STATE"),
    e.s(
      [
        "f",
        0,
        function ({
          prop: e,
          defaultProp: n,
          onChange: r = () => {},
          caller: i,
        }) {
          let [a, s, l] = (function ({ defaultProp: e, onChange: n }) {
              let [r, i] = t.useState(e),
                a = t.useRef(r),
                s = t.useRef(n);
              return (
                o(() => {
                  s.current = n;
                }, [n]),
                t.useEffect(() => {
                  a.current !== r && (s.current?.(r), (a.current = r));
                }, [r, a]),
                [r, i, s]
              );
            })({ defaultProp: n, onChange: r }),
            u = void 0 !== e,
            d = u ? e : a;
          {
            let n = t.useRef(void 0 !== e);
            t.useEffect(() => {
              let e = n.current;
              if (e !== u) {
                let t = u ? "controlled" : "uncontrolled";
                console.warn(
                  `${i} is changing from ${e ? "controlled" : "uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
                );
              }
              n.current = u;
            }, [u, i]);
          }
          return [
            d,
            t.useCallback(
              (t) => {
                if (u) {
                  let n = "function" == typeof t ? t(e) : t;
                  n !== e && l.current?.(n);
                } else s(t);
              },
              [u, e, s, l],
            ),
          ];
        },
      ],
      534643,
    ));
};
