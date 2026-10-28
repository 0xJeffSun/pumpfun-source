// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var o = e.i(732486),
    n = e.i(352386),
    r = e.i(689391),
    t = e.i(42799),
    i = e.i(336651),
    l = e.i(933185),
    a = e.i(315430),
    s = e.i(995040),
    c = e.i(23915);
  let d = ({ value: e, onChange: n }) =>
      (0, o.jsx)("select", {
        value: e,
        onChange: n,
        children: t.h.map((e) =>
          (0, o.jsxs)(
            "option",
            { value: e.code, children: [e.code, " +", e.callCode] },
            e.code,
          ),
        ),
      }),
    u = (0, n.forwardRef)((e, r) => {
      let u = (0, l.a)(),
        [p, x] = (0, n.useState)(!1),
        { accountType: f } = (0, a.h)(),
        [g, y] = (0, n.useState)(""),
        [v, j] = (0, n.useState)(
          e.defaultCountry ?? u?.intl.defaultCountry ?? "US",
        ),
        w = (0, t.o)(g, v),
        b = (0, t.M)(v),
        C = (0, t.i)(v),
        k = (0, i.f)(v),
        S = !w,
        [M, E] = (0, n.useState)(!1),
        $ = k.length,
        P = (o) => {
          let n = o.target.value;
          (j(n),
            y(""),
            e.onChange &&
              e.onChange({
                rawPhoneNumber: g,
                qualifiedPhoneNumber: (0, t.A)(g, n),
                countryCode: n,
                isValid: (0, t.o)(g, v),
              }));
        },
        F = (o, n) => {
          try {
            let r =
              o.replace(/\D/g, "") === g.replace(/\D/g, "") ? o : b.input(o);
            (y(r),
              e.onChange &&
                e.onChange({
                  rawPhoneNumber: r,
                  qualifiedPhoneNumber: (0, t.A)(o, n),
                  countryCode: n,
                  isValid: (0, t.o)(o, n),
                }));
          } catch (e) {
            console.error("Error processing phone number:", e);
          }
        },
        R = () => {
          E(!0);
          let o = (0, t.A)(g, v);
          e.onSubmit({
            rawPhoneNumber: g,
            qualifiedPhoneNumber: o,
            countryCode: v,
            isValid: (0, t.o)(g, v),
          }).finally(() => E(!1));
        };
      return (
        (0, n.useEffect)(() => {
          if (e.defaultValue) {
            let o = (0, t.N)(e.defaultValue);
            (b.reset(),
              P({ target: { value: o.countryCode } }),
              F(o.phone, o.countryCode));
          }
        }, [e.defaultValue]),
        (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(h, {
              children: (0, o.jsxs)(m, {
                $callingCodeLength: $,
                $stacked: e.stacked,
                children: [
                  (0, o.jsx)(d, { value: v, onChange: P }),
                  (0, o.jsx)("input", {
                    ref: r,
                    id: "phone-number-input",
                    className: "login-method-button",
                    type: "tel",
                    placeholder: C,
                    onFocus: () => x(!0),
                    onChange: (e) => {
                      F(e.target.value, v);
                    },
                    onKeyUp: (e) => {
                      "Enter" === e.key && R();
                    },
                    value: g,
                    autoComplete: "tel",
                  }),
                  "phone" !== f || p || e.hideRecent
                    ? e.stacked || e.noIncludeSubmitButton
                      ? (0, o.jsx)("span", {})
                      : (0, o.jsx)(s.E, {
                          isSubmitting: M,
                          onClick: R,
                          disabled: S,
                          children: "Submit",
                        })
                    : (0, o.jsx)(c.C, { color: "gray", children: "Recent" }),
                ],
              }),
            }),
            e.stacked && !e.noIncludeSubmitButton
              ? (0, o.jsx)(s.P, {
                  loading: M,
                  loadingText: null,
                  onClick: R,
                  disabled: S,
                  children: "Submit",
                })
              : null,
          ],
        })
      );
    }),
    h = r.z.div`
  width: 100%;
`,
    m = r.z.label`
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
  e.s(["C", 0, u]);
};
