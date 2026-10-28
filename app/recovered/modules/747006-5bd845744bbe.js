// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386);
  let o = e.forwardRef(function ({ title: r, titleId: o, ...i }, a) {
      return e.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: a,
            "aria-labelledby": o,
          },
          i,
        ),
        r ? e.createElement("title", { id: o }, r) : null,
        e.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
        }),
      );
    }),
    i = e.forwardRef(function ({ title: r, titleId: o, ...i }, a) {
      return e.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: a,
            "aria-labelledby": o,
          },
          i,
        ),
        r ? e.createElement("title", { id: o }, r) : null,
        e.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z",
        }),
        e.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
        }),
      );
    }),
    a = e.forwardRef(function ({ title: r, titleId: o, ...i }, a) {
      return e.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: a,
            "aria-labelledby": o,
          },
          i,
        ),
        r ? e.createElement("title", { id: o }, r) : null,
        e.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88",
        }),
      );
    });
  var t = r.i(689391),
    n = r.i(995040);
  let l = t.m`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.008px;
  text-align: left;
  transition: color 0.1s ease-in;
`,
    c = t.z.span`
  ${l}
  transition: color 0.1s ease-in;
  color: ${({ error: r }) => (r ? "var(--privy-color-error)" : "var(--privy-color-foreground-3)")};
  text-transform: ${({ error: r }) => (r ? "" : "capitalize")};

  &[aria-hidden='true'] {
    visibility: hidden;
  }
`,
    d = t.z.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`,
    s = (0, t.z)(n.P)`
  ${({ $hideAnimations: r }) =>
    r &&
    t.m`
      && {
        transition: none;
      }
    `}
`,
    v = t.m`
  && {
    width: 100%;
    border-width: 1px;
    border-radius: var(--privy-border-radius-md);
    border-color: var(--privy-color-foreground-3);
    background: var(--privy-color-background);
    color: var(--privy-color-foreground);

    padding: 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 22px; /* 137.5% */
  }
`,
    p = t.z.input`
  ${v}

  &::placeholder {
    color: var(--privy-color-foreground-3);
    font-style: italic;
    font-size: 14px;
  }

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,
    u = t.z.div`
  ${v}
`,
    h = t.z.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ centered: r }) => (r ? "center" : "space-between")};
`,
    g = t.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
  gap: 4px;

  & h3 {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  & p {
    max-width: 300px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`,
    f = t.z.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 1rem;
`,
    x = t.z.div`
  display: flex;
  text-align: left;
  align-items: center;

  gap: 8px;
  max-width: 300px;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.008px;

  margin: 0 8px;
  color: var(--privy-color-foreground-2);

  > :first-child {
    min-width: 24px;
  }
`;
  t.z.div`
  height: var(--privy-height-modal-full);

  @media (max-width: 440px) {
    height: var(--privy-height-modal-compact);
  }
`;
  let b = (0, t.z)(n.B)`
  display: flex;
  flex: 1;
  gap: 4px;
  justify-content: center;

  && {
    background: var(--privy-color-background);
    border-radius: var(--privy-border-radius-md);
    border-color: var(--privy-color-foreground-3);
    border-width: 1px;
  }
`,
    y = t.z.div`
  position: absolute;
  right: 0.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`,
    m = (0, t.z)(o)`
  height: 1.25rem;
  width: 1.25rem;
  stroke: var(--privy-color-accent);
  cursor: pointer;

  :active {
    stroke: var(--privy-color-accent-light);
  }
`,
    w = (0, t.z)(a)`
  height: 1.25rem;
  width: 1.25rem;
  stroke: var(--privy-color-accent);
  cursor: pointer;

  :active {
    stroke: var(--privy-color-accent-light);
  }
`,
    k = (0, t.z)(i)`
  height: 1.25rem;
  width: 1.25rem;
  stroke: var(--privy-color-accent);
  cursor: pointer;

  :active {
    stroke: var(--privy-color-accent-light);
  }
`,
    j = t.m`
  border-radius: 8px;
  background: var(--privy-color-foreground-4);
`,
    z = t.m`
  border-radius: 8px;
  transition: all 0.1s ease-out;
  background: ${({ $label: r }) => ("Strong" === r ? "var(--privy-color-icon-success)" : "Medium" === r && "var(--privy-color-icon-warning)") || "var(--privy-color-icon-error)"};
`,
    $ = t.z.progress`
  height: 4px;
  width: 100%;
  margin: 8px 0;

  /* Neither engine exposes its pseudo-elements until the native widget is opted out of. */
  appearance: none;

  /* Firefox's track, and a fallback under the WebKit bar. */
  ${j}

  &::-webkit-progress-bar {
    ${j}
  }

  &::-webkit-progress-value {
    ${z}
  }

  &::-moz-progress-bar {
    ${z}
  }
`;
  r.s(
    [
      "D",
      0,
      f,
      "E",
      0,
      d,
      "H",
      0,
      w,
      "I",
      0,
      y,
      "N",
      0,
      s,
      "P",
      0,
      h,
      "R",
      0,
      m,
      "S",
      0,
      k,
      "a",
      0,
      p,
      "b",
      0,
      g,
      "c",
      0,
      c,
      "d",
      0,
      x,
      "e",
      0,
      $,
      "f",
      0,
      u,
      "g",
      0,
      b,
    ],
    747006,
  );
};
