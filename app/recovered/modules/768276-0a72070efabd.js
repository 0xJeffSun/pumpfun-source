// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(985526),
    i = e.i(755793);
  class n extends Error {
    reason;
    constructor(e, t) {
      (super(`nats token mint failed: ${e}`, { cause: t }),
        (this.reason = e),
        (this.name = "NatsTokenMintError"));
    }
  }
  let s = async (e) => {
      let t = e.response;
      if ("function" != typeof t?.clone) return;
      let r = await t
        .clone()
        .json()
        .catch(() => void 0);
      if (!r || "object" != typeof r) return;
      let i = r.error;
      return "string" == typeof i ? i : void 0;
    },
    l = async (e) => {
      if (e instanceof n) return { reason: e.reason };
      if (e?.name === "TimeoutError") return { reason: "mint_timeout" };
      let t = ((e) => {
        if (!e || "object" != typeof e || "HTTPError" !== e.name) return;
        let t = e.response?.status;
        return "number" == typeof t ? t : void 0;
      })(e);
      if (void 0 !== t) {
        let r = await s(e);
        return 404 === t
          ? { reason: "mint_disabled", status: t, code: r }
          : 403 === t && "NATS_AUTH_USER_SCOPE_REQUIRED" === r
            ? { reason: "mint_forbidden_scope", status: t, code: r }
            : 401 === t || 403 === t
              ? { reason: "mint_unauthorized", status: t, code: r }
              : { reason: "mint_http_error", status: t, code: r };
      }
      return { reason: "mint_network_error" };
    },
    a = (e) =>
      "mint_forbidden_scope" === e.reason
        ? 1 / 0
        : 429 === e.status
          ? 6e4
          : 3e4;
  async function o(e, t) {
    let r = await e
      .post("nats/token", { timeout: 1e4, retry: 0, signal: t })
      .json();
    if (
      !((e) => {
        if (!e || "object" != typeof e) return !1;
        let { jwt: t, expiresAt: r } = e;
        return (
          "string" == typeof t &&
          t.length > 0 &&
          "number" == typeof r &&
          Number.isFinite(r)
        );
      })(r)
    )
      throw new n("mint_bad_response");
    return r;
  }
  let u = {
      active: !1,
      generation: 0,
      minter: null,
      jwt: null,
      fallbackReason: null,
      renewTimer: null,
      inFlight: null,
      abort: null,
      retryNotBefore: 0,
      retryTimer: null,
      retryAttempt: 0,
      authListenerId: null,
    },
    c = new Set(),
    d = (e) => {
      if (u.jwt !== e) for (let t of ((u.jwt = e), c)) t();
    },
    f = () => {
      null !== u.renewTimer &&
        (clearTimeout(u.renewTimer), (u.renewTimer = null));
    },
    h = () => {
      null !== u.retryTimer &&
        (clearTimeout(u.retryTimer), (u.retryTimer = null));
    },
    m = (e, n, s) => {
      let { reason: l, status: o, code: c } = e;
      (f(),
        d(null),
        (u.fallbackReason = l),
        (u.retryNotBefore = Date.now() + a(e)),
        ((e) => {
          h();
          let t = a(e);
          if (!Number.isFinite(t)) return;
          let r = Math.min(3e4 * 2 ** u.retryAttempt, 3e5);
          u.retryAttempt += 1;
          let i = Math.max(t, r),
            n = 0.1 * i * Math.random();
          u.retryTimer = setTimeout(() => {
            ((u.retryTimer = null), g());
          }, i + n);
        })(e),
        (0, i.Q)(r.N.Core, null),
        t.y.warn("nats_auth.fallback", {
          reason: l,
          trigger: n,
          status: o,
          code: c,
          error: void 0 === s ? void 0 : String(s),
        }));
    },
    p = (e) => {
      if (e.instance === r.N.Core) {
        if ("auth_error" === e.type)
          return e.jwt && u.active && null !== u.jwt
            ? e.rejectedJwt !== u.jwt
              ? void t.y.debug("nats_auth.stale_auth_error_ignored", {
                  message: e.message,
                })
              : void m(
                  { reason: "connect_auth_error" },
                  "connect",
                  e.expired ? `expired: ${e.message}` : e.message,
                )
            : void 0;
        if ("subscription_limit" === e.type)
          return void t.y.warn("nats_auth.subscription_limit", {
            message: e.message,
          });
        t.y.warn("nats_auth.permissions_violation", {
          subject: e.subject,
          message: e.message,
        });
      }
    },
    b = (e) => {
      if (u.inFlight) return u.inFlight;
      let n = u.generation,
        s = new AbortController();
      u.abort = s;
      let a = () => !u.active || u.generation !== n,
        c = (async () => {
          u.retryNotBefore = Date.now() + 3e4;
          try {
            let n,
              l,
              c = u.minter;
            if (!c) return;
            let { jwt: m, expiresAt: p } = await o(c, s.signal);
            if (a()) return;
            (d(m),
              (u.fallbackReason = null),
              (u.retryAttempt = 0),
              h(),
              (0, i.Q)(r.N.Core, { jwt: m }),
              f(),
              (u.renewTimer = setTimeout(
                () => {
                  ((u.renewTimer = null), b("renew"));
                },
                ((n = ((e) => {
                  try {
                    let t = e.split(".")[1];
                    if (!t) return;
                    let r = atob(t.replace(/-/g, "+").replace(/_/g, "/")),
                      i = JSON.parse(r).iat;
                    return "number" == typeof i && Number.isFinite(i)
                      ? i
                      : void 0;
                  } catch {
                    return;
                  }
                })(m)),
                (l = Math.min(
                  3e6,
                  (void 0 === n ? 1e3 * p - Date.now() : (p - n) * 1e3) - 3e5,
                )) <= 0
                  ? 3e5
                  : Math.max(3e4, l)),
              )),
              t.y.debug("nats_auth.jwt_applied", { trigger: e, expiresAt: p }));
          } catch (r) {
            let t = await l(r);
            if (a()) return;
            m(t, e, r);
          } finally {
            u.generation === n && ((u.inFlight = null), (u.abort = null));
          }
        })();
      return ((u.inFlight = c), c);
    };
  function g() {
    return !u.active ||
      null === u.fallbackReason ||
      Date.now() < u.retryNotBefore
      ? Promise.resolve()
      : b("retry");
  }
  e.s([
    "C",
    0,
    () => null !== u.jwt,
    "N",
    0,
    g,
    "E",
    0,
    function (e) {
      return u.active
        ? (u.inFlight ?? Promise.resolve())
        : ((u.active = !0),
          (u.generation += 1),
          (u.minter = e),
          (u.fallbackReason = null),
          (u.retryNotBefore = 0),
          (u.retryAttempt = 0),
          (u.authListenerId = (0, i.R)(p)),
          b("login"));
    },
    "r",
    0,
    function () {
      u.active &&
        ((u.active = !1),
        (u.generation += 1),
        (u.minter = null),
        u.abort?.abort(),
        (u.abort = null),
        (u.inFlight = null),
        f(),
        h(),
        (u.retryAttempt = 0),
        null !== u.authListenerId &&
          ((0, i.u)(u.authListenerId), (u.authListenerId = null)),
        d(null),
        (u.fallbackReason = null),
        (u.retryNotBefore = 0),
        (0, i.Q)(r.N.Core, null));
    },
    "B",
    0,
    (e) => (
      c.add(e),
      () => {
        c.delete(e);
      }
    ),
  ]);
};
