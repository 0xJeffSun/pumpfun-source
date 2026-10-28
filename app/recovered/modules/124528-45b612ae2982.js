// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(750900),
    i = r.i(352386),
    a = r.i(689391),
    l = r.i(586539),
    n = r.i(335341);
  let t = a.z.span`
  position: relative;
  background-color: var(--privy-color-background);
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  font-kerning: none;
  font-feature-settings: 'calt' off;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;

  && {
    color: var(--privy-color-foreground);
    font-size: ${({ $size: r }) => ("small" === r ? "2.25rem" : "compact" === r ? "3rem" : "3.75rem")};
    font-style: normal;
    font-weight: 600;
    line-height: 5.375rem;
  }
`,
    c = a.z.input`
  appearance: none;
  align-self: flex-start;
  min-width: 1ch;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-align: left;
  caret-color: currentcolor;

  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`,
    d = a.z.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  pointer-events: none;
`,
    s = a.z.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;
  font-size: ${({ $size: r }) => ("small" === r ? "0.75rem" : "compact" === r ? "0.875rem" : "1rem")};
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  margin-top: 0.75rem;
`,
    v = a.z.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  gap: 0.5rem;
  border: 1px solid var(--privy-color-border-default);
  border-radius: var(--privy-border-radius-full);

  && {
    margin: auto;
    padding: 0.5rem 1rem;
  }
`,
    p = a.z.div`
  svg {
    width: 1rem;
    height: 1rem;
    border-radius: var(--privy-border-radius-full);
    overflow: hidden;
    border: solid 0.1px var(--privy-color-border-default);
  }
`,
    h = a.z.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
`,
    u = a.z.div`
  color: var(--privy-color-foreground);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`,
    g = a.z.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-height: 20.875rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`,
    f = a.z.button`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;

  && {
    padding: 0.75rem 1rem;
  }
`,
    b = a.z.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`,
    x = a.z.div`
  svg {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--privy-border-radius-full);
    overflow: hidden;
    border: solid 0.1px var(--privy-color-border-default);
  }
`,
    y = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
`,
    m = a.z.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
`,
    w = a.z.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
`;
  r.s([
    "A",
    0,
    ({
      currency: r = "usd",
      value: o,
      onChange: a,
      inputMode: n = "decimal",
      autoFocus: v,
    }) => {
      let [p, h] = (0, i.useState)("0"),
        [u, g] = (0, i.useState)(null),
        f = (0, i.useRef)(null),
        b = (0, i.useRef)(null),
        x = o ?? p,
        y = l.S[r]?.symbol ?? "$",
        m = x.length > 9 ? "small" : x.length > 6 ? "compact" : "default";
      (0, i.useLayoutEffect)(() => {
        let r = b.current?.offsetWidth;
        g(r ? Math.ceil(r) + 2 : null);
      }, [m, x]);
      let w = (0, i.useCallback)(
          (r) => {
            let e = r.target.value,
              o = (e = e.replace(/[^\d.]/g, "")).split(".");
            o.length > 2 && (e = o[0] + "." + o.slice(1).join(""));
            let [i = "", l] = e.split("."),
              n = i.replace(/^0+(?=\d)/, "");
            (("" === (e = void 0 !== l ? `${n || "0"}.${l}` : n || "0") ||
              "." === e) &&
              (e = "0"),
              a ? a(e) : h(e));
          },
          [a],
        ),
        k = (0, i.useCallback)((r) => {
          !(
            [
              "Delete",
              "Backspace",
              "Tab",
              "Escape",
              "Enter",
              ".",
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Home",
              "End",
            ].includes(r.key) ||
            ((r.ctrlKey || r.metaKey) &&
              ["a", "c", "v", "x"].includes(r.key.toLowerCase()))
          ) &&
            ((r.key >= "0" && r.key <= "9") || r.preventDefault());
        }, []);
      return (0, e.jsxs)(t, {
        $size: m,
        onClick: () => f.current?.focus(),
        children: [
          (0, e.jsx)(s, { $size: m, children: y }),
          (0, e.jsx)(c, {
            ref: f,
            type: "text",
            inputMode: n,
            value: x,
            onChange: w,
            onKeyDown: k,
            autoFocus: v,
            placeholder: "0",
            "aria-label": "Amount",
            style: u ? { width: `${u}px` } : void 0,
          }),
          (0, e.jsx)(d, { ref: b, "aria-hidden": "true", children: x }),
          (0, e.jsx)(s, { $size: m, style: { opacity: 0 }, children: y }),
        ],
      });
    },
    "C",
    0,
    ({ selectedAsset: r, onEditSourceAsset: i }) => {
      let { icon: a } = l.S[r];
      return (0, e.jsxs)(v, {
        onClick: i,
        children: [
          (0, e.jsx)(p, { children: a }),
          (0, e.jsx)(h, { children: r.toLocaleUpperCase() }),
          (0, e.jsx)(u, { children: (0, e.jsx)(o.f, {}) }),
        ],
      });
    },
    "S",
    0,
    ({ opts: r, isLoading: o, onSelectSource: i }) =>
      (0, e.jsx)(n.S, {
        showClose: !1,
        showBack: !0,
        onBack: () => i(r.source.selectedAsset),
        title: "Select currency",
        children: (0, e.jsx)(g, {
          children: r.source.assets.map((r) => {
            let { icon: a, name: n } = l.S[r];
            return (0, e.jsx)(
              f,
              {
                onClick: () => i(r),
                disabled: o,
                children: (0, e.jsxs)(b, {
                  children: [
                    (0, e.jsx)(x, { children: a }),
                    (0, e.jsxs)(y, {
                      children: [
                        (0, e.jsx)(m, { children: n }),
                        (0, e.jsx)(w, { children: r.toLocaleUpperCase() }),
                      ],
                    }),
                  ],
                }),
              },
              r,
            );
          }),
        }),
      }),
  ]);
};
