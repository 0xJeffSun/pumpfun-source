// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(234761),
    a = e.i(822173);
  let i = e
      .i(758045)
      .z.string()
      .nullish()
      .transform((e) => e ?? null),
    s = t.contract["GET /dms/inbox"].response,
    n = s.extend({
      entries: s.shape.entries.element.extend({ lastActiveAt: i }).array(),
    }),
    o = t.contract["GET /dms/with/{userId}/messages"].response,
    l = o.extend({
      readStates: o.shape.readStates.element
        .extend({ lastActiveAt: i })
        .array(),
    }),
    c = l.shape.messages.element,
    u = t.contract["PATCH /dms/conversations/{conversationId}"].response,
    d = "POST /dms/to/{userId}/messages",
    m = {
      MEDIA_REJECTED: "media_rejected",
      NOT_MUTUAL: "not_mutual",
      RATE_LIMITED: "rate_limited",
    };
  class p extends Error {
    code;
    status;
    constructor(e, t = {}) {
      (super(
        t.detail ?? `dm send refused: ${e}`,
        void 0 === t.cause ? void 0 : { cause: t.cause },
      ),
        (this.name = "DmSendError"),
        (this.code = e),
        (this.status = t.status));
    }
  }
  let h = async (
      e,
      {
        peerId: r,
        content: i,
        image: s,
        imageWidth: n,
        imageHeight: o,
        imageBlurhash: l,
      },
    ) => {
      let u;
      if (void 0 !== i) {
        let e = (0, a.findDmSensitiveContent)(i);
        if (null !== e)
          throw new p("sensitive_content", {
            detail: `DM body appears to contain wallet secrets: ${e}`,
          });
      }
      let h = {
        ...(void 0 !== i ? { content: i } : {}),
        ...(void 0 !== s
          ? {
              ...(void 0 !== n ? { mediaWidth: n } : {}),
              ...(void 0 !== o ? { mediaHeight: o } : {}),
              ...(void 0 !== l ? { mediaBlurhash: l } : {}),
              image: s,
            }
          : {}),
      };
      try {
        u = await e(d, {
          params: { userId: r },
          body: h,
          timeout: void 0 !== s ? 12e4 : 6e4,
        });
      } catch (e) {
        var g, f, b;
        throw (
          (g = void 0 !== s),
          e instanceof p
            ? e
            : (0, t.isContractError)(e, d)
              ? new p(
                  null !== e.code && Object.hasOwn(m, e.code)
                    ? m[e.code]
                    : ((f = e.status),
                      (b = g),
                      429 === f
                        ? "rate_limited"
                        : 403 === f || 404 === f
                          ? "no_cc_profile"
                          : 409 === f
                            ? b
                              ? "media_unavailable"
                              : "not_mutual"
                            : "unknown"),
                  { status: e.status, cause: e },
                )
              : new p("unknown", { cause: e })
        );
      }
      return c.parse(u);
    },
    g = async (e, { limit: t, cursor: r, filter: a, signal: i }) => {
      let s = await e("GET /dms/inbox", {
        query: { limit: t, cursor: r, filter: a },
        signal: i,
      });
      return n.parse(s);
    },
    f = (e) => (0, t.isContractError)(e) && 404 === e.status,
    b = async (e, { conversationId: t, ownCcUserId: a, signal: i }) => {
      let s;
      try {
        s = await e("GET /dms/conversations/{conversationId}/messages", {
          params: { conversationId: t },
          query: { limit: r.f },
          signal: i,
        });
      } catch (e) {
        if (f(e)) return { kind: "no-conversation" };
        throw e;
      }
      let n = l.parse(s),
        o = n.readStates.find((e) => e.userId !== a);
      if (void 0 !== o) return { kind: "peer", peerId: o.userId, firstPage: n };
      let c = n.messages.find((e) => e.senderId !== a);
      return void 0 !== c
        ? { kind: "peer", peerId: c.senderId, firstPage: n }
        : { kind: "peer-unnamed" };
    },
    y = async (e, { peerId: t, limit: r, cursor: a, signal: i }) => {
      let s = await e("GET /dms/with/{userId}/messages", {
        params: { userId: t },
        query: { limit: r, cursor: a },
        signal: i,
      });
      return l.parse(s);
    },
    v = async (e, { conversationId: t, upToMessageId: r }) => {
      await e("POST /dms/conversations/{conversationId}/read", {
        params: { conversationId: t },
        body: void 0 === r ? {} : { upToMessageId: r },
      });
    },
    w = async (e, { conversationId: t, prefs: r }) => {
      let a = await e("PATCH /dms/conversations/{conversationId}", {
        params: { conversationId: t },
        body: (({ isArchived: e, isMuted: t, mutedUntil: r, isPinned: a }) => {
          let i = {};
          return (
            void 0 !== e && (i.isArchived = e),
            void 0 !== t && (i.isMuted = t),
            !0 === t && void 0 !== r && (i.mutedUntil = r),
            void 0 !== a && (i.isPinned = a),
            i
          );
        })(r),
      });
      return u.parse(a);
    };
  e.s(
    [
      "j",
      0,
      p,
      "p",
      0,
      b,
      "q",
      0,
      g,
      "E",
      0,
      y,
      "x",
      0,
      f,
      "F",
      0,
      (e) => "not_mutual" === e || "no_cc_profile" === e,
      "r",
      0,
      v,
      "f",
      0,
      h,
      "z",
      0,
      w,
    ],
    202556,
  );
};
