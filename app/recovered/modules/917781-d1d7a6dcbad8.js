// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(439587);
  e.i(12692);
  var n = e.i(398902),
    r = e.i(979364),
    s = e.i(980268),
    l = e.i(944410),
    o = e.i(132838),
    c = e.i(690877),
    d = e.i(606933),
    m = e.i(528798),
    u = e.i(484018),
    p = e.i(779106),
    f = e.i(32596);
  let x = (e) => {
      let a,
        n,
        r,
        s = (0, i.c)(7),
        { title: l, children: o } = e;
      return (
        s[0] !== l
          ? ((a = (0, t.jsx)("h2", {
              className:
                "border-b border-border-secondary px-4 py-3 text-sm font-semibold text-text-primary",
              children: l,
            })),
            (s[0] = l),
            (s[1] = a))
          : (a = s[1]),
        s[2] !== o
          ? ((n = (0, t.jsx)("div", {
              className: "divide-y divide-border-secondary",
              children: o,
            })),
            (s[2] = o),
            (s[3] = n))
          : (n = s[3]),
        s[4] !== a || s[5] !== n
          ? ((r = (0, t.jsxs)("section", {
              className:
                "rounded-xl border border-border-secondary bg-bg-primary",
              children: [a, n],
            })),
            (s[4] = a),
            (s[5] = n),
            (s[6] = r))
          : (r = s[6]),
        r
      );
    },
    g = (e) => {
      let a,
        n,
        r,
        l,
        o,
        c,
        d = (0, i.c)(16),
        {
          label: m,
          description: u,
          checked: p,
          onCheckedChange: f,
          disabled: x,
        } = e;
      return (
        d[0] !== m
          ? ((a = (0, t.jsx)("p", {
              className: "text-sm font-medium text-text-primary",
              children: m,
            })),
            (d[0] = m),
            (d[1] = a))
          : (a = d[1]),
        d[2] !== u
          ? ((n = u
              ? (0, t.jsx)("p", {
                  className: "mt-1 text-xs text-text-secondary",
                  children: u,
                })
              : null),
            (d[2] = u),
            (d[3] = n))
          : (n = d[3]),
        d[4] !== a || d[5] !== n
          ? ((r = (0, t.jsxs)("div", { children: [a, n] })),
            (d[4] = a),
            (d[5] = n),
            (d[6] = r))
          : (r = d[6]),
        d[7] !== f
          ? ((l = (e) => f(!0 === e)), (d[7] = f), (d[8] = l))
          : (l = d[8]),
        d[9] !== p || d[10] !== x || d[11] !== l
          ? ((o = (0, t.jsx)(s.f, {
              checked: p,
              disabled: x,
              onCheckedChange: l,
            })),
            (d[9] = p),
            (d[10] = x),
            (d[11] = l),
            (d[12] = o))
          : (o = d[12]),
        d[13] !== r || d[14] !== o
          ? ((c = (0, t.jsxs)("div", {
              className: "flex items-start justify-between gap-4 px-4 py-4",
              children: [r, o],
            })),
            (d[13] = r),
            (d[14] = o),
            (d[15] = c))
          : (c = d[15]),
        c
      );
    },
    h = () => {
      let e,
        s,
        h,
        b,
        y,
        v,
        w,
        _,
        k,
        j,
        C,
        N,
        S,
        P,
        V,
        A,
        T,
        L,
        $,
        z,
        O,
        W,
        I,
        F,
        R,
        K,
        q,
        D,
        Q,
        U,
        E,
        J,
        B,
        H,
        M,
        G,
        X,
        Y,
        Z,
        ee,
        et,
        ei,
        ea,
        en,
        er = (0, i.c)(179),
        { t: es } = (0, n.f)(),
        el =
          ((L = (0, i.c)(8)),
          ($ = (0, l.useHermesApiClient)()),
          (z = (0, p.f)("hermes-settings")),
          (O = (0, m.f)()),
          L[0] !== z
            ? ((V = u.F.settings(z)), (L[0] = z), (L[1] = V))
            : (V = L[1]),
          (W = !!(O && $ && null !== z)),
          L[2] !== $
            ? ((A = async () => {
                if (!$)
                  throw Error("Hermes notifications API is not configured");
                return $.get("v1/user-preferences/settings").json();
              }),
              (L[2] = $),
              (L[3] = A))
            : (A = L[3]),
          L[4] !== V || L[5] !== W || L[6] !== A
            ? ((T = { queryKey: V, enabled: W, queryFn: A }),
              (L[4] = V),
              (L[5] = W),
              (L[6] = A),
              (L[7] = T))
            : (T = L[7]),
          (0, c.useQuery)(T)),
        eo =
          ((K = (0, i.c)(8)),
          (q = (0, l.useHermesApiClient)()),
          (D = (0, d.useQueryClient)()),
          (Q = (0, p.f)("hermes-settings")),
          K[0] !== q
            ? ((I = async (e) => {
                if (!q)
                  throw Error("Hermes notifications API is not configured");
                return (
                  await q.put("v1/user-preferences/settings", { json: e }),
                  e
                );
              }),
              (K[0] = q),
              (K[1] = I))
            : (I = K[1]),
          K[2] !== D || K[3] !== Q
            ? ((F = (e) => {
                D.setQueryData(u.F.settings(Q), e);
              }),
              (K[2] = D),
              (K[3] = Q),
              (K[4] = F))
            : (F = K[4]),
          K[5] !== I || K[6] !== F
            ? ((R = { mutationFn: I, onSuccess: F }),
              (K[5] = I),
              (K[6] = F),
              (K[7] = R))
            : (R = K[7]),
          (0, o.f)(R)),
        ec =
          ((B = (0, i.c)(8)),
          (H = (0, l.useHermesApiClient)()),
          (M = (0, p.f)("hermes-topics")),
          (G = (0, m.f)()),
          B[0] !== M
            ? ((U = u.F.topics(M)), (B[0] = M), (B[1] = U))
            : (U = B[1]),
          (X = !!(G && H && null !== M)),
          B[2] !== H
            ? ((E = async () => {
                if (!H)
                  throw Error("Hermes notifications API is not configured");
                return H.get("v1/topic-subscriptions").json();
              }),
              (B[2] = H),
              (B[3] = E))
            : (E = B[3]),
          B[4] !== U || B[5] !== X || B[6] !== E
            ? ((J = { queryKey: U, enabled: X, queryFn: E }),
              (B[4] = U),
              (B[5] = X),
              (B[6] = E),
              (B[7] = J))
            : (J = B[7]),
          (0, c.useQuery)(J)),
        ed =
          ((et = (0, i.c)(8)),
          (ei = (0, l.useHermesApiClient)()),
          (ea = (0, d.useQueryClient)()),
          (en = (0, p.f)("hermes-topics")),
          et[0] !== ei
            ? ((Y = async (e) => {
                let { topic: t, action: i } = e;
                if (!ei)
                  throw Error("Hermes notifications API is not configured");
                await ei.post(
                  "subscribe" === i
                    ? "v1/topic-subscriptions/subscribe"
                    : "v1/topic-subscriptions/unsubscribe",
                  { json: { topic: t } },
                );
              }),
              (et[0] = ei),
              (et[1] = Y))
            : (Y = et[1]),
          et[2] !== ea || et[3] !== en
            ? ((Z = () => {
                ea.invalidateQueries({ queryKey: u.F.topics(en) });
              }),
              (et[2] = ea),
              (et[3] = en),
              (et[4] = Z))
            : (Z = et[4]),
          et[5] !== Y || et[6] !== Z
            ? ((ee = { mutationFn: Y, onSuccess: Z }),
              (et[5] = Y),
              (et[6] = Z),
              (et[7] = ee))
            : (ee = et[7]),
          (0, o.f)(ee)),
        {
          enablePushNotifications: em,
          isRegistering: eu,
          permission: ep,
        } = (0, f.y)(),
        ef = el.data;
      er[0] !== ec.data?.topicSubscriptions
        ? ((e = ec.data?.topicSubscriptions ?? {}),
          (er[0] = ec.data?.topicSubscriptions),
          (er[1] = e))
        : (e = er[1]);
      let ex = e;
      er[2] !== ef || er[3] !== eo
        ? ((s = async (e) => {
            let t = ef
              ? {
                  chat: { ...ef.chat, ...e.chat },
                  social: { ...ef.social, ...e.social },
                  coins: { ...ef.coins, ...e.coins },
                }
              : null;
            t && (await eo.mutateAsync(t));
          }),
          (er[2] = ef),
          (er[3] = eo),
          (er[4] = s))
        : (s = er[4]);
      let eg = s;
      er[5] !== ex
        ? ((h = (e) => !!ex[e]?.active), (er[5] = ex), (er[6] = h))
        : (h = er[6]);
      let eh = h;
      if (
        er[7] !== em ||
        er[8] !== eu ||
        er[9] !== eh ||
        er[10] !== ep ||
        er[11] !== eg ||
        er[12] !== ef?.chat ||
        er[13] !== ef?.coins ||
        er[14] !== ef?.social.allowCoinWatcherNotifications ||
        er[15] !== ef?.social.allowDmMessageNotifications ||
        er[16] !== ef?.social.allowFollowerNotifications ||
        er[17] !== ef?.social.allowNewCoinNotifications ||
        er[18] !== el.isLoading ||
        er[19] !== es ||
        er[20] !== ec.isLoading ||
        er[21] !== eo.isPending ||
        er[22] !== ed
      ) {
        let e,
          i,
          n,
          s,
          l,
          o,
          c,
          d,
          m,
          u,
          p,
          f,
          h,
          S,
          P,
          V,
          A,
          T,
          L,
          $,
          z,
          O,
          W,
          I,
          F,
          R,
          K,
          q,
          D,
          Q,
          U,
          E,
          J,
          B,
          H,
          M,
          G,
          X,
          Y,
          Z,
          ee = [
            {
              topic: "trending",
              label: es("web.notification_settings.topic_trending_livestreams"),
              description: es(
                "web.notification_settings.topic_trending_livestreams_description",
              ),
            },
            {
              topic: "trending_searches",
              label: es("web.notification_settings.topic_popular_coins_heavy"),
              description: es(
                "web.notification_settings.topic_popular_coins_heavy_description",
              ),
            },
            {
              topic: "quiet_trending_searches",
              label: es("web.notification_settings.topic_popular_coins_light"),
              description: es(
                "web.notification_settings.topic_popular_coins_light_description",
              ),
            },
          ];
        ((_ = "flex w-full flex-col gap-6"),
          er[32] === Symbol.for("react.memo_cache_sentinel")
            ? ((k = (0, t.jsx)(r.NotificationPermissionPrompt, {})),
              (er[32] = k))
            : (k = er[32]),
          er[33] !== es
            ? ((e = es("web.notification_settings.section_browser_push")),
              (er[33] = es),
              (er[34] = e))
            : (e = er[34]),
          er[35] !== es
            ? ((i = es(
                "web.notification_settings.browser_notifications_label",
              )),
              (er[35] = es),
              (er[36] = i))
            : (i = er[36]),
          er[37] !== i
            ? ((n = (0, t.jsx)("p", {
                className: "text-sm font-medium text-text-primary",
                children: i,
              })),
              (er[37] = i),
              (er[38] = n))
            : (n = er[38]),
          er[39] !== ep || er[40] !== es
            ? ((s = es(
                "granted" === ep
                  ? "web.notification_settings.browser_push_enabled_description"
                  : "web.notification_settings.browser_push_allow_description",
              )),
              (er[39] = ep),
              (er[40] = es),
              (er[41] = s))
            : (s = er[41]),
          er[42] !== s
            ? ((l = (0, t.jsx)("p", {
                className: "mt-1 text-xs text-text-secondary",
                children: s,
              })),
              (er[42] = s),
              (er[43] = l))
            : (l = er[43]),
          er[44] !== n || er[45] !== l
            ? ((o = (0, t.jsxs)("div", { children: [n, l] })),
              (er[44] = n),
              (er[45] = l),
              (er[46] = o))
            : (o = er[46]));
        let et = eu || "granted" === ep;
        (er[47] !== em
          ? ((c = () => void em()), (er[47] = em), (er[48] = c))
          : (c = er[48]),
          er[49] !== eu || er[50] !== ep || er[51] !== es
            ? ((d = es(
                "granted" === ep
                  ? "web.notification_settings.enabled"
                  : eu
                    ? "web.notification_settings.enabling"
                    : "web.notification_settings.enable",
              )),
              (er[49] = eu),
              (er[50] = ep),
              (er[51] = es),
              (er[52] = d))
            : (d = er[52]),
          er[53] !== et || er[54] !== c || er[55] !== d
            ? ((m = (0, t.jsx)(a.K, {
                isDisabled: et,
                onClick: c,
                size: 32,
                variant: "secondary",
                children: d,
              })),
              (er[53] = et),
              (er[54] = c),
              (er[55] = d),
              (er[56] = m))
            : (m = er[56]),
          er[57] !== o || er[58] !== m
            ? ((u = (0, t.jsxs)("div", {
                className: "flex items-center justify-between gap-4 px-4 py-4",
                children: [o, m],
              })),
              (er[57] = o),
              (er[58] = m),
              (er[59] = u))
            : (u = er[59]),
          er[60] !== e || er[61] !== u
            ? ((j = (0, t.jsx)(x, { title: e, children: u })),
              (er[60] = e),
              (er[61] = u),
              (er[62] = j))
            : (j = er[62]),
          er[63] !== es
            ? ((p = es("common.chat")), (er[63] = es), (er[64] = p))
            : (p = er[64]));
        let ei = ef?.social.allowDmMessageNotifications ?? !0,
          ea = eo.isPending || el.isLoading;
        (er[65] !== es
          ? ((f = es("notifications.settings.dm.label")),
            (er[65] = es),
            (er[66] = f))
          : (f = er[66]),
          er[67] !== eg
            ? ((h = (e) =>
                void eg({ social: { allowDmMessageNotifications: e } })),
              (er[67] = eg),
              (er[68] = h))
            : (h = er[68]),
          er[69] !== ei || er[70] !== ea || er[71] !== f || er[72] !== h
            ? ((S = (0, t.jsx)(g, {
                checked: ei,
                disabled: ea,
                label: f,
                onCheckedChange: h,
              })),
              (er[69] = ei),
              (er[70] = ea),
              (er[71] = f),
              (er[72] = h),
              (er[73] = S))
            : (S = er[73]));
        let en = ef?.chat.allowGroupNotifications ?? !0,
          ex = eo.isPending || el.isLoading;
        (er[74] !== es
          ? ((P = es("web.notification_settings.group_chats")),
            (er[74] = es),
            (er[75] = P))
          : (P = er[75]),
          er[76] !== eg
            ? ((V = (e) => void eg({ chat: { allowGroupNotifications: e } })),
              (er[76] = eg),
              (er[77] = V))
            : (V = er[77]),
          er[78] !== en || er[79] !== ex || er[80] !== P || er[81] !== V
            ? ((A = (0, t.jsx)(g, {
                checked: en,
                disabled: ex,
                label: P,
                onCheckedChange: V,
              })),
              (er[78] = en),
              (er[79] = ex),
              (er[80] = P),
              (er[81] = V),
              (er[82] = A))
            : (A = er[82]));
        let eb = ef?.chat.allowChatRequestNotifications ?? !0,
          ey = eo.isPending || el.isLoading;
        (er[83] !== es
          ? ((T = es("web.notification_settings.chat_requests")),
            (er[83] = es),
            (er[84] = T))
          : (T = er[84]),
          er[85] !== eg
            ? ((L = (e) =>
                void eg({ chat: { allowChatRequestNotifications: e } })),
              (er[85] = eg),
              (er[86] = L))
            : (L = er[86]),
          er[87] !== eb || er[88] !== ey || er[89] !== T || er[90] !== L
            ? (($ = (0, t.jsx)(g, {
                checked: eb,
                disabled: ey,
                label: T,
                onCheckedChange: L,
              })),
              (er[87] = eb),
              (er[88] = ey),
              (er[89] = T),
              (er[90] = L),
              (er[91] = $))
            : ($ = er[91]),
          er[92] !== p || er[93] !== S || er[94] !== A || er[95] !== $
            ? ((C = (0, t.jsxs)(x, { title: p, children: [S, A, $] })),
              (er[92] = p),
              (er[93] = S),
              (er[94] = A),
              (er[95] = $),
              (er[96] = C))
            : (C = er[96]),
          er[97] !== es
            ? ((z = es("web.notification_settings.section_social")),
              (er[97] = es),
              (er[98] = z))
            : (z = er[98]));
        let ev = ef?.social.allowFollowerNotifications ?? !0,
          ew = eo.isPending || el.isLoading;
        (er[99] !== es
          ? ((O = es("notifications.settings.follower.label")),
            (er[99] = es),
            (er[100] = O))
          : (O = er[100]),
          er[101] !== eg
            ? ((W = (e) =>
                void eg({ social: { allowFollowerNotifications: e } })),
              (er[101] = eg),
              (er[102] = W))
            : (W = er[102]),
          er[103] !== ev || er[104] !== ew || er[105] !== O || er[106] !== W
            ? ((I = (0, t.jsx)(g, {
                checked: ev,
                disabled: ew,
                label: O,
                onCheckedChange: W,
              })),
              (er[103] = ev),
              (er[104] = ew),
              (er[105] = O),
              (er[106] = W),
              (er[107] = I))
            : (I = er[107]));
        let e_ = ef?.social.allowNewCoinNotifications ?? !0,
          ek = eo.isPending || el.isLoading;
        (er[108] !== es
          ? ((F = es("web.notification_settings.new_coins_from_follows")),
            (er[108] = es),
            (er[109] = F))
          : (F = er[109]),
          er[110] !== eg
            ? ((R = (e) =>
                void eg({ social: { allowNewCoinNotifications: e } })),
              (er[110] = eg),
              (er[111] = R))
            : (R = er[111]),
          er[112] !== e_ || er[113] !== ek || er[114] !== F || er[115] !== R
            ? ((K = (0, t.jsx)(g, {
                checked: e_,
                disabled: ek,
                label: F,
                onCheckedChange: R,
              })),
              (er[112] = e_),
              (er[113] = ek),
              (er[114] = F),
              (er[115] = R),
              (er[116] = K))
            : (K = er[116]));
        let ej = ef?.social.allowCoinWatcherNotifications ?? !0,
          eC = eo.isPending || el.isLoading;
        (er[117] !== es
          ? ((q = es("web.notification_settings.bookmarked_coin_updates")),
            (er[117] = es),
            (er[118] = q))
          : (q = er[118]),
          er[119] !== eg
            ? ((D = (e) =>
                void eg({ social: { allowCoinWatcherNotifications: e } })),
              (er[119] = eg),
              (er[120] = D))
            : (D = er[120]),
          er[121] !== ej || er[122] !== eC || er[123] !== q || er[124] !== D
            ? ((Q = (0, t.jsx)(g, {
                checked: ej,
                disabled: eC,
                label: q,
                onCheckedChange: D,
              })),
              (er[121] = ej),
              (er[122] = eC),
              (er[123] = q),
              (er[124] = D),
              (er[125] = Q))
            : (Q = er[125]),
          er[126] !== z || er[127] !== I || er[128] !== K || er[129] !== Q
            ? ((N = (0, t.jsxs)(x, { title: z, children: [I, K, Q] })),
              (er[126] = z),
              (er[127] = I),
              (er[128] = K),
              (er[129] = Q),
              (er[130] = N))
            : (N = er[130]),
          er[131] !== es
            ? ((U = es("web.notification_settings.section_coins")),
              (er[131] = es),
              (er[132] = U))
            : (U = er[132]));
        let eN = ef?.coins.allowPriceSpikeNotifications ?? !0,
          eS = eo.isPending || el.isLoading;
        (er[133] !== es
          ? ((E = es("web.notification_settings.price_spikes")),
            (er[133] = es),
            (er[134] = E))
          : (E = er[134]),
          er[135] !== eg
            ? ((J = (e) =>
                void eg({ coins: { allowPriceSpikeNotifications: e } })),
              (er[135] = eg),
              (er[136] = J))
            : (J = er[136]),
          er[137] !== eN || er[138] !== eS || er[139] !== E || er[140] !== J
            ? ((B = (0, t.jsx)(g, {
                checked: eN,
                disabled: eS,
                label: E,
                onCheckedChange: J,
              })),
              (er[137] = eN),
              (er[138] = eS),
              (er[139] = E),
              (er[140] = J),
              (er[141] = B))
            : (B = er[141]));
        let eP = ef?.coins.allowLiveStreamNotifications ?? !0,
          eV = eo.isPending || el.isLoading;
        (er[142] !== es
          ? ((H = es("web.notification_settings.livestreams")),
            (er[142] = es),
            (er[143] = H))
          : (H = er[143]),
          er[144] !== eg
            ? ((M = (e) =>
                void eg({ coins: { allowLiveStreamNotifications: e } })),
              (er[144] = eg),
              (er[145] = M))
            : (M = er[145]),
          er[146] !== eP || er[147] !== eV || er[148] !== H || er[149] !== M
            ? ((G = (0, t.jsx)(g, {
                checked: eP,
                disabled: eV,
                label: H,
                onCheckedChange: M,
              })),
              (er[146] = eP),
              (er[147] = eV),
              (er[148] = H),
              (er[149] = M),
              (er[150] = G))
            : (G = er[150]));
        let eA = ef?.coins.allowCalloutNotifications ?? !0,
          eT = eo.isPending || el.isLoading;
        (er[151] !== es
          ? ((X = es("notifications.settings.callout_setting.label")),
            (er[151] = es),
            (er[152] = X))
          : (X = er[152]),
          er[153] !== eg
            ? ((Y = (e) =>
                void eg({ coins: { allowCalloutNotifications: e } })),
              (er[153] = eg),
              (er[154] = Y))
            : (Y = er[154]),
          er[155] !== eA || er[156] !== eT || er[157] !== X || er[158] !== Y
            ? ((Z = (0, t.jsx)(g, {
                checked: eA,
                disabled: eT,
                label: X,
                onCheckedChange: Y,
              })),
              (er[155] = eA),
              (er[156] = eT),
              (er[157] = X),
              (er[158] = Y),
              (er[159] = Z))
            : (Z = er[159]),
          er[160] !== U || er[161] !== B || er[162] !== G || er[163] !== Z
            ? ((y = (0, t.jsxs)(x, { title: U, children: [B, G, Z] })),
              (er[160] = U),
              (er[161] = B),
              (er[162] = G),
              (er[163] = Z),
              (er[164] = y))
            : (y = er[164]),
          (b = x),
          er[165] !== es
            ? ((v = es("web.notification_settings.section_trending_topics")),
              (er[165] = es),
              (er[166] = v))
            : (v = er[166]),
          (w = ee.map((e) =>
            (0, t.jsx)(
              g,
              {
                checked: eh(e.topic),
                description: e.description,
                disabled: ed.isPending || ec.isLoading,
                label: e.label,
                onCheckedChange: (t) =>
                  void ed.mutateAsync({
                    topic: e.topic,
                    action: t ? "subscribe" : "unsubscribe",
                  }),
              },
              e.topic,
            ),
          )),
          (er[7] = em),
          (er[8] = eu),
          (er[9] = eh),
          (er[10] = ep),
          (er[11] = eg),
          (er[12] = ef?.chat),
          (er[13] = ef?.coins),
          (er[14] = ef?.social.allowCoinWatcherNotifications),
          (er[15] = ef?.social.allowDmMessageNotifications),
          (er[16] = ef?.social.allowFollowerNotifications),
          (er[17] = ef?.social.allowNewCoinNotifications),
          (er[18] = el.isLoading),
          (er[19] = es),
          (er[20] = ec.isLoading),
          (er[21] = eo.isPending),
          (er[22] = ed),
          (er[23] = b),
          (er[24] = y),
          (er[25] = v),
          (er[26] = w),
          (er[27] = _),
          (er[28] = k),
          (er[29] = j),
          (er[30] = C),
          (er[31] = N));
      } else
        ((b = er[23]),
          (y = er[24]),
          (v = er[25]),
          (w = er[26]),
          (_ = er[27]),
          (k = er[28]),
          (j = er[29]),
          (C = er[30]),
          (N = er[31]));
      return (
        er[167] !== b || er[168] !== v || er[169] !== w
          ? ((S = (0, t.jsx)(b, { title: v, children: w })),
            (er[167] = b),
            (er[168] = v),
            (er[169] = w),
            (er[170] = S))
          : (S = er[170]),
        er[171] !== y ||
        er[172] !== S ||
        er[173] !== _ ||
        er[174] !== k ||
        er[175] !== j ||
        er[176] !== C ||
        er[177] !== N
          ? ((P = (0, t.jsxs)("div", {
              className: _,
              children: [k, j, C, N, y, S],
            })),
            (er[171] = y),
            (er[172] = S),
            (er[173] = _),
            (er[174] = k),
            (er[175] = j),
            (er[176] = C),
            (er[177] = N),
            (er[178] = P))
          : (P = er[178]),
        P
      );
    };
  e.s(
    [
      "NotificationSettingsPage",
      0,
      () => {
        let e,
          a,
          r,
          s,
          l,
          o,
          c,
          d = (0, i.c)(14),
          { t: m } = (0, n.f)();
        return (
          d[0] !== m
            ? ((e = m("notifications.settings.title")), (d[0] = m), (d[1] = e))
            : (e = d[1]),
          d[2] !== e
            ? ((a = (0, t.jsx)("h1", {
                className: "text-2xl font-semibold text-text-primary",
                children: e,
              })),
              (d[2] = e),
              (d[3] = a))
            : (a = d[3]),
          d[4] !== m
            ? ((r = m("web.notification_settings.page_description")),
              (d[4] = m),
              (d[5] = r))
            : (r = d[5]),
          d[6] !== r
            ? ((s = (0, t.jsx)("p", {
                className: "mt-2 text-sm text-text-secondary",
                children: r,
              })),
              (d[6] = r),
              (d[7] = s))
            : (s = d[7]),
          d[8] !== a || d[9] !== s
            ? ((l = (0, t.jsxs)("div", { children: [a, s] })),
              (d[8] = a),
              (d[9] = s),
              (d[10] = l))
            : (l = d[10]),
          d[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((o = (0, t.jsx)(h, {})), (d[11] = o))
            : (o = d[11]),
          d[12] !== l
            ? ((c = (0, t.jsxs)("div", {
                className:
                  "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8",
                children: [l, o],
              })),
              (d[12] = l),
              (d[13] = c))
            : (c = d[13]),
          c
        );
      },
      "NotificationSettingsSections",
      0,
      h,
    ],
    917781,
  );
};
