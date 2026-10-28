// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(234761),
    a = e.i(822173);
  let n = e
      .i(758045)
      .z.string()
      .nullish()
      .transform((e) => e ?? null),
    i = t.contract["GET /dms/inbox"].response,
    s = i.extend({
      entries: i.shape.entries.element.extend({ lastActiveAt: n }).array(),
    }),
    o = t.contract["GET /dms/with/{userId}/messages"].response,
    l = o.extend({
      readStates: o.shape.readStates.element
        .extend({ lastActiveAt: n })
        .array(),
    }),
    c = l.shape.messages.element,
    u = t.contract["PATCH /dms/conversations/{conversationId}"].response,
    d = "POST /dms/to/{userId}/messages",
    p = {
      MEDIA_REJECTED: "media_rejected",
      NOT_MUTUAL: "not_mutual",
      RATE_LIMITED: "rate_limited",
    };
  class m extends Error {
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
        content: n,
        image: i,
        imageWidth: s,
        imageHeight: o,
        imageBlurhash: l,
      },
    ) => {
      let u;
      if (void 0 !== n) {
        let e = (0, a.findDmSensitiveContent)(n);
        if (null !== e)
          throw new m("sensitive_content", {
            detail: `DM body appears to contain wallet secrets: ${e}`,
          });
      }
      let h = {
        ...(void 0 !== n ? { content: n } : {}),
        ...(void 0 !== i
          ? {
              ...(void 0 !== s ? { mediaWidth: s } : {}),
              ...(void 0 !== o ? { mediaHeight: o } : {}),
              ...(void 0 !== l ? { mediaBlurhash: l } : {}),
              image: i,
            }
          : {}),
      };
      try {
        u = await e(d, {
          params: { userId: r },
          body: h,
          timeout: void 0 !== i ? 12e4 : 6e4,
        });
      } catch (e) {
        var f, g, y;
        throw (
          (f = void 0 !== i),
          e instanceof m
            ? e
            : (0, t.isContractError)(e, d)
              ? new m(
                  null !== e.code && Object.hasOwn(p, e.code)
                    ? p[e.code]
                    : ((g = e.status),
                      (y = f),
                      429 === g
                        ? "rate_limited"
                        : 403 === g || 404 === g
                          ? "no_cc_profile"
                          : 409 === g
                            ? y
                              ? "media_unavailable"
                              : "not_mutual"
                            : "unknown"),
                  { status: e.status, cause: e },
                )
              : new m("unknown", { cause: e })
        );
      }
      return c.parse(u);
    },
    f = async (e, { limit: t, cursor: r, filter: a, signal: n }) => {
      let i = await e("GET /dms/inbox", {
        query: { limit: t, cursor: r, filter: a },
        signal: n,
      });
      return s.parse(i);
    },
    g = (e) => (0, t.isContractError)(e) && 404 === e.status,
    y = async (e, { conversationId: t, ownCcUserId: a, signal: n }) => {
      let i;
      try {
        i = await e("GET /dms/conversations/{conversationId}/messages", {
          params: { conversationId: t },
          query: { limit: r.f },
          signal: n,
        });
      } catch (e) {
        if (g(e)) return { kind: "no-conversation" };
        throw e;
      }
      let s = l.parse(i),
        o = s.readStates.find((e) => e.userId !== a);
      if (void 0 !== o) return { kind: "peer", peerId: o.userId, firstPage: s };
      let c = s.messages.find((e) => e.senderId !== a);
      return void 0 !== c
        ? { kind: "peer", peerId: c.senderId, firstPage: s }
        : { kind: "peer-unnamed" };
    },
    b = async (e, { peerId: t, limit: r, cursor: a, signal: n }) => {
      let i = await e("GET /dms/with/{userId}/messages", {
        params: { userId: t },
        query: { limit: r, cursor: a },
        signal: n,
      });
      return l.parse(i);
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
          let n = {};
          return (
            void 0 !== e && (n.isArchived = e),
            void 0 !== t && (n.isMuted = t),
            !0 === t && void 0 !== r && (n.mutedUntil = r),
            void 0 !== a && (n.isPinned = a),
            n
          );
        })(r),
      });
      return u.parse(a);
    };
  e.s(
    [
      "j",
      0,
      m,
      "p",
      0,
      y,
      "q",
      0,
      f,
      "E",
      0,
      b,
      "x",
      0,
      g,
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
