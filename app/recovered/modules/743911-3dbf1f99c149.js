// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(352386),
    o = e.i(689391),
    a = e.i(42799),
    t = e.i(336651),
    l = e.i(933185),
    n = e.i(315430),
    s = e.i(995040),
    c = e.i(23915);
  let d = ({ value: e, onChange: i }) =>
      (0, r.jsx)("select", {
        value: e,
        onChange: i,
        children: a.h.map((e) =>
          (0, r.jsxs)(
            "option",
            { value: e.code, children: [e.code, " +", e.callCode] },
            e.code,
          ),
        ),
      }),
    p = (0, i.forwardRef)((e, o) => {
      let p = (0, l.a)(),
        [u, v] = (0, i.useState)(!1),
        { accountType: f } = (0, n.h)(),
        [x, m] = (0, i.useState)(""),
        [b, y] = (0, i.useState)(
          e.defaultCountry ?? p?.intl.defaultCountry ?? "US",
        ),
        w = (0, a.o)(x, b),
        C = (0, a.M)(b),
        j = (0, a.i)(b),
        A = (0, t.f)(b),
        k = !w,
        [M, S] = (0, i.useState)(!1),
        z = A.length,
        L = (r) => {
          let i = r.target.value;
          (y(i),
            m(""),
            e.onChange &&
              e.onChange({
                rawPhoneNumber: x,
                qualifiedPhoneNumber: (0, a.A)(x, i),
                countryCode: i,
                isValid: (0, a.o)(x, b),
              }));
        },
        E = (r, i) => {
          try {
            let o =
              r.replace(/\D/g, "") === x.replace(/\D/g, "") ? r : C.input(r);
            (m(o),
              e.onChange &&
                e.onChange({
                  rawPhoneNumber: o,
                  qualifiedPhoneNumber: (0, a.A)(r, i),
                  countryCode: i,
                  isValid: (0, a.o)(r, i),
                }));
          } catch (e) {
            console.error("Error processing phone number:", e);
          }
        },
        B = () => {
          S(!0);
          let r = (0, a.A)(x, b);
          e.onSubmit({
            rawPhoneNumber: x,
            qualifiedPhoneNumber: r,
            countryCode: b,
            isValid: (0, a.o)(x, b),
          }).finally(() => S(!1));
        };
      return (
        (0, i.useEffect)(() => {
          if (e.defaultValue) {
            let r = (0, a.N)(e.defaultValue);
            (C.reset(),
              L({ target: { value: r.countryCode } }),
              E(r.phone, r.countryCode));
          }
        }, [e.defaultValue]),
        (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(h, {
              children: (0, r.jsxs)(g, {
                $callingCodeLength: z,
                $stacked: e.stacked,
                children: [
                  (0, r.jsx)(d, { value: b, onChange: L }),
                  (0, r.jsx)("input", {
                    ref: o,
                    id: "phone-number-input",
                    className: "login-method-button",
                    type: "tel",
                    placeholder: j,
                    onFocus: () => v(!0),
                    onChange: (e) => {
                      E(e.target.value, b);
                    },
                    onKeyUp: (e) => {
                      "Enter" === e.key && B();
                    },
                    value: x,
                    autoComplete: "tel",
                  }),
                  "phone" !== f || u || e.hideRecent
                    ? e.stacked || e.noIncludeSubmitButton
                      ? (0, r.jsx)("span", {})
                      : (0, r.jsx)(s.E, {
                          isSubmitting: M,
                          onClick: B,
                          disabled: k,
                          children: "Submit",
                        })
                    : (0, r.jsx)(c.C, { color: "gray", children: "Recent" }),
                ],
              }),
            }),
            e.stacked && !e.noIncludeSubmitButton
              ? (0, r.jsx)(s.P, {
                  loading: M,
                  loadingText: null,
                  onClick: B,
                  disabled: k,
                  children: "Submit",
                })
              : null,
          ],
        })
      );
    }),
    h = o.z.div`
  width: 100%;
`,
    g = o.z.label`
  --country-code-dropdown-width: calc(54px + calc(12 * ${(e) => e.$callingCodeLength}px));
  --phone-input-extra-padding-left: calc(12px + calc(3 * ${(e) => e.$callingCodeLength}px));
  display: block;
  position: relative;
  width: 100%;

  /* Tablet and Up */
  @media (min-width: 441px) {
    --country-code-dropdown-width: calc(52px + calc(10 * ${(e) => e.$callingCodeLength}px));
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
    padding-right: ${(e) => (e.$stacked ? "16px" : "88px")};
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
  e.s(["C", 0, p]);
};
