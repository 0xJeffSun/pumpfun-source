// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(202556);
  e.s([
    "f",
    0,
    (e, { hasAttachment: r = !1 } = {}) => {
      let a = r
        ? "chat.dms.errors.attachment_send_failed"
        : "chat.dms.errors.send_failed";
      if (!(e instanceof t.j)) return a;
      switch (e.code) {
        case "not_mutual":
          return "chat.dms.errors.not_mutual";
        case "no_cc_profile":
          return "chat.dms.errors.no_cc_profile";
        case "rate_limited":
          return "chat.dms.errors.rate_limited";
        case "media_rejected":
          return "chat.dms.errors.media_rejected";
        case "media_unavailable":
          return "chat.dms.errors.media_unavailable";
        case "sensitive_content":
          return "chat.dms.errors.sensitive_content";
        case "unknown":
          return a;
        default:
          return e.code;
      }
    },
  ]);
};
