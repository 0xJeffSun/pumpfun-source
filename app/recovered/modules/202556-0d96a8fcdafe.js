// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(402030),
    r = e.i(234761),
    t = e.i(822173);
  let i = e
      .i(758045)
      .z.string()
      .nullish()
      .transform((e) => e ?? null),
    o = a.contract["GET /dms/inbox"].response,
    s = o.extend({
      entries: o.shape.entries.element.extend({ lastActiveAt: i }).array(),
    }),
    n = a.contract["GET /dms/with/{userId}/messages"].response,
    l = n.extend({
      readStates: n.shape.readStates.element
        .extend({ lastActiveAt: i })
        .array(),
    }),
    c = l.shape.messages.element,
    u = a.contract["PATCH /dms/conversations/{conversationId}"].response,
    d = "POST /dms/to/{userId}/messages",
    m = {
      MEDIA_REJECTED: "media_rejected",
      NOT_MUTUAL: "not_mutual",
      RATE_LIMITED: "rate_limited",
    };
  class p extends Error {
    code;
    status;
    constructor(e, a = {}) {
      (super(
        a.detail ?? `dm send refused: ${e}`,
        void 0 === a.cause ? void 0 : { cause: a.cause },
      ),
        (this.name = "DmSendError"),
        (this.code = e),
        (this.status = a.status));
    }
  }
  let h = async (
      e,
      {
        peerId: r,
        content: i,
        image: o,
        imageWidth: s,
        imageHeight: n,
        imageBlurhash: l,
      },
    ) => {
      let u;
      if (void 0 !== i) {
        let e = (0, t.findDmSensitiveContent)(i);
        if (null !== e)
          throw new p("sensitive_content", {
            detail: `DM body appears to contain wallet secrets: ${e}`,
          });
      }
      let h = {
        ...(void 0 !== i ? { content: i } : {}),
        ...(void 0 !== o
          ? {
              ...(void 0 !== s ? { mediaWidth: s } : {}),
              ...(void 0 !== n ? { mediaHeight: n } : {}),
              ...(void 0 !== l ? { mediaBlurhash: l } : {}),
              image: o,
            }
          : {}),
      };
      try {
        u = await e(d, {
          params: { userId: r },
          body: h,
          timeout: void 0 !== o ? 12e4 : 6e4,
        });
      } catch (e) {
        var g, b, f;
        throw (
          (g = void 0 !== o),
          e instanceof p
            ? e
            : (0, a.isContractError)(e, d)
              ? new p(
                  null !== e.code && Object.hasOwn(m, e.code)
                    ? m[e.code]
                    : ((b = e.status),
                      (f = g),
                      429 === b
                        ? "rate_limited"
                        : 403 === b || 404 === b
                          ? "no_cc_profile"
                          : 409 === b
                            ? f
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
    g = async (e, { limit: a, cursor: r, filter: t, signal: i }) => {
      let o = await e("GET /dms/inbox", {
        query: { limit: a, cursor: r, filter: t },
        signal: i,
      });
      return s.parse(o);
    },
    b = (e) => (0, a.isContractError)(e) && 404 === e.status,
    f = async (e, { conversationId: a, ownCcUserId: t, signal: i }) => {
      let o;
      try {
        o = await e("GET /dms/conversations/{conversationId}/messages", {
          params: { conversationId: a },
          query: { limit: r.f },
          signal: i,
        });
      } catch (e) {
        if (b(e)) return { kind: "no-conversation" };
        throw e;
      }
      let s = l.parse(o),
        n = s.readStates.find((e) => e.userId !== t);
      if (void 0 !== n) return { kind: "peer", peerId: n.userId, firstPage: s };
      let c = s.messages.find((e) => e.senderId !== t);
      return void 0 !== c
        ? { kind: "peer", peerId: c.senderId, firstPage: s }
        : { kind: "peer-unnamed" };
    },
    y = async (e, { peerId: a, limit: r, cursor: t, signal: i }) => {
      let o = await e("GET /dms/with/{userId}/messages", {
        params: { userId: a },
        query: { limit: r, cursor: t },
        signal: i,
      });
      return l.parse(o);
    },
    v = async (e, { conversationId: a, upToMessageId: r }) => {
      await e("POST /dms/conversations/{conversationId}/read", {
        params: { conversationId: a },
        body: void 0 === r ? {} : { upToMessageId: r },
      });
    },
    w = async (e, { conversationId: a, prefs: r }) => {
      let t = await e("PATCH /dms/conversations/{conversationId}", {
        params: { conversationId: a },
        body: (({ isArchived: e, isMuted: a, mutedUntil: r, isPinned: t }) => {
          let i = {};
          return (
            void 0 !== e && (i.isArchived = e),
            void 0 !== a && (i.isMuted = a),
            !0 === a && void 0 !== r && (i.mutedUntil = r),
            void 0 !== t && (i.isPinned = t),
            i
          );
        })(r),
      });
      return u.parse(t);
    };
  e.s(
    [
      "j",
      0,
      p,
      "p",
      0,
      f,
      "q",
      0,
      g,
      "E",
      0,
      y,
      "x",
      0,
      b,
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
