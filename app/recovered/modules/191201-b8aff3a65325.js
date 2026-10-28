// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(574472),
    r = e.i(545063),
    n = e.i(606933),
    a = e.i(599077),
    i = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    s = e.i(63289),
    l = e.i(314197),
    u = e.i(503630),
    c = e.i(836119),
    d = e.i(613677),
    f = e.i(342463),
    m = e.i(417326),
    h = e.i(418096);
  let p = d.z.object({ url: f.z.string().url() }),
    w = "x-oauth-done",
    y = d.z.object({
      type: m.z.literal(w),
      status: h.z.enum(["ok", "error"]),
      error: f.z.string().optional(),
    });
  e.s(
    [
      "f",
      0,
      (e) => {
        let { t: d } = (0, o.f)(),
          {
            userIdentifier: f,
            returnTo: m,
            onConnected: h,
            onCancelled: b,
          } = e,
          g = (0, a.useRouter)(),
          x = (0, n.useQueryClient)(),
          v = (0, l.f)(),
          { address: _, userId: k, setXAccountConnected: E } = (0, t.F)(),
          N = (0, r._)(),
          S = (0, i.useRef)(h),
          P = (0, i.useRef)(b);
        ((0, i.useEffect)(() => {
          S.current = h;
        }, [h]),
          (0, i.useEffect)(() => {
            P.current = b;
          }, [b]));
        let [R, C] = (0, i.useState)(!1),
          [I, j] = (0, i.useState)(null),
          A = (0, i.useRef)(null),
          T = (0, i.useRef)(null),
          M = (0, i.useRef)(null),
          $ = (0, i.useRef)(!1),
          B = (0, i.useRef)(null),
          F = (0, i.useRef)(!1),
          O = (0, i.useRef)(!0),
          L = (0, i.useRef)(null),
          z = (0, i.useCallback)(() => {
            null !== B.current &&
              (window.clearTimeout(B.current), (B.current = null));
          }, []),
          K = (0, i.useCallback)(() => {
            (T.current &&
              (window.removeEventListener("message", T.current),
              (T.current = null)),
              null !== M.current &&
                (window.clearInterval(M.current), (M.current = null)),
              z(),
              A.current && !A.current.closed && A.current.close(),
              (A.current = null),
              (F.current = !1),
              L.current && (L.current.abort(), (L.current = null)));
          }, [z]),
          U = (0, i.useCallback)(async () => {
            await (0, c.f)({
              address: _,
              userId: k,
              userIdentifier: f,
              queryClient: x,
              router: g,
            });
          }, [_, k, x, g, f]);
        return (
          (0, i.useEffect)(
            () => (
              (O.current = !0),
              () => {
                O.current = !1;
              }
            ),
            [],
          ),
          (0, i.useEffect)(
            () => () => {
              K();
            },
            [K],
          ),
          {
            connect: (0, i.useCallback)(async () => {
              if (!v)
                return void P.current?.(
                  d("web.x_account.connection_unavailable"),
                );
              if (null === N) {
                let e = d("web.x_account.wallet_not_connected");
                (j(e),
                  s.c.error(d("web.x_account.connect_failed"), {
                    description: e,
                  }));
                return;
              }
              if (F.current) return;
              ((F.current = !0), j(null), C(!0));
              let e = new AbortController();
              L.current = e;
              try {
                let t = void 0 !== m ? JSON.stringify({ returnTo: m }) : "{}",
                  r = await fetch(`${(0, u.c)().replace(/\/$/, "")}/x/auth`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: t,
                    signal: e.signal,
                  });
                if (!O.current) return;
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
                if (!O.current) return;
                let a = p.safeParse(n);
                if (!a.success) throw Error("Unexpected response from server.");
                L.current === e && (L.current = null);
                let i = window.open(
                  a.data.url,
                  "x_oauth",
                  "popup=yes,width=600,height=800",
                );
                if (!i || i.closed || void 0 === i.closed) {
                  if (m) {
                    ((F.current = !1), C(!1));
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
                      window.location.assign(a.data.url),
                      window.setTimeout(() => {
                        (window.removeEventListener("pagehide", r),
                          document.removeEventListener("visibilitychange", n),
                          !(t || window.location.href !== e) &&
                            O.current &&
                            P.current?.(void 0, { preservePendingRetry: !0 }));
                      }, 2e3));
                    return;
                  }
                  let e = d("web.x_account.allow_popups");
                  (j(e),
                    s.c.error(d("web.x_account.connect_failed"), {
                      description: e,
                    }),
                    C(!1),
                    (F.current = !1),
                    P.current?.(e));
                  return;
                }
                ((A.current = i), ($.current = !1));
                let o = (e) => {
                  if (e.origin !== window.location.origin) return;
                  let t = y.safeParse(e.data);
                  if (t.success && t.data.type === w)
                    if ((($.current = !0), K(), C(!1), "ok" === t.data.status))
                      (E(!0),
                        U(),
                        s.c.success(d("web.x_account.connected")),
                        S.current?.());
                    else {
                      let e =
                        t.data.error ?? d("web.x_account.verification_failed");
                      (j(e),
                        s.c.error(d("web.x_account.connect_failed"), {
                          description: e,
                        }),
                        P.current?.(e));
                    }
                };
                ((T.current = o),
                  window.addEventListener("message", o),
                  (M.current = window.setInterval(() => {
                    !A.current?.closed ||
                      (null !== M.current &&
                        (window.clearInterval(M.current), (M.current = null)),
                      null !== B.current ||
                        $.current ||
                        (B.current = window.setTimeout(() => {
                          ((B.current = null),
                            $.current || (K(), C(!1), P.current?.()));
                        }, 1500)));
                  }, 500)));
              } catch (r) {
                if (
                  (L.current === e && (L.current = null),
                  (r instanceof DOMException && "AbortError" === r.name) ||
                    !O.current)
                )
                  return;
                let t =
                  r instanceof Error
                    ? r.message
                    : d("web.x_account.verification_start_failed");
                (j(t),
                  s.c.error(d("web.x_account.connect_failed"), {
                    description: t,
                  }),
                  C(!1),
                  (F.current = !1),
                  P.current?.(t));
              }
            }, [N, K, U, m, E, d, v]),
            isLoading: R,
            error: I,
          }
        );
      },
    ],
    191201,
  );
};
