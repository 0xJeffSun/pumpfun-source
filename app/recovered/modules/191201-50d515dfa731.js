// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(574472),
    r = e.i(545063),
    n = e.i(606933),
    i = e.i(599077),
    s = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(63289),
    l = e.i(314197),
    u = e.i(503630),
    d = e.i(836119),
    c = e.i(613677),
    f = e.i(342463),
    m = e.i(417326),
    p = e.i(418096);
  let w = c.z.object({ url: f.z.string().url() }),
    g = "x-oauth-done",
    b = c.z.object({
      type: m.z.literal(g),
      status: p.z.enum(["ok", "error"]),
      error: f.z.string().optional(),
    });
  e.s(
    [
      "f",
      0,
      (e) => {
        let { t: c } = (0, a.f)(),
          {
            userIdentifier: f,
            returnTo: m,
            onConnected: p,
            onCancelled: h,
          } = e,
          v = (0, i.useRouter)(),
          y = (0, n.useQueryClient)(),
          x = (0, l.f)(),
          { address: S, userId: N, setXAccountConnected: E } = (0, t.F)(),
          j = (0, r._)(),
          I = (0, s.useRef)(p),
          R = (0, s.useRef)(h);
        ((0, s.useEffect)(() => {
          I.current = p;
        }, [p]),
          (0, s.useEffect)(() => {
            R.current = h;
          }, [h]));
        let [A, _] = (0, s.useState)(!1),
          [L, T] = (0, s.useState)(null),
          O = (0, s.useRef)(null),
          D = (0, s.useRef)(null),
          M = (0, s.useRef)(null),
          P = (0, s.useRef)(!1),
          k = (0, s.useRef)(null),
          U = (0, s.useRef)(!1),
          C = (0, s.useRef)(!0),
          F = (0, s.useRef)(null),
          B = (0, s.useCallback)(() => {
            null !== k.current &&
              (window.clearTimeout(k.current), (k.current = null));
          }, []),
          G = (0, s.useCallback)(() => {
            (D.current &&
              (window.removeEventListener("message", D.current),
              (D.current = null)),
              null !== M.current &&
                (window.clearInterval(M.current), (M.current = null)),
              B(),
              O.current && !O.current.closed && O.current.close(),
              (O.current = null),
              (U.current = !1),
              F.current && (F.current.abort(), (F.current = null)));
          }, [B]),
          $ = (0, s.useCallback)(async () => {
            await (0, d.f)({
              address: S,
              userId: N,
              userIdentifier: f,
              queryClient: y,
              router: v,
            });
          }, [S, N, y, v, f]);
        return (
          (0, s.useEffect)(
            () => (
              (C.current = !0),
              () => {
                C.current = !1;
              }
            ),
            [],
          ),
          (0, s.useEffect)(
            () => () => {
              G();
            },
            [G],
          ),
          {
            connect: (0, s.useCallback)(async () => {
              if (!x)
                return void R.current?.(
                  c("web.x_account.connection_unavailable"),
                );
              if (null === j) {
                let e = c("web.x_account.wallet_not_connected");
                (T(e),
                  o.c.error(c("web.x_account.connect_failed"), {
                    description: e,
                  }));
                return;
              }
              if (U.current) return;
              ((U.current = !0), T(null), _(!0));
              let e = new AbortController();
              F.current = e;
              try {
                let t = void 0 !== m ? JSON.stringify({ returnTo: m }) : "{}",
                  r = await fetch(`${(0, u.c)().replace(/\/$/, "")}/x/auth`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: t,
                    signal: e.signal,
                  });
                if (!C.current) return;
                if (!r.ok) {
                  let e =
                    429 === r.status
                      ? "Too many attempts. Please wait a moment and try again."
                      : 401 === r.status
                        ? "You must be logged in to connect an X account."
                        : `Failed to start X verification (${r.status}).`;
                  throw Error(e);
                }
                let n = await r.json();
                if (!C.current) return;
                let i = w.safeParse(n);
                if (!i.success) throw Error("Unexpected response from server.");
                F.current === e && (F.current = null);
                let s = window.open(
                  i.data.url,
                  "x_oauth",
                  "popup=yes,width=600,height=800",
                );
                if (!s || s.closed || void 0 === s.closed) {
                  if (m) {
                    ((U.current = !1), _(!1));
                    let e = window.location.href,
                      t = !1,
                      r = () => {
                        t = !0;
                      };
                    window.addEventListener("pagehide", r, { once: !0 });
                    let n = () => {
                      "hidden" === document.visibilityState && r();
                    };
                    (document.addEventListener("visibilitychange", n),
                      window.location.assign(i.data.url),
                      window.setTimeout(() => {
                        (window.removeEventListener("pagehide", r),
                          document.removeEventListener("visibilitychange", n),
                          !(t || window.location.href !== e) &&
                            C.current &&
                            R.current?.(void 0, { preservePendingRetry: !0 }));
                      }, 2e3));
                    return;
                  }
                  let e = c("web.x_account.allow_popups");
                  (T(e),
                    o.c.error(c("web.x_account.connect_failed"), {
                      description: e,
                    }),
                    _(!1),
                    (U.current = !1),
                    R.current?.(e));
                  return;
                }
                ((O.current = s), (P.current = !1));
                let a = (e) => {
                  if (e.origin !== window.location.origin) return;
                  let t = b.safeParse(e.data);
                  if (t.success && t.data.type === g)
                    if (((P.current = !0), G(), _(!1), "ok" === t.data.status))
                      (E(!0),
                        $(),
                        o.c.success(c("web.x_account.connected")),
                        I.current?.());
                    else {
                      let e =
                        t.data.error ?? c("web.x_account.verification_failed");
                      (T(e),
                        o.c.error(c("web.x_account.connect_failed"), {
                          description: e,
                        }),
                        R.current?.(e));
                    }
                };
                ((D.current = a),
                  window.addEventListener("message", a),
                  (M.current = window.setInterval(() => {
                    !O.current?.closed ||
                      (null !== M.current &&
                        (window.clearInterval(M.current), (M.current = null)),
                      null !== k.current ||
                        P.current ||
                        (k.current = window.setTimeout(() => {
                          ((k.current = null),
                            P.current || (G(), _(!1), R.current?.()));
                        }, 1500)));
                  }, 500)));
              } catch (r) {
                if (
                  (F.current === e && (F.current = null),
                  (r instanceof DOMException && "AbortError" === r.name) ||
                    !C.current)
                )
                  return;
                let t =
                  r instanceof Error
                    ? r.message
                    : c("web.x_account.verification_start_failed");
                (T(t),
                  o.c.error(c("web.x_account.connect_failed"), {
                    description: t,
                  }),
                  _(!1),
                  (U.current = !1),
                  R.current?.(t));
              }
            }, [j, G, $, m, E, c, x]),
            isLoading: A,
            error: L,
          }
        );
      },
    ],
    191201,
  );
};
