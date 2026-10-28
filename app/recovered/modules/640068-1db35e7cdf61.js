// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(759257),
    l = e.i(819757);
  let a = "POST /callout/{calloutId}/replies",
    n = (e) => (0, t.isContractError)(e, a),
    i = new Set([401, 404, 413, 429, 503]),
    s = {
      codes: {
        BLOCKED_BY_AUTHOR: "callouts.reply.errors.blocked_by_author",
        CALLOUT_MODERATED: "callouts.reply.errors.callout_moderated",
        COOLDOWN: "callouts.reply.errors.cooldown",
        INSUFFICIENT_BALANCE: "callouts.reply.errors.insufficient_balance",
        MEDIA_REJECTED: "callouts.reply.errors.invalid_media",
        NOT_GROUP_ADMIN: "web.callouts.not_group_admin",
        NO_ELIGIBLE_WALLET: "callouts.reply.errors.no_eligible_wallet",
        PARENT_REPLY_NOT_FOUND: "callouts.reply.errors.parent_reply_not_found",
        SPAM_RESTRICTED: "callouts.reply.errors.spam_restricted",
      },
      statuses: {
        404: "callouts.reply.errors.callout_not_found",
        413: "callouts.reply.errors.media_too_large",
        503: "callouts.reply.errors.balance_check_unavailable",
      },
    },
    o = {
      reply: "callouts.reply.submit_failed",
      update: "callouts.update.submit_failed",
      quote: "callouts.repost.errors.quote_failed",
    };
  async function u(e) {
    let {
        calloutId: t,
        content: l,
        image: n,
        replyToMessageId: i,
        isQuote: s,
        signal: o,
      } = e,
      u = {
        content: l,
        ...(i ? { replyToMessageId: i } : {}),
        ...(s ? { isQuote: !0 } : {}),
        ...(n ? { image: n } : {}),
      },
      d = await (0, r.j)()(a, {
        params: { calloutId: t },
        body: u,
        credentials: "include",
        signal: o,
      });
    if (!d.replyId) throw Error(`${a} answered without a replyId`);
    return {
      replyId: d.replyId,
      createdAt: d.createdAt ?? null,
      mediaUrl: d.mediaUrl ?? null,
    };
  }
  e.s([
    "U",
    0,
    0xf00000,
    "F",
    0,
    2e3,
    "s",
    0,
    (e, t) => (0, l.I)(e, a, { ...s, fallback: o[t] }),
    "_",
    0,
    u,
    "h",
    0,
    (e, t) => n(e) && e.code === t,
    "X",
    0,
    (e) => n(e) && (null !== e.code || i.has(e.status)),
  ]);
};
