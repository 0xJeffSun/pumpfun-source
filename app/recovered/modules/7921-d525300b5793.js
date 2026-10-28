// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    i = e.i(933185),
    n = e.i(636447),
    o = e.i(151666);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let a = {
    component: () => {
      let { user: e } = (0, i.u)(),
        a = (0, i.a)(),
        s = (0, r.useMemo)(
          () =>
            e?.mfaMethods.filter(
              (e) => "passkey" !== e || !a.globalDisablePasskeys,
            ) ?? [],
          [e?.mfaMethods, a.globalDisablePasskeys],
        ),
        { data: l } = (0, n.u)(),
        [c, d] = (0, r.useState)(s[0]),
        [p, h] = (0, r.useState)(!1),
        [u, m] = (0, r.useState)(),
        [x, f] = (0, r.useState)();
      if (
        ((0, r.useEffect)(() => {
          d(s[0]);
        }, [s]),
        !l?.mfaVerify)
      )
        throw Error("Missing modal data for MFA verification screen.");
      let {
          onFailure: g,
          onSuccess: v,
          generateOptions: y,
          verifyTotpCode: w,
          verifyPasskey: C,
          verifySmsCode: j,
          sendSmsCode: b,
        } = l.mfaVerify,
        k = async (e) => {
          if ("passkey" !== e)
            try {
              (d(e), "sms" === e && (d(e), await b()), "totp" === e && d(e));
            } catch (e) {
              console.error(e);
            }
          else
            try {
              d(e);
              let t = await y();
              if (!t) throw Error("something went wrong");
              (m(t), await C(t), h(!0), f(void 0), v());
            } catch (e) {
              f((0, o.t)(e));
            }
        },
        E = async (e) => {
          f(void 0);
          try {
            if (!e || !c) return;
            if ("passkey" === c) {
              if (!u) throw Error("Missing passkey challenge");
              await C(u);
            } else "sms" === c ? await j(e) : "totp" === c && (await w(e));
            (f(void 0), h(!0), v());
          } catch (e) {
            throw (0, o.t)(e).error;
          }
        },
        M = () => {
          x || !p ? g(x?.error ?? Error("Canceled MFA verification.")) : v();
        },
        S = (0, r.useRef)(!1);
      return (
        (0, r.useEffect)(() => {
          !S.current &&
            c &&
            ((S.current = !0),
            k(c).finally(() => {
              S.current = !1;
            }));
        }, [open]),
        e
          ? "passkey" === c
            ? (0, t.jsx)(o.V, {
                account: e.linkedAccounts
                  .filter((e) => "passkey" === e.type && e.enrolledInMfa)
                  .sort(
                    (e, t) =>
                      t.firstVerifiedAt.valueOf() - e.firstVerifiedAt.valueOf(),
                  )[0],
                submitSuccess: p,
                hasBlockingError: x?.isBlocking ?? !1,
                error: x?.error,
                onClose: M,
                onBack: () => {
                  (d(void 0), f(void 0));
                },
                handleSubmit: () => E(u).catch(f),
              })
            : "sms" === c || "totp" === c
              ? (0, t.jsx)(o.a, {
                  selectedMethod: c,
                  submitSuccess: p,
                  hasBlockingError: x?.isBlocking ?? !1,
                  handleSubmitCode: E,
                  onClose: M,
                  onBack: s.length > 1 ? () => d(void 0) : void 0,
                })
              : (0, t.jsx)(o.b, { mfaMethods: s, onSelect: k, handleClose: M })
          : null
      );
    },
  };
  e.s(["MfaAuthVerifyFlowScreen", 0, a, "default", 0, a]);
};
