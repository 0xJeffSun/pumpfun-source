// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(959719),
    r = e.i(352386),
    o = e.i(51954),
    i = e.i(227627),
    u = e.i(655397);
  let a = (0, u.p)();
  function l(e) {
    return e.acquire;
  }
  function c(e) {
    return e.touchLease;
  }
  function s(e) {
    return e.leaseGcConfig;
  }
  function f(e) {
    return e.tokenBalanceByMint[(0, u.p)().toBase58()] ?? null;
  }
  function d(e) {
    return e.acquire;
  }
  function m(e) {
    return e.touchLease;
  }
  function h(e) {
    return e.leaseGcConfig;
  }
  function g(e) {
    return e.user.solBalance;
  }
  function p(e) {
    return e.acquire;
  }
  function b(e) {
    return e.touchLease;
  }
  function A(e) {
    return e.leaseGcConfig;
  }
  function y(e) {
    return e.user.address;
  }
  let v = (0, u.p)().toBase58();
  function w(e) {
    return e.user;
  }
  function B(e) {
    return e.tokenBalanceByMint[v] ?? null;
  }
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          u = (0, t.c)(7),
          v = (0, o.f)(w),
          k = (0, o.f)(B);
        ((() => {
          let e,
            n,
            u = (0, t.c)(5),
            a = (0, o.f)(d),
            l = (0, o.f)(m),
            { heartbeatMs: c } = (0, o.f)(h),
            s = ((0, o.f)(g), (0, r.useRef)(null));
          return (
            u[0] !== a || u[1] !== c || u[2] !== l
              ? ((e = () => {
                  let { token: e, release: t } = a({
                    tag: i.C.SOL_BALANCE,
                    data: null,
                  });
                  return (
                    (s.current = setInterval(() => {
                      l(e);
                    }, c)),
                    () => {
                      (s.current &&
                        (clearInterval(s.current), (s.current = null)),
                        t());
                    }
                  );
                }),
                (n = [a, l, c]),
                (u[0] = a),
                (u[1] = c),
                (u[2] = l),
                (u[3] = e),
                (u[4] = n))
              : ((e = u[3]), (n = u[4])),
            (0, r.useEffect)(e, n)
          );
        })(),
          (() => {
            let e,
              n,
              u = (0, t.c)(6),
              a = (0, o.f)(p),
              l = (0, o.f)(b),
              { heartbeatMs: c } = (0, o.f)(A),
              s = (0, o.f)(y),
              f = (0, r.useRef)(null);
            (u[0] !== a || u[1] !== c || u[2] !== l || u[3] !== s
              ? ((e = () => {
                  if (!s) return;
                  let { token: e, release: t } = a({
                    tag: i.C.USER_ACCOUNTS,
                    data: { address: s },
                  });
                  return (
                    (f.current = setInterval(() => {
                      l(e);
                    }, c)),
                    () => {
                      (f.current &&
                        (clearInterval(f.current), (f.current = null)),
                        t());
                    }
                  );
                }),
                (n = [s, a, l, c]),
                (u[0] = a),
                (u[1] = c),
                (u[2] = l),
                (u[3] = s),
                (u[4] = e),
                (u[5] = n))
              : ((e = u[4]), (n = u[5])),
              (0, r.useEffect)(e, n));
          })(),
          (() => {
            let e,
              u,
              d = (0, t.c)(5),
              m = (0, o.f)(l),
              h = (0, o.f)(c),
              { heartbeatMs: g } = (0, o.f)(s),
              p = ((0, o.f)(f), (0, r.useRef)(null));
            return (
              d[0] !== m || d[1] !== g || d[2] !== h
                ? ((e = () => {
                    let { token: e, release: t } = m({
                      tag: i.C.TOKEN_BALANCE,
                      data: { mint: a, tokenProgram: n.z },
                    });
                    return (
                      (p.current = setInterval(() => {
                        h(e);
                      }, g)),
                      () => {
                        (p.current &&
                          (clearInterval(p.current), (p.current = null)),
                          t());
                      }
                    );
                  }),
                  (u = [m, h, g]),
                  (d[0] = m),
                  (d[1] = g),
                  (d[2] = h),
                  (d[3] = e),
                  (d[4] = u))
                : ((e = d[3]), (u = d[4])),
              (0, r.useEffect)(e, u)
            );
          })());
        let S = v.userWsolAccountInfo?.accountInfo ?? null;
        return (
          u[0] !== S ||
          u[1] !== k ||
          u[2] !== v.creatorFeeBalanceDisplay ||
          u[3] !== v.creatorFeeBalanceUsdcDisplay ||
          u[4] !== v.solBalance ||
          u[5] !== v.solBalanceLoaded
            ? ((e = {
                solBalance: v.solBalance,
                solBalanceLoaded: v.solBalanceLoaded,
                usdcBalance: k,
                userWsolAccountInfo: S,
                combinedSolBalanceDisplay: v.creatorFeeBalanceDisplay,
                creatorFeeBalanceUsdcDisplay: v.creatorFeeBalanceUsdcDisplay,
              }),
              (u[0] = S),
              (u[1] = k),
              (u[2] = v.creatorFeeBalanceDisplay),
              (u[3] = v.creatorFeeBalanceUsdcDisplay),
              (u[4] = v.solBalance),
              (u[5] = v.solBalanceLoaded),
              (u[6] = e))
            : (e = u[6]),
          e
        );
      },
    ],
    102824,
  );
};
