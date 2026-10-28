// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(599077),
    a = e.i(352386),
    i = e.i(191201),
    o = e.i(314197);
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          s,
          l,
          u,
          c,
          d,
          f,
          m,
          h = (0, t.c)(16),
          { address: p } = (0, r.F)(),
          w = (0, n.usePathname)(),
          y = (0, n.useSearchParams)(),
          b = (0, o.f)(),
          g = (0, a.useRef)(null);
        h[0] !== y
          ? ((e = y?.toString() ?? ""), (h[0] = y), (h[1] = e))
          : (e = h[1]);
        let x = e,
          v = x ? `${w}?${x}` : w;
        h[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = () => {
              let e = g.current;
              e && ((g.current = null), e.resolve("connected"));
            }),
            (h[2] = s))
          : (s = h[2]);
        let _ = s;
        h[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = (e, t) => {
              let r = g.current;
              r &&
                ((g.current = null),
                r.resolve(
                  t?.preservePendingRetry ? "retry-pending" : "cancelled",
                ));
            }),
            (h[3] = l))
          : (l = h[3]);
        let k = l,
          E = p ?? "";
        h[4] !== v || h[5] !== E
          ? ((u = {
              userIdentifier: E,
              returnTo: v,
              onConnected: _,
              onCancelled: k,
            }),
            (h[4] = v),
            (h[5] = E),
            (h[6] = u))
          : (u = h[6]);
        let { connect: N, isLoading: S } = (0, i.f)(u);
        (h[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = () => {
              let e = (e) => {
                if (!e.persisted) return;
                let t = new URLSearchParams(window.location.search);
                k(void 0, {
                  preservePendingRetry: t.has("xConnected") || t.has("xError"),
                });
              };
              return (
                window.addEventListener("pageshow", e),
                () => window.removeEventListener("pageshow", e)
              );
            }),
            (d = [k]),
            (h[7] = c),
            (h[8] = d))
          : ((c = h[7]), (d = h[8])),
          (0, a.useEffect)(c, d),
          h[9] !== p || h[10] !== N || h[11] !== b
            ? ((f = async () => {
                if (!b || !p) return "cancelled";
                g.current &&
                  (g.current.resolve("cancelled"), (g.current = null));
                let e = new Promise((e) => {
                  g.current = { resolve: e };
                });
                return (N(), e);
              }),
              (h[9] = p),
              (h[10] = N),
              (h[11] = b),
              (h[12] = f))
            : (f = h[12]));
        let P = f;
        return (
          h[13] !== P || h[14] !== S
            ? ((m = { ensureXAccountConnected: P, isConnecting: S }),
              (h[13] = P),
              (h[14] = S),
              (h[15] = m))
            : (m = h[15]),
          m
        );
      },
    ],
    386389,
  );
  var s = e.i(606933);
  e.i(12692);
  var l = e.i(398902),
    u = e.i(63289),
    c = e.i(836119);
  let d = "x-oauth-pending-retry-v1",
    f = {
      missing_params: "Verification was interrupted. Please try again.",
      oauth_failed: "X connection was cancelled. Please try again.",
      callback_failed: "Could not finish X sign-in. Please try again.",
    },
    m = (e) => {
      try {
        sessionStorage.setItem(d, JSON.stringify(e));
      } catch {}
    },
    h = () => {
      try {
        var e = sessionStorage.getItem(d);
        if (!e) return null;
        try {
          let t = JSON.parse(e);
          if (t?.v !== 1) return null;
          if (
            ("bounty-create" === t.action && t.variables) ||
            ("bounty-submit" === t.action && t.taskId && t.input)
          )
            return t;
          return null;
        } catch {
          return null;
        }
      } catch {
        return null;
      }
    },
    p = () => {
      let e = h();
      return (e && w(), e);
    },
    w = () => {
      try {
        sessionStorage.removeItem(d);
      } catch {}
    };
  (e.s(["W", 0, f, "j", 0, w, "b", 0, p, "E", 0, h, "T", 0, m], 492131),
    e.s(
      [
        "f",
        0,
        (e) => {
          let i,
            d,
            m,
            y,
            b,
            g,
            x,
            v,
            _,
            k = (0, t.c)(22),
            { t: E } = (0, l.f)(),
            N = (0, n.useRouter)(),
            S = (0, n.usePathname)(),
            P = (0, n.useSearchParams)();
          k[0] !== P
            ? ((i = P.toString()), (k[0] = P), (k[1] = i))
            : (i = k[1]);
          let R = i,
            C = (0, s.useQueryClient)(),
            { address: I, userId: j, setXAccountConnected: A } = (0, r.F)(),
            T = (0, o.f)(),
            M = (0, a.useRef)(null),
            $ = (0, a.useRef)(e.onResumeCreate),
            B = (0, a.useRef)(e.onResumeSubmit),
            F = (0, a.useRef)(e.taskId);
          (k[2] !== e.onResumeCreate
            ? ((d = () => {
                $.current = e.onResumeCreate;
              }),
              (m = [e.onResumeCreate]),
              (k[2] = e.onResumeCreate),
              (k[3] = d),
              (k[4] = m))
            : ((d = k[3]), (m = k[4])),
            (0, a.useEffect)(d, m),
            k[5] !== e.onResumeSubmit
              ? ((y = () => {
                  B.current = e.onResumeSubmit;
                }),
                (b = [e.onResumeSubmit]),
                (k[5] = e.onResumeSubmit),
                (k[6] = y),
                (k[7] = b))
              : ((y = k[6]), (b = k[7])),
            (0, a.useEffect)(y, b),
            k[8] !== e.taskId
              ? ((g = () => {
                  F.current = e.taskId;
                }),
                (x = [e.taskId]),
                (k[8] = e.taskId),
                (k[9] = g),
                (k[10] = x))
              : ((g = k[9]), (x = k[10])),
            (0, a.useEffect)(g, x),
            k[11] !== I ||
            k[12] !== S ||
            k[13] !== C ||
            k[14] !== N ||
            k[15] !== R ||
            k[16] !== A ||
            k[17] !== E ||
            k[18] !== j ||
            k[19] !== T
              ? ((v = () => {
                  if (!T) return;
                  let e = new URLSearchParams(R),
                    t = e.get("xConnected"),
                    r = e.get("xError");
                  if (!t && !r) {
                    M.current = null;
                    return;
                  }
                  if (M.current === R) return;
                  ((M.current = R), e.delete("xConnected"), e.delete("xError"));
                  let n = e.toString();
                  if ((N.replace(n ? `${S}?${n}` : S, { scroll: !1 }), r)) {
                    (u.c.error(E("web.auth.x_connect_failed"), {
                      description: f[r] ?? E("web.auth.x_verification_failed"),
                    }),
                      p());
                    return;
                  }
                  if ("1" !== t) return;
                  (A(!0),
                    (0, c.f)({
                      address: I,
                      userId: j,
                      userIdentifier: I ?? "",
                      queryClient: C,
                      router: N,
                    }),
                    u.c.success(E("web.auth.x_account_connected")));
                  let a = h();
                  if (a?.action === "bounty-create" && $.current) {
                    (w(), $.current(a.variables));
                    return;
                  }
                  a?.action === "bounty-submit" &&
                    B.current &&
                    F.current === a.taskId &&
                    (w(), B.current({ taskId: a.taskId, input: a.input }));
                }),
                (_ = [I, j, S, C, N, R, A, E, T]),
                (k[11] = I),
                (k[12] = S),
                (k[13] = C),
                (k[14] = N),
                (k[15] = R),
                (k[16] = A),
                (k[17] = E),
                (k[18] = j),
                (k[19] = T),
                (k[20] = v),
                (k[21] = _))
              : ((v = k[20]), (_ = k[21])),
            (0, a.useEffect)(v, _));
        },
      ],
      371240,
    ));
  var y = e.i(777683),
    b = e.i(732486),
    g = e.i(745018),
    x = e.i(506486),
    v = e.i(635666),
    _ = e.i(938277);
  let k = "Bounty creation isn't available right now. Please try again later.",
    E = ({
      xEnabled: e,
      blockedMessage: t = k,
      minFollowers: r,
      currentFollowers: n,
    }) => {
      e
        ? (({ minFollowers: e, currentFollowers: t } = {}) => {
            u.c.custom(
              (r) =>
                (0, b.jsx)(x.O, {
                  tone: "loss",
                  testId: "bounty-min-x-followers-toast",
                  ariaLabel: "Not enough X followers, click to dismiss",
                  onDismiss: () => u.c.dismiss(r),
                  glyph: (0, b.jsx)(g.Tc, {}),
                  title:
                    e && e > 0
                      ? `Your X account needs at least ${e} followers`
                      : "Your X account needs more followers",
                  subtitle: ((e) => {
                    let t =
                      "Manage your X connection to check your follower count, reconnect, or switch accounts.";
                    if (void 0 === e) return t;
                    let r = 1 === e ? "follower" : "followers";
                    return `You have ${(0, _.J)(e)} ${r} right now. ${t}`;
                  })(t),
                  subtitleLines: 2,
                  durationMs: 8e3,
                  action: (0, b.jsx)(x.m, {
                    href: "/go/mine",
                    target: "_self",
                    children: "Manage X",
                  }),
                }),
              { id: "bounty-min-x-followers", duration: 8e3 },
            );
          })({ minFollowers: r, currentFollowers: n })
        : u.c.error(t);
    };
  e.s(
    [
      "G",
      0,
      k,
      "S",
      0,
      "Bounty submissions aren't available right now. Please try again later.",
      "K",
      0,
      E,
    ],
    389277,
  );
  let N = async (e, t) => {
      try {
        return { ok: !0, value: await e(t) };
      } catch (e) {
        return { ok: !1, structured: await (0, y.A)(e) };
      }
    },
    S = async (e) => {
      var t, r;
      let n = await N(e.createAsync, e.variables);
      return n.ok
        ? n.value
        : ((t = n.structured),
          (r = e.t),
          (0, y.y)(t)
            ? E({
                xEnabled: !0,
                minFollowers: t.minFollowers,
                currentFollowers: t.currentFollowers,
              })
            : t?.code === "X_ACCOUNT_NOT_CONNECTED" &&
              u.c.error(r("web.bounties.x_verify_error")),
          null);
    },
    P = (e) => {
      let {
        structured: t,
        xEnabled: r,
        pumpGateEnabled: n,
        blockedMessage: a,
        profileHref: i,
      } = e;
      return (0, y.s)(t)
        ? ((({ minFollowers: e, currentFollowers: t, profileHref: r } = {}) => {
            u.c.custom(
              (n) =>
                (0, b.jsx)(x.O, {
                  tone: "loss",
                  testId: "bounty-min-pump-followers-toast",
                  ariaLabel: "Not enough followers, click to dismiss",
                  onDismiss: () => u.c.dismiss(n),
                  glyph: (0, b.jsx)(g._3, {}),
                  title: (0, v.R)(e),
                  subtitle: (0, v.p)({ currentFollowers: t, minFollowers: e }),
                  subtitleLines: 2,
                  durationMs: 8e3,
                  action: r
                    ? (0, b.jsx)(x.m, {
                        href: r,
                        target: "_self",
                        children: "View profile",
                      })
                    : void 0,
                }),
              { id: "bounty-min-pump-followers", duration: 8e3 },
            );
          })({
            minFollowers: t.minFollowers,
            currentFollowers: t.currentFollowers,
            profileHref: i,
          }),
          !0)
        : !!(0, y.y)(t) &&
            (E({
              xEnabled: r && !n,
              blockedMessage: a,
              minFollowers: t.minFollowers,
              currentFollowers: t.currentFollowers,
            }),
            !0);
    },
    R = async (e) => {
      let {
          createAsync: t,
          ensureXAccountConnected: r,
          variables: n,
          xEnabled: a,
          pumpGateEnabled: i = !1,
          profileHref: o,
          t: s,
        } = e,
        l = await N(t, n);
      if (l.ok) return l.value;
      if (
        P({
          structured: l.structured,
          xEnabled: a,
          pumpGateEnabled: i,
          blockedMessage: k,
          profileHref: o,
        }) ||
        l.structured?.code !== "X_ACCOUNT_NOT_CONNECTED"
      )
        return null;
      if (!a || i) return (u.c.error(k), null);
      m({ v: 1, action: "bounty-create", variables: n });
      let c = await r();
      return "connected" !== c
        ? ("cancelled" === c && w(), null)
        : (w(), S({ createAsync: t, variables: n, t: s }));
    };
  e.s(["m", 0, S, "y", 0, R, "e", 0, P], 663547);
};
