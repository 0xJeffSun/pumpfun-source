// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(292686),
    a = e.i(944410),
    i = e.i(254667),
    s = e.i(132838),
    n = e.i(604608),
    o = e.i(606933),
    l = e.i(819757),
    c = e.i(202556),
    u = e.i(234761),
    d = e.i(670055),
    m = e.i(126965),
    p = e.i(846755),
    h = e.i(989568),
    g = e.i(466931),
    f = e.i(424579),
    b = e.i(779106);
  let y = (e) => ({ ...e, sessionWallet: e.sessionWallet ?? (0, p.t)() }),
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
  function k() {}
  function x(e) {
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
      let I,
        j,
        _,
        z,
        S,
        T,
        q,
        A,
        E,
        C,
        M,
        U = (0, t.c)(36),
        { peerId: D, analytics: R } = e,
        P = (0, a.useClientServerContract)(),
        F = (0, o.useQueryClient)(),
        L = (0, b.f)("dm-messages");
      U[0] !== D || U[1] !== L
        ? ((j = [...(I = (0, m.C)(L, D, u.f)), "send"]),
          (U[0] = D),
          (U[1] = L),
          (U[2] = I),
          (U[3] = j))
        : ((I = U[2]), (j = U[3]));
      let $ = j;
      (U[4] !== P || U[5] !== D
        ? ((_ = (e) => {
            let { sessionWallet: t, ...r } = e;
            return t !== (0, p.t)()
              ? Promise.reject(new p.f())
              : (0, c.f)(P, { peerId: D, ...r });
          }),
          (U[4] = P),
          (U[5] = D),
          (U[6] = _))
        : (_ = U[6]),
        U[7] !== R
          ? ((z = (e) => ({
              report: ((e, t) => {
                if (t?.peerCcUserId === void 0) return;
                let { content: a, image: i } = e,
                  s = (0, d.Y)(a ?? "").embeds[0],
                  n = {
                    peerId: t.peerCcUserId,
                    conversationId: t.conversationId,
                    contentType: (0, f.$)({
                      hasText: "" !== (a ?? "").trim(),
                      hasImage: void 0 !== i,
                      isGif: i?.type === "image/gif",
                      hasEmbed: void 0 !== s,
                    }),
                    isFirstMessageInConversation: t.isThreadEmpty,
                    startedAt: Date.now(),
                  };
                return (
                  (0, f.C)({
                    peerId: n.peerId,
                    conversationId: n.conversationId,
                    contentType: n.contentType,
                    bodyLengthBucket: (0, f._)(a),
                    hasAttachment: void 0 !== i,
                    attachmentSource:
                      void 0 === i ? void 0 : r.Gq.SYSTEM_LIBRARY,
                    embedType: void 0 === s ? void 0 : (0, f.i)(s.kind),
                    isFirstMessageInConversation:
                      n.isFirstMessageInConversation,
                    isReplyToUnread: t.hasUnreadIncoming,
                  }),
                  n
                );
              })(e, R),
            })),
            (U[7] = R),
            (U[8] = z))
          : (z = U[8]),
        U[9] !== R || U[10] !== D || U[11] !== F || U[12] !== I || U[13] !== L
          ? ((S = async (e, t, r) => {
              let a = r?.report;
              if (
                (void 0 !== a &&
                  (0, f.k)({
                    messageId: e.messageId,
                    conversationId: e.conversationId,
                    peerId: a.peerId,
                    contentType: a.contentType,
                    latencyMs: Date.now() - a.startedAt,
                    isFirstMessageInConversation:
                      a.isFirstMessageInConversation,
                  }),
                R?.onSent?.(),
                t.sessionWallet !== (0, p.t)())
              )
                return void i.y.warn(
                  "[useSendDm] echo landed after the session changed",
                  { peerId: D },
                );
              void 0 !== t.image && (0, h.o)(e.messageId, t.image);
              let s = F.getQueryCache().find({ queryKey: I }),
                n = s?.state.fetchStatus === "fetching";
              (s?.state.data === void 0 && n
                ? (await s.promise?.catch(k), F.setQueryData(I, (t) => w(t, e)))
                : (await F.cancelQueries({ queryKey: I }),
                  F.setQueryData(I, (t) => w(t, e)),
                  n &&
                    F.invalidateQueries(
                      { queryKey: I },
                      { cancelRefetch: !1 },
                    )),
                F.invalidateQueries({ queryKey: (0, m.u)(L) }));
            }),
            (U[9] = R),
            (U[10] = D),
            (U[11] = F),
            (U[12] = I),
            (U[13] = L),
            (U[14] = S))
          : (S = U[14]),
        U[15] !== D || U[16] !== F
          ? ((T = (e, t, r) => {
              if (e instanceof p.f)
                return void i.y.warn(
                  "[useSendDm] send dropped: session changed",
                  { peerId: D },
                );
              let a = e instanceof c.j ? e : void 0,
                s = r?.report;
              void 0 !== s &&
                (0, f.j)({
                  peerId: s.peerId,
                  conversationId: s.conversationId,
                  contentType: s.contentType,
                  errorReason: (0, f.F)({ code: a?.code, status: a?.status }),
                  latencyMs: Date.now() - s.startedAt,
                });
              let n = a?.code ?? "unknown",
                { code: o, ...u } = (0, l.M)(e instanceof c.j ? e.cause : e),
                d = {
                  peerId: D,
                  code: n,
                  contractCode: o,
                  error: e.message,
                  ...u,
                };
              (v.has(n)
                ? i.y.warn("[useSendDm] send denied", d)
                : (i.y.error("[useSendDm] send failed", d),
                  (0, g.l)({
                    error: e,
                    feature: "direct-messages",
                    operation: "send",
                    context: { code: n, contractCode: o, ...u },
                  })),
                (0, c.F)(n) && F.invalidateQueries({ queryKey: (0, m.e)() }));
            }),
            (U[15] = D),
            (U[16] = F),
            (U[17] = T))
          : (T = U[17]),
        U[18] !== $ || U[19] !== _ || U[20] !== z || U[21] !== S || U[22] !== T
          ? ((q = {
              mutationKey: $,
              networkMode: "always",
              mutationFn: _,
              onMutate: z,
              onSuccess: S,
              onError: T,
            }),
            (U[18] = $),
            (U[19] = _),
            (U[20] = z),
            (U[21] = S),
            (U[22] = T),
            (U[23] = q))
          : (q = U[23]));
      let G = (0, s.f)(q);
      U[24] !== $
        ? ((A = { filters: { mutationKey: $, status: "pending" }, select: x }),
          (U[24] = $),
          (U[25] = A))
        : (A = U[25]);
      let O = (0, n.Z)(A)[0];
      U[26] !== G
        ? ((E = (e, t) => G.mutate(y(e), t)),
          (C = (e, t) => G.mutateAsync(y(e), t)),
          (U[26] = G),
          (U[27] = E),
          (U[28] = C))
        : ((E = U[27]), (C = U[28]));
      let K = void 0 !== O,
        Q = O?.submittedAt ?? G.submittedAt,
        W = O?.variables ?? null;
      return (
        U[29] !== G ||
        U[30] !== K ||
        U[31] !== Q ||
        U[32] !== W ||
        U[33] !== E ||
        U[34] !== C
          ? ((M = {
              ...G,
              mutate: E,
              mutateAsync: C,
              isPending: K,
              submittedAt: Q,
              pendingSend: W,
            }),
            (U[29] = G),
            (U[30] = K),
            (U[31] = Q),
            (U[32] = W),
            (U[33] = E),
            (U[34] = C),
            (U[35] = M))
          : (M = U[35]),
        M
      );
    },
  ]);
};
