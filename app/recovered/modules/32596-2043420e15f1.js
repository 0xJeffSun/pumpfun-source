// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(352386),
    r = e.i(322315),
    a = e.i(254010),
    s = e.i(944410),
    l = e.i(574472),
    o = e.i(606933);
  e.i(280960);
  var c = e.i(5993),
    d = e.i(599077),
    u = e.i(528798),
    m = e.i(484018),
    f = e.i(132838);
  let p = "pump-web-device-id",
    h = () =>
      "u" > typeof crypto && "function" == typeof crypto.randomUUID
        ? crypto.randomUUID()
        : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    g = () => {
      try {
        let e = window.localStorage.getItem(p);
        if (e) return e;
        let t = h();
        return (window.localStorage.setItem(p, t), t);
      } catch {
        return h();
      }
    };
  var y = e.i(718044);
  (0, y.V)("firebase", "11.10.0", "app");
  var x = e.i(149502),
    v = e.i(613677),
    b = e.i(342463);
  let _ = v.z.object({
      apiKey: b.z.string().min(1),
      authDomain: b.z.string().min(1),
      projectId: b.z.string().min(1),
      messagingSenderId: b.z.string().min(1),
      appId: b.z.string().min(1),
      vapidKey: b.z.string().min(1),
    }),
    w = () => {
      let e = _.safeParse({
        apiKey: x.default.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: x.default.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: x.default.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        messagingSenderId:
          x.default.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: x.default.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        vapidKey: x.default.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      return e.success ? e.data : null;
    },
    I = null,
    j = null,
    E = null,
    k = null,
    N = async (e) => {
      let t;
      return "serviceWorker" in navigator
        ? E
          ? E
          : (k ??= navigator.serviceWorker
              .register(
                ((t = new URLSearchParams({
                  apiKey: e.apiKey,
                  authDomain: e.authDomain,
                  projectId: e.projectId,
                  messagingSenderId: e.messagingSenderId,
                  appId: e.appId,
                })),
                `/firebase-messaging-sw.js?${t.toString()}`),
                { scope: "/" },
              )
              .then((e) => ((E = e), e))
              .catch((e) => {
                throw ((k = null), e);
              }))
        : null;
    },
    S = async () => {
      let e = w();
      return e && (await (0, c.isSupported)().catch(() => !1))
        ? j
          ? j
          : (await N(e))
            ? (j = (0, c.getMessaging)(
                I ||
                  (I =
                    (0, y.Y)().length > 0
                      ? (0, y.Z)()
                      : (0, y.W)({
                          apiKey: e.apiKey,
                          authDomain: e.authDomain,
                          projectId: e.projectId,
                          messagingSenderId: e.messagingSenderId,
                          appId: e.appId,
                        })),
              ))
            : null
        : null;
    },
    C = async () =>
      "Notification" in window
        ? "granted" === Notification.permission
          ? "granted"
          : "denied" === Notification.permission
            ? "denied"
            : Notification.requestPermission()
        : "denied",
    U = async () => {
      let e = w();
      if (!e) return null;
      let t = await S();
      if (!t) return null;
      let n = E ?? (await N(e));
      return n
        ? (0, c.getToken)(t, {
            vapidKey: e.vapidKey,
            serviceWorkerRegistration: n,
          })
        : null;
    },
    R = async () => {
      let t = await S();
      if (!t) return;
      let n = w();
      if (
        !n ||
        !(await (0, c.getToken)(t, {
          vapidKey: n.vapidKey,
          serviceWorkerRegistration: E ?? void 0,
        }).catch(() => null))
      )
        return;
      let { deleteToken: i } = await e.A(244699);
      (await i(t), (j = null));
    };
  var P = e.i(63289),
    L = e.i(745018),
    A = e.i(292686),
    T = e.i(928529);
  e.i(12692);
  var O = e.i(398902),
    z = e.i(208912),
    B = e.i(338319);
  let F = (e) => {
    let r,
      a,
      s,
      l,
      o,
      c,
      u,
      m,
      f,
      p,
      h,
      g = (0, n.c)(33),
      {
        title: y,
        body: x,
        isRedacted: v,
        avatarUrl: b,
        roomPath: _,
        onDismiss: w,
      } = e,
      I = void 0 !== v && v,
      { t: j } = (0, O.f)(),
      { push: E } = (0, d.useRouter)(),
      [k, N] = (0, i.useState)(!1);
    g[0] !== w || g[1] !== E || g[2] !== _
      ? ((r = () => {
          ((0, z.K)({ pathname: _, entryPoint: A.z.FOREGROUND_TOAST }),
            E(_),
            w());
        }),
        (g[0] = w),
        (g[1] = E),
        (g[2] = _),
        (g[3] = r))
      : (r = g[3]);
    let S = r;
    (g[4] !== k || g[5] !== b
      ? ((a =
          b && !k
            ? (0, t.jsx)(T.default, {
                alt: "",
                className: "size-[30px] shrink-0 rounded-full object-cover",
                height: 30,
                onError: () => N(!0),
                src: b,
                unoptimized: !0,
                width: 30,
              })
            : (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "flex size-[30px] shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-text-secondary",
                children: (0, t.jsx)(L.YM, { size: 16 }),
              })),
        (g[4] = k),
        (g[5] = b),
        (g[6] = a))
      : (a = g[6]),
      g[7] !== y
        ? ((s = (0, t.jsx)("span", {
            className:
              "line-clamp-2 block text-sm font-semibold text-text-primary",
            children: y,
          })),
          (g[7] = y),
          (g[8] = s))
        : (s = g[8]));
    let C = I && "italic text-text-warning";
    return (
      g[9] !== C
        ? ((l = (0, B.c)("line-clamp-2 block text-sm text-text-tertiary", C)),
          (g[9] = C),
          (g[10] = l))
        : (l = g[10]),
      g[11] !== x || g[12] !== I || g[13] !== j
        ? ((o = I ? j("chat.dms.message.redacted") : x),
          (g[11] = x),
          (g[12] = I),
          (g[13] = j),
          (g[14] = o))
        : (o = g[14]),
      g[15] !== l || g[16] !== o
        ? ((c = (0, t.jsx)("span", { className: l, children: o })),
          (g[15] = l),
          (g[16] = o),
          (g[17] = c))
        : (c = g[17]),
      g[18] !== s || g[19] !== c
        ? ((u = (0, t.jsxs)("span", {
            className: "min-w-0 flex-1",
            children: [s, c],
          })),
          (g[18] = s),
          (g[19] = c),
          (g[20] = u))
        : (u = g[20]),
      g[21] !== S || g[22] !== a || g[23] !== u
        ? ((m = (0, t.jsxs)("button", {
            className: "flex min-w-0 flex-1 items-center gap-2.5 text-left",
            onClick: S,
            type: "button",
            children: [a, u],
          })),
          (g[21] = S),
          (g[22] = a),
          (g[23] = u),
          (g[24] = m))
        : (m = g[24]),
      g[25] !== j
        ? ((f = j("web.notifications.toast.view")), (g[25] = j), (g[26] = f))
        : (f = g[26]),
      g[27] !== S || g[28] !== f
        ? ((p = (0, t.jsx)("button", {
            className: "shrink-0 text-sm font-bold text-text-accent",
            onClick: S,
            type: "button",
            children: f,
          })),
          (g[27] = S),
          (g[28] = f),
          (g[29] = p))
        : (p = g[29]),
      g[30] !== m || g[31] !== p
        ? ((h = (0, t.jsxs)("div", {
            className:
              "flex min-h-[52px] w-[min(420px,calc(100vw-2rem))] items-center gap-2.5 rounded-full border border-border-tertiary bg-bg-primary py-2 pl-[11px] pr-4 shadow-lg",
            "data-testid": "dm-message-toast",
            children: [m, p],
          })),
          (g[30] = m),
          (g[31] = p),
          (g[32] = h))
        : (h = g[32]),
      h
    );
  };
  var D = e.i(439587),
    $ = e.i(692159);
  let K = (e) => {
      let i,
        r,
        a,
        s,
        l,
        o,
        c,
        u,
        m,
        f,
        p,
        h,
        g = (0, n.c)(38),
        {
          title: y,
          body: x,
          imageUrl: v,
          deeplink: b,
          genericV1: _,
          onDismiss: w,
        } = e,
        { t: I } = (0, O.f)(),
        j = (0, d.useRouter)();
      g[0] !== j
        ? ((i = (e) => {
            j.push(e);
          }),
          (g[0] = j),
          (g[1] = i))
        : (i = g[1]);
      let E = i;
      g[2] !== b || g[3] !== _.listNavigation || g[4] !== E || g[5] !== w
        ? ((r = () => {
            (E((0, $.H)({ deeplink: b, listNavigation: _.listNavigation })),
              w());
          }),
          (g[2] = b),
          (g[3] = _.listNavigation),
          (g[4] = E),
          (g[5] = w),
          (g[6] = r))
        : (r = g[6]);
      let k = r;
      if (
        (g[7] !== v
          ? ((a = v
              ? (0, t.jsx)(T.default, {
                  alt: "",
                  className: "size-12 shrink-0 rounded-lg object-cover",
                  height: 48,
                  src: v,
                  unoptimized: !0,
                  width: 48,
                })
              : null),
            (g[7] = v),
            (g[8] = a))
          : (a = g[8]),
        g[9] !== y
          ? ((s = (0, t.jsx)("p", {
              className: "truncate text-sm font-semibold text-text-primary",
              children: y,
            })),
            (g[9] = y),
            (g[10] = s))
          : (s = g[10]),
        g[11] !== x
          ? ((l = (0, t.jsx)("p", {
              className: "line-clamp-2 text-sm text-text-secondary",
              children: x,
            })),
            (g[11] = x),
            (g[12] = l))
          : (l = g[12]),
        g[13] !== s || g[14] !== l
          ? ((o = (0, t.jsxs)("div", { children: [s, l] })),
            (g[13] = s),
            (g[14] = l),
            (g[15] = o))
          : (o = g[15]),
        g[16] !== _.toastButtons
          ? ((c = _.toastButtons ?? []), (g[16] = _.toastButtons), (g[17] = c))
          : (c = g[17]),
        g[18] !== E || g[19] !== w || g[20] !== c)
      ) {
        let e;
        (g[22] !== E || g[23] !== w
          ? ((e = (e) =>
              (0, t.jsx)(
                D.K,
                {
                  size: 32,
                  variant: "secondary" === e.variant ? "secondary" : "primary",
                  onClick: () => {
                    if ("dismiss" === e.type) return void w();
                    let t = (0, $.G)({
                      pathname: e.pathname,
                      params: e.params,
                    });
                    (E((0, $._)(t)), w());
                  },
                  children: e.label,
                },
                `${e.type}-${e.label}`,
              )),
            (g[22] = E),
            (g[23] = w),
            (g[24] = e))
          : (e = g[24]),
          (u = c.map(e)),
          (g[18] = E),
          (g[19] = w),
          (g[20] = c),
          (g[21] = u));
      } else u = g[21];
      return (
        g[25] !== _.toastButtons?.length || g[26] !== k || g[27] !== I
          ? ((m = _.toastButtons?.length
              ? null
              : (0, t.jsx)(D.K, {
                  size: 32,
                  variant: "primary",
                  onClick: k,
                  children: I("web.notifications.toast.view"),
                })),
            (g[25] = _.toastButtons?.length),
            (g[26] = k),
            (g[27] = I),
            (g[28] = m))
          : (m = g[28]),
        g[29] !== u || g[30] !== m
          ? ((f = (0, t.jsxs)("div", {
              className: "flex flex-wrap gap-2",
              children: [u, m],
            })),
            (g[29] = u),
            (g[30] = m),
            (g[31] = f))
          : (f = g[31]),
        g[32] !== f || g[33] !== o
          ? ((p = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col gap-2",
              children: [o, f],
            })),
            (g[32] = f),
            (g[33] = o),
            (g[34] = p))
          : (p = g[34]),
        g[35] !== p || g[36] !== a
          ? ((h = (0, t.jsxs)("div", {
              className:
                "flex w-[min(420px,calc(100vw-2rem))] gap-3 rounded-xl border border-border-secondary bg-bg-primary p-3 shadow-lg",
              children: [a, p],
            })),
            (g[35] = p),
            (g[36] = a),
            (g[37] = h))
          : (h = g[37]),
        h
      );
    },
    V = (e) => {
      let i,
        r,
        a,
        s,
        l,
        o,
        c = (0, n.c)(17),
        { title: u, body: m, imageUrl: f, deeplink: p, listNavigation: h } = e,
        g = (0, d.useRouter)();
      c[0] !== p || c[1] !== h || c[2] !== g
        ? ((i = () => {
            if (p?.startsWith("pump://")) {
              let e = (0, $.Y)(p);
              if (e) return void g.push((0, $._)(e));
            }
            g.push((0, $.H)({ deeplink: p, listNavigation: h }));
          }),
          (c[0] = p),
          (c[1] = h),
          (c[2] = g),
          (c[3] = i))
        : (i = c[3]);
      let y = i;
      return (
        c[4] !== f
          ? ((r = f
              ? (0, t.jsx)(T.default, {
                  alt: "",
                  className: "size-12 shrink-0 rounded-lg object-cover",
                  height: 48,
                  src: f,
                  unoptimized: !0,
                  width: 48,
                })
              : null),
            (c[4] = f),
            (c[5] = r))
          : (r = c[5]),
        c[6] !== u
          ? ((a = (0, t.jsx)("p", {
              className: "truncate text-sm font-semibold text-text-primary",
              children: u,
            })),
            (c[6] = u),
            (c[7] = a))
          : (a = c[7]),
        c[8] !== m
          ? ((s = (0, t.jsx)("p", {
              className: "line-clamp-2 text-sm text-text-secondary",
              children: m,
            })),
            (c[8] = m),
            (c[9] = s))
          : (s = c[9]),
        c[10] !== a || c[11] !== s
          ? ((l = (0, t.jsxs)("div", {
              className: "min-w-0",
              children: [a, s],
            })),
            (c[10] = a),
            (c[11] = s),
            (c[12] = l))
          : (l = c[12]),
        c[13] !== y || c[14] !== r || c[15] !== l
          ? ((o = (0, t.jsxs)("button", {
              className:
                "flex w-[min(420px,calc(100vw-2rem))] gap-3 rounded-xl border border-border-secondary bg-bg-primary p-3 text-left shadow-lg",
              onClick: y,
              type: "button",
              children: [r, l],
            })),
            (c[13] = y),
            (c[14] = r),
            (c[15] = l),
            (c[16] = o))
          : (o = c[16]),
        o
      );
    };
  var M = e.i(126965),
    H = e.i(26498),
    W = e.i(808142),
    X = e.i(986274),
    Q = e.i(418096),
    q = e.i(297865),
    G = e.i(866890),
    J = e.i(553220),
    Y = e.i(417326),
    Z = e.i(169119);
  Q.z.enum(["P0", "P1", "P2", "P3"]);
  let ee = v.z.object({
      notificationSubtype: b.z.string(),
      showAsToast: q.z.boolean(),
      toastButtons: G.z
        .array(
          J.z.discriminatedUnion("type", [
            v.z.object({
              type: Y.z.literal("dismiss"),
              label: b.z.string(),
              variant: Q.z.enum([
                "primary",
                "secondary",
                "positive-primary",
                "negative-secondary",
              ]),
            }),
            v.z.object({
              type: Y.z.literal("route"),
              label: b.z.string(),
              variant: Q.z.enum([
                "primary",
                "secondary",
                "positive-primary",
                "negative-secondary",
              ]),
              pathname: b.z.string(),
              params: Z.z.record(b.z.string(), b.z.string()).optional(),
            }),
          ]),
        )
        .optional(),
      listNavigation: v.z
        .object({
          pathname: b.z.string(),
          params: Z.z.record(b.z.string(), b.z.string()).optional(),
        })
        .optional(),
      coinMetadata: v.z
        .object({
          mintAddress: b.z.string(),
          coinName: b.z.string().optional(),
          coinSymbol: b.z.string().optional(),
        })
        .optional(),
      metadata: Z.z.record(b.z.string(), b.z.string()).optional(),
    }),
    et = async ({
      payload: n,
      pathname: i,
      hermesApi: r,
      queryClient: a,
      isDirectMessagesEnabled: s = !0,
    }) => {
      let l = n.data ?? {},
        o = n.notification?.title ?? l.title ?? "Notification",
        c = n.notification?.body ?? l.body ?? "",
        d =
          n.notification?.image ??
          l.imageUrl ??
          l.imageURL ??
          l.enhancedPresentationIconUrl,
        u = l.type ?? "hermesNotificationGenericV1";
      r &&
        l.messageId &&
        l.userId &&
        l.timestamp &&
        (0, W.F)({
          api: r,
          payload: {
            notificationId: l.messageId,
            userId: l.userId,
            timestamp: l.timestamp,
            deviceId: g(),
          },
        });
      let m = (0, H.k)(l);
      if (m) {
        if (
          (a.invalidateQueries({ queryKey: (0, M.c)() }),
          a.invalidateQueries({ queryKey: (0, M.F)() }),
          !s ||
            "toast" !== (0, H.O)({ target: m, pathname: i, queryClient: a }))
        )
          return;
        let r = (0, H.q)(m),
          d = (0, H.$)({ data: l, notificationImage: n.notification?.image }),
          { containsDmSensitiveContent: u } = await e.A(976701),
          f = u(c);
        P.c.custom(
          (e) =>
            (0, t.jsx)(F, {
              avatarUrl: d,
              body: c,
              isRedacted: f,
              onDismiss: () => P.c.dismiss(e),
              roomPath: r,
              title: o,
            }),
          {
            duration: 8e3,
            id: `hermes-dm-${l.messageId ?? m.conversationId ?? o}`,
          },
        );
        return;
      }
      if (
        (({ pathname: e, mint: t }) => !!t && e.startsWith(`/coin/${t}`))({
          pathname: i,
          mint: ((e) => {
            if (e.mintAddress) return e.mintAddress;
            if (e.genericV1)
              try {
                let t = JSON.parse(e.genericV1);
                if (t.coinMetadata?.mintAddress)
                  return t.coinMetadata.mintAddress;
              } catch {}
            if (e.deeplink) {
              let t = e.deeplink.replace(/^pump:\/\/coin\//, "pump://coins/");
              try {
                let e = new URL(t);
                if ("coins" === e.hostname)
                  return e.pathname.replace(/^\//, "").split("/")[0] || void 0;
                if ("coin" === e.hostname)
                  return e.searchParams.get("mint") ?? void 0;
                return;
              } catch {
                return;
              }
            }
          })(l),
        })
      )
        return;
      let f = ((e) => {
        if (e)
          try {
            let t = JSON.parse(e),
              n = ee.safeParse(t);
            return n.success ? n.data : void 0;
          } catch {
            return;
          }
      })(l.genericV1);
      if (!((0, X.g)(f?.notificationSubtype) && (0, X.D)())) {
        if ("hermesNotificationGenericV1" === u && f?.showAsToast)
          return void P.c.custom(
            (e) =>
              (0, t.jsx)(K, {
                title: o,
                body: c,
                imageUrl: d,
                genericV1: f,
                deeplink: l.deeplink,
                onDismiss: () => P.c.dismiss(e),
              }),
            { duration: 1e4, id: `hermes-${l.messageId ?? o}` },
          );
        P.c.custom(
          () =>
            (0, t.jsx)(V, {
              title: o,
              body: c,
              imageUrl: d,
              deeplink: l.deeplink,
              listNavigation: f?.listNavigation,
            }),
          { duration: 8e3, id: `hermes-simple-${l.messageId ?? o}` },
        );
      }
    };
  var en = e.i(466931),
    ei = e.i(779106);
  let er = {
      permission: "unsupported",
      token: null,
      isRegistering: !1,
      isConfigured: !1,
    },
    ea = "pump-push-token-owned",
    es = (e) => {
      try {
        e
          ? window.localStorage.setItem(ea, "1")
          : window.localStorage.removeItem(ea);
      } catch {}
    },
    el = (0, i.createContext)(null);
  e.s(
    [
      "Q",
      0,
      (e) => {
        let p,
          h = (0, n.c)(3),
          { children: y } = e,
          x = (() => {
            let e,
              t,
              p,
              h = (0, u.f)(),
              y = (0, a.k)(r.D.WEB_DIRECT_MESSAGES),
              { fetchUser: x, authReady: v } = (0, l.F)(),
              b = (0, ei.f)("push-token"),
              _ = (0, d.usePathname)(),
              I = (0, s.useHermesApiClient)(),
              j = (0, o.useQueryClient)(),
              { mutateAsync: E } =
                ((t = (0, n.c)(2)),
                (p = (0, s.useHermesApiClient)()),
                t[0] !== p
                  ? ((e = {
                      mutationFn: async (e) => {
                        if (!p)
                          throw Error(
                            "Hermes notifications API is not configured",
                          );
                        let t = { token: e, platform: "web", deviceId: g() };
                        await p.put("v1/device-tokens", { json: t });
                      },
                    }),
                    (t[0] = p),
                    (t[1] = e))
                  : (e = t[1]),
                (0, f.f)(e)),
              k = (0, i.useRef)(null),
              N = (0, i.useRef)(null),
              P = (0, i.useRef)(null),
              L = (0, i.useRef)(_),
              A = (0, i.useRef)(y);
            ((0, i.useEffect)(() => {
              L.current = _;
            }, [_]),
              (0, i.useEffect)(() => {
                A.current = y;
              }, [y]),
              (0, i.useEffect)(() => {
                !v ||
                  null !== b ||
                  ((N.current = null),
                  (P.current = null),
                  (() => {
                    try {
                      return "1" === window.localStorage.getItem(ea);
                    } catch {
                      return !1;
                    }
                  })() &&
                    null !== w() &&
                    (es(!1),
                    O((e) => (null === e.token ? e : { ...e, token: null })),
                    R().catch(() => void 0)));
              }, [v, b]));
            let [T, O] = (0, i.useState)(() => ({
                permission:
                  "Notification" in window
                    ? Notification.permission
                    : "unsupported",
                token: null,
                isRegistering: !1,
                isConfigured: null !== w(),
              })),
              z = (0, i.useCallback)(async () => {
                if (!h || null === b || !I || null === w()) return null;
                O((e) => ({ ...e, isRegistering: !0 }));
                try {
                  let e = await C();
                  if ((O((t) => ({ ...t, permission: e })), "granted" !== e))
                    return null;
                  P.current &&
                    P.current !== b &&
                    N.current &&
                    (await R().catch(() => void 0), (N.current = null));
                  let t = await U();
                  if (!t) return null;
                  return (
                    O((e) => (e.token === t ? e : { ...e, token: t })),
                    (t !== N.current || P.current !== b) &&
                      (await E(t), (N.current = t), (P.current = b), es(!0)),
                    t
                  );
                } finally {
                  O((e) => ({ ...e, isRegistering: !1 }));
                }
              }, [b, I, h, E]),
              B = (0, i.useCallback)(async () => (h ? z() : null), [h, z]);
            return ((0, i.useEffect)(() => {
              h &&
                null !== b &&
                I &&
                null !== w() &&
                "granted" === T.permission &&
                z().catch((e) => {
                  (0, en.l)({
                    error: e,
                    feature: "notifications",
                    operation: "register-token",
                  });
                });
            }, [b, I, h, z, T.permission]),
            (0, i.useEffect)(() => {
              let e;
              if (!h || null === b || !I || !T.token || null === w()) return;
              let t = !1;
              return (
                S()
                  .then((n) => {
                    n &&
                      !t &&
                      ((k.current = n),
                      (e = (0, c.onMessage)(n, (e) => {
                        (et({
                          payload: e,
                          pathname: L.current,
                          hermesApi: I,
                          queryClient: j,
                          isDirectMessagesEnabled: A.current,
                        }),
                          (0, m.O)({ queryClient: j, viewer: b }),
                          x());
                      })));
                  })
                  .catch((e) => {
                    (0, en.l)({
                      error: e,
                      feature: "notifications",
                      operation: "init-messaging",
                    });
                  }),
                () => {
                  ((t = !0), e?.());
                }
              );
            }, [b, x, I, h, j, T.token]),
            h)
              ? { ...T, enablePushNotifications: B, registerCurrentToken: z }
              : { ...er, enablePushNotifications: B, registerCurrentToken: z };
          })();
        return (
          h[0] !== y || h[1] !== x
            ? ((p = (0, t.jsx)(el.Provider, { value: x, children: y })),
              (h[0] = y),
              (h[1] = x),
              (h[2] = p))
            : (p = h[2]),
          p
        );
      },
      "y",
      0,
      () => {
        let e = (0, i.useContext)(el);
        if (!e)
          throw Error(
            "useNotificationsContext must be used within NotificationsProvider",
          );
        return e;
      },
    ],
    32596,
  );
};
