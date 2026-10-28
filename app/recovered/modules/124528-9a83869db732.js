// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(750900),
    t = e.i(352386),
    i = e.i(689391),
    a = e.i(586539),
    n = e.i(335341);
  let l = i.z.span`
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
    font-size: ${({ $size: e }) => ("small" === e ? "2.25rem" : "compact" === e ? "3rem" : "3.75rem")};
    font-style: normal;
    font-weight: 600;
    line-height: 5.375rem;
  }
`,
    s = i.z.input`
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
    c = i.z.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  pointer-events: none;
`,
    d = i.z.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;
  font-size: ${({ $size: e }) => ("small" === e ? "0.75rem" : "compact" === e ? "0.875rem" : "1rem")};
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  margin-top: 0.75rem;
`,
    u = i.z.button`
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
    p = i.z.div`
  svg {
    width: 1rem;
    height: 1rem;
    border-radius: var(--privy-border-radius-full);
    overflow: hidden;
    border: solid 0.1px var(--privy-color-border-default);
  }
`,
    v = i.z.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem;
`,
    h = i.z.div`
  color: var(--privy-color-foreground);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`,
    g = i.z.div`
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
    f = i.z.button`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;

  && {
    padding: 0.75rem 1rem;
  }
`,
    y = i.z.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`,
    m = i.z.div`
  svg {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--privy-border-radius-full);
    overflow: hidden;
    border: solid 0.1px var(--privy-color-border-default);
  }
`,
    b = i.z.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
`,
    x = i.z.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
`,
    k = i.z.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
`;
  e.s([
    "A",
    0,
    ({
      currency: e = "usd",
      value: o,
      onChange: i,
      inputMode: n = "decimal",
      autoFocus: u,
    }) => {
      let [p, v] = (0, t.useState)("0"),
        [h, g] = (0, t.useState)(null),
        f = (0, t.useRef)(null),
        y = (0, t.useRef)(null),
        m = o ?? p,
        b = a.S[e]?.symbol ?? "$",
        x = m.length > 9 ? "small" : m.length > 6 ? "compact" : "default";
      (0, t.useLayoutEffect)(() => {
        let e = y.current?.offsetWidth;
        g(e ? Math.ceil(e) + 2 : null);
      }, [x, m]);
      let k = (0, t.useCallback)(
          (e) => {
            let r = e.target.value,
              o = (r = r.replace(/[^\d.]/g, "")).split(".");
            o.length > 2 && (r = o[0] + "." + o.slice(1).join(""));
            let [t = "", a] = r.split("."),
              n = t.replace(/^0+(?=\d)/, "");
            (("" === (r = void 0 !== a ? `${n || "0"}.${a}` : n || "0") ||
              "." === r) &&
              (r = "0"),
              i ? i(r) : v(r));
          },
          [i],
        ),
        w = (0, t.useCallback)((e) => {
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
            ].includes(e.key) ||
            ((e.ctrlKey || e.metaKey) &&
              ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
          ) &&
            ((e.key >= "0" && e.key <= "9") || e.preventDefault());
        }, []);
      return (0, r.jsxs)(l, {
        $size: x,
        onClick: () => f.current?.focus(),
        children: [
          (0, r.jsx)(d, { $size: x, children: b }),
          (0, r.jsx)(s, {
            ref: f,
            type: "text",
            inputMode: n,
            value: m,
            onChange: k,
            onKeyDown: w,
            autoFocus: u,
            placeholder: "0",
            "aria-label": "Amount",
            style: h ? { width: `${h}px` } : void 0,
          }),
          (0, r.jsx)(c, { ref: y, "aria-hidden": "true", children: m }),
          (0, r.jsx)(d, { $size: x, style: { opacity: 0 }, children: b }),
        ],
      });
    },
    "C",
    0,
    ({ selectedAsset: e, onEditSourceAsset: t }) => {
      let { icon: i } = a.S[e];
      return (0, r.jsxs)(u, {
        onClick: t,
        children: [
          (0, r.jsx)(p, { children: i }),
          (0, r.jsx)(v, { children: e.toLocaleUpperCase() }),
          (0, r.jsx)(h, { children: (0, r.jsx)(o.f, {}) }),
        ],
      });
    },
    "S",
    0,
    ({ opts: e, isLoading: o, onSelectSource: t }) =>
      (0, r.jsx)(n.S, {
        showClose: !1,
        showBack: !0,
        onBack: () => t(e.source.selectedAsset),
        title: "Select currency",
        children: (0, r.jsx)(g, {
          children: e.source.assets.map((e) => {
            let { icon: i, name: n } = a.S[e];
            return (0, r.jsx)(
              f,
              {
                onClick: () => t(e),
                disabled: o,
                children: (0, r.jsxs)(y, {
                  children: [
                    (0, r.jsx)(m, { children: i }),
                    (0, r.jsxs)(b, {
                      children: [
                        (0, r.jsx)(x, { children: n }),
                        (0, r.jsx)(k, { children: e.toLocaleUpperCase() }),
                      ],
                    }),
                  ],
                }),
              },
              e,
            );
          }),
        }),
      }),
  ]);
};
