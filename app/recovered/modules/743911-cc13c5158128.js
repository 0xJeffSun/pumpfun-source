// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(689391),
    a = r.i(42799),
    n = r.i(336651),
    l = r.i(933185),
    t = r.i(315430),
    c = r.i(995040),
    d = r.i(23915);
  let s = ({ value: r, onChange: o }) =>
      (0, e.jsx)("select", {
        value: r,
        onChange: o,
        children: a.h.map((r) =>
          (0, e.jsxs)(
            "option",
            { value: r.code, children: [r.code, " +", r.callCode] },
            r.code,
          ),
        ),
      }),
    v = (0, o.forwardRef)((r, i) => {
      let v = (0, l.a)(),
        [h, g] = (0, o.useState)(!1),
        { accountType: b } = (0, t.h)(),
        [x, f] = (0, o.useState)(""),
        [y, m] = (0, o.useState)(
          r.defaultCountry ?? v?.intl.defaultCountry ?? "US",
        ),
        w = (0, a.o)(x, y),
        k = (0, a.M)(y),
        j = (0, a.i)(y),
        z = (0, n.f)(y),
        $ = !w,
        [C, S] = (0, o.useState)(!1),
        M = z.length,
        L = (e) => {
          let o = e.target.value;
          (m(o),
            f(""),
            r.onChange &&
              r.onChange({
                rawPhoneNumber: x,
                qualifiedPhoneNumber: (0, a.A)(x, o),
                countryCode: o,
                isValid: (0, a.o)(x, y),
              }));
        },
        V = (e, o) => {
          try {
            let i =
              e.replace(/\D/g, "") === x.replace(/\D/g, "") ? e : k.input(e);
            (f(i),
              r.onChange &&
                r.onChange({
                  rawPhoneNumber: i,
                  qualifiedPhoneNumber: (0, a.A)(e, o),
                  countryCode: o,
                  isValid: (0, a.o)(e, o),
                }));
          } catch (r) {
            console.error("Error processing phone number:", r);
          }
        },
        B = () => {
          S(!0);
          let e = (0, a.A)(x, y);
          r.onSubmit({
            rawPhoneNumber: x,
            qualifiedPhoneNumber: e,
            countryCode: y,
            isValid: (0, a.o)(x, y),
          }).finally(() => S(!1));
        };
      return (
        (0, o.useEffect)(() => {
          if (r.defaultValue) {
            let e = (0, a.N)(r.defaultValue);
            (k.reset(),
              L({ target: { value: e.countryCode } }),
              V(e.phone, e.countryCode));
          }
        }, [r.defaultValue]),
        (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)(p, {
              children: (0, e.jsxs)(u, {
                $callingCodeLength: M,
                $stacked: r.stacked,
                children: [
                  (0, e.jsx)(s, { value: y, onChange: L }),
                  (0, e.jsx)("input", {
                    ref: i,
                    id: "phone-number-input",
                    className: "login-method-button",
                    type: "tel",
                    placeholder: j,
                    onFocus: () => g(!0),
                    onChange: (r) => {
                      V(r.target.value, y);
                    },
                    onKeyUp: (r) => {
                      "Enter" === r.key && B();
                    },
                    value: x,
                    autoComplete: "tel",
                  }),
                  "phone" !== b || h || r.hideRecent
                    ? r.stacked || r.noIncludeSubmitButton
                      ? (0, e.jsx)("span", {})
                      : (0, e.jsx)(c.E, {
                          isSubmitting: C,
                          onClick: B,
                          disabled: $,
                          children: "Submit",
                        })
                    : (0, e.jsx)(d.C, { color: "gray", children: "Recent" }),
                ],
              }),
            }),
            r.stacked && !r.noIncludeSubmitButton
              ? (0, e.jsx)(c.P, {
                  loading: C,
                  loadingText: null,
                  onClick: B,
                  disabled: $,
                  children: "Submit",
                })
              : null,
          ],
        })
      );
    }),
    p = i.z.div`
  width: 100%;
`,
    u = i.z.label`
  --country-code-dropdown-width: calc(54px + calc(12 * ${(r) => r.$callingCodeLength}px));
  --phone-input-extra-padding-left: calc(12px + calc(3 * ${(r) => r.$callingCodeLength}px));
  display: block;
  position: relative;
  width: 100%;

  /* Tablet and Up */
  @media (min-width: 441px) {
    --country-code-dropdown-width: calc(52px + calc(10 * ${(r) => r.$callingCodeLength}px));
  }

  && > select {
    font-size: 16px;
    height: 24px;
    position: absolute;
    margin: 13px calc(var(--country-code-dropdown-width) / 4);
    line-height: 24px;
    width: var(--country-code-dropdown-width);
    background-color: var(--privy-color-background);
    background-size: auto;
    background-position-x: right;
    cursor: pointer;

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
      width: var(--country-code-dropdown-width);
    }

    :focus {
      outline: none;
      box-shadow: none;
    }
  }

  && > input {
    font-size: 16px;
    line-height: 24px;
    color: var(--privy-color-foreground);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    padding: 12px 88px 12px
      calc(var(--country-code-dropdown-width) + var(--phone-input-extra-padding-left));
    padding-right: ${(r) => (r.$stacked ? "16px" : "88px")};
    flex-grow: 1;
    background: var(--privy-color-background);
    border: 1px solid var(--privy-color-foreground-4);
    border-radius: var(--privy-border-radius-md);
    width: 100%;

    :focus {
      outline: none;
      border-color: var(--privy-color-accent);
    }

    :autofill,
    :-webkit-autofill {
      background: var(--privy-color-background);
    }

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
      padding-right: 78px;
    }
  }

  && > :last-child {
    right: 16px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  && > button:last-child {
    right: 0;
    line-height: 24px;
    padding: 13px 17px;

    :focus {
      outline: none;
      border-color: var(--privy-color-accent);
    }
  }

  && > input::placeholder {
    color: var(--privy-color-foreground-3);
  }
`;
  r.s(["C", 0, v]);
};
