// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(132838),
    n = e.i(606933),
    i = e.i(38279),
    a = e.i(759257);
  let l = (e) => "applied" === e || "alreadyReferred" === e,
    s = new Set([
      "applied",
      "alreadyReferred",
      "refereeNotEligible",
      "accountPredatesProgram",
      "applyWindowClosed",
    ]);
  async function o(e) {
    return (0, a.j)()("POST /referral/apply", {
      body: { username: e.trim() },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to apply referral code (${r.status})`);
          },
        ],
      },
    });
  }
  function c(e) {
    return o(e);
  }
  (e.s(
    [
      "l",
      0,
      l,
      "y",
      0,
      function (e) {
        let a,
          l,
          o,
          u = (0, t.c)(9),
          { userAddress: d, onSuccess: f, onError: m } = e,
          p = (0, n.useQueryClient)();
        return (
          u[0] !== f || u[1] !== p || u[2] !== d
            ? ((a = (e, t) => {
                (s.has(e.outcome) &&
                  (p.invalidateQueries({
                    queryKey: i.Q.REFERRAL_ME({ userAddress: d }),
                  }),
                  p.invalidateQueries({
                    queryKey: i.Q.FEES_ME({ userAddress: d }),
                  })),
                  f?.(e, t));
              }),
              (u[0] = f),
              (u[1] = p),
              (u[2] = d),
              (u[3] = a))
            : (a = u[3]),
          u[4] !== m
            ? ((l = (e, t) => {
                m?.(e, t);
              }),
              (u[4] = m),
              (u[5] = l))
            : (l = u[5]),
          u[6] !== a || u[7] !== l
            ? ((o = { mutationFn: c, onSuccess: a, onError: l }),
              (u[6] = a),
              (u[7] = l),
              (u[8] = o))
            : (o = u[8]),
          (0, r.f)(o)
        );
      },
    ],
    850956,
  ),
    e.i(12692));
  var u = e.i(398902),
    d = e.i(536925),
    f = e.i(257165);
  let m = /^[A-Za-z0-9_]{1,15}$/;
  (e.s(
    [
      "x",
      0,
      15,
      "b",
      0,
      function (e) {
        let r,
          n,
          i,
          a,
          l = (0, t.c)(24),
          { t: s } = (0, u.f)();
        l[0] !== e ? ((r = e.trim()), (l[0] = e), (l[1] = r)) : (r = l[1]);
        let o = r,
          [c] = (0, d.r)(o, 500),
          p = o !== c;
        l[2] !== o ? ((n = m.test(o)), (l[2] = o), (l[3] = n)) : (n = l[3]);
        let h = n,
          g = (0, f.f)(c, h && !p);
        if (0 === o.length) {
          let e;
          return (
            l[4] !== o
              ? ((e = { trimmedCode: o, canSubmit: !1, message: void 0 }),
                (l[4] = o),
                (l[5] = e))
              : (e = l[5]),
            e
          );
        }
        if (!h) {
          let e, t;
          return (
            l[6] !== s
              ? ((e = s("web.profile.referral_apply_invalid_code")),
                (l[6] = s),
                (l[7] = e))
              : (e = l[7]),
            l[8] !== e || l[9] !== o
              ? ((t = { trimmedCode: o, canSubmit: !1, message: e }),
                (l[8] = e),
                (l[9] = o),
                (l[10] = t))
              : (t = l[10]),
            t
          );
        }
        if (p) {
          let e;
          return (
            l[11] !== o
              ? ((e = { trimmedCode: o, canSubmit: !1, message: void 0 }),
                (l[11] = o),
                (l[12] = e))
              : (e = l[12]),
            e
          );
        }
        if (g.isError) {
          let e;
          return (
            l[13] !== o
              ? ((e = { trimmedCode: o, canSubmit: !0, message: void 0 }),
                (l[13] = o),
                (l[14] = e))
              : (e = l[14]),
            e
          );
        }
        if (!g.isSuccess) {
          let e;
          return (
            l[15] !== o
              ? ((e = { trimmedCode: o, canSubmit: !1, message: void 0 }),
                (l[15] = o),
                (l[16] = e))
              : (e = l[16]),
            e
          );
        }
        if (g.data) {
          let e;
          return (
            l[17] !== o
              ? ((e = { trimmedCode: o, canSubmit: !0, message: void 0 }),
                (l[17] = o),
                (l[18] = e))
              : (e = l[18]),
            e
          );
        }
        return (
          l[19] !== s
            ? ((i = s("onboarding.referral_code.unknown_username")),
              (l[19] = s),
              (l[20] = i))
            : (i = l[20]),
          l[21] !== i || l[22] !== o
            ? ((a = { trimmedCode: o, canSubmit: !1, message: i }),
              (l[21] = i),
              (l[22] = o),
              (l[23] = a))
            : (a = l[23]),
          a
        );
      },
    ],
    865229,
  ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          if (l(t)) return { kind: "recorded" };
          switch (t) {
            case "unknownUsername":
              return {
                kind: "inline",
                message: e("onboarding.referral_code.unknown_username"),
              };
            case "selfReferral":
              return {
                kind: "inline",
                message: e("web.profile.referral_apply_self_referral"),
              };
            case "referrerNotEligible":
            case "referrerNotOlder":
              return {
                kind: "inline",
                message: e("web.profile.referral_apply_code_ineligible"),
              };
            case "refereeNotEligible":
            case "accountPredatesProgram":
            case "applyWindowClosed":
              return {
                kind: "toast",
                message: e("web.profile.referral_apply_not_eligible"),
              };
            default:
              return {
                kind: "toast",
                message: e("web.profile.referral_apply_failed"),
              };
          }
        },
      ],
      54065,
    ));
};
