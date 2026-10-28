// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    i = e.i(933185),
    n = e.i(616800),
    o = e.i(151666);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let l = ({ onClose: e }) => {
    let { user: l } = (0, i.u)(),
      a = (0, i.a)(),
      s = (0, r.useMemo)(
        () =>
          l?.mfaMethods.filter(
            (e) => "passkey" !== e || !a.globalDisablePasskeys,
          ) ?? [],
        [l?.mfaMethods, a.globalDisablePasskeys],
      ),
      [c, d] = (0, r.useState)(s[0] ?? null),
      { init: u, cancel: h, submit: p } = (0, n.u)(),
      [m, x] = (0, r.useState)(!1),
      [g, f] = (0, r.useState)(null),
      [v, y] = (0, r.useState)();
    (0, r.useEffect)(() => {
      d(s[0] ?? null);
    }, [s]);
    let w = (0, r.useRef)(!1);
    async function C(t) {
      y(void 0);
      try {
        if (!t || !c) return;
        (await p(c, t), x(!0), y(void 0), e());
      } catch (e) {
        throw (0, o.t)(e).error;
      }
    }
    async function j(t) {
      if ("passkey" !== t)
        try {
          (d(t), await u(t));
        } catch (e) {
          console.error(e);
        }
      else
        try {
          d(t);
          let r = await u(t);
          if (!r) throw Error("something went wrong");
          (f(r), await p(t, r), x(!0), y(void 0), e());
        } catch (e) {
          y((0, o.t)(e));
        }
    }
    (0, r.useEffect)(() => {
      !w.current &&
        c &&
        ((w.current = !0),
        j(c).finally(() => {
          w.current = !1;
        }));
    }, []);
    let b = () => {
      (d(null), y(void 0), h(), e());
    };
    return l
      ? "passkey" === c
        ? (0, t.jsx)(o.V, {
            account: l.linkedAccounts
              .filter((e) => "passkey" === e.type && e.enrolledInMfa)
              .sort(
                (e, t) =>
                  t.firstVerifiedAt.valueOf() - e.firstVerifiedAt.valueOf(),
              )[0],
            submitSuccess: m,
            hasBlockingError: v?.isBlocking ?? !1,
            error: v?.error,
            onClose: b,
            onBack: () => {
              (d(null), y(void 0));
            },
            handleSubmit: () => C(g).catch(y),
          })
        : c
          ? (0, t.jsx)(o.a, {
              submitSuccess: m,
              hasBlockingError: v?.isBlocking ?? !1,
              handleSubmitCode: C,
              selectedMethod: c,
              onClose: b,
              onBack: s.length > 1 ? () => d(null) : void 0,
            })
          : (0, t.jsx)(o.b, { mfaMethods: s, onSelect: j, handleClose: b })
      : null;
  };
  e.s(["MfaVerifyFlowScreen", 0, l, "default", 0, l]);
};
