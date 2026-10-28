// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(292686),
    a = e.i(944410),
    n = e.i(254667),
    i = e.i(132838),
    s = e.i(604608),
    o = e.i(606933),
    l = e.i(819757),
    c = e.i(202556),
    u = e.i(234761),
    d = e.i(670055),
    p = e.i(126965),
    m = e.i(846755),
    h = e.i(989568),
    f = e.i(466931),
    g = e.i(424579),
    y = e.i(779106);
  let b = (e) => ({ ...e, sessionWallet: e.sessionWallet ?? (0, m.t)() }),
    v = new Set([
      "not_mutual",
      "rate_limited",
      "media_rejected",
      "media_unavailable",
      "sensitive_content",
    ]),
    w = (e, t) => {
      if (!e || 0 === e.pages.length)
        return {
          pages: [{ messages: [t], readStates: [], nextCursor: null }],
          pageParams: [void 0],
        };
      let r = e.pages[0];
      return !r || r.messages.some((e) => e.messageId === t.messageId)
        ? e
        : {
            ...e,
            pages: [
              { ...r, messages: [t, ...r.messages] },
              ...e.pages.slice(1),
            ],
          };
    };
  function E() {}
  function _(e) {
    return {
      variables: ((e) => {
        if (void 0 === e) return;
        let { sessionWallet: t, ...r } = e;
        return r;
      })(e.state.variables),
      submittedAt: e.state.submittedAt,
    };
  }
  e.s([
    "f",
    0,
    (e) => {
      let k,
        I,
        O,
        T,
        R,
        A,
        N,
        C,
        S,
        D,
        M,
        x = (0, t.c)(36),
        { peerId: j, analytics: U } = e,
        P = (0, a.useClientServerContract)(),
        B = (0, o.useQueryClient)(),
        z = (0, y.f)("dm-messages");
      x[0] !== j || x[1] !== z
        ? ((I = [...(k = (0, p.C)(z, j, u.f)), "send"]),
          (x[0] = j),
          (x[1] = z),
          (x[2] = k),
          (x[3] = I))
        : ((k = x[2]), (I = x[3]));
      let H = I;
      (x[4] !== P || x[5] !== j
        ? ((O = (e) => {
            let { sessionWallet: t, ...r } = e;
            return t !== (0, m.t)()
              ? Promise.reject(new m.f())
              : (0, c.f)(P, { peerId: j, ...r });
          }),
          (x[4] = P),
          (x[5] = j),
          (x[6] = O))
        : (O = x[6]),
        x[7] !== U
          ? ((T = (e) => ({
              report: ((e, t) => {
                if (t?.peerCcUserId === void 0) return;
                let { content: a, image: n } = e,
                  i = (0, d.Y)(a ?? "").embeds[0],
                  s = {
                    peerId: t.peerCcUserId,
                    conversationId: t.conversationId,
                    contentType: (0, g.$)({
                      hasText: "" !== (a ?? "").trim(),
                      hasImage: void 0 !== n,
                      isGif: n?.type === "image/gif",
                      hasEmbed: void 0 !== i,
                    }),
                    isFirstMessageInConversation: t.isThreadEmpty,
                    startedAt: Date.now(),
                  };
                return (
                  (0, g.C)({
                    peerId: s.peerId,
                    conversationId: s.conversationId,
                    contentType: s.contentType,
                    bodyLengthBucket: (0, g._)(a),
                    hasAttachment: void 0 !== n,
                    attachmentSource:
                      void 0 === n ? void 0 : r.Gq.SYSTEM_LIBRARY,
                    embedType: void 0 === i ? void 0 : (0, g.i)(i.kind),
                    isFirstMessageInConversation:
                      s.isFirstMessageInConversation,
                    isReplyToUnread: t.hasUnreadIncoming,
                  }),
                  s
                );
              })(e, U),
            })),
            (x[7] = U),
            (x[8] = T))
          : (T = x[8]),
        x[9] !== U || x[10] !== j || x[11] !== B || x[12] !== k || x[13] !== z
          ? ((R = async (e, t, r) => {
              let a = r?.report;
              if (
                (void 0 !== a &&
                  (0, g.k)({
                    messageId: e.messageId,
                    conversationId: e.conversationId,
                    peerId: a.peerId,
                    contentType: a.contentType,
                    latencyMs: Date.now() - a.startedAt,
                    isFirstMessageInConversation:
                      a.isFirstMessageInConversation,
                  }),
                U?.onSent?.(),
                t.sessionWallet !== (0, m.t)())
              )
                return void n.y.warn(
                  "[useSendDm] echo landed after the session changed",
                  { peerId: j },
                );
              void 0 !== t.image && (0, h.o)(e.messageId, t.image);
              let i = B.getQueryCache().find({ queryKey: k }),
                s = i?.state.fetchStatus === "fetching";
              (i?.state.data === void 0 && s
                ? (await i.promise?.catch(E), B.setQueryData(k, (t) => w(t, e)))
                : (await B.cancelQueries({ queryKey: k }),
                  B.setQueryData(k, (t) => w(t, e)),
                  s &&
                    B.invalidateQueries(
                      { queryKey: k },
                      { cancelRefetch: !1 },
                    )),
                B.invalidateQueries({ queryKey: (0, p.u)(z) }));
            }),
            (x[9] = U),
            (x[10] = j),
            (x[11] = B),
            (x[12] = k),
            (x[13] = z),
            (x[14] = R))
          : (R = x[14]),
        x[15] !== j || x[16] !== B
          ? ((A = (e, t, r) => {
              if (e instanceof m.f)
                return void n.y.warn(
                  "[useSendDm] send dropped: session changed",
                  { peerId: j },
                );
              let a = e instanceof c.j ? e : void 0,
                i = r?.report;
              void 0 !== i &&
                (0, g.j)({
                  peerId: i.peerId,
                  conversationId: i.conversationId,
                  contentType: i.contentType,
                  errorReason: (0, g.F)({ code: a?.code, status: a?.status }),
                  latencyMs: Date.now() - i.startedAt,
                });
              let s = a?.code ?? "unknown",
                { code: o, ...u } = (0, l.M)(e instanceof c.j ? e.cause : e),
                d = {
                  peerId: j,
                  code: s,
                  contractCode: o,
                  error: e.message,
                  ...u,
                };
              (v.has(s)
                ? n.y.warn("[useSendDm] send denied", d)
                : (n.y.error("[useSendDm] send failed", d),
                  (0, f.l)({
                    error: e,
                    feature: "direct-messages",
                    operation: "send",
                    context: { code: s, contractCode: o, ...u },
                  })),
                (0, c.F)(s) && B.invalidateQueries({ queryKey: (0, p.e)() }));
            }),
            (x[15] = j),
            (x[16] = B),
            (x[17] = A))
          : (A = x[17]),
        x[18] !== H || x[19] !== O || x[20] !== T || x[21] !== R || x[22] !== A
          ? ((N = {
              mutationKey: H,
              networkMode: "always",
              mutationFn: O,
              onMutate: T,
              onSuccess: R,
              onError: A,
            }),
            (x[18] = H),
            (x[19] = O),
            (x[20] = T),
            (x[21] = R),
            (x[22] = A),
            (x[23] = N))
          : (N = x[23]));
      let L = (0, i.f)(N);
      x[24] !== H
        ? ((C = { filters: { mutationKey: H, status: "pending" }, select: _ }),
          (x[24] = H),
          (x[25] = C))
        : (C = x[25]);
      let F = (0, s.Z)(C)[0];
      x[26] !== L
        ? ((S = (e, t) => L.mutate(b(e), t)),
          (D = (e, t) => L.mutateAsync(b(e), t)),
          (x[26] = L),
          (x[27] = S),
          (x[28] = D))
        : ((S = x[27]), (D = x[28]));
      let G = void 0 !== F,
        W = F?.submittedAt ?? L.submittedAt,
        q = F?.variables ?? null;
      return (
        x[29] !== L ||
        x[30] !== G ||
        x[31] !== W ||
        x[32] !== q ||
        x[33] !== S ||
        x[34] !== D
          ? ((M = {
              ...L,
              mutate: S,
              mutateAsync: D,
              isPending: G,
              submittedAt: W,
              pendingSend: q,
            }),
            (x[29] = L),
            (x[30] = G),
            (x[31] = W),
            (x[32] = q),
            (x[33] = S),
            (x[34] = D),
            (x[35] = M))
          : (M = x[35]),
        M
      );
    },
  ]);
};
