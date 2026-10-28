// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(445242),
    i = e.i(352386),
    r = e.i(279577),
    n = e.i(944410),
    s = e.i(761459),
    a = e.i(606933),
    l = e.i(202556),
    c = e.i(234761),
    d = e.i(291313),
    o = e.i(126965),
    u = e.i(779106);
  function m(e) {
    return e.nextCursor ?? void 0;
  }
  function f(e) {
    return e.entries;
  }
  function h(e) {
    let t = new Set();
    return (0, d.f)(
      e.pages
        .flatMap(f)
        .filter(
          (e) => !t.has(e.conversationId) && (t.add(e.conversationId), !0),
        ),
    );
  }
  var p = e.i(365089);
  let x = ({
      mutuals: e,
      entries: t,
      waitForFullInbox: i,
      isInboxComplete: r,
    }) => {
      if (i && !r) return [];
      let n = new Set(t.map((e) => e.peerId));
      return e.filter((e) => !n.has(e.userId));
    },
    g = (e) => e.walletAddress ?? e.userId,
    b = ({ entries: e, newPeers: t }) => [
      ...e.map((e) => ({ kind: "conversation", peerId: e.peerId, entry: e })),
      ...t.map((e) => ({ kind: "mutual", peerId: g(e), mutual: e })),
    ];
  e.s(
    [
      "e",
      0,
      500,
      "u",
      0,
      x,
      "a",
      0,
      b,
      "m",
      0,
      (e) =>
        e.username || (e.walletAddress ? (0, p.d)(e.walletAddress) : e.userId),
      "D",
      0,
      g,
      "_",
      0,
      (e) =>
        "conversation" === e.kind
          ? {
              peerId: e.peerId,
              analyticsPeerId: e.entry.peerId,
              isExistingConversation: !0,
            }
          : {
              peerId: e.peerId,
              analyticsPeerId: e.mutual.userId,
              isExistingConversation: !1,
            },
    ],
    307105,
  );
  let y = [],
    v = [];
  e.s(
    [
      "f",
      0,
      (e) => {
        let d,
          f,
          p,
          g,
          j,
          I,
          N,
          S,
          k = (0, t.c)(32),
          { enabled: P, waitForFullInbox: w } = e;
        k[0] !== P
          ? ((d = { enabled: P }), (k[0] = P), (k[1] = d))
          : (d = k[1]);
        let C = ((e) => {
          let i,
            r,
            d,
            f,
            p,
            x,
            g = (0, t.c)(16),
            { enabled: b } = e,
            y = (0, n.useClientServerContract)(),
            v = (0, a.useQueryClient)(),
            j = (0, u.f)("dm-inbox");
          g[0] !== j
            ? ((i = (0, o.i)(j, "inbox", c.f)), (g[0] = j), (g[1] = i))
            : (i = g[1]);
          let I = i;
          g[2] !== j
            ? ((r = (0, o.K)(j, c.f)), (g[2] = j), (g[3] = r))
            : (r = g[3]);
          let N = b && null !== j;
          return (
            g[4] !== v || g[5] !== I
              ? ((d = () => v.getQueryData(I)),
                (f = () => v.getQueryState(I)?.dataUpdatedAt),
                (g[4] = v),
                (g[5] = I),
                (g[6] = d),
                (g[7] = f))
              : ((d = g[6]), (f = g[7])),
            g[8] !== y
              ? ((p = (e) => {
                  let { pageParam: t, signal: i } = e;
                  return (0, l.q)(y, {
                    limit: c.f,
                    cursor: t,
                    filter: "inbox",
                    signal: i,
                  });
                }),
                (g[8] = y),
                (g[9] = p))
              : (p = g[9]),
            g[10] !== r ||
            g[11] !== N ||
            g[12] !== d ||
            g[13] !== f ||
            g[14] !== p
              ? ((x = {
                  queryKey: r,
                  enabled: N,
                  initialData: d,
                  initialDataUpdatedAt: f,
                  staleTime: 3e4,
                  gcTime: 0,
                  initialPageParam: void 0,
                  queryFn: p,
                  getNextPageParam: m,
                  select: h,
                }),
                (g[10] = r),
                (g[11] = N),
                (g[12] = d),
                (g[13] = f),
                (g[14] = p),
                (g[15] = x))
              : (x = g[15]),
            (0, s.useInfiniteQuery)(x)
          );
        })(d);
        k[2] !== P
          ? ((f = { enabled: P }), (k[2] = P), (k[3] = f))
          : (f = k[3]);
        let _ = (0, r.f)(f),
          A = P && w,
          F = C.data ?? y,
          E = F.length,
          {
            hasNextPage: R,
            isFetching: L,
            isFetchNextPageError: D,
            fetchNextPage: z,
          } = C;
        (k[4] !== E ||
        k[5] !== z ||
        k[6] !== R ||
        k[7] !== A ||
        k[8] !== D ||
        k[9] !== L
          ? ((p = () => {
              A && !(E >= 500) && (!R || L || D || z({ cancelRefetch: !1 }));
            }),
            (g = [A, E, R, L, D, z]),
            (k[4] = E),
            (k[5] = z),
            (k[6] = R),
            (k[7] = A),
            (k[8] = D),
            (k[9] = L),
            (k[10] = p),
            (k[11] = g))
          : ((p = k[10]), (g = k[11])),
          (0, i.useEffect)(p, g));
        let U = !C.isLoading && !C.hasNextPage && void 0 !== C.data;
        if (k[12] !== F || k[13] !== U || k[14] !== _.data || k[15] !== w) {
          let e = x({
            mutuals: _.data ?? v,
            entries: F,
            waitForFullInbox: w,
            isInboxComplete: U,
          });
          ((j = b({ entries: F, newPeers: e })),
            (k[12] = F),
            (k[13] = U),
            (k[14] = _.data),
            (k[15] = w),
            (k[16] = j));
        } else j = k[16];
        let T = j;
        k[17] !== C || k[18] !== _
          ? ((I = () => {
              (C.hasNextPage &&
                !C.isFetching &&
                C.fetchNextPage({ cancelRefetch: !1 }),
                _.hasNextPage &&
                  !_.isFetching &&
                  _.fetchNextPage({ cancelRefetch: !1 }));
            }),
            (k[17] = C),
            (k[18] = _),
            (k[19] = I))
          : (I = k[19]);
        let K = I;
        k[20] !== C || k[21] !== _
          ? ((N = () => {
              (C.refetch(), _.refetch());
            }),
            (k[20] = C),
            (k[21] = _),
            (k[22] = N))
          : (N = k[22]);
        let Q = N,
          $ = C.isLoading || _.isLoading,
          M =
            (C.isError && void 0 === C.data) ||
            (_.isError && void 0 === _.data),
          q = C.hasNextPage || _.hasNextPage,
          H = C.isFetchingNextPage || _.isFetchingNextPage,
          O = C.isFetchNextPageError || _.isFetchNextPageError;
        return (
          k[23] !== K ||
          k[24] !== T ||
          k[25] !== Q ||
          k[26] !== q ||
          k[27] !== H ||
          k[28] !== O ||
          k[29] !== $ ||
          k[30] !== M
            ? ((S = {
                recipients: T,
                isLoading: $,
                hasReadError: M,
                hasMore: q,
                isFetchingMore: H,
                isFetchMoreError: O,
                fetchMore: K,
                retry: Q,
              }),
              (k[23] = K),
              (k[24] = T),
              (k[25] = Q),
              (k[26] = q),
              (k[27] = H),
              (k[28] = O),
              (k[29] = $),
              (k[30] = M),
              (k[31] = S))
            : (S = k[31]),
          S
        );
      },
    ],
    677778,
  );
  var j = e.i(292686);
  e.i(12692);
  var I = e.i(398902),
    N = e.i(63289),
    S = e.i(732486),
    k = e.i(157633),
    P = e.i(458310);
  function w(e) {
    let i,
      r,
      n,
      s,
      a,
      l,
      c = (0, t.c)(15),
      { kind: d, roomHref: o, onDismiss: u } = e,
      { t: m } = (0, I.f)();
    return (
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, S.jsx)(k.y$, {
            "aria-hidden": !0,
            className: "size-6 shrink-0 text-primary-green",
          })),
          (c[0] = i))
        : (i = c[0]),
      c[1] !== d || c[2] !== m
        ? ((r = (({ kind: e, t }) => {
            switch (e) {
              case "coin":
                return t("chat.dms.share.sent_coin");
              case "callout":
                return t("chat.dms.share.sent_callout");
              case "reply":
                return t("chat.dms.share.sent_post");
              case "profile":
                return t("chat.dms.share.sent_profile");
              default:
                return t("chat.dms.share.sent_generic");
            }
          })({ kind: d, t: m })),
          (c[1] = d),
          (c[2] = m),
          (c[3] = r))
        : (r = c[3]),
      c[4] !== r
        ? ((n = (0, S.jsx)("span", {
            className: "min-w-0 flex-1 text-sm font-semibold text-text-primary",
            children: r,
          })),
          (c[4] = r),
          (c[5] = n))
        : (n = c[5]),
      c[6] !== m
        ? ((s = m("web.notifications.toast.view")), (c[6] = m), (c[7] = s))
        : (s = c[7]),
      c[8] !== s
        ? ((a = (0, S.jsx)("span", {
            className: "shrink-0 text-sm font-bold text-text-accent",
            children: s,
          })),
          (c[8] = s),
          (c[9] = a))
        : (a = c[9]),
      c[10] !== u || c[11] !== o || c[12] !== n || c[13] !== a
        ? ((l = (0, S.jsxs)(P.default, {
            className:
              "flex min-h-[52px] w-[min(420px,calc(100vw-2rem))] items-center gap-2.5 rounded-full border border-border-tertiary bg-bg-primary py-2 pl-3 pr-4 shadow-lg transition-colors hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-green",
            "data-testid": "dm-share-sent-toast",
            href: o,
            onClick: u,
            prefetch: !1,
            children: [i, n, a],
          })),
          (c[10] = u),
          (c[11] = o),
          (c[12] = n),
          (c[13] = a),
          (c[14] = l))
        : (l = c[14]),
      l
    );
  }
  var C = e.i(527740),
    _ = e.i(762372),
    A = e.i(670055),
    F = e.i(846755),
    E = e.i(595673);
  e.s(
    [
      "f",
      0,
      (e) => {
        let i,
          r,
          n,
          s = (0, t.c)(11),
          { url: a, peerId: l, surface: c } = e,
          { t: d } = (0, I.f)();
        s[0] !== l ? ((i = { peerId: l }), (s[0] = l), (s[1] = i)) : (i = s[1]);
        let o = (0, _.f)(i);
        s[2] !== l || s[3] !== o || s[4] !== c || s[5] !== d || s[6] !== a
          ? ((r = (e) => {
              let { analyticsPeerId: t, isExistingConversation: i } = e,
                r = (0, A.H)(a),
                n = (e) =>
                  (0, E.oQ)({
                    peerId: t,
                    kind: r?.kind,
                    mint: r?.kind === "coin" ? r.mint : void 0,
                    isExistingConversation: i,
                    status: e,
                    surface: c,
                  });
              return o.mutateAsync({ content: a }).then(
                () => (
                  n(j.tL.SUCCESS),
                  (({ kind: e, roomHref: t }) => {
                    N.c.custom(
                      (i) =>
                        (0, S.jsx)(w, {
                          kind: e,
                          onDismiss: () => N.c.dismiss(i),
                          roomHref: t,
                        }),
                      { duration: 6e3 },
                    );
                  })({
                    kind: r?.kind,
                    roomHref: `/messages/${encodeURIComponent(l)}`,
                  }),
                  !0
                ),
                (e) =>
                  !(e instanceof F.f) &&
                  (n(j.tL.ERROR), N.c.error(d((0, C.f)(e))), !1),
              );
            }),
            (s[2] = l),
            (s[3] = o),
            (s[4] = c),
            (s[5] = d),
            (s[6] = a),
            (s[7] = r))
          : (r = s[7]);
        let u = r;
        return (
          s[8] !== o.isPending || s[9] !== u
            ? ((n = { share: u, isSending: o.isPending }),
              (s[8] = o.isPending),
              (s[9] = u),
              (s[10] = n))
            : (n = s[10]),
          n
        );
      },
    ],
    604860,
  );
};
