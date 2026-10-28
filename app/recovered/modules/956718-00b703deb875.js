// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(592209),
    r = e.i(644306),
    i = e.i(358893),
    s = e.i(214100),
    n = e.i(73383),
    o = e.i(654506),
    a = e.i(529281);
  let l = {
      "account.hidePersonalInfo": (0, a.f)({
        id: "account.hidePersonalInfo",
        section: "account",
        scope: "device",
        default: !1,
        coerce: (e) => !0 === e,
        adapter: (0, n.f)({
          store: () => i.W,
          select: (e) => e.hidePersonalInfo,
          write: ({ next: e, state: t }) => {
            e !== t.hidePersonalInfo && t.toggleHidePersonalInfo();
          },
        }),
        control: { kind: "switch" },
        labelKey: "web.auth.hide_personal_info",
        descriptionKey: "web.settings.account.hide_personal_info_description",
        searchTerms: [
          "eyeball",
          "privacy",
          "stream",
          "mask",
          "email",
          "address",
        ],
        firstPaintSensitive: !0,
      }),
    },
    c = {
      "display.language": (0, a.f)({
        id: "display.language",
        section: "display",
        scope: "account",
        default: null,
        coerce: (e) => (0, t.v)("string" == typeof e ? e : null),
        adapter: (0, s.f)({
          read: () => (0, r.I)(),
          write: (e) => {
            e && (0, r.E)(e);
          },
          readServer: (e) => (0, r.A)(e),
        }),
        control: { kind: "custom", component: "language" },
        labelKey: "settings.language_menu_title",
        descriptionKey: "web.settings.language.description",
        searchTerms: ["language", "locale", "translation", "english"],
        resettable: !1,
      }),
    },
    d = {
      "privacy.confirmExternalLinks": (0, a.f)({
        id: "privacy.confirmExternalLinks",
        section: "privacy",
        scope: "device",
        default: !0,
        coerce: (e) => !1 !== e,
        adapter: (0, o.f)({
          key: "privacy.confirm-external-links",
          codec: "json",
        }),
        control: { kind: "switch" },
        labelKey: "web.settings.privacy.confirm_external_links",
        descriptionKey:
          "web.settings.privacy.confirm_external_links_description",
        searchTerms: [
          "external links",
          "leaving",
          "warning",
          "don't ask again",
        ],
      }),
    };
  e.s(["I", 0, l, "d", 0, c, "n", 0, d], 956718);
  let u = {
    "admin.showProfileControls": (0, a.f)({
      id: "admin.showProfileControls",
      section: "admin",
      scope: "device",
      default: !0,
      coerce: (e) => !1 !== e,
      adapter: (0, n.f)({
        store: () => i.W,
        select: (e) => e.showProfileAdminControls,
        write: ({ next: e, state: t }) => t.setShowProfileAdminControls(e),
      }),
      control: { kind: "switch" },
      labelKey: "web.settings.admin.show_profile_controls",
      descriptionKey: "web.settings.admin.show_profile_controls_description",
      searchTerms: ["admin", "moderation", "ban", "avatar", "profile"],
    }),
    "admin.showCoinControls": (0, a.f)({
      id: "admin.showCoinControls",
      section: "admin",
      scope: "device",
      default: !0,
      coerce: (e) => !1 !== e,
      adapter: (0, n.f)({
        store: () => i.W,
        select: (e) => e.showCoinAdminControls,
        write: ({ next: e, state: t }) => t.setShowCoinAdminControls(e),
      }),
      control: { kind: "switch" },
      labelKey: "web.settings.admin.show_coin_controls",
      descriptionKey: "web.settings.admin.show_coin_controls_description",
      searchTerms: ["admin", "moderation", "nsfw", "ban", "coin", "token"],
    }),
  };
  e.s(["f", 0, u], 754219);
};
