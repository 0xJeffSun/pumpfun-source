// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(338319);
  (e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          a,
          n = (0, r.c)(10),
          { options: s, value: o, onChange: d, ariaLabel: u } = e;
        if (n[0] !== d || n[1] !== s || n[2] !== o) {
          let e;
          (n[4] !== d || n[5] !== o
            ? ((e = (e) => {
                let r = e.value === o,
                  i = e.icon;
                return (0, t.jsx)(
                  "button",
                  {
                    type: "button",
                    role: "tab",
                    "aria-selected": r,
                    "aria-label": e.ariaLabel,
                    onClick: () => d(e.value),
                    className: (0, l.c)(
                      "flex items-center rounded-full py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
                      i ? "px-2.5" : "px-3",
                      r
                        ? "bg-white text-black"
                        : "text-text-secondary hover:text-text-primary",
                    ),
                    children: i
                      ? (0, t.jsx)(i, {
                          "aria-hidden": !0,
                          className: "size-3.5",
                        })
                      : e.label,
                  },
                  e.value,
                );
              }),
              (n[4] = d),
              (n[5] = o),
              (n[6] = e))
            : (e = n[6]),
            (i = s.map(e)),
            (n[0] = d),
            (n[1] = s),
            (n[2] = o),
            (n[3] = i));
        } else i = n[3];
        return (
          n[7] !== u || n[8] !== i
            ? ((a = (0, t.jsx)("div", {
                role: "tablist",
                "aria-label": u,
                className:
                  "inline-flex shrink-0 items-center rounded-full border border-border-secondary bg-bg-secondary p-0.5",
                children: i,
              })),
              (n[7] = u),
              (n[8] = i),
              (n[9] = a))
            : (a = n[9]),
          a
        );
      },
    ],
    584698,
  ),
    e.s(
      [
        "e",
        0,
        function () {
          let e,
            l = (0, r.c)(1);
          return (
            l[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsxs)("svg", {
                  "aria-hidden": "true",
                  className: "size-4 shrink-0 fill-current",
                  viewBox: "0 0 24 24",
                  children: [
                    (0, t.jsx)("title", { children: "Apple" }),
                    (0, t.jsx)("path", {
                      d: "M17.05 12.536c-.026-2.63 2.147-3.892 2.245-3.953-1.222-1.787-3.124-2.032-3.804-2.06-1.62-.164-3.161.954-3.983.954-.82 0-2.087-.93-3.431-.905-1.765.026-3.393 1.026-4.303 2.605-1.834 3.18-.469 7.888 1.317 10.47.873 1.264 1.914 2.683 3.28 2.632 1.315-.053 1.813-.851 3.404-.851 1.59 0 2.038.851 3.43.825 1.416-.026 2.313-1.288 3.18-2.556 1.002-1.466 1.414-2.886 1.438-2.959-.031-.014-2.76-1.058-2.773-4.202z",
                    }),
                    (0, t.jsx)("path", {
                      d: "M14.79 4.792c.726-.88 1.216-2.103 1.082-3.322-1.046.042-2.313.696-3.063 1.574-.673.779-1.262 2.023-1.104 3.218 1.167.09 2.359-.593 3.085-1.47z",
                    }),
                  ],
                })),
                (l[0] = e))
              : (e = l[0]),
            e
          );
        },
        "r",
        0,
        function () {
          let e,
            l = (0, r.c)(1);
          return (
            l[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsxs)("svg", {
                  "aria-hidden": "true",
                  className: "size-4 shrink-0",
                  viewBox: "-1.84 -1.84 27.69 27.69",
                  children: [
                    (0, t.jsx)("title", { children: "Google Play" }),
                    (0, t.jsx)("path", {
                      d: "M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 0 1-2.395 3.622v3.01h3.878c2.269-2.088 3.579-5.165 3.579-8.819z",
                      fill: "#4285F4",
                    }),
                    (0, t.jsx)("path", {
                      d: "M12 24c3.24 0 5.956-1.075 7.941-2.908l-3.878-3.01c-1.075.72-2.45 1.145-4.063 1.145-3.125 0-5.77-2.11-6.714-4.947H1.276v3.108A11.995 11.995 0 0 0 12 24z",
                      fill: "#34A853",
                    }),
                    (0, t.jsx)("path", {
                      d: "M5.286 14.28A7.212 7.212 0 0 1 4.91 12c0-.79.136-1.558.376-2.28V6.612H1.276A11.995 11.995 0 0 0 0 12c0 1.937.464 3.77 1.276 5.388l4.01-3.108z",
                      fill: "#FBBC05",
                    }),
                    (0, t.jsx)("path", {
                      d: "M12 4.773c1.762 0 3.344.606 4.588 1.795l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.255 2.69 1.276 6.612l4.01 3.108C6.23 6.883 8.875 4.773 12 4.773z",
                      fill: "#EA4335",
                    }),
                  ],
                })),
                (l[0] = e))
              : (e = l[0]),
            e
          );
        },
        "g",
        0,
        "flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0e1512]/80 px-5 py-3 font-medium text-sm text-text-high-em shadow-[0_0_24px_-8px_rgba(134,239,172,0.45)] transition-colors hover:border-bg-accent/40 hover:bg-[#0e1512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-accent",
      ],
      296335,
    ));
};
