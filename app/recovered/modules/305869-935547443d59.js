// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(689391),
    i = e.i(294882);
  let o = r.z.label`
  display: block;
  position: relative;
  width: 100%;
  height: 56px;

  && > :first-child {
    position: absolute;
    left: 0.75em;
    top: 50%;
    transform: translate(0, -50%);
  }

  && > input {
    font-size: 16px;
    line-height: 24px;
    color: var(--privy-color-foreground);

    padding: 12px 88px 12px 52px;
    flex-grow: 1;
    background: var(--privy-color-background);
    border: 1px solid
      ${({ $error: e }) => (e ? "var(--privy-color-error) !important" : "var(--privy-color-foreground-4)")};
    border-radius: var(--privy-border-radius-md);
    width: 100%;
    height: 100%;

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
      padding-right: 78px;
    }

    :focus {
      outline: none;
      border-color: ${({ $error: e }) => (e ? "var(--privy-color-error) !important" : "var(--privy-color-accent-light)")};
      box-shadow: ${({ $error: e }) => (e ? "none" : "0 0 0 1px var(--privy-color-accent-light)")};
    }

    :autofill,
    :-webkit-autofill {
      background: var(--privy-color-background);
    }

    && > input::placeholder {
      color: var(--privy-color-foreground-3);
    }
    &:disabled {
      opacity: 0.4; /* Make it visually appear disabled */
      cursor: not-allowed; /* Change cursor to not-allowed */
    }
    &:disabled,
    &:disabled:hover,
    &:disabled > span {
      color: var(--privy-color-foreground-3); /* Change text color to grey */
    }
  }

  && > button:last-child {
    right: 0;
    line-height: 24px;
    padding: 16px 17px;
    /* matches the border radius of the input only on the right side where we touch the radius */
    border-radius: 0 var(--privy-border-radius-md) var(--privy-border-radius-md) 0;

    :focus {
      outline: none;
    }
    &:disabled {
      opacity: 0.4; /* Make it visually appear disabled */
      cursor: not-allowed; /* Change cursor to not-allowed */
    }
    &:disabled,
    &:disabled:hover,
    &:disabled > span {
      color: var(--privy-color-foreground-3); /* Change text color to grey */
    }
  }
`,
    a = (0, r.z)(o)`
  background-color: var(--privy-color-background);
  transition: background-color 200ms ease;
`,
    t = (0, r.z)(o)`
  && > input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    padding-right: ${(e) => (e.$stacked ? "16px" : "88px")};

    border: 1px solid
      ${({ $error: e }) => (e ? "var(--privy-color-error) !important" : "var(--privy-color-foreground-4)")};

    && > input::placeholder {
      color: var(--privy-color-foreground-3);
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
    padding: 16px 17px;

    :focus {
      outline: none;
    }
  }
`,
    l = r.z.div`
  width: 100%;

  /* Add styling for the ErrorMessage within EmailInput */
  && > ${i.E} {
    display: block;
    text-align: left;
    padding-left: var(--privy-border-radius-md);
    padding-bottom: 5px;
  }
`;
  e.s(["E", 0, a, "I", 0, l, "a", 0, t]);
};
